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
    <div className="my-10 space-y-6">
      <div
        className="text-xs font-mono tracking-widest uppercase pb-2"
        style={{
          color: "var(--accent)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        Self-Check
      </div>

      {questions.map((q, qi) => {
        const isRevealed = revealed[qi];
        const userPick = selected[qi];

        return (
          <div
            key={qi}
            className="rounded-lg p-5"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-subtle)",
            }}
          >
            <p
              className="font-medium mb-4"
              style={{ color: "var(--text-primary)", fontSize: "0.975rem" }}
            >
              {qi + 1}. {q.q}
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
                    textColor = "var(--accent-hover)";
                  } else if (isChosen && !isCorrect) {
                    bg = "#fff5f5";
                    borderColor = "#f87171";
                    textColor = "#b91c1c";
                  }
                } else if (isChosen) {
                  borderColor = "var(--accent-light)";
                  bg = "var(--accent-subtle)";
                  textColor = "var(--accent)";
                }

                return (
                  <button
                    key={oi}
                    onClick={() => choose(qi, oi)}
                    className="w-full text-left rounded px-4 py-2.5 text-sm transition-colors"
                    style={{
                      border: `1px solid ${borderColor}`,
                      backgroundColor: bg,
                      color: textColor,
                      cursor: isRevealed ? "default" : "pointer",
                      fontFamily: "var(--font-sans)",
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
                      <span className="ml-2 text-xs" style={{ color: "var(--color-on)" }}>
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
                className="mt-4 text-sm font-medium px-4 py-1.5 rounded transition-colors"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--accent-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--accent)")
                }
              >
                Reveal Answer
              </button>
            )}

            {isRevealed && q.explanation && (
              <div
                className="mt-4 text-sm rounded px-4 py-3"
                style={{
                  backgroundColor: "var(--bg-muted)",
                  borderLeft: "3px solid var(--accent)",
                  color: "var(--text-secondary)",
                }}
              >
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  Explanation:{" "}
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
