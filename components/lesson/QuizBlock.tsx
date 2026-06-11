"use client";

import { useState } from "react";

interface Question {
  q: string;
  options: string[];
  answer: number;
  explanation?: string;
}

interface QuizBlockProps {
  questions?: Question[];
}

export default function QuizBlock({ questions = [] }: QuizBlockProps) {
  const [revealed, setRevealed] = useState<boolean[]>(
    () => new Array(questions.length).fill(false)
  );
  const [selected, setSelected] = useState<(number | null)[]>(
    () => new Array(questions.length).fill(null)
  );

  function choose(qi: number, oi: number) {
    if (revealed[qi]) return;
    setSelected((prev) => {
      const next = [...prev];
      next[qi] = oi;
      return next;
    });
  }

  function reveal(qi: number) {
    setRevealed((prev) => {
      const next = [...prev];
      next[qi] = true;
      return next;
    });
  }

  return (
    <div className="my-12 space-y-5">
      {/* Section heading */}
      <div className="flex items-center gap-3 mb-2">
        <span
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: "var(--accent-light)" }}
        >
          ✓ Self-Check
        </span>
        <span className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          {questions.length} question{questions.length !== 1 ? "s" : ""}
        </span>
      </div>

      {questions.map((q, qi) => {
        const isRevealed = revealed[qi];
        const userPick = selected[qi];

        return (
          <div
            key={qi}
            className="rounded-xl p-5"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-surface)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
            }}
          >
            <p
              className="font-semibold mb-4 flex gap-2.5"
              style={{ color: "var(--text-primary)", fontSize: "0.975rem" }}
            >
              <span className="font-mono" style={{ color: "var(--accent)" }}>
                {String(qi + 1).padStart(2, "0")}
              </span>
              <span>{q.q}</span>
            </p>

            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const isCorrect = oi === q.answer;
                const isChosen = oi === userPick;

                let bg = "var(--bg-base)";
                let borderColor = "var(--border)";
                let textColor = "var(--text-secondary)";

                if (isRevealed) {
                  if (isCorrect) {
                    bg = "var(--accent-subtle)";
                    borderColor = "var(--accent)";
                    textColor = "var(--accent-light)";
                  } else if (isChosen && !isCorrect) {
                    bg = "rgba(251,113,133,0.1)";
                    borderColor = "var(--color-danger)";
                    textColor = "var(--color-danger)";
                  }
                } else if (isChosen) {
                  borderColor = "var(--accent)";
                  bg = "var(--accent-subtle)";
                  textColor = "var(--accent-light)";
                }

                return (
                  <button
                    key={oi}
                    onClick={() => choose(qi, oi)}
                    className="w-full text-left rounded-lg px-4 py-2.5 text-sm transition-colors"
                    style={{
                      border: `1px solid ${borderColor}`,
                      backgroundColor: bg,
                      color: textColor,
                      cursor: isRevealed ? "default" : "pointer",
                    }}
                  >
                    <span
                      className="font-mono mr-2"
                      style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}
                    >
                      {String.fromCharCode(65 + oi)}.
                    </span>
                    {opt}
                    {isRevealed && isCorrect && (
                      <span className="ml-2 text-xs font-semibold" style={{ color: "var(--color-on)" }}>
                        ✓ correct
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {!isRevealed && (
              <button
                onClick={() => reveal(qi)}
                className="mt-4 text-sm font-semibold px-4 py-1.5 rounded-lg transition-transform"
                style={{
                  background: "linear-gradient(135deg, var(--accent), var(--accent-hover))",
                  color: "#04121f",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 0 18px var(--accent-glow)",
                }}
              >
                Reveal Answer
              </button>
            )}

            {isRevealed && q.explanation && (
              <div
                className="mt-4 text-sm rounded-lg px-4 py-3"
                style={{
                  backgroundColor: "var(--accent-subtle)",
                  borderLeft: "3px solid var(--accent)",
                  color: "var(--text-secondary)",
                }}
              >
                <span className="font-semibold" style={{ color: "var(--accent-light)" }}>
                  Why:{" "}
                </span>
                {q.explanation}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
