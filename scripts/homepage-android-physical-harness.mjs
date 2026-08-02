import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
import { pathToFileURL } from "node:url";

const DEFAULT_ADB = "/opt/homebrew/bin/adb";
const TRACE_CATEGORIES = "devtools.timeline,blink,cc,gpu,input,disabled-by-default-devtools.timeline.frame,disabled-by-default-devtools.timeline,disabled-by-default-cc.debug";
const VARIANTS = new Set(["normal", "canvas-bitmap", "canvas-hidden", "glow-disabled", "gradients-disabled", "effects-disabled", "navbar-blur-disabled", "navbar-backdrop-disabled", "navbar-shadow-disabled", "navbar-transition-disabled", "canvas-promoted", "hero-contained", "listeners-disabled"]);

const percentile = (values, fraction) => {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.max(0, Math.ceil(sorted.length * fraction) - 1))];
};

export function parseGfxInfo(text, refreshIntervalMs = 1000 / 120) {
  const lines = text.split(/\r?\n/);
  const frames = [];
  for (let index = 0; index < lines.length; index += 1) {
    if (!lines[index].startsWith("Flags,") || !lines[index].includes(",IntendedVsync,")) continue;
    const fields = lines[index].split(",");
    const intendedIndex = fields.indexOf("IntendedVsync");
    const completedIndex = fields.indexOf("FrameCompleted");
    for (index += 1; index < lines.length && lines[index] !== "---PROFILEDATA---"; index += 1) {
      if (!/^\d+(,\d+)+,?$/.test(lines[index])) continue;
      const values = lines[index].split(",").map(Number);
      if (values[0] !== 0 || completedIndex < 0 || values[completedIndex] <= values[intendedIndex]) continue;
      frames.push((values[completedIndex] - values[intendedIndex]) / 1_000_000);
    }
  }
  return {
    frameCount: frames.length,
    p50Ms: percentile(frames, 0.5),
    p95Ms: percentile(frames, 0.95),
    maxMs: frames.length ? Math.max(...frames) : null,
    missedRefreshFrames: frames.filter((value) => value > refreshIntervalMs).length,
    over16Ms: frames.filter((value) => value > 16.67).length,
    over33Ms: frames.filter((value) => value > 33.33).length,
    over50Ms: frames.filter((value) => value > 50).length,
  };
}

export function summarizeTrace(events) {
  const complete = events.filter((event) => event.ph === "X" && Number.isFinite(event.dur));
  const total = (needle) => complete.filter((event) => event.name.includes(needle)).reduce((sum, event) => sum + event.dur / 1_000, 0);
  return {
    eventCount: events.length,
    eventDispatchTotalMs: total("EventDispatch"),
    functionCallTotalMs: total("FunctionCall"),
    animationFrameTotalMs: total("FireAnimationFrame"),
    paintTotalMs: total("Paint"),
    rasterTotalMs: total("RasterTask"),
    compositeTotalMs: total("Composite"),
    prePaintTotalMs: total("PrePaint"),
    top: [...complete].sort((a, b) => b.dur - a.dur).slice(0, 24).map((event) => ({ name: event.name, durationMs: event.dur / 1_000, category: event.cat })),
  };
}

const waitFor = async (fn, label, timeoutMs = 30_000) => {
  const deadline = Date.now() + timeoutMs;
  let lastError = "";
  while (Date.now() < deadline) {
    try {
      const value = await fn();
      if (value) return value;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await delay(200);
  }
  throw new Error(`Timed out waiting for ${label}${lastError ? `: ${lastError}` : ""}`);
};

async function websocket(urlString) {
  const url = new URL(urlString);
  const socket = net.createConnection({ host: url.hostname, port: Number(url.port) });
  await new Promise((resolve, reject) => { socket.once("connect", resolve); socket.once("error", reject); });
  const key = randomBytes(16).toString("base64");
  socket.write([`GET ${url.pathname}${url.search} HTTP/1.1`, `Host: ${url.host}`, "Upgrade: websocket", "Connection: Upgrade", `Sec-WebSocket-Key: ${key}`, "Sec-WebSocket-Version: 13", "\r\n"].join("\r\n"));
  const handshake = await new Promise((resolve, reject) => {
    let buffer = Buffer.alloc(0);
    const onData = (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);
      const index = buffer.indexOf("\r\n\r\n");
      if (index < 0) return;
      socket.off("data", onData);
      resolve({ header: buffer.subarray(0, index).toString("utf8"), rest: buffer.subarray(index + 4) });
    };
    socket.on("data", onData);
    socket.once("error", reject);
  });
  const accept = createHash("sha1").update(`${key}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`).digest("base64");
  if (!handshake.header.startsWith("HTTP/1.1 101") || !handshake.header.includes(accept)) throw new Error(`WebSocket handshake failed: ${handshake.header}`);
  let buffer = handshake.rest;
  let fragmented = null;
  const queue = [];
  const waiters = [];
  const push = (message) => (waiters.shift() ?? queue.push.bind(queue))(message);
  const frame = (payload, opcode = 1) => {
    const length = payload.length;
    const header = Buffer.alloc(length < 126 ? 2 : length <= 0xffff ? 4 : 10);
    header[0] = 0x80 | opcode;
    if (length < 126) header[1] = 0x80 | length;
    else if (length <= 0xffff) { header[1] = 0x80 | 126; header.writeUInt16BE(length, 2); }
    else { header[1] = 0x80 | 127; header.writeUInt32BE(0, 2); header.writeUInt32BE(length, 6); }
    const mask = randomBytes(4), body = Buffer.from(payload);
    for (let index = 0; index < body.length; index += 1) body[index] ^= mask[index % 4];
    return Buffer.concat([header, mask, body]);
  };
  const read = () => {
    while (buffer.length > 1) {
      let length = buffer[1] & 127, headerLength = 2;
      if (length === 126) { if (buffer.length < 4) return; length = buffer.readUInt16BE(2); headerLength = 4; }
      else if (length === 127) { if (buffer.length < 10) return; length = buffer.readUInt32BE(6); headerLength = 10; }
      if (buffer.length < headerLength + length) return;
      const fin = Boolean(buffer[0] & 0x80), opcode = buffer[0] & 15, payload = buffer.subarray(headerLength, headerLength + length);
      buffer = buffer.subarray(headerLength + length);
      if (opcode === 8) return socket.end();
      if (opcode === 9) socket.write(frame(payload, 10));
      else if (opcode === 1 && fin) push(payload);
      else if (opcode === 1) fragmented = Buffer.from(payload);
      else if (opcode === 0 && fragmented) {
        fragmented = Buffer.concat([fragmented, payload]);
        if (fin) { push(fragmented); fragmented = null; }
      }
    }
  };
  socket.on("data", (chunk) => { buffer = Buffer.concat([buffer, chunk]); read(); });
  return {
    send: (payload) => socket.write(frame(Buffer.from(JSON.stringify(payload), "utf8"))),
    next: (timeoutMs = 30_000) => queue.length ? Promise.resolve(queue.shift()) : new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`Timed out waiting for websocket message after ${timeoutMs} ms`)), timeoutMs);
      waiters.push((message) => { clearTimeout(timer); resolve(message); });
    }),
    close: () => socket.end(),
  };
}

async function connectCdp(port, urlNeedle) {
  const target = await waitFor(async () => {
    const response = await fetch(`http://127.0.0.1:${port}/json/list`);
    if (!response.ok) return null;
    const targets = await response.json();
    const pages = targets.filter((entry) => entry.type === "page" && entry.webSocketDebuggerUrl).sort((a, b) => Number(b.id) - Number(a.id));
    return pages.find((entry) => entry.url === urlNeedle) ?? pages.find((entry) => entry.url.startsWith(`${urlNeedle}?`)) ?? pages.find((entry) => entry.url.includes(urlNeedle)) ?? pages[0];
  }, `Chrome target containing ${urlNeedle}`);
  await fetch(`http://127.0.0.1:${port}/json/activate/${encodeURIComponent(target.id)}`);
  const socket = await websocket(target.webSocketDebuggerUrl), pending = new Map(), events = [];
  let id = 0;
  (async () => {
    for (;;) {
      let message;
      try { message = JSON.parse((await socket.next()).toString("utf8")); } catch { return; }
      if (typeof message.id === "number") {
        const callback = pending.get(message.id);
        if (!callback) continue;
        pending.delete(message.id);
        if (message.error) callback.reject(new Error(message.error.message)); else callback.resolve(message.result);
      } else if (message.method) events.push(message);
    }
  })();
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const requestId = ++id;
    const detail = method === "Runtime.evaluate" ? `: ${params.expression.slice(0, 80)}` : "";
    const timer = setTimeout(() => { pending.delete(requestId); reject(new Error(`Timed out waiting for ${method}${detail}`)); }, 30_000);
    pending.set(requestId, { resolve: (value) => { clearTimeout(timer); resolve(value); }, reject: (error) => { clearTimeout(timer); reject(error); } });
    socket.send({ id: requestId, method, params });
  });
  return {
    targetId: target.id,
    send,
    evaluate: async (expression) => {
      const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
      if (result.exceptionDetails) throw new Error(result.exceptionDetails.text ?? "Runtime.evaluate failed");
      return result.result.value;
    },
    event: (method, timeoutMs = 30_000) => waitFor(() => {
      const index = events.findIndex((entry) => entry.method === method);
      return index < 0 ? null : events.splice(index, 1)[0];
    }, method, timeoutMs),
    drain: () => events.splice(0),
    close: () => socket.close(),
  };
}

const adb = (binary, serial, args, options = {}) => execFileSync(binary, ["-s", serial, ...args], { encoding: "utf8", ...options });

const variantScript = (variant) => {
  if (variant === "canvas-bitmap") return `(()=>{const canvas=document.querySelector('#vision canvas'),image=new Image();image.src=canvas.toDataURL();image.className=canvas.className;image.setAttribute('aria-hidden','true');canvas.before(image);canvas.style.display='none'})()`;
  if (variant === "canvas-hidden") return `document.querySelector('#vision canvas').style.visibility='hidden'`;
  if (variant === "glow-disabled") return `(()=>{const context=document.querySelector('#vision canvas').getContext('2d');Object.defineProperty(context,'shadowBlur',{configurable:true,get:()=>0,set:()=>{}})})()`;
  if (variant === "gradients-disabled") return `Array.from(document.querySelectorAll('#vision > div')).slice(0,2).forEach(node=>node.style.display='none')`;
  if (variant === "effects-disabled") return `(()=>{Array.from(document.querySelectorAll('#vision > div')).slice(0,2).forEach(node=>node.style.display='none');document.querySelector('header').style.cssText+=';backdrop-filter:none!important;-webkit-backdrop-filter:none!important;box-shadow:none!important;transition:none!important'})()`;
  if (variant === "navbar-blur-disabled") return `document.querySelector('header').style.cssText+=';backdrop-filter:none!important;box-shadow:none!important;transition:none!important'`;
  if (variant === "navbar-backdrop-disabled") return `document.querySelector('header').style.cssText+=';backdrop-filter:none!important;-webkit-backdrop-filter:none!important'`;
  if (variant === "navbar-shadow-disabled") return `document.querySelector('header').style.cssText+=';box-shadow:none!important'`;
  if (variant === "navbar-transition-disabled") return `document.querySelector('header').style.cssText+=';transition:none!important'`;
  if (variant === "canvas-promoted") return `document.querySelector('#vision canvas').style.cssText+=';transform:translateZ(0);will-change:transform'`;
  if (variant === "hero-contained") return `document.querySelector('#vision').style.contain='paint'`;
  return "undefined";
};

async function run() {
  const options = process.argv.slice(2).reduce((result, argument) => {
    const [key, value] = argument.split(/=(.*)/s);
    if (key === "--serial") result.serial = value;
    if (key === "--url") result.url = value;
    if (key === "--output-dir") result.outputDir = value;
    if (key === "--debug-port") result.debugPort = Number(value);
    if (key === "--variant") result.variant = value;
    if (key === "--attempts") result.attempts = Number(value);
    if (key === "--adb") result.adb = value;
    return result;
  }, { serial: "R5CW805K0WV", debugPort: 9223, variant: "normal", attempts: 3, adb: DEFAULT_ADB });
  if (!options.url || !options.outputDir) throw new Error("--url and --output-dir are required");
  if (!VARIANTS.has(options.variant)) throw new Error(`Unknown variant: ${options.variant}`);
  fs.mkdirSync(options.outputDir, { recursive: true });
  const url = new URL(options.url), report = { device: {}, url: options.url, variant: options.variant, attempts: [], startedAt: new Date().toISOString() };
  report.device = {
    serial: options.serial,
    model: adb(options.adb, options.serial, ["shell", "getprop", "ro.product.model"]).trim(),
    android: adb(options.adb, options.serial, ["shell", "getprop", "ro.build.version.release"]).trim(),
    size: adb(options.adb, options.serial, ["shell", "wm", "size"]).trim(),
    density: adb(options.adb, options.serial, ["shell", "wm", "density"]).trim(),
  };
  adb(options.adb, options.serial, ["shell", "input", "keyevent", "KEYCODE_WAKEUP"]);
  adb(options.adb, options.serial, ["shell", "wm", "dismiss-keyguard"]);
  adb(options.adb, options.serial, ["shell", "am", "start", "-a", "android.intent.action.VIEW", "-d", options.url, "com.android.chrome"]);
  await delay(2_000);
  const client = await connectCdp(options.debugPort, options.url);
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  for (let attempt = 1; attempt <= options.attempts; attempt += 1) {
    let preload = null;
    if (options.variant === "listeners-disabled") preload = await client.send("Page.addScriptToEvaluateOnNewDocument", { source: `(()=>{const add=EventTarget.prototype.addEventListener;EventTarget.prototype.addEventListener=function(type,...args){if(type==='scroll')return;return add.call(this,type,...args)};window.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}takeRecords(){return[]}get root(){return null}get rootMargin(){return '0px'}get thresholds(){return[0]}}})()` });
    client.drain();
    await client.send("Page.navigate", { url: `${options.url}${url.search ? "&" : "?"}physical=${options.variant}-${attempt}-${Date.now()}` });
    await delay(1_000);
    await client.evaluate("scrollTo(0,0);document.readyState");
    await delay(700);
    if (preload) await client.send("Page.removeScriptToEvaluateOnNewDocument", { identifier: preload.identifier });
    await client.evaluate(variantScript(options.variant));
    if (options.variant === "glow-disabled") await delay(500);
    await client.evaluate(`(()=>{const canvas=document.querySelector('#vision canvas');window.__physicalProbe={startedAt:performance.now(),firstTouch:null,lastScroll:null,startY:scrollY,startDraws:Number(canvas?.dataset.drawCount||0),inputDraws:null,frames:[],scrolls:[],longTasks:[]};const probe=window.__physicalProbe;requestAnimationFrame(function frame(time){probe.frames.push(time);if(time-probe.startedAt<12000)requestAnimationFrame(frame)});addEventListener('touchstart',()=>{probe.firstTouch??=performance.now();probe.inputDraws??=Number(canvas?.dataset.drawCount||0)},{passive:true});addEventListener('scroll',()=>{probe.lastScroll=performance.now();probe.scrolls.push({time:probe.lastScroll,y:scrollY,draws:Number(canvas?.dataset.drawCount||0),paused:canvas?.dataset.scrollPaused})},{passive:true});new PerformanceObserver(list=>probe.longTasks.push(...list.getEntries().map(entry=>({startTime:entry.startTime,duration:entry.duration})))).observe({type:'longtask',buffered:true})})()`);
    client.drain();
    await client.send("Tracing.start", { categories: TRACE_CATEGORIES, options: "sampling-frequency=10000", transferMode: "ReportEvents" });
    adb(options.adb, options.serial, ["shell", "dumpsys", "gfxinfo", "com.android.chrome", "reset"]);
    for (let cycle = 0; cycle < 3; cycle += 1) {
      adb(options.adb, options.serial, ["shell", "input", "swipe", "540", "1750", "540", "1050", "700"]);
      await delay(80);
      adb(options.adb, options.serial, ["shell", "input", "swipe", "540", "1050", "540", "1750", "700"]);
      await delay(80);
    }
    await delay(700);
    await client.send("Tracing.end");
    await client.event("Tracing.tracingComplete", 60_000);
    const traceEvents = client.drain().filter((event) => event.method === "Tracing.dataCollected").flatMap((event) => event.params.value);
    const gfxText = adb(options.adb, options.serial, ["shell", "dumpsys", "gfxinfo", "com.android.chrome", "framestats"]);
    const probe = await client.evaluate(`(()=>{const probe=window.__physicalProbe,canvas=document.querySelector('#vision canvas'),endDraws=Number(canvas?.dataset.drawCount||0),activeFrames=probe.frames.filter(time=>probe.firstTouch!==null&&time>=probe.firstTouch&&time<=(probe.lastScroll??performance.now())),gaps=activeFrames.slice(1).map((time,index)=>time-activeFrames[index]);return{firstTouch:probe.firstTouch,lastScroll:probe.lastScroll,scrollEvents:probe.scrolls.length,scrollDelta:scrollY-probe.startY,activeFrameGaps:gaps,frameGapP95:gaps.length?gaps.sort((a,b)=>a-b)[Math.ceil(gaps.length*.95)-1]:null,maxFrameGap:gaps.length?Math.max(...gaps):null,activeCanvasDraws:probe.inputDraws===null?null:Math.max(...probe.scrolls.map(entry=>entry.draws),probe.inputDraws)-probe.inputDraws,totalCanvasDraws:endDraws-probe.startDraws,pausedThroughout:probe.scrolls.every(entry=>entry.paused==='true'),longTasks:probe.longTasks.filter(entry=>probe.firstTouch!==null&&entry.startTime>=probe.firstTouch&&entry.startTime<=(probe.lastScroll??Infinity)),canvasVisible:getComputedStyle(canvas).display!=='none'&&getComputedStyle(canvas).visibility!=='hidden'}})()`);
    const screenshotPath = path.join(options.outputDir, `${options.variant}-${attempt}.png`);
    fs.writeFileSync(screenshotPath, execFileSync(options.adb, ["-s", options.serial, "exec-out", "screencap", "-p"], { maxBuffer: 16 * 1024 * 1024 }));
    const tracePath = path.join(options.outputDir, `${options.variant}-${attempt}-trace.json`);
    fs.writeFileSync(tracePath, `${JSON.stringify({ traceEvents })}\n`);
    const gfxPath = path.join(options.outputDir, `${options.variant}-${attempt}-gfxinfo.txt`);
    fs.writeFileSync(gfxPath, gfxText);
    report.attempts.push({ attempt, probe, gfx: parseGfxInfo(gfxText), trace: summarizeTrace(traceEvents), screenshotPath, tracePath, gfxPath });
  }
  client.close();
  report.completedAt = new Date().toISOString();
  report.summary = {
    frameGapP50Ms: percentile(report.attempts.map((entry) => entry.probe.frameGapP95).filter(Number.isFinite), 0.5),
    frameGapP95Ms: percentile(report.attempts.map((entry) => entry.probe.frameGapP95).filter(Number.isFinite), 0.95),
    gfxFrameP95Ms: percentile(report.attempts.map((entry) => entry.gfx.p95Ms).filter(Number.isFinite), 0.95),
    gfxOver33Total: report.attempts.reduce((sum, entry) => sum + entry.gfx.over33Ms, 0),
    activeCanvasDraws: report.attempts.map((entry) => entry.probe.activeCanvasDraws),
    activeLongTasks: report.attempts.reduce((sum, entry) => sum + entry.probe.longTasks.length, 0),
  };
  fs.writeFileSync(path.join(options.outputDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
  await fetch(`http://127.0.0.1:${options.debugPort}/json/close/${encodeURIComponent(client.targetId)}`);
  process.stdout.write(`${JSON.stringify(report.summary)}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) run().catch((error) => { console.error(error); process.exit(1); });
