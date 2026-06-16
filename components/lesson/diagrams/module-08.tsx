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
