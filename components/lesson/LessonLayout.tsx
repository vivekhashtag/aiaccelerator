import type { ReactNode, CSSProperties } from "react";
import type { LessonMeta, ModuleEntry, LessonEntry } from "@/lib/content";
import { getModuleColor } from "@/lib/colors";
import LessonSidebar from "./LessonSidebar";
import LessonNav from "./LessonNav";

interface LessonLayoutProps {
  meta: LessonMeta;
  modules: ModuleEntry[];
  prev: LessonEntry | null;
  next: LessonEntry | null;
  children: ReactNode;
}

export default function LessonLayout({
  meta,
  modules,
  prev,
  next,
  children,
}: LessonLayoutProps) {
  const color = getModuleColor(meta.module);

  // Per-module accent, painted on the light base. On white, emphasis text
  // uses the DARKER accent shade (color.dark) so it stays readable.
  const colorVars = {
    "--accent":        color.primary,
    "--accent-hover":  color.dark,
    "--accent-light":  color.dark,
    "--accent-subtle": `${color.primary}1f`, // ~12% alpha
    "--accent-glow":   `${color.primary}40`, // ~25% alpha
    "--border-strong": "rgba(15,23,42,0.18)",
  } as CSSProperties;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-base)", ...colorVars }}
    >
      <LessonSidebar
        modules={modules}
        currentModule={meta.module}
        currentLesson={meta.slug}
        accent={color.primary}
      />

      <main
        className="lesson-main"
        style={{
          minHeight: "100vh",
        }}
      >
        {/* Top bar — translucent navy, matches the home nav */}
        <header
          className="lesson-header sticky top-0 z-30 flex items-center justify-between h-14"
          style={{
            background: "rgba(255,255,255,0.78)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: "var(--accent)",
                boxShadow: "0 0 10px var(--accent-glow)",
              }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--accent)" }}
            >
              Module {meta.module}
            </span>
            <span className="hide-sm" style={{ color: "var(--text-muted)" }}>·</span>
            <span
              className="hide-sm text-xs font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              {meta.moduleTitle}
            </span>
          </div>
          <div
            className="text-xs font-semibold px-2.5 py-1 rounded font-mono"
            style={{
              backgroundColor: "var(--accent-subtle)",
              border: "1px solid var(--border)",
              color: "var(--accent-light)",
            }}
          >
            Topic {meta.lesson}
          </div>
        </header>

        {/* Lesson body */}
        <article className="lesson-article mx-auto pb-24" style={{ maxWidth: "760px" }}>
          {/* Lesson title block */}
          <div className="pt-14 pb-9" style={{ borderBottom: "1px solid var(--border)" }}>
            {/* Accent eyebrow */}
            <div
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
              style={{
                backgroundColor: "var(--accent-subtle)",
                color: "var(--accent-light)",
                border: "1px solid var(--border)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: "var(--accent)",
                  boxShadow: "0 0 8px var(--accent-glow)",
                }}
              />
              Topic {meta.lesson}
            </div>

            <h1
              className="lesson-title text-4xl font-extrabold leading-[1.12] mb-4"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
            >
              {meta.title}
            </h1>

            {meta.summary && (
              <p
                className="text-lg leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {meta.summary}
              </p>
            )}

            {meta.prerequisites && meta.prerequisites.length > 0 && (
              <div className="flex items-center gap-2 mt-6 flex-wrap">
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  Prerequisites
                </span>
                {meta.prerequisites.map((p) => (
                  <span
                    key={p}
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: "var(--bg-surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* MDX content */}
          <div
            className="prose prose-base mt-10"
            style={{ maxWidth: "none" }}
          >
            {children}
          </div>

          <LessonNav prev={prev} next={next} />
        </article>
      </main>
    </div>
  );
}
