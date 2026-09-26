/* ============================================================
   DECK — single source of truth for narrative sections,
   the simulator defaults and the chatbot knowledge base.
   All figures are the deck's own illustrative assumptions.
   ============================================================ */
const DECK = {
  mandate: "Adopt a multi-cloud, PaaS-led transformation anchored on DevOps, an AI/data platform and workforce reskilling — to convert ABC Technology Services from a cost-centre IT shop into a scalable, margin-accretive AI-enabled digital services and GCC business, within the Board's ₹25 crore, 3-year envelope.",
  sections: [
    { id: "s01", n: "01", name: "The Problem", short: "Problem", sub: "Present situation and business context" },
    { id: "s02", n: "02", name: "The Strategy", short: "Strategy", sub: "Objectives, readiness and service models" },
    { id: "s03", n: "03", name: "The Architecture", short: "Architecture", sub: "Target cloud model" },
    { id: "s04", n: "04", name: "The Migration", short: "Migration", sub: "Strategy, workloads and sequencing" },
    { id: "s05", n: "05", name: "The Economics", short: "Economics", sub: "TCO, ROI and FinOps strategy" },
    { id: "s06", n: "06", name: "Risk & Governance", short: "Risk", sub: "Cybersecurity and operating controls" },
    { id: "s07", n: "07", name: "People & Change", short: "People", sub: "Skills, operating model and adoption" },
    { id: "s08", n: "08", name: "Roadmap & Outcomes", short: "Roadmap", sub: "Phasing, KPIs and the Board request" }
  ],
  problem: {
    statement: "ABC cannot win or retain higher-value, AI-enabled digital services engagements or protect delivery margins while operating on legacy, siloed infrastructure with limited automation.",
    realities: [
      "Delivery model largely on-premises / VM-based.",
      "Fragmented application landscape per client account.",
      "Low analytics maturity, relying on static spreadsheets.",
      "Inconsistent DevOps and automation across accounts.",
      "Ageing infrastructure drives rising maintenance cost."
    ],
    risk: ["Clients demand cloud-native AI", "Talent market is tightening", "GCC cost and capability arbitrage is eroding"],
    stakeholders: [
      { k: "CEO", t: "Losing deals to rivals" },
      { k: "CFO", t: "Margin erosion; capex spend", urgent: true },
      { k: "CIO / CTO", t: "Tech debt, security exposure" },
      { k: "COO / Delivery", t: "Slow provisioning, SLA risk" },
      { k: "Engineers", t: "Manual, repetitive toil" },
      { k: "Clients", t: "Expect cloud-native AI" },
      { k: "Risk & Compliance", t: "Multi-tenancy data risk" }
    ]
  },
  strategy: {
    objectives: [
      { k: "Modernise platform", t: "Cut cost-to-serve; compress provisioning from weeks to hours." },
      { k: "Build AI & data", t: "Launch new AI services; increase revenue per engagement." },
      { k: "Governed multi-cloud", t: "Establish an operating model with FinOps to protect margins." }
    ],
    readiness: [
      { k: "Applications", d: "Monolithic, low containerisation", lvl: "Low-Med", n: 1.5 },
      { k: "Data", d: "Siloed, spreadsheet reporting", lvl: "Low", n: 1 },
      { k: "Security", d: "Perimeter-based, limited zero-trust", lvl: "Med", n: 2 },
      { k: "Skills", d: "Concentrated in small pockets", lvl: "Low", n: 1 },
      { k: "Governance", d: "No unified CCoE", lvl: "Low", n: 1 }
    ],
    conclusion: "Foundational stage. Phased transformation required.",
    models: [
      { k: "IaaS", role: "Bridge for legacy and regulated client workloads.", pts: ["Lift-and-shift first approach", "Avoids risky Day 1 re-architecture", "Ensures operational continuity"] },
      { k: "PaaS", primary: true, role: "Core driver for application modernisation and new AI services.", pts: ["Accelerates DevOps and CI/CD pipelines", "Removes repetitive infrastructure toil", "Empowers engineers to focus on billable value"] },
      { k: "SaaS", role: "Optimised for internal enterprise functions.", pts: ["Covers ITSM, HRMS and collaboration", "Reduces internal IT overhead", "Standardised cloud operations"] }
    ],
    providers: [
      { k: "Azure", tag: "Primary cloud", role: "Core platform", t: "Primary hub for enterprise apps, AI/ML services and identity integration." },
      { k: "AWS", tag: "Secondary cloud", role: "Resilience & diversity", t: "Secondary footprint avoiding vendor lock-in and supporting specialised workloads." },
      { k: "On-premises", tag: "Data residency", role: "Limited retain", t: "Retained strictly for sovereign data requirements and legacy compliance." }
    ],
    criteria: [
      ["Enterprise / hybrid tooling fit", 4, 3],
      ["AI/ML platform maturity", 4, 4],
      ["India regions / compliance", 3, 3],
      ["Talent availability (India)", 3, 3],
      ["Cost predictability", 3, 2]
    ]
  },
  arch: {
    pillars: [
      { k: "Multi-Cloud Foundation", t: "Azure primary and AWS secondary" },
      { k: "Data & AI Engine", t: "Centralised analytics and MLOps" },
      { k: "Modular Service Layers", t: "Client delivery, security and SaaS" }
    ],
    layers: [
      { k: "Client Delivery Layer", t: "Cloud-native apps, Kubernetes, API gateway for internal and external clients" },
      { k: "Shared Services Layer (SaaS)", t: "ITSM, HRMS, collaboration tools" },
      { k: "Data & AI Layer", t: "Centralised data lake, AI/ML workbench, MLOps pipeline", hot: "New revenue engine" },
      { k: "DevOps / Automation Layer", t: "CI/CD pipelines, Infrastructure-as-Code (IaC), environment self-service" },
      { k: "Security Layer", t: "Centralised IAM (Entra), zero-trust segmentation per client, CASB, encryption" },
      { k: "Connectivity Layer", t: "ExpressRoute / VPN linking retained on-prem to cloud landing zones" },
      { k: "Multi-Cloud Landing Zones", t: "Standardised, policy-governed environments via IaC", base: true }
    ]
  },
  migration: {
    rs: ["Rehost", "Replatform", "Refactor", "Retire", "Retain"],
    workloads: [
      { r: "Replatform", tag: "Replatform", k: "Client Delivery / PM Tools", t: "Move to managed PaaS app + DB. Gain scale, low rework.", wave: "Wave 2" },
      { r: "Rehost", tag: "Rehost (first)", k: "Internal ERP / Finance", t: "Lift-and-shift to reduce risk; refactor in a later wave.", wave: "Refactor in Wave 3" },
      { r: "Retire", tag: "Retire", k: "Legacy ITSM Tool", t: "Replace with modern SaaS. Lower cost than migrating.", wave: "Wave 1" },
      { r: "Refactor", tag: "Refactor / Rearchitect", k: "Client Analytics Apps", t: "Rebuild as cloud-native microservices (new revenue).", wave: "Wave 2" },
      { r: "Retain", tag: "Retain (short term)", k: "HR / Payroll System", t: "Compliance constraints; reassess in Wave 3.", wave: "Reassess in Wave 3" },
      { r: "Replatform", tag: "Replatform", k: "Dev / Test Environments", t: "Containerise + IaC for fast self-service provisioning.", wave: "Wave 1" }
    ],
    waves: [
      { n: 1, range: "M0 – M6", from: 0, to: 6, items: ["Dev/test environments", "Internal SaaS (ITSM, collaboration)", "CCoE and landing zones"] },
      { n: 2, range: "M6 – M18", from: 6, to: 18, items: ["Replatform PM / delivery tools", "Refactor analytics apps", "Build data lake / AI platform"] },
      { n: 3, range: "M18 – M36", from: 18, to: 36, items: ["ERP refactor", "Regulated client workloads", "Full FinOps maturity"] }
    ],
    rollback: [
      { k: "Phased parallel-run", t: "Parallel-run each workload, phased per account." },
      { k: "Warm standby", t: "Legacy kept in warm standby after cutover." },
      { k: "Blue-green cutover", t: "Blue-green deployment for client systems." },
      { k: "Post-wave optimisation", t: "Rightsizing review 4–6 weeks after each wave." }
    ]
  },
  econ: {
    total: 25,
    budget: [
      { k: "Migration", pct: 40, t: "Core workloads and app migration", c: "#3ea6ff" },
      { k: "Infra / PaaS", pct: 25, t: "Cloud platform and infrastructure", c: "#a5d4ff" },
      { k: "Skills", pct: 10, t: "Training and CCoE enablement", c: "#7d8fb5" },
      { k: "AI Build", pct: 10, t: "Data lake and AI platform", c: "#b5a4ff" },
      { k: "Security / Governance", pct: 10, t: "Security, risk and governance", c: "#5fc2d6" },
      { k: "Contingency", pct: 5, t: "Operational buffer and reserve", c: "#ffb84d" }
    ],
    roi: [
      { v: "20–25%", t: "Reduction in infra maintenance by Year 3" },
      { v: "Wks → Hrs", t: "Environment provisioning time" },
      { v: "New line", t: "Revenue from managed AI services" },
      { v: "Near-zero", t: "Downtime SLA penalties" }
    ],
    finops: [
      "Cost tagging per account for chargeback.",
      "Budgets, alerts and monthly reviews.",
      "Reserved instances / savings plans.",
      "Regular rightsizing reviews by the CCoE."
    ]
  },
  risk: {
    top: [
      { t: "Multi-tenant data leakage across accounts.", s: "high" },
      { t: "Insecure APIs on refactored client apps.", s: "med" },
      { t: "Identity sprawl across multiple clouds.", s: "med" },
      { t: "Insider threat from broad access needs.", s: "med" },
      { t: "Ransomware / third-party risk.", s: "high" }
    ],
    controls: [
      "Zero-trust architecture with per-client segments.",
      "Centralised IAM (SSO + MFA).",
      "Encryption at rest and in transit by default.",
      "CASB + SIEM/SOC for monitoring.",
      "DevSecOps: scanning shifted left in CI/CD."
    ],
    tiers: [
      { k: "CIO / CTO", t: "Strategic platform decisions" },
      { k: "Cloud Centre of Excellence (CCoE)", t: "Architecture standards, FinOps guardrails" },
      { k: "Business / Account Owners", t: "Client-specific exceptions, compliance" }
    ],
    register: [
      { k: "Cost overrun", s: "high", m: "FinOps guardrails, monthly budget alerts, CCoE cost review." },
      { k: "Multi-tenant data breach", s: "high", m: "Network segmentation, encryption, periodic access reviews." },
      { k: "Skills gap delaying migration", s: "med", m: "Structured reskilling plus short-term partner / MSP support." },
      { k: "Vendor lock-in", s: "med", m: "Multi-cloud architecture, portable IaC, avoid proprietary-only." },
      { k: "Client SLA disruption", s: "low", m: "Phased, per-account cutover with tested rollback plans." }
    ],
    compliance: ["India DPDP Act", "ISO 27001", "SOC 2"]
  },
  people: {
    tracks: [
      "Certifications (Associate → Professional) on Azure / AWS.",
      "DevOps / CI-CD bootcamps for delivery engineers.",
      "Targeted AI/ML cohorts to seed the new practice.",
      "Partner-led training via hyperscaler academies."
    ],
    roles: ["Cloud Architect", "DevSecOps Engineer", "FinOps Analyst", "AI/ML Engineer", "CCoE Lead"],
    from: { k: "Siloed projects", t: "Staff augmentation, on-prem delivery.", tags: ["High friction", "Isolated skillsets"] },
    to: { k: "Cloud + AI Pods", t: "Cross-functional managed services.", tags: ["Agile pod structure", "AI-driven automation"] },
    adoption: [
      { k: "Certification %", t: "Target: ~70% by Year 2", tag: "Primary skill metric" },
      { k: "Time-to-productivity", t: "For redeployed legacy staff", tag: "Accelerated onboarding" },
      { k: "Engagement score", t: "Tracked via regular surveys", tag: "Continuous feedback" }
    ]
  },
  roadmap: {
    stages: [
      { n: 1, k: "Assess", range: "M0 – M6", from: 0, to: 6, sub: "CCoE, dev/test, SaaS", pts: ["Establish Cloud Centre of Excellence (CCoE)", "Audit dev/test environments", "Evaluate SaaS platform readiness"] },
      { n: 2, k: "Migrate", range: "M6 – M18", from: 6, to: 18, sub: "Core platform, AI build", pts: ["Migrate core platform workloads", "Build foundational AI infrastructure", "Initiate Wave 1 service transition"] },
      { n: 3, k: "Transform", range: "M18 – M30", from: 18, to: 30, sub: "AI services, governance at scale", pts: ["Deploy production AI services", "Scale governance frameworks enterprise-wide", "Accelerate cloud-native adoption"] },
      { n: 4, k: "Optimise", range: "M30 – M36", from: 30, to: 36, sub: "FinOps maturity, scale", pts: ["Achieve advanced FinOps maturity", "Maximise continuous cost efficiency", "Full organisational digital scale"] }
    ],
    outcomes: [
      { v: "~20–25%", t: "Infra cost reduction", o: "CFO" },
      { v: "Wks → Hrs", t: "Provisioning time", o: "COO" },
      { v: "~80%", t: "Workloads migrated by Year 3", o: "CIO" },
      { v: "New line", t: "AI service revenue", o: "CEO" },
      { v: "~70%", t: "Workforce certified by Year 2", o: "CHRO" },
      { v: "Downward", t: "Security incidents trend", o: "CISO" },
      { v: "Improved", t: "Client NPS vs baseline", o: "Delivery" }
    ],
    decisions: [
      { k: "Approve budget", t: "Approve the ₹25 crore investment within the 3-year envelope." },
      { k: "Approve Azure partnership", t: "Azure as the primary cloud: core platform, AI/ML and identity integration." },
      { k: "Approve CCoE charter", t: "The CCoE sets architecture standards and FinOps guardrails." },
      { k: "Sponsor change programme", t: "Executive sponsorship for reskilling and the shift to Cloud + AI Pods." }
    ],
    approvers: ["CEO", "CFO", "COO", "CIO", "CHRO", "CISO", "Delivery leadership"],
    recommendation: "Approve the ₹25 crore investment for a multi-cloud (Azure-primary), PaaS-led transformation via a 3-wave, 5R migration. Governed by a CCoE and FinOps to reposition ABC Technology Services as an AI-enabled digital services business."
  }
};
