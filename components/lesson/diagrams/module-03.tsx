import type { ReactNode } from "react";
import { C, DiagramFrame, mono } from "./_shared";

/* ════════════════════════════════════════════════════════════
   3.1 — Machine Learning Overview
   ════════════════════════════════════════════════════════════ */

/* The ML landscape: four learning paradigms and their core tasks. */
export function MLLandscape({ caption }: { caption?: string }) {
  const branches = [
    { t: "SUPERVISED", c: C.violet, items: ["Regression", "Classification"], sub: "labeled (x, y)" },
    { t: "UNSUPERVISED", c: C.blue, items: ["Clustering", "Dim. reduction"], sub: "inputs only" },
    { t: "SELF-SUPERVISED", c: C.on, items: ["Next-token", "Masked modelling"], sub: "labels from data" },
    { t: "REINFORCEMENT", c: C.gate, items: ["Policy / reward", "RLHF"], sub: "act → reward" },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={640}>
      <svg viewBox="0 0 640 250" width="100%" role="img" aria-label="The machine learning landscape">
        <rect x="250" y="14" width="140" height="34" rx="8" fill={`${C.violet}1f`} stroke={C.violet} strokeWidth="1.5" />
        <text x="320" y="36" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.violet}>MACHINE LEARNING</text>
        {branches.map((b, i) => {
          const x = 18 + i * 155;
          return (
            <g key={b.t}>
              <line x1="320" y1="48" x2={x + 67} y2="78" stroke={C.line} strokeWidth="1" />
              <rect x={x} y={78} width="134" height="150" rx="8" fill={C.panel} stroke={b.c} strokeWidth="1.3" />
              <text x={x + 67} y={97} textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={b.c}>{b.t}</text>
              <text x={x + 67} y={111} textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>{b.sub}</text>
              {b.items.map((it, j) => (
                <g key={it}>
                  <rect x={x + 12} y={124 + j * 34} width="110" height="26" rx="5" fill={`${b.c}1a`} stroke={`${b.c}66`} />
                  <text x={x + 67} y={141 + j * 34} textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="600" fill={C.text}>{it}</text>
                </g>
              ))}
            </g>
          );
        })}
        <text x="320" y="244" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>every box is "find weights θ so f(x;θ) ≈ y" — only the supervision differs</text>
      </svg>
    </DiagramFrame>
  );
}

/* Train / validation / test split. */
export function DataSplitBar({ caption }: { caption?: string }) {
  const parts = [
    { n: "TRAIN", pct: "70%", w: 350, c: C.violet, role: "learn" },
    { n: "VAL", pct: "15%", w: 75, c: C.gate, role: "tune" },
    { n: "TEST", pct: "15%", w: 75, c: C.on, role: "judge" },
  ];
  let x = 44;
  return (
    <DiagramFrame caption={caption} maxWidth={600}>
      <svg viewBox="0 0 600 150" width="100%" role="img" aria-label="Train validation test data split">
        {parts.map((p) => {
          const cx = x + p.w / 2;
          const el = (
            <g key={p.n}>
              <rect x={x} y={36} width={p.w} height={44} rx={6} fill={`${p.c}26`} stroke={p.c} strokeWidth="1.4" />
              <text x={cx} y={56} textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={p.c}>{p.n}</text>
              <text x={cx} y={72} textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>{p.pct}</text>
              <text x={cx} y={100} textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={p.c}>{p.role}</text>
            </g>
          );
          x += p.w + 6;
          return el;
        })}
        <text x="300" y="128" textAnchor="middle" fontFamily={mono} fontSize="9.5" fill={C.muted}>
          the test set must never touch a single decision — it is your only honest estimate of real-world accuracy
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* Bias–variance tradeoff: total error is a U over model complexity. */
export function BiasVarianceCurve({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 290" width="100%" role="img" aria-label="The bias-variance tradeoff">
        <line x1="60" y1="240" x2="520" y2="240" stroke={C.faint} strokeWidth="1.2" />
        <line x1="60" y1="30" x2="60" y2="240" stroke={C.faint} strokeWidth="1.2" />
        <text x="290" y="266" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>model complexity →</text>
        <text x="26" y="140" fontFamily={mono} fontSize="10" fill={C.muted} transform="rotate(-90 26 140)">error</text>

        {/* bias² (decreasing) */}
        <path d="M 70 66 C 190 120, 330 212, 510 228" fill="none" stroke={C.blue} strokeWidth="2" />
        <text x="92" y="60" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.blue}>bias²</text>
        {/* variance (increasing) */}
        <path d="M 70 228 C 250 220, 380 120, 510 52" fill="none" stroke={C.hole} strokeWidth="2" />
        <text x="506" y="46" textAnchor="end" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.hole}>variance</text>
        {/* total error (U) */}
        <path d="M 70 120 C 180 176, 250 178, 292 176 C 372 172, 440 116, 510 72" fill="none" stroke={C.violet} strokeWidth="2.8" />
        <text x="150" y="150" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.violet}>total error</text>

        {/* sweet spot */}
        <line x1="292" y1="176" x2="292" y2="240" stroke={C.on} strokeWidth="1.3" strokeDasharray="4 3" />
        <circle cx="292" cy="176" r="4.5" fill={C.on} />
        <text x="292" y="256" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.on}>sweet spot</text>
        <text x="140" y="232" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>underfit</text>
        <text x="450" y="232" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>overfit</text>
      </svg>
    </DiagramFrame>
  );
}

/* Gradient descent stepping down a loss valley. */
export function GradientDescentLandscape({ caption }: { caption?: string }) {
  const yAt = (x: number) => { const t = (x - 280) / 210; return 210 - 140 * t * t; };
  const curve = [];
  for (let x = 70; x <= 490; x += 7) curve.push(`${x},${yAt(x).toFixed(1)}`);
  const steps = [108, 150, 192, 226, 252, 270, 280];
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 250" width="100%" role="img" aria-label="Gradient descent down a loss valley">
        <text x="26" y="130" fontFamily={mono} fontSize="10" fill={C.muted} transform="rotate(-90 26 130)">loss</text>
        <text x="280" y="244" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>parameter θ →</text>
        <polyline points={curve.join(" ")} fill="none" stroke={C.violet} strokeWidth="2.4" />
        {steps.map((x, i) => {
          const y = yAt(x);
          return (
            <g key={x}>
              <circle cx={x} cy={y} r={i === steps.length - 1 ? 5.5 : 4} fill={i === steps.length - 1 ? C.on : C.gate} />
              {i < steps.length - 1 && (
                <line x1={x} y1={y} x2={steps[i + 1]} y2={yAt(steps[i + 1])} stroke={C.gate} strokeWidth="1.2" strokeDasharray="3 2" />
              )}
            </g>
          );
        })}
        <text x="108" y="78" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.gate}>start</text>
        <text x="300" y="206" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.on}>θ* (minimum)</text>
        <text x="150" y="150" fontFamily={mono} fontSize="8.5" fill={C.muted}>step = −α·∇L</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   3.2 — Classical ML & Ensembling
   ════════════════════════════════════════════════════════════ */

/* A small decision tree splitting on feature tests down to class leaves. */
export function DecisionTreeDiagram({ caption }: { caption?: string }) {
  const node = (x: number, y: number, w: number, label: string, c: string, leaf = false) => (
    <g>
      <rect x={x - w / 2} y={y} width={w} height="30" rx={leaf ? 15 : 6}
        fill={leaf ? `${c}26` : C.panel} stroke={c} strokeWidth="1.4" />
      <text x={x} y={y + 19} textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight={leaf ? "700" : "600"} fill={leaf ? c : C.text}>{label}</text>
    </g>
  );
  const edge = (x1: number, y1: number, x2: number, y2: number, lbl: string) => (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.line} strokeWidth="1.3" />
      <text x={(x1 + x2) / 2 + (lbl === "yes" ? 8 : -8)} y={(y1 + y2) / 2} textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>{lbl}</text>
    </g>
  );
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 260" width="100%" role="img" aria-label="A decision tree classifying loan applications">
        {edge(260, 50, 150, 110, "no")}
        {edge(260, 50, 380, 110, "yes")}
        {edge(380, 140, 320, 200, "no")}
        {edge(380, 140, 450, 200, "yes")}
        {node(260, 20, 150, "income > ₹50k?", C.violet)}
        {node(150, 110, 110, "Deny", C.hole, true)}
        {node(380, 110, 140, "clean history?", C.violet)}
        {node(320, 200, 110, "Review", C.gate, true)}
        {node(450, 200, 110, "Approve", C.on, true)}
        <text x="260" y="248" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>each internal node tests one feature; each leaf is a decision — fully interpretable</text>
      </svg>
    </DiagramFrame>
  );
}

/* Bagging vs boosting vs stacking. */
export function EnsembleMethods({ caption }: { caption?: string }) {
  const box = (x: number, y: number, label: string, c: string) => (
    <g key={`box-${x}-${y}`}>
      <rect x={x} y={y} width="38" height="26" rx="4" fill={`${c}22`} stroke={c} strokeWidth="1.1" />
      <text x={x + 19} y={y + 17} textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={c}>{label}</text>
    </g>
  );
  const panel = (ox: number, title: string, sub: string, c: string, body: ReactNode) => (
    <g>
      <rect x={ox} y={30} width="180" height="156" rx="9" fill={C.panel} stroke={c} strokeWidth="1.3" />
      <text x={ox + 90} y={50} textAnchor="middle" fontFamily={mono} fontSize="10.5" fontWeight="700" fill={c}>{title}</text>
      <text x={ox + 90} y={64} textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>{sub}</text>
      {body}
    </g>
  );
  return (
    <DiagramFrame caption={caption} maxWidth={600}>
      <svg viewBox="0 0 600 210" width="100%" role="img" aria-label="Bagging, boosting and stacking ensembles">
        {/* Bagging: parallel models → vote */}
        {panel(10, "BAGGING", "parallel · ↓variance", C.blue, (
          <g>
            {[0, 1, 2].map((i) => box(28 + i * 52, 84, "M" + (i + 1), C.blue))}
            {[0, 1, 2].map((i) => <line key={i} x1={47 + i * 52} y1={110} x2={100} y2={146} stroke={C.line} strokeWidth="1" />)}
            {box(80, 146, "vote", C.violet)}
            <text x="100" y="180" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.faint}>Random Forest</text>
          </g>
        ))}
        {/* Boosting: sequential, fix residuals */}
        {panel(210, "BOOSTING", "sequential · ↓bias", C.gate, (
          <g>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                {box(228 + i * 52, 100, "M" + (i + 1), C.gate)}
                {i < 2 && <line x1={266 + i * 52} y1={113} x2={280 + i * 52} y2={113} stroke={C.gate} strokeWidth="1.2" />}
              </g>
            ))}
            <text x="300" y="150" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>each fixes prior errors</text>
            <text x="300" y="178" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.faint}>XGBoost · LightGBM</text>
          </g>
        ))}
        {/* Stacking: base models → meta-learner */}
        {panel(410, "STACKING", "base → meta", C.on, (
          <g>
            {[0, 1, 2].map((i) => box(430 + i * 50, 84, "M" + (i + 1), C.on))}
            {[0, 1, 2].map((i) => <line key={i} x1={449 + i * 50} y1={110} x2={500} y2={146} stroke={C.line} strokeWidth="1" />)}
            {box(481, 146, "meta", C.violet)}
            <text x="500" y="180" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.faint}>learned blend</text>
          </g>
        ))}
        <text x="300" y="204" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>combine many weak models into one strong one — the workhorse of tabular ML</text>
      </svg>
    </DiagramFrame>
  );
}

/* k-means: points grouped into colored clusters around centroids. */
export function KMeansClusters({ caption }: { caption?: string }) {
  const clusters = [
    { c: C.violet, cx: 130, cy: 120, pts: [[100, 95], [120, 110], [145, 100], [115, 140], [150, 135], [95, 125]] },
    { c: C.blue, cx: 330, cy: 95, pts: [[300, 70], [320, 90], [355, 80], [340, 115], [305, 110], [365, 100]] },
    { c: C.on, cx: 250, cy: 225, pts: [[220, 205], [245, 220], [275, 210], [235, 245], [270, 240], [255, 195]] },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={460}>
      <svg viewBox="0 0 460 290" width="100%" role="img" aria-label="k-means clustering of points into three groups">
        {clusters.map((cl, ci) => (
          <g key={ci}>
            {cl.pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" fill={`${cl.c}55`} stroke={cl.c} strokeWidth="1" />)}
            <g stroke={cl.c} strokeWidth="2.4">
              <line x1={cl.cx - 7} y1={cl.cy - 7} x2={cl.cx + 7} y2={cl.cy + 7} />
              <line x1={cl.cx - 7} y1={cl.cy + 7} x2={cl.cx + 7} y2={cl.cy - 7} />
            </g>
          </g>
        ))}
        <g transform="translate(360,210)">
          <line x1="0" y1="-6" x2="0" y2="6" stroke={C.muted} strokeWidth="2.4" transform="rotate(45)" />
          <line x1="0" y1="-6" x2="0" y2="6" stroke={C.muted} strokeWidth="2.4" transform="rotate(-45)" />
          <text x="12" y="4" fontFamily={mono} fontSize="9" fill={C.muted}>= centroid</text>
        </g>
        <text x="230" y="280" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>no labels — the algorithm discovers the groups by minimizing distance to centroids</text>
      </svg>
    </DiagramFrame>
  );
}

/* Decision framework: classical ML vs deep learning. */
export function ClassicalVsDeep({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={580}>
      <svg viewBox="0 0 580 280" width="100%" role="img" aria-label="When to use classical ML versus deep learning">
        <rect x="200" y="14" width="180" height="36" rx="8" fill={`${C.violet}1f`} stroke={C.violet} strokeWidth="1.5" />
        <text x="290" y="37" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.violet}>what is your data?</text>
        <line x1="240" y1="50" x2="150" y2="78" stroke={C.line} strokeWidth="1.2" />
        <line x1="340" y1="50" x2="430" y2="78" stroke={C.line} strokeWidth="1.2" />

        {/* Classical */}
        <rect x="22" y="78" width="256" height="172" rx="10" fill={C.panel} stroke={C.gate} strokeWidth="1.4" />
        <text x="150" y="100" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.gate}>CLASSICAL ML</text>
        {["tabular / structured rows", "small–medium data", "interpretability matters", "runs fast on CPU"].map((t, i) => (
          <text key={t} x="44" y={124 + i * 22} fontFamily={mono} fontSize="9.5" fill={C.text}>· {t}</text>
        ))}
        <rect x="44" y="214" width="212" height="26" rx="6" fill={`${C.gate}22`} stroke={C.gate} />
        <text x="150" y="231" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.gate}>→ gradient-boosted trees</text>

        {/* Deep */}
        <rect x="302" y="78" width="256" height="172" rx="10" fill={C.panel} stroke={C.on} strokeWidth="1.4" />
        <text x="430" y="100" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.on}>DEEP LEARNING</text>
        {["images · audio · text", "very large datasets", "raw / high-dim signals", "GPU / accelerator budget"].map((t, i) => (
          <text key={t} x="324" y={124 + i * 22} fontFamily={mono} fontSize="9.5" fill={C.text}>· {t}</text>
        ))}
        <rect x="324" y="214" width="212" height="26" rx="6" fill={`${C.on}22`} stroke={C.on} />
        <text x="430" y="231" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.on}>→ neural networks</text>

        <text x="290" y="270" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>on tabular data, boosted trees still beat deep nets more often than not</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   3.3 — Neural Networks from Scratch
   ════════════════════════════════════════════════════════════ */

/* The artificial neuron: weighted sum (a MAC) + activation. */
export function NeuronMAC({ caption }: { caption?: string }) {
  const inputs = [["x₁", "w₁"], ["x₂", "w₂"], ["x₃", "w₃"]];
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 210" width="100%" role="img" aria-label="An artificial neuron as a MAC plus activation">
        <text x="240" y="28" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.violet}>the dot product wᵀx is exactly the MAC from Module 1</text>
        {inputs.map(([xi, wi], i) => {
          const y = 56 + i * 44;
          return (
            <g key={xi}>
              <circle cx="46" cy={y} r="17" fill={C.panel} stroke={C.blue} strokeWidth="1.3" />
              <text x="46" y={y + 4} textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.text}>{xi}</text>
              <line x1="63" y1={y} x2="212" y2="110" stroke={C.line} strokeWidth="1.2" />
              <text x="140" y={y + (i === 0 ? -3 : i === 1 ? -6 : 8)} fontFamily={mono} fontSize="9" fontWeight="700" fill={C.gate}>{wi}</text>
            </g>
          );
        })}
        <text x="46" y="192" textAnchor="middle" fontFamily={mono} fontSize="14" fill={C.muted}>⋮</text>
        <circle cx="240" cy="110" r="30" fill={C.panel} stroke={C.violet} strokeWidth="1.5" />
        <text x="240" y="106" textAnchor="middle" fontFamily={mono} fontSize="15" fontWeight="700" fill={C.violet}>Σ</text>
        <text x="240" y="122" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>+ b</text>
        <text x="240" y="162" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>z = wᵀx + b</text>
        <line x1="270" y1="110" x2="322" y2="110" stroke={C.line} strokeWidth="1.3" />
        <rect x="322" y="86" width="72" height="48" rx="8" fill={C.panel} stroke={C.on} strokeWidth="1.4" />
        <text x="358" y="108" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.on}>f(z)</text>
        <text x="358" y="123" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>activation</text>
        <line x1="394" y1="110" x2="452" y2="110" stroke={C.line} strokeWidth="1.3" />
        <text x="474" y="114" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.text}>a</text>
      </svg>
    </DiagramFrame>
  );
}

/* The common activation functions, as little plots. */
export function ActivationFunctions({ caption }: { caption?: string }) {
  const plot = (ox: number, name: string, c: string, d: string) => (
    <g transform={`translate(${ox},0)`}>
      <rect x={0} y={26} width="120" height="100" rx="6" fill={C.panel} stroke={C.line} />
      <line x1={12} y1={80} x2={108} y2={80} stroke={C.faint} strokeWidth="0.8" />
      <line x1={60} y1={34} x2={60} y2={120} stroke={C.faint} strokeWidth="0.8" />
      <path d={d} fill="none" stroke={c} strokeWidth="2.2" />
      <text x={60} y={146} textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={c}>{name}</text>
    </g>
  );
  return (
    <DiagramFrame caption={caption} maxWidth={620}>
      <svg viewBox="0 0 620 165" width="100%" role="img" aria-label="Activation functions sigmoid tanh ReLU GELU">
        {plot(15, "sigmoid", C.blue, "M 16 116 C 48 116, 56 44, 104 44")}
        {plot(165, "tanh", C.electron, "M 16 118 C 52 118, 52 42, 104 42")}
        {plot(315, "ReLU", C.on, "M 16 80 L 60 80 L 104 44")}
        {plot(465, "GELU", C.violet, "M 16 84 C 46 84, 53 80, 60 75 L 104 44")}
      </svg>
    </DiagramFrame>
  );
}

/* A multi-layer perceptron: fully-connected layers of neurons. */
export function MLPArchitecture({ caption }: { caption?: string }) {
  const layers = [{ n: 3, label: "input" }, { n: 4, label: "hidden" }, { n: 4, label: "hidden" }, { n: 2, label: "output" }];
  const colX = [70, 200, 330, 460];
  const cy = 122;
  const pos = layers.map((L, li) => Array.from({ length: L.n }, (_, i) => [colX[li], cy - (L.n - 1) * 22 + i * 44] as [number, number]));
  return (
    <DiagramFrame caption={caption} maxWidth={530}>
      <svg viewBox="0 0 530 250" width="100%" role="img" aria-label="A multi-layer perceptron architecture">
        {pos.slice(0, -1).map((col, li) =>
          col.map(([x1, y1], i) =>
            pos[li + 1].map(([x2, y2], j) => (
              <line key={`e${li}-${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.line} strokeWidth="0.5" />
            ))
          )
        )}
        {pos.map((col, li) =>
          col.map(([x, y], i) => (
            <circle key={`n${li}-${i}`} cx={x} cy={y} r="13"
              fill={C.panel} stroke={li === 0 ? C.blue : li === 3 ? C.on : C.violet} strokeWidth="1.4" />
          ))
        )}
        {layers.map((L, li) => (
          <text key={`l${li}`} x={colX[li]} y={230} textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700"
            fill={li === 0 ? C.blue : li === 3 ? C.on : C.violet}>{L.label}</text>
        ))}
        <text x="265" y="22" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>each layer: Hˡ = f(Wˡ·Hˡ⁻¹ + bˡ) — a matrix multiply (Module 2) + activation</text>
      </svg>
    </DiagramFrame>
  );
}

/* Forward stores activations; backward flows gradients via the chain rule. */
export function BackpropFlow({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 200" width="100%" role="img" aria-label="Forward and backward passes of backpropagation">
        {/* forward arrow */}
        <line x1="50" y1="42" x2="500" y2="42" stroke={C.on} strokeWidth="1.8" />
        <polygon points="500,42 491,37 491,47" fill={C.on} />
        <text x="270" y="32" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.on}>forward — compute outputs, store every activation</text>
        {["Layer 1", "Layer 2", "Layer 3"].map((L, i) => {
          const x = 50 + i * 150;
          return (
            <g key={L}>
              <rect x={x} y={70} width="110" height="52" rx="8" fill={C.panel} stroke={C.violet} strokeWidth="1.3" />
              <text x={x + 55} y={100} textAnchor="middle" fontFamily={mono} fontSize="10.5" fontWeight="700" fill={C.text}>{L}</text>
            </g>
          );
        })}
        <rect x="500" y="74" width="48" height="44" rx="8" fill={`${C.hole}22`} stroke={C.hole} strokeWidth="1.3" />
        <text x="524" y="100" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.hole}>loss</text>
        {/* backward arrow */}
        <line x1="500" y1="152" x2="50" y2="152" stroke={C.hole} strokeWidth="1.8" />
        <polygon points="50,152 59,147 59,157" fill={C.hole} />
        <text x="270" y="174" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.hole}>backward — chain-rule gradients, layer by layer</text>
        <text x="270" y="190" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>storing all activations is why training needs ~15–24× the memory of inference</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   3.4 — Convolutional Neural Networks
   ════════════════════════════════════════════════════════════ */

/* 2D convolution: a filter slides over the input, producing a feature map. */
export function ConvolutionOp({ caption }: { caption?: string }) {
  const cell = 26;
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 230" width="100%" role="img" aria-label="2D convolution sliding a filter over an input">
        <text x="105" y="40" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.text}>input</text>
        {Array.from({ length: 25 }, (_, k) => {
          const r = Math.floor(k / 5), c = k % 5;
          const inF = r < 3 && c < 3;
          return <rect key={k} x={40 + c * cell} y={54 + r * cell} width={cell - 2} height={cell - 2} rx="2"
            fill={inF ? `${C.gate}33` : C.panel} stroke={inF ? C.gate : C.line} strokeWidth={inF ? 1.4 : 0.8} />;
        })}
        <text x="105" y="208" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.gate}>3×3 filter</text>

        <text x="280" y="120" textAnchor="middle" fontFamily={mono} fontSize="20" fill={C.violet}>⊛</text>
        <path d="M 200 95 C 260 95, 300 100, 372 100" fill="none" stroke={C.line} strokeWidth="1.2" strokeDasharray="4 3" />
        <polygon points="372,100 363,95 363,105" fill={C.faint} />

        <text x="420" y="40" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.text}>feature map</text>
        {Array.from({ length: 9 }, (_, k) => {
          const r = Math.floor(k / 3), c = k % 3;
          const hot = r === 0 && c === 0;
          return <rect key={k} x={380 + c * cell} y={70 + r * cell} width={cell - 2} height={cell - 2} rx="2"
            fill={hot ? `${C.on}33` : C.panel} stroke={hot ? C.on : C.line} strokeWidth={hot ? 1.4 : 0.8} />;
        })}
        <text x="280" y="208" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>each output = Σ (filter × input patch) — a dot product, i.e. a MAC sum</text>
      </svg>
    </DiagramFrame>
  );
}

/* Dilated convolution: same 9 weights, but spaced out to widen the receptive field. */
export function DilatedConvolution({ caption }: { caption?: string }) {
  const cell = 22;
  // 7×7 input grids. Standard conv taps a contiguous 3×3; dilated (d=2) taps
  // every other cell, covering a 5×5 region with the same 9 weights.
  const std = (r: number, c: number) => r >= 1 && r <= 3 && c >= 1 && c <= 3;
  const dil = (r: number, c: number) => [1, 3, 5].includes(r) && [1, 3, 5].includes(c);
  const grid = (x0: number, hot: (r: number, c: number) => boolean, col: string) =>
    Array.from({ length: 49 }, (_, k) => {
      const r = Math.floor(k / 7), c = k % 7;
      const on = hot(r, c);
      return <rect key={k} x={x0 + c * cell} y={50 + r * cell} width={cell - 3} height={cell - 3} rx="2"
        fill={on ? `${col}40` : C.panel} stroke={on ? col : C.line} strokeWidth={on ? 1.4 : 0.7} />;
    });
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 240" width="100%" role="img" aria-label="Dilated convolution versus standard convolution">
        {/* standard */}
        <text x="103" y="40" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.text}>standard 3×3</text>
        {grid(30, std, C.gate)}
        <text x="103" y="222" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.muted}>9 weights · sees 3×3</text>

        {/* dilated */}
        <text x="385" y="40" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.text}>dilated 3×3 (d=2)</text>
        {grid(312, dil, C.violet)}
        {/* receptive-field outline on the dilated grid */}
        <rect x={312 + 1 * cell - 2} y={50 + 1 * cell - 2} width={5 * cell - 1} height={5 * cell - 1} rx="3"
          fill="none" stroke={C.violet} strokeWidth="1.1" strokeDasharray="4 3" opacity="0.7" />
        <text x="385" y="222" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.violet}>same 9 weights · sees 5×5</text>

        <text x="280" y="236" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>spacing the taps grows the receptive field exponentially with depth — no extra parameters, no pooling</text>
      </svg>
    </DiagramFrame>
  );
}

/* Max pooling: each 2×2 region collapses to its maximum. */
export function PoolingDiagram({ caption }: { caption?: string }) {
  const grid = [[3, 1, 2, 4], [1, 5, 0, 2], [7, 2, 8, 1], [0, 3, 4, 6]];
  const out = [[5, 4], [7, 8]];
  const quad = (r: number, c: number) => (r < 2 ? (c < 2 ? C.violet : C.blue) : (c < 2 ? C.gate : C.on));
  const cell = 30;
  return (
    <DiagramFrame caption={caption} maxWidth={500}>
      <svg viewBox="0 0 500 220" width="100%" role="img" aria-label="2x2 max pooling downsampling">
        <text x="100" y="34" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.text}>4×4 input</text>
        {grid.flatMap((row, r) => row.map((v, c) => {
          const col = quad(r, c);
          return (
            <g key={`${r}-${c}`}>
              <rect x={30 + c * cell} y={46 + r * cell} width={cell - 2} height={cell - 2} rx="2" fill={`${col}22`} stroke={col} strokeWidth="0.9" />
              <text x={30 + c * cell + 14} y={46 + r * cell + 19} textAnchor="middle" fontFamily={mono} fontSize="11" fill={C.text}>{v}</text>
            </g>
          );
        }))}
        <text x="270" y="110" textAnchor="middle" fontFamily={mono} fontSize="11" fill={C.muted}>max →</text>
        <line x1="220" y1="100" x2="300" y2="100" stroke={C.line} strokeWidth="1.2" />
        <text x="400" y="34" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.text}>2×2 output</text>
        {out.flatMap((row, r) => row.map((v, c) => {
          const col = quad(r * 2, c * 2);
          return (
            <g key={`o${r}-${c}`}>
              <rect x={360 + c * cell} y={70 + r * cell} width={cell - 2} height={cell - 2} rx="2" fill={`${col}33`} stroke={col} strokeWidth="1.3" />
              <text x={360 + c * cell + 14} y={70 + r * cell + 19} textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.text}>{v}</text>
            </g>
          );
        }))}
        <text x="250" y="204" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>halves the spatial size, keeps the strongest activation — cheap translation invariance</text>
      </svg>
    </DiagramFrame>
  );
}

/* ResNet residual block: a skip connection adds the input back. */
export function ResNetSkipBlock({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 220" width="100%" role="img" aria-label="ResNet residual block with a skip connection">
        <text x="30" y="118" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.text}>x</text>
        <line x1="44" y1="114" x2="92" y2="114" stroke={C.line} strokeWidth="1.3" />
        <rect x="92" y="92" width="92" height="44" rx="8" fill={C.panel} stroke={C.violet} strokeWidth="1.3" />
        <text x="138" y="118" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.violet}>weight·ReLU</text>
        <line x1="184" y1="114" x2="216" y2="114" stroke={C.line} strokeWidth="1.3" />
        <rect x="216" y="92" width="92" height="44" rx="8" fill={C.panel} stroke={C.violet} strokeWidth="1.3" />
        <text x="262" y="118" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.violet}>weight</text>
        <line x1="308" y1="114" x2="356" y2="114" stroke={C.line} strokeWidth="1.3" />
        {/* add node */}
        <circle cx="378" cy="114" r="20" fill={C.panel} stroke={C.on} strokeWidth="1.6" />
        <text x="378" y="120" textAnchor="middle" fontFamily={mono} fontSize="18" fill={C.on}>+</text>
        <line x1="398" y1="114" x2="450" y2="114" stroke={C.line} strokeWidth="1.3" />
        <text x="476" y="118" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.text}>ReLU</text>
        {/* skip connection */}
        <path d="M 30 100 C 30 50, 378 50, 378 92" fill="none" stroke={C.on} strokeWidth="1.8" strokeDasharray="5 3" />
        <polygon points="378,92 373,82 383,82" fill={C.on} />
        <text x="200" y="44" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.on}>skip connection (identity)</text>
        <text x="200" y="156" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>learn the residual F(x); output = F(x) + x</text>
        <text x="270" y="190" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>the +x gives every gradient a path of strength ≥ 1 — vanishing gradients can't kill it</text>
      </svg>
    </DiagramFrame>
  );
}

/* Receptive field: stacking layers widens what each neuron "sees". */
export function ReceptiveField({ caption }: { caption?: string }) {
  const rows = [
    { y: 50, n: 1, label: "output neuron", lit: [3] },
    { y: 110, n: 7, label: "layer 2", lit: [2, 3, 4] },
    { y: 170, n: 7, label: "input", lit: [1, 2, 3, 4, 5] },
  ];
  const x0 = 130, dx = 36;
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="Receptive field growing with depth">
        {/* connecting fans */}
        {rows.slice(0, -1).map((row, ri) =>
          row.lit.flatMap((ci) =>
            rows[ri + 1].lit.filter((cj) => Math.abs(cj - ci) <= 1).map((cj) => (
              <line key={`${ri}-${ci}-${cj}`} x1={x0 + ci * dx} y1={row.y} x2={x0 + cj * dx} y2={rows[ri + 1].y} stroke={C.line} strokeWidth="0.8" />
            ))
          )
        )}
        {rows.map((row, ri) => (
          <g key={ri}>
            {Array.from({ length: row.n }, (_, i) => {
              const lit = row.lit.includes(i);
              return <circle key={i} cx={x0 + i * dx} cy={row.y} r="10"
                fill={lit ? `${C.violet}33` : C.panel} stroke={lit ? C.violet : C.line} strokeWidth={lit ? 1.5 : 0.8} />;
            })}
            <text x={x0 - 22} y={row.y + 4} textAnchor="end" fontFamily={mono} fontSize="9" fill={C.muted}>{row.label}</text>
          </g>
        ))}
        <text x="260" y="206" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>each 3×3 layer widens the receptive field by 2 — depth lets one neuron see the whole image</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   3.5 — RNNs & Sequence Modelling
   ════════════════════════════════════════════════════════════ */

/* An RNN unrolled through time: same cell, hidden state passed forward. */
export function RNNUnroll({ caption }: { caption?: string }) {
  const steps = [1, 2, 3, 4];
  return (
    <DiagramFrame caption={caption} maxWidth={580}>
      <svg viewBox="0 0 580 200" width="100%" role="img" aria-label="An RNN unrolled across time steps">
        <text x="34" y="92" textAnchor="end" fontFamily={mono} fontSize="9" fill={C.muted}>h₀</text>
        <line x1="38" y1="88" x2="62" y2="88" stroke={C.electron} strokeWidth="1.5" />
        {steps.map((t, i) => {
          const x = 62 + i * 128;
          return (
            <g key={t}>
              <rect x={x} y={66} width="80" height="46" rx="8" fill={C.panel} stroke={C.violet} strokeWidth="1.4" />
              <text x={x + 40} y={94} textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.violet}>RNN</text>
              {/* input from below */}
              <line x1={x + 40} y1="150" x2={x + 40} y2="112" stroke={C.line} strokeWidth="1.2" />
              <text x={x + 40} y="166" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.text}>x{['₁', '₂', '₃', '₄'][i]}</text>
              {/* output above */}
              <line x1={x + 40} y1="66" x2={x + 40} y2="40" stroke={C.line} strokeWidth="1.2" />
              <text x={x + 40} y="32" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.on}>h{['₁', '₂', '₃', '₄'][i]}</text>
              {/* hidden state to next */}
              {i < 3 && <line x1={x + 80} y1="88" x2={x + 128} y2="88" stroke={C.electron} strokeWidth="1.5" />}
              {i < 3 && <polygon points={`${x + 128},88 ${x + 120},84 ${x + 120},92`} fill={C.electron} />}
            </g>
          );
        })}
        <text x="290" y="192" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>same weights every step; hidden state hₜ carries memory — but must be computed in sequence</text>
      </svg>
    </DiagramFrame>
  );
}

/* LSTM cell: a protected cell state regulated by forget/input/output gates. */
export function LSTMCell({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 240" width="100%" role="img" aria-label="An LSTM cell with forget, input and output gates">
        {/* cell-state conveyor belt */}
        <text x="40" y="52" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.electron}>cₜ₋₁</text>
        <line x1="58" y1="56" x2="150" y2="56" stroke={C.electron} strokeWidth="2.2" />
        {/* forget × */}
        <circle cx="170" cy="56" r="16" fill={C.panel} stroke={C.hole} strokeWidth="1.5" />
        <text x="170" y="61" textAnchor="middle" fontFamily={mono} fontSize="14" fill={C.hole}>×</text>
        <line x1="186" y1="56" x2="300" y2="56" stroke={C.electron} strokeWidth="2.2" />
        {/* input + */}
        <circle cx="320" cy="56" r="16" fill={C.panel} stroke={C.on} strokeWidth="1.5" />
        <text x="320" y="61" textAnchor="middle" fontFamily={mono} fontSize="16" fill={C.on}>+</text>
        <line x1="336" y1="56" x2="510" y2="56" stroke={C.electron} strokeWidth="2.2" />
        <text x="528" y="52" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.electron}>cₜ</text>

        {/* gates row */}
        {[
          { x: 150, t: "f", s: "forget σ", c: C.hole, to: 170 },
          { x: 280, t: "i", s: "input σ", c: C.on, to: 320 },
          { x: 350, t: "g", s: "cand. tanh", c: C.gate, to: 320 },
          { x: 430, t: "o", s: "output σ", c: C.blue, to: 470 },
        ].map((g) => (
          <g key={g.t}>
            <rect x={g.x - 26} y={120} width="52" height="34" rx="6" fill={C.panel} stroke={g.c} strokeWidth="1.3" />
            <text x={g.x} y={134} textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={g.c}>{g.t}</text>
            <text x={g.x} y={147} textAnchor="middle" fontFamily={mono} fontSize="6.5" fill={C.muted}>{g.s}</text>
            <line x1={g.x} y1={120} x2={g.to} y2={72} stroke={C.line} strokeWidth="1" strokeDasharray="3 2" />
          </g>
        ))}

        {/* output path */}
        <circle cx="470" cy="56" r="14" fill={C.panel} stroke={C.blue} strokeWidth="1.4" />
        <text x="470" y="61" textAnchor="middle" fontFamily={mono} fontSize="12" fill={C.blue}>×</text>
        <line x1="470" y1="70" x2="470" y2="190" stroke={C.line} strokeWidth="1.2" />
        <text x="470" y="206" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.on}>hₜ</text>

        {/* inputs */}
        <text x="180" y="206" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.text}>[ hₜ₋₁ , xₜ ]</text>
        <line x1="180" y1="192" x2="180" y2="158" stroke={C.line} strokeWidth="1.2" />
        <text x="280" y="228" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>the additive cell-state update lets gradients flow without vanishing — like a ResNet skip, across time</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   3.6 — Training vs Inference
   ════════════════════════════════════════════════════════════ */

/* Memory footprint: training carries gradients + optimiser + all activations. */
export function TrainInferenceMemory({ caption }: { caption?: string }) {
  const train = [
    { n: "activations (all layers)", h: 92, c: C.violet },
    { n: "optimiser state (Adam)", h: 56, c: C.hole },
    { n: "gradients", h: 28, c: C.gate },
    { n: "weights", h: 28, c: C.blue },
  ];
  const infer = [
    { n: "activations (one layer)", h: 14, c: C.violet },
    { n: "weights", h: 28, c: C.blue },
  ];
  const base = 232;
  const bar = (x: number, segs: { n: string; h: number; c: string }[]) => {
    let y = base;
    return segs.map((s) => {
      y -= s.h;
      return (
        <g key={s.n}>
          <rect x={x} y={y} width="84" height={s.h} fill={`${s.c}33`} stroke={s.c} strokeWidth="1.2" />
          {s.h >= 24 && <text x={x + 42} y={y + s.h / 2 + 3} textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.text}>{s.n.split(" ")[0]}</text>}
        </g>
      );
    });
  };
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 270" width="100%" role="img" aria-label="Training versus inference memory footprint">
        <line x1="60" y1="232" x2="500" y2="232" stroke={C.faint} strokeWidth="1" />
        {bar(120, train)}
        <text x="162" y="252" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.text}>TRAINING</text>
        <text x="162" y="266" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.muted}>≈ 15–24 × P</text>
        {bar(340, infer)}
        <text x="382" y="252" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.text}>INFERENCE</text>
        <text x="382" y="266" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.muted}>≈ 4–5 × P</text>
        {/* legend */}
        {train.map((s, i) => (
          <g key={s.n}>
            <rect x={250} y={40 + i * 20} width="11" height="11" rx="2" fill={`${s.c}33`} stroke={s.c} />
            <text x={266} y={49 + i * 20} fontFamily={mono} fontSize="8.5" fill={C.muted}>{s.n}</text>
          </g>
        ))}
        <text x="100" y="28" fontFamily={mono} fontSize="9" fill={C.faint}>memory →</text>
      </svg>
    </DiagramFrame>
  );
}

/* The three inference modes. */
export function InferenceModes({ caption }: { caption?: string }) {
  const modes = [
    { t: "BATCH", c: C.blue, d: "many inputs together", m: "max throughput · offline" },
    { t: "REAL-TIME", c: C.on, d: "one input, lowest latency", m: "SLA, e.g. 50 ms" },
    { t: "STREAMING", c: C.violet, d: "token by token", m: "TTFT + tokens/sec" },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={600}>
      <svg viewBox="0 0 600 180" width="100%" role="img" aria-label="Batch, real-time and streaming inference modes">
        {modes.map((mo, i) => {
          const x = 14 + i * 195;
          return (
            <g key={mo.t}>
              <rect x={x} y={26} width="178" height="120" rx="10" fill={C.panel} stroke={mo.c} strokeWidth="1.4" />
              <text x={x + 89} y={50} textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={mo.c}>{mo.t}</text>
              {/* mini glyph */}
              {i === 0 && Array.from({ length: 9 }, (_, k) => <rect key={k} x={x + 50 + (k % 3) * 24} y={66 + Math.floor(k / 3) * 16} width="18" height="11" rx="2" fill={`${mo.c}33`} stroke={mo.c} strokeWidth="0.7" />)}
              {i === 1 && <rect x={x + 74} y={74} width="30" height="26" rx="4" fill={`${mo.c}33`} stroke={mo.c} strokeWidth="1.2" />}
              {i === 2 && Array.from({ length: 4 }, (_, k) => <g key={k}><rect x={x + 38 + k * 26} y={78} width="20" height="18" rx="3" fill={`${mo.c}33`} stroke={mo.c} strokeWidth="0.9" />{k < 3 && <text x={x + 60 + k * 26} y={91} textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>→</text>}</g>)}
              <text x={x + 89} y={124} textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.text}>{mo.d}</text>
              <text x={x + 89} y={138} textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>{mo.m}</text>
            </g>
          );
        })}
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   3.7 — Model Evaluation
   ════════════════════════════════════════════════════════════ */

/* The confusion matrix. */
export function ConfusionMatrix({ caption }: { caption?: string }) {
  const cells = [
    { r: 0, c: 0, t: "TP", s: "true positive", col: C.on },
    { r: 0, c: 1, t: "FN", s: "false negative", col: C.hole },
    { r: 1, c: 0, t: "FP", s: "false positive", col: C.gate },
    { r: 1, c: 1, t: "TN", s: "true negative", col: C.blue },
  ];
  const x0 = 150, y0 = 70, cell = 110;
  return (
    <DiagramFrame caption={caption} maxWidth={440}>
      <svg viewBox="0 0 440 300" width="100%" role="img" aria-label="The confusion matrix">
        <text x={x0 + cell} y={34} textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.muted}>PREDICTED</text>
        <text x={x0 + cell / 2} y={54} textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>Positive</text>
        <text x={x0 + cell + cell / 2} y={54} textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>Negative</text>
        <text x={40} y={y0 + cell} textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.muted} transform={`rotate(-90 40 ${y0 + cell})`}>ACTUAL</text>
        <text x={70} y={y0 + cell / 2 + 3} textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>Pos</text>
        <text x={70} y={y0 + cell + cell / 2 + 3} textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>Neg</text>
        {cells.map((c) => (
          <g key={c.t}>
            <rect x={x0 + c.c * cell} y={y0 + c.r * cell} width={cell - 4} height={cell - 4} rx="6" fill={`${c.col}26`} stroke={c.col} strokeWidth="1.4" />
            <text x={x0 + c.c * cell + cell / 2 - 2} y={y0 + c.r * cell + cell / 2 - 6} textAnchor="middle" fontFamily={mono} fontSize="18" fontWeight="700" fill={c.col}>{c.t}</text>
            <text x={x0 + c.c * cell + cell / 2 - 2} y={y0 + c.r * cell + cell / 2 + 14} textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>{c.s}</text>
          </g>
        ))}
        <text x="220" y="294" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>precision = TP/(TP+FP) · recall = TP/(TP+FN)</text>
      </svg>
    </DiagramFrame>
  );
}

/* ROC curve and AUC. */
export function ROCCurve({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={400}>
      <svg viewBox="0 0 400 320" width="100%" role="img" aria-label="ROC curve and area under curve">
        <line x1="60" y1="260" x2="340" y2="260" stroke={C.faint} strokeWidth="1.2" />
        <line x1="60" y1="40" x2="60" y2="260" stroke={C.faint} strokeWidth="1.2" />
        <text x="200" y="292" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>false positive rate →</text>
        <text x="30" y="150" fontFamily={mono} fontSize="10" fill={C.muted} transform="rotate(-90 30 150)">true positive rate →</text>
        {/* random diagonal */}
        <line x1="60" y1="260" x2="340" y2="40" stroke={C.faint} strokeWidth="1.3" strokeDasharray="5 4" />
        <text x="250" y="170" fontFamily={mono} fontSize="8.5" fill={C.muted} transform="rotate(-38 250 170)">random (AUC 0.5)</text>
        {/* AUC fill */}
        <path d="M 60 260 C 80 110, 180 60, 340 40 L 340 260 Z" fill={`${C.violet}1f`} />
        {/* good model curve */}
        <path d="M 60 260 C 80 110, 180 60, 340 40" fill="none" stroke={C.violet} strokeWidth="2.6" />
        <text x="190" y="120" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.violet}>AUC → 1.0</text>
        <text x="200" y="312" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>AUC = P(model ranks a random positive above a random negative)</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   3.8 — Audio, Sampling & ASR/TTS
   ════════════════════════════════════════════════════════════ */

/* Sampling a continuous waveform into discrete samples. */
export function AudioSampling({ caption }: { caption?: string }) {
  const wave = [];
  for (let x = 60; x <= 500; x += 4) {
    const y = 100 - 42 * Math.sin((x - 60) / 28);
    wave.push(`${x},${y.toFixed(1)}`);
  }
  const samples = [];
  for (let x = 72; x <= 492; x += 30) samples.push(x);
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 200" width="100%" role="img" aria-label="Sampling a continuous waveform">
        <line x1="60" y1="100" x2="510" y2="100" stroke={C.faint} strokeWidth="0.8" />
        <polyline points={wave.join(" ")} fill="none" stroke={C.electron} strokeWidth="2" />
        {samples.map((x) => {
          const y = 100 - 42 * Math.sin((x - 60) / 28);
          return (
            <g key={x}>
              <line x1={x} y1="100" x2={x} y2={y.toFixed(1)} stroke={C.violet} strokeWidth="1.1" />
              <circle cx={x} cy={y.toFixed(1)} r="3.5" fill={C.violet} />
            </g>
          );
        })}
        <text x="285" y="34" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.electron}>continuous sound wave</text>
        <text x="285" y="168" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.violet}>measured fs times per second (e.g. 16 kHz)</text>
        <text x="285" y="186" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>Nyquist: fs must exceed 2× the highest frequency, or detail aliases away</text>
      </svg>
    </DiagramFrame>
  );
}

/* Waveform → STFT → spectrogram → mel filterbank. */
export function SpectrogramPipeline({ caption }: { caption?: string }) {
  const heat = (ox: number, oy: number, cols: number, rows: number, cs: number) =>
    Array.from({ length: cols * rows }, (_, k) => {
      const r = Math.floor(k / cols), c = k % cols;
      const op = 0.12 + 0.66 * Math.abs(Math.sin(c * 0.9 + r * 0.6) * Math.cos(r * 0.5));
      return <rect key={k} x={ox + c * cs} y={oy + r * cs} width={cs - 1} height={cs - 1} fill={C.violet} opacity={op.toFixed(2)} />;
    });
  const wave = [];
  for (let x = 0; x <= 70; x += 3) wave.push(`${20 + x},${90 - 16 * Math.sin(x / 5)}`);
  return (
    <DiagramFrame caption={caption} maxWidth={620}>
      <svg viewBox="0 0 620 190" width="100%" role="img" aria-label="Audio front-end: waveform to STFT spectrogram to mel">
        <polyline points={wave.join(" ")} fill="none" stroke={C.electron} strokeWidth="1.8" />
        <text x="55" y="120" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.muted}>waveform</text>

        <text x="150" y="86" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.blue}>STFT</text>
        <polygon points="130,92 178,92 170,100 138,100" fill={C.faint} /><line x1="120" y1="86" x2="180" y2="86" stroke={C.line} />

        {heat(200, 56, 10, 7, 11)}
        <text x="255" y="148" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.muted}>spectrogram (freq × time)</text>

        <text x="360" y="86" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.gate}>mel filters</text>
        <line x1="332" y1="92" x2="392" y2="92" stroke={C.line} /><polygon points="392,92 384,88 384,96" fill={C.faint} />

        {heat(420, 64, 10, 5, 11)}
        <text x="475" y="138" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.muted}>mel-spectrogram</text>
        <text x="310" y="178" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>the audio "image" a neural net consumes — convolve over it exactly like a picture (3.4)</text>
      </svg>
    </DiagramFrame>
  );
}

/* ASR: audio → mel → encoder/decoder → text (Whisper-style). */
export function ASRPipeline({ caption }: { caption?: string }) {
  const stage = (x: number, w: number, label: string, sub: string, c: string) => (
    <g>
      <rect x={x} y={60} width={w} height={48} rx="8" fill={C.panel} stroke={c} strokeWidth="1.4" />
      <text x={x + w / 2} y={82} textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={c}>{label}</text>
      <text x={x + w / 2} y={97} textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>{sub}</text>
    </g>
  );
  const arrow = (x: number) => <g><line x1={x} y1="84" x2={x + 26} y2="84" stroke={C.line} strokeWidth="1.3" /><polygon points={`${x + 26},84 ${x + 18},80 ${x + 18},88`} fill={C.faint} /></g>;
  return (
    <DiagramFrame caption={caption} maxWidth={600}>
      <svg viewBox="0 0 600 150" width="100%" role="img" aria-label="ASR pipeline from audio to text">
        {stage(16, 84, "audio", "16 kHz wave", C.electron)}
        {arrow(100)}
        {stage(132, 92, "mel-spec", "front-end (3.8)", C.gate)}
        {arrow(224)}
        {stage(256, 104, "encoder", "transformer", C.violet)}
        {arrow(360)}
        {stage(392, 104, "decoder", "→ tokens", C.blue)}
        {arrow(496)}
        {stage(520, 64, "text", "\"hello\"", C.on)}
        <text x="300" y="134" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>Whisper-style speech-to-text — memory-bound autoregressive decode, exactly like an LLM (Module 7)</text>
      </svg>
    </DiagramFrame>
  );
}

/* TTS: text → acoustic model → mel → vocoder → waveform. */
export function TTSPipeline({ caption }: { caption?: string }) {
  const stage = (x: number, w: number, label: string, sub: string, c: string) => (
    <g>
      <rect x={x} y={60} width={w} height={48} rx="8" fill={C.panel} stroke={c} strokeWidth="1.4" />
      <text x={x + w / 2} y={82} textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={c}>{label}</text>
      <text x={x + w / 2} y={97} textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>{sub}</text>
    </g>
  );
  const arrow = (x: number) => <g><line x1={x} y1="84" x2={x + 26} y2="84" stroke={C.line} strokeWidth="1.3" /><polygon points={`${x + 26},84 ${x + 18},80 ${x + 18},88`} fill={C.faint} /></g>;
  return (
    <DiagramFrame caption={caption} maxWidth={600}>
      <svg viewBox="0 0 600 150" width="100%" role="img" aria-label="TTS pipeline from text to audio">
        {stage(20, 70, "text", "\"hello\"", C.on)}
        {arrow(90)}
        {stage(122, 112, "acoustic model", "text → mel", C.violet)}
        {arrow(234)}
        {stage(266, 96, "mel-spec", "predicted", C.gate)}
        {arrow(362)}
        {stage(394, 100, "vocoder", "mel → wave", C.blue)}
        {arrow(494)}
        {stage(518, 66, "audio", "speech", C.electron)}
        <text x="300" y="134" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>text-to-speech is ASR run backwards — predict a mel-spectrogram, then a neural vocoder renders the wave</text>
      </svg>
    </DiagramFrame>
  );
}

/* Regression error: residuals between predictions and the fitted line. */
export function ResidualsDiagram({ caption }: { caption?: string }) {
  const pts: [number, number][] = [[80, 206], [125, 172], [170, 188], [215, 150], [258, 162], [302, 122], [346, 134], [392, 96]];
  const lineY = (x: number) => 214 + (96 - 214) * (x - 60) / (430 - 60);
  return (
    <DiagramFrame caption={caption} maxWidth={470}>
      <svg viewBox="0 0 470 280" width="100%" role="img" aria-label="Regression residuals and error metrics">
        <line x1="55" y1="240" x2="440" y2="240" stroke={C.faint} strokeWidth="1.2" />
        <line x1="55" y1="40" x2="55" y2="240" stroke={C.faint} strokeWidth="1.2" />
        {/* fitted line */}
        <line x1="60" y1={lineY(60)} x2="430" y2={lineY(430)} stroke={C.violet} strokeWidth="2.4" />
        <text x="380" y={lineY(420) - 8} fontFamily={mono} fontSize="9" fontWeight="700" fill={C.violet}>ŷ = wx + b</text>
        {/* residual stems + points */}
        {pts.map(([x, y], i) => (
          <g key={i}>
            <line x1={x} y1={y} x2={x} y2={lineY(x)} stroke={C.hole} strokeWidth="1.2" strokeDasharray="3 2" />
            <circle cx={x} cy={y} r="4.5" fill={`${C.blue}55`} stroke={C.blue} strokeWidth="1.1" />
          </g>
        ))}
        <text x="250" y="30" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.hole}>residual = yᵢ − ŷᵢ (the error term)</text>
        <text x="248" y="266" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>MAE averages |residual| · MSE/RMSE square it (penalise big misses) · R² = variance explained</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   3.8 — Filters (signals depth)
   ════════════════════════════════════════════════════════════ */

/* Filter frequency responses: low-pass, high-pass, band-pass. */
export function FilterResponse({ caption }: { caption?: string }) {
  const panel = (ox: number, name: string, c: string, d: string) => (
    <g transform={`translate(${ox},0)`}>
      <rect x={0} y={26} width="166" height="112" rx="6" fill={C.panel} stroke={C.line} />
      <line x1={14} y1={126} x2={156} y2={126} stroke={C.faint} strokeWidth="0.8" />
      <line x1={14} y1={40} x2={14} y2={126} stroke={C.faint} strokeWidth="0.8" />
      <path d={d} fill={`${c}1f`} stroke={c} strokeWidth="2.2" />
      <text x={85} y={154} textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={c}>{name}</text>
      <text x={156} y={138} textAnchor="end" fontFamily={mono} fontSize="7" fill={C.muted}>freq →</text>
    </g>
  );
  return (
    <DiagramFrame caption={caption} maxWidth={580}>
      <svg viewBox="0 0 580 170" width="100%" role="img" aria-label="Low-pass, high-pass and band-pass filter responses">
        {panel(8, "low-pass", C.blue, "M 14 52 L 78 52 C 100 52, 110 124, 150 125 L 150 126 L 14 126 Z")}
        {panel(206, "high-pass", C.on, "M 14 125 C 56 124, 66 52, 92 52 L 150 52 L 150 126 L 14 126 Z")}
        {panel(404, "band-pass", C.violet, "M 14 125 C 54 124, 60 54, 84 52 C 108 50, 114 124, 150 125 L 150 126 L 14 126 Z")}
      </svg>
    </DiagramFrame>
  );
}

/* The mel filterbank: overlapping triangular band-pass filters, wider with frequency. */
export function MelFilterbank({ caption }: { caption?: string }) {
  const tris = [
    { x: 50, w: 56 }, { x: 92, w: 64 }, { x: 140, w: 76 }, { x: 200, w: 92 },
    { x: 276, w: 112 }, { x: 364, w: 140 },
  ];
  const cols = [C.blue, C.electron, C.on, C.gate, C.hole, C.violet];
  const base = 150;
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 200" width="100%" role="img" aria-label="The mel filterbank of triangular band-pass filters">
        <line x1="40" y1={base} x2="520" y2={base} stroke={C.faint} strokeWidth="1" />
        {tris.map((t, i) => {
          const c = cols[i % cols.length];
          return (
            <polygon key={i} points={`${t.x},${base} ${t.x + t.w / 2},60 ${t.x + t.w},${base}`}
              fill={`${c}22`} stroke={c} strokeWidth="1.4" />
          );
        })}
        <text x="80" y="178" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>low freq · narrow</text>
        <text x="440" y="178" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>high freq · wide</text>
        <text x="280" y="42" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.text}>each triangle is a band-pass filter</text>
        <text x="510" y="178" textAnchor="end" fontFamily={mono} fontSize="7.5" fill={C.faint}>freq →</text>
        <text x="280" y="196" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>spacing follows the mel scale — matching how human hearing resolves pitch</text>
      </svg>
    </DiagramFrame>
  );
}
