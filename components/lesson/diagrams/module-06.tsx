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