/**
 * industryPulse.ts
 *
 * Shared data for the Santa Rosa Industry Pulse feature.
 * This data is consumed by /explore/industry-pulse, /explore/trending-skills,
 * /explore/peza-zones, and any other analytics-oriented pages.
 *
 * DO NOT import this into /dashboard (Home).
 * Home only surfaces one personalized market signal from here.
 */

export const industryPulseStats = {
  opportunities: "1,284",
  employers: "132",
  zones: "5",
  updated: "2 hours ago",
  zoneChips: [
    "Laguna Technopark",
    "Technopark Annex",
    "LIIP",
    "Greenfield Automotive Park",
    "Toyota Santa Rosa SEZ",
  ],
};

export const skillsDemandData = [
  {
    rank: 1,
    name: "SAP ERP",
    growth: "+24%",
    progress: 85,
    description:
      "Enterprise resource planning software used to manage finance, inventory, and operations across departments.",
  },
  {
    rank: 2,
    name: "Advanced Excel",
    growth: "+18%",
    progress: 70,
    description:
      "Formulas, pivot tables, and macros used for data analysis, reporting, and financial modeling.",
  },
  {
    rank: 3,
    name: "PLC Programming",
    growth: "+16%",
    progress: 65,
    description:
      "Programming programmable logic controllers that automate manufacturing and industrial equipment.",
  },
  {
    rank: 4,
    name: "Quality Assurance",
    growth: "+13%",
    progress: 55,
    description:
      "Testing and validating products or processes to meet consistent quality and compliance standards.",
  },
  {
    rank: 5,
    name: "Power BI",
    growth: "+11%",
    progress: 45,
    description:
      "Business intelligence tool for building dashboards and visualizing data trends for decision-making.",
  },
];

export const roleIntelligenceCards = [
  {
    role: "Junior Accounting Operations Associate",
    opportunities: 47,
    match: 72,
    skillTags: ["SAP ERP", "Excel", "Reconciliation", "ERP Systems"],
    metadata: { demand: "High demand", location: "Laguna Technopark", employers: 28 },
  },
  {
    role: "Finance Operations Analyst",
    opportunities: 31,
    match: 65,
    skillTags: ["Excel", "Power BI", "ERP", "Financial Reporting"],
    metadata: { demand: "Medium demand", location: "Technopark Annex", employers: 19 },
  },
  {
    role: "Supply Chain Data Assistant",
    opportunities: 26,
    match: 58,
    skillTags: ["Excel", "Data Analysis", "Power BI", "SAP ERP"],
    metadata: { demand: "Medium demand", location: "Greenfield Automotive Park", employers: 15 },
  },
];

export const hiringCompanies = [
  { name: "P&G",              industry: "FMCG",             zone: "Laguna Technopark",         openings: 12, domain: "pg.com" },
  { name: "Colgate-Palmolive", industry: "FMCG",             zone: "Greenfield Automotive Park", openings: 8,  domain: "colgatepalmolive.com" },
  { name: "Toyota Motor PH",   industry: "Automotive",       zone: "Toyota Santa Rosa SEZ",      openings: 15, domain: "toyota.com.ph" },
  { name: "Unilever",          industry: "FMCG",              zone: "Laguna Technopark",          openings: 9,  domain: "unilever.com" },
];

export const careerPaths = [
  {
    role: "Junior Accounting Operations Associate",
    match: 82,
    industry: "Finance & Accounting",
    description:
      "Handles day-to-day bookkeeping, reconciliations, and financial reporting support for finance teams.",
  },
  {
    role: "Data Analyst",
    match: 76,
    industry: "Data & Analytics",
    description:
      "Collects, cleans, and interprets data to help teams make informed business decisions.",
  },
  {
    role: "ERP Support Associate",
    match: 72,
    industry: "IT & Systems",
    description:
      "Provides first-line support and maintenance for enterprise resource planning systems.",
  },
  {
    role: "Finance Assistant",
    match: 68,
    industry: "Finance & Accounting",
    description:
      "Assists with invoicing, expense tracking, and administrative finance tasks.",
  },
];

export const pezaZonesData = [
  { name: "Laguna Technopark",        industries: "IT, Electronics, FMCG", employers: 41 },
  { name: "Technopark Annex",         industries: "Logistics, IT",          employers: 22 },
  { name: "Greenfield Automotive Park", industries: "Automotive, Manufacturing", employers: 27 },
  { name: "Toyota Santa Rosa SEZ",    industries: "Automotive, Supplier",   employers: 18 },
];
