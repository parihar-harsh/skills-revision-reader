(function () {
  const lines = (...items) => items.join("\n");

  window.liveCodingQuestions = [
    {
      title: "Implement a responsive frontend layout from a provided design",
      category: "Frontend",
      roles: ["frontend-react", "full-stack-js", "mern-stack"],
      language: "CSS",
      solution: lines(
        ".layout {",
        "  display: grid;",
        "  grid-template-columns: 240px minmax(0, 1fr);",
        "  gap: 16px;",
        "}",
        ".layout img { max-width: 100%; height: auto; }",
        "@media (max-width: 768px) {",
        "  .layout { grid-template-columns: 1fr; }",
        "}"
      ),
      solutionUrl: "https://www.geeksforgeeks.org/css/complete-guide-to-flexbox/",
      evidenceUrls: [
        "https://www.geeksforgeeks.org/interview-experiences/paytm-payments-bank-interview-experience-for-sde-front-end/"
      ]
    },
    {
      title: "Build an interactive UI component with tabs, forms, and local state",
      category: "Frontend",
      roles: ["frontend-react", "full-stack-js", "mern-stack"],
      language: "React",
      solution: lines(
        "function ProfileTabs() {",
        "  const [tab, setTab] = useState('profile');",
        "  const [name, setName] = useState('');",
        "  return <>",
        "    <nav>{['profile', 'settings'].map(value =>",
        "      <button onClick={() => setTab(value)} aria-selected={tab === value}>{value}</button>",
        "    )}</nav>",
        "    {tab === 'profile' && <input value={name} onChange={e => setName(e.target.value)} />}",
        "    {tab === 'settings' && <p>Settings panel</p>}",
        "  </>;",
        "}"
      ),
      solutionUrl: "https://www.geeksforgeeks.org/bootstrap/how-to-create-a-card-with-tabs-content-in-bootstrap-5/",
      evidenceUrls: [
        "https://www.geeksforgeeks.org/interview-experiences/paytm-payments-bank-interview-experience-for-sde-front-end/",
        "https://www.geeksforgeeks.org/interview-experiences/factwise-interview-experience-frontend-engineer-intern/"
      ]
    },
    {
      title: "Build a small stateful React application with user interactions",
      category: "Frontend",
      roles: ["frontend-react", "full-stack-js", "mern-stack"],
      language: "React",
      solution: lines(
        "const wins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];",
        "const getWinner = board => {",
        "  const line = wins.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]);",
        "  return line ? board[line[0]] : null;",
        "};",
        "function Board() {",
        "  const [cells, setCells] = useState(Array(9).fill(null));",
        "  const [xTurn, setXTurn] = useState(true);",
        "  function play(index) {",
        "    if (cells[index] || getWinner(cells)) return;",
        "    const next = [...cells];",
        "    next[index] = xTurn ? 'X' : 'O';",
        "    setCells(next);",
        "    setXTurn(value => !value);",
        "  }",
        "  return cells.map((value, i) => <button key={i} onClick={() => play(i)}>{value}</button>);",
        "}"
      ),
      solutionUrl: "https://www.geeksforgeeks.org/reactjs/how-to-build-a-tic-tac-toe-game-using-react-hooks/",
      evidenceUrls: [
        "https://www.geeksforgeeks.org/interview-experiences/factwise-interview-experience-frontend-engineer-intern/",
        "https://www.geeksforgeeks.org/interview-experiences/josh-technology-group-frontend-developer-sde-intern-interview-experience-campus-drive/"
      ]
    },
    {
      title: "Build a client-side CRUD application with browser persistence",
      category: "Frontend",
      roles: ["frontend-react", "full-stack-js", "mern-stack"],
      language: "JavaScript",
      solution: lines(
        "let items = JSON.parse(localStorage.getItem('items') ?? '[]');",
        "const save = () => localStorage.setItem('items', JSON.stringify(items));",
        "function add(text) { items.push({ id: crypto.randomUUID(), text }); save(); }",
        "function update(id, text) {",
        "  items = items.map(item => item.id === id ? { ...item, text } : item);",
        "  save();",
        "}",
        "function remove(id) { items = items.filter(item => item.id !== id); save(); }"
      ),
      solutionUrl: "https://www.geeksforgeeks.org/javascript/javascript-project-on-todo-list/",
      evidenceUrls: [
        "https://www.geeksforgeeks.org/interview-experiences/frontend-developer-interview-experience-at-jtg/"
      ]
    },
    {
      title: "Build search or typeahead behaviour with debounce and throttle",
      category: "Frontend",
      roles: ["frontend-react", "full-stack-js", "mern-stack"],
      language: "JavaScript",
      solution: lines(
        "function debounce(fn, delay) {",
        "  let timer;",
        "  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };",
        "}",
        "function throttle(fn, delay) {",
        "  let waiting = false;",
        "  return (...args) => {",
        "    if (waiting) return;",
        "    fn(...args); waiting = true;",
        "    setTimeout(() => { waiting = false; }, delay);",
        "  };",
        "}"
      ),
      solutionUrl: "https://www.geeksforgeeks.org/javascript/javascript-auto-complete-suggestion-feature/",
      evidenceUrls: [
        "https://www.geeksforgeeks.org/interview-experiences/interviewbit-interview-experience-for-full-stack-developer/",
        "https://www.geeksforgeeks.org/interview-experiences/uniphore-interview-experience-for-software-engineer-frontend/"
      ]
    },
    {
      title: "Build a data-driven React interface with API fetching, caching, lazy loading, and search",
      category: "Frontend",
      roles: ["frontend-react", "full-stack-js", "mern-stack"],
      language: "React",
      solution: lines(
        "const cache = new Map();",
        "const ProductDetails = lazy(() => import('./ProductDetails'));",
        "function Products({ query }) {",
        "  const [items, setItems] = useState([]);",
        "  useEffect(() => {",
        "    const url = `/api/products?q=${encodeURIComponent(query)}`;",
        "    if (cache.has(url)) return setItems(cache.get(url));",
        "    const controller = new AbortController();",
        "    fetch(url, { signal: controller.signal }).then(r => { if (!r.ok) throw Error(r.status); return r.json(); })",
        "      .then(data => { cache.set(url, data); setItems(data); }).catch(e => { if (e.name !== 'AbortError') console.error(e); });",
        "    return () => controller.abort();",
        "  }, [query]);",
        "  return <Suspense fallback={'Loading...'}><ProductDetails items={items} /></Suspense>;",
        "}"
      ),
      solutionUrl: "https://www.geeksforgeeks.org/reactjs/how-to-fetch-data-from-an-api-in-reactjs/",
      evidenceUrls: [
        "https://www.geeksforgeeks.org/interview-experiences/uniphore-interview-experience-for-software-engineer-frontend/",
        "https://www.geeksforgeeks.org/interview-experiences/infosys-interview-experience-for-react-frontend-developer/"
      ]
    },
    {
      title: "Implement native JavaScript behaviour or a utility polyfill",
      category: "Frontend",
      roles: ["frontend-react", "full-stack-js", "mern-stack"],
      language: "JavaScript",
      solution: lines(
        "function promiseAll(iterable) {",
        "  return new Promise((resolve, reject) => {",
        "    const values = Array.from(iterable), results = Array(values.length);",
        "    if (values.length === 0) return resolve([]);",
        "    let completed = 0;",
        "    values.forEach((value, index) => Promise.resolve(value).then(result => {",
        "      results[index] = result;",
        "      if (++completed === values.length) resolve(results);",
        "    }, reject));",
        "  });",
        "}"
      ),
      solutionUrl: "https://www.geeksforgeeks.org/javascript/implement-polyfill-for-promise-all-method-in-javascript/",
      evidenceUrls: [
        "https://www.geeksforgeeks.org/interview-experiences/pharmeasy-interview-experience-for-sse-ui-frontend/",
        "https://www.geeksforgeeks.org/interview-experiences/zomato-interview-experience-for-sde-intern/",
        "https://www.geeksforgeeks.org/interview-experiences/groww-interview-experience-for-sde-intern-web-off-campus/"
      ]
    },
    {
      title: "Implement a REST API endpoint using Express.js",
      category: "Backend",
      roles: ["sde-1", "backend-node", "full-stack-js", "mern-stack"],
      language: "Express.js",
      solution: lines(
        "app.post('/api/users', async (req, res, next) => {",
        "  try {",
        "    const { name, email } = req.body;",
        "    if (!name || !email) return res.status(400).json({ error: 'name and email are required' });",
        "    const user = await User.create({ name, email });",
        "    return res.status(201).json(user);",
        "  } catch (error) { next(error); }",
        "});",
        "app.use((error, req, res, next) => res.status(500).json({ error: 'Internal server error' }));"
      ),
      solutionUrl: "https://www.geeksforgeeks.org/typescript/how-to-use-typescript-to-build-node-js-api-with-express/",
      evidenceUrls: [
        "https://www.geeksforgeeks.org/interview-experiences/altran-interview-experience-for-full-stack-developer/",
        "https://www.geeksforgeeks.org/interview-experiences/sca-technologies-interview-experience-for-ase/"
      ]
    },
    {
      title: "Implement backend request-control logic such as API rate limiting",
      category: "Backend",
      roles: ["sde-1", "backend-node", "full-stack-js", "mern-stack"],
      language: "Express.js",
      solution: lines(
        "import rateLimit from 'express-rate-limit';",
        "const apiLimiter = rateLimit({",
        "  windowMs: 15 * 60 * 1000,",
        "  limit: 100,",
        "  standardHeaders: true,",
        "  legacyHeaders: false",
        "});",
        "app.use('/api', apiLimiter);"
      ),
      solutionUrl: "https://www.geeksforgeeks.org/node-js/how-to-integrate-express-rate-limit-in-node-js/",
      evidenceUrls: [
        "https://www.geeksforgeeks.org/interview-experiences/clearfeed-interview-experience/"
      ]
    },
    {
      title: "Build a real-time server-to-client streaming service",
      category: "Backend",
      roles: ["sde-1", "backend-node", "full-stack-js"],
      language: "Node.js + WebSocket",
      solution: lines(
        "const { WebSocketServer, WebSocket } = require('ws');",
        "const wss = new WebSocketServer({ port: 8080 });",
        "function broadcast(data) {",
        "  for (const client of wss.clients) {",
        "    if (client.readyState === WebSocket.OPEN) client.send(data);",
        "  }",
        "}",
        "wss.on('connection', socket => {",
        "  socket.send(JSON.stringify({ type: 'connected' }));",
        "  socket.on('message', message => broadcast(message.toString()));",
        "});"
      ),
      solutionUrl: "https://www.geeksforgeeks.org/node-js/web-socket-in-node-js/",
      evidenceUrls: [
        "https://www.geeksforgeeks.org/campus-experiences/browserstack-oncampus-placement-drive/",
        "https://www.geeksforgeeks.org/interview-experiences/browserstack-interview-experience-for-freshers/"
      ]
    },
    {
      title: "Design and implement an OOP-based low-level system such as publish-subscribe",
      category: "Backend",
      roles: ["sde-1", "backend-node", "full-stack-js"],
      language: "JavaScript",
      solution: lines(
        "class EventBus {",
        "  #topics = new Map();",
        "  subscribe(topic, handler) {",
        "    if (!this.#topics.has(topic)) this.#topics.set(topic, new Set());",
        "    this.#topics.get(topic).add(handler);",
        "    return () => this.#topics.get(topic)?.delete(handler);",
        "  }",
        "  publish(topic, payload) {",
        "    for (const handler of this.#topics.get(topic) ?? []) handler(payload);",
        "  }",
        "}"
      ),
      solutionUrl: "https://www.geeksforgeeks.org/system-design/observer-method-javascript-design-pattern/",
      evidenceUrls: [
        "https://www.geeksforgeeks.org/interview-experiences/augnito-interview-experience-for-backend-engineer/"
      ]
    },
    {
      title: "Write MongoDB aggregation pipelines to filter, group, and transform data",
      category: "Databases",
      roles: ["sde-1", "backend-node", "full-stack-js", "mern-stack"],
      language: "MongoDB",
      solution: lines(
        "db.orders.aggregate([",
        "  { $match: { status: 'PAID' } },",
        "  { $group: { _id: '$customerId', revenue: { $sum: '$amount' }, orders: { $sum: 1 } } },",
        "  { $sort: { revenue: -1 } },",
        "  { $limit: 10 },",
        "  { $project: { _id: 0, customerId: '$_id', revenue: 1, orders: 1 } }",
        "]);"
      ),
      solutionUrl: "https://www.geeksforgeeks.org/node-js/how-to-use-mongodb-aggregation-framework-in-nodejs/",
      evidenceUrls: [
        "https://www.geeksforgeeks.org/interview-experiences/nodejs-interview-experience/"
      ]
    },
    {
      title: "Write SQL queries using joins, aggregation, grouping, and pagination",
      category: "Databases",
      roles: ["sde-1", "backend-node", "full-stack-js"],
      language: "SQL",
      solution: lines(
        "SELECT u.id, u.name, COUNT(o.id) AS order_count,",
        "       COALESCE(SUM(o.total), 0) AS revenue",
        "FROM users AS u",
        "LEFT JOIN orders AS o ON o.user_id = u.id AND o.status = 'PAID'",
        "GROUP BY u.id, u.name",
        "ORDER BY revenue DESC, u.id ASC",
        "LIMIT 20 OFFSET 40;"
      ),
      solutionUrl: "https://www.geeksforgeeks.org/sql/sql-join-set-1-inner-left-right-and-full-joins/",
      evidenceUrls: [
        "https://www.geeksforgeeks.org/interview-experiences/quicksell-interview-experince-back-end-engineer-on-campus/",
        "https://www.geeksforgeeks.org/interview-experiences/sap-labs-india-full-timeinternship-interview-experience/"
      ]
    },
    {
      title: "Design a relational schema and write queries for a product workflow",
      category: "Databases",
      roles: ["sde-1", "backend-node", "full-stack-js", "mern-stack"],
      language: "SQL",
      solution: lines(
        "CREATE TABLE users (id BIGINT PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL);",
        "CREATE TABLE products (id BIGINT PRIMARY KEY, name VARCHAR(255) NOT NULL, price DECIMAL(10,2) NOT NULL);",
        "CREATE TABLE orders (",
        "  id BIGINT PRIMARY KEY, user_id BIGINT NOT NULL, status VARCHAR(20) NOT NULL,",
        "  created_at TIMESTAMP NOT NULL, FOREIGN KEY (user_id) REFERENCES users(id)",
        ");",
        "CREATE TABLE order_items (",
        "  order_id BIGINT, product_id BIGINT, quantity INT NOT NULL, unit_price DECIMAL(10,2) NOT NULL,",
        "  PRIMARY KEY (order_id, product_id),",
        "  FOREIGN KEY (order_id) REFERENCES orders(id), FOREIGN KEY (product_id) REFERENCES products(id)",
        ");"
      ),
      solutionUrl: "https://www.geeksforgeeks.org/interview-experiences/points-to-remember-for-database-design-interview/",
      evidenceUrls: [
        "https://www.geeksforgeeks.org/interview-experiences/wissen-interview-experience-3/",
        "https://www.geeksforgeeks.org/interview-experiences/geeksforgeeks-interview-experience-for-software-developer/"
      ]
    },
    {
      title: "Write Linux commands and Bash scripts for automation, log processing, and troubleshooting",
      category: "DevOps",
      roles: ["devops-engineer"],
      language: "Bash",
      solution: lines(
        "#!/usr/bin/env bash",
        "set -euo pipefail",
        "log_file=${1:?Usage: ./inspect.sh FILE}",
        "grep -i 'error' \"$log_file\" | awk '{print $NF}' | sort | uniq -c | sort -nr | head -10",
        "df -h                                      # filesystem usage",
        "du -sh /var/log/* 2>/dev/null | sort -h   # largest log directories",
        "ps aux --sort=-%mem | head                 # memory-heavy processes",
        "systemctl status my-service                # service state",
        "journalctl -u my-service --since '1 hour ago'"
      ),
      solutionUrl: "https://www.geeksforgeeks.org/linux-unix/shell-script-examples/",
      evidenceUrls: [
        "https://www.geeksforgeeks.org/interview-experiences/qualys-interview-experience-for-multiple-roles/",
        "https://www.geeksforgeeks.org/interview-experiences/amazon-interview-experience-for-support-engineerdevops-5-years-experienced/"
      ]
    },
    {
      title: "Containerize a Node.js application with a Dockerfile",
      category: "DevOps",
      roles: ["devops-engineer", "backend-node", "full-stack-js"],
      language: "Dockerfile",
      solution: lines(
        "FROM node:22-alpine",
        "WORKDIR /app",
        "COPY package*.json ./",
        "RUN npm ci --omit=dev",
        "COPY --chown=node:node . .",
        "ENV NODE_ENV=production",
        "EXPOSE 3000",
        "USER node",
        "CMD [\"node\", \"server.js\"]"
      ),
      solutionUrl: "https://www.geeksforgeeks.org/devops/docker-docker-container-for-node-js/",
      evidenceUrls: [
        "https://www.geeksforgeeks.org/interview-experiences/inorg-global-interview-experience-associate-devops-engineer-fresher/"
      ]
    },
    {
      title: "Provision a resource using Terraform configuration",
      category: "DevOps",
      roles: ["devops-engineer"],
      language: "Terraform",
      solution: lines(
        "terraform {",
        "  required_providers {",
        "    aws = {",
        "      source  = \"hashicorp/aws\"",
        "      version = \"~> 5.0\"",
        "    }",
        "  }",
        "}",
        "provider \"aws\" {",
        "  region = var.region",
        "}",
        "variable \"region\" {",
        "  type    = string",
        "  default = \"ap-south-1\"",
        "}",
        "variable \"bucket_name\" {",
        "  type = string",
        "}",
        "resource \"aws_s3_bucket\" \"uploads\" {",
        "  bucket = var.bucket_name",
        "  tags = { Environment = \"dev\" }",
        "}",
        "output \"bucket_id\" {",
        "  value = aws_s3_bucket.uploads.id",
        "}"
      ),
      solutionUrl: "https://www.geeksforgeeks.org/devops/terraform-resources/",
      evidenceUrls: [
        "https://www.geeksforgeeks.org/interview-experiences/inorg-global-interview-experience-associate-devops-engineer-fresher/"
      ]
    },
    {
      title: "Model inheritance and runtime polymorphism in code",
      category: "CS Fundamentals",
      roles: ["sde-1", "backend-node", "full-stack-js"],
      language: "JavaScript",
      solution: lines(
        "class Notification { send(message) { throw new Error('Implement send()'); } }",
        "class EmailNotification extends Notification {",
        "  send(message) { console.log(`Email: ${message}`); }",
        "}",
        "class SmsNotification extends Notification {",
        "  send(message) { console.log(`SMS: ${message}`); }",
        "}",
        "const channels = [new EmailNotification(), new SmsNotification()];",
        "channels.forEach(channel => channel.send('Interview scheduled')); // method chosen at runtime"
      ),
      solutionUrl: "https://www.geeksforgeeks.org/javascript/polymorphism-in-javascript/",
      evidenceUrls: [
        "https://www.geeksforgeeks.org/interview-experiences/siemens-interview-experience-off-campus/"
      ]
    },
    {
      title: "Implement synchronization for a concurrent producer-consumer workflow",
      category: "CS Fundamentals",
      roles: ["sde-1", "backend-node"],
      language: "Pseudocode",
      solution: lines(
        "semaphore empty = BUFFER_SIZE, full = 0, mutex = 1",
        "producer(item):",
        "  wait(empty); wait(mutex)",
        "  queue.push(item)",
        "  signal(mutex); signal(full)",
        "consumer():",
        "  wait(full); wait(mutex)",
        "  item = queue.pop()",
        "  signal(mutex); signal(empty)",
        "  return item"
      ),
      solutionUrl: "https://www.geeksforgeeks.org/operating-systems/producer-consumer-problem-and-its-implementation-with-c/",
      evidenceUrls: [
        "https://www.geeksforgeeks.org/interview-experiences/amazon-interview-experience-on-campus-for-sde-1-3/"
      ]
    }
  ];
})();
