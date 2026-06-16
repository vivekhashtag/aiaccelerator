import { C, DiagramFrame, mono } from "./_shared";

/* ════════════════════════════════════════════════════════════
   Module 7 — Inference Frameworks & LLM Runtimes
   Accent: sky (C.sky). Figures mirror the per-module palette.
   ════════════════════════════════════════════════════════════ */

const SKY = C.sky;

/* ════════════════════════════════════════════════════════════
   7.1 — The LLM Serving Problem
   ════════════════════════════════════════════════════════════ */

/* Vision serving vs LLM serving asymmetry. */
export function VisionVsLLMServing({ caption }: { caption?: string }) {
  const rows = [
    { k: "input shape", v: "fixed 224²", l: "varies 5–5000 tok" },
    { k: "passes", v: "1 forward pass", l: "N passes (autoregressive)" },
    { k: "memory", v: "weights + 1 batch", l: "weights + KV cache (grows)" },
    { k: "batching", v: "trivial — same shape", l: "hard — different steps" },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 200" width="100%" role="img" aria-label="Vision serving versus LLM serving">
        <text x="200" y="26" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.on}>vision (ResNet)</text>
        <text x="430" y="26" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={SKY}>LLM (Llama-3-8B)</text>
        {rows.map((r, i) => {
          const y = 44 + i * 36;
          return (
            <g key={`row${i}`}>
              <text x="20" y={y + 15} fontFamily={mono} fontSize="8" fill={C.muted}>{r.k}</text>
              <rect x="110" y={y} width="180" height="26" rx="4" fill={`${C.on}12`} stroke={C.on} strokeWidth="1" />
              <text x="200" y={y + 16} textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.on}>{r.v}</text>
              <rect x="320" y={y} width="220" height="26" rx="4" fill={`${SKY}12`} stroke={SKY} strokeWidth="1" />
              <text x="430" y={y + 16} textAnchor="middle" fontFamily={mono} fontSize="8" fill={SKY}>{r.l}</text>
            </g>
          );
        })}
        <text x="280" y="194" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>variable length + a growing KV cache make LLM serving a much harder systems problem</text>
      </svg>
    </DiagramFrame>
  );
}

/* Prefill (compute-bound, parallel) vs decode (memory-bound, sequential). */
export function PrefillDecode({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 210" width="100%" role="img" aria-label="Prefill versus decode phases">
        {/* prefill */}
        <text x="140" y="26" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={SKY}>① prefill — whole prompt at once</text>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={`pf${i}`} x={44 + i * 32} y="44" width="26" height="26" rx="3" fill={`${SKY}33`} stroke={SKY} strokeWidth="1" />
        ))}
        <text x="140" y="92" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>all tokens in parallel → high arithmetic intensity</text>
        <text x="140" y="106" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={SKY}>COMPUTE-bound</text>
        {/* divider */}
        <line x1="290" y1="34" x2="290" y2="150" stroke={C.line} strokeWidth="1" strokeDasharray="4 3" />
        {/* decode */}
        <text x="430" y="26" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.gate}>② decode — one token at a time</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={`dc${i}`}>
            <rect x={330 + i * 50} y="44" width="26" height="26" rx="3" fill={i === 3 ? `${C.gate}40` : C.panel} stroke={i === 3 ? C.gate : C.line} strokeWidth="1" />
            {i < 3 && <text x={360 + i * 50} y="61" fontFamily={mono} fontSize="9" fill={C.faint}>→</text>}
          </g>
        ))}
        <text x="430" y="92" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>load all 16 GB of weights per single token</text>
        <text x="430" y="106" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.gate}>MEMORY-BANDWIDTH-bound</text>
        {/* ceiling */}
        <rect x="80" y="160" width="400" height="34" rx="6" fill={`${C.hole}10`} stroke={C.hole} strokeWidth="1.2" />
        <text x="280" y="181" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.hole}>decode ceiling = bandwidth ÷ model bytes = 2 TB/s ÷ 16 GB ≈ 125 tok/s — a physics limit</text>
      </svg>
    </DiagramFrame>
  );
}

/* KV cache: O(N²) recompute without vs O(N) append with. */
export function KVCacheGrowth({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 210" width="100%" role="img" aria-label="KV cache avoids quadratic recomputation">
        {/* without */}
        <text x="140" y="24" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.hole}>without cache — recompute all K,V</text>
        {[1, 2, 3, 4].map((n, r) => (
          <g key={`wo${r}`}>
            <text x="24" y={48 + r * 26} fontFamily={mono} fontSize="7.5" fill={C.muted}>t{n}</text>
            {Array.from({ length: n }, (_, k) => (
              <rect key={`wo-${r}-${k}`} x={44 + k * 26} y={38 + r * 26} width="22" height="18" rx="2"
                fill={k === n - 1 ? `${C.gate}40` : `${C.hole}26`} stroke={k === n - 1 ? C.gate : C.hole} strokeWidth="0.8" />
            ))}
          </g>
        ))}
        <text x="140" y="170" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>red = recomputed every step</text>
        <text x="140" y="184" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.hole}>O(N²) total compute</text>
        <line x1="290" y1="32" x2="290" y2="150" stroke={C.line} strokeWidth="1" strokeDasharray="4 3" />
        {/* with */}
        <text x="430" y="24" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.on}>with KV cache — append only</text>
        {[1, 2, 3, 4].map((n, r) => (
          <g key={`wi${r}`}>
            <text x="314" y={48 + r * 26} fontFamily={mono} fontSize="7.5" fill={C.muted}>t{n}</text>
            {Array.from({ length: n }, (_, k) => (
              <rect key={`wi-${r}-${k}`} x={334 + k * 26} y={38 + r * 26} width="22" height="18" rx="2"
                fill={k === n - 1 ? `${C.on}40` : C.panel} stroke={k === n - 1 ? C.on : C.line} strokeWidth="0.8"
                strokeDasharray={k === n - 1 ? "0" : "2 2"} />
            ))}
          </g>
        ))}
        <text x="430" y="170" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>green = computed once; dashed = cached</text>
        <text x="430" y="184" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.on}>O(N) — trade VRAM for compute</text>
      </svg>
    </DiagramFrame>
  );
}
