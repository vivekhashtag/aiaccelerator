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

/* ════════════════════════════════════════════════════════════
   9.4 — Multi-Agent Systems
   ════════════════════════════════════════════════════════════ */

/* Three multi-agent topologies. */
export function MultiAgentPatterns({ caption }: { caption?: string }) {
  const cards = [
    { t: "Supervisor", d: "one router LLM picks the next worker each turn", best: "clear task decomposition", c: INDIGO },
    { t: "Peer-to-peer", d: "agents hand off control directly to each other", best: "dynamic, flow-based routing", c: C.on },
    { t: "Critic", d: "one agent reviews another & requests revisions", best: "quality / correctness loops", c: C.gate },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 160" width="100%" role="img" aria-label="Three multi-agent patterns">
        <text x="280" y="20" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>three ways to organize multiple agents — pick by how work flows</text>
        {cards.map((c, i) => {
          const x = 16 + i * 178;
          return (
            <g key={`ma${i}`}>
              <rect x={x} y="34" width="164" height="100" rx="8" fill={`${c.c}12`} stroke={c.c} strokeWidth="1.5" />
              <text x={x + 82} y="54" textAnchor="middle" fontFamily={mono} fontSize="10" fontWeight="700" fill={c.c}>{c.t}</text>
              <foreignObject x={x + 8} y="62" width="148" height="40"><div style={{ fontFamily: mono, fontSize: "7.4px", color: C.text, textAlign: "center", lineHeight: 1.3 }}>{c.d}</div></foreignObject>
              <foreignObject x={x + 8} y="106" width="148" height="22"><div style={{ fontFamily: mono, fontSize: "7px", color: C.muted, textAlign: "center", lineHeight: 1.2 }}>best: {c.best}</div></foreignObject>
            </g>
          );
        })}
        <text x="280" y="152" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>specialisation, parallelism, scale, and reliability — the reasons to use more than one agent</text>
      </svg>
    </DiagramFrame>
  );
}

/* Supervisor routes to specialised workers, who report back. */
export function SupervisorPattern({ caption }: { caption?: string }) {
  const workers = [
    { t: "research", c: C.on },
    { t: "code", c: C.gate },
    { t: "write", c: C.violet },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 190" width="100%" role="img" aria-label="Supervisor multi-agent pattern">
        {/* supervisor */}
        <rect x="200" y="28" width="140" height="40" rx="8" fill={`${INDIGO}1a`} stroke={INDIGO} strokeWidth="1.6" />
        <text x="270" y="46" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={INDIGO}>Supervisor LLM</text>
        <text x="270" y="59" textAnchor="middle" fontFamily={mono} fontSize="6.6" fill={C.muted}>which worker next?</text>
        {/* workers */}
        {workers.map((w, i) => {
          const x = 60 + i * 150;
          return (
            <g key={`sw${i}`}>
              <rect x={x} y="120" width="120" height="40" rx="7" fill={`${w.c}14`} stroke={w.c} strokeWidth="1.3" />
              <text x={x + 60} y="138" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={w.c}>{w.t}_agent</text>
              <text x={x + 60} y="151" textAnchor="middle" fontFamily={mono} fontSize="6.4" fill={C.muted}>specialised</text>
              {/* down (route) */}
              <line x1="270" y1="68" x2={x + 60} y2="120" stroke={C.faint} strokeWidth="1.1" />
              <polygon points={`${x + 60},120 ${x + 56},113 ${x + 64},113`} fill={C.faint} />
            </g>
          );
        })}
        <text x="270" y="100" textAnchor="middle" fontFamily={mono} fontSize="7" fontWeight="700" fill={C.faint}>route + instruction ↓     ↑ result returns to supervisor</text>
        <text x="270" y="178" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>workers always report back; the supervisor loops until it routes to FINISH → END</text>
      </svg>
    </DiagramFrame>
  );
}

/* Writer ⇄ Critic revision loop. */
export function CriticLoop({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 170" width="100%" role="img" aria-label="Writer critic revision loop">
        <rect x="60" y="60" width="130" height="46" rx="8" fill={`${INDIGO}1a`} stroke={INDIGO} strokeWidth="1.5" />
        <text x="125" y="80" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={INDIGO}>writer_agent</text>
        <text x="125" y="94" textAnchor="middle" fontFamily={mono} fontSize="6.6" fill={C.muted}>drafts output</text>
        <rect x="350" y="60" width="130" height="46" rx="8" fill={`${C.gate}16`} stroke={C.gate} strokeWidth="1.5" />
        <text x="415" y="80" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={C.gate}>critic_agent</text>
        <text x="415" y="94" textAnchor="middle" fontFamily={mono} fontSize="6.6" fill={C.muted}>scores · finds issues</text>
        {/* draft -> critic */}
        <path d="M190 76 L350 76" stroke={C.faint} strokeWidth="1.2" /><polygon points="350,76 343,72 343,80" fill={C.faint} />
        <text x="270" y="70" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>draft</text>
        {/* critic -> writer (revise) */}
        <path d="M350 92 L190 92" stroke={C.hole} strokeWidth="1.2" /><polygon points="190,92 197,88 197,96" fill={C.hole} />
        <text x="270" y="104" textAnchor="middle" fontFamily={mono} fontSize="7" fontWeight="700" fill={C.hole}>not approved → revise</text>
        {/* approve -> out */}
        <rect x="350" y="124" width="130" height="32" rx="7" fill={`${C.on}14`} stroke={C.on} strokeWidth="1.3" />
        <text x="415" y="144" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.on}>approved → output</text>
        <line x1="415" y1="106" x2="415" y2="124" stroke={C.on} strokeWidth="1.2" /><polygon points="415,124 411,117 419,117" fill={C.on} />
        <text x="270" y="24" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>a critic loop raises quality — bounded by a max revision count</text>
        <text x="270" y="166" textAnchor="middle" fontFamily={mono} fontSize="7.6" fill={C.faint}>stop on approval OR revision_count ≥ 3 — never loop forever (failure mode 2)</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   9.5 — n8n: Visual Workflow Automation
   ════════════════════════════════════════════════════════════ */

/* A visual n8n AI workflow: trigger → classify → branch → check → act. */
export function N8nWorkflow({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 200" width="100%" role="img" aria-label="An n8n AI support workflow">
        <text x="280" y="18" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>a customer-support workflow, built by dragging nodes — no Python</text>
        {/* trigger */}
        <rect x="20" y="80" width="84" height="36" rx="6" fill={`${C.gate}16`} stroke={C.gate} strokeWidth="1.3" />
        <text x="62" y="98" textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={C.gate}>webhook</text>
        <text x="62" y="109" textAnchor="middle" fontFamily={mono} fontSize="6.2" fill={C.muted}>trigger</text>
        {/* classify */}
        <rect x="124" y="80" width="90" height="36" rx="6" fill={`${INDIGO}16`} stroke={INDIGO} strokeWidth="1.3" />
        <text x="169" y="98" textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={INDIGO}>classify</text>
        <text x="169" y="109" textAnchor="middle" fontFamily={mono} fontSize="6.2" fill={C.muted}>LLM chain</text>
        {/* switch -> 3 bots */}
        <rect x="234" y="80" width="70" height="36" rx="6" fill={`${C.violet}16`} stroke={C.violet} strokeWidth="1.3" />
        <text x="269" y="101" textAnchor="middle" fontFamily={mono} fontSize="7.5" fontWeight="700" fill={C.violet}>switch</text>
        {["billing", "technical", "general"].map((b, i) => (
          <g key={`bot${i}`}>
            <rect x={324} y={50 + i * 36} width="86" height="28" rx="5" fill={`${C.on}12`} stroke={C.on} strokeWidth="1" />
            <text x={367} y={68 + i * 36} textAnchor="middle" fontFamily={mono} fontSize="6.8" fill={C.on}>{b} bot</text>
            <line x1="304" y1="98" x2="324" y2={64 + i * 36} stroke={C.faint} strokeWidth="0.9" />
          </g>
        ))}
        {/* merge -> quality check */}
        <rect x="430" y="80" width="50" height="36" rx="6" fill={`${INDIGO}16`} stroke={INDIGO} strokeWidth="1.3" />
        <text x="455" y="96" textAnchor="middle" fontFamily={mono} fontSize="6.6" fontWeight="700" fill={INDIGO}>quality</text>
        <text x="455" y="106" textAnchor="middle" fontFamily={mono} fontSize="6.6" fontWeight="700" fill={INDIGO}>check</text>
        {[50, 86, 122].map((y, i) => <line key={`mg${i}`} x1="410" y1={y + 14} x2="430" y2="98" stroke={C.faint} strokeWidth="0.9" />)}
        {/* send / escalate */}
        <rect x="496" y="62" width="56" height="26" rx="5" fill={`${C.on}14`} stroke={C.on} strokeWidth="1" />
        <text x="524" y="78" textAnchor="middle" fontFamily={mono} fontSize="6.4" fontWeight="700" fill={C.on}>send</text>
        <rect x="496" y="108" width="56" height="26" rx="5" fill={`${C.hole}14`} stroke={C.hole} strokeWidth="1" />
        <text x="524" y="124" textAnchor="middle" fontFamily={mono} fontSize="6.2" fontWeight="700" fill={C.hole}>escalate</text>
        <line x1="480" y1="92" x2="496" y2="75" stroke={C.on} strokeWidth="1" />
        <line x1="480" y1="104" x2="496" y2="121" stroke={C.hole} strokeWidth="1" />
        {/* main arrows */}
        <line x1="104" y1="98" x2="124" y2="98" stroke={C.faint} strokeWidth="1.1" />
        <line x1="214" y1="98" x2="234" y2="98" stroke={C.faint} strokeWidth="1.1" />
        <text x="280" y="192" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>400+ integrations, LLM nodes, webhook/schedule triggers — and an escalate-to-human branch</text>
      </svg>
    </DiagramFrame>
  );
}

/* When to choose n8n vs LangGraph. */
export function N8nVsLangGraph({ caption }: { caption?: string }) {
  const rows = [
    { k: "many SaaS integrations (CRM, email, Slack)", n8n: true },
    { k: "non-technical teammates edit the workflow", n8n: true },
    { k: "visual monitoring & debugging", n8n: true },
    { k: "fine-grained control of the reasoning loop", n8n: false },
    { k: "custom retries, parallelism, complex state", n8n: false },
    { k: "programmatic per-node testing", n8n: false },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 210" width="100%" role="img" aria-label="n8n versus LangGraph decision">
        <text x="200" y="22" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>if your need is…</text>
        <text x="455" y="22" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>reach for</text>
        {rows.map((r, i) => {
          const y = 36 + i * 27;
          const tool = r.n8n ? "n8n" : "LangGraph";
          const col = r.n8n ? C.gate : INDIGO;
          return (
            <g key={`vs${i}`}>
              <rect x="20" y={y} width="380" height="22" rx="4" fill={`${col}10`} stroke={col} strokeWidth="0.9" />
              <text x="30" y={y + 15} fontFamily={mono} fontSize="7.6" fill={C.text}>{r.k}</text>
              <rect x="410" y={y} width="130" height="22" rx="4" fill={`${col}1c`} stroke={col} strokeWidth="1.1" />
              <text x="475" y={y + 15} textAnchor="middle" fontFamily={mono} fontSize="7.8" fontWeight="700" fill={col}>{tool}</text>
            </g>
          );
        })}
        <text x="280" y="204" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>n8n = visual orchestration & integrations · LangGraph = code-first control over reasoning</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   9.6 — Memory Systems for Agents
   ════════════════════════════════════════════════════════════ */

/* The four tiers of agent memory. */
export function MemoryTiers({ caption }: { caption?: string }) {
  const tiers = [
    { t: "in-context", s: "working memory", d: "messages in the context window — fast, ~128K, gone at end", c: INDIGO },
    { t: "short-term", s: "session memory", d: "Redis/SQLite for a session — summaries, recent results", c: C.on },
    { t: "long-term", s: "persistent memory", d: "vector store — facts/docs, retrieved by semantic search", c: C.gate },
    { t: "procedural", s: "skill memory", d: "fine-tuned weights / cached few-shot exemplars", c: C.violet },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 180" width="100%" role="img" aria-label="Four types of agent memory">
        <text x="280" y="18" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>agents need memory at four timescales — like humans</text>
        {tiers.map((t, i) => {
          const x = 12 + i * 137;
          return (
            <g key={`mt${i}`}>
              <rect x={x} y="34" width="125" height="116" rx="8" fill={`${t.c}12`} stroke={t.c} strokeWidth="1.5" />
              <text x={x + 62} y="54" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={t.c}>{t.t}</text>
              <text x={x + 62} y="67" textAnchor="middle" fontFamily={mono} fontSize="6.6" fill={C.muted}>{t.s}</text>
              <foreignObject x={x + 6} y="74" width="113" height="72"><div style={{ fontFamily: mono, fontSize: "7px", color: C.text, textAlign: "center", lineHeight: 1.3 }}>{t.d}</div></foreignObject>
              {i < 3 && <text x={x + 129} y="94" fontFamily={mono} fontSize="9" fill={C.faint}>→</text>}
            </g>
          );
        })}
        <text x="280" y="170" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>shorter ← faster & cheaper · longer → persists, but needs retrieval</text>
      </svg>
    </DiagramFrame>
  );
}

/* Context compression: keep recent, summarise old. */
export function ContextCompression({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 170" width="100%" role="img" aria-label="Context window compression">
        <text x="280" y="18" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>when history nears the context limit, compress the old, keep the recent</text>
        {/* before */}
        <text x="120" y="40" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.hole}>before — overflowing</text>
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={`bf${i}`} x={30 + i * 15} y="50" width="12" height="22" rx="2" fill={`${C.off}26`} stroke={C.off} strokeWidth="0.7" />
        ))}
        <text x="120" y="86" textAnchor="middle" fontFamily={mono} fontSize="6.8" fill={C.muted}>~95K / 128K tokens</text>
        {/* arrow */}
        <line x1="225" y1="60" x2="265" y2="60" stroke={C.faint} strokeWidth="1.3" /><polygon points="265,60 257,55 257,65" fill={C.faint} />
        <text x="245" y="50" textAnchor="middle" fontFamily={mono} fontSize="6.6" fontWeight="700" fill={INDIGO}>LLM summarise</text>
        {/* after */}
        <text x="410" y="40" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.on}>after — compressed</text>
        <rect x="290" y="50" width="60" height="22" rx="3" fill={`${INDIGO}22`} stroke={INDIGO} strokeWidth="1.1" />
        <text x="320" y="64" textAnchor="middle" fontFamily={mono} fontSize="6.4" fontWeight="700" fill={INDIGO}>summary</text>
        {Array.from({ length: 5 }).map((_, i) => (
          <rect key={`af${i}`} x={360 + i * 15} y="50" width="12" height="22" rx="2" fill={`${C.on}26`} stroke={C.on} strokeWidth="0.7" />
        ))}
        <text x="410" y="86" textAnchor="middle" fontFamily={mono} fontSize="6.8" fill={C.muted}>summary + last N messages</text>
        <text x="280" y="120" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.text}>keep the system message + last ~10 turns; replace the rest with a bullet-point summary</text>
        <text x="280" y="146" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.faint}>directly fixes failure mode 3 (context overflow) — and cuts cost per turn</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   9.7 — Structured Outputs & Tool Schemas
   ════════════════════════════════════════════════════════════ */

/* Free-form text vs schema-validated JSON. */
export function StructuredVsFreeform({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 170" width="100%" role="img" aria-label="Free-form text versus structured output">
        {/* free-form */}
        <text x="140" y="22" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.hole}>free-form text</text>
        <rect x="30" y="32" width="220" height="64" rx="7" fill={`${C.hole}0e`} stroke={C.hole} strokeWidth="1.2" />
        <foreignObject x="40" y="40" width="200" height="50"><div style={{ fontFamily: mono, fontSize: "7.4px", color: C.text, lineHeight: 1.3 }}>&quot;I found 3 papers. The first, by Yao et al., is about… probably 90% relevant I think&quot;</div></foreignObject>
        <text x="140" y="112" textAnchor="middle" fontFamily={mono} fontSize="7.4" fill={C.muted}>can&apos;t parse · can&apos;t compose · can&apos;t validate</text>
        <text x="140" y="126" textAnchor="middle" fontFamily={mono} fontSize="7.4" fontWeight="700" fill={C.hole}>brittle ✗</text>
        {/* structured */}
        <text x="420" y="22" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.on}>schema-validated JSON</text>
        <rect x="310" y="32" width="220" height="64" rx="7" fill={`${C.on}0e`} stroke={C.on} strokeWidth="1.2" />
        <foreignObject x="320" y="40" width="200" height="52"><div style={{ fontFamily: mono, fontSize: "7px", color: C.text, lineHeight: 1.3, whiteSpace: "pre" }}>{`{ "title": "ReAct…",
  "url": "arxiv.org/…",
  "confidence": 0.9 }`}</div></foreignObject>
        <text x="420" y="112" textAnchor="middle" fontFamily={mono} fontSize="7.4" fill={C.muted}>typed · composable · machine-checked</text>
        <text x="420" y="126" textAnchor="middle" fontFamily={mono} fontSize="7.4" fontWeight="700" fill={C.on}>reliable ✓</text>
        <text x="280" y="152" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>agents that emit free-form text can&apos;t be chained — structured output is what makes them composable</text>
      </svg>
    </DiagramFrame>
  );
}

/* Schema-validation retry loop. */
export function SchemaValidationLoop({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 160" width="100%" role="img" aria-label="Schema validation retry loop">
        <rect x="24" y="60" width="96" height="40" rx="7" fill={`${INDIGO}1a`} stroke={INDIGO} strokeWidth="1.4" />
        <text x="72" y="84" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={INDIGO}>LLM</text>
        <rect x="170" y="60" width="120" height="40" rx="7" fill={`${C.gate}16`} stroke={C.gate} strokeWidth="1.4" />
        <text x="230" y="80" textAnchor="middle" fontFamily={mono} fontSize="8" fontWeight="700" fill={C.gate}>validate</text>
        <text x="230" y="92" textAnchor="middle" fontFamily={mono} fontSize="6.4" fill={C.muted}>Pydantic schema</text>
        <rect x="356" y="40" width="170" height="34" rx="7" fill={`${C.on}14`} stroke={C.on} strokeWidth="1.3" />
        <text x="441" y="61" textAnchor="middle" fontFamily={mono} fontSize="7.8" fontWeight="700" fill={C.on}>valid → typed object ✓</text>
        {/* arrows */}
        <line x1="120" y1="80" x2="170" y2="80" stroke={C.faint} strokeWidth="1.2" /><polygon points="170,80 163,76 163,84" fill={C.faint} />
        <line x1="290" y1="72" x2="356" y2="57" stroke={C.on} strokeWidth="1.2" /><polygon points="356,57 348,57 352,63" fill={C.on} />
        {/* retry */}
        <path d="M290 92 Q330 120 200 120 Q90 120 72 100" stroke={C.hole} strokeWidth="1.2" fill="none" strokeDasharray="4 3" />
        <polygon points="72,100 68,108 77,105" fill={C.hole} />
        <text x="230" y="134" textAnchor="middle" fontFamily={mono} fontSize="7.4" fontWeight="700" fill={C.hole}>invalid → return the error to the model, retry</text>
        <text x="280" y="22" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>validation happens in code — the model retries until the output matches the schema</text>
        <text x="280" y="152" textAnchor="middle" fontFamily={mono} fontSize="7.6" fill={C.faint}>frameworks (instructor, Pydantic AI) automate this retry — you just declare the type</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   9.8 — Agentic RAG
   ════════════════════════════════════════════════════════════ */

/* Basic RAG vs agentic RAG. */
export function BasicVsAgenticRAG({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 190" width="100%" role="img" aria-label="Basic RAG versus agentic RAG">
        {/* basic */}
        <text x="20" y="30" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.off}>basic RAG (Module 4) — one shot</text>
        {["query", "retrieve", "generate"].map((s, i) => (
          <g key={`br${i}`}>
            <rect x={30 + i * 130} y="42" width="104" height="30" rx="6" fill={`${C.off}14`} stroke={C.off} strokeWidth="1.1" />
            <text x={82 + i * 130} y="61" textAnchor="middle" fontFamily={mono} fontSize="7.6" fill={C.off}>{s}</text>
            {i < 2 && <line x1={134 + i * 130} y1="57" x2={160 + i * 130} y2="57" stroke={C.faint} strokeWidth="1.1" />}
          </g>
        ))}
        <text x="240" y="88" textAnchor="middle" fontFamily={mono} fontSize="7" fill={C.muted}>one retrieval, one generation — fails if the first retrieval is poor</text>
        {/* agentic */}
        <text x="20" y="118" fontFamily={mono} fontSize="9" fontWeight="700" fill={INDIGO}>agentic RAG — retrieve, check, reformulate, repeat</text>
        <rect x="30" y="130" width="92" height="30" rx="6" fill={`${INDIGO}16`} stroke={INDIGO} strokeWidth="1.2" />
        <text x="76" y="149" textAnchor="middle" fontFamily={mono} fontSize="7.4" fill={INDIGO}>retrieve</text>
        <polygon points="160,145 192,128 224,145 192,162" fill={`${C.gate}16`} stroke={C.gate} strokeWidth="1.2" />
        <text x="192" y="142" textAnchor="middle" fontFamily={mono} fontSize="6.4" fontWeight="700" fill={C.gate}>enough?</text>
        <text x="192" y="152" textAnchor="middle" fontFamily={mono} fontSize="6.4" fontWeight="700" fill={C.gate}>info</text>
        <rect x="262" y="130" width="92" height="30" rx="6" fill={`${C.on}16`} stroke={C.on} strokeWidth="1.2" />
        <text x="308" y="149" textAnchor="middle" fontFamily={mono} fontSize="7.4" fill={C.on}>generate</text>
        <line x1="122" y1="145" x2="160" y2="145" stroke={C.faint} strokeWidth="1.1" />
        <line x1="224" y1="145" x2="262" y2="145" stroke={C.on} strokeWidth="1.1" /><text x="243" y="140" textAnchor="middle" fontFamily={mono} fontSize="6" fontWeight="700" fill={C.on}>yes</text>
        {/* reformulate loop */}
        <path d="M192 162 Q192 184 110 184 Q60 184 60 160" stroke={C.hole} strokeWidth="1.2" fill="none" strokeDasharray="4 3" />
        <polygon points="60,160 56,168 65,165" fill={C.hole} />
        <text x="150" y="180" textAnchor="middle" fontFamily={mono} fontSize="6.6" fontWeight="700" fill={C.hole}>no → reformulate query</text>
        <text x="430" y="148" textAnchor="middle" fontFamily={mono} fontSize="7.4" fill={C.faint}>self-correcting</text>
        <text x="430" y="160" textAnchor="middle" fontFamily={mono} fontSize="7.4" fill={C.faint}>retrieval</text>
      </svg>
    </DiagramFrame>
  );
}

/* Contextual compression: retrieve many, keep only relevant excerpts. */
export function ContextualCompression({ caption }: { caption?: string }) {
  return (
    <DiagramFrame caption={caption} maxWidth={540}>
      <svg viewBox="0 0 540 160" width="100%" role="img" aria-label="Contextual compression of retrieved documents">
        <text x="270" y="20" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>retrieve broadly, then keep only the query-relevant excerpts</text>
        {/* 10 full docs */}
        <text x="90" y="44" textAnchor="middle" fontFamily={mono} fontSize="7.6" fontWeight="700" fill={C.off}>retrieve k=10 full docs</text>
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={`fd${i}`} x={30 + (i % 5) * 26} y={52 + Math.floor(i / 5) * 34} width="22" height="28" rx="2" fill={`${C.off}22`} stroke={C.off} strokeWidth="0.7" />
        ))}
        {/* compressor */}
        <rect x="210" y="60" width="110" height="40" rx="7" fill={`${INDIGO}16`} stroke={INDIGO} strokeWidth="1.4" />
        <text x="265" y="78" textAnchor="middle" fontFamily={mono} fontSize="7.6" fontWeight="700" fill={INDIGO}>LLM extractor</text>
        <text x="265" y="90" textAnchor="middle" fontFamily={mono} fontSize="6.2" fill={C.muted}>keep relevant only</text>
        <line x1="160" y1="80" x2="210" y2="80" stroke={C.faint} strokeWidth="1.2" /><polygon points="210,80 203,76 203,84" fill={C.faint} />
        {/* excerpts */}
        <text x="430" y="44" textAnchor="middle" fontFamily={mono} fontSize="7.6" fontWeight="700" fill={C.on}>relevant excerpts</text>
        {Array.from({ length: 3 }).map((_, i) => (
          <rect key={`ex${i}`} x={380 + i * 26} y="60" width="22" height="40" rx="2" fill={`${C.on}26`} stroke={C.on} strokeWidth="0.8" />
        ))}
        <line x1="320" y1="80" x2="372" y2="80" stroke={C.faint} strokeWidth="1.2" /><polygon points="372,80 365,76 365,84" fill={C.faint} />
        <text x="270" y="134" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.text}>fewer tokens into the generator → cheaper, less distraction, higher answer quality</text>
        <text x="270" y="150" textAnchor="middle" fontFamily={mono} fontSize="7.6" fontWeight="700" fill={C.faint}>cast a wide net on recall, then compress for precision</text>
      </svg>
    </DiagramFrame>
  );
}

/* ════════════════════════════════════════════════════════════
   9.9 — Agent Evaluation & Reliability
   ════════════════════════════════════════════════════════════ */

/* The five-level evaluation taxonomy. */
export function EvalTaxonomy({ caption }: { caption?: string }) {
  const levels = [
    { n: "1", t: "final answer", d: "is the answer right? (misses how it got there)", c: C.on },
    { n: "2", t: "tool calls", d: "right tools, right params? (trajectory match)", c: C.gate },
    { n: "3", t: "reasoning", d: "sound reasoning even if wrong? (LLM-judge)", c: INDIGO },
    { n: "4", t: "efficiency", d: "wasted steps? loops? (steps, cost per task)", c: C.violet },
    { n: "5", t: "robustness", d: "holds on adversarial/edge cases? (red-team)", c: C.hole },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 200" width="100%" role="img" aria-label="Five-level agent evaluation taxonomy">
        <text x="280" y="20" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>evaluating an agent ≫ checking the final answer — five levels, increasing depth</text>
        {levels.map((l, i) => {
          const y = 32 + i * 31;
          return (
            <g key={`et${i}`}>
              <rect x="30" y={y} width="34" height="26" rx="5" fill={`${l.c}1c`} stroke={l.c} strokeWidth="1.2" />
              <text x="47" y={y + 17} textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={l.c}>{l.n}</text>
              <text x="76" y={y + 12} fontFamily={mono} fontSize="8.5" fontWeight="700" fill={l.c}>{l.t}</text>
              <text x="76" y={y + 23} fontFamily={mono} fontSize="7.2" fill={C.muted}>{l.d}</text>
            </g>
          );
        })}
        <text x="280" y="194" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>the path matters, not just the destination — a right answer via flawed reasoning still fails</text>
      </svg>
    </DiagramFrame>
  );
}

/* LLM-as-judge scoring. */
export function LLMAsJudge({ caption }: { caption?: string }) {
  const dims = ["accuracy", "completeness", "reasoning", "efficiency", "safety"];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 160" width="100%" role="img" aria-label="LLM as judge evaluation">
        <rect x="24" y="40" width="110" height="40" rx="7" fill={`${C.off}14`} stroke={C.off} strokeWidth="1.2" />
        <text x="79" y="58" textAnchor="middle" fontFamily={mono} fontSize="7.8" fontWeight="700" fill={C.off}>agent output</text>
        <text x="79" y="70" textAnchor="middle" fontFamily={mono} fontSize="6.4" fill={C.muted}>+ task (+ reference)</text>
        <rect x="180" y="36" width="120" height="48" rx="7" fill={`${INDIGO}1a`} stroke={INDIGO} strokeWidth="1.5" />
        <text x="240" y="56" textAnchor="middle" fontFamily={mono} fontSize="8.5" fontWeight="700" fill={INDIGO}>judge LLM</text>
        <text x="240" y="69" textAnchor="middle" fontFamily={mono} fontSize="6.4" fill={C.muted}>strong model + rubric</text>
        <line x1="134" y1="60" x2="180" y2="60" stroke={C.faint} strokeWidth="1.2" /><polygon points="180,60 173,56 173,64" fill={C.faint} />
        <line x1="300" y1="60" x2="346" y2="60" stroke={C.faint} strokeWidth="1.2" /><polygon points="346,60 339,56 339,64" fill={C.faint} />
        {dims.map((d, i) => (
          <g key={`jd${i}`}>
            <rect x="350" y={30 + i * 19} width="180" height="16" rx="3" fill={`${C.on}12`} stroke={C.on} strokeWidth="0.8" />
            <text x="358" y={42 + i * 19} fontFamily={mono} fontSize="7" fill={C.text}>{d}</text>
            <text x="520" y={42 + i * 19} textAnchor="end" fontFamily={mono} fontSize="7" fontWeight="700" fill={C.on}>n/5</text>
          </g>
        ))}
        <text x="280" y="150" textAnchor="middle" fontFamily={mono} fontSize="8" fill={C.faint}>a strong model scores outputs on a rubric — scalable, but calibrate it against human labels</text>
      </svg>
    </DiagramFrame>
  );
}

/* Circuit breaker state machine. */
export function CircuitBreaker({ caption }: { caption?: string }) {
  const states = [
    { t: "CLOSED", d: "normal — calls pass through", c: C.on },
    { t: "OPEN", d: "blocking — fail fast after N errors", c: C.hole },
    { t: "HALF-OPEN", d: "testing — allow one trial call", c: C.gate },
  ];
  return (
    <DiagramFrame caption={caption} maxWidth={560}>
      <svg viewBox="0 0 560 160" width="100%" role="img" aria-label="Circuit breaker state machine">
        <text x="280" y="20" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={C.muted}>a circuit breaker stops hammering a failing service — protects cost & latency</text>
        {states.map((s, i) => {
          const x = 30 + i * 178;
          return (
            <g key={`cb${i}`}>
              <rect x={x} y="44" width="160" height="50" rx="9" fill={`${s.c}14`} stroke={s.c} strokeWidth="1.5" />
              <text x={x + 80} y="66" textAnchor="middle" fontFamily={mono} fontSize="9" fontWeight="700" fill={s.c}>{s.t}</text>
              <foreignObject x={x + 6} y="72" width="148" height="20"><div style={{ fontFamily: mono, fontSize: "7px", color: C.muted, textAlign: "center", lineHeight: 1.2 }}>{s.d}</div></foreignObject>
            </g>
          );
        })}
        <text x="119" y="112" textAnchor="middle" fontFamily={mono} fontSize="6.8" fontWeight="700" fill={C.hole}>N failures →</text>
        <line x1="190" y1="69" x2="208" y2="69" stroke={C.hole} strokeWidth="1.1" /><polygon points="208,69 201,65 201,73" fill={C.hole} />
        <text x="297" y="112" textAnchor="middle" fontFamily={mono} fontSize="6.8" fontWeight="700" fill={C.gate}>timeout →</text>
        <line x1="368" y1="69" x2="386" y2="69" stroke={C.gate} strokeWidth="1.1" /><polygon points="386,69 379,65 379,73" fill={C.gate} />
        <path d="M470 94 Q470 130 119 130 Q80 130 80 96" stroke={C.on} strokeWidth="1.1" fill="none" strokeDasharray="4 3" />
        <polygon points="80,96 76,104 85,101" fill={C.on} />
        <text x="280" y="126" textAnchor="middle" fontFamily={mono} fontSize="6.8" fontWeight="700" fill={C.on}>trial succeeds → CLOSED (recovered)</text>
        <text x="280" y="150" textAnchor="middle" fontFamily={mono} fontSize="7.6" fill={C.faint}>one of several reliability guards: + budget limits, retries with backoff, tracing</text>
      </svg>
    </DiagramFrame>
  );
}
