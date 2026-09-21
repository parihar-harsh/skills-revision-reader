# Revision Examples and Category Priority

Local verification: 2026-09-21. Prepared for publication with user approval. The results below describe local checks; publication and live checks are confirmed separately after pushing.

## Changes

- Each of the 358 active questions has one independently authored revision aid: 232 code/query/configuration/protocol examples and 126 text diagrams. The term "code" in test totals includes declarative markup, SQL, shell commands and HTTP examples; it does not imply 232 standalone executable programs.
- Examples appear beneath the existing answer behind a collapsed Code example or Quick diagram button. Original answers, titles, IDs, question-level priority labels and role memberships are unchanged.
- Examples include a short explanation, relevant environment qualifications and a technical reference. They are displayed with textContent, never executed by the reader.
- Opening an example constructs its contents lazily. Recall mode hides the entire answer and example until revealed. Search includes example text even while collapsed.
- Open examples are saved as IDs in the existing view-state record. No progress key or question-ID migration was introduced. Missing example data does not disable the bank or erase solved progress.
- Copy uses the clipboard API; denied or unavailable clipboard access selects the text and gives an explicit manual-copy message. The fallback does not falsely claim a successful copy.
- Category order changes with the selected role and is consistent across sidebar navigation, All questions and Previous/Next links. Question order inside each section is unchanged. Empty role categories remain hidden.

## Priority Rationale

This is curated study order, not a measured interview-frequency ranking. Neither a category's position nor its count establishes how frequently a company asks it.

- SDE: OOP, DBMS, OS, networks, JavaScript, SQL, TypeScript, delivery basics. General CS concepts come before the selected language and delivery tools.
- Frontend: JavaScript, React, HTML/CSS, TypeScript, APIs, Next.js, Tailwind. Core language and UI behavior precede narrower frameworks.
- Backend: JavaScript, Node, APIs, DBMS, SQL, MongoDB, Express, TypeScript. Runtime, request behavior and data correctness precede convenience-framework details.
- Full-stack: JavaScript, React, Node, APIs, DBMS, SQL, HTML/CSS, TypeScript, MongoDB, Express, Next.js, Tailwind.
- MERN: JavaScript, React, Node, APIs, MongoDB, Express, TypeScript, HTML/CSS.
- GenAI application role: practical GenAI/RAG, APIs, Node, JavaScript, MongoDB, TypeScript, Express, React, HTML/CSS. This is the existing application-oriented scope, not a universal ML-engineer curriculum.
- All positions uses a blended fundamentals-first sequence. Stored role, current section and review history are preserved; choosing an order does not force a saved reader back to the first section.

## Evidence

| Check | Result |
| --- | --- |
| Active question/example ID match | 358/358, no missing, extra or duplicate literal example keys |
| Original question titles and answers | All 358 match the pre-change inventory |
| Existing browser regression | 47/47 groups passed |
| Role/category/priority combinations | 252 combinations passed |
| New example browser regression | 13/13 groups passed |
| Exact rendered example content | All 358 disclosures opened and checked |
| Syntax/parse/compiler checks | 184 snippets passed applicable checks |
| Independently executed snippets | 89 completed successfully |
| C++ examples | All 22 compiled with C++20 and ran with exit status 0 |
| Strict TypeScript checks | 13 passed, including standard decorators |
| Responsive matrix | 320, 390, 720, 999, 1000, 1180, 1440; light and dark |
| All examples expanded | All 358 checked at each of those 14 combinations; zero page overflow |
| Example screenshots | 28 captured for code/diagram views; representative desktop/mobile screenshots visually inspected |
| Browser errors | Zero uncaught page errors in successful regression runs |
| New-test failed HTTP responses | Zero |
| Progress storage fixtures | Current, legacy, malformed, invalid IDs, denied writes, unavailable storage and archived IDs passed |
| Final whitespace check | git diff --check passed |

Code is intentionally horizontally scrollable where needed; text diagrams preserve alignment. This avoids shrinking text to fit a narrow viewport. Keyboard focus and scrolling are available on the example surface. Example controls have minimum 44px heights. Copy feedback does not move the copy button to a different row.

The full reader regression recorded 50 search operations with median 2.4 ms and p95 3.1 ms in the test environment. These timings are not a guarantee for other devices. Its zero/partial/full progress fixtures used 602/1184/3736 estimated UTF-16 bytes across stored keys and values, with example panels initially closed. Opening panels adds only their IDs to saved view state, not the example contents.

## Content and Execution Limits

Examples were authored for the individual question, with diagrams used for conceptual flows rather than fictional runnable APIs. References include [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide), [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html), [React](https://react.dev/reference/react), [Node](https://nodejs.org/api/), [PostgreSQL](https://www.postgresql.org/docs/current/sql.html), [MongoDB](https://www.mongodb.com/docs/manual/), the [C++ draft](https://eel.is/c++draft/class.virtual), [OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/), [TCP specification](https://www.rfc-editor.org/rfc/rfc9293.html), [Git](https://git-scm.com/docs), and the relevant AI/framework project documentation linked beside the snippets.

Automated checks do not establish the factual correctness of every explanation. The per-question ledger explicitly distinguishes executed snippets, syntax checks and examples not executed. In particular:

- React/Next/Express snippets were parsed, not all mounted or served in their full framework environments.
- MongoDB, PostgreSQL-specific and SQL Server snippets were not integration-tested against those servers. The 22 portable SQL examples ran in SQLite with foreign-key checking enabled.
- External model downloads, hosted inference, SSH connections and mutating Git workflows were not executed.
- Thirteen TypeScript examples received strict type checking; other framework snippets received parse/transpile checks, not full dependency-aware type checking.
- The link beside an example is a technical reference, not a claim that its documentation contains this exact independently authored example.
- No new measured interview-frequency evidence was collected or claimed.

## Reproduction

Use a temporary test-tool installation, not runtime app dependencies. The snippet script uses the TypeScript 5.9 compiler API; the browser scripts use Playwright Core and Chrome.

```sh
env TYPESCRIPT_MODULE=/tmp/skills-reader-example-tests/node_modules/typescript/lib/typescript.js node audit/examples-check.mjs
env PLAYWRIGHT_MODULE=/tmp/skills-reader-example-tests/node_modules/playwright-core/index.mjs CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' node audit/examples-browser.mjs
env PLAYWRIGHT_MODULE=/tmp/skills-reader-example-tests/node_modules/playwright-core/index.mjs CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' AUDIT_RESULT=examples-full-regression node audit/scope-regression.mjs
git diff --check
```

Artifacts: `examples-code-check.json` includes all 358 per-question records and execution output; `examples-browser.json` records the new interaction/layout tests; `examples-full-regression.json` records the full regression. Screenshots are in `examples-screenshots/` and the refreshed `scope-screenshots/` directory. Isolated browser contexts were used; the user's actual browser storage was not cleared.
