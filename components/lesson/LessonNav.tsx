import Link from "next/link";
import type { LessonEntry } from "@/lib/content";

interface LessonNavProps {
  prev: LessonEntry | null;
  next: LessonEntry | null;
}

function NavCard({
  lesson,
  direction,
}: {
  lesson: LessonEntry;
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";
  return (
    <Link
      href={`/modules/${lesson.meta.module}/${lesson.lessonPath}`}
      className="lesson-nav-card group flex flex-col gap-1 rounded-xl px-5 py-4 transition-all"
      style={{
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border)",
        maxWidth: "48%",
        textAlign: isNext ? "right" : "left",
        alignItems: isNext ? "flex-end" : "flex-start",
      }}
    >
      <span
        className="text-[11px] font-mono uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        {isNext ? "Next →" : "← Previous"}
      </span>
      <span
        className="text-sm font-semibold transition-colors"
        style={{ color: "var(--text-primary)" }}
      >
        {lesson.meta.title}
      </span>
    </Link>
  );
}

export default function LessonNav({ prev, next }: LessonNavProps) {
  return (
    <nav
      className="lesson-nav mt-16 pt-8 flex items-stretch justify-between gap-4"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      {prev ? <NavCard lesson={prev} direction="prev" /> : <div />}
      {next ? <NavCard lesson={next} direction="next" /> : <div />}
    </nav>
  );
}
