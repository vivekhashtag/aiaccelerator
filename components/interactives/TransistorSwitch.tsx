"use client";

export default function TransistorSwitch() {
  return (
    <div
      className="my-8 rounded-lg border-2 flex flex-col items-center justify-center gap-3 py-12 px-6 text-center"
      style={{
        borderColor: "var(--accent)",
        backgroundColor: "var(--accent-subtle)",
        minHeight: "240px",
      }}
    >
      <div
        className="text-xs font-mono tracking-widest uppercase mb-1"
        style={{ color: "var(--accent-light)" }}
      >
        Interactive
      </div>
      <div
        className="text-2xl font-bold"
        style={{ color: "var(--accent)", fontFamily: "var(--font-sans)" }}
      >
        MOSFET Switch
      </div>
      <p style={{ color: "var(--text-secondary)", maxWidth: "400px", fontSize: "0.95rem" }}>
        Drag the gate voltage slider and watch electrons form an inversion layer
        in the channel — this interactive is coming next.
      </p>
      <div
        className="mt-2 text-xs font-mono px-3 py-1 rounded"
        style={{
          backgroundColor: "var(--bg-muted)",
          color: "var(--text-muted)",
          border: "1px solid var(--border)",
        }}
      >
        &lt;TransistorSwitch /&gt;
      </div>
    </div>
  );
}
