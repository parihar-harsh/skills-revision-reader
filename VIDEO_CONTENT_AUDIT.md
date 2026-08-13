# AI route video-content audit

Audit date: 2026-08-13

## Method

- Audited all 75 video IDs currently used by `roadmap.html`.
- Downloaded YouTube caption tracks only, not audio or video: 74 original-language tracks and one available English track.
- Removed rolling-caption overlap before analysis and checked the complete lesson or the exact recommended watch range.
- Compared each title, note, timestamp range and checkpoint dependency with the spoken content in its selected range.
- Marked route-level exercises, production controls and current corrections explicitly instead of presenting them as claims about a video.
- Did not commit captions or transcript text. This is a transcript-level content audit, not a frame-by-frame validation of silent on-screen code.
- Runtime was considered only after content sufficiency. A short lesson remains only when it covers a narrow topic completely.
- CampusX was checked first for every newly added topic. It supplied all three deep-learning additions. Its only public multimodal result was a paid-course announcement, and no sufficient public managed-cloud AI lesson was found, so a current specialist tutorial and an official AWS lesson were used for those two gaps.
- For the LLM-foundations revision, Hindi/Hinglish candidates were checked before English fallbacks. Two focused Hindi lessons were retained. Candidates that misstated architecture families, depended on an unlisted RNN/sequence-to-sequence course, or spent most of their runtime on model-training mathematics were rejected rather than included for language alone.

Status meanings:

- **Verified**: the selected transcript directly supports the lesson claim.
- **Scoped**: the video supports its core topic; additional route work is now labeled as an exercise, extension or correction.
- **Corrected**: the previous route wording overstated or misstated the video and has been fixed.
- **Added**: a missing concept now has a separately verified lesson.

## 01 Python for AI services

| Lesson | Status | Audit result |
| --- | --- | --- |
| `python-for-js` | Verified | Selected ranges cover variables, built-in types, strings, conditions, loops, collections and functions. |
| `python-oop` | Verified | Covers classes, objects, `self`, constructors and instance methods. |
| `python-comprehensions` | Scoped | Covers list, set and dictionary comprehensions plus the zip-based dictionary example; readability guidance is route advice. |
| `python-modules` | Verified | Selected range covers imports, reusable modules, package structure and libraries. |
| `python-files` | Verified | Selected ranges cover file open/write/read, context managers and JSON serialization. |
| `python-mutability` | Verified | Selected ranges cover references, aliasing, mutable objects and side effects. |
| `python-exceptions` | Verified | Selected range covers `try`, specific and multiple `except` clauses, `else` and `finally`. |
| `python-typing` | Scoped | Covers function and collection annotations; Pydantic and FastAPI are now identified as later route applications. |
| `python-venv` | Verified | Compares `venv`, `virtualenv` and Conda and demonstrates isolated environments. |
| `python-asyncio` | Verified | Selected ranges cover coroutines, the event loop, sequential awaits, tasks, `gather` and `TaskGroup`, including blocking-work limits. |
| `python-pytest` | Verified | Covers discovery conventions, assertions, unit boundaries, fixtures, setup/teardown, parameterization and mocks. |
| `python-numpy` | Corrected | Covers multidimensional arrays, shape, indexing and operations, but not broadcasting; the old broadcasting claim was removed. |
| `python-numpy-broadcasting` | Added | Dedicated CampusX lesson covers unequal compatible shapes, trailing-dimension rules, examples and failure cases. |
| `python-pandas` | Scoped | Selected ranges cover DataFrames, CSV/JSON, filtering, missing values, GroupBy and export; duplicate handling is explicitly a checkpoint task. |

## 02 Minimum AI, ML and deep-learning foundation

| Lesson | Status | Audit result |
| --- | --- | --- |
| `ai-to-llms` | Verified | Builds the AI, ML, deep learning and generative-AI hierarchy with output examples. |
| `ml-types` | Verified | Covers supervised classification/regression, unsupervised clustering/dimensionality reduction and semi-supervised learning. |
| `ml-data-splits` | Verified | Separates fitting, validation-based tuning and final test-set assessment. |
| `ml-bias` | Corrected | Teaches bias/variance and underfitting/overfitting diagnosis; remediation choices are now labeled as checkpoint work. |
| `ml-classification-metrics` | Verified | Covers confusion-matrix terms, accuracy limits, precision, recall, F1 and error-cost selection. |
| `sklearn-workflow` | Corrected | Covers preprocessing, train/test splitting, training-only scaler fitting, logistic regression, prediction and accuracy; it does not export the model. |
| `deep-learning-intro` | Added | Selected CampusX range distinguishes deep learning from classical ML and introduces input, hidden and output layers without adding an unnecessary full course. |
| `neural-network-training` | Added | Selected CampusX range traces initialized weights and biases through forward propagation, loss and backward parameter updates; derivative-heavy mathematics remains out of scope. |
| `keras-ann-project` | Added | CampusX demonstrates normalized MNIST input, a Keras Sequential ANN, hidden/output layers, loss, optimizer, epochs, validation, predictions and learning curves. |
| `pytorch-training-pipeline` | Added | Selected CampusX range converts prepared data to tensors, defines a small binary classifier, runs explicit forward/loss/backward/update steps and evaluates predictions. It is optional AI Engineer framework depth, not another full course. |

## 03 LLM and transformer fundamentals

| Lesson | Status | Audit result |
| --- | --- | --- |
| `llm-overview` | Added | The complete visual overview connects next-token prediction, parameters, pretraining, post-training and transformer-based generation without requiring architecture details first. |
| `llm-tokens-context` | Added | The Hindi lesson covers token splitting, vocabulary, token-dependent cost, context-window limits, compute trade-offs and imperfect long-context recall. |
| `transformer-families` | Verified | Directly distinguishes encoder-only, decoder-only and encoder-decoder behavior and use cases. |
| `decoder-only-transformer` | Added | One complete walkthrough covers embeddings, positional information, masked self-attention, Q/K/V, residual paths, next-token probabilities, autoregressive repetition and the difference from the original encoder-decoder design. |
| `llm-training-lifecycle` | Replaced | One contiguous range covers next-token pretraining, supervised instruction tuning, preference tuning, RLHF and DPO; the route clarifies that providers do not all use one mandatory post-training recipe. |
| `llm-sampling` | Replaced | The Hindi lesson compares temperature, top-k and top-p over a next-token distribution; the route explicitly separates repeatability from factual accuracy. |

The architecture and training claims were also cross-checked against primary references: Hugging Face's [causal language modeling](https://huggingface.co/docs/transformers/tasks/language_modeling) and [transformer architecture](https://huggingface.co/docs/course/chapter1/6) documentation, the original [Transformer paper](https://arxiv.org/abs/1706.03762), the [InstructGPT paper](https://arxiv.org/abs/2203.02155) and the [DPO paper](https://arxiv.org/abs/2305.18290).

## 04 Model APIs and LangChain

| Lesson | Status | Audit result |
| --- | --- | --- |
| `model-api-python` | Corrected | Demonstrates seven, not six, direct-SDK patterns: secrets, minimal call, roles, streaming, continuation, structured output and tool execution. |
| `multimodal-api` | Added | Uses the current `google-genai` SDK for client setup, text generation, streaming, chat state, image upload and a combined image-plus-text request. CampusX was checked first but had no sufficient public implementation lesson. |
| `prompt-engineering` | Verified | Selected ranges cover role, task, context, constraints, output format, examples and structured extraction. |
| `langchain-current` | Verified | Selected ranges cover setup, model calls, bound tools and execution loop, prompt templates, chains and Pydantic structured output. |
| `hugging-face-basics` | Verified | Selected range covers model-hub discovery, hosted inference, local download/execution, hardware, privacy, control, speed and cost trade-offs. |
| `lora-qlora` | Scoped | Covers full fine-tuning cost, quantization, low-rank adapters and QLoRA; prompting/RAG comparison is now labeled as a route exercise. |

## 05 Retrieval-Augmented Generation

| Lesson | Status | Audit result |
| --- | --- | --- |
| `rag-concept` | Verified | Selected ranges cover private/recent knowledge, hallucination, fine-tuning trade-offs, indexing/query paths and RAG limits. |
| `rag-loaders` | Verified | Selected range demonstrates text, PDF, directory, web and CSV loaders, eager/lazy behavior and custom loaders. |
| `rag-splitters` | Verified | Covers length-based, recursive/text-structure, document-structure and semantic splitting plus chunk-size/overlap trade-offs. |
| `rag-vector` | Scoped | Covers embeddings, vector store/database distinction, similarity/indexing and Chroma CRUD, scores and metadata filtering; authorization warnings are route security controls. |
| `rag-retrievers` | Scoped | Covers vector retrieval, MMR, multi-query and contextual compression; quality/latency/token comparison is now labeled as route work. |
| `rag-ragas` | Verified | Covers component, pipeline and application evaluation, context metrics, faithfulness, relevance, citations, safety, operations, baselines and CI gates with DeepEval. |
| `rag-hybrid-rrf` | Verified | Demonstrates BM25 and vector result lists, reciprocal-rank contributions, document-ID deduplication, score summation and final top-k. |
| `rag-reranking` | Verified | Covers HyDE, structured multi-query expansion, bi-encoder first-stage retrieval and cross-encoder reranking of a wider candidate set. |

## 06 Agents, LangGraph and advanced RAG

| Lesson | Status | Audit result |
| --- | --- | --- |
| `agent-vs-genai` | Corrected | The source compares a reactive tool-augmented chatbot with a goal-driven planning agent; the unsupported word `deterministic` was removed. |
| `langgraph-core` | Verified | Covers state, reducers, nodes, edges, sequential/conditional routing, loops and parallel branches. |
| `langgraph-tools` | Scoped | Covers model tool calls, `ToolNode`, `tools_condition`, state updates and looping; validation, timeouts and idempotency remain labeled checkpoint controls. |
| `advanced-rag-crag` | Verified | Selected ranges cover evidence grading, correct/incorrect/ambiguous routes, refinement, query rewriting and web retrieval. |
| `langgraph-persistence` | Verified | Selected range covers checkpointers, thread IDs, resume behavior, fault tolerance and the human-in-the-loop interrupt concept. |
| `mcp-architecture` | Corrected | Covers host/client/server and tools/resources/prompts. The route now corrects the old HTTP+SSE lesson to current stdio and Streamable HTTP guidance. |

The MCP transport correction follows the current official specification: <https://modelcontextprotocol.io/specification/2025-06-18/basic/transports>.

## 07 FastAPI for AI services

| Lesson | Status | Audit result |
| --- | --- | --- |
| `fastapi-crash` | Verified | Selected range creates an environment, installs FastAPI/Uvicorn, defines the app/route and runs the server. |
| `fastapi-request-models` | Verified | Selected range covers request bodies, Pydantic fields/constraints, generated docs, validation, POST and status responses. |
| `fastapi-production` | Verified | Selected range covers home/health routes, model version, separated loading, error mapping and typed responses. |
| `fastapi-lifespan` | Scoped | Directly covers startup creation, `app.state`, dependency access and shutdown cleanup; SDK-specific cleanup caution is an explicit correction. |
| `fastapi-depends` | Scoped | Demonstrates reusable validation and DB dependencies; authentication/client usage is now labeled as route application. |
| `fastapi-async` | Scoped | Demonstrates blocking `async def`, awaited I/O and sync routes in worker threads; CPU-process guidance is now labeled as an extension. |
| `fastapi-testing` | Verified | Covers TestClient, assertions and success/invalid status checks without claiming provider isolation. |
| `fastapi-test-overrides` | Scoped | Covers DB/auth/LLM/vector overrides, fixtures, cleanup and async HTTPX; timeout/error fakes are checkpoint extensions. |
| `fastapi-llm-streaming` | Scoped | Connects `astream` to `StreamingResponse`; disconnect detection, cancellation and cleanup are explicitly labeled extensions. |

## 08 Evaluation, observability and reliability

| Lesson | Status | Audit result |
| --- | --- | --- |
| `llm-eval-workflow` | Verified | Covers task/success definition, golden data, evaluation method, execution, failure analysis, iteration, deployment and monitoring. |
| `llm-eval-methods` | Verified | Covers deterministic, retrieval, human and model-graded methods, rubrics and reference-based/reference-free checks. |
| `langfuse-observability` | Verified | Covers tracing value, Langfuse/LangSmith comparison, integration and live-run inspection. |
| `llm-prompt-cache` | Verified | Covers exact hashmap-style caching, semantic vector caching, TTL/staleness, thresholds, false matches, latency and cost. |
| `llm-semantic-cache` | Verified | Selected range implements embeddings/cosine lookup with Redis/Valkey, TTL, repeated-query hits and cache inspection. |
| `llm-cost-optimization` | Verified | Selected ranges cover routing, cascading, provider prompt caching, compaction, batching, prompt tokens and cost observability. |
| `llm-reliability` | Scoped | Covers capped retries, backoff, jitter, fallbacks, circuit breakers, timeouts, idempotency, queues and DLQ; error classification and cancellation are explicit corrections. |

## 09 LLMOps foundations and model serving

| Lesson | Status | Audit result |
| --- | --- | --- |
| `mlops-lifecycle` | Verified | Covers collaboration, experiment/artifact tracking, version control, CI/CD, deployment, monitoring, drift and retraining. |
| `llmops-lifecycle` | Verified | Maps lifecycle concerns to LLM data, prompting/fine-tuning, evaluation, deployment, monitoring, security and compliance. |
| `managed-cloud-ai` | Added | Selected official AWS range covers Bedrock model selection and cost, playgrounds, the current Converse API, direct `boto3` calls, roles and multi-turn messages. Least-privilege IAM is correctly labeled as required route work rather than video content. |
| `llmops-mlflow-genai` | Verified | Demonstrates OpenAI/LangChain traces, tokens/latency/errors, dataset evaluation, prompt versions/optimization and gateway routing/fallback. |
| `llmops-ci` | Verified | Covers triggers, events, jobs, runners, YAML and an implemented unit-test workflow; correctly scoped to CI rather than full CD. |
| `llmops-cloud-cd` | Scoped | Demonstrates Docker, GitHub Actions, ECR and AWS compute deployment; OIDC, immutable digests, smoke tests and rollback are labeled modern extensions. |
| `llmops-vllm` | Verified | Demonstrates baseline comparison, KV-cache waste, PagedAttention, OpenAI-compatible serving, concurrent load, tuning and dashboard metrics. |

## 10 LLM security and graduation build

| Lesson | Status | Audit result |
| --- | --- | --- |
| `agent-guardrails` | Scoped | Covers deterministic/model checks, PII middleware, input/output controls and human approval; authorization/least-privilege limits are explicit defense-in-depth guidance. |
| `rag-guardrails` | Scoped | Covers untrusted retrieved text, prompt injection, grounding, output checks and a 10-case attack set; tenant authorization is explicitly a required security extension. |

## Changes produced by this audit

1. Added a dedicated 9-minute CampusX broadcasting lesson.
2. Removed broadcasting from the unrelated NumPy-array lesson.
3. Removed the unsupported scikit-learn model-export claim.
4. Reframed bias/variance remediation as checkpoint application.
5. Corrected the direct-SDK pattern count from six to seven.
6. Corrected transformer-flow wording around pre-softmax scores and logits.
7. Corrected reactive tool workflow wording in the agent comparison.
8. Updated MCP remote transport guidance to Streamable HTTP.
9. Separated video content from route exercises and production extensions across typing, LoRA/QLoRA, retrieval, FastAPI and security lessons.
10. Added three CampusX lessons for neural-network structure, training flow and a small Keras implementation so the AI Engineer path no longer stops at classical ML.
11. Added transcript-verified multimodal text-and-image API work and file-validation requirements.
12. Added a current official managed-cloud AI workflow with model-quality, latency, cost and least-privilege checkpoints.
13. Added a focused CampusX PyTorch training-pipeline segment to Full coverage after verifying that the broader AI Engineer role can require either PyTorch or TensorFlow experience.
