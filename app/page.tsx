import Link from "next/link";
import { getAllModules } from "@/lib/content";
import { MODULE_COLORS } from "@/lib/colors";
import ModuleIllustration from "@/components/ui/ModuleIllustration";

const ALL_MODULES = [
  { num: "01", title: "Semiconductor & Digital Foundations",      weeks: 2  },
  { num: "02", title: "Computer Architecture & Accelerators",     weeks: 2  },
  { num: "03", title: "AI & Deep Learning Foundations",           weeks: 3  },
  { num: "04", title: "Generative AI & LLM Fundamentals",         weeks: 2  },
  { num: "05", title: "Inference Systems Fundamentals",           weeks: 2  },
  { num: "06", title: "Model Optimization & Efficient Inference", weeks: 3  },
  { num: "07", title: "Inference Frameworks & LLM Runtimes",      weeks: 2  },
  { num: "08", title: "Hardware Acceleration: FPGA & Edge NPUs",  weeks: 4  },
  { num: "09", title: "Agentic AI Systems & Orchestration",       weeks: 2  },
  { num: "10", title: "End-to-End Systems, Scaling & Capstone",   weeks: 3  },
];


function HeroChip() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="chipGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00C9A7" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#00C9A7" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Glow */}
      <ellipse cx="200" cy="200" rx="180" ry="180" fill="url(#chipGlow)"/>

      {/* Outer traces — horizontal */}
      {[80,110,140,200,260,290,320].map(y=>(
        <line key={`ht${y}`} x1="20" y1={y} x2="380" y2={y} stroke="#00C9A7" strokeWidth="0.4" strokeOpacity="0.15"/>
      ))}
      {/* Outer traces — vertical */}
      {[80,110,140,200,260,290,320].map(x=>(
        <line key={`vt${x}`} x1={x} y1="20" x2={x} y2="380" stroke="#00C9A7" strokeWidth="0.4" strokeOpacity="0.15"/>
      ))}

      {/* IC body */}
      <rect x="100" y="100" width="200" height="200" rx="10" fill="#0a1628" stroke="#00C9A7" strokeWidth="1.5"/>

      {/* Die area */}
      <rect x="125" y="125" width="150" height="150" rx="5" fill="#091520" stroke="#00C9A7" strokeWidth="0.75" strokeOpacity="0.6"/>
      <rect x="125" y="125" width="150" height="150" rx="5" fill="url(#centerGlow)"/>

      {/* Die inner grid */}
      {[145,165,185,200,215,235,255].map(y=>(
        <line key={`dy${y}`} x1="125" y1={y} x2="275" y2={y} stroke="#00C9A7" strokeWidth="0.4" strokeOpacity="0.25"/>
      ))}
      {[145,165,185,200,215,235,255].map(x=>(
        <line key={`dx${x}`} x1={x} y1="125" x2={x} y2="275" stroke="#00C9A7" strokeWidth="0.4" strokeOpacity="0.25"/>
      ))}

      {/* Die sub-blocks */}
      <rect x="133" y="133" width="55" height="55" rx="3" fill="#00C9A7" fillOpacity="0.08" stroke="#00C9A7" strokeWidth="0.75"/>
      <rect x="212" y="133" width="55" height="55" rx="3" fill="#3B82F6" fillOpacity="0.08" stroke="#3B82F6" strokeWidth="0.75"/>
      <rect x="133" y="212" width="55" height="55" rx="3" fill="#8B5CF6" fillOpacity="0.08" stroke="#8B5CF6" strokeWidth="0.75"/>
      <rect x="212" y="212" width="55" height="55" rx="3" fill="#F59E0B" fillOpacity="0.08" stroke="#F59E0B" strokeWidth="0.75"/>

      {/* Center glowing dot */}
      <circle cx="200" cy="200" r="8" fill="#00C9A7" fillOpacity="0.8"/>
      <circle cx="200" cy="200" r="14" fill="#00C9A7" fillOpacity="0.2"/>
      <circle cx="200" cy="200" r="22" fill="#00C9A7" fillOpacity="0.08"/>

      {/* Pins — left */}
      {[130,150,170,190,210,230,250,270].map((y,i)=>(
        <g key={`pl${y}`}>
          <line x1="100" y1={y} x2="60" y2={y} stroke="#00C9A7" strokeWidth="1.5" strokeOpacity="0.7"/>
          <rect x="50" y={y-3} width="10" height="6" rx="1.5" fill="#00C9A7" fillOpacity="0.5"/>
        </g>
      ))}
      {/* Pins — right */}
      {[130,150,170,190,210,230,250,270].map((y)=>(
        <g key={`pr${y}`}>
          <line x1="300" y1={y} x2="340" y2={y} stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.7"/>
          <rect x="340" y={y-3} width="10" height="6" rx="1.5" fill="#3B82F6" fillOpacity="0.5"/>
        </g>
      ))}
      {/* Pins — top */}
      {[140,165,200,235,260].map((x)=>(
        <g key={`pt${x}`}>
          <line x1={x} y1="100" x2={x} y2="60" stroke="#8B5CF6" strokeWidth="1.5" strokeOpacity="0.7"/>
          <rect x={x-3} y="50" width="6" height="10" rx="1.5" fill="#8B5CF6" fillOpacity="0.5"/>
        </g>
      ))}
      {/* Pins — bottom */}
      {[140,165,200,235,260].map((x)=>(
        <g key={`pb${x}`}>
          <line x1={x} y1="300" x2={x} y2="340" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.7"/>
          <rect x={x-3} y="340" width="6" height="10" rx="1.5" fill="#F59E0B" fillOpacity="0.5"/>
        </g>
      ))}

      {/* Corner markers */}
      {[[100,100],[300,100],[300,300],[100,300]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="4" fill="#00C9A7" fillOpacity="0.5"/>
      ))}

      {/* Label on die */}
      <text x="200" y="100" textAnchor="middle" fill="#00C9A7" fontSize="8" fontFamily="monospace" fillOpacity="0.6">AI ACCELERATOR</text>
    </svg>
  );
}

export default function HomePage() {
  const availableModules = getAllModules();
  const availableSet = new Set(availableModules.map((m) => m.module));
  const firstLesson = availableModules[0]?.lessons[0];

  return (
    <div style={{ backgroundColor: "#ffffff", fontFamily: "var(--font-sans)" }}>

      {/* ─────────────────────── HERO ─────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #060d1a 0%, #0a1628 40%, #0d1f3c 70%, #101828 100%)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Nav */}
        <nav
          className="home-nav"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: 28, height: 28,
              background: "linear-gradient(135deg, #00C9A7, #3B82F6)",
              borderRadius: 6,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg viewBox="0 0 16 16" width={14} height={14} fill="none">
                <rect x="4" y="4" width="8" height="8" rx="1" stroke="white" strokeWidth="1.2"/>
                {[5,8,11].map(y=><line key={y} x1="2" y1={y} x2="4" y2={y} stroke="white" strokeWidth="1"/>)}
                {[5,8,11].map(y=><line key={y} x1="12" y1={y} x2="14" y2={y} stroke="white" strokeWidth="1"/>)}
              </svg>
            </div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>AI Inference &amp; Accelerator</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <span className="home-nav-stat" style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>10 Modules</span>
            <span className="home-nav-stat" style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>42+ Labs</span>
            <Link
              href="#author"
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 13, fontWeight: 500,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "5px 14px", borderRadius: 20,
              }}
            >
              About the Instructor
            </Link>
          </div>
        </nav>

        {/* Hero content */}
        <div className="hero-grid hero-pad" style={{
          flex: 1,
          display: "grid",
          alignItems: "center",
          maxWidth: 1280,
          margin: "0 auto",
          width: "100%",
        }}>
          {/* Left: text */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(0,201,167,0.1)",
              border: "1px solid rgba(0,201,167,0.25)",
              borderRadius: 20, padding: "5px 14px",
              marginBottom: 28,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00C9A7", display: "inline-block" }}/>
              <span style={{ color: "#00C9A7", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                From Silicon to Agentic Systems
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(36px, 4vw, 58px)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#fff",
              marginBottom: 24,
            }}>
              The Most{" "}
              <span style={{
                background: "linear-gradient(90deg, #00C9A7 0%, #3B82F6 50%, #8B5CF6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Interactive
              </span>
              <br />
              AI Engineering
              <br />
              Course Ever Built
            </h1>

            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 17, lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
              Don&apos;t read about how a transistor works.{" "}
              <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
                Drag the gate voltage and watch electrons form a channel in real time.
              </span>{" "}
              Every concept is something you can operate — silicon to production agents.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 56 }}>
              {firstLesson ? (
                <Link
                  href={`/modules/${availableModules[0].module}/${firstLesson.lessonPath}`}
                  style={{
                    background: "linear-gradient(135deg, #00C9A7, #3B82F6)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 15,
                    padding: "14px 32px",
                    borderRadius: 10,
                    textDecoration: "none",
                    display: "inline-block",
                    boxShadow: "0 0 32px rgba(0,201,167,0.35)",
                  }}
                >
                  Start Learning →
                </Link>
              ) : null}
              <Link
                href="#modules"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 14, fontWeight: 500,
                  textDecoration: "none",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                View all modules ↓
              </Link>
            </div>

            {/* Stats */}
            <div className="hero-stats" style={{ display: "flex", flexWrap: "wrap" }}>
              {[
                { value: "10", label: "Modules" },
                { value: "42+", label: "Labs" },
                { value: "27w", label: "Duration" },
                { value: "4", label: "Capstones" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ color: "#00C9A7", fontWeight: 800, fontSize: 22 }}>{s.value}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: chip illustration */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Glow backdrop */}
            <div style={{
              position: "absolute",
              width: 320, height: 320,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,201,167,0.15) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}/>
            <div style={{ width: "min(420px, 100%)", opacity: 0.95 }}>
              <HeroChip />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ textAlign: "center", padding: "0 0 32px", color: "rgba(255,255,255,0.25)", fontSize: 12 }}>
          ↓ scroll to explore
        </div>
      </section>

      {/* ─────────────────────── MODULE GRID ─────────────────────── */}
      <section id="modules" className="home-section" style={{ background: "#f9fafb" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <p style={{ color: "#00C9A7", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
              Course Curriculum
            </p>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: "#0d1b2a", marginBottom: 12 }}>
              10 Modules. Every Layer of the Stack.
            </h2>
            <p style={{ color: "#3d5a6e", fontSize: 16, maxWidth: 560 }}>
              From transistor physics to agentic AI systems — each module builds on the last, each with hands-on interactive labs.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
          }}>
            {ALL_MODULES.map((mod) => {
              const color = MODULE_COLORS[mod.num];
              const isAvailable = availableSet.has(mod.num);
              const moduleData = availableModules.find((m) => m.module === mod.num);
              const firstLesson = moduleData?.lessons[0];

              const cardInner = (
                <div
                  style={{
                    borderRadius: 14,
                    overflow: "hidden",
                    border: `1.5px solid ${isAvailable ? color.border : "#e5e7eb"}`,
                    backgroundColor: "#fff",
                    transition: "transform 0.15s ease, box-shadow 0.15s ease",
                    cursor: isAvailable ? "pointer" : "default",
                  }}
                  className={isAvailable ? "module-card" : ""}
                >
                  {/* Illustration header */}
                  <div style={{
                    position: "relative",
                    height: 160,
                    overflow: "hidden",
                    borderBottom: `1px solid ${isAvailable ? color.border : "#e5e7eb"}`,
                    opacity: 1,
                  }}>
                    <ModuleIllustration num={mod.num} color={color} />
                    <span style={{
                      position: "absolute", top: 10, right: 10,
                      fontSize: 11, fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: isAvailable ? "#fff" : "#9ca3af",
                      background: isAvailable ? "rgba(0,0,0,0.45)" : "#f3f4f6",
                      border: `1px solid ${isAvailable ? "rgba(255,255,255,0.18)" : "#e5e7eb"}`,
                      borderRadius: 6,
                      padding: "2px 8px",
                      backdropFilter: "blur(4px)",
                    }}>
                      M{mod.num}
                    </span>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: "16px 20px 20px" }}>
                    <p style={{
                      fontSize: 13, fontWeight: 700,
                      color: isAvailable ? "#0d1b2a" : "#6b7280",
                      lineHeight: 1.4,
                      marginBottom: 12,
                    }}>
                      {mod.title}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{
                        fontSize: 11, fontWeight: 600,
                        color: isAvailable ? color.dark : "#9ca3af",
                        background: isAvailable ? color.subtle : "#f9fafb",
                        border: `1px solid ${isAvailable ? color.border : "#e5e7eb"}`,
                        borderRadius: 4, padding: "2px 7px",
                      }}>
                        {mod.weeks}w
                      </span>
                      {isAvailable && moduleData ? (
                        <span style={{ fontSize: 11, color: color.dark, fontWeight: 500 }}>
                          {moduleData.lessons.length} lesson{moduleData.lessons.length !== 1 ? "s" : ""} ↗
                        </span>
                      ) : (
                        <span style={{ fontSize: 11, color: "#9ca3af" }}>Coming soon</span>
                      )}
                    </div>
                  </div>
                </div>
              );

              return isAvailable && firstLesson ? (
                <Link key={mod.num} href={`/modules/${mod.num}/${firstLesson.lessonPath}`} style={{ textDecoration: "none", display: "block" }}>
                  {cardInner}
                </Link>
              ) : (
                <div key={mod.num}>{cardInner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────── HOW IT WORKS ─────────────────────── */}
      <section className="home-section" style={{ backgroundColor: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ color: "#00C9A7", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
              How Every Module Works
            </p>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0d1b2a" }}>
              Three steps. Every lesson. Every module.
            </h2>
          </div>
          <div className="steps-grid" style={{ display: "grid", position: "relative" }}>
            {/* connector line */}
            <div className="steps-connector" style={{
              position: "absolute", top: 36, left: "calc(33.33% - 0px)", right: "calc(33.33% - 0px)",
              height: 2, background: "linear-gradient(90deg, #00C9A7, #3B82F6)",
              zIndex: 0,
            }}/>
            {[
              {
                step: "01",
                color: "#00C9A7",
                title: "Understand",
                subtitle: "First principles, not hand-waving",
                body: "Every concept is grounded in the actual physics, math, or systems design. We start with why before how — so the mental model you build is durable.",
                icon: (
                  <svg viewBox="0 0 32 32" width={28} height={28} fill="none">
                    <circle cx="16" cy="16" r="10" stroke="#00C9A7" strokeWidth="2"/>
                    <path d="M16 10v6l4 2" stroke="#00C9A7" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                step: "02",
                color: "#3B82F6",
                title: "Operate",
                subtitle: "Drag it. Toggle it. Break it.",
                body: "Each concept has an interactive you control — sliders, clock pulses, bit-flippers. You don't read about the MOSFET channel forming; you drag the gate voltage and watch it happen.",
                icon: (
                  <svg viewBox="0 0 32 32" width={28} height={28} fill="none">
                    <rect x="4" y="14" width="10" height="4" rx="2" stroke="#3B82F6" strokeWidth="2"/>
                    <circle cx="18" cy="16" r="2" fill="#3B82F6"/>
                    <path d="M20 16h8" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                step: "03",
                color: "#8B5CF6",
                title: "Ship",
                subtitle: "Labs you can run and keep",
                body: "Every module closes with a lab — working code, real tools, real outputs. By Module 10 you have built inference servers, quantized models, and a deployed multi-agent pipeline.",
                icon: (
                  <svg viewBox="0 0 32 32" width={28} height={28} fill="none">
                    <path d="M6 26 L16 6 L26 26" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 20h12" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
              },
            ].map((f) => (
              <div key={f.step} style={{ padding: "0 32px 0", textAlign: "center", position: "relative", zIndex: 1 }}>
                {/* Step circle */}
                <div style={{
                  width: 72, height: 72, borderRadius: "50%",
                  border: `2px solid ${f.color}`,
                  background: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px",
                  boxShadow: `0 0 0 6px ${f.color}18`,
                }}>
                  {f.icon}
                </div>
                <p style={{ color: f.color, fontWeight: 800, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                  Step {f.step}
                </p>
                <h3 style={{ fontWeight: 800, fontSize: 22, color: "#0d1b2a", marginBottom: 6 }}>{f.title}</h3>
                <p style={{ color: "#7a9bad", fontSize: 13, fontWeight: 600, marginBottom: 14 }}>{f.subtitle}</p>
                <p style={{ color: "#3d5a6e", fontSize: 14, lineHeight: 1.75 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────── AUTHOR ─────────────────────── */}
      <section id="author" className="home-section" style={{
        background: "linear-gradient(135deg, #060d1a 0%, #0a1628 60%, #0d1f3c 100%)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <p style={{ color: "#00C9A7", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 40 }}>
            About the Instructor
          </p>

          <div className="author-grid" style={{ display: "grid", alignItems: "start" }}>

            {/* Left — identity + bio */}
            <div>
              {/* Avatar + name */}
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "linear-gradient(135deg, #00C9A7, #3B82F6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 24, fontWeight: 800, color: "#fff",
                }}>VD</div>
                <div>
                  <h2 style={{ color: "#fff", fontWeight: 800, fontSize: 24, marginBottom: 4 }}>
                    Vivek Dhandapani
                  </h2>
                  <a
                    href="https://www.linkedin.com/in/vivekdhandapani"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      color: "#00C9A7", fontSize: 13, fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <svg viewBox="0 0 20 20" width={14} height={14} fill="currentColor">
                      <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
                    </svg>
                    linkedin.com/in/vivekdhandapani
                  </a>
                </div>
              </div>

              {/* Bio bullets */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "Applied AI Architect with 17+ years across AI systems, enterprise delivery, and financial-services transformation — designing and shipping production-grade agentic AI, LangGraph orchestration, RAG, and multi-agent systems.",
                  "Hands-on agentic engineering combined with deep BFSI domain expertise and the ability to own enterprise AI engagements end to end: scoping ambiguous problems, architecting the solution, building it, and carrying stakeholders through production.",
                  "Founded and scaled an AI/analytics startup to a 21-member team; led enterprise GenAI delivery at Bain & Company. Delivered workflows that cut enterprise contract review from 12 weeks to 2 days.",
                  "IIT Madras Best Student distinction. PhD research at IIM Shillong (CGPA 4.03/4.33, top of cohort). Research interests: AI transparency, disclosure quality, governance, and applied AI in financial services.",
                ].map((text, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ color: "#00C9A7", marginTop: 5, flexShrink: 0, fontSize: 10 }}>◆</span>
                    <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{text}</p>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Education</p>
                {[
                  { deg: "PhD — AI in Digital Transformation (in progress)", inst: "IIM Shillong", years: "2021–2026" },
                  { deg: "MBA, Finance", inst: "IIT Madras", years: "2009–2011" },
                  { deg: "B.E., Electronics & Instrumentation", inst: "Anna University", years: "2003–2007" },
                ].map((e, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                    <div>
                      <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 600 }}>{e.deg}</span>
                      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}> · {e.inst}</span>
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, flexShrink: 0, marginLeft: 12 }}>{e.years}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — expertise */}
            <div>
              {[
                {
                  heading: "Agentic AI & LLM Systems",
                  color: "#00C9A7",
                  tags: ["LangGraph","LangChain","LangSmith","ReAct","MCP","Multi-Agent Orchestration","Tool & Function Calling","Prompt Engineering","LLM Fine-Tuning","Agent Observability","Production AI Systems"],
                },
                {
                  heading: "Retrieval & AI Infrastructure",
                  color: "#3B82F6",
                  tags: ["RAG","FAISS","PgVector","Qdrant","Weaviate","Hybrid & Semantic Search","Embedding Pipelines"],
                },
                {
                  heading: "Models, ML & NLP",
                  color: "#8B5CF6",
                  tags: ["OpenAI GPTs","Llama","Mistral","Hugging Face","ASR/TTS","Transformers","PyTorch","TensorFlow","Scikit-learn","NLP","NER","Sentiment Analysis"],
                },
                {
                  heading: "Engineering & Cloud",
                  color: "#F59E0B",
                  tags: ["Python","FastAPI","Flask","Streamlit","REST APIs","n8n","Docker","GitHub Actions","PostgreSQL","MongoDB","AWS","GCP Vertex AI","Copilot Studio"],
                },
                {
                  heading: "Areas of Interest",
                  color: "#F43F5E",
                  tags: ["AI Infrastructure Engineering","Production Multi-Agent Systems","AI Governance & Transparency","FPGA-Accelerated AI Inference","Low-Latency Financial AI"],
                },
              ].map((group) => (
                <div key={group.heading} style={{ marginBottom: 24 }}>
                  <p style={{ color: group.color, fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 10 }}>
                    {group.heading}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {group.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: 11, fontWeight: 500,
                        color: "rgba(255,255,255,0.75)",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 5, padding: "3px 9px",
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────── FOOTER ─────────────────────── */}
      <footer className="home-footer" style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
        background: "#060d1a",
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>AI Inference &amp; Accelerator Engineering</span>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© Vivek Dhandapani</span>
      </footer>
    </div>
  );
}
