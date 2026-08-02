# RoarCast Runtime User Journey & Business Logic Flow Trace

**Document Version:** 1.0  
**Verification Date:** August 2026  
**Auditor:** Antigravity (Independent Handoff Verification)  
**Purpose:** Comprehensive executable code path tracing across public onboarding, student learning, credential verification, and institutional administrative dashboards.

---

## 1. Executable Flow A: Public Onboarding & Micro-Audit Journey

### 1.1 Step-by-Step Flow Execution
```
[Landing (/)] ──(A1: Duplicate In-Page State Machine)──> [In-Page Audit] ──> [In-Page Signup] ──> [In-Page Snapshot]
      │
      └──(A2: Dedicated Route Workflow)──> [/audit] ──> [/signup] ──> [/results] ──> [/dashboard]
```

*   **Step 1: Landing Page (`/`)**
    *   *Entry File & Components:* `app/(public)/page.tsx` (1,138 lines), utilizing `AnimatedHero`, `HeroSignalField`, and `FloatingNavbar`.
    *   *State Read & Written:* Reads local component state (`Stage = "landing"`). No persistent state is read on initial render.
    *   *Navigation & Duplication Warning:* Contains **two competing user flows**. Clicking "Start Audit" on the hero either triggers an embedded in-page state machine (`setStage("audit")`) or links out to dedicated routes (`/audit` and `/signup`), representing severe architectural workflow duplication.
    *   *Validation & Persistence:* None. Completely static presentation until user interaction occurs.
*   **Step 2: 60-Second Micro-Audit (`/audit`)**
    *   *Entry File & Components:* `app/(public)/audit/page.tsx` (138 lines) and `components/AuditQuestion.tsx`.
    *   *State Mechanics:* Manages an index counter (`currentQuestionIndex`). When the user clicks any answer option, it pushes the option string into a temporary React state array (`selectedAnswers`).
    *   *Scoring & Simulation Truth:* **Zero answer evaluation occurs.** Upon reaching question 5, clicking Complete invokes `handleComplete()`, which triggers a simulated visual timer (`setTimeout(() => router.push("/results"), 750)`). Selected answer choices are completely discarded upon routing and do not alter readiness metrics.
*   **Step 3: Account Creation & Onboarding (`/signup`)**
    *   *Entry File & Components:* `app/(public)/signup/page.tsx` (217 lines).
    *   *State Read & Written:* Reads input text fields (Name, Age, School, Degree Program). On submit, executes direct browser storage mutation: `window.localStorage.setItem("roarcast_student", JSON.stringify({ name, school, degree, careerPath }))`.
    *   *Validation & Security:* Minimal frontend form completion checking. Zero server-side validation, zero schema verification, and zero password authentication are implemented.
*   **Step 4: Readiness Snapshot & Transition to Dashboard (`/results` $\rightarrow$ `/dashboard`)**
    *   *Entry File & Components:* `app/(student)/results/page.tsx` (108 lines), utilizing `ReadinessRing`.
    *   *State Read:* Reads `localStorage.getItem("roarcast_student")`. If absent, defaults to Jana Cruz's hardcoded Accounting profile.
    *   *Behavior Upon Refresh / New Device:* Refreshing an active browser tab maintains local storage state. However, opening a **new browser tab in incognito** or navigating from an **external mobile device** completely loses all profile state, immediately reverting the display to hardcoded demo defaults.

---

## 2. Executable Flow B: Student Navigation Hubs (Dashboard $\rightarrow$ Explore $\rightarrow$ Learn $\rightarrow$ Squads $\rightarrow$ Credentials $\rightarrow$ Profile)

1.  **Student Dashboard (`/dashboard` - `app/(student)/dashboard/page.tsx`):**  
    *   *Mechanics:* Primary application portal. Calls `computeReadiness()` from `studentState.ts`, which returns either **72%** (default) or **81%** (if a credential has been awarded in local storage). Renders Jana Cruz's Accounting Information System persona regardless of what academic degree program was inserted during `/signup`.
2.  **Explore Hub & Regional Industry Pulse (`/explore/*`):**  
    *   *Mechanics:* Read-only demonstration dashboards (`explore/page.tsx`, `industry-pulse/page.tsx`, `companies/page.tsx`). Pulls entirely from static TypeScript array definitions in `data/industryPulse.ts` and `data/mockDemand.ts`. Zero live DOLE or TESDA APIs are contacted.
3.  **Learn Page & Module Progress Tracking (`/learn/*`):**  
    *   *Mechanics:* Interactive training catalog (`learn/page.tsx`, `erp-foundations/page.tsx`). When a student clicks "Complete Chapter" inside a course module, the view calls `completeModule("erp-foundations", "module-1")` in `studentState.ts`, appending the module ID to `localStorage["roarcast_module_progress"]`.
4.  **Co-Op Upskilling Squads (`/squads` vs. `/learn/squads`):**  
    *   *Mechanics & Routing Duplication:* Maintains **duplicate routing paths** (`app/(student)/squads/` and `app/(student)/learn/squads/`). Both trees render visual placeholders of peer study groups. There is zero real-time WebSocket communication, peer matching, or database team synchronization.
5.  **Profile & Settings Management (`/profile/*`):**  
    *   *Mechanics:* Profile display (`profile/page.tsx`) and local settings (`profile/settings/page.tsx`). Provides an interactive button labeled "Reset Application Demo State," which calls `window.localStorage.clear()`, wiping all localized progress and forcing the interface back to initial prototype defaults.

---

## 3. Technical Deep-Dive: Micro-Audit & Readiness Calculation Mechanics

### 3.1 Audit Question Definition & Branching Reality
*   **Question Source Location:** Static array exported from `frontend/data/mockAuditQuestions.ts:1-68`.
*   **Question Variety & Branching:** Contains exactly 5 standardized multiple-choice items asking about digital tool familiarity, Excel competency, teamwork preferences, communication styles, and career enthusiasm.
*   **Degree / Pathway Customization:** In dedicated route `/audit`, **questions do not differ by degree or career pathway**; all users answer the identical 5 questions. (Note: The embedded duplicate state machine in `(public)/page.tsx:111-200` defines a custom regex function `getQuestions(degree)` that swaps in two basic finance strings if `/Accounting|Finance/.test(degree)`, but this logic is bypassed in dedicated route flows).

### 3.2 Executable Readiness Calculation Pseudocode
The current readiness algorithm contained in `frontend/lib/studentState.ts:220-226` operates entirely independent of assessment inputs:

```typescript
// VERBATIM RUNTIME MECHANICS (NOT INTENDED FUTURE ENGINE)
const BASE_READINESS = 72;        // Hardcoded constant at line 220
const CREDENTIAL_BONUS = 9;       // Hardcoded constant at line 221

export function computeReadiness(): number {
    // 1. Check browser localStorage for awarded credential string
    const existingCredential = window.localStorage.getItem("roarcast_credential");
    
    // 2. Return hardcoded threshold sum regardless of student audit answers or degree
    if (existingCredential !== null && existingCredential !== "") {
        return BASE_READINESS + CREDENTIAL_BONUS; // Permanently returns 81%
    } else {
        return BASE_READINESS;                     // Permanently returns 72%
    }
}

// Priority Skill Gap Determination (In data/mockSkills.ts:74)
export const prioritySkillGap = {
    id: "erp-workflow",
    title: "ERP Systems & Workflow Optimization",
    level: "High Priority Gap"
}; // Permanently forces ERP Workflow for all user personas
```

---

## 4. Technical Deep-Dive: Credential Issuance & Verification Flow (Flow C)

### 4.1 Issuance Mechanics & Local Storage Vulnerability
*   **Issuance Trigger Condition:** Inside `app/(student)/credentials/erp-workflow/page.tsx:280`, when a user clicks the "Claim Professional Credential" button, the component invokes `earnCredential(profile.name)` from `studentState.ts:180-191`.
*   **ID Generation & Uniqueness:** **IDs are neither dynamically generated nor unique.** The function always hardcodes and writes an identical object to browser storage: `localStorage.setItem("roarcast_credential", JSON.stringify({ id: "RC-ERP-2026-01842", name: "ERP Systems Foundation", date: "August 2026" }))`.
*   **Developer Tool Tampering Risk:** Because credentials rely purely on unencrypted local browser storage without cryptographic JWT signing or server database verification, an unauthenticated user can open browser Developer Tools (Console / Application Tab) and manually execute `localStorage.setItem("roarcast_credential", JSON.stringify({ id: "RC-ADVANCED-100", name: "Certified Executive Director" }))` to fraudulently award themselves unearned badges and artificially boost their displayed readiness percentage to 81%.

### 4.2 Verification Route Anatomy & Decorative QR Truth
When navigating to the credential verification screen at `/credentials/verify/[credentialId]`:

| Evaluation Criterion | Actual Runtime Code Behavior in `verify/[credentialId]/page.tsx` |
| :--- | :--- |
| **QR Code Encoding Truth**| **Decorative Static Icon Only.** Renders `<QrCode size={130} />` imported directly from the `lucide-react` graphics library. It encodes zero URLs, DIDs, JSON-LD schemas, or binary verification strings. It is visually indistinguishable from a simple graphic photo. |
| **URL Parameter Validation** | **Bypassed / Unchecked.** The Next.js dynamic path parameter `[credentialId]` is completely ignored by component logic. Whether a visitor accesses `/verify/RC-ERP-2026-01842` or `/verify/COMPLETE-FAKE-RANDOM-STRING`, the page renders identical static approval text: *"Verified Valid RoarCast Credential / ERP Workflow Foundation."* |
| **Cryptographic Assurance**| **Complete Absence.** Zero digital signatures, public key cryptography hashes, Open Badge v3 JSON metadata, issuer revocation registries, or Supabase backend verification queries exist anywhere in the application. |

---

## 5. Technical Deep-Dive: Admin Security & Institutional Data Access (Flow D)

### 5.1 Route Guarding & Authentication Verification
*   **Evaluated Paths:** `/admin`, `/admin/workforce-intelligence`, `/admin/skill-gaps`, `/admin/institutions`, `/admin/peza-zones`.
*   **Authentication & Session Middleware Status:** **Missing.** Static verification confirms zero Next.js root routing middleware (`middleware.ts`), session checkers, or role verification wrappers (`role === "admin" | "academe" | "peso"`) exist in the project codebase.
*   **Execution Behavior:** Any user (including unauthorized students or anonymous external internet visitors) who directly inputs any `/admin/*` URL into their browser address bar immediately receives the full compiled client-side analytical interface without encountering a login screen or permission check.

### 5.2 Context-Sensitive Security & Risk Assessment
To maintain precise engineering rigor without exaggerating vulnerability severities, operational security risks are strictly classified according to the deployed runtime context:

```
+---------------------------------------------------------------------------------------+
|                 DEPLOYMENT-CONTEXT-SENSITIVE SECURITY RISK SCHEDULE                  |
+----------------------------------------+----------------------------------------------+
| Operating Deployment Context           | Verified Risk Rating & Justification         |
+----------------------------------------+----------------------------------------------+
| 1. Local Offline Hackathon Demo        | ZERO RISK / INFORMATIONAL ONLY               |
|    (Running via `npm run dev` on local | Because all admin metrics are hardcoded      |
|    presentation laptops)               | sample strings ("12,450 students"), zero PII |
|                                        | is stored or accessible.                     |
+----------------------------------------+----------------------------------------------+
| 2. Public Sample-Data Web Deployment   | LOW RISK (Design / Trust Smells Only)        |
|    (Vercel preview link hosting only   | External users can view the demo admin UI,   |
|    default mock data)                  | but no real student records or confidential  |
|                                        | PEZA data can be breached or modified.       |
+----------------------------------------+----------------------------------------------+
| 3. Controlled School / LGU Pilot       | CRITICAL SECURITY VULNERABILITY (P0)         |
|    (Receiving real student PII and     | Introducing live student demographic data or |
|    connecting to transactional DBs)    | database connections without route auth      |
|                                        | instantly exposes institutions to immediate  |
|                                        | regulatory PII disclosure and data breaches. |
+----------------------------------------+----------------------------------------------+
```

---
*End of Runtime Flow Trace.*
