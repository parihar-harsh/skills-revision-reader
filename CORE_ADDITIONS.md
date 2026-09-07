# Focused Interview Additions

Reviewed 2026-09-07. Scope: 11 missing fundamentals for the existing SDE/C++ and JavaScript/TypeScript preparation routes. Existing Q1-Q408 and all Live Coding exercises remain unchanged. Q409-Q419 are appended within their skill sections without renumbering existing questions.

Priority means curated study importance. Candidate reports establish that a topic was asked; they do not establish a population-wide frequency or a guarantee about a particular employer. Official technical references verify the answers, not interview occurrence. No frequency percentages have been assigned.

| ID | Addition | Why it is distinct and worth adding |
|---|---|---|
| Q409 | JavaScript prototype chain | Object lookup and inheritance were missing from the language section. Generic OOP definitions do not explain JavaScript's mechanism. |
| Q410 | Type versus interface | The existing type-alias definition does not explain declaration merging or the difference in what each can represent. |
| Q411 | Generics | Preserving input/output type relationships is central to typed functions and APIs; it was absent from the 13-question TypeScript section. |
| Q412 | Unknown versus any, with narrowing | Existing answers name unknown but do not explain safe operations, type guards, or why assertions do not validate runtime input. |
| Q413 | React state batching and functional updaters | The useState definition does not explain state snapshots or the effect of successive updates. This supports counter and state-management follow-ups. |
| Q414 | Clustered versus nonclustered indexes | The basic SQL-index answer does not explain table storage versus a separate lookup structure. The answer explicitly scopes implementation details to SQL Server. |
| Q415 | Isolation levels and read anomalies | Naming ACID does not explain what concurrent transactions can observe. The answer distinguishes SQL minimum guarantees from stronger engine behavior. |
| Q416 | Virtual and pure virtual functions | Generic runtime-polymorphism and abstract-class definitions do not explain how C++ declares and overrides these functions. |
| Q417 | Destructors and virtual destruction | Object cleanup and deletion through a base pointer were absent. This directly complements the existing constructor question. |
| Q418 | Diamond problem and virtual inheritance | The existing inheritance definition does not cover duplicate base subobjects or ambiguous overrides. |
| Q419 | Mutex versus semaphore | The Live Coding producer-consumer task uses both; this adds the missing ownership-versus-permits comparison needed to explain the implementation. |

## Interview Evidence

- [D. E. Shaw, new graduate, May 2025](https://leetcode.com/discuss/post/6637806/): reported virtual functions, runtime polymorphism, object lifetime/memory, and the diamond problem. Supports Q416-Q418's topic area; the virtual-destructor follow-up is additionally supported below.
- [C++ candidate interview report](https://www.reddit.com/r/cpp/comments/17r95li/questions_from_one_job_interview_on_c_developer/): includes why virtual destructors are needed. This is C++-specific evidence, not a claim about every SDE role.
- [Blinkit SDE1 fresher report](https://leetcode.com/discuss/post/5156809/Blinkit-SDE1-Backend-Fresher-interview-experience/): explicitly asks mutex versus semaphore.
- [D. E. Shaw, 1.5 years of experience](https://leetcode.com/discuss/post/6754544/de-shaw-interview-experience-member-tech-0oa7/): reports isolation, indexing internals, and query questions. This is early-career evidence rather than a fresher-only sample.
- [SQL interviewers' discussion](https://www.reddit.com/r/SQLServer/comments/18c88ct/what_are_some_good_sql_server_questions_to_ask_in/): includes clustered versus nonclustered indexing. Engine-specific context is retained in Q414.
- [Livspace Frontend SDE1 report](https://leetcode.com/discuss/post/2072679/livspace-interview-questions-front-end-sde-1-my-journery-from-76lpa-to-29-lpa/): includes prototype-based implementation tasks. Supports the need to understand the prototype mechanism in Q409.
- [TypeScript interview preparation discussion](https://www.reddit.com/r/typescript/comments/1ulvb6x/pairing_for_typescript_backend_interview/): recommends generics and interface/type distinctions. This is practitioner preparation advice, not a confirmed transcript or measured frequency. Q412 is a related core safety prerequisite verified in the handbook.
- [Physics Wallah Frontend SDE1 report](https://leetcode.com/discuss/post/7241620/): reports a stateful counter and custom-hook follow-up. Q413 prepares the state-update mechanism underlying that exercise; the report does not claim to quote Q413 verbatim.

## Technical References

Every addition has its own `references` array in `core-interview-questions.js`. Sources are MDN, the TypeScript handbook, React documentation, Microsoft SQL Server documentation, PostgreSQL's description of SQL isolation guarantees, the public C++ working draft, and the C++ Core Guidelines. Answers are original concise explanations; no separate example sections are added.

## Selection Boundary

No new GenAI or DevOps questions, no advanced TypeScript type puzzles, and no new exercise list. Existing debounce/throttle, Promise implementation, React request cancellation, and producer-consumer exercises are retained without duplicates. Role membership follows the existing skill routes; C++ questions are included in SDE I, and the synchronization comparison also appears in DevOps.

## Local Verification

- 419 rendered entries, unique numbers covering Q1-Q419, 367 priority entries. All 408 original question titles, answers, section assignments, priority flags, and search text match the pre-change rendered bank.
- 288 role/section/priority combinations matched expected membership. Every new question passed search, number jump, and reviewed-state interaction checks.
- Current and pre-renumbering legacy reviewed-progress fixtures survived reload. Recall/reveal, hide-reviewed, and revealing a filtered question by number passed.
- No horizontal overflow or duplicate DOM IDs at 320, 390, 720, 999, 1000, 1180, or 1440 pixels in either theme. Mobile and desktop screenshots inspected. No JavaScript page or application console errors.
- Data-file and inline-script syntax checks and `git diff --check` passed. These structural tests do not establish interview frequency or prove answer correctness; technical sources were reviewed separately.
