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

/* ════════════════════════════════════════════════════════════
   10.4 — System Design Patterns
   ════════════════════════════════════════════════════════════ */

/* The five core AI application architectures. */
export function FiveArchitectures({ caption }: { caption?: string }) {
  const pats = [
    { n: "1", t: "Single-turn Q&A", f: "user → LLM → answer", u: "FAQ, summarise, translate", c: C.on },
    { n: "2", t: "RAG", f: "user → retrieve → context+LLM → answer", u: "reference docs/policies", c: C.gate },
    { n: "3", t: "Conversational + memory", f: "+ memory store, updated each turn", u: "assistants, tutors, support", c: C.violet },
    { n: "4", t: "Tool-using agent", f: "user → LLM ⇄ tools → answer", u: "research, code, multi-step", c: C.indigo },
    { n: "5", t: "Multi-agent pipeline", f: "orchestrator → A → B → C (+ critic)", u: "complex / specialised work", c: EMERALD },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 200" width="100%" role="img" aria-label="The five core AI architectures">
        <text x="280" y="18" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>almost every AI app is one of five patterns — increasing in power and complexity</text>
        {pats.map((p, i) => {
          const y = 28 + i * 33;
          return (
            <g key={`fa${i}`}>
              <rect x="30" y={y} width="500" height="29" rx="5" fill={`${p.c}12`} stroke={p.c} strokeWidth="1.2" />
              <text x="42" y={y + 13} fontFamily={mono} fontSize="8.2" fontWeight="700" fill={p.c}>{p.n}. {p.t}</text>
              <text x="42" y={y + 24} fontFamily={mono} fontSize="6.8" fill={C.muted}>{p.f}</text>
              <text x="335" y={y + 19} fontFamily={mono} fontSize="7" fill={C.text}>use: {p.u}</text>
            </g>
          );
        })}
        <text x="280" y="196" textAnchor="middle" fontFamily={mono} fontSize="7.6" fill={C.faint}>RAG quality = min(retrieval quality, synthesis quality) — retrieval is usually the limit</text>
      </svg>
    </DiagramFrame>
  );
}

/* Decision tree for choosing a pattern. */
export function PatternDecisionTree({ caption }: { caption?: string }) {
  const steps = [
    { q: "Knowledge that changes over time?", yes: "→ RAG (Pattern 2)", c: C.gate },
    { q: "Multiple steps or tool use?", yes: "→ Tool-using agent (Pattern 4)", c: C.indigo },
    { q: "User returns, expects continuity?", yes: "→ Conversational + memory (Pattern 3)", c: C.violet },
    { q: "Otherwise", yes: "→ Single-turn Q&A (Pattern 1)", c: C.on },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 200" width="100%" role="img" aria-label="Pattern selection decision tree">
        <text x="280" y="18" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>the decision tree is simpler than engineers expect — use the simplest pattern that works</text>
        {steps.map((s, i) => {
          const y = 30 + i * 34;
          return (
            <g key={`pd${i}`}>
              <rect x="40" y={y} width="300" height="26" rx="5" fill={`${C.panel}`} stroke={C.line} strokeWidth="1" />
              <text x="52" y={y + 17} fontFamily={mono} fontSize="7.8" fill={C.text}>{s.q}</text>
              <rect x="352" y={y} width="178" height="26" rx="5" fill={`${s.c}16`} stroke={s.c} strokeWidth="1.2" />
              <text x="362" y={y + 17} fontFamily={mono} fontSize="7.4" fontWeight="700" fill={s.c}>{s.yes}</text>
              {i < 3 && <text x="190" y={y + 33} textAnchor="middle" fontFamily={mono} fontSize="6.6" fill={C.faint}>no ↓</text>}
            </g>
          );
        })}
        <rect x="40" y="172" width="490" height="22" rx="5" fill={`${EMERALD}10`} stroke={EMERALD} strokeWidth="1.1" strokeDasharray="4 3" />
        <text x="285" y="187" textAnchor="middle" fontFamily={mono} fontSize="7.2" fontWeight="700" fill={EMERALD}>Multi-agent (Pattern 5) ONLY when simpler patterns are proven insufficient</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   10.5 — Inference Infrastructure Decision
   ════════════════════════════════════════════════════════════ */

/* API-first vs self-hosted vs hybrid router. */
export function BuildVsBuy({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 190" width="100%" role="img" aria-label="Build versus buy: API, self-hosted, hybrid">
        <text x="280" y="16" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>build vs buy — most systems at scale end up hybrid</text>
        {/* API-first */}
        <rect x="20" y="28" width="166" height="92" rx="8" fill={`${C.sky}12`} stroke={C.sky} strokeWidth="1.4" />
        <text x="103" y="46" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.sky}>API-first</text>
        <foreignObject x="28" y="52" width="150" height="64"><div style={{ fontFamily: mono, fontSize: "6.8px", color: C.text, lineHeight: 1.35 }}>+ zero infra, SOTA, instant scale<br />− data leaves, linear cost, rate limits<br /><b>most startups → mid-size</b></div></foreignObject>
        {/* self-hosted */}
        <rect x="197" y="28" width="166" height="92" rx="8" fill={`${C.on}12`} stroke={C.on} strokeWidth="1.4" />
        <text x="280" y="46" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.on}>Self-hosted</text>
        <foreignObject x="205" y="52" width="150" height="64"><div style={{ fontFamily: mono, fontSize: "6.8px", color: C.text, lineHeight: 1.35 }}>+ data stays, fixed cost, fine-tune<br />− GPU expertise, you own uptime<br /><b>compliance / high-volume</b></div></foreignObject>
        {/* hybrid */}
        <rect x="374" y="28" width="166" height="92" rx="8" fill={`${EMERALD}12`} stroke={EMERALD} strokeWidth="1.6" />
        <text x="457" y="46" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={EMERALD}>Hybrid (router)</text>
        <foreignObject x="382" y="52" width="150" height="64"><div style={{ fontFamily: mono, fontSize: "6.8px", color: C.text, lineHeight: 1.35 }}>classifier routes per request:<br />simple → self-hosted small<br />complex → frontier API<br /><b>most common at scale</b></div></foreignObject>
        <text x="280" y="146" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.text}>self-hosting typically becomes economical around ~$50k–100k/month in API spend</text>
        <text x="280" y="166" textAnchor="middle" fontFamily={mono} fontSize="7.6" fontWeight="700" fill={C.faint}>a good complexity router sends only genuinely hard queries to the expensive model</text>
      </svg>
    </DiagramFrame>
  );
}

/* GPU cloud provider cost comparison. */
export function GpuProviderCompare({ caption }: { caption?: string }) {
  // Llama-3-70B (4× A100 80GB) approx $/month, illustrative
  const rows = [
    { t: "AWS (p4d/p5)", k: 34560, c: C.hole },
    { t: "Azure (NDv5)", k: 30000, c: C.hole },
    { t: "GCP (A3)", k: 26000, c: C.gate },
    { t: "CoreWeave", k: 9000, c: C.violet },
    { t: "Lambda Labs", k: 5760, c: C.on },
    { t: "RunPod", k: 4320, c: EMERALD },
  ];
  const max = 34560;
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 200" width="100%" role="img" aria-label="GPU cloud provider cost comparison">
        <text x="280" y="18" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>running Llama-3-70B (4× A100 80GB) — approx $/month (illustrative)</text>
        {rows.map((r, i) => {
          const y = 30 + i * 25;
          const w = (r.k / max) * 330;
          return (
            <g key={`gp${i}`}>
              <text x="20" y={y + 15} fontFamily={mono} fontSize="7.6" fill={C.text}>{r.t}</text>
              <rect x="150" y={y + 2} width={w} height="17" rx="3" fill={`${r.c}30`} stroke={r.c} strokeWidth="1.1" />
              <text x={156 + w} y={y + 15} fontFamily={mono} fontSize="7.4" fontWeight="700" fill={r.c}>${(r.k / 1000).toFixed(1)}k</text>
            </g>
          );
        })}
        <text x="280" y="192" textAnchor="middle" fontFamily={mono} fontSize="7.8" fill={C.faint}>~6× spread: hyperscalers buy ecosystem/compliance; AI-clouds (Lambda, RunPod) buy raw $/GPU</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   10.6 — Observability at Scale
   ════════════════════════════════════════════════════════════ */

/* The four pillars of AI observability. */
export function ObservabilityPillars({ caption }: { caption?: string }) {
  const pillars = [
    { t: "Metrics", d: "GPU util, RPS, P50/95/99, TTFT, cost/req, cache hit", c: C.on },
    { t: "Logs", d: "structured JSON per LLM call — reproduce, attribute, trend", c: C.gate },
    { t: "Traces", d: "end-to-end call chain — 10–30 spans per agent request", c: C.indigo },
    { t: "Quality eval", d: "AI-specific — 1% judge sampling, edge-case 100%, nightly", c: EMERALD },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 160" width="100%" role="img" aria-label="The four pillars of AI observability">
        <text x="280" y="18" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>traditional software has 3 pillars — AI needs a 4th: quality evaluation</text>
        {pillars.map((p, i) => {
          const x = 12 + i * 137;
          return (
            <g key={`op${i}`}>
              <rect x={x} y="32" width="126" height="96" rx="8" fill={`${p.c}12`} stroke={p.c} strokeWidth={i === 3 ? 1.7 : 1.4} />
              <text x={x + 63} y="52" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={p.c}>{p.t}</text>
              <foreignObject x={x + 6} y="60" width="114" height="64"><div style={{ fontFamily: mono, fontSize: "7px", color: C.text, textAlign: "center", lineHeight: 1.35 }}>{p.d}</div></foreignObject>
            </g>
          );
        })}
        <text x="280" y="150" textAnchor="middle" fontFamily={mono} fontSize="7.8" fill={C.faint}>without observability, diagnosing an incident takes 2–4h; with it, 10–15 min</text>
      </svg>
    </DiagramFrame>
  );
}

/* The P0–P3 alert severity ladder. */
export function AlertStack({ caption }: { caption?: string }) {
  const tiers = [
    { p: "P0", r: "wake up now (<5 min)", e: "error >10%, service down, safety >5%, cost >10× normal", c: C.hole },
    { p: "P1", r: "respond <30 min", e: "P99 >30s, error 1–10%, GPU >95%, judge <3.0", c: C.gate },
    { p: "P2", r: "investigate <4h", e: "P99 >10s, cache hit −20pts, cost/req +20%", c: C.violet },
    { p: "P3", r: "next sprint", e: "slow quality decline, gradual latency creep", c: C.on },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 168" width="100%" role="img" aria-label="The P0 to P3 alert severity ladder">
        <text x="280" y="18" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>alerts must be precise enough to wake someone at 3am without crying wolf</text>
        {tiers.map((t, i) => {
          const y = 28 + i * 32;
          return (
            <g key={`as${i}`}>
              <rect x="28" y={y} width="56" height="26" rx="5" fill={`${t.c}1c`} stroke={t.c} strokeWidth="1.3" />
              <text x="56" y={y + 17} textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={t.c}>{t.p}</text>
              <text x="96" y={y + 11} fontFamily={mono} fontSize="7.4" fontWeight="700" fill={t.c}>{t.r}</text>
              <text x="96" y={y + 22} fontFamily={mono} fontSize="6.8" fill={C.muted}>{t.e}</text>
            </g>
          );
        })}
        <text x="280" y="162" textAnchor="middle" fontFamily={mono} fontSize="7.8" fill={C.faint}>severity = response urgency; cost-explosion and safety alerts are always P0</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   10.7 — Fine-Tuning in Production
   ════════════════════════════════════════════════════════════ */

/* Try these in order, cheapest to most expensive — fine-tuning is last. */
export function FineTuningLadder({ caption }: { caption?: string }) {
  const rungs = [
    { t: "1. Better prompting", d: "system prompt + few-shot", cost: "engineer time", c: C.on },
    { t: "2. RAG", d: "inject context at inference", cost: "embed + vector store", c: C.gate },
    { t: "3. Prompt caching + long context", d: "examples in the system prompt", cost: "higher tokens", c: C.violet },
    { t: "4. Fine-tuning", d: "adapt the weights", cost: "$100–$1000+", c: C.hole },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 175" width="100%" role="img" aria-label="Try these before fine-tuning, in order">
        <text x="280" y="18" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>fine-tuning is often the wrong first answer — try in order, cheapest first</text>
        {rungs.map((r, i) => {
          const y = 28 + i * 33;
          return (
            <g key={`ft${i}`}>
              <rect x="30" y={y} width="500" height="29" rx="5" fill={`${r.c}12`} stroke={r.c} strokeWidth="1.2" />
              <text x="42" y={y + 13} fontFamily={mono} fontSize="8.2" fontWeight="700" fill={r.c}>{r.t}</text>
              <text x="42" y={y + 24} fontFamily={mono} fontSize="6.8" fill={C.muted}>{r.d}</text>
              <text x="430" y={y + 19} fontFamily={mono} fontSize="7.2" fontWeight="700" fill={r.c}>{r.cost}</text>
              {i < 3 && <text x="280" y={y + 32} textAnchor="middle" fontFamily={mono} fontSize="6.4" fill={C.faint}>↓ only if it fails</text>}
            </g>
          );
        })}
        <text x="280" y="170" textAnchor="middle" fontFamily={mono} fontSize="7.6" fill={C.faint}>fine-tune for format/style/vocab; NOT for changing facts (use RAG) or reasoning capability</text>
      </svg>
    </DiagramFrame>
  );
}

/* CPT vs SFT vs RLHF/DPO. */
export function AdaptationTypes({ caption }: { caption?: string }) {
  const types = [
    { t: "CPT", n: "continued pre-training", what: "more domain text, no instructions", data: "raw text, 100s GB–TB", cost: "very high", c: C.violet },
    { t: "SFT", n: "supervised fine-tuning", what: "(instruction, response) pairs", data: "1k–50k pairs", cost: "$100–$1000", c: EMERALD },
    { t: "RLHF / DPO", n: "preference optimisation", what: "learn from A-better-than-B", data: "preference pairs", cost: "high", c: C.hole },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 165" width="100%" role="img" aria-label="CPT versus SFT versus RLHF">
        <text x="280" y="18" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>three ways to adapt a model — for most production cases, SFT is what &quot;fine-tuning&quot; means</text>
        {types.map((t, i) => {
          const x = 16 + i * 178;
          return (
            <g key={`at${i}`}>
              <rect x={x} y="30" width="164" height="110" rx="8" fill={`${t.c}12`} stroke={t.c} strokeWidth={i === 1 ? 1.7 : 1.4} />
              <text x={x + 82} y="48" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={t.c}>{t.t}</text>
              <text x={x + 82} y="61" textAnchor="middle" fontFamily={mono} fontSize="6.6" fill={C.muted}>{t.n}</text>
              <foreignObject x={x + 8} y="68" width="148" height="30"><div style={{ fontFamily: mono, fontSize: "7px", color: C.text, textAlign: "center", lineHeight: 1.25 }}>{t.what}</div></foreignObject>
              <text x={x + 82} y="114" textAnchor="middle" fontFamily={mono} fontSize="6.8" fill={C.muted}>{t.data}</text>
              <text x={x + 82} y="128" textAnchor="middle" fontFamily={mono} fontSize="7" fontWeight="700" fill={t.c}>cost: {t.cost}</text>
            </g>
          );
        })}
        <text x="280" y="158" textAnchor="middle" fontFamily={mono} fontSize="7.6" fill={C.faint}>80/20 rule: 80% of fine-tuning work is data curation — 100 perfect examples ≫ 10k mediocre</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   10.8 — Security & Safety
   ════════════════════════════════════════════════════════════ */

/* The AI-specific attack surface. */
export function AttackSurface({ caption }: { caption?: string }) {
  const attacks = [
    { t: "Prompt injection", d: "instructions hidden in processed content hijack the agent", fix: "role separation · output classifiers · tool allow-lists", c: C.hole },
    { t: "Data exfiltration", d: "agent tricked into revealing sensitive data it can access", fix: "least-privilege data access · PII detection · audit logs", c: C.gate },
    { t: "Model inversion", d: "fine-tuned model leaks memorised training data", fix: "don't FT on PII · differential privacy · memorisation tests", c: C.violet },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 175" width="100%" role="img" aria-label="The AI-specific attack surface">
        <text x="280" y="18" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>AI adds new attack vectors on top of all the usual web-app ones</text>
        {attacks.map((a, i) => {
          const y = 28 + i * 44;
          return (
            <g key={`ak${i}`}>
              <rect x="30" y={y} width="500" height="38" rx="6" fill={`${a.c}10`} stroke={a.c} strokeWidth="1.2" />
              <text x="42" y={y + 15} fontFamily={mono} fontSize="8.4" fontWeight="700" fill={a.c}>{a.t}</text>
              <text x="42" y={y + 29} fontFamily={mono} fontSize="6.9" fill={C.muted}>{a.d}</text>
              <text x="42" y={y + 38} fontFamily={mono} fontSize="6.6" fontWeight="700" fill={a.c} opacity="0" >.</text>
              <text x="300" y={y + 15} fontFamily={mono} fontSize="6.6" fontWeight="700" fill={C.on}>mitigate:</text>
              <foreignObject x="300" y={y + 18} width="222" height="18"><div style={{ fontFamily: mono, fontSize: "6.4px", color: C.text, lineHeight: 1.1 }}>{a.fix}</div></foreignObject>
            </g>
          );
        })}
        <text x="280" y="170" textAnchor="middle" fontFamily={mono} fontSize="7.6" fill={C.faint}>the LLM can&apos;t reliably tell instructions from content — that&apos;s the root of injection</text>
      </svg>
    </DiagramFrame>
  );
}

/* The five-layer safety stack (defence in depth). */
export function SafetyStack({ caption }: { caption?: string }) {
  const layers = [
    { t: "1. Model-level safety", d: "base-model training — obvious harmful requests", c: C.on },
    { t: "2. System-prompt safety", d: "scope boundaries — off-topic, scope creep", c: C.gate },
    { t: "3. Input classification", d: "before the LLM call — Llama Guard, custom", c: C.violet },
    { t: "4. Output classification", d: "after the response — catch tricked outputs", c: C.indigo },
    { t: "5. Human review", d: "high-stakes outputs — medical, legal, financial", c: C.hole },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 185" width="100%" role="img" aria-label="The five-layer safety stack">
        <text x="280" y="18" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>safety is a stack — no single layer is sufficient (defence in depth)</text>
        {layers.map((l, i) => {
          const y = 28 + i * 29;
          const w = 320 + i * 32;
          return (
            <g key={`ss${i}`}>
              <rect x={(560 - w) / 2} y={y} width={w} height="24" rx="5" fill={`${l.c}14`} stroke={l.c} strokeWidth="1.2" />
              <text x="280" y={y + 11} textAnchor="middle" fontFamily={mono} fontSize="7.8" fontWeight="700" fill={l.c}>{l.t}</text>
              <text x="280" y={y + 20} textAnchor="middle" fontFamily={mono} fontSize="6.6" fill={C.muted}>{l.d}</text>
            </g>
          );
        })}
        <text x="280" y="180" textAnchor="middle" fontFamily={mono} fontSize="7.6" fill={C.faint}>an attacker must bypass every independent layer to succeed</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   10.9 — The Economics of AI Products
   ════════════════════════════════════════════════════════════ */

/* Unit economics worked example (code-review tool). */
export function UnitEconomics({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 165" width="100%" role="img" aria-label="Unit economics of an AI product">
        <text x="270" y="18" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>cost per valuable action — e.g. one PR review</text>
        {/* cost bar vs price bar */}
        <text x="40" y="48" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.hole}>AI cost</text>
        <rect x="120" y="38" width="36" height="18" rx="3" fill={`${C.hole}30`} stroke={C.hole} strokeWidth="1.1" />
        <text x="164" y="51" fontFamily={mono} fontSize="7.4" fill={C.text}>$0.010 (LLM + search + overhead)</text>
        <text x="40" y="80" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.on}>price</text>
        <rect x="120" y="70" width="360" height="18" rx="3" fill={`${C.on}26`} stroke={C.on} strokeWidth="1.1" />
        <text x="124" y="83" fontFamily={mono} fontSize="7.4" fontWeight="700" fill={C.on}>$0.10 per review  →  90% gross margin</text>
        {/* scale */}
        <rect x="40" y="104" width="460" height="40" rx="7" fill={`${EMERALD}10`} stroke={EMERALD} strokeWidth="1.2" />
        <text x="270" y="120" textAnchor="middle" fontFamily={mono} fontSize="7.6" fontWeight="700" fill={EMERALD}>1,000 users × 500 reviews/mo: $50k revenue − $5k AI = $45k profit</text>
        <text x="270" y="135" textAnchor="middle" fontFamily={mono} fontSize="7.2" fill={C.muted}>but AI cost scales LINEARLY with usage — unlike near-zero-marginal-cost SaaS</text>
        <text x="270" y="158" textAnchor="middle" fontFamily={mono} fontSize="7.6" fill={C.faint}>this is why AI product economics differ fundamentally from classic software</text>
      </svg>
    </DiagramFrame>
  );
}

/* The four cost-vs-revenue stages. */
export function AiCostStages({ caption }: { caption?: string }) {
  const stages = [
    { t: "Stage 1", r: "negligible vs eng cost", a: "optimise product quality, not cost", c: C.on },
    { t: "Stage 2", r: "10–30% of revenue", a: "prompt caching, smarter model selection", c: C.gate },
    { t: "Stage 3", r: "30–50% of revenue", a: "fine-tune small models, route, cache hard", c: C.violet },
    { t: "Stage 4", r: "> 50% of revenue", a: "business model broken — self-host / re-architect", c: C.hole },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 170" width="100%" role="img" aria-label="The four AI cost-to-revenue stages">
        <text x="280" y="18" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>as AI cost rises against revenue, the engineering priority changes</text>
        {stages.map((s, i) => {
          const y = 28 + i * 32;
          return (
            <g key={`cs${i}`}>
              <rect x="30" y={y} width="120" height="26" rx="5" fill={`${s.c}16`} stroke={s.c} strokeWidth="1.2" />
              <text x="44" y={y + 12} fontFamily={mono} fontSize="7.8" fontWeight="700" fill={s.c}>{s.t}</text>
              <text x="44" y={y + 22} fontFamily={mono} fontSize="6.6" fill={C.muted}>{s.r}</text>
              <rect x="158" y={y} width="372" height="26" rx="5" fill={`${s.c}0c`} stroke={s.c} strokeWidth="0.9" />
              <text x="170" y={y + 17} fontFamily={mono} fontSize="7.4" fill={C.text}>{s.a}</text>
            </g>
          );
        })}
        <text x="280" y="164" textAnchor="middle" fontFamily={mono} fontSize="7.6" fill={C.faint}>sustainable AI cost is ~30–40% of revenue; gross margin target 60–80%</text>
      </svg>
    </DiagramFrame>
  );
}
