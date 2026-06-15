import { C, DiagramFrame, mono } from "./_shared";


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
    <g key={label}>
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

