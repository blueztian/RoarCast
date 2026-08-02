/**
 * Canonical Learning Domain Definitions & Progression Router
 * Unifies Skill Details, Interactive Learning Modules, Assessments, and Credential verification.
 */

export const LEARNING_ROUTES = {
  skillDetail: "/skills/erp-workflow",
  interactiveModule: "/learn/erp-foundations",
  assessment: "/assessment/erp-workflow",
  credentialView: "/credentials/erp-workflow",
  portfolio: "/credentials/portfolio",
  courseCatalog: "/learn/courses",
} as const;

export interface LearningProgressionStep {
  id: string;
  label: string;
  path: string;
  description: string;
}

export const CANONICAL_UPSKILLING_PIPELINE: LearningProgressionStep[] = [
  {
    id: "detail",
    label: "1. Skill Discovery & Demand",
    path: LEARNING_ROUTES.skillDetail,
    description: "Understand why ERP Workflow matters and how it closes your priority gap.",
  },
  {
    id: "learn",
    label: "2. Interactive Learning",
    path: LEARNING_ROUTES.interactiveModule,
    description: "Complete the 4 interactive lessons and real-time conceptual checks.",
  },
  {
    id: "assessment",
    label: "3. Skill Validation",
    path: LEARNING_ROUTES.assessment,
    description: "Test your conceptual comprehension through the 5-question demonstration check.",
  },
  {
    id: "credential",
    label: "4. Prototype Credential",
    path: LEARNING_ROUTES.credentialView,
    description: "Earn your prototype completion record and update your demo talent profile.",
  },
];

export function getNextProgressionRoute(currentPath: string): string {
  if (currentPath.includes("/skills/")) return LEARNING_ROUTES.interactiveModule;
  if (currentPath.includes("/learn/erp-foundations")) return LEARNING_ROUTES.assessment;
  if (currentPath.includes("/assessment/")) return LEARNING_ROUTES.credentialView;
  return LEARNING_ROUTES.portfolio;
}
