(function () {
  window.liveCodingExecutionSteps = [
    {
      title: "Clarify",
      text: "Confirm the input, expected output, constraints, allowed libraries, and the smallest required feature set.",
      example: "Ask: What should happen for empty input, duplicates, failure, or repeated clicks?"
    },
    {
      title: "Model",
      text: "Choose the minimum state, data structures, API shape, or schema needed before writing implementation details.",
      example: "State: { items, loading, error }; derive filteredItems instead of storing it twice."
    },
    {
      title: "Build",
      text: "Implement one working path end to end, then add validation, failure handling, and optional behavior.",
      example: "Render data first; then add search, loading, error, cache, and cleanup."
    },
    {
      title: "Guard",
      text: "Handle the edge cases that can break correctness without adding features outside the stated scope.",
      example: "Guard empty values, duplicate actions, stale requests, missing records, and closed connections."
    },
    {
      title: "Test aloud",
      text: "Run a normal case, a boundary case, and a failure case while explaining the expected state change or output.",
      example: "Test: normal list, empty list, one item, invalid input, and rejected request."
    },
    {
      title: "Defend",
      text: "State complexity, tradeoffs, and the first production improvement only after the required solution works.",
      example: "Current scan is O(n); add an index or shared Redis store only when scale requires it."
    }
  ];

  window.liveCodingGuides = {
    "Implement a responsive frontend layout from a provided design": {
      priority: "frequent",
      lessons: [
        {
          title: "Structure and box model",
          text: "Start with semantic regions and predictable sizing so padding and borders do not unexpectedly increase widths.",
          example: "*, *::before, *::after { box-sizing: border-box; }"
        },
        {
          title: "Choose Grid or Flexbox",
          text: "Use Grid for rows and columns; use Flexbox when items mainly flow along one axis.",
          example: ".page { display: grid; grid-template-columns: 240px minmax(0, 1fr); }"
        },
        {
          title: "Use fluid constraints",
          text: "Prefer minmax, percentages, max-width, and flexible tracks over JavaScript width calculations.",
          example: ".content { width: min(100%, 960px); } img { max-width: 100%; height: auto; }"
        },
        {
          title: "Expand at a real breakpoint",
          text: "Start with one narrow-screen column, add the next layout only when the content needs it, and verify overflow at both widths.",
          example: ".page { grid-template-columns: 1fr; } @media (min-width: 769px) { .page { grid-template-columns: 240px minmax(0, 1fr); } }"
        }
      ]
    },
    "Build an interactive UI component with tabs, forms, and local state": {
      priority: "frequent",
      lessons: [
        {
          title: "Controlled state",
          text: "The selected tab and form value live in state; rendered UI always comes from that state.",
          example: "const [tab, setTab] = useState('profile'); const [name, setName] = useState('');"
        },
        {
          title: "Events and submission",
          text: "Update state from change/click handlers and prevent a form submit from reloading the page.",
          example: "const submit = e => { e.preventDefault(); save(name.trim()); };"
        },
        {
          title: "Conditional lists",
          text: "Render only the active panel and use a stable data ID as the key when mapping items.",
          example: "tab === 'profile' && <Profile />; items.map(x => <Row key={x.id} item={x} />)"
        },
        {
          title: "Interaction semantics",
          text: "Use buttons for actions, expose selected state, and keep keyboard focus visible.",
          example: "<button role='tab' aria-selected={tab === id} onClick={() => setTab(id)}>{label}</button>"
        }
      ]
    },
    "Build a small stateful React application with user interactions": {
      priority: "frequent",
      lessons: [
        {
          title: "Store minimum state",
          text: "Store only values users change; calculate winner, totals, filters, or status from current state.",
          example: "const winner = getWinner(cells); // derived, not another useState"
        },
        {
          title: "Update immutably",
          text: "Create a new array or object so React receives a new reference and can render the change.",
          example: "setItems(items => items.map(x => x.id === id ? { ...x, done: true } : x));"
        },
        {
          title: "Guard actions",
          text: "Reject clicks that violate rules before changing state, such as occupied cells or completed games.",
          example: "if (cells[index] || winner) return;"
        },
        {
          title: "Reset and verify",
          text: "A reset should restore the complete initial state; test first action, repeated action, completion, and reset.",
          example: "const reset = () => { setCells(Array(9).fill(null)); setXTurn(true); };"
        }
      ]
    },
    "Build a client-side CRUD application with browser persistence": {
      priority: "frequent",
      lessons: [
        {
          title: "Hydrate safely",
          text: "Read localStorage once and fall back when the key is missing or stored JSON is invalid.",
          example: "let items; try { const value = JSON.parse(localStorage.getItem('items')); items = Array.isArray(value) ? value : []; } catch { items = []; }"
        },
        {
          title: "Use predictable transforms",
          text: "Create with push/spread, read with find, update with map, and delete with filter.",
          example: "items = items.filter(item => item.id !== id);"
        },
        {
          title: "Validate and identify",
          text: "Reject empty input and give each record a stable ID so editing and deletion target one item.",
          example: "if (!text.trim()) return; const id = crypto.randomUUID();"
        },
        {
          title: "Persist after mutation",
          text: "Save the latest collection after each successful change and then render from that same collection.",
          example: "localStorage.setItem('items', JSON.stringify(items)); render(items);"
        }
      ]
    },
    "Build search or typeahead behaviour with debounce and throttle": {
      priority: "frequent",
      lessons: [
        {
          title: "Closure owns the timer",
          text: "The returned function closes over a timer ID, allowing a new call to cancel the previous scheduled call.",
          example: "let timer; return function (...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay); };"
        },
        {
          title: "Know the behavior",
          text: "Debounce waits for silence; throttle permits at most one execution in a window. State whether the first or last call should run.",
          example: "Search -> trailing debounce; scroll metrics -> leading or interval throttle."
        },
        {
          title: "Preserve the call",
          text: "A reusable utility forwards the original arguments and this context to the wrapped function.",
          example: "fn.apply(this, args)"
        },
        {
          title: "Handle cleanup and races",
          text: "Cancel pending timers on unmount and abort or ignore older requests whose responses arrive late.",
          example: "return () => { clearTimeout(timer); controller.abort(); };"
        }
      ]
    },
    "Build a data-driven React interface with API fetching, caching, lazy loading, and search": {
      priority: "frequent",
      lessons: [
        {
          title: "Effect lifecycle",
          text: "Fetch when dependencies change and return cleanup that cancels work belonging to the previous render.",
          example: "useEffect(() => { const c = new AbortController(); fetch(url, { signal: c.signal }); return () => c.abort(); }, [url]);"
        },
        {
          title: "Render request states",
          text: "Represent loading, error, empty, and success explicitly and reject non-2xx responses before parsing.",
          example: "if (!response.ok) throw new Error(String(response.status));"
        },
        {
          title: "Cache deliberately",
          text: "Use the full request as the cache key and decide when cached data becomes stale or must be invalidated.",
          example: "const key = `/products?q=${encodeURIComponent(query)}&page=${page}`;"
        },
        {
          title: "Load only what is needed",
          text: "Debounce search, lazy-load secondary components, and fetch later pages only when requested.",
          example: "const Details = lazy(() => import('./Details'));"
        }
      ]
    },
    "Debug and extend an unfamiliar React codebase": {
      priority: "frequent",
      lessons: [
        {
          title: "Reproduce first",
          text: "Write exact steps, expected behavior, and actual behavior before editing so the fix has a testable target.",
          example: "Search A, immediately search B, observe that late response A replaces B."
        },
        {
          title: "Observe the failing layer",
          text: "Use Console for exceptions, Network for requests, and React DevTools for props, state, and rerenders.",
          example: "Network: request B returned first; request A returned later and overwrote state."
        },
        {
          title: "Check common React causes",
          text: "Look for direct state mutation, missing effect dependencies, stale closures, missing cleanup, and unstable list keys.",
          example: "items.push(x); setItems(items) -> setItems(items => [...items, x])"
        },
        {
          title: "Make the smallest fix",
          text: "Change one cause, rerun the reproduction, and verify nearby behavior to avoid hiding the original bug.",
          example: "Add AbortController cleanup, then test fast typing, empty query, failure, and unmount."
        }
      ]
    },
    "Implement native JavaScript behaviour or a utility polyfill": {
      priority: "frequent",
      lessons: [
        {
          title: "Normalize input",
          text: "Convert the iterable to an array and wrap every item with Promise.resolve so values and thenables work.",
          example: "const values = Array.from(iterable); Promise.resolve(values[index])"
        },
        {
          title: "Preserve input order",
          text: "Promises may finish in any order, so store each result at its original index and count completions separately.",
          example: "results[index] = value; if (++completed === values.length) resolve(results);"
        },
        {
          title: "Reject immediately",
          text: "Pass the outer reject function to each input promise; the first rejection settles the result promise.",
          example: "Promise.resolve(item).then(onValue, reject)"
        },
        {
          title: "Test specification edges",
          text: "Check an empty iterable, plain values, mixed completion order, thenables, and one rejection.",
          example: "await promiseAll([]) // []; await promiseAll([1, Promise.resolve(2)]) // [1, 2]"
        }
      ]
    },
    "Implement a REST API endpoint using Express.js": {
      priority: "frequent",
      lessons: [
        {
          title: "Model the resource route",
          text: "Choose the HTTP method and separate path identity, query options, and request-body data.",
          example: "POST /users; GET /users/:id; GET /users?page=2&limit=20"
        },
        {
          title: "Validate before I/O",
          text: "Parse and validate required fields and bounded numbers before calling the database.",
          example: "if (!email) return res.status(400).json({ error: 'email is required' });"
        },
        {
          title: "Return precise outcomes",
          text: "Use 201 for creation, 204 for successful deletion without a body, 404 for absence, and 409 for conflict.",
          example: "return res.status(201).json(user);"
        },
        {
          title: "Centralize unexpected errors",
          text: "Handle expected branches in the route, forward unexpected failures, and return only one response.",
          example: "try { ... } catch (error) { next(error); }"
        }
      ]
    },
    "Implement backend request-control logic such as API rate limiting": {
      priority: "targeted",
      lessons: [
        {
          title: "Choose a client key and algorithm",
          text: "Identify callers by authenticated user, API key, or trusted IP and choose fixed window, sliding window, or token bucket.",
          example: "const key = req.user?.id ?? req.ip;"
        },
        {
          title: "Update state atomically",
          text: "Increment and set the first expiry inside one Redis Lua script so concurrent requests cannot interleave or leave a counter without a window.",
          example: "local count = redis.call('INCR', KEYS[1]); if count == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end; return count"
        },
        {
          title: "Return a useful rejection",
          text: "Reject over-limit requests with 429 and tell the client when another attempt is allowed.",
          example: "res.set('Retry-After', seconds).status(429).json({ error: 'Too many requests' });"
        },
        {
          title: "Know the scaling boundary",
          text: "An in-memory map works for one process; multiple instances require a shared store such as Redis.",
          example: "One Node process -> Map; horizontally scaled API -> Redis-backed limiter."
        }
      ]
    },
    "Build a real-time server-to-client streaming service": {
      priority: "targeted",
      lessons: [
        {
          title: "Connection lifecycle",
          text: "A WebSocket upgrades HTTP into a persistent connection and emits open, message, error, and close events.",
          example: "socket.on('close', () => removeClient(socket));"
        },
        {
          title: "Define a message protocol",
          text: "Send JSON with a type and payload so clients can route different event kinds safely.",
          example: "{ type: 'log.append', payload: { line: 'Server started' } }"
        },
        {
          title: "Send only to valid clients",
          text: "Check readyState, target the correct room or user, and remove disconnected sockets.",
          example: "if (client.readyState === WebSocket.OPEN) client.send(message);"
        },
        {
          title: "Protect long-lived connections",
          text: "Bound buffered output, use ping/pong heartbeats to remove dead peers, and let clients reconnect with backoff.",
          example: "if (socket.bufferedAmount > MAX_BUFFER) return socket.close(1013, 'Try later'); socket.ping();"
        }
      ]
    },
    "Design and implement an OOP-based low-level system such as publish-subscribe": {
      priority: "targeted",
      lessons: [
        {
          title: "Separate responsibilities",
          text: "Publishers emit events, subscribers handle them, and the broker owns topic-to-handler registration.",
          example: "Map<topic, Set<handler>>"
        },
        {
          title: "Define the contract",
          text: "Support subscribe, publish, and unsubscribe with clear behavior for unknown topics and duplicate handlers.",
          example: "const unsubscribe = bus.subscribe('order.created', handler);"
        },
        {
          title: "Keep components decoupled",
          text: "A publisher knows the topic and payload but not which consumers exist; this is the key pub-sub benefit.",
          example: "bus.publish('order.created', order); // no direct emailService call"
        },
        {
          title: "Deliver safely",
          text: "Iterate over a stable handler set, isolate one handler's error, and remove subscriptions during cleanup.",
          example: "for (const fn of [...handlers]) { try { fn(data); } catch (e) { report(e); } }"
        }
      ]
    },
    "Write MongoDB aggregation pipelines to filter, group, and transform data": {
      priority: "frequent",
      lessons: [
        {
          title: "Think as ordered data flow",
          text: "Each stage receives the previous stage's output; filter early and keep only fields required by later stages.",
          example: "[{ $match: { status: 'PAID' } }, { $project: { customerId: 1, amount: 1 } }]"
        },
        {
          title: "Group with the right key",
          text: "The $group _id defines one output group; accumulators calculate totals, counts, averages, minima, or maxima.",
          example: "{ $group: { _id: '$customerId', total: { $sum: '$amount' }, count: { $sum: 1 } } }"
        },
        {
          title: "Expand and join when required",
          text: "Use $unwind for array elements and $lookup when fields from another collection are needed.",
          example: "[{ $unwind: '$items' }, { $lookup: { from: 'products', localField: 'items.productId', foreignField: '_id', as: 'product' } }]"
        },
        {
          title: "Rank and inspect",
          text: "Sort before limit, move selective match stages early, and use explain to inspect index use and documents examined.",
          example: "db.orders.explain('executionStats').aggregate(pipeline)"
        }
      ]
    },
    "Write SQL queries using joins, aggregation, grouping, and pagination": {
      priority: "frequent",
      lessons: [
        {
          title: "Choose the join deliberately",
          text: "INNER JOIN keeps matches; LEFT JOIN keeps every left row and fills missing right columns with NULL.",
          example: "users u LEFT JOIN orders o ON o.user_id = u.id"
        },
        {
          title: "Filter at the correct stage",
          text: "WHERE filters rows before grouping; HAVING filters groups after aggregate values are calculated.",
          example: "GROUP BY u.id HAVING SUM(o.total) > 1000"
        },
        {
          title: "Aggregate and handle NULL",
          text: "Group every selected non-aggregate field and use COALESCE when an outer join can produce NULL totals.",
          example: "COALESCE(SUM(o.total), 0) AS revenue"
        },
        {
          title: "Paginate deterministically",
          text: "Order by a stable tie-breaker; use OFFSET for simple small results and keyset pagination for large moving data.",
          example: "WHERE id > :cursor ORDER BY id ASC LIMIT 20"
        },
        {
          title: "Verify performance",
          text: "Index join, filter, and order columns based on the query and inspect the plan with EXPLAIN.",
          example: "EXPLAIN SELECT ...; CREATE INDEX idx_orders_user_status ON orders(user_id, status);"
        }
      ]
    },
    "Design a relational schema and write queries for a product workflow": {
      priority: "frequent",
      lessons: [
        {
          title: "Start from workflows",
          text: "List the operations the product must support, then derive entities, attributes, and relationships.",
          example: "Checkout needs users, products, orders, order_items, quantity, and purchase-time price."
        },
        {
          title: "Encode cardinality",
          text: "Place a foreign key on the many side and use a junction table with a composite key for many-to-many data.",
          example: "order_items PRIMARY KEY (order_id, product_id)"
        },
        {
          title: "Protect integrity",
          text: "Use primary, foreign, unique, NOT NULL, and CHECK constraints; choose cascade or restrict deletes intentionally.",
          example: "quantity INT NOT NULL CHECK (quantity > 0); FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE"
        },
        {
          title: "Normalize, then optimize",
          text: "Remove accidental duplication first; denormalize or add indexes only for demonstrated access patterns.",
          example: "CREATE INDEX idx_orders_user_created ON orders(user_id, created_at DESC);"
        }
      ]
    },
    "Write Linux commands and Bash scripts for automation, log processing, and troubleshooting": {
      priority: "frequent",
      lessons: [
        {
          title: "Write safe shell",
          text: "Use a shebang, strict mode, quoted variables, argument checks, and meaningful exit codes.",
          example: "#!/usr/bin/env bash; set -euo pipefail; file=${1:?Usage: script FILE}"
        },
        {
          title: "Compose text commands",
          text: "Pipes pass stdout forward; redirect stdout and stderr explicitly while grep, sed, awk, sort, and uniq transform text.",
          example: "grep -i 'error' app.log | awk '{print $NF}' | sort | uniq -c | sort -nr | head"
        },
        {
          title: "Control files and flow",
          text: "Use file tests, loops, find/xargs, and permissions without breaking on spaces in file names.",
          example: "find logs -type f -name '*.log' -print0 | xargs -0 grep -l 'ERROR'"
        },
        {
          title: "Troubleshoot resources",
          text: "Check process, memory, disk, service, and journal state in a consistent order before changing anything.",
          example: "ps aux --sort=-%mem | head; df -h; du -sh /var/log/*; systemctl status app; journalctl -u app"
        }
      ]
    },
    "Containerize a Node.js application with a Dockerfile": {
      priority: "frequent",
      lessons: [
        {
          title: "Understand layers",
          text: "Each Dockerfile instruction creates a cached layer; use a small versioned base image and put stable dependency steps before source code.",
          example: "FROM node:22-alpine; COPY package*.json ./; RUN npm ci --omit=dev"
        },
        {
          title: "Control the build context",
          text: "Use .dockerignore so node_modules, secrets, logs, and build output are not copied into the image.",
          example: ".dockerignore: node_modules\n.env\ndist\n*.log"
        },
        {
          title: "Define runtime behavior",
          text: "Use ENV for defaults, EXPOSE as documentation, CMD for the default process, and -p for host-to-container port mapping.",
          example: "docker run --env-file .env -p 3000:3000 app-image"
        },
        {
          title: "Drop root privileges",
          text: "Copy files with correct ownership and switch to the image's non-root user before starting the app.",
          example: "COPY --chown=node:node . .; USER node"
        },
        {
          title: "Debug the container",
          text: "Inspect build output, logs, process state, environment, and network binding when the service does not start.",
          example: "docker logs container; docker exec -it container sh; ensure app listens on 0.0.0.0"
        }
      ]
    },
    "Provision a resource using Terraform configuration": {
      priority: "frequent",
      lessons: [
        {
          title: "Know the HCL building blocks",
          text: "Providers call platform APIs, resources declare managed objects, variables accept input, locals derive values, and outputs expose results.",
          example: "resource \"aws_s3_bucket\" \"uploads\" { bucket = var.bucket_name }"
        },
        {
          title: "Reference instead of hardcoding",
          text: "Resource references create a dependency graph that Terraform uses to choose operation order.",
          example: "bucket = aws_s3_bucket.uploads.id"
        },
        {
          title: "Use the safe workflow",
          text: "Initialize providers, format, validate, inspect the plan, and only then apply the reviewed change.",
          example: "terraform init; terraform fmt -check; terraform validate; terraform plan; terraform apply"
        },
        {
          title: "Protect state",
          text: "State maps configuration to real resources; remote state and locking prevent conflicting team updates.",
          example: "Repeated apply with no configuration drift should produce: No changes."
        }
      ]
    },
    "Model inheritance and runtime polymorphism in code": {
      priority: "targeted",
      lessons: [
        {
          title: "Define a base contract",
          text: "The parent exposes a common method and can reject direct use when child classes must implement it.",
          example: "class Shape { area() { throw new Error('Implement area'); } }"
        },
        {
          title: "Override for runtime behavior",
          text: "Each child uses the same method name; calling through a base reference selects the actual object's method at runtime.",
          example: "shapes.map(shape => shape.area())"
        },
        {
          title: "Initialize inherited state",
          text: "A child constructor calls super before using this; JavaScript does not provide signature-based method overloading.",
          example: "constructor(name, radius) { super(name); this.radius = radius; }"
        },
        {
          title: "Prefer composition when behavior varies",
          text: "Use inheritance for a genuine is-a relation; inject smaller behavior objects when features need independent replacement.",
          example: "new Checkout(new CardPayment()) // composition"
        }
      ]
    },
    "Implement synchronization for a concurrent producer-consumer workflow": {
      priority: "targeted",
      lessons: [
        {
          title: "Identify shared state",
          text: "Multiple producers and consumers access one bounded queue, creating races around insertion and removal.",
          example: "Shared state: queue, head/tail, current size."
        },
        {
          title: "Use the right primitive",
          text: "A mutex protects the critical section; counting semaphores track how many empty and full slots exist.",
          example: "empty = capacity; full = 0; mutex = 1"
        },
        {
          title: "Keep acquisition order consistent",
          text: "Wait for capacity before taking the mutex, release the mutex before signalling the opposite side, and keep every path balanced.",
          example: "producer: wait(empty), wait(mutex), push, signal(mutex), signal(full)"
        },
        {
          title: "Reason about liveness",
          text: "Check overflow, underflow, deadlock, and starvation; condition variables are a common mutex-based alternative.",
          example: "while (queue.empty()) notEmpty.wait(lock);"
        }
      ]
    }
  };
})();
