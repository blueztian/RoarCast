import type { StudentProfile, ReadinessSnapshot } from "@/lib/storageTypes";

/**
 * Sample prototype data and static reference options for RoarCast demonstration flows.
 * All figures, personas, and metrics represent demonstration placeholders.
 */

export const DEMO_STUDENT: StudentProfile = {
  name: "Jana Cruz",
  email: "jana@roarcast.demo",
  age: "23",
  school: "Santa Rosa, Laguna",
  program: "Accounting Information Systems",
  gradYear: "2026",
  careerInterest: "Accounting Operations",
  location: "Santa Rosa, Laguna",
};

export const DEMO_READINESS_SNAPSHOT: ReadinessSnapshot = {
  score: 72,
  label: "Job Ready",
  targetRole: "Junior Accounting Operations Associate",
  strengths: [
    "Workplace Communication",
    "Technical Role Knowledge",
    "Digital Tool Proficiency",
  ],
  gaps: [
    "Industry Software Proficiency",
    "Practical Industry Exposure",
    "Industry Certification",
  ],
  priorityGap: "Industry Software Proficiency",
  nextStep: "Explore career paths matched to your readiness profile",
  computedAt: new Date().toISOString(),
};

export const EDUCATION_LEVELS = [
  { id: "shs", label: "Senior High School student" },
  { id: "college", label: "College student" },
  { id: "fresh-grad", label: "Fresh graduate" },
  { id: "working", label: "Working professional" },
];

export const DEGREE_PROGRAMS = [
  "Accounting Information Systems",
  "Accountancy",
  "Architecture",
  "Business Administration",
  "Communication",
  "Computer Science",
  "Criminology",
  "Education",
  "Engineering (Civil)",
  "Engineering (Electrical)",
  "Engineering (Industrial)",
  "Engineering (Mechanical)",
  "Finance",
  "Hospitality Management",
  "Human Resource Management",
  "Information Technology",
  "Marketing Management",
  "Medical Technology",
  "Nursing",
  "Pharmacy",
  "Psychology",
  "Tourism Management",
  "Other",
];

export const CAREER_PATHS = [
  { id: "accounting-ops", label: "Accounting Operations" },
  { id: "software-dev", label: "Software Development" },
  { id: "data-analytics", label: "Data Analytics" },
  { id: "manufacturing", label: "Manufacturing Operations" },
  { id: "quality-control", label: "Quality Control" },
  { id: "engineering-ops", label: "Engineering Operations" },
  { id: "admin-roles", label: "Administrative Roles" },
  { id: "customer-ops", label: "Customer Operations" },
  { id: "other", label: "Other / Still exploring" },
];
