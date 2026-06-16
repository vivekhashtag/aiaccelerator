# Project Status

**Last updated:** 2026-06-16 — **Module 6 built (6 lessons + 20 SVG diagrams)**; earlier same day: Module 5 completed (7 lessons) and Module 4 expanded to 13 lessons. All pushed to `main` → Vercel deploying. **47 lessons total**, 50 routes, `next build` green. **Next:** Module 7 — Inference Frameworks & LLM Runtimes.

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
- [ ] **▶ NEXT:** **Module 7 — Inference Frameworks & LLM Runtimes** (vLLM, llama.cpp, Ollama, TGI; KV cache/PagedAttention, continuous batching, speculative decoding, streaming). PDF: not yet confirmed on disk (M1–6 PDFs are present; check for a Module 7 PDF or use `curriculum.md` Module 7). Parse PDFs with `pdftotext -layout` (poppler); the built-in PDF reader needs `pdftoppm`, which isn't installed.

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
| **SVG diagrams** | `components/lesson/diagrams/` (~180 figures — 29 M1 + 22 M2 + 30 M3 + 38 M4 + 20 M5 + 20 M6 — the course "images"). Split per module: `_shared.tsx` (palette `C`, light-theme + `DiagramFrame`), `module-01…06.tsx`, `index.ts` barrel. |
| MDX content blocks | `components/lesson/LessonBlocks.tsx` (Callout / Formula / Figure / StatGrid) |
| Prev/next nav | `components/lesson/LessonNav.tsx` |
| Quiz (unregistered, kept for later) | `components/lesson/QuizBlock.tsx` |
| Module colors | `lib/colors.ts` |
| Content index | `lib/content.ts` |
| MDX renderer | `lib/mdx.ts` |
| Design tokens | `styles/tokens.css` |
| Home page | `app/page.tsx` |
| Card illustrations | `components/ui/ModuleIllustration.tsx` |
| Curriculum map | `docs/curriculum.md` |
