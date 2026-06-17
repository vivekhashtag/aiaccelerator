"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { SearchRecord } from "@/lib/search";

/* Precomputed lowercase fields so scoring stays cheap on every keystroke. */
interface IndexedRecord extends SearchRecord {
  _title: string;
  _head: string;
  _summary: string;
  _module: string;
  _text: string;
}

interface Result {
  rec: IndexedRecord;
  score: number;
  snippet: string;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* Rank lessons against the query. Hand-rolled (no dependency): weight matches
   by field — title ≫ headings > summary > module > body — and require every
   query token to match somewhere (AND), so results stay relevant. */
function runSearch(index: IndexedRecord[], query: string): Result[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);

  const out: Result[] = [];
  for (const rec of index) {
    let score = 0;
    let matchedAll = true;

    for (const t of tokens) {
      let s = 0;
      if (rec._title.includes(t)) s += rec._title.startsWith(t) ? 14 : 10;
      else if (rec._head.includes(t)) s += 5;
      else if (rec._summary.includes(t)) s += 4;
      else if (rec._module.includes(t)) s += 3;
      else if (rec._text.includes(t)) s += 1;
      if (s === 0) matchedAll = false;
      score += s;
    }
    if (!matchedAll || score === 0) continue;

    // whole-phrase bonus
    if (rec._title.includes(q)) score += 8;
    else if (rec._text.includes(q)) score += 2;

    out.push({ rec, score, snippet: makeSnippet(rec, tokens) });
  }

  out.sort((a, b) => b.score - a.score || a.rec.lesson.localeCompare(b.rec.lesson));
  return out.slice(0, 8);
}

/* A ~160-char window around the first body match, else the summary. */
function makeSnippet(rec: IndexedRecord, tokens: string[]): string {
  const body = rec.text;
  let pos = -1;
  for (const t of tokens) {
    const i = rec._text.indexOf(t);
    if (i !== -1 && (pos === -1 || i < pos)) pos = i;
  }
  if (pos === -1) return rec.summary;
  const start = Math.max(0, pos - 60);
  const end = Math.min(body.length, pos + 100);
  return (start > 0 ? "… " : "") + body.slice(start, end).trim() + (end < body.length ? " …" : "");
}

/* Wrap matched tokens in <mark> for the title/snippet. */
function Highlight({ text, tokens }: { text: string; tokens: string[] }) {
  if (!tokens.length) return <>{text}</>;
  const re = new RegExp(`(${tokens.map(escapeRegExp).join("|")})`, "ig");
  const parts = text.split(re);
  return (
    <>
      {parts.map((p, i) =>
        re.test(p) && tokens.includes(p.toLowerCase()) ? (
          <mark key={i} style={{ background: "var(--accent-subtle, #e0e7ff)", color: "inherit", borderRadius: 3, padding: "0 1px" }}>
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

export default function SearchOverlay() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [raw, setRaw] = useState<SearchRecord[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lazy-load the index the first time search is opened.
  const load = useCallback(async () => {
    if (raw || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/search-index");
      setRaw(await res.json());
    } catch {
      setRaw([]);
    } finally {
      setLoading(false);
    }
  }, [raw, loading]);

  const openSearch = useCallback(() => {
    setOpen(true);
    load();
  }, [load]);

  // Global shortcuts: ⌘K / Ctrl-K toggle, "/" opens, Esc closes.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        load();
      } else if (e.key === "Escape") {
        setOpen(false);
      } else if (
        e.key === "/" &&
        !open &&
        !/^(input|textarea|select)$/i.test((e.target as HTMLElement)?.tagName || "")
      ) {
        e.preventDefault();
        openSearch();
      }
    }
    function onOpenEvent() {
      openSearch();
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-search", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-search", onOpenEvent);
    };
  }, [open, load, openSearch]);

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 20);
  }, [open]);

  const index = useMemo<IndexedRecord[]>(() => {
    if (!raw) return [];
    return raw.map((r) => ({
      ...r,
      _title: r.title.toLowerCase(),
      _head: r.headings.join(" ").toLowerCase(),
      _summary: r.summary.toLowerCase(),
      _module: `m${r.module} ${r.moduleTitle} ${r.lesson}`.toLowerCase(),
      _text: r.text.toLowerCase(),
    }));
  }, [raw]);

  const results = useMemo(() => runSearch(index, query), [index, query]);
  const tokens = useMemo(
    () => query.trim().toLowerCase().split(/\s+/).filter(Boolean),
    [query]
  );

  useEffect(() => setActive(0), [query]);

  const go = useCallback(
    (r: Result) => {
      setOpen(false);
      setQuery("");
      router.push(`/modules/${r.rec.module}/${r.rec.lessonPath}`);
    },
    [router]
  );

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search lessons"
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "12vh 16px 16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 620,
          background: "var(--bg-base, #fff)",
          border: "1px solid var(--border, #e2e8f0)",
          borderRadius: 14,
          boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
          overflow: "hidden",
        }}
      >
        {/* Input row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "1px solid var(--border, #e2e8f0)" }}>
          <span aria-hidden style={{ color: "var(--text-muted)", fontSize: 16 }}>⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Search lessons — concepts, models, hardware…"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 15,
              color: "var(--text-primary)",
              fontFamily: "inherit",
            }}
          />
          <kbd style={kbdStyle}>esc</kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: "56vh", overflowY: "auto" }}>
          {loading && <div style={emptyStyle}>Loading index…</div>}

          {!loading && query.trim() === "" && (
            <div style={emptyStyle}>
              Type to search all {index.length || ""} lessons. Use{" "}
              <kbd style={kbdStyle}>↑</kbd> <kbd style={kbdStyle}>↓</kbd> to navigate,{" "}
              <kbd style={kbdStyle}>↵</kbd> to open.
            </div>
          )}

          {!loading && query.trim() !== "" && results.length === 0 && (
            <div style={emptyStyle}>No lessons match “{query}”.</div>
          )}

          {results.map((r, i) => (
            <button
              key={`${r.rec.module}-${r.rec.lessonPath}`}
              onClick={() => go(r)}
              onMouseEnter={() => setActive(i)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "10px 16px",
                border: "none",
                cursor: "pointer",
                background: i === active ? "var(--accent-subtle, #eef2ff)" : "transparent",
                borderLeft: `3px solid ${i === active ? "var(--accent, #6366f1)" : "transparent"}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                <span style={chipStyle}>M{r.rec.module} · {r.rec.lesson}</span>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)" }}>
                  <Highlight text={r.rec.title} tokens={tokens} />
                </span>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--text-muted)", lineHeight: 1.4 }}>
                <Highlight text={r.snippet} tokens={tokens} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const kbdStyle: React.CSSProperties = {
  fontSize: 10,
  fontFamily: "ui-monospace, monospace",
  color: "var(--text-muted)",
  border: "1px solid var(--border, #e2e8f0)",
  borderRadius: 4,
  padding: "1px 5px",
  background: "var(--bg-surface, #f8fafc)",
};

const chipStyle: React.CSSProperties = {
  fontSize: 10,
  fontFamily: "ui-monospace, monospace",
  fontWeight: 700,
  color: "var(--accent-light, #4f46e5)",
  background: "var(--accent-subtle, #eef2ff)",
  border: "1px solid var(--border, #e2e8f0)",
  borderRadius: 5,
  padding: "1px 6px",
  flexShrink: 0,
};

const emptyStyle: React.CSSProperties = {
  padding: "22px 16px",
  fontSize: 13,
  color: "var(--text-muted)",
  textAlign: "center",
};
