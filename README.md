# Skills Revision Reader

A static, navigable revision interface for 408 questions represented in relevant GeeksforGeeks interview-question collections, organized into 17 resume-technology categories. It includes all 50 numbered questions from the linked GFG GenAI collection and all 61 numbered headings currently present in the GFG DevOps collection, with original concise answers and examples. The DevOps source itself skips number 28, so the reader preserves that source numbering instead of inventing a question.

The deployment also includes `roadmap.html`, a focused NLP and GenAI engineering route for a fresher who already knows DSA/OOP and software development but is starting Python and AI from zero. It uses the verified 19-hour Data Dissection machine-learning course, Data Dissection's complete 13-video NLP playlist, CampusX only for identified NLP implementation and interview-depth gaps, and focused production lessons for LLM application engineering. The roadmap contains 121 independently trackable steps: 118 videos plus three implementation checkpoints.

The public CampusX index was audited across 1,261 standard videos, 67 livestreams, 5 Shorts and 119 playlists. Repeated introductions and duplicate implementations were removed from the focused route. Data Dissection supplies the coherent ML and NLP foundation; CampusX fills text-classification, end-to-end project, NLP-pipeline, richer representation and POS-tagging gaps, then supplies LangChain, RAG, LangGraph, evaluation, FastAPI basics and the MLOps project. Focused supplements cover Python typing/async/testing, provider SDKs, production retrieval, reliability, caching and guardrails. The exact source and content audit is recorded in `VIDEO_CONTENT_AUDIT.md`.

The route filter provides overlapping views. NLP / GenAI Engineer contains 83 essential steps (51 hours 36 minutes) or 109 with interview depth (68 hours 2 minutes). GenAI Engineer contains 72 essential steps (32 hours 6 minutes) or 96 with interview depth (45 hours 37 minutes). MLOps retains its narrower 46-step/14-hour-11-minute fast route and 49-step/15-hour-23-minute depth route. `All tracks` contains 91 essential steps (54 hours 58 minutes) or all 121 steps (73 hours 21 minutes), including alternate foundation material that intentionally overlaps the focused route.

The first visit defaults to `NLP / GenAI Engineer` and `Fast track` instead of exposing every alternative at once. Every step has a stable sequence number, direct source link and independent completion state, while the next-step panel shows the learner's exact route position. Selected video timestamps and ranges remain visible. Search, route and depth filters, collapsible modules, completed-item filtering, remaining-time estimates, responsive layouts, dark mode and browser-saved progress make the page usable as a study path rather than only a link collection. The v4 interface migration preserves completed resource IDs while resetting the old broad route selection to the focused NLP default once.

`live-coding.html` adds a searchable, role-filtered set of 20 broad practical patterns derived from candidate-reported live coding, machine coding, and timed interview tasks in frontend, backend, databases, DevOps, and CS fundamentals. It opens with the 15 recurring patterns; five plausible but role-specific exercises stay behind the `All verified` filter instead of inflating the default study path. `Learn` mode explains only the concepts required for each implementation with inline examples, while `Quick` mode keeps a compact recall checklist and working reference. The page also includes a reusable six-step interview execution method. Interview-experience and GeeksforGeeks sources remain recorded in `live-coding-data.js`; take-home assignments, broad theory dumps, speculative tasks, and DSA problems are excluded.

The reader defaults to 356 high-frequency questions and can switch to the complete question bank. It runs entirely in the browser. Reviewed progress, theme, mode, frequency, position, active section, search, expanded questions, revealed answers, and scroll position are saved automatically in browser storage. Nothing is uploaded, and no database or account is required.

Resume-aligned role filters group the same verified questions for SDE I, frontend/React, backend/Node.js, full-stack JavaScript, MERN, and DevOps positions. Selecting a role does not duplicate or invent questions.

## Source pages

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

Question wording is normalized for quick revision, while answers and examples are concise original explanations of the GFG-listed concepts.
