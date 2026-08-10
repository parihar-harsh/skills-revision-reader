(function () {
  const lines = (...items) => items.join("\n");

  window.liveCodingQuestions = [
    {
      title: "Implement a responsive frontend layout from a provided design",
      category: "Frontend",
      roles: ["frontend-react", "full-stack-js", "mern-stack"],
      language: "CSS",
      idea: "Use a stable desktop layout, fluid media, and one breakpoint that collapses columns instead of calculating widths in JavaScript.",
      concepts: ["CSS Grid and Flexbox", "minmax() and fluid sizing", "media queries", "box model and overflow"],
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
      idea: "Keep the selected tab and form values in state; render the active panel from that state and update it through event handlers.",
      concepts: ["useState", "controlled inputs", "conditional rendering", "event handling and list keys"],
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
      idea: "Treat state as the source of truth, reject invalid actions, copy arrays before updating them, and derive results such as the winner from state.",
      concepts: ["immutable state updates", "derived state", "guard clauses", "component rendering and keys"],
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
      idea: "Load persisted data once, update the in-memory collection for every CRUD action, and serialize the latest collection after each change.",
      concepts: ["CRUD array transformations", "localStorage", "JSON parse and stringify", "stable IDs"],
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
      idea: "Debounce runs after calls stop for a delay; throttle allows at most one call during each delay window.",
      concepts: ["closures and timers", "clearTimeout", "debounce vs throttle", "arguments and this context"],
      solution: lines(
        "function debounce(fn, delay) {",
        "  let timer;",
        "  return function (...args) {",
        "    clearTimeout(timer);",
        "    timer = setTimeout(() => fn.apply(this, args), delay);",
        "  };",
        "}",
        "function throttle(fn, delay) {",
        "  let waiting = false;",
        "  return function (...args) {",
        "    if (waiting) return;",
        "    fn.apply(this, args); waiting = true;",
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
      idea: "Fetch when the query changes, cancel stale requests, reuse cached results, and lazy-load code that is not needed for the first render.",
      concepts: ["useEffect dependencies", "loading/error/empty states", "AbortController cleanup", "caching and React.lazy"],
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
      idea: "Convert every input to a Promise, store results by original index, resolve when all finish, reject on the first failure, and handle an empty input.",
      concepts: ["Promise.resolve", "preserving input order", "fail-fast rejection", "empty input and mixed values"],
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
      idea: "Validate input before database work, return the correct HTTP status, and forward unexpected failures to centralized error middleware.",
      concepts: ["HTTP methods and status codes", "request validation", "async/await", "Express error middleware"],
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
      idea: "Count requests per client key inside a time window and return 429 after the limit; use a shared store when multiple server instances run.",
      concepts: ["client identification key", "time window and request limit", "HTTP 429 and Retry-After", "shared Redis store when scaled"],
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
      idea: "Keep a persistent connection, track connected clients, and send each update only to sockets that are still open.",
      concepts: ["WebSocket lifecycle", "readyState checks", "broadcasting and cleanup", "JSON message format"],
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
      idea: "Store a set of subscribers per topic so publishers can emit events without knowing the consumers, and return an unsubscribe function for cleanup.",
      concepts: ["Map and Set", "subscribe/publish/unsubscribe", "observer vs pub-sub", "handler cleanup"],
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
      idea: "Process documents through ordered stages: filter early, group and calculate, rank the groups, limit the result, then reshape the output.",
      concepts: ["pipeline stage order", "$match and indexes", "$group accumulators", "$sort, $limit, and $project"],
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
      idea: "Join related rows, aggregate each group, use deterministic ordering, and apply LIMIT/OFFSET only after the final order is known.",
      concepts: ["JOIN types", "WHERE vs HAVING", "GROUP BY and aggregates", "deterministic pagination"],
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
      idea: "Turn entities into tables, connect them with foreign keys, use a junction table for many-to-many relations, and enforce important constraints in the schema.",
      concepts: ["entities and relationships", "primary/foreign/unique keys", "one-to-many vs many-to-many", "normalization and query indexes"],
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
      idea: "Write fail-fast scripts, quote variables, combine small commands with pipes for logs, and inspect disk, process, service, and journal state systematically.",
      concepts: ["quoting and exit codes", "pipes and redirection", "grep, awk, sort, and uniq", "process/disk/service/log commands"],
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
      idea: "Build from a small trusted image, install reproducible production dependencies first for caching, copy the app, and run it as a non-root user.",
      concepts: ["image layers and build cache", "package lock and npm ci", ".dockerignore", "ports, environment, CMD, and non-root user"],
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
      idea: "Declare provider configuration, typed inputs, the desired resource, and useful outputs; review terraform plan before applying the change.",
      concepts: ["provider/resource/variable/output", "init-plan-apply workflow", "Terraform state", "declarative idempotency"],
      solution: lines(
        "provider \"aws\" {",
        "  region = \"ap-south-1\"",
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
      idea: "Call one common method through the parent contract; the actual object's overridden method is selected at runtime.",
      concepts: ["inheritance", "method overriding", "dynamic dispatch", "base-class contract"],
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
      idea: "Use counting semaphores to prevent buffer overflow or underflow and a mutex so only one worker modifies the shared queue at a time.",
      concepts: ["race condition and critical section", "mutex", "counting semaphores", "bounded buffer and deadlock order"],
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
