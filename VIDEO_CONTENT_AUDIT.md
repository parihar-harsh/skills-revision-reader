# CampusX-only AI route audit

Audit date: 2026-08-13

## Channel-wide scope

The audit refreshed every public CampusX channel index available through YouTube:

- 1,261 standard videos
- 67 livestreams
- 5 Shorts
- 1,333 unique public upload IDs across those three tabs
- 119 public playlists

All 119 playlist names and all 1,333 upload titles were checked for relevance to the route. Automated candidate passes found 99 titles related to GenAI, LLMs, transformers, RAG, agents or evaluation; 17 related to FastAPI or MLOps delivery; and 344 related to Python, ML or deep-learning foundations. These groups overlap.

Descriptions, chapters and available Hindi captions were then reviewed for retained assignments and close alternatives. Irrelevant uploads such as web development, DSA, analytics, career advice and promotional videos were classified from the full index but were not transcript-reviewed. This distinction matters: the entire public channel index was audited for relevance, while content-level review was concentrated on plausible route candidates.

YouTube can add or remove content after the audit date. The counts above describe the public channel state captured on that date.

## Result

The roadmap contains 27 playlist assignments across 10 modules:

- 21 essential assignments: 1,599 minutes (26 hours 39 minutes)
- 6 optional depth assignments: 312 minutes (5 hours 12 minutes)
- Complete route: 1,911 minutes (31 hours 51 minutes)
- Every assignment source starts with `CampusX |`.
- Every assignment URL includes an official CampusX playlist ID and opens at the first selected video.
- No resource ID or thumbnail video ID is duplicated.
- No external creator, standalone fallback or non-playlist learning link remains.

A playlist assignment is a curated unit of progress. It can contain several named videos or timestamp ranges from one playlist when those pieces form one capability. Repeated recaps and duplicate implementations are explicitly skipped.

## Validation method

1. Enumerated the channel's Videos, Live, Shorts and Playlists tabs.
2. Classified the full upload and playlist indexes by route relevance.
3. Expanded the 16 source playlists used by the route and compared every item in each relevant sequence.
4. Checked descriptions, chapter timestamps and available captions for retained and competing candidates.
5. Kept a later lecture only when it adds a distinct capability rather than another explanation of the same concept.
6. Verified every selected video ID and index against its declared CampusX playlist.
7. Recalculated all position and depth filters after consolidation.
8. Tested all eight position/depth combinations, browser persistence and desktop/mobile rendering.

No caption files, transcripts or downloaded media are committed.

## Source playlists

The 27 assignments use these 16 official CampusX playlists:

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

## Assignment map

| Module | Assignment | Playlist | Unique purpose |
| --- | --- | --- | --- |
| 01 | python-core | 100 Days of Python Programming | Collections, mutability, functions, modules and OOP for an existing programmer |
| 01 | python-files-errors | Data Science Mentorship Program | File I/O, context managers, JSON and exception handling |
| 01 | numpy-core | NumPy | Arrays, shape, indexing, vectorized operations and broadcasting |
| 01 | pandas-core | Pandas | DataFrames, CSV, filtering, duplicates, GroupBy and missing values |
| 02 | ml-concepts | 100 Days of Machine Learning | AI/ML/DL hierarchy, learning types and bias-variance behavior |
| 02 | ml-metrics | Machine Learning Metrics | Confusion matrix, accuracy limits, precision, recall and F1 |
| 02 | sklearn-workflow | 100 Days of Machine Learning | The only classical-ML implementation project |
| 02 | neural-network-training | 100 Days of Deep Learning | Forward pass, loss and backpropagation |
| 02 | keras-ann-project | 100 Days of Deep Learning | The only Keras implementation project |
| 02 | pytorch-training-pipeline | Practical Deep Learning using PyTorch | Optional translation of the training loop to PyTorch |
| 03 | llm-evolution | 100 Days of Deep Learning | Pretraining, fine-tuning, BERT/GPT and the decoder-only LLM bridge |
| 03 | transformer-core | 100 Days of Deep Learning | Attention, position, causal masking, decoder mechanics and token-by-token inference |
| 04 | langchain-core | Generative AI using LangChain | Model calls, prompts, structured output and chains |
| 05 | rag-architecture | RAG Playlist | Why RAG, indexing/query paths, limitations and fine-tuning trade-offs |
| 05 | rag-core | RAG Playlist | Loaders, splitters, vector stores and retrievers |
| 05 | rag-advanced | RAG Playlist | Optional Self-RAG retrieval, grounding and answer checks |
| 06 | agent-core | Agentic AI using LangGraph | Agent decision boundary plus state, nodes, edges and routing |
| 06 | agent-memory | Memory in LLMs | Optional memory architecture, persistent short-term state and context control |
| 06 | mcp-architecture | Model Context Protocol | Optional architecture plus local server and client implementation |
| 07 | fastapi-core | FastAPI for Machine Learning | Setup, Pydantic requests, model serving, health and error responses |
| 08 | llm-eval-methods | LLM Evaluation | Deterministic, human and model-graded evaluation methods |
| 08 | rag-evaluation | LLM Evaluation | Hands-on retriever metrics, goldens, DeepEval and retrieval optimization |
| 08 | langsmith-observability | Agentic AI using LangGraph | Focused graph tracing without the separate two-hour crash course |
| 08 | online-evaluation | LLM Evaluation | Optional offline gates, production sampling and feedback loops |
| 09 | mlops-project | 100 Days of MLOps | MLflow, DVC, registry, promotion and CI/CD in one project |
| 09 | mlops-data-management | 100 Days of MLOps | Optional ETL boundaries, data storage and management tools |
| 10 | bounded-tools | Agentic AI using LangGraph | ToolNode execution and human approval |

## Corrections from the channel-wide pass

- **LLM foundations:** The old route jumped from attention mechanics to LangChain. A dedicated CampusX range now covers transfer learning, pretraining, fine-tuning, BERT versus GPT and decoder-only LLMs first.
- **Transformer wording:** CampusX's decoder architecture lesson is an encoder-decoder translation model with cross-attention, not an exact GPT decoder. The route now states that distinction and adds the high-level inference range without repeating the detailed calculation.
- **Advanced RAG:** Self-RAG replaces CRAG. Both grade evidence and rewrite weak queries, while Self-RAG also adds retrieval decisions, hallucination checks and revised-answer loops in less selected time.
- **Memory:** The older generic persistence lesson is replaced by the dedicated Memory in LLMs playlist. The selected ranges cover context windows, long-term memory architecture, PostgreSQL checkpointers, trimming, deletion and summarization without repeating the stateless-LLM introduction.
- **RAG evaluation:** The interview overview is replaced by the newer hands-on retriever evaluation. It adds robust golden data, contextual recall, rank-aware precision, DeepEval, cross-encoder reranking and measured retrieval trials.
- **Online evaluation:** A separate optional assignment now covers what offline tests cannot see: production inputs, latency spikes, feedback, PII masking, sampling and feeding failures back into the offline set.
- **MCP:** Architecture alone was insufficient. The assignment now includes selected local-server and client ranges so Full coverage can actually build the protocol flow.
- **MLOps:** The project remains the implementation anchor; one short optional data-management range adds the ETL and storage boundary that the project compresses.

## Deliberate exclusions

- **Agentic Coding using Claude Code:** It teaches developer-tool usage, not how to engineer AI products or agent runtimes.
- **n8n, Make.com and CrewAI masterclasses:** They introduce additional orchestration surfaces without adding a capability missing from the LangGraph path. Several are standalone uploads rather than the curated playlist path requested here.
- **Ollama masterclass:** Useful for local-model operation, but its model calls, conversations and tool loops substantially overlap LangChain and LangGraph. Production vLLM-style serving is not taught by it.
- **CRAG:** Removed after Self-RAG was added because evidence grading and query rewriting repeat.
- **LangChain tools and end-to-end agent:** Removed because LangGraph tools, routing and approval are taught once later.
- **LangGraph sequential, parallel, conditional and iterative demos:** The core-concepts assignment already teaches nodes, edges, reducers and routing; the checkpoint applies them.
- **LangSmith crash course:** The focused LangGraph integration supplies the tracing capability without another two hours.
- **LLM benchmark history and leaderboard lectures:** Useful specialization, but not required before a fresher can build and evaluate an application. The route prioritizes task-specific evaluation.
- **Full ML algorithm, mathematics, NLP, CNN, GAN and reinforcement-learning playlists:** These target data-science, ML-specialist or research depth beyond the three applied roles.
- **Career, roadmap, launch, promotional and success-story videos:** They do not teach an implementation or interview capability.

## Position views

| Position | Full assignments | Full time | Fast assignments | Fast time |
| --- | ---: | ---: | ---: | ---: |
| Complete | 27 | 31h 51m | 21 | 26h 39m |
| AI Engineer | 26 | 30h 14m | 21 | 26h 39m |
| GenAI Engineer | 20 | 27h 18m | 16 | 22h 53m |
| MLOps Engineer | 13 | 12h 35m | 11 | 11h 48m |

The GenAI view removes Pandas, classification metrics and model-training projects. The MLOps view removes LLM-specific foundations and evaluation, LangChain, RAG and agents. The AI Engineer view retains the broad applied path and removes optional MCP.

## Explicit coverage limits

The strict CampusX-only instruction is incompatible with claiming complete production coverage where no sufficient public CampusX playlist lesson exists. The route does **not** claim that it teaches:

- Python asyncio, type hints or pytest
- raw hosted-provider SDK patterns or a complete multimodal file API
- hybrid BM25/vector retrieval, RRF or HyDE
- FastAPI lifespan, dependency injection, async internals, automated tests or streaming cancellation
- semantic caching, provider prompt caching, retries, backoff, circuit breakers or model routing
- managed cloud AI APIs and cloud identity
- implemented model/data-drift dashboards and alerts
- vLLM, PagedAttention or production self-hosted model serving
- complete prompt-injection, PII and RAG guardrail implementation

Some checkpoints ask the learner to apply existing backend security, Docker, cloud and CI/CD knowledge. Those are declared prerequisites, not CampusX lecture claims.
