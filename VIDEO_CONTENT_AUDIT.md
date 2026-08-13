# CampusX-first AI route audit

Audit date: 2026-08-13

## Result

The roadmap contains 42 focused video assignments across 10 build modules:

- 32 essential assignments: 1,765 minutes (29 hours 25 minutes)
- 10 optional depth assignments: 391 minutes (6 hours 31 minutes)
- Complete route: 2,156 minutes (35 hours 56 minutes)
- 27 curated CampusX assignments containing 69 direct video links: 1,911 minutes
- 15 focused production supplements: 245 minutes
- Every retained lecture has an explicit `youtube.com/watch?v=` link; no learner-facing watch link contains playlist navigation.
- Resource IDs and thumbnail video IDs are unique.

CampusX remains the primary source. Supplements are limited to capabilities that current AI and GenAI application roles expect but the audited CampusX playlists do not adequately teach. The source boundary is visible on every card. Multi-video assignments remain grouped only for progress tracking; their ordered menus expose each exact lecture and selected starting timestamp directly.

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
| Python | python-type-hints | Learn Code With Durgesh | Type annotations, collection types and static checking |
| Python | python-asyncio | Tech With Tim | Event loop, coroutines, tasks, futures and synchronization |
| Python | python-pytest | Tech With Tim | Assertions, fixtures, parameterization and provider mocks |
| LLM apps | provider-sdk-gemini | Patrick Loeber | Direct SDK calls, streaming, chat and multimodal input |
| LLM apps | provider-sdk-responses | Dave Ebbelaar | Native function calls, tools and structured response contracts |
| RAG | hybrid-search-rrf | Yash Jain | BM25, vector retrieval, over-fetching, RRF and final top-k |
| RAG | hyde-retrieval | Dev The Dev | HyDE retrieval concept and its evidence boundary |
| FastAPI | fastapi-production | Code Collider | Async rules, dependencies, lifespan, pools and structured logs |
| FastAPI | fastapi-testing | Mohit Decodes | Pytest, TestClient and API assertions |
| Reliability | provider-failure-patterns | SoftwareDude | Timeouts, bounded retries, exponential backoff and jitter |
| Reliability | ai-fallback-circuit | Learning With Chetna | Provider fallback, circuit breakers, idempotency, queues and DLQ |
| Reliability | api-rate-limiting | ByteMonk | Rate limiting, throttling, token bucket and leaky bucket |
| Reliability | llm-cache-design | Gaurav Sen | Exact versus semantic cache, TTL, stale data and cost trade-offs |
| Reliability | rag-cache-observability | Krish Naik | Redis/Valkey semantic cache implementation and cache monitoring |
| Security | ai-guardrails | Krish Naik | PII, prompt-injection checks, input/output hooks and layered guardrails |

Hindi or Hinglish sources were retained when their content was sufficient. Focused English lessons are used where the available Hindi alternatives were incomplete, obsolete or much longer without adding required capability; YouTube Hindi captions are identified where available.

## Checkpoint guarantees

Watching a video alone does not establish production skill. The module gates now require these observable builds:

- typed Python plus bounded asynchronous provider calls and mocked failure tests
- one direct provider client with streaming, multimodal input, structured output and an allowlisted tool
- independent BM25 and vector candidate retrieval, RRF fusion, stable-ID deduplication and measured top-k
- HyDE retained only when it beats the rewritten-query baseline on the same golden set
- FastAPI dependency injection, lifespan-managed clients, streaming cancellation and failure-path API tests
- versioned evaluation results for quality, safety, p50/p95 latency, token cost and error rate
- bounded retries, circuit breaking, per-tenant rate limits and safe degraded responses
- tenant-safe cache keys, TTLs and cache-correctness measurement
- input, output and retrieved-content guardrails, PII handling and human approval for consequential tools

The checkpoints intentionally state conditions videos may only introduce. Completion means implementing and testing the condition, not only watching the source.

## Position views

| Position | Full assignments | Full time | Fast assignments | Fast time |
| --- | ---: | ---: | ---: | ---: |
| Complete | 42 | 35h 56m | 32 | 29h 25m |
| AI Engineer | 41 | 34h 19m | 32 | 29h 25m |
| GenAI Engineer | 35 | 31h 23m | 27 | 25h 39m |
| MLOps Engineer | 21 | 14h 34m | 18 | 13h 21m |

The GenAI view removes Pandas, classification metrics and model-training projects. The MLOps view removes LLM-specific SDK, transformer, RAG, agent, evaluation, cache and guardrail assignments. The AI Engineer view retains the broad applied route and removes optional MCP.

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
6. Added exact checkpoint behavior where a source teaches the concept but not the complete production boundary.
7. Verified assignment IDs, all 84 direct video links, role/depth combinations, browser persistence and desktop/mobile rendering.

No captions, transcripts or downloaded media are committed.
