export type Trend = "high" | "rising" | "steady";

export interface DemandSignal {
  id: string;
  skill: string;
  trend: Trend;
  label: string;
  sector: string;
}

// Mock live demand signals for Santa Rosa, Laguna employers.
// Feeds the hero floating chips and the "Live Skill Signals" ticker.
export const mockDemand: DemandSignal[] = [
  { id: "d1", skill: "Advanced Excel", trend: "high", label: "High Demand", sector: "Accounting & Finance" },
  { id: "d2", skill: "ERP Systems", trend: "rising", label: "Rising", sector: "Accounting Operations" },
  { id: "d3", skill: "Quality Control", trend: "rising", label: "Rising", sector: "Manufacturing" },
  { id: "d4", skill: "PLC Fundamentals", trend: "high", label: "High Demand", sector: "Industrial Automation" },
  { id: "d5", skill: "Financial Reporting", trend: "high", label: "High Demand", sector: "Accounting & Finance" },
  { id: "d6", skill: "Inventory Reconciliation", trend: "steady", label: "Steady", sector: "Logistics" },
  { id: "d7", skill: "Lean Manufacturing", trend: "rising", label: "Rising", sector: "Manufacturing" },
  { id: "d8", skill: "Data Visualization", trend: "rising", label: "Rising", sector: "Business Analytics" },
  { id: "d9", skill: "Payroll Systems", trend: "steady", label: "Steady", sector: "Accounting Operations" },
  { id: "d10", skill: "Process Documentation", trend: "high", label: "High Demand", sector: "Quality Assurance" },
];
