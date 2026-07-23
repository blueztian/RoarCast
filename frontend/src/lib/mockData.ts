export interface Student {
  id: string;
  name: string;
  program: string;
  alignmentScore: number;
  matchedSkills: string[];
  missingSkills: string[];
}

export interface Credential {
  id: string;
  skill: string;
  issuedDate: string;
  issuedBy: string;
  status: 'Verified' | 'Pending';
}

export interface SquadMember {
  name: string;
  role: string;
}

export interface Squad {
  name: string;
  members: SquadMember[];
  modules: { name: string; completed: boolean }[];
  estimatedCompletion: string;
}

export interface DashboardMetrics {
  totalStudents: number;
  credentialsIssued: number;
  topMissingSkills: { skill: string; count: number }[];
  topHiringIndustries: { industry: string; percentage: number }[];
  alignmentScoresBySchool: { school: string; score: number }[];
  monthlySkillTrends: { month: string; searches: number }[];
}

export const MOCK_STUDENT: Student = {
  id: 'STU-001',
  name: 'Miguel Reyes',
  program: 'BS Computer Science',
  alignmentScore: 87,
  matchedSkills: ['Java', 'Git', 'SQL', 'Agile'],
  missingSkills: ['SAP', 'PLC Programming', 'ISO 9001', 'Six Sigma'],
};

export const MOCK_CREDENTIALS: Credential[] = [
  {
    id: 'CRED-101',
    skill: 'Agile Fundamentals',
    issuedDate: '2023-10-15',
    issuedBy: 'RoarCast + PESO Santa Rosa',
    status: 'Verified',
  },
  {
    id: 'CRED-102',
    skill: 'Scrum Basics',
    issuedDate: '2023-11-02',
    issuedBy: 'RoarCast + PESO Santa Rosa',
    status: 'Verified',
  }
];

export const MOCK_SQUAD: Squad = {
  name: 'Agile Squad Alpha',
  members: [
    { name: 'Miguel', role: 'Leader' },
    { name: 'Andrea', role: 'Member' },
    { name: 'John', role: 'Member' },
    { name: 'Princess', role: 'Member' },
  ],
  modules: [
    { name: 'Agile Fundamentals', completed: true },
    { name: 'Scrum Basics', completed: true },
    { name: 'Sprint Planning', completed: false },
  ],
  estimatedCompletion: '2 Weeks',
};

export const MOCK_INDUSTRIES = [
  'Toyota', 'Nidec', 'Canon', 'Laguna Technopark'
];

export const MOCK_DASHBOARD: DashboardMetrics = {
  totalStudents: 12450,
  credentialsIssued: 3890,
  topMissingSkills: [
    { skill: 'SAP', count: 1200 },
    { skill: 'PLC Programming', count: 950 },
    { skill: 'Six Sigma', count: 800 },
    { skill: 'ISO 9001', count: 650 },
  ],
  topHiringIndustries: [
    { industry: 'Automotive', percentage: 35 },
    { industry: 'Electronics', percentage: 25 },
    { industry: 'IT/BPO', percentage: 20 },
    { industry: 'Logistics', percentage: 20 },
  ],
  alignmentScoresBySchool: [
    { school: 'PUP Santa Rosa', score: 82 },
    { school: 'STI College', score: 78 },
    { school: 'Laguna University', score: 85 },
  ],
  monthlySkillTrends: [
    { month: 'Jan', searches: 1500 },
    { month: 'Feb', searches: 1800 },
    { month: 'Mar', searches: 2200 },
    { month: 'Apr', searches: 2500 },
  ]
};

export const MOCK_ACADEME_RECOMMENDATIONS = [
  { program: 'BS Computer Science', recommendation: 'Integrate Cloud Computing basics (AWS/Azure) into 3rd-year syllabus based on 40% increase in locator demand.' },
  { program: 'BS Industrial Engineering', recommendation: 'Add Six Sigma Yellow Belt certification path due to high deficit in current graduating batch.' },
  { program: 'BS Information Technology', recommendation: 'Shift focus from PHP to Python/Node.js based on recent job postings in Laguna Technopark.' }
];

export const MOCK_PESO_DATA = {
  employmentReadiness: 68,
  youthDistribution: [
    { barangay: 'Balibago', count: 2500 },
    { barangay: 'Dita', count: 1800 },
    { barangay: 'Macabling', count: 1200 }
  ],
  availableTraining: [
    'TESDA Shielded Metal Arc Welding (SMAW) NC II',
    'DICT Python Programming for Beginners',
    'DOLE Career Guidance Workshop'
  ]
};
