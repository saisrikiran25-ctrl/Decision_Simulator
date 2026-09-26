/* ============================================================
   ASK THE DECK — retrieval over this proposal only.
   Every answer is written from the deck (and its presenter
   notes). Anything else gets a friendly redirect.
   ============================================================ */
const SEC = { "00": "Overview", "01": "Section 01 — The Problem", "02": "Section 02 — The Strategy", "03": "Section 03 — The Architecture", "04": "Section 04 — The Migration", "05": "Section 05 — The Economics", "06": "Section 06 — Risk & Governance", "07": "Section 07 — People & Change", "08": "Section 08 — Roadmap & Outcomes" };
const KB = [];
const E = (id, sec, keys, a, act, rel) => KB.push({ id, sec, keys, a, act, rel: rel || [] });

E("overview", "00", ["what is this", "overview", "summary", "summarise", "summarize", "mandate", "about this", "about the deck", "tell me about", "the project", "the proposal", "what is the plan", "big picture"],
  `<p>The deck proposes a <b>multi-cloud, PaaS-led transformation</b> of ABC Technology Services, anchored on DevOps, an AI/data platform and workforce reskilling. The aim is to turn a cost-centre IT shop into a scalable, margin-accretive AI-enabled digital services and GCC business, inside the Board's <b>₹25 crore, 3-year envelope</b>.</p><p>It runs in 3 migration waves over 36 months, governed by a CCoE and FinOps.</p>`, null, ["board", "problem", "roadmap"]);
E("board", "08", ["board", "approve", "approval", "decision", "decisions", "board ask", "asked to approve", "being asked", "recommendation", "final recommendation"],
  `<p>The Board is asked for four decisions: <b>(1)</b> approve the ₹25 Cr budget, <b>(2)</b> approve the Azure partnership, <b>(3)</b> approve the CCoE charter, and <b>(4)</b> sponsor the change programme.</p><p>Approvers named in the deck: CEO, CFO, COO, CIO, CHRO, CISO and Delivery leadership.</p>`, null, ["allocation", "roadmap", "illustrative"]);
E("illustrative", "08", ["illustrative", "assumption", "how accurate", "are these real", "estimate", "estimates", "how reliable", "real numbers"],
  `<p>The deck states that <b>all figures are illustrative assumptions</b>. The simulator follows the same rule: it uses simple, transparent formulas calibrated so the Board-recommended plan lands on the deck's stated targets, and every chart carries an "illustrative estimate" tag.</p>`, null, ["simulator", "assumptions"]);
E("problem", "01", ["problem", "problem statement", "why change", "pain", "pain points", "challenge", "challenges", "legacy", "current situation", "present situation", "business context", "current state", "issues"],
  `<p>The governing problem: <b>ABC cannot win or retain higher-value, AI-enabled digital services engagements, or protect delivery margins, while running on legacy, siloed infrastructure with limited automation.</b></p><p>Today's realities: on-prem / VM-based delivery, a fragmented application landscape per client, low analytics maturity (spreadsheets), inconsistent DevOps, and ageing infrastructure with rising maintenance cost.</p>`, null, ["stakeholders", "why cloud", "readiness"]);
E("stakeholders", "01", ["stakeholder", "stakeholders", "ceo", "cfo", "cio", "cto", "coo", "engineers", "clients", "who is affected", "impact", "impacts"],
  `<p>Stakeholder impacts in the deck: <b>CEO</b> is losing deals to rivals; <b>CFO</b> faces margin erosion and capex spend; <b>CIO/CTO</b> carries tech debt and security exposure; <b>COO/Delivery</b> sees slow provisioning and SLA risk; <b>Engineers</b> do manual, repetitive toil; <b>Clients</b> expect cloud-native AI; <b>Risk & Compliance</b> worry about multi-tenancy data risk.</p>`, null, ["urgent", "problem"]);
E("urgent", "01", ["most urgent", "urgent", "which stakeholder", "priority stakeholder", "whose concern"],
  `<p>The CFO's concern, <b>margin erosion and capex spend</b>, is marked most urgent. It is the forcing function: if margins do not improve, the funding case for everything else disappears. That is why FinOps and the payback target feature so prominently.</p>`, { label: "See the FinOps lever", preset: "finopsoff" }, ["finops", "payback"]);
E("whycloud", "01", ["why cloud", "instead of cloud", "why not upgrade", "just upgrade", "upgrade existing", "upgrading", "why not simply upgrade"],
  `<p>Upgrading legacy infrastructure only fixes capacity and reliability. It does not give elastic scalability, does not build the AI/data platform needed for new revenue, and does not solve skills and talent competitiveness. Cloud is the path that solves the <b>business</b> problem (margin and growth), not just the technical one.</p>`, null, ["problem", "objectives"]);
E("different", "01", ["how is this different", "different from other", "other companies", "services company", "unique", "why is legacy different"],
  `<p>For a services company, IT infrastructure is not a support function, it is the product. Slow, manual provisioning throttles billable delivery and client satisfaction directly, unlike a manufacturer where IT is a cost centre behind production.</p>`, null, ["problem"]);
E("objectives", "02", ["objective", "objectives", "goals", "aims", "strategic objectives", "what are we trying"],
  `<p>Three objectives: <b>Modernise platform</b> (cut cost-to-serve, compress provisioning from weeks to hours), <b>Build AI & data</b> (launch new AI services, raise revenue per engagement), and <b>Governed multi-cloud</b> (an operating model with FinOps to protect margins).</p>`, null, ["readiness", "service models"]);
E("readiness", "02", ["readiness", "ready", "maturity", "foundational", "assessment", "cloud readiness", "low readiness"],
  `<p>The readiness snapshot: Applications <b>Low-Med</b> (monolithic), Data <b>Low</b> (siloed, spreadsheets), Security <b>Med</b> (perimeter-based), Skills <b>Low</b> (small pockets), Governance <b>Low</b> (no unified CCoE).</p><p>Conclusion: <b>foundational stage, phased transformation required.</b> Being honest about low readiness is what justifies three waves instead of a big-bang move.</p>`, null, ["waves", "outsource"]);
E("models", "02", ["service model", "service models", "iaas", "paas", "saas", "blend", "what is paas", "what is iaas", "what is saas", "infrastructure as a service", "platform as a service"],
  `<p>The blend is <b>IaaS / PaaS / SaaS</b> with PaaS as the primary focus:</p><p><b>IaaS</b> bridges legacy and regulated client workloads (lift-and-shift first, no risky Day 1 re-architecture). <b>PaaS</b> is the core driver for modernisation and new AI services; it accelerates DevOps and CI/CD and removes infrastructure toil. <b>SaaS</b> covers internal ITSM, HRMS and collaboration.</p>`, { label: "Try an IaaS-heavy blend", preset: "iaas" }, ["whypaas", "azure"]);
E("whypaas", "02", ["all in on paas", "all-in on paas", "why not paas", "paas immediately", "bridge", "why not just paas", "go all in"],
  `<p>Some workloads, such as the legacy ERP and certain regulated client systems, are not PaaS-ready without significant refactoring risk. <b>IaaS is a deliberate bridge</b> for those, not a permanent state. That is why the 5Rs show ERP as rehost now, refactor later.</p>`, { label: "Try an IaaS-heavy blend", preset: "iaas" }, ["5rs", "models"]);
E("azure", "02", ["why azure", "azure primary", "azure", "primary cloud", "evaluation criteria", "criteria", "scoring", "provider selection", "which cloud", "aws secondary", "why aws", "secondary cloud"],
  `<p><b>Azure is primary</b>: the core platform for enterprise apps, AI/ML services and identity integration. <b>AWS is secondary</b>: resilience and diversity, avoiding vendor lock-in and supporting specialised workloads.</p><p>The scoring (out of 4, Azure vs AWS): hybrid tooling fit <b>4 vs 3</b>, AI/ML maturity <b>4 vs 4</b>, India regions/compliance <b>3 vs 3</b>, talent in India <b>3 vs 3</b>, cost predictability <b>3 vs 2</b>. The presenter notes add Azure's fit with ABC Group's existing Microsoft ecosystem.</p>`, { label: "Try an AWS-led mix", preset: "awsfirst" }, ["awsfirst", "multicloud"]);
E("awsfirst", "02", ["aws first", "aws-first", "aws primary", "instead of azure", "switch to aws", "swap azure", "reverse the", "go aws", "aws led", "aws-led", "what if aws"],
  `<p>Going AWS-first would trade away Azure's lead on <b>hybrid tooling fit (4 vs 3)</b> and <b>cost predictability (3 vs 2)</b>. AI/ML maturity, India regions and talent score the same. On the plus side it lowers vendor lock-in, a Medium risk in the register.</p><p>Try it in the simulator to see the effect on savings, payback and risk.</p>`, { label: "Try it in the Simulator", preset: "awsfirst" }, ["azure", "lockin"]);
E("multicloud", "02", ["complexity", "multi cloud", "multicloud", "multi-cloud", "duplicate", "standardise", "standardize", "isn't multi cloud", "more complex"],
  `<p>Yes, multi-cloud adds complexity. The mitigation is to standardise DevOps tooling and IaC <b>across</b> clouds, so engineers work with common pipelines rather than duplicated skill silos. Multi-cloud is especially justified for a GCC because clients have their own cloud preferences.</p>`, { label: "Try an AWS-led mix", preset: "awsfirst" }, ["azure", "landing"]);
E("onprem", "02", ["on prem", "on-prem", "on premises", "on-premises", "data residency", "retain on", "sovereign", "retained on prem"],
  `<p>On-premises is retained <b>strictly and in limited form</b>, for sovereign data-residency requirements and legacy compliance. It links to the cloud landing zones through ExpressRoute / VPN in the Connectivity layer.</p>`, null, ["layers"]);
E("outsource", "02", ["outsource", "systems integrator", "msp", "partner support", "si ", "whole migration"],
  `<p>Partner / MSP support is recommended for skills gaps in Wave 1, but the <b>CCoE and core architecture ownership stay in-house</b>. ABC's differentiation depends on owning its cloud and AI capability, not renting it permanently.</p>`, null, ["skillsgap", "readiness"]);
E("pillars", "03", ["pillar", "pillars", "three pillars"],
  `<p>Three pillars: <b>Multi-Cloud Foundation</b> (Azure primary, AWS secondary), <b>Data & AI Engine</b> (centralised analytics and MLOps, the new revenue engine), and <b>Modular Service Layers</b> (client delivery, security and SaaS).</p>`, null, ["layers"]);
E("layers", "03", ["layer", "layers", "seven layers", "7 layers", "architecture", "target architecture", "stack", "seven"],
  `<p>Seven layers, top to bottom: <b>01</b> Client Delivery (Kubernetes, API gateway), <b>02</b> Shared Services (SaaS), <b>03</b> Data & AI (data lake, ML workbench, MLOps), <b>04</b> DevOps / Automation (CI/CD, IaC, self-service), <b>05</b> Security (centralised IAM/Entra, zero-trust per client, CASB, encryption), <b>06</b> Connectivity (ExpressRoute/VPN), <b>07</b> Multi-Cloud Landing Zones.</p>`, null, ["dataai", "landing"]);
E("dataai", "03", ["data lake", "mlops", "ai layer", "revenue engine", "ai platform", "new revenue", "data and ai", "data & ai", "ai services revenue"],
  `<p>The <b>Data & AI layer</b> (centralised data lake, AI/ML workbench, MLOps pipeline) is flagged as the <b>new revenue engine</b>. It is the reusable asset behind managed AI services, which is why client analytics apps are refactored to cloud-native microservices.</p>`, null, ["refactor", "layers"]);
E("landing", "03", ["landing zone", "landing zones", "iac", "infrastructure as code", "policy governed"],
  `<p>Landing zones are standardised, <b>policy-governed environments built through Infrastructure-as-Code</b> on both Azure and AWS. A landing zone is pre-configured and policy-compliant, so consistency and governance apply from day one.</p>`, null, ["layers", "waves"]);
E("critrisk", "06", ["critical risk", "most critical", "biggest risk", "single most", "top risk"],
  `<p>The most critical architecture risk is <b>multi-tenant data leakage</b> across client environments that share platform layers. It is mitigated by per-client network segmentation, centralised IAM with least-privilege access, and encryption at rest and in transit by default.</p>`, { label: "Try low security spend", preset: "lowsec" }, ["controls", "register"]);
E("5rs", "04", ["5r", "5rs", "five rs", "rehost", "replatform", "refactor", "retire", "retain", "migration framework", "migration strategy", "what is rehost"],
  `<p>The <b>5Rs</b> framework: <b>Rehost</b> (lift-and-shift), <b>Replatform</b> (small optimisations, e.g. managed PaaS), <b>Refactor / Rearchitect</b> (rebuild cloud-native), <b>Retire</b> (decommission), <b>Retain</b> (keep as-is for now).</p><p>Applied to six workloads: PM tools and dev/test are replatformed, ERP is rehosted first, legacy ITSM is retired for SaaS, analytics apps are refactored, and HR/Payroll is retained short term.</p>`, null, ["workloads", "waves"]);
E("workloads", "04", ["workload", "workloads", "erp", "payroll", "hr system", "itsm", "pm tools", "dev test", "dev/test", "analytics apps", "finance"],
  `<p>Six representative workloads: <b>Client Delivery / PM Tools</b> → Replatform; <b>Internal ERP / Finance</b> → Rehost first, refactor in a later wave; <b>Legacy ITSM</b> → Retire (replace with SaaS); <b>Client Analytics Apps</b> → Refactor (new revenue); <b>HR / Payroll</b> → Retain short term (compliance); <b>Dev/Test</b> → Replatform (containers + IaC).</p>`, null, ["5rs", "refactor"]);
E("refactor", "04", ["why refactor", "refactor analytics", "analytics app", "replatform like", "why not replatform"],
  `<p>The analytics app is the foundation for the new AI-enabled services revenue stream. It needs a cloud-native, microservices architecture to support AI/ML integration, which replatforming alone would not deliver.</p>`, null, ["dataai", "workloads"]);
E("waves", "04", ["wave", "waves", "sequencing", "wave 1", "wave 2", "wave 3", "crawl", "three waves", "3 waves"],
  `<p>Three waves over 36 months, sequenced by risk (low-risk first):</p><p><b>Wave 1 (M0–M6)</b>: dev/test, internal SaaS, CCoE and landing zones. <b>Wave 2 (M6–M18)</b>: replatform PM tools, refactor analytics, build the data lake / AI platform. <b>Wave 3 (M18–M36)</b>: ERP refactor, regulated client workloads, full FinOps maturity.</p>`, { label: "Try a conservative pace", preset: "cons" }, ["rollback", "roadmap"]);
E("rollback", "04", ["rollback", "roll back", "cutover", "continuity", "blue green", "blue-green", "warm standby", "parallel run", "cutover fails", "fails"],
  `<p>Continuity plan: <b>phased parallel-run</b> per account, legacy kept in <b>warm standby</b> after cutover, <b>blue-green</b> deployment for client systems, and a <b>post-wave rightsizing review 4–6 weeks</b> after each wave. If a cutover fails, warm standby lets you reverse without full data loss.</p>`, null, ["waves", "sla"]);
E("allocation", "05", ["investment", "allocation", "25 crore", "₹25", "25 cr", "budget split", "how is the budget", "breakdown", "allocate", "where does the money", "budget"],
  `<p>The ₹25 Cr splits as: <b>Migration 40%</b> (₹10 Cr), <b>Infra / PaaS 25%</b> (₹6.25 Cr), <b>Skills 10%</b>, <b>AI Build 10%</b>, <b>Security / Governance 10%</b> (₹2.5 Cr each), and <b>Contingency 5%</b> (₹1.25 Cr).</p>`, { label: "Change the budget mix", preset: "lowsec" }, ["tco", "ten crore"]);
E("tco", "05", ["tco", "total cost", "year 1", "dual run", "dual-run", "cost comparison", "why is year 1", "higher year", "year one", "capex", "opex"],
  `<p>Year 1 cloud cost is <b>higher than legacy</b> because of migration cost and dual-running old and new systems. From Year 2, unit cost declines rapidly. A chart showing immediate savings would be unrealistic. The shift is also from CAPEX (upfront hardware) to OPEX (recurring, usage-based).</p>`, null, ["payback", "assumptions"]);
E("payback", "05", ["roi", "payback", "pay back", "return on", "24 30", "24-30", "how long to recover", "break even", "break-even"],
  `<p>Targets: <b>24–30 month payback</b>, 20–25% infra maintenance reduction by Year 3, provisioning from weeks to hours, a new AI-services revenue line, and near-zero SLA downtime penalties. The payback figure is the number most likely to be quoted back to a presenter.</p>`, { label: "Watch payback in the Simulator", preset: "cons" }, ["tco", "finops"]);
E("finops", "05", ["finops", "fin ops", "cost governance", "chargeback", "tagging", "savings plan", "savings plans", "reserved instances", "rightsizing"],
  `<p>The FinOps approach: <b>cost tagging</b> per account for chargeback, <b>budgets, alerts and monthly reviews</b>, <b>reserved instances / savings plans</b>, and regular <b>rightsizing reviews by the CCoE</b>. FinOps means managing cloud cost with visibility, accountability and optimisation, treated as a shared financial responsibility.</p>`, { label: "Try FinOps off", preset: "finopsoff" }, ["margins", "itbudget"]);
E("margins", "05", ["protect margin", "protect margins", "margin", "margins", "how does finops protect"],
  `<p>FinOps is the governance answer to the CFO's core fear, unpredictable consumption cost. Per-account tagging makes spend attributable, budgets and alerts catch drift early, savings plans lower unit cost, and CCoE rightsizing reviews keep it down. Without it, the register's top risk, <b>cost overrun</b>, rises.</p>`, { label: "See FinOps off in the Simulator", preset: "finopsoff" }, ["finops", "costhigher"]);
E("itbudget", "05", ["it budget", "different from budget", "finops different", "finops versus", "finops vs"],
  `<p>Traditional IT budgeting is annual and centralised. FinOps is <b>continuous, granular</b> (per client account or workload) and <b>cross-functional</b>: engineers, finance and account owners share cost decisions in near-real time.</p>`, null, ["finops"]);
E("assumptions", "05", ["assumptions", "biggest assumptions", "three biggest", "key assumptions", "what assumptions"],
  `<p>The three biggest assumptions (from the presenter notes): <b>(1)</b> migration and modernisation cost about 40% of budget, based on typical enterprise ratios, not vendor quotes; <b>(2)</b> benefits (infra savings, new AI revenue) ramp from Year 2, not Year 1; <b>(3)</b> provider pricing stays stable, with no allowance for consumption spikes without FinOps controls.</p>`, null, ["illustrative", "tco"]);
E("costhigher", "05", ["25% higher", "costs rise", "cost overrun", "higher than estimate", "overrun", "overspend", "what if costs", "costs are higher", "over budget"],
  `<p>The wave structure is a natural cost-control lever: pause or re-scope <b>Wave 3</b> (the most discretionary) before touching Wave 1 foundations, and use FinOps to find savings elsewhere first. In the register, cost overrun is rated <b>High</b> and mitigated by FinOps guardrails, monthly budget alerts and CCoE cost review. The 5% contingency is the buffer.</p>`, { label: "Try FinOps off", preset: "finopsoff" }, ["finops", "register"]);
E("tencrore", "05", ["10 crore", "₹10", "10 cr", "half the budget", "smaller budget", "less budget", "only 10", "cut the budget"],
  `<p>With ₹10 crore, prioritise <b>Wave 1 plus core Wave 2</b>: landing zones, the CCoE, dev/test and SaaS migration, initial reskilling and the data/AI platform foundation. Defer the full ERP refactor and expanded multi-cloud governance maturity to a later, separately funded phase. Protect the reskilling budget even under cuts, since it is the lowest-cost, highest-leverage item.</p>`, { label: "Cut the skills budget", preset: "lightskills" }, ["allocation", "waves"]);
E("toprisks", "06", ["top risks", "gcc risk", "gcc risks", "multi tenant", "multi-tenant", "leakage", "insecure api", "insecure apis", "identity sprawl", "insider", "ransomware", "third party", "third-party"],
  `<p>Top GCC risks: <b>multi-tenant data leakage</b>, insecure APIs on refactored client apps, identity sprawl across clouds, insider threat from broad access needs, and ransomware / third-party risk. Multi-tenant leakage is the most distinctive one for an IT-services business.</p>`, null, ["controls", "register"]);
E("controls", "06", ["controls", "core controls", "zero trust", "zero-trust", "iam", "sso", "mfa", "encryption", "casb", "siem", "soc", "devsecops", "security controls", "entra"],
  `<p>Core controls: <b>zero-trust</b> architecture with per-client segments (no user or device is trusted by default; every access request is verified), <b>centralised IAM</b> (SSO + MFA, Entra), <b>encryption</b> at rest and in transit, <b>CASB + SIEM/SOC</b> monitoring, and <b>DevSecOps</b> (security scanning shifted left into CI/CD).</p>`, { label: "Try low security spend", preset: "lowsec" }, ["toprisks", "compliance"]);
E("governance", "06", ["governance", "escalation", "who decides", "accountable", "accountability", "ccoe", "cloud centre of excellence", "cloud center of excellence", "ownership", "escalation tier", "tiers"],
  `<p>Three-tier escalation: <b>CIO/CTO</b> (strategic platform decisions) → <b>CCoE</b> (architecture standards, FinOps guardrails) → <b>Business / Account Owners</b> (client-specific exceptions and compliance). If a client-specific compliance issue arises, the account owner is accountable operationally while the CCoE sets and audits the standards centrally.</p>`, null, ["register"]);
E("register", "06", ["risk register", "register", "risks", "mitigation", "mitigations", "five risks", "5 risks"],
  `<p>The risk register: <b>Cost overrun</b> (High), <b>Multi-tenant data breach</b> (High), <b>Skills gap delaying migration</b> (Med), <b>Vendor lock-in</b> (Med), <b>Client SLA disruption</b> (Low). Each has a named mitigation: FinOps guardrails; segmentation, encryption and access reviews; reskilling plus partner/MSP support; multi-cloud with portable IaC; and phased per-account cutover with tested rollback.</p>`, { label: "See the live register", preset: "lowsec" }, ["governance", "controls"]);
E("lockin", "06", ["vendor lock in", "vendor lock-in", "lock in", "lock-in", "avoid lock"],
  `<p>Vendor lock-in is rated <b>Medium</b>. The mitigation is a multi-cloud architecture, portable IaC, and avoiding proprietary-only services. AWS as the secondary cloud exists partly for this reason.</p>`, { label: "Try an AWS-led mix", preset: "awsfirst" }, ["azure", "register"]);
E("sla", "06", ["sla", "sla disruption", "downtime", "client sla", "service levels"],
  `<p>Client SLA disruption is rated <b>Low</b>, mitigated by phased, per-account cutover with tested rollback plans (parallel-run, warm standby, blue-green). The economic goal is near-zero downtime SLA penalties.</p>`, { label: "Try an aggressive pace", preset: "cons" }, ["rollback"]);
E("compliance", "06", ["compliance", "dpdp", "iso 27001", "soc 2", "compliance targets", "iso", "data protection"],
  `<p>Compliance targets are the <b>India DPDP Act</b>, <b>ISO 27001</b> and <b>SOC 2</b>, to strengthen GCC credibility. The account owners handle client-specific compliance; the CCoE audits the underlying standards.</p>`, null, ["governance", "controls"]);
E("skills", "07", ["reskill", "reskilling", "skills", "training", "tracks", "certification", "certified", "bootcamp", "bootcamps", "academy", "cohort", "certifications", "70%", "70 percent"],
  `<p>Reskilling tracks: <b>certifications</b> (Associate → Professional) on Azure/AWS, <b>DevOps/CI-CD bootcamps</b> for delivery engineers, targeted <b>AI/ML cohorts</b> to seed the new practice, and <b>partner-led training</b> via hyperscaler academies. The target is <b>~70% certified by Year 2</b>.</p>`, { label: "Try light reskilling", preset: "lightskills" }, ["roles", "adoption"]);
E("skillsgap", "07", ["skills gap", "skill gap", "skills shortage", "talent"],
  `<p>"Skills gap delaying migration" is rated <b>Medium</b> in the register, mitigated by structured reskilling plus short-term partner/MSP support. Reskilling is also a retention and delivery-capacity argument: without it ABC loses staff to competitors or hires externally at a premium.</p>`, { label: "Try light reskilling", preset: "lightskills" }, ["skills"]);
E("roles", "07", ["roles", "operating roles", "cloud architect", "devsecops engineer", "finops analyst", "aiml engineer", "ai/ml engineer", "ccoe lead", "target roles"],
  `<p>Five target operating roles: <b>Cloud Architect</b>, <b>DevSecOps Engineer</b>, <b>FinOps Analyst</b>, <b>AI/ML Engineer</b> and <b>CCoE Lead</b>.</p>`, null, ["skills", "opmodel"]);
E("opmodel", "07", ["operating model", "pods", "cloud and ai pods", "cloud & ai pods", "siloed", "staff augmentation", "siloed projects"],
  `<p>The operating model shifts from <b>siloed projects</b> (staff augmentation, on-prem delivery) to <b>cross-functional Cloud + AI Pods</b> with CCoE governance. It is arguably the most transformative, hardest-to-execute change in the whole proposal.</p>`, null, ["adoption"]);
E("adoption", "07", ["adoption", "metrics", "engagement", "time to productivity", "time-to-productivity", "how will employees", "change management", "resist", "resistance", "obsolete", "how do you ensure"],
  `<p>Adoption is tracked through <b>certification %</b> (~70% by Year 2), <b>time-to-productivity</b> for redeployed legacy staff, and an <b>engagement score</b> from regular surveys. To drive adoption: tie certification to career progression, embed cloud champions per account, and communicate role evolution rather than job losses. Senior staff resistance is met with redeployment pathways and reskilling, framing legacy expertise as valuable domain knowledge.</p>`, { label: "Try intensive reskilling", preset: "intensive" }, ["skills", "opmodel"]);
E("roadmap", "08", ["roadmap", "stage", "stages", "assess", "migrate", "transform", "optimise", "optimize", "36 month", "36 months", "timeline", "phases", "phase", "four stages", "4 stages"],
  `<p>A four-stage, 36-month roadmap: <b>Stage 1 Assess (M0–6)</b>: CCoE, dev/test audit, SaaS readiness. <b>Stage 2 Migrate (M6–18)</b>: core platform migration, foundational AI infrastructure, Wave 1 transition. <b>Stage 3 Transform (M18–30)</b>: production AI services, governance at scale, cloud-native acceleration. <b>Stage 4 Optimise (M30–36)</b>: advanced FinOps maturity and full digital scale.</p>`, { label: "Try a conservative pace", preset: "cons" }, ["waves", "outcomes"]);
E("outcomes", "08", ["outcome", "outcomes", "kpi", "kpis", "target outcomes", "80%", "nps", "targets", "success measures"],
  `<p>Target outcomes (illustrative), each with a named owner: <b>~20–25%</b> infra cost reduction (CFO), <b>weeks → hours</b> provisioning (COO), <b>~80%</b> workloads migrated by Year 3 (CIO), a <b>new AI-services revenue line</b> (CEO), <b>~70%</b> workforce certified by Year 2 (CHRO), a <b>downward</b> security-incident trend (CISO), and <b>improved</b> client NPS (Delivery).</p>`, { label: "Open the Simulator", preset: "reset" }, ["measure", "board"]);
E("measure", "08", ["12 months", "measure value", "measured", "after migration", "how will value", "value 12"],
  `<p>At 12 months, expect early signals on <b>leading indicators</b>: provisioning time, % of Wave 1/2 workloads migrated, and certification rate. <b>Lagging</b> financial indicators (cost reduction, new AI revenue) become measurable from about Month 18–24 as Wave 2 benefits mature.</p>`, null, ["outcomes"]);
E("glossary", "05", ["capex vs opex", "what is capex", "what is opex", "what is tco", "what is roi", "define", "meaning of", "glossary"],
  `<p>Terms as the deck frames them: <b>CAPEX</b> is upfront hardware spend; <b>OPEX</b> is recurring, usage-based cost. <b>TCO</b> is all costs (infra, migration, licences, training, support) over a defined period. <b>Payback period</b> is the time to recover the investment. Ask about any specific term, such as FinOps, CCoE, 5Rs or zero-trust.</p>`, null, ["tco", "finops"]);
E("rporto", "06", ["rpo", "rto", "recovery point", "recovery time", "recovery", "backup"],
  `<p>RPO is how much data loss is acceptable and RTO is how fast systems must be restored after an incident. In the deck, recovery is supported by warm standby of legacy systems and tested rollback plans (Section 04), with security controls in Section 06.</p>`, null, ["rollback", "controls"]);
E("gcc", "01", ["gcc", "global capability centre", "global capability center", "capability centre", "abc technology"],
  `<p>A Global Capability Centre (GCC) provides technology, business-process or engineering services, either as an internal shared-service arm or externally to clients. ABC Technology Services plays both roles, so the strategy must serve internal group needs and external client credibility at once.</p>`, null, ["problem"]);
E("devops", "03", ["devops", "ci cd", "ci/cd", "pipelines", "self service", "self-service"],
  `<p>The <b>DevOps / Automation layer</b> holds CI/CD pipelines, Infrastructure-as-Code and environment self-service. It is what compresses provisioning from weeks to hours, and DevSecOps shifts security scanning into the same pipelines.</p>`, { label: "Try the platform levers", preset: "iaas" }, ["landing", "controls"]);
E("simulator", "00", ["simulator", "simulate", "how do i use", "levers", "compare scenarios", "compare", "reset", "what can i change", "what can the simulator"],
  `<p>The simulator has six lever groups: budget mix (six linked sliders totalling ₹25 Cr), cloud mix, service blend, migration pace, reskilling intensity and FinOps maturity. Outputs recompute live and carry delta arrows versus the Board plan. Use <b>Compare scenarios</b> to pin one state and see ghost marks against a second.</p>`, { label: "Open the Simulator", preset: "reset" }, ["illustrative"]);

/* ---- retrieval ---- */
const norm = (s) => " " + s.toLowerCase().replace(/[^a-z0-9₹%]+/g, " ").trim() + " ";
KB.forEach((e) => { e.nk = e.keys.map((k) => norm(k)); });
const OUT = ["stock", "share price", "gcp", "google cloud", "oracle", "alibaba", "ibm cloud", "salesforce", "weather", "recipe", "bitcoin", "football", "cricket", "movie", "who won", "capital of"];
const SUGG = ["Why Azure primary, AWS secondary?", "What's the 5Rs migration framework?", "What is the Board being asked to approve?", "How does FinOps protect margins?"];
const TITLES = { overview: "What is this proposal?", board: "What is the Board asked to approve?", illustrative: "How reliable are the numbers?", problem: "What is the core problem?", stakeholders: "Who is affected?", urgent: "Which stakeholder is most urgent?", whycloud: "Why cloud, not an upgrade?", objectives: "What are the objectives?", readiness: "How ready is ABC today?", models: "IaaS, PaaS and SaaS?", whypaas: "Why not all-in on PaaS?", azure: "Why Azure primary, AWS secondary?", awsfirst: "What if AWS goes first?", multicloud: "Doesn't multi-cloud add complexity?", onprem: "Why keep some on-prem?", outsource: "Why not outsource it all?", pillars: "What are the three pillars?", layers: "What are the seven layers?", dataai: "What is the Data & AI layer?", landing: "What is a landing zone?", critrisk: "What is the most critical risk?", "5rs": "What is the 5Rs framework?", workloads: "Which workloads move how?", refactor: "Why refactor analytics?", waves: "How do the waves work?", rollback: "What is the rollback plan?", allocation: "How is the ₹25 Cr split?", tco: "Why is Year 1 costlier?", payback: "What is the payback target?", finops: "What is FinOps here?", margins: "How does FinOps protect margins?", itbudget: "FinOps vs an IT budget?", assumptions: "What are the biggest assumptions?", costhigher: "What if costs run 25% higher?", tencrore: "What if only ₹10 Cr?", toprisks: "What are the top GCC risks?", controls: "What are the core controls?", governance: "Who is accountable?", register: "What is in the risk register?", lockin: "How is lock-in handled?", sla: "What about SLA disruption?", compliance: "Which compliance targets?", skills: "What are the reskilling tracks?", skillsgap: "What about the skills gap?", roles: "What are the target roles?", opmodel: "What is the operating model shift?", adoption: "How will adoption be measured?", roadmap: "What is the 36-month roadmap?", outcomes: "What are the target outcomes?", measure: "How is value measured at 12 months?", glossary: "Define TCO, CAPEX and OPEX", rporto: "What are RPO and RTO?", gcc: "What is a GCC?", devops: "What does DevOps do here?", simulator: "How do I use the simulator?" };

function retrieve(q) {
  const nq = norm(q);
  if (OUT.some((t) => nq.includes(" " + t + " ") || nq.includes(" " + t))) return { out: true };
  if (/^\s*(hi|hello|hey|hola|good (morning|evening|afternoon))\b/i.test(q.trim()) && q.trim().split(/\s+/).length < 5) return { greet: true };
  if (/^\s*(thanks|thank you|thx|ok|okay|cool)\b/i.test(q.trim()) && q.trim().split(/\s+/).length < 5) return { thanks: true };
  const scored = KB.map((e) => {
    let s = 0;
    e.nk.forEach((k) => { if (nq.includes(k)) s += 2 * k.trim().split(" ").length; });
    return { e, s };
  }).filter((x) => x.s > 0).sort((a, b) => b.s - a.s);
  if (!scored.length || scored[0].s < 2) return { none: true };
  return { hit: scored[0].e, alt: scored.slice(1, 3).map((x) => x.e) };
}

/* ---- UI ---- */
const chat = $("#chat"), log = $("#log"), form = $("#chatForm"), input = $("#chatIn");
let lastFocus = null, greeted = false;
function scrollLog() { log.scrollTop = log.scrollHeight; }
function addMsg(cls, html) { const d = document.createElement("div"); d.className = "msg " + cls; d.innerHTML = html; log.appendChild(d); scrollLog(); return d; }
function chipRow(ids) {
  const items = ids.map((id) => (typeof id === "string" && KB.find((k) => k.id === id) ? { q: TITLES[id] } : { q: id }));
  return `<div class="chips">${items.map((i) => `<button class="qchip" type="button" data-q="${i.q.replace(/"/g, "&quot;")}">${i.q}</button>`).join("")}</div>`;
}
function welcome() {
  if (greeted) return; greeted = true;
  addMsg("b", `<p>Ask me anything about <b>Cloud Transformation 2030</b>: the problem, strategy, architecture, migration, economics, risk, people or roadmap. I answer only from this proposal, and I can jump you to the matching simulator lever.</p>${chipRow(SUGG)}`);
}
function respond(q) {
  const r = retrieve(q);
  const t = addMsg("b", `<span class="typing" aria-label="Typing"><i></i><i></i><i></i></span>`);
  setTimeout(() => {
    let html;
    if (r.hit) {
      const e = r.hit;
      html = e.a + `<span class="cite">${SEC[e.sec]}</span>` + (e.act ? `<div class="act"><button class="btn sm primary" type="button" data-act="${e.act.preset}">${e.act.label} →</button></div>` : "");
      const rel = (e.rel.length ? e.rel : r.alt.map((a) => a.id)).slice(0, 2).filter((id) => TITLES[id]);
      if (rel.length) html += chipRow(rel);
    } else if (r.greet) html = `<p>Hello. Ask about any of the eight sections, or try one of these.</p>${chipRow(SUGG)}`;
    else if (r.thanks) html = `<p>Happy to help. Ask about another section whenever you like.</p>${chipRow(SUGG.slice(0, 2))}`;
    else html = `<p>I only cover this transformation proposal (Cloud Transformation 2030 for ABC Technology Services), so I can't help with that one. Here are things I can answer:</p>${chipRow(["What is the Board asked to approve?", "How is the ₹25 Cr split?", "What are the top GCC risks?"])}`;
    t.innerHTML = html; scrollLog();
  }, reduce ? 0 : 650);
}
function ask(q) { q = q.trim(); if (!q) return; const u = document.createElement("div"); u.className = "msg u"; u.textContent = q; log.appendChild(u); scrollLog(); respond(q); }

function openChat() {
  lastFocus = document.activeElement; chat.classList.add("open"); chat.removeAttribute("inert"); chat.setAttribute("aria-hidden", "false");
  $$("[aria-controls='chat']").forEach((b) => b.setAttribute("aria-expanded", "true")); $("#fab").style.display = "none";
  welcome(); setTimeout(() => input.focus(), 120);
}
function closeChat() {
  chat.classList.remove("open"); chat.setAttribute("inert", ""); chat.setAttribute("aria-hidden", "true");
  $$("[aria-controls='chat']").forEach((b) => b.setAttribute("aria-expanded", "false")); $("#fab").style.display = "";
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}
$("#navAsk").addEventListener("click", () => (chat.classList.contains("open") ? closeChat() : openChat()));
$("#fab").addEventListener("click", openChat);
$("#chatClose").addEventListener("click", closeChat);
$$("[data-ask]").forEach((b) => b.addEventListener("click", openChat));
addEventListener("keydown", (e) => { if (e.key === "Escape" && chat.classList.contains("open")) closeChat(); });
form.addEventListener("submit", (e) => { e.preventDefault(); const v = input.value; input.value = ""; ask(v); });
log.addEventListener("click", (e) => {
  const q = e.target.closest("[data-q]"); if (q) { ask(q.dataset.q); return; }
  const a = e.target.closest("[data-act]");
  if (a) { const p = a.dataset.act; if (matchMedia("(max-width:900px)").matches) closeChat(); if (p === "reset") { S = clone(BASE); syncSliders(); update(); $("#simulator").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); } else applyPreset(p); }
});
