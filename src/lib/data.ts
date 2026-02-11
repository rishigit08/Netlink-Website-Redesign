// ============================================================
// Type Definitions
// ============================================================

export interface StatItem {
  value: string;
  label: string;
}

export interface CapabilityPlane {
  id: string;
  title: string;
  body: string;
}

export interface IndustrySolution {
  id: string;
  name: string;
  tagline: string;
  solutions: string[];
  comingSoon?: boolean;
}

export interface CaseStudyItem {
  client: string;
  title: string;
  summary: string;
  tags: string[];
}

export interface ServiceItem {
  title: string;
  body: string;
}

export interface BlogTeaserItem {
  title: string;
  description: string;
}

export interface FooterColumnItem {
  title: string;
  links: { label: string; href: string }[];
}

// ============================================================
// Navigation
// ============================================================

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "#hero", hasDropdown: false },
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "Platform And Products", href: "#industries", hasDropdown: true },
  { label: "Partnerships", href: "#connected-enterprise", hasDropdown: true },
  { label: "About Us", href: "#philosophy", hasDropdown: true },
  { label: "Careers", href: "#", hasDropdown: true },
];

// ============================================================
// Hero Stats
// ============================================================

export const heroStats: StatItem[] = [
  { value: "28", label: "Years of Experience" },
  { value: "200+", label: "Certifications" },
  { value: "50+", label: "Awards" },
];

// ============================================================
// Capability Planes (Connected Enterprise)
// ============================================================

export const capabilityPlanes: CapabilityPlane[] = [
  {
    id: "infrastructure",
    title: "Infrastructure & Cloud",
    body: "When demand shifts, system is able to absorb AI scale without breaking performance",
  },
  {
    id: "erp",
    title: "ERP & Core Platforms",
    body: "Decisions move when intelligence is part of core systems. Netlink embeds it where execution happens.",
  },
  {
    id: "data",
    title: "Data & Intelligence",
    body: "Data unified across enterprise systems enables intelligence that keeps operations efficient and adaptive.",
  },
  {
    id: "applications",
    title: "Agentic Applications & Workflows",
    body: "Enabling faster product scale by embedding intelligence into deeply integrated tools and workflows from the start",
  },
  {
    id: "automation",
    title: "Automation & Orchestration",
    body: "Netlink builds context-aware automation that adapts as conditions change",
  },
  {
    id: "security",
    title: "Security & Governance",
    body: "Security-driven governance to keep intelligent systems scalable and safe",
  },
];

// ============================================================
// Industries & Solutions
// ============================================================

export const industries: IndustrySolution[] = [
  {
    id: "healthcare",
    name: "Healthcare",
    tagline:
      "Enabling population-scale health intelligence and operational clarity across care delivery systems",
    solutions: [
      "Advanced EMR Systems",
      "RMNCAH Insights Tracking Dashboard",
      "Pharma Capacity Demand & Logistics Forecasting System",
      "Patient Enquiry Tracking System",
      "Claims Invoice Automation Systems/Reports",
      "Claims Investigation System/Reports",
      "Recidivism Reduction Platform",
      "OPD and IPD dashboards",
    ],
  },
  {
    id: "insurance",
    name: "Insurance",
    tagline:
      "Streamlining onboarding, claims, and customer engagement through intelligent automation",
    solutions: [
      "Customer Onboarding & Liability Assessment",
      "Multi-channel Customer Experience User Interface",
      "Customer (patient) Interactions Chatbot",
      "Personalized Customer Dashboard for Policy Products",
      "Automated Order Management System",
      "Automated Claims & Billing System",
      "Public Healthcare Insights & Resource Allocation System",
      "Claim Investigation Case Management System",
    ],
  },
  {
    id: "automotive",
    name: "Automotive",
    tagline:
      "Connecting dealer networks, supply chains, and factory floors through intelligent platforms",
    solutions: [
      "Freight Optimizer Platform",
      "Emergency Roadside Driver & Vehicle Safety Tool",
      "Digital 3PL & Fulfillment Orchestration Platform",
      "EDI/ WebEDI Platform",
      "Digital Dealer Enablement Suite",
      "Spend Analytics Platform",
      "AI Powered CX Support (Warranty, Maintenance)",
      "Fleet Maintenance Prediction Tool",
      "Fleet Tracking Platform",
      "Label Printing Solution",
      "MRO, Procurement & Supply Analytics Tool",
      "Procurement Requisition Automation",
      "Dynamic Part Pricing & Procurement",
      "Plant Scheduling & Optimization Platform",
    ],
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    tagline:
      "Driving production intelligence from design through delivery with connected digital systems",
    solutions: [
      "BOM Optimization & Design Cost Efficiency Platform",
      "Digital Engineering Design Lifecycle Automation Platform",
      "Procurement Process Optimization",
      "AI Spend Analytics Platform",
      "EDI/ WebEDI Platform",
      "Digital 3PL & Fulfillment Orchestration Platform",
      "Procurement Intelligence Suite",
      "Label Printing Solution",
      "Smart Factory Scheduling & Production Optimization Platform",
      "Smart Manufacturing Operations & Maintenance Intelligence",
      "Manufacturing Profitability & Performance Intelligence",
      "Electronic Test Results Automation Platform",
      "Document Control & Compliance Automation Platform",
      "Sales Inventory Operation Planning",
      "Sales & Contract Performance Intelligence",
    ],
  },
  {
    id: "supply-chain",
    name: "Supply Chain",
    tagline:
      "Orchestrating end-to-end supply chain visibility, procurement, and logistics intelligence",
    solutions: [
      "Freight Optimizer Platform",
      "Emergency Roadside Driver & Vehicle Safety",
      "CDLF (Capacity Demand & Logistics Forecasting)",
      "SIOP (Sales Inventory Operation Planning) Platform",
      "MRO Procurement Standardization & Supplier Consolidation",
      "Procurement Transformation Platform",
      "EDI/WebEDI Platform",
      "AI Chatbot & Insights System",
      "Global Procurement Intelligence & Spend Control Suite",
      "Supply Chain Automation",
      "Smart Warehouse Optimization & Process Intelligence",
      "Inventory Control & Consumption Management",
      "Label Printing Solution",
      "Omnichannel Inventory Synchronization & Commerce",
      "Digital Dealer Experience Transformation Suite",
      "Critical Delivery Visibility & Dispatch Management Platform",
      "AI-Driven Spend & Cost Center Intelligence Platform",
    ],
  },
  {
    id: "banking",
    name: "Banking",
    tagline: "",
    solutions: [],
    comingSoon: true,
  },
  {
    id: "utility",
    name: "Utility",
    tagline: "",
    solutions: [],
    comingSoon: true,
  },
  {
    id: "retail",
    name: "Retail",
    tagline: "",
    solutions: [],
    comingSoon: true,
  },
  {
    id: "gcc",
    name: "GCC",
    tagline: "",
    solutions: [],
    comingSoon: true,
  },
];

// ============================================================
// Case Studies
// ============================================================

export const caseStudies: CaseStudyItem[] = [
  {
    client: "NHM",
    title:
      "From fragmented program data to population-scale maternal and child health visibility",
    summary:
      "Netlink built a unified data intelligence platform that consolidated fragmented health program data across districts, enabling real-time visibility into maternal and child health outcomes at population scale.",
    tags: ["Healthcare", "Data & Intelligence"],
  },
  {
    client: "BFile",
    title:
      "Aligning customer onboarding with intelligent risk and coverage decisions",
    summary:
      "An intelligent onboarding system that integrates risk assessment and coverage decision-making, streamlining the customer journey while reducing liability exposure through automated intelligence.",
    tags: ["Insurance", "Agentic Applications"],
  },
  {
    client: "Abbvie CDLF",
    title:
      "Turning demand, logistics, and financial signals into forward-looking decisions",
    summary:
      "A capacity demand and logistics forecasting platform that synthesizes demand patterns, logistics data, and financial signals to enable forward-looking operational decisions across the supply chain.",
    tags: ["Supply Chain", "Automation & Orchestration"],
  },
];

// ============================================================
// Services
// ============================================================

export const services: ServiceItem[] = [
  {
    title: "Decision Intelligence Systems",
    body: "Turning enterprise data into insight that continuously informs action.",
  },
  {
    title: "Adaptive Product Engineering",
    body: "Building products that learn, evolve, and stay aligned with enterprise change.",
  },
  {
    title: "Intelligent ERP & Core Platforms",
    body: "Embedding intelligence into systems of record so execution keeps pace with decisions.",
  },
  {
    title: "Autonomous Automation & Orchestration",
    body: "Designing processes that sense context and adjust without constant intervention.",
  },
  {
    title: "Self-Scaling Cloud & Infrastructure",
    body: "Engineering foundations that adapt automatically to demand and complexity.",
  },
  {
    title: "Trust & Governance Intelligence",
    body: "Embedding intelligence into security and governance so systems scale safely.",
  },
];

// ============================================================
// Blog / POV Teasers
// ============================================================

export const blogTeasers: BlogTeaserItem[] = [
  {
    title: "What it takes to move from AI pilots to operational systems",
    description:
      "Exploring the organizational, architectural, and data readiness required to transition AI from experimentation to enterprise-grade operations.",
  },
  {
    title: "Why governance determines whether intelligence scales",
    description:
      "How governance frameworks shape the trajectory of AI adoption and why they must be embedded from day one, not bolted on later.",
  },
  {
    title: "Designing enterprise systems that can adapt over time",
    description:
      "The architectural principles behind systems that evolve with changing business conditions rather than requiring constant re-engineering.",
  },
];

// ============================================================
// Footer
// ============================================================

export const footerColumns: FooterColumnItem[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "#philosophy" },
      { label: "Leadership", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Decision Intelligence", href: "#services" },
      { label: "Product Engineering", href: "#services" },
      { label: "ERP & Platforms", href: "#services" },
      { label: "Automation", href: "#services" },
      { label: "Cloud & Infrastructure", href: "#services" },
      { label: "Governance", href: "#services" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Healthcare", href: "#industries" },
      { label: "Insurance", href: "#industries" },
      { label: "Automotive", href: "#industries" },
      { label: "Manufacturing", href: "#industries" },
      { label: "Supply Chain", href: "#industries" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Case Studies", href: "#case-studies" },
      { label: "Blog", href: "#pov" },
      { label: "Point of View", href: "#pov" },
    ],
  },
];
