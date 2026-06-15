import { C, DiagramFrame, mono } from "./_shared";

/* ════════════════════════════════════════════════════════════
   Module 4 — Generative AI & LLM Fundamentals
   Accent: rose (C.hole). Figures mirror the per-module palette.
   ════════════════════════════════════════════════════════════ */

const ROSE = C.hole;

/* ════════════════════════════════════════════════════════════
   4.1 — Autoencoders
   ════════════════════════════════════════════════════════════ */

/* Encoder → bottleneck z → decoder. */
export function AutoencoderBottleneck({ caption }: { caption?: string }) {
  const bars = (x: number, n: number, col: string, pre: string) =>
    Array.from({ length: n }, (_, i) => (
      <rect key={`${pre}${i}`} x={x} y={56 + i * 16} width="34" height="12" rx="2"
        fill={`${col}22`} stroke={col} strokeWidth="1" />
    ));
  return (
    <DiagramFrame caption={caption} maxWidth={580}>
      <svg viewBox="0 0 580 210" width="100%" role="img" aria-label="Autoencoder encoder, bottleneck, decoder">
        <text x="57" y="44" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.text}>input x</text>
        {bars(40, 7, C.blue, "in")}
        {/* encoder trapezoid */}
        <polygon points="100,52 230,86 230,124 100,158" fill={`${ROSE}14`} stroke={ROSE} strokeWidth="1.4" />
        <text x="165" y="108" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={ROSE}>encoder f</text>
        {/* bottleneck */}
        <rect x="250" y="86" width="36" height="38" rx="4" fill={`${C.violet}26`} stroke={C.violet} strokeWidth="1.6" />
        <text x="268" y="110" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill={C.violet}>z</text>
        <text x="268" y="142" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.muted}>latent</text>
        {/* decoder trapezoid */}
        <polygon points="306,86 436,52 436,158 306,124" fill={`${ROSE}14`} stroke={ROSE} strokeWidth="1.4" />
        <text x="371" y="108" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={ROSE}>decoder g</text>
        <text x="503" y="44" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.text}>x̂ recon</text>
        {bars(486, 7, C.on, "out")}
        <text x="290" y="186" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>the bottleneck forces compression — it cannot pass everything through, so it must summarise</text>
      </svg>
    </DiagramFrame>
  );
}

/* Denoising autoencoder: corrupt → reconstruct clean. */
export function DenoisingAutoencoder({ caption }: { caption?: string }) {
  const grid = (ox: number, noisy: boolean, label: string, col: string) => (
    <g key={label}>
      {Array.from({ length: 16 }, (_, k) => {
        const r = Math.floor(k / 4), c = k % 4;
        const on = (r + c) % 2 === 0;
        const flip = noisy && (k === 2 || k === 7 || k === 9 || k === 12);
        const v = flip ? !on : on;
        return <rect key={k} x={ox + c * 15} y={60 + r * 15} width="13" height="13" rx="1.5"
          fill={v ? `${col}55` : C.panel} stroke={C.line} strokeWidth="0.6" />;
      })}
      <text x={ox + 28} y={48} textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={col}>{label}</text>
    </g>
  );
  const arrow = (x: number, lbl: string) => (
    <g>
      <line x1={x} y1="97" x2={x + 38} y2="97" stroke={C.faint} strokeWidth="1.3" />
      <polygon points={`${x + 38},97 ${x + 30},93 ${x + 30},101`} fill={C.faint} />
      <text x={x + 19} y={86} textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.muted}>{lbl}</text>
    </g>
  );
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 170" width="100%" role="img" aria-label="Denoising autoencoder corrupts then reconstructs">
        {grid(30, false, "clean", C.on)}
        {arrow(95, "+ noise")}
        {grid(160, true, "corrupted", ROSE)}
        {arrow(225, "")}
        <rect x="290" y="64" width="70" height="66" rx="8" fill={`${C.violet}18`} stroke={C.violet} strokeWidth="1.4" />
        <text x="325" y="101" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.violet}>autoencoder</text>
        {arrow(365, "")}
        {grid(400, false, "reconstructed", C.on)}
        <text x="280" y="158" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>learning to remove corruption forces robust features — the seed of diffusion models</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   4.2 — Variational Autoencoders
   ════════════════════════════════════════════════════════════ */

/* Standard AE point holes vs VAE gaussian coverage. */
export function VAELatentSpace({ caption }: { caption?: string }) {
  const pts = [[40, 40], [70, 95], [120, 50], [55, 130], [150, 110], [110, 150], [165, 60], [90, 70]];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 240" width="100%" role="img" aria-label="Standard autoencoder versus VAE latent space">
        {/* standard AE */}
        <text x="120" y="30" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.off}>standard AE — isolated points</text>
        <rect x="30" y="40" width="180" height="170" rx="8" fill={C.panel} stroke={C.line} strokeWidth="1" />
        {pts.map(([x, y], i) => <circle key={`s${i}`} cx={30 + x} cy={40 + y} r="4" fill={C.off} />)}
        <text x="120" y="200" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={ROSE}>gaps = holes → sampling fails</text>

        <text x="280" y="125" textAnchor="middle" fontFamily={mono} fontSize="18" fill={C.faint}>→</text>

        {/* VAE */}
        <text x="440" y="30" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.violet}>VAE — distributions toward 𝒩(0,I)</text>
        <rect x="350" y="40" width="180" height="170" rx="8" fill={`${C.violet}0c`} stroke={C.line} strokeWidth="1" />
        <circle cx="440" cy="125" r="78" fill={`${C.violet}10`} stroke={C.violet} strokeWidth="0.9" strokeDasharray="4 4" />
        {pts.map(([x, y], i) => {
          const cx = 350 + 40 + (x - 95) * 0.7 + 50, cy = 40 + 40 + (y - 95) * 0.7 + 45;
          return <circle key={`v${i}`} cx={cx} cy={cy} r="11" fill={`${C.violet}30`} stroke={C.violet} strokeWidth="0.8" />;
        })}
        <text x="440" y="200" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.on}>full coverage → any z decodes</text>
      </svg>
    </DiagramFrame>
  );
}

/* Reparameterisation trick: stochastic vs reparameterised path. */
export function ReparameterizationTrick({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 220" width="100%" role="img" aria-label="Reparameterisation trick">
        {/* left: direct sampling (no grad) */}
        <text x="140" y="30" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={ROSE}>direct sample — gradient blocked</text>
        <rect x="50" y="48" width="60" height="34" rx="5" fill={C.panel} stroke={C.muted} strokeWidth="1.1" />
        <text x="80" y="70" textAnchor="middle" fontFamily={mono} fontSize="11" fill={C.text}>μ, σ</text>
        <line x1="110" y1="65" x2="160" y2="65" stroke={C.faint} strokeWidth="1.2" />
        <circle cx="190" cy="65" r="24" fill={`${ROSE}18`} stroke={ROSE} strokeWidth="1.6" strokeDasharray="3 3" />
        <text x="190" y="62" textAnchor="middle" fontFamily={mono} fontSize="9" fill={ROSE}>sample</text>
        <text x="190" y="74" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={ROSE}>z</text>
        <line x1="120" y1="120" x2="120" y2="92" stroke={ROSE} strokeWidth="1.4" strokeDasharray="3 3" />
        <polygon points="120,92 116,100 124,100" fill={ROSE} />
        <text x="120" y="136" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={ROSE}>✗ can't backprop through randomness</text>

        {/* divider */}
        <line x1="280" y1="40" x2="280" y2="180" stroke={C.line} strokeWidth="1" strokeDasharray="3 4" />

        {/* right: reparameterised (grad ok) */}
        <text x="420" y="30" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.on}>reparameterised — gradient flows</text>
        <rect x="320" y="48" width="56" height="34" rx="5" fill={C.panel} stroke={C.muted} strokeWidth="1.1" />
        <text x="348" y="70" textAnchor="middle" fontFamily={mono} fontSize="11" fill={C.text}>μ, σ</text>
        <rect x="320" y="96" width="56" height="30" rx="5" fill={`${C.blue}14`} stroke={C.blue} strokeWidth="1.1" />
        <text x="348" y="116" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.blue}>ε~𝒩(0,I)</text>
        <line x1="376" y1="65" x2="430" y2="80" stroke={C.on} strokeWidth="1.4" />
        <line x1="376" y1="111" x2="430" y2="92" stroke={C.on} strokeWidth="1.4" />
        <rect x="430" y="68" width="92" height="34" rx="6" fill={`${C.on}16`} stroke={C.on} strokeWidth="1.4" />
        <text x="476" y="90" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.on}>z = μ + σ·ε</text>
        <line x1="420" y1="150" x2="420" y2="104" stroke={C.on} strokeWidth="1.4" />
        <polygon points="420,104 416,112 424,112" fill={C.on} />
        <text x="420" y="166" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.on}>✓ deterministic in μ, σ — gradients pass</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   4.3 — GANs
   ════════════════════════════════════════════════════════════ */

/* Generator vs discriminator adversarial loop. */
export function GANArchitecture({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 230" width="100%" role="img" aria-label="GAN generator and discriminator">
        <text x="55" y="60" textAnchor="middle" fontFamily={mono} fontSize="10" fill={C.muted}>noise z</text>
        <rect x="28" y="68" width="54" height="28" rx="4" fill={C.panel} stroke={C.line} strokeWidth="1" />
        <text x="55" y="86" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.text}>𝒩(0,I)</text>
        <line x1="82" y1="82" x2="120" y2="82" stroke={C.faint} strokeWidth="1.2" />
        <rect x="120" y="58" width="92" height="48" rx="8" fill={`${C.violet}16`} stroke={C.violet} strokeWidth="1.5" />
        <text x="166" y="80" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.violet}>Generator</text>
        <text x="166" y="95" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.violet}>G</text>
        <line x1="212" y1="82" x2="290" y2="100" stroke={ROSE} strokeWidth="1.3" />
        <text x="245" y="86" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={ROSE}>fake G(z)</text>

        <rect x="28" y="150" width="84" height="28" rx="4" fill={`${C.on}14`} stroke={C.on} strokeWidth="1" />
        <text x="70" y="168" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.on}>real data x</text>
        <line x1="112" y1="164" x2="290" y2="124" stroke={C.on} strokeWidth="1.3" />

        <rect x="292" y="78" width="100" height="60" rx="8" fill={`${C.blue}14`} stroke={C.blue} strokeWidth="1.5" />
        <text x="342" y="104" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.blue}>Discriminator</text>
        <text x="342" y="120" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.blue}>D</text>
        <line x1="392" y1="108" x2="436" y2="108" stroke={C.faint} strokeWidth="1.2" />
        <polygon points="436,108 428,104 428,112" fill={C.faint} />
        <text x="492" y="112" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.text}>P(real)</text>
        {/* feedback */}
        <path d="M 342 138 C 342 200, 166 200, 166 106" fill="none" stroke={ROSE} strokeWidth="1.3" strokeDasharray="5 3" />
        <polygon points="166,106 162,114 170,114" fill={ROSE} />
        <text x="254" y="214" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={ROSE}>G learns only from D's gradient — which direction would fool the detective?</text>
      </svg>
    </DiagramFrame>
  );
}

/* Mode collapse: real has many modes, G covers one. */
export function ModeCollapse({ caption }: { caption?: string }) {
  const modes = [[40, 50], [95, 35], [150, 60], [60, 110], [120, 120], [165, 100]];
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 200" width="100%" role="img" aria-label="GAN mode collapse">
        <text x="110" y="28" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.on}>real distribution — many modes</text>
        <rect x="30" y="38" width="170" height="140" rx="8" fill={C.panel} stroke={C.line} strokeWidth="1" />
        {modes.map(([x, y], i) => <circle key={`r${i}`} cx={30 + x} cy={38 + y} r="13" fill={`${C.on}33`} stroke={C.on} strokeWidth="1" />)}

        <text x="270" y="112" textAnchor="middle" fontFamily={mono} fontSize="18" fill={C.faint}>→</text>

        <text x="430" y="28" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={ROSE}>collapsed G — one mode</text>
        <rect x="340" y="38" width="170" height="140" rx="8" fill={C.panel} stroke={C.line} strokeWidth="1" />
        {modes.map(([x, y], i) => <circle key={`g${i}`} cx={340 + x} cy={38 + y} r="5" fill={C.ink} stroke={C.line} strokeWidth="0.7" strokeDasharray="2 2" />)}
        <circle cx={340 + 95} cy={38 + 35} r="15" fill={`${ROSE}40`} stroke={ROSE} strokeWidth="1.6" />
        <text x="425" y="192" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>each fake looks real, so D can't punish the missing variety</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   4.4 — Transformers & Attention
   ════════════════════════════════════════════════════════════ */

/* Scaled dot-product attention pipeline. */
export function ScaledDotProductAttention({ caption }: { caption?: string }) {
  const qkv = (x: number, lbl: string, col: string) => (
    <g key={lbl}>
      <rect x={x} y="50" width="40" height="30" rx="4" fill={`${col}1c`} stroke={col} strokeWidth="1.3" />
      <text x={x + 20} y="70" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={col}>{lbl}</text>
    </g>
  );
  const step = (x: number, lbl: string) => (
    <g>
      <rect x={x} y="118" width="92" height="32" rx="6" fill={C.panel} stroke={C.line} strokeWidth="1" />
      <text x={x + 46} y="138" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.text}>{lbl}</text>
    </g>
  );
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 210" width="100%" role="img" aria-label="Scaled dot-product attention">
        {qkv(70, "Q", ROSE)}
        {qkv(130, "K", C.blue)}
        {qkv(420, "V", C.on)}
        {/* QKᵀ → scale → softmax → ×V */}
        <line x1="110" y1="80" x2="135" y2="116" stroke={C.faint} strokeWidth="1" />
        <line x1="150" y1="80" x2="150" y2="116" stroke={C.faint} strokeWidth="1" />
        {step(105, "Q·Kᵀ")}
        <text x="205" y="138" textAnchor="middle" fontFamily={mono} fontSize="14" fill={C.faint}>→</text>
        {step(218, "÷ √d_k")}
        <text x="318" y="138" textAnchor="middle" fontFamily={mono} fontSize="14" fill={C.faint}>→</text>
        {step(330, "softmax")}
        {/* combine with V */}
        <line x1="440" y1="80" x2="440" y2="116" stroke={C.on} strokeWidth="1.1" />
        <rect x="412" y="118" width="56" height="32" rx="6" fill={`${C.on}14`} stroke={C.on} strokeWidth="1.2" />
        <text x="440" y="138" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.on}>× V</text>
        <line x1="376" y1="134" x2="410" y2="134" stroke={C.faint} strokeWidth="1.1" />
        <line x1="440" y1="150" x2="440" y2="176" stroke={C.faint} strokeWidth="1.2" />
        <polygon points="440,176 436,168 444,168" fill={C.faint} />
        <text x="440" y="192" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.text}>attention output</text>
        <text x="180" y="34" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>Q: what I seek · K: what I offer · V: what I contain</text>
      </svg>
    </DiagramFrame>
  );
}

/* Multi-head attention: parallel heads concatenated. */
export function MultiHeadAttention({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 200" width="100%" role="img" aria-label="Multi-head attention">
        <rect x="40" y="84" width="56" height="32" rx="5" fill={C.panel} stroke={C.line} strokeWidth="1" />
        <text x="68" y="104" textAnchor="middle" fontFamily={mono} fontSize="9.5" fill={C.text}>input</text>
        {["syntax", "meaning", "position", "coref"].map((h, i) => {
          const col = [ROSE, C.blue, C.violet, C.on][i];
          const y = 40 + i * 34;
          return (
            <g key={h}>
              <line x1="96" y1="100" x2="220" y2={y + 14} stroke={C.line} strokeWidth="0.8" />
              <rect x="220" y={y} width="120" height="28" rx="5" fill={`${col}16`} stroke={col} strokeWidth="1.2" />
              <text x="280" y={y + 18} textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={col}>head {i + 1}: {h}</text>
              <line x1="340" y1={y + 14} x2="430" y2="100" stroke={C.line} strokeWidth="0.8" />
            </g>
          );
        })}
        <rect x="430" y="84" width="46" height="32" rx="5" fill={`${C.gate}16`} stroke={C.gate} strokeWidth="1.3" />
        <text x="453" y="100" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.gate}>concat</text>
        <text x="453" y="111" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.gate}>·Wᴼ</text>
        <line x1="476" y1="100" x2="510" y2="100" stroke={C.faint} strokeWidth="1.2" />
        <polygon points="510,100 502,96 502,104" fill={C.faint} />
        <text x="280" y="188" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>H heads attend to different relationships in parallel — same cost as one wide head</text>
      </svg>
    </DiagramFrame>
  );
}

/* Full transformer block: two sublayers, each with residual + norm. */
export function TransformerBlock({ caption }: { caption?: string }) {
  const box = (y: number, label: string, sub: string, col: string) => (
    <g key={`box-${y}`}>
      <rect x="185" y={y} width="130" height="30" rx="6" fill={`${col}16`} stroke={col} strokeWidth="1.3" />
      <text x="250" y={y + 13} textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={col}>{label}</text>
      <text x="250" y={y + 24} textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>{sub}</text>
    </g>
  );
  const add = (cy: number) => (
    <g>
      <circle cx="250" cy={cy} r="11" fill={C.panel} stroke={C.on} strokeWidth="1.5" />
      <text x="250" y={cy + 5} textAnchor="middle" fontFamily={mono} fontSize="13" fill={C.on}>+</text>
    </g>
  );
  const conn = (y1: number, y2: number) => <line x1="250" y1={y1} x2="250" y2={y2} stroke={C.line} strokeWidth="1.3" />;
  return (
    <DiagramFrame caption={caption} maxWidth={420}>
      <svg viewBox="0 0 420 360" width="100%" role="img" aria-label="A full transformer block">
        {/* block outline */}
        <rect x="110" y="56" width="280" height="244" rx="10" fill="none" stroke={ROSE} strokeWidth="1.2" strokeDasharray="5 4" />
        <text x="378" y="52" textAnchor="end" fontFamily={mono} fontSize="9" fontWeight="700" fill={ROSE}>× N blocks</text>

        {/* embeddings */}
        <rect x="165" y="326" width="170" height="26" rx="6" fill={`${C.gate}14`} stroke={C.gate} strokeWidth="1.1" />
        <text x="250" y="343" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.gate}>token + positional embeddings</text>

        {conn(326, 302)}
        {box(272, "RMSNorm", "pre-norm", C.violet)}
        {conn(272, 252)}
        {box(222, "Multi-Head Attention", "mix across positions", C.blue)}
        {conn(222, 207)}
        {add(196)}
        {conn(185, 176)}
        {box(146, "RMSNorm", "pre-norm", C.violet)}
        {conn(146, 126)}
        {box(96, "FFN (SwiGLU)", "~⅔ of params · 'knowledge'", ROSE)}
        {conn(96, 81)}
        {add(70)}
        {conn(59, 44)}
        <text x="250" y="30" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.text}>↑ to next block / LM head</text>

        {/* residual skip 1 (around attention) */}
        <path d="M 250 314 L 124 314 L 124 196 L 239 196" fill="none" stroke={C.on} strokeWidth="1.3" strokeDasharray="4 3" />
        <polygon points="239,196 231,192 231,200" fill={C.on} />
        {/* residual skip 2 (around FFN) */}
        <path d="M 250 184 L 150 184 L 150 70 L 239 70" fill="none" stroke={C.on} strokeWidth="1.3" strokeDasharray="4 3" />
        <polygon points="239,70 231,66 231,74" fill={C.on} />
        <text x="70" y="135" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.on} transform="rotate(-90 70 135)">residual stream</text>
      </svg>
    </DiagramFrame>
  );
}

/* Three transformer families. */
export function TransformerFamilies({ caption }: { caption?: string }) {
  const panel = (ox: number, title: string, sub: string, col: string) => (
    <g key={title}>
      <rect x={ox} y="44" width="150" height="120" rx="8" fill={`${col}0c`} stroke={col} strokeWidth="1.3" />
      <text x={ox + 75} y="34" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={col}>{title}</text>
      <text x={ox + 75} y="156" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>{sub}</text>
    </g>
  );
  const tok = (x: number, y: number, col: string, k: number) =>
    <rect key={`tok-${x}-${k}`} x={x} y={y} width="18" height="18" rx="3" fill={`${col}26`} stroke={col} strokeWidth="0.9" />;
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 180" width="100%" role="img" aria-label="Encoder-only, decoder-only, encoder-decoder">
        {panel(20, "encoder-only", "BERT · bidirectional", C.blue)}
        {[0, 1, 2, 3].map((i) => tok(34 + i * 30, 86, C.blue, i))}
        <path d="M 43 84 C 70 64, 100 64, 127 84" fill="none" stroke={C.blue} strokeWidth="0.9" />
        <path d="M 127 110 C 100 130, 70 130, 43 110" fill="none" stroke={C.blue} strokeWidth="0.9" />
        <text x="95" y="134" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.blue}>attend both ways</text>

        {panel(205, "decoder-only", "GPT/LLaMA · causal", ROSE)}
        {[0, 1, 2, 3].map((i) => tok(219 + i * 30, 86, ROSE, i))}
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M ${228 + (i + 1) * 30} 84 C ${228 + (i + 1) * 30 - 8} 70, ${228 + i * 30 + 12} 70, ${228 + i * 30 + 9} 84`} fill="none" stroke={ROSE} strokeWidth="0.9" />
        ))}
        <text x="280" y="134" textAnchor="middle" fontFamily={mono} fontSize="8" fill={ROSE}>only attend to the past</text>

        {panel(390, "encoder–decoder", "T5 · cross-attention", C.violet)}
        {[0, 1].map((i) => tok(404 + i * 24, 86, C.blue, i))}
        {[0, 1].map((i) => tok(488 + i * 24, 86, ROSE, i + 9))}
        <line x1="454" y1="95" x2="486" y2="95" stroke={C.violet} strokeWidth="1.2" />
        <polygon points="486,95 478,91 478,99" fill={C.violet} />
        <text x="465" y="134" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.violet}>cross-attend</text>
      </svg>
    </DiagramFrame>
  );
}

/* MHA vs GQA vs MQA: KV head sharing. */
export function GroupedQueryAttention({ caption }: { caption?: string }) {
  const col3 = (ox: number, title: string, qn: number, kvn: number, note: string, col: string) => {
    const qheads = Array.from({ length: qn }, (_, i) => i);
    return (
      <g key={title}>
        <text x={ox + 75} y="32" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={col}>{title}</text>
        {qheads.map((i) => <rect key={`q${i}`} x={ox + i * 19} y="46" width="15" height="20" rx="2" fill={`${ROSE}22`} stroke={ROSE} strokeWidth="0.9" />)}
        <text x={ox + 75} y="80" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>{qn} query heads</text>
        {Array.from({ length: kvn }, (_, j) => {
          const groupW = (qn / kvn) * 19;
          return <rect key={`kv${j}`} x={ox + j * groupW + (groupW - 15) / 2} y="100" width="15" height="20" rx="2" fill={`${C.blue}22`} stroke={C.blue} strokeWidth="0.9" />;
        })}
        {/* lines from q to kv group */}
        {qheads.map((i) => {
          const kvIdx = Math.floor(i / (qn / kvn));
          const groupW = (qn / kvn) * 19;
          const kx = ox + kvIdx * groupW + groupW / 2;
          return <line key={`l${i}`} x1={ox + i * 19 + 7} y1="66" x2={kx} y2="100" stroke={C.line} strokeWidth="0.6" />;
        })}
        <text x={ox + 75} y="134" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>{kvn} KV head{kvn > 1 ? "s" : ""}</text>
        <text x={ox + 75} y="152" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={col}>{note}</text>
      </g>
    );
  };
  return (
    <DiagramFrame caption={caption} maxWidth={580}>
      <svg viewBox="0 0 580 165" width="100%" role="img" aria-label="MHA, GQA, MQA KV-head sharing">
        {col3(20, "MHA", 8, 8, "biggest cache", C.off)}
        {col3(215, "GQA", 8, 2, "~smaller cache", C.violet)}
        {col3(410, "MQA", 8, 1, "smallest cache", C.on)}
      </svg>
    </DiagramFrame>
  );
}

/* BPE merges: characters merge into subwords. */
export function BPEMerges({ caption }: { caption?: string }) {
  const rows = [
    { lbl: "start", toks: ["l", "o", "w", "e", "r"], col: C.off },
    { lbl: "merge 'lo'", toks: ["lo", "w", "e", "r"], col: C.gate },
    { lbl: "merge 'low'", toks: ["low", "e", "r"], col: C.blue },
    { lbl: "merge 'er'", toks: ["low", "er"], col: ROSE },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 200" width="100%" role="img" aria-label="Byte pair encoding merges">
        <text x="260" y="24" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>repeatedly merge the most frequent adjacent pair</text>
        {rows.map((r, ri) => {
          const y = 40 + ri * 38;
          return (
            <g key={ri}>
              <text x="40" y={y + 17} textAnchor="end" fontFamily={mono} fontSize="9" fill={C.muted}>{r.lbl}</text>
              {r.toks.map((t, ti) => (
                <g key={ti}>
                  <rect x={60 + ti * 60} y={y} width={Math.max(40, t.length * 16 + 16)} height="26" rx="4" fill={`${r.col}1e`} stroke={r.col} strokeWidth="1.1" />
                  <text x={60 + ti * 60 + Math.max(40, t.length * 16 + 16) / 2} y={y + 17} textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.text}>{t}</text>
                </g>
              ))}
            </g>
          );
        })}
        <text x="260" y="192" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>common words → one token · rare words → subwords · until vocab hits target size</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   4.5 — Pre-training
   ════════════════════════════════════════════════════════════ */

/* Three pre-training objectives. */
export function PretrainingObjectives({ caption }: { caption?: string }) {
  const tokRow = (y: number, toks: { t: string; m: number }[], col: string) =>
    toks.map((tk, i) => (
      <g key={`${y}-${i}`}>
        <rect x={150 + i * 56} y={y} width="50" height="24" rx="3"
          fill={tk.m === 1 ? `${col}33` : C.panel} stroke={tk.m === 1 ? col : C.line} strokeWidth={tk.m === 1 ? 1.3 : 0.8} strokeDasharray={tk.m === 2 ? "3 2" : undefined} />
        <text x={175 + i * 56} y={y + 16} textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.text}>{tk.t}</text>
      </g>
    ));
  return (
    <DiagramFrame caption={caption} maxWidth={580}>
      <svg viewBox="0 0 580 210" width="100%" role="img" aria-label="CLM, MLM, span corruption objectives">
        <text x="70" y="40" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={ROSE}>CLM</text>
        <text x="70" y="54" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>decoder</text>
        {tokRow(30, [{ t: "The", m: 0 }, { t: "cat", m: 0 }, { t: "sat", m: 0 }, { t: "?", m: 1 }], ROSE)}
        <text x="430" y="46" fontFamily={mono} fontSize="8" fill={C.muted}>predict next →</text>

        <text x="70" y="110" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.blue}>MLM</text>
        <text x="70" y="124" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>encoder</text>
        {tokRow(100, [{ t: "The", m: 0 }, { t: "[M]", m: 1 }, { t: "sat", m: 0 }, { t: "[M]", m: 1 }], C.blue)}
        <text x="430" y="116" fontFamily={mono} fontSize="8" fill={C.muted}>fill masks (both ways)</text>

        <text x="70" y="180" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.violet}>Span</text>
        <text x="70" y="194" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>T5</text>
        {tokRow(170, [{ t: "The", m: 0 }, { t: "[X]", m: 2 }, { t: "[X]", m: 2 }, { t: "mat", m: 0 }], C.violet)}
        <text x="430" y="186" fontFamily={mono} fontSize="8" fill={C.muted}>regenerate spans</text>
      </svg>
    </DiagramFrame>
  );
}

/* Scaling laws: loss falls log-linearly with compute. */
export function ScalingLaws({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 250" width="100%" role="img" aria-label="Neural scaling laws">
        <line x1="70" y1="40" x2="70" y2="210" stroke={C.faint} strokeWidth="1.2" />
        <line x1="70" y1="210" x2="470" y2="210" stroke={C.faint} strokeWidth="1.2" />
        <text x="40" y="125" fontFamily={mono} fontSize="9" fill={C.muted} transform="rotate(-90 40 125)">test loss (log)</text>
        <text x="270" y="240" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>compute / params / data (log)</text>
        <path d="M 90 60 C 180 110, 300 175, 450 198" fill="none" stroke={ROSE} strokeWidth="2.6" />
        {[[110, 78], [200, 132], [320, 180], [430, 197]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.5" fill={ROSE} />)}
        <text x="300" y="120" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>predictable, log-linear</text>
        <text x="270" y="60" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>more scale → lower loss, on a straight line — the empirical bet behind frontier AI</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   4.6 — Fine-tuning
   ════════════════════════════════════════════════════════════ */

/* Fine-tuning hierarchy ladder. */
export function FineTuningHierarchy({ caption }: { caption?: string }) {
  const rungs = [
    { t: "Prompt engineering", s: "no weights · 0 cost", col: C.on },
    { t: "Few-shot prompting", s: "no weights", col: C.on },
    { t: "Prefix / prompt tuning", s: "soft prompts only", col: C.blue },
    { t: "LoRA", s: "low-rank adapters", col: C.violet },
    { t: "QLoRA", s: "LoRA on 4-bit base", col: C.violet },
    { t: "Full fine-tuning", s: "all weights · most cost", col: ROSE },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 240" width="100%" role="img" aria-label="Fine-tuning hierarchy">
        {rungs.map((r, i) => {
          const y = 30 + i * 33, w = 240 + i * 26;
          return (
            <g key={i}>
              <rect x={140} y={y} width={w} height="26" rx="5" fill={`${r.col}18`} stroke={r.col} strokeWidth="1.2" />
              <text x={152} y={y + 17} fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.text}>{r.t}</text>
              <text x={140 + w - 10} y={y + 17} textAnchor="end" fontFamily={mono} fontSize="8" fill={C.muted}>{r.s}</text>
            </g>
          );
        })}
        <line x1="110" y1="34" x2="110" y2="222" stroke={C.faint} strokeWidth="1.4" />
        <polygon points="110,222 105,212 115,212" fill={C.faint} />
        <text x="96" y="130" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted} transform="rotate(-90 96 130)">more compute · data · risk →</text>
      </svg>
    </DiagramFrame>
  );
}

/* LoRA low-rank decomposition. */
export function LoRADecomposition({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 210" width="100%" role="img" aria-label="LoRA low-rank decomposition">
        {/* frozen W */}
        <rect x="40" y="50" width="90" height="90" rx="4" fill={`${C.off}1a`} stroke={C.off} strokeWidth="1.4" />
        <text x="85" y="100" textAnchor="middle" fontFamily={mono} fontSize="14" fontWeight="700" fill={C.off}>W</text>
        <text x="85" y="158" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.muted}>frozen (d×d)</text>
        <text x="150" y="100" textAnchor="middle" fontFamily={mono} fontSize="16" fill={C.faint}>+</text>

        {/* B (tall) × A (wide) */}
        <rect x="180" y="50" width="26" height="90" rx="3" fill={`${C.violet}22`} stroke={C.violet} strokeWidth="1.3" />
        <text x="193" y="100" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={C.violet}>B</text>
        <text x="193" y="158" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>d×r</text>
        <text x="220" y="100" textAnchor="middle" fontFamily={mono} fontSize="13" fill={C.faint}>×</text>
        <rect x="234" y="78" width="90" height="26" rx="3" fill={`${ROSE}22`} stroke={ROSE} strokeWidth="1.3" />
        <text x="279" y="96" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill={ROSE}>A</text>
        <text x="279" y="124" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.muted}>r×d</text>

        <text x="360" y="96" textAnchor="middle" fontFamily={mono} fontSize="14" fill={C.faint}>=</text>
        <rect x="384" y="50" width="90" height="90" rx="4" fill={`${C.on}10`} stroke={C.on} strokeWidth="1.4" strokeDasharray="4 3" />
        <text x="429" y="96" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.on}>ΔW</text>
        <text x="429" y="112" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.on}>rank-r</text>
        <text x="429" y="158" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.muted}>2rd ≪ d²</text>

        <text x="270" y="190" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.faint}>B starts at 0 → model begins identical to base · ~0.1% of params trainable</text>
      </svg>
    </DiagramFrame>
  );
}

/* QLoRA memory stack comparison. */
export function QLoRAMemoryStack({ caption }: { caption?: string }) {
  const stacks = [
    { lbl: "Full FT", total: 138, parts: [["weights", 32, C.blue], ["gradients", 32, C.gate], ["Adam state", 64, ROSE], ["activations", 10, C.off]] },
    { lbl: "LoRA", total: 21, parts: [["frozen W", 16, C.off], ["adapters+Adam", 1, C.violet], ["activations", 4, C.gate]] },
    { lbl: "QLoRA", total: 7, parts: [["NF4 base", 4, C.on], ["adapters", 1, C.violet], ["activations", 2, C.gate]] },
  ];
  const scale = 1.1; // px per GB
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 240" width="100%" role="img" aria-label="QLoRA memory comparison">
        {stacks.map((s, si) => {
          const x = 70 + si * 150;
          let y = 200;
          return (
            <g key={si}>
              {s.parts.map((p, pi) => {
                const h = (p[1] as number) * scale;
                y -= h;
                return <rect key={pi} x={x} y={y} width="80" height={h} fill={`${p[2]}33`} stroke={p[2] as string} strokeWidth="1" />;
              })}
              <text x={x + 40} y="218" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.text}>{s.lbl}</text>
              <text x={x + 40} y={200 - s.total * scale - 8} textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={si === 0 ? ROSE : C.on}>~{s.total} GB</text>
            </g>
          );
        })}
        <line x1="50" y1="200" x2="490" y2="200" stroke={C.faint} strokeWidth="1.1" />
        <text x="270" y="234" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>cluster → single A100 → free Colab T4: the same 8B model</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   4.7 — Unsloth
   ════════════════════════════════════════════════════════════ */

/* Many kernels with VRAM trips vs one fused kernel in SRAM. */
export function UnslothKernelFusion({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 210" width="100%" role="img" aria-label="Kernel fusion in Unsloth">
        <text x="40" y="34" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.off}>standard — many kernels, VRAM round-trips</text>
        {["Q", "K", "V", "matmul", "softmax"].map((k, i) => (
          <g key={i}>
            <rect x={40 + i * 96} y="46" width="76" height="28" rx="5" fill={C.panel} stroke={C.off} strokeWidth="1" />
            <text x={78 + i * 96} y="64" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.text}>{k}</text>
            <line x1={78 + i * 96} y1="74" x2={78 + i * 96} y2="90" stroke={ROSE} strokeWidth="0.9" />
            {i < 4 && <line x1={116 + i * 96} y1="60" x2={136 + i * 96} y2="60" stroke={C.faint} strokeWidth="1" />}
          </g>
        ))}
        <rect x="40" y="90" width="460" height="16" rx="3" fill={`${ROSE}12`} stroke={ROSE} strokeWidth="0.9" />
        <text x="270" y="102" textAnchor="middle" fontFamily={mono} fontSize="8" fill={ROSE}>slow VRAM</text>

        <text x="40" y="146" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.on}>Unsloth — one fused kernel, intermediates in SRAM</text>
        <rect x="40" y="156" width="380" height="32" rx="6" fill={`${C.on}16`} stroke={C.on} strokeWidth="1.4" />
        <text x="230" y="176" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={C.on}>fused attention (Q·K·V·matmul·softmax)</text>
        <rect x="430" y="156" width="70" height="32" rx="6" fill={`${C.gate}16`} stroke={C.gate} strokeWidth="1.1" />
        <text x="465" y="173" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.gate}>SRAM</text>
        <text x="465" y="183" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>on-chip</text>
      </svg>
    </DiagramFrame>
  );
}

/* Unsloth benchmark bars. */
export function UnslothSpeedup({ caption }: { caption?: string }) {
  const bar = (x: number, label: string, std: number, uns: number, unit: string, max: number) => {
    const h = 120;
    const hs = (std / max) * h, hu = (uns / max) * h;
    return (
      <g key={label}>
        <rect x={x} y={180 - hs} width="38" height={hs} fill={`${C.off}33`} stroke={C.off} strokeWidth="1" />
        <text x={x + 19} y={176 - hs} textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.off}>{std}{unit}</text>
        <rect x={x + 46} y={180 - hu} width="38" height={hu} fill={`${C.on}33`} stroke={C.on} strokeWidth="1.2" />
        <text x={x + 65} y={176 - hu} textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.on}>{uns}{unit}</text>
        <text x={x + 42} y="196" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>{label}</text>
      </g>
    );
  };
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="Unsloth versus standard QLoRA benchmark">
        <text x="260" y="26" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>LLaMA-3-8B · r=16 · A100 80GB · 1 epoch</text>
        <line x1="60" y1="180" x2="460" y2="180" stroke={C.faint} strokeWidth="1.1" />
        {bar(110, "training time", 4.2, 1.6, "h", 5)}
        {bar(300, "peak VRAM", 16.4, 7.8, "G", 18)}
        <rect x="360" y="40" width="14" height="14" fill={`${C.off}33`} stroke={C.off} strokeWidth="1" />
        <text x="380" y="51" fontFamily={mono} fontSize="8.5" fill={C.muted}>standard</text>
        <rect x="360" y="58" width="14" height="14" fill={`${C.on}33`} stroke={C.on} strokeWidth="1" />
        <text x="380" y="69" fontFamily={mono} fontSize="8.5" fill={C.muted}>Unsloth</text>
        <text x="260" y="212" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.on}>2.6× faster · 52% less memory · 0% accuracy loss</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   4.8 — RAG
   ════════════════════════════════════════════════════════════ */

/* RAG pipeline overview. */
export function RAGPipeline({ caption }: { caption?: string }) {
  const node = (x: number, w: number, label: string, col: string) => (
    <g key={label}>
      <rect x={x} y="60" width={w} height="34" rx="6" fill={`${col}16`} stroke={col} strokeWidth="1.3" />
      <text x={x + w / 2} y="81" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={col}>{label}</text>
    </g>
  );
  return (
    <DiagramFrame caption={caption} maxWidth={580}>
      <svg viewBox="0 0 580 180" width="100%" role="img" aria-label="RAG pipeline">
        {node(20, 64, "query", C.blue)}
        <text x="92" y="81" textAnchor="middle" fontFamily={mono} fontSize="12" fill={C.faint}>→</text>
        {node(108, 78, "retrieval", C.violet)}
        <text x="198" y="81" textAnchor="middle" fontFamily={mono} fontSize="12" fill={C.faint}>→</text>
        {node(212, 86, "top-K docs", C.gate)}
        <text x="308" y="81" textAnchor="middle" fontFamily={mono} fontSize="12" fill={C.faint}>→</text>
        {node(322, 96, "augm. prompt", ROSE)}
        <text x="428" y="81" textAnchor="middle" fontFamily={mono} fontSize="12" fill={C.faint}>→</text>
        {node(442, 50, "LLM", C.on)}
        <text x="502" y="81" textAnchor="middle" fontFamily={mono} fontSize="12" fill={C.faint}>→</text>
        {node(516, 50, "answer", C.on)}
        {/* knowledge base */}
        <rect x="108" y="120" width="178" height="34" rx="6" fill={C.panel} stroke={C.line} strokeWidth="1" />
        <text x="197" y="141" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.muted}>vector store (knowledge base)</text>
        <line x1="147" y1="120" x2="147" y2="94" stroke={C.faint} strokeWidth="1" strokeDasharray="3 2" />
        <polygon points="147,94 143,102 151,102" fill={C.faint} />
        <text x="290" y="36" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>external · updatable · grounds the answer in retrieved evidence</text>
      </svg>
    </DiagramFrame>
  );
}

/* Chunking strategies on the same text. */
export function ChunkingStrategies({ caption }: { caption?: string }) {
  const rows = [
    { lbl: "fixed-size", segs: [4, 4, 4, 4], col: C.off, note: "slices sentences" },
    { lbl: "sentence", segs: [2, 5, 3, 6], col: C.blue, note: "varies in length" },
    { lbl: "semantic", segs: [6, 5, 5], col: C.violet, note: "splits where meaning shifts" },
    { lbl: "recursive", segs: [7, 5, 4], col: ROSE, note: "largest natural boundary" },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 210" width="100%" role="img" aria-label="RAG chunking strategies">
        {rows.map((r, ri) => {
          const y = 30 + ri * 42;
          let x = 120;
          return (
            <g key={ri}>
              <text x="108" y={y + 14} textAnchor="end" fontFamily={mono} fontSize="9" fontWeight="700" fill={r.col}>{r.lbl}</text>
              {r.segs.map((s, si) => {
                const w = s * 18;
                const rect = <rect key={si} x={x} y={y} width={w - 4} height="22" rx="3" fill={`${r.col}1e`} stroke={r.col} strokeWidth="1" />;
                x += w;
                return rect;
              })}
              <text x="430" y={y + 14} fontFamily={mono} fontSize="8" fill={C.muted}>{r.note}</text>
            </g>
          );
        })}
        <text x="270" y="202" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>same document, four splits — measure retrieval hit-rate to choose</text>
      </svg>
    </DiagramFrame>
  );
}

/* Hybrid retrieval: dense + sparse → RRF → rerank. */
export function HybridRetrieval({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 190" width="100%" role="img" aria-label="Hybrid retrieval with reranking">
        <rect x="24" y="78" width="56" height="30" rx="5" fill={`${C.blue}14`} stroke={C.blue} strokeWidth="1.1" />
        <text x="52" y="97" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.blue}>query</text>
        {/* dense */}
        <line x1="80" y1="86" x2="130" y2="58" stroke={C.line} strokeWidth="1" />
        <rect x="130" y="42" width="120" height="30" rx="5" fill={`${C.violet}14`} stroke={C.violet} strokeWidth="1.2" />
        <text x="190" y="61" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.violet}>dense (embeddings)</text>
        {/* sparse */}
        <line x1="80" y1="100" x2="130" y2="128" stroke={C.line} strokeWidth="1" />
        <rect x="130" y="114" width="120" height="30" rx="5" fill={`${C.gate}14`} stroke={C.gate} strokeWidth="1.2" />
        <text x="190" y="133" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.gate}>sparse (BM25)</text>
        {/* RRF */}
        <line x1="250" y1="57" x2="300" y2="85" stroke={C.line} strokeWidth="1" />
        <line x1="250" y1="129" x2="300" y2="101" stroke={C.line} strokeWidth="1" />
        <rect x="300" y="76" width="62" height="34" rx="6" fill={C.panel} stroke={C.line} strokeWidth="1.1" />
        <text x="331" y="92" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.text}>RRF</text>
        <text x="331" y="104" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.muted}>fuse</text>
        <line x1="362" y1="93" x2="394" y2="93" stroke={C.faint} strokeWidth="1.1" />
        <rect x="394" y="76" width="70" height="34" rx="6" fill={`${ROSE}14`} stroke={ROSE} strokeWidth="1.3" />
        <text x="429" y="92" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={ROSE}>rerank</text>
        <text x="429" y="104" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>cross-enc</text>
        <line x1="464" y1="93" x2="496" y2="93" stroke={C.faint} strokeWidth="1.1" />
        <polygon points="496,93 488,89 488,97" fill={C.faint} />
        <text x="520" y="97" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.on}>top-5</text>
        <text x="280" y="178" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>dense catches paraphrases · sparse catches exact terms · rerank reads query+doc together</text>
      </svg>
    </DiagramFrame>
  );
}

/* RAGAS four metrics quadrant. */
export function RAGASMetrics({ caption }: { caption?: string }) {
  const cell = (x: number, y: number, title: string, sub: string, col: string) => (
    <g key={title}>
      <rect x={x} y={y} width="220" height="56" rx="7" fill={`${col}12`} stroke={col} strokeWidth="1.3" />
      <text x={x + 14} y={y + 24} fontFamily={mono} fontSize="10" fontWeight="700" fill={col}>{title}</text>
      <text x={x + 14} y={y + 42} fontFamily={mono} fontSize="8" fill={C.muted}>{sub}</text>
    </g>
  );
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 500 200" width="100%" role="img" aria-label="RAGAS evaluation metrics">
        <text x="135" y="22" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>generation</text>
        <text x="365" y="22" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>retrieval</text>
        {cell(20, 32, "Faithfulness", "answer ⊆ context? (anti-hallucination)", ROSE)}
        {cell(258, 32, "Context Precision", "retrieved chunks useful?", C.violet)}
        {cell(20, 104, "Answer Relevance", "on-topic for the question?", C.blue)}
        {cell(258, 104, "Context Recall", "all needed info retrieved?", C.on)}
        <text x="250" y="184" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>evaluate all four on a held-out set — they localise the failure to a stage</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   4.9 — Prompting
   ════════════════════════════════════════════════════════════ */

/* Prompting ladder: zero-shot → few-shot → CoT → self-consistency. */
export function PromptingLadder({ caption }: { caption?: string }) {
  const rungs = [
    { t: "Zero-shot", s: "task + input", col: C.off },
    { t: "Few-shot", s: "+ examples (in-context)", col: C.blue },
    { t: "Chain-of-thought", s: "+ reasoning steps", col: C.violet },
    { t: "Self-consistency", s: "+ sample & vote", col: ROSE },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={520}>
      <svg viewBox="0 0 520 190" width="100%" role="img" aria-label="Prompting techniques ladder">
        {rungs.map((r, i) => {
          const y = 132 - i * 34, w = 200 + i * 30;
          return (
            <g key={i}>
              <rect x={120} y={y} width={w} height="26" rx="5" fill={`${r.col}18`} stroke={r.col} strokeWidth="1.2" />
              <text x={132} y={y + 17} fontFamily={mono} fontSize="9.5" fontWeight="700" fill={C.text}>{r.t}</text>
              <text x={120 + w - 10} y={y + 17} textAnchor="end" fontFamily={mono} fontSize="8" fill={C.muted}>{r.s}</text>
            </g>
          );
        })}
        <line x1="96" y1="158" x2="96" y2="20" stroke={C.faint} strokeWidth="1.4" />
        <polygon points="96,20 91,30 101,30" fill={C.faint} />
        <text x="82" y="92" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted} transform="rotate(-90 82 92)">more tokens · more reliability →</text>
      </svg>
    </DiagramFrame>
  );
}

/* Self-consistency: many CoT paths, majority vote. */
export function SelfConsistency({ caption }: { caption?: string }) {
  const paths = [
    { a: "28", ok: true }, { a: "28", ok: true }, { a: "30", ok: false }, { a: "28", ok: true },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 200" width="100%" role="img" aria-label="Self-consistency majority vote">
        <rect x="24" y="80" width="64" height="34" rx="6" fill={`${C.blue}14`} stroke={C.blue} strokeWidth="1.2" />
        <text x="56" y="101" textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.blue}>question</text>
        {paths.map((p, i) => {
          const y = 30 + i * 38;
          const col = p.ok ? C.on : ROSE;
          return (
            <g key={i}>
              <line x1="88" y1="97" x2="150" y2={y + 14} stroke={C.line} strokeWidth="0.9" />
              <rect x="150" y={y} width="150" height="28" rx="5" fill={C.panel} stroke={C.line} strokeWidth="0.9" />
              <text x="225" y={y + 18} textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.muted}>CoT path {i + 1}</text>
              <line x1="300" y1={y + 14} x2="340" y2={y + 14} stroke={C.faint} strokeWidth="0.9" />
              <circle cx="358" cy={y + 14} r="13" fill={`${col}26`} stroke={col} strokeWidth="1.3" />
              <text x="358" y={y + 18} textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={col}>{p.a}</text>
              <line x1="371" y1={y + 14} x2="430" y2="97" stroke={C.line} strokeWidth="0.7" />
            </g>
          );
        })}
        <rect x="430" y="80" width="84" height="34" rx="6" fill={`${C.on}16`} stroke={C.on} strokeWidth="1.4" />
        <text x="472" y="96" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.on}>majority</text>
        <text x="472" y="108" textAnchor="middle" fontFamily={mono} fontSize="11" fontWeight="700" fill={C.on}>28</text>
        <text x="270" y="190" textAnchor="middle" fontFamily={mono} fontSize="8.5" fill={C.faint}>wrong paths scatter, right paths agree — voting cancels the noise</text>
      </svg>
    </DiagramFrame>
  );
}
