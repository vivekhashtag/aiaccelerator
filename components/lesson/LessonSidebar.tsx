"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { ModuleEntry } from "@/lib/content";

interface LessonSidebarProps {
  modules: ModuleEntry[];
  currentModule: string;
  currentLesson: string;
}

export default function LessonSidebar({
  modules,
  currentModule,
  currentLesson,
}: LessonSidebarProps) {
  const [open, setOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set([currentModule])
  );

  useEffect(() => {
    const stored = localStorage.getItem("sidebar-open");
    if (stored !== null) setOpen(stored === "true");
  }, []);

  function toggleSidebar() {
    setOpen((prev) => {
      localStorage.setItem("sidebar-open", String(!prev));
      return !prev;
    });
  }

  function toggleModule(mod: string) {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(mod)) next.delete(mod);
      else next.add(mod);
      return next;
    });
  }

  return (
    <>
      {/* Toggle button — always visible */}
      <button
        onClick={toggleSidebar}
        aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        className="fixed top-4 z-50 flex items-center justify-center w-8 h-8 rounded transition-colors"
        style={{
          left: open ? "calc(var(--sidebar-width) - 36px)" : "12px",
          backgroundColor: "var(--bg-muted)",
          border: "1px solid var(--border)",
          color: "var(--text-secondary)",
          transition: "left 250ms ease",
        }}
      >
        <span style={{ fontSize: "1rem", lineHeight: 1 }}>{open ? "←" : "≡"}</span>
      </button>

      {/* Sidebar panel */}
      <aside
        className="fixed top-0 left-0 h-full overflow-hidden flex-shrink-0 z-40"
        style={{
          width: open ? "var(--sidebar-width)" : "0px",
          transition: "width 250ms ease",
          backgroundColor: "var(--sidebar-bg)",
          borderRight: "1px solid var(--border)",
        }}
      >
        <div
          className="h-full overflow-y-auto"
          style={{
            width: "var(--sidebar-width)",
            opacity: open ? 1 : 0,
            transition: "opacity 200ms ease",
            pointerEvents: open ? "auto" : "none",
          }}
        >
          {/* Logo / course title */}
          <div
            className="px-5 py-4 sticky top-0"
            style={{
              backgroundColor: "var(--sidebar-bg)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <Link href="/" className="block">
              <div
                className="text-xs font-mono uppercase tracking-widest mb-0.5"
                style={{ color: "var(--text-muted)" }}
              >
                AI Inference &
              </div>
              <div
                className="font-bold text-sm leading-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Accelerator Engineering
              </div>
            </Link>
          </div>

          {/* Module tree */}
          <nav className="px-3 py-4 space-y-1">
            {modules.map((mod) => {
              const isCurrentMod = mod.module === currentModule;
              const isExpanded = expandedModules.has(mod.module);

              return (
                <div key={mod.module}>
                  <button
                    onClick={() => toggleModule(mod.module)}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded text-left text-xs font-semibold uppercase tracking-wider transition-colors"
                    style={{
                      color: isCurrentMod ? "var(--accent)" : "var(--text-muted)",
                      backgroundColor: isCurrentMod && isExpanded ? "var(--accent-subtle)" : "transparent",
                    }}
                  >
                    <span>
                      M{mod.module} · {mod.moduleTitle}
                    </span>
                    <span style={{ fontSize: "0.65rem" }}>{isExpanded ? "▲" : "▼"}</span>
                  </button>

                  {isExpanded && (
                    <div className="mt-0.5 ml-2 space-y-0.5">
                      {mod.lessons.map((lesson) => {
                        const isActive =
                          lesson.meta.module === currentModule &&
                          lesson.lessonPath === currentLesson;

                        return (
                          <Link
                            key={lesson.lessonPath}
                            href={`/modules/${lesson.meta.module}/${lesson.lessonPath}`}
                            className="flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors"
                            style={{
                              backgroundColor: isActive ? "var(--accent-subtle)" : "transparent",
                              color: isActive ? "var(--accent)" : "var(--text-secondary)",
                              borderLeft: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                              fontWeight: isActive ? 500 : 400,
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{
                                backgroundColor: isActive ? "var(--accent)" : "var(--border-strong)",
                              }}
                            />
                            <span className="truncate">{lesson.meta.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
