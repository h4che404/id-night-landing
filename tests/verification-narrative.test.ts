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

test("verification narrative uses scoped GSAP cleanup and a static reduced-motion state", () => {
  const source = readProjectFile("components", "home", "VerificationNarrative.tsx");

  assert.match(source, /gsap\.registerPlugin\(useGSAP, ScrollTrigger\)/);
  assert.match(source, /useGSAP\([\s\S]*?\{ scope: container \}/);
  assert.match(source, /prefers-reduced-motion: reduce[\s\S]*?gsap\.set/);
  assert(source.indexOf('media.add("(prefers-reduced-motion: reduce)"') < source.indexOf("const createNarrative"));
  assert.match(source, /return \(\) => media\.revert\(\)/);
  assert.match(source, /scrub: compact \? 0\.35 : 0\.65/);
  assert.doesNotMatch(source, /ScrollSmoother|preventDefault\(|window\.scrollTo|document\.body\.style\.overflow|\bpin\s*:/);
});
