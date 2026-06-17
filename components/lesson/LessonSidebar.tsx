"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { ModuleEntry } from "@/lib/content";
import SearchTrigger from "@/components/search/SearchTrigger";

interface LessonSidebarProps {
  modules: ModuleEntry[];
  currentModule: string;
  currentLesson: string;
  accent?: string;
}

export default function LessonSidebar({
  modules,
  currentModule,
  currentLesson,
  accent = "#00c9a7",
}: LessonSidebarProps) {
  const [open, setOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set([currentModule])
  );

  useEffect(() => {
    const stored = localStorage.getItem("sidebar-open");
    if (stored !== null) setOpen(stored === "true");
    // First visit on a small screen: start collapsed so the reading
    // column isn't covered. Desktop keeps the default-open behaviour.
    else if (typeof window !== "undefined" && window.innerWidth <= 1024) {
      setOpen(false);
    }
  }, []);

  // Mark the body when collapsed so the main reading column reclaims the
  // full width (CSS: body.sidebar-collapsed .lesson-main { padding-left: 0 }).
  useEffect(() => {
    document.body.classList.toggle("sidebar-collapsed", !open);
  }, [open]);

  // Clean up the flag when leaving a lesson (e.g. back to the home page).
  useEffect(() => {
    return () => document.body.classList.remove("sidebar-collapsed");
  }, []);

  function toggleSidebar() {
    setOpen((prev) => {
      localStorage.setItem("sidebar-open", String(!prev));
      return !prev;
    });
  }

  // On phone/tablet the sidebar is an overlay — collapse it after the
  // learner picks a lesson or taps the backdrop (without overwriting the
  // persisted desktop preference).
  function closeOnMobile() {
    if (typeof window !== "undefined" && window.innerWidth <= 1024) {
      setOpen(false);
    }
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
      {/* Fixed hamburger — stays pinned top-left in every state and toggles
          the sidebar in place (open ↔ closed). */}
      <button
        onClick={toggleSidebar}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="fixed top-3 left-3 z-50 flex items-center justify-center w-9 h-9 rounded-md transition-colors"
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border-strong)",
          color: "var(--text-secondary)",
        }}
      >
        <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>≡</span>
      </button>

      {/* Tap-to-close backdrop — overlay only (hidden on desktop via CSS) */}
      {open && (
        <div
          className="sidebar-backdrop"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

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
          {/* Logo / course title — mirrors the home nav.
              Left-padded so it clears the fixed hamburger pinned at top-left. */}
          <div
            className="pl-14 pr-5 py-4 sticky top-0 z-10"
            style={{
              backgroundColor: "var(--sidebar-bg)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <Link href="/" className="flex items-center gap-2.5 group">
              <div
                style={{
                  width: 28,
                  height: 28,
                  flexShrink: 0,
                  background: "linear-gradient(135deg, #00C9A7, #3B82F6)",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg viewBox="0 0 16 16" width={14} height={14} fill="none">
                  <rect x="4" y="4" width="8" height="8" rx="1" stroke="white" strokeWidth="1.2" />
                  {[5, 8, 11].map((y) => (
                    <line key={`l${y}`} x1="2" y1={y} x2="4" y2={y} stroke="white" strokeWidth="1" />
                  ))}
                  {[5, 8, 11].map((y) => (
                    <line key={`r${y}`} x1="12" y1={y} x2="14" y2={y} stroke="white" strokeWidth="1" />
                  ))}
                </svg>
              </div>
              <div>
                <div
                  className="text-[10px] font-mono uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  AI Inference &amp;
                </div>
                <div
                  className="font-bold text-[13px] leading-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  Accelerator Engineering
                </div>
              </div>
            </Link>
          </div>

          {/* Search */}
          <div className="px-3 pt-3">
            <SearchTrigger tone="light" />
          </div>

          {/* Module tree */}
          <nav className="px-3 py-4 space-y-0.5">
            {modules.map((mod) => {
              const isCurrentMod = mod.module === currentModule;
              const isExpanded = expandedModules.has(mod.module);

              return (
                <div key={mod.module}>
                  <button
                    onClick={() => toggleModule(mod.module)}
                    className="w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-md text-left text-[11px] font-bold uppercase tracking-wider transition-colors"
                    style={{
                      color: isCurrentMod ? "var(--accent-light)" : "var(--text-muted)",
                      backgroundColor:
                        isCurrentMod && isExpanded ? "var(--accent-subtle)" : "transparent",
                    }}
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      <span
                        className="font-mono flex-shrink-0"
                        style={{ color: isCurrentMod ? "var(--accent)" : "var(--text-muted)" }}
                      >
                        M{mod.module}
                      </span>
                      <span className="truncate" style={{ opacity: 0.95 }}>
                        {mod.moduleTitle}
                      </span>
                    </span>
                    <span style={{ fontSize: "0.6rem", flexShrink: 0 }}>
                      {isExpanded ? "▲" : "▼"}
                    </span>
                  </button>

                  {isExpanded && (
                    <div
                      className="mt-1 mb-1 ml-3.5 pl-2 space-y-0.5"
                      style={{ borderLeft: "1px solid var(--border)" }}
                    >
                      {mod.lessons.map((lesson) => {
                        const isActive =
                          lesson.meta.module === currentModule &&
                          lesson.lessonPath === currentLesson;

                        return (
                          <Link
                            key={lesson.lessonPath}
                            href={`/modules/${lesson.meta.module}/${lesson.lessonPath}`}
                            onClick={closeOnMobile}
                            className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13px] transition-colors"
                            style={{
                              backgroundColor: isActive ? "var(--accent-subtle)" : "transparent",
                              color: isActive ? "var(--accent-light)" : "var(--text-secondary)",
                              fontWeight: isActive ? 600 : 400,
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{
                                backgroundColor: isActive ? "var(--accent)" : "var(--border-strong)",
                                boxShadow: isActive ? "0 0 8px var(--accent-glow)" : "none",
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
