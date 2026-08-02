# RoarCast Final Route Matrix

This document provides an exhaustive matrix of all 36 compiled frontend routes in the RoarCast prototype application as verified by the Next.js production build compiler.

| Route Path | Render Type | State & Storage Integration | Truth-in-Demo Compliance Status |
| :--- | :--- | :--- | :--- |
| `/` | Static (○) | None (Public Landing) | Compliant |
| `/_not-found` | Static (○) | None | Compliant |
| `/audit` | Static (○) | `demoRepository` (`AuditData`, `AuditDraft`, Sample Mode) | Compliant (Simulated demand labeled) |
| `/signup` | Static (○) | `demoRepository` (`StudentProfile`, `ProfileDraft`, Prerequisite check) | Compliant (Sample mode badging) |
| `/results` | Static (○) | `demoRepository` (`ReadinessSnapshot`, Prerequisite redirection) | Compliant (Sample mode badging) |
| `/dashboard` | Static (○) | `demoRepository` (Profile & Snapshot loading, Prerequisite redirection) | Compliant (Sample mode badging) |
| `/explore` | Static (○) | None (Static Demo Catalog) | Compliant |
| `/explore/career-paths` | Static (○) | None | Compliant |
| `/explore/companies` | Static (○) | None (Simulated company signal matching) | Compliant |
| `/explore/industry-pulse` | Static (○) | None | Compliant |
| `/explore/trending-skills`| Static (○) | None | Compliant |
| `/learn` | Static (○) | `demoRepository` (Module completion check) | Compliant |
| `/learn/courses` | Static (○) | None (Static Course Listings) | Compliant |
| `/learn/courses/[courseId]` | Dynamic (ƒ) | None (Static routing lookup) | Compliant |
| `/learn/courses/[courseId]/modules/[moduleId]` | Dynamic (ƒ) | None | Compliant |
| `/learn/erp-foundations` | Static (○) | `demoRepository` (Module progression tracking) | Compliant |
| `/learn/squads` | Static (○) | None | Compliant |
| `/learn/squads/[squadId]` | Dynamic (ƒ) | None | Compliant |
| `/assessment/erp-workflow`| Static (○) | `demoRepository` (`AssessmentSubmissionResult`, score storage) | Compliant (Demo Quiz Passed label) |
| `/skills/erp-workflow` | Static (○) | None (Static Priority Skill Detail) | Compliant |
| `/squads/erp-fundamentals`| Static (○) | `demoRepository` (`SquadMember` list persistence) | Compliant |
| `/squads/match` | Static (○) | `demoRepository` (Matching logic via stored profile) | Compliant |
| `/credentials` | Static (○) | `demoRepository` (Credential inventory loading) | Compliant (Demo Record labels) |
| `/credentials/erp-workflow`| Static (○) | `demoRepository` (Credential saving & readiness bonus) | Compliant (Demo Completion Record) |
| `/credentials/portfolio` | Static (○) | `demoRepository` (Portfolio summary aggregation) | Compliant (Demo completion records) |
| `/credentials/verify/[credentialId]` | Dynamic (ƒ) | None / Mock parameter matching | Compliant (Sample Record disclaimer) |
| `/profile` | Static (○) | `demoRepository` (`StudentProfile` read/update) | Compliant (Demo badges) |
| `/profile/audit-history` | Static (○) | None (Mocked diagnostic timeline) | Compliant |
| `/profile/settings` | Static (○) | None (Prototype settings interface) | Compliant |
| `/admin` | Static (○) | None (Sample administrator analytics) | Compliant (Sample Data badges) |
| `/admin/institutions` | Static (○) | None (Sample partner institution list) | Compliant (Sample Institutions badge) |
| `/admin/peza-zones` | Static (○) | None (Sample industrial zone mappings)| Compliant |
| `/admin/profile` | Static (○) | None | Compliant |
| `/admin/reports` | Static (○) | None | Compliant |
| `/admin/settings` | Static (○) | None | Compliant |
| `/admin/skill-gaps` | Static (○) | None (Sample regional gap dataset) | Compliant (Sample Dataset badge) |
| `/admin/workforce-intelligence` | Static (○) | None (Sample macro analytics) | Compliant |
