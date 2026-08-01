# Apply Progress: Homepage Mobile Clipping Remediation

## Status
- Result: complete after compression
- Work unit: 1 / single apply work unit
- CSS changed: no
- Homepage source changed: no
- Retained apply-owned footprint: `package.json` 1-line script tweak + `homepage-mobile-cdp-harness.mjs` 84 lines + `homepage-mobile-cdp-harness.test.ts` 28 lines + `tasks.md` 45 lines + this file 49 lines.

## Completed Tasks
- 1.1-1.2 Rewrote `scripts/homepage-mobile-cdp-harness.mjs` as a concise built-ins-only CDP harness and kept evidence external-only.
- 2.1-2.3 Re-ran fresh production CDP sweeps plus CLI false-proof; all exact viewports passed and no selector-level offender was named.
- 3.1-4.2 Left homepage source/CSS untouched, deleted premature repo evidence payloads, updated tasks/progress, and confirmed cleanup.

## TDD + Work Unit Evidence
| Task | Safety Net | RED | GREEN | REFACTOR |
|---|---|---|---|---|
| 1.1 | `npm test` baseline passed before the original harness work | `node --import tsx --test tests/homepage-mobile-cdp-harness.test.ts` originally failed on missing harness module | Targeted test now passes after the rewrite; `npm test` stays green after compression | Harness reduced to a concise built-ins-only implementation and tests reduced without weakening contract checks |
| Runtime | N/A | Existing RED history preserved: CLI screenshots stay invalid unless exact CDP metrics match | `npm run lint`, `npx tsc --noEmit`, `rm -rf .next && npm run build`, and the compressed harness all passed | Removed repo verify/evidence payloads; external report/summary remain the runtime authority |
| Evidence | Value |
|---|---|
| Focused test command | `node --import tsx --test tests/homepage-mobile-cdp-harness.test.ts` → pass (4/4) |
| Runtime harness | `node scripts/homepage-mobile-cdp-harness.mjs --output-dir="/var/folders/pc/fh2zn9b94lz1wsfn_9bwz3hc0000gn/T/opencode/id-night-homepage-evidence/remediation"` → pass; 9 exact CDP viewports + 2 CLI false-proof cases |
| Rollback boundary | `package.json`, `scripts/homepage-mobile-cdp-harness.mjs`, `tests/homepage-mobile-cdp-harness.test.ts`, `openspec/changes/homepage-mobile-clipping-remediation/{tasks.md,apply-progress.md}` |

## Geometry + CLI Proof
- Prod `maxRight / innerWidth / PNG`: `320→296/320/320`, `360→336/360/360`, `375→351/375/375`, `390→366/390/390`, `430→406/430/430`, `768→729/768/768`, `1024→952/1024/1024`, `1440→1231.5/1440/1440`, `1920→1471.5/1920/1920`.
- Every required hero target stayed within `left >= 0` and `right <= viewport width`; no selector-level offender was named, so no CSS/source change was made.
- False CLI proof stayed equivalent: `375→innerWidth 500 / visualViewport 485 / cdpPng 500 / cliPng 375`, `390→500 / 485 / 500 / 390`; the old `--window-size --screenshot` path remains invalid acceptance evidence.

## Commands
- `npx eslint --fix "scripts/homepage-mobile-cdp-harness.mjs" "tests/homepage-mobile-cdp-harness.test.ts"` → pass
- `npm test` → pass (23/23)
- `npm run lint` → pass
- `npx tsc --noEmit` → pass
- `rm -rf .next && npm run build` → pass
- Harness → pass (`/var/folders/pc/fh2zn9b94lz1wsfn_9bwz3hc0000gn/T/opencode/id-night-homepage-evidence/remediation/harness-summary.txt`)

## External Evidence
- Root: `/var/folders/pc/fh2zn9b94lz1wsfn_9bwz3hc0000gn/T/opencode/id-night-homepage-evidence/remediation`
- `harness-report.json sha256:e423cdb6a8615319d7a04a94c88dcafc045cd257196ef2376413c1b9b35b927d`; `harness-summary.txt sha256:e6ccf9f6097a97476a134dcc01f53200154dd15db79dc2a457803e815c0cbb55`.
- `home-prod-375x812.png sha256:df34aaa7cd090a47484357d087431790fc77c0ad69f3a1391dc5d4d91732c25d`; `home-prod-390x844.png sha256:51dd56d53f6cd068468334828c8f9e08542d46198f1b44ac8255affe80f6b23b`.
- `home-cli-375x812.png sha256:0413ae06702224b9ad772bfffff44778a66aec63dbc7b32d30147f9776c037f5`; `home-cli-390x844.png sha256:26699c82f6ccf78b3bb369aebf7f1c926a9b6ae9d05ddc1c25acbb8ea5846a90`.

## Cleanup / Next
- Deleted `verify-report.md`, `evidence/manifest.json`, and `evidence/summary.txt`; no repo evidence payloads remain.
- `next start` and Chrome terminated cleanly; `ps -p 14302,14326` returned only the header row and the temp profile root was removed.
- Issue note: headless Chrome still reports `visualViewportWidth = innerWidth - 15` on desktop/tablet, but geometry and PNG widths match the requested CSS viewport.
- Next: orchestrator-controlled verify only; apply does not claim independent verification.
