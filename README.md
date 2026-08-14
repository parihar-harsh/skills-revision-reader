# Skills Revision Reader

A static, navigable revision interface for 408 questions represented in relevant GeeksforGeeks interview-question collections, organized into 17 resume-technology categories. It includes all 50 numbered questions from the linked GFG GenAI collection and all 61 numbered headings currently present in the GFG DevOps collection, with original concise answers and examples. The DevOps source itself skips number 28, so the reader preserves that source numbering instead of inventing a question.

The deployment also includes `roadmap.html`, a focused AI Engineer, GenAI Engineer and MLOps Engineer route for a fresher who already knows DSA/OOP, JavaScript/TypeScript, React/Next.js, Node/Express/REST APIs, SQL/NoSQL databases, AWS/Cloudflare, Docker/Kubernetes and Git but is starting Python and AI from zero. CampusX remains the primary source, with 17 focused video supplements for production topics its public playlists do not adequately cover. The route presents all 93 selected videos as independent cards across 10 build modules: 80 essential videos (35 hours 26 minutes) and 13 optional-depth videos (6 hours 30 minutes), for 41 hours 56 minutes in total.

The public CampusX index was audited across 1,261 standard videos, 67 livestreams, 5 Shorts and 119 playlists. Repeated introductions and duplicate implementations were removed. CampusX supplies the Python/ML/LLM foundations, LangChain, RAG, LangGraph, evaluation, FastAPI basics and MLOps project. The focused supplements close the product-engineering gaps: Python typing/async/testing, direct provider SDKs, BM25 plus vector retrieval with RRF and optional HyDE, production FastAPI, retry and circuit-breaker behavior, rate limiting, LLM caching, and layered guardrails. Managed cloud AI platforms, implemented model-drift infrastructure and self-hosted vLLM serving remain explicit MLOps-depth exclusions. The exact source and content audit is recorded in `VIDEO_CONTENT_AUDIT.md`.

The position filter provides three overlapping views. Full coverage contains 90 videos for AI Engineer (40 hours 19 minutes), 77 for GenAI Engineer (37 hours 25 minutes), and 49 for MLOps Engineer (15 hours 23 minutes). Fast track reduces these to 80 videos/35 hours 26 minutes, 66/31 hours 41 minutes, and 46/14 hours 11 minutes respectively. The GenAI view removes Pandas, classification metrics and model-training projects. The MLOps view removes LLM-specific SDK, evaluation, LangChain, RAG, agent, caching and guardrail videos while retaining typed/tested Python, model training, production FastAPI, service resilience, data management and the MLflow/DVC/registry/CI/CD project. The AI Engineer view is applied or product-facing AI engineering; it does not claim research-heavy, computer-vision, data-science or foundation-model-training coverage.

The route defaults to Full coverage and presents an explicit three-phase sequence across foundations, system building and delivery. Every video has its own top-level card, stable sequence number, thumbnail, direct link and completion state, while the next-video panel shows the learner's exact route position. Selected starting timestamps and ranges remain visible, with no grouped video list or playlist navigation. Search, position and Fast track/Full coverage filters, collapsible modules, completed-item filtering, remaining-time estimates, responsive layouts, dark mode and browser-saved progress make the page usable as a study path rather than only a link collection.

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
