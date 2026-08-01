import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import {
  CURSOR_LINK_COLOR,
  CONSTELLATION_BLUE,
  CONSTELLATION_CYAN,
  CONSTELLATION_VIOLET,
  DESKTOP_POINT_MAX,
  DESKTOP_POINT_MIN,
  FRAME_INTERVAL,
  MAX_CURSOR_LINKS,
  MAX_DPR,
  MOBILE_POINT_MAX,
  MOBILE_POINT_MIN,
  PARTICLE_LINK_COLORS,
  PARTICLE_NODE_COLORS,
  POINTER_MAX_OFFSET,
  POINTER_RADIUS,
  createFrameLoop,
  createPoints,
  getCappedDpr,
  getPointCount,
  getPointerOffset,
  getPointerOffsetScale,
  getSquaredDistance,
  shouldAnimate,
} from "../components/home/neural-background";
import { isNeuralBackgroundPass } from "../scripts/homepage-mobile-cdp-harness.mjs";

const componentSource = fs.readFileSync(path.resolve(import.meta.dirname, "../components/home/NeuralBackground.tsx"), "utf8");

test("point density adapts within bounded mobile and desktop budgets", () => {
  assert.deepEqual([MOBILE_POINT_MIN, MOBILE_POINT_MAX], [28, 34]);
  assert.deepEqual([DESKTOP_POINT_MIN, DESKTOP_POINT_MAX], [52, 72]);
  assert.equal(getPointCount(320, 812), 29);
  assert.equal(getPointCount(375, 812), 34);
  assert.equal(getPointCount(430, 932), 34);
  assert.equal(getPointCount(1024, 768), 52);
  assert.equal(getPointCount(1440, 860), 65);
  assert.equal(getPointCount(1920, 1080), 72);
  assert.equal(getPointCount(1, 1), 28);
  assert.equal(getPointCount(10_000, 10_000), 72);
});

test("seeded points are deterministic, normalized, and stable by prefix", () => {
  const first = createPoints(42);
  assert.deepEqual(first, createPoints(42));
  assert.deepEqual(first.slice(0, 18), createPoints(18));
  assert.notDeepEqual(first, createPoints(42, 123));
  assert(first.every((point) => point.x >= 0 && point.x < 1 && point.y >= 0 && point.y < 1));
});

test("pointer attraction is radius-bound, distance-weighted, and clamped", () => {
  const near = getPointerOffset(10, 10, 20, 10, 1);
  const far = getPointerOffset(10, 10, 200, 10, 1);
  assert(near.x > far.x && far.x > 0);
  assert(Math.hypot(near.x, near.y) <= POINTER_MAX_OFFSET);
  assert.deepEqual(getPointerOffset(0, 0, POINTER_RADIUS, 0, 1), { x: 0, y: 0 });
  assert.deepEqual(getPointerOffset(0, 0, 10, 0, 0), { x: 0, y: 0 });
  assert.equal(getPointerOffsetScale(POINTER_RADIUS, 0, 1), 0);
  assert.equal(getSquaredDistance(10, 20, 13, 24), 25);
});

test("links and nodes use three sampled logo tones with brighter bounded cursor links", () => {
  assert.deepEqual([CONSTELLATION_CYAN, CONSTELLATION_BLUE, CONSTELLATION_VIOLET], ["#30d0f0", "#508ff0", "#a050f0"]);
  assert.equal(PARTICLE_LINK_COLORS.length, 3);
  assert.equal(PARTICLE_NODE_COLORS.length, 3);
  assert.equal(MAX_CURSOR_LINKS, 6);
  assert.equal(POINTER_RADIUS, 260);
  assert.match(CURSOR_LINK_COLOR, /0\.86/);
  assert(PARTICLE_LINK_COLORS.every((color) => /0\.3(?:4|2|\))/.test(color)));
  assert.match(componentSource, /context\.strokeStyle = CURSOR_LINK_COLOR/);
  assert.match(componentSource, /nearestIndexes = new Int16Array\(MAX_CURSOR_LINKS\)/);
});

test("hot loops reject squared distances before square roots and avoid pointer offset objects", () => {
  assert.match(componentSource, /if \(distanceSquared > thresholdSquared\) continue;\s+const distance = Math\.sqrt\(distanceSquared\)/);
  assert.match(componentSource, /distanceSquared >= POINTER_RADIUS \* POINTER_RADIUS/);
  assert.match(componentSource, /getPointerOffsetScale\(dx, dy, pointer\.strength\)/);
  assert.doesNotMatch(componentSource, /Math\.hypot/);
});

test("frame loop cancels offscreen work and resumes without duplicate scheduling", () => {
  let nextId = 0;
  let frames = 0;
  const callbacks = new Map<number, FrameRequestCallback>();
  const cancelled: number[] = [];
  const loop = createFrameLoop({
    request(callback) { callbacks.set(++nextId, callback); return nextId; },
    cancel(id) { cancelled.push(id); callbacks.delete(id); },
    onFrame() { frames += 1; },
  });

  loop.setActive(true);
  loop.setActive(true);
  assert.equal(callbacks.size, 1);
  const first = callbacks.entries().next().value as [number, FrameRequestCallback];
  callbacks.delete(first[0]);
  first[1](0);
  assert.equal(frames, 1);
  assert.equal(callbacks.size, 1);
  loop.setActive(false);
  assert.equal(callbacks.size, 0);
  assert.equal(cancelled.length, 1);
  loop.setActive(true);
  loop.setActive(true);
  assert.equal(callbacks.size, 1);
  loop.dispose();
  assert.equal(callbacks.size, 0);
});

test("frame loop limits a high-refresh RAF source to a near-60 draw cadence", () => {
  let nextId = 0;
  let frames = 0;
  const callbacks = new Map<number, FrameRequestCallback>();
  const loop = createFrameLoop({
    request(callback) { callbacks.set(++nextId, callback); return nextId; },
    cancel(id) { callbacks.delete(id); },
    onFrame() { frames += 1; },
  });

  loop.setActive(true);
  for (let tick = 0; tick <= 144; tick += 1) {
    const [id, callback] = callbacks.entries().next().value as [number, FrameRequestCallback];
    callbacks.delete(id);
    callback(tick * (1000 / 144));
  }
  loop.dispose();

  assert(frames >= 59 && frames <= 61, `expected near-60 draws, received ${frames}`);
});

test("animation policy and component contracts cover visibility, reduced motion, and cleanup", () => {
  assert.equal(shouldAnimate(true, false, false), true);
  assert.equal(shouldAnimate(false, false, false), false);
  assert.equal(shouldAnimate(true, true, false), false);
  assert.equal(shouldAnimate(true, false, true), false);
  assert.equal(FRAME_INTERVAL, 1000 / 60);
  assert.match(componentSource, /document\.addEventListener\("visibilitychange", syncAnimation\)/);
  assert.match(componentSource, /document\.removeEventListener\("visibilitychange", syncAnimation\)/);
  assert.match(componentSource, /loop\.dispose\(\)/);
  assert.match(componentSource, /resizeObserver\.disconnect\(\)/);
  assert.match(componentSource, /intersectionObserver\.disconnect\(\)/);
  assert.match(componentSource, /if \(!reduceMotion\) \{[\s\S]*pointerTarget\.addEventListener/);
  assert.doesNotMatch(componentSource, /window\.addEventListener\("pointermove"/);
});

test("DPR is capped and the canvas remains decorative and non-blocking", () => {
  assert.equal(MAX_DPR, 1.5);
  assert.equal(getCappedDpr(1), 1);
  assert.equal(getCappedDpr(2), 1.5);
  assert.equal(getCappedDpr(0), 1);
  assert.match(componentSource, /aria-hidden="true"/);
  assert.match(componentSource, /pointer-events-none/);
});

test("runtime evidence requires stopped offscreen and reduced-motion counters plus one bounded resumed loop", () => {
  const snapshot = (overrides = {}) => ({ sampledAt: 100, pointCount: 65, drawCount: 20, rafRequests: 40, rafActive: "true", pointerActive: "true", dpr: 1.5, ...overrides });
  const result = {
    densitySamples: [
      { viewport: { width: 320, height: 812 }, pointCount: 28 },
      { viewport: { width: 375, height: 812 }, pointCount: 32 },
      { viewport: { width: 430, height: 932 }, pointCount: 34 },
      { viewport: { width: 1024, height: 768 }, pointCount: 52 },
      { viewport: { width: 1440, height: 900 }, pointCount: 65 },
      { viewport: { width: 1920, height: 1080 }, pointCount: 72 },
    ],
    visibleSamples: [
      { cadence: 59.2, drawDelta: 71, start: snapshot(), end: snapshot({ sampledAt: 1_300 }) },
      { cadence: 58.4, drawDelta: 70, start: snapshot(), end: snapshot({ sampledAt: 1_300 }) },
    ],
    interactive: snapshot(),
    offscreenStart: snapshot({ drawCount: 25, rafRequests: 50, rafActive: "false" }),
    offscreenEnd: snapshot({ drawCount: 25, rafRequests: 50, rafActive: "false" }),
    resumedStart: snapshot({ drawCount: 30, rafRequests: 60 }),
    resumedEnd: snapshot({ drawCount: 50, rafRequests: 108 }),
    reducedStart: snapshot({ drawCount: 2, rafRequests: 0, rafActive: "false", pointerActive: "false" }),
    reducedEnd: snapshot({ drawCount: 2, rafRequests: 0, rafActive: "false", pointerActive: "false" }),
    runtimeEvents: [],
  };

  assert.equal(isNeuralBackgroundPass(result), true);
  assert.equal(isNeuralBackgroundPass({ ...result, interactive: { ...result.interactive, pointCount: 51 } }), false);
  assert.equal(isNeuralBackgroundPass({ ...result, visibleSamples: result.visibleSamples.map((sample, index) => index ? sample : { ...sample, cadence: 40 }) }), false);
  assert.equal(isNeuralBackgroundPass({ ...result, offscreenEnd: { ...result.offscreenEnd, rafRequests: 51 } }), false);
  assert.equal(isNeuralBackgroundPass({ ...result, resumedEnd: { ...result.resumedEnd, drawCount: 70 } }), false);
  assert.equal(isNeuralBackgroundPass({ ...result, reducedEnd: { ...result.reducedEnd, drawCount: 3 } }), false);
});
