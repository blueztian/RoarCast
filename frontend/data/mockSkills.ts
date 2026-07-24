import type { Trend } from "./mockDemand";

export type ReadinessCategory = "ready" | "strengthen" | "priority";

export interface SkillResult {
  id: string;
  name: string;
  category: ReadinessCategory;
  readiness: number; // 0-100
  demand: "High Demand" | "Rising" | "Steady";
  trend: Trend;
  why: string;
}

export const overallReadiness = 72;

export const mockSkillResults: SkillResult[] = [
  {
    id: "s1",
    name: "Basic Accounting",
    category: "ready",
    readiness: 88,
    demand: "Steady",
    trend: "steady",
    why: "You're seeing Basic Accounting marked ready because your audit responses showed confidence recording entries and reconciling ledgers, matching the baseline most Accounting Operations roles expect on day one.",
  },
  {
    id: "s2",
    name: "Spreadsheet Fundamentals",
    category: "ready",
    readiness: 91,
    demand: "Steady",
    trend: "steady",
    why: "Spreadsheet Fundamentals is ready because you indicated strong comfort building formulas and formatting from scratch, which local employers treat as a baseline rather than a differentiator.",
  },
  {
    id: "s3",
    name: "Financial Documentation",
    category: "ready",
    readiness: 79,
    demand: "Steady",
    trend: "steady",
    why: "You're ready here because your responses on audit trails and variance explanations suggest you can already support most documentation requests without close supervision.",
  },
  {
    id: "s4",
    name: "Advanced Excel",
    category: "strengthen",
    readiness: 61,
    demand: "High Demand",
    trend: "high",
    why: "You're seeing Advanced Excel because it appears in nearly every Accounting Operations posting in Santa Rosa, while your audit suggests partial exposure to pivot tables and lookup formulas rather than daily fluency.",
  },
  {
    id: "s5",
    name: "Reporting & Visualization",
    category: "strengthen",
    readiness: 58,
    demand: "Rising",
    trend: "rising",
    why: "Reporting & Visualization is flagged to strengthen because demand for turning raw data into decision-ready reports is climbing locally, and your audit suggests you're still building fluency translating numbers into a narrative.",
  },
  {
    id: "s6",
    name: "ERP Workflow",
    category: "priority",
    readiness: 34,
    demand: "High Demand",
    trend: "rising",
    why: "You're seeing ERP Workflow because it appears frequently in opportunities related to Accounting Operations, while your audit suggests limited hands-on exposure to ERP systems and approval workflows.",
  },
];

export const readinessSummary = {
  ready: mockSkillResults.filter((s) => s.category === "ready"),
  strengthen: mockSkillResults.filter((s) => s.category === "strengthen"),
  priority: mockSkillResults.filter((s) => s.category === "priority"),
};

export const priorityGap = mockSkillResults.find((s) => s.category === "priority")!;
