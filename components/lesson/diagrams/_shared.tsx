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
export const C = {
  electron: "#0e9c93", // carriers / inversion layer / N-type
  gate: "#d97706", // gate / control
  on: "#059669", // conducting / HIGH
  off: "#64748b", // off / depleted
  teal: "#0d9488", // module-1 accent
  blue: "#2563eb", // module-2 accent / "why it matters"
  lime: "#65a30d", // module-6 accent (optimization) — dark lime for white cards
  sky: "#0284c7", // module-7 accent (serving / runtimes) — dark sky for white cards
  orange: "#ea580c", // module-8 accent (FPGA / edge hardware) — dark orange for white cards
  indigo: "#4f46e5", // module-9 accent (agentic AI / orchestration) — dark indigo for white cards
  emerald: "#059669", // module-10 accent (end-to-end systems / capstone) — dark emerald for white cards
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

/* Global legibility zoom (2026-06-17): diagrams used to cap at maxWidth ~540–560
   inside a 760px article column, so SVG text rendered small. Since an SVG with a
   viewBox scales text proportionally with the figure, rendering each diagram a bit
   wider enlarges every label uniformly — preserving layout and the title/label
   hierarchy with no overflow risk. Bump SCALE to grow all diagrams at once. */
const DIAGRAM_SCALE = 1.16;

/* Shared frame: dark card + centered SVG + caption (mirrors <Figure>). */
export function DiagramFrame({
  children,
  caption,
  maxWidth = 560,
}: {
  children: ReactNode;
  caption?: string;
  maxWidth?: number;
}) {
  // Scale up for legibility, but never past the usable article column width.
  const scaledMaxWidth = Math.min(Math.round(maxWidth * DIAGRAM_SCALE), 700);
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
        <div style={{ width: "100%", maxWidth: scaledMaxWidth }}>{children}</div>
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

export const mono = "ui-monospace, 'SF Mono', monospace";
