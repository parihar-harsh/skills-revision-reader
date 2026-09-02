window.GFG_GENAI_QUESTIONS = [
  {
    question: "What is Generative AI and how does its architecture work?",
    answer: "Generative AI learns the distribution and patterns of training data so it can create new text, images, audio, video, or code. There is no single architecture: LLMs commonly use transformers, image generators may use diffusion models, and other systems may use GANs or VAEs.",
  },
  {
    question: "What is the difference between Traditional AI and Generative AI?",
    answer: "Predictive or discriminative AI maps inputs to labels, scores, or actions, while generative AI models a data distribution to produce new content. Generative models also make predictions, such as next-token prediction, so the distinction is the training objective and output, not simply old AI versus new AI.",
  },
  {
    question: "What is the Encoder-Decoder Model in AI?",
    answer: "An encoder converts the input into contextual representations. A decoder uses those representations and previously generated tokens to produce the output sequence one step at a time.",
  },
  {
    question: "What are Autoencoders and how do they work?",
    answer: "An autoencoder is trained to reconstruct its input. The encoder compresses the input into a latent representation, the decoder rebuilds it, and reconstruction error trains both parts.",
  },
  {
    question: "What is a Variational Autoencoder (VAE)? How does it differ from a standard autoencoder?",
    answer: "A standard autoencoder maps an input to a fixed latent vector. A VAE learns a probability distribution, usually a mean and variance, and samples from it; its loss combines reconstruction quality with regularization of the latent space.",
  },
  {
    question: "Explain GANs (Generative Adversarial Networks) and how the generator and discriminator interact.",
    answer: "A GAN trains two neural networks against each other. The generator turns random noise into synthetic samples, while the discriminator tries to distinguish real training samples from generated ones; feedback from the discriminator improves the generator.",
  },
  {
    question: "What are Diffusion Models and how do they generate data?",
    answer: "A diffusion model learns to reverse a gradual noising process. At generation time it starts from random noise and repeatedly predicts and removes noise until a structured sample appears.",
  },
  {
    question: "Compare GANs and Diffusion Models",
    answer: "GANs use adversarial training and usually generate a sample in one forward pass, so inference can be fast but training may be unstable or suffer mode collapse. Diffusion models train more steadily and often produce diverse, high-quality samples, but generation needs many denoising steps and is slower.",
  },
  {
    question: "What are Transformers and what is attention mechanism?",
    answer: "A transformer processes token relationships using attention instead of recurrence. Attention builds query, key, and value vectors, scores which tokens are relevant, normalizes the scores, and combines the corresponding values.",
  },
  {
    question: "What is Self-Attention and how does it differ from Cross-Attention?",
    answer: "Self-attention creates queries, keys, and values from the same sequence, so tokens exchange information with one another. Cross-attention takes queries from one sequence and keys and values from another, connecting two sources.",
  },
  {
    question: "What is the role of Positional Encoding in Transformers?",
    answer: "Attention alone does not know token order. Positional encodings add position information to token representations so the model can learn sequence order and relative distance.",
  },
  {
    question: "Explain the concept of Context Window in LLMs.",
    answer: "The context window is the token sequence a model can attend to in one request, including instructions, input, history, retrieved context, tool results, and generated tokens. Providers may also impose a separate output limit; excess content must be truncated, summarized, or handled in another request.",
  },
  {
    question: "What is Tokenization and why is it important for LLMs?",
    answer: "Tokenization converts raw text into token IDs the model can process. The chosen tokenizer affects context usage, cost, multilingual handling, and how efficiently common words or code fragments are represented.",
  },
  {
    question: "What are Embeddings and how do they capture semantic meaning?",
    answer: "Embeddings are dense numeric vectors learned so related items occupy nearby regions of vector space. Training objectives place semantically similar text closer even when it uses different words.",
  },
  {
    question: "Compare different types of Embedding Databases.",
    answer: "Local vector libraries are simple and fast for prototypes but leave persistence and scaling to the application. Self-hosted vector databases add indexes and metadata filtering with more operational work, while managed services handle scaling and availability at higher cost and with vendor dependence.",
  },
  {
    question: "What are the use cases of Vector Databases in RAG pipelines?",
    answer: "A vector database stores chunk embeddings and retrieves semantically related context for a query. It can also apply metadata filters, support hybrid retrieval, deduplicate similar content, and search across text or other embedded modalities.",
  },
  {
    question: "What is the difference between Fine-tuning and Transfer Learning?",
    answer: "Transfer learning means reusing knowledge from a model trained on one broad task or dataset for another task. Fine-tuning is one transfer-learning method that continues training some or all pretrained weights on task-specific data.",
  },
  {
    question: "Explain LoRA (Low-Rank Adaptation) and how it helps in fine-tuning.",
    answer: "LoRA, or Low-Rank Adaptation, freezes the original model and trains small low-rank matrices added to selected layers. It greatly reduces trainable parameters, memory use, and the size of task-specific checkpoints.",
  },
  {
    question: "What is QLoRA and how is it different from LoRA?",
    answer: "QLoRA combines LoRA adapters with a quantized, usually 4-bit, frozen base model. LoRA reduces trainable parameters; QLoRA additionally reduces the memory used to store the base model during fine-tuning.",
  },
  {
    question: "What is PEFT (Parameter-Efficient Fine-Tuning)?",
    answer: "PEFT is a family of methods that adapt a pretrained model while training only a small number of new or selected parameters. LoRA, adapters, and prompt or prefix tuning are common PEFT approaches.",
  },
  {
    question: "Explain RLHF (Reinforcement Learning from Human Feedback).",
    answer: "RLHF aligns a model with human preferences. A common pipeline starts with supervised instruction tuning, collects human comparisons between outputs, learns a reward signal, and optimizes the model toward preferred behavior.",
  },
  {
    question: "What is LLM Distillation and why is it used?",
    answer: "Distillation trains a smaller student model to imitate outputs, probabilities, or intermediate behavior from a larger teacher model. It is used to reduce latency, memory, serving cost, and hardware requirements while keeping much of the teacher's capability.",
  },
  {
    question: "What is Constitutional AI and how does it differ from RLHF?",
    answer: "Constitutional AI guides behavior using an explicit set of written principles and model-generated critiques or revisions. RLHF mainly learns from human preference labels; Constitutional AI reduces some labeling work by applying the stated rules during feedback and alignment.",
  },
  {
    question: "What is Hugging Face and what are its main use cases?",
    answer: "Hugging Face is an ecosystem for discovering, sharing, training, evaluating, and serving machine-learning models and datasets. Its libraries support transformers, tokenizers, datasets, PEFT, model evaluation, and deployment workflows.",
  },
  {
    question: "What is the Model Hub, Model Card and Dataset Hub on Hugging Face?",
    answer: "The Model Hub stores versioned model repositories. A model card documents intended use, training details, evaluation, limits, and risks; the Dataset Hub provides reusable datasets with metadata and loading support.",
  },
  {
    question: "Compare Pipeline, Feature Extraction and Inference API.",
    answer: "A Transformers pipeline is a high-level local interface that handles preprocessing, model execution, and postprocessing for a task. Feature Extraction is a task that returns model representations for downstream use and can run locally or remotely. HF Inference, formerly the serverless Inference API, sends a request to a remotely hosted model and returns that task's output.",
  },
  {
    question: "What are Spaces in Hugging Face and what are their applications?",
    answer: "Hugging Face Spaces hosts interactive machine-learning demos and small applications from Git repositories. Its current SDK choices are Gradio, Docker, and static HTML; Streamlit applications use the Docker SDK because the built-in Streamlit SDK is deprecated.",
  },
  {
    question: "What is LangChain and what problem does it solve?",
    answer: "LangChain provides reusable interfaces and components for models, prompts, retrievers, tools, structured output, and multi-step LLM workflows. It reduces integration code, but application-specific retrieval, validation, authorization, and failure handling still need deliberate design.",
  },
  {
    question: "Explain LangGraph and how it enhances agentic workflows.",
    answer: "LangGraph models a workflow as state passed through nodes and conditional edges. It supports cycles, branching, checkpoints, human approval, retries, and controlled tool use, which are difficult to express as one linear chain.",
  },
  {
    question: "What is LlamaIndex and how does it integrate with external data sources?",
    answer: "LlamaIndex focuses on connecting LLM applications to private or external data. It provides data connectors, document and node abstractions, indexes, retrievers, query engines, and response synthesis components.",
  },
  {
    question: "What are Multimodal Agents and give examples of their applications.",
    answer: "A multimodal agent combines inputs such as text, images, audio, video, or sensor data and can call tools based on the result. Typical applications include visual quality inspection, document understanding, screen-aware assistants, and voice agents that listen, reason, and take an authorized action.",
  },
  {
    question: "Explain RAG (Retrieval-Augmented Generation) architecture in detail.",
    answer: "RAG has an ingestion path and a query path. Ingestion loads and splits data, creates embeddings, and stores chunks with metadata; querying embeds or rewrites the question, retrieves and optionally reranks context, builds a grounded prompt, generates the answer, and returns evidence.",
  },
  {
    question: "Compare Closed-book models vs. RAG models.",
    answer: "A closed-book model answers only from information encoded in its weights and current prompt. RAG first retrieves external evidence, so it can use private or updated facts and show sources, but it adds indexing, retrieval latency, and more failure modes.",
  },
  {
    question: "How does Generative AI differ from Agentic AI?",
    answer: "Generative AI primarily produces content from an input. Agentic AI uses a model inside a goal-driven loop that can plan, choose tools, observe results, update state, and continue until it finishes or reaches a stop condition.",
  },
  {
    question: "What is the role of Vector Stores in a RAG pipeline?",
    answer: "A vector store keeps embeddings together with source text and metadata, builds an index, and returns nearest candidates for a query vector. Good systems also support access filters, namespaces, updates, deletion, and hybrid retrieval.",
  },
  {
    question: "What is Prompt Engineering and why is it important?",
    answer: "Prompt engineering means designing and testing instructions, context placement, examples, constraints, and output formats so a model behaves consistently for a task. It improves reliability but does not replace authorization, validation, or evaluation in code.",
  },
  {
    question: "Explain different types of prompting.",
    answer: "Zero-shot prompting gives only instructions, few-shot prompting adds examples, role or system prompting sets behavior, and structured prompting defines sections or an output schema. Decomposition and reasoning prompts break a complex task into smaller steps, while retrieval adds external context.",
  },
  {
    question: "What is LLM Injection (Prompt Injection) and how can it be prevented?",
    answer: "Prompt injection is untrusted input that tries to override instructions, expose data, or misuse tools. Reduce risk by separating instructions from data, enforcing permissions outside the model, limiting tools, validating arguments and outputs, filtering sensitive data, and requiring approval for high-impact actions.",
  },
  {
    question: "What are Guardrails in LLMs and why are they important?",
    answer: "Guardrails are controls around model input, tool use, and output. They can enforce schemas, safety policy, access rules, allowed topics, citation requirements, rate limits, and human approval because model instructions alone are not a security boundary.",
  },
  {
    question: "What is Hallucination in LLMs and how can it be mitigated?",
    answer: "A hallucination is a fluent claim that is false or unsupported by available evidence. Mitigation includes grounded retrieval, better context, source citations, lower randomness where appropriate, output verification, refusal on insufficient evidence, and evaluation against known answers.",
  },
  {
    question: "What is Knowledge in LLMs and how can we update or augment it?",
    answer: "Parametric knowledge is encoded in model weights during training, while contextual knowledge is supplied at inference time. Update behavior through retraining or fine-tuning, and augment current or private facts through RAG, tools, databases, and APIs.",
  },
  {
    question: "What is LLM Evaluation and why is it necessary?",
    answer: "LLM evaluation measures whether an application is accurate, relevant, safe, robust, fast, and cost-effective for its real task. It is necessary because model quality varies by prompt and data, and an apparently fluent response may still be wrong.",
  },
  {
    question: "What are different types of LLM evaluation techniques?",
    answer: "Common techniques include human review, deterministic checks, reference-based metrics, embedding similarity, task-specific benchmarks, model-as-judge scoring, adversarial tests, component evaluation, end-to-end evaluation, and online user metrics. Strong evaluation combines methods rather than trusting one score.",
  },
  {
    question: "Explain BLEU (Bilingual Evaluation Understudy) and where it is used.",
    answer: "BLEU, or Bilingual Evaluation Understudy, measures modified n-gram precision between generated text and one or more references and applies a brevity penalty. It is mainly used for machine translation and is weak at judging factuality or equally valid paraphrases.",
  },
  {
    question: "Explain FID (Fréchet Inception Distance) and how it measures generative quality. Also compare it with BLEU.",
    answer: "FID, or Frechet Inception Distance, compares the mean and covariance of feature representations from real and generated image sets; lower is better. BLEU measures text n-gram overlap and higher is better, so they evaluate different modalities and neither fully captures human quality.",
  },
  {
    question: "What are the different types of LLMs?",
    answer: "By transformer architecture, common types are encoder-only models for understanding, decoder-only models for autoregressive generation, and encoder-decoder models for sequence-to-sequence tasks. Models may also be general-purpose, domain-specific, instruction-tuned, code-focused, or multimodal.",
  },
  {
    question: "What is Memory in LLMs and how is it implemented in agentic systems?",
    answer: "The base LLM is normally stateless between API calls. Agent memory is application-managed state: short-term history stays in the context, summaries compress older turns, and long-term facts are stored in databases or vector stores and retrieved when relevant.",
  },
  {
    question: "What are agentic LLMs and how do they differ from simple chat-based LLMs?",
    answer: "A simple chat LLM maps conversation input to a response. An agentic system wraps an LLM in an execution loop with goals, state, planning, tool selection, observations, retries, permissions, and explicit stopping rules.",
  },
  {
    question: "How do frameworks like LangChain, LangGraph and LlamaIndex interconnect in an end-to-end GenAI project?",
    answer: "LlamaIndex can ingest, index, and retrieve external data; LangChain can provide model, prompt, tool, and output components; LangGraph can coordinate those components as a stateful workflow. They overlap, so a project should use only the pieces that reduce real complexity.",
  },
  {
    question: "What are multimodal LLMs and how do they process text, image and audio simultaneously?",
    answer: "Multimodal models use modality-specific encoders or tokenizers, project their representations into a compatible space, and use attention to connect information across modalities. A decoder or task head then produces text, audio, images, or another requested output.",
  }
];
