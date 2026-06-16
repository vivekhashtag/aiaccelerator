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

/* ════════════════════════════════════════════════════════════
   7.3 — llama.cpp
   ════════════════════════════════════════════════════════════ */

/* GGUF quant ladder: size vs quality, Q4_K_M as the sweet spot. */
export function GgufQuantLadder({ caption }: { caption?: string }) {
  const types = [
    { t: "F16", gb: 13, q: 100, c: C.off },
    { t: "Q8_0", gb: 7.2, q: 99.9, c: C.blue },
    { t: "Q6_K", gb: 5.5, q: 99.6, c: C.violet },
    { t: "Q5_K_M", gb: 4.8, q: 99.4, c: C.on },
    { t: "Q4_K_M", gb: 4.4, q: 99.0, c: SKY },
    { t: "Q3_K_M", gb: 3.4, q: 98.2, c: C.gate },
    { t: "Q2_K", gb: 2.7, q: 97.5, c: C.hole },
  ];
  const bx = (i: number) => 50 + i * 68;
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 210" width="100%" role="img" aria-label="GGUF quantization types by size and quality">
        <line x1="40" y1="150" x2="520" y2="150" stroke={C.line} strokeWidth="1" />
        {types.map((t, i) => {
          const h = t.gb * 8.5;
          const sweet = t.t === "Q4_K_M";
          return (
            <g key={`gq${i}`}>
              <rect x={bx(i)} y={150 - h} width="42" height={h} rx="3" fill={`${t.c}${sweet ? "55" : "26"}`} stroke={t.c} strokeWidth={sweet ? 2 : 1} />
              <text x={bx(i) + 21} y={150 - h - 16} textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={t.c}>{t.gb}GB</text>
              <text x={bx(i) + 21} y={150 - h - 5} textAnchor="middle" fontFamily={mono} fontSize="6.8" fill={C.muted}>{t.q}%</text>
              <text x={bx(i) + 21} y="164" textAnchor="middle" fontFamily={mono} fontSize="7" fontWeight={sweet ? "700" : "400"} fill={sweet ? SKY : C.muted}>{t.t}</text>
            </g>
          );
        })}
        <text x="155" y="186" textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={SKY}>↑ Q4_K_M: ~99% quality at ~28% of FP16 size</text>
        <text x="400" y="186" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.faint}>Llama-3-8B (7B-class) sizes shown</text>
        <text x="280" y="202" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>Q{"{bits}"}_K_{"{S/M/L}"} — k-quants store a scale per 32-weight block; M is the quality/size sweet spot</text>
      </svg>
    </DiagramFrame>
  );
}

/* Q4_K_M block memory layout. */
export function GgufBlock({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 160" width="100%" role="img" aria-label="Q4_K_M block memory layout">
        <text x="270" y="26" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={SKY}>Q4_K_M block — 32 weights in 20 bytes</text>
        <rect x="40" y="44" width="70" height="40" rx="4" fill={`${C.gate}26`} stroke={C.gate} strokeWidth="1.2" />
        <text x="75" y="62" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.gate}>scale</text>
        <text x="75" y="76" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>FP16 · 2B</text>
        <rect x="116" y="44" width="70" height="40" rx="4" fill={`${C.violet}26`} stroke={C.violet} strokeWidth="1.2" />
        <text x="151" y="62" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.violet}>delta</text>
        <text x="151" y="76" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>FP16 · 2B</text>
        <rect x="192" y="44" width="308" height="40" rx="4" fill={`${SKY}26`} stroke={SKY} strokeWidth="1.2" />
        <text x="346" y="62" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={SKY}>32 × 4-bit quantized weights</text>
        <text x="346" y="76" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>16 bytes</text>
        <text x="270" y="108" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.text}>(4 + 0.5 + 0.5) ≈ 4.5 effective bits per weight</text>
        <text x="270" y="132" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>dequantized inline during the dot product (fused) — no separate dequant pass, so CPU stays fast</text>
      </svg>
    </DiagramFrame>
  );
}

/* Split offloading: layers across GPU + CPU. */
export function SplitOffload({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 180" width="100%" role="img" aria-label="llama.cpp split offloading across GPU and CPU">
        <rect x="40" y="40" width="200" height="70" rx="8" fill={`${C.on}10`} stroke={C.on} strokeWidth="1.3" />
        <text x="140" y="34" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.on}>GPU (6 GB)</text>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={`gl${i}`} x={54 + i * 37} y="56" width="30" height="38" rx="3" fill={`${C.on}33`} stroke={C.on} strokeWidth="0.9" />
        ))}
        <text x="140" y="104" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>early layers (--n-gpu-layers 20)</text>
        <rect x="280" y="40" width="200" height="70" rx="8" fill={`${C.gate}10`} stroke={C.gate} strokeWidth="1.3" />
        <text x="380" y="34" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.gate}>CPU (RAM)</text>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={`cl${i}`} x={294 + i * 37} y="56" width="30" height="38" rx="3" fill={`${C.gate}33`} stroke={C.gate} strokeWidth="0.9" />
        ))}
        <text x="380" y="104" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>remaining layers</text>
        <line x1="240" y1="75" x2="280" y2="75" stroke={C.faint} strokeWidth="1.2" />
        <polygon points="280,75 273,71 273,79" fill={C.faint} />
        <text x="260" y="68" textAnchor="middle" fontFamily={mono} fontSize="6.5" fill={C.faint}>activations</text>
        <text x="260" y="130" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>only small activations cross the PCIe bus, not the big weights — so the split is cheap</text>
        <text x="260" y="150" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.faint}>run models bigger than your VRAM by spilling layers to CPU</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   7.4 — Ollama
   ════════════════════════════════════════════════════════════ */

/* Ollama as a convenience layer over llama.cpp. */
export function OllamaStack({ caption }: { caption?: string }) {
  const layers = [
    { t: "CLI + REST API", s: "ollama run/pull · :11434 · OpenAI-compatible", c: SKY },
    { t: "convenience layer", s: "model library · Modelfiles · auto GPU detect (CUDA/Metal/ROCm)", c: C.violet },
    { t: "llama.cpp / GGUF engine", s: "the actual inference (Lesson 7.3)", c: C.on },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 190" width="100%" role="img" aria-label="Ollama wraps llama.cpp">
        {layers.map((l, i) => {
          const y = 26 + i * 50;
          return (
            <g key={`ol${i}`}>
              <rect x="60" y={y} width="420" height="40" rx="7" fill={`${l.c}14`} stroke={l.c} strokeWidth="1.4" />
              <text x="270" y={y + 18} textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={l.c}>{l.t}</text>
              <text x="270" y={y + 32} textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>{l.s}</text>
              {i < 2 && <text x="270" y={y + 47} textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>↓</text>}
            </g>
          );
        })}
        <text x="270" y="184" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>Ollama is llama.cpp + a package-manager UX — same engine, zero-config experience</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   7.5 — Text Generation Inference (TGI)
   ════════════════════════════════════════════════════════════ */

/* TGI architecture: Rust router + Python model shards. */
export function TgiArchitecture({ caption }: { caption?: string }) {
  const feats = ["continuous batching", "Flash Attention 2", "tensor parallel", "SSE streaming", "JSON grammar", "GPTQ / AWQ"];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 210" width="100%" role="img" aria-label="TGI architecture">
        {/* client */}
        <rect x="20" y="80" width="74" height="34" rx="6" fill={C.panel} stroke={C.line} strokeWidth="1" />
        <text x="57" y="101" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.text}>client</text>
        {/* rust router */}
        <rect x="130" y="60" width="150" height="74" rx="8" fill={`${C.gate}14`} stroke={C.gate} strokeWidth="1.5" />
        <text x="205" y="84" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.gate}>router (Rust)</text>
        <text x="205" y="100" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>HTTP · batching ·</text>
        <text x="205" y="112" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>streaming · queue</text>
        {/* model shards */}
        {[0, 1].map((i) => (
          <g key={`sh${i}`}>
            <rect x="330" y={56 + i * 46} width="140" height="38" rx="6" fill={`${SKY}14`} stroke={SKY} strokeWidth="1.3" />
            <text x="400" y={73 + i * 46} textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={SKY}>model shard (Python)</text>
            <text x="400" y={85 + i * 46} textAnchor="middle" fontFamily={mono} fontSize="6.8" fill={C.muted}>GPU {i} · Flash Attn</text>
          </g>
        ))}
        <line x1="94" y1="97" x2="130" y2="97" stroke={C.faint} strokeWidth="1.1" /><polygon points="130,97 123,93 123,101" fill={C.faint} />
        <line x1="280" y1="90" x2="330" y2="75" stroke={C.faint} strokeWidth="1" />
        <line x1="280" y1="104" x2="330" y2="119" stroke={C.faint} strokeWidth="1" />
        {/* feature chips */}
        {feats.map((f, i) => (
          <g key={`fe${i}`}>
            <rect x={30 + (i % 3) * 175} y={154 + Math.floor(i / 3) * 24} width="165" height="18" rx="4" fill={`${C.violet}12`} stroke={C.violet} strokeWidth="0.8" />
            <text x={112 + (i % 3) * 175} y={166 + Math.floor(i / 3) * 24} textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.violet}>{f}</text>
          </g>
        ))}
        <text x="400" y="150" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.faint}>num_shard = tensor-parallel GPUs</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   7.6 — Optimization in Practice
   ════════════════════════════════════════════════════════════ */

/* Throughput vs batch size — the knee. */
export function ThroughputKnee({ caption }: { caption?: string }) {
  const pts = [[1, 125], [4, 480], [8, 820], [16, 1100], [32, 1200]];
  const px = (b: number) => 60 + (b / 32) * 420;
  const py = (t: number) => 160 - (t / 1200) * 120;
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${px(p[0])} ${py(p[1])}`).join(" ");
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 200" width="100%" role="img" aria-label="Throughput versus batch size knee">
        <line x1="60" y1="40" x2="60" y2="160" stroke={C.faint} strokeWidth="1.1" />
        <line x1="60" y1="160" x2="500" y2="160" stroke={C.faint} strokeWidth="1.1" />
        <text x="30" y="100" fontFamily={mono} fontSize="8" fill={C.muted} transform="rotate(-90 30 100)">tok/s</text>
        <text x="280" y="184" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>batch size →</text>
        <path d={path} fill="none" stroke={SKY} strokeWidth="2.4" />
        {pts.map((p, i) => (
          <g key={`tk${i}`}>
            <circle cx={px(p[0])} cy={py(p[1])} r="3.5" fill={i === 2 || i === 3 ? C.gate : SKY} />
            <text x={px(p[0])} y={py(p[1]) - 8} textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>bs{p[0]}</text>
          </g>
        ))}
        <rect x={px(8) - 8} y="44" width={px(16) - px(8) + 16} height="120" rx="4" fill={`${C.gate}10`} stroke={C.gate} strokeWidth="1" strokeDasharray="3 2" />
        <text x={(px(8) + px(16)) / 2} y="36" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.gate}>the knee</text>
        <text x="280" y="194" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>memory-bound at bs=1; throughput flattens past bs≈16 — continuous batching targets the knee</text>
      </svg>
    </DiagramFrame>
  );
}

/* Grammar-constrained decoding: mask invalid tokens. */
export function GrammarConstrained({ caption }: { caption?: string }) {
  const toks = [
    { t: '"rating"', ok: true }, { t: ":", ok: true }, { t: "9.2", ok: true },
    { t: "banana", ok: false }, { t: "<", ok: false }, { t: "}", ok: true },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 190" width="100%" role="img" aria-label="Grammar-constrained JSON decoding">
        <rect x="20" y="34" width="110" height="34" rx="6" fill={`${C.violet}16`} stroke={C.violet} strokeWidth="1.3" />
        <text x="75" y="50" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.violet}>JSON schema</text>
        <text x="75" y="62" textAnchor="middle" fontFamily={mono} fontSize="6.8" fill={C.muted}>→ grammar / FSM</text>
        <line x1="130" y1="51" x2="166" y2="51" stroke={C.faint} strokeWidth="1.1" /><polygon points="166,51 159,47 159,55" fill={C.faint} />
        <rect x="166" y="34" width="120" height="34" rx="6" fill={`${C.gate}16`} stroke={C.gate} strokeWidth="1.3" />
        <text x="226" y="50" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.gate}>token mask</text>
        <text x="226" y="62" textAnchor="middle" fontFamily={mono} fontSize="6.8" fill={C.muted}>per decode step</text>
        <text x="290" y="98" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>at each step, only grammar-valid tokens keep non-zero probability:</text>
        {toks.map((t, i) => (
          <g key={`gc${i}`}>
            <rect x={50 + i * 80} y="112" width="70" height="28" rx="4"
              fill={t.ok ? `${C.on}1a` : `${C.hole}1a`} stroke={t.ok ? C.on : C.hole} strokeWidth="1.1"
              strokeDasharray={t.ok ? "0" : "2 2"} opacity={t.ok ? 1 : 0.5} />
            <text x={85 + i * 80} y="130" textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={t.ok ? C.on : C.hole}>{t.t}</text>
          </g>
        ))}
        <text x="280" y="166" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>green = allowed · red = masked to −∞ before sampling</text>
        <text x="280" y="184" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.faint}>output is GUARANTEED valid JSON — invalid tokens are impossible, not just unlikely</text>
      </svg>
    </DiagramFrame>
  );
}

/* Tensor parallelism: split a weight matrix across GPUs + AllReduce. */
export function TensorParallelSplit({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 200" width="100%" role="img" aria-label="Tensor parallelism splits weights across GPUs">
        <text x="270" y="24" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={SKY}>one weight matrix, split across 2 GPUs</text>
        {[0, 1].map((g) => (
          <g key={`tp${g}`}>
            <rect x={60 + g * 230} y="44" width="190" height="80" rx="8" fill={`${(g === 0 ? SKY : C.violet)}10`} stroke={g === 0 ? SKY : C.violet} strokeWidth="1.4" />
            <text x={155 + g * 230} y="38" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={g === 0 ? SKY : C.violet}>GPU {g}</text>
            {[0, 1, 2].map((c) => (
              <rect key={`tpc-${g}-${c}`} x={76 + g * 230 + c * 52} y="58" width="44" height="50" rx="3" fill={`${(g === 0 ? SKY : C.violet)}26`} stroke={g === 0 ? SKY : C.violet} strokeWidth="0.8" />
            ))}
            <text x={155 + g * 230} y="120" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>half the columns → partial output</text>
          </g>
        ))}
        {/* allreduce */}
        <rect x="190" y="150" width="160" height="28" rx="6" fill={`${C.on}14`} stroke={C.on} strokeWidth="1.3" />
        <text x="270" y="168" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.on}>AllReduce (NVLink)</text>
        <line x1="155" y1="124" x2="240" y2="150" stroke={C.faint} strokeWidth="1" />
        <line x1="385" y1="124" x2="300" y2="150" stroke={C.faint} strokeWidth="1" />
        <text x="270" y="194" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>each GPU computes its slice, then AllReduce sums them — overlapped with compute, ~5–15% overhead</text>
      </svg>
    </DiagramFrame>
  );
}
