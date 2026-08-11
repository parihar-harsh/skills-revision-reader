# Skills Revision Reader

A static, navigable revision interface for 408 questions represented in relevant GeeksforGeeks interview-question collections, organized into 17 resume-technology categories. It includes all 50 numbered questions from the linked GFG GenAI collection and all 61 numbered headings currently present in the GFG DevOps collection, with original concise answers and examples. The DevOps source itself skips number 28, so the reader preserves that source numbering instead of inventing a question.

The deployment also includes `roadmap.html`, a focused AI / GenAI Engineer route for freshers who already know software-development fundamentals but are starting AI from zero. It contains 42 essential videos (24 hours 42 minutes) and 20 optional deep-dive videos in Hindi or Hinglish, all as direct YouTube links. Nine build checkpoints turn the lessons into a complete product-engineering path across Python services, LLM fundamentals and APIs, LangChain, RAG, agents, FastAPI, evaluation, observability, reliability and security. Research, foundation-model training, data science, computer vision and advanced MLOps are deliberately excluded.

The route includes search, depth and completed-item filters, an automatic next lesson, remaining-time estimates, responsive layouts, dark mode and browser-saved progress. Each checkpoint requires working code or an interview explanation before the learner moves forward, so the page is usable as a self-contained study and practice sequence rather than only a link collection.

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
