import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import tls from "node:tls";
import { spawn } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const EVIDENCE_ROOT = "/var/folders/pc/fh2zn9b94lz1wsfn_9bwz3hc0000gn/T/opencode/id-night-homepage-evidence";
const OUT = path.join(EVIDENCE_ROOT, "remediation");
const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const SIGNAL_EXIT = { SIGINT: 130, SIGTERM: 143 };
const real = (target) => fs.realpathSync.native?.(target) ?? fs.realpathSync(target);
const inside = (parent, target) => { const relative = path.relative(parent, target); return !!relative && !path.isAbsolute(relative) && !relative.startsWith(".."); };
const descendants = new Set();
const TARGETS = [
  { id: "hero-eyebrow", selector: "#vision p", text: "Tecnología en desarrollo, nacida en Mendoza.", range: true },
  { id: "hero-title", selector: "#home-vision-title", range: true },
  { id: "hero-description", selector: "#vision p", text: "ID-NIGHT ayuda a ordenar accesos, decisiones e incidentes sin perder de vista la privacidad ni el criterio humano.", range: true },
  { id: "primary-cta", selector: '#vision a[href="#problema"]' },
  { id: "secondary-cta", selector: '#vision a[href^="https://wa.me/"]' },
  { id: "neural-background", selector: '#vision canvas[aria-hidden="true"]' },
];
export const MOBILE_VIEWPORTS = [{ width: 320, height: 812 }, { width: 360, height: 800 }, { width: 375, height: 812 }, { width: 390, height: 844 }, { width: 430, height: 932 }];
export const REGRESSION_VIEWPORTS = [{ width: 768, height: 1024 }, { width: 1024, height: 768 }, { width: 1440, height: 900 }, { width: 1920, height: 1080 }];
export const DESKTOP_NAV_VIEWPORTS = [{ width: 1024, height: 640 }, { width: 1280, height: 720 }, { width: 1440, height: 700 }, { width: 1920, height: 700 }];
export const MOBILE_NAV_VIEWPORTS = [{ width: 320, height: 812 }, { width: 390, height: 844 }];
export const NEURAL_VIEWPORTS = [{ width: 320, height: 812 }, { width: 375, height: 812 }, { width: 430, height: 932 }, { width: 1024, height: 768 }, { width: 1440, height: 900 }, { width: 1920, height: 1080 }];

export function parsePngDimensions(buffer) { if (buffer.length < 24 || !buffer.subarray(0, 8).equals(PNG)) throw new Error("Invalid PNG signature"); return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }; }
export function evaluateViewportFindings(width, findings) { const failures = []; let maxRight = -Infinity; for (const finding of findings) { if (finding.missing || !finding.rects?.length) { failures.push({ id: finding.id, reason: "Required target is missing or produced no measurable rects" }); continue; } for (const rect of finding.rects) { maxRight = Math.max(maxRight, rect.right); if (rect.left < 0) { failures.push({ id: finding.id, reason: `Required target crosses the left edge (${rect.left}px)`, rect }); break; } if (rect.right > width) { failures.push({ id: finding.id, reason: `Required target crosses the right edge (${rect.right}px > ${width}px)`, rect }); break; } } } return { pass: failures.length === 0, failures, maxRight: Number.isFinite(maxRight) ? maxRight : null }; }
export function resolveOutputDir(outputDir) { const candidate = typeof outputDir === "string" ? outputDir.trim() : ""; if (!candidate) throw new Error("--output-dir must be a non-empty path"); const root = path.resolve(EVIDENCE_ROOT), realRoot = real(root), resolved = path.resolve(candidate), anchor = (() => { let current = resolved; while (!fs.existsSync(current)) { const next = path.dirname(current); if (next === current) break; current = next; } return current; })(), relative = path.relative(root, resolved), anchored = fs.existsSync(anchor) ? real(anchor) : ""; if (!relative || path.isAbsolute(relative) || relative.startsWith("..") || resolved === path.parse(resolved).root || resolved === ROOT || resolved === process.cwd() || !anchored || (anchored !== realRoot && !inside(realRoot, anchored))) throw new Error(`--output-dir must stay within the approved evidence root: ${EVIDENCE_ROOT}`); return resolved; }
export function isProductionViewportPass(result) { return result.evaluation.pass && result.geometry.viewport.innerWidth === result.viewport.width && result.geometry.viewport.innerHeight === result.viewport.height && result.geometry.viewport.devicePixelRatio === 1 && result.pngDimensions.width === result.viewport.width && result.pngDimensions.height === result.viewport.height && !result.geometry.hasNextDevIndicator; }

const fmt = ({ width, height }) => `${width}x${height}`;
const expr = `(()=>{const t=${JSON.stringify(TARGETS)},r=x=>({left:+x.left.toFixed(2),right:+x.right.toFixed(2),top:+x.top.toFixed(2),bottom:+x.bottom.toFixed(2),width:+x.width.toFixed(2),height:+x.height.toFixed(2)}),pick=x=>{let e=x.text?Array.from(document.querySelectorAll(x.selector)).find(n=>n.textContent?.trim()===x.text):document.querySelector(x.selector);return x.parent?e?.parentElement:e};return{viewport:{innerWidth:window.innerWidth,innerHeight:window.innerHeight,visualViewportWidth:window.visualViewport?.width??null,visualViewportHeight:window.visualViewport?.height??null,devicePixelRatio:window.devicePixelRatio,scrollWidth:document.documentElement.scrollWidth,bodyScrollWidth:document.body?.scrollWidth??null},hasNextDevIndicator:Boolean(document.querySelector('[data-next-badge-root],nextjs-portal,[data-nextjs-dialog-overlay]')),findings:t.map(x=>{const e=pick(x);if(!e)return{id:x.id,missing:true,rects:[]};const rects=x.range?(()=>{const g=document.createRange();g.selectNodeContents(e);return Array.from(g.getClientRects()).map(r)})():[r(e.getBoundingClientRect())];return{id:x.id,missing:!rects.length,rects}})}})()`;
const waitFor = async (fn, label, ms = 60_000) => { const end = Date.now() + ms; let last = ""; while (Date.now() < end) { try { const value = await fn(); if (value) return value; } catch (error) { last = error instanceof Error ? error.message : String(error); } await delay(200); } throw new Error(`Timed out waiting for ${label}${last ? `: ${last}` : ""}`); };
const httpJson = (url) => fetch(url).then((r) => (r.ok ? r.json() : null));
const chrome = () => [process.env.CHROME_PATH, "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/Applications/Chromium.app/Contents/MacOS/Chromium"].find((file) => file && fs.existsSync(file)) || (() => { throw new Error("Chrome executable not found. Set CHROME_PATH."); })();
const launch = (cmd, args, log) => { const stream = fs.createWriteStream(log, { flags: "a" }); const child = spawn(cmd, args, { cwd: ROOT, env: process.env, detached: true, stdio: ["ignore", "pipe", "pipe"] }); const proc = { child, stream }; child.stdout?.pipe(stream); child.stderr?.pipe(stream); child.once("exit", () => descendants.delete(proc)); descendants.add(proc); return proc; };
const run = (cmd, args, log) => new Promise((resolve, reject) => { const proc = launch(cmd, args, log); proc.child.on("error", reject); proc.child.on("exit", (code, signal) => { proc.stream.end(); const result = { command: [cmd, ...args].join(" "), exitCode: code, signal, logPath: log }; if (code === 0) resolve(result); else reject(Object.assign(new Error(`Command failed: ${result.command}`), { result })); }); });
const stop = async (proc) => { if (!proc?.child?.pid) return { terminated: false, forced: false }; if (proc.stopPromise) return proc.stopPromise; proc.stopPromise = (async () => { descendants.delete(proc); try { process.kill(-proc.child.pid, "SIGTERM"); } catch { proc.stream?.end(); return { terminated: false, forced: false }; } const end = Date.now() + 8_000; while (Date.now() < end) { try { process.kill(proc.child.pid, 0); await delay(100); } catch { proc.stream?.end(); return { terminated: true, forced: false }; } } try { process.kill(-proc.child.pid, "SIGKILL"); } catch {} proc.stream?.end(); return { terminated: true, forced: true }; })(); return proc.stopPromise; };
const wireSignalCleanup = () => { let cleanup; const handlers = Object.keys(SIGNAL_EXIT).map((signal) => [signal, () => { if (cleanup) return; cleanup = (async () => { const forced = setTimeout(() => process.exit(SIGNAL_EXIT[signal]), 10_000); try { await Promise.all([...descendants].map((proc) => stop(proc))); } finally { clearTimeout(forced); process.exit(SIGNAL_EXIT[signal]); } })(); }]); for (const [signal, handler] of handlers) process.once(signal, handler); return () => { for (const [signal, handler] of handlers) process.off(signal, handler); }; };

async function ws(urlString) {
  const url = new URL(urlString), sock = url.protocol === "wss:" ? tls.connect({ host: url.hostname, port: Number(url.port || 443) }) : net.createConnection({ host: url.hostname, port: Number(url.port || 80) });
  await new Promise((resolve, reject) => { sock.once("connect", resolve); sock.once("error", reject); });
  const key = randomBytes(16).toString("base64");
  sock.write([`GET ${url.pathname}${url.search} HTTP/1.1`, `Host: ${url.host}`, "Upgrade: websocket", "Connection: Upgrade", `Sec-WebSocket-Key: ${key}`, "Sec-WebSocket-Version: 13", "\r\n"].join("\r\n"));
  const hand = await new Promise((resolve, reject) => { let b = Buffer.alloc(0); const onData = (c) => { b = Buffer.concat([b, c]); const i = b.indexOf("\r\n\r\n"); if (i < 0) return; sock.off("data", onData); resolve({ header: b.subarray(0, i).toString("utf8"), rest: b.subarray(i + 4) }); }; sock.on("data", onData); sock.once("error", reject); });
  const accept = createHash("sha1").update(`${key}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`).digest("base64");
  if (!hand.header.startsWith("HTTP/1.1 101") || !hand.header.includes(accept)) throw new Error(`WebSocket handshake failed: ${hand.header}`);
  let buffer = hand.rest, queue = [], waiters = []; const push = (m) => (waiters.shift() || queue.push.bind(queue))(m); const frame = (payload, op = 1) => { const len = payload.length, head = Buffer.alloc(len < 126 ? 2 : len <= 0xffff ? 4 : 10); head[0] = 0x80 | op; if (len < 126) head[1] = 0x80 | len; else if (len <= 0xffff) { head[1] = 0x80 | 126; head.writeUInt16BE(len, 2); } else { head[1] = 0x80 | 127; head.writeUInt32BE(0, 2); head.writeUInt32BE(len, 6); } const mask = randomBytes(4), body = Buffer.from(payload); for (let i = 0; i < body.length; i += 1) body[i] ^= mask[i % 4]; return Buffer.concat([head, mask, body]); };
  const read = () => { while (buffer.length > 1) { let len = buffer[1] & 127, head = 2; if (len === 126) { if (buffer.length < 4) return; len = buffer.readUInt16BE(2); head = 4; } else if (len === 127) { if (buffer.length < 10) return; len = buffer.readUInt32BE(6); head = 10; } if (buffer.length < head + len) return; const op = buffer[0] & 15, payload = buffer.subarray(head, head + len); buffer = buffer.subarray(head + len); if (op === 8) return sock.end(); if (op === 9) sock.write(frame(payload, 10)); else if (op === 1) push(payload); } };
  sock.on("data", (chunk) => { buffer = Buffer.concat([buffer, chunk]); read(); });
  return { send: (payload) => sock.write(frame(Buffer.from(JSON.stringify(payload), "utf8"))), next: (ms = 30_000) => queue.length ? Promise.resolve(queue.shift()) : new Promise((resolve, reject) => { const timer = setTimeout(() => reject(new Error(`Timed out waiting for websocket message after ${ms}ms`)), ms); waiters.push((m) => { clearTimeout(timer); resolve(m); }); }), close: async () => { sock.end(); } };
}

async function cdp(port) {
  const url = await waitFor(async () => (await httpJson(`http://127.0.0.1:${port}/json/list`))?.find((t) => t.type === "page" && t.webSocketDebuggerUrl)?.webSocketDebuggerUrl, `Chrome page websocket on ${port}`), socket = await ws(url), pending = new Map(), events = []; let id = 0;
  (async () => { for (;;) { let msg; try { msg = JSON.parse((await socket.next()).toString("utf8")); } catch { return; } if (typeof msg.id === "number") { const done = pending.get(msg.id); if (!done) continue; pending.delete(msg.id); if (msg.error) done.reject(new Error(msg.error.message)); else done.resolve(msg.result); } else if (msg.method) events.push(msg); } })();
  return { send: (method, params = {}) => new Promise((resolve, reject) => { pending.set(++id, { resolve, reject }); socket.send({ id, method, params }); }), event: (name, ms = 60_000) => waitFor(() => { const i = events.findIndex((e) => e.method === name); return i < 0 ? null : events.splice(i, 1)[0]; }, `CDP event ${name}`, ms), drainEvents: () => events.splice(0), eval: async (expression) => { const result = await pendingWrap("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }); if (result.exceptionDetails) throw new Error(`Runtime.evaluate failed: ${result.exceptionDetails.text ?? "unknown exception"}`); return result.result.value; }, close: () => socket.close() };
  function pendingWrap(method, params) { return new Promise((resolve, reject) => { pending.set(++id, { resolve, reject }); socket.send({ id, method, params }); }); }
}

const metrics = (viewport) => ({ width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.width <= 430, screenOrientation: viewport.height >= viewport.width ? { type: "portraitPrimary", angle: 0 } : { type: "landscapePrimary", angle: 90 } });
async function prodShot(client, baseUrl, outputDir, viewport) { await client.send("Emulation.setDeviceMetricsOverride", metrics(viewport)); await client.send("Page.navigate", { url: baseUrl }); await client.event("Page.loadEventFired"); await client.eval("Promise.resolve(document.fonts?.ready).then(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))))"); await delay(1_000); const geometry = await client.eval(expr), png = Buffer.from((await client.send("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: false })).data, "base64"), pngPath = path.join(outputDir, `home-prod-${fmt(viewport)}.png`), pngDimensions = parsePngDimensions(png), evaluation = evaluateViewportFindings(viewport.width, geometry.findings); fs.writeFileSync(pngPath, png); return { viewport, pngPath, pngDimensions, geometry, evaluation }; }
async function probeExploreMenu(client, baseUrl, outputDir, viewport) {
  await client.send("Emulation.setDeviceMetricsOverride", metrics(viewport));
  await client.send("Page.navigate", { url: baseUrl });
  await client.event("Page.loadEventFired");
  await delay(500);
  client.drainEvents();
  await client.eval(`(()=>{const trigger=Array.from(document.querySelectorAll('nav button')).find(node=>node.textContent?.includes('Explorar'));trigger?.focus();trigger?.click();return new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))})()`);
  await client.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
  await client.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
  await delay(250);
  const geometry = await client.eval(`(()=>{const panel=document.querySelector('#site-explore-menu'),cards=Array.from(panel?.querySelectorAll('section')??[]),rect=panel?.getBoundingClientRect(),active=document.activeElement;return{viewport:{width:innerWidth,height:innerHeight},expanded:document.querySelector('button[aria-controls="site-explore-menu"]')?.getAttribute('aria-expanded'),panel:rect?{left:+rect.left.toFixed(2),right:+rect.right.toFixed(2),top:+rect.top.toFixed(2),bottom:+rect.bottom.toFixed(2),clientHeight:panel.clientHeight,scrollHeight:panel.scrollHeight,overflowY:getComputedStyle(panel).overflowY}:null,cards:cards.map(card=>{const box=card.getBoundingClientRect();return{label:card.querySelector('h2')?.textContent?.trim(),top:+box.top.toFixed(2)}}),focused:{href:active?.getAttribute?.('href')??null,insidePanel:Boolean(panel?.contains(active))}}})()`);
  const pngPath = path.join(outputDir, `nav-open-${fmt(viewport)}.png`);
  fs.writeFileSync(pngPath, Buffer.from((await client.send("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: false })).data, "base64"));
  await client.eval(`document.querySelector('a[href="/#problema"]')?.click()`);
  await delay(250);
  const hashClosure = await client.eval(`({hash:location.hash,menuOpen:Boolean(document.querySelector('#site-explore-menu'))})`);
  const runtimeEvents = client.drainEvents().filter((event) => event.method === "Runtime.exceptionThrown" || event.method === "Log.entryAdded" || (event.method === "Runtime.consoleAPICalled" && event.params?.type === "error"));
  return { viewport, pngPath, geometry, hashClosure, runtimeEvents };
}
export function isExploreMenuPass(result) {
  const { viewport, geometry, hashClosure, runtimeEvents } = result;
  const rows = [...new Set(geometry.cards.map((card) => card.top))];
  return geometry.expanded === "true" && geometry.panel && geometry.panel.left >= 0 && geometry.panel.right <= viewport.width && geometry.panel.top >= 0 && geometry.panel.bottom <= viewport.height && geometry.panel.overflowY === "auto" && geometry.cards.length === 5 && rows.length === 2 && geometry.cards.filter((card) => card.top === rows[0]).length === 3 && geometry.focused.insidePanel && geometry.focused.href === "/#vision" && hashClosure.hash === "#problema" && hashClosure.menuOpen === false && runtimeEvents.length === 0;
}
async function probeMobileMenu(client, baseUrl, outputDir, viewport) {
  await client.send("Emulation.setDeviceMetricsOverride", metrics(viewport));
  await client.send("Page.navigate", { url: baseUrl });
  await client.event("Page.loadEventFired");
  await delay(500);
  client.drainEvents();
  await client.eval(`(()=>{const trigger=document.querySelector('button[aria-controls="site-mobile-menu"]');trigger?.focus();trigger?.click()})()`);
  await delay(300);
  const geometry = await client.eval(`(()=>{const panel=document.querySelector('#site-mobile-menu'),rect=panel?.getBoundingClientRect(),cards=Array.from(panel?.querySelectorAll('[data-explore-groups="mobile"] > section')??[]),firstLinks=Array.from(cards[0]?.querySelectorAll('a')??[]).slice(0,2).map(link=>{const box=link.getBoundingClientRect();return{left:+box.left.toFixed(2),top:+box.top.toFixed(2)}});return{expanded:document.querySelector('button[aria-controls="site-mobile-menu"]')?.getAttribute('aria-expanded'),panel:rect?{left:+rect.left.toFixed(2),right:+rect.right.toFixed(2),top:+rect.top.toFixed(2),bottom:+rect.bottom.toFixed(2),clientHeight:panel.clientHeight,scrollHeight:panel.scrollHeight,overflowY:getComputedStyle(panel).overflowY}:null,cards:cards.map(card=>card.querySelector('h2')?.textContent?.trim()),firstLinks,focusedText:document.activeElement?.textContent?.trim(),bodyOverflow:document.body.style.overflow}})()`);
  const pngPath = path.join(outputDir, `mobile-nav-open-${fmt(viewport)}.png`);
  fs.writeFileSync(pngPath, Buffer.from((await client.send("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: false })).data, "base64"));
  await client.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  await client.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  await delay(300);
  const closure = await client.eval(`({menuOpen:Boolean(document.querySelector('#site-mobile-menu')),focusedControls:document.activeElement?.getAttribute?.('aria-controls')??null,bodyOverflow:document.body.style.overflow})`);
  const runtimeEvents = client.drainEvents().filter((event) => event.method === "Runtime.exceptionThrown" || event.method === "Log.entryAdded" || (event.method === "Runtime.consoleAPICalled" && event.params?.type === "error"));
  return { viewport, pngPath, geometry, closure, runtimeEvents };
}
export function isMobileMenuPass(result) {
  const { viewport, geometry, closure, runtimeEvents } = result;
  return geometry.expanded === "true" && geometry.panel && geometry.panel.left >= 0 && geometry.panel.right <= viewport.width && geometry.panel.top >= 0 && geometry.panel.bottom <= viewport.height && geometry.panel.overflowY === "auto" && geometry.panel.scrollHeight > geometry.panel.clientHeight && geometry.cards.length === 5 && geometry.firstLinks.length === 2 && geometry.firstLinks[0].top === geometry.firstLinks[1].top && geometry.firstLinks[0].left < geometry.firstLinks[1].left && geometry.focusedText === "Cerrar" && geometry.bodyOverflow === "hidden" && closure.menuOpen === false && closure.focusedControls === "site-mobile-menu" && closure.bodyOverflow === "" && runtimeEvents.length === 0;
}
async function probeNeuralBackground(client, baseUrl) {
  await client.send("Emulation.setDeviceMetricsOverride", metrics(NEURAL_VIEWPORTS[0]));
  await client.send("Page.navigate", { url: baseUrl });
  await client.event("Page.loadEventFired");
  await delay(600);
  client.drainEvents();
  const snapshot = () => client.eval(`(()=>{const canvas=document.querySelector('#vision canvas');return{sampledAt:performance.now(),pointCount:Number(canvas?.dataset.pointCount),drawCount:Number(canvas?.dataset.drawCount),rafRequests:Number(canvas?.dataset.rafRequests),rafActive:canvas?.dataset.rafActive,pointerActive:canvas?.dataset.pointerActive,dpr:Number(canvas?.dataset.dpr)}})()`);
  const setViewport = async (viewport) => {
    await client.send("Emulation.setDeviceMetricsOverride", metrics(viewport));
    await client.eval("scrollTo(0,0)");
    await delay(250);
  };
  const densitySamples = [];
  for (const viewport of NEURAL_VIEWPORTS) {
    await setViewport(viewport);
    densitySamples.push({ viewport, ...(await snapshot()) });
  }
  const visibleSamples = [];
  for (const viewport of NEURAL_VIEWPORTS.filter(({ width }) => width === 375 || width === 1440)) {
    await setViewport(viewport);
    await delay(350);
    const start = await snapshot();
    await delay(1_200);
    const end = await snapshot();
    const elapsedMs = end.sampledAt - start.sampledAt;
    const drawDelta = end.drawCount - start.drawCount;
    visibleSamples.push({ viewport, start, end, elapsedMs, drawDelta, cadence: drawDelta * 1_000 / elapsedMs });
  }
  await client.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 180, y: 330 });
  await delay(400);
  const interactive = await snapshot();
  await client.eval(`scrollTo(0,document.querySelector('#problema').offsetTop+200)`);
  await delay(400);
  const offscreenStart = await snapshot();
  await delay(350);
  const offscreenEnd = await snapshot();
  await client.eval("scrollTo(0,0)");
  await delay(400);
  const resumedStart = await snapshot();
  await delay(350);
  const resumedEnd = await snapshot();
  await client.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await client.send("Page.navigate", { url: baseUrl });
  await client.event("Page.loadEventFired");
  await delay(400);
  const reducedStart = await snapshot();
  await client.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 180, y: 330 });
  await delay(350);
  const reducedEnd = await snapshot();
  await client.send("Emulation.setEmulatedMedia", { features: [] });
  const runtimeEvents = client.drainEvents().filter((event) => event.method === "Runtime.exceptionThrown" || event.method === "Log.entryAdded" || (event.method === "Runtime.consoleAPICalled" && event.params?.type === "error"));
  return { viewport: { width: 1440, height: 900 }, densitySamples, visibleSamples, interactive, offscreenStart, offscreenEnd, resumedStart, resumedEnd, reducedStart, reducedEnd, runtimeEvents };
}
export function isNeuralBackgroundPass(result) {
  const { densitySamples, visibleSamples, interactive, offscreenStart, offscreenEnd, resumedStart, resumedEnd, reducedStart, reducedEnd, runtimeEvents } = result;
  const resumedDraws = resumedEnd.drawCount - resumedStart.drawCount;
  const resumedRequests = resumedEnd.rafRequests - resumedStart.rafRequests;
  const densityPass = densitySamples.length === NEURAL_VIEWPORTS.length && densitySamples.every(({ viewport, pointCount }) => viewport.width < 640 ? pointCount >= 28 && pointCount <= 34 : pointCount >= 52 && pointCount <= 72);
  const cadencePass = visibleSamples.length === 2 && visibleSamples.every(({ cadence, drawDelta, start, end }) => cadence >= 52 && cadence <= 64 && drawDelta >= 62 && start.rafActive === "true" && end.rafActive === "true");
  return densityPass && cadencePass && interactive.pointCount >= 52 && interactive.pointCount <= 72 && interactive.pointerActive === "true" && interactive.rafActive === "true" && interactive.dpr <= 1.5 && offscreenStart.rafActive === "false" && offscreenEnd.rafRequests === offscreenStart.rafRequests && offscreenEnd.drawCount === offscreenStart.drawCount && resumedStart.rafActive === "true" && resumedRequests >= resumedDraws && resumedRequests <= resumedDraws * 3 + 3 && resumedDraws >= 17 && resumedDraws <= 24 && reducedStart.rafActive === "false" && reducedEnd.rafRequests === reducedStart.rafRequests && reducedEnd.drawCount === reducedStart.drawCount && reducedEnd.pointerActive === "false" && runtimeEvents.length === 0;
}
async function probePinnedNarrative(client, baseUrl) {
  await client.send("Emulation.setDeviceMetricsOverride", metrics({ width: 1440, height: 900 }));
  await client.send("Page.navigate", { url: baseUrl });
  await client.event("Page.loadEventFired");
  await delay(1_000);
  client.drainEvents();
  const bounds = await client.eval(`(()=>{const article=document.querySelector('[data-verification-narrative]'),spacer=article?.parentElement?.classList.contains('pin-spacer')?article.parentElement:null;if(!article||!spacer)return null;const top=spacer.getBoundingClientRect().top+scrollY;return{start:top-64,distance:spacer.getBoundingClientRect().height-article.getBoundingClientRect().height,spacerPaddingBottom:getComputedStyle(spacer).paddingBottom}})()`);
  if (!bounds) throw new Error("Desktop verification narrative did not create a pin spacer");
  const snapshot = async (label, scrollY) => {
    await client.eval(`new Promise(resolve=>{scrollTo(0,${Math.round(scrollY)});setTimeout(resolve,900)})`);
    return client.eval(`(()=>{const article=document.querySelector('[data-verification-narrative]'),spacer=article?.parentElement?.classList.contains('pin-spacer')?article.parentElement:null,next=document.querySelector('#home-technology-title');return{label:${JSON.stringify(label)},scrollY:window.scrollY,spacerExists:Boolean(spacer),articlePosition:article?getComputedStyle(article).position:null,articleTop:article?+article.getBoundingClientRect().top.toFixed(2):null,pendingOpacity:article?+getComputedStyle(article.querySelector('[data-pending]')).opacity:null,approvedOpacity:article?+getComputedStyle(article.querySelector('[data-approved]')).opacity:null,nextContentTop:next?+next.getBoundingClientRect().top.toFixed(2):null}})()`);
  };
  const states = [];
  states.push(await snapshot("before-pin", Math.max(0, bounds.start - 100)));
  states.push(await snapshot("mid-pin", bounds.start + bounds.distance * 0.5));
  states.push(await snapshot("after-release", bounds.start + bounds.distance + 100));
  states.push(await snapshot("reverse-mid-pin", bounds.start + bounds.distance * 0.5));
  await client.send("Page.navigate", { url: `${baseUrl}/productos` });
  await client.event("Page.loadEventFired");
  states.push({ label: "after-unmount", spacerExists: await client.eval("Boolean(document.querySelector('.pin-spacer'))") });
  await client.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await client.send("Page.navigate", { url: baseUrl });
  await client.event("Page.loadEventFired");
  await delay(500);
  const reducedMotion = await client.eval(`(()=>{const article=document.querySelector('[data-verification-narrative]'),progress=article?.querySelector('[data-progress]');return{spacerExists:Boolean(article?.parentElement?.classList.contains('pin-spacer')),deviceOpacity:article?+getComputedStyle(article.querySelector('[data-device]')).opacity:null,approvedOpacity:article?+getComputedStyle(article.querySelector('[data-approved]')).opacity:null,progressScaleX:progress?new DOMMatrix(getComputedStyle(progress).transform).a:null}})()`);
  await client.send("Emulation.setEmulatedMedia", { features: [] });
  const runtimeEvents = client.drainEvents().filter((event) => event.method === "Runtime.exceptionThrown" || event.method === "Log.entryAdded" || (event.method === "Runtime.consoleAPICalled" && event.params?.type === "error"));
  return { viewport: { width: 1440, height: 900 }, bounds, states, reducedMotion, runtimeEvents };
}
async function probeWindowSize(baseUrl, outputDir, chromePath, tempRoot, viewport, port) { const proc = launch(chromePath, ["--headless=new", "--disable-gpu", `--remote-debugging-port=${port}`, `--user-data-dir=${path.join(tempRoot, `chrome-probe-${fmt(viewport)}`)}`, `--window-size=${viewport.width},${viewport.height}`, "about:blank"], path.join(outputDir, `chrome-probe-${fmt(viewport)}.log`)); let client; try { await waitFor(() => httpJson(`http://127.0.0.1:${port}/json/version`), `Chrome probe on ${port}`); client = await cdp(port); await client.send("Page.enable"); await client.send("Runtime.enable"); await client.send("Page.navigate", { url: baseUrl }); await client.event("Page.loadEventFired"); await delay(1_000); const viewportData = await client.eval("(()=>({innerWidth:window.innerWidth,visualViewportWidth:window.visualViewport?.width??null,devicePixelRatio:window.devicePixelRatio}))()"), cdpPng = parsePngDimensions(Buffer.from((await client.send("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: false })).data, "base64")); return { metrics: viewportData, cdpPngWidth: cdpPng.width }; } finally { await client?.close().catch(() => undefined); await stop(proc); } }
async function cliShot(baseUrl, outputDir, chromePath, tempRoot, viewport) { const screenshotPath = path.join(outputDir, `home-cli-${fmt(viewport)}.png`), proc = launch(chromePath, ["--headless=new", "--disable-gpu", `--user-data-dir=${path.join(tempRoot, `chrome-cli-${fmt(viewport)}`)}`, `--window-size=${viewport.width},${viewport.height}`, `--screenshot=${screenshotPath}`, baseUrl], path.join(outputDir, `chrome-cli-${fmt(viewport)}.log`)); try { await waitFor(() => fs.existsSync(screenshotPath), `CLI screenshot ${fmt(viewport)}`); return { screenshotPath, cliPngWidth: parsePngDimensions(fs.readFileSync(screenshotPath)).width }; } finally { await stop(proc); } }
async function cliProof(baseUrl, outputDir, chromePath, tempRoot, viewport, port) { const probe = await probeWindowSize(baseUrl, outputDir, chromePath, tempRoot, viewport, port), shot = await cliShot(baseUrl, outputDir, chromePath, tempRoot, viewport); return { viewport, screenshotPath: shot.screenshotPath, metrics: probe.metrics, cdpPngWidth: probe.cdpPngWidth, cliPngWidth: shot.cliPngWidth, cropDetected: shot.cliPngWidth !== probe.metrics.innerWidth || shot.cliPngWidth !== probe.cdpPngWidth }; }
const summary = (report) => ["# Homepage Mobile CDP Harness Summary", `Pass: ${report.pass ? "yes" : "no"}`, ...report.productionResults.map((r) => `prod ${fmt(r.viewport)} pass=${r.evaluation.pass} inner=${r.geometry.viewport.innerWidth} visual=${r.geometry.viewport.visualViewportWidth} png=${r.pngDimensions.width} maxRight=${r.evaluation.maxRight}`), ...report.exploreMenuResults.map((r) => `nav ${fmt(r.viewport)} pass=${isExploreMenuPass(r)} panel=${r.geometry.panel?.clientHeight}/${r.geometry.panel?.scrollHeight} cards=${r.geometry.cards.length} focus=${r.geometry.focused.href} hashClose=${!r.hashClosure.menuOpen} runtimeErrors=${r.runtimeEvents.length}`), ...report.mobileMenuResults.map((r) => `mobile-nav ${fmt(r.viewport)} pass=${isMobileMenuPass(r)} panel=${r.geometry.panel?.clientHeight}/${r.geometry.panel?.scrollHeight} cards=${r.geometry.cards.length} focus=${r.geometry.focusedText} escapeClose=${!r.closure.menuOpen} runtimeErrors=${r.runtimeEvents.length}`), report.neuralBackground ? `neural pass=${isNeuralBackgroundPass(report.neuralBackground)} points=${report.neuralBackground.interactive.pointCount} offscreenRafDelta=${report.neuralBackground.offscreenEnd.rafRequests-report.neuralBackground.offscreenStart.rafRequests} resumedDraws=${report.neuralBackground.resumedEnd.drawCount-report.neuralBackground.resumedStart.drawCount} reducedDrawDelta=${report.neuralBackground.reducedEnd.drawCount-report.neuralBackground.reducedStart.drawCount} runtimeErrors=${report.neuralBackground.runtimeEvents.length}` : "neural not-run", report.pinnedNarrative ? `pin distance=${report.pinnedNarrative.bounds.distance} midTop=${report.pinnedNarrative.states[1].articleTop} releasedNextTop=${report.pinnedNarrative.states[2].nextContentTop} reverseTop=${report.pinnedNarrative.states[3].articleTop} reducedSpacer=${report.pinnedNarrative.reducedMotion.spacerExists} runtimeErrors=${report.pinnedNarrative.runtimeEvents.length}` : "pin not-run", ...report.cliProofResults.map((r) => `cli ${fmt(r.viewport)} inner=${r.metrics.innerWidth} visual=${r.metrics.visualViewportWidth} cdpPng=${r.cdpPngWidth} cliPng=${r.cliPngWidth} crop=${r.cropDetected}`), ...report.cleanup.map((line) => `cleanup ${line}`)].join("\n") + "\n";
const isPinnedNarrativePass = ({ bounds, states, reducedMotion, runtimeEvents }) => bounds.distance === 1575 && states[0].articlePosition === "relative" && states[1].articlePosition === "fixed" && Math.abs(states[1].articleTop - 64) < 1 && states[1].pendingOpacity === 1 && states[2].articlePosition === "relative" && states[2].approvedOpacity === 1 && states[2].nextContentTop <= 900 && states[3].articlePosition === "fixed" && Math.abs(states[3].articleTop - 64) < 1 && states[4].spacerExists === false && reducedMotion.spacerExists === false && reducedMotion.deviceOpacity === 1 && reducedMotion.approvedOpacity === 1 && reducedMotion.progressScaleX === 1 && runtimeEvents.length === 0;

async function main() {
  const options = process.argv.slice(2).reduce((acc, arg) => { const [key, value] = arg.split(/=(.*)/s); if (key === "--output-dir") acc.outputDir = value; if (key === "--server-port") acc.serverPort = Number(value); if (key === "--cdp-port") acc.cdpPort = Number(value); return acc; }, { outputDir: OUT, serverPort: 3200, cdpPort: 9222 }), outputDir = resolveOutputDir(options.outputDir), tempRoot = path.join(outputDir, "temp"), baseUrl = `http://127.0.0.1:${options.serverPort}`, report = { startedAt: new Date().toISOString(), baseUrl, outputDir, commands: [], productionResults: [], exploreMenuResults: [], mobileMenuResults: [], cliProofResults: [], cleanup: [], pass: false };
  fs.rmSync(outputDir, { recursive: true, force: true }); fs.mkdirSync(outputDir, { recursive: true }); fs.mkdirSync(tempRoot, { recursive: true }); const chromePath = chrome(), reportPath = path.join(outputDir, "harness-report.json"), summaryPath = path.join(outputDir, "harness-summary.txt"), unbindSignals = wireSignalCleanup(); let server, browser, client;
  try {
    fs.rmSync(path.join(ROOT, ".next"), { recursive: true, force: true }); report.commands.push({ command: "rm -rf .next", exitCode: 0 }); report.commands.push(await run("npm", ["run", "build"], path.join(outputDir, "build.log")));
    server = launch("npm", ["run", "start", "--", "--hostname", "127.0.0.1", "--port", String(options.serverPort)], path.join(outputDir, `next-start-${options.serverPort}.log`)); await waitFor(async () => { if (server.child.exitCode !== null) throw new Error("next start exited early"); return (await fetch(baseUrl, { redirect: "manual" })).ok; }, baseUrl); report.cleanup.push(`next start pid=${server.child.pid}`);
    browser = launch(chromePath, ["--headless=new", "--disable-gpu", `--remote-debugging-port=${options.cdpPort}`, `--user-data-dir=${path.join(tempRoot, "chrome-cdp-profile")}`, "about:blank"], path.join(outputDir, `chrome-cdp-${options.cdpPort}.log`)); await waitFor(() => httpJson(`http://127.0.0.1:${options.cdpPort}/json/version`), `Chrome debugger on ${options.cdpPort}`); client = await cdp(options.cdpPort); await client.send("Page.enable"); await client.send("Runtime.enable"); report.cleanup.push(`chrome cdp pid=${browser.child.pid}`);
    for (const viewport of [...MOBILE_VIEWPORTS, ...REGRESSION_VIEWPORTS]) report.productionResults.push(await prodShot(client, baseUrl, outputDir, viewport));
    for (const viewport of DESKTOP_NAV_VIEWPORTS) report.exploreMenuResults.push(await probeExploreMenu(client, baseUrl, outputDir, viewport));
    for (const viewport of MOBILE_NAV_VIEWPORTS) report.mobileMenuResults.push(await probeMobileMenu(client, baseUrl, outputDir, viewport));
    report.neuralBackground = await probeNeuralBackground(client, baseUrl);
    report.pinnedNarrative = await probePinnedNarrative(client, baseUrl);
    for (const [i, viewport] of MOBILE_VIEWPORTS.filter((v) => v.width === 375 || v.width === 390).entries()) report.cliProofResults.push(await cliProof(baseUrl, outputDir, chromePath, tempRoot, viewport, options.cdpPort + 1 + i));
    report.pass = report.productionResults.every(isProductionViewportPass) && report.exploreMenuResults.every(isExploreMenuPass) && report.mobileMenuResults.every(isMobileMenuPass) && isNeuralBackgroundPass(report.neuralBackground) && isPinnedNarrativePass(report.pinnedNarrative) && report.cliProofResults.every((r) => r.cropDetected && r.metrics.innerWidth !== r.viewport.width && Math.round(r.metrics.visualViewportWidth ?? -1) !== r.viewport.width);
  } catch (error) { report.error = error instanceof Error ? error.message : String(error); } finally {
    unbindSignals(); await client?.close().catch(() => undefined); const browserCleanup = await stop(browser), serverCleanup = await stop(server); fs.rmSync(tempRoot, { recursive: true, force: true }); report.cleanup.push(`chrome terminated=${browserCleanup.terminated} forced=${browserCleanup.forced}`, `server terminated=${serverCleanup.terminated} forced=${serverCleanup.forced}`, `temp removed=${tempRoot}`); fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`); fs.writeFileSync(summaryPath, summary(report), "utf8");
  }
  if (!report.pass) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main().catch((error) => { console.error(error); process.exitCode = 1; });
