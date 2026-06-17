"use client";

/* A small "Search ⌘K" button. It doesn't own the overlay — it just fires a
   window event that the global <SearchOverlay/> listens for, so triggers can
   live anywhere (light sidebar, dark home nav) without prop drilling. */
export default function SearchTrigger({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("open-search"))}
      aria-label="Search lessons"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: dark ? "6px 12px" : "7px 10px",
        width: dark ? "auto" : "100%",
        borderRadius: dark ? 20 : 8,
        cursor: "pointer",
        fontSize: 13,
        fontFamily: "inherit",
        border: dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid var(--border)",
        background: dark ? "rgba(255,255,255,0.06)" : "var(--bg-surface)",
        color: dark ? "rgba(255,255,255,0.7)" : "var(--text-secondary)",
      }}
    >
      <span aria-hidden style={{ fontSize: 14 }}>⌕</span>
      <span style={{ flex: 1, textAlign: "left" }}>Search</span>
      <kbd
        style={{
          fontSize: 10,
          fontFamily: "ui-monospace, monospace",
          border: dark ? "1px solid rgba(255,255,255,0.2)" : "1px solid var(--border)",
          borderRadius: 4,
          padding: "1px 5px",
          opacity: 0.8,
        }}
      >
        ⌘K
      </kbd>
    </button>
  );
}
