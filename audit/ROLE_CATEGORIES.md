# Role-Aware Category Navigation

Date: 2026-09-09. The user approved pushing the accumulated verified reader changes and requested hiding empty categories by role.

## Behavior

- Category buttons are hidden when their role/priority scope has zero questions. A CSS hidden rule prevents the existing grid display from overriding native hiding.
- If a role change or restored view points to an unavailable category, the reader selects All questions before rendering, instead of displaying a stranded empty view.
- Category counts and the navigation heading update together. SDE has eight available categories; All positions has 17.
- Search and Hide reviewed do not change which categories belong to a role. Empty searches still show an explicit empty state, and completed categories retain their progress indicators.
- Opening a question outside the selected role still reveals its category through the existing direct-link behavior.
- Hidden categories are excluded from the mobile keyboard-focus loop.
- This UI change does not alter questions, answers, role membership, question IDs or storage keys. It includes the previously requested 358-question scope reduction and earlier documented audit fixes in the pending release.

## Verification

- `scope-regression.mjs`: 47/47 local browser test groups passed, including 252 role/section/priority combinations with explicit hidden-state, computed-display and count checks.
- Specific tests cover role switching, unavailable saved sections, reload, retained reviewed IDs, All restoration, direct links, search, Hide reviewed and complete mobile keyboard traversal.
- The initial new keyboard test raced the drawer's scheduled opening focus. Waiting for the opening transition before explicitly setting test focus resolved the test timing issue; no additional focus behavior change was inferred from that failure.
- Seven widths, 320/390/720/999/1000/1180/1440, in light and dark themes were checked for both normal question views and the role-filtered sidebar. All 28 layout states reported zero horizontal page overflow. All 14 role-sidebar screenshots were visually inspected.
- No normal-operation page or console errors were recorded. Existing narrow-toolbar clipping remains a known limitation, not a regression introduced by this change.
- `scope-inventory.mjs` and `scope-structure.mjs` verify the full retained inventory and preservation against the pre-reduction baseline. Automated checks do not establish interview frequency or technical correctness.

Local capture URLs in published audit JSON use repository-relative paths instead of exposing workstation paths. This does not change captured question content.

The earlier reports record their status at the time they were written. Push and live verification for this approved release are reported separately after GitHub Pages publishes it.
