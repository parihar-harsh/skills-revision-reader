# Skills Revision Reader

A static revision reader with 358 active questions in 17 sections. The fresher web-SDE scope retains CS and web fundamentals, 30 practical GenAI/RAG questions, and 19 Git/delivery basics. Sixty-one specialist or redundant entries were removed from the active bank using GFG and InterviewBit interview pages to distinguish role-specific material from general preparation. This is a role-scope judgment, not a claim that those questions are never asked. See [scope decisions and recovery archive](audit/SCOPE_REDUCTION.md). Original question IDs and GFG source numbers are preserved, so numbering intentionally has gaps.

The deployment also includes `roadmap.html`, a focused NLP and GenAI engineering route for a fresher who already knows DSA/OOP and software development but is starting Python and AI from zero. It uses the verified 19-hour Data Dissection machine-learning course, Data Dissection's complete 13-video NLP playlist, CampusX only for identified NLP implementation and interview-depth gaps, and focused production lessons for LLM application engineering. The roadmap contains 121 independently trackable steps: 118 videos plus three implementation checkpoints.

The public CampusX index was audited across 1,261 standard videos, 67 livestreams, 5 Shorts and 119 playlists. Repeated introductions and duplicate implementations were removed from the focused route. Data Dissection supplies the coherent ML and NLP foundation; CampusX fills text-classification, end-to-end project, NLP-pipeline, richer representation and POS-tagging gaps, then supplies LangChain, RAG, LangGraph, evaluation, FastAPI basics and the MLOps project. Focused supplements cover Python typing/async/testing, provider SDKs, production retrieval, reliability, caching and guardrails. The exact source and content audit is recorded in `VIDEO_CONTENT_AUDIT.md`.

The route filter provides overlapping views. NLP / GenAI Engineer contains 83 essential steps (51 hours 36 minutes) or 109 with interview depth (68 hours 2 minutes). GenAI Engineer contains 72 essential steps (32 hours 6 minutes) or 96 with interview depth (45 hours 37 minutes). MLOps retains its narrower 46-step/14-hour-11-minute fast route and 49-step/15-hour-23-minute depth route. `All tracks` contains 91 essential steps (54 hours 58 minutes) or all 121 steps (73 hours 21 minutes), including alternate foundation material that intentionally overlaps the focused route.

The first visit defaults to `NLP / GenAI Engineer` and `Fast track` instead of exposing every alternative at once. Every step has a stable sequence number, direct source link and independent completion state, while the next-step panel shows the learner's exact route position. Selected video timestamps and ranges remain visible. Search, route and depth filters, collapsible modules, completed-item filtering, remaining-time estimates, responsive layouts, dark mode and browser-saved progress make the page usable as a study path rather than only a link collection. The v4 interface migration preserves completed resource IDs while resetting the old broad route selection to the focused NLP default once.

`live-coding.html` adds a searchable, role-filtered set of 20 broad practical patterns derived from candidate-reported live coding, machine coding, and timed interview tasks in frontend, backend, databases, DevOps, and CS fundamentals. It opens with the 15 recurring patterns; five plausible but role-specific exercises stay behind the `All verified` filter instead of inflating the default study path. `Learn` mode explains only the concepts required for each implementation with inline examples, while `Quick` mode keeps a compact recall checklist and working reference. The page also includes a reusable six-step interview execution method. Interview-experience and GeeksforGeeks sources remain recorded in `live-coding-data.js`; take-home assignments, broad theory dumps, speculative tasks, and DSA problems are excluded.

New reader visits default to the SDE I / Junior Software Engineer role and priority scope. That role contains 164 questions (143 priority), including the eight Git/CI/CD/Docker fundamentals and Banker's algorithm, now correctly placed in OS. Advanced DevOps is no longer an active role or full specialist section. Other saved role selections, including All positions, are preserved; a saved DevOps role falls back to SDE. The initial section remains JavaScript.

Across All positions there are 306 curated priority questions, or 358 with All questions selected. Priority is study importance, not measured interview frequency. The reader runs entirely in the browser. Reviewed progress, theme, mode, scope, position, section, search, expanded/revealed answers and scroll position are saved in browser storage. Previously reviewed retired IDs remain stored but do not inflate active progress totals. Nothing is uploaded; no database or account is required.

Role filters group the same canonical questions for SDE I, frontend/React, backend/Node.js, full-stack JavaScript, MERN and practical GenAI application preparation. Selecting a role does not duplicate or invent questions.

Category navigation hides sections with no questions in the selected role and priority scope. If the current section becomes unavailable, the reader switches to All questions. Search and Hide reviewed do not remove category navigation; switching roles or choosing All restores the applicable sections. See [role-category regression results](audit/ROLE_CATEGORIES.md).

## Source pages

- [InterviewBit Git questions](https://www.interviewbit.com/git-interview-questions/)
- [InterviewBit CI/CD questions](https://www.interviewbit.com/ci-cd-interview-questions/)
- [InterviewBit Docker questions](https://www.interviewbit.com/docker-interview-questions/)

- [Technical Interview Questions index](https://www.geeksforgeeks.org/gfg-academy/technical-interview-questions/#web-development-technical-interview-questions)
- [JavaScript](https://www.geeksforgeeks.org/javascript/javascript-interview-questions/)
- [TypeScript](https://www.geeksforgeeks.org/typescript/typescript-interview-questions/)
- [HTML](https://www.geeksforgeeks.org/html/html-interview-questions/) and [CSS](https://www.geeksforgeeks.org/css/css-interview-questions/)
- [React](https://www.geeksforgeeks.org/reactjs/react-interview-questions/)
- [Next.js](https://www.geeksforgeeks.org/reactjs/next-js-interview-questions-answers/)
- [Tailwind CSS](https://www.geeksforgeeks.org/css/tailwind-css-interview-questions-and-answers/)
- [Node.js](https://www.geeksforgeeks.org/node-js/node-interview-questions-and-answers/)
- [Express.js](https://www.geeksforgeeks.org/node-js/top-50-express-js-interview-questions-and-answers/)
- [Web APIs](https://www.geeksforgeeks.org/interview-experiences/web-api-interview-questions-and-answers/)
- [SQL](https://www.geeksforgeeks.org/sql/sql-interview-questions/)
- [DBMS](https://www.geeksforgeeks.org/dbms/commonly-asked-dbms-interview-questions/)
- [MongoDB](https://www.geeksforgeeks.org/mongodb/mongodb-interview-questions/)
- [Generative AI and LLMs](https://www.geeksforgeeks.org/artificial-intelligence/generative-ai-interview-question-with-answer/)
- [OOP](https://www.geeksforgeeks.org/interview-prep/oops-interview-questions/)
- [Operating Systems](https://www.geeksforgeeks.org/operating-systems/operating-systems-interview-questions/)
- [Computer Networks](https://www.geeksforgeeks.org/blogs/networking-interview-questions/)
- [DevOps](https://www.geeksforgeeks.org/devops/devops-interview-questions/)
- [Frontend Developer Interview Questions](https://www.geeksforgeeks.org/interview-prep/front-end-developer-interview-questions/)
- [Backend Developer Interview Questions](https://www.geeksforgeeks.org/interview-prep/backend-developer-interview-questions-and-answers/)
- [Full Stack Developer Interview Questions](https://www.geeksforgeeks.org/html/full-stack-developer-interview-questions-and-answers/)

Questions from the role-based collections are included only when they match the resume technologies. Questions about unrelated stacks such as Angular, Vue, Django, PHP, Spring, and Redux are excluded.

Question wording is normalized for revision, while answers are concise original explanations. The 11 additions retain primary technical references in `core-interview-questions.js` and use stable numbers Q409-Q419. Retired question links display an explicit notice instead of pointing to another question. No remaining question was renumbered.
