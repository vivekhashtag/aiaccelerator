import type { ReactNode } from "react";
import { C, DiagramFrame, mono } from "./_shared";

/* ════════════════════════════════════════════════════════════
   2.1 — CPU Architecture
   ════════════════════════════════════════════════════════════ */

/* Von Neumann: CPU (control + ALU + registers) sharing ONE bus with memory. */
export function VonNeumannDiagram({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={460}>
      <svg viewBox="0 0 460 300" width="100%" role="img" aria-label="Von Neumann architecture with a single shared bus">
        {/* CPU box */}
        <rect x="40" y="20" width="380" height="120" rx="10" fill={C.panel} stroke={C.blue} strokeWidth="1.5" />
        <text x="56" y="40" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.blue}>CPU</text>
        <rect x="64" y="50" width="130" height="40" rx="6" fill={C.panel2} stroke={C.line} />
        <text x="129" y="74" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.text}>Control Unit</text>
        <rect x="266" y="50" width="130" height="40" rx="6" fill={C.panel2} stroke={C.gate} strokeWidth="1.3" />
        <text x="331" y="69" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.gate}>ALU</text>
        <text x="331" y="82" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>compute</text>
        <rect x="64" y="100" width="332" height="28" rx="6" fill={C.panel2} stroke={C.electron} strokeWidth="1.2" />
        <text x="230" y="118" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.electron}>Registers</text>

        {/* the single shared bus */}
        <rect x="180" y="150" width="100" height="34" rx="6" fill="rgba(37,99,235,0.16)" stroke={C.blue} strokeWidth="1.5" />
        <text x="230" y="166" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.blue}>ONE BUS</text>
        <text x="230" y="178" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>addr · data · ctrl</text>
        <line x1="230" y1="140" x2="230" y2="150" stroke={C.blue} strokeWidth="2" />
        <line x1="230" y1="184" x2="230" y2="210" stroke={C.blue} strokeWidth="2" />

        {/* memory */}
        <rect x="40" y="210" width="380" height="60" rx="10" fill={C.panel} stroke={C.line} />
        <text x="230" y="236" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.text}>Main Memory</text>
        <text x="230" y="254" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>instructions + data share the same memory</text>

        <text x="300" y="172" fontFamily={mono} fontSize="9" fill={C.hole}>← one item / cycle = bottleneck</text>
      </svg>
    </DiagramFrame>
  );
}

/* Fetch–decode–execute–writeback as a 4-step cycle. */
export function FetchExecuteCycle({ caption }: { caption?: string }) {
  const steps = [
    { t: "FETCH", s: "PC → instruction", x: 230, y: 54, c: C.blue },
    { t: "DECODE", s: "read opcode + regs", x: 372, y: 150, c: C.gate },
    { t: "EXECUTE", s: "ALU computes", x: 230, y: 246, c: C.on },
    { t: "WRITE-BACK", s: "result → register", x: 88, y: 150, c: C.electron },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={460}>
      <svg viewBox="0 0 460 300" width="100%" role="img" aria-label="The fetch decode execute write-back cycle">
        <circle cx="230" cy="150" r="92" fill="none" stroke={C.line} strokeWidth="1.5" strokeDasharray="4 4" />
        {/* arrowheads around the loop */}
        {[ [322,108],[322,192],[138,192],[138,108] ].map(([x,y],i)=>(
          <polygon key={i} points={`${x},${y} ${x-5},${y-6} ${x+5},${y-6}`} fill={C.faint}
            transform={`rotate(${[40,140,220,320][i]} ${x} ${y})`} />
        ))}
        {steps.map((st) => (
          <g key={st.t}>
            <circle cx={st.x} cy={st.y} r="40" fill={C.panel2} stroke={st.c} strokeWidth="1.6" />
            <text x={st.x} y={st.y - 2} textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={st.c}>{st.t}</text>
            <text x={st.x} y={st.y + 13} textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>{st.s}</text>
          </g>
        ))}
        <text x="230" y="148" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.faint}>PC++</text>
        <text x="230" y="162" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>every cycle</text>
      </svg>
    </DiagramFrame>
  );
}

/* 5-stage pipeline overlap: instructions march diagonally through IF/ID/EX/ME/WB. */
export function PipelineOverlap({ caption }: { caption?: string }) {
  const stages = ["IF", "ID", "EX", "ME", "WB"];
  const stageColor: Record<string, string> = { IF: C.blue, ID: C.gate, EX: C.on, ME: C.electron, WB: C.violet };
  const cellW = 54, cellH = 30, x0 = 70, y0 = 46;
  return (
    <DiagramFrame caption={caption} maxWidth={600}>
      <svg viewBox="0 0 600 250" width="100%" role="img" aria-label="Five-stage pipeline with overlapping instructions">
        {/* cycle headers */}
        {Array.from({ length: 9 }, (_, c) => (
          <text key={c} x={x0 + c * cellW + cellW / 2} y={36} textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>{c + 1}</text>
        ))}
        <text x={x0 - 8} y={32} textAnchor="end" fontFamily={mono} fontSize="9" fill={C.faint}>cycle →</text>
        {/* 5 instructions, each shifted one cycle */}
        {Array.from({ length: 5 }, (_, r) => (
          <g key={r}>
            <text x={x0 - 10} y={y0 + r * (cellH + 6) + 20} textAnchor="end" fontFamily={mono} fontSize="10" fill={C.text}>I{r + 1}</text>
            {stages.map((s, c) => {
              const x = x0 + (r + c) * cellW;
              return (
                <g key={s}>
                  <rect x={x} y={y0 + r * (cellH + 6)} width={cellW - 4} height={cellH} rx="4"
                    fill={`${stageColor[s]}26`} stroke={stageColor[s]} strokeWidth="1.2" />
                  <text x={x + (cellW - 4) / 2} y={y0 + r * (cellH + 6) + 20} textAnchor="middle"
                    fontFamily={mono} fontSize="11" fontWeight="700" fill={stageColor[s]}>{s}</text>
                </g>
              );
            })}
          </g>
        ))}
        <text x="300" y="242" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>
          after the pipeline fills (cycle 5), one instruction completes every cycle → CPI ≈ 1.0
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* Data hazard solved by forwarding the EX result back to the next EX input. */
export function ForwardingDiagram({ caption }: { caption?: string }) {
  const stages = ["IF", "ID", "EX", "ME", "WB"];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 220" width="100%" role="img" aria-label="Pipeline forwarding path bypassing the register file">
        {[0, 1].map((r) => (
          <g key={r}>
            <text x={36} y={64 + r * 80} textAnchor="end" fontFamily={mono} fontSize="10" fill={C.text}>I{r + 1}</text>
            {stages.map((s, c) => {
              const x = 50 + (r + c) * 88;
              const isEX = s === "EX";
              return (
                <g key={s}>
                  <rect x={x} y={44 + r * 80} width="80" height="34" rx="5"
                    fill={isEX ? "rgba(5,150,105,0.18)" : C.panel2} stroke={isEX ? C.on : C.line} strokeWidth={isEX ? 1.6 : 1} />
                  <text x={x + 40} y={66 + r * 80} textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700"
                    fill={isEX ? C.on : C.text}>{s}</text>
                </g>
              );
            })}
          </g>
        ))}
        {/* forwarding path: I1 EX output → I2 EX input */}
        <path d="M 266 44 C 266 14, 414 14, 414 124" fill="none" stroke={C.gate} strokeWidth="2" strokeDasharray="5 4" />
        <polygon points="414,124 410,114 418,114" fill={C.gate} />
        <text x="340" y="12" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.gate}>forwarding path</text>
        <text x="280" y="200" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>
          I1&apos;s result is bypassed straight from EX into I2&apos;s EX — no waiting for write-back
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* SIMD: one instruction processes many lanes at once vs scalar one-at-a-time. */
export function SimdLanes({ caption }: { caption?: string }) {
  const lanes = 8;
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 240" width="100%" role="img" aria-label="Scalar versus SIMD vector execution">
        {/* scalar */}
        <text x="40" y="34" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.off}>SCALAR — one add per instruction</text>
        <rect x="40" y="44" width="90" height="30" rx="5" fill={C.panel2} stroke={C.off} />
        <text x="85" y="64" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>FADD</text>
        <line x1="130" y1="59" x2="160" y2="59" stroke={C.off} strokeWidth="1.4" />
        <rect x="160" y="44" width="40" height="30" rx="5" fill={C.ink} stroke={C.line} />
        <text x="180" y="64" textAnchor="middle" fontFamily={mono} fontSize="11" fill={C.text}>1</text>
        <text x="300" y="64" fontFamily={mono} fontSize="10" fill={C.faint}>… repeat 8× (8 instructions)</text>

        {/* SIMD */}
        <text x="40" y="120" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.blue}>SIMD (AVX-512) — one instruction, many lanes</text>
        <rect x="40" y="130" width="90" height="76" rx="5" fill="rgba(37,99,235,0.16)" stroke={C.blue} strokeWidth="1.5" />
        <text x="85" y="165" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.blue}>VADDPS</text>
        <text x="85" y="180" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>1 instr</text>
        {Array.from({ length: lanes }, (_, i) => {
          const x = 160 + i * 48;
          return (
            <g key={i}>
              <line x1="130" y1="168" x2={x} y2={144 + i * 0} stroke={C.blue} strokeWidth="1" opacity="0.4" />
              <rect x={x} y="144" width="40" height="48" rx="5" fill={C.panel2} stroke={C.blue} strokeWidth="1.1" />
              <text x={x + 20} y="172" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.electron}>+</text>
              <text x={x + 20} y="186" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>L{i}</text>
            </g>
          );
        })}
        <text x="280" y="226" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>
          AVX-512 = 16×FP32, 32×FP16 or 64×INT8 per instruction — the engine of CPU inference
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   2.2 — GPU Architecture
   ════════════════════════════════════════════════════════════ */

/* Few big latency-optimised cores vs a sea of small throughput cores. */
export function CpuVsGpuCores({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 250" width="100%" role="img" aria-label="CPU few large cores versus GPU thousands of small cores">
        <text x="140" y="28" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.gate}>CPU</text>
        <text x="140" y="44" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>few big cores · low latency</text>
        {Array.from({ length: 4 }, (_, i) => {
          const x = 40 + (i % 2) * 110, y = 58 + Math.floor(i / 2) * 84;
          return (
            <g key={i}>
              <rect x={x} y={y} width="96" height="70" rx="8" fill={C.panel2} stroke={C.gate} strokeWidth="1.5" />
              <text x={x + 48} y={y + 34} textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.gate}>core</text>
              <text x={x + 48} y={y + 50} textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>OoO · cache</text>
            </g>
          );
        })}

        <line x1="285" y1="50" x2="285" y2="220" stroke={C.line} strokeDasharray="3 4" />

        <text x="420" y="28" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.on}>GPU</text>
        <text x="420" y="44" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>1000s of small cores · high throughput</text>
        {Array.from({ length: 12 * 8 }, (_, i) => {
          const cols = 12, x = 312 + (i % cols) * 18, y = 58 + Math.floor(i / cols) * 18;
          return <rect key={i} x={x} y={y} width="13" height="13" rx="2" fill="rgba(5,150,105,0.22)" stroke={C.on} strokeWidth="0.7" />;
        })}
        <text x="280" y="244" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>
          CPU spends transistors on control + cache; GPU spends them on raw arithmetic units
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* SIMT: one warp instruction broadcast to 32 lockstep threads. */
export function SimtWarp({ caption }: { caption?: string }) {
  const shown = [0, 1, 2, 30, 31];
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 230" width="100%" role="img" aria-label="SIMT warp: one instruction, 32 threads">
        <rect x="170" y="20" width="180" height="40" rx="8" fill="rgba(5,150,105,0.16)" stroke={C.on} strokeWidth="1.5" />
        <text x="260" y="38" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.on}>FADD R2, R0, R1</text>
        <text x="260" y="52" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>one fetch + decode</text>
        <text x="365" y="44" fontFamily={mono} fontSize="9" fill={C.faint}>broadcast ↓</text>
        {shown.map((t, i) => {
          const x = i < 3 ? 40 + i * 88 : 304 + (i - 3) * 88;
          return (
            <g key={t}>
              <line x1="260" y1="60" x2={x + 36} y2="96" stroke={C.on} strokeWidth="1" opacity="0.35" />
              <rect x={x} y="96" width="72" height="54" rx="6" fill={C.panel2} stroke={C.line} />
              <text x={x + 36} y="116" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.text}>thr {t}</text>
              <text x={x + 36} y="134" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.electron}>R2[{t}]</text>
            </g>
          );
        })}
        <text x="260" y="124" textAnchor="middle" fontFamily={mono} fontSize="18" fill={C.faint}>· · ·</text>
        <text x="260" y="184" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.on}>32 threads = 1 warp, all in lockstep</text>
        <text x="260" y="204" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>
          divergent branches force both paths to run serially → throughput halves
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* Nested execution hierarchy: thread → warp → block → grid. */
export function GpuHierarchy({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 250" width="100%" role="img" aria-label="GPU execution hierarchy thread warp block grid">
        <rect x="20" y="20" width="480" height="210" rx="10" fill="none" stroke={C.on} strokeWidth="1.5" />
        <text x="34" y="40" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.on}>GRID — one kernel launch</text>
        {[0, 1].map((b) => (
          <g key={b}>
            <rect x={40 + b * 232} y={52} width="208" height="160" rx="8" fill={C.panel} stroke={C.gate} strokeWidth="1.3" />
            <text x={48 + b * 232} y={70} fontFamily={mono} fontSize="10" fontWeight="700" fill={C.gate}>BLOCK (≤1024 thr · shared mem)</text>
            {[0, 1].map((w) => (
              <g key={w}>
                <rect x={52 + b * 232} y={80 + w * 62} width="184" height="54" rx="6" fill={C.panel2} stroke={C.electron} strokeWidth="1.1" />
                <text x={60 + b * 232} y={96 + w * 62} fontFamily={mono} fontSize="9" fontWeight="700" fill={C.electron}>WARP = 32 threads</text>
                {Array.from({ length: 16 }, (_, t) => (
                  <rect key={t} x={60 + b * 232 + t * 11} y={102 + w * 62} width="8" height="20" rx="1.5" fill="rgba(14,156,147,0.3)" stroke={C.electron} strokeWidth="0.5" />
                ))}
              </g>
            ))}
          </g>
        ))}
        <text x="260" y="228" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>
          blocks are independent → add more SMs, more blocks run in parallel (this is why CUDA scales)
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* Tensor Core: a tile matrix multiply-accumulate D = A×B + C in one op. */
export function TensorCoreTile({ caption }: { caption?: string }) {
  const tile = (ox: number, oy: number, label: string, color: string) => (
    <g>
      {Array.from({ length: 16 }, (_, i) => {
        const x = ox + (i % 4) * 16, y = oy + Math.floor(i / 4) * 16;
        return <rect key={i} x={x} y={y} width="14" height="14" rx="2" fill={`${color}26`} stroke={color} strokeWidth="0.8" />;
      })}
      <text x={ox + 32} y={oy + 80} textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={color}>{label}</text>
    </g>
  );
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 180" width="100%" role="img" aria-label="Tensor core 4x4 matrix multiply accumulate">
        {tile(40, 30, "A", C.electron)}
        <text x="130" y="68" textAnchor="middle" fontFamily={mono} fontSize="18" fill={C.text}>×</text>
        {tile(150, 30, "B", C.gate)}
        <text x="240" y="68" textAnchor="middle" fontFamily={mono} fontSize="18" fill={C.text}>+</text>
        {tile(260, 30, "C", C.off)}
        <text x="350" y="68" textAnchor="middle" fontFamily={mono} fontSize="18" fill={C.text}>=</text>
        {tile(370, 30, "D", C.on)}
        <text x="260" y="138" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.blue}>
          D = A × B + C — a whole 4×4 tile per instruction
        </text>
        <text x="260" y="158" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>
          64 multiply-adds in one cycle (Volta) vs 1 for a plain CUDA core
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* Latency hiding: scheduler hops between warps to keep the ALU busy during stalls. */
export function WarpLatencyHiding({ caption }: { caption?: string }) {
  const rows = [
    { w: "W0", segs: [{ c: C.on, t: "run" }, { c: C.off, t: "stall — memory" }] },
    { w: "W1", segs: [{ c: C.ink, t: "" }, { c: C.on, t: "run" }, { c: C.off, t: "stall" }] },
    { w: "W2", segs: [{ c: C.ink, t: "" }, { c: C.ink, t: "" }, { c: C.on, t: "run" }] },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 200" width="100%" role="img" aria-label="GPU warp scheduler hides memory latency by switching warps">
        <text x="40" y="26" fontFamily={mono} fontSize="10" fill={C.muted}>time →</text>
        {rows.map((row, r) => (
          <g key={row.w}>
            <text x="36" y={62 + r * 44} textAnchor="end" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.electron}>{row.w}</text>
            {row.segs.map((seg, i) => {
              const x = 50 + i * 150, w = i === 1 ? 200 : 150;
              if (seg.c === C.ink) return null;
              return (
                <g key={i}>
                  <rect x={x} y={42 + r * 44} width={w} height="26" rx="4"
                    fill={seg.c === C.on ? "rgba(5,150,105,0.22)" : "rgba(100,116,139,0.22)"} stroke={seg.c} strokeWidth="1.2"
                    strokeDasharray={seg.c === C.off ? "4 3" : undefined} />
                  <text x={x + w / 2} y={59 + r * 44} textAnchor="middle" fontFamily={mono} fontSize="9"
                    fill={seg.c === C.on ? C.on : C.muted}>{seg.t}</text>
                </g>
              );
            })}
          </g>
        ))}
        {/* ALU busy bar */}
        <rect x="50" y="174" width="450" height="16" rx="4" fill="rgba(5,150,105,0.22)" stroke={C.on} strokeWidth="1" />
        <text x="275" y="186" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.on}>ALU stays busy the whole time — zero-overhead warp switching</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   2.3 — FPGA Architecture
   ════════════════════════════════════════════════════════════ */

/* 6-input LUT = 64-bit SRAM truth table feeding a 64:1 MUX. */
export function LutDiagram({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={480}>
      <svg viewBox="0 0 480 240" width="100%" role="img" aria-label="Six-input look-up table as SRAM plus multiplexer">
        {/* SRAM truth table */}
        <rect x="40" y="30" width="150" height="180" rx="8" fill={C.panel} stroke={C.electron} strokeWidth="1.4" />
        <text x="115" y="50" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.electron}>64 SRAM bits</text>
        <text x="115" y="64" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>the truth table</text>
        {Array.from({ length: 24 }, (_, i) => {
          const x = 56 + (i % 6) * 22, y = 76 + Math.floor(i / 6) * 22;
          const bit = (i * 7) % 3 === 0 ? "1" : "0";
          return (
            <g key={i}>
              <rect x={x} y={y} width="18" height="18" rx="2" fill={C.panel2} stroke={C.line} />
              <text x={x + 9} y={y + 13} textAnchor="middle" fontFamily={mono} fontSize="9" fill={bit === "1" ? C.electron : C.faint}>{bit}</text>
            </g>
          );
        })}
        <text x="115" y="202" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>… 64 entries</text>

        {/* MUX */}
        <polygon points="250,40 320,75 320,165 250,200" fill={C.panel2} stroke={C.gate} strokeWidth="1.5" />
        <text x="285" y="115" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.gate}>64:1</text>
        <text x="285" y="130" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>MUX</text>
        <line x1="190" y1="120" x2="250" y2="120" stroke={C.electron} strokeWidth="1.4" />

        {/* select inputs */}
        {Array.from({ length: 6 }, (_, i) => (
          <g key={i}>
            <line x1="285" y1="200" x2="285" y2="218" stroke={C.blue} strokeWidth="1" />
          </g>
        ))}
        <text x="285" y="232" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.blue}>6 inputs (select lines)</text>

        {/* output */}
        <line x1="320" y1="120" x2="400" y2="120" stroke={C.on} strokeWidth="1.6" />
        <text x="400" y="116" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.on}>any f(6 vars)</text>
        <text x="360" y="138" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>out</text>
      </svg>
    </DiagramFrame>
  );
}

/* FPGA fabric: a sea of CLBs interleaved with DSP and BRAM columns + routing. */
export function FpgaFabric({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 230" width="100%" role="img" aria-label="FPGA fabric of LUTs, flip-flops, DSP and BRAM blocks with routing">
        {/* routing grid */}
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`v${i}`} x1={40 + i * 44} y1="30" x2={40 + i * 44} y2="190" stroke={C.line} strokeWidth="0.6" />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <line key={`h${i}`} x1="40" y1={30 + i * 40} x2="480" y2={30 + i * 40} stroke={C.line} strokeWidth="0.6" />
        ))}
        {Array.from({ length: 40 }, (_, i) => {
          const col = i % 10, row = Math.floor(i / 10);
          const x = 48 + col * 44, y = 38 + row * 40;
          const isDSP = col === 3;
          const isBRAM = col === 7;
          const c = isDSP ? C.gate : isBRAM ? C.violet : C.electron;
          const label = isDSP ? "DSP" : isBRAM ? "BRAM" : "CLB";
          return (
            <g key={i}>
              <rect x={x} y={y} width="28" height="24" rx="3" fill={`${c}22`} stroke={c} strokeWidth="1" />
              <text x={x + 14} y={y + 16} textAnchor="middle" fontFamily={mono} fontSize="7" fontWeight="700" fill={c}>{label}</text>
            </g>
          );
        })}
        <text x="260" y="214" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>
          CLB (LUT+FF) logic · DSP multiply-accumulate columns · BRAM memory · all wired by programmable routing
        </text>
        <text x="260" y="228" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>routing fabric = 60–70% of chip area</text>
      </svg>
    </DiagramFrame>
  );
}

/* DSP block: pre-adder → multiplier → accumulator (P = A + B×C). */
export function DspBlock({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 170" width="100%" role="img" aria-label="FPGA DSP block multiply-accumulate pipeline">
        {/* inputs */}
        <text x="30" y="54" fontFamily={mono} fontSize="10" fill={C.electron}>A</text>
        <text x="30" y="84" fontFamily={mono} fontSize="10" fill={C.electron}>D</text>
        <text x="30" y="118" fontFamily={mono} fontSize="10" fill={C.gate}>B</text>
        {/* pre-adder */}
        <circle cx="90" cy="68" r="20" fill={C.panel2} stroke={C.electron} strokeWidth="1.4" />
        <text x="90" y="72" textAnchor="middle" fontFamily={mono} fontSize="13" fill={C.electron}>±</text>
        <line x1="42" y1="54" x2="72" y2="60" stroke={C.line} /><line x1="42" y1="84" x2="72" y2="76" stroke={C.line} />
        {/* multiplier */}
        <rect x="150" y="44" width="70" height="60" rx="8" fill={C.panel2} stroke={C.gate} strokeWidth="1.4" />
        <text x="185" y="78" textAnchor="middle" fontFamily={mono} fontSize="16" fontWeight="700" fill={C.gate}>×</text>
        <line x1="110" y1="68" x2="150" y2="68" stroke={C.line} />
        <line x1="42" y1="114" x2="150" y2="92" stroke={C.line} />
        {/* accumulator */}
        <circle cx="290" cy="74" r="22" fill={C.panel2} stroke={C.on} strokeWidth="1.5" />
        <text x="290" y="79" textAnchor="middle" fontFamily={mono} fontSize="16" fill={C.on}>+</text>
        <line x1="220" y1="74" x2="268" y2="74" stroke={C.line} />
        {/* accumulator register feedback */}
        <rect x="360" y="58" width="64" height="34" rx="6" fill={C.panel} stroke={C.electron} strokeWidth="1.2" />
        <text x="392" y="80" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.electron}>P reg</text>
        <line x1="312" y1="74" x2="360" y2="74" stroke={C.on} strokeWidth="1.4" />
        <path d="M 392 92 C 392 130, 290 130, 290 96" fill="none" stroke={C.faint} strokeWidth="1.2" strokeDasharray="4 3" />
        <polygon points="290,96 286,106 294,106" fill={C.faint} />
        <text x="460" y="78" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.text}>→ out</text>
        <text x="270" y="152" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>
          hard-coded 27×18 multiply-accumulate, up to ~740 MHz — one DSP per filter tap
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* Zynq SoC: ARM Processing System + Programmable Logic joined by AXI. */
export function ZynqSoC({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={500}>
      <svg viewBox="0 0 500 220" width="100%" role="img" aria-label="Zynq SoC combining ARM processing system and FPGA programmable logic">
        {/* PS */}
        <rect x="30" y="30" width="190" height="160" rx="10" fill={C.panel} stroke={C.gate} strokeWidth="1.5" />
        <text x="125" y="52" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.gate}>PS — Processing System</text>
        <rect x="50" y="64" width="70" height="44" rx="6" fill={C.panel2} stroke={C.line} />
        <text x="85" y="84" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.text}>ARM A9</text>
        <text x="85" y="98" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>core 0</text>
        <rect x="130" y="64" width="70" height="44" rx="6" fill={C.panel2} stroke={C.line} />
        <text x="165" y="84" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.text}>ARM A9</text>
        <text x="165" y="98" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>core 1</text>
        <rect x="50" y="120" width="150" height="50" rx="6" fill={C.panel2} stroke={C.line} />
        <text x="125" y="140" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>L1/L2 · DDR ctrl · USB</text>
        <text x="125" y="156" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>Ethernet · runs Python</text>

        {/* AXI */}
        <rect x="228" y="92" width="44" height="40" rx="6" fill="rgba(37,99,235,0.18)" stroke={C.blue} strokeWidth="1.5" />
        <text x="250" y="110" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.blue}>AXI</text>
        <text x="250" y="124" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>DMA</text>
        <line x1="220" y1="112" x2="228" y2="112" stroke={C.blue} strokeWidth="2" />
        <line x1="272" y1="112" x2="280" y2="112" stroke={C.blue} strokeWidth="2" />

        {/* PL */}
        <rect x="280" y="30" width="190" height="160" rx="10" fill={C.panel} stroke={C.electron} strokeWidth="1.5" />
        <text x="375" y="52" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.electron}>PL — Programmable Logic</text>
        {Array.from({ length: 12 }, (_, i) => {
          const x = 300 + (i % 4) * 42, y = 66 + Math.floor(i / 4) * 38;
          return <rect key={i} x={x} y={y} width="34" height="30" rx="3" fill={`${C.electron}1f`} stroke={C.electron} strokeWidth="0.8" />;
        })}
        <text x="375" y="182" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>LUTs · DSPs · BRAM = your accelerator</text>
        <text x="250" y="210" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>
          ARM runs the program; the FPGA fabric IS the custom neural-net accelerator (Module 8)
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   2.4 — Memory Hierarchy
   ════════════════════════════════════════════════════════════ */

/* The memory pyramid: fast+small at top, slow+huge at bottom. */
export function MemoryPyramid({ caption }: { caption?: string }) {
  const levels = [
    { n: "Registers", lat: "0 cyc", cap: "~1 KB", c: C.electron },
    { n: "L1 cache", lat: "4–5 cyc", cap: "32–64 KB", c: C.on },
    { n: "L2 cache", lat: "12–15 cyc", cap: "256 KB–2 MB", c: C.teal },
    { n: "L3 (LLC)", lat: "40–80 cyc", cap: "8–192 MB", c: C.blue },
    { n: "DRAM", lat: "300–400 cyc", cap: "8 GB–12 TB", c: C.gate },
    { n: "SSD / NVMe", lat: "~100 µs", cap: "256 GB–32 TB", c: C.off },
  ];
  const topW = 120, botW = 470, x0 = 25, rowH = 30, gap = 4;
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 230" width="100%" role="img" aria-label="The memory hierarchy pyramid from registers to SSD">
        {levels.map((lv, i) => {
          const t = i / (levels.length - 1);
          const w = topW + (botW - topW) * t;
          const x = x0 + (botW - w) / 2 + (540 - botW - 2 * x0) / 2;
          const y = 20 + i * (rowH + gap);
          return (
            <g key={lv.n}>
              <rect x={x} y={y} width={w} height={rowH} rx="4" fill={`${lv.c}22`} stroke={lv.c} strokeWidth="1.3" />
              <text x="270" y={y + 20} textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={lv.c}>{lv.n}</text>
              <text x={x - 6} y={y + 20} textAnchor="end" fontFamily={mono} fontSize="9" fill={C.muted}>{lv.lat}</text>
              <text x={x + w + 6} y={y + 20} textAnchor="start" fontFamily={mono} fontSize="9" fill={C.muted}>{lv.cap}</text>
            </g>
          );
        })}
        <text x="12" y="14" fontFamily={mono} fontSize="8" fill={C.faint}>latency</text>
        <text x="528" y="14" textAnchor="end" fontFamily={mono} fontSize="8" fill={C.faint}>capacity</text>
        <text x="270" y="226" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>each step down: ~10× slower, but far larger and cheaper per bit</text>
      </svg>
    </DiagramFrame>
  );
}

/* The memory wall: CPU speed and DRAM speed diverge over decades. */
export function MemoryWall({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 240" width="100%" role="img" aria-label="The memory wall: CPU performance outpacing DRAM over time">
        {/* axes */}
        <line x1="60" y1="200" x2="500" y2="200" stroke={C.faint} strokeWidth="1.2" />
        <line x1="60" y1="30" x2="60" y2="200" stroke={C.faint} strokeWidth="1.2" />
        <text x="280" y="228" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>1980 → 2025</text>
        <text x="24" y="115" fontFamily={mono} fontSize="10" fill={C.muted} transform="rotate(-90 24 115)">performance (log)</text>
        {/* CPU curve (steep) */}
        <path d="M 60 196 C 200 188, 320 90, 500 40" fill="none" stroke={C.blue} strokeWidth="2.4" />
        <text x="470" y="32" textAnchor="end" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.blue}>CPU speed</text>
        {/* DRAM curve (shallow) */}
        <path d="M 60 196 C 220 192, 360 178, 500 166" fill="none" stroke={C.gate} strokeWidth="2.4" />
        <text x="470" y="160" textAnchor="end" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.gate}>DRAM speed</text>
        {/* the gap */}
        <line x1="500" y1="40" x2="500" y2="166" stroke={C.hole} strokeWidth="1.4" strokeDasharray="4 3" />
        <text x="512" y="106" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.hole}>the</text>
        <text x="512" y="120" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.hole}>wall</text>
        <text x="280" y="218" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>
          gap grew to &gt;200:1 — memory, not compute, is now the bottleneck
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* Coalesced vs uncoalesced memory access by a warp. */
export function CoalescingDiagram({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 250" width="100%" role="img" aria-label="Coalesced versus uncoalesced GPU memory access">
        {/* coalesced */}
        <text x="40" y="30" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.on}>COALESCED — contiguous</text>
        {Array.from({ length: 8 }, (_, i) => (
          <g key={i}>
            <rect x={40 + i * 30} y="42" width="26" height="22" rx="3" fill="rgba(5,150,105,0.2)" stroke={C.on} strokeWidth="0.9" />
            <text x={53 + i * 30} y="58" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.text}>t{i}</text>
            <line x1={53 + i * 30} y1="64" x2={53 + i * 30} y2="80" stroke={C.on} strokeWidth="0.8" />
          </g>
        ))}
        <rect x="40" y="80" width="240" height="22" rx="4" fill="rgba(5,150,105,0.16)" stroke={C.on} strokeWidth="1.3" />
        <text x="160" y="96" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.on}>1 × 128-byte transaction → 100% used</text>

        {/* uncoalesced */}
        <text x="40" y="142" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.hole}>UNCOALESCED — scattered</text>
        {Array.from({ length: 8 }, (_, i) => {
          const target = (i * 3) % 8;
          return (
            <g key={i}>
              <rect x={40 + i * 30} y="154" width="26" height="22" rx="3" fill="rgba(225,29,72,0.2)" stroke={C.hole} strokeWidth="0.9" />
              <text x={53 + i * 30} y="170" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.text}>t{i}</text>
              <line x1={53 + i * 30} y1="176" x2={50 + target * 30 + 13} y2="196" stroke={C.hole} strokeWidth="0.7" opacity="0.6" />
            </g>
          );
        })}
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={40 + i * 30} y="196" width="26" height="18" rx="3" fill={C.ink} stroke={C.hole} strokeWidth="0.8" strokeDasharray="2 2" />
        ))}
        <text x="160" y="232" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.hole}>up to 32 transactions → 12.5% used</text>
        <text x="440" y="232" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>keep adjacent threads on adjacent addresses</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   2.5 — The Roofline Model
   ════════════════════════════════════════════════════════════ */

/* The roofline plot: memory-bandwidth slope + compute ceiling meeting at the ridge. */
export function RooflineDiagram({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 300" width="100%" role="img" aria-label="The roofline model plotting performance against arithmetic intensity">
        {/* axes */}
        <line x1="70" y1="250" x2="520" y2="250" stroke={C.faint} strokeWidth="1.2" />
        <line x1="70" y1="40" x2="70" y2="250" stroke={C.faint} strokeWidth="1.2" />
        <text x="295" y="284" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>Arithmetic Intensity (FLOP/byte, log)</text>
        <text x="30" y="150" fontFamily={mono} fontSize="10" fill={C.muted} transform="rotate(-90 30 150)">Performance (TFLOPS, log)</text>

        {/* memory roof (slope 1) up to ridge, then compute roof (flat) */}
        <line x1="70" y1="250" x2="300" y2="80" stroke={C.gate} strokeWidth="2.6" />
        <line x1="300" y1="80" x2="520" y2="80" stroke={C.blue} strokeWidth="2.6" />
        {/* ridge marker */}
        <line x1="300" y1="80" x2="300" y2="250" stroke={C.line} strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="300" cy="80" r="4" fill={C.text} />
        <text x="300" y="68" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.text}>ridge point</text>

        {/* region labels */}
        <text x="160" y="150" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.gate}>memory-</text>
        <text x="160" y="164" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.gate}>bound</text>
        <text x="190" y="120" fontFamily={mono} fontSize="9" fill={C.muted}>P = BW × AI</text>
        <text x="410" y="64" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.blue}>compute-bound</text>
        <text x="410" y="100" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>P = peak TFLOPS</text>

        {/* workload dots */}
        <circle cx="120" cy="220" r="4" fill={C.hole} /><text x="128" y="224" fontFamily={mono} fontSize="8" fill={C.muted}>LLM batch=1 (AI≈10)</text>
        <circle cx="300" cy="80" r="4" fill={C.electron} /><text x="240" y="98" fontFamily={mono} fontSize="8" fill={C.muted}>medium matmul</text>
        <circle cx="450" cy="80" r="4" fill={C.on} /><text x="436" y="100" fontFamily={mono} fontSize="8" fill={C.muted}>large matmul (683)</text>
        <text x="295" y="298" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>left of ridge → buy bandwidth · right of ridge → buy TOPS</text>
      </svg>
    </DiagramFrame>
  );
}

/* Arithmetic intensity spectrum placing AI workloads from memory- to compute-bound. */
export function ArithmeticIntensitySpectrum({ caption }: { caption?: string }) {
  const marks = [
    { ai: "0.04", n: "vector copy", c: C.hole },
    { ai: "0.5", n: "GELU", c: C.hole },
    { ai: "12", n: "attn N=128", c: C.gate },
    { ai: "171", n: "matmul n=1024", c: C.electron },
    { ai: "683", n: "matmul n=4096", c: C.on },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={580}>
      <svg viewBox="0 0 580 170" width="100%" role="img" aria-label="Arithmetic intensity spectrum of AI workloads">
        <defs>
          <linearGradient id="aispec" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={C.hole} />
            <stop offset="50%" stopColor={C.gate} />
            <stop offset="100%" stopColor={C.on} />
          </linearGradient>
        </defs>
        <rect x="40" y="70" width="500" height="20" rx="6" fill="url(#aispec)" opacity="0.85" />
        <text x="50" y="60" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.hole}>← memory-bound</text>
        <text x="530" y="60" textAnchor="end" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.on}>compute-bound →</text>
        {marks.map((m, i) => {
          const x = 60 + i * 118;
          return (
            <g key={m.n}>
              <line x1={x} y1="66" x2={x} y2="94" stroke={m.c} strokeWidth="1.6" />
              <circle cx={x} cy="80" r="4" fill={m.c} />
              <text x={x} y="112" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={m.c}>{m.ai}</text>
              <text x={x} y="126" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>{m.n}</text>
            </g>
          );
        })}
        <text x="290" y="152" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>
          quantization &amp; batching push a workload rightward — toward full Tensor-Core utilisation
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   2.6 — Parallelism & Pipelining
   ════════════════════════════════════════════════════════════ */

/* Amdahl's law: speedup saturates at 1/(1-f) no matter how many cores. */
export function AmdahlCurve({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 250" width="100%" role="img" aria-label="Amdahl's law speedup curve flattening to an asymptote">
        <line x1="60" y1="210" x2="480" y2="210" stroke={C.faint} strokeWidth="1.2" />
        <line x1="60" y1="30" x2="60" y2="210" stroke={C.faint} strokeWidth="1.2" />
        <text x="270" y="240" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>number of processors N →</text>
        <text x="28" y="130" fontFamily={mono} fontSize="10" fill={C.muted} transform="rotate(-90 28 130)">speedup</text>

        {/* asymptote */}
        <line x1="60" y1="60" x2="480" y2="60" stroke={C.hole} strokeWidth="1.3" strokeDasharray="5 4" />
        <text x="476" y="52" textAnchor="end" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.hole}>ceiling = 1/(1−f) = 20×</text>

        {/* curve (f=0.95) flattening */}
        <path d="M 60 200 C 120 150, 180 95, 280 75 C 360 64, 420 62, 480 61" fill="none" stroke={C.blue} strokeWidth="2.6" />
        {/* ideal linear (dashed) for contrast */}
        <line x1="60" y1="210" x2="200" y2="30" stroke={C.faint} strokeWidth="1.2" strokeDasharray="3 3" />
        <text x="206" y="38" fontFamily={mono} fontSize="9" fill={C.faint}>ideal (linear)</text>

        <text x="270" y="200" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>
          with 5% serial code, 1024 cores still buys only ~20× — the serial part dominates
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* Three flavours of parallelism: data, tensor, pipeline. */
export function ParallelismTypes({ caption }: { caption?: string }) {
  const panel = (ox: number, title: string, color: string, body: ReactNode) => (
    <g>
      <rect x={ox} y={34} width="150" height="150" rx="10" fill={C.panel} stroke={color} strokeWidth="1.4" />
      <text x={ox + 75} y={54} textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={color}>{title}</text>
      {body}
    </g>
  );
  return (
    <DiagramFrame caption={caption} maxWidth={580}>
      <svg viewBox="0 0 580 220" width="100%" role="img" aria-label="Data, tensor and pipeline parallelism across GPUs">
        {/* Data parallel: full model copy per GPU, different data shards */}
        {panel(20, "DATA PARALLEL", C.on, (
          <g>
            {[0, 1].map((g) => (
              <g key={g}>
                <rect x={36 + g * 64} y={68} width="50" height="60" rx="6" fill={`${C.on}22`} stroke={C.on} strokeWidth="1" />
                <text x={61 + g * 64} y={92} textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.text}>full</text>
                <text x={61 + g * 64} y={104} textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.text}>model</text>
                <text x={61 + g * 64} y={146} textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>data {g}</text>
              </g>
            ))}
            <text x="95" y="174" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.faint}>AllReduce gradients</text>
          </g>
        ))}
        {/* Tensor parallel: one matrix split across GPUs */}
        {panel(215, "TENSOR PARALLEL", C.gate, (
          <g>
            {[0, 1].map((g) => (
              <rect key={g} x={236 + g * 52} y={68} width="48" height="74" rx="6" fill={`${C.gate}22`} stroke={C.gate} strokeWidth="1" />
            ))}
            <text x="290" y="100" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.text}>½W</text>
            <text x="342" y="100" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.text}>½W</text>
            <text x="290" y="160" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>one matrix, split columns</text>
          </g>
        ))}
        {/* Pipeline parallel: layers split, assembly-line */}
        {panel(410, "PIPELINE PARALLEL", C.violet, (
          <g>
            {[0, 1, 2].map((g) => (
              <g key={g}>
                <rect x={425} y={66 + g * 30} width="120" height="24" rx="5" fill={`${C.violet}22`} stroke={C.violet} strokeWidth="1" />
                <text x={485} y={82 + g * 30} textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.text}>layers {g * 20}–{g * 20 + 19}</text>
                {g < 2 && <text x={485} y={94 + g * 30} textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>↓</text>}
              </g>
            ))}
          </g>
        ))}
        <text x="290" y="206" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>
          split the data · split each weight matrix · split the layers — combined for 70B+ models
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* Micro-batching fills the pipeline so stages overlap instead of idling. */
export function MicroBatchPipeline({ caption }: { caption?: string }) {
  const N = 4; // stages (GPUs)
  const M = 4; // micro-batches
  const colors = [C.blue, C.gate, C.on, C.violet];
  const cw = 46, ch = 26, x0 = 80, y0 = 44;
  return (
    <DiagramFrame caption={caption} maxWidth={580}>
      <svg viewBox="0 0 580 220" width="100%" role="img" aria-label="Pipeline parallelism with micro-batching overlapping stages">
        <text x="40" y="32" fontFamily={mono} fontSize="9" fill={C.muted}>time →</text>
        {Array.from({ length: N }, (_, stage) => (
          <g key={stage}>
            <text x={x0 - 10} y={y0 + stage * (ch + 8) + 18} textAnchor="end" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.text}>GPU{stage}</text>
            {Array.from({ length: M }, (_, mb) => {
              const x = x0 + (stage + mb) * cw;
              return (
                <g key={mb}>
                  <rect x={x} y={y0 + stage * (ch + 8)} width={cw - 4} height={ch} rx="4"
                    fill={`${colors[mb]}2a`} stroke={colors[mb]} strokeWidth="1.1" />
                  <text x={x + (cw - 4) / 2} y={y0 + stage * (ch + 8) + 17} textAnchor="middle"
                    fontFamily={mono} fontSize="9" fontWeight="700" fill={colors[mb]}>µb{mb}</text>
                </g>
              );
            })}
          </g>
        ))}
        {/* bubble markers at the start/end */}
        <text x="300" y="186" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>
          while GPU0 starts µb2, GPU1 runs µb1, GPU2 runs µb0 — stages overlap like an assembly line
        </text>
        <text x="300" y="204" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>
          efficiency = M / (M + N − 1) → 100% as micro-batches grow
        </text>
      </svg>
    </DiagramFrame>
  );
}

