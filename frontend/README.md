# RoarCast — Frontend Foundation

Frontend-only prototype of RoarCast: Powering the Triple Helix of Santa Rosa.
Next.js App Router + TypeScript + Tailwind CSS + Framer Motion. All data is mocked — no backend, database, or auth.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

> This was built in an offline sandbox without package access, so dependencies have not been installed or build-verified here. If `npm install` surfaces a version conflict, the most likely culprits are the `framer-motion` / `lucide-react` / `next` pins in `package.json` — bump the patch version and it should resolve cleanly.

## Flow

```
/            Landing page (hero, live skill signals, how it works, dashboard preview, triple-helix section, final CTA)
/signup      Progressive onboarding (name/age → school/program → grad year/career interest → review)
/audit       10-question micro-audit, one question at a time, then an "Analyzing your profile" sequence
/results     Skill map: readiness ring, Ready / Strengthen / Priority Gap columns, "Why this matters" drawer
```

Signup writes the student profile to `localStorage["roarcast_student"]`; the audit writes answers to
`localStorage["roarcast_audit_answers"]`. Results are currently rendered from the static mock skill data
in `data/mockSkills.ts` (Jana Cruz / Accounting Information System persona) regardless of the actual
audit answers — wiring the two together is the natural next step once you're back in Antigravity.

## Structure

```
app/
  page.tsx            Landing page
  signup/page.tsx      Onboarding
  audit/page.tsx       Micro-audit
  results/page.tsx     Skill map / results
components/
  FloatingNavbar.tsx
  HeroSignalField.tsx   Cursor-reactive canvas node network (hero background)
  SkillTag.tsx
  DemandBadge.tsx
  ReadinessRing.tsx
  AuditQuestion.tsx
  SkillGapCard.tsx
  CTASection.tsx
  SkillExplanationDrawer.tsx
data/
  mockSkills.ts
  mockAuditQuestions.ts
  mockStudent.ts
  mockDemand.ts
```

## Design tokens

- Colors: Roar Yellow `#FFB800`, Amber `#B67500`, Helix Maroon `#710000`, plus a warm off-white
  paper background and a warm-charcoal ink scale (see `tailwind.config.ts`).
- Type: Space Grotesk (display), Inter (body), IBM Plex Mono (data labels / eyebrows / tags) — loaded via `next/font/google` in `app/layout.tsx`.
- Motion + accessibility: all animation respects `prefers-reduced-motion`; the hero signal field
  falls back to a lighter, static render. Visible focus rings are set globally in `app/globals.css`.
