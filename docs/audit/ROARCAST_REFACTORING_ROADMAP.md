# RoarCast Systematic Refactoring & Engineering Roadmap

**Document Version:** 1.0  
**Target Execution Timeline:** Pre-Pilot to Production Staging  
**Author:** Antigravity (Senior Software Architect & Principal Systems Engineer)  
**System Evaluated:** RoarCast Platform Repository (`blueztian/RoarCast`)

---

## Roadmap Overview

This refactoring roadmap details the sequential engineering activities required to convert RoarCast from an unsecured hackathon demonstration into an architecturally resilient, secure, testable, and production-ready workforce-intelligence platform. 

To prevent breaking existing UI demonstration features while remediating critical code smells and vulnerabilities, execution is partitioned into eight strictly ordered phases (Phase 0 through Phase 7). Engineering teams must satisfy all acceptance criteria for a given phase before transitioning to subsequent stages.

---

## Phase 0: Preserve the Working Demo & Clean Workspace Debris

*Objective:* Secure the baseline hackathon demonstration UI in an isolated demo runtime while purging committed repository artifacts and outdated documentation before commencing code reorganization.

### Task 0.1: Isolate Demo Mode via Environment Feature Flag
*   **Objective:** Create a toggleable environment configuration flag (`NEXT_PUBLIC_DEMO_MODE="true"`) to preserve existing mock data rendering and simulated animations during backend integration.
*   **Exact Affected Files / Modules:** `frontend/lib/studentState.ts`, `frontend/data/mockSkills.ts`, new file `frontend/lib/config.ts`.
*   **Reason:** Evaluators and stakeholders require continuous access to a functional visual demonstration while engineers build real database backends in parallel.
*   **Expected Benefit:** Enables non-destructive feature enhancement and effortless offline pitch presentations.
*   **Risk:** Low risk of branching complexity if environment checks are poorly centralized.
*   **Effort:** XS (< 2 hours).
*   **Recommended Order:** Step 1 (Immediate Start).
*   **Acceptance Criteria:** Setting `NEXT_PUBLIC_DEMO_MODE="true"` renders the full legacy hackathon UI without backend connections; setting it to `"false"` routes execution to verified domain repository adapters.

### Task 0.2: Purge Extraneous Debris & Update Repository Root Documentation
*   **Objective:** Remove unverified binary archive files and drafting word documents from workspace code directories, configure `.gitignore` exclusion rules, and harmonize root README file descriptions.
*   **Exact Affected Files / Modules:** `frontend/app/(student)/explore/explore.zip` (14 KB), root `FOUR_PLUS_ONE_Elimination_Brief.docx`, root `README.md`.
*   **Reason:** Committed archives clutter application route folders, while root README descriptions falsely claim *"No application code has been written yet"* (line 45), causing severe contributor onboarding confusion.
*   **Expected Benefit:** Establishes professional repository hygiene and accurate implementation documentation.
*   **Risk:** Zero risk to application functionality.
*   **Effort:** XS (< 2 hours).
*   **Recommended Order:** Step 2.
*   **Acceptance Criteria:** `explore.zip` and Word drafts are completely deleted from version controlled directories; root `README.md` accurately details active Next.js application architecture and setup instructions.

---

## Phase 1: Remove Critical Security Risks

*Objective:* Eliminate blocking security exposures, specifically closing unprotected institutional administrative routing pathways and replacing fake static QR credential verifications with scannable cryptographic payloads.

### Task 1.1: Implement Edge Middleware Authentication & RBAC Route Guarding
*   **Objective:** Install an identity provider (Supabase Auth or NextAuth.js) and engineer a global root middleware interceptor to lock administrative dashboards against unauthenticated public access.
*   **Exact Affected Files / Modules:** New file `frontend/app/middleware.ts`, `frontend/app/admin/layout.tsx:1-66`, `frontend/package.json`.
*   **Reason:** In current code, anyone visiting `/admin` gains full unobstructed access to institutional analytics (OWASP Broken Access Control vulnerability).
*   **Expected Benefit:** Secures institutional tenant analytics and establishes verified student authentication boundaries.
*   **Risk:** Medium risk of routing redirect loops during improper token evaluation.
*   **Effort:** M (1–2 days).
*   **Recommended Order:** Step 3.
*   **Acceptance Criteria:** Accessing any URL beginning with `/admin` in an unauthenticated browser incognito session immediately forces an HTTP redirect to `/login`; access is exclusively permitted to verified admin accounts.

### Task 1.2: Re-Engineer Verifiable Credential QR Verification with Real Cryptographic Tokens
*   **Objective:** Remove decorative static SVG icons from verification screens and integrate a real QR code generating engine binding to verifiable W3C cryptographic serial payloads.
*   **Exact Affected Files / Modules:** `frontend/app/(student)/credentials/verify/[credentialId]/page.tsx:58-60`, `frontend/lib/studentState.ts:180-191`, `frontend/package.json`.
*   **Reason:** The current application displays a decorative static Lucide SVG `<QrCode />` icon and hardcodes identical credential IDs (`"RC-ERP-2026-01842"`), undermining employer trust in skill verification.
*   **Expected Benefit:** Establishes scannable, cryptographically legitimate skill credential verification for Santa Rosa hiring partners.
*   **Risk:** Low risk; UI container layouts remain largely unchanged.
*   **Effort:** M (1–2 days).
*   **Recommended Order:** Step 4.
*   **Acceptance Criteria:** Scanning the generated QR code on `/credentials/verify/[id]` with an external mobile smartphone camera directs the browser to an inspectable cryptographic token verification payload confirming student identity and skill completion.

---

## Phase 2: Establish Architectural & Domain Boundaries

*Objective:* Disentangle tangled presentations, eliminate divergent duplicate user workflows, and transition from an unoptimized client SPA into a clean Modular Monolith design layer.

### Task 2.1: Purge Micro-Audit Workflow Duplication & Dismantle God Component
*   **Objective:** Refactor the massive 1,139-line landing page into an atomic presentation layout by excising inline onboarding questionnaires and redirecting user action buttons to dedicated App Router routes.
*   **Exact Affected Files / Modules:** `frontend/app/(public)/page.tsx:22-200` (God Component), `frontend/app/(public)/signup/page.tsx`, `frontend/app/(public)/audit/page.tsx`.
*   **Reason:** Two incompatible implementations of student onboarding currently exist in parallel (one embedded within a complex landing state machine and one in dedicated routes), causing severe code divergence.
*   **Expected Benefit:** Enforces Single Responsibility and DRY principles, creating a single, verifiable onboarding journey source of truth.
*   **Risk:** Minor animation layout regressions during code stripping.
*   **Effort:** M (1–2 days).
*   **Recommended Order:** Step 5.
*   **Acceptance Criteria:** `app/(public)/page.tsx` length falls below 250 lines of code; all questionnaire state machines are removed; onboarding buttons cleanly redirect to dedicated `/signup` and `/audit` workflows.

### Task 2.2: Establish Modular Monolith Domain Folder Architecture
*   **Objective:** Reorganize codebase source folders into cohesive domain logic boundaries (`src/domains/student`, `src/domains/taxonomy`, `src/domains/credentials`, `src/domains/intelligence`) separated from presentation UI elements.
*   **Exact Affected Files / Modules:** Entire repository tree (moving files from raw `frontend/lib/` and `frontend/data/` into structured domain boundary modules).
*   **Reason:** High-level domain computation rules are currently mixed directly into UI formatting presentation components and arbitrary utility files.
*   **Expected Benefit:** Enforces Dependency Inversion and clean separation of concerns, setting the stage for future unit test isolation.
*   **Risk:** Moderate import path resolution breakages during directory restructuring.
*   **Effort:** L (3–4 days).
*   **Recommended Order:** Step 6.
*   **Acceptance Criteria:** Zero business rules or calculations remain inside `src/app/` or `src/components/`; presentation code communicates exclusively via interfaces exported from `src/domains/`.

---

## Phase 3: Introduce Validated Backend Persistence

*Objective:* Replace unstable browser local storage mechanics and empty `.gitkeep` directory architectures with a verified relational cloud database infrastructure (Supabase PostgreSQL).

### Task 3.1: Provision Relational PostgreSQL Database Schemas & Row-Level Security
*   **Objective:** Deploy formal SQL relational migration schemas for users, student profiles, skill taxonomies, assessment audits, and verifiable credentials equipped with strict Row-Level Security (RLS) policies.
*   **Exact Affected Files / Modules:** New folder `backend/migrations/`, `backend/schema.sql`.
*   **Reason:** The application currently exists as a transient frontend simulation; clearing browser cache erases all student profiles and readiness history.
*   **Expected Benefit:** Delivers verifiable data persistence, multi-tenant boundaries, and historical institutional records.
*   **Risk:** Requires careful alignment between database column constraints and frontend form inputs.
*   **Effort:** L (3–5 days).
*   **Recommended Order:** Step 7.
*   **Acceptance Criteria:** Database migration scripts successfully build relational PostgreSQL tables; automated database RLS rule tests confirm students cannot read or write to unauthorized tables.

### Task 3.2: Implement Repository Abstraction Adapters over Direct LocalStorage
*   **Objective:** Create abstract repository interfaces (`StudentRepository`, `TaxonomyRepository`) and implement concrete database API adapters to entirely replace direct browser `window.localStorage` execution.
*   **Exact Affected Files / Modules:** `frontend/lib/studentState.ts`, `frontend/app/(public)/signup/page.tsx:86`, `frontend/app/(public)/audit/page.tsx:43`, new files in `src/infrastructure/repositories/`.
*   **Reason:** Direct UI coupling to browser local storage prevents backend API persistence and prohibits automated unit testing.
*   **Expected Benefit:** Unites data state under a dependable server-backed source of truth while maintaining optional legacy demo mock adapters.
*   **Risk:** Temporary UI loading friction during transition from synchronous local reads to asynchronous API promises.
*   **Effort:** L (3–5 days).
*   **Recommended Order:** Step 8.
*   **Acceptance Criteria:** Zero invocations of `window.localStorage` occur during normal production operation; profile creation and audit submissions persist asynchronously to verified cloud database tables.

---

## Phase 4: Implement & Test Core Business Rules

*Objective:* Substitute static simulated theatrical mockups with genuinely computed business algorithms and integrate a comprehensive automated software test suite.

### Task 4.1: Build Dynamic Micro-Audit Readiness & Skill Gap Evaluation Engine
*   **Objective:** Replace hardcoded base readiness percentages (`72%`) and static single-persona recommendations with dynamic scoring algorithms evaluating real student audit answers against industry competency targets.
*   **Exact Affected Files / Modules:** `frontend/lib/studentState.ts:220-226` (`computeReadiness`), `frontend/data/mockSkills.ts:17-72`, new file `src/domains/taxonomy/scoringEngine.ts`.
*   **Reason:** In the current prototype, readiness is hardcoded to 72% and skill gaps default to ERP Workflow regardless of selected degree program or answers given in the 60-second micro-audit.
*   **Expected Benefit:** Transforms RoarCast into an authenticated, dynamically responsive workforce-intelligence tool.
*   **Risk:** Requires complex skill weighting mapping logic across diverse academic degree programs.
*   **Effort:** L (4–5 days).
*   **Recommended Order:** Step 9.
*   **Acceptance Criteria:** Submitting distinct micro-audit answer combinations dynamically calculates unique, highly divergent readiness percentages and program-appropriate skill gap recommendations without relying on hardcoded personas.

### Task 4.2: Integrate Automated Unit & Integration Testing Infrastructure
*   **Objective:** Install Vitest, React Testing Library, and Playwright to establish automated testing verification across critical business algorithms and onboarding user flows.
*   **Exact Affected Files / Modules:** New files in `tests/unit/` and `tests/e2e/`, `package.json:5-10`.
*   **Reason:** The repository currently possesses zero automated testing files (0% test coverage), making regressions inevitable as code complexity expands.
*   **Expected Benefit:** Establishes rigorous engineering reliability and Continuous Integration protection.
*   **Risk:** Zero risk to production code; requires team discipline to maintain test assertions.
*   **Effort:** M (2–3 days).
*   **Recommended Order:** Step 10.
*   **Acceptance Criteria:** Running `npm test` successfully executes >30 automated unit and integration tests covering readiness calculations, RLS middleware guards, and onboarding transitions with zero failures.

---

## Phase 5: Strengthen Privacy, Security, & Accessibility

*Objective:* Embed institutional data governance algorithms, eliminate bundle bloat from excessive client rendering, and refine accessibility compliance across dynamic interface components.

### Task 5.1: Engineer k-Anonymity Institutional Aggregation Filters
*   **Objective:** Build specialized statistical backend query aggregators that strip Personally Identifiable Information (PII) and enforce minimum cohort group thresholds ($N \ge 10$) before rendering institutional analytics.
*   **Exact Affected Files / Modules:** `frontend/app/admin/workforce-intelligence/page.tsx`, `frontend/app/admin/skill-gaps/page.tsx`, new file `src/domains/intelligence/aggregationService.ts`.
*   **Reason:** Current admin dashboards display hardcoded strings; piping real student demographic data without differential privacy filtering risks small-cohort student re-identification.
*   **Expected Benefit:** Guarantee real institutional data privacy compliance and robust institutional analytics.
*   **Risk:** SQL aggregation queries may experience slower query execution times if unindexed.
*   **Effort:** M (2–3 days).
*   **Recommended Order:** Step 11.
*   **Acceptance Criteria:** Querying admin institutional filters with fewer than 10 matching student profiles automatically suppresses detailed breakdown results to prevent individual profile reconstruction.

### Task 5.2: Restructure Next.js Server Components & Enhance Accessibility ARIA Announcements
*   **Objective:** Remove redundant `"use client"` directives from static layouts to restore React Server Components, and inject ARIA live region containers into dynamic auto-advancing micro-audit screens.
*   **Exact Affected Files / Modules:** All root route layout files (`layout.tsx`), `frontend/app/(public)/audit/page.tsx:64-100`.
*   **Reason:** Pervasive client-side rendering bloats JS bundles, while simulated calculation sequences fail to announce dynamic step changes to visually impaired screen-reader users.
*   **Expected Benefit:** Reduces initial browser JS payload sizes and achieves strict WCAG 2.1 AA screen-reader usability compliance.
*   **Risk:** Low risk; requires separating interactive form elements into targeted client-side subcomponents.
*   **Effort:** M (2 days).
*   **Recommended Order:** Step 12.
*   **Acceptance Criteria:** Production builds compile static analytical headers as server components; screen-reader evaluators confirm dynamic audit step progress is loudly voiced via `aria-live="polite"` attributes.

---

## Phase 6 & Phase 7: Controlled Pilot Preparation & Production Hardening

*Objective:* Execute deployment configurations, ingest live regional labor market feeds, establish runtime observability, and complete production load verification.

### Task 6.1: Build Data Engine Worker Pipeline (DOLE / TESDA Ingestion)
*   **Objective:** Implement modular Node.js/Python serverless background scheduling scripts to automatically scrape, normalize, and populate regional PEZA skill requirements into the taxonomy database.
*   **Exact Affected Files / Modules:** New worker scripts inside `data-engine/` (replacing the empty `.gitkeep` file).
*   **Reason:** Autonomous demand data ingestion is currently completely absent from executable project code.
*   **Expected Benefit:** Realizes the platform's documented real-time labor market intelligence engine capabilities.
*   **Effort:** XL (1–2 weeks).
*   **Recommended Order:** Step 13 (Pilot Preparation).
*   **Acceptance Criteria:** Running the ingestion script successfully ingests validated regional employment demand criteria directly into active PostgreSQL taxonomy tables without manual data entry.

### Task 7.1: Implement Observability Logging, Rate Limiting, & Load Staging
*   **Objective:** Integrate structured JSON logging (`pino`), configure API route rate-limiting protection against automated credential scraping, and execute load testing simulations on cloud staging servers.
*   **Exact Affected Files / Modules:** Root Next.js middleware, deployment configuration scripts (`vercel.json`), error boundary component catches.
*   **Reason:** Ensure system stability under high concurrent student traffic volumes during school registration cycles.
*   **Effort:** L (3–5 days).
*   **Recommended Order:** Step 14 (Final Production Hardening).
*   **Acceptance Criteria:** System maintains error-free responses under automated load testing simulating 1,000 concurrent student micro-audit executions while logging structured trace metrics to cloud observability monitoring dashboards.

---
*End of Refactoring Roadmap.*
