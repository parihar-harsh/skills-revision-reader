# Skills Revision Reader

A static, navigable revision interface for 313 questions represented in relevant GeeksforGeeks interview-question collections, organized into 16 resume-technology categories.

The deployment also includes `roadmap.html`, a focused Applied AI / GenAI Engineer interview route for freshers. It contains 38 essential videos (about 26 hours) and 20 optional deep-dive videos, all as direct YouTube links. The page includes search, depth and completed-item filters, an automatic next lesson, remaining-time estimates, responsive layouts, dark mode, and browser-saved progress.

The reader defaults to 260 high-frequency questions and can switch to the complete question bank. It runs entirely in the browser. Reviewed progress, theme, mode, frequency, active section, search, expanded questions, revealed answers, and scroll position are saved automatically in browser storage. Nothing is uploaded, and no database or account is required.

Resume-aligned role filters group the same verified questions for SDE I, frontend/React, backend/Node.js, full-stack JavaScript, MERN, and junior GenAI application positions. Selecting a role does not duplicate or invent questions.

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
- [Frontend Developer Interview Questions](https://www.geeksforgeeks.org/interview-prep/front-end-developer-interview-questions/)
- [Backend Developer Interview Questions](https://www.geeksforgeeks.org/interview-prep/backend-developer-interview-questions-and-answers/)
- [Full Stack Developer Interview Questions](https://www.geeksforgeeks.org/html/full-stack-developer-interview-questions-and-answers/)

Questions from the role-based collections are included only when they match the resume technologies. Questions about unrelated stacks such as Angular, Vue, Django, PHP, Spring, and Redux are excluded.

Question wording is normalized for quick revision, while answers and examples are concise original explanations of the GFG-listed concepts.

## Regenerate

The deployable `index.html` is generated from the source question bank in the parent directory:

```bash
cd ..
node generate-skills-reader.js
```
