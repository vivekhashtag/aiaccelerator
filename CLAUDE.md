# CLAUDE.md — AI Inference, Agentic AI & Accelerator Engineering (Interactive Course)

> This file is your standing brief. Read it fully at the start of every session.
> It defines what we are building, the quality bar, the order of work, and the rules.
> When in doubt, follow this file over assumptions.

---

## 1. Mission

We are building the best online course in existence for **AI Inference, Agentic AI & Accelerator Engineering** — taking a learner from silicon transistors to production agentic systems.

The defining feature of this course is **interactive, animated lessons**. We do not explain a transistor with a static diagram — we let the learner drag the gate voltage and watch electrons form a channel in real time. Every abstract concept becomes something the learner can *operate*. This is the entire reason the course exists. If a lesson could be a PDF, we have failed.

The full curriculum (10 modules, ~42 labs) is the source of truth for *content*. This file is the source of truth for *how we build*.

---

## 2. The Quality Bar (non-negotiable)

The reference standard is the **transistor lesson** (NMOS switch with draggable gate voltage, animated inversion layer, drifting electrons). Every interactive must meet or exceed it:

- **Physically / mathematically correct.** No hand-wavy animations. Electrons drift source→drain. Carry actually ripples. If the science is wrong, the lesson is worthless.
- **Smooth.** Canvas + `requestAnimationFrame` for particle/physics animation. 60fps target. No janky CSS-transition fakery for things that are fundamentally continuous.
- **Operable.** The learner changes an input (slider, toggle, clock pulse) and sees the consequence. Reading is secondary to doing.
- **Distinctive design.** No generic AI aesthetic — no Inter font, no purple-on-white gradients, no cookie-cutter cards. Commit to a cohesive, characterful visual identity (see §7).
- **Self-contained components.** Each interactive is one React component with no external state dependencies, so it can be reasoned about and reused.

When you build an interactive, your bar is: *"Would this make someone say 'I finally understand it'?"* If not, iterate.

---

## 3. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js (App Router)** | React-based, deploys free to Vercel |
| Language | **TypeScript** | DECISION: chosen for type safety as the project scales. Override only if explicitly told. |
| Lesson content | **MDX** | Markdown + embedded React, so prose and interactives live in one file |
| Styling | **Tailwind CSS + CSS custom properties** | Tailwind for layout speed; a custom design-token layer (see §7) so it never looks generic |
| Animation | **HTML Canvas + requestAnimationFrame** | For physics/particle interactives. Use SVG/CSS only for simple static visuals. |
| Hosting | **Vercel** | Free tier, zero-config for Next.js |
| Auth + DB | **Supabase** | NOT YET. Phase 1 only. Do not add auth before then. |
| In-browser Python | **Pyodide** | NOT YET. Phase 3 only. |

Do not introduce new heavy dependencies without flagging the tradeoff first.

---

## 4. Phased Roadmap — build in this order, do not skip ahead

> **CURRENT PHASE: Phase 0** ← update this marker as we progress.
>
> Hard rule: do not build features from a later phase unless the current phase is complete and I have explicitly moved the marker. If you think a later-phase feature is needed early, say so and ask — do not just build it.

**Phase 0 — Thin lesson framework (no auth).**
Goal: one real lesson, fully working, inside a reusable shell.
- Lesson layout: reading pane + slot for an embedded interactive + self-check quiz at the bottom.
- Module → lesson navigation (sidebar or equivalent).
- The lesson "contract" (see §6) defined and documented.
- The **transistor lesson** ported in as the first real lesson — not a placeholder.
- Deploys to Vercel and is browsable.
- **Done when:** I can read the transistor lesson, operate the animation, take the quiz, and click to a second (stub) lesson.

**Phase 1 — Login & saved progress.**
- Supabase auth wraps the app.
- Per-user progress (which lessons completed) persists across devices.
- Optional content gating behind sign-in.

**Phase 2 — Scale the content.**
- Complete all 8 Module 1 interactives (see §8).
- Then march through Modules 2–10 against the curriculum.
- Wire up the self-check quizzes (already written in the curriculum PDFs).
- Completion tracking + a simple progress dashboard.

**Phase 3 — Polish that earns "best course ever."**
- In-browser Python labs via Pyodide.
- Certificates, streaks, search, light/dark themes, full design system pass.

---

## 5. Repository Structure

```
/app                     Next.js App Router pages
  /modules/[module]/[lesson]/page.tsx   Lesson route (renders MDX)
/content                 Lesson content as MDX, organized by module
  /module-01/
    01-transistor.mdx
    ...
/components
  /interactives          One folder/file per interactive (the differentiator)
    TransistorSwitch.tsx
  /lesson                Framework: LessonLayout, QuizBlock, LessonNav, etc.
  /ui                    Small shared primitives
/lib                     Helpers, MDX config, content indexing
/styles                  Design tokens, global CSS
/docs                    Reference material (read on demand, not auto-loaded)
  curriculum.md          Full map of all 10 modules, topics, and labs
  /modules
    module-01-source.md  Deep teaching content for Module 1
    ...
CLAUDE.md                This file (auto-loaded every session)
```

Keep interactives isolated in `/components/interactives`. They are the crown jewels — easy to find, easy to reuse.

---

## 6. The Lesson Contract (most important architectural rule)

Every lesson is an MDX file with this shape, and the framework must support it consistently:

1. **Frontmatter:** `title`, `module`, `lesson`, `slug`, `summary`, optional `prerequisites`.
2. **Prose sections** explaining the concept (sourced/adapted from the curriculum PDFs).
3. **One or more embedded interactive components** placed inline where they illuminate the text.
4. ~~A self-check quiz at the bottom.~~ **Removed 2026-06-11** (see §10) — lessons end on the recap. `QuizBlock` may return in a later phase with real scoring/persistence.

The framework provides:
- `LessonLayout` — wraps prose + interactives + quiz with consistent styling and the reading pane.
- `QuizBlock` — renders self-check questions; in Phase 0 it can be reveal-answer style (no scoring/persistence until later phases).
- `LessonNav` — previous/next + module tree.

A new lesson should require **only** writing an MDX file and (if needed) a new interactive component — never touching the framework plumbing. If adding a lesson forces framework changes, the framework is wrong; fix the framework, not the lesson.

---

## 7. Design Identity

Commit to a deliberate, technical-but-beautiful aesthetic — think "engineering instrument" not "generic SaaS." Guidelines:
- **Centralize design tokens** (colors, type scale, spacing) as CSS custom properties so the whole course feels like one product.
- **Typography:** distinctive display + readable mono/body pairing. Avoid Inter/Roboto/Arial defaults.
- **Color:** a dominant dark technical base with sharp, meaningful accents (e.g. electrons = one signature color used consistently across every lesson). Color should *mean* something — reuse the electron color, the "on/HIGH" color, etc., across all interactives so the visual language is consistent.
- **Motion:** purposeful. Animation conveys the physics, not decoration.

Consistency across lessons matters more than novelty per lesson. A learner should recognize "an electron" instantly in Module 8 because it looked the same in Module 1.

---

## 8. Module 1 Interactive Backlog (the Phase 2 content trajectory)

In rough teaching order:
1. **Transistor switch** ✓ (reference lesson) — drag gate voltage, watch the channel form.
2. **CMOS NAND gate** — toggle inputs A/B, watch pull-up (PMOS) vs pull-down (NMOS) networks fight, output resolves.
3. **The seven logic gates** — live truth tables that fill in as you toggle inputs.
4. **Half adder → full adder → ripple-carry adder** — watch the carry physically ripple across bits.
5. **D flip-flop** — drive a clock; see input sampled only on the rising edge.
6. **Number formats** — bit-level explorer: flip sign/exponent/mantissa bits of FP32/FP16/BF16/INT8 and watch the decimal value change; show two's complement negation.
7. **MAC unit** — animate multiply→accumulate; build a dot product step by step.
8. **Systolic array** (finale) — data flows between MAC cells; show why it beats naive matmul on memory bandwidth.

---

## 9. Working Agreements (how to behave in this repo)

- **Default to Plan mode** for any multi-file change. Show the plan; wait for approval.
- **Respect the phase marker** (§4). Never build ahead.
- **One concern at a time.** Small, reviewable diffs over giant ones.
- **Flag tradeoffs, don't hide them.** New dependency, perf cost, or a shortcut that creates debt → say so before doing it.
- **The curriculum is the content source.** The full module map is at `/docs/curriculum.md`; deep per-module teaching content is at `/docs/modules/module-XX-source.md`. Read these on demand when you need module or topic detail — do not invent technical facts, adapt from these, and keep the physics/math correct.
- **When something is ambiguous, ask** rather than guessing on architecture decisions. Guessing is fine for cosmetic details.
- **Update this file** when we make a lasting decision (record it in the relevant section) or when we advance a phase (move the marker).

---

## 10. Current Status

- **Phase 0 framework complete.** Next.js + MDX lesson shell, dark "engineering instrument" design system, sidebar/nav, and all 7 Module 1 lessons (1.1–1.7) written.
- **DECISION (2026-06-11) — direction change: image-rich static lessons, not interactives.**
  The user reviewed the live lessons and chose to drop the canvas/animation interactives in
  favour of **hand-authored SVG diagrams** — "the right image" for each concept, rendered in
  code so they always load, never 404, carry no licensing risk, and are guaranteed to match the
  prose. This supersedes the "every lesson must be interactive" framing in §1–§2 and the §8
  interactive backlog for now. The reference `TransistorSwitch` interactive was removed.
  - Diagram library: `components/lesson/Diagrams.tsx` (24 SVG components, registered in `lib/mdx.ts`).
    Shared `DiagramFrame` + a fixed semantic palette mirroring `styles/tokens.css`.
  - **Self-check quizzes removed** from all lessons (see §6). `QuizBlock` is unregistered (file kept).
- Next concrete steps: deploy to Vercel (point root at `aiaccelerator/`, drop the stray outer
  lockfile), then continue the same SVG-diagram treatment into Modules 2–10.
