# Project Status

**Last updated:** 2026-06-17 — **🎉 ALL 10 MODULES COMPLETE.** Module 10 (End-to-End Systems, Scaling & Capstone, **10/10 lessons**) built this session from `10 End to End System Scaling/module-10-lesson.md.pdf` (10 topics, richer than curriculum.md's 8). **92 routes, `next build` green. 89 lessons total across Modules 1–10.** Emerald accent; **+25 diagrams** in `diagrams/module-10.tsx`. Same session: Module 8 finished (8.10–8.13), Module 9 built (11 lessons), global diagram font bump (DIAGRAM_SCALE 1.16), and **client-side full-text search** added (⌘K, no backend — see "🔎 Full-text search" below). **Phase 2 (content scaling) is DONE.** (Login/auth was discussed but deferred again — user chose search first.)

## ▶ RESUME HERE — Phase 2 content is complete; what's left is polish & deferred phases

All ten curriculum modules are built and pushed (89 lessons), and **full-text search has shipped** (⌘K — see below). No module remains. Candidate next work, in rough priority:

1. **Course-wide QA pass** — click through on Vercel, check cross-module "Next:" links, sidebar order, any diagram overflow at the 1.16 scale, mobile, and the new ⌘K search.
2. **Phase 1 (deferred): Supabase auth + per-user progress** — see CLAUDE.md §4. Discussed 2026-06-17 (registration gate + sign-up count, track later) and **deferred again** (user chose search first). The natural next phase when the user wants accounts/progress.
3. **AI course tutor** — a RAG chat assistant grounded in the 89 lessons (uses Modules 4 + 9). Flagged as the standout next feature; not started.
4. **Phase 3 polish** — in-browser Python labs (Pyodide), the per-module lab notebooks already on disk (`NN …/lab-*.ipynb`, e.g. Module 10 has 10-A…10-D), certificates, dark/light toggle.
5. **Hands-on labs track** — every module's PDF/folder ships labs (Logisim, Python, notebooks) that aren't yet in the app.

> **DECISION (2026-06-17) — no animation/interactives.** We explored a flagship animated "process-flow" interactive (reviving the original §1 vision); the **user decided against it** — static hand-authored SVG diagrams remain the approach (reaffirms 2026-06-11). Don't build canvas/animations unless the user revisits this.

> Confirm direction with the user before starting — content phase is done, so the next move is a phase/feature decision (auth vs tutor vs labs vs QA), which is the user's call.

> **Module 10 build notes (done 2026-06-17):** 10 lessons `10-01`…`10-10`, from the PDF (no `.md`; parsed via `pdftotext -layout`). Synthesis module — diagram-heavy (25 figures) with some code (cost calc, k8s HPA, JSON logs, router, allow-list). Emerald accent (`C.emerald` added to `_shared.tsx`; "10" already in `lib/colors.ts`). Capstone 10.10 has a `CourseArc` diagram summarising all 10 modules. Used `claude-opus-4-8`, hedged pricing. **MDX gotcha hit twice:** bare `<` before a **digit/`$`** in prose (e.g. `<5%`, `<$2/task`) also breaks the build — escape as `&lt;` (attribute strings like `caption="…<5%…"` are safe).

---

## 🔎 Full-text search added (2026-06-17)

Course-wide search across all 89 lessons — **client-side, zero backend, no new dependencies** (fits the static site; hand-rolled scorer per CLAUDE.md). Open with **⌘K / Ctrl-K** anywhere, or **`/`** outside an input, or the **Search** button in the lesson sidebar and the home nav.

**How it works (the pipeline):**
1. **Build the index — `lib/search.ts` (`buildSearchIndex`).** Reads every `content/module-*/*.mdx`, takes the frontmatter (title, module, moduleTitle, lesson, slug) + extracts `## /###` headings + strips the body to plain prose (drops code fences, JSX components, import/export lines, markdown markup, HTML entities). Each lesson's body is capped at **2,500 chars** to bound index size. Output: one `SearchRecord[]`.
2. **Ship it as one static file — `app/api/search-index/route.ts`.** A `dynamic = "force-static"` GET returns the index JSON; Next prerenders it at build to a static asset (`/api/search-index`, ~**288 KB** for 89 lessons). No server runtime needed.
3. **Search in the browser — `components/search/SearchOverlay.tsx`** (mounted once globally in `app/layout.tsx`). Lazily `fetch`es the index on first open, lowercases fields once, then ranks on every keystroke with a **weighted hand-rolled scorer**: title (≈10–14, prefix-boosted) ≫ headings (5) > summary (4) > module/number (3) > body (1), **AND across query tokens** (every token must match somewhere) + a whole-phrase bonus. Top 8 results, each with a ~160-char snippet around the first match and `<mark>` highlighting. Keyboard: ↑/↓ to move, ↵ to open, Esc to close; results link to `/modules/{module}/{lessonPath}`.
4. **Triggers — `components/search/SearchTrigger.tsx`.** A light variant in the sidebar header and a dark variant in the home nav; they just dispatch a `window` `"open-search"` event the overlay listens for (no prop drilling).

**Why this design:** the site is fully static (free Vercel hosting, no server). Build-time index + client-side scoring keeps it static, makes search instant (no network per keystroke — one ~288 KB fetch, then in-memory), and adds no dependency. To rebuild the index after content changes, just `next build` (it's regenerated from the MDX every build).

---

## 🏁 Module 10 built (2026-06-17): End-to-End Systems, Scaling & Capstone — COURSE COMPLETE

**10 lessons** under `content/module-10/`, from `10 End to End System Scaling/module-10-lesson.md.pdf` (10 topics — richer than curriculum.md's 8). **Emerald** accent (`C.emerald`). The synthesis module — diagram-heavy (**+25 SVG diagrams** in `diagrams/module-10.tsx`) with embedded code (cost calc, k8s HPA, structured JSON logs, complexity router, allow-list). `next build` green — **89 lessons total**, 92 routes.

- `10-01-full-stack` — the seven layers (app→compute + cross-cutting observability), what each inherits from earlier modules, optimise the real bottleneck.
- `10-02-scaling` — three scaling regimes, the cost equation + seven cost levers, the quality/cost/latency triangle (routed per query).
- `10-03-reliability-engineering` — four-level reliability stack (infra/quality/agent/safety), multi-provider fallback, five-stage deployment pipeline.
- `10-04-design-patterns` — the five core architectures + the pattern decision tree (RAG quality = min(retrieval, synthesis)).
- `10-05-infrastructure-decision` — build vs buy, ~$50–100k/mo self-host break-even, GPU provider ~6× spread, autoscaling + spot.
- `10-06-observability` — the 3am questions, four pillars (metrics/logs/traces/**quality eval**), the P0–P3 alert stack.
- `10-07-fine-tuning-production` — the ladder (prompt→RAG→cache→FT), what FT can/can't fix, 80/20 data rule, CPT vs SFT vs RLHF.
- `10-08-security-safety` — AI attack surface (injection/exfiltration/inversion) + mitigations, the five-layer safety stack (defence in depth).
- `10-09-economics` — unit economics (linear cost scaling), three business models, four AI-cost-to-revenue stages.
- `10-10-reference-architecture` — **capstone**: the full production platform (every box = an earlier module), the data flywheel, launch checklist, and a `CourseArc` diagram of all 10 modules.

> **🎉 All 10 curriculum modules are now built and live.** Phase 2 (content scaling) complete: Modules 1–10, 89 lessons, ~258+25 SVG diagrams, light theme, mobile responsive. Remaining work is the deferred phases (Phase 1 auth, Phase 3 polish/labs) — see RESUME HERE.

---

## 🤖 Module 9 built (2026-06-17): Agentic AI Systems & Orchestration

**11 lessons** under `content/module-09/`, from `09 Agentic AI and Orchestration/module-09-lesson.md` (11 topics — richer than curriculum.md's 7). **Indigo** accent (`C.indigo`). Code-heavy (Python + the Claude tool-use API) with numbered step walkthroughs. **+30 SVG diagrams** in `diagrams/module-09.tsx`. `next build` green — **79 lessons total**, 82 routes.

- `9-01-agent-mental-model` — LLM as decision-maker, the universal agent loop (15-line sketch), the six failure modes.
- `9-02-react-pattern` — Thought/Action/Observation, ReAct vs CoT, full ReAct agent from scratch on `messages.create(tools=…)`, tool-design principles.
- `9-03-langgraph` — nodes/edges/typed state, the conditional agent graph, `interrupt_before` (human-in-the-loop), `SqliteSaver` checkpointing.
- `9-04-multi-agent` — supervisor / peer-to-peer / critic patterns (LangGraph), bounded critic loop.
- `9-05-n8n` — visual workflow automation, Docker setup, Code node (JS), the AI Agent node, n8n-vs-LangGraph decision.
- `9-06-memory` — four memory tiers, long-term vector memory (Voyage AI embeddings), context-window compression.
- `9-07-structured-outputs` — Pydantic schemas, forced `tool_choice` for guaranteed JSON, validate-and-retry, Pydantic AI.
- `9-08-agentic-rag` — basic vs agentic RAG (retrieve-check-reformulate loop), contextual compression.
- `9-09-evaluation-reliability` ★ — 5-level eval taxonomy, LLM-as-judge (+ calibration) + Weave, circuit breaker / cost tracker / retry-with-backoff.
- `9-10-production-architectures` — the layered stack (gateway/orchestration/agents/tools/observability), LangSmith tracing, versioned prompts.
- `9-11-document-intelligence-agent` — **capstone**: full LangGraph doc-QA agent (retrieve→generate→verify→loop→memory) + the agentic stack, seven reliability rules, budgeting numbers.

> **Accuracy fixes vs the source markdown:** used the current `claude-opus-4-8` model id throughout (source had `claude-opus-4-5`); replaced the non-existent `AnthropicEmbeddings` with **Voyage AI** (Anthropic's recommended embeddings partner) in 9.6; kept all pricing hedged ("verify at anthropic.com/pricing").

---

## 🖥️ Module 7 built (2026-06-16): Inference Frameworks & LLM Runtimes

**8 lessons** under `content/module-07/`, from `module-07.pdf` (8 topics). Module accent = **Sky** (`C.sky`). **First module with inline code** — fenced code blocks render via a new `CodeBlock`/`Pre` component (dark editor-chrome, language label), and **every snippet has a numbered step-by-step walkthrough** (user direction). `next build` green — **55 lessons total**, 58 routes. ~17 new diagrams in `diagrams/module-07.tsx`.

- `7-1-llm-serving-problem` — vision-vs-LLM, prefill/decode, decode ceiling, KV cache + memory formula (Python calculator).
- `7-2-vllm` — PagedAttention (OS-paging analogy), continuous batching, full vLLM API (offline + OpenAI server + config + prefix caching + spec decoding).
- `7-3-llama-cpp` — SIMD/NEON, GGUF k-quants + inline dequant, split offload, the Q4_K_M ladder, CLI tuning.
- `7-4-ollama` — CLI workflow, REST + OpenAI APIs, Modelfiles.
- `7-5-tgi` — Rust router + Python shards, Docker deploy, TGI vs vLLM.
- `7-6-optimization-in-practice` — batch knee, decoding params, grammar-constrained JSON, tensor parallelism, Prometheus monitoring.
- `7-7-framework-selection` — decision tree, ~26× same-hardware performance span, tie-breakers.
- `7-8-raspberry-pi` — NEON build, model-size choices, llama-server (OpenAI API on a Pi), edge use cases.

> **Code-block infra (reusable for Module 8):** `CodeBlock` + `Pre` in `LessonBlocks.tsx`, registered as `pre` in `lib/mdx.ts`. Author code as Markdown fenced blocks (```lang) — MDX treats them as literal so `{ < }` need NO escaping. Inline `code` polished in `globals.css`. **Always explain each snippet in numbered steps.**

---

## 🔶 Module 8 in progress (2026-06-16): Hardware Acceleration — FPGA + Edge NPUs

**Expanded module** (FPGA from `module-08.pdf` + new edge-MCU content). **Orange** accent (`C.orange`). Diagrams in `diagrams/module-08.tsx`; reusable `McuSoc`/`VendorFlow` helpers for the vendor lessons. Inline code + step-by-step explanations throughout. **9/13 lessons live:**

- ✅ `8-01-fpga-architecture` — LUT/FF/DSP/BRAM, DSP=MAC budget + precision packing, Zynq PS+PL, PYNQ Python driver.
- ✅ `8-02-hls-to-bitstream` — design flow, HLS C++, the 3 pragmas (PIPELINE/UNROLL/ARRAY_PARTITION), dataflow streaming.
- ✅ `8-03-fpga-quantization` — DSP constraint, BNN (XNOR-popcount, 0 DSPs), FINN, Brevitas.
- ✅ `8-04-fpga-vs-gpu-vs-cpu` — 3 philosophies, determinism/jitter, power efficiency, decision matrix.
- ✅ `8-05-nn-on-pynq` — what fits, MNIST flow (Brevitas→FINN→PYNQ), HLS streaming conv.
- ✅ `8-06-vitis-ai` — FINN-vs-Vitis, the DPU systolic engine, pynq_dpu deploy.
- ✅ `8-07-fpga-in-practice` — streaming pipeline, resource calculator, energy/inference, FPGA→ASIC, PYNQ setup. *(FPGA half = 7 lessons done)*
- ✅ `8-08-tinyml-landscape` — TinyML, flash+SRAM budget, what fits, micro-NPU wave.
- ✅ `8-09-arm-substrate` — Cortex-M tiers, Helium, CMSIS-NN, Ethos-U + Vela op-splitting.
- ✅ `8-10-stm32-n6` — first STM32 with an NPU; Cortex-M55+Helium + Neural-ART (~600 GOPS), ISP; ST Edge AI (`stedgeai` analyze/generate) + X-CUBE-AI `ai_network_run`.
- ✅ `8-11-nxp-imx-rt` — "crossover" MCU (M7 @ ~1 GHz), eIQ Neutron NPU; eIQ Toolkit convert + TFLite Micro op-resolver (NPU kernels).
- ✅ `8-12-renesas-ra` — reconfigurable DRP-AI (re-wires datapath per layer), e-AI for RA MCUs, Reality AI; DRP-AI TVM compile + `MeraDrpRuntimeWrapper`.
- ✅ `8-13-edge-accelerators-tflite-micro` — Coral Edge TPU / ESP32-S3 / K210; the universal train→INT8(calib)→convert→flash flow, vendor tool swaps in at "convert"; **module capstone** (synthesis + through-line). *(MCU/edge half = 6 lessons done — Module 8 COMPLETE, 13/13.)*

---

## ⚙️ Module 6 built (2026-06-16): Model Optimization & Efficient Inference

**6 lessons** under `content/module-06/`, from `Module06.pdf` (6 topics — the PDF adds a synthesis "Complete Optimization Pipeline" beyond curriculum.md's 5). Image-rich pattern, light theme, module accent = **Lime** (`C.lime` added to `_shared.tsx`). **+20 SVG diagrams** in `diagrams/module-06.tsx` (registered in barrel + `lib/mdx.ts`). `next build` green — **47 lessons total**, 50 routes.

- `6-1-quantization` — optimization hierarchy, affine quant + scale/2 error (INT8 vs INT4), per-tensor/channel/group, PTQ vs QAT + STE, calibration methods, SmoothQuant / GPTQ / AWQ. *(4 diagrams)*
- `6-2-pruning-sparsity` — unstructured + lottery ticket, why scattered zeros don't speed up dense HW, NVIDIA 2:4, structured (channel/head/layer), gradual magnitude pruning, sparsity×quant. *(4 diagrams)*
- `6-3-knowledge-distillation` — dark knowledge, temperature loss + T² factor, feature distillation, DistilBERT 40/60/97. *(3 diagrams)*
- `6-4-graph-optimization` — operator fusion, constant-fold/DCE/CSE/layout, Flash Attention, CUDA Graphs, torch.compile. *(4 diagrams)*
- `6-5-hardware-aware-optimization` — tile alignment, KV-cache INT8, speculative decoding, architecture-level efficiency. *(3 diagrams)*
- `6-6-optimization-pipeline` — 5-phase decision flow, benchmarking protocol, ResNet-50 13.2× journey, thresholds, module summary. *(2 diagrams)*

> Accent colors are predefined in `lib/colors.ts` (M6 = Lime #84CC16); home-page card auto-discovers. Verified with `NEXT_DIST_DIR=.next-verify npx next build` (separate dir, dev server untouched). Recurring MDX gotcha: escape bare `<`/`{` in prose (`&lt;`/`&#123;`) — attribute strings are fine.

---

## 🧩 Module 4 expanded (2026-06-16): +4 lessons, now 13

Four high-value lessons **inserted in place** (order-preserving slugs, no existing lesson renamed/renumbered — `lesson:`/`prerequisites`/filenames are cosmetic; sidebar order = JS filename `.sort()`). Each = MDX (standard pattern) + new SVG diagrams in `diagrams/module-04.tsx` + registered in `lib/mdx.ts` (import + components map) + neighbour's "Next:" line repointed. **+14 new diagrams.**

- `4-3a-diffusion-models` (after GANs) — forward/reverse process, noise-prediction DDPM objective, U-Net + classifier-free guidance, latent diffusion (Stable Diffusion), DDPM-vs-DDIM sampling. *(4 diagrams)*
- `4-4a-mixture-of-experts` (after Transformers) — dense-vs-sparse, router + top-k gating, load-balancing/router-collapse, compute-for-memory tradeoff (Mixtral/DeepSeek). *(3 diagrams)*
- `4-7a-decoding-sampling` (after Unsloth) — greedy/beam + beam-search curse, temperature, top-k vs top-p (nucleus), repetition penalties, task recipes. *(4 diagrams)*
- `4-9a-multimodal-models` (after Prompting, capstone) — CLIP contrastive alignment, ViT (image-as-tokens), VLMs (LLaVA/GPT-4V: frozen ViT + projector + frozen LLM). *(3 diagrams)*

> **Build workflow note:** verification builds now run as `NEXT_DIST_DIR=.next-verify npx next build` (env-gated `distDir` in `next.config.ts`, default still `.next`). This stops a production build from clobbering a running `next dev` server's `.next` — do **not** `rm -rf .next` while dev is running.

---

## 🚀 Module 5 completed (2026-06-16): Inference Systems Fundamentals

**7 lessons** under `content/module-05/`, from `Module 5` PDF (parsed source). Image-rich pattern, light theme, module accent = **Amber**. **+20 SVG diagrams** in `diagrams/module-05.tsx` (registered in `index.ts` barrel + `lib/mdx.ts`). `next build` green — **37 lessons total** (7+6+8+9+7), 40 routes.

- `5-1-types-of-inference` — five paradigms (batch / real-time / streaming / edge / serverless), TTFT/TGS, picking the right architecture.
- `5-2-latency-vs-throughput` — the central tradeoff, Pareto frontier, Little's Law (utilisation cliff at 75–80%), dynamic batching.
- `5-3-model-formats` — checkpoint → ONNX → TensorRT/GGUF/Core ML journey, Netron, format decision tree.
- `5-4-precision` — FP32→BF16→INT8→INT4 hierarchy, float bit layouts, quantization mapping, PTQ vs QAT, per-workload guidance.
- `5-5-data-pipelines` — the pipeline can't be the bottleneck; padding/bucketing, caching layers.
- `5-6-cost-engineering` — $/query, hardware cost bars, cascade routing, budget ladder.
- `5-7-inference-server-architecture` — full stack, Triton (dynamic batching + instance groups), the 8-question deployment checklist.

> **Build-fix note (was blocking):** drafted M5 never built. Fixes — escape bare `<`/`{` in MDX prose (parsed as JSX), and the easy-to-forget **register-diagrams-in-lib/mdx.ts** step (both the import list and the `components` map).

---

## 🤖 Module 4 built (2026-06-15): Generative AI & LLM Fundamentals

**9 lessons** under `content/module-04/`, from the updated `Module 04 Gen AI.pdf` (9 topics — richer than `curriculum.md`'s old 4.1–4.7). Same image-rich pattern, light theme, module accent = **Rose**. `next build` green — **30 lessons total** (7+6+8+9), 33 static pages. **+25 new SVG diagrams** in `diagrams/module-04.tsx` (registered in `lib/mdx.ts` + barrel).

- `4-1-autoencoders` — bottleneck compression, self-supervised, sparse/denoising/contractive/conv variants, anomaly detection, **sparse-AE interpretability**.
- `4-2-variational-autoencoders` — probabilistic latent, ELBO + KL, **reparameterisation trick**, sampling, blur-vs-sharp.
- `4-3-gans` — adversarial minimax, alternating loop, **mode collapse** + failure modes, DCGAN/WGAN-GP/StyleGAN.
- `4-4-transformers-attention` — scaled dot-product (quadratic), multi-head, **causal mask**, **full transformer block (FFN, residual stream, pre-norm, stacking ×N)** ← *depth added per user request*, three families, RMSNorm/RoPE/GQA/SwiGLU, BPE.
- `4-5-pretraining` — scale & cost, CLM/MLM/span, emergent + in-context learning, scaling hypothesis, continual pretraining.
- `4-6-fine-tuning` — hierarchy, instruction tuning, full-FT 138 GB, **LoRA**, **QLoRA (NF4)**, RLHF vs DPO.
- `4-7-unsloth` — fused Triton kernels, manual LoRA backprop, fused RoPE, benchmarks (2.6×), base-model choice, dataset formats.
- `4-8-rag` — 5-stage pipeline, chunking, embeddings + vector DBs, **hybrid retrieval + rerank**, citation-aware gen, DVC, **RAGAS**.
- `4-9-prompting` — zero/few-shot, **CoT**, self-consistency, structured/JSON output, system prompts.

> **Module 5 preview:** Inference Systems Fundamentals — take fine-tuned models from notebook to production (next module to build). PDF not yet on disk; check `curriculum.md` Module 5.

---

## 🧪 Module 3 built (2026-06-12): AI & Deep Learning Foundations — NOT yet pushed

**8 lessons** under `content/module-03/`. The source `Module 03.pdf` had 6 topics; we **added two by decision** — `3.2 Classical ML` and `3.8 Audio` (see notes). Same image-rich pattern, light theme, module accent = **Violet**. `next build` green (21 lesson pages total: 7+6+8). **+29 new SVG diagrams** in `Diagrams.tsx` (registered in `lib/mdx.ts`).

- `3-1-ml-overview` — paradigms, train/val/test, loss, bias–variance (+ double descent), gradient descent + Adam.
- `3-2-classical-ml-ensembling` ★ NEW (decision) — regression/trees/**XGBoost**, bagging/boosting/stacking, k-means/PCA, **classical-vs-deep** framework, BFSI use cases. Engineering-judgment altitude, not theory.
- `3-3-neural-networks-from-scratch` — neuron = MAC, activations, MLP, init/BatchNorm/dropout, backprop.
- `3-4-cnns` — convolution (+ **convolution-as-LTI** bridge), pooling, LeNet→ResNet→MobileNet, receptive field, transfer learning.
- `3-5-rnns-sequences` — RNN/BPTT/vanishing, LSTM/GRU, why transformers replaced RNNs.
- `3-6-training-vs-inference` — memory gap, 3 inference modes, checkpointing, `torch.compile`.
- `3-7-model-evaluation` — **error terms expanded per request**: regression (MAE/MSE/RMSE/R² + residuals) AND classification (confusion matrix, P/R/F1, ROC-AUC), error decomposition, calibration.
- `3-8-audio-filters-asr-tts` ★ NEW (decision) — **filters in depth per request** (filtering = convolution, FIR/IIR, low/high/band-pass, windowing), sampling/Nyquist, STFT→mel filterbank→MFCC, Whisper ASR, TTS vocoder.

> **✅ DONE (2026-06-15) — DL-depth enrichment added to 3.3/3.4/3.5:**
> - **3.3:** SiLU/Swish + **SwiGLU** (LLaMA), **exploding gradients + gradient clipping**, **LayerNorm vs RMSNorm**, AdamW/weight-decay/LR-warmup/label-smoothing.
> - **3.4:** **dilated convolutions** (+ new `DilatedConvolution` SVG), **global average pooling**, **data augmentation**.
> - **3.5:** **bidirectional RNNs + seq2seq** encoder-decoder, exploding-gradient + clipping note.
> Kept "a bit more" — mostly prose + one new dilated-conv diagram. Recaps updated. `next build` green (24 pages).

> **Module 4 preview (read for forward-refs):** the updated `Module 04 Gen AI.pdf` now has **9 topics** — autoencoders, VAEs, GANs, transformers/attention, pretraining, fine-tuning, **Unsloth**, RAG, prompting (richer than `curriculum.md`'s 4.1–4.7).

> **Harvard fix:** a paragraph on Harvard architecture (DSP/microcontroller pure-Harvard; modern CPU = modified-Harvard with split L1 I/D caches) was added to `2-1-cpu-architecture.mdx` to close a curriculum-parity gap — also uncommitted.

---

## 🎨 Lessons now LIGHT theme + mobile responsive (2026-06-12) — ✅ pushed (commit `74863d9`)

**Light reading theme** — supersedes the dark "engineering instrument" theme (below) for *module content*. The **home page is intentionally still dark** (it uses hardcoded hex, not tokens).
- Flipped `styles/tokens.css` to white surfaces / dark text; `LessonLayout` (accent-light → darker shade, light top bar, `prose` not `prose-invert`); the `C` palette in `Diagrams.tsx` to light-card values, incl. **39 highlight tints rehued** to the palette.
- To revert to dark: restore the previous token/palette values (noted in-file).

**Mobile responsive** — driven by media-query classes in `app/globals.css`:
- Sidebar is an overlay (≤1024px) with a **fixed top-left ≡ hamburger** that also reflows the desktop reading column (`body.sidebar-collapsed`); marketing grids stack (≤880px); padding tightens (≤768px); MDX tables scroll.
- `next.config.ts` gained **`allowedDevOrigins`** so the dev server hydrates when tested over the LAN/phone (without it: no JS → hamburger & sidebar-expand silently "don't work").

---

## ✅ Module 2 built (2026-06-12) & pushed/live: Computer Architecture & Accelerators

Module 2 authored in the same image-rich pattern as Module 1 — prose + callouts + formulas +
hand-drawn SVG diagrams + stat-grids + recap, no interactives, no quizzes. **6 lessons** mapping
1:1 to the 6 topics in `Module 2 lesson.pdf`, with a prerequisite chain 1.7 → 2.1 → … → 2.6.

- `2-1-cpu-architecture` — Von Neumann, fetch-decode-execute, RISC/CISC, 5-stage pipeline, hazards + forwarding, OoO, superscalar, SIMD, the CPU performance equation.
- `2-2-gpu-architecture` — throughput vs latency, thread/warp/block/grid, SIMT + divergence, the SM, warp latency-hiding, Tensor Cores, the batch=1 memory-bandwidth ceiling, coalescing, NVLink.
- `2-3-fpga-architecture` — programming hardware, LUTs, FFs, DSP MAC blocks, BRAM, routing, Zynq ARM+PL SoC, FPGA vs ASIC vs GPU.
- `2-4-memory-hierarchy` — the memory wall, register→L1→L2→L3→DRAM→SSD pyramid, cache lines/locality, miss types, GPU vs CPU memory, NUMA, inference bandwidth math.
- `2-5-roofline-model` — arithmetic intensity, the roofline plot, ridge point, where AI workloads land, why batch=1 is memory-bound.
- `2-6-parallelism` — Dennard's end, Amdahl/Gustafson, data/tensor/pipeline/expert parallelism, micro-batching, continuous batching, disaggregation, speculative decoding.

**+22 new SVG diagrams** added to `Diagrams.tsx` (registered in `lib/mdx.ts`); palette gained
`blue`/`violet` accents for Module 2. **Build verified:** `next build` green; the home-page Module 2
card auto-flips to "6 lessons" (content is directory-discovered). **Pushed to GitHub & deploying on
Vercel** (commit `74863d9`, 2026-06-12) — bundled with the light theme + responsive work above.

> Module 2 labs (2-A Roofline plotter, 2-B pipeline sim, 2-C GPU-vs-CPU benchmark, 2-D bandwidth
> benchmark) are deferred with the Module 1 labs as a separate hands-on track.

---

## ⟳ Direction change (2026-06-11): image-rich lessons, not interactives

After reviewing the live lessons, we pivoted Module 1 away from canvas/animation interactives
toward **hand-authored SVG diagrams** — the right figure for every concept, drawn in code so they
always render, never 404, and can't show a wrong image. What changed:

- **Removed** the `TransistorSwitch` interactive (and its file) — replaced by a static MOSFET
  OFF/ON cross-section diagram.
- **Removed all self-check quizzes** (`QuizBlock`) from lessons 1.1–1.7.
- **Added 29 SVG diagrams** in `components/lesson/Diagrams.tsx` (registered in `lib/mdx.ts`),
  replacing every ASCII-art `<Figure>` and adding new concept figures across all 7 topics.
- **Backfilled curriculum-parity sub-topics** (prose + diagrams): BJT (1.1);
  carry-lookahead, DEMUX, encoder, comparator (1.3); JK/T flip-flops, counters (1.4).
- Each lesson is now: prose + callouts + formulas + **SVG diagrams** + stat-grids + recap.
- **Shipped:** pushed to GitHub (`vivekhashtag/aiaccelerator`) and **live on Vercel** — auto-deploys on every push.

---

## What's Built

### Framework (Phase 0 complete)
- Next.js 16 App Router + TypeScript + Tailwind CSS + MDX pipeline
- Static generation (`generateStaticParams`) — zero runtime server needed
- Collapsible sidebar navigation with localStorage persistence
- MDX → React component pipeline (`next-mdx-remote/rsc`)
- `Diagrams.tsx` — 29 hand-drawn SVG figures, the course "images" (registered in `lib/mdx.ts`)
- `QuizBlock` — exists but **unregistered/unused** (quizzes removed 2026-06-11; kept for a later phase)

### Dark "engineering instrument" design system (2026-06-09 redesign)
- Lesson surfaces now match the home page's dark navy identity (was a light
  pastel docs theme — jarring after the dark hero). Driven entirely by CSS
  variables in `styles/tokens.css`, so the home page (hardcoded hex) is untouched.
- Per-module accent color is kept, but painted on the *shared* dark base —
  Module 1 = teal, Module 2 = blue, etc. (`LessonLayout` injects `--accent*`).
- Redesigned: `LessonLayout` (gradient title, accent eyebrow, translucent navy
  top bar), `LessonSidebar` (deep-navy, home-style logo), `LessonNav` (prev/next
  cards), `QuizBlock` (dark cards + accent glow), `TransistorSwitch` stub
  (instrument panel w/ MOSFET preview), prose typography tuned for dark long-read.
- New MDX content blocks: `Callout` (insight/why/analogy/warning/pitfall/key),
  `Formula`, `Figure`, `StatGrid` — in `components/lesson/LessonBlocks.tsx`,
  registered in `lib/mdx.ts`. These are the levers for "attractive" lessons.

### Content — Module 1 COMPLETE & LIVE (all 7 topics, from `Module 01.pdf`)
All written in the dark design with callouts / formulas / **SVG diagrams** / stat-grids.
Prerequisite chain links 1.1 → 1.7. Curriculum-topic parity reached; no interactives, no quizzes.
- `1-1-semiconductor-basics.mdx` — semiconductors → doping → PN junction → MOSFET (NMOS/PMOS) → CMOS → NAND gate → Moore's Law
- `1-2-logic-gates.mdx` — seven gates, Boolean algebra, De Morgan, NAND universality, K-maps
- `1-3-combinational-logic.mdx` — half/full adder, ripple-carry, MUX/LUT, decoder, critical path
- `1-4-sequential-logic.mdx` — SR latch, D flip-flop, registers, shift registers, FSMs
- `1-5-timing-and-power.mdx` — clock, setup/hold, f_max, P = α·C·V²·f, leakage, clock/power gating, DVFS
- `1-6-number-systems.mdx` — binary/hex, two's complement, fixed-point, IEEE 754, BF16/FP16/INT8
- `1-7-mac-operations.mdx` — MAC, dot/FC/conv/attention counts, MAC unit, pipelining, systolic arrays, Tensor Cores, TOPS

### Home Page
- Dark hero section with animated chip SVG illustration
- 10 module cards — each with a unique dark SVG illustration
- "How Every Module Works" section (Understand → Operate → Ship)
- Author section — Vivek Dhandapani bio, LinkedIn, expertise tags, education
- Footer

---

## What's Next

### Immediate (still Phase 0)
- [x] ~~Build the real `TransistorSwitch` interactive~~ — **dropped 2026-06-11** in favour of a static SVG cross-section (see direction change above).
- [x] Convert all 7 Module 1 lessons to hand-drawn SVG diagrams ✓ 2026-06-11
- [x] Backfill curriculum-parity sub-topics ✓ 2026-06-11 — **BJT** (1.1); **carry-lookahead, DEMUX, encoder, comparator** (1.3); **JK/T flip-flops, counters** (1.4). Module 1 now matches the curriculum topic list 1:1 (29 SVG diagrams total).
- [x] Deploy to Vercel ✓ 2026-06-11 — imported `vivekhashtag/aiaccelerator` (root `./`), **live and auto-deploying on push**.

> **Phase 0 shipped.** Module 1 is curriculum-complete and live. The only remaining Module 1 item
> from the curriculum is the 4 hands-on labs (1-A…1-D, Python/Logisim) — deferred as a separate
> track (overlaps the parked in-browser-Python phase).

### Phase 1
- [ ] Supabase auth (login / signup)
- [ ] Per-user lesson progress persistence

### Phase 2 — scale the content
- [x] Port all Module 1 lesson content from PDF (Topics 1.1–1.7) ✓ done 2026-06-09
- [x] Module 1 SVG diagrams — every topic illustrated ✓ done 2026-06-11
- [x] Module 2 — Computer Architecture & Accelerators (6 lessons, 22 SVG diagrams) ✓ **pushed** 2026-06-12
- [x] Light reading theme + full mobile responsive ✓ **pushed** 2026-06-12 (commit `74863d9`)
- [x] Module 3 — AI & Deep Learning Foundations (8 lessons, 30 SVG diagrams) ✓ built 2026-06-12; DL-depth enrichment + dilated-conv diagram added 2026-06-15
- [x] DL-depth enrichment to 3.3/3.4/3.5 ✓ 2026-06-15 (see Module 3 section)
- [x] Reorganized diagrams — split `Diagrams.tsx` (3,176 lines) into `components/lesson/diagrams/` (`_shared` + `module-01/02/03` + `index` barrel) ✓ 2026-06-15
- [x] Updated `docs/curriculum.md` (8-lesson Module 3) + `CLAUDE.md` (§4 phase marker, §10 status, light theme, diagrams reorg) ✓ 2026-06-15
- [x] Module 4 — Generative AI & LLM Fundamentals (9 lessons, 25 SVG diagrams) ✓ built 2026-06-15 (transformer-block depth added per user request)
- [x] Module 5 — Inference Systems Fundamentals (7 lessons, 20 SVG diagrams) ✓ built & pushed 2026-06-16 (drafted prior session, wiring/build fixed this session)
- [x] Module 4 expansion — +4 lessons (diffusion, MoE, decoding, multimodal) inserted in place ✓ 2026-06-16 (now 13 lessons)
- [x] Module 6 — Model Optimization & Efficient Inference (6 lessons, 20 SVG diagrams) ✓ built & pushed 2026-06-16
- [x] Module 7 — Inference Frameworks & LLM Runtimes (8 lessons, ~17 diagrams, **inline code + step explanations**) ✓ built & pushed 2026-06-16
- [x] **Module 8 — Hardware Acceleration: FPGA + Edge NPUs** (13 lessons; expanded from `module-08.pdf` + new edge-MCU content). FPGA half 8.1–8.7, MCU/edge half 8.8–8.13. ✓ **complete 2026-06-17** (8.10–8.13 = STM32 N6, NXP i.MX RT, Renesas RA, others+TFLite-Micro).
- [x] **Module 9 — Agentic AI Systems & Orchestration** (11 lessons, 30 diagrams, **inline code + step explanations**, Indigo accent) ✓ built 2026-06-17 (from the richer 11-topic source markdown).
- [x] **Module 10 — End-to-End Systems, Scaling & Capstone** (10 lessons, 25 diagrams, synthesis/capstone, Emerald accent) ✓ built 2026-06-17 (from the 10-topic PDF). **🎉 ALL 10 MODULES DONE.**

> The old "Module 1 interactive backlog" (CMOS NAND, live truth tables, bit-flipper, MAC
> animation, systolic array, etc.) is **shelved** as of the 2026-06-11 direction change. Each is
> now a static SVG diagram instead. If interactives return in a later phase, restore from
> CLAUDE.md §8.

---

## Key Files

| Purpose | Path |
|---|---|
| Route | `app/modules/[module]/[lesson]/page.tsx` |
| Lesson shell | `components/lesson/LessonLayout.tsx` |
| Sidebar | `components/lesson/LessonSidebar.tsx` |
| **SVG diagrams** | `components/lesson/diagrams/` (~283 figures — 29 M1 + 22 M2 + 30 M3 + 38 M4 + 20 M5 + 20 M6 + ~17 M7 + ~26 M8 + 30 M9 + 25 M10 — the course "images"). Split per module: `_shared.tsx` (palette `C`, light-theme + `DiagramFrame` w/ `DIAGRAM_SCALE` zoom), `module-01…10.tsx`, `index.ts` barrel. M8 has reusable `McuSoc`/`VendorFlow` helpers. |
| **Code blocks (M7+)** | `CodeBlock` + `Pre` in `components/lesson/LessonBlocks.tsx`; fenced ```lang blocks render with editor chrome (registered as `pre` in `lib/mdx.ts`). |
| MDX content blocks | `components/lesson/LessonBlocks.tsx` (Callout / Formula / Figure / StatGrid) |
| Prev/next nav | `components/lesson/LessonNav.tsx` |
| Quiz (unregistered, kept for later) | `components/lesson/QuizBlock.tsx` |
| Module colors | `lib/colors.ts` |
| Content index | `lib/content.ts` |
| **Search** | `lib/search.ts` (build index from MDX) · `app/api/search-index/route.ts` (static JSON) · `components/search/SearchOverlay.tsx` (⌘K overlay + scorer) · `SearchTrigger.tsx` (buttons) · mounted in `app/layout.tsx` |
| MDX renderer | `lib/mdx.ts` |
| Design tokens | `styles/tokens.css` |
| Home page | `app/page.tsx` |
| Card illustrations | `components/ui/ModuleIllustration.tsx` |
| Curriculum map | `docs/curriculum.md` |
