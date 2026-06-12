# Project Status

**Last updated:** 2026-06-12

---

## ✅ Module 2 built (2026-06-12): Computer Architecture & Accelerators

Module 2 authored in the same image-rich pattern as Module 1 — prose + callouts + formulas +
hand-drawn SVG diagrams + stat-grids + recap, no interactives, no quizzes. **6 lessons** mapping
1:1 to the 6 topics in `Module 2 lesson.pdf`, with a prerequisite chain 1.7 → 2.1 → … → 2.6.

- `2-1-cpu-architecture` — Von Neumann, fetch-decode-execute, RISC/CISC, 5-stage pipeline, hazards + forwarding, OoO, superscalar, SIMD, the CPU performance equation.
- `2-2-gpu-architecture` — throughput vs latency, thread/warp/block/grid, SIMT + divergence, the SM, warp latency-hiding, Tensor Cores, the batch=1 memory-bandwidth ceiling, coalescing, NVLink.
- `2-3-fpga-architecture` — programming hardware, LUTs, FFs, DSP MAC blocks, BRAM, routing, Zynq ARM+PL SoC, FPGA vs ASIC vs GPU.
- `2-4-memory-hierarchy` — the memory wall, register→L1→L2→L3→DRAM→SSD pyramid, cache lines/locality, miss types, GPU vs CPU memory, NUMA, inference bandwidth math.
- `2-5-roofline-model` — arithmetic intensity, the roofline plot, ridge point, where AI workloads land, why batch=1 is memory-bound.
- `2-6-parallelism` — Dennard's end, Amdahl/Gustafson, data/tensor/pipeline/expert parallelism, micro-batching, continuous batching, disaggregation, speculative decoding.

**+22 new SVG diagrams** added to `Diagrams.tsx` (registered in `lib/mdx.ts`); palette gained
`blue`/`violet` accents for Module 2. **Build verified:** `next build` green, all 13 lesson pages
(7 + 6) prerender; the home-page Module 2 card auto-flips to "6 lessons" (content is
directory-discovered). **Not yet pushed to GitHub / deployed** — local only so far.

> Module 2 labs (2-A Roofline plotter, 2-B pipeline sim, 2-C GPU-vs-CPU benchmark, 2-D bandwidth
> benchmark) are deferred with the Module 1 labs as a separate hands-on track.

---

## ⟳ Direction change (2026-06-11): image-rich lessons, not interactives

After reviewing the live lessons, we pivoted Module 1 away from canvas/animation interactives
toward **hand-authored SVG diagrams** — the right figure for every concept, drawn in code so they
always render, never 404, and can't show a wrong image. What changed:

- **Removed** the `TransistorSwitch` interactive (and its file) — replaced by a static MOSFET
  OFF/ON cross-section diagram.
- **Removed all self-check quizzes** (`QuizBlock`) from lessons 1.1–1.7.
- **Added 29 SVG diagrams** in `components/lesson/Diagrams.tsx` (registered in `lib/mdx.ts`),
  replacing every ASCII-art `<Figure>` and adding new concept figures across all 7 topics.
- **Backfilled curriculum-parity sub-topics** (prose + diagrams): BJT (1.1);
  carry-lookahead, DEMUX, encoder, comparator (1.3); JK/T flip-flops, counters (1.4).
- Each lesson is now: prose + callouts + formulas + **SVG diagrams** + stat-grids + recap.
- **Shipped:** pushed to GitHub (`vivekhashtag/aiaccelerator`) and **live on Vercel** — auto-deploys on every push.

---

## What's Built

### Framework (Phase 0 complete)
- Next.js 16 App Router + TypeScript + Tailwind CSS + MDX pipeline
- Static generation (`generateStaticParams`) — zero runtime server needed
- Collapsible sidebar navigation with localStorage persistence
- MDX → React component pipeline (`next-mdx-remote/rsc`)
- `Diagrams.tsx` — 29 hand-drawn SVG figures, the course "images" (registered in `lib/mdx.ts`)
- `QuizBlock` — exists but **unregistered/unused** (quizzes removed 2026-06-11; kept for a later phase)

### Dark "engineering instrument" design system (2026-06-09 redesign)
- Lesson surfaces now match the home page's dark navy identity (was a light
  pastel docs theme — jarring after the dark hero). Driven entirely by CSS
  variables in `styles/tokens.css`, so the home page (hardcoded hex) is untouched.
- Per-module accent color is kept, but painted on the *shared* dark base —
  Module 1 = teal, Module 2 = blue, etc. (`LessonLayout` injects `--accent*`).
- Redesigned: `LessonLayout` (gradient title, accent eyebrow, translucent navy
  top bar), `LessonSidebar` (deep-navy, home-style logo), `LessonNav` (prev/next
  cards), `QuizBlock` (dark cards + accent glow), `TransistorSwitch` stub
  (instrument panel w/ MOSFET preview), prose typography tuned for dark long-read.
- New MDX content blocks: `Callout` (insight/why/analogy/warning/pitfall/key),
  `Formula`, `Figure`, `StatGrid` — in `components/lesson/LessonBlocks.tsx`,
  registered in `lib/mdx.ts`. These are the levers for "attractive" lessons.

### Content — Module 1 COMPLETE & LIVE (all 7 topics, from `Module 01.pdf`)
All written in the dark design with callouts / formulas / **SVG diagrams** / stat-grids.
Prerequisite chain links 1.1 → 1.7. Curriculum-topic parity reached; no interactives, no quizzes.
- `1-1-semiconductor-basics.mdx` — semiconductors → doping → PN junction → MOSFET (NMOS/PMOS) → CMOS → NAND gate → Moore's Law
- `1-2-logic-gates.mdx` — seven gates, Boolean algebra, De Morgan, NAND universality, K-maps
- `1-3-combinational-logic.mdx` — half/full adder, ripple-carry, MUX/LUT, decoder, critical path
- `1-4-sequential-logic.mdx` — SR latch, D flip-flop, registers, shift registers, FSMs
- `1-5-timing-and-power.mdx` — clock, setup/hold, f_max, P = α·C·V²·f, leakage, clock/power gating, DVFS
- `1-6-number-systems.mdx` — binary/hex, two's complement, fixed-point, IEEE 754, BF16/FP16/INT8
- `1-7-mac-operations.mdx` — MAC, dot/FC/conv/attention counts, MAC unit, pipelining, systolic arrays, Tensor Cores, TOPS

### Home Page
- Dark hero section with animated chip SVG illustration
- 10 module cards — each with a unique dark SVG illustration
- "How Every Module Works" section (Understand → Operate → Ship)
- Author section — Vivek Dhandapani bio, LinkedIn, expertise tags, education
- Footer

---

## What's Next

### Immediate (still Phase 0)
- [x] ~~Build the real `TransistorSwitch` interactive~~ — **dropped 2026-06-11** in favour of a static SVG cross-section (see direction change above).
- [x] Convert all 7 Module 1 lessons to hand-drawn SVG diagrams ✓ 2026-06-11
- [x] Backfill curriculum-parity sub-topics ✓ 2026-06-11 — **BJT** (1.1); **carry-lookahead, DEMUX, encoder, comparator** (1.3); **JK/T flip-flops, counters** (1.4). Module 1 now matches the curriculum topic list 1:1 (29 SVG diagrams total).
- [x] Deploy to Vercel ✓ 2026-06-11 — imported `vivekhashtag/aiaccelerator` (root `./`), **live and auto-deploying on push**.

> **Phase 0 shipped.** Module 1 is curriculum-complete and live. The only remaining Module 1 item
> from the curriculum is the 4 hands-on labs (1-A…1-D, Python/Logisim) — deferred as a separate
> track (overlaps the parked in-browser-Python phase).

### Phase 1
- [ ] Supabase auth (login / signup)
- [ ] Per-user lesson progress persistence

### Phase 2 — scale the content
- [x] Port all Module 1 lesson content from PDF (Topics 1.1–1.7) ✓ done 2026-06-09
- [x] Module 1 SVG diagrams — every topic illustrated ✓ done 2026-06-11
- [x] Module 2 — Computer Architecture & Accelerators (6 lessons, 22 SVG diagrams) ✓ 2026-06-12
- [ ] Push Module 2 to GitHub + verify Vercel deploy
- [ ] March through Modules 3–10 (prose + SVG diagrams, same pattern)

> The old "Module 1 interactive backlog" (CMOS NAND, live truth tables, bit-flipper, MAC
> animation, systolic array, etc.) is **shelved** as of the 2026-06-11 direction change. Each is
> now a static SVG diagram instead. If interactives return in a later phase, restore from
> CLAUDE.md §8.

---

## Key Files

| Purpose | Path |
|---|---|
| Route | `app/modules/[module]/[lesson]/page.tsx` |
| Lesson shell | `components/lesson/LessonLayout.tsx` |
| Sidebar | `components/lesson/LessonSidebar.tsx` |
| **SVG diagrams** | `components/lesson/Diagrams.tsx` (51 figures — 29 Module 1 + 22 Module 2 — the course "images") |
| MDX content blocks | `components/lesson/LessonBlocks.tsx` (Callout / Formula / Figure / StatGrid) |
| Prev/next nav | `components/lesson/LessonNav.tsx` |
| Quiz (unregistered, kept for later) | `components/lesson/QuizBlock.tsx` |
| Module colors | `lib/colors.ts` |
| Content index | `lib/content.ts` |
| MDX renderer | `lib/mdx.ts` |
| Design tokens | `styles/tokens.css` |
| Home page | `app/page.tsx` |
| Card illustrations | `components/ui/ModuleIllustration.tsx` |
| Curriculum map | `docs/curriculum.md` |
