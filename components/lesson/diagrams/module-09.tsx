import { C, DiagramFrame, mono } from "./_shared";

/* ════════════════════════════════════════════════════════════
   Module 9 — Agentic AI Systems & Orchestration
   Accent: indigo (C.indigo). Code-heavy module; diagrams carry
   the architecture (loops, graphs, stacks) the prose describes.
   ════════════════════════════════════════════════════════════ */

const INDIGO = C.indigo;

/* ════════════════════════════════════════════════════════════
   9.1 — The Agent Mental Model
   ════════════════════════════════════════════════════════════ */

/* LLM-as-function vs LLM-as-decision-maker. */
export function AgentVsFunction({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 180" width="100%" role="img" aria-label="Function call versus agent loop">
        {/* function */}
        <text x="150" y="24" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.off}>LLM as FUNCTION (every module so far)</text>
        <rect x="40" y="40" width="60" height="28" rx="5" fill={`${C.off}16`} stroke={C.off} strokeWidth="1.1" />
        <text x="70" y="58" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.off}>prompt</text>
        <rect x="120" y="40" width="60" height="28" rx="5" fill={`${C.off}16`} stroke={C.off} strokeWidth="1.1" />
        <text x="150" y="58" textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={C.off}>LLM</text>
        <rect x="200" y="40" width="60" height="28" rx="5" fill={`${C.off}16`} stroke={C.off} strokeWidth="1.1" />
        <text x="230" y="58" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={C.off}>answer</text>
        <line x1="100" y1="54" x2="120" y2="54" stroke={C.faint} strokeWidth="1.1" /><polygon points="120,54 113,50 113,58" fill={C.faint} />
        <line x1="180" y1="54" x2="200" y2="54" stroke={C.faint} strokeWidth="1.1" /><polygon points="200,54 193,50 193,58" fill={C.faint} />
        <text x="150" y="84" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>passive · milliseconds · always terminates</text>
        {/* agent */}
        <text x="410" y="24" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={INDIGO}>LLM as DECISION-MAKER (an agent)</text>
        <rect x="350" y="40" width="56" height="28" rx="5" fill={`${INDIGO}14`} stroke={INDIGO} strokeWidth="1.2" />
        <text x="378" y="58" textAnchor="middle" fontFamily={mono} fontSize="7.5" fill={INDIGO}>goal</text>
        <rect x="424" y="40" width="56" height="28" rx="5" fill={`${INDIGO}1f`} stroke={INDIGO} strokeWidth="1.5" />
        <text x="452" y="58" textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={INDIGO}>LLM</text>
        <rect x="498" y="40" width="48" height="28" rx="5" fill={`${C.on}16`} stroke={C.on} strokeWidth="1.1" />
        <text x="522" y="58" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.on}>tools</text>
        <line x1="406" y1="54" x2="424" y2="54" stroke={C.faint} strokeWidth="1.1" /><polygon points="424,54 417,50 417,58" fill={C.faint} />
        {/* loop arrows between LLM and tools */}
        <path d="M480 48 Q492 42 498 48" stroke={C.on} strokeWidth="1.1" fill="none" /><polygon points="498,48 491,45 494,52" fill={C.on} />
        <path d="M498 60 Q492 66 480 60" stroke={INDIGO} strokeWidth="1.1" fill="none" /><polygon points="480,60 487,59 484,65" fill={INDIGO} />
        <text x="448" y="86" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>decides · observes · loops until done</text>
        <text x="280" y="116" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.text}>the agent chooses tools, reads results, and adjusts its plan — minutes, dozens of calls, side effects</text>
        <text x="280" y="140" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>the hard part isn&apos;t capability — it&apos;s reliability: doing the right thing 99% of the time</text>
      </svg>
    </DiagramFrame>
  );
}

/* The core agent loop: LLM ⇄ tool executor until plain text. */
export function AgentLoop({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 210" width="100%" role="img" aria-label="The core agent loop">
        <rect x="40" y="30" width="120" height="34" rx="6" fill={`${INDIGO}14`} stroke={INDIGO} strokeWidth="1.3" />
        <text x="100" y="48" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={INDIGO}>goal / system prompt</text>
        <text x="100" y="59" textAnchor="middle" fontFamily={mono} fontSize="6.6" fill={C.muted}>what to achieve</text>
        <line x1="100" y1="64" x2="100" y2="86" stroke={C.faint} strokeWidth="1.2" /><polygon points="100,86 96,79 104,79" fill={C.faint} />
        {/* LLM */}
        <rect x="40" y="86" width="120" height="44" rx="7" fill={`${INDIGO}1f`} stroke={INDIGO} strokeWidth="1.6" />
        <text x="100" y="106" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={INDIGO}>LLM</text>
        <text x="100" y="120" textAnchor="middle" fontFamily={mono} fontSize="6.6" fill={C.muted}>reason → decide</text>
        {/* tool executor */}
        <rect x="320" y="86" width="160" height="44" rx="7" fill={`${C.on}14`} stroke={C.on} strokeWidth="1.4" />
        <text x="400" y="104" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.on}>tool executor</text>
        <text x="400" y="118" textAnchor="middle" fontFamily={mono} fontSize="6.6" fill={C.muted}>functions · APIs · code</text>
        {/* arrows between */}
        <path d="M160 100 L320 100" stroke={C.faint} strokeWidth="1.2" fill="none" /><polygon points="320,100 313,96 313,104" fill={C.faint} />
        <text x="240" y="94" textAnchor="middle" fontFamily={mono} fontSize="7" fontWeight="700" fill={C.on}>tool_calls</text>
        <path d="M320 116 L160 116" stroke={C.faint} strokeWidth="1.2" fill="none" /><polygon points="160,116 167,112 167,120" fill={C.faint} />
        <text x="240" y="128" textAnchor="middle" fontFamily={mono} fontSize="7" fontWeight="700" fill={INDIGO}>tool_results</text>
        {/* terminate */}
        <line x1="100" y1="130" x2="100" y2="156" stroke={C.faint} strokeWidth="1.2" /><polygon points="100,156 96,149 104,149" fill={C.faint} />
        <rect x="40" y="156" width="120" height="34" rx="6" fill={`${C.gate}14`} stroke={C.gate} strokeWidth="1.3" />
        <text x="100" y="174" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.gate}>final answer</text>
        <text x="100" y="185" textAnchor="middle" fontFamily={mono} fontSize="6.4" fill={C.muted}>text, no tool calls</text>
        <text x="300" y="170" fontFamily={mono} fontSize="7.5" fill={C.muted}>loop while the LLM keeps</text>
        <text x="300" y="182" fontFamily={mono} fontSize="7.5" fill={C.muted}>emitting tool calls;</text>
        <text x="300" y="194" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={C.faint}>plain text ⇒ stop</text>
        <text x="270" y="24" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.muted}>every agent framework is a variation on this one loop</text>
      </svg>
    </DiagramFrame>
  );
}

/* The six canonical agent failure modes + their fixes. */
export function AgentFailureModes({ caption }: { caption?: string }) {
  const rows = [
    { f: "hallucinated tool calls", fix: "strict schema validation · clear error results", c: C.hole },
    { f: "infinite loops", fix: "max_steps · loop detection · escalation", c: C.gate },
    { f: "context overflow", fix: "compress old observations → external memory", c: C.violet },
    { f: "cascading errors", fix: "checkpoints · error-recovery steps · backtrack", c: C.hole },
    { f: "cost explosions", fix: "per-run budget · cost tracking · circuit breaker", c: C.gate },
    { f: "tool side effects", fix: "dry-run · human-in-the-loop for irreversible acts", c: C.violet },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 220" width="100%" role="img" aria-label="The six agent failure modes and fixes">
        <text x="280" y="20" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>know the failure modes BEFORE you build — each has a standard fix</text>
        <text x="40" y="40" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={C.faint}>FAILURE MODE</text>
        <text x="300" y="40" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={C.on}>THE FIX</text>
        {rows.map((r, i) => {
          const y = 50 + i * 27;
          return (
            <g key={`fm${i}`}>
              <rect x="36" y={y} width="248" height="22" rx="4" fill={`${r.c}12`} stroke={r.c} strokeWidth="1" />
              <text x="46" y={y + 15} fontFamily={mono} fontSize="8" fontWeight="700" fill={r.c}>{r.f}</text>
              <text x="300" y={y + 15} fontFamily={mono} fontSize="7.6" fill={C.text}>{r.fix}</text>
            </g>
          );
        })}
        <text x="280" y="214" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.faint}>reliability engineering = anticipating these, not reacting to them in production</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   9.2 — ReAct: The Foundation Pattern
   ════════════════════════════════════════════════════════════ */

/* The Thought → Action → Observation cycle. */
export function ReActCycle({ caption }: { caption?: string }) {
  const steps = [
    { t: "Thought", d: "reason about what to do next", c: INDIGO },
    { t: "Action", d: "call a tool", c: C.on },
    { t: "Observation", d: "read the tool result", c: C.gate },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 180" width="100%" role="img" aria-label="The ReAct thought action observation cycle">
        <text x="270" y="22" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>ReAct = Reason + Act — alternate thinking and tool use until the goal is met</text>
        {steps.map((s, i) => {
          const x = 30 + i * 168;
          return (
            <g key={`rc${i}`}>
              <rect x={x} y="46" width="148" height="56" rx="8" fill={`${s.c}14`} stroke={s.c} strokeWidth="1.4" />
              <text x={x + 74} y="70" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={s.c}>{s.t}</text>
              <foreignObject x={x + 6} y="76" width="136" height="24"><div style={{ fontFamily: mono, fontSize: "7.4px", color: C.muted, textAlign: "center", lineHeight: 1.25 }}>{s.d}</div></foreignObject>
              {i < 2 && <g><line x1={x + 148} y1="74" x2={x + 162} y2="74" stroke={C.faint} strokeWidth="1.2" /><polygon points={`${x + 162},74 ${x + 155},70 ${x + 155},78`} fill={C.faint} /></g>}
            </g>
          );
        })}
        {/* loop back arrow */}
        <path d="M474 102 Q500 140 270 140 Q40 140 66 104" stroke={INDIGO} strokeWidth="1.3" fill="none" strokeDasharray="4 3" />
        <polygon points="66,104 62,112 71,109" fill={INDIGO} />
        <text x="270" y="136" textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={INDIGO}>repeat until enough information → Final Answer</text>
        <text x="270" y="166" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>observations ground the model in reality (prevents pure hallucination); the trace is auditable</text>
      </svg>
    </DiagramFrame>
  );
}

/* Standard vs Chain-of-Thought vs ReAct. */
export function ReActComparison({ caption }: { caption?: string }) {
  const cols = [
    { t: "Standard", d: "direct answer", g: "no reasoning, no tools", trust: "LLM arithmetic", c: C.off },
    { t: "Chain-of-Thought", d: "reasoning shown", g: "thinks step-by-step", trust: "still LLM arithmetic", c: C.violet },
    { t: "ReAct", d: "reason + tools", g: "calls a calculator/search", trust: "grounded in real execution", c: INDIGO },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 170" width="100%" role="img" aria-label="Standard versus chain of thought versus ReAct">
        {cols.map((c, i) => {
          const x = 16 + i * 178;
          return (
            <g key={`cmp${i}`}>
              <rect x={x} y="34" width="164" height="104" rx="8" fill={`${c.c}12`} stroke={c.c} strokeWidth="1.5" />
              <text x={x + 82} y="54" textAnchor="middle" fontFamily={mono} fontSize="9.5" fontWeight="700" fill={c.c}>{c.t}</text>
              <text x={x + 82} y="70" textAnchor="middle" fontFamily={mono} fontSize="7.4" fill={C.text}>{c.d}</text>
              <foreignObject x={x + 8} y="78" width="148" height="22"><div style={{ fontFamily: mono, fontSize: "7px", color: C.muted, textAlign: "center", lineHeight: 1.2 }}>{c.g}</div></foreignObject>
              <text x={x + 82} y="120" textAnchor="middle" fontFamily={mono} fontSize="6.8" fontWeight="700" fill={c.c}>grounds on:</text>
              <foreignObject x={x + 8} y="123" width="148" height="14"><div style={{ fontFamily: mono, fontSize: "6.8px", color: C.faint, textAlign: "center" }}>{c.trust}</div></foreignObject>
            </g>
          );
        })}
        <text x="280" y="24" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>only ReAct grounds the answer in actual tool execution — strictly more reliable for facts</text>
        <text x="280" y="158" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>CoT (Module 4) makes reasoning visible; ReAct adds the act + observe loop on top</text>
      </svg>
    </DiagramFrame>
  );
}

/* Four tool-design principles. */
export function ToolDesignPrinciples({ caption }: { caption?: string }) {
  const items = [
    { t: "structured results", d: "return JSON, not prose the LLM must re-parse", c: INDIGO },
    { t: "errors as results", d: "return \"ERROR: …\" strings — never raise/crash", c: C.hole },
    { t: "include metadata", d: "query, timestamp, count alongside the data", c: C.gate },
    { t: "idempotent where possible", d: "safe to retry; add idempotency keys for side effects", c: C.on },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 170" width="100%" role="img" aria-label="Four tool design principles">
        <text x="280" y="20" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>the tools you give an agent determine what it can do AND how reliably it does it</text>
        {items.map((it, i) => {
          const x = 16 + (i % 2) * 272;
          const y = 34 + Math.floor(i / 2) * 62;
          return (
            <g key={`td${i}`}>
              <rect x={x} y={y} width="256" height="52" rx="7" fill={`${it.c}12`} stroke={it.c} strokeWidth="1.3" />
              <text x={x + 12} y={y + 22} fontFamily={mono} fontSize="8.5" fontWeight="700" fill={it.c}>{i + 1}. {it.t}</text>
              <foreignObject x={x + 12} y={y + 27} width="234" height="22"><div style={{ fontFamily: mono, fontSize: "7.4px", color: C.muted, lineHeight: 1.25 }}>{it.d}</div></foreignObject>
            </g>
          );
        })}
        <text x="280" y="164" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.faint}>a clean tool layer prevents failure modes 1, 4, and 6 before they start</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   9.3 — LangGraph: Stateful Agent Workflows
   ════════════════════════════════════════════════════════════ */

/* Nodes + edges + state — the three LangGraph primitives. */
export function LangGraphAnatomy({ caption }: { caption?: string }) {
  const parts = [
    { t: "Nodes", d: "functions: LLM calls, tool calls, custom logic", c: INDIGO },
    { t: "Edges", d: "transitions — fixed or conditional (routing fn)", c: C.on },
    { t: "State", d: "typed dict that flows through & is updated by nodes", c: C.gate },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 160" width="100%" role="img" aria-label="LangGraph anatomy: nodes edges state">
        <text x="280" y="20" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>LangGraph models an agent as a directed graph of three primitives</text>
        {parts.map((p, i) => {
          const x = 16 + i * 178;
          return (
            <g key={`lg${i}`}>
              <rect x={x} y="38" width="164" height="74" rx="8" fill={`${p.c}12`} stroke={p.c} strokeWidth="1.5" />
              <text x={x + 82} y="60" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={p.c}>{p.t}</text>
              <foreignObject x={x + 8} y="68" width="148" height="40"><div style={{ fontFamily: mono, fontSize: "7.4px", color: C.muted, textAlign: "center", lineHeight: 1.3 }}>{p.d}</div></foreignObject>
            </g>
          );
        })}
        <text x="280" y="138" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>this buys branching, parallelism, cycles, checkpointing, and human-in-the-loop — what plain ReAct lacks</text>
      </svg>
    </DiagramFrame>
  );
}

/* The canonical agent graph with a conditional edge back to the LLM. */
export function ConditionalAgentGraph({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 190" width="100%" role="img" aria-label="LangGraph agent graph with conditional routing">
        {/* START */}
        <rect x="40" y="86" width="64" height="30" rx="15" fill={`${C.off}14`} stroke={C.off} strokeWidth="1.2" />
        <text x="72" y="105" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.off}>START</text>
        {/* call_llm */}
        <rect x="150" y="80" width="110" height="42" rx="7" fill={`${INDIGO}1a`} stroke={INDIGO} strokeWidth="1.5" />
        <text x="205" y="100" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={INDIGO}>call_llm</text>
        <text x="205" y="113" textAnchor="middle" fontFamily={mono} fontSize="6.6" fill={C.muted}>node</text>
        {/* router diamond */}
        <polygon points="340,101 372,80 404,101 372,122" fill={`${C.gate}16`} stroke={C.gate} strokeWidth="1.3" />
        <text x="372" y="98" textAnchor="middle" fontFamily={mono} fontSize="6.8" fontWeight="700" fill={C.gate}>tool</text>
        <text x="372" y="108" textAnchor="middle" fontFamily={mono} fontSize="6.8" fontWeight="700" fill={C.gate}>calls?</text>
        {/* execute_tools */}
        <rect x="430" y="40" width="100" height="40" rx="7" fill={`${C.on}14`} stroke={C.on} strokeWidth="1.4" />
        <text x="480" y="58" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.on}>execute_tools</text>
        <text x="480" y="71" textAnchor="middle" fontFamily={mono} fontSize="6.4" fill={C.muted}>node</text>
        {/* END */}
        <rect x="446" y="122" width="64" height="30" rx="15" fill={`${C.hole}14`} stroke={C.hole} strokeWidth="1.2" />
        <text x="478" y="141" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.hole}>END</text>
        {/* edges */}
        <line x1="104" y1="101" x2="150" y2="101" stroke={C.faint} strokeWidth="1.2" /><polygon points="150,101 143,97 143,105" fill={C.faint} />
        <line x1="260" y1="101" x2="340" y2="101" stroke={C.faint} strokeWidth="1.2" /><polygon points="340,101 333,97 333,105" fill={C.faint} />
        <line x1="404" y1="90" x2="430" y2="68" stroke={C.on} strokeWidth="1.2" /><polygon points="430,68 422,69 426,75" fill={C.on} />
        <text x="430" y="92" fontFamily={mono} fontSize="6.6" fontWeight="700" fill={C.on}>yes</text>
        <line x1="404" y1="112" x2="446" y2="132" stroke={C.hole} strokeWidth="1.2" /><polygon points="446,132 438,130 441,137" fill={C.hole} />
        <text x="410" y="128" fontFamily={mono} fontSize="6.6" fontWeight="700" fill={C.hole}>no</text>
        {/* loop back execute_tools -> call_llm */}
        <path d="M480 40 Q480 14 205 14 Q160 14 175 78" stroke={INDIGO} strokeWidth="1.2" fill="none" strokeDasharray="4 3" />
        <polygon points="175,78 170,71 180,72" fill={INDIGO} />
        <text x="300" y="11" textAnchor="middle" fontFamily={mono} fontSize="6.8" fontWeight="700" fill={INDIGO}>results fed back → call_llm again</text>
        <text x="270" y="176" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>a conditional edge routes on state; tools loop back to the LLM, plain text routes to END</text>
      </svg>
    </DiagramFrame>
  );
}

/* interrupt_before: the human-in-the-loop approval gate. */
export function HumanInLoopGate({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 170" width="100%" role="img" aria-label="Human in the loop approval gate">
        <rect x="30" y="64" width="104" height="40" rx="7" fill={`${INDIGO}1a`} stroke={INDIGO} strokeWidth="1.4" />
        <text x="82" y="82" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={INDIGO}>LLM proposes</text>
        <text x="82" y="95" textAnchor="middle" fontFamily={mono} fontSize="6.6" fill={C.muted}>tool_calls</text>
        {/* pause gate */}
        <rect x="180" y="58" width="120" height="52" rx="7" fill={`${C.gate}16`} stroke={C.gate} strokeWidth="1.6" strokeDasharray="5 3" />
        <text x="240" y="78" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.gate}>⏸ interrupt_before</text>
        <text x="240" y="92" textAnchor="middle" fontFamily={mono} fontSize="6.6" fill={C.muted}>graph pauses;</text>
        <text x="240" y="103" textAnchor="middle" fontFamily={mono} fontSize="6.6" fill={C.muted}>human inspects state</text>
        <line x1="134" y1="84" x2="180" y2="84" stroke={C.faint} strokeWidth="1.2" /><polygon points="180,84 173,80 173,88" fill={C.faint} />
        {/* approve / reject */}
        <rect x="360" y="34" width="170" height="34" rx="6" fill={`${C.on}14`} stroke={C.on} strokeWidth="1.3" />
        <text x="445" y="55" textAnchor="middle" fontFamily={mono} fontSize="7.6" fontWeight="700" fill={C.on}>approve → resume (invoke None)</text>
        <rect x="360" y="100" width="170" height="34" rx="6" fill={`${C.hole}14`} stroke={C.hole} strokeWidth="1.3" />
        <text x="445" y="121" textAnchor="middle" fontFamily={mono} fontSize="7.6" fontWeight="700" fill={C.hole}>reject → update_state (cancel)</text>
        <line x1="300" y1="78" x2="360" y2="54" stroke={C.on} strokeWidth="1.2" /><polygon points="360,54 352,55 356,61" fill={C.on} />
        <line x1="300" y1="92" x2="360" y2="114" stroke={C.hole} strokeWidth="1.2" /><polygon points="360,114 352,112 356,119" fill={C.hole} />
        <text x="280" y="156" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.faint}>checkpointing makes the pause possible — mandatory for irreversible actions (failure mode 6)</text>
      </svg>
    </DiagramFrame>
  );
}
