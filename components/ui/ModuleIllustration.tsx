import type { ModuleColor } from "@/lib/colors";

interface Props { num: string; color: ModuleColor }

export default function ModuleIllustration({ num, color }: Props) {
  const p = color.primary;
  const d = color.dark;
  const l = color.light;

  const darkBg: Record<string, string> = {
    "01": "#061f18", "02": "#071430", "03": "#150b32",
    "04": "#300614", "05": "#2e1800", "06": "#141f02",
    "07": "#031828", "08": "#2e1200", "09": "#0e0c2e",
    "10": "#032818",
  };
  const bg = darkBg[num] ?? "#0a1628";

  const svgProps = {
    viewBox: "0 0 300 160" as const,
    width: "100%", height: "100%",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: { position: "absolute" as const, inset: 0 },
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: bg, overflow: "hidden" }}>
      {num === "01" && <Chip01 svgProps={svgProps} p={p} d={d} l={l} />}
      {num === "02" && <Cpu02 svgProps={svgProps} p={p} d={d} l={l} />}
      {num === "03" && <Neural03 svgProps={svgProps} p={p} d={d} l={l} />}
      {num === "04" && <Llm04 svgProps={svgProps} p={p} d={d} l={l} />}
      {num === "05" && <Inference05 svgProps={svgProps} p={p} d={d} l={l} />}
      {num === "06" && <Optimize06 svgProps={svgProps} p={p} d={d} l={l} />}
      {num === "07" && <Frameworks07 svgProps={svgProps} p={p} d={d} l={l} />}
      {num === "08" && <Fpga08 svgProps={svgProps} p={p} d={d} l={l} />}
      {num === "09" && <Agents09 svgProps={svgProps} p={p} d={d} l={l} />}
      {num === "10" && <EndToEnd10 svgProps={svgProps} p={p} d={d} l={l} />}
    </div>
  );
}

type S = { svgProps: React.SVGProps<SVGSVGElement>; p: string; d: string; l: string };

/* ── M01 Semiconductor Chip ── */
function Chip01({ svgProps, p, d, l }: S) {
  return (
    <svg {...svgProps}>
      {/* grid */}
      {[20,40,60,80,100,120,140,160].map(y=><line key={`h${y}`} x1="0" y1={y} x2="300" y2={y} stroke={p} strokeWidth="0.4" strokeOpacity="0.28"/>)}
      {[30,60,90,120,150,180,210,240,270].map(x=><line key={`v${x}`} x1={x} y1="0" x2={x} y2="160" stroke={p} strokeWidth="0.4" strokeOpacity="0.28"/>)}

      {/* glow */}
      <ellipse cx="150" cy="80" rx="90" ry="70" fill={p} fillOpacity="0.22"/>

      {/* IC body */}
      <rect x="75" y="25" width="150" height="110" rx="6" fill="#061510" stroke={p} strokeWidth="2"/>
      {/* die */}
      <rect x="95" y="40" width="110" height="80" rx="4" fill="#040e0c" stroke={p} strokeWidth="1" strokeOpacity="0.9"/>
      {/* die blocks */}
      <rect x="101" y="46" width="44" height="30" rx="2" fill={p} fillOpacity="0.45" stroke={p} strokeWidth="1.2"/>
      <rect x="155" y="46" width="44" height="30" rx="2" fill={d} fillOpacity="0.40" stroke={d} strokeWidth="1.2"/>
      <rect x="101" y="84" width="44" height="30" rx="2" fill={l} fillOpacity="0.38" stroke={l} strokeWidth="1.2"/>
      <rect x="155" y="84" width="44" height="30" rx="2" fill="#F59E0B" fillOpacity="0.38" stroke="#F59E0B" strokeWidth="1.2"/>
      {/* center dot */}
      <circle cx="150" cy="80" r="6" fill={p} fillOpacity="1"/>
      <circle cx="150" cy="80" r="12" fill={p} fillOpacity="0.35"/>
      <circle cx="150" cy="80" r="20" fill={p} fillOpacity="0.12"/>

      {/* pins left */}
      {[44,58,72,86,100,114].map(y=><g key={`l${y}`}><line x1="75" y1={y} x2="52" y2={y} stroke={p} strokeWidth="1.8" strokeOpacity="0.95"/><rect x="43" y={y-3} width="10" height="6" rx="1.5" fill={p} fillOpacity="0.85"/></g>)}
      {/* pins right */}
      {[44,58,72,86,100,114].map(y=><g key={`r${y}`}><line x1="225" y1={y} x2="248" y2={y} stroke={l} strokeWidth="1.8" strokeOpacity="0.95"/><rect x="248" y={y-3} width="10" height="6" rx="1.5" fill={l} fillOpacity="0.85"/></g>)}
      {/* pins top */}
      {[105,130,155,175,195].map(x=><g key={`t${x}`}><line x1={x} y1="25" x2={x} y2="8" stroke="#8B5CF6" strokeWidth="1.8" strokeOpacity="0.95"/><rect x={x-3} y="2" width="6" height="8" rx="1.5" fill="#8B5CF6" fillOpacity="0.85"/></g>)}
      {/* corner markers */}
      {[[75,25],[225,25],[225,135],[75,135]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3.5" fill={p} fillOpacity="0.9"/>)}
    </svg>
  );
}

/* ── M02 Computer Architecture ── */
function Cpu02({ svgProps, p, d, l }: S) {
  return (
    <svg {...svgProps}>
      {/* backdrop dots */}
      {[20,40,60,80,100,120,140].map(y=>[30,60,90,120,150,180,210,240,270].map(x=>(
        <circle key={`${x}${y}`} cx={x} cy={y} r="1.5" fill={p} fillOpacity="0.35"/>
      )))}

      {/* die outline */}
      <rect x="55" y="12" width="190" height="130" rx="6" fill="#07142e" stroke={p} strokeWidth="2"/>

      {/* glow */}
      <ellipse cx="150" cy="77" rx="80" ry="55" fill={p} fillOpacity="0.18"/>

      {/* 4 cores in 2×2 */}
      {[[68,22],[158,22],[68,82],[158,82]].map(([x,y],i)=>(
        <g key={i}>
          <rect x={x} y={y} width="72" height="52" rx="4" fill={p} fillOpacity="0.35" stroke={p} strokeWidth="1.2"/>
          <text x={x+36} y={y+26} textAnchor="middle" fill={p} fontSize="9" fontFamily="monospace" fillOpacity="0.95">CORE {i}</text>
          <rect x={x+8} y={y+8} width="22" height="12" rx="2" fill={p} fillOpacity="0.6"/>
          <rect x={x+38} y={y+8} width="22" height="12" rx="2" fill={l} fillOpacity="0.55"/>
          <line x1={x+8} y1={y+38} x2={x+62} y2={y+38} stroke={p} strokeWidth="1" strokeOpacity="0.5"/>
        </g>
      ))}

      {/* shared L3 cache bar */}
      <rect x="65" y="140" width="170" height="14" rx="3" fill={d} fillOpacity="0.55" stroke={d} strokeWidth="1.2"/>
      <text x="150" y="151" textAnchor="middle" fill="#fff" fontSize="7.5" fontFamily="monospace" fillOpacity="0.9">L3 CACHE</text>

      {/* memory bus lines */}
      {[80,105,130,155,180,205,228].map(x=><line key={x} x1={x} y1="154" x2={x} y2="165" stroke={p} strokeWidth="1.8" strokeOpacity="0.8"/>)}
    </svg>
  );
}

/* ── M03 Neural Network ── */
function Neural03({ svgProps, p, d, l }: S) {
  const layers: [number, number[]][] = [
    [55,  [25,58,91,124]],
    [120, [18,48,78,108,138]],
    [195, [32,72,112]],
    [258, [52,108]],
  ];
  return (
    <svg {...svgProps}>
      {/* background glow */}
      <ellipse cx="150" cy="80" rx="130" ry="60" fill={p} fillOpacity="0.1"/>

      {/* connections */}
      {layers.slice(0,-1).map(([x1, y1s], li) =>
        y1s.map(y1 =>
          layers[li+1][1].map(y2 => (
            <line key={`${x1}${y1}${y2}`} x1={x1} y1={y1} x2={layers[li+1][0]} y2={y2}
              stroke={p} strokeWidth="0.9" strokeOpacity="0.45"/>
          ))
        )
      )}

      {/* nodes */}
      {layers.map(([x, ys], li) =>
        ys.map((y, ni) => {
          const isOutput = li === layers.length - 1;
          return (
            <g key={`${li}${ni}`}>
              {isOutput && <circle cx={x} cy={y} r="18" fill={p} fillOpacity="0.18"/>}
              <circle cx={x} cy={y} r="9" fill={p} fillOpacity={isOutput ? 0.85 : 0.45} stroke={p} strokeWidth="1.5"/>
              {!isOutput && <circle cx={x} cy={y} r="4" fill={p} fillOpacity="0.9"/>}
            </g>
          );
        })
      )}

      {/* layer labels */}
      {["Input","Hidden ×2","Output"].map((label,i)=>(
        <text key={i} x={[55,157,258][i]} y="154" textAnchor="middle" fill={p} fontSize="7.5" fontFamily="monospace" fillOpacity="0.75">{label}</text>
      ))}

      {/* signal flow */}
      <line x1="20" y1="80" x2="280" y2="80" stroke={p} strokeWidth="0.6" strokeOpacity="0.25" strokeDasharray="5 4"/>
    </svg>
  );
}

/* ── M04 Generative AI / LLM ── */
function Llm04({ svgProps, p, d, l }: S) {
  const tokens = ["The","model","learns","from","tokens","→","???"];
  return (
    <svg {...svgProps}>
      {/* background glow */}
      <ellipse cx="150" cy="75" rx="130" ry="58" fill={p} fillOpacity="0.18"/>

      {/* Transformer block */}
      <rect x="85" y="28" width="130" height="62" rx="6" fill={p} fillOpacity="0.35" stroke={p} strokeWidth="1.5"/>
      <text x="150" y="50" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="monospace" fillOpacity="0.95">MULTI-HEAD</text>
      <text x="150" y="62" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="monospace" fillOpacity="0.95">ATTENTION</text>
      {/* attention heads */}
      {[95,111,127,143,159,175,191].map((x,i)=>(
        <rect key={i} x={x} y="72" width="12" height="10" rx="2" fill={p} fillOpacity={0.5 + i * 0.07}/>
      ))}

      {/* Token boxes */}
      {tokens.map((t,i)=>{
        const x = 12 + i * 40;
        const isLast = i === tokens.length - 1;
        return (
          <g key={i}>
            <rect x={x} y="112" width="34" height="20" rx="3"
              fill={isLast ? p : p}
              fillOpacity={isLast ? 0.65 : 0.2}
              stroke={p} strokeWidth={isLast ? 2 : 1} strokeOpacity={isLast ? 1 : 0.55}/>
            <text x={x+17} y="126" textAnchor="middle" fill={isLast ? "#fff" : p} fontSize="6.5" fontFamily="monospace"
              fillOpacity={isLast ? 1 : 0.75}>{t}</text>
            {i < tokens.length - 1 && (
              <path d={`M${x+17} 112 Q${x+17} ${88-i*2} 150 90`} stroke={p} strokeWidth="0.8" strokeOpacity="0.35" fill="none"/>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ── M05 Inference Systems ── */
function Inference05({ svgProps, p, d, l }: S) {
  return (
    <svg {...svgProps}>
      {/* grid */}
      {[40,80,120].map(y=><line key={y} x1="40" y1={y} x2="265" y2={y} stroke={p} strokeWidth="0.5" strokeOpacity="0.35"/>)}
      {[80,120,160,200,240].map(x=><line key={x} x1={x} y1="18" x2={x} y2="138" stroke={p} strokeWidth="0.5" strokeOpacity="0.3"/>)}

      {/* axes */}
      <line x1="40" y1="138" x2="268" y2="138" stroke={p} strokeWidth="1.8" strokeOpacity="0.9"/>
      <line x1="40" y1="18" x2="40" y2="142" stroke={p} strokeWidth="1.8" strokeOpacity="0.9"/>
      <text x="155" y="155" textAnchor="middle" fill={p} fontSize="7.5" fontFamily="monospace" fillOpacity="0.85">Batch Size →</text>
      <text x="18" y="85" textAnchor="middle" fill={p} fontSize="7.5" fontFamily="monospace" fillOpacity="0.85" transform="rotate(-90,18,85)">Throughput</text>

      {/* throughput area fill */}
      <path d="M40,128 C80,115 120,88 165,68 S225,52 264,46 L264,138 L40,138Z" fill={p} fillOpacity="0.22"/>
      {/* throughput curve */}
      <path d="M40,128 C80,115 120,88 165,68 S225,52 264,46" stroke={p} strokeWidth="2.5" fill="none" strokeLinecap="round"/>

      {/* latency curve */}
      <path d="M40,126 C70,124 100,118 130,106 S182,80 264,30" stroke={l} strokeWidth="2" strokeDasharray="6 3" fill="none" strokeLinecap="round"/>

      {/* SLO line */}
      <line x1="40" y1="78" x2="264" y2="78" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="7 4" strokeOpacity="0.9"/>
      <text x="248" y="74" fill="#F59E0B" fontSize="7" fontFamily="monospace" fillOpacity="0.95">SLO</text>

      {/* dots on throughput curve */}
      {[[40,128],[120,88],[200,58],[264,46]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="4" fill={p} fillOpacity="0.9"/>
      ))}

      {/* legend */}
      <line x1="52" y1="22" x2="74" y2="22" stroke={p} strokeWidth="2.5"/>
      <text x="78" y="26" fill={p} fontSize="7" fontFamily="monospace" fillOpacity="0.9">TPS</text>
      <line x1="112" y1="22" x2="134" y2="22" stroke={l} strokeWidth="2" strokeDasharray="5 3"/>
      <text x="138" y="26" fill={l} fontSize="7" fontFamily="monospace" fillOpacity="0.9">P99 Lat</text>
    </svg>
  );
}

/* ── M06 Model Optimization ── */
function Optimize06({ svgProps, p, d, l }: S) {
  return (
    <svg {...svgProps}>
      {/* subtle glow left */}
      <ellipse cx="68" cy="80" rx="55" ry="55" fill={p} fillOpacity="0.15"/>
      {/* subtle glow right */}
      <ellipse cx="220" cy="80" rx="55" ry="55" fill={l} fillOpacity="0.18"/>

      {/* Before label */}
      <text x="68" y="20" textAnchor="middle" fill={p} fontSize="9" fontFamily="monospace" fillOpacity="0.95">FP32</text>
      {/* Before: large blocks */}
      {([[25,28],[25,60],[25,92],[25,124],[65,28],[65,60],[65,92],[65,124]] as [number,number][]).map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width="38" height="26" rx="3" fill={p} fillOpacity="0.5" stroke={p} strokeWidth="1.2"/>
      ))}
      <text x="68" y="158" textAnchor="middle" fill={p} fontSize="7" fontFamily="monospace" fillOpacity="0.8">32-bit · large</text>

      {/* Arrow */}
      <path d="M118,56 L142,56 M135,48 L143,56 L135,64" stroke={p} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="130" y="80" textAnchor="middle" fill={p} fontSize="7.5" fontFamily="monospace" fillOpacity="0.8">quantize</text>
      <text x="130" y="95" textAnchor="middle" fill={l} fontSize="11" fontFamily="monospace" fillOpacity="1">4×↓</text>

      {/* After label */}
      <text x="220" y="20" textAnchor="middle" fill={l} fontSize="9" fontFamily="monospace" fillOpacity="0.95">INT8</text>
      {/* After: small blocks */}
      {Array.from({length:16},(_,i)=>{
        const col = i%4, row = Math.floor(i/4);
        return <rect key={i} x={160+col*22} y={28+row*30} width="18" height="22" rx="2" fill={l} fillOpacity="0.55" stroke={l} strokeWidth="1.2"/>;
      })}
      <text x="220" y="158" textAnchor="middle" fill={l} fontSize="7" fontFamily="monospace" fillOpacity="0.8">8-bit · compact</text>
    </svg>
  );
}

/* ── M07 Inference Frameworks ── */
function Frameworks07({ svgProps, p, d, l }: S) {
  const layers = [
    { label: "FastAPI / gRPC",   y: 18,  h: 22, op: 0.65 },
    { label: "vLLM / TGI",       y: 46,  h: 22, op: 0.55 },
    { label: "TensorRT / ONNX",  y: 74,  h: 22, op: 0.48 },
    { label: "CUDA / ROCm",      y: 102, h: 22, op: 0.42 },
    { label: "GPU / CPU / FPGA", y: 130, h: 22, op: 0.7  },
  ];
  return (
    <svg {...svgProps}>
      {/* glow */}
      <ellipse cx="150" cy="80" rx="120" ry="60" fill={p} fillOpacity="0.18"/>

      {layers.map((layer,i)=>(
        <g key={i}>
          <rect x="35" y={layer.y} width="228" height={layer.h} rx="4"
            fill={p} fillOpacity={layer.op} stroke={p} strokeWidth="1" strokeOpacity="0.85"/>
          <text x="149" y={layer.y + layer.h/2 + 4} textAnchor="middle"
            fill="#fff" fontSize="9" fontFamily="monospace" fillOpacity="0.95">{layer.label}</text>
        </g>
      ))}

      {/* data flow arrows on right */}
      <line x1="276" y1="22" x2="276" y2="148" stroke={l} strokeWidth="2" strokeOpacity="0.8"/>
      {[44,72,100,128].map(y=>(
        <path key={y} d={`M272,${y} L276,${y+10} L280,${y}`} fill="none" stroke={l} strokeWidth="1.5" strokeOpacity="0.8"/>
      ))}
    </svg>
  );
}

/* ── M08 FPGA ── */
function Fpga08({ svgProps, p, d, l }: S) {
  const highlighted = new Set([2,7,12,13,14,19,24]);
  return (
    <svg {...svgProps}>
      {/* routing channels */}
      {[50,90,130,170,210].map(x=><line key={`vc${x}`} x1={x} y1="8" x2={x} y2="152" stroke={p} strokeWidth="0.6" strokeOpacity="0.35"/>)}
      {[28,56,84,112,140].map(y=><line key={`hc${y}`} x1="28" y1={y} x2="252" y2={y} stroke={p} strokeWidth="0.6" strokeOpacity="0.35"/>)}

      {/* LUT grid 5×5 */}
      {Array.from({length:25},(_,i)=>{
        const col = i%5, row = Math.floor(i/5);
        const x = 32 + col*48, y = 14 + row*27;
        const isOn = highlighted.has(i);
        return (
          <g key={i}>
            <rect x={x} y={y} width="34" height="20" rx="3"
              fill={isOn ? p : p} fillOpacity={isOn ? 0.6 : 0.12}
              stroke={p} strokeWidth={isOn ? 1.8 : 0.6} strokeOpacity={isOn ? 1 : 0.4}/>
            <text x={x+17} y={y+13} textAnchor="middle" fill={isOn ? "#fff" : p} fontSize="6.5" fontFamily="monospace" fillOpacity={isOn ? 1 : 0.5}>LUT</text>
          </g>
        );
      })}

      {/* highlighted routing path */}
      <path d="M50,31 L98,31 L98,58 L146,58 L146,85 L194,85 L194,112 L242,112"
        stroke={p} strokeWidth="3" strokeOpacity="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

      {/* DSP blocks */}
      <rect x="258" y="18" width="26" height="52" rx="3" fill={l} fillOpacity="0.55" stroke={l} strokeWidth="1.2"/>
      <text x="271" y="48" textAnchor="middle" fill="#fff" fontSize="6.5" fontFamily="monospace" fillOpacity="0.9" transform="rotate(90,271,48)">DSP</text>
      <rect x="258" y="82" width="26" height="52" rx="3" fill={l} fillOpacity="0.45" stroke={l} strokeWidth="1.2"/>
      <text x="271" y="112" textAnchor="middle" fill="#fff" fontSize="6.5" fontFamily="monospace" fillOpacity="0.9" transform="rotate(90,271,112)">DSP</text>
    </svg>
  );
}

/* ── M09 Agentic AI ── */
function Agents09({ svgProps, p, d, l }: S) {
  const tools = [
    { label:"SEARCH", x:150, y:18  },
    { label:"CODE",   x:258, y:52  },
    { label:"BROWSE", x:260, y:118 },
    { label:"MEMORY", x:150, y:148 },
    { label:"API",    x:40,  y:118 },
    { label:"TOOLS",  x:42,  y:52  },
  ];
  return (
    <svg {...svgProps}>
      {/* outer glow */}
      <circle cx="150" cy="83" r="62" fill={p} fillOpacity="0.12"/>

      {/* connection lines */}
      {tools.map((t,i)=>(
        <line key={i} x1="150" y1="83" x2={t.x} y2={t.y}
          stroke={p} strokeWidth="1.4" strokeOpacity="0.6" strokeDasharray="5 3"/>
      ))}

      {/* tool nodes */}
      {tools.map((t,i)=>(
        <g key={i}>
          <circle cx={t.x} cy={t.y} r="20" fill={p} fillOpacity="0.38" stroke={p} strokeWidth="1.5"/>
          <text x={t.x} y={t.y+4} textAnchor="middle" fill="#fff" fontSize="6.5" fontFamily="monospace" fillOpacity="0.95">{t.label}</text>
        </g>
      ))}

      {/* central LLM */}
      <circle cx="150" cy="83" r="32" fill={p} fillOpacity="0.55" stroke={p} strokeWidth="2"/>
      <circle cx="150" cy="83" r="22" fill={p} fillOpacity="0.4"/>
      <text x="150" y="79" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="monospace" fontWeight="bold" fillOpacity="1">LLM</text>
      <text x="150" y="92" textAnchor="middle" fill="#fff" fontSize="7" fontFamily="monospace" fillOpacity="0.85">AGENT</text>
    </svg>
  );
}

/* ── M10 End-to-End System ── */
function EndToEnd10({ svgProps, p, d, l }: S) {
  return (
    <svg {...svgProps}>
      {/* background glow */}
      <ellipse cx="150" cy="65" rx="130" ry="52" fill={p} fillOpacity="0.15"/>

      {/* Model weights (stacked) */}
      {[0,1,2,3].map(i=>(
        <rect key={i} x={18+i*3} y={28+i*3} width="48" height="38" rx="3"
          fill={p} fillOpacity={0.55 - i*0.1} stroke={p} strokeWidth="1" strokeOpacity={0.9 - i*0.15}/>
      ))}
      <text x="44" y="82" textAnchor="middle" fill="#fff" fontSize="7.5" fontFamily="monospace" fillOpacity="0.95">MODEL</text>

      {/* Arrow 1 */}
      <line x1="74" y1="50" x2="96" y2="50" stroke={p} strokeWidth="2" strokeOpacity="0.9"/>
      <path d="M91,44 L98,50 L91,56" fill="none" stroke={p} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>

      {/* API Server */}
      <rect x="98" y="26" width="76" height="48" rx="5" fill={p} fillOpacity="0.42" stroke={p} strokeWidth="1.5"/>
      <text x="136" y="46" textAnchor="middle" fill="#fff" fontSize="7.5" fontFamily="monospace" fillOpacity="1">API SERVER</text>
      <text x="136" y="60" textAnchor="middle" fill="#fff" fontSize="6.5" fontFamily="monospace" fillOpacity="0.75">FastAPI</text>

      {/* Arrow 2 */}
      <line x1="174" y1="50" x2="194" y2="50" stroke={p} strokeWidth="2" strokeOpacity="0.9"/>
      <path d="M189,44 L196,50 L189,56" fill="none" stroke={p} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Load balancer */}
      <rect x="196" y="34" width="52" height="32" rx="4" fill={l} fillOpacity="0.5" stroke={l} strokeWidth="1.5"/>
      <text x="222" y="53" textAnchor="middle" fill="#fff" fontSize="7.5" fontFamily="monospace" fillOpacity="0.95">NGINX</text>

      {/* Clients */}
      {[16,48,80].map((y,i)=>(
        <g key={i}>
          <line x1="248" y1="50" x2="262" y2={y+12} stroke={l} strokeWidth="1.4" strokeOpacity="0.7"/>
          <rect x="262" y={y} width="34" height="24" rx="3" fill={l} fillOpacity="0.42" stroke={l} strokeWidth="1.2"/>
          <text x="279" y={y+15} textAnchor="middle" fill="#fff" fontSize="6.5" fontFamily="monospace" fillOpacity="0.9">client</text>
        </g>
      ))}

      {/* Monitoring dashboard */}
      <rect x="18" y="102" width="224" height="48" rx="4" fill="#0a2010" stroke={p} strokeWidth="1.2" strokeOpacity="0.8"/>
      <text x="30" y="117" fill={p} fontSize="7" fontFamily="monospace" fillOpacity="0.85">MONITORING</text>
      {[
        { w:65,  label:"latency",    op:0.85 },
        { w:100, label:"throughput", op:0.65 },
        { w:42,  label:"errors",     op:0.45 },
      ].map((m,i)=>(
        <g key={i}>
          <rect x="28" y={120+i*10} width={m.w} height="7" rx="2" fill={p} fillOpacity={m.op}/>
          <text x={m.w+36} y={127+i*10} fill={p} fontSize="6" fontFamily="monospace" fillOpacity="0.8">{m.label}</text>
        </g>
      ))}
    </svg>
  );
}
