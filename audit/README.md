# Skills Revision Reader Audit

Historical snapshot: this report describes the 419-question bank before the subsequent user-authorized scope reduction. See [SCOPE_REDUCTION.md](SCOPE_REDUCTION.md) and `scope-regression.json` for the current 358-question bank. The original evidence below is preserved rather than retroactively rewritten.

Date: 2026-09-08. Scope: this reader and its navigation links only.

**Status: confirmed fixes are local, not committed or deployed.** GitHub Pages still serves `2455d65d2a4ee5e7c81885502eda3b14512d7f98`. This is a bounded audit with explicit evidence limits, not a certification that every answer or browser behavior is correct.

## Findings, Ordered by Severity

File/line references below refer to the corrected local source.

| Severity | Finding and reproduction | Expected behavior / cause | Local correction and evidence |
|---|---|---|---|
| High | Interrupt a legacy-state migration while writing progress, view, or schema, then reload. `index.html:9977`. | Converted IDs must not be converted a second time or read under the wrong schema. Independent writes could leave mixed-schema records. | Journal already-converted values before changing records, replay interrupted migrations, cache migrated state in memory, and pause persistence on failure. Four injected write-failure points followed by two reloads pass. |
| Medium | Readable legacy storage with denied writes could leave the current session using unmigrated IDs. Ordinary write failures were silent. `index.html:9936`. | The session must use the migrated values even when disk writes fail, and warn that new changes are not durable. | Memory-backed reads/writes plus a visible storage warning. Read/write denial and legacy fixtures pass. Unavailable storage cannot preserve new changes across reload. |
| Medium | Next/Previous from All or a search replaced the current scope with one section and cleared the query. `index.html:10308`, `index.html:10530`. | Navigation among visible results should preserve the view; explicitly opening a hidden target should reveal it. | Hash navigation preserves a compatible view; explicit jump still reveals hidden questions. All, search, back/forward, hidden reviewed targets and reload pass. |
| Medium | Several answers omitted decisive qualifications or made false universal claims. `index.html:1387`, `index.html:5256`, `index.html:5813`, `index.html:7485`, `genai-questions.js:16`. | Correct the technical claim without rewriting unrelated answers. | 17 answer records corrected; authoritative correction references and before/after inventories retained. See the complete correction table below. |
| Medium | Numeric search `1` returned many unrelated numbers and answer-text matches; empty results said "View complete." `index.html:10182`, `index.html:10185`. | Exact numeric/Q-number queries identify one question; no matches are distinct from completed work. | Exact number matching and separate "No questions" state. Title, answer and topic substring search still work. |
| Medium | Sidebar progress and the category summary used full-bank denominators while a role was selected. `index.html:10233`, `index.html:10259`. | Sidebar role/priority scope must agree with its counts. | Role/priority-scoped totals and bars; all 288 role/section/priority combinations pass. Overall reviewed progress intentionally remains out of 419. |
| Medium | Closed mobile navigation remained in keyboard traversal; resizing an open drawer could retain mobile state. `index.html:1003`, `index.html:10124`. | Hidden navigation should not take focus, and desktop resize should close mobile state. | Visibility-based hiding and media-query cleanup; drawer Tab wrap, Escape focus restoration and resize pass. Settled drawer screenshots show the actual labels. |
| Medium | Failure to load a dynamic question script left a partial reader, with the warning located deep in the document. `index.html:1312`, `index.html:9701`. | Show a prominent failure state and do not mutate saved progress. | Top-level alert, hidden incomplete question list and disabled controls. Aborted script fixture preserves the exact stored legacy record. |
| Low | Q2 retained six OUTPUT/RESULT blocks after their example inputs had been removed. `index.html:1384`. | Answers should not display unexplained outputs. | Removed only the six orphaned blocks, not the question, comparison or quick rule. No separate example sections added. |
| Low | Weak focus outline and an explicitly suppressed role-select outline. `index.html:95`, `index.html:525`. | Keyboard focus must remain visible. | Opaque focus token and inset select outline. Tested keyboard focus; sampled focus/surface contrast is 5.17:1 light and 7.99:1 dark. |
| Low | Preformatted comparison rows wrapped across columns on narrow screens. `index.html:903`. | Keep each comparison row aligned and allow internal scrolling without page overflow. | Preserve preformatted whitespace; horizontal scroll works at all seven widths. |

The initial regression artifact records five failing test groups before functional corrections. Later storage interruption, script-failure and comparison checks expanded the suite. The final suite has **34 passing groups**, not merely the original subset. Test-harness fixes included a selector that accidentally matched `body[data-mode]` and waiting for drawer painting before taking screenshots; these are not application defect claims.

## Inventory and Preservation

| Measure | Baseline local | Baseline live | Final local | Final live |
|---|---:|---:|---:|---:|
| Questions | 419 | 419 | 419 | 419 |
| Primary interview answers | 419 | 419 | 419 | 419 |
| Curated priority | 367 | 367 | 367 | 367 |
| Sections | 17 | 17 | 17 | 17 |
| Missing numbers in 1-419 | 0 | 0 | 0 | 0 |
| Duplicate IDs / exact normalized titles | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 |
| Empty question titles / answer records | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 |

Every entry has exactly one `INTERVIEW ANSWER` part. Some also have a comparison or quick rule; these are not additional questions. No example-labelled section exists. All 419 rendered search records match the visible title, section, number and answer content.

The numeric set is sequential, but DOM order is intentionally not globally numeric: Q409-Q419 are inserted in their relevant existing sections. That order is unchanged. Stable IDs, titles, section membership, priority membership and every role's question IDs are byte-for-byte equal in the extracted records before and after. No question was added, removed or renumbered by this audit.

Runtime assembly was inspected: 50 GenAI, 61 DevOps and 11 core additions are loaded from three local scripts; the remaining content is static HTML. The existing empty GenAI section is a placeholder, not an obsolete hidden answer bank. Historical static OOP/OS/network IDs are transformed at startup by the existing schema logic; this audit does not change that mapping.

Manual near-duplicate review identified retained overlaps, not duplicate canonical IDs: Q293/Q305 (polymorphism), Q338/Q377 (HTTP/HTTPS), Q368/Q386 (Selenium components), Q380/Q392 (DevOps lifecycle). Q131/Q132 and Q253/Q272 overlap in subject but ask different angles. No merge or removal was made. Semantic overlap detection is a judgment, not an exact-match proof that no other overlap exists.

### Role Counts

| Role | All | Curated priority |
|---|---:|---:|
| All positions | 419 | 367 |
| SDE-1 | 163 | 142 |
| Frontend React | 160 | 130 |
| Backend Node | 163 | 132 |
| Full-stack JS | 244 | 198 |
| MERN | 202 | 161 |
| GenAI application | 252 | 211 |
| DevOps engineer | 103 | 98 |

The eight included SDE delivery fundamentals were verified by **question identity**, not array offsets: CI/CD; Git branching; stash; repository; fetch versus pull; merge conflict; Docker architecture; merge versus rebase. Specialized GenAI and the other DevOps questions remain accessible outside the SDE scope. New isolated visitors default to SDE; explicitly saved All and frontend positions survive reload.

Section totals: JavaScript 40; TypeScript 16; HTML/CSS 36; React 38; Next.js 5; Tailwind 2; Node 15; Express 9; APIs 23; SQL 18; DBMS 17; MongoDB 25; GenAI 50; OOP 22; OS 29; Networks 13; DevOps 61.

## Individual Answer Review

**419 read and manually assessed; 0 unread; 17 changed; 402 left unchanged.** The individually authored notes are in [review-notes.txt](review-notes.txt). The complete [question ledger](QUESTION_LEDGER.md) and [machine-readable ledger](question-ledger.json) cover every ID, title, section, roles, answer verdict, rationale, priority evidence and references.

This is not 419 externally proven answers. The 402 unchanged entries received individual manual assessment, but most were not independently checked clause-by-clause against external documentation. Corrected claims have supporting references; two additional current nomenclature/metrics claims were checked against Hugging Face and DORA documentation. Automated inventory tests do not establish technical truth or interview quality.

### All Content Corrections

| Q | Correction | Supporting documentation |
|---|---|---|
| 2 | Scope and const binding versus object mutation; remove orphan outputs. | [MDN var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var), [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) |
| 6 | Include the legacy browser `document.all` exception to the exhaustive falsy list. | [MDN falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) |
| 17 | Explain supplied `this`, array-like apply arguments, and lexical arrow `this`. | [MDN apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply), [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) |
| 19 | Distinguish language semantics from an engine's interpreter/JIT strategy. | [V8 Ignition](https://v8.dev/docs/ignition) |
| 57 | Scoping proximity can break a specificity tie before source order. | [MDN specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity) |
| 70 | Fixed containing-block exception; sticky remains in flow. | [MDN position](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position), [transform](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform) |
| 84 | `em` in font-size is parent-relative rather than relative to its own resulting font-size. | [MDN font-size](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-size) |
| 100 | Missing versus empty effect dependencies, cleanup, and development Strict Mode. | [React useEffect](https://react.dev/reference/react/useEffect) |
| 127 | Static output can be generated on demand and revalidated, not only at build time. | [Next.js ISR](https://nextjs.org/docs/app/guides/incremental-static-regeneration), [glossary](https://nextjs.org/docs/app/glossary) |
| 141 | Node EventEmitter invokes listeners synchronously; event-driven does not imply asynchronous. | [Node events](https://nodejs.org/api/events.html#asynchronous-vs-synchronous) |
| 154 | Parsed body and authentication context require middleware and are not automatically trusted. | [Express API](https://expressjs.com/en/5x/api/application/) |
| 160 | 403 does not imply an authenticated caller. | [RFC 9110 section 15.5.4](https://www.rfc-editor.org/rfc/rfc9110.html#section-15.5.4) |
| 161 | Authorization can apply to anonymous callers. | [OWASP authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) |
| 168 | Accept preferences versus Content-Type description of an actual body. | [RFC 9110 section 12](https://www.rfc-editor.org/rfc/rfc9110.html#section-12) |
| 219 | Cross-shard commit does not imply simultaneous visibility to all outside local reads. | [MongoDB transaction considerations](https://www.mongodb.com/docs/manual/core/transactions-production-consideration/#outside-reads-during-commit) |
| 235 | Only data-bearing voting members acknowledge writes; calculated write majority and timeout caveat. | [MongoDB write concern](https://www.mongodb.com/docs/manual/reference/write-concern/) |
| 241 | Autoencoders need not have a lower-dimensional latent representation. | [Deep Learning, autoencoders chapter](https://www.deeplearningbook.org/contents/autoencoders.html) |

Exact replacement text and per-correction rationale are in [corrections.json](corrections.json). Q160 changes a comparison row rather than its primary answer paragraph; it still counts as one changed answer record. No already-correct answer was rewritten only for style.

### Qualifications and Unresolved Evidence

Seven entries have explicit qualification/evidence-limit verdicts, not silent approval: Q205 (formal normalization nuances), Q234 (formal CAP consistency), Q245 (diffusion/GAN trade-off exceptions), Q264 (current Spaces SDK support not independently resolved), Q269 (dense-RAG assumptions do not cover every retrieval design), Q382 (CBM is not established as a DevOps-specific standard), Q395 (the seven-Cs mnemonic is not a universal standard and its interview prevalence is unverified). Their current introductory answers were retained; see individual notes.

## Interview Relevance and Priority

Role placement is an engineering judgment based on the question's mechanism and stack, not measured occurrence. Two role-matched self-reports were read independently:

- [DE Shaw India new-grad report, May 2025](https://leetcode.com/discuss/post/6637806/): related OOP, OS, DBMS, deadlocks and C++ fundamentals.
- [PW Frontend SDE1 report, September 2025](https://leetcode.com/discuss/post/7241620/): related JavaScript, React and CSS fundamentals.

The ledger links 36 entries to related reported topics. A related topic is not proof that the exact wording was asked. Candidate identity, selection claims and company authenticity were not independently verified. Two reports cannot establish prevalence, percentages, coverage of all companies, or that the remaining 383 entries are never asked. Advertisements and list inclusion were not used as frequency evidence.

All 367 priority labels remain **curated priority**, not measured interview frequency. All 50 GenAI and 61 DevOps entries are marked high in the existing data, which should not be read as universal fresher importance.

Proposals, not silently applied membership changes:

- Q388, Banker's algorithm, is an OS concept currently under DevOps. Consider an OS/SDE placement review separately; the source section and ID were preserved.
- Backend/full-stack views are technology slices and do not contain all general CS fundamentals. Use them together with SDE scope rather than interpreting a role view as a complete interview syllabus.
- SDE scope omits some resume-relevant API/security/backend concepts. Their relevance depends on the actual web-development role; no blanket expansion was imposed.
- Advanced DevOps and GenAI can be resume/project follow-ups but are not universal entry-level SDE requirements. No category was labelled "never asked."

## Browser and Functional Results

Real installed Chrome controlled with Playwright, isolated contexts only. The in-app browser tool could not initialize because of a sandbox metadata error; the standalone browser was used instead. No actual user browser profile or saved data was cleared.

Final [regression.json](regression.json): **34/34 test groups pass; 0 recorded app errors in normal test contexts.** Coverage includes 288 role/section/priority combinations; scoped progress; search by title/answer/topic/exact number; empty results; review/hide reviewed; recall/reveal and reload; All-role persistence; first/last navigation; invalid jump; expand/collapse; 20 rapid review toggles; reset cancel/accept; direct hidden targets; browser history; theme; mobile keyboard trap/escape/resize; all-reviewed state; dynamic escaping; script failure; no-JavaScript notice; eight delivery question identities; comparison scrolling; storage fixtures and timing.

The 288 combinations dispatch real DOM events in the browser rather than physically clicking every filter permutation. Separate tests use actual Playwright clicks, keyboard input and selections. Progress fixtures and destructive reset checks run only in disposable profiles.

Companion links to `roadmap.html` and `live-coding.html` exist and return 200 locally. Their content and full workflows were not audited or rewritten.

### Viewport and Theme Matrix

All captures use 900px height. Each light and dark screenshot below was visually inspected, in addition to DOM width checks.

| Width | Light | Dark | Page overflow | Navigation |
|---:|---|---|---:|---|
| 320 | inspected | inspected | 0px | mobile drawer |
| 390 | inspected | inspected | 0px | mobile drawer |
| 720 | inspected | inspected | 0px | mobile drawer |
| 999 | inspected | inspected | 0px | desktop sidebar |
| 1000 | inspected | inspected | 0px | desktop sidebar |
| 1180 | inspected | inspected | 0px | desktop sidebar |
| 1440 | inspected | inspected | 0px | desktop sidebar |

[Screenshots](screenshots/) additionally include Q397/Q399 long content, both-theme mobile empty/drawer states, 320px comparison content, a completed view and keyboard focus. The drawer captures wait for paint completion; early captures incorrectly showed a blank intermediate frame and were replaced after inspection.

**Remaining UX trade-off:** the existing horizontal toolbar intentionally scrolls and hides its scrollbar. After interacting with controls at its right edge, the role label or another left-edge control can be partially off-screen until the strip is scrolled back. Those controls are reachable, but this is a discoverability limitation and prevents a claim that every control is fully visible at all times. A wrapped toolbar or explicit overflow menu would be a separate layout decision, not applied in this scoped correction pass. Comparison tables also require internal horizontal scrolling at narrow widths.

### Accessibility

`visual-check.json` records 0 unnamed inputs/selects, 0 unnamed buttons, 0 broken ARIA ID references and 0 invalid pressed values. Native details/summary, buttons, labels and selects are retained. Textual progress remains accessible; visual tracks are intentionally aria-hidden, so there is no invalid progressbar ARIA state to repair. Reduced-motion scrolling is `auto`. Keyboard focus, Tab/Shift-Tab drawer wrapping, Escape and `/` search focus were tested.

Sampled theme-token text contrasts range from 4.74:1 upward in light mode and 7.02:1 upward in dark mode; focus/surface is 5.17:1 and 7.99:1. This samples key colors, not every composited pixel, badge, hover or disabled state. Several toolbar controls are 34-40px tall rather than 44px; the checkbox is 15px but has a clickable text label. A comprehensive screen-reader, touch-device and WCAG conformance audit was not performed. There is no basis for claiming universal accessibility compliance.

## Storage, Security and Performance

Storage fixtures: current progress plus saved All; legacy renumbering; malformed view JSON with valid progress; invalid/duplicate IDs; saved frontend query; readable legacy storage with denied writes; all storage disabled; failure separately at journal, progress, view and schema writes; two subsequent reloads for each interrupted migration; zero/100/419 reviewed; and script loading aborted before migration. They pass. Saved expanded/revealed state is included in review/reload checks.

Legacy examples preserved by the existing mapping: `[238,254,313]` becomes `[250,288,347]`, exactly once. Current-schema `[1,238,348,419]` remains unchanged. The new temporary migration journal is removed after a successful migration. Stable progress, view, schema, mode, theme and scope keys are not renamed.

| Reviewed questions | Progress JSON characters | Estimated stored UTF-16 key + value bytes |
|---:|---:|---:|
| 0 | 2 | 558 |
| 100 | 293 | 1,140 |
| 419 | 1,569 | 3,692 |

These are measured string lengths including the test's saved preferences, not exact browser disk allocation or quota accounting. No TTL is implemented. State is origin/browser-profile local, not an authenticated user account or cross-device sync. Clearing site data, private-mode closure, browser eviction, storage denial or changing origin can remove or isolate it. New memory-only changes cannot survive a reload when storage is blocked; the warning says so.

Dynamic answer text is escaped before HTML assembly. An injected `<img ... onerror=...>` answer remained literal text, produced no image element and did not execute. Search input is not inserted as executable markup. Runtime scripts are same-origin; external blank-target links use noreferrer/noopener protection. No credential or private filesystem path was found in the reader runtime files inspected. Audit artifacts contain local test metadata and are not runtime dependencies. This is a source inspection and targeted injection test, not a penetration test or dependency vulnerability certification.

All local/live normal inventory loads recorded 0 console warnings/errors and 0 HTTP errors. Expected aborted-request/storage exceptions in fault-injection contexts are not counted as normal runtime defects. Companion requests returned 200. GenAI's script query version was bumped with its changed answer; dynamic length validation stops incompatible partial banks. No service worker or third-party runtime script was introduced. Arbitrary stale-cache combinations and every historical state format were not exhaustively simulated.

Local synchronous search-handler timing over 50 alternating queries with 419 entries: median **2.40ms**, p95 **3.60ms**, maximum **15.60ms**. This excludes full paint and is not a low-end-device benchmark. Filtering still visits the full bank and updates scoped counts; no architectural optimization was imposed. No duplicate DOM IDs were found in the matrix. Event listeners are registered during one startup, not repeatedly per filter render.

## Local Versus Live

`baseline.json` independently captured identical local/live inventories before changes. `final-comparison.json` captures the final local and live inventories. Live still matches the original baseline exactly; local differs in exactly the 17 documented answer records, plus the functional/CSS corrections described above. IDs, roles, sections and priority membership remain equal.

Read-only GitHub API check (`gh api repos/parihar-harsh/skills-revision-reader/pages/builds/latest`) returned:

```json
{"commit":"2455d65d2a4ee5e7c81885502eda3b14512d7f98","error":{"message":null},"status":"built","updated_at":"2026-09-08T04:15:44Z"}
```

There is **no new commit hash and no deployment of these fixes**. The live post-change inventory was checked, but the final patched functional suite has not passed on live because those patches are not deployed. A full live regression is required after an approved push. Approval was not requested by performing a commit or push.

## Reproduction and Artifacts

The application remains static HTML/JS; no build, package installation or dev server is required. The regression script temporarily starts and closes its own loopback server using the GitHub Pages subdirectory path. Audit dependencies are external to runtime.

```sh
export PLAYWRIGHT_MODULE=/tmp/skills-coverage-browser/node_modules/playwright-core/index.mjs
export CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
node audit/browser.mjs final-comparison
node audit/build-ledger.mjs
node audit/regression.mjs
node audit/visual-check.mjs
node audit/structure.mjs
git diff --check
```

Use an available Playwright module and Chrome executable on other machines. Do not rerun `browser.mjs baseline` over the original evidence. `after.json` is an intermediate inventory; `final-comparison.json` is the final one.

Final syntax validation: five root JavaScript files, five audit modules and two nonempty inline scripts pass. `git diff --check` passes. Tracked runtime diff is limited to `index.html` and `genai-questions.js`; the new `audit/` folder contains only intentional evidence/scripts. No DSA Tracker, resume, interviewer prompt or companion content was changed.

## Coverage Limits

- All entries were manually read, but not every technical clause has independent external verification. Seven qualifications remain explicit; uncertain role changes were proposed, not applied.
- No measured question frequency or universal interview expectations were established.
- Real-browser testing used Chrome, not a cross-browser/physical-device or assistive-technology matrix.
- Horizontal-toolbar discoverability, full touch-target optimization and exhaustive state/zoom/contrast combinations remain outside the confirmed fixes.
- JavaScript-disabled use exposes a partial static bank and a clear notice, not the complete reader.
- Future/unknown schemas, simultaneous multi-tab migration races and all eviction/corruption conditions are not proven safe by the fixtures.
- No post-deployment patched regression can be claimed before approval and deployment.

These limits are part of the result, not an "error-free" conclusion.
