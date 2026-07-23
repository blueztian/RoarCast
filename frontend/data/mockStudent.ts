export interface StudentProfile {
  name: string;
  age: number;
  school: string;
  program: string;
  gradYear: number;
  careerInterest: string;
  location: string;
}

// Default mock persona used across the onboarding + audit + results flow.
export const mockStudent: StudentProfile = {
  name: "Jana Cruz",
  age: 23,
  school: "Santa Rosa, Laguna",
  program: "Accounting Information System",
  gradYear: 2026,
  careerInterest: "Accounting Operations",
  location: "Santa Rosa, Laguna",
};
