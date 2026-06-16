import { C, DiagramFrame, mono } from "./_shared";

/* ════════════════════════════════════════════════════════════
   Module 5 — Inference Systems Fundamentals
   Accent: amber (C.gate). Figures mirror the per-module palette.
   ════════════════════════════════════════════════════════════ */

const AMBER = C.gate;

/* ════════════════════════════════════════════════════════════
   5.1 — Types of Inference
   ════════════════════════════════════════════════════════════ */

/* Five inference paradigms and their objectives. */
export function InferenceParadigms({ caption }: { caption?: string }) {
  const cards = [
    { t: "Batch", o: "throughput", c: C.blue },
    { t: "Real-time", o: "latency", c: AMBER },
    { t: "Streaming", o: "perceived latency", c: C.violet },
    { t: "Edge", o: "fit / power", c: C.on },
    { t: "Serverless", o: "idle cost", c: C.hole },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={580}>
      <svg viewBox="0 0 580 150" width="100%" role="img" aria-label="Five inference paradigms">
        {cards.map((card, i) => {
          const x = 14 + i * 112;
          return (
            <g key={card.t}>
              <rect x={x} y="34" width="100" height="74" rx="8" fill={`${card.c}14`} stroke={card.c} strokeWidth="1.4" />
              <text x={x + 50} y="62" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={card.c}>{card.t}</text>
              <text x={x + 50} y="84" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>optimise</text>
              <text x={x + 50} y="97" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.text}>{card.o}</text>
            </g>
          );
        })}
        <text x="290" y="24" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>one workload, five architectures — the objective dictates every downstream choice</text>
        <text x="290" y="128" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>using the wrong paradigm is one of the most expensive ML-deployment mistakes</text>
      </svg>
    </DiagramFrame>
  );
}

/* Streaming TTFT + TGS timeline. */
export function StreamingTTFT({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={580}>
      <svg viewBox="0 0 580 170" width="100%" role="img" aria-label="Streaming TTFT and token generation speed">
        <line x1="30" y1="90" x2="550" y2="90" stroke={C.faint} strokeWidth="1.2" />
        {/* request */}
        <text x="40" y="72" fontFamily={mono} fontSize="9" fill={C.muted}>request</text>
        <line x1="40" y1="78" x2="40" y2="102" stroke={C.text} strokeWidth="1.4" />
        {/* prefill block */}
        <rect x="40" y="80" width="150" height="20" rx="3" fill={`${C.blue}26`} stroke={C.blue} strokeWidth="1.1" />
        <text x="115" y="94" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.blue}>prefill (compute)</text>
        {/* TTFT marker */}
        <line x1="190" y1="50" x2="190" y2="110" stroke={AMBER} strokeWidth="1.3" strokeDasharray="3 2" />
        <text x="190" y="44" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={AMBER}>TTFT</text>
        {/* decode tokens */}
        {Array.from({ length: 7 }, (_, i) => (
          <g key={i}>
            <rect x={196 + i * 48} y="80" width="40" height="20" rx="3" fill={`${C.on}22`} stroke={C.on} strokeWidth="1" />
            <text x={216 + i * 48} y="94" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.on}>tok{i + 1}</text>
          </g>
        ))}
        <text x="380" y="126" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.on}>TGS = bandwidth ÷ model bytes (per-token decode)</text>
        <text x="380" y="142" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>any TGS &gt; 15 tok/s outpaces the eye — feels instant</text>
        <text x="115" y="126" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>one-shot, ∝ prompt length</text>
      </svg>
    </DiagramFrame>
  );
}

/* Edge priority inversion. */
export function EdgePriority({ caption }: { caption?: string }) {
  const cloud = ["accuracy", "latency", "power", "fit"];
  const edge = ["fit", "latency", "power", "accuracy"];
  const colOf = (label: string) => ({ fit: C.hole, latency: AMBER, power: C.violet, accuracy: C.on }[label] || C.off);
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 200" width="100%" role="img" aria-label="Edge inverts the priority order">
        {[{ lbl: "CLOUD", list: cloud, ox: 20 }, { lbl: "EDGE", list: edge, ox: 280 }].map((col) => (
          <g key={col.lbl}>
            <text x={col.ox + 110} y="28" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.text}>{col.lbl}</text>
            {col.list.map((p, i) => (
              <g key={p}>
                <rect x={col.ox} y={40 + i * 36} width="220" height="28" rx="5" fill={`${colOf(p)}1a`} stroke={colOf(p)} strokeWidth="1.2" />
                <text x={col.ox + 12} y={58 + i * 36} fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>{i + 1}</text>
                <text x={col.ox + 110} y={58 + i * 36} textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={colOf(p)}>{p}</text>
              </g>
            ))}
          </g>
        ))}
        <text x="260" y="192" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>on the edge, accuracy is the LAST consideration, not the first</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   5.2 — Latency vs Throughput
   ════════════════════════════════════════════════════════════ */

/* Latency-throughput Pareto frontier. */
export function LatencyThroughputPareto({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 260" width="100%" role="img" aria-label="Latency throughput Pareto frontier">
        <line x1="60" y1="30" x2="60" y2="220" stroke={C.faint} strokeWidth="1.2" />
        <line x1="60" y1="220" x2="470" y2="220" stroke={C.faint} strokeWidth="1.2" />
        <text x="36" y="125" fontFamily={mono} fontSize="9" fill={C.muted} transform="rotate(-90 36 125)">throughput (RPS)</text>
        <text x="265" y="248" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>latency (ms)</text>
        <path d="M 70 210 C 160 120, 280 70, 450 56" fill="none" stroke={AMBER} strokeWidth="2.6" />
        {[[90, 196, "batch=1"], [170, 120, "batch=8"], [300, 72, "batch=32"]].map(([x, y, l], i) => (
          <g key={i}>
            <circle cx={x as number} cy={y as number} r="4" fill={AMBER} />
            <text x={(x as number) + 8} y={(y as number) + 4} fontFamily={mono} fontSize="8" fill={C.muted}>{l}</text>
          </g>
        ))}
        <text x="150" y="190" fontFamily={mono} fontSize="8" fill={C.on}>inside = wasteful</text>
        <text x="350" y="110" fontFamily={mono} fontSize="8" fill={C.hole}>outside = impossible</text>
        <text x="265" y="254" textAnchor="middle" fontFamily={mono} fontSize="0" fill={C.faint}></text>
      </svg>
    </DiagramFrame>
  );
}

/* Little's Law: latency explodes near capacity. */
export function LittlesLaw({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 250" width="100%" role="img" aria-label="Latency versus utilisation hockey stick">
        <line x1="60" y1="30" x2="60" y2="210" stroke={C.faint} strokeWidth="1.2" />
        <line x1="60" y1="210" x2="470" y2="210" stroke={C.faint} strokeWidth="1.2" />
        <text x="36" y="120" fontFamily={mono} fontSize="9" fill={C.muted} transform="rotate(-90 36 120)">latency (× service)</text>
        <text x="265" y="238" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>utilisation ρ</text>
        <path d="M 70 198 C 230 190, 330 170, 390 120 C 415 96, 430 60, 440 40" fill="none" stroke={AMBER} strokeWidth="2.6" />
        {[["50%", 190, 192], ["80%", 360, 150], ["95%", 425, 60]].map(([l, x, y], i) => (
          <g key={i}>
            <circle cx={x as number} cy={y as number} r="3.5" fill={i === 2 ? C.hole : AMBER} />
            <text x={(x as number) - 6} y={(y as number) - 8} fontFamily={mono} fontSize="8" fill={C.muted}>{l}</text>
          </g>
        ))}
        {/* safe zone */}
        <line x1="375" y1="30" x2="375" y2="210" stroke={C.on} strokeWidth="1" strokeDasharray="4 3" />
        <text x="200" y="60" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.on}>safe: target 75–80%</text>
        <text x="400" y="200" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.hole}>cliff</text>
        <text x="265" y="248" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>W = service / (1 − ρ) — queuing theory guarantees the cliff</text>
      </svg>
    </DiagramFrame>
  );
}

/* Dynamic batching: fire on full batch or timeout. */
export function DynamicBatching({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 180" width="100%" role="img" aria-label="Dynamic batching">
        <text x="70" y="40" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>incoming queue</text>
        {Array.from({ length: 5 }, (_, i) => (
          <rect key={i} x={28 + i * 18} y="52" width="14" height="20" rx="2" fill={`${C.blue}26`} stroke={C.blue} strokeWidth="0.9" />
        ))}
        <line x1="130" y1="62" x2="178" y2="62" stroke={C.faint} strokeWidth="1.2" />
        <polygon points="178,62 170,58 170,66" fill={C.faint} />
        {/* batcher */}
        <rect x="180" y="34" width="150" height="84" rx="8" fill={`${AMBER}12`} stroke={AMBER} strokeWidth="1.5" />
        <text x="255" y="54" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={AMBER}>dynamic batcher</text>
        <text x="255" y="76" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.text}>fire when:</text>
        <text x="255" y="92" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.on}>batch full</text>
        <text x="255" y="106" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.hole}>OR max_wait_ms</text>
        <line x1="330" y1="76" x2="378" y2="76" stroke={C.faint} strokeWidth="1.2" />
        <polygon points="378,76 370,72 370,80" fill={C.faint} />
        {/* GPU */}
        <rect x="380" y="56" width="80" height="40" rx="6" fill={`${C.on}16`} stroke={C.on} strokeWidth="1.4" />
        <text x="420" y="80" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.on}>GPU</text>
        <text x="280" y="152" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>timeout caps the latency penalty; full-batch captures throughput when traffic is heavy</text>
        <text x="280" y="168" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>10 ms wait: ~1 req at 100 RPS · ~10 reqs at 1000 RPS (≈10× throughput)</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   5.3 — Model Formats
   ════════════════════════════════════════════════════════════ */

/* Format journey: PyTorch → ONNX → hardware engines. */
export function ModelFormatJourney({ caption }: { caption?: string }) {
  const targets = [
    { t: "TensorRT", s: "NVIDIA", c: C.on },
    { t: "Core ML", s: "Apple", c: C.blue },
    { t: "TFLite", s: "Android", c: C.violet },
    { t: "GGUF", s: "CPU/edge", c: C.hole },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={580}>
      <svg viewBox="0 0 580 190" width="100%" role="img" aria-label="Model format journey">
        <rect x="24" y="80" width="96" height="40" rx="7" fill={`${C.off}16`} stroke={C.off} strokeWidth="1.3" />
        <text x="72" y="100" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.off}>PyTorch</text>
        <text x="72" y="113" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>.pth research</text>
        <line x1="120" y1="100" x2="156" y2="100" stroke={C.faint} strokeWidth="1.2" />
        <polygon points="156,100 148,96 148,104" fill={C.faint} />
        <rect x="158" y="80" width="96" height="40" rx="7" fill={`${AMBER}16`} stroke={AMBER} strokeWidth="1.5" />
        <text x="206" y="100" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={AMBER}>ONNX</text>
        <text x="206" y="113" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>portable graph</text>
        {targets.map((t, i) => {
          const y = 34 + i * 36;
          return (
            <g key={t.t}>
              <line x1="254" y1="100" x2="350" y2={y + 14} stroke={C.line} strokeWidth="0.9" />
              <rect x="350" y={y} width="150" height="28" rx="6" fill={`${t.c}14`} stroke={t.c} strokeWidth="1.2" />
              <text x="412" y={y + 18} textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={t.c}>{t.t} · {t.s}</text>
            </g>
          );
        })}
        <text x="290" y="182" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>each step trades flexibility for speed, portability for hardware-specificity</text>
      </svg>
    </DiagramFrame>
  );
}

/* TensorRT optimisation pipeline. */
export function TensorRTPipeline({ caption }: { caption?: string }) {
  const stages = [
    { t: "parse", c: C.off },
    { t: "fuse layers", c: C.blue },
    { t: "calibrate", c: C.violet },
    { t: "auto-tune", c: AMBER },
    { t: "plan memory", c: C.on },
    { t: "serialise", c: C.on },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={580}>
      <svg viewBox="0 0 580 150" width="100%" role="img" aria-label="TensorRT optimisation pipeline">
        {stages.map((s, i) => {
          const x = 14 + i * 92;
          return (
            <g key={s.t}>
              <rect x={x} y="50" width="78" height="40" rx="6" fill={`${s.c}16`} stroke={s.c} strokeWidth="1.3" />
              <text x={x + 39} y="74" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={s.c}>{s.t}</text>
              {i < stages.length - 1 && <line x1={x + 78} y1="70" x2={x + 92} y2="70" stroke={C.faint} strokeWidth="1.1" />}
            </g>
          );
        })}
        <rect x="278" y="100" width="80" height="22" rx="4" fill={`${AMBER}10`} stroke={AMBER} strokeWidth="0.9" strokeDasharray="3 2" />
        <text x="318" y="115" textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={AMBER}>1000s of micro-benchmarks</text>
        <text x="290" y="38" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>ONNX → a GPU- and batch-specific .engine</text>
        <text x="290" y="142" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>auto-tuning benchmarks every candidate kernel on THIS GPU — why compile takes minutes</text>
      </svg>
    </DiagramFrame>
  );
}

/* Format decision tree by deployment target. */
export function FormatDecisionTree({ caption }: { caption?: string }) {
  const rows = [
    { q: "NVIDIA datacenter", a: "TensorRT (max) / ONNX RT (flexible)", c: C.on },
    { q: "CPU LLM", a: "GGUF + llama.cpp (SIMD)", c: C.hole },
    { q: "Apple (Mac/iPhone)", a: "Core ML (ANE)", c: C.blue },
    { q: "Android", a: "TFLite (NNAPI)", c: C.violet },
    { q: "vision/NLP, portable", a: "ONNX Runtime", c: AMBER },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 200" width="100%" role="img" aria-label="Model format decision tree">
        <text x="280" y="24" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>deployment target → format</text>
        {rows.map((r, i) => {
          const y = 36 + i * 30;
          return (
            <g key={r.q}>
              <rect x="20" y={y} width="200" height="24" rx="5" fill={C.panel} stroke={C.line} strokeWidth="0.9" />
              <text x="32" y={y + 16} fontFamily={mono} fontSize="9" fill={C.text}>{r.q}</text>
              <line x1="220" y1={y + 12} x2="262" y2={y + 12} stroke={C.faint} strokeWidth="1" />
              <polygon points={`262,${y + 12} 254,${y + 8} 254,${y + 16}`} fill={C.faint} />
              <rect x="264" y={y} width="276" height="24" rx="5" fill={`${r.c}14`} stroke={r.c} strokeWidth="1.2" />
              <text x="276" y={y + 16} fontFamily={mono} fontSize="9" fontWeight="700" fill={r.c}>{r.a}</text>
            </g>
          );
        })}
        <text x="280" y="194" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>LLMs at scale → TensorRT-LLM / vLLM (Module 7)</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   5.4 — Precision
   ════════════════════════════════════════════════════════════ */

/* Precision hierarchy ladder. */
export function PrecisionHierarchy({ caption }: { caption?: string }) {
  const levels = [
    { t: "FP32", s: "reference · 1×", c: C.off, w: 280 },
    { t: "FP16 / BF16", s: "2× smaller · ~lossless", c: C.blue, w: 240 },
    { t: "INT8", s: "4× · 0.1–1% loss", c: AMBER, w: 200 },
    { t: "INT4 / FP8", s: "8× · significant loss", c: C.hole, w: 160 },
    { t: "INT2 / binary", s: "16× · research", c: C.off, w: 120 },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="Precision hierarchy">
        {levels.map((lv, i) => {
          const y = 24 + i * 38;
          const x = 260 - lv.w / 2;
          return (
            <g key={lv.t}>
              <rect x={x} y={y} width={lv.w} height="28" rx="5" fill={`${lv.c}1a`} stroke={lv.c} strokeWidth="1.3" />
              <text x="260" y={y + 14} textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={lv.c}>{lv.t}</text>
              <text x="260" y={y + 24} textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>{lv.s}</text>
            </g>
          );
        })}
        <text x="40" y="120" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.muted} transform="rotate(-90 40 120)">smaller · faster · less accurate →</text>
        <text x="260" y="214" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>throughput (bandwidth-bound): FP16 2× · INT8 4× · INT4 8× vs FP32</text>
      </svg>
    </DiagramFrame>
  );
}

/* FP16 vs BF16 vs FP32 bit layouts. */
export function FloatBitLayouts({ caption }: { caption?: string }) {
  const fmts = [
    { t: "FP32", sign: 1, exp: 8, man: 23, note: "reference" },
    { t: "FP16", sign: 1, exp: 5, man: 10, note: "narrow range → can overflow" },
    { t: "BF16", sign: 1, exp: 8, man: 7, note: "FP32 range → no overflow" },
  ];
  const unit = 13;
  return (
    <DiagramFrame caption={caption} maxWidth={580}>
      <svg viewBox="0 0 580 200" width="100%" role="img" aria-label="FP32, FP16, BF16 bit layouts">
        <g fontFamily={mono} fontSize="8">
          <rect x="70" y="22" width="12" height="12" fill={`${C.hole}44`} /><text x="88" y="32" fill={C.muted}>sign</text>
          <rect x="140" y="22" width="12" height="12" fill={`${AMBER}44`} /><text x="158" y="32" fill={C.muted}>exponent (range)</text>
          <rect x="290" y="22" width="12" height="12" fill={`${C.blue}44`} /><text x="308" y="32" fill={C.muted}>mantissa (precision)</text>
        </g>
        {fmts.map((f, fi) => {
          const y = 50 + fi * 46;
          const total = f.sign + f.exp + f.man;
          const w = total * unit;
          const x0 = 290 - w / 2;
          return (
            <g key={f.t}>
              <text x={x0 - 12} y={y + 16} textAnchor="end" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.text}>{f.t}</text>
              <rect x={x0} y={y} width={f.sign * unit} height="22" fill={`${C.hole}44`} stroke={C.line} strokeWidth="0.5" />
              <rect x={x0 + f.sign * unit} y={y} width={f.exp * unit} height="22" fill={`${AMBER}44`} stroke={C.line} strokeWidth="0.5" />
              <rect x={x0 + (f.sign + f.exp) * unit} y={y} width={f.man * unit} height="22" fill={`${C.blue}44`} stroke={C.line} strokeWidth="0.5" />
              <text x={x0 + w + 10} y={y + 15} fontFamily={mono} fontSize="7.5" fill={C.muted}>{f.note}</text>
            </g>
          );
        })}
        <text x="290" y="192" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>BF16 keeps FP32's 8 exponent bits — same range, so it can't silently overflow to NaN</text>
      </svg>
    </DiagramFrame>
  );
}

/* INT8 quantization mapping: float range → int levels. */
export function QuantizationMapping({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 190" width="100%" role="img" aria-label="INT8 quantization mapping">
        {/* float line */}
        <text x="40" y="44" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.blue}>float [x_min, x_max]</text>
        <line x1="40" y1="60" x2="520" y2="60" stroke={C.blue} strokeWidth="2" />
        {[0, 1, 2, 3, 4].map((i) => <line key={`t${i}`} x1={40 + i * 120} y1="54" x2={40 + i * 120} y2="66" stroke={C.blue} strokeWidth="1.3" />)}
        {/* mapping arrows */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`a${i}`} x1={40 + i * 120} y1="66" x2={40 + i * 120} y2="104" stroke={C.line} strokeWidth="0.8" strokeDasharray="3 2" />
        ))}
        <text x="280" y="90" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={AMBER}>q = round(x / scale) + zero_point</text>
        {/* int line */}
        <line x1="40" y1="110" x2="520" y2="110" stroke={AMBER} strokeWidth="2" />
        {[0, 1, 2, 3, 4].map((i) => <line key={`b${i}`} x1={40 + i * 120} y1="104" x2={40 + i * 120} y2="116" stroke={AMBER} strokeWidth="1.3" />)}
        <text x="40" y="134" fontFamily={mono} fontSize="9" fontWeight="700" fill={AMBER}>int8 [−128, 127] · 256 levels</text>
        <text x="280" y="166" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>per-tensor: one scale for the whole matrix · per-channel: one per output channel (far less error)</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   5.5 — Data Pipelines
   ════════════════════════════════════════════════════════════ */

/* The ten-stage inference data pipeline. */
export function InferencePipeline({ caption }: { caption?: string }) {
  const stages = [
    "parse", "validate", "preprocess", "batch", "H2D", "GPU", "D2H", "postproc", "serialise", "network",
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={580}>
      <svg viewBox="0 0 580 170" width="100%" role="img" aria-label="Ten-stage inference data pipeline">
        {stages.map((s, i) => {
          const col = i % 5, row = Math.floor(i / 5);
          const x = 20 + col * 110, y = 44 + row * 56;
          const hot = s === "GPU", warm = s === "preprocess";
          const c = hot ? C.on : warm ? C.hole : AMBER;
          return (
            <g key={s}>
              <rect x={x} y={y} width="92" height="34" rx="6" fill={`${c}${hot || warm ? "26" : "12"}`} stroke={c} strokeWidth={hot || warm ? 1.5 : 1} />
              <text x={x + 46} y={y + 16} textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={c}>{i + 1}. {s}</text>
              {(hot || warm) && <text x={x + 46} y={y + 28} textAnchor="middle" fontFamily={mono} fontSize="6.5" fill={C.muted}>{hot ? "the model" : "often the bottleneck"}</text>}
              {col < 4 && <line x1={x + 92} y1={y + 17} x2={x + 110} y2={y + 17} stroke={C.faint} strokeWidth="1" />}
            </g>
          );
        })}
        <text x="290" y="30" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>the GPU forward pass is one stage of ten</text>
        <text x="290" y="160" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>profile every stage before optimising any — the bottleneck is rarely where intuition says</text>
      </svg>
    </DiagramFrame>
  );
}

/* Padding waste vs bucketing. */
export function PaddingBucketing({ caption }: { caption?: string }) {
  const lens = [50, 200, 300, 500];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 210" width="100%" role="img" aria-label="Padding versus bucketing">
        <text x="140" y="28" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.hole}>naive padding → 45% waste</text>
        {lens.map((l, i) => {
          const y = 40 + i * 26;
          return (
            <g key={`n${i}`}>
              <rect x="30" y={y} width={l * 0.44} height="18" rx="2" fill={`${C.blue}33`} stroke={C.blue} strokeWidth="0.8" />
              <rect x={30 + l * 0.44} y={y} width={(500 - l) * 0.44} height="18" rx="2" fill={`${C.hole}1a`} stroke={C.hole} strokeWidth="0.6" strokeDasharray="2 2" />
            </g>
          );
        })}
        <text x="250" y="120" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>pad all to 500</text>

        <text x="420" y="28" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.on}>bucketing → 19% waste</text>
        {[[50, 100], [200, 100], [300, 300], [500, 500]].map(([l, b], i) => {
          const y = 40 + i * 26;
          return (
            <g key={`k${i}`}>
              <rect x="330" y={y} width={(l as number) * 0.34} height="18" rx="2" fill={`${C.blue}33`} stroke={C.blue} strokeWidth="0.8" />
              <rect x={330 + (l as number) * 0.34} y={y} width={((b as number) - (l as number)) * 0.34} height="18" rx="2" fill={`${C.on}1a`} stroke={C.on} strokeWidth="0.6" strokeDasharray="2 2" />
            </g>
          );
        })}
        <text x="280" y="186" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>sort by length, batch similar lengths → 57% less wasted compute (real forward passes over nothing)</text>
        <text x="280" y="202" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>for LLMs, continuous batching (Module 7) solves the shape problem differently</text>
      </svg>
    </DiagramFrame>
  );
}

/* Three caching layers. */
export function CachingLayers({ caption }: { caption?: string }) {
  const layers = [
    { t: "exact cache", s: "hash(prompt) → stored response", h: "5–30% hit rate", c: C.on },
    { t: "semantic cache", s: "embed → cosine sim ≥ 0.95 → hit", h: "catches paraphrases", c: C.violet },
    { t: "prefix / KV cache", s: "precompute shared system-prompt KV", h: "slashes TTFT", c: AMBER },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 180" width="100%" role="img" aria-label="Exact, semantic, and prefix caches">
        {layers.map((l, i) => {
          const y = 26 + i * 46;
          return (
            <g key={l.t}>
              <rect x="30" y={y} width="320" height="36" rx="7" fill={`${l.c}12`} stroke={l.c} strokeWidth="1.3" />
              <text x="44" y={y + 16} fontFamily={mono} fontSize="9.5" fontWeight="700" fill={l.c}>{l.t}</text>
              <text x="44" y={y + 29} fontFamily={mono} fontSize="7.5" fill={C.muted}>{l.s}</text>
              <text x="370" y={y + 22} fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.text}>{l.h}</text>
            </g>
          );
        })}
        <text x="270" y="172" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>the fastest inference is no inference — a 20% hit rate at 100 RPS frees a whole A100</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   5.6 — Cost Engineering
   ════════════════════════════════════════════════════════════ */

/* Hardware cost per 1K tokens bars. */
export function HardwareCostBars({ caption }: { caption?: string }) {
  const bars = [
    { t: "RTX 4090 (on-prem)", v: 0.0008, c: C.on },
    { t: "A100 (spot/on-prem)", v: 0.0028, c: C.blue },
    { t: "A100 (cloud)", v: 0.0086, c: AMBER },
    { t: "serverless A100", v: 0.0097, c: C.violet },
    { t: "Raspberry Pi 3B", v: 0.14, c: C.hole },
  ];
  const maxLog = Math.log10(0.14), minLog = Math.log10(0.0008);
  const scale = (v: number) => 30 + ((Math.log10(v) - minLog) / (maxLog - minLog)) * 380;
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 200" width="100%" role="img" aria-label="Hardware cost per 1K tokens">
        <text x="280" y="22" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>cost per 1K tokens (8B model, log scale)</text>
        {bars.map((b, i) => {
          const y = 36 + i * 30;
          return (
            <g key={b.t}>
              <text x="150" y={y + 14} textAnchor="end" fontFamily={mono} fontSize="8.5" fill={C.text}>{b.t}</text>
              <rect x="158" y={y} width={scale(b.v)} height="18" rx="3" fill={`${b.c}33`} stroke={b.c} strokeWidth="1" />
              <text x={158 + scale(b.v) + 8} y={y + 14} fontFamily={mono} fontSize="8.5" fontWeight="700" fill={b.c}>${b.v.toFixed(4)}</text>
            </g>
          );
        })}
        <text x="280" y="194" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>a Pi is ~17× pricier/token than a 4090 — edge wins on privacy/offline/no-cold-start, not throughput</text>
      </svg>
    </DiagramFrame>
  );
}

/* Cascade router. */
export function CascadeRouter({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 180" width="100%" role="img" aria-label="Cascade model router">
        <rect x="24" y="74" width="62" height="32" rx="5" fill={`${C.blue}14`} stroke={C.blue} strokeWidth="1.1" />
        <text x="55" y="94" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.blue}>request</text>
        <line x1="86" y1="90" x2="120" y2="90" stroke={C.faint} strokeWidth="1.2" />
        {/* small model */}
        <rect x="120" y="68" width="100" height="44" rx="7" fill={`${C.on}14`} stroke={C.on} strokeWidth="1.4" />
        <text x="170" y="88" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.on}>small model</text>
        <text x="170" y="102" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>cheap · tried first</text>
        {/* decision */}
        <line x1="220" y1="90" x2="252" y2="90" stroke={C.faint} strokeWidth="1.2" />
        <polygon points="290,66 318,90 290,114 262,90" fill={`${AMBER}14`} stroke={AMBER} strokeWidth="1.3" />
        <text x="290" y="86" textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={AMBER}>conf ≥</text>
        <text x="290" y="97" textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={AMBER}>thresh?</text>
        {/* yes → return */}
        <line x1="290" y1="114" x2="290" y2="146" stroke={C.on} strokeWidth="1.2" />
        <text x="298" y="134" fontFamily={mono} fontSize="8" fill={C.on}>yes → return (most queries)</text>
        {/* no → large */}
        <line x1="318" y1="90" x2="402" y2="90" stroke={C.hole} strokeWidth="1.2" />
        <text x="360" y="82" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.hole}>no</text>
        <rect x="402" y="68" width="100" height="44" rx="7" fill={`${C.hole}14`} stroke={C.hole} strokeWidth="1.4" />
        <text x="452" y="88" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.hole}>large model</text>
        <text x="452" y="102" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>escalate hard ones</text>
        <text x="280" y="170" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>small-model throughput at near-large-model quality — the confidence threshold is the knob</text>
      </svg>
    </DiagramFrame>
  );
}

/* Budget optimisation ladder. */
export function BudgetLadder({ caption }: { caption?: string }) {
  const steps = [
    { t: "FP32 baseline", q: "100%", cost: "100%", c: C.off },
    { t: "INT8", q: "99.2%", cost: "50%", c: C.blue },
    { t: "INT4 AWQ", q: "97.5%", cost: "25%", c: AMBER },
    { t: "3B model", q: "92%", cost: "8%", c: C.on },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 200" width="100%" role="img" aria-label="Budget optimisation ladder">
        <text x="270" y="22" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>each rung: measured quality-for-cost trade</text>
        {steps.map((s, i) => {
          const y = 34 + i * 38;
          return (
            <g key={s.t}>
              <rect x="40" y={y} width="240" height="28" rx="5" fill={`${s.c}1a`} stroke={s.c} strokeWidth="1.3" />
              <text x="54" y={y + 18} fontFamily={mono} fontSize="9.5" fontWeight="700" fill={s.c}>{s.t}</text>
              <text x="320" y={y + 18} fontFamily={mono} fontSize="9" fill={C.text}>quality {s.q}</text>
              <text x="440" y={y + 18} fontFamily={mono} fontSize="9" fontWeight="700" fill={C.on}>cost {s.cost}</text>
            </g>
          );
        })}
        <text x="270" y="194" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>then route: 60% easy → 3B, 40% hard → 8B = 95.2% quality at ~8× throughput</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   5.7 — Inference Server Architecture
   ════════════════════════════════════════════════════════════ */

/* Production inference server stack. */
export function InferenceServerStack({ caption }: { caption?: string }) {
  const layers = [
    { t: "Load balancer", s: "round-robin / least-conn", c: C.off },
    { t: "Async servers", s: "validate · auth · non-blocking I/O", c: C.blue },
    { t: "Dynamic batcher", s: "batch_size or timeout · sort by length", c: AMBER },
    { t: "GPU worker", s: "ORT / TensorRT / vLLM backend", c: C.on },
    { t: "Postprocess + serialise", s: "argmax / decode → JSON", c: C.violet },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 250" width="100%" role="img" aria-label="Production inference server stack">
        <text x="200" y="20" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>clients ↓</text>
        {layers.map((l, i) => {
          const y = 28 + i * 40;
          return (
            <g key={l.t}>
              <rect x="40" y={y} width="320" height="32" rx="6" fill={`${l.c}14`} stroke={l.c} strokeWidth="1.3" />
              <text x="54" y={y + 14} fontFamily={mono} fontSize="9.5" fontWeight="700" fill={l.c}>{l.t}</text>
              <text x="54" y={y + 26} fontFamily={mono} fontSize="7.5" fill={C.muted}>{l.s}</text>
              {i < layers.length - 1 && <line x1="200" y1={y + 32} x2="200" y2={y + 40} stroke={C.faint} strokeWidth="1.2" />}
            </g>
          );
        })}
        {/* monitoring sidebar */}
        <rect x="384" y="28" width="100" height="192" rx="7" fill={`${C.hole}0c`} stroke={C.hole} strokeWidth="1" strokeDasharray="4 3" />
        <text x="434" y="50" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.hole}>monitoring</text>
        <text x="434" y="74" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>Prometheus</text>
        <text x="434" y="88" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>latency hist</text>
        <text x="434" y="102" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>GPU util</text>
        <text x="434" y="116" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>traces</text>
        <text x="434" y="200" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.faint}>off critical path</text>
        <text x="200" y="240" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>each layer is a lever from earlier in the module</text>
      </svg>
    </DiagramFrame>
  );
}

/* NVIDIA Triton model repository + features. */
export function TritonServer({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 200" width="100%" role="img" aria-label="NVIDIA Triton inference server">
        {/* repository */}
        <rect x="24" y="34" width="200" height="140" rx="8" fill={C.panel} stroke={C.line} strokeWidth="1" />
        <text x="124" y="52" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.text}>model repository</text>
        <rect x="40" y="62" width="168" height="44" rx="5" fill={`${AMBER}10`} stroke={AMBER} strokeWidth="1" />
        <text x="52" y="78" fontFamily={mono} fontSize="8" fill={AMBER}>resnet50/</text>
        <text x="64" y="91" fontFamily={mono} fontSize="7.5" fill={C.muted}>config.pbtxt</text>
        <text x="64" y="102" fontFamily={mono} fontSize="7.5" fill={C.muted}>1/ model.onnx</text>
        <rect x="40" y="114" width="168" height="44" rx="5" fill={`${C.violet}10`} stroke={C.violet} strokeWidth="1" />
        <text x="52" y="130" fontFamily={mono} fontSize="8" fill={C.violet}>llama3/</text>
        <text x="64" y="143" fontFamily={mono} fontSize="7.5" fill={C.muted}>config.pbtxt</text>
        <text x="64" y="154" fontFamily={mono} fontSize="7.5" fill={C.muted}>1/ model.engine</text>
        <line x1="224" y1="104" x2="262" y2="104" stroke={C.faint} strokeWidth="1.2" />
        <polygon points="262,104 254,100 254,108" fill={C.faint} />
        {/* triton */}
        <rect x="264" y="44" width="272" height="120" rx="8" fill={`${C.on}0c`} stroke={C.on} strokeWidth="1.4" />
        <text x="400" y="64" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.on}>Triton Inference Server</text>
        {["multi-backend (TRT/ONNX/PT/Python)", "built-in dynamic batching", "concurrent instances per GPU", "model ensembles (DAG)", "HTTP + gRPC · Prometheus metrics"].map((f, i) => (
          <text key={i} x="280" y={84 + i * 16} fontFamily={mono} fontSize="8" fill={C.text}>• {f}</text>
        ))}
        <text x="280" y="190" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>declarative config.pbtxt: max_queue_delay (= max_wait_ms) + instance_group count</text>
      </svg>
    </DiagramFrame>
  );
}
