import { C, DiagramFrame, mono } from "./_shared";

/* ════════════════════════════════════════════════════════════
   Module 10 — End-to-End Systems, Scaling & Capstone
   Accent: emerald (C.emerald). The synthesis module — diagrams
   carry the whole-system architecture the prose connects.
   ════════════════════════════════════════════════════════════ */

const EMERALD = C.emerald;

/* ════════════════════════════════════════════════════════════
   10.1 — The Full Stack: Seven Layers
   ════════════════════════════════════════════════════════════ */

/* The seven-layer production AI stack (L7 app → L2 compute, L1 cross-cutting). */
export function SevenLayerStack({ caption }: { caption?: string }) {
  const layers = [
    { n: "L7", t: "Application", d: "web / mobile / API / Slack — UX, auth, trust", c: EMERALD },
    { n: "L6", t: "Orchestration", d: "agents, workflows — LangGraph, n8n, Temporal", c: C.indigo },
    { n: "L5", t: "Inference Serving", d: "load balance, routing — vLLM, TGI, Triton", c: C.sky },
    { n: "L4", t: "Model", d: "weights, quant, LoRA — HF, GGUF, AWQ", c: C.violet },
    { n: "L3", t: "Data", d: "vector store, DB, cache — Qdrant, Redis, pgvector", c: C.gate },
    { n: "L2", t: "Compute", d: "GPU / FPGA / CPU — AWS, GCP, Lambda, RunPod", c: C.on },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 250" width="100%" role="img" aria-label="The seven-layer production AI stack">
        <text x="280" y="16" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>a production AI app is a dependency chain — L7 depends on L6 … down to L2</text>
        {layers.map((l, i) => {
          const y = 24 + i * 31;
          return (
            <g key={`sl${i}`}>
              <rect x="40" y={y} width="480" height="27" rx="5" fill={`${l.c}14`} stroke={l.c} strokeWidth="1.3" />
              <text x="56" y={y + 17} fontFamily={mono} fontSize="8.5" fontWeight="700" fill={l.c}>{l.n} · {l.t}</text>
              <text x="230" y={y + 17} fontFamily={mono} fontSize="7" fill={C.muted}>{l.d}</text>
              {i < 5 && <text x="280" y={y + 30} textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.faint}>↑ depends on ↓</text>}
            </g>
          );
        })}
        {/* L1 cross-cutting */}
        <rect x="40" y="214" width="480" height="28" rx="5" fill={`${C.hole}10`} stroke={C.hole} strokeWidth="1.4" strokeDasharray="5 3" />
        <text x="56" y="232" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.hole}>L1 · Observability</text>
        <text x="230" y="232" fontFamily={mono} fontSize="7" fill={C.muted}>cross-cutting — spans every layer (LangSmith, Prometheus, Grafana)</text>
      </svg>
    </DiagramFrame>
  );
}

/* What each layer inherits from earlier modules. */
export function LayerModuleMap({ caption }: { caption?: string }) {
  const rows = [
    { l: "Compute (L2)", m: "1, 2, 8", k: "roofline, FLOP/byte, DSP/BRAM budget", c: C.on },
    { l: "Model (L4)", m: "3, 4, 6", k: "quantization (INT8/4/binary), LoRA, distillation", c: C.violet },
    { l: "Serving (L5)", m: "5, 7", k: "KV cache, PagedAttention, continuous batching", c: C.sky },
    { l: "Orchestration (L6)", m: "9", k: "ReAct, LangGraph, memory, circuit breakers", c: C.indigo },
    { l: "Observability (L1)", m: "9", k: "LangSmith, Weave, cost tracking, evaluation", c: C.hole },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 180" width="100%" role="img" aria-label="What each layer inherits from earlier modules">
        <text x="280" y="18" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>nothing here is new — Module 10 connects what earlier modules built</text>
        <text x="40" y="38" fontFamily={mono} fontSize="7.4" fontWeight="700" fill={C.faint}>LAYER</text>
        <text x="180" y="38" fontFamily={mono} fontSize="7.4" fontWeight="700" fill={C.faint}>MODULES</text>
        <text x="250" y="38" fontFamily={mono} fontSize="7.4" fontWeight="700" fill={C.faint}>KEY CONCEPT CARRIED FORWARD</text>
        {rows.map((r, i) => {
          const y = 46 + i * 25;
          return (
            <g key={`lm${i}`}>
              <rect x="36" y={y} width="488" height="21" rx="4" fill={`${r.c}10`} stroke={r.c} strokeWidth="0.9" />
              <text x="46" y={y + 14} fontFamily={mono} fontSize="7.8" fontWeight="700" fill={r.c}>{r.l}</text>
              <text x="180" y={y + 14} fontFamily={mono} fontSize="7.6" fill={C.text}>{r.m}</text>
              <text x="250" y={y + 14} fontFamily={mono} fontSize="7.2" fill={C.muted}>{r.k}</text>
            </g>
          );
        })}
        <text x="280" y="176" textAnchor="middle" fontFamily={mono} fontSize="7.6" fill={C.faint}>optimise one layer in isolation and the bottleneck just moves to the next — measure end-to-end</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   10.2 — Scaling
   ════════════════════════════════════════════════════════════ */

/* The three scaling regimes. */
export function ScalingRegimes({ caption }: { caption?: string }) {
  const regs = [
    { t: "Prototype", u: "1–100 / day", cost: "$50–500/mo", d: "make it work; instrument everything; stay simple", c: C.on },
    { t: "Growth", u: "100–10k / day", cost: "$500–10k/mo", d: "caching, batching, cost attribution, prompt opt", c: C.gate },
    { t: "Production", u: "10k+ / day", cost: "significant", d: "routing, autoscale, multi-region, SLAs, A/B", c: EMERALD },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 170" width="100%" role="img" aria-label="The three scaling regimes">
        <text x="280" y="18" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>each regime needs different engineering — applying Regime 3 to a Regime 1 problem wastes months</text>
        {regs.map((r, i) => {
          const x = 16 + i * 178;
          return (
            <g key={`sr${i}`}>
              <rect x={x} y="32" width="164" height="108" rx="8" fill={`${r.c}12`} stroke={r.c} strokeWidth="1.5" />
              <text x={x + 82} y="52" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={r.c}>{r.t}</text>
              <text x={x + 82} y="68" textAnchor="middle" fontFamily={mono} fontSize="7.6" fontWeight="700" fill={C.text}>{r.u}</text>
              <text x={x + 82} y="82" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>{r.cost}</text>
              <foreignObject x={x + 8} y="90" width="148" height="46"><div style={{ fontFamily: mono, fontSize: "7.2px", color: C.text, textAlign: "center", lineHeight: 1.3 }}>{r.d}</div></foreignObject>
              {i < 2 && <text x={x + 170} y="88" fontFamily={mono} fontSize="10" fill={C.faint}>→</text>}
            </g>
          );
        })}
        <text x="280" y="160" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>the right decision at one scale is the wrong decision at another</text>
      </svg>
    </DiagramFrame>
  );
}

/* The quality / cost / latency production triangle. */
export function ProductionTriangle({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="The quality cost latency production triangle">
        <text x="260" y="18" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>every system sits somewhere in the quality / cost / latency triangle</text>
        <polygon points="260,36 70,186 450,186" fill={`${EMERALD}08`} stroke={EMERALD} strokeWidth="1.4" />
        {/* vertices */}
        <text x="260" y="32" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={EMERALD}>QUALITY</text>
        <text x="60" y="200" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.on}>LOW COST</text>
        <text x="460" y="200" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.hole}>HIGH COST / QUALITY</text>
        {/* model placements */}
        {[
          { x: 260, y: 70, t: "Claude Opus", c: C.hole },
          { x: 300, y: 110, t: "Claude Sonnet", c: C.violet },
          { x: 150, y: 168, t: "Haiku", c: C.on },
          { x: 220, y: 168, t: "Llama-8B INT4", c: C.on },
          { x: 330, y: 150, t: "Llama-70B INT8", c: C.gate },
        ].map((m, i) => (
          <g key={`pt${i}`}>
            <circle cx={m.x} cy={m.y} r="3.2" fill={m.c} />
            <text x={m.x + 6} y={m.y + 3} fontFamily={mono} fontSize="6.8" fill={C.text}>{m.t}</text>
          </g>
        ))}
        <text x="260" y="214" textAnchor="middle" fontFamily={mono} fontSize="7.4" fill={C.faint}>3rd axis (out of page) = latency · route each use case to the right point — it&apos;s not one decision</text>
      </svg>
    </DiagramFrame>
  );
}

/* The seven cost levers. */
export function CostLevers({ caption }: { caption?: string }) {
  const levers = [
    { t: "Model selection", d: "Haiku vs Opus: 20–50× cheaper for simple tasks" },
    { t: "Prompt compression", d: "2,000→800 tok system prompt = −60% input" },
    { t: "Output length control", d: "\"answer in 2 sentences\" = 5–10× fewer out tokens" },
    { t: "Caching", d: "prompt caching: up to −90% on repeated prefixes" },
    { t: "Quantization", d: "INT8 −2× VRAM, INT4 −4× — half the GPU" },
    { t: "Batching", d: "continuous batching raises GPU utilisation" },
    { t: "Request routing", d: "cheap classifier sends easy queries to small models" },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 200" width="100%" role="img" aria-label="The seven cost levers">
        <text x="280" y="18" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>prompt engineering is cost engineering — every token saved is money at scale</text>
        {levers.map((l, i) => {
          const y = 28 + i * 23;
          return (
            <g key={`cl${i}`}>
              <rect x="30" y={y} width="500" height="19" rx="4" fill={`${EMERALD}10`} stroke={EMERALD} strokeWidth="0.9" />
              <text x="40" y={y + 13} fontFamily={mono} fontSize="7.8" fontWeight="700" fill={EMERALD}>{i + 1}. {l.t}</text>
              <text x="210" y={y + 13} fontFamily={mono} fontSize="7.2" fill={C.muted}>{l.d}</text>
            </g>
          );
        })}
        <text x="280" y="194" textAnchor="middle" fontFamily={mono} fontSize="7.6" fill={C.faint}>a well-tuned router alone can cut API spend 70–80%</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   10.3 — Production Reliability Engineering
   ════════════════════════════════════════════════════════════ */

/* The four-level reliability stack with SLA targets. */
export function ReliabilityStack({ caption }: { caption?: string }) {
  const levels = [
    { t: "Infrastructure", d: "retry/backoff, circuit breaker, provider fallback", sla: "99.9% uptime", c: C.on },
    { t: "Response quality", d: "schema validation, LLM-judge, canary, A/B", sla: "<5% low-quality", c: C.gate },
    { t: "Agent", d: "task success, step efficiency, budget, escalation", sla: ">90% success, <$2/task", c: C.indigo },
    { t: "Safety", d: "in/out classifiers, injection detect, PII, audit", sla: "<0.1% harmful", c: C.hole },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 180" width="100%" role="img" aria-label="The four-level reliability stack">
        <text x="280" y="18" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>AI reliability is four-dimensional — each level has its own SLA & measurement</text>
        {levels.map((l, i) => {
          const y = 28 + i * 35;
          return (
            <g key={`rs${i}`}>
              <rect x="30" y={y} width="370" height="30" rx="5" fill={`${l.c}12`} stroke={l.c} strokeWidth="1.2" />
              <text x="42" y={y + 13} fontFamily={mono} fontSize="8.2" fontWeight="700" fill={l.c}>{i + 1}. {l.t}</text>
              <text x="42" y={y + 25} fontFamily={mono} fontSize="6.8" fill={C.muted}>{l.d}</text>
              <rect x="408" y={y} width="122" height="30" rx="5" fill={`${l.c}1c`} stroke={l.c} strokeWidth="1.1" />
              <text x="469" y={y + 18} textAnchor="middle" fontFamily={mono} fontSize="7" fontWeight="700" fill={l.c}>{l.sla}</text>
            </g>
          );
        })}
        <text x="280" y="174" textAnchor="middle" fontFamily={mono} fontSize="7.6" fill={C.faint}>AI failures are probabilistic, often silent, and compound in agents — uptime checks miss them</text>
      </svg>
    </DiagramFrame>
  );
}

/* The five-stage deployment pipeline. */
export function DeploymentPipeline({ caption }: { caption?: string }) {
  const stages = [
    { t: "offline eval", d: "beat baseline on test suite", c: C.on },
    { t: "shadow", d: "real traffic, outputs hidden", c: C.gate },
    { t: "canary", d: "1–5% users, watch 24–48h", c: C.violet },
    { t: "progressive", d: "10→25→50→100%, auto-rollback", c: C.indigo },
    { t: "full prod", d: "old version kept 7 days", c: EMERALD },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 150" width="100%" role="img" aria-label="The five-stage deployment pipeline">
        <text x="280" y="20" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>how a prompt/model change reaches production — slow on purpose, the stakes are real</text>
        {stages.map((s, i) => {
          const x = 10 + i * 111;
          return (
            <g key={`dp${i}`}>
              <rect x={x} y="48" width="98" height="48" rx="7" fill={`${s.c}14`} stroke={s.c} strokeWidth="1.4" />
              <text x={x + 49} y="68" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={s.c}>{s.t}</text>
              <foreignObject x={x + 4} y="72" width="90" height="22"><div style={{ fontFamily: mono, fontSize: "6.6px", color: C.muted, textAlign: "center", lineHeight: 1.15 }}>{s.d}</div></foreignObject>
              {i < 4 && <g><line x1={x + 98} y1="72" x2={x + 111} y2="72" stroke={C.faint} strokeWidth="1.2" /><polygon points={`${x + 111},72 ${x + 104},68 ${x + 104},76`} fill={C.faint} /></g>}
            </g>
          );
        })}
        <text x="280" y="124" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.text}>a bad prompt change can cost +20% tokens or +2% wrong answers — tens of thousands of dollars</text>
        <text x="280" y="140" textAnchor="middle" fontFamily={mono} fontSize="7.6" fontWeight="700" fill={C.faint}>each gate can halt or roll back automatically before full exposure</text>
      </svg>
    </DiagramFrame>
  );
}
