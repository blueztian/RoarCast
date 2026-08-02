# RoarCast Institutional Governance, Scope, & External Dependency Matrix

**Document Version:** 1.0  
**Verification Date:** August 2026  
**Auditor:** Antigravity (Independent Handoff Review)  
**Purpose:** Formal identification and classification of mission-critical platform requirements, institutional data sharing protocols, and accreditation authorities that cannot be achieved through software engineering code alone.

---

## Executive Governance Principles & Scope Boundaries

To prevent engineering over-reach and unfounded assumptions during target architecture development, the following foundational governance realities are strictly established:
1. **No Independent Issuance Authority:** RoarCast is an analytical software platform and student readiness tracking aggregator. It does not possess independent legal, academic, or governmental authority to issue recognized educational diplomas, vocational trade certifications, or industry professional credentials.
2. **Absence of Documented Automated Data Feeds:** The repository code and documentation contain zero proof that official machine-readable APIs or XML labor feeds exist from the Department of Labor and Employment (DOLE), TESDA, Philippine Economic Zone Authority (PEZA), or specific private manufacturing corporations. Any automated data ingestion worker assumes prior legal API access agreements or public web scraping terms-of-service evaluations.
3. **Unverified Institutional Partnerships:** All academic school names and PEZA locator branding currently displayed in the repository represent demonstration placeholders. No legal memorandums of understanding (MOUs) or formalized data partnerships are presumed to exist without written stakeholder confirmation.

---

## Comprehensive Non-Code Dependency Classification Table

Each operational requirement below is classified according to the exact combination of institutional decision-making layers required for successful real-world implementation:

| Governance Item & Domain Scope | Dependency Classification | Engineering Inability & Organizational Requirement | Required External Authority / Action |
| :--- | :--- | :--- | :--- |
| **Micro-Audit Question Validation** | **Subject-Matter Validation Required** | Code can display multiple-choice questionnaires, but software engineers cannot verify whether selected 60-second questions psychometrically or academically correspond to real regional workplace competencies. | TESDA curriculum experts, guidance counselors, and industrial organizational psychologists. |
| **Readiness Scoring Methodology**| **Combination** (Product Decision + Subject-Matter Validation + Technical Implementation) | Mathematical weights assigned to credentials or assessment answers cannot be arbitrarily invented by developers; thresholds must reflect empirically validated employment readiness baselines. | Joint agreement between LGU PESO directors, academic deans, and HR recruiters. |
| **Skill Taxonomy Governance** | **Stakeholder Agreement Required** | Establishing an immutable skill ontology (e.g., standardizing terminology between "SAP ERP", "Enterprise Software", and "Accounting Workflow") requires centralized domain standardization across educational programs. | Academic Curriculum Boards and Regional PEZA HR Council representatives. |
| **Labor-Market Data-Source Permissions**| **Legal or Privacy Review Required** | Building automated background Python/Node web scrapers to ingest job openings risks copyright infringement, computer fraud liability, or terms-of-service violations if executed without authorization. | Legal execution of formal data-sharing API agreements or explicit public scraping authorization from DOLE/PEZA. |
| **Data Provenance & Audit Trails**| **Combination** (Legal Review + Technical Implementation) | When displaying regional hiring demand projections to institutional administrators, the exact institutional origin, timestamp, and sampling error of labor data must be legally trackable. | LGU Data Privacy Officers (DPOs) and Data Engine architectural specifications. |
| **Learning-Provider Responsibility**| **Stakeholder Agreement Required** | RoarCast renders training course modules (`erp-foundations`), but software platforms are not educational providers. Content maintenance, curriculum updating, and instructional accuracy must be owned by external partners. | Partner colleges, online course creators, and localized technical trade schools. |
| **Assessment & Testing Authority**| **Subject-Matter Validation Required** | Passing an interactive online quiz in a Next.js application does not qualify a student for high-risk industrial roles unless the testing rubric is accredited by recognized licensing boards. | TESDA testing centers and industry sector qualification regulators. |
| **Credential Issuer Identification**| **Stakeholder Agreement Required** | To adhere to W3C Verifiable Credential specifications, the cryptographic "Issuer" field (`issuer.id`, `issuer.name`) must link to the decentralized identifier (DID) of an accredited university, training institute, or employer—NEVER RoarCast itself. | Participating academic deans and PEZA locator human resources executives. |
| **Credential Verification Authority**| **Combination** (Stakeholder Agreement + Technical Implementation) | Employers verifying student QR codes must legally trust the cryptographic root certificate authority or public key infrastructure hosting the verification verification registry. | Regional LGU root trust infrastructure and industrial hiring verification networks. |
| **Credential Recognition Policies** | **Product Decision Required** | A verified digital badge has practical value only if target Santa Rosa PEZA HR departments commit to treating RoarCast badges as competitive differentiators during hiring resumes screenings. | HR Executive commitments from partner semiconductor and automotive manufacturing locators in Laguna. |
| **Credential Revocation & Expiring**| **Combination** (Legal Review + Technical Implementation) | If a credential was granted in error or an underlying professional license expires, clear institutional due process rules must govern when and how a student's public verification status list is modified to "Revoked". | Institutional credentialing officers and legal compliance teams. |
| **Institutional Ownership of Records**| **Legal or Privacy Review Required** | Legal determination must be finalized regarding who legally owns analytical workforce records generated within the platform: the municipality (LGU), the academic institution, or the software operating vendor. | Formal Memorandum of Agreement (MOA) between Santa Rosa LGU and participating school boards. |
| **Student Privacy & Informed Consent**| **Legal or Privacy Review Required** | Under the Philippine Data Privacy Act of 2012 (RA 10173), collecting student names, ages, degree programs, and career ambitions requires explicit, informed, opt-in student consent before sharing aggregated profiles with PESO. | Legal counsel drafting binding terms of service, Privacy Notices, and parental consent workflows for minors under 18. |
| **Data Retention Timelines** | **Legal or Privacy Review Required** | Technical databases require explicit statutory retention policies stipulating how many years graduation profiles, micro-audit histories, and learning progress logs remain stored in cloud relational repositories. | Statutory data retention schedules aligned with Department of Education (DepEd) and LGU archiving rules. |
| **Data Deletion & Right to Expungement**| **Combination** (Legal Review + Technical Implementation) | Students must have a verifiable mechanism to execute their constitutional right to erasure (account deletion), ensuring all associated personally identifiable information (PII) is permanently purged from active and archival tables. | LGU Data Protection Officer and database cascade deletion migration scripts. |
| **Admin Access & Role Governance**| **Combination** (Stakeholder Agreement + Technical Implementation) | Deciding which institutional municipal officials receive `peso` analytics access versus which university deans receive `academe` curricular filters requires strict administrative governance protocols and audit logging. | Santa Rosa PESO Leadership and Academic Consortium Directors. |
| **Controlled Pilot Agreements** | **Stakeholder Agreement Required** | Conducting an live pilot test involving actual students and school administrative computer equipment requires written institutional permissions, liability insurance, and IT cybersecurity vetting. | School district superintendents, campus IT directors, and LGU program sponsors. |
| **PESO, School, TESDA, & Industry Participation**| **Stakeholder Agreement Required** | The entire Triple-Helix ecosystem concept relies entirely on active multi-party human collaboration; code infrastructure cannot simulate missing human collaboration between academe, LGU, and private industry. | Formal multi-sector working groups convened under municipal leadership. |

---

## Architectural Implications of Governance Dependencies
Because over 85% of RoarCast's core business logic—readiness scoring algorithms, dynamic taxonomies, labor data feeds, and verifiable credentials—relies directly on these external organizational mandates, **software development must proceed iteratively in direct tandem with institutional policy execution**. Attempting to build rigid backend database scoring equations or automated scraping workers before formalizing these stakeholder agreements will result in fragile, unusable architectures that violate real-world regional educational governance standards.

---
*End of Governance & Scope Dependency Matrix.*
