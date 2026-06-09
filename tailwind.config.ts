import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-light": "var(--accent-light)",
        "accent-subtle": "var(--accent-subtle)",
        electron: "var(--color-electron)",
        "sig-on": "var(--color-on)",
        "sig-off": "var(--color-off)",
        "sig-gate": "var(--color-gate)",
        "bg-subtle": "var(--bg-subtle)",
        "bg-muted": "var(--bg-muted)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        "sidebar-bg": "var(--sidebar-bg)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "var(--text-primary)",
            maxWidth: "none",
            fontFamily: "var(--font-sans)",
            a: {
              color: "var(--accent)",
              textDecoration: "none",
              fontWeight: "500",
              "&:hover": { color: "var(--accent-hover)" },
            },
            strong: { color: "var(--text-primary)", fontWeight: "700" },
            "h2, h3, h4": {
              color: "var(--text-primary)",
              fontFamily: "var(--font-sans)",
              fontWeight: "700",
            },
            code: {
              backgroundColor: "var(--bg-muted)",
              color: "var(--accent-hover)",
              borderRadius: "var(--radius-sm)",
              padding: "0.15em 0.4em",
              fontFamily: "var(--font-sans)",
              fontSize: "0.875em",
              fontWeight: "600",
              "&::before": { content: '""' },
              "&::after": { content: '""' },
            },
            pre: {
              backgroundColor: "var(--bg-muted)",
              borderLeft: "3px solid var(--accent)",
              borderRadius: "var(--radius-md)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem",
              color: "var(--text-primary)",
            },
            "pre code": {
              backgroundColor: "transparent",
              color: "var(--text-primary)",
              padding: "0",
              fontWeight: "400",
            },
            blockquote: {
              borderLeftColor: "var(--accent)",
              borderLeftWidth: "3px",
              color: "var(--text-secondary)",
              fontStyle: "normal",
              fontWeight: "500",
            },
            hr: { borderColor: "var(--border)" },
            "thead th": { color: "var(--text-primary)", fontWeight: "600" },
            "tbody tr": { borderBottomColor: "var(--border)" },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
