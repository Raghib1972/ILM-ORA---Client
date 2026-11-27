/* ilmoracnappData.js — all copy + lab/quiz content for the CNAPP page (data only, no UI). */

export const MANAGER_EMAIL = "manager@example.com"; // TODO: apna real manager email yahan daalo
export const STORE_KEY = "cnapp"; // localStorage key for progress
export const PASS_MARK = 75; // assessment pass %
export const LAB_PASS_RISK = 25; // lab complete when risk score is below this

/* [sectionKey, label] — sub-nav order */
export const SEC = [
  ["hero","Hero"],
  ["overview","Overview"],
  ["why","Why CNAPP"],
  ["components","Components"],
  ["benefits","Benefits"],
  ["compare","Comparison"],
  ["usecases","Use cases"],
  ["roadmap","Roadmap"],
  ["solutions","Solutions"],
  ["lab","Practical Lab"],
  ["quiz","Assessment"],
  ["progress","My progress"],
  ["resources","Resources"],
  ["connect","Connect"],
  ["faq","FAQs"],
];

/* [group, name, description] */
export const COMP = [
  ["Posture","CSPM","Checks cloud configurations, compliance and identity permissions to catch misconfigurations and exposures."],
  ["Posture","KSPM","Evaluates the security posture of Kubernetes clusters and orchestration settings."],
  ["Posture","IaC scanning","Scans Terraform, Bicep and similar templates for flaws before infrastructure is deployed."],
  ["Posture","ASPM","Tracks the security posture of cloud-native and AI-assisted applications."],
  ["Posture","DSPM","Finds sensitive data, tracks its exposure and ranks data risks across cloud services."],
  ["Identity","CIEM","Manages cloud identities and privileges and enforces least privilege."],
  ["Identity","Entitlements management","Understands cloud identities, roles and permissions and builds risk-prioritized attack graphs."],
  ["Identity","IAM","Foundational authentication, roles and permissions across cloud resources."],
  ["Workload","CWPP","Agent-based and agentless runtime visibility for VMs, containers and serverless functions."],
  ["Workload","Registry scanning","Examines container images and registries for vulnerabilities, misconfigurations and exposed secrets."],
  ["Workload","Drift detection","Flags workloads that deviate from their expected state, a sign of unauthorized change."],
  ["Network","API discovery","Finds and monitors APIs to spot vulnerabilities and abnormal behavior."],
  ["Network","Traffic mapping","Maps connectivity and watches traffic to reveal anomalous patterns."],
  ["Detection","CDR","Detects and responds to threats using event logs, network logs and DNS lookups."],
];

/* [title, text] — Key takeaways */
export const KT = [
  ["One platform","Unifies disparate tools to reduce gaps and improve efficiency."],
  ["Full lifecycle","Protects apps from cloud build and deployment to runtime."],
  ["Shift left","Brings security into pipelines and DevSecOps workflows."],
  ["Unified visibility","Covers hybrid and multicloud so risk is found before it escalates."],
  ["Shared ownership","Connects security, development and operations teams."],
];

export const WHY = [
  ["Visibility and fragmentation","Tool sprawl, disconnected tools and teams, limited XDR and CDR integration."],
  ["Scale and complexity","Growing attack surface, changing compliance rules, hard risk prioritization."],
  ["Configuration and access","Misconfigurations, over-permissioned access, too many alerts and little guidance."],
  ["Speed and development pressure","Fast releases strain open-source and AI model security, and manual fixes slow remediation."],
  ["Emerging AI risks","Prompts, models and training data bring data leaks and prompt injection."],
];

export const BEN = [
  ["Multicloud visibility","See resources, workloads and apps wherever they run."],
  ["Full lifecycle protection","Natively integrated controls from development to runtime."],
  ["Proactive risk reduction","Posture management, threat intelligence and attack path analysis."],
  ["Less tool sprawl","One platform replaces many point products."],
  ["Automated detection and response","Real-time handling of cloud and AI threats, including APT activity."],
  ["Deep workload protection","Covers storage, databases and generative AI models."],
  ["Shift-left with DevSecOps","Security enters the pipeline early."],
  ["Compliance and governance","Stay aligned with changing regulations."],
  ["Cost savings","Lower operating overhead and lower breach costs."],
];

export const USE = [
  ["Stop misconfigurations","Catch bad settings before they become breaches or violations."],
  ["Secure multicloud","Apply consistent policy across providers and hybrid setups."],
  ["Defend against APTs","Spot sophisticated attacks on apps, workloads and data."],
  ["Tighten identity security","Enforce least privilege and reduce insider risk."],
  ["Container security and DevSecOps","Embed checks in containerized apps and pipelines."],
  ["Prepare for incidents","Use monitoring, alerts and risk assessments ahead of time."],
  ["Monitor network security","Watch traffic and connectivity for anomalies and attack paths."],
  ["Protect the full app lifecycle","From development through deployment and runtime."],
  ["Gain complete visibility","One view of environments, workloads and apps."],
  ["Prioritize risks in context","Focus on what matters most, not on raw alert counts."],
];

export const BP = [
  ["Least privilege and Zero Trust","Limit access to what is needed and keep verifying."],
  ["Segment and harden","Isolate workloads and secure Kubernetes."],
  ["Automate","Scan for vulnerabilities and respond to incidents automatically."],
  ["Integrate with DevSecOps","Embed checks in existing pipelines."],
  ["Security-first culture","Teach teams to use the tools."],
  ["Monitor continuously","Reassess and remediate unhealthy resources promptly."],
  ["Choose thoughtfully","Prefer broad coverage, rich risk context and less alert fatigue."],
];

export const CH = [
  ["Multicloud and hybrid","Consistent protection everywhere."],
  ["Scalability","Grows with workloads."],
  ["Integration","Works with your pipelines and security stack."],
  ["Risk analytics","Ranks threats by context and impact."],
  ["Visibility and control","Clear view of apps, workloads and infrastructure."],
  ["Developer experience","Secure development without friction."],
];

/* [question, answer] */
export const FAQ = [
  ["What does CNAPP stand for?","Cloud-native application protection platform. It is a unified approach to securing cloud-native and AI-assisted apps and their infrastructure across the full lifecycle."],
  ["How does a CNAPP differ from traditional cloud security tools?","Traditional tools work in silos and react after problems appear. A CNAPP combines posture, workload and identity protection and prioritizes risk in context."],
  ["How do I choose a CNAPP?","Look for unified, broad and deep coverage, hybrid and multicloud support, DevSecOps integration, scalability and strong risk prioritization."],
  ["How does a CNAPP fit into CI/CD?","It scans infrastructure as code, containers and APIs in the pipeline and sends contextual alerts so developers fix issues early."],
  ["How does a CNAPP improve cloud security?","It unifies visibility, finds misconfigurations, vulnerabilities and threats, ranks the critical ones and reduces alert fatigue."],
  ["CNAPP or CDR?","CDR detects and responds to threats in cloud workloads and networks. A CNAPP includes CDR and adds posture, identity, container and API protection."],
  ["How does a CNAPP help with compliance?","It continuously checks configurations, access controls and workloads against standards and produces evidence for reporting."],
];

export const LABS = [
  {
    n: "Cloud posture",
    ctx: 1,
    b: "Northwind Retail has an open attack path to customer data. Break it.",
    f: [
      {"id":1,"sev":"Critical","w":25,"res":"vm-web-01","t":"VM exposes SSH (port 22) to the internet","fix":"Restrict NSG to admin range","path":1,"why":"Internet entry point"},
      {"id":2,"sev":"High","w":20,"res":"role/app-deployer","t":"Role has Owner rights across the subscription","fix":"Apply least privilege","path":1,"why":"Over-permissioned identity"},
      {"id":3,"sev":"Critical","w":25,"res":"st-customers","t":"Storage account holds unencrypted PII with public access on","fix":"Disable public access","path":1,"why":"Sensitive data exposure"},
      {"id":4,"sev":"High","w":10,"res":"pipe/build-main","t":"Terraform template opens a database to 0.0.0.0/0","fix":"Fix IaC and rescan"},
      {"id":5,"sev":"High","w":8,"res":"acr-prod/api:1.4","t":"Container image has 3 known critical CVEs","fix":"Rebuild on patched base"},
      {"id":6,"sev":"Medium","w":5,"res":"aks-prod","t":"Kubernetes pods run as root","fix":"Enforce non-root policy"},
      {"id":7,"sev":"Medium","w":4,"res":"api-gw/orders","t":"Undocumented API endpoint found","fix":"Register and require auth"},
      {"id":8,"sev":"Low","w":3,"res":"kv-prod","t":"Key Vault secrets lack rotation","fix":"Enable auto rotation"},
    ],
  },
  {
    n: "IaC scan",
    b: "A pull request changes Terraform. Fix the findings so the pipeline gate passes.",
    f: [
      {"id":1,"sev":"Critical","w":25,"res":"main.tf:14 s3_bucket","t":"Bucket ACL is public-read","fix":"Set private ACL"},
      {"id":2,"sev":"High","w":20,"res":"main.tf:31 security_group","t":"Ingress 0.0.0.0/0 on port 3306","fix":"Limit to app subnet"},
      {"id":3,"sev":"High","w":15,"res":"vars.tf:6","t":"Database password is hard-coded","fix":"Use a secrets manager"},
      {"id":4,"sev":"Medium","w":8,"res":"main.tf:52 ebs_volume","t":"Volume is not encrypted","fix":"Enable encryption"},
      {"id":5,"sev":"Medium","w":6,"res":"main.tf:70 cloudtrail","t":"Audit logging is disabled","fix":"Enable logging"},
      {"id":6,"sev":"Low","w":3,"res":"main.tf:88","t":"Resources are missing owner tags","fix":"Add tags"},
    ],
  },
  {
    n: "Container scan",
    b: "The registry scan of three images failed. Remediate until the gate passes.",
    f: [
      {"id":1,"sev":"Critical","w":25,"res":"api:2.3","t":"OpenSSL 3.0.1 has a critical CVE","fix":"Upgrade base image"},
      {"id":2,"sev":"High","w":20,"res":"web:1.9","t":"Container runs as root","fix":"Set a non-root user"},
      {"id":3,"sev":"High","w":15,"res":"worker:5.0","t":"API key found in an image layer","fix":"Rotate key, rebuild"},
      {"id":4,"sev":"Medium","w":8,"res":"api:2.3","t":"Outdated lodash package","fix":"Update dependency"},
      {"id":5,"sev":"Medium","w":6,"res":"registry","t":"Images are not signed","fix":"Enable image signing"},
      {"id":6,"sev":"Low","w":3,"res":"web:latest","t":"Image uses the latest tag","fix":"Pin a version"},
    ],
  },
];

/* [progressKey, label] */
export const ITEMS = [
  ["overview","Read Overview"],
  ["why","Read Why CNAPP"],
  ["components","Read Components"],
  ["benefits","Read Benefits"],
  ["compare","Read Comparison"],
  ["usecases","Read Use cases"],
  ["roadmap","Read Roadmap"],
  ["lab0","Complete the Cloud posture lab"],
  ["lab1","Complete the IaC scan lab"],
  ["lab2","Complete the Container scan lab"],
  ["pass","Pass the assessment"],
];

export const DM = ["Basics","Challenges","Posture","Identity","Shift left","CDR","Context","AI risks"]; // quiz domain label per question

/* [sectionKey, label, labName] — roadmap hint per question */
export const RM = [
  ["overview","Overview",""],
  ["why","Why CNAPP",""],
  ["components","Components (CSPM)","Cloud posture"],
  ["components","Components (CIEM)","Cloud posture"],
  ["roadmap","Roadmap (DevSecOps)","IaC scan"],
  ["compare","Comparison",""],
  ["usecases","Use cases","Cloud posture"],
  ["why","Why CNAPP (AI risks)",""],
];

/* [question, options, correctIndex, explanation] */
export const Q = [
  ["What does CNAPP stand for?",["Cloud-native application protection platform","Central network access policy platform","Container-native app provisioning process","Cloud network audit and protection program"],0,"It secures cloud-native and AI-assisted apps and their infrastructure across the full lifecycle."],
  ["What main problem does a CNAPP solve compared with separate tools?",["Slow internet speed","Fragmented visibility and disconnected context","High cloud pricing","Lack of cloud providers"],1,"Tool sprawl and silos create blind spots. A CNAPP unifies signals and context."],
  ["Which component finds misconfigurations and compliance gaps in cloud accounts?",["CWPP","CIEM","CSPM","DSPM"],2,"CSPM analyzes configurations, compliance and identity permissions."],
  ["Which capability enforces least privilege for cloud identities?",["CIEM","KSPM","API discovery","Drift detection"],0,"CIEM manages cloud identities and entitlements and enforces least privilege."],
  ["What does “shift left” mean in a CNAPP context?",["Moving workloads to another region","Adding security early in development pipelines","Deleting old logs","Scanning only at runtime"],1,"Shift left embeds protection early, for example by scanning IaC and containers in CI/CD."],
  ["How does a CNAPP differ from CDR alone?",["CDR is broader than CNAPP","They are identical","A CNAPP includes CDR and adds posture, identity, container and API protection","CNAPP only works on-premises"],2,"CDR detects and responds to threats. A CNAPP adds posture, identity and risk prioritization."],
  ["In the lab, why fix the attack path findings first?",["They have the longest names","They form a connected route to sensitive data","They are always Low severity","They cost less to fix"],1,"Context shows which findings combine into a real attack route. Fixing a choke point cuts risk quickly."],
  ["Which is a new risk area highlighted for AI-assisted apps?",["Printer drivers","Prompt injection and data leaks","BIOS updates","Email fonts"],1,"Prompts, models and training data introduce exposure such as prompt injection and data leaks."],
];

/* [tag, title, text, bullets[]] — copy for each unique clip in "See it in action" (by order) */
export const VIDEO_INFO = [
  ["Network and infrastructure","Where cloud traffic actually flows","Every workload, API and connection runs on real infrastructure. A CNAPP maps that traffic so you can spot anomalous patterns and exposed paths early.",["Traffic mapping","API discovery","Network visibility"]],
  ["Silicon and AI","The engines behind cloud and AI","Cloud-native and AI-assisted apps depend on powerful compute. Protecting models, prompts and training data is now part of the same security picture.",["AI risk coverage","Prompt injection defense","Data leak prevention"]],
  ["Security operations","Defenders in the data center","Security teams watch alerts, prioritize risk in context and respond fast. A CNAPP cuts alert fatigue so analysts focus on what matters most.",["Risk prioritization","CDR and response","Less alert fatigue"]],
];