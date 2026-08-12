# Skills Revision Reader

A static, navigable revision interface for 408 questions represented in relevant GeeksforGeeks interview-question collections, organized into 17 resume-technology categories. It includes all 50 numbered questions from the linked GFG GenAI collection and all 61 numbered headings currently present in the GFG DevOps collection, with original concise answers and examples. The DevOps source itself skips number 28, so the reader preserves that source numbering instead of inventing a question.

The deployment also includes `roadmap.html`, a focused AI / GenAI Engineer route personalized for a fresher who already knows DSA/OOP, JavaScript/TypeScript, React/Next.js, Node/Express/REST APIs, SQL/NoSQL databases, AWS/Cloudflare, Docker/Kubernetes and Git but is starting Python and AI from zero. It contains 62 essential videos (24 hours 33 minutes) and 8 optional interview-depth or LLMOps videos, for 29 hours 8 minutes across 10 build modules in Full coverage. CampusX and Krish Naik provide 37 of the 70 lessons and 70% of the total watch time; CampusX alone provides 26 lessons and 53% of the watch time. CampusX is the primary source where its verified content directly matches the lesson; Krish Naik and focused specialists remain where their verified content is more complete, current or directly relevant. Content sufficiency is the first selection rule, while runtime is considered only between equally complete lessons. Resources are mostly Hindi/Hinglish, with labeled English fallbacks for high-value lessons that lack an equally complete Hindi alternative. Native-caption coverage, chapter data and live metadata were checked for all 70 videos; selected ranges were compared with lesson claims, and unsupported or misleading source claims are explicitly corrected. Ten checkpoints cover typed and tested Python, minimum hands-on classical ML, transformer-family and decoder-only LLM foundations, model APIs, prompt engineering, production RAG, bounded agents, FastAPI lifecycle and isolated testing, evaluation regression, observability, caching, cost control, reliability, LLMOps and security. HyDE, multi-query expansion, BM25/vector RRF and two-stage reranking are in the core route; query rewriting, Corrective RAG, persistence and MCP are optional depth after LangGraph. Full coverage also adds cloud CI/CD and self-hosted vLLM serving. Research, foundation-model training implementation, data science, computer vision, GPU-kernel work and deep platform administration are deliberately excluded.

The position filter provides four overlapping, prerequisite-safe views: AI Engineer (69 Full-coverage lessons), GenAI Engineer (69), LLMOps Engineer (67), and Agentic AI Engineer (67). Checkpoint text and visible topic tags adapt when a role removes a lesson, so a filtered route never requires hidden work. The AI Engineer view means applied or product-facing AI engineering; it does not claim coverage for research-heavy, computer-vision, data-science or foundation-model-training vacancies. The LLMOps view is an entry-level production foundation, not a substitute for the multi-year cloud, SRE or platform experience required by many senior LLMOps openings.

The route defaults to Full coverage and presents an explicit three-phase sequence across foundations, system building, and production readiness. Every video has a stable lesson number, each module ends with its checkpoint, and the next-lesson panel shows the learner's exact route position. Search, position and Fast track/Full coverage filters, completed-item filtering, remaining-time estimates, responsive layouts, dark mode and browser-saved progress make the page usable as a self-contained study and practice sequence rather than only a link collection. The selected position is also restored from browser storage.

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
