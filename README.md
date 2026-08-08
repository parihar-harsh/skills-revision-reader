# Skills Revision Reader

A static, navigable revision interface for 248 questions represented on dedicated GeeksforGeeks interview-question pages, organized into 16 resume-technology categories.

The reader defaults to 216 high-frequency questions and can switch to the complete question bank. It runs entirely in the browser. Reviewed progress, frequency filter, display mode, and theme preferences are stored locally in the browser and are not uploaded anywhere.

## Source pages

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

## Regenerate

The deployable `index.html` is generated from the source question bank in the parent directory:

```bash
cd ..
node generate-skills-reader.js
```
