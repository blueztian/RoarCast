import type { AuditQuestion } from "@/lib/storageTypes";

/**
 * Generates context-aware micro-audit questions customized to the student's degree and target career path.
 */
export function getContextAwareQuestions(degree: string, careerPath: string): AuditQuestion[] {
  const isAccounting = /Accounting|Accountancy|Finance/.test(degree);
  const isIT = /Computer Science|Information Technology/.test(degree);
  const isEngineering = /Engineering/.test(degree);
  
  const isAccountingPath = careerPath === "accounting-ops";
  const isSoftwarePath = careerPath === "software-dev";
  const isDataPath = careerPath === "data-analytics";
  const isEngineeringPath = ["engineering-ops", "manufacturing", "quality-control"].includes(careerPath);

  const questions: AuditQuestion[] = [];

  // ── Technical Q1 (Context-Aware) ──────────────────────────────────────────
  if (isAccountingPath || isAccounting) {
    questions.push({
      id: "t1",
      category: "technical",
      key: "industryTools",
      text: "How confident are you using accounting or ERP software?",
      subtitle: "e.g., SAP, QuickBooks, Oracle, Xero",
      type: "rating",
    });
  } else if (isSoftwarePath || isIT) {
    questions.push({
      id: "t1",
      category: "technical",
      key: "industryTools",
      text: "How confident are you with coding and software development?",
      subtitle: "e.g., web apps, APIs, databases, scripts",
      type: "rating",
    });
  } else if (isEngineeringPath || isEngineering) {
    questions.push({
      id: "t1",
      category: "technical",
      key: "industryTools",
      text: "How familiar are you with engineering tools and quality standards?",
      subtitle: "e.g., AutoCAD, technical documentation, QMS processes",
      type: "rating",
    });
  } else {
    questions.push({
      id: "t1",
      category: "technical",
      key: "industryTools",
      text: "How confident are you in the core technical skills for your field?",
      subtitle: "Tools, processes, and methods relevant to your target role",
      type: "rating",
    });
  }

  // ── Technical Q2 (Data & Reporting) ──────────────────────────────────────
  if (isDataPath || isAccounting || isIT) {
    questions.push({
      id: "t2",
      category: "technical",
      key: "dataSkills",
      text: "How confident are you using spreadsheet tools for workplace reporting?",
      subtitle: "e.g., Excel, spreadsheets, pivot tables, formulas",
      type: "rating",
    });
  } else {
    questions.push({
      id: "t2",
      category: "technical",
      key: "dataSkills",
      text: "How comfortable are you with basic data tracking and reporting?",
      subtitle: "Using spreadsheets, reading charts, tracking numbers",
      type: "rating",
    });
  }

  // ── Workplace Competencies ────────────────────────────────────────────────
  questions.push({
    id: "w1",
    category: "workplace",
    key: "teamwork",
    text: "How confident are you working in a professional team?",
    subtitle: "Collaboration, following procedures, meeting deadlines",
    type: "rating",
  });

  questions.push({
    id: "w2",
    category: "workplace",
    key: "communication",
    text: "How do you rate your professional communication?",
    subtitle: "Writing emails, presenting ideas, speaking in meetings",
    type: "rating",
  });

  // ── Digital Readiness ─────────────────────────────────────────────────────
  questions.push({
    id: "d1",
    category: "digital",
    key: "digitalComfort",
    text: "How comfortable are you with digital work tools?",
    subtitle: "Workspace office tools, Slack, Zoom, project apps",
    type: "choice",
    choices: [
      { value: "very", label: "Very comfortable" },
      { value: "somewhat", label: "Somewhat comfortable" },
      { value: "basic", label: "Basic tools only" },
      { value: "limited", label: "Limited exposure" },
    ],
  });

  // ── Industry Exposure ─────────────────────────────────────────────────────
  questions.push({
    id: "e1",
    category: "exposure",
    key: "hasInternship",
    text: "Have you completed any internship or on-the-job training?",
    type: "yesno",
  });

  questions.push({
    id: "e2",
    category: "exposure",
    key: "hasCertification",
    text: "Do you hold any industry certification or short course completion?",
    subtitle: "e.g., TESDA, NCII, online certifications, professional workshops",
    type: "yesno",
  });

  return questions;
}
