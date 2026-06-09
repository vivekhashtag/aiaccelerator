import Link from "next/link";
import type { LessonEntry } from "@/lib/content";

interface LessonNavProps {
  prev: LessonEntry | null;
  next: LessonEntry | null;
}

export default function LessonNav({ prev, next }: LessonNavProps) {
  return (
    <nav
      className="mt-16 pt-6 flex items-center justify-between"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      {prev ? (
        <Link
          href={`/modules/${prev.meta.module}/${prev.lessonPath}`}
          className="group flex flex-col gap-0.5 max-w-xs"
        >
          <span
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            ← Previous
          </span>
          <span
            className="text-sm font-medium group-hover:underline"
            style={{ color: "var(--accent)" }}
          >
            {prev.meta.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/modules/${next.meta.module}/${next.lessonPath}`}
          className="group flex flex-col gap-0.5 items-end max-w-xs"
        >
          <span
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            Next →
          </span>
          <span
            className="text-sm font-medium group-hover:underline"
            style={{ color: "var(--accent)" }}
          >
            {next.meta.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
