export const janaProfile = {
  name: "Jana",
  program: "Accounting Information Systems",
  targetRole: "Junior Accounting Operations Associate",
  targetReadiness: 72,
  existingSkills: ["Microsoft Excel", "Data Reconciliation"],
  priorityGaps: [
    {
      id: "sap-erp",
      name: "SAP ERP",
      priority: "High",
      status: "Learning in progress",
    },
    {
      id: "erp-systems",
      name: "ERP Systems",
      priority: "High",
      status: "Not started",
    },
  ],
};

export const activeCourse = {
  id: "sap-erp-fundamentals",
  title: "SAP ERP Fundamentals",
  skill: "SAP ERP",
  currentModule: 4,
  totalModules: 6,
  progress: 65,
  currentLesson: "Vendor Master Basics",
  timeRemaining: "~45 min",
};

export const squadsData = [
  {
    id: "erp-launchpad",
    skillId: "sap-erp",
    skillName: "SAP ERP",
    name: "ERP Launchpad Squad",
    label: "Priority skill gap",
    reason: "Required by many accounting operations roles.",
    members: { total: 5, activeThisWeek: 4 },
    goal: {
      type: "Current goal",
      text: "SAP ERP Fundamentals — Module 4",
    },
    progress: 68,
    status: "Joined", // STATE A
    learningFormat: { modules: 6, checkIns: 2 },
    outcome: "SAP ERP Fundamentals",
    category: "Accounting",
    allMembers: [
      { name: "Jana", progress: 65, active: true },
      { name: "Miguel", progress: 72, active: true },
      { name: "Anne", progress: 60, active: true },
      { name: "Carlo", progress: 75, active: true },
      { name: "Bea", progress: 68, active: false },
    ],
    activityFeed: [
      { user: "Miguel", action: "completed", target: "Customer Master Basics", time: "2h ago" },
      { user: "Anne", action: "earned", target: "SAP Navigation Basics", time: "5h ago" },
      { user: "Jana", action: "completed", target: "ERP Workflow Introduction", time: "Yesterday" },
    ],
    discussions: [
      { user: "Anne", message: "Does anyone understand the difference between customer and vendor master data?" },
      { user: "Miguel", message: "Yes — I added a quick explanation in the shared notes." },
      { user: "Jana", message: "Thanks! That helped." },
    ],
    roadmap: [
      { week: 1, title: "ERP Fundamentals", status: "completed" },
      { week: 2, title: "Master Data", status: "current" },
      { week: 3, title: "Transactions", status: "upcoming" },
      { week: 4, title: "Practice Activity", status: "upcoming" },
      { week: 5, title: "Final Assessment", status: "upcoming" },
    ]
  },
  {
    id: "erp-foundations",
    skillId: "erp-systems",
    skillName: "ERP Systems",
    name: "ERP Foundations Squad",
    label: "Recommended for your target role",
    reason: "Strengthen your second priority skill gap.",
    members: { total: 4, activeThisWeek: 3 },
    goal: {
      type: "Current goal",
      text: "Understand ERP workflows and system navigation",
    },
    progress: 35,
    status: "4 of 6 spots available", // STATE B
    learningFormat: { modules: 5, checkIns: 2 },
    outcome: "ERP Systems Essentials",
    category: "IT",
  },
  {
    id: "excel-automation",
    skillId: "advanced-excel",
    skillName: "Advanced Excel",
    name: "Excel Automation Squad",
    label: "Build on your existing skill",
    reason: "Advance beyond foundational Excel.",
    members: { total: 6, activeThisWeek: 6 },
    goal: {
      type: "Current goal",
      text: "PivotTables, lookup workflows, and automation basics",
    },
    progress: 42,
    status: "View squad", // STATE C
    learningFormat: { modules: 4, checkIns: 1 },
    outcome: "Advanced Excel for Professionals",
    category: "Business",
  },
  {
    id: "financial-reporting",
    skillId: "financial-reporting",
    skillName: "Financial Reporting",
    name: "Financial Reporting Squad",
    label: "Rising in Santa Rosa",
    reason: "Highly requested in Laguna TechnoPark.",
    members: { total: 8, activeThisWeek: 8 },
    goal: {
      type: "Current goal",
      text: "Month-end close procedures",
    },
    progress: 15,
    status: "Squad full", // STATE D
    learningFormat: { modules: 6, checkIns: 2 },
    outcome: "Financial Reporting Certification",
    category: "Accounting",
  },
];

export const coursesData = [
  {
    id: "sap-erp-fundamentals",
    title: "SAP ERP Fundamentals",
    skill: "SAP ERP",
    tag: "Priority skill gap",
    reason: "SAP ERP appears in current employer requirements relevant to accounting operations.",
    modulesCount: 6,
    progress: 65,
    status: "In Progress",
    timeEstimate: "Approx. 3 hrs",
    credential: "SAP ERP Fundamentals Badge",
    targetRole: "Junior Accounting Operations Associate",
    currentProficiency: "Beginner",
    targetProficiency: "Intermediate",
    outcome: "Understand fundamental ERP navigation, master data, and transaction workflows.",
    curriculum: [
      { id: "mod1", title: "Introduction to ERP", status: "Completed" },
      { id: "mod2", title: "ERP Navigation", status: "Completed" },
      { id: "mod3", title: "Customer Master", status: "Completed" },
      { id: "mod4", title: "Vendor Master", status: "Current" },
      { id: "mod5", title: "Transaction Workflow", status: "Locked" },
      { id: "mod6", title: "Practice + Assessment", status: "Upcoming" },
    ],
    squadConnection: {
      squadId: "erp-launchpad",
      name: "ERP Launchpad Squad",
      members: 5,
    }
  },
  {
    id: "erp-systems-essentials",
    title: "ERP Systems Essentials",
    skill: "ERP Systems",
    tag: "Priority skill gap",
    reason: "Required for your target role",
    modulesCount: 5,
    progress: 0,
    status: "Not started",
    timeEstimate: "Approx. 2.5 hrs",
    credential: "ERP Systems Essentials Badge",
    targetRole: "Junior Accounting Operations Associate",
    currentProficiency: "Beginner",
    targetProficiency: "Intermediate",
    outcome: "Understand ERP structures and how they support business operations.",
  },
  {
    id: "advanced-excel-pro",
    title: "Advanced Excel for Professionals",
    skill: "Advanced Excel",
    tag: "Build on your existing skill",
    reason: "Build on a skill you already have",
    modulesCount: 4,
    progress: 0,
    status: "Not started",
    timeEstimate: "Approx. 2 hrs",
    credential: "Advanced Excel Pro Badge",
    targetRole: "Junior Accounting Operations Associate",
    currentProficiency: "Intermediate",
    targetProficiency: "Advanced",
    outcome: "Master PivotTables, PowerQuery, and basic macro automation.",
  }
];

export const exploreSkills = [
  "Advanced Excel",
  "Financial Reporting",
  "Quality Assurance",
  "PLC Programming"
];

export const credentialsData = [
  {
    id: "sap-erp",
    title: "SAP ERP Foundations",
    issuedTo: "Jana Dela Cruz",
    issued: "July 24, 2026",
    credentialId: "RC-SAP-2026-00184",
    competencies: [
      "ERP Fundamentals",
      "SAP Navigation",
      "Financial Accounting Workflow"
    ],
  },
  {
    id: "advanced-excel",
    title: "Advanced Excel for Operations",
    issuedTo: "Jana Dela Cruz",
    issued: "June 18, 2026",
    credentialId: "RC-EXL-2026-00912",
    competencies: [
      "Advanced Formulas",
      "PivotTables",
      "Data Cleaning"
    ],
  },
  {
    id: "financial-reconciliation",
    title: "Financial Data Reconciliation",
    issuedTo: "Jana Dela Cruz",
    issued: "May 30, 2026",
    credentialId: "RC-FDR-2026-00441",
    competencies: [
      "Transaction Matching",
      "Error Detection",
      "Reconciliation Workflow"
    ],
  }
];
