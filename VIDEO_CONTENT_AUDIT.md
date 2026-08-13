# CampusX-only AI route audit

Audit date: 2026-08-13

## Result

The roadmap now contains 24 playlist assignments across 10 modules:

- 20 essential assignments: 1,532 minutes (25 hours 32 minutes)
- 4 optional depth assignments: 167 minutes (2 hours 47 minutes)
- Complete route: 1,699 minutes (28 hours 19 minutes)
- Every assignment source starts with "CampusX |".
- Every assignment URL includes an official CampusX playlist ID and starts at the first selected video.
- No resource ID or thumbnail video ID is duplicated.
- No external creator, standalone fallback or non-playlist learning link remains.

A playlist assignment is a curated unit of progress. It may include several explicitly named videos or timestamp ranges from one CampusX playlist. This avoids presenting every recap or framework demo as a separate requirement.

## Audit method

1. Enumerated the public playlists on the verified CampusX YouTube channel.
2. Matched every selected video ID to a CampusX playlist and retained the playlist ID in its URL.
3. Compared titles, descriptions, chapter timestamps and available caption tracks with each assignment note.
4. Kept a later lecture only when it adds a distinct capability, not merely a second explanation.
5. Labeled checkpoint additions separately when CampusX teaches the mechanism but not the production control.
6. Recalculated all role and depth filters after consolidation.
7. Validated all 24 YouTube links through the YouTube oEmbed endpoint.

No caption files, transcripts or downloaded media are committed.

## Assignment map

| Module | Assignment | Official CampusX playlist | Unique purpose |
| --- | --- | --- | --- |
| 01 | python-core | 100 Days of Python Programming | Python collections, mutability, functions and OOP syntax for an existing programmer |
| 01 | python-files-errors | Data Science Mentorship Program 2022-23 | File I/O, context managers, JSON and exception handling |
| 01 | numpy-core | NumPy | Arrays, shape, indexing, vectorized operations and broadcasting |
| 01 | pandas-core | Pandas | DataFrames, CSV, filtering, duplicates, GroupBy and missing values |
| 02 | ml-concepts | 100 Days of Machine Learning | AI/ML/DL hierarchy, learning types and bias-variance behavior |
| 02 | ml-metrics | Machine Learning Metrics | Confusion matrix, accuracy limits, precision, recall and F1 |
| 02 | sklearn-workflow | 100 Days of Machine Learning | The only classical-ML implementation project |
| 02 | neural-network-training | 100 Days of Deep Learning | Forward pass, loss and backpropagation |
| 02 | keras-ann-project | 100 Days of Deep Learning | The only Keras implementation project |
| 02 | pytorch-training-pipeline | Practical Deep Learning using PyTorch | Optional translation of the same training loop to PyTorch |
| 03 | transformer-core | 100 Days of Deep Learning | Self-attention, multi-head attention, position, causal masking and decoder structure |
| 04 | langchain-core | Generative AI using LangChain | Model calls, hosted/local trade-offs, prompts, structured output and chains |
| 05 | rag-architecture | RAG Playlist | Why RAG, indexing/query paths, limitations and fine-tuning trade-offs |
| 05 | rag-core | RAG Playlist | Loaders, splitters, vector stores and retrievers |
| 05 | rag-advanced | RAG Playlist | Optional Corrective RAG and weak-evidence routing |
| 06 | agent-core | Agentic AI using LangGraph | Agent decision boundary plus state, nodes, edges and routing |
| 06 | agent-persistence | Agentic AI using LangGraph | Optional checkpoints, resume behavior and fault tolerance |
| 06 | mcp-architecture | Model Context Protocol | Optional host/client/server architecture and transports |
| 07 | fastapi-core | FastAPI for Machine Learning | Setup, Pydantic requests, model serving, health and error responses |
| 08 | llm-eval-methods | LLM Evaluation | Deterministic, human and model-graded evaluation |
| 08 | rag-evaluation | LLM Evaluation | RAG-only retrieval, grounding, relevance and citation metrics |
| 08 | langsmith-observability | Agentic AI using LangGraph | Focused graph tracing without the separate two-hour crash course |
| 09 | mlops-project | 100 Days of MLOps | MLflow, DVC, registry, promotion and CI/CD in one project |
| 10 | bounded-tools | Agentic AI using LangGraph | ToolNode execution and human approval |

## Duplicate removal decisions

- **Python:** Replaced mixed one-off syntax, OOP, modules, NumPy and Pandas videos with four CampusX playlist assignments. Beginner variables and loops are skipped because JavaScript is a declared prerequisite.
- **ML and deep learning:** Kept one concepts path, one metric path, one classical project and one Keras project. PyTorch is optional framework translation, not another fundamentals course.
- **Transformers:** Removed the broad LLM overview, architecture-family overview, separate sampling lecture and mixed-provider decoder lesson. The CampusX assignment uses only the transformer components needed by the later application modules.
- **LangChain:** Removed the external crash course, raw SDK fallback, separate prompt-engineering lecture and LoRA lecture. CampusX Models, Prompts, Structured Output and Chains are one assignment. LangChain tools are skipped because LangGraph covers tool execution later.
- **RAG:** Kept architecture separate from implementation because they answer different questions. Every recap inside loaders, splitters and retrievers is skipped. Hybrid search, RRF, HyDE and cross-encoder reranking were removed because the CampusX RAG playlist does not teach them sufficiently.
- **Agents:** Kept core graph concepts, optional persistence and optional MCP. Corrective RAG moved back to the RAG module. Tool execution and human approval moved to the final bounded-tools module so they are not watched twice.
- **Evaluation:** Removed the 17-minute workflow overview because the 53-minute methods lesson already explains the evaluation choices. RAG evaluation remains because it adds retrieval and grounding metrics not present in general LLM evaluation.
- **Observability:** Kept the focused 22-minute LangGraph integration and removed the separate two-hour LangSmith crash course.
- **FastAPI:** Consolidated setup, request validation, model serving and project improvement into one assignment. Generic API, HTTP, Docker and AWS lessons repeat declared prerequisites and are skipped.
- **MLOps:** Kept one CampusX project for MLflow, DVC, registry and CI/CD. Generic lifecycle introductions are skipped.

## Role views

| Role | Full assignments | Full time | Fast assignments | Fast time |
| --- | ---: | ---: | ---: | ---: |
| Complete | 24 | 28h 19m | 20 | 25h 32m |
| AI Engineer | 23 | 27h 30m | 20 | 25h 32m |
| GenAI Engineer | 18 | 24h 10m | 15 | 21h 46m |
| MLOps Engineer | 12 | 12h 11m | 11 | 11h 48m |

The GenAI view removes Pandas, classification metrics and model-training projects. The MLOps view removes transformers, LangChain, RAG construction, agents and LLM-specific evaluation. The AI Engineer view retains the broad applied path and removes only optional MCP.

## Explicit coverage limits

The strict CampusX-only instruction is incompatible with claiming full production coverage where CampusX has no sufficient public playlist lesson. The route therefore does **not** claim that it teaches:

- Python asyncio, type hints or pytest
- raw provider SDK patterns or multimodal file APIs
- hybrid BM25/vector retrieval, RRF, HyDE or cross-encoder reranking
- FastAPI lifespan, dependency injection, async internals, automated tests or streaming cancellation
- semantic caching, provider prompt caching, retries, backoff, circuit breakers or model routing
- managed cloud AI APIs and cloud identity
- model/data drift monitoring
- vLLM, PagedAttention or self-hosted model serving
- complete prompt-injection, PII and RAG guardrail implementation

Some checkpoints still ask the learner to apply existing backend security, Docker, cloud and CI/CD knowledge. Those requirements are identified as prerequisite application, not CampusX lecture content.
