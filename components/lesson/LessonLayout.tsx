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

  const colorVars = {
    "--accent":       color.primary,
    "--accent-hover": color.dark,
    "--accent-light": color.light,
    "--accent-subtle":color.subtle,
    "--border":       color.border,
    "--border-strong":color.primary,
    "--bg-subtle":    color.bgSubtle,
    "--bg-muted":     color.bgMuted,
    "--sidebar-bg":   color.sidebarBg,
  } as CSSProperties;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#ffffff", ...colorVars }}>
      <LessonSidebar
        modules={modules}
        currentModule={meta.module}
        currentLesson={meta.slug}
      />

      <main
        style={{
          paddingLeft: "var(--sidebar-width)",
          minHeight: "100vh",
        }}
      >
        {/* Top bar */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-10 h-14"
          style={{
            backgroundColor: color.primary,
            borderBottom: `1px solid ${color.dark}`,
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Module {meta.module}
            </span>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>·</span>
            <span
              className="text-xs font-medium"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              {meta.moduleTitle}
            </span>
          </div>
          <div
            className="text-xs font-semibold px-2 py-1 rounded"
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "#fff",
            }}
          >
            Topic {meta.lesson}
          </div>
        </header>

        {/* Lesson body */}
        <article className="mx-auto px-10 pb-20" style={{ maxWidth: "800px" }}>
          {/* Lesson title block */}
          <div className="pt-10 pb-8" style={{ borderBottom: `1px solid ${color.border}` }}>
            {/* Color chip */}
            <div
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mb-4"
              style={{
                backgroundColor: color.subtle,
                color: color.dark,
                border: `1px solid ${color.border}`,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color.primary }}
              />
              {color.label}
            </div>

            <h1
              className="text-3xl font-bold leading-tight mb-3"
              style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}
            >
              {meta.title}
            </h1>
            {meta.summary && (
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {meta.summary}
              </p>
            )}
          </div>

          {/* MDX content */}
          <div className="prose prose-sm md:prose-base mt-8" style={{ maxWidth: "none" }}>
            {children}
          </div>

          <LessonNav prev={prev} next={next} />
        </article>
      </main>
    </div>
  );
}
