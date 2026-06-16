import type { ReactNode } from "react";

/* ────────────────────────────────────────────────────────────
   Presentational MDX blocks for attractive, scannable lessons.
   Server components (no hooks). Registered in lib/mdx.ts.
   Semantic colors are FIXED (not per-module) so a "why it
   matters" box looks the same in Module 1 and Module 10.
   ──────────────────────────────────────────────────────────── */

type CalloutType = "insight" | "why" | "analogy" | "warning" | "pitfall" | "key";

const CALLOUT_STYLES: Record<
  CalloutType,
  { color: string; label: string; icon: string }
> = {
  insight: { color: "#00C9A7", label: "Insight", icon: "◆" },
  why:     { color: "#3B82F6", label: "Why it matters", icon: "→" },
  analogy: { color: "#8B5CF6", label: "Analogy", icon: "≈" },
  warning: { color: "#F59E0B", label: "Watch out", icon: "▲" },
  pitfall: { color: "#F43F5E", label: "Common pitfall", icon: "✕" },
  key:     { color: "#00C9A7", label: "Key takeaway", icon: "★" },
};

export function Callout({
  type = "insight",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const s = CALLOUT_STYLES[type] ?? CALLOUT_STYLES.insight;
  return (
    <div
      className="not-prose my-7 rounded-xl px-5 py-4"
      style={{
        background: `${s.color}14`,
        border: `1px solid ${s.color}40`,
        borderLeft: `3px solid ${s.color}`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold flex-shrink-0"
          style={{ background: `${s.color}26`, color: s.color }}
        >
          {s.icon}
        </span>
        <span
          className="text-[11px] font-bold uppercase tracking-widest"
          style={{ color: s.color }}
        >
          {title ?? s.label}
        </span>
      </div>
      <div
        className="text-[15px] leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-2 [&_strong]:text-[var(--text-primary)] [&_code]:font-mono"
        style={{ color: "var(--text-secondary)" }}
      >
        {children}
      </div>
    </div>
  );
}

export function Formula({
  children,
  label,
  caption,
}: {
  children: ReactNode;
  label?: string;
  caption?: string;
}) {
  return (
    <figure className="not-prose my-8">
      <div
        className="rounded-xl px-6 py-5 text-center relative overflow-hidden"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 0%, var(--accent-subtle) 0%, transparent 60%), var(--bg-surface)",
          border: "1px solid var(--border-strong)",
          boxShadow: "0 8px 28px rgba(0,0,0,0.35)",
        }}
      >
        {label && (
          <div
            className="text-[10px] font-mono uppercase tracking-widest mb-2"
            style={{ color: "var(--accent-light)" }}
          >
            {label}
          </div>
        )}
        <div
          className="font-mono"
          style={{
            color: "var(--text-primary)",
            fontSize: "1.15rem",
            letterSpacing: "0.01em",
          }}
        >
          {children}
        </div>
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

export function Figure({
  children,
  caption,
}: {
  children: ReactNode;
  caption?: string;
}) {
  return (
    <figure className="not-prose my-8">
      <div
        className="rounded-xl p-5 overflow-x-auto"
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        }}
      >
        <pre
          className="font-mono text-[13px] leading-relaxed m-0"
          style={{ color: "var(--text-secondary)", background: "transparent" }}
        >
          {children}
        </pre>
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

/* Styled code block — dark "editor" chrome on the light reading page.
   Authored as Markdown fenced blocks (```lang) which MDX treats as
   literal, so { < } inside need no escaping. Rendered via the `pre`
   override (see Pre + lib/mdx.ts). No syntax highlighter dependency —
   clean light-on-dark monospace with a language label. */
export function CodeBlock({
  lang,
  title,
  children,
}: {
  lang?: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="not-prose my-7 rounded-xl overflow-hidden"
      style={{
        border: "1px solid var(--border-strong)",
        boxShadow: "0 10px 30px rgba(2,6,23,0.30)",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: "#0b1120", borderBottom: "1px solid rgba(148,163,184,0.16)" }}
      >
        <span
          className="text-[10px] font-mono uppercase tracking-widest"
          style={{ color: "var(--accent-light)" }}
        >
          {title ?? lang ?? "code"}
        </span>
        <span className="flex gap-1.5" aria-hidden>
          {["#f87171", "#fbbf24", "#34d399"].map((c) => (
            <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
          ))}
        </span>
      </div>
      <pre
        className="font-mono text-[12.5px] leading-relaxed m-0 px-4 py-4 overflow-x-auto"
        style={{ background: "#0f172a", color: "#e2e8f0" }}
      >
        <code style={{ background: "transparent", color: "inherit", padding: 0 }}>{children}</code>
      </pre>
    </div>
  );
}

/* `pre` override: MDX renders a fenced block as <pre><code class="language-x">…</code></pre>.
   Extract the language + code string from the child <code> and render CodeBlock. */
export function Pre({ children }: { children?: ReactNode }) {
  const codeEl = children as { props?: { className?: string; children?: ReactNode } } | undefined;
  const className = codeEl?.props?.className ?? "";
  const lang = /language-(\w+)/.exec(className)?.[1];
  const code = codeEl?.props?.children ?? children;
  return <CodeBlock lang={lang}>{code}</CodeBlock>;
}

export function StatGrid({
  items = [],
  caption,
}: {
  items?: { value: string; label: string; sub?: string }[];
  caption?: string;
}) {
  return (
    <div className="not-prose my-8">
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))" }}
      >
        {items.map((it, i) => (
          <div
            key={i}
            className="rounded-xl px-4 py-4 text-center"
            style={{
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="font-extrabold leading-none mb-1.5"
              style={{ color: "var(--accent-light)", fontSize: "1.5rem" }}
            >
              {it.value}
            </div>
            <div
              className="text-[12px] font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {it.label}
            </div>
            {it.sub && (
              <div className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                {it.sub}
              </div>
            )}
          </div>
        ))}
      </div>
      {caption && (
        <p className="text-center text-[13px] mt-3" style={{ color: "var(--text-muted)" }}>
          {caption}
        </p>
      )}
    </div>
  );
}
