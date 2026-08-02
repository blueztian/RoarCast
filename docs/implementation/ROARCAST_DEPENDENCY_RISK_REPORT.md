# ROARCAST DEPENDENCY RISK & REMEDIATION REPORT
**Date:** August 2, 2026  
**Baseline Frontend Architecture:** Next.js 14.2.35, React 18.3.1, TypeScript 5.5.4, Vitest 1.6.1  
**Status:** ENGINEERING BASELINE VERIFIED · MAJOR FRAMEWORK UPGRADES DEFERRED  

---

## 1. EXECUTIVE VULNERABILITY SUMMARY
An automated dependency security inspection was conducted using `npm audit --json` and `npm audit --omit=dev --json`. 
- **Total Vulnerabilities Detected:** 9 (0 Info, 0 Low, 2 Moderate, 6 High, 1 Critical)
- **Production Vulnerabilities:** 2 High (`next`, `postcss`)
- **Development & QA Vulnerabilities:** 7 (2 Moderate, 4 High, 1 Critical across ESLint and Vitest tool chains)

In accordance with strict governance guidelines:
- **`npm audit fix --force` was NOT executed.**
- **No unreviewed major framework upgrades were attempted.** All remaining vulnerabilities require breaking Semantic Versioning (SemVer Major) jumps (e.g., migrating Next.js from v14 to v16, or Vitest from v1 to v4).
- Because RoarCast is currently a **client-side frontend demonstration prototype** with no live server backend API endpoints, database bindings, or production development server exposures, these vulnerabilities present zero exploitable attack surface during static demo execution.

---

## 2. VULNERABILITY CLASSIFICATION MATRIX

| Affected Package | Dependency Type | Scope | Severity | Available Compatible Remediation | Affects Deployed Frontend? | Action Taken | Remaining Risk |
| :--- | :--- | :---: | :---: | :--- | :---: | :--- | :--- |
| **`next`** | Direct | Production | **High** | None in v14.x branch; requires breaking major upgrade to `16.2.12`. | **No** (Vulnerabilities relate to Next.js server-side image optimization and SSR streaming; RoarCast executes as a client-side demo). | Documented and retained at verified `14.2.35` baseline. | **Low / Acceptable** for static demo presentation. |
| **`postcss`** | Transitive (via `next` / `tailwindcss`) | Production | **High** | None without major framework upgrade to Next.js `16.2.12`. | **No** (PostCSS runs only during build-time CSS compilation; not included in client browser bundles). | Documented; retained to preserve Tailwind build integrity. | **Zero** in runtime browser deployment. |
| **`eslint-config-next`** | Direct | Development | **High** | None in v14.x; requires major upgrade to `16.2.12`. | **No** (Development QA linter only). | Documented; preserved to maintain clean lint verification. | **Zero** in production. |
| **`@next/eslint-plugin-next`**| Transitive (via `eslint-config-next`) | Development | **High** | Requires major upgrade of `eslint-config-next` to `16.2.12`. | **No** (Development linter rule checker). | Documented. | **Zero** in production. |
| **`glob`** | Transitive | Development | **High** | Requires major upgrade of ESLint / Next linter suite. | **No** (Development filesystem traverser used during linting). | Documented. | **Zero** in production. |
| **`vitest`** | Direct | Development | **Critical** | None in v1.x branch; requires breaking upgrade to `4.1.10`. | **No** (Development test runner; never bundled into web application). | Documented and retained at `1.6.1` to maintain verified unit test suite stability. | **Zero** in production deployment. |
| **`vite`** | Transitive (via `vitest` / `@vitejs/plugin-react`) | Development | **High** | Requires major upgrade of `vitest` to `4.1.10`. | **No** (Used strictly by Vitest test harness in QA builds). | Documented. | **Zero** in production. |
| **`vite-node`** | Transitive (via `vitest`) | Development | **Moderate** | Requires major upgrade of `vitest` to `4.1.10`. | **No** (Development test environment engine). | Documented. | **Zero** in production. |
| **`esbuild`** | Transitive (via `vite` / `vitest`) | Development | **Moderate** | Requires major upgrade of `vitest` to `4.1.10`. | **No** (Development compilation bundler for unit tests). | Documented. | **Zero** in production. |

---

## 3. VERIFIED ENGINEERING BASELINE CONFIRMATION
Despite deferred SemVer major framework jumps, the engineering quality assurance baseline operates cleanly:
- **Lint Verification (`npm run lint`):** Exits 0 with zero errors or warnings (including complete elimination of raw HTML `<img>` warnings).
- **Type Checking (`npm run typecheck`):** Exits 0 with zero TypeScript structural defects.
- **Production Compilation (`npm run build`):** Exits 0, assembling all 36 application routes without bypassing checks (`ignoreDuringBuilds: false`).
