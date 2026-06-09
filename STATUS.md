# Project Status

**Last updated:** 2026-06-02

---

## What's Built

### Framework (Phase 0 complete)
- Next.js 16 App Router + TypeScript + Tailwind CSS + MDX pipeline
- Per-module color theming (10 distinct palettes, CSS variable injection)
- Collapsible sidebar navigation with localStorage persistence
- Lesson layout: header bar, prose pane, prev/next nav
- MDX → React component pipeline (`next-mdx-remote/rsc`)
- Static generation (`generateStaticParams`) — zero runtime server needed
- `QuizBlock` — reveal-answer self-check (no persistence yet)
- `TransistorSwitch` — stub placeholder (real interactive is next)

### Home Page
- Dark hero section with animated chip SVG illustration
- 10 module cards — each with a unique dark SVG illustration
- "How Every Module Works" section (Understand → Operate → Ship)
- Author section — Vivek Dhandapani bio, LinkedIn, expertise tags, education
- Footer

### Content
- `content/module-01/1-1-semiconductor-basics.mdx` — real prose, stub interactive, 3-question quiz
- `content/module-01/1-2-logic-gates.mdx` — stub lesson (satisfies next-lesson nav)

---

## What's Next

### Immediate (still Phase 0)
- [ ] Build the real `TransistorSwitch` interactive — Canvas + `requestAnimationFrame`, draggable gate voltage slider, animated inversion layer and drifting electrons. This is the Phase 0 blocker.
- [ ] Deploy to Vercel

### Phase 1
- [ ] Supabase auth (login / signup)
- [ ] Per-user lesson progress persistence

### Phase 2 — Module 1 interactive backlog
- [ ] CMOS NAND gate (toggle A/B, watch pull-up/pull-down networks)
- [ ] Seven logic gates with live truth tables
- [ ] Half adder → full adder → ripple-carry adder
- [ ] D flip-flop (clock-edge sampling)
- [ ] Number format explorer (FP32 / FP16 / BF16 / INT8 bit-flipper)
- [ ] MAC unit (multiply-accumulate animation)
- [ ] Systolic array (data flow across MAC cells)
- [ ] Port remaining Module 1 lesson content from PDF (Topics 1.3–1.7)
- [ ] Then march through Modules 2–10

---

## Key Files

| Purpose | Path |
|---|---|
| Route | `app/modules/[module]/[lesson]/page.tsx` |
| Lesson shell | `components/lesson/LessonLayout.tsx` |
| Sidebar | `components/lesson/LessonSidebar.tsx` |
| Quiz | `components/lesson/QuizBlock.tsx` |
| Interactives | `components/interactives/` |
| Module colors | `lib/colors.ts` |
| Content index | `lib/content.ts` |
| MDX renderer | `lib/mdx.ts` |
| Design tokens | `styles/tokens.css` |
| Home page | `app/page.tsx` |
| Card illustrations | `components/ui/ModuleIllustration.tsx` |
| Curriculum map | `docs/curriculum.md` |
