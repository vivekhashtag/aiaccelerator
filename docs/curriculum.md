# Curriculum — AI Inference, Agentic AI & Accelerator Engineering

> Full course map. This is the **content source of truth** for scope: what modules exist,
> what each teaches, and what labs they contain. Read this when you need module/topic detail.
> Deep teaching content for an individual module lives in `/docs/modules/module-XX-source.md`.

## Course at a Glance

- **Total modules:** 10
- **Duration:** ~27 weeks (part-time, 2 hrs/day)
- **Projects:** 42+ hands-on labs + 4 capstone options
- **Hardware path (phased):** Laptop/free cloud GPU → Raspberry Pi 4 → PYNQ-Z2 FPGA → Jetson Orin Nano
- **Primary language:** Python
- **Prerequisites:** Basic Python; math intuition only; no electronics, ML, FPGA, or hardware background required.

### Three cross-cutting themes (woven through modules, not standalone)
- **Data Engineering** — Modules 4, 5 (RAG ingestion, clean inference pipelines)
- **Cost Engineering** — Modules 5, 6, 7, 8, 10 (every optimization has a cost tradeoff; #1 industry differentiator)
- **Agent Evaluation & Reliability** — Modules 9, 10 (benchmark and harden agents before production)

---

## Module 1 — Semiconductor & Digital Foundations
*2 weeks · Laptop only · Logisim Evolution*

Goal: how a transistor works, how gates are built from transistors, how digital circuits process binary, and how a MAC unit (the core compute primitive of every AI chip) is built at the gate level.

**Topics**
1.1 Semiconductor basics — silicon, doping, PN junction, BJT, MOSFET, CMOS, NAND from transistors, Moore's Law
1.2 Logic gates & Boolean algebra — 7 gates, truth tables, Boolean laws, De Morgan, NAND/NOR universality, K-maps
1.3 Combinational logic — half/full adder, ripple-carry, carry-lookahead, MUX/DEMUX, encoder/decoder, comparator, critical path
1.4 Sequential logic & state machines — latches, D/JK/T flip-flops, registers, shift registers, counters, FSMs (Mealy/Moore)
1.5 Clocking, timing & power — clock params, setup/hold, metastability, propagation delay, dynamic/static power, clock gating, DVFS, TDP
1.6 Number systems — binary/hex, two's complement, fixed-point (Q-format), IEEE 754 (FP32/FP16/BF16/FP8), INT8/INT4
1.7 Multiply-Accumulate (MAC) — MAC as the dominant AI op, hardware MAC unit, pipelining, systolic arrays, TPU/Tensor Cores, TOPS

**Labs**
- 1-A Logic Gate Simulator (Python OOP)
- 1-B Number Format Converter (bit-level FP32/FP16/BF16/INT8)
- 1-C MAC Unit (Python + Logisim)
- 1-D AI Chip FLOP Counter

---

## Module 2 — Computer Architecture & Accelerators
*2 weeks · Laptop + cloud · CPU-Z, py-spy, nvtop*

Goal: how CPUs, GPUs, and FPGAs differ architecturally, why GPUs suit AI, and how to tell if a workload is compute- or memory-bound via the roofline model.

**Topics**
2.1 CPU architecture — von Neumann/Harvard, fetch-decode-execute, ISAs (x86/ARM/RISC-V), pipelining, hazards, OoO, branch prediction, SIMD
2.2 GPU architecture — latency vs throughput, SIMT, warps/SMs, CUDA vs Tensor Cores, memory model, bandwidth, occupancy, NVLink
2.3 FPGA architecture — reconfigurability, LUT/CLB/DSP/BRAM, design flow (RTL & HLS), Xilinx families, utilization
2.4 Memory hierarchy — registers→L1/L2/L3→DRAM→HBM, memory wall, access patterns, cache misses, NUMA
2.5 The roofline model — arithmetic intensity, compute vs memory ceiling, ridge point, profiling tools
2.6 Parallelism & pipelining — ILP/data/thread/task parallelism, Amdahl/Gustafson, data/model/tensor parallelism, collectives

**Labs**
- 2-A Roofline Model Plotter
- 2-B CPU Pipeline Simulator
- 2-C GPU vs CPU Matrix Multiply Benchmark
- 2-D Memory Bandwidth Benchmark

---

## Module 3 — AI & Deep Learning Foundations
*3 weeks · Laptop + Colab (T4) · PyTorch, Matplotlib*

Goal: implement neural nets from scratch in NumPy, reproduce them in PyTorch, then train/evaluate a CNN on real images.

**Topics** *(built as 8 lessons — 3.2 Classical ML and 3.8 Audio added by decision; see STATUS.md)*
3.1 ML overview — supervised/unsupervised, train/val/test, bias-variance + double descent, loss functions, gradient descent, optimizers (Adam)
3.2 Classical ML & ensembling ★ — regression/trees/XGBoost, bagging/boosting/stacking, k-means/PCA, classical-vs-deep framework, BFSI use cases
3.3 Neural nets from scratch — perceptron, MLP, activations (incl. SiLU/SwiGLU), backprop, weight init, batch/layer/RMS norm, dropout, AdamW/warm-up, gradient clipping
3.4 CNNs for vision — convolution (as LTI), pooling + global average pooling, dilated convolutions, classic architectures (LeNet→ResNet→MobileNet), receptive field, transfer learning, data augmentation
3.5 RNNs & sequence modeling — vanilla RNN, BPTT, vanishing/exploding gradient + clipping, LSTM, GRU, bidirectional, seq2seq, why transformers replaced RNNs
3.6 Training vs inference — memory/compute differences, the 3 inference modes, checkpointing, no_grad/eval/compile
3.7 Model evaluation — regression (MAE/MSE/RMSE/R², residuals) + classification (confusion matrix, P/R/F1, ROC-AUC), error decomposition, calibration
3.8 Audio, filters & ASR/TTS ★ — filtering as convolution (FIR/IIR, low/high/band-pass, windowing), sampling/Nyquist, STFT→mel→MFCC, Whisper ASR, TTS vocoder

**Labs**
- 3-A MLP from Scratch (NumPy only)
- 3-B CNN Image Classifier (PyTorch, CIFAR-10)
- 3-C Training vs Inference Profiler
- 3-D Transfer Learning with ResNet-50

---

## Module 4 — Generative AI & LLM Fundamentals
*2 weeks · Laptop + Colab + Ollama · HuggingFace, Ollama, FAISS*

**Topics** *(built as 9 lessons from the updated `Module 04 Gen AI.pdf` — the generative-model family tree, richer than the original 4.1–4.7 outline)*
4.1 Autoencoders — bottleneck compression, self-supervised reconstruction, sparse/denoising/contractive/convolutional variants, anomaly detection, sparse-AE interpretability
4.2 Variational Autoencoders (VAEs) — probabilistic latent space, ELBO + KL regularisation, the reparameterisation trick, sampling, blur-vs-sharp trade-off
4.3 GANs — adversarial minimax game, alternating training, failure modes (mode collapse, instability, vanishing gradients), DCGAN/WGAN-GP/StyleGAN
4.4 Transformer architecture & attention — Q/K/V scaled dot-product, multi-head, the three families (BERT/GPT/T5), RMSNorm/RoPE/GQA/SwiGLU, BPE tokenization, positional embeddings
4.5 Pre-training — scale & cost, CLM/MLM/span-corruption objectives, emergent capabilities + in-context learning, scaling hypothesis, continual pre-training
4.6 Fine-tuning — the hierarchy, instruction tuning, full-FT memory, LoRA, QLoRA (NF4), RLHF vs DPO
4.7 Unsloth ★ — fused Triton kernels, manual LoRA backprop, fused RoPE, smart checkpointing, benchmarks, base-model choice, dataset formats
4.8 RAG & Data Engineering ★ — 5-stage pipeline, chunking strategies, embedding models + vector DBs, hybrid retrieval + reranking, citation-aware generation, DVC versioning, RAGAS
4.9 Prompting techniques — zero/few-shot, chain-of-thought, self-consistency, structured/JSON output, system prompts

**Labs**
- 4-A Attention from Scratch (NumPy)
- 4-B Tokenizer Implementation
- 4-C RAG Chatbot with Local LLM
- 4-D LoRA Fine-tuning
- 4-E Data Engineering Pipeline ★

---

## Module 5 — Inference Systems Fundamentals
*2 weeks · Laptop + RPi 4 · ONNX Runtime, FastAPI, Netron*

**Topics**
5.1 Types of inference (batch, real-time, streaming, edge)
5.2 Latency vs throughput (TTFT, TPS, P99, SLOs)
5.3 Model formats (PyTorch, ONNX, TFLite, Core ML, TensorRT)
5.4 Precision types (FP32, FP16, BF16, INT8, INT4)
5.5 Data pipelines for inference (preprocessing, batching, async)
5.6 Cost Engineering in depth ★ — cost per token/query, cloud GPU pricing, TCO, budget-constrained optimization, FinOps, LiteLLM/OpenMeter

**Labs**
- 5-A Inference benchmarking dashboard
- 5-B Model format converter with accuracy validation
- 5-C Async batching server (FastAPI + asyncio)
- 5-D Cost per token calculator ★
- 5-E Budget optimisation tool ★

---

## Module 6 — Model Optimization & Efficient Inference
*3 weeks · Laptop + RPi 4 + Google Coral (optional)*

**Topics** *(built as 6 lessons from `Module06.pdf` — the PDF adds a 6th synthesis topic beyond this 5-topic outline)*
6.1 Quantization (PTQ, QAT, per-tensor/channel/group, SmoothQuant, GPTQ, AWQ)
6.2 Pruning and sparsity (unstructured, lottery ticket, NVIDIA 2:4, structured, gradual magnitude)
6.3 Knowledge distillation (teacher-student, soft targets / dark knowledge, feature distillation, DistilBERT)
6.4 Graph optimization (operator fusion, constant folding, Flash Attention, CUDA Graphs, torch.compile)
6.5 Hardware-aware optimization (tile alignment, KV-cache quant, speculative decoding, efficient architectures)
6.6 The complete optimization pipeline ★ — 5-phase decision flow, benchmarking protocol, ResNet-50 13.2× worked example

**Labs**
- 6-A PTQ pipeline (ResNet-50 FP32→INT8)
- 6-B Structured pruning sweep (10%–90%)
- 6-C Knowledge distillation (ResNet→MobileNet)
- 6-D ONNX graph optimizer (fuse Conv+BN+ReLU)
- 6-E Optimization cost-benefit dashboard ★

---

## Module 7 — Inference Frameworks & LLM Runtimes
*2 weeks · Laptop + RPi 4 (llama.cpp) + Colab (vLLM)*

**Topics**
7.1 Inference frameworks (ONNX Runtime, TensorRT, OpenVINO, TVM)
7.2 LLM runtimes (vLLM, llama.cpp, Ollama, TGI, ExLlamaV2)
7.3 KV cache and batching (PagedAttention, continuous batching, prefill vs decode)
7.4 Speculative decoding (draft model, Medusa, EAGLE)
7.5 Streaming inference (SSE, WebSocket, token streaming)

> **Built as 8 lessons** from `module-07.pdf` (8 topics, richer than this 5-topic outline) — adds Ollama, TGI, a framework-selection guide, and a Raspberry Pi deployment lesson. First module with **inline code snippets**.

**Labs**
- 7-A Deploy Llama 3.2 with vLLM (streaming API)
- 7-B llama.cpp on Raspberry Pi (TPS vs quantization)
- 7-C KV cache benchmark (PagedAttention)
- 7-D Streaming inference server (FastAPI + SSE)

---

## Module 8 — FPGA & Hardware Acceleration for AI
*4 weeks · PYNQ-Z2 FPGA + Laptop*

**Topics**
8.1 FPGA vs CPU vs GPU (when to choose FPGA)
8.2 HLS concepts (C++ to hardware, Vivado HLS)
8.3 Loop optimisation (unrolling, pipelining, tiling, array partitioning)
8.4 Mapping neural networks to FPGA (dataflow, BRAM weight storage)
8.5 Vitis AI and FINN (quantized inference, Brevitas)
8.6 Quantized inference on FPGA (fixed-point, resource reports)
8.7 Hardware cost engineering ★ — FPGA vs GPU vs CPU TCO, latency SLA, break-even, power cost

**Labs**
- 8-A Matrix multiply in Vivado HLS (unrolled vs pipelined)
- 8-B Conv2D on FPGA with HLS (LUT/DSP/BRAM utilization)
- 8-C MNIST classifier with FINN on PYNQ-Z2 (sub-1ms)
- 8-D Hardware TCO benchmark ★

---

## Module 9 — Agentic AI Systems & Orchestration
*2 weeks · Laptop + cloud LLM API*

**Topics**
9.1 Agent architectures (ReAct, Plan-Execute, Reflexion, AutoGen, LangGraph)
9.2 Tool calling and API integration (function calling, error handling, rate limits)
9.3 Memory and retrieval (short-term context, long-term vector DB, episodic)
9.4 Multi-step reasoning (CoT, ToT, verification)
9.5 Planning and execution loops (task decomposition, failure recovery, HITL)
9.6 LLM backend integration (Ollama, vLLM, Claude API, structured outputs)
9.7 Agent Evaluation & Reliability ★ — benchmarking (GAIA/SWE-bench/ToolBench), failure taxonomy, guardrails, HITL, audit logging, reliability engineering

**Labs**
- 9-A ReAct agent from scratch (no LangChain)
- 9-B Multi-agent research pipeline (LangGraph)
- 9-C Agentic RAG system
- 9-D Code generation + execution agent
- 9-E Agent evaluation harness ★
- 9-F Failure mode injection lab ★

---

## Module 10 — End-to-End Systems, Scaling & Capstone
*3 weeks · Laptop + RPi 4 + PYNQ-Z2 + Jetson/cloud*

**Topics**
10.1 API inference systems (FastAPI, async, health checks)
10.2 Microservices and deployment (Docker, Docker Compose)
10.3 Load balancing and queuing (Nginx, Redis queue, rate limiting)
10.4 Distributed inference (Ray Serve, tensor parallelism, Kubernetes)
10.5 Monitoring (Prometheus, Grafana, dashboards, alerting)
10.6 Hardware-software integration (CPU+GPU+FPGA pipeline, PCIe)
10.7 Production cost engineering ★ — real-time cost dashboard, autoscaling, spot instances, multi-model routing, budget alerts, TCO report
10.8 Production agent reliability ★ — full guardrail stack, agent CI/CD, A/B testing, incident response, rollback

**Capstone projects (choose 1–2)**
- A — Full Agentic AI System (production-grade, with eval harness + guardrails + cost tracking)
- B — Production LLM Deployment Pipeline with Cost Dashboard
- C — FPGA Inference Accelerator with TCO Analysis
- D — Hybrid AI System (Agent + LLM + FPGA) with full reliability stack

---

## Module → Interactive priority (for this course build)

Module 1 is fully scoped into 8 interactives in CLAUDE.md §8. As we reach each later module in Phase 2, scope its interactives the same way: identify the concepts that are *spatial, sequential, or systemic* (those benefit most from animation) and design an operable widget for each.
