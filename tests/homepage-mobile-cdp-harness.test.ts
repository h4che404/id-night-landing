import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import {
  DESKTOP_NAV_VIEWPORTS,
  EVIDENCE_ROOT,
  FIRST_SCROLL_VIEWPORTS,
  MOBILE_VIEWPORTS,
  MOBILE_NAV_VIEWPORTS,
  NEURAL_VIEWPORTS,
  REGRESSION_VIEWPORTS,
  evaluateViewportFindings,
  isHeroPalettePass,
  isProductionViewportPass,
  isExploreMenuPass,
  isFirstScrollPass,
  isMobileMenuPass,
  parsePngDimensions,
  percentile,
  resolveOutputDir,
} from "../scripts/homepage-mobile-cdp-harness.mjs";

test("viewport matrices stay exact", () => {
  assert.deepEqual(MOBILE_VIEWPORTS, [{ width: 320, height: 812 }, { width: 360, height: 800 }, { width: 375, height: 812 }, { width: 390, height: 844 }, { width: 430, height: 932 }]);
  assert.deepEqual(REGRESSION_VIEWPORTS, [{ width: 768, height: 1024 }, { width: 1024, height: 768 }, { width: 1440, height: 900 }, { width: 1920, height: 1080 }]);
  assert.deepEqual(DESKTOP_NAV_VIEWPORTS, [{ width: 1024, height: 640 }, { width: 1280, height: 720 }, { width: 1440, height: 700 }, { width: 1920, height: 700 }]);
  assert.deepEqual(MOBILE_NAV_VIEWPORTS, [{ width: 320, height: 812 }, { width: 390, height: 844 }]);
  assert.deepEqual(NEURAL_VIEWPORTS, [{ width: 320, height: 812 }, { width: 375, height: 812 }, { width: 430, height: 932 }, { width: 1024, height: 768 }, { width: 1440, height: 900 }, { width: 1920, height: 1080 }]);
  assert.deepEqual(FIRST_SCROLL_VIEWPORTS, [{ width: 375, height: 812 }, { width: 1440, height: 900 }]);
});

test("first-scroll runtime gate uses percentiles and tolerates isolated scheduling variance", () => {
  const sample = (responseMs: number, maxFrameGapMs = 18) => ({ responseMs, maxFrameGapMs, frameGaps: [16, maxFrameGapMs], scrollEvents: 2, scrollDelta: 72, canvasDraws: 30, longTasks: [] });
  const result = {
    samples: [sample(10), sample(12), sample(18), sample(20), sample(45)],
    summary: { responseP50Ms: 18, responseP95Ms: 45, frameGapP95Ms: 18, maxFrameGapMs: 18 },
  };

  assert.equal(percentile([20, 10, 40, 30], 0.5), 20);
  assert.equal(percentile([], 0.95), null);
  assert.equal(isFirstScrollPass(result), true);
  assert.equal(isFirstScrollPass({ ...result, summary: { ...result.summary, responseP95Ms: 70 } }), false);
  assert.equal(isFirstScrollPass({ ...result, samples: result.samples.map((entry, index) => index === 0 ? { ...entry, scrollEvents: 0 } : entry) }), false);
  assert.equal(isFirstScrollPass({ ...result, samples: result.samples.map((entry, index) => index === 0 ? { ...entry, longTasks: [{ duration: 55 }] } : entry) }), false);
});

test("evaluateViewportFindings passes when essential bounds fit", () => {
  const result = evaluateViewportFindings(375, [{ id: "hero-title", rects: [{ left: 24, right: 310 }, { left: 24, right: 332 }] }, { id: "primary-cta", rects: [{ left: 24, right: 214 }] }]);
  assert.deepEqual(result, { pass: true, failures: [], maxRight: 332 });
});

test("evaluateViewportFindings reports left, right, and missing failures", () => {
  const result = evaluateViewportFindings(320, [{ id: "hero-description", rects: [{ left: -4, right: 300 }] }, { id: "context-link-privacy", rects: [{ left: 32, right: 336 }] }, { id: "media-card", rects: [], missing: true }]);
  assert.deepEqual(result.failures.map((failure) => failure.id), ["hero-description", "context-link-privacy", "media-card"]); assert.match(result.failures[0]?.reason ?? "", /left edge/); assert.match(result.failures[1]?.reason ?? "", /right edge/); assert.match(result.failures[2]?.reason ?? "", /missing/i);
});

test("parsePngDimensions reads IHDR size and rejects invalid bytes", () => {
  const pngBytes = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x01, 0x77, 0x00, 0x00, 0x03, 0x2c, 0x08, 0x06, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
  assert.deepEqual(parsePngDimensions(pngBytes), { width: 375, height: 812 }); assert.throws(() => parsePngDimensions(Buffer.from("not-a-png")), /Invalid PNG signature/);
});

test("resolveOutputDir accepts only dedicated descendants under the evidence root", () => {
  fs.mkdirSync(EVIDENCE_ROOT, { recursive: true });
  const parent = fs.mkdtempSync(path.join(EVIDENCE_ROOT, "unit-"));
  const outputDir = path.join(parent, "run-artifacts");

  assert.equal(resolveOutputDir(outputDir), path.resolve(outputDir));
});

test("resolveOutputDir rejects empty, root, cwd, ancestor, sibling, and traversal escapes", () => {
  fs.mkdirSync(EVIDENCE_ROOT, { recursive: true });
  const parent = fs.mkdtempSync(path.join(EVIDENCE_ROOT, "unit-"));

  for (const value of ["", "/", process.cwd(), EVIDENCE_ROOT, path.dirname(EVIDENCE_ROOT), path.join(path.dirname(EVIDENCE_ROOT), "escape"), path.join(parent, "..", "..", "escape")]) {
    assert.throws(() => resolveOutputDir(value), /approved evidence root|dedicated descendant|non-empty/);
  }
});

test("isProductionViewportPass requires exact width, height, png size, dpr1, and no dev overlay", () => {
  const base = {
    viewport: { width: 390, height: 844 },
    pngDimensions: { width: 390, height: 844 },
    geometry: { viewport: { innerWidth: 390, innerHeight: 844, devicePixelRatio: 1 }, hasNextDevIndicator: false },
    evaluation: { pass: true },
    palette: { averageLuminance: 0.08, chromaticRatio: 0.08, networkPixelRatio: 0.02, cyanRatio: 0.02, blueRatio: 0.015, violetRatio: 0.018 },
  };

  assert.equal(isProductionViewportPass(base), true);

  for (const candidate of [
    { ...base, geometry: { ...base.geometry, viewport: { ...base.geometry.viewport, innerWidth: 389 } } },
    { ...base, geometry: { ...base.geometry, viewport: { ...base.geometry.viewport, innerHeight: 843 } } },
    { ...base, geometry: { ...base.geometry, viewport: { ...base.geometry.viewport, devicePixelRatio: 2 } } },
    { ...base, pngDimensions: { ...base.pngDimensions, width: 391 } },
    { ...base, pngDimensions: { ...base.pngDimensions, height: 845 } },
    { ...base, geometry: { ...base.geometry, hasNextDevIndicator: true } },
    { ...base, evaluation: { pass: false } },
    { ...base, palette: { ...base.palette, violetRatio: 0 } },
  ]) assert.equal(isProductionViewportPass(candidate), false);
  assert.equal(isProductionViewportPass({ ...base, viewport: { width: 375, height: 844 }, pngDimensions: { width: 375, height: 844 }, geometry: { ...base.geometry, viewport: { ...base.geometry.viewport, innerWidth: 375 } }, palette: null }), false);
  assert.equal(isHeroPalettePass(base.palette), true);
});

test("isExploreMenuPass requires bounded cards, natural focus entry, hash closure, and clean runtime", () => {
  const base = {
    viewport: { width: 1024, height: 640 },
    geometry: {
      expanded: "true",
      panel: { left: 24, right: 1000, top: 72, bottom: 624, overflowY: "auto" },
      cards: [
        { label: "La iniciativa", top: 150 },
        { label: "Tecnología", top: 150 },
        { label: "Soluciones", top: 150 },
        { label: "Recursos", top: 350 },
        { label: "Legal", top: 350 },
      ],
      focused: { href: "/#vision", insidePanel: true },
    },
    hashClosure: { hash: "#problema", menuOpen: false },
    runtimeEvents: [],
  };

  assert.equal(isExploreMenuPass(base), true);
  assert.equal(isExploreMenuPass({ ...base, hashClosure: { hash: "#problema", menuOpen: true } }), false);
  assert.equal(isExploreMenuPass({ ...base, geometry: { ...base.geometry, focused: { href: "/#participar", insidePanel: false } } }), false);
  assert.equal(isExploreMenuPass({ ...base, runtimeEvents: [{ method: "Runtime.exceptionThrown" }] }), false);
});

test("isMobileMenuPass requires compact shared cards, scroll containment, and Escape restoration", () => {
  const base = {
    viewport: { width: 320, height: 812 },
    geometry: {
      expanded: "true",
      panel: { left: 12, right: 308, top: 12, bottom: 800, clientHeight: 788, scrollHeight: 1200, overflowY: "auto" },
      cards: ["La iniciativa", "Tecnología", "Soluciones", "Recursos", "Legal"],
      firstLinks: [{ left: 30, top: 120 }, { left: 160, top: 120 }],
      focusedText: "Cerrar",
      bodyOverflow: "hidden",
    },
    closure: { menuOpen: false, focusedControls: "site-mobile-menu", bodyOverflow: "" },
    runtimeEvents: [],
  };

  assert.equal(isMobileMenuPass(base), true);
  assert.equal(isMobileMenuPass({ ...base, closure: { ...base.closure, menuOpen: true } }), false);
  assert.equal(isMobileMenuPass({ ...base, geometry: { ...base.geometry, firstLinks: [{ left: 30, top: 120 }, { left: 30, top: 160 }] } }), false);
});
