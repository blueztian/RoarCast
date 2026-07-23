export type AuditAnswer = "Confident" | "Some experience" | "Familiar" | "Not yet";

export interface AuditQuestion {
  id: string;
  skillTag: string;
  prompt: string;
}

export const auditAnswerOptions: AuditAnswer[] = [
  "Confident",
  "Some experience",
  "Familiar",
  "Not yet",
];

// 10 mock questions calibrated for an Accounting Information System student.
export const mockAuditQuestions: AuditQuestion[] = [
  {
    id: "q1",
    skillTag: "Basic Accounting",
    prompt: "How comfortable are you recording journal entries and posting to a general ledger?",
  },
  {
    id: "q2",
    skillTag: "Spreadsheet Fundamentals",
    prompt: "How comfortable are you building a spreadsheet from scratch with formulas and formatting?",
  },
  {
    id: "q3",
    skillTag: "Advanced Excel",
    prompt: "How comfortable are you with pivot tables, VLOOKUP/XLOOKUP, and conditional formatting?",
  },
  {
    id: "q4",
    skillTag: "ERP Workflow",
    prompt: "How much hands-on time have you had inside an ERP system like SAP or Oracle NetSuite?",
  },
  {
    id: "q5",
    skillTag: "Financial Documentation",
    prompt: "How comfortable are you preparing supporting documents for an audit trail?",
  },
  {
    id: "q6",
    skillTag: "Reporting & Visualization",
    prompt: "How comfortable are you turning raw financial data into a report someone else can act on?",
  },
  {
    id: "q7",
    skillTag: "Reconciliation",
    prompt: "How comfortable are you reconciling bank statements against internal records?",
  },
  {
    id: "q8",
    skillTag: "ERP Workflow",
    prompt: "How familiar are you with approval workflows for purchase orders or reimbursements?",
  },
  {
    id: "q9",
    skillTag: "Operational Data Handling",
    prompt: "How comfortable are you cleaning up messy, inconsistent data before reporting on it?",
  },
  {
    id: "q10",
    skillTag: "Financial Documentation",
    prompt: "How comfortable are you explaining a variance in the numbers to a non-finance manager?",
  },
];
