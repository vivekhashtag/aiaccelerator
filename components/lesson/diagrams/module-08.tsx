import { C, DiagramFrame, mono } from "./_shared";

/* ════════════════════════════════════════════════════════════
   Module 8 — Hardware Acceleration: FPGA + Edge NPUs
   Accent: orange (C.orange). Figures mirror the per-module palette.
   ════════════════════════════════════════════════════════════ */

const ORANGE = C.orange;

/* ════════════════════════════════════════════════════════════
   8.1 — FPGA Architecture
   ════════════════════════════════════════════════════════════ */

/* The four FPGA building blocks. */
export function FpgaBuildingBlocks({ caption }: { caption?: string }) {
  const blocks = [
    { t: "LUT6", s: "lookup table", d: "any 6-input Boolean fn (64-bit truth table)", c: ORANGE },
    { t: "FF", s: "flip-flop", d: "1 bit of state per clock edge", c: C.blue },
    { t: "DSP48", s: "MAC block", d: "18×18 multiply + 48-bit accumulate", c: C.on },
    { t: "BRAM", s: "block RAM", d: "36 Kbit dual-port on-chip SRAM", c: C.violet },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 170" width="100%" role="img" aria-label="FPGA building blocks: LUT FF DSP BRAM">
        {blocks.map((b, i) => {
          const x = 18 + i * 134;
          return (
            <g key={`bb${i}`}>
              <rect x={x} y="34" width="120" height="86" rx="8" fill={`${b.c}12`} stroke={b.c} strokeWidth="1.5" />
              <text x={x + 60} y="56" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={b.c}>{b.t}</text>
              <text x={x + 60} y="71" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>{b.s}</text>
              <foreignObject x={x + 6} y="80" width="108" height="36">
                <div style={{ fontFamily: mono, fontSize: "7.5px", color: C.text, textAlign: "center", lineHeight: 1.25 }}>{b.d}</div>
              </foreignObject>
            </g>
          );
        })}
        <text x="280" y="22" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>four resources — everything you build is a configuration of these</text>
        <text x="280" y="138" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>PYNQ-Z2: 53,200 LUTs · 106,400 FFs · 220 DSPs · 140 BRAMs (630 KB) — DSPs are the MAC budget</text>
      </svg>
    </DiagramFrame>
  );
}

/* DSP packing by precision: lower bits = more MACs per DSP. */
export function DspPacking({ caption }: { caption?: string }) {
  const rows = [
    { t: "FP32", macs: 1, w: 40, note: "≥1 DSP each (often more)", c: C.off },
    { t: "INT8", macs: 2, w: 110, note: "2 MACs packed per DSP", c: C.on },
    { t: "binary (1-bit)", macs: 24, w: 320, note: "16–32 ops per DSP", c: ORANGE },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 180" width="100%" role="img" aria-label="DSP packing by precision">
        <text x="270" y="22" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>operations packed into ONE DSP48 block, by precision</text>
        {rows.map((r, i) => {
          const y = 40 + i * 38;
          return (
            <g key={`dp${i}`}>
              <text x="20" y={y + 16} fontFamily={mono} fontSize="8.5" fontWeight="700" fill={r.c}>{r.t}</text>
              <rect x="140" y={y} width={r.w} height="24" rx="3" fill={`${r.c}30`} stroke={r.c} strokeWidth="1.1" />
              <text x={146 + r.w + 4} y={y + 16} fontFamily={mono} fontSize="7.5" fill={C.muted}>{r.note}</text>
            </g>
          );
        })}
        <text x="270" y="168" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.faint}>lower precision unlocks dramatic FPGA throughput — the same 220 DSPs do far more MACs</text>
      </svg>
    </DiagramFrame>
  );
}

/* Zynq PS + PL heterogeneous SoC: ARM orchestrates, fabric accelerates. */
export function ZynqPsPlFlow({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 190" width="100%" role="img" aria-label="Zynq PS plus PL architecture">
        {/* PS */}
        <rect x="30" y="40" width="180" height="110" rx="10" fill={`${C.blue}10`} stroke={C.blue} strokeWidth="1.5" />
        <text x="120" y="34" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.blue}>PS — Processing System</text>
        <text x="120" y="64" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.text}>Dual Cortex-A9 (667 MHz)</text>
        <text x="120" y="80" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>Linux · Python · Jupyter</text>
        <text x="120" y="94" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>512 MB DRAM · USB/Eth/SD</text>
        <text x="120" y="120" textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={C.blue}>orchestrates</text>
        {/* AXI */}
        <rect x="232" y="78" width="96" height="34" rx="6" fill={`${C.gate}16`} stroke={C.gate} strokeWidth="1.3" />
        <text x="280" y="94" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.gate}>AXI bus</text>
        <text x="280" y="106" textAnchor="middle" fontFamily={mono} fontSize="6.8" fill={C.muted}>data ⇄ results</text>
        <line x1="210" y1="95" x2="232" y2="95" stroke={C.faint} strokeWidth="1.2" />
        <line x1="328" y1="95" x2="350" y2="95" stroke={C.faint} strokeWidth="1.2" />
        {/* PL */}
        <rect x="350" y="40" width="180" height="110" rx="10" fill={`${ORANGE}10`} stroke={ORANGE} strokeWidth="1.5" />
        <text x="440" y="34" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={ORANGE}>PL — Programmable Logic</text>
        <text x="440" y="62" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>53k LUTs · 220 DSPs · 140 BRAM</text>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={`pl${i}`} x={368 + i * 30} y="76" width="24" height="24" rx="3" fill={`${ORANGE}26`} stroke={ORANGE} strokeWidth="0.9" />
        ))}
        <text x="440" y="120" textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={ORANGE}>your custom accelerator</text>
        <text x="280" y="172" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>heterogeneous SoC: CPU + reconfigurable fabric on one die — the blueprint for Apple Neural Engine, Snapdragon, etc.</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   8.2 — HLS to Bitstream
   ════════════════════════════════════════════════════════════ */

/* The FPGA design flow: C++ → RTL → netlist → bitstream. */
export function FpgaDesignFlow({ caption }: { caption?: string }) {
  const stages = [
    { t: "HLS C++", s: "your code", time: "", c: C.blue },
    { t: "RTL", s: "Verilog/VHDL", time: "sec–min", c: C.violet },
    { t: "netlist", s: "LUTs/DSPs/FFs", time: "minutes", c: C.gate },
    { t: "place & route", s: "on-die layout", time: "min–hours", c: C.hole },
    { t: ".bit bitstream", s: "IS the hardware", time: "", c: ORANGE },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 150" width="100%" role="img" aria-label="FPGA design flow from C++ to bitstream">
        {stages.map((s, i) => {
          const x = 12 + i * 110;
          return (
            <g key={`df${i}`}>
              <rect x={x} y="48" width="96" height="46" rx="7" fill={`${s.c}14`} stroke={s.c} strokeWidth="1.4" />
              <text x={x + 48} y="69" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={s.c}>{s.t}</text>
              <text x={x + 48} y="83" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>{s.s}</text>
              {s.time && <text x={x + 48} y="108" textAnchor="middle" fontFamily={mono} fontSize="6.8" fill={C.faint}>{s.time}</text>}
              {i < 4 && <g><line x1={x + 96} y1="71" x2={x + 110} y2="71" stroke={C.faint} strokeWidth="1.2" /><polygon points={`${x + 110},71 ${x + 103},67 ${x + 103},75`} fill={C.faint} /></g>}
            </g>
          );
        })}
        <text x="280" y="28" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>you describe a CIRCUIT, not instructions — compilation takes 30–90 min (P&R is the slow step)</text>
        <text x="280" y="128" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>flash the .bit and the FPGA physically becomes your circuit — why FPGA dev cycles are slow</text>
      </svg>
    </DiagramFrame>
  );
}

/* The three key HLS pragmas. */
export function HlsPragmas({ caption }: { caption?: string }) {
  const pragmas = [
    { t: "PIPELINE", s: "II=1", d: "overlap iterations — 1 result/cycle (assembly line)", c: ORANGE },
    { t: "UNROLL", s: "factor=N", d: "N parallel copies — N× DSPs, N× faster", c: C.on },
    { t: "ARRAY_PARTITION", s: "cyclic/complete", d: "split BRAM → many weights read per cycle", c: C.violet },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 160" width="100%" role="img" aria-label="The three key HLS pragmas">
        {pragmas.map((p, i) => {
          const x = 16 + i * 178;
          return (
            <g key={`pr${i}`}>
              <rect x={x} y="34" width="164" height="92" rx="8" fill={`${p.c}12`} stroke={p.c} strokeWidth="1.5" />
              <text x={x + 82} y="56" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={p.c}>{p.t}</text>
              <text x={x + 82} y="70" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>{p.s}</text>
              <foreignObject x={x + 8} y="80" width="148" height="42">
                <div style={{ fontFamily: mono, fontSize: "7.8px", color: C.text, textAlign: "center", lineHeight: 1.3 }}>{p.d}</div>
              </foreignObject>
            </g>
          );
        })}
        <text x="280" y="24" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>three transformations every FPGA AI design uses — trading DSPs/BRAM for speed</text>
        <text x="280" y="146" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>pipelining = throughput · unrolling = parallelism · partitioning = memory bandwidth</text>
      </svg>
    </DiagramFrame>
  );
}

/* Sequential layers vs dataflow streaming. */
export function DataflowStreaming({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 200" width="100%" role="img" aria-label="Sequential versus dataflow streaming execution">
        {/* sequential */}
        <text x="20" y="28" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.hole}>CPU — sequential layers (one runs, rest idle)</text>
        {["Layer 1", "Layer 2", "Layer 3"].map((l, i) => (
          <g key={`sq${i}`}>
            <rect x={40 + i * 160} y="40" width="120" height="26" rx="4" fill={i === 0 ? `${C.hole}30` : C.panel} stroke={i === 0 ? C.hole : C.line} strokeWidth="1" />
            <text x={100 + i * 160} y="57" textAnchor="middle" fontFamily={mono} fontSize="8" fill={i === 0 ? C.hole : C.muted}>{l}</text>
            {i < 2 && <text x={166 + i * 160} y="57" fontFamily={mono} fontSize="9" fill={C.faint}>→</text>}
          </g>
        ))}
        <text x="280" y="82" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>only one layer active at a time</text>
        {/* dataflow */}
        <text x="20" y="118" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.on}>FPGA dataflow — all layers run at once on different data</text>
        {["Layer 1", "Layer 2", "Layer 3"].map((l, i) => (
          <g key={`ds${i}`}>
            <rect x={40 + i * 160} y="130" width="120" height="26" rx="4" fill={`${C.on}30`} stroke={C.on} strokeWidth="1.1" />
            <text x={100 + i * 160} y="147" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.on}>{l}</text>
            {i < 2 && (
              <g>
                <rect x={160 + i * 160} y="135" width="40" height="16" rx="3" fill={`${C.gate}1a`} stroke={C.gate} strokeWidth="0.8" />
                <text x={180 + i * 160} y="147" textAnchor="middle" fontFamily={mono} fontSize="6.5" fill={C.gate}>FIFO</text>
              </g>
            )}
          </g>
        ))}
        <text x="100" y="172" textAnchor="middle" fontFamily={mono} fontSize="6.8" fill={C.muted}>pixel 100</text>
        <text x="260" y="172" textAnchor="middle" fontFamily={mono} fontSize="6.8" fill={C.muted}>pixel 50</text>
        <text x="420" y="172" textAnchor="middle" fontFamily={mono} fontSize="6.8" fill={C.muted}>pixel 1 out</text>
        <text x="280" y="192" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.faint}>#pragma HLS DATAFLOW — a hardware assembly line; throughput = slowest stage, not the sum</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   8.3 — Quantization for FPGA
   ════════════════════════════════════════════════════════════ */

/* Binary MAC = XNOR + popcount, no multiplier. */
export function XnorPopcount({ caption }: { caption?: string }) {
  const rows = [
    { w: "+1", x: "+1", prod: "+1", xnor: "1" },
    { w: "+1", x: "−1", prod: "−1", xnor: "0" },
    { w: "−1", x: "+1", prod: "−1", xnor: "0" },
    { w: "−1", x: "−1", prod: "+1", xnor: "1" },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 200" width="100%" role="img" aria-label="Binary MAC as XNOR plus popcount">
        <text x="150" y="24" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={ORANGE}>binary MAC: w·x for w,x ∈ &#123;−1,+1&#125;</text>
        {/* header */}
        <text x="60" y="48" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.muted}>w</text>
        <text x="110" y="48" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.muted}>x</text>
        <text x="170" y="48" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.muted}>w·x</text>
        <text x="240" y="48" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.on}>XNOR(bits)</text>
        {rows.map((r, i) => {
          const y = 64 + i * 26;
          return (
            <g key={`xp${i}`}>
              <text x="60" y={y} fontFamily={mono} fontSize="8.5" fill={C.text}>{r.w}</text>
              <text x="110" y={y} fontFamily={mono} fontSize="8.5" fill={C.text}>{r.x}</text>
              <text x="170" y={y} fontFamily={mono} fontSize="8.5" fontWeight="700" fill={r.prod === "+1" ? C.on : C.hole}>{r.prod}</text>
              <text x="255" y={y} fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.on}>{r.xnor}</text>
            </g>
          );
        })}
        {/* right side: formula */}
        <rect x="330" y="50" width="190" height="110" rx="8" fill={`${ORANGE}10`} stroke={ORANGE} strokeWidth="1.3" />
        <text x="425" y="74" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={ORANGE}>dot product =</text>
        <text x="425" y="94" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.text}>2·popcount(XNOR) − N</text>
        <text x="425" y="120" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>no multiply — just</text>
        <text x="425" y="133" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>bitwise XNOR + bit count</text>
        <text x="425" y="150" textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={C.on}>0 DSPs — runs in LUTs</text>
        <text x="270" y="186" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>binary nets need ZERO DSPs → ~50–100× more parallelism than INT8 on the same FPGA</text>
      </svg>
    </DiagramFrame>
  );
}

/* FINN pipeline: Brevitas model → FINN compiler → bitstream. */
export function FinnPipeline({ caption }: { caption?: string }) {
  const stages = [
    { t: "Brevitas", s: "train quantized (PyTorch)", c: C.hole },
    { t: "FINN-ONNX", s: "export", c: C.violet },
    { t: "FINN compiler", s: "fold BN · map layers · gen RTL", c: ORANGE },
    { t: "Vivado", s: "synth + P&R", c: C.gate },
    { t: "PYNQ", s: "overlay.execute()", c: C.on },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 150" width="100%" role="img" aria-label="FINN deployment pipeline">
        {stages.map((s, i) => {
          const x = 10 + i * 111;
          return (
            <g key={`fp${i}`}>
              <rect x={x} y="50" width="98" height="46" rx="7" fill={`${s.c}14`} stroke={s.c} strokeWidth="1.4" />
              <text x={x + 49} y="71" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={s.c}>{s.t}</text>
              <foreignObject x={x + 4} y="76" width="90" height="18">
                <div style={{ fontFamily: mono, fontSize: "6.6px", color: C.muted, textAlign: "center", lineHeight: 1.15 }}>{s.s}</div>
              </foreignObject>
              {i < 4 && <g><line x1={x + 98} y1="73" x2={x + 111} y2="73" stroke={C.faint} strokeWidth="1.2" /><polygon points={`${x + 111},73 ${x + 104},69 ${x + 104},77`} fill={C.faint} /></g>}
            </g>
          );
        })}
        <text x="280" y="30" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>FINN turns a quantized PyTorch net into a streaming-dataflow FPGA accelerator</text>
        <text x="280" y="124" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>generates per-layer streaming blocks (StreamingFCLayer, Thresholding) wired by AXI-Stream FIFOs</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   8.4 — FPGA vs GPU vs CPU
   ════════════════════════════════════════════════════════════ */

/* The three hardware philosophies. */
export function HardwarePhilosophies({ caption }: { caption?: string }) {
  const cards = [
    { t: "CPU", p: "“I do anything, sequentially”", best: "pre/post-proc, control, tiny models", c: C.off },
    { t: "GPU", p: "“give me regular parallel math”", best: "training, large-model + batch inference", c: C.on },
    { t: "FPGA", p: "“I become the exact circuit you need”", best: "deterministic, low-power edge streaming", c: ORANGE },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 160" width="100%" role="img" aria-label="CPU GPU FPGA philosophies">
        {cards.map((c, i) => {
          const x = 16 + i * 178;
          return (
            <g key={`hp${i}`}>
              <rect x={x} y="30" width="164" height="100" rx="8" fill={`${c.c}12`} stroke={c.c} strokeWidth="1.5" />
              <text x={x + 82} y="52" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={c.c}>{c.t}</text>
              <foreignObject x={x + 8} y="60" width="148" height="34">
                <div style={{ fontFamily: mono, fontSize: "7.6px", color: C.text, textAlign: "center", lineHeight: 1.3, fontStyle: "italic" }}>{c.p}</div>
              </foreignObject>
              <foreignObject x={x + 8} y="98" width="148" height="28">
                <div style={{ fontFamily: mono, fontSize: "7.4px", color: C.muted, textAlign: "center", lineHeight: 1.25 }}>best: {c.best}</div>
              </foreignObject>
            </g>
          );
        })}
        <text x="280" y="22" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>three philosophies — match the workload to the silicon</text>
      </svg>
    </DiagramFrame>
  );
}

/* Latency + jitter: FPGA is deterministic. */
export function LatencyJitter({ caption }: { caption?: string }) {
  const rows = [
    { t: "CPU i7", lat: "15–50 ms", jit: "5–20 ms jitter", w: 330, c: C.off },
    { t: "GPU 3090", lat: "2–5 ms", jit: "1–3 ms jitter", w: 120, c: C.on },
    { t: "FPGA ZCU104", lat: "0.1–0.5 ms", jit: "<1 µs — deterministic", w: 30, c: ORANGE },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 170" width="100%" role="img" aria-label="Inference latency and jitter">
        <text x="280" y="22" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>CNN inference latency (INT8) — bar = latency, label = jitter</text>
        {rows.map((r, i) => {
          const y = 40 + i * 36;
          return (
            <g key={`lj${i}`}>
              <text x="20" y={y + 16} fontFamily={mono} fontSize="8" fontWeight="700" fill={r.c}>{r.t}</text>
              <rect x="130" y={y + 2} width={r.w} height="20" rx="3" fill={`${r.c}30`} stroke={r.c} strokeWidth="1.1" />
              <text x="136" y={y + 16} fontFamily={mono} fontSize="7.5" fontWeight="700" fill={C.text}>{r.lat}</text>
              <text x={140 + r.w + 6} y={y + 16} fontFamily={mono} fontSize="7" fill={C.muted}>{r.jit}</text>
            </g>
          );
        })}
        <text x="280" y="160" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.faint}>latency = pipeline_depth × clock_period — same every input, regardless of OS/heat/load</text>
      </svg>
    </DiagramFrame>
  );
}

/* Power efficiency: img/s/W across devices. */
export function EfficiencyBars({ caption }: { caption?: string }) {
  const devs = [
    { t: "Jetson Orin", e: 133, c: C.off },
    { t: "Intel NCS2", e: 300, c: C.violet },
    { t: "NVIDIA T4", e: 1857, c: C.on },
    { t: "Xilinx ZCU104", e: 2000, c: ORANGE },
  ];
  const max = 2000;
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 180" width="100%" role="img" aria-label="Inference energy efficiency img/s/W">
        <text x="270" y="22" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>energy efficiency — images/sec per watt (INT8 CNN)</text>
        {devs.map((d, i) => {
          const y = 38 + i * 32;
          const w = (d.e / max) * 340;
          return (
            <g key={`ef${i}`}>
              <text x="20" y={y + 15} fontFamily={mono} fontSize="8" fill={C.text}>{d.t}</text>
              <rect x="150" y={y + 2} width={w} height="18" rx="3" fill={`${d.c}33`} stroke={d.c} strokeWidth="1.1" />
              <text x={156 + w} y={y + 15} fontFamily={mono} fontSize="7.5" fontWeight="700" fill={d.c}>{d.e}</text>
            </g>
          );
        })}
        <text x="270" y="172" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>a 5 W FPGA beats a 70 W datacenter T4 on efficiency — why FPGA wins on battery/edge power</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   8.5 — NN on PYNQ-Z2
   ════════════════════════════════════════════════════════════ */

/* What fits on the PYNQ-Z2's 220 DSPs / 630 KB. */
export function WhatFitsPynq({ caption }: { caption?: string }) {
  const tiers = [
    { t: "comfortable", c: C.on, items: ["MLP for MNIST (INT8) ~50 DSP, 230 KB", "small CNN for CIFAR-10 ~150 DSP", "keyword spotting (binary) 0 DSP"] },
    { t: "challenging", c: C.gate, items: ["MobileNetV2 — needs tiling + reuse", "YOLO-tiny — heavy quantization"] },
    { t: "not feasible", c: C.hole, items: ["ResNet-50 at full precision", "any transformer / LLM (16 GB ≫ 630 KB)"] },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 200" width="100%" role="img" aria-label="What fits on the PYNQ-Z2">
        <text x="280" y="20" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>budget: 220 DSPs · 630 KB BRAM — work backwards from this</text>
        {tiers.map((tier, i) => {
          const y = 30 + i * 54;
          return (
            <g key={`wf${i}`}>
              <rect x="20" y={y} width="120" height="48" rx="6" fill={`${tier.c}16`} stroke={tier.c} strokeWidth="1.3" />
              <text x="80" y={y + 28} textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={tier.c}>{tier.t}</text>
              {tier.items.map((it, k) => (
                <text key={`wi-${i}-${k}`} x="156" y={y + 16 + k * 13} fontFamily={mono} fontSize="7.5" fill={C.text}>• {it}</text>
              ))}
            </g>
          );
        })}
        <text x="280" y="194" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.faint}>you cannot accelerate a model that doesn't fit — measure the budget, THEN pick the architecture</text>
      </svg>
    </DiagramFrame>
  );
}

/* Streaming 3x3 convolution with a line buffer + sliding window. */
export function StreamingConv({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 200" width="100%" role="img" aria-label="Streaming convolution with line buffer and sliding window">
        {/* pixel stream */}
        <text x="60" y="30" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.violet}>pixel stream</text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={`ps${i}`} x={20 + i * 20} y="40" width="16" height="16" rx="2" fill={`${C.violet}30`} stroke={C.violet} strokeWidth="0.8" />
        ))}
        <line x1="104" y1="48" x2="130" y2="48" stroke={C.faint} strokeWidth="1.1" /><polygon points="130,48 123,44 123,52" fill={C.faint} />
        {/* line buffer */}
        <rect x="132" y="30" width="150" height="56" rx="6" fill={`${C.blue}10`} stroke={C.blue} strokeWidth="1.2" />
        <text x="207" y="26" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.blue}>line buffer (2 rows)</text>
        {[0, 1].map((r) => [0, 1, 2, 3, 4, 5].map((c) => (
          <rect key={`lb-${r}-${c}`} x={140 + c * 23} y={38 + r * 22} width="20" height="18" rx="2" fill={`${C.blue}22`} stroke={C.blue} strokeWidth="0.6" />
        )))}
        {/* window */}
        <rect x="300" y="30" width="80" height="80" rx="6" fill={`${ORANGE}10`} stroke={ORANGE} strokeWidth="1.3" />
        <text x="340" y="26" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={ORANGE}>3×3 window</text>
        {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
          <rect key={`w-${r}-${c}`} x={310 + c * 22} y={40 + r * 22} width="18" height="18" rx="2" fill={`${ORANGE}26`} stroke={ORANGE} strokeWidth="0.7" />
        )))}
        <line x1="282" y1="58" x2="300" y2="65" stroke={C.faint} strokeWidth="1" />
        {/* MACs */}
        <line x1="380" y1="70" x2="406" y2="70" stroke={C.faint} strokeWidth="1.1" /><polygon points="406,70 399,66 399,74" fill={C.faint} />
        <rect x="408" y="46" width="130" height="48" rx="6" fill={`${C.on}12`} stroke={C.on} strokeWidth="1.3" />
        <text x="473" y="66" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.on}>9 MACs (unrolled)</text>
        <text x="473" y="80" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>9 DSPs · 1 output/clk</text>
        <text x="280" y="142" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.muted}>a line buffer holds just enough rows for a sliding window — no full-frame storage needed</text>
        <text x="280" y="166" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.faint}>PIPELINE II=1 → one pixel in, one conv output out, every clock cycle</text>
        <text x="280" y="186" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.faint}>cost: 9 DSPs · 2 BRAMs · ~200 LUTs · first output after 2 rows fill</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   8.6 — Vitis AI & the DPU
   ════════════════════════════════════════════════════════════ */

/* FINN (custom per model) vs Vitis AI (pre-built DPU overlay). */
export function FinnVsVitis({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 190" width="100%" role="img" aria-label="FINN versus Vitis AI deployment">
        {/* FINN */}
        <text x="150" y="24" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.hole}>FINN — custom hardware per model</text>
        {["model", "synthesise (30–60 min)", "unique bitstream"].map((s, i) => (
          <g key={`fv${i}`}>
            <rect x="40" y={36 + i * 36} width="220" height="26" rx="4" fill={`${C.hole}12`} stroke={C.hole} strokeWidth="1" />
            <text x="150" y={53 + i * 36} textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.hole}>{s}</text>
            {i < 2 && <text x="150" y={66 + i * 36} textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>↓</text>}
          </g>
        ))}
        <text x="150" y="166" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>max efficiency · resynth every model</text>
        {/* Vitis */}
        <text x="410" y="24" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.on}>Vitis AI — pre-built DPU overlay</text>
        {["model", "quantize + compile (min)", "→ runs on the resident DPU"].map((s, i) => (
          <g key={`vv${i}`}>
            <rect x="300" y={36 + i * 36} width="220" height="26" rx="4" fill={`${C.on}12`} stroke={C.on} strokeWidth="1" />
            <text x="410" y={53 + i * 36} textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.on}>{s}</text>
            {i < 2 && <text x="410" y={66 + i * 36} textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>↓</text>}
          </g>
        ))}
        <text x="410" y="166" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>deploy in minutes · no resynthesis</text>
        <text x="280" y="184" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.faint}>FINN = bespoke speed · Vitis AI = the DPU is a fixed, general CNN engine you just load models onto</text>
      </svg>
    </DiagramFrame>
  );
}

/* The DPU: a systolic-array overlay on the fabric. */
export function DpuEngine({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 180" width="100%" role="img" aria-label="The DPU systolic array overlay">
        <text x="270" y="22" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={ORANGE}>DPU — a systolic MAC array, pre-synthesised onto the PL</text>
        {/* systolic grid */}
        {[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4, 5].map((c) => (
          <rect key={`dpu-${r}-${c}`} x={150 + c * 34} y={40 + r * 26} width="28" height="20" rx="2" fill={`${ORANGE}26`} stroke={ORANGE} strokeWidth="0.8" />
        )))}
        <text x="60" y="78" fontFamily={mono} fontSize="7.5" fill={C.muted}>weights →</text>
        <text x="270" y="160" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>B4096 = 4096 ops/clock · INT8 · Conv/FC/Pool/ReLU · ResNet-50 @ 1400 FPS (ZCU104)</text>
        <text x="270" y="176" textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={C.faint}>same idea as Google's TPU — a fixed MAC grid, but living in reconfigurable fabric</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   8.7 — FPGA in Practice
   ════════════════════════════════════════════════════════════ */

/* Streaming pipeline: keep intermediate data on-chip, never DRAM. */
export function StreamingPipeline({ caption }: { caption?: string }) {
  const stages = ["DMA in", "norm", "Conv1+BN+ReLU", "MaxPool", "Conv2", "GAP", "FC+Softmax", "DMA out"];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 160" width="100%" role="img" aria-label="On-chip streaming pipeline">
        <rect x="14" y="60" width="532" height="40" rx="8" fill={`${ORANGE}08`} stroke={ORANGE} strokeWidth="1.2" strokeDasharray="5 3" />
        <text x="280" y="52" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={ORANGE}>everything inside stays in on-chip BRAM (~5 ns) — never round-trips to DRAM (~10–100 ns)</text>
        {stages.map((s, i) => {
          const x = 22 + i * 66;
          const edge = i === 0 || i === 7;
          return (
            <g key={`sp${i}`}>
              <rect x={x} y="68" width="58" height="24" rx="4" fill={edge ? `${C.blue}16` : `${C.on}16`} stroke={edge ? C.blue : C.on} strokeWidth="1" />
              <foreignObject x={x + 2} y="70" width="54" height="20">
                <div style={{ fontFamily: mono, fontSize: "6.5px", color: edge ? C.blue : C.on, textAlign: "center", lineHeight: 1.1, fontWeight: 700 }}>{s}</div>
              </foreignObject>
              {i < 7 && <line x1={x + 58} y1="80" x2={x + 66} y2="80" stroke={C.faint} strokeWidth="1" />}
            </g>
          );
        })}
        <text x="280" y="128" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.faint}>DRAM access is slow + power-hungry; on-chip is one clock — the core FPGA efficiency principle</text>
      </svg>
    </DiagramFrame>
  );
}

/* Energy per inference across the hardware landscape (log scale). */
export function EnergyPerInference({ caption }: { caption?: string }) {
  // µJ per MNIST inference; log10 mapping
  const devs = [
    { t: "Laptop CPU", uj: 4.5, c: C.off },
    { t: "Raspberry Pi 4", uj: 2.5, c: C.off },
    { t: "Jetson Orin", uj: 0.15, c: C.on },
    { t: "STM32 MCU", uj: 0.1, c: C.violet },
    { t: "PYNQ-Z2 FPGA", uj: 0.02, c: ORANGE },
    { t: "Custom ASIC", uj: 0.001, c: C.blue },
  ];
  // log scale: map 0.001..4.5 → x
  const lx = (uj: number) => 150 + (Math.log10(uj) - Math.log10(0.001)) / (Math.log10(4.5) - Math.log10(0.001)) * 350;
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 190" width="100%" role="img" aria-label="Energy per inference by device">
        <text x="280" y="20" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>energy per MNIST inference — µJ, log scale (lower = better)</text>
        {devs.map((d, i) => {
          const y = 32 + i * 24;
          return (
            <g key={`en${i}`}>
              <text x="20" y={y + 13} fontFamily={mono} fontSize="8" fill={C.text}>{d.t}</text>
              <line x1="150" y1={y + 9} x2={lx(d.uj)} y2={y + 9} stroke={d.c} strokeWidth="6" strokeLinecap="round" />
              <text x={lx(d.uj) + 8} y={y + 13} fontFamily={mono} fontSize="7.5" fontWeight="700" fill={d.c}>{d.uj} µJ</text>
            </g>
          );
        })}
        <text x="280" y="184" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.faint}>FPGA is the edge sweet spot — better than mobile GPUs, short of custom ASICs</text>
      </svg>
    </DiagramFrame>
  );
}

/* FPGA prototype → ASIC production. */
export function FpgaToAsic({ caption }: { caption?: string }) {
  const rows = [
    { k: "cost", f: "$100–$10k / board", a: "$1M–$100M masks, ¢/chip at volume" },
    { k: "power", f: "2–10 W", a: "0.001–0.1 W (100–1000× better)" },
    { k: "speed", f: "100–500 MHz", a: "1–5 GHz (3–10× better)" },
    { k: "volume", f: "100s–1000s", a: "millions–billions" },
    { k: "time", f: "days–months", a: "1–3 years" },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 200" width="100%" role="img" aria-label="FPGA prototype to ASIC production">
        <text x="270" y="22" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={ORANGE}>FPGA (prototype) → ASIC (production) — same RTL</text>
        <text x="245" y="44" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={ORANGE}>FPGA</text>
        <text x="450" y="44" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.blue}>ASIC</text>
        {rows.map((r, i) => {
          const y = 56 + i * 24;
          return (
            <g key={`fa${i}`}>
              <text x="20" y={y + 13} fontFamily={mono} fontSize="8" fontWeight="700" fill={C.muted}>{r.k}</text>
              <text x="100" y={y + 13} fontFamily={mono} fontSize="7.5" fill={ORANGE}>{r.f}</text>
              <text x="330" y={y + 13} fontFamily={mono} fontSize="7.5" fill={C.blue}>{r.a}</text>
            </g>
          );
        })}
        <text x="270" y="192" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>validated on FPGA, then taped out: Google TPU, MS Brainwave, Apple Neural Engine</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   8.8 — Edge AI & TinyML Landscape
   ════════════════════════════════════════════════════════════ */

/* The hardware ramp by power & memory — where TinyML sits. */
export function TinyMlSpectrum({ caption }: { caption?: string }) {
  const tiers = [
    { t: "MCU", p: "mW · KB", e: "wake word, anomaly", c: C.violet },
    { t: "MCU + NPU", p: "10s mW · MB", e: "person detect, vision", c: ORANGE },
    { t: "MPU / RPi", p: "W · GB", e: "small CNN, 1–3B LLM", c: C.on },
    { t: "FPGA", p: "W · KB-on-chip", e: "deterministic streaming", c: C.gate },
    { t: "GPU", p: "100s W · 10s GB", e: "training, big LLMs", c: C.blue },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 160" width="100%" role="img" aria-label="The edge-to-cloud hardware spectrum">
        {tiers.map((t, i) => {
          const x = 12 + i * 110;
          return (
            <g key={`tm${i}`}>
              <rect x={x} y="40" width="98" height="74" rx="8" fill={`${t.c}12`} stroke={t.c} strokeWidth="1.5" />
              <text x={x + 49} y="62" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={t.c}>{t.t}</text>
              <text x={x + 49} y="78" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.text}>{t.p}</text>
              <foreignObject x={x + 4} y="86" width="90" height="26">
                <div style={{ fontFamily: mono, fontSize: "6.6px", color: C.muted, textAlign: "center", lineHeight: 1.2 }}>{t.e}</div>
              </foreignObject>
              {i < 4 && <text x={x + 104} y="80" fontFamily={mono} fontSize="9" fill={C.faint}>→</text>}
            </g>
          );
        })}
        <text x="280" y="28" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>more power & memory →</text>
        <text x="280" y="134" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>TinyML lives at the far left: always-on inference in milliwatts and kilobytes — no cloud, fully private</text>
        <text x="280" y="150" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={ORANGE}>the new wave: micro-NPUs add a fixed MAC engine to the MCU (10–100× the CPU core)</text>
      </svg>
    </DiagramFrame>
  );
}

/* MCU memory budget: flash (weights) + SRAM (tensor arena). */
export function McuMemoryBudget({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 180" width="100%" role="img" aria-label="MCU memory budget for TinyML">
        {/* flash */}
        <text x="150" y="26" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.violet}>FLASH (e.g. 1–2 MB)</text>
        <rect x="40" y="36" width="220" height="50" rx="6" fill={`${C.violet}10`} stroke={C.violet} strokeWidth="1.3" />
        <rect x="46" y="42" width="120" height="38" rx="3" fill={`${C.violet}33`} stroke={C.violet} strokeWidth="0.9" />
        <text x="106" y="65" textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={C.violet}>INT8 weights</text>
        <text x="214" y="65" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>+ code</text>
        {/* sram */}
        <text x="390" y="26" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={ORANGE}>SRAM (e.g. 256 KB–1 MB)</text>
        <rect x="280" y="36" width="220" height="50" rx="6" fill={`${ORANGE}10`} stroke={ORANGE} strokeWidth="1.3" />
        <rect x="286" y="42" width="130" height="38" rx="3" fill={`${ORANGE}33`} stroke={ORANGE} strokeWidth="0.9" />
        <text x="351" y="61" textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={ORANGE}>tensor arena</text>
        <text x="351" y="72" textAnchor="middle" fontFamily={mono} fontSize="6.5" fill={C.muted}>(activations, scratch)</text>
        <text x="470" y="65" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>+ stack</text>
        <text x="270" y="112" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.text}>weights live in flash · activations in SRAM — both measured in KB, not GB</text>
        <text x="270" y="136" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>fits: keyword spotting (~20 KB), person detection (~300 KB), gesture/anomaly (~few KB)</text>
        <text x="270" y="156" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.hole}>does NOT fit: anything LLM-sized — TinyML is small CNNs/RNNs only</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   8.9 — The Arm Substrate
   ════════════════════════════════════════════════════════════ */

/* Cortex-M tiers by ML capability. */
export function CortexMTiers({ caption }: { caption?: string }) {
  const tiers = [
    { t: "M0/M0+", d: "tiny control — no DSP", c: C.off },
    { t: "M4 / M7", d: "DSP extension (MAC instr)", c: C.violet },
    { t: "M55 / M85", d: "+ Helium (MVE) vectors", c: ORANGE },
    { t: "M55/M85 + Ethos-U", d: "+ micro-NPU", c: C.on },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 140" width="100%" role="img" aria-label="Cortex-M tiers by ML capability">
        {tiers.map((t, i) => {
          const x = 14 + i * 137;
          return (
            <g key={`cm${i}`}>
              <rect x={x} y="44" width="124" height="54" rx="7" fill={`${t.c}14`} stroke={t.c} strokeWidth="1.4" />
              <text x={x + 62} y="66" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={t.c}>{t.t}</text>
              <foreignObject x={x + 4} y="72" width="116" height="24">
                <div style={{ fontFamily: mono, fontSize: "7px", color: C.muted, textAlign: "center", lineHeight: 1.2 }}>{t.d}</div>
              </foreignObject>
              {i < 3 && <text x={x + 128} y="74" fontFamily={mono} fontSize="9" fill={C.faint}>→</text>}
            </g>
          );
        })}
        <text x="280" y="28" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>increasing ML throughput → (the common substrate under most TinyML MCUs)</text>
        <text x="280" y="124" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>Helium = SIMD for microcontrollers (NEON's little sibling); Ethos-U = a licensable micro-NPU</text>
      </svg>
    </DiagramFrame>
  );
}

/* Ethos-U + Cortex-M: ops split between NPU and CPU. */
export function EthosUStack({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 180" width="100%" role="img" aria-label="Ethos-U NPU offload with CMSIS-NN fallback">
        <rect x="20" y="30" width="150" height="34" rx="6" fill={`${C.blue}14`} stroke={C.blue} strokeWidth="1.3" />
        <text x="95" y="48" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.blue}>TFLite Micro model</text>
        <text x="95" y="59" textAnchor="middle" fontFamily={mono} fontSize="6.8" fill={C.muted}>INT8 .tflite</text>
        <rect x="20" y="84" width="150" height="34" rx="6" fill={`${C.gate}14`} stroke={C.gate} strokeWidth="1.3" />
        <text x="95" y="102" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.gate}>Vela compiler</text>
        <text x="95" y="113" textAnchor="middle" fontFamily={mono} fontSize="6.8" fill={C.muted}>splits the graph</text>
        <line x1="95" y1="64" x2="95" y2="84" stroke={C.faint} strokeWidth="1.1" /><polygon points="95,84 91,77 99,77" fill={C.faint} />
        {/* NPU path */}
        <rect x="240" y="40" width="290" height="50" rx="8" fill={`${C.on}10`} stroke={C.on} strokeWidth="1.4" />
        <text x="385" y="60" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.on}>Ethos-U NPU — heavy ops (Conv, FC, pooling)</text>
        <text x="385" y="76" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>256–512 MAC/cycle · the 10–100× speedup</text>
        {/* CPU path */}
        <rect x="240" y="104" width="290" height="46" rx="8" fill={`${ORANGE}10`} stroke={ORANGE} strokeWidth="1.3" />
        <text x="385" y="124" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={ORANGE}>Cortex-M + CMSIS-NN — fallback ops</text>
        <text x="385" y="139" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>unsupported layers run on the CPU (Helium-accelerated)</text>
        <line x1="170" y1="101" x2="240" y2="65" stroke={C.on} strokeWidth="1.1" />
        <line x1="170" y1="101" x2="240" y2="126" stroke={ORANGE} strokeWidth="1.1" />
        <text x="280" y="172" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>the NPU runs what it can; the CPU handles the rest — the CPU-orchestrates / accelerator-computes split, in milliwatts</text>
      </svg>
    </DiagramFrame>
  );
}

/* Generic AI-MCU SoC block: M-core + NPU + memory + I/O. Reused by vendor lessons. */
function McuSoc({
  title, accent, cpu, npu, npuSpec, extras,
}: {
  title: string; accent: string; cpu: string; npu: string; npuSpec: string; extras: string[];
}) {
  return (
    <svg viewBox="0 0 560 180" width="100%" role="img" aria-label={title}>
      <rect x="20" y="28" width="520" height="120" rx="10" fill={`${accent}08`} stroke={accent} strokeWidth="1.5" />
      <text x="280" y="22" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={accent}>{title}</text>
      {/* CPU */}
      <rect x="40" y="48" width="150" height="50" rx="7" fill={`${C.blue}14`} stroke={C.blue} strokeWidth="1.3" />
      <text x="115" y="70" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.blue}>CPU</text>
      <foreignObject x="44" y="74" width="142" height="22"><div style={{ fontFamily: mono, fontSize: "7px", color: C.muted, textAlign: "center", lineHeight: 1.15 }}>{cpu}</div></foreignObject>
      {/* NPU */}
      <rect x="210" y="48" width="180" height="50" rx="7" fill={`${accent}1a`} stroke={accent} strokeWidth="1.6" />
      <text x="300" y="70" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={accent}>{npu}</text>
      <foreignObject x="214" y="74" width="172" height="22"><div style={{ fontFamily: mono, fontSize: "7px", color: C.text, textAlign: "center", lineHeight: 1.15, fontWeight: 700 }}>{npuSpec}</div></foreignObject>
      {/* memory/IO */}
      <rect x="410" y="48" width="110" height="50" rx="7" fill={`${C.violet}14`} stroke={C.violet} strokeWidth="1.2" />
      <text x="465" y="70" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.violet}>memory + I/O</text>
      <foreignObject x="414" y="74" width="102" height="22"><div style={{ fontFamily: mono, fontSize: "6.6px", color: C.muted, textAlign: "center", lineHeight: 1.1 }}>{extras[0]}</div></foreignObject>
      {/* bus + extras */}
      <line x1="190" y1="73" x2="210" y2="73" stroke={C.faint} strokeWidth="1.2" />
      <line x1="390" y1="73" x2="410" y2="73" stroke={C.faint} strokeWidth="1.2" />
      <text x="280" y="120" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>{extras[1]}</text>
      <text x="280" y="138" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.faint}>{extras[2]}</text>
    </svg>
  );
}

/* Generic toolchain flow: model → vendor tool → C → flash. Reused by vendor lessons. */
function VendorFlow({ accent, tool, toolSub }: { accent: string; tool: string; toolSub: string }) {
  const stages = [
    { t: "trained model", s: "TFLite / ONNX / Keras", c: C.blue },
    { t: tool, s: toolSub, c: accent },
    { t: "optimized C", s: "weights + NPU schedule", c: C.violet },
    { t: "flash + run", s: "on the MCU", c: C.on },
  ];
  return (
    <svg viewBox="0 0 560 110" width="100%" role="img" aria-label={`${tool} flow`}>
      {stages.map((s, i) => {
        const x = 16 + i * 138;
        return (
          <g key={`vf${i}`}>
            <rect x={x} y="34" width="120" height="44" rx="7" fill={`${s.c}14`} stroke={s.c} strokeWidth="1.4" />
            <text x={x + 60} y="54" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={s.c}>{s.t}</text>
            <foreignObject x={x + 4} y="58" width="112" height="18"><div style={{ fontFamily: mono, fontSize: "6.6px", color: C.muted, textAlign: "center", lineHeight: 1.1 }}>{s.s}</div></foreignObject>
            {i < 3 && <g><line x1={x + 120} y1="56" x2={x + 138} y2="56" stroke={C.faint} strokeWidth="1.2" /><polygon points={`${x + 138},56 ${x + 131},52 ${x + 131},60`} fill={C.faint} /></g>}
          </g>
        );
      })}
      <text x="280" y="22" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.muted}>import a standard model → vendor tool quantizes + maps to the NPU → C you compile in</text>
      <text x="280" y="98" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.faint}>same shape across vendors — the differences are the NPU and the tool name</text>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   8.10 — STM32 N6 / Neural-ART
   ════════════════════════════════════════════════════════════ */

export function Stm32N6Block({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <McuSoc title="STM32N6 — first STM32 with an NPU" accent={ORANGE}
        cpu="Cortex-M55 @ 800 MHz + Helium" npu="Neural-ART NPU" npuSpec="~600 GOPS INT8"
        extras={["4.2 MB SRAM", "+ image signal processor (ISP) → camera, H.264, audio", "real-time edge vision/audio at ~milliwatts"]} />
    </DiagramFrame>
  );
}

export function StEdgeAiFlow({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <VendorFlow accent={ORANGE} tool="ST Edge AI" toolSub="Cube.AI / X-CUBE-AI" />
    </DiagramFrame>
  );
}
