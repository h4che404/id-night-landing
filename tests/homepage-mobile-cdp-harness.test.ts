import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import {
  EVIDENCE_ROOT,
  MOBILE_VIEWPORTS,
  REGRESSION_VIEWPORTS,
  evaluateViewportFindings,
  isProductionViewportPass,
  parsePngDimensions,
  resolveOutputDir,
} from "../scripts/homepage-mobile-cdp-harness.mjs";

test("viewport matrices stay exact", () => {
  assert.deepEqual(MOBILE_VIEWPORTS, [{ width: 320, height: 812 }, { width: 360, height: 800 }, { width: 375, height: 812 }, { width: 390, height: 844 }, { width: 430, height: 932 }]);
  assert.deepEqual(REGRESSION_VIEWPORTS, [{ width: 768, height: 1024 }, { width: 1024, height: 768 }, { width: 1440, height: 900 }, { width: 1920, height: 1080 }]);
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
  ]) assert.equal(isProductionViewportPass(candidate), false);
});
