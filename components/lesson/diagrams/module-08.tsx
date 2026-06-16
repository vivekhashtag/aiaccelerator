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
