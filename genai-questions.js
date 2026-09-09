// Stable original numbers are retained after the fresher-SDE scope reduction.
window.GFG_GENAI_QUESTIONS = [
  {
    "number": 238,
    "sourceNumber": 1,
    "question": "What is Generative AI and how does its architecture work?",
    "answer": "Generative AI learns the distribution and patterns of training data so it can create new text, images, audio, video, or code. There is no single architecture: LLMs commonly use transformers, image generators may use diffusion models, and other systems may use GANs or VAEs."
  },
  {
    "number": 239,
    "sourceNumber": 2,
    "question": "What is the difference between Traditional AI and Generative AI?",
    "answer": "Predictive or discriminative AI maps inputs to labels, scores, or actions, while generative AI models a data distribution to produce new content. Generative models also make predictions, such as next-token prediction, so the distinction is the training objective and output, not simply old AI versus new AI."
  },
  {
    "number": 246,
    "sourceNumber": 9,
    "question": "What are Transformers and what is attention mechanism?",
    "answer": "A transformer processes token relationships using attention instead of recurrence. Attention builds query, key, and value vectors, scores which tokens are relevant, normalizes the scores, and combines the corresponding values."
  },
  {
    "number": 249,
    "sourceNumber": 12,
    "question": "Explain the concept of Context Window in LLMs.",
    "answer": "The context window is the token sequence a model can attend to in one request, including instructions, input, history, retrieved context, tool results, and generated tokens. Providers may also impose a separate output limit; excess content must be truncated, summarized, or handled in another request."
  },
  {
    "number": 250,
    "sourceNumber": 13,
    "question": "What is Tokenization and why is it important for LLMs?",
    "answer": "Tokenization converts raw text into token IDs the model can process. The chosen tokenizer affects context usage, cost, multilingual handling, and how efficiently common words or code fragments are represented."
  },
  {
    "number": 251,
    "sourceNumber": 14,
    "question": "What are Embeddings and how do they capture semantic meaning?",
    "answer": "Embeddings are dense numeric vectors learned so related items occupy nearby regions of vector space. Training objectives place semantically similar text closer even when it uses different words."
  },
  {
    "number": 252,
    "sourceNumber": 15,
    "question": "Compare different types of Embedding Databases.",
    "answer": "Local vector libraries are simple and fast for prototypes but leave persistence and scaling to the application. Self-hosted vector databases add indexes and metadata filtering with more operational work, while managed services handle scaling and availability at higher cost and with vendor dependence."
  },
  {
    "number": 253,
    "sourceNumber": 16,
    "question": "What are the use cases of Vector Databases in RAG pipelines?",
    "answer": "A vector database stores chunk embeddings and retrieves semantically related context for a query. It can also apply metadata filters, support hybrid retrieval, deduplicate similar content, and search across text or other embedded modalities."
  },
  {
    "number": 261,
    "sourceNumber": 24,
    "question": "What is Hugging Face and what are its main use cases?",
    "answer": "Hugging Face is an ecosystem for discovering, sharing, training, evaluating, and serving machine-learning models and datasets. Its libraries support transformers, tokenizers, datasets, PEFT, model evaluation, and deployment workflows."
  },
  {
    "number": 262,
    "sourceNumber": 25,
    "question": "What is the Model Hub, Model Card and Dataset Hub on Hugging Face?",
    "answer": "The Model Hub stores versioned model repositories. A model card documents intended use, training details, evaluation, limits, and risks; the Dataset Hub provides reusable datasets with metadata and loading support."
  },
  {
    "number": 263,
    "sourceNumber": 26,
    "question": "Compare Pipeline, Feature Extraction and Inference API.",
    "answer": "A Transformers pipeline is a high-level local interface that handles preprocessing, model execution, and postprocessing for a task. Feature Extraction is a task that returns model representations for downstream use and can run locally or remotely. HF Inference, formerly the serverless Inference API, sends a request to a remotely hosted model and returns that task's output."
  },
  {
    "number": 264,
    "sourceNumber": 27,
    "question": "What are Spaces in Hugging Face and what are their applications?",
    "answer": "Hugging Face Spaces hosts interactive machine-learning demos and small applications from Git repositories. Its current SDK choices are Gradio, Docker, and static HTML; Streamlit applications use the Docker SDK because the built-in Streamlit SDK is deprecated."
  },
  {
    "number": 265,
    "sourceNumber": 28,
    "question": "What is LangChain and what problem does it solve?",
    "answer": "LangChain provides reusable interfaces and components for models, prompts, retrievers, tools, structured output, and multi-step LLM workflows. It reduces integration code, but application-specific retrieval, validation, authorization, and failure handling still need deliberate design."
  },
  {
    "number": 266,
    "sourceNumber": 29,
    "question": "Explain LangGraph and how it enhances agentic workflows.",
    "answer": "LangGraph models a workflow as state passed through nodes and conditional edges. It supports cycles, branching, checkpoints, human approval, retries, and controlled tool use, which are difficult to express as one linear chain."
  },
  {
    "number": 267,
    "sourceNumber": 30,
    "question": "What is LlamaIndex and how does it integrate with external data sources?",
    "answer": "LlamaIndex focuses on connecting LLM applications to private or external data. It provides data connectors, document and node abstractions, indexes, retrievers, query engines, and response synthesis components."
  },
  {
    "number": 269,
    "sourceNumber": 32,
    "question": "Explain RAG (Retrieval-Augmented Generation) architecture in detail.",
    "answer": "RAG has an ingestion path and a query path. Ingestion loads and splits data, creates embeddings, and stores chunks with metadata; querying embeds or rewrites the question, retrieves and optionally reranks context, builds a grounded prompt, generates the answer, and returns evidence."
  },
  {
    "number": 270,
    "sourceNumber": 33,
    "question": "Compare Closed-book models vs. RAG models.",
    "answer": "A closed-book model answers only from information encoded in its weights and current prompt. RAG first retrieves external evidence, so it can use private or updated facts and show sources, but it adds indexing, retrieval latency, and more failure modes."
  },
  {
    "number": 271,
    "sourceNumber": 34,
    "question": "How does Generative AI differ from Agentic AI?",
    "answer": "Generative AI primarily produces content from an input. Agentic AI uses a model inside a goal-driven loop that can plan, choose tools, observe results, update state, and continue until it finishes or reaches a stop condition."
  },
  {
    "number": 272,
    "sourceNumber": 35,
    "question": "What is the role of Vector Stores in a RAG pipeline?",
    "answer": "A vector store keeps embeddings together with source text and metadata, builds an index, and returns nearest candidates for a query vector. Good systems also support access filters, namespaces, updates, deletion, and hybrid retrieval."
  },
  {
    "number": 273,
    "sourceNumber": 36,
    "question": "What is Prompt Engineering and why is it important?",
    "answer": "Prompt engineering means designing and testing instructions, context placement, examples, constraints, and output formats so a model behaves consistently for a task. It improves reliability but does not replace authorization, validation, or evaluation in code."
  },
  {
    "number": 274,
    "sourceNumber": 37,
    "question": "Explain different types of prompting.",
    "answer": "Zero-shot prompting gives only instructions, few-shot prompting adds examples, role or system prompting sets behavior, and structured prompting defines sections or an output schema. Decomposition and reasoning prompts break a complex task into smaller steps, while retrieval adds external context."
  },
  {
    "number": 275,
    "sourceNumber": 38,
    "question": "What is LLM Injection (Prompt Injection) and how can it be prevented?",
    "answer": "Prompt injection is untrusted input that tries to override instructions, expose data, or misuse tools. Reduce risk by separating instructions from data, enforcing permissions outside the model, limiting tools, validating arguments and outputs, filtering sensitive data, and requiring approval for high-impact actions."
  },
  {
    "number": 276,
    "sourceNumber": 39,
    "question": "What are Guardrails in LLMs and why are they important?",
    "answer": "Guardrails are controls around model input, tool use, and output. They can enforce schemas, safety policy, access rules, allowed topics, citation requirements, rate limits, and human approval because model instructions alone are not a security boundary."
  },
  {
    "number": 277,
    "sourceNumber": 40,
    "question": "What is Hallucination in LLMs and how can it be mitigated?",
    "answer": "A hallucination is a fluent claim that is false or unsupported by available evidence. Mitigation includes grounded retrieval, better context, source citations, lower randomness where appropriate, output verification, refusal on insufficient evidence, and evaluation against known answers."
  },
  {
    "number": 278,
    "sourceNumber": 41,
    "question": "What is Knowledge in LLMs and how can we update or augment it?",
    "answer": "Parametric knowledge is encoded in model weights during training, while contextual knowledge is supplied at inference time. Update behavior through retraining or fine-tuning, and augment current or private facts through RAG, tools, databases, and APIs."
  },
  {
    "number": 279,
    "sourceNumber": 42,
    "question": "What is LLM Evaluation and why is it necessary?",
    "answer": "LLM evaluation measures whether an application is accurate, relevant, safe, robust, fast, and cost-effective for its real task. It is necessary because model quality varies by prompt and data, and an apparently fluent response may still be wrong."
  },
  {
    "number": 280,
    "sourceNumber": 43,
    "question": "What are different types of LLM evaluation techniques?",
    "answer": "Common techniques include human review, deterministic checks, reference-based metrics, embedding similarity, task-specific benchmarks, model-as-judge scoring, adversarial tests, component evaluation, end-to-end evaluation, and online user metrics. Strong evaluation combines methods rather than trusting one score."
  },
  {
    "number": 284,
    "sourceNumber": 47,
    "question": "What is Memory in LLMs and how is it implemented in agentic systems?",
    "answer": "The base LLM is normally stateless between API calls. Agent memory is application-managed state: short-term history stays in the context, summaries compress older turns, and long-term facts are stored in databases or vector stores and retrieved when relevant."
  },
  {
    "number": 285,
    "sourceNumber": 48,
    "question": "What are agentic LLMs and how do they differ from simple chat-based LLMs?",
    "answer": "A simple chat LLM maps conversation input to a response. An agentic system wraps an LLM in an execution loop with goals, state, planning, tool selection, observations, retries, permissions, and explicit stopping rules."
  },
  {
    "number": 286,
    "sourceNumber": 49,
    "question": "How do frameworks like LangChain, LangGraph and LlamaIndex interconnect in an end-to-end GenAI project?",
    "answer": "LlamaIndex can ingest, index, and retrieve external data; LangChain can provide model, prompt, tool, and output components; LangGraph can coordinate those components as a stateful workflow. They overlap, so a project should use only the pieces that reduce real complexity."
  }
];
