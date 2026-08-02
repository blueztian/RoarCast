# RoarCast Remaining Pilot Blockers & Future Architecture Horizons

While the frontend prototype now features a fully stabilized, fault-tolerant demonstration repository and canonical onboarding journey, several mission-critical technical and institutional blockers must be addressed prior to initiating any live student or employer pilot deployment.

---

## 1. Backend Persistence & Database Infrastructure
* **Current Limitation**: All student profiles, readiness diagnostics, upskilling progress, and credential records are stored exclusively within client-side browser storage (`localStorage`) using simulated versioned envelopes. Data does not persist across separate devices, browsers, or cleared caches.
* **Remediation Requirement**: Implement a persistent backend service (e.g., Node.js/Express, Go, or Serverless functions) connected to a transactional relational database (PostgreSQL) or managed document store to handle user profiles and state transitions securely.

---

## 2. Authentication & Authorization Framework
* **Current Limitation**: The system lacks real authentication. Access to administrative monitoring suites (`/admin/*`) and restricted student domains relies solely on client-side route redirection without cryptographic identity verification or session tokens.
* **Remediation Requirement**: Integrate a formal OAuth2 / OIDC identity provider (e.g., NextAuth.js, Auth0, or Supabase Auth) with strict role-based access control (RBAC) differentiating standard students, academic administrators, and industry verifying partners.

---

## 3. Dependency Security Remediations
* **Current Limitation**: As documented in the npm vulnerability audit, the baseline dependencies contain 2 production high-severity vulnerabilities linked to existing pins of Next.js and PostCSS.
* **Remediation Requirement**: Execute a major-version upgrade and regression QA pass across Next.js and build toolchains to ensure zero known CVEs before production exposure.

---

## 4. Live Workforce Data Engine & Signal Ingestion
* **Current Limitation**: Employer demand signals, regional skill gaps, and industry trend analytics are currently rendered from curated demonstration dictionaries and static JSON fixtures.
* **Remediation Requirement**: Build an automated labor-market intelligence scraping and data sanitization pipeline capable of aggregating verified vacancy metrics from local economic zones and corporate HR APIs.

---

## 5. Formal Institutional Accreditation & Verifiable Credentials
* **Current Limitation**: Demonstration completion records and scanned QR codes represent self-contained prototype acknowledgments with explicit educational disclaimers.
* **Remediation Requirement**: Establish bilateral formal agreements with accredited academic institutions, government bodies (TESDA / PQF frameworks), and enterprise employers, backed by cryptographically signed verifiable credentials (W3C standard / JWT proof strings) stored in tamper-proof verification registries.
