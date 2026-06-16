import { C, DiagramFrame, mono } from "./_shared";

/* ════════════════════════════════════════════════════════════
   Module 6 — Model Optimization & Efficient Inference
   Accent: lime (C.lime). Figures mirror the per-module palette.
   ════════════════════════════════════════════════════════════ */

const LIME = C.lime;

/* ════════════════════════════════════════════════════════════
   6.1 — Quantization
   ════════════════════════════════════════════════════════════ */

/* INT8 vs INT4: how many levels cover the same range. */
export function QuantizationLevels({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 200" width="100%" role="img" aria-label="INT8 versus INT4 quantization resolution">
        {/* INT8 row: many ticks */}
        <text x="20" y="50" fontFamily={mono} fontSize="9" fontWeight="700" fill={LIME}>INT8</text>
        <line x1="70" y1="56" x2="470" y2="56" stroke={C.line} strokeWidth="1.2" />
        {Array.from({ length: 33 }, (_, i) => (
          <line key={`i8-${i}`} x1={70 + i * 12.5} y1="50" x2={70 + i * 12.5} y2="62" stroke={LIME} strokeWidth="1" />
        ))}
        <text x="270" y="80" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>256 levels · max error ≈ scale/2 ≈ 0.2% of range</text>
        {/* INT4 row: few ticks */}
        <text x="20" y="130" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.hole}>INT4</text>
        <line x1="70" y1="136" x2="470" y2="136" stroke={C.line} strokeWidth="1.2" />
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`i4-${i}`} x1={70 + i * 50} y1="130" x2={70 + i * 50} y2="142" stroke={C.hole} strokeWidth="1.6" />
        ))}
        <text x="270" y="160" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>16 levels · max error ≈ 6.7% of range — 17× coarser</text>
        <text x="270" y="186" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.faint}>fewer bits = a coarser grid the weights must snap to — INT4 needs GPTQ/AWQ to stay usable</text>
      </svg>
    </DiagramFrame>
  );
}

/* Per-tensor vs per-channel vs per-group scales. */
export function QuantGranularity({ caption }: { caption?: string }) {
  const rows = [0, 1, 2, 3];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 210" width="100%" role="img" aria-label="Per-tensor, per-channel, per-group quantization">
        {[
          { ox: 20, t: "per-tensor", s: "1 scale", note: "coarse · 4× worse" },
          { ox: 210, t: "per-channel", s: "1 scale / row", note: "the INT8 default" },
          { ox: 400, t: "per-group", s: "1 scale / 32 wts", note: "INT4 essential" },
        ].map((panel, pi) => (
          <g key={`gran${pi}`}>
            <text x={panel.ox + 70} y="28" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={LIME}>{panel.t}</text>
            {rows.map((r) =>
              [0, 1, 2, 3].map((c) => {
                // colour bands show which cells share a scale
                let fill = `${C.blue}22`;
                if (pi === 1) fill = `${[C.blue, C.violet, C.on, C.gate][r]}26`;
                if (pi === 2) fill = `${[C.blue, C.violet, C.on, C.gate][(r * 4 + c) % 4]}26`;
                return (
                  <rect key={`g${pi}-${r}-${c}`} x={panel.ox + c * 28} y={40 + r * 28} width="26" height="26" rx="2"
                    fill={fill} stroke={C.line} strokeWidth="0.8" />
                );
              })
            )}
            <text x={panel.ox + 70} y="178" textAnchor="middle" fontFamily={mono} fontSize="7.8" fontWeight="700" fill={C.text}>{panel.s}</text>
            <text x={panel.ox + 70} y="192" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>{panel.note}</text>
          </g>
        ))}
        <text x="280" y="206" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.faint}>finer granularity → each region gets its own optimal scale → less wasted resolution</text>
      </svg>
    </DiagramFrame>
  );
}

/* PTQ vs QAT workflows. */
export function PTQvsQAT({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 220" width="100%" role="img" aria-label="Post-training quantization versus quantization-aware training">
        {/* PTQ */}
        <text x="20" y="32" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.on}>PTQ — quantize after training</text>
        {[
          { t: "FP32 model", c: C.blue }, { t: "calibrate", c: C.gate }, { t: "→ INT8", c: C.on },
        ].map((s, i) => (
          <g key={`ptq${i}`}>
            <rect x={20 + i * 150} y="44" width="120" height="34" rx="6" fill={`${s.c}14`} stroke={s.c} strokeWidth="1.3" />
            <text x={80 + i * 150} y="65" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={s.c}>{s.t}</text>
            {i < 2 && <g><line x1={140 + i * 150} y1="61" x2={170 + i * 150} y2="61" stroke={C.faint} strokeWidth="1.2" /><polygon points={`${170 + i * 150},61 ${163 + i * 150},57 ${163 + i * 150},65`} fill={C.faint} /></g>}
          </g>
        ))}
        <text x="490" y="65" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>seconds·</text>
        <text x="490" y="76" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>no training</text>
        {/* QAT */}
        <text x="20" y="120" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={LIME}>QAT — simulate quantization while training</text>
        {[
          { t: "FP32 model", c: C.blue }, { t: "+ fake-quant", c: C.gate }, { t: "fine-tune (STE)", c: C.violet }, { t: "→ INT8", c: C.on },
        ].map((s, i) => (
          <g key={`qat${i}`}>
            <rect x={20 + i * 132} y="132" width="106" height="34" rx="6" fill={`${s.c}14`} stroke={s.c} strokeWidth="1.3" />
            <text x={73 + i * 132} y="153" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={s.c}>{s.t}</text>
            {i < 3 && <g><line x1={126 + i * 132} y1="149" x2={152 + i * 132} y2="149" stroke={C.faint} strokeWidth="1.2" /><polygon points={`${152 + i * 132},149 ${145 + i * 132},145 ${145 + i * 132},153`} fill={C.faint} /></g>}
          </g>
        ))}
        {/* feedback loop arrow */}
        <path d="M126 166 q60 34 132 0" fill="none" stroke={C.violet} strokeWidth="1.1" strokeDasharray="3 2" />
        <text x="200" y="200" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.violet}>weights learn to dodge rounding error</text>
        <text x="450" y="194" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>best accuracy ·</text>
        <text x="450" y="205" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>needs training</text>
      </svg>
    </DiagramFrame>
  );
}

/* SmoothQuant: migrate outlier difficulty from activations to weights. */
export function SmoothQuantShift({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 210" width="100%" role="img" aria-label="SmoothQuant migrates outliers from activations to weights">
        {/* before */}
        <text x="140" y="26" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.hole}>before — activation outliers</text>
        <line x1="30" y1="120" x2="250" y2="120" stroke={C.line} strokeWidth="1" />
        {[14, 12, 16, 130, 13, 15, 11, 14].map((h, i) => (
          <rect key={`bX-${i}`} x={36 + i * 26} y={120 - h * 0.7} width="18" height={h * 0.7} rx="2" fill={i === 3 ? `${C.hole}55` : `${C.blue}33`} stroke={i === 3 ? C.hole : C.blue} strokeWidth="0.9" />
        ))}
        <text x="140" y="140" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>1 channel at 130 ruins the INT8 scale for all</text>
        {/* arrow */}
        <text x="285" y="95" textAnchor="middle" fontFamily={mono} fontSize="16" fill={LIME}>→</text>
        <text x="285" y="112" textAnchor="middle" fontFamily={mono} fontSize="7" fill={LIME}>÷ s</text>
        {/* after */}
        <text x="420" y="26" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.on}>after — smoothed</text>
        <line x1="310" y1="120" x2="530" y2="120" stroke={C.line} strokeWidth="1" />
        {[30, 28, 33, 44, 30, 32, 27, 31].map((h, i) => (
          <rect key={`aX-${i}`} x={316 + i * 26} y={120 - h * 0.7} width="18" height={h * 0.7} rx="2" fill={`${C.on}33`} stroke={C.on} strokeWidth="0.9" />
        ))}
        <text x="420" y="140" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>activations now uniform — easy to quantize</text>
        <text x="280" y="172" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.text}>Y = (X / s) @ (W · s) — mathematically identical, but the hard part moves to the weights</text>
        <text x="280" y="192" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>weights quantize offline once; activations quantize at runtime — so the shift is free at inference</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   6.2 — Pruning & Sparsity
   ════════════════════════════════════════════════════════════ */

/* Unstructured (scattered zeros) vs structured (whole units removed). */
export function UnstructuredVsStructured({ caption }: { caption?: string }) {
  const unstr = [
    [1, 0, 1, 0, 1], [0, 1, 0, 1, 0], [1, 0, 0, 0, 1], [0, 1, 1, 0, 1],
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 210" width="100%" role="img" aria-label="Unstructured versus structured pruning">
        <text x="130" y="26" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.hole}>unstructured — random zeros</text>
        {unstr.map((row, r) =>
          row.map((v, c) => (
            <rect key={`u-${r}-${c}`} x={56 + c * 30} y={40 + r * 30} width="28" height="28" rx="2"
              fill={v ? `${C.blue}33` : C.panel} stroke={v ? C.blue : C.line} strokeWidth="0.9" />
          ))
        )}
        <text x="130" y="180" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>same VRAM, same MAC cycles —</text>
        <text x="130" y="192" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>dense GPU kernels multiply the 0s too</text>
        <line x1="280" y1="30" x2="280" y2="170" stroke={C.line} strokeWidth="1" strokeDasharray="4 3" />
        <text x="420" y="26" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.on}>structured — whole channel out</text>
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3, 4].map((c) => {
            const removed = c === 1 || c === 3;
            return (
              <rect key={`s-${r}-${c}`} x={346 + c * 30} y={40 + r * 30} width="28" height="28" rx="2"
                fill={removed ? C.panel : `${C.on}33`} stroke={removed ? C.line : C.on} strokeWidth="0.9"
                strokeDasharray={removed ? "2 2" : "0"} opacity={removed ? 0.5 : 1} />
            );
          })
        )}
        <text x="420" y="180" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>smaller DENSE matrix —</text>
        <text x="420" y="192" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>real speedup on any hardware</text>
      </svg>
    </DiagramFrame>
  );
}

/* NVIDIA 2:4 structured sparsity. */
export function Sparsity24({ caption }: { caption?: string }) {
  const blocks = [
    [1, 0, 1, 0], [0, 1, 1, 0],
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 170" width="100%" role="img" aria-label="NVIDIA 2:4 structured sparsity">
        <text x="260" y="26" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={LIME}>2:4 — keep exactly 2 of every 4 weights</text>
        {blocks.map((blk, bi) =>
          blk.map((v, i) => (
            <g key={`b${bi}-${i}`}>
              <rect x={70 + bi * 200 + i * 44} y="50" width="38" height="38" rx="4"
                fill={v ? `${LIME}33` : C.panel} stroke={v ? LIME : C.line} strokeWidth="1.1"
                strokeDasharray={v ? "0" : "2 2"} />
              <text x={70 + bi * 200 + i * 44 + 19} y="73" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={v ? LIME : C.faint}>{v ? "w" : "0"}</text>
            </g>
          ))
        )}
        <text x="155" y="108" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>group of 4 → 2 kept + index</text>
        <text x="355" y="108" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>group of 4 → 2 kept + index</text>
        <text x="260" y="138" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.text}>2 MACs instead of 4 → 2× throughput at exactly 50% sparsity (Ampere+ sparse Tensor Cores)</text>
        <text x="260" y="158" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>the one sparsity pattern hardware actually accelerates — must be trained in, not added after</text>
      </svg>
    </DiagramFrame>
  );
}

/* Structured pruning units: channel, head, layer. */
export function StructuredPruningUnits({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 180" width="100%" role="img" aria-label="Structured pruning units: channels, heads, layers">
        <text x="90" y="26" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={LIME}>channels (CNN)</text>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={`ch${i}`} x={30 + i * 26} y="40" width="20" height="60" rx="3"
            fill={i === 1 || i === 4 ? C.panel : `${C.blue}33`} stroke={i === 1 || i === 4 ? C.line : C.blue} strokeWidth="1"
            strokeDasharray={i === 1 || i === 4 ? "2 2" : "0"} opacity={i === 1 || i === 4 ? 0.5 : 1} />
        ))}
        <text x="90" y="116" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>drop low-L1-norm filters</text>
        <text x="280" y="26" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={LIME}>attention heads</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={`hd${i}`}>
            <circle cx={228 + i * 35} cy="68" r="14"
              fill={i === 2 ? C.panel : `${C.violet}33`} stroke={i === 2 ? C.line : C.violet} strokeWidth="1"
              strokeDasharray={i === 2 ? "2 2" : "0"} opacity={i === 2 ? 0.5 : 1} />
            <text x={228 + i * 35} y="72" textAnchor="middle" fontFamily={mono} fontSize="7" fill={i === 2 ? C.faint : C.violet}>h{i + 1}</text>
          </g>
        ))}
        <text x="280" y="116" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>drop redundant heads</text>
        <text x="470" y="26" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={LIME}>layers</text>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={`ly${i}`} x="430" y={36 + i * 12} width="80" height="9" rx="2"
            fill={i % 2 === 1 ? C.panel : `${C.on}33`} stroke={i % 2 === 1 ? C.line : C.on} strokeWidth="0.9"
            strokeDasharray={i % 2 === 1 ? "2 2" : "0"} opacity={i % 2 === 1 ? 0.5 : 1} />
        ))}
        <text x="470" y="120" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>drop alternate layers</text>
        <text x="280" y="160" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>all three remove whole units → a smaller dense model that runs fast everywhere (DistilBERT drops layers)</text>
      </svg>
    </DiagramFrame>
  );
}

/* Gradual magnitude pruning schedule. */
export function GradualPruningSchedule({ caption }: { caption?: string }) {
  const pts = [[0, 0], [10, 20], [20, 40], [30, 60], [40, 70], [50, 70]];
  const px = (e: number) => 60 + e * 8.4;
  const py = (s: number) => 160 - s * 1.7;
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${px(p[0])} ${py(p[1])}`).join(" ");
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 200" width="100%" role="img" aria-label="Gradual magnitude pruning schedule">
        <line x1="60" y1="30" x2="60" y2="160" stroke={C.faint} strokeWidth="1.1" />
        <line x1="60" y1="160" x2="480" y2="160" stroke={C.faint} strokeWidth="1.1" />
        <text x="30" y="95" fontFamily={mono} fontSize="8" fill={C.muted} transform="rotate(-90 30 95)">sparsity %</text>
        <text x="270" y="184" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>training epoch →</text>
        <path d={path} fill="none" stroke={LIME} strokeWidth="2.4" />
        {pts.slice(0, 5).map((p, i) => (
          <g key={`gp${i}`}>
            <circle cx={px(p[0])} cy={py(p[1])} r="3.5" fill={LIME} />
            <text x={px(p[0])} y={py(p[1]) - 8} textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>{p[1]}%</text>
          </g>
        ))}
        <text x="300" y="70" fontFamily={mono} fontSize="7.5" fill={C.faint}>prune a little → retrain →</text>
        <text x="300" y="82" fontFamily={mono} fontSize="7.5" fill={C.faint}>model adapts → prune more</text>
        <text x="270" y="198" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.faint}>cubic schedule beats one-shot pruning — the model recovers between each step</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   6.3 — Knowledge Distillation
   ════════════════════════════════════════════════════════════ */

/* Hard one-hot labels vs soft teacher probabilities (dark knowledge). */
export function DarkKnowledge({ caption }: { caption?: string }) {
  const classes = ["cat", "wolf", "husky", "dog", "fox"];
  const hard = [0, 0, 0, 1, 0];
  const soft = [0.01, 0.02, 0.04, 0.89, 0.04];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 200" width="100%" role="img" aria-label="Hard labels versus soft teacher labels">
        {/* hard */}
        <text x="140" y="24" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.off}>hard label (one-hot)</text>
        <line x1="40" y1="140" x2="250" y2="140" stroke={C.line} strokeWidth="1" />
        {hard.map((v, i) => (
          <g key={`hk${i}`}>
            <rect x={50 + i * 40} y={140 - v * 100} width="26" height={v * 100} rx="2" fill={`${C.off}55`} stroke={C.off} strokeWidth="0.8" />
            <text x={63 + i * 40} y="152" textAnchor="middle" fontFamily={mono} fontSize="6.5" fill={C.muted}>{classes[i]}</text>
          </g>
        ))}
        <text x="140" y="176" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>only "it's a dog" — nothing else</text>
        <line x1="290" y1="24" x2="290" y2="168" stroke={C.line} strokeWidth="1" strokeDasharray="4 3" />
        {/* soft */}
        <text x="420" y="24" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={LIME}>soft labels (teacher, T&gt;1)</text>
        <line x1="320" y1="140" x2="530" y2="140" stroke={C.line} strokeWidth="1" />
        {soft.map((v, i) => (
          <g key={`sk${i}`}>
            <rect x={330 + i * 40} y={140 - v * 100} width="26" height={v * 100} rx="2"
              fill={i === 3 ? `${LIME}55` : `${C.violet}55`} stroke={i === 3 ? LIME : C.violet} strokeWidth="0.8" />
            <text x={343 + i * 40} y="152" textAnchor="middle" fontFamily={mono} fontSize="6.5" fill={C.muted}>{classes[i]}</text>
          </g>
        ))}
        <text x="420" y="176" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>"dog, a bit husky/fox" = dark knowledge</text>
      </svg>
    </DiagramFrame>
  );
}

/* Distillation loss: KL on soft targets + CE on hard labels. */
export function DistillationLoss({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 220" width="100%" role="img" aria-label="Knowledge distillation loss">
        {/* teacher */}
        <rect x="20" y="30" width="110" height="40" rx="6" fill={`${C.blue}16`} stroke={C.blue} strokeWidth="1.3" />
        <text x="75" y="48" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.blue}>teacher (large)</text>
        <text x="75" y="61" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>frozen</text>
        {/* student */}
        <rect x="20" y="150" width="110" height="40" rx="6" fill={`${LIME}16`} stroke={LIME} strokeWidth="1.4" />
        <text x="75" y="168" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={LIME}>student (small)</text>
        <text x="75" y="181" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>trained</text>
        {/* soft targets (teacher /T) */}
        <rect x="190" y="34" width="120" height="32" rx="5" fill={C.panel} stroke={C.line} strokeWidth="1" />
        <text x="250" y="54" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.text}>softmax(z/T)</text>
        <line x1="130" y1="50" x2="190" y2="50" stroke={C.faint} strokeWidth="1.1" /><polygon points="190,50 183,46 183,54" fill={C.faint} />
        {/* student soft + hard */}
        <rect x="190" y="120" width="120" height="28" rx="5" fill={C.panel} stroke={C.line} strokeWidth="1" />
        <text x="250" y="138" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.text}>softmax(z/T)</text>
        <rect x="190" y="158" width="120" height="28" rx="5" fill={C.panel} stroke={C.line} strokeWidth="1" />
        <text x="250" y="176" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.text}>softmax(z)</text>
        <line x1="130" y1="166" x2="190" y2="140" stroke={C.faint} strokeWidth="1" />
        <line x1="130" y1="172" x2="190" y2="172" stroke={C.faint} strokeWidth="1" />
        {/* KD loss */}
        <rect x="350" y="74" width="100" height="32" rx="5" fill={`${C.violet}16`} stroke={C.violet} strokeWidth="1.3" />
        <text x="400" y="94" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.violet}>KL · T²</text>
        <line x1="310" y1="50" x2="350" y2="84" stroke={C.violet} strokeWidth="1" />
        <line x1="310" y1="134" x2="350" y2="96" stroke={C.violet} strokeWidth="1" />
        {/* CE loss */}
        <rect x="350" y="156" width="100" height="30" rx="5" fill={`${C.gate}16`} stroke={C.gate} strokeWidth="1.3" />
        <text x="400" y="175" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.gate}>CE (labels)</text>
        <line x1="310" y1="172" x2="350" y2="172" stroke={C.gate} strokeWidth="1" />
        {/* combine */}
        <rect x="470" y="110" width="78" height="44" rx="6" fill={`${LIME}14`} stroke={LIME} strokeWidth="1.4" />
        <text x="509" y="128" textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={LIME}>α·KD +</text>
        <text x="509" y="142" textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={LIME}>(1−α)·CE</text>
        <line x1="450" y1="90" x2="470" y2="124" stroke={C.faint} strokeWidth="1" />
        <line x1="450" y1="171" x2="470" y2="140" stroke={C.faint} strokeWidth="1" />
        <text x="280" y="210" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>α≈0.9, T≈4 — the T² term rescales KD gradients back up so the soft signal isn't swamped</text>
      </svg>
    </DiagramFrame>
  );
}

/* Feature distillation: match intermediate maps via an adapter. */
export function FeatureDistillation({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 200" width="100%" role="img" aria-label="Feature distillation matches intermediate representations">
        {/* teacher row */}
        <text x="20" y="44" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.blue}>teacher</text>
        {[0, 1, 2].map((i) => (
          <g key={`tf${i}`}>
            <rect x={90 + i * 130} y="30" width="60" height="26" rx="4" fill={`${C.blue}1a`} stroke={C.blue} strokeWidth="1.1" />
            <text x={120 + i * 130} y="47" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.blue}>f{i + 1}</text>
            {i < 2 && <line x1={150 + i * 130} y1="43" x2={220 + i * 130} y2="43" stroke={C.faint} strokeWidth="1" />}
          </g>
        ))}
        {/* student row */}
        <text x="20" y="158" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={LIME}>student</text>
        {[0, 1, 2].map((i) => (
          <g key={`sf${i}`}>
            <rect x={90 + i * 130} y="144" width="60" height="24" rx="4" fill={`${LIME}1a`} stroke={LIME} strokeWidth="1.1" />
            <text x={120 + i * 130} y="160" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={LIME}>f{i + 1}'</text>
            {i < 2 && <line x1={150 + i * 130} y1="156" x2={220 + i * 130} y2="156" stroke={C.faint} strokeWidth="1" />}
          </g>
        ))}
        {/* adapters + MSE between f1/f2 */}
        {[0, 1].map((i) => (
          <g key={`ad${i}`}>
            <rect x={104 + i * 130} y="92" width="32" height="18" rx="3" fill={`${C.gate}16`} stroke={C.gate} strokeWidth="1" />
            <text x={120 + i * 130} y="104" textAnchor="middle" fontFamily={mono} fontSize="6.5" fontWeight="700" fill={C.gate}>1×1</text>
            <line x1={120 + i * 130} y1="144" x2={120 + i * 130} y2="110" stroke={C.gate} strokeWidth="1" />
            <line x1={120 + i * 130} y1="92" x2={120 + i * 130} y2="56" stroke={C.gate} strokeWidth="1" strokeDasharray="3 2" />
            <text x={120 + i * 130 + 24} y="84" fontFamily={mono} fontSize="7" fill={C.muted}>MSE</text>
          </g>
        ))}
        <text x="280" y="190" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>match the teacher's intermediate "hints", not just its output — a 1×1 conv adapter bridges width mismatch</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   6.4 — Graph Optimization & Operator Fusion
   ════════════════════════════════════════════════════════════ */

/* Operator fusion: Conv+BN+ReLU as 3 kernels vs 1. */
export function OperatorFusion({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 210" width="100%" role="img" aria-label="Operator fusion of Conv BatchNorm ReLU">
        {/* unfused */}
        <text x="20" y="32" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.hole}>unfused — 3 kernels, 3 VRAM roundtrips</text>
        {["Conv2d", "BatchNorm", "ReLU"].map((op, i) => (
          <g key={`uf${i}`}>
            <rect x={30 + i * 160} y="44" width="86" height="30" rx="5" fill={`${C.blue}16`} stroke={C.blue} strokeWidth="1.2" />
            <text x={73 + i * 160} y="63" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.blue}>{op}</text>
            {i < 2 && (
              <g>
                <line x1={116 + i * 160} y1="59" x2={190 + i * 160} y2="59" stroke={C.hole} strokeWidth="1.1" />
                <text x={153 + i * 160} y="54" textAnchor="middle" fontFamily={mono} fontSize="6.5" fill={C.hole}>VRAM</text>
                <polygon points={`${190 + i * 160},59 ${183 + i * 160},55 ${183 + i * 160},63`} fill={C.hole} />
              </g>
            )}
          </g>
        ))}
        <text x="280" y="92" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>each op: read from VRAM → compute → write to VRAM (memory-bound)</text>
        {/* fused */}
        <text x="20" y="140" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.on}>fused — 1 kernel, intermediates stay in registers</text>
        <rect x="160" y="152" width="240" height="34" rx="6" fill={`${LIME}16`} stroke={LIME} strokeWidth="1.5" />
        <text x="280" y="173" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={LIME}>FusedConvBnReLU</text>
        <text x="280" y="202" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.faint}>one launch, no intermediate VRAM traffic — BN + ReLU computed inline as conv outputs stream</text>
      </svg>
    </DiagramFrame>
  );
}

/* Flash Attention: tiling avoids materializing the N×N matrix in HBM. */
export function FlashAttention({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 220" width="100%" role="img" aria-label="Flash Attention tiling versus standard attention">
        {/* standard */}
        <text x="140" y="26" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.hole}>standard attention</text>
        <rect x="60" y="44" width="160" height="80" rx="6" fill={`${C.hole}10`} stroke={C.hole} strokeWidth="1.2" />
        <text x="140" y="72" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.hole}>S = QKᵀ (N×N)</text>
        <text x="140" y="88" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>written to HBM</text>
        <text x="140" y="102" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>softmax → HBM → @V</text>
        <text x="140" y="146" textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={C.hole}>O(N²) HBM · 768 MB traffic</text>
        {/* divider */}
        <line x1="280" y1="36" x2="280" y2="160" stroke={C.line} strokeWidth="1" strokeDasharray="4 3" />
        {/* flash */}
        <text x="420" y="26" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.on}>Flash Attention (tiled)</text>
        {[0, 1, 2].map((i) =>
          [0, 1, 2].map((j) => (
            <rect key={`ft-${i}-${j}`} x={350 + j * 30} y={44 + i * 22} width="26" height="18" rx="2"
              fill={i === j ? `${LIME}40` : `${C.on}14`} stroke={C.on} strokeWidth="0.8" />
          ))
        )}
        <text x="470" y="60" fontFamily={mono} fontSize="7" fill={C.muted}>tiles in</text>
        <text x="470" y="70" fontFamily={mono} fontSize="7" fill={C.muted}>SRAM</text>
        <text x="470" y="80" fontFamily={mono} fontSize="7" fill={C.muted}>(online</text>
        <text x="470" y="90" fontFamily={mono} fontSize="7" fill={C.muted}>softmax)</text>
        <text x="420" y="146" textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={C.on}>O(N) HBM · S never materialised</text>
        <text x="280" y="184" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>compute attention in SRAM-sized tiles, keep a running softmax — the N×N matrix never touches HBM</text>
        <text x="280" y="204" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.faint}>same FLOPs, far less memory traffic → 2–4× faster, the non-negotiable LLM optimization</text>
      </svg>
    </DiagramFrame>
  );
}

/* CUDA Graphs: collapse many kernel launches into one replay. */
export function CudaGraphs({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 180" width="100%" role="img" aria-label="CUDA Graphs eliminate kernel launch overhead">
        {/* without */}
        <text x="20" y="34" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.hole}>without — ~150 launches × ~10 µs CPU overhead</text>
        {Array.from({ length: 16 }, (_, i) => (
          <g key={`kl${i}`}>
            <rect x={30 + i * 30} y="46" width="16" height="22" rx="2" fill={`${C.blue}33`} stroke={C.blue} strokeWidth="0.8" />
            <rect x={46 + i * 30} y="52" width="10" height="10" rx="1" fill={`${C.hole}40`} stroke={C.hole} strokeWidth="0.6" />
          </g>
        ))}
        <text x="270" y="86" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>red = per-kernel CPU launch gap → ~30% of a small-batch forward pass</text>
        {/* with */}
        <text x="20" y="124" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.on}>with CUDA Graphs — record once, replay in one CPU call</text>
        <rect x="30" y="136" width="476" height="22" rx="4" fill={`${LIME}1a`} stroke={LIME} strokeWidth="1.3" />
        <text x="268" y="151" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={LIME}>graph.replay() — entire kernel sequence, ~10 µs total · fixed shapes only</text>
      </svg>
    </DiagramFrame>
  );
}

/* torch.compile pipeline. */
export function TorchCompileFlow({ caption }: { caption?: string }) {
  const stages = [
    { t: "Python model", s: "eager", c: C.off },
    { t: "TorchDynamo", s: "trace graph", c: C.blue },
    { t: "AOTAutograd", s: "fwd + bwd", c: C.violet },
    { t: "TorchInductor", s: "fuse + Triton", c: C.gate },
    { t: "compiled kernel", s: "1.5–2.5×", c: LIME },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 150" width="100%" role="img" aria-label="torch.compile pipeline">
        {stages.map((s, i) => {
          const x = 12 + i * 110;
          return (
            <g key={`tc${i}`}>
              <rect x={x} y="50" width="96" height="46" rx="7" fill={`${s.c}14`} stroke={s.c} strokeWidth="1.4" />
              <text x={x + 48} y="72" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={s.c}>{s.t}</text>
              <text x={x + 48} y="86" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>{s.s}</text>
              {i < 4 && <g><line x1={x + 96} y1="73" x2={x + 110} y2="73" stroke={C.faint} strokeWidth="1.2" /><polygon points={`${x + 110},73 ${x + 103},69 ${x + 103},77`} fill={C.faint} /></g>}
            </g>
          );
        })}
        <text x="280" y="30" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>torch.compile() — one decorator applies fusion + codegen automatically</text>
        <text x="280" y="122" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>max-autotune benchmarks several Triton kernels per op and keeps the fastest for your hardware</text>
      </svg>
    </DiagramFrame>
  );
}