export interface Solution {
  id: string;
  label: string;
}

export interface ValueFunction {
  id: string;
  label: string;
  description?: string;
}

export interface IndustryMapping {
  id: string;
  name: string;
  tagline: string;
  valueFunctions: ValueFunction[];
  solutions: Solution[];
  mapping: Record<string, string[]>; // valueFunctionId -> solutionIds[]
  comingSoon?: boolean;
}

export const industryMappingData: IndustryMapping[] = [
  {
    id: "healthcare",
    name: "Healthcare",
    tagline: "Enabling population-scale health intelligence and operational clarity across care delivery systems",
    valueFunctions: [
      {
        id: "vf1",
        label: "Care Delivery Optimization",
      },
      {
        id: "vf2",
        label: "Population Health Intelligence",
      },
      {
        id: "vf3",
        label: "Revenue Cycle & Claims Automation",
      },
      {
        id: "vf4",
        label: "Hospital Operations Intelligence",
      },
      {
        id: "vf5",
        label: "Pharma Demand & Supply Forecasting",
      },
    ],
    solutions: [
      { id: "s1", label: "Advanced EMR Systems" },
      { id: "s2", label: "RMNCAH Insights Tracking Dashboard" },
      { id: "s3", label: "Claims Automation Systems" },
      { id: "s4", label: "Hospital Operations Dashboard" },
      { id: "s5", label: "Pharma Demand Forecasting" },
    ],
    mapping: {
      vf1: ["s1", "s4"],
      vf2: ["s2", "s4"],
      vf3: ["s3"],
      vf4: ["s4", "s1"],
      vf5: ["s5"],
    },
  },
  {
    id: "insurance",
    name: "Insurance",
    tagline: "Empowering intelligent underwriting, rapid claims processing, and superior customer experience",
    valueFunctions: [
      {
        id: "vf1",
        label: "Customer Engagement & Onboarding",
      },
      {
        id: "vf2",
        label: "Underwriting & Policy Issuance",
      },
      {
        id: "vf3",
        label: "Policy Administration & Billing",
      },
      {
        id: "vf4",
        label: "Claims Processing & Risk Management",
      },
      {
        id: "vf5",
        label: "Data Enablement & Compliance Optimization",
      },
    ],
    solutions: [
      { id: "s1", label: "Customer Onboarding & Liability Assessment" },
      { id: "s2", label: "Personalized Policy Products Dashboard" },
      { id: "s3", label: "Automated Claims & Billing System" },
      { id: "s4", label: "Claim Investigation Case Management" },
      { id: "s5", label: "Public Healthcare Insights & Resource Allocation" },
    ],
    mapping: {
      vf1: ["s1", "s2"],
      vf2: ["s2", "s1"],
      vf3: ["s3", "s2"],
      vf4: ["s4", "s3"],
      vf5: ["s5", "s4"],
    },
  },
  {
    id: "automotive",
    name: "Automotive",
    tagline: "Transforming automotive value chains with intelligent manufacturing, logistics, and customer experience",
    valueFunctions: [
      {
        id: "vf1",
        label: "Product Planning & Forecasting",
      },
      {
        id: "vf2",
        label: "Inbound Logistics",
      },
      {
        id: "vf3",
        label: "Manufacturing & Operations",
      },
      {
        id: "vf4",
        label: "Sales & Marketing Enablement",
      },
      {
        id: "vf5",
        label: "After-Sales Service Intelligence",
      },
    ],
    solutions: [
      { id: "s1", label: "Plant Scheduling & Optimization Platform" },
      { id: "s2", label: "Digital 3PL & Fulfillment Orchestration" },
      { id: "s3", label: "MRO, Procurement & Supply Analytics Tool" },
      { id: "s4", label: "Digital Dealer Enablement Suite" },
      { id: "s5", label: "AI Powered CX Support (Warranty, Maintenance)" },
    ],
    mapping: {
      vf1: ["s1", "s3"],
      vf2: ["s2", "s3"],
      vf3: ["s1", "s2"],
      vf4: ["s4"],
      vf5: ["s5", "s4"],
    },
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    tagline: "Driving operational excellence through intelligent production, supply chain, and lifecycle management",
    valueFunctions: [
      {
        id: "vf1",
        label: "Contract Acquisition & Design Engineering",
      },
      {
        id: "vf2",
        label: "Procurement & Supplier Management",
      },
      {
        id: "vf3",
        label: "Production Execution & Scheduling",
      },
      {
        id: "vf4",
        label: "Testing, Validation & Acceptance",
      },
      {
        id: "vf5",
        label: "Lifecycle Service & Maintenance Intelligence",
      },
    ],
    solutions: [
      { id: "s1", label: "Digital Engineering Lifecycle Automation" },
      { id: "s2", label: "Procurement Intelligence Suite" },
      { id: "s3", label: "Smart Factory Scheduling & Production Optimization" },
      { id: "s4", label: "Electronic Test Results Automation Platform" },
      { id: "s5", label: "Smart Manufacturing Ops & Maintenance Intelligence" },
    ],
    mapping: {
      vf1: ["s1"],
      vf2: ["s2", "s1"],
      vf3: ["s3", "s2"],
      vf4: ["s4", "s3"],
      vf5: ["s5", "s4"],
    },
  },
  {
    id: "supply-chain",
    name: "Supply Chain",
    tagline: "Enabling end-to-end supply chain visibility, optimization, and intelligent decision-making",
    valueFunctions: [
      {
        id: "vf1",
        label: "Demand & Supply Planning",
      },
      {
        id: "vf2",
        label: "Sourcing & Procurement",
      },
      {
        id: "vf3",
        label: "Warehouse & Fulfillment Operations",
      },
      {
        id: "vf4",
        label: "Logistics & Delivery Visibility",
      },
      {
        id: "vf5",
        label: "Spend & Optimization Intelligence",
      },
    ],
    solutions: [
      { id: "s1", label: "CDLF (Capacity Demand & Logistics Forecasting)" },
      { id: "s2", label: "Global Procurement Intelligence & Spend Control Suite" },
      { id: "s3", label: "Smart Warehouse Optimization & Process Intelligence" },
      { id: "s4", label: "Critical Delivery Visibility & Dispatch Management" },
      { id: "s5", label: "AI-Driven Spend & Cost Center Intelligence" },
    ],
    mapping: {
      vf1: ["s1", "s2"],
      vf2: ["s2", "s3"],
      vf3: ["s3", "s4"],
      vf4: ["s4", "s1"],
      vf5: ["s5", "s2"],
    },
  },
  {
    id: "banking",
    name: "Banking",
    tagline: "Modernizing financial services with intelligent automation, compliance, and customer engagement",
    valueFunctions: [
      {
        id: "vf1",
        label: "Customer Acquisition & Product Design",
      },
      {
        id: "vf2",
        label: "Transaction Enablement & Activation",
      },
      {
        id: "vf3",
        label: "Account Servicing & Customer Engagement",
      },
      {
        id: "vf4",
        label: "Risk, Compliance & Analytics",
      },
      {
        id: "vf5",
        label: "Renewal, Retention & Lifecycle Management",
      },
    ],
    solutions: [
      { id: "s1", label: "Omni-Channel Customer Onboarding Automation" },
      { id: "s2", label: "Digital Core Banking Enablement Suite" },
      { id: "s3", label: "Customer Care Workflow Automation Suite" },
      { id: "s4", label: "Financial Crime & Transaction Monitoring Automation" },
      { id: "s5", label: "Real-Time Financial Intelligence & Analytics" },
    ],
    mapping: {
      vf1: ["s1", "s2"],
      vf2: ["s2", "s3"],
      vf3: ["s3", "s1"],
      vf4: ["s4", "s5"],
      vf5: ["s5", "s3"],
    },
  },
];
