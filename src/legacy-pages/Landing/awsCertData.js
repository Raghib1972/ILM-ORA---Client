export const LEVELS = {
  Foundational: { color: "#16a34a", blurb: "Start here. Learn what the cloud is and what AWS offers. No tech background needed." },
  Associate: { color: "#ea580c", blurb: "Build and run real things on AWS. The most popular level for jobs." },
  Professional: { color: "#2563eb", blurb: "Design big, multi-account systems and automate delivery at scale." },
  Specialty: { color: "#9333ea", blurb: "Go deep in one area: security, networking or machine learning." },
};

export const CERTS = [
  ["Cloud Practitioner", "CLF-C02", "Foundational", 100, "90 min", "Cloud Practitioner, Student, Fresher", "6 months of AWS cloud basics (recommended)", "No prerequisites, no degree required", ["EC2", "S3", "IAM", "VPC", "RDS", "Lambda", "CloudWatch"]],
  ["AI Practitioner", "AIF-C01", "Foundational", 100, "90 min", "AI Beginner, AI Professional", "Basic AI and AWS AI services", "No prerequisites", ["Bedrock", "SageMaker", "Rekognition", "Comprehend"]],
  ["Solutions Architect – Associate", "SAA-C03", "Associate", 150, "130 min", "Solutions Architect, Cloud Engineer", "About 1 year on AWS (recommended)", "No prerequisites", ["EC2", "VPC", "ELB", "Auto Scaling", "S3", "Route 53", "CloudFormation"]],
  ["Developer – Associate", "DVA-C02", "Associate", 150, "130 min", "Cloud Developer, Backend Developer", "About 1 year of AWS development", "No prerequisites", ["Lambda", "API Gateway", "DynamoDB", "SQS", "SNS"]],
  ["CloudOps Engineer – Associate", "SOA-C02", "Associate", 150, "130 min", "Cloud Administrator, SysOps Engineer", "About 1 year of AWS administration", "No prerequisites", ["EC2", "CloudWatch", "Systems Manager", "IAM"]],
  ["Data Engineer – Associate", "DEA-C01", "Associate", 150, "130 min", "Data Engineer", "Data engineering experience", "No prerequisites", ["Glue", "Redshift", "Athena", "EMR"]],
  ["Machine Learning Engineer – Associate", "MLA-C01", "Associate", 150, "130 min", "Machine Learning Engineer", "ML fundamentals", "No prerequisites", ["SageMaker", "Bedrock", "S3"]],
  ["Solutions Architect – Professional", "SAP-C02", "Professional", 300, "180 min", "Senior Solutions Architect", "About 2 years of AWS architecture", "No prerequisites", ["Multi-account AWS", "Organizations", "VPC", "Hybrid Cloud"]],
  ["DevOps Engineer – Professional", "DOP-C02", "Professional", 300, "180 min", "DevOps Engineer", "About 2 years of AWS and DevOps", "No prerequisites", ["CodePipeline", "CodeBuild", "ECS", "EKS", "CloudFormation"]],
  ["Security – Specialty", "SCS-C02", "Specialty", 300, "170 min", "Security Engineer", "AWS security experience", "No prerequisites", ["IAM", "KMS", "WAF", "Shield", "GuardDuty", "Macie"]],
  ["Advanced Networking – Specialty", "ANS-C01", "Specialty", 300, "170 min", "Network Engineer", "Advanced networking experience", "No prerequisites", ["VPC", "Direct Connect", "Transit Gateway", "Route 53"]],
  ["Machine Learning – Specialty (Legacy)", "MLS-C01", "Specialty", 300, "180 min", "ML Specialist", "Advanced ML on AWS", "No prerequisites", ["SageMaker", "ML Pipelines", "AI Services"]],
].map(([name, code, level, fee, time, role, exp, elig, tech]) => ({ name, code, level, fee, time, role, exp, elig, tech }));