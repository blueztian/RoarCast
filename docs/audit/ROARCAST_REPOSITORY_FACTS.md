# RoarCast Factual Repository Identity & Architecture Map

**Document Version:** 1.0  
**Verification Date:** August 2, 2026  
**Auditor / Verifier:** Antigravity (Independent Handoff Handoff Package Verification)  
**Target Audience:** Independent Technical Reviewers & Principal Systems Engineers  

---

## 1. Frozen Repository Identity & Environment Profile

To support objective third-party verification without direct git checkout access, the exact state of the RoarCast workspace was frozen and cataloged prior to generating this review package.

### Repository Metadata
*   **Repository Name:** `RoarCast` (GitHub: `blueztian/RoarCast`)
*   **Local System Path:** `C:\Users\my\OneDrive\Desktop\RoarCast`
*   **Current Git Branch:** `develop`
*   **Current Commit Hash:** `fb5e952b6e3448b73eeba71689dc052854d829fc`
*   **Latest Commit Message:** `style: enable native header scrolling across all student hubs`
*   **Uncommitted Production Changes:** **Zero.** All production code files are 100% clean and unmodified. Only newly generated audit review markdown and text reports exist as untracked files.

### Runtime System & Compilation Environment
*   **Operating System:** Windows 11 (NT 10.0) x64 / PowerShell Core
*   **Node.js Runtime Version:** `v22.23.1`
*   **NPM Package Manager Version:** `10.9.8`
*   **Next.js Application Version:** `14.2.35`
*   **React & React DOM Version:** `18.3.1`
*   **TypeScript Compiler Version:** `5.9.3`

---

## 2. Verification Suite Results Summary (Build, Lint, Typecheck, Test)

All automated verification commands were attempted in non-interactive CI mode within `C:/Users/my/OneDrive/Desktop/RoarCast/frontend` without modifying `package-lock.json`, installing dependencies, or altering existing configuration files. Full command logs are preserved in `ROARCAST_COMMAND_OUTPUTS.txt`.

| Verification Task | Command Executed | Exit Outcome | Empirical Findings & Rationale |
| :--- | :--- | :---: | :--- |
| **TypeScript Typecheck** | `npx tsc --noEmit` | **0 (PASSED)** | **Successful.** Zero TypeScript type errors, syntax faults, or invalid interface assignments were detected across the entire application codebase. |
| **Next.js Linting** | `npm run lint` | **Failed (Blocked)**| **Cannot execute.** The linter halts and prompts for interactive setup (`? How would you like to configure ESLint?`) because no `.eslintrc.json` config file exists in the repository. |
| **Production Build** | `npm run build` | **Failed (Blocked)**| **Cannot complete.** By default, Next.js runs `next lint` during production optimization. Because ESLint configuration is missing, build optimization stalls on the identical interactive config prompt. |
| **Automated Test Suite** | `npm test` | **Does Not Exist** | **Missing script.** `package.json` contains no `"test"` command script, and static auditing confirms zero unit, integration, or E2E test files exist in the project tree. |

---

## 3. Dependency Summary (From `frontend/package.json`)

The active runtime dependencies reflect an entirely frontend-focused single-page animation architecture:

```json
{
  "dependencies": {
    "clsx": "^2.1.1",
    "framer-motion": "^11.18.2",
    "lucide-react": "^1.16.0",
    "next": "14.2.35",
    "react": "^18",
    "react-dom": "^18",
    "tailwind-merge": "^3.0.1"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```
*Notice: Zero backend DBMS client drivers (no Supabase, Firebase, Prisma, Drizzle, PostgreSQL, or MongoDB libraries), authentication SDKs (no NextAuth, Clerk, Auth0), or networking request clients (Axios, TanStack Query) are present in the package manifest.*

---

## 4. Comprehensive Repository Route & Codebase Map

The table below catalogs all application code files, noting their exact line lengths, declaration of `"use client"`, usage of browser APIs (`localStorage`, `window.addEventListener`), and whether they enact production vs. simulated/mock demo logic.

### 4.1 Public Onboarding & Marketing Routes (`frontend/app/(public)/`)
| File Path | Lines | `"use client"` | Browser Storage / APIs | Logic Classification & Primary Responsibility |
| :--- | :---: | :---: | :--- | :--- |
| `app/(public)/layout.tsx` | 3 | **No (RSC)** | None | **Production Routing Shell.** Basic wrapper returning children without UI decoration. |
| `app/(public)/page.tsx` | 1,138 | **Yes** | `localStorage.setItem("roarcast_student")`, timers | **Simulated / Duplicated Flow (God Component).** Renders landing hero and houses an entirely embedded, multi-step interactive micro-audit questionnaire and signup state machine. |
| `app/(public)/signup/page.tsx`| 217 | **Yes** | `localStorage.setItem("roarcast_student")` | **Unvalidated Local Storage Storage.** Standardized student account registration route writing plain JSON directly to unencrypted browser storage without auth. |
| `app/(public)/audit/page.tsx` | 138 | **Yes** | `localStorage.getItem("roarcast_student")`, `setTimeout` | **Simulated Theater.** Dedicated micro-audit onboarding flow; runs timed simulation animations (`750ms`) before navigating to `/results` without computing answers. |

### 4.2 Student Application Routes (`frontend/app/(student)/`)
| File Path | Lines | `"use client"` | Browser Storage / APIs | Logic Classification & Primary Responsibility |
| :--- | :---: | :---: | :--- | :--- |
| `app/(student)/layout.tsx` | 5 | **No (RSC)** | None | **Production Routing Shell.** Wraps all student paths within `StudentAppShell`. |
| `app/(student)/dashboard/page.tsx` | 292 | **Yes** | Reads `localStorage["roarcast_credential"]` | **Hardcoded Persona UI.** Primary student dashboard displaying Jana Cruz's Accounting profile, hardcoded 72% base readiness, and ERP skill gaps. |
| `app/(student)/results/page.tsx` | 108 | **Yes** | Reads `localStorage["roarcast_student"]` | **Simulated Snapshot.** Post-audit readiness overview showing static recommendations. |
| `app/(student)/explore/page.tsx` | 129 | **Yes** | None (Static React UI) | **Demo Content.** Hub displaying trending Santa Rosa career pathways and companies. |
| `app/(student)/explore/career-paths/page.tsx` | 250 | **Yes** | None | **Demo Content.** Displays salary ranges and skills for localized role profiles. |
| `app/(student)/explore/companies/page.tsx` | 171 | **Yes** | None | **Demo Content.** Renders logos and requirements for simulated PEZA locator partners. |
| `app/(student)/explore/industry-pulse/page.tsx`| 230 | **Yes** | None | **Demo Content.** Interactive animated ticker showing regional skill demand shifts. |
| `app/(student)/explore/trending-skills/page.tsx`| 139 | **Yes** | None | **Demo Content.** Renders deep-dive cards for in-demand IT and accounting skills. |
| `app/(student)/learn/page.tsx` | 110 | **Yes** | Calls `studentState.ts` local storage helpers | **Partially Implemented State.** Displays learning progress tracked via local storage. |
| `app/(student)/learn/courses/page.tsx` | 135 | **Yes** | Calls `studentState.ts` | **Demo Catalog.** Lists course modules available in the prototype. |
| `app/(student)/learn/courses/[courseId]/page.tsx` | 183 | **Yes** | Calls `studentState.ts` | **Demo Course View.** Dynamic route displaying module chapters for a specific course. |
| `app/(student)/learn/courses/[courseId]/modules/[moduleId]/page.tsx` | 146 | **Yes** | Calls `completeModule()` | **Local Storage Mutation.** Reading module view; clicking complete saves status in local storage. |
| `app/(student)/learn/erp-foundations/page.tsx`| 628 | **Yes** | Calls `completeModule()` | **Rich Demo Interactive Course.** Comprehensive 628-line interactive training module. |
| `app/(student)/learn/squads/page.tsx` | 290 | **Yes** | None | **Placeholder UI.** Co-Op upskilling squad directory (Duplicate route tree A). |
| `app/(student)/learn/squads/[squadId]/page.tsx`| 333 | **Yes** | None | **Placeholder UI.** Individual team chat and collaborative assignment placeholder UI. |
| `app/(student)/squads/match/page.tsx` | 260 | **Yes** | None | **Placeholder UI.** Simulated squad team formation questionnaire (Duplicate route tree B). |
| `app/(student)/squads/erp-fundamentals/page.tsx`| 263 | **Yes** | None | **Placeholder UI.** Direct squad overview view mirroring `/learn/squads/` functionality. |
| `app/(student)/skills/erp-workflow/page.tsx` | 378 | **Yes** | Reads local storage | **Demo Domain Content.** Deep-dive breakdown of the ERP Workflow competency gap. |
| `app/(student)/assessment/erp-workflow/page.tsx`| 539 | **Yes** | Calls `completeAssessment()` | **Simulated Assessment.** 539-line interactive multi-question evaluation screen. |
| `app/(student)/credentials/page.tsx` | 194 | **Yes** | Reads `studentState.ts` | **Simulated Registry.** Displays active badges earned in local browser storage. |
| `app/(student)/credentials/portfolio/page.tsx`| 184 | **Yes** | Reads `studentState.ts` | **Simulated Portfolio.** Printable/exportable presentation of earned student badges. |
| `app/(student)/credentials/erp-workflow/page.tsx`| 325 | **Yes** | Calls `earnCredential()` | **Simulated Credential Grant.** Clicking button awards static serial ID `"RC-ERP-2026-01842"`. |
| `app/(student)/credentials/verify/[credentialId]/page.tsx` | 105 | **Yes** | None (Ignores `[credentialId]` validation) | **Fake QR / Static Display.** Renders static Lucide SVG `<QrCode />` icon and static text regardless of what ID string is inserted in the URL path. |
| `app/(student)/profile/page.tsx` | 247 | **Yes** | Reads `studentState.ts` | **Local Storage UI.** Displays student name, program, and locally stored readiness metrics. |
| `app/(student)/profile/settings/page.tsx` | 105 | **Yes** | Mutates `localStorage` | **Local Storage UI.** Allows editing display profile name and clearing demo local storage. |
| `app/(student)/profile/audit-history/page.tsx` | 153 | **Yes** | None | **Hardcoded Timeline.** Displays static historical audit evaluation timestamps. |
| `app/(student)/explore.zip` | N/A | **Binary File** | 14,311 bytes | **Committed Repository Debris.** Compressed zip archive dumped directly in `app/(student)/`. |

### 4.3 Institutional Admin Analytics Routes (`frontend/app/admin/`)
| File Path | Lines | `"use client"` | Security / Auth | Logic Classification & Primary Responsibility |
| :--- | :---: | :---: | :--- | :--- |
| `app/admin/layout.tsx` | 65 | **Yes** | **UNAUTHENTICATED** (No guards) | **Unsecured Layout Shell.** Renders sidebar and institutional navigation without checking roles, sessions, or tokens. Completely accessible to public incognito traffic. |
| `app/admin/page.tsx` | 133 | **Yes** | Unprotected Client UI | **Hardcoded Sample Analytics.** Displays static JSX strings (`"12,450"` students, `"68%"` readiness, `"84"` partners). Zero database connections or calculation. |
| `app/admin/workforce-intelligence/page.tsx`| 291 | **Yes** | Unprotected Client UI | **Hardcoded Sample Analytics.** Displays mock regional heatmaps and labor gap trends. |
| `app/admin/skill-gaps/page.tsx` | 121 | **Yes** | Unprotected Client UI | **Hardcoded Sample Analytics.** Displays mock academic institution competency breakdowns. |
| `app/admin/institutions/page.tsx` | 110 | **Yes** | Unprotected Client UI | **Hardcoded Sample UI.** List of participating colleges and training schools in Laguna. |
| `app/admin/peza-zones/page.tsx` | 56 | **Yes** | Unprotected Client UI | **Hardcoded Sample UI.** Map overview of industrial manufacturing locator parks. |
| `app/admin/reports/page.tsx` | 56 | **Yes** | Unprotected Client UI | **Placeholder UI.** Mock analytical PDF export buttons. |
| `app/admin/profile/page.tsx` | 57 | **Yes** | Unprotected Client UI | **Hardcoded UI.** Static profile screen for LGU/PESO admin user account. |
| `app/admin/settings/page.tsx` | 52 | **Yes** | Unprotected Client UI | **Placeholder UI.** Static notification and system administration option switches. |

### 4.4 Reusable Presentation Components (`frontend/components/`)
| File Path | Lines | `"use client"` | Browser APIs | Design Purpose & Pattern Assessment |
| :--- | :---: | :---: | :--- | :--- |
| `components/AnimatedHero.tsx` | 120 | **Yes** | Framer Motion animations | Marketing hero banner featuring kinetic headlines and floating action callouts. |
| `components/AuditQuestion.tsx` | 73 | **Yes** | Framer Motion selection | Interactive option selection card used inside micro-audit questionnaires. |
| `components/CTASection.tsx` | 43 | **No (RSC)** | None | Static call-to-action banner promoting student registration and PESO onboarding. |
| `components/DemandBadge.tsx` | 40 | **No (RSC)** | None | Pure presentational design indicator rendering High/Rising demand levels. |
| `components/FloatingNavbar.tsx` | 151 | **Yes** | Reads scroll offsets | Responsive navigation header bar changing opacity as user scrolls down page. |
| `components/HeroSignalField.tsx` | 232 | **Yes** | `window.requestAnimationFrame`, Canvas API | High-performance interactive HTML5 Canvas particle background animation loop. |
| `components/MobileFloatingNav.tsx` | 115 | **Yes** | Local state toggle | Mobile bottom navigation drawer targeting student smartphone devices. |
| `components/ParticlesBackground.tsx` | 129 | **Yes** | Canvas particle rendering | Secondary ambient particle floating canvas wrapper for deep student views. |
| `components/ReadinessGauge.tsx` | 101 | **Yes** | Framer Motion SVG draw | Semi-circular animated SVG data visualization gauge rendering readiness percentage. |
| `components/ReadinessRing.tsx` | 70 | **Yes** | Framer Motion SVG draw | Compact circular SVG progress indicator used in navigation bars and cards. |
| `components/SignalBackground.tsx` | 232 | **Yes** | Canvas math animations | Concentric radar pulse background visualizer symbolizing continuous signal reception. |
| `components/SkillExplanationDrawer.tsx`| 72 | **Yes** | React state popover | Slide-out overlay drawer providing textual explanations of technical acronyms. |
| `components/SkillGapCard.tsx` | 65 | **Yes** | Framer Motion expand | Collapsible interactive informational card detailing competency gap solutions. |
| `components/SkillTag.tsx` | 29 | **No (RSC)** | None | Lightweight text capsule component used for labeling academic competencies. |
| `components/StudentAppShell.tsx` | 12 | **No (RSC)** | None | Core UI containment layout wrapper uniting header bars and scrolling content panes. |

### 4.5 Hooks, State Management, & Domain Utilities (`frontend/lib/`)
| File Path | Lines | `"use client"` | Browser APIs | Domain Mechanics & Coupling Evaluation |
| :--- | :---: | :---: | :--- | :--- |
| `lib/studentState.ts` | 232 | **No (Utility)** | `window.localStorage.getItem/setItem/removeItem` | **Central State Singleton Hub.** Manages CRUD operations over local storage keys (`roarcast_student`, `_credential`, `_module_progress`). Hardcodes `BASE_READINESS = 72` (line 220) and static credential serial ID `"RC-ERP-2026-01842"` (line 180). |
| `lib/motion.ts` | 149 | **No (Utility)** | Exports Framer Motion primitives & `useReducedMotion` | **Animation Token Repository.** Defines standardized spring transitions, fade-in staggers, and accessibility fallbacks for motion sensitivity. |
| `lib/useScrolled.ts` | 21 | **Yes (Hook)** | `window.addEventListener("scroll", ...)` | Reusable custom React Hook checking if vertical document scroll offset exceeds 20px. |
| `lib/useMeasuredHeight.ts` | 28 | **Yes (Hook)** | `ResizeObserver`, DOM Refs | Reusable custom React Hook monitoring pixel dimensions of responsive DOM node containers. |
| `lib/utils.ts` | 6 | **No (Utility)** | None | Standard Tailwind class formatting helper combining `clsx` and `twMerge`. |

### 4.6 Static Mock Data Collections (`frontend/data/`)
| File Path | Lines | Architecture Role & Data Coupling Profile |
| :--- | :---: | :--- |
| `data/mockSkills.ts` | 80 | Defines Jana Cruz's hardcoded Accounting Information System skill gap profile, hardcoded base readiness score (72), and exports static `prioritySkillGap = erpWorkflow`. |
| `data/mockDemand.ts` | 24 | Exports static array of PEZA manufacturing & accounting employment skill requirements in Laguna. |
| `data/mockAuditQuestions.ts` | 68 | Exports a static 5-question micro-audit array used exclusively by dedicated `/audit` routes. |
| `data/mockLearn.ts` | 241 | Defines static course outlines and chapter details for ERP Workflow and Basic Accounting modules. |
| `data/industryPulse.ts` | 136 | Exports static ticker items simulating live DOLE and TESDA regional job hiring statistics. |
| `data/mockStudent.ts` | 20 | Static baseline student profile defaults ("Jana Cruz / Junior Accounting Operations Associate"). |

### 4.7 Intended Backend & Data Engine Infrastructure
| Directory / File Path | File Content & Implementation Reality |
| :--- | :--- |
| `backend/.gitkeep` | **0 Bytes (Empty Directory).** Zero PostgreSQL database migration schemas, Supabase clients, ORM configuration models, or server-side transactional business code exists in the repository. |
| `data-engine/.gitkeep`| **0 Bytes (Empty Directory).** Zero automated Python/Node web scraping scripts, DOLE/TESDA XML parser engines, or skill taxonomy ingestion algorithms exist in executable code. |
| `docs/.gitkeep` | **0 Bytes (Empty Directory).** No architecture decision records, OpenAPI Swagger schemas, or technical governance documentation exist inside the dedicated docs directory. |
| `research/.gitkeep` | **0 Bytes (Empty Directory).** Reserved staging directory containing zero analytical scripts or regional workforce research reports. |

### 4.8 Global Configuration & Root Documents
*   `frontend/next.config.mjs` (9 lines): Base Next.js compiler configuration with zero custom API rewrite headers or build configurations.
*   `frontend/tailwind.config.ts` (66 lines): Customized styling engine registry defining proprietary RoarCast design tokens (`roar-maroon`, `roar-amber`) and custom font families (`Space Grotesk`, `Inter`).
*   `frontend/tsconfig.json` (23 lines): Strict TypeScript compiler rules targeting ES2022 module resolution.
*   `frontend/README.md` (62 lines): Helpful developer frontend summary explaining installation steps and design theme objectives.
*   `README.md` (Root, 48 lines): **Outdated / Contradictory.** Contains statement on line 45 falsely asserting: *"🚧 Note: No application code has been written yet."*

---
*End of Repository Facts Document.*
