# CampusX-first AI route audit

Audit date: 2026-08-15

## Result

The roadmap contains 96 independently trackable video cards across 10 build modules, curated from 48 focused learning assignments:

- 81 essential video cards: 2,166 minutes (36 hours 6 minutes)
- 15 optional-depth video cards: 490 minutes (8 hours 10 minutes)
- Complete route: 2,656 minutes (44 hours 16 minutes)
- 78 CampusX video cards: 2,368 minutes
- 18 focused production-supplement video cards: 288 minutes
- Every retained lecture has an explicit `youtube.com/watch?v=` link; no learner-facing watch link contains playlist navigation.
- Resource IDs and thumbnail video IDs are unique.

CampusX remains the primary source. Supplements are limited to capabilities that current AI and GenAI application roles expect but the audited CampusX playlists do not adequately teach. The source boundary is visible on every card. Every retained video is a top-level card with independent progress tracking; no video is hidden inside an assignment container or collapsed menu.

## CampusX channel audit

The audit refreshed every public CampusX channel index available through YouTube:

- 1,261 standard videos
- 67 livestreams
- 5 Shorts
- 1,333 unique public upload IDs across those tabs
- 119 public playlists

All playlist names and upload titles were classified for route relevance. Descriptions, chapters and available captions were reviewed for retained assignments and close alternatives. Irrelevant web-development, DSA, analytics, career and promotional uploads were classified from the full index but were not transcript-reviewed.

The CampusX assignments use these 16 playlists:

1. 100 Days of Python Programming
2. CampusX Data Science Mentorship Program 2022-23
3. NumPy
4. Pandas
5. 100 Days of Machine Learning
6. Machine Learning Metrics
7. 100 Days of Deep Learning
8. Practical Deep Learning using PyTorch
9. Generative AI using LangChain
10. RAG Playlist
11. Agentic AI using LangGraph
12. Memory in LLMs
13. Model Context Protocol
14. FastAPI for Machine Learning
15. LLM Evaluation
16. 100 Days of MLOps

## Production supplements

Each supplement closes a specific audited gap rather than repeating a CampusX lesson.

| Module | Assignment | Source | Capability added |
| --- | --- | --- | --- |
| Python | python-modules-packages | Rishabh Mishra | Creating modules, packages and import boundaries |
| Python | python-type-hints | Learn Code With Durgesh | Type annotations, collection types and static checking |
| Python | python-asyncio | Tech With Tim | Event loop, coroutines, tasks, futures and synchronization |
| Python | python-pytest | Tech With Tim | Assertions, fixtures, parameterization and provider mocks |
| LLM apps | provider-sdk-gemini | Patrick Loeber | Direct SDK calls, streaming, chat and multimodal input |
| LLM apps | prompt-engineering | Hello World | Instructions, context, constraints, examples and output formats |
| LLM apps | provider-sdk-responses | Dave Ebbelaar | Responses calls, streaming, state, function-call objects, structured output and hosted web search |
| RAG | hybrid-search-rrf | Yash Jain | BM25, vector retrieval, over-fetching, RRF and final top-k |
| RAG | hyde-retrieval | LangChain | Canonical HyDE generation, embedding, retrieval and evidence boundary |
| FastAPI | fastapi-production | Code Collider | Async rules, dependencies, lifespan, pools and structured logs |
| FastAPI | fastapi-streaming | TheCodeForge | StreamingResponse, async generators, backpressure and disconnect cancellation |
| FastAPI | fastapi-testing | Mohit Decodes | Pytest, TestClient and API assertions |
| Reliability | provider-failure-patterns | SoftwareDude | Timeouts, bounded retries, exponential backoff and jitter |
| Reliability | ai-fallback-circuit | Learning With Chetna | Provider fallback, circuit breakers, idempotency, queues and DLQ |
| Reliability | api-rate-limiting | ByteMonk | Rate limiting, throttling, token bucket and leaky bucket |
| Reliability | llm-cache-design | Gaurav Sen | Exact versus semantic cache, TTL, stale data and cost trade-offs |
| Reliability | rag-cache-observability | Krish Naik | Redis/Valkey semantic cache implementation and cache monitoring |
| Security | ai-guardrails | Krish Naik | PII, prompt-injection checks, input/output hooks and layered guardrails |

Hindi or Hinglish sources were retained when their content was sufficient. Focused English lessons are used where the available Hindi alternatives were incomplete, obsolete or much longer without adding required capability; YouTube Hindi captions are identified where available.

## Series continuity decisions

Every retained assignment was checked for numbered parts, prerequisites, continuation lectures and selected ranges that stopped before the card's claimed capability finished.

| Module | Required sequence retained | Continuations deliberately omitted |
| --- | --- | --- |
| Python | Collections, Python-specific mutability, functions, class/object basics, files/JSON, exceptions and a separate package-structure lesson | Beginner syntax, recursion, advanced OOP and package-installation repetition |
| ML foundation | Complete conceptual Backpropagation Part 1 plus one Keras and one optional PyTorch training loop | Backpropagation Parts 2 and 3 because they derive and code deeper mathematics outside this non-research route |
| Transformers | Self-attention intuition, Q/K/V computation and scaling; multi-head attention; positions; layer normalization; encoder block; masking; cross-attention; decoder block; inference | Transformer overview and two additional self-attention intuition lectures because they repeat the retained sequence |
| LangChain | Hosted and open-source chat models; prompt templates, messages and MessagePlaceholder; Pydantic/JSON structured output with capability caveats; and the complete chains lecture through conditional chains | Embedding models, output-parser and standalone runnable deep dives; later modules cover retrieval and tool execution, while the retained chain lecture already introduces the required runnable composition |
| RAG | Architecture, loaders, all splitter types, embeddings/vector stores, metadata filtering, similarity retrieval, MMR, multi-query, compression, the retrieval-to-generation chain, augmented prompts, citations, hybrid RRF, canonical HyDE, CRAG grading/refinement and the complete six-step Self-RAG implementation | The end-to-end chatbot's repeated ingestion and UI sections; the LangGraph RAG rebuild until agent prerequisites are complete; and CRAG's repeated graph implementation after its distinct concept segment finishes |
| Agents | Agent decision boundary, LangGraph primitives, conditional routing and the full LLM-ToolNode feedback loop; thread-scoped checkpoints; cross-thread stores, namespaces and semantic memory retrieval; MCP host/client/server boundaries, JSON-RPC, stdio, local server and client | Separate sequential, parallel and evaluator-loop workflow demos because they repeat the same graph primitives; MCP v1 batching, initialize/ping, resource-subscription, legacy HTTP-plus-SSE and overclaimed stdio-security segments |
| FastAPI | Setup, validation/model serving, production lifecycle rules, streaming/disconnect behavior and tests | Repeated HTTP basics, Docker and AWS deployment already covered by assumed backend/DevOps skills |
| Evaluation | Evaluation methods, retriever evaluation, tracing and offline/online loops | Model-benchmark and leaderboard series for model selection rather than application evaluation |
| MLOps | One complete MLflow/DVC/registry/CI-CD project and a separate data/ETL boundary lesson | Promotional overview and repeated generic lifecycle explanation |
| Reliability and safety | Complete standalone failure, rate-limit, cache and guardrail lessons plus human approval for consequential LangGraph tool actions | Broader framework tours and vendor-specific platform setup |

Grouped cards now store the actual rounded watch time of each full video or selected range. Parent-time averaging was removed because it made short and long cards display misleading durations.

## Suggested implementation outcomes

Watching a video alone does not establish production skill. Useful outcomes to build alongside the route include:

- typed Python plus bounded asynchronous provider calls and mocked failure tests
- one direct provider client with streaming, multimodal input, structured output and an allowlisted tool
- independent BM25 and vector candidate retrieval, RRF fusion, stable-ID deduplication and measured top-k
- HyDE retained only when it beats the rewritten-query baseline on the same golden set
- FastAPI dependency injection, lifespan-managed clients, streaming cancellation and failure-path API tests
- versioned evaluation results for quality, safety, p50/p95 latency, token cost and error rate
- bounded retries, circuit breaking, per-tenant rate limits and safe degraded responses
- tenant-safe cache keys, TTLs and cache-correctness measurement
- input, output and retrieved-content guardrails, PII handling and human approval for consequential tools

These are study recommendations, not completion gates in the roadmap interface.

## Position views

| Position | Full videos | Full time | Fast videos | Fast time |
| --- | ---: | ---: | ---: | ---: |
| Complete | 96 | 44h 16m | 81 | 36h 6m |
| AI Engineer | 93 | 42h 41m | 81 | 36h 6m |
| GenAI Engineer | 80 | 39h 45m | 67 | 32h 21m |
| MLOps Engineer | 49 | 15h 23m | 46 | 14h 11m |

The GenAI view removes Pandas, classification metrics and model-training projects. The MLOps view removes LLM-specific SDK, prompt engineering, transformer, RAG, agent, evaluation, cache and guardrail videos. The AI Engineer view retains the broad applied route and removes optional MCP.

## Deliberate exclusions

The following remain outside the route because they belong to MLOps specialization, research or a separate cloud-platform path rather than the requested AI/GenAI application gap:

- managed AWS Bedrock, Vertex AI or Azure AI platform administration and cloud identity
- implemented model/data-drift dashboards, retraining triggers and feature stores
- vLLM, PagedAttention, Triton or production self-hosted GPU serving
- distributed model training, foundation-model pretraining and research mathematics
- computer vision, research NLP, reinforcement learning and data-science specialization
- broad alternative-framework tours such as CrewAI, AutoGen, n8n and Make.com

## Validation method

1. Enumerated the complete public CampusX Videos, Live, Shorts and Playlists indexes.
2. Compared every relevant CampusX playlist item with the retained assignment purpose.
3. Mapped the remaining gaps to current AI/GenAI engineering responsibilities.
4. Compared candidate supplement titles, descriptions, chapters, available captions and implementation scope.
5. Rejected duplicate long courses, obsolete provider examples and videos that only named a topic.
6. Documented implementation outcomes where a source teaches the concept but not the complete production boundary.
7. Verified assignment IDs, all 95 direct video links, role/depth combinations, browser persistence and desktop/mobile rendering.

No captions, transcripts or downloaded media are committed.
