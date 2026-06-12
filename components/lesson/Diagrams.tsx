import type { ReactNode } from "react";

/* ────────────────────────────────────────────────────────────
   Hand-authored SVG diagrams for the lessons.

   These are the "images" of the course: vector figures drawn in
   code, so they ALWAYS render, never 404, carry no licensing
   baggage, and are guaranteed to match the concept (we draw
   exactly what the prose describes). Server components, no hooks.
   Registered in lib/mdx.ts; used inline in the MDX lessons.

   Palette mirrors styles/tokens.css semantic colors so a figure
   reads the same in Module 1 and Module 10.
   ──────────────────────────────────────────────────────────── */

/* Light-theme palette (experiment, 2026-06-12): figures sit on white cards,
   so structural fills are light grays and labels are dark. Semantic accent
   colors are the darker shades that read well on white. To revert to the
   dark theme, restore the previous values. */
const C = {
  electron: "#0e9c93", // carriers / inversion layer / N-type
  gate: "#d97706", // gate / control
  on: "#059669", // conducting / HIGH
  off: "#64748b", // off / depleted
  teal: "#0d9488", // module-1 accent
  blue: "#2563eb", // module-2 accent / "why it matters"
  violet: "#7c3aed", // secondary accent (memory / model parallel)
  hole: "#e11d48", // holes / P-type
  ink: "#eef2f7", // deepest fill (lightest gray)
  panel: "#f1f5f9", // raised fill
  panel2: "#e2e8f0", // elevated fill
  line: "rgba(15,23,42,0.18)",
  faint: "rgba(15,23,42,0.34)",
  muted: "rgba(15,23,42,0.55)",
  text: "#0f172a",
};

/* Shared frame: dark card + centered SVG + caption (mirrors <Figure>). */
function DiagramFrame({
  children,
  caption,
  maxWidth = 560,
}: {
  children: ReactNode;
  caption?: string;
  maxWidth?: number;
}) {
  return (
    <figure className="not-prose my-8">
      <div
        className="rounded-xl p-4 sm:p-5 flex justify-center"
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ width: "100%", maxWidth }}>{children}</div>
      </div>
      {caption && (
        <figcaption
          className="text-center text-[13px] mt-2.5"
          style={{ color: "var(--text-muted)" }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

const mono = "ui-monospace, 'SF Mono', monospace";

/* ════════════════════════════════════════════════════════════
   1.1 — Semiconductor Basics
   ════════════════════════════════════════════════════════════ */

/* Conductor ↔ semiconductor ↔ insulator spectrum. */
export function ConductivitySpectrum({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={620}>
      <svg viewBox="0 0 620 190" width="100%" role="img"
        aria-label="Conductivity spectrum from insulators to semiconductors to conductors">
        <defs>
          <linearGradient id="cond" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={C.hole} />
            <stop offset="42%" stopColor={C.gate} />
            <stop offset="58%" stopColor={C.teal} />
            <stop offset="100%" stopColor={C.on} />
          </linearGradient>
        </defs>

        {/* zone titles */}
        <text x="120" y="34" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.hole}>INSULATORS</text>
        <text x="310" y="34" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.teal}>SEMICONDUCTORS</text>
        <text x="500" y="34" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.on}>CONDUCTORS</text>

        {/* the bar */}
        <rect x="40" y="60" width="540" height="34" rx="6" fill="url(#cond)" opacity="0.9" />
        {/* zone dividers */}
        <line x1="227" y1="58" x2="227" y2="96" stroke={C.ink} strokeWidth="2" strokeDasharray="3 3" />
        <line x1="393" y1="58" x2="393" y2="96" stroke={C.ink} strokeWidth="2" strokeDasharray="3 3" />

        {/* controllable highlight on the middle */}
        <rect x="229" y="56" width="162" height="42" rx="6" fill="none" stroke={C.teal} strokeWidth="2" />
        <text x="310" y="120" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.teal}>◆ conductivity is CONTROLLABLE</text>

        {/* example materials */}
        <text x="120" y="120" textAnchor="middle" fontFamily={mono} fontSize="11" fill={C.muted}>glass · rubber</text>
        <text x="500" y="120" textAnchor="middle" fontFamily={mono} fontSize="11" fill={C.muted}>copper · gold</text>
        <text x="310" y="138" textAnchor="middle" fontFamily={mono} fontSize="11" fill={C.muted}>silicon · germanium · GaAs</text>

        {/* resistance arrow */}
        <line x1="40" y1="166" x2="580" y2="166" stroke={C.faint} strokeWidth="1.5" />
        <polygon points="580,166 572,162 572,170" fill={C.faint} />
        <text x="44" y="183" textAnchor="start" fontFamily={mono} fontSize="10" fill={C.faint}>high resistance</text>
        <text x="576" y="183" textAnchor="end" fontFamily={mono} fontSize="10" fill={C.faint}>low resistance</text>
      </svg>
    </DiagramFrame>
  );
}

/* Silicon covalent-bond lattice: a central atom sharing 4 electron pairs. */
export function SiliconLattice({ caption }: { caption?: string }) {
  const cx = 220, cy = 180, d = 120, r = 28;
  const neighbors = [
    [cx, cy - d], [cx, cy + d], [cx - d, cy], [cx + d, cy],
  ];
  const atom = (x: number, y: number, label = "Si", highlight = false) => (
    <g key={`${x}-${y}`}>
      <circle cx={x} cy={y} r={r} fill={highlight ? C.panel2 : C.panel}
        stroke={highlight ? C.teal : C.line} strokeWidth={highlight ? 2 : 1.2} />
      <text x={x} y={y - 1} textAnchor="middle" fontFamily={mono} fontSize="14" fontWeight="700" fill={C.text}>{label}</text>
      <text x={x} y={y + 12} textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>+4</text>
    </g>
  );
  return (
    <DiagramFrame caption={caption} maxWidth={440}>
      <svg viewBox="0 0 440 360" width="100%" role="img" aria-label="Silicon crystal lattice with covalent bonds">
        {/* bonds (double lines = shared electron pair) with 2 electrons each */}
        {neighbors.map(([x, y], i) => {
          const mx = (cx + x) / 2, my = (cy + y) / 2;
          const horizontal = y === cy;
          const off = 4;
          return (
            <g key={i}>
              <line x1={cx} y1={cy} x2={x} y2={y}
                stroke={C.line} strokeWidth="6" transform={horizontal ? `translate(0,${-off})` : `translate(${-off},0)`} />
              <line x1={cx} y1={cy} x2={x} y2={y}
                stroke={C.line} strokeWidth="6" transform={horizontal ? `translate(0,${off})` : `translate(${off},0)`} />
              {/* the two shared electrons */}
              <circle cx={horizontal ? mx : mx - off} cy={horizontal ? my - off : my} r="3.5" fill={C.electron} />
              <circle cx={horizontal ? mx : mx + off} cy={horizontal ? my + off : my} r="3.5" fill={C.electron} />
            </g>
          );
        })}
        {neighbors.map(([x, y]) => atom(x, y))}
        {atom(cx, cy, "Si", true)}
        {/* legend */}
        <circle cx="56" cy="334" r="4" fill={C.electron} />
        <text x="68" y="338" fontFamily={mono} fontSize="11" fill={C.muted}>shared (bonding) electron</text>
      </svg>
    </DiagramFrame>
  );
}

/* N-type vs P-type doping shown as 5-atom clusters (centre = dopant). */
export function DopingDiagram({ caption }: { caption?: string }) {
  const r = 24;
  const cluster = (
    ox: number,
    dopant: string,
    accent: string,
    title: string,
    sub: string,
    kind: "n" | "p"
  ) => {
    const cx = ox + 140, cy = 165, d = 92;
    const nb = [[cx, cy - d], [cx, cy + d], [cx - d, cy], [cx + d, cy]] as const;
    const si = (x: number, y: number) => (
      <g key={`s${x}-${y}`}>
        <circle cx={x} cy={y} r={r} fill={C.panel} stroke={C.line} strokeWidth="1.2" />
        <text x={x} y={y + 4} textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.text}>Si</text>
      </g>
    );
    return (
      <g>
        <text x={cx} y="40" textAnchor="middle" fontFamily={mono} fontSize="14" fontWeight="700" fill={accent}>{title}</text>
        {/* bonds */}
        {nb.map(([x, y], i) => {
          const missing = kind === "p" && i === 3; // one bond short on P-type
          return (
            <line key={i} x1={cx} y1={cy} x2={x} y2={y}
              stroke={missing ? C.hole : C.line}
              strokeWidth={missing ? 2 : 4}
              strokeDasharray={missing ? "4 4" : undefined} />
          );
        })}
        {nb.map(([x, y]) => si(x, y))}
        {/* dopant core */}
        <circle cx={cx} cy={cy} r={r} fill={C.panel2} stroke={accent} strokeWidth="2.5" />
        <text x={cx} y={cy + 4} textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill={accent}>{dopant}</text>

        {kind === "n" ? (
          <g>
            {/* extra free electron */}
            <circle cx={cx + 52} cy={cy - 46} r="6" fill={C.electron} />
            <text x={cx + 52} y={cy - 43} textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.ink} fontWeight="700">−</text>
            <text x={cx + 60} y={cy - 58} textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.electron}>free e⁻</text>
          </g>
        ) : (
          <g>
            {/* the hole */}
            <circle cx={cx + 46} cy={cy} r="6" fill="none" stroke={C.hole} strokeWidth="2" strokeDasharray="2 2" />
            <text x={cx + 78} y={cy + 4} textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.hole}>hole (+)</text>
          </g>
        )}
        <text x={cx} y="296" textAnchor="middle" fontFamily={mono} fontSize="11" fill={C.muted}>{sub}</text>
      </g>
    );
  };
  return (
    <DiagramFrame caption={caption} maxWidth={620}>
      <svg viewBox="0 0 620 320" width="100%" role="img" aria-label="N-type and P-type doping of silicon">
        {cluster(0, "P", C.electron, "N-TYPE", "phosphorus donor · 5 outer e⁻", "n")}
        <line x1="310" y1="60" x2="310" y2="280" stroke={C.line} strokeWidth="1" strokeDasharray="4 5" />
        {cluster(310, "B", C.hole, "P-TYPE", "boron acceptor · 3 outer e⁻", "p")}
      </svg>
    </DiagramFrame>
  );
}

/* PN junction under forward and reverse bias (replaces the ASCII figure). */
export function PNJunctionDiagram({ caption }: { caption?: string }) {
  const row = (
    y0: number,
    title: string,
    depX0: number,
    depX1: number,
    flows: boolean
  ) => {
    const top = y0, h = 92;
    const holes = [];
    const elecs = [];
    for (let i = 0; i < 8; i++) {
      const hx = 70 + (i % 4) * 34;
      const hy = top + 24 + Math.floor(i / 4) * 38;
      if (hx < depX0 - 6) holes.push([hx, hy]);
      const ex = depX1 + 14 + (i % 4) * 34;
      const ey = top + 24 + Math.floor(i / 4) * 38;
      if (ex < 588) elecs.push([ex, ey]);
    }
    return (
      <g>
        <text x="50" y={top - 8} fontFamily={mono} fontSize="13" fontWeight="700"
          fill={flows ? C.on : C.off}>{title}</text>

        {/* P region */}
        <rect x="48" y={top} width={depX0 - 48} height={h} rx="4" fill="rgba(225,29,72,0.12)" stroke="rgba(225,29,72,0.4)" />
        <text x="58" y={top + h - 8} fontFamily={mono} fontSize="11" fill={C.hole}>P (holes)</text>
        {holes.map(([x, y], i) => (
          <g key={`h${i}`}><circle cx={x} cy={y} r="6" fill="none" stroke={C.hole} strokeWidth="2" />
            <text x={x} y={y + 3.5} textAnchor="middle" fontSize="9" fill={C.hole} fontFamily={mono}>+</text></g>
        ))}

        {/* depletion region */}
        <rect x={depX0} y={top} width={depX1 - depX0} height={h} fill="rgba(100,116,139,0.18)" />
        <line x1={depX0} y1={top} x2={depX0} y2={top + h} stroke={C.off} strokeDasharray="3 3" />
        <line x1={depX1} y1={top} x2={depX1} y2={top + h} stroke={C.off} strokeDasharray="3 3" />
        <text x={(depX0 + depX1) / 2} y={top + h + 16} textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.off}>depletion</text>

        {/* N region */}
        <rect x={depX1} y={top} width={588 - depX1} height={h} rx="4" fill="rgba(14,156,147,0.10)" stroke="rgba(14,156,147,0.4)" />
        <text x={depX1 + 10} y={top + h - 8} fontFamily={mono} fontSize="11" fill={C.electron}>N (electrons)</text>
        {elecs.map(([x, y], i) => (
          <circle key={`e${i}`} cx={x} cy={y} r="5" fill={C.electron} />
        ))}

        {/* verdict */}
        {flows ? (
          <g>
            <line x1="300" y1={top + h + 30} x2="350" y2={top + h + 30} stroke={C.on} strokeWidth="2" />
            <polygon points={`350,${top + h + 30} 342,${top + h + 26} 342,${top + h + 34}`} fill={C.on} />
            <text x="360" y={top + h + 34} fontFamily={mono} fontSize="11" fontWeight="700" fill={C.on}>CURRENT FLOWS</text>
          </g>
        ) : (
          <text x="300" y={top + h + 34} textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.off}>✕ BLOCKED — almost no current</text>
        )}
      </g>
    );
  };
  return (
    <DiagramFrame caption={caption} maxWidth={600}>
      <svg viewBox="0 0 600 320" width="100%" role="img" aria-label="PN junction under forward and reverse bias">
        {/* forward: narrow depletion */}
        {row(30, "FORWARD BIAS  (+ → P)", 250, 300, true)}
        {/* reverse: wide depletion */}
        {row(196, "REVERSE BIAS  (+ → N)", 210, 340, false)}
      </svg>
    </DiagramFrame>
  );
}

/* NMOS cross-section: OFF (no channel) vs ON (inversion layer). */
export function MosfetCrossSection({ caption }: { caption?: string }) {
  const panel = (ox: number, on: boolean) => {
    const subY = 120, subH = 70, x0 = ox + 20, w = 240;
    const srcX = x0 + 18, drnX = x0 + w - 78;
    return (
      <g>
        {/* substrate */}
        <rect x={x0} y={subY} width={w} height={subH} rx="4" fill={C.ink} stroke={C.line} />
        <text x={x0 + 8} y={subY + subH - 8} fontFamily={mono} fontSize="9" fill={C.faint}>p-substrate</text>

        {/* source / drain n+ wells */}
        <rect x={srcX} y={subY - 2} width="60" height="34" rx="3" fill="rgba(14,156,147,0.16)" stroke="rgba(14,156,147,0.5)" />
        <rect x={drnX} y={subY - 2} width="60" height="34" rx="3" fill="rgba(14,156,147,0.16)" stroke="rgba(14,156,147,0.5)" />
        <text x={srcX + 30} y={subY + 18} textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.electron}>n+</text>
        <text x={drnX + 30} y={subY + 18} textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.electron}>n+</text>

        {/* gate oxide + gate */}
        <rect x={srcX + 60} y={subY - 10} width={drnX - srcX - 60} height="8" fill="rgba(217,119,6,0.2)" stroke="rgba(217,119,6,0.4)" />
        <rect x={srcX + 60} y={subY - 34} width={drnX - srcX - 60} height="22" rx="3"
          fill={on ? "rgba(217,119,6,0.7)" : "rgba(100,116,139,0.4)"} stroke={on ? C.gate : C.off} strokeWidth="1.5" />
        <text x={(srcX + drnX + 60) / 2} y={subY - 19} textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={on ? C.ink : C.muted}>GATE</text>

        {/* terminals */}
        <text x={srcX + 30} y={subY + 52} textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>S</text>
        <text x={drnX + 30} y={subY + 52} textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>D</text>

        {/* channel state */}
        {on ? (
          <g>
            {/* + on gate */}
            {[0, 1, 2, 3].map((i) => (
              <text key={i} x={srcX + 74 + i * 18} y={subY - 24} fontFamily={mono} fontSize="10" fill={C.ink} fontWeight="700">+</text>
            ))}
            {/* inversion layer electrons */}
            <rect x={srcX + 60} y={subY - 1} width={drnX - srcX - 60} height="7" fill="rgba(14,156,147,0.25)" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <circle key={i} cx={srcX + 70 + i * 15} cy={subY + 2.5} r="3" fill={C.electron} />
            ))}
            {/* current arrow */}
            <line x1={drnX} y1={subY + 44} x2={srcX + 64} y2={subY + 44} stroke={C.on} strokeWidth="1.5" />
            <polygon points={`${srcX + 64},${subY + 44} ${srcX + 72},${subY + 40} ${srcX + 72},${subY + 48}`} fill={C.on} />
          </g>
        ) : (
          <line x1={srcX + 60} y1={subY + 2} x2={drnX} y2={subY + 2} stroke={C.off} strokeWidth="1.5" strokeDasharray="3 4" />
        )}

        <text x={x0 + w / 2} y={subY - 50} textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700"
          fill={on ? C.on : C.off}>
          {on ? "Vg > Vth · ON" : "Vg = 0 · OFF"}
        </text>
        <text x={x0 + w / 2} y={subY + 66} textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>
          {on ? "inversion layer bridges S→D" : "no channel — current blocked"}
        </text>
      </g>
    );
  };
  return (
    <DiagramFrame caption={caption} maxWidth={620}>
      <svg viewBox="0 0 620 210" width="100%" role="img" aria-label="NMOS transistor cross-section, off versus on">
        {panel(0, false)}
        <line x1="310" y1="60" x2="310" y2="190" stroke={C.line} strokeDasharray="4 5" />
        {panel(300, true)}
      </svg>
    </DiagramFrame>
  );
}

/* CMOS NAND gate schematic: 2 PMOS parallel pull-up + 2 NMOS series pull-down. */
export function CmosNandSchematic({ caption }: { caption?: string }) {
  const fet = (x: number, y: number, label: string, pmos: boolean) => (
    <g>
      <rect x={x - 38} y={y - 16} width="76" height="32" rx="5"
        fill={C.panel2} stroke={pmos ? C.gate : C.electron} strokeWidth="1.5" />
      <text x={x} y={y + 4} textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.text}>{label}</text>
      {/* gate stub on the left, with bubble for PMOS */}
      <line x1={x - 38} y1={y} x2={x - 64} y2={y} stroke={C.faint} strokeWidth="1.5" />
      {pmos && <circle cx={x - 44} cy={y} r="5" fill="none" stroke={C.gate} strokeWidth="1.5" />}
    </g>
  );
  return (
    <DiagramFrame caption={caption} maxWidth={460}>
      <svg viewBox="0 0 460 440" width="100%" role="img" aria-label="CMOS NAND gate transistor schematic">
        {/* VDD rail */}
        <line x1="120" y1="40" x2="360" y2="40" stroke={C.on} strokeWidth="2" />
        <text x="370" y="44" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.on}>VDD</text>
        <line x1="160" y1="40" x2="160" y2="74" stroke={C.faint} strokeWidth="1.5" />
        <line x1="300" y1="40" x2="300" y2="74" stroke={C.faint} strokeWidth="1.5" />

        {/* pull-up: 2 PMOS in parallel */}
        {fet(160, 90, "PMOS A", true)}
        {fet(300, 90, "PMOS B", true)}
        <text x="230" y="128" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.gate}>pull-up · PARALLEL</text>

        {/* join to output node */}
        <line x1="160" y1="106" x2="160" y2="150" stroke={C.faint} strokeWidth="1.5" />
        <line x1="300" y1="106" x2="300" y2="150" stroke={C.faint} strokeWidth="1.5" />
        <line x1="160" y1="150" x2="300" y2="150" stroke={C.faint} strokeWidth="1.5" />
        <line x1="230" y1="150" x2="230" y2="174" stroke={C.faint} strokeWidth="1.5" />

        {/* output Y */}
        <line x1="230" y1="162" x2="410" y2="162" stroke={C.electron} strokeWidth="1.5" />
        <circle cx="230" cy="162" r="3.5" fill={C.electron} />
        <text x="416" y="166" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.electron}>Y</text>

        {/* pull-down: 2 NMOS in series */}
        {fet(230, 200, "NMOS A", false)}
        <line x1="230" y1="216" x2="230" y2="254" stroke={C.faint} strokeWidth="1.5" />
        {fet(230, 280, "NMOS B", false)}
        <text x="300" y="244" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.electron}>series</text>

        {/* GND */}
        <line x1="230" y1="296" x2="230" y2="330" stroke={C.faint} strokeWidth="1.5" />
        <line x1="180" y1="330" x2="280" y2="330" stroke={C.off} strokeWidth="2" />
        <line x1="196" y1="338" x2="264" y2="338" stroke={C.off} strokeWidth="1.5" />
        <line x1="212" y1="346" x2="248" y2="346" stroke={C.off} strokeWidth="1" />
        <text x="290" y="334" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.off}>GND</text>

        {/* inputs A,B feeding gates */}
        <line x1="60" y1="90" x2="96" y2="90" stroke={C.faint} strokeWidth="1.5" />
        <line x1="60" y1="90" x2="60" y2="200" stroke={C.faint} strokeWidth="1.5" />
        <line x1="60" y1="200" x2="166" y2="200" stroke={C.faint} strokeWidth="1.5" />
        <text x="44" y="94" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.text}>A</text>

        <line x1="236" y1="90" x2="236" y2="90" stroke={C.faint} strokeWidth="1.5" />
        <line x1="110" y1="280" x2="166" y2="280" stroke={C.faint} strokeWidth="1.5" />
        <line x1="110" y1="90" x2="110" y2="280" stroke={C.faint} strokeWidth="1.5" />
        <line x1="110" y1="90" x2="122" y2="90" stroke={C.faint} strokeWidth="1.5" />
        <text x="96" y="74" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.text}>B</text>

        {/* note */}
        <text x="230" y="392" textAnchor="middle" fontFamily={mono} fontSize="11" fill={C.muted}>Y = NOT(A · B)  →  LOW only when A = B = 1</text>
        <text x="230" y="412" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.faint}>2 PMOS + 2 NMOS = 4 transistors</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   Reusable logic-gate glyph (IEEE distinctive shapes).
   Local body spans ~(0,0)→(out,40); placed via x/y (top-left).
   ════════════════════════════════════════════════════════════ */
function GateIcon({
  type,
  x,
  y,
  label,
  stroke = C.text,
}: {
  type: "NOT" | "AND" | "NAND" | "OR" | "NOR" | "XOR" | "XNOR";
  x: number;
  y: number;
  label?: string;
  stroke?: string;
}) {
  const base = type === "NOT" ? "not" : type === "AND" || type === "NAND" ? "and" : type === "OR" || type === "NOR" ? "or" : "xor";
  const bubble = type === "NOT" || type === "NAND" || type === "NOR" || type === "XNOR";
  const oneIn = type === "NOT";
  let d = "";
  let outX = 48;
  if (base === "and") { d = "M0,0 H26 A20,20 0 0 1 26,40 H0 Z"; outX = 46; }
  else if (base === "or") { d = "M0,0 Q14,20 0,40 Q34,38 48,20 Q34,2 0,0 Z"; outX = 48; }
  else if (base === "xor") { d = "M6,0 Q20,20 6,40 Q40,38 54,20 Q40,2 6,0 Z"; outX = 54; }
  else { d = "M0,0 L40,20 L0,40 Z"; outX = 40; } // NOT
  const outEdge = bubble ? outX + 9 : outX;
  return (
    <g transform={`translate(${x},${y})`}>
      {/* input stubs */}
      {oneIn ? (
        <line x1="-14" y1="20" x2="0" y2="20" stroke={C.faint} strokeWidth="1.5" />
      ) : (
        <>
          <line x1="-14" y1="8" x2={base === "xor" ? 8 : 4} y2="8" stroke={C.faint} strokeWidth="1.5" />
          <line x1="-14" y1="32" x2={base === "xor" ? 8 : 4} y2="32" stroke={C.faint} strokeWidth="1.5" />
        </>
      )}
      {base === "xor" && <path d="M-1,0 Q13,20 -1,40" fill="none" stroke={stroke} strokeWidth="1.5" />}
      <path d={d} fill={C.panel2} stroke={stroke} strokeWidth="1.5" />
      {bubble && <circle cx={outX + 4} cy="20" r="4" fill={C.panel} stroke={stroke} strokeWidth="1.5" />}
      <line x1={outEdge} y1="20" x2={outX + 22} y2="20" stroke={C.faint} strokeWidth="1.5" />
      {label && <text x={(outX) / 2} y="58" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={stroke}>{label}</text>}
    </g>
  );
}

/* ════════════════════════════════════════════════════════════
   1.2 — Logic Gates & Boolean Algebra
   ════════════════════════════════════════════════════════════ */

/* The seven fundamental gate symbols. */
export function LogicGateSymbols({ caption }: { caption?: string }) {
  const gates: Array<["NOT" | "AND" | "NAND" | "OR" | "NOR" | "XOR" | "XNOR", string]> = [
    ["NOT", "NOT"], ["AND", "AND"], ["NAND", "NAND"], ["OR", "OR"],
    ["NOR", "NOR"], ["XOR", "XOR"], ["XNOR", "XNOR"],
  ];
  const cols = 4;
  return (
    <DiagramFrame caption={caption} maxWidth={620}>
      <svg viewBox="0 0 620 220" width="100%" role="img" aria-label="The seven fundamental logic gate symbols">
        {gates.map(([t, lab], i) => {
          const cx = 30 + (i % cols) * 150;
          const cy = 30 + Math.floor(i / cols) * 110;
          return <GateIcon key={t} type={t} x={cx + 25} y={cy} label={lab} stroke={t.includes("N") && t !== "NOT" ? C.teal : C.text} />;
        })}
      </svg>
    </DiagramFrame>
  );
}

/* NOT / AND / OR built from NAND alone (replaces ASCII figure). */
export function NandUniversality({ caption }: { caption?: string }) {
  const nand = (x: number, y: number, w = 58) => (
    <g>
      <rect x={x} y={y} width={w} height="34" rx="5" fill={C.panel2} stroke={C.teal} strokeWidth="1.5" />
      <text x={x + w / 2} y={y + 22} textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.text}>NAND</text>
    </g>
  );
  const wire = (x1: number, y1: number, x2: number, y2: number) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.faint} strokeWidth="1.5" />
  );
  return (
    <DiagramFrame caption={caption} maxWidth={620}>
      <svg viewBox="0 0 620 230" width="100%" role="img" aria-label="Building NOT, AND and OR from NAND gates">
        {/* NOT */}
        <text x="100" y="24" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.gate}>NOT A</text>
        {wire(40, 57, 70, 57)} {wire(40, 57, 40, 74)} {wire(40, 74, 70, 74)}
        <text x="26" y="68" fontFamily={mono} fontSize="11" fill={C.text}>A</text>
        {nand(70, 47)} {wire(128, 64, 156, 64)}
        <text x="162" y="68" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.electron}>Ā</text>
        <text x="100" y="100" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>both inputs tied</text>

        {/* AND */}
        <text x="350" y="24" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.gate}>A AND B</text>
        <text x="266" y="52" fontFamily={mono} fontSize="11" fill={C.text}>A</text>
        <text x="266" y="78" fontFamily={mono} fontSize="11" fill={C.text}>B</text>
        {wire(276, 49, 300, 49)} {wire(276, 75, 300, 75)}
        {nand(300, 45)} {wire(358, 62, 388, 62)}
        {wire(388, 55, 388, 69)} {wire(388, 55, 400, 55)} {wire(388, 69, 400, 69)}
        {nand(400, 45)} {wire(458, 62, 486, 62)}
        <text x="492" y="66" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.electron}>Y</text>
        <text x="380" y="100" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>NAND, then invert</text>

        {/* OR */}
        <text x="350" y="150" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.gate}>A OR B</text>
        <text x="40" y="178" fontFamily={mono} fontSize="11" fill={C.text}>A</text>
        {wire(50, 175, 70, 175)} {wire(50, 175, 50, 192)} {wire(50, 192, 70, 192)}
        {nand(70, 167, 50)}
        <text x="40" y="212" fontFamily={mono} fontSize="11" fill={C.text}>B</text>
        {wire(50, 214, 70, 214)}
        <text x="180" y="155" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>invert each input…</text>
        {nand(70, 224, 50)} {wire(120, 184, 150, 184)} {wire(120, 241, 150, 241)}
        {wire(150, 184, 150, 198)} {wire(150, 241, 150, 215)} {wire(150, 198, 162, 198)} {wire(150, 215, 162, 215)}
        {nand(162, 189)} {wire(220, 206, 248, 206)}
        <text x="254" y="210" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.electron}>Y</text>
        <text x="300" y="200" textAnchor="start" fontFamily={mono} fontSize="9" fill={C.muted}>…then NAND  (De Morgan in silicon)</text>
      </svg>
    </DiagramFrame>
  );
}

/* Karnaugh map with a wrap-around group (replaces ASCII figure). */
export function KMapDiagram({ caption }: { caption?: string }) {
  const rows = ["00", "01", "11", "10"];
  const cols = ["00", "01", "11", "10"];
  const vals = [
    [1, 1, 0, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 0, 1],
  ];
  const x0 = 110, y0 = 70, cell = 70;
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 500 400" width="100%" role="img" aria-label="Karnaugh map with grouping">
        <text x={x0 + cell * 2} y="30" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.gate}>CD →</text>
        <text x="40" y={y0 + cell * 2} textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.gate} transform={`rotate(-90 40 ${y0 + cell * 2})`}>AB →</text>
        {cols.map((c, j) => (
          <text key={c} x={x0 + j * cell + cell / 2} y={y0 - 12} textAnchor="middle" fontFamily={mono} fontSize="12" fill={C.muted}>{c}</text>
        ))}
        {rows.map((r, i) => (
          <text key={r} x={x0 - 16} y={y0 + i * cell + cell / 2 + 4} textAnchor="middle" fontFamily={mono} fontSize="12" fill={C.muted}>{r}</text>
        ))}
        {vals.map((row, i) =>
          row.map((v, j) => (
            <g key={`${i}-${j}`}>
              <rect x={x0 + j * cell} y={y0 + i * cell} width={cell} height={cell}
                fill={v ? "rgba(13,148,136,0.14)" : C.ink} stroke={C.line} strokeWidth="1" />
              <text x={x0 + j * cell + cell / 2} y={y0 + i * cell + cell / 2 + 6} textAnchor="middle"
                fontFamily={mono} fontSize="18" fontWeight="700" fill={v ? C.electron : C.faint}>{v}</text>
            </g>
          ))
        )}
        {/* wrap-around group highlight on the 1-cells (corners + cols 00/01 of rows 00/10) */}
        <rect x={x0 - 5} y={y0 - 5} width={cell * 2 + 10} height={cell + 10} rx="14" fill="none" stroke={C.on} strokeWidth="2.5" strokeDasharray="5 4" />
        <rect x={x0 - 5} y={y0 + cell * 3 - 5} width={cell * 2 + 10} height={cell + 10} rx="14" fill="none" stroke={C.on} strokeWidth="2.5" strokeDasharray="5 4" />
        <rect x={x0 + cell * 3 - 5} y={y0 - 5} width={cell + 10} height={cell + 10} rx="14" fill="none" stroke={C.gate} strokeWidth="2.5" strokeDasharray="5 4" />
        <rect x={x0 + cell * 3 - 5} y={y0 + cell * 3 - 5} width={cell + 10} height={cell + 10} rx="14" fill="none" stroke={C.gate} strokeWidth="2.5" strokeDasharray="5 4" />
        <text x={x0 + cell * 2} y={y0 + cell * 4 + 28} textAnchor="middle" fontFamily={mono} fontSize="11" fill={C.muted}>top &amp; bottom rows are adjacent (wrap) — they group as one</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   1.3 — Combinational Logic
   ════════════════════════════════════════════════════════════ */

/* Half adder: Sum = A⊕B, Carry = A·B. */
export function HalfAdderDiagram({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={480}>
      <svg viewBox="0 0 480 220" width="100%" role="img" aria-label="Half adder gate diagram">
        {/* inputs */}
        <text x="20" y="64" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.text}>A</text>
        <text x="20" y="150" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.text}>B</text>
        {/* A,B fan into both gates */}
        <line x1="30" y1="60" x2="150" y2="60" stroke={C.faint} strokeWidth="1.5" />
        <line x1="30" y1="145" x2="150" y2="145" stroke={C.faint} strokeWidth="1.5" />
        <line x1="70" y1="60" x2="70" y2="92" stroke={C.faint} strokeWidth="1.5" />
        <line x1="100" y1="145" x2="100" y2="116" stroke={C.faint} strokeWidth="1.5" />
        <line x1="70" y1="92" x2="150" y2="92" stroke={C.faint} strokeWidth="1.5" />
        <line x1="100" y1="116" x2="150" y2="116" stroke={C.faint} strokeWidth="1.5" />
        {/* XOR → Sum */}
        <GateIcon type="XOR" x={156} y={40} stroke={C.electron} />
        <text x="300" y="64" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.electron}>Sum = A⊕B</text>
        {/* AND → Carry */}
        <GateIcon type="AND" x={156} y={108} stroke={C.gate} />
        <text x="300" y="132" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.gate}>Carry = A·B</text>
      </svg>
    </DiagramFrame>
  );
}

/* Full adder as two half-adders + OR. */
export function FullAdderDiagram({ caption }: { caption?: string }) {
  const ha = (x: number, y: number) => (
    <g>
      <rect x={x} y={y} width="80" height="56" rx="6" fill={C.panel2} stroke={C.teal} strokeWidth="1.5" />
      <text x={x + 40} y={y + 26} textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.text}>HALF</text>
      <text x={x + 40} y={y + 42} textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.text}>ADDER</text>
    </g>
  );
  const wire = (x1: number, y1: number, x2: number, y2: number) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.faint} strokeWidth="1.5" />;
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 240" width="100%" role="img" aria-label="Full adder built from two half adders and an OR gate">
        <text x="20" y="60" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.text}>A</text>
        <text x="20" y="92" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.text}>B</text>
        <text x="20" y="180" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.text}>Cin</text>
        {wire(40, 55, 90, 55)} {wire(40, 88, 90, 88)}
        {ha(90, 44)}
        {/* HA1 sum → HA2 ; HA1 carry → OR */}
        {wire(170, 60, 230, 60)} {wire(40, 175, 230, 175)} {wire(230, 175, 230, 130)} {wire(230, 130, 250, 130)}
        {wire(230, 60, 250, 60)}
        {ha(250, 60)}
        <text x="300" y="40" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>partial sum</text>
        {/* HA2 sum → Sum out */}
        {wire(330, 76, 420, 76)}
        <text x="426" y="80" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.electron}>Sum</text>
        {/* carries → OR gate */}
        {wire(170, 92, 200, 92)} {wire(200, 92, 200, 150)} {wire(200, 150, 360, 150)}
        {wire(330, 104, 345, 104)} {wire(345, 104, 345, 135)} {wire(345, 135, 360, 135)}
        <GateIcon type="OR" x={366} y={123} stroke={C.gate} />
        {wire(414, 143, 426, 143)}
        <text x="432" y="147" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.gate}>Cout</text>
        <text x="280" y="220" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>Sum = A⊕B⊕Cin   ·   Cout = A·B + Cin·(A⊕B)</text>
      </svg>
    </DiagramFrame>
  );
}

/* 4-bit ripple-carry adder (replaces ASCII figure). */
export function RippleCarryDiagram({ caption }: { caption?: string }) {
  const stages = [3, 2, 1, 0];
  return (
    <DiagramFrame caption={caption} maxWidth={620}>
      <svg viewBox="0 0 620 200" width="100%" role="img" aria-label="4-bit ripple carry adder">
        {stages.map((bit, i) => {
          const x = 40 + i * 140;
          return (
            <g key={bit}>
              {/* inputs */}
              <text x={x + 18} y="34" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.text}>A{bit}</text>
              <text x={x + 50} y="34" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.text}>B{bit}</text>
              <line x1={x + 18} y1="40" x2={x + 18} y2="64" stroke={C.faint} strokeWidth="1.5" />
              <line x1={x + 50} y1="40" x2={x + 50} y2="64" stroke={C.faint} strokeWidth="1.5" />
              {/* FA box */}
              <rect x={x} y={64} width="68" height="52" rx="6" fill={C.panel2} stroke={C.teal} strokeWidth="1.5" />
              <text x={x + 34} y={94} textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.text}>FA</text>
              {/* sum out */}
              <line x1={x + 34} y1="116" x2={x + 34} y2="146" stroke={C.faint} strokeWidth="1.5" />
              <text x={x + 34} y="164" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.electron}>S{bit}</text>
              {/* carry chain (from right neighbour into this, except first) */}
              {i < 3 && (
                <g>
                  <line x1={x + 68} y1="90" x2={x + 140} y2="90" stroke={C.gate} strokeWidth="2" />
                  <polygon points={`${x + 68},90 ${x + 78},86 ${x + 78},94`} fill={C.gate} />
                  <text x={x + 104} y="82" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.gate}>C{bit + 1}</text>
                </g>
              )}
            </g>
          );
        })}
        {/* Cin on far right */}
        <line x1={40 + 3 * 140 + 68} y1="90" x2={40 + 3 * 140 + 110} y2="90" stroke={C.faint} strokeWidth="1.5" />
        <text x={40 + 3 * 140 + 118} y="94" fontFamily={mono} fontSize="11" fill={C.muted}>Cin=0</text>
        {/* Cout on far left */}
        <line x1="40" y1="90" x2="12" y2="90" stroke={C.gate} strokeWidth="2" />
        <text x="20" y="82" fontFamily={mono} fontSize="10" fill={C.gate}>Cout</text>
        <text x="310" y="192" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>the carry must ripple right → left before the result is valid</text>
      </svg>
    </DiagramFrame>
  );
}

/* 2-to-1 multiplexer. */
export function Mux2to1Diagram({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={440}>
      <svg viewBox="0 0 440 220" width="100%" role="img" aria-label="2-to-1 multiplexer">
        {/* trapezoid body */}
        <path d="M180,40 L260,80 L260,150 L180,190 Z" fill={C.panel2} stroke={C.teal} strokeWidth="1.5" />
        <text x="216" y="120" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.text}>MUX</text>
        {/* data inputs */}
        <line x1="90" y1="70" x2="180" y2="70" stroke={C.faint} strokeWidth="1.5" />
        <line x1="90" y1="160" x2="180" y2="160" stroke={C.faint} strokeWidth="1.5" />
        <text x="70" y="74" textAnchor="end" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.text}>D0</text>
        <text x="70" y="164" textAnchor="end" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.text}>D1</text>
        {/* select */}
        <line x1="220" y1="200" x2="220" y2="165" stroke={C.gate} strokeWidth="1.5" />
        <text x="220" y="216" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.gate}>S</text>
        {/* output */}
        <line x1="260" y1="115" x2="340" y2="115" stroke={C.faint} strokeWidth="1.5" />
        <text x="350" y="119" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.electron}>Y</text>
        <text x="216" y="34" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>S=0 → Y=D0   ·   S=1 → Y=D1</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   1.4 — Sequential Logic
   ════════════════════════════════════════════════════════════ */

/* SR latch: cross-coupled NOR gates (replaces ASCII figure). */
export function SRLatchDiagram({ caption }: { caption?: string }) {
  const nor = (x: number, y: number) => (
    <g>
      <rect x={x} y={y} width="74" height="48" rx="6" fill={C.panel2} stroke={C.teal} strokeWidth="1.5" />
      <text x={x + 37} y={y + 30} textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.text}>NOR</text>
    </g>
  );
  const wire = (x1: number, y1: number, x2: number, y2: number, col = C.faint) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={col} strokeWidth="1.5" />;
  return (
    <DiagramFrame caption={caption} maxWidth={460}>
      <svg viewBox="0 0 460 230" width="100%" role="img" aria-label="SR latch from cross-coupled NOR gates">
        <text x="20" y="62" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.text}>S</text>
        <text x="20" y="180" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.text}>R</text>
        {wire(30, 58, 150, 58)}
        {wire(30, 176, 150, 176)}
        {nor(150, 40)}
        {nor(150, 152)}
        {/* outputs */}
        {wire(224, 64, 320, 64, C.electron)}
        {wire(224, 176, 320, 176, C.electron)}
        <text x="328" y="68" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.electron}>Q</text>
        <text x="328" y="180" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.electron}>Q̄</text>
        {/* cross-couple feedback */}
        {wire(264, 64, 264, 110, C.gate)} {wire(264, 110, 132, 110, C.gate)} {wire(132, 110, 132, 168, C.gate)} {wire(132, 168, 150, 168, C.gate)}
        {wire(264, 176, 264, 130, C.gate)} {wire(264, 130, 116, 130, C.gate)} {wire(116, 130, 116, 48, C.gate)} {wire(116, 48, 150, 48, C.gate)}
        <text x="230" y="222" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>each output feeds back into the other gate — the loop holds the bit</text>
      </svg>
    </DiagramFrame>
  );
}

/* D flip-flop timing: Q samples D only on the rising clock edge. */
export function DFlipFlopTiming({ caption }: { caption?: string }) {
  const edges = [100, 180, 260, 340, 420, 500];
  const clk = "60,70 100,70 100,40 140,40 140,70 180,70 180,40 220,40 220,70 260,70 260,40 300,40 300,70 340,70 340,40 380,40 380,70 420,70 420,40 460,40 460,70 500,70 500,40 540,40 540,70 580,70";
  const d = "60,110 150,110 150,140 230,140 230,110 360,110 360,140 440,140 440,110 580,110";
  const q = "60,210 100,210 100,180 180,180 180,210 260,210 260,180 420,180 420,210 500,210 500,180 580,180";
  return (
    <DiagramFrame caption={caption} maxWidth={620}>
      <svg viewBox="0 0 620 250" width="100%" role="img" aria-label="D flip-flop timing diagram showing rising-edge sampling">
        {/* rising-edge guide lines */}
        {edges.map((x) => (
          <line key={x} x1={x} y1="30" x2={x} y2="225" stroke={C.gate} strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
        ))}
        {/* labels */}
        <text x="46" y="59" textAnchor="end" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.gate}>CLK</text>
        <text x="46" y="129" textAnchor="end" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.text}>D</text>
        <text x="46" y="199" textAnchor="end" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.electron}>Q</text>
        {/* waveforms */}
        <polyline points={clk} fill="none" stroke={C.gate} strokeWidth="2" />
        <polyline points={d} fill="none" stroke={C.text} strokeWidth="2" />
        <polyline points={q} fill="none" stroke={C.electron} strokeWidth="2" />
        {/* sample dots on each edge */}
        {edges.map((x) => (
          <circle key={`s${x}`} cx={x} cy="195" r="3.5" fill={C.electron} />
        ))}
        <text x="320" y="244" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>Q captures D only at each ↑ rising edge (dashed) — and holds it until the next</text>
      </svg>
    </DiagramFrame>
  );
}

/* Shift register: data marches one flip-flop per clock (replaces ASCII). */
export function ShiftRegisterDiagram({ caption }: { caption?: string }) {
  const taps = [0, 1, 2, 3];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 180" width="100%" role="img" aria-label="4-stage shift register">
        <text x="20" y="70" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.text}>DATA</text>
        <text x="20" y="84" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.text}>IN</text>
        <line x1="56" y1="76" x2="90" y2="76" stroke={C.faint} strokeWidth="1.5" />
        {taps.map((t, i) => {
          const x = 90 + i * 110;
          return (
            <g key={t}>
              <rect x={x} y={56} width="64" height="44" rx="6" fill={C.panel2} stroke={C.teal} strokeWidth="1.5" />
              <text x={x + 32} y={83} textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.text}>FF</text>
              {/* connection to next */}
              <line x1={x + 64} y1="76" x2={x + 90} y2="76" stroke={C.faint} strokeWidth="1.5" />
              {i < 3 && <polygon points={`${x + 90},76 ${x + 82},72 ${x + 82},80`} fill={C.faint} />}
              {/* parallel tap */}
              <line x1={x + 32} y1="100" x2={x + 32} y2="128" stroke={C.electron} strokeWidth="1.5" />
              <text x={x + 32} y="146" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.electron}>Q{t}</text>
            </g>
          );
        })}
        <text x="540" y="80" textAnchor="end" fontFamily={mono} fontSize="11" fill={C.muted}>→ OUT</text>
        <text x="280" y="172" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>one shift per clock edge · tap Q0–Q3 for parallel output</text>
      </svg>
    </DiagramFrame>
  );
}

/* Moore FSM: traffic-light controller (replaces ASCII figure). */
export function FSMTrafficLight({ caption }: { caption?: string }) {
  const states = [
    { x: 110, label: "RED", code: "00", col: C.hole },
    { x: 280, label: "GREEN", code: "01", col: C.on },
    { x: 450, label: "YELLOW", code: "10", col: C.gate },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 230" width="100%" role="img" aria-label="Moore finite state machine for a traffic light">
        {states.map((s) => (
          <g key={s.label}>
            <circle cx={s.x} cy="90" r="42" fill={C.panel2} stroke={s.col} strokeWidth="2" />
            <text x={s.x} y="86" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill={s.col}>{s.label}</text>
            <text x={s.x} y="104" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>{s.code}</text>
            {/* self-loop on T=0 */}
            <path d={`M${s.x - 14},52 A18,18 0 1 1 ${s.x + 14},52`} fill="none" stroke={C.off} strokeWidth="1.5" />
            <polygon points={`${s.x + 14},52 ${s.x + 8},46 ${s.x + 18},45`} fill={C.off} />
            <text x={s.x} y="26" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.off}>T=0</text>
          </g>
        ))}
        {/* transitions on T=1 */}
        {[[152, 238], [322, 408]].map(([x1, x2], i) => (
          <g key={i}>
            <line x1={x1} y1="90" x2={x2} y2="90" stroke={C.teal} strokeWidth="2" />
            <polygon points={`${x2},90 ${x2 - 9},85 ${x2 - 9},95`} fill={C.teal} />
            <text x={(x1 + x2) / 2} y="80" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.teal}>T=1</text>
          </g>
        ))}
        {/* wrap YELLOW → RED */}
        <path d="M450,132 Q450,196 280,196 Q110,196 110,132" fill="none" stroke={C.teal} strokeWidth="2" />
        <polygon points="110,132 105,142 115,142" fill={C.teal} />
        <text x="280" y="212" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.teal}>T=1 (cycle repeats)</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   1.5 — Clocking, Timing & Power
   ════════════════════════════════════════════════════════════ */

/* Clock waveform with setup/hold window and t_cq. */
export function ClockTimingDiagram({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={600}>
      <svg viewBox="0 0 600 250" width="100%" role="img" aria-label="Clock waveform with setup and hold windows">
        {/* clock */}
        <text x="44" y="59" textAnchor="end" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.gate}>CLK</text>
        <polyline points="60,70 180,70 180,40 300,40 300,70 420,70 420,40 540,40 540,70 560,70"
          fill="none" stroke={C.gate} strokeWidth="2" />
        {/* period bracket */}
        <line x1="180" y1="24" x2="420" y2="24" stroke={C.muted} strokeWidth="1" />
        <text x="300" y="20" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>period T = 1/f</text>

        {/* the active edge */}
        <line x1="300" y1="34" x2="300" y2="210" stroke={C.electron} strokeWidth="1.5" strokeDasharray="3 4" />
        <text x="300" y="226" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.electron}>↑ active edge</text>

        {/* data line with setup/hold window */}
        <text x="44" y="139" textAnchor="end" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.text}>D</text>
        {/* stable window highlighted around the edge */}
        <rect x="250" y="110" width="100" height="40" fill="rgba(14,156,147,0.10)" stroke="rgba(14,156,147,0.4)" strokeDasharray="3 3" />
        <polyline points="60,150 250,150 260,110 540,110" fill="none" stroke={C.text} strokeWidth="2" />
        <text x="250" y="100" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.electron}>setup t_su</text>
        <text x="350" y="100" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.electron}>hold t_h</text>
        <line x1="250" y1="156" x2="250" y2="190" stroke={C.muted} strokeDasharray="2 3" />
        <line x1="350" y1="156" x2="350" y2="190" stroke={C.muted} strokeDasharray="2 3" />

        {/* Q output after t_cq */}
        <text x="44" y="199" textAnchor="end" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.on}>Q</text>
        <polyline points="60,210 318,210 326,180 540,180" fill="none" stroke={C.on} strokeWidth="2" />
        <line x1="300" y1="196" x2="326" y2="196" stroke={C.muted} />
        <text x="360" y="200" fontFamily={mono} fontSize="10" fill={C.muted}>t_cq (clock→Q)</text>

        <text x="300" y="246" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>D must be stable across the setup+hold window or the flip-flop may go metastable</text>
      </svg>
    </DiagramFrame>
  );
}

/* Voltage-scaling bar chart: power ∝ V² (the dominant efficiency lever). */
export function VoltageScalingChart({ caption }: { caption?: string }) {
  const bars = [
    { v: "1.0 V", p: 1.0, label: "100%" },
    { v: "0.85 V", p: 0.7225, label: "72%" },
    { v: "0.7 V", p: 0.49, label: "49%" },
    { v: "0.5 V", p: 0.25, label: "25%" },
  ];
  const baseY = 200, maxH = 150, x0 = 90, bw = 70, gap = 50;
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 250" width="100%" role="img" aria-label="Dynamic power versus supply voltage, showing the V-squared law">
        <line x1="60" y1={baseY} x2="500" y2={baseY} stroke={C.line} strokeWidth="1.5" />
        <text x="60" y="30" fontFamily={mono} fontSize="11" fill={C.muted}>relative dynamic power  (∝ V²)</text>
        {bars.map((b, i) => {
          const h = b.p * maxH;
          const x = x0 + i * (bw + gap);
          return (
            <g key={b.v}>
              <rect x={x} y={baseY - h} width={bw} height={h} rx="4"
                fill={i === 0 ? "rgba(225,29,72,0.35)" : "rgba(14,156,147,0.30)"}
                stroke={i === 0 ? C.hole : C.electron} strokeWidth="1.5" />
              <text x={x + bw / 2} y={baseY - h - 8} textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={i === 0 ? C.hole : C.electron}>{b.label}</text>
              <text x={x + bw / 2} y={baseY + 18} textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.text}>{b.v}</text>
            </g>
          );
        })}
        <text x="280" y="244" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>a 30% voltage cut (1.0→0.7 V) slashes dynamic power by half</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   1.6 — Number Systems
   ════════════════════════════════════════════════════════════ */

/* 8-bit binary place values (replaces ASCII figure). */
export function BinaryPlaceValue({ caption }: { caption?: string }) {
  const bits = [1, 0, 1, 1, 0, 1, 0, 1];
  const places = [128, 64, 32, 16, 8, 4, 2, 1];
  const cw = 64, x0 = 24;
  return (
    <DiagramFrame caption={caption} maxWidth={580}>
      <svg viewBox="0 0 552 200" width="100%" role="img" aria-label="8-bit binary place values summing to 181">
        {bits.map((b, i) => {
          const x = x0 + i * cw;
          const on = b === 1;
          return (
            <g key={i}>
              <text x={x + cw / 2} y="28" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill={on ? C.electron : C.faint}>{places[i]}</text>
              <rect x={x + 6} y="44" width={cw - 12} height={cw - 12} rx="6"
                fill={on ? "rgba(14,156,147,0.18)" : C.ink} stroke={on ? C.electron : C.line} strokeWidth="1.5" />
              <text x={x + cw / 2} y="84" textAnchor="middle" fontFamily={mono} fontSize="22" fontWeight="700" fill={on ? C.electron : C.faint}>{b}</text>
              {on && <text x={x + cw / 2} y="130" textAnchor="middle" fontFamily={mono} fontSize="11" fill={C.muted}>+{places[i]}</text>}
            </g>
          );
        })}
        <line x1={x0} y1="148" x2={x0 + 8 * cw} y2="148" stroke={C.line} />
        <text x={x0 + 4 * cw} y="178" textAnchor="middle" fontFamily={mono} fontSize="14" fontWeight="700" fill={C.text}>128 + 32 + 16 + 4 + 1 = 181  =  0xB5</text>
      </svg>
    </DiagramFrame>
  );
}

/* Two's-complement negation (replaces ASCII figure). */
export function TwosComplementDiagram({ caption }: { caption?: string }) {
  const row = (y: number, label: string, bits: string, col: string) => (
    <g>
      <text x="30" y={y + 5} fontFamily={mono} fontSize="11" fill={C.muted}>{label}</text>
      {bits.split("").map((b, i) => (
        <g key={i}>
          <rect x={150 + i * 34} y={y - 16} width="28" height="28" rx="4" fill={b === "1" ? "rgba(14,156,147,0.16)" : C.ink} stroke={C.line} />
          <text x={150 + i * 34 + 14} y={y + 4} textAnchor="middle" fontFamily={mono} fontSize="14" fontWeight="700" fill={b === "1" ? C.electron : C.faint}>{b}</text>
        </g>
      ))}
      <text x="440" y={y + 5} fontFamily={mono} fontSize="12" fontWeight="700" fill={col}>{label === "+5" ? "= +5" : label === "−5 result" ? "= −5" : ""}</text>
    </g>
  );
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 520 230" width="100%" role="img" aria-label="Two's complement negation of +5 to -5">
        {row(40, "+5", "00000101", C.electron)}
        <text x="150" y="74" fontFamily={mono} fontSize="11" fill={C.gate}>1 — invert every bit ↓</text>
        {row(110, "invert", "11111010", C.text)}
        <text x="150" y="144" fontFamily={mono} fontSize="11" fill={C.gate}>2 — add 1 ↓</text>
        {row(180, "−5 result", "11111011", C.electron)}
        <text x="430" y="115" fontFamily={mono} fontSize="11" fill={C.muted}>then +5 + (−5)</text>
        <text x="430" y="132" fontFamily={mono} fontSize="11" fill={C.muted}>= 0 (carry out</text>
        <text x="430" y="149" fontFamily={mono} fontSize="11" fill={C.muted}>dropped) ✓</text>
      </svg>
    </DiagramFrame>
  );
}

/* Floating-point / integer bit-field layouts: FP32 / FP16 / BF16 / INT8. */
export function FloatFormatsDiagram({ caption }: { caption?: string }) {
  const formats = [
    { name: "FP32", sign: 1, exp: 8, mant: 23, total: 32, note: "training reference" },
    { name: "FP16", sign: 1, exp: 5, mant: 10, total: 16, note: "range only ±65,504" },
    { name: "BF16", sign: 1, exp: 8, mant: 7, total: 16, note: "FP32 range, half size" },
    { name: "INT8", sign: 1, exp: 0, mant: 7, total: 8, note: "magnitude (no exponent)" },
  ];
  const fullW = 384, x0 = 96;
  const rowH = 58;
  return (
    <DiagramFrame caption={caption} maxWidth={600}>
      <svg viewBox="0 0 560 270" width="100%" role="img" aria-label="Bit-field layouts of FP32, FP16, BF16 and INT8">
        {/* legend */}
        <g fontFamily={mono} fontSize="10">
          <rect x="96" y="14" width="12" height="12" fill="rgba(225,29,72,0.6)" /><text x="114" y="24" fill={C.muted}>sign</text>
          <rect x="170" y="14" width="12" height="12" fill="rgba(217,119,6,0.6)" /><text x="188" y="24" fill={C.muted}>exponent</text>
          <rect x="270" y="14" width="12" height="12" fill="rgba(14,156,147,0.45)" /><text x="288" y="24" fill={C.muted}>mantissa</text>
        </g>
        {formats.map((f, i) => {
          const y = 44 + i * rowH;
          const unit = fullW / 32;
          const sw = f.sign * unit;
          const ew = f.exp * unit;
          const mw = f.mant * unit;
          return (
            <g key={f.name}>
              <text x="84" y={y + 22} textAnchor="end" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.text}>{f.name}</text>
              <rect x={x0} y={y} width={sw} height="32" fill="rgba(225,29,72,0.55)" stroke={C.ink} />
              {f.exp > 0 && <rect x={x0 + sw} y={y} width={ew} height="32" fill="rgba(217,119,6,0.55)" stroke={C.ink} />}
              <rect x={x0 + sw + ew} y={y} width={mw} height="32" fill="rgba(14,156,147,0.40)" stroke={C.ink} />
              {/* field bit-counts */}
              {f.exp > 0 && <text x={x0 + sw + ew / 2} y={y + 21} textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.ink}>{f.exp}e</text>}
              <text x={x0 + sw + ew + mw / 2} y={y + 21} textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.ink}>{f.mant}m</text>
              <text x={x0 + fullW + 12} y={y + 21} fontFamily={mono} fontSize="10" fill={C.muted}>{f.total}b · {f.note}</text>
            </g>
          );
        })}
        <text x="280" y="262" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>BF16 keeps FP32&apos;s 8-bit exponent (same range) but trims the mantissa — that&apos;s why it just works for training</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   1.7 — Multiply-Accumulate
   ════════════════════════════════════════════════════════════ */

/* A single MAC unit: multiplier → adder → accumulator register. */
export function MacUnitDiagram({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={580}>
      <svg viewBox="0 0 560 240" width="100%" role="img" aria-label="Hardware MAC unit datapath">
        {/* inputs */}
        <text x="24" y="64" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.text}>A</text>
        <text x="24" y="104" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.text}>B</text>
        <line x1="34" y1="60" x2="90" y2="60" stroke={C.faint} strokeWidth="1.5" />
        <line x1="34" y1="100" x2="90" y2="100" stroke={C.faint} strokeWidth="1.5" />
        {/* multiplier */}
        <rect x="90" y="44" width="96" height="72" rx="8" fill={C.panel2} stroke={C.gate} strokeWidth="1.5" />
        <text x="138" y="78" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.gate}>×</text>
        <text x="138" y="98" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>multiplier</text>
        <line x1="186" y1="80" x2="240" y2="80" stroke={C.faint} strokeWidth="1.5" />
        <text x="213" y="72" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>A×B</text>
        {/* adder */}
        <rect x="240" y="44" width="96" height="72" rx="8" fill={C.panel2} stroke={C.teal} strokeWidth="1.5" />
        <text x="288" y="78" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.teal}>+</text>
        <text x="288" y="98" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>adder</text>
        <line x1="336" y1="80" x2="392" y2="80" stroke={C.faint} strokeWidth="1.5" />
        {/* accumulator register */}
        <rect x="392" y="44" width="120" height="72" rx="8" fill={C.panel2} stroke={C.electron} strokeWidth="1.5" />
        <text x="452" y="74" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.electron}>ACCUM</text>
        <text x="452" y="92" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>register</text>
        <text x="452" y="106" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>(wide)</text>
        {/* feedback loop accumulator → adder */}
        <line x1="452" y1="116" x2="452" y2="170" stroke={C.gate} strokeWidth="1.5" />
        <line x1="452" y1="170" x2="266" y2="170" stroke={C.gate} strokeWidth="1.5" />
        <line x1="266" y1="170" x2="266" y2="116" stroke={C.gate} strokeWidth="1.5" />
        <polygon points="266,116 262,126 270,126" fill={C.gate} />
        <text x="360" y="186" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.gate}>running total fed back each cycle</text>
        {/* output */}
        <line x1="512" y1="80" x2="540" y2="80" stroke={C.faint} strokeWidth="1.5" />
        <text x="452" y="220" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.text}>accumulator ← accumulator + (A × B)</text>
      </svg>
    </DiagramFrame>
  );
}

/* Systolic array: 3×3 grid of MAC cells with data flow (replaces ASCII). */
export function SystolicArrayDiagram({ caption }: { caption?: string }) {
  const n = 3, cell = 78, x0 = 120, y0 = 70;
  const cells = [];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) cells.push([r, c]);
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 460 380" width="100%" role="img" aria-label="3 by 3 systolic array of MAC cells">
        {/* activation inputs (left → right) */}
        <text x="40" y={y0 + cell / 2 + 4} fontFamily={mono} fontSize="10" fill={C.electron}>act →</text>
        <text x="40" y={y0 + cell + cell / 2 + 4} fontFamily={mono} fontSize="10" fill={C.electron}>act →</text>
        <text x="40" y={y0 + 2 * cell + cell / 2 + 4} fontFamily={mono} fontSize="10" fill={C.electron}>act →</text>
        {/* weight inputs (top → down) */}
        {[0, 1, 2].map((c) => (
          <text key={c} x={x0 + c * cell + cell / 2} y={y0 - 18} textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.gate}>w ↓</text>
        ))}
        {cells.map(([r, c]) => {
          const x = x0 + c * cell, y = y0 + r * cell;
          return (
            <g key={`${r}-${c}`}>
              <rect x={x} y={y} width={cell - 14} height={cell - 14} rx="6" fill={C.panel2} stroke={C.teal} strokeWidth="1.5" />
              <text x={x + (cell - 14) / 2} y={y + (cell - 14) / 2 + 5} textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.text}>MAC</text>
              {/* horizontal data flow */}
              {c < n - 1 && (
                <g>
                  <line x1={x + cell - 14} y1={y + (cell - 14) / 2} x2={x + cell} y2={y + (cell - 14) / 2} stroke={C.electron} strokeWidth="1.5" />
                  <polygon points={`${x + cell},${y + (cell - 14) / 2} ${x + cell - 6},${y + (cell - 14) / 2 - 4} ${x + cell - 6},${y + (cell - 14) / 2 + 4}`} fill={C.electron} />
                </g>
              )}
              {/* vertical partial-sum flow */}
              {r < n - 1 && (
                <g>
                  <line x1={x + (cell - 14) / 2} y1={y + cell - 14} x2={x + (cell - 14) / 2} y2={y + cell} stroke={C.gate} strokeWidth="1.5" />
                  <polygon points={`${x + (cell - 14) / 2},${y + cell} ${x + (cell - 14) / 2 - 4},${y + cell - 6} ${x + (cell - 14) / 2 + 4},${y + cell - 6}`} fill={C.gate} />
                </g>
              )}
            </g>
          );
        })}
        <text x="230" y={y0 + 3 * cell + 16} textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>each weight, loaded once, is reused across the whole row — no memory re-fetch</text>
        <text x="230" y={y0 + 3 * cell + 34} textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.electron}>activations flow →   partial sums accumulate ↓</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   Curriculum-parity backfill (1.1 BJT · 1.3 CLA/DEMUX/comparator · 1.4 counter)
   ════════════════════════════════════════════════════════════ */

/* NPN bipolar junction transistor — current-controlled, vs the MOSFET. */
export function BJTStructure({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 500 220" width="100%" role="img" aria-label="NPN bipolar junction transistor symbol">
        {/* base bar */}
        <line x1="170" y1="70" x2="170" y2="150" stroke={C.text} strokeWidth="3" />
        {/* base lead */}
        <line x1="110" y1="110" x2="170" y2="110" stroke={C.faint} strokeWidth="1.5" />
        <text x="96" y="114" textAnchor="end" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.text}>B</text>
        {/* collector */}
        <line x1="170" y1="92" x2="220" y2="56" stroke={C.electron} strokeWidth="2" />
        <line x1="220" y1="56" x2="220" y2="34" stroke={C.faint} strokeWidth="1.5" />
        <text x="220" y="26" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.electron}>C</text>
        {/* emitter with outward arrow (NPN) */}
        <line x1="170" y1="128" x2="220" y2="164" stroke={C.gate} strokeWidth="2" />
        <polygon points="220,164 206,158 211,150" fill={C.gate} />
        <line x1="220" y1="164" x2="220" y2="186" stroke={C.faint} strokeWidth="1.5" />
        <text x="220" y="202" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.gate}>E</text>
        {/* I_B → I_C note */}
        <text x="120" y="150" fontFamily={mono} fontSize="10" fill={C.muted}>small I_B…</text>
        <text x="230" y="60" fontFamily={mono} fontSize="10" fill={C.electron}>…controls large I_C</text>
        {/* compare panel */}
        <rect x="300" y="70" width="184" height="92" rx="8" fill={C.panel} stroke={C.line} />
        <text x="392" y="92" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.gate}>BJT vs MOSFET</text>
        <text x="312" y="112" fontFamily={mono} fontSize="10" fill={C.muted}>BJT: current-controlled</text>
        <text x="312" y="128" fontFamily={mono} fontSize="10" fill={C.muted}>  (I_B steers I_C)</text>
        <text x="312" y="146" fontFamily={mono} fontSize="10" fill={C.electron}>MOSFET: voltage-controlled</text>
        <text x="312" y="158" fontFamily={mono} fontSize="9" fill={C.faint}>  ~no gate current → won digital</text>
        <text x="170" y="214" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>NPN — the emitter arrow points outward</text>
      </svg>
    </DiagramFrame>
  );
}

/* Ripple carry (serial) vs carry-lookahead (parallel). */
export function CarryLookaheadDiagram({ caption }: { caption?: string }) {
  const fa = (x: number, y: number, label: string) => (
    <g>
      <rect x={x} y={y} width="64" height="40" rx="5" fill={C.panel2} stroke={C.teal} strokeWidth="1.5" />
      <text x={x + 32} y={y + 25} textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.text}>{label}</text>
    </g>
  );
  return (
    <DiagramFrame caption={caption} maxWidth={600}>
      <svg viewBox="0 0 600 260" width="100%" role="img" aria-label="Ripple carry versus carry lookahead">
        {/* RIPPLE */}
        <text x="40" y="36" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.off}>RIPPLE — carry travels stage by stage</text>
        {[0, 1, 2, 3].map((i) => fa(60 + i * 130, 52, `FA${i}`))}
        {[0, 1, 2].map((i) => {
          const x = 60 + i * 130 + 64;
          return (
            <g key={i}>
              <line x1={x} y1="72" x2={x + 66} y2="72" stroke={C.hole} strokeWidth="2" />
              <polygon points={`${x + 66},72 ${x + 58},68 ${x + 58},76`} fill={C.hole} />
            </g>
          );
        })}
        <text x="300" y="116" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.hole}>critical path = N stages → O(N), slow</text>

        {/* LOOKAHEAD */}
        <text x="40" y="168" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.on}>LOOKAHEAD — all carries computed at once</text>
        <rect x="60" y="184" width="480" height="30" rx="6" fill="rgba(5,150,105,0.12)" stroke={C.on} strokeWidth="1.5" />
        <text x="300" y="204" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.on}>carry-lookahead unit:  G = A·B,  P = A⊕B  →  every Cᵢ in parallel</text>
        {[0, 1, 2, 3].map((i) => {
          const x = 92 + i * 120;
          return (
            <g key={i}>
              <line x1={x} y1="214" x2={x} y2="236" stroke={C.electron} strokeWidth="2" />
              <polygon points={`${x},236 ${x - 4},228 ${x + 4},228`} fill={C.electron} />
              <text x={x} y="250" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.electron}>C{i}</text>
            </g>
          );
        })}
      </svg>
    </DiagramFrame>
  );
}

/* 1-to-4 demultiplexer (the mirror of a MUX). */
export function DemuxDiagram({ caption }: { caption?: string }) {
  const outs = [68, 102, 136, 170];
  return (
    <DiagramFrame caption={caption} maxWidth={440}>
      <svg viewBox="0 0 440 230" width="100%" role="img" aria-label="1-to-4 demultiplexer">
        <path d="M180,90 L180,150 L260,190 L260,50 Z" fill={C.panel2} stroke={C.teal} strokeWidth="1.5" />
        <text x="220" y="124" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.text}>DEMUX</text>
        {/* input */}
        <line x1="90" y1="120" x2="180" y2="120" stroke={C.faint} strokeWidth="1.5" />
        <text x="78" y="124" textAnchor="end" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.text}>D</text>
        {/* outputs */}
        {outs.map((y, i) => (
          <g key={i}>
            <line x1="260" y1={y} x2="340" y2={y} stroke={i === 1 ? C.electron : C.faint} strokeWidth="1.5" />
            <text x="350" y={y + 4} fontFamily={mono} fontSize="12" fontWeight="700" fill={i === 1 ? C.electron : C.muted}>Y{i}</text>
          </g>
        ))}
        {/* select */}
        <line x1="210" y1="210" x2="210" y2="170" stroke={C.gate} strokeWidth="1.5" />
        <text x="210" y="226" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.gate}>S1 S0</text>
        <text x="220" y="32" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>S picks which output D is routed to (here S=01 → Y1)</text>
      </svg>
    </DiagramFrame>
  );
}

/* N-bit equality comparator: XNOR per bit, AND together. */
export function ComparatorDiagram({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={500}>
      <svg viewBox="0 0 500 230" width="100%" role="img" aria-label="Equality comparator from XNOR and AND gates">
        {/* bit 1 */}
        <text x="20" y="52" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.text}>A1</text>
        <text x="20" y="78" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.text}>B1</text>
        <line x1="34" y1="48" x2="60" y2="48" stroke={C.faint} strokeWidth="1.5" />
        <line x1="34" y1="74" x2="60" y2="74" stroke={C.faint} strokeWidth="1.5" />
        <GateIcon type="XNOR" x={66} y={41} stroke={C.teal} />
        {/* bit 0 */}
        <text x="20" y="142" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.text}>A0</text>
        <text x="20" y="168" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.text}>B0</text>
        <line x1="34" y1="138" x2="60" y2="138" stroke={C.faint} strokeWidth="1.5" />
        <line x1="34" y1="164" x2="60" y2="164" stroke={C.faint} strokeWidth="1.5" />
        <GateIcon type="XNOR" x={66} y={131} stroke={C.teal} />
        {/* AND of the two XNOR outputs */}
        <line x1="142" y1="61" x2="300" y2="61" stroke={C.faint} strokeWidth="1.5" />
        <line x1="300" y1="61" x2="300" y2="98" stroke={C.faint} strokeWidth="1.5" />
        <line x1="142" y1="151" x2="300" y2="151" stroke={C.faint} strokeWidth="1.5" />
        <line x1="300" y1="151" x2="300" y2="122" stroke={C.faint} strokeWidth="1.5" />
        <line x1="300" y1="98" x2="316" y2="98" stroke={C.faint} strokeWidth="1.5" />
        <line x1="300" y1="122" x2="316" y2="122" stroke={C.faint} strokeWidth="1.5" />
        <GateIcon type="AND" x={322} y={90} stroke={C.electron} />
        <line x1="390" y1="110" x2="420" y2="110" stroke={C.electron} strokeWidth="1.5" />
        <text x="426" y="114" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.electron}>A=B</text>
        <text x="250" y="212" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>each bit XNORs to 1 when it matches · AND them → equal only if every bit matches</text>
      </svg>
    </DiagramFrame>
  );
}

/* 3-bit ripple counter from toggle (T) flip-flops + count sequence. */
export function RippleCounterDiagram({ caption }: { caption?: string }) {
  const bits = [0, 1, 2];
  const seq = ["000", "001", "010", "011", "100", "101", "110", "111"];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 240" width="100%" role="img" aria-label="3-bit ripple counter from T flip-flops">
        <text x="20" y="58" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.gate}>CLK</text>
        <line x1="50" y1="60" x2="90" y2="60" stroke={C.gate} strokeWidth="1.5" />
        {bits.map((b, i) => {
          const x = 90 + i * 150;
          return (
            <g key={b}>
              <rect x={x} y={40} width="96" height="56" rx="6" fill={C.panel2} stroke={C.teal} strokeWidth="1.5" />
              <text x={x + 48} y={64} textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.text}>T-FF</text>
              <text x={x + 48} y={82} textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>T=1 (toggle)</text>
              {/* Q out */}
              <line x1={x + 96} y1="68" x2={x + 124} y2="68" stroke={C.electron} strokeWidth="1.5" />
              <text x={x + 110} y="58" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.electron}>Q{b}</text>
              {/* Q feeds next stage's clock */}
              {i < 2 && <line x1={x + 110} y1="68" x2={x + 110} y2="120" stroke={C.gate} strokeWidth="1.5" />}
              {i < 2 && <line x1={x + 110} y1="120" x2={x + 240} y2="120" stroke={C.gate} strokeWidth="1.5" />}
              {i < 2 && <line x1={x + 240} y1="120" x2={x + 240} y2="96" stroke={C.gate} strokeWidth="1.5" />}
            </g>
          );
        })}
        <text x="280" y="150" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.gate}>each Q clocks the next flip-flop → each bit toggles half as often</text>
        {/* count sequence */}
        {seq.map((s, i) => (
          <g key={s}>
            <rect x={56 + i * 56} y={172} width="46" height="30" rx="4" fill={i === 0 ? "rgba(14,156,147,0.18)" : C.ink} stroke={C.line} />
            <text x={56 + i * 56 + 23} y={192} textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.electron}>{s}</text>
            {i < 7 && <text x={56 + i * 56 + 50} y={192} textAnchor="middle" fontFamily={mono} fontSize="11" fill={C.faint}>→</text>}
          </g>
        ))}
        <text x="280" y="224" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>Q2 Q1 Q0 counts 0 → 7 in binary, then wraps</text>
      </svg>
    </DiagramFrame>
  );
}

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
