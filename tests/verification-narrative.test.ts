import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");
const readProjectFile = (...segments: string[]) => fs.readFileSync(path.join(PROJECT_ROOT, ...segments), "utf8");

test("verification narrative bridges the current stage and technology explanation", () => {
  const homePageSource = readProjectFile("components", "home", "HomePage.tsx");
  const sectionsSource = readProjectFile("components", "home", "sections.tsx");

  assert(homePageSource.indexOf("<CurrentStageSection />") < homePageSource.indexOf("<TechnologySection />"));
  assert.match(sectionsSource, /function TechnologySection[\s\S]*?<VerificationNarrative \/>[\s\S]*?home-technology-title/);
});

test("verification narrative states its conceptual and consent-based limits", () => {
  const source = readProjectFile("components", "home", "VerificationNarrative.tsx");

  for (const copy of [
    "Demostración conceptual",
    "Verificar con consentimiento",
    "No representa reconocimiento autónomo ni garantiza identidad o seguridad",
    "tecnología en desarrollo",
  ]) assert(source.includes(copy), `Missing narrative safeguard: ${copy}`);
});

test("verification narrative pins desktop scrolling with a bounded viewport-relative distance", () => {
  const source = readProjectFile("components", "home", "VerificationNarrative.tsx");

  assert.match(source, /gsap\.registerPlugin\(useGSAP, ScrollTrigger\)/);
  assert.match(source, /const NAVBAR_HEIGHT = 64/);
  assert.match(source, /window\.innerHeight \* 1\.75/);
  assert.match(source, /gsap\.utils\.clamp\(1200, 2000,/);
  assert.match(source, /start: compact \? "top 88%" : `top \$\{NAVBAR_HEIGHT\}px`/);
  assert.match(source, /end: compact \? "bottom 18%" : \(\) => `\+=\$\{DESKTOP_SCROLL_DISTANCE\(\)\}`/);
  assert.match(source, /scrub: compact \? 0\.35 : 0\.65/);
  assert.match(source, /pin: !compact/);
  assert.match(source, /pinSpacing: !compact/);
  assert.match(source, /anticipatePin: compact \? 0 : 1/);
  assert.match(source, /invalidateOnRefresh: true/);
});

test("verification narrative keeps mobile non-pinned and reduced motion static", () => {
  const source = readProjectFile("components", "home", "VerificationNarrative.tsx");

  assert.match(source, /max-width: 1023px[\s\S]*?createNarrative\(true\)/);
  assert.match(source, /Small viewports reveal the same story without pinning/);
  assert.doesNotMatch(source, /prefers-reduced-motion: reduce[\s\S]*?(?:gsap\.timeline|ScrollTrigger\.create|createNarrative)/);
  assert.match(source, /data-device[^>]*opacity-0 motion-reduce:opacity-100/);
  assert.match(source, /data-progress[^>]*scale-x-0 motion-reduce:scale-x-100/);
  assert.match(source, /data-approved[^>]*opacity-0 motion-reduce:opacity-100/);
});

test("verification narrative shows pending status, scopes cleanup, and preserves native scrolling", () => {
  const source = readProjectFile("components", "home", "VerificationNarrative.tsx");
  const harness = readProjectFile("scripts", "homepage-mobile-cdp-harness.mjs");

  assert.match(source, /useGSAP\([\s\S]*?\{ scope: container \}/);
  assert.match(source, /fromTo\("\[data-pending\]"[\s\S]*?autoAlpha: 1/);
  assert.match(source, /to\("\[data-pending\]", \{ autoAlpha: 0/);
  assert.match(source, /return \(\) => media\.revert\(\)/);
  assert.match(source, /<div aria-hidden="true" className="relative mx-auto flex/);
  assert.doesNotMatch(source, /ScrollSmoother|preventDefault\(|addEventListener\(["'](?:wheel|touch)|window\.scrollTo|document\.body\.style\.overflow/);
  assert.match(harness, /before-pin[\s\S]*?mid-pin[\s\S]*?after-release[\s\S]*?reverse-mid-pin[\s\S]*?after-unmount/);
  assert.match(harness, /prefers-reduced-motion[\s\S]*?reducedMotion[\s\S]*?isPinnedNarrativePass/);
  assert.match(harness, /Runtime\.exceptionThrown[\s\S]*?Runtime\.consoleAPICalled/);
});
