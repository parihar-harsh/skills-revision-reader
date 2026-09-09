# Fresher SDE Scope Reduction

Date: 2026-09-08. Supersedes the earlier no-removal instruction, following the user's explicit request to remove out-of-scope questions and use InterviewBit/GFG references.

## Result

- Active bank: **419 -> 358 questions**; curated priority: **367 -> 306**.
- **61 questions removed from the active JS data and rendered bank**, not merely hidden by a default filter: 20 AI-specialization entries and 41 DevOps/QA-specialization or redundant entries.
- The broad DevOps section is replaced by **Git and Delivery Basics (19 questions)**. The DevOps Engineer role option is removed.
- GenAI is reduced from 50 to **30 practical GenAI/RAG questions** for resume-project follow-ups. Its section is named Practical GenAI and RAG.
- Banker's algorithm, Q388, is retained and moved from DevOps to **Operating Systems**. It now belongs to SDE scope.
- Other subject sections remain. There are still **17 sections**: the delivery-basics subset replaces the specialist DevOps category rather than deleting its useful Git/Docker/CI/CD material.
- No new question was added. Retained titles, answers and stable IDs are unchanged by this pruning pass. Earlier audit corrections remain in place.

## Evidence and Interpretation

The requested references **do contain the specialist questions**. It would be false to say they are never asked or absent from GFG. This reduction is a judgment about the stated **fresher web-SDE target**, not a measured-frequency threshold. Specialist interviews and project-specific follow-ups can still ask the removed material. Lack of appearance in a general list was not treated as proof of zero occurrence.

References checked for this decision:

- [GFG software-developer preparation](https://www.geeksforgeeks.org/interview-experiences/software-developer-interview-questions/) distinguishes general student preparation, resume/technology discussion and DevOps/cloud-specific preparation. It explicitly says there is no fixed interview syllabus.
- [GFG SDE preparation](https://www.geeksforgeeks.org/dsa/sde-sheet-a-complete-guide-for-sde-preparation/) supports retaining CS fundamentals and project knowledge. This reader's DSA companion was not changed.
- [GFG DevOps questions](https://www.geeksforgeeks.org/devops/devops-interview-questions/) is the actual source bank for the operational/tool questions removed and the delivery basics retained.
- [GFG GenAI/LLM questions](https://www.geeksforgeeks.org/artificial-intelligence/generative-ai-interview-question-with-answer/) contains both model-training theory and application-level RAG/LLM material. This reader now retains the application-focused subset, not the entire specialist bank.
- [InterviewBit Git questions](https://www.interviewbit.com/git-interview-questions/) and [CI/CD questions](https://www.interviewbit.com/ci-cd-interview-questions/) support retaining version-control and delivery fundamentals.
- [InterviewBit Docker questions](https://www.interviewbit.com/docker-interview-questions/) separates basic container/architecture questions from more specialized details.

Some InterviewBit direct fetches returned 403; the accessible search-indexed page text was used for Git, CI/CD and Docker references. No login, paywall or access restriction was bypassed. Inclusion in these resources is not independently verified company occurrence. Answers were not replaced with source-site text; technical corrections from the prior audit are preserved.

## Preserved Foundations

JavaScript/TypeScript, HTML/CSS, React, Next.js, Tailwind, Node/Express/APIs, SQL/DBMS/MongoDB, OOP, OS and networking were not culled merely because a topic is less prominent. These are relevant to the stated skills and role. Practical RAG, embeddings, tokens, context, prompting, safety, evaluation and named application frameworks remain for resume follow-ups.

Git/delivery basics retain the existing eight SDE items, plus related source-backed developer concepts such as SSH, scaling, automation testing and delivery versus deployment. The category is deliberately not presented as a complete DevOps interview syllabus.

## Role Counts

| Role | Active | Curated priority |
|---|---:|---:|
| All positions | 358 | 306 |
| SDE I | 164 | 143 |
| Frontend React | 160 | 130 |
| Backend Node | 163 | 132 |
| Full-stack JS | 244 | 198 |
| MERN | 202 | 161 |
| GenAI applications | 232 | 191 |

SDE increased by one only because existing Q388 moved into its proper OS scope. The full bank decreased by 61. Priority is still curated study importance, not measured frequency.

## Removed Entries

Every row below is recoverable from [retired-questions.json](retired-questions.json), including its previous answer, ID, section and role memberships. These are not a list of questions proven to be "never asked."

| Original ID | Question | Scope reason |
|---|---|---|
| Q240 | What is the Encoder-Decoder Model in AI? | AI specialization |
| Q241 | What are Autoencoders and how do they work? | AI specialization |
| Q242 | What is a Variational Autoencoder (VAE)? How does it differ from a standard autoencoder? | AI specialization |
| Q243 | Explain GANs (Generative Adversarial Networks) and how the generator and discriminator interact. | AI specialization |
| Q244 | What are Diffusion Models and how do they generate data? | AI specialization |
| Q245 | Compare GANs and Diffusion Models | AI specialization |
| Q247 | What is Self-Attention and how does it differ from Cross-Attention? | AI specialization |
| Q248 | What is the role of Positional Encoding in Transformers? | AI specialization |
| Q254 | What is the difference between Fine-tuning and Transfer Learning? | AI specialization |
| Q255 | Explain LoRA (Low-Rank Adaptation) and how it helps in fine-tuning. | AI specialization |
| Q256 | What is QLoRA and how is it different from LoRA? | AI specialization |
| Q257 | What is PEFT (Parameter-Efficient Fine-Tuning)? | AI specialization |
| Q258 | Explain RLHF (Reinforcement Learning from Human Feedback). | AI specialization |
| Q259 | What is LLM Distillation and why is it used? | AI specialization |
| Q260 | What is Constitutional AI and how does it differ from RLHF? | AI specialization |
| Q268 | What are Multimodal Agents and give examples of their applications. | AI specialization |
| Q281 | Explain BLEU (Bilingual Evaluation Understudy) and where it is used. | AI specialization |
| Q282 | Explain FID (Fréchet Inception Distance) and how it measures generative quality. Also compare it with BLEU. | AI specialization |
| Q283 | What are the different types of LLMs? | AI specialization |
| Q287 | What are multimodal LLMs and how do they process text, image and audio simultaneously? | AI specialization |
| Q349 | What is a DevOps Engineer? | DevOps/QA specialization |
| Q350 | Which programming and scripting languages are important for a DevOps engineer? | DevOps/QA specialization |
| Q354 | What is the Blue/Green Deployment Pattern? | DevOps/QA specialization |
| Q355 | What's the difference between DevOps & Agile? | DevOps/QA specialization |
| Q356 | What is the continuous testing process? | DevOps/QA specialization |
| Q357 | What is the role of AWS in DevOps? | DevOps/QA specialization |
| Q358 | What do you mean by Configuration Management? | DevOps/QA specialization |
| Q363 | Name three important DevOps KPIs | DevOps/QA specialization |
| Q364 | What Is Jenkins? | DevOps/QA specialization |
| Q368 | What are the components of Selenium? | DevOps/QA specialization |
| Q369 | What is a Puppet in DevOps? | DevOps/QA specialization |
| Q370 | What is Ansible? | DevOps/QA specialization |
| Q372 | What is the importance of continuous feedback in DevOps? | DevOps/QA specialization |
| Q373 | What is Git Bash? | DevOps/QA specialization |
| Q376 | What is Git prune? | DevOps/QA specialization |
| Q377 | What's the difference between HTTP and HTTPS? | Duplicate of Q338 |
| Q380 | Explain the different phases in DevOps methodology. | DevOps/QA specialization |
| Q381 | What are antipatterns in devops and how to avoid them? | DevOps/QA specialization |
| Q382 | What is Component-Based Model (CBM) in DevOps? | DevOps/QA specialization |
| Q383 | How to Make a CI-CD Pipeline in Jenkins? | DevOps/QA specialization |
| Q384 | What's the difference between Chef and Puppet? | DevOps/QA specialization |
| Q385 | What is Git Rebase? | Covered by Q393 |
| Q386 | What is Selenium Tool Suite? | DevOps/QA specialization |
| Q387 | What is Selenium IDE? | DevOps/QA specialization |
| Q389 | How do you create a backup and copy files in Jenkins? | DevOps/QA specialization |
| Q390 | Explain how you can set up a Jenkins job? | DevOps/QA specialization |
| Q392 | What is the DevOps life cycle? | DevOps/QA specialization |
| Q394 | What's the difference between DataOps and DevOps? | DevOps/QA specialization |
| Q395 | What are the 7Cs of DevOps? | DevOps/QA specialization |
| Q396 | Explain the “Shift left to reduce failure” concept in DevOps? | DevOps/QA specialization |
| Q397 | Explain the concept of Infrastructure as Code (IaC) and discuss the benefits and challenges of implementing IaC in a large-scale production environment. | DevOps/QA specialization |
| Q398 | What strategies can be employed to achieve zero-downtime deployments, and how does the Blue/Green Deployment pattern fit into these strategies? | DevOps/QA specialization |
| Q399 | How do you ensure security and compliance in a CI/CD pipeline, particularly when integrating with multiple cloud providers and third-party services? | DevOps/QA specialization |
| Q400 | Discuss the importance of monitoring and logging in a DevOps environment. What tools and practices do you recommend for effective observability and incident management? | DevOps/QA specialization |
| Q401 | Explain the concept of immutable infrastructure and how it contrasts with traditional infrastructure management. What are the benefits and potential drawbacks of adopting immutable infrastructure in a DevOps workflow? | DevOps/QA specialization |
| Q402 | Explain the concept of serverless computing and its implications for DevOps practices. | DevOps/QA specialization |
| Q403 | What are Blue-Green and Canary Deployments in DevOps? | DevOps/QA specialization |
| Q404 | How do you optimize a Docker container for performance? | DevOps/QA specialization |
| Q405 | How do you handle rollbacks in Kubernetes? | DevOps/QA specialization |
| Q406 | How do you optimize a CI/CD pipeline for faster deployments? | DevOps/QA specialization |
| Q407 | What are Sidecar Containers in Kubernetes? | DevOps/QA specialization |

## Progress and Bookmarks

Original Q numbers are reserved and are not reused. The active bank intentionally has gaps; Q419 remains Q419 even though there are 358 active questions.

The existing progress/schema keys and legacy mapping are unchanged. Reviewed IDs for removed questions remain in the stored progress set, while counters count only active questions. For example, stored `[241,377,419]` displays **1/358**; reviewing Q1 saves `[1,241,377,419]`, and reload displays **2/358**. Nothing is mapped to a different question.

Removed bookmarks and number jumps show an explicit unavailable notice. Selecting a normal section clears that notice. A saved DevOps role falls back to SDE without deleting review history. Failure to load the retirement metadata stops startup before progress is changed.

The archive is a local recovery artifact, not fetched by the reader. `question-retirements.js` contains reserved IDs only, not removed question bodies. The archive is not a snapshot of the user's actual browser storage.

## Verification

Reproducible checks are in `scope-regression.mjs`, `scope-inventory.mjs`, `scope-visual.mjs`, `scope-structure.mjs` and their output artifacts. They use isolated Chrome profiles, never the user's active browser data.

The full suite covers the prior reader behaviors plus removal-specific cases: 252 role/section/priority combinations, retained answer identity, removed IDs absent from DOM and loaded question arrays, current and legacy progress, all historical IDs reviewed, storage interruption, removed-role restoration, Q419 jump, removed direct links and missing-metadata failure.

The seven viewport widths (320, 390, 720, 999, 1000, 1180, 1440) are tested in light and dark modes. Scope screenshots additionally cover both changed sections and the mobile drawer. Syntax and diff checks are run separately; automated tests do not prove interview frequency or universal relevance.

Recorded results: **41/41 browser test groups passed**, including **252 role/section/priority combinations**. All 14 viewport/theme states reported zero horizontal page overflow; their screenshots and 10 changed-section/drawer screenshots were visually inspected. No normal-operation page errors were recorded. The changed sections remained readable, but the existing horizontally scrolling toolbar can show partially clipped controls at its edges on narrow layouts, particularly after focusing the number jump. This is a remaining usability limitation, not a zero-clipping claim; no unrelated toolbar redesign was made in this pruning pass.

Isolated storage fixtures with 0, 100 and all 419 historical IDs reviewed occupied approximately 558, 1,140 and 3,692 UTF-16 bytes including keys and view metadata. Retired progress was preserved while active totals excluded it. Fifty synchronous search-handler measurements recorded a 2.10 ms median, 2.40 ms p95 and 4.10 ms maximum in this run; these are not end-to-end paint timings or universal performance guarantees.

## Local-Only Status

No commit, push or deployment was made. GitHub Pages has not received this reduction. Previous audit artifacts describe the earlier 419-question snapshot and are intentionally retained as historical evidence.

Reproduce locally:

```sh
export PLAYWRIGHT_MODULE=/tmp/skills-coverage-browser/node_modules/playwright-core/index.mjs
export CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
node audit/scope-inventory.mjs
node audit/scope-regression.mjs
node audit/scope-visual.mjs
node audit/scope-structure.mjs
git diff --check
```
