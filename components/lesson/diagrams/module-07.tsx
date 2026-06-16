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

/* ════════════════════════════════════════════════════════════
   7.2 — vLLM
   ════════════════════════════════════════════════════════════ */

/* KV cache fragmentation: reserved-but-empty contiguous blocks. */
export function KVFragmentation({ caption }: { caption?: string }) {
  // each request reserves a max-length slot; only part is used
  const reqs = [
    { used: 5, c: SKY }, { used: 10, c: C.violet }, { used: 3, c: C.gate },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 200" width="100%" role="img" aria-label="KV cache fragmentation from contiguous allocation">
        <text x="270" y="24" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.hole}>contiguous allocation — reserve max length per request</text>
        {reqs.map((r, i) => {
          const y = 40 + i * 42;
          return (
            <g key={`frag${i}`}>
              <text x="20" y={y + 18} fontFamily={mono} fontSize="8" fill={C.muted}>req {String.fromCharCode(65 + i)}</text>
              {Array.from({ length: 16 }, (_, k) => (
                <rect key={`f-${i}-${k}`} x={70 + k * 28} y={y} width="26" height="26" rx="2"
                  fill={k < r.used ? `${r.c}33` : C.panel} stroke={k < r.used ? r.c : C.line} strokeWidth="0.8"
                  strokeDasharray={k < r.used ? "0" : "2 2"} opacity={k < r.used ? 1 : 0.5} />
              ))}
            </g>
          );
        })}
        <text x="270" y="184" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.hole}>dashed = reserved but EMPTY → 60–80% of KV memory wasted (internal fragmentation)</text>
      </svg>
    </DiagramFrame>
  );
}

/* PagedAttention: logical positions map to scattered physical blocks. */
export function PagedAttentionBlocks({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 210" width="100%" role="img" aria-label="PagedAttention block mapping like OS virtual memory">
        {/* logical */}
        <text x="80" y="24" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={SKY}>logical (request view)</text>
        {[0, 1, 2].map((i) => (
          <g key={`lo${i}`}>
            <rect x="30" y={40 + i * 34} width="100" height="26" rx="3" fill={`${SKY}1a`} stroke={SKY} strokeWidth="1" />
            <text x="80" y={57 + i * 34} textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={SKY}>tokens [{i * 16}–{i * 16 + 15}]</text>
          </g>
        ))}
        {/* block table */}
        <text x="280" y="24" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.gate}>block table</text>
        <rect x="210" y="40" width="140" height="94" rx="6" fill={`${C.gate}10`} stroke={C.gate} strokeWidth="1.2" />
        {[["0", "7"], ["1", "2"], ["2", "11"]].map(([l, p], i) => (
          <text key={`bt${i}`} x="280" y={60 + i * 26} textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.text}>logical {l} → block {p}</text>
        ))}
        {/* physical */}
        <text x="470" y="24" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.on}>physical VRAM blocks</text>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((b) => {
          const used = b === 7 || b === 2 || b === 11;
          const col = b === 7 ? 0 : b === 2 ? 1 : b === 11 ? 2 : -1;
          return (
            <g key={`ph${b}`}>
              <rect x={400 + (b % 4) * 38} y={40 + Math.floor(b / 4) * 30} width="34" height="26" rx="3"
                fill={used ? `${SKY}33` : C.panel} stroke={used ? SKY : C.line} strokeWidth="0.9" />
              <text x={417 + (b % 4) * 38} y={57 + Math.floor(b / 4) * 30} textAnchor="middle" fontFamily={mono} fontSize="7" fill={used ? SKY : C.faint}>{used ? col : b}</text>
            </g>
          );
        })}
        {/* arrows */}
        <line x1="130" y1="53" x2="210" y2="60" stroke={C.faint} strokeWidth="1" />
        <line x1="350" y1="70" x2="400" y2="70" stroke={C.faint} strokeWidth="1" />
        <text x="280" y="170" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>exactly OS virtual memory: contiguous logical pages → scattered physical pages via a page table</text>
        <text x="280" y="188" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.on}>blocks allocated on demand → &lt;5% waste (only the last partial block)</text>
      </svg>
    </DiagramFrame>
  );
}

/* Static vs continuous batching timeline. */
export function ContinuousBatching({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 220" width="100%" role="img" aria-label="Static versus continuous batching">
        {/* static */}
        <text x="20" y="26" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.hole}>static batching — wait for the whole batch</text>
        {[
          { r: "A", w: 60 }, { r: "B", w: 200 }, { r: "C", w: 200 }, { r: "D", w: 140 },
        ].map((s, i) => (
          <g key={`st${i}`}>
            <text x="24" y={50 + i * 20} fontFamily={mono} fontSize="8" fill={C.muted}>{s.r}</text>
            <rect x="44" y={40 + i * 20} width={s.w} height="14" rx="2" fill={`${SKY}33`} stroke={SKY} strokeWidth="0.8" />
            {s.w < 200 && <rect x={44 + s.w} y={40 + i * 20} width={200 - s.w} height="14" rx="2" fill={C.panel} stroke={C.line} strokeWidth="0.8" strokeDasharray="2 2" />}
          </g>
        ))}
        <text x="150" y="138" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>A done early but its slot sits idle (dashed) — new requests WAIT</text>
        {/* continuous */}
        <text x="300" y="26" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.on}>continuous batching — refill instantly</text>
        {[
          { r: "A", segs: [["A", 60, SKY], ["E", 140, C.on]] },
          { r: "B", segs: [["B", 200, SKY]] },
          { r: "C", segs: [["C", 200, SKY]] },
          { r: "D", segs: [["D", 140, SKY], ["F", 60, C.on]] },
        ].map((row, i) => {
          let x = 320;
          return (
            <g key={`co${i}`}>
              <text x="300" y={50 + i * 20} fontFamily={mono} fontSize="8" fill={C.muted}>{row.r}</text>
              {row.segs.map((seg, k) => {
                const rect = <rect key={`cs-${i}-${k}`} x={x} y={40 + i * 20} width={seg[1] as number} height="14" rx="2" fill={`${seg[2]}33`} stroke={seg[2] as string} strokeWidth="0.8" />;
                x += seg[1] as number;
                return rect;
              })}
            </g>
          );
        })}
        <text x="420" y="138" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>A finishes → E joins immediately; the batch is always full</text>
        <text x="280" y="170" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.faint}>PagedAttention + continuous batching → near-100% GPU use → up to ~16–24× naive throughput</text>
        <text x="280" y="194" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>green = a new request slotted into a freed sequence slot mid-flight (no waiting for the batch)</text>
      </svg>
    </DiagramFrame>
  );
}
