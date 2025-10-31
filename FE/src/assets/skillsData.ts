export type Level = "Expert" | "Advanced" | "Proficient" | "Familiar";

export type SkillItem = {
  name: string;
  desc?: string;
  logo?: string;
  logoFallbacks?: string[];
  level?: Level;
  url?: string;
};

export type SkillCategory = { id: string; title: string; items: SkillItem[] };

const si = (slug: string, color = "dc2626") =>
  `https://cdn.simpleicons.org/${encodeURIComponent(slug)}/${color}`;

export const SKILLS: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend",
    items: [
      {
        name: "Java",
        desc: "OOP Language",
        logo: si("java"),
        logoFallbacks: [
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
          "https://www.svgrepo.com/show/184143/java.svg",
        ],
        level: "Expert",
      },
      { name: "Spring Boot", desc: "Java Framework",      logo: si("springboot"),  level: "Expert" },
      { name: "Python",      desc: "Scripting / AI",      logo: si("python"),      level: "Expert" },
      { name: "FastAPI",     desc: "Python Web Framework",logo: si("fastapi"),     level: "Proficient" },
      { name: "Node.js",     desc: "Backend Runtime",     logo: si("nodedotjs"),   level: "Familiar" },
      { name: "Django",      desc: "Python Web Framework",logo: si("django"),      level: "Familiar" },
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    items: [
      { name: "Jenkins",     desc: "CI/CD",                logo: si("jenkins"),        level: "Proficient" },
      { name: "GCP",         desc: "Cloud Run · BigQuery", logo: si("googlecloud"),    level: "Proficient" },
      {
        name: "AWS",
        desc: "EC2 · S3 · ECR",
        logo: si("amazonaws"),
        logoFallbacks: [
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
          "https://www.svgrepo.com/show/376356/aws.svg",
          "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
        ],
        level: "Proficient",
      },
      { name: "NGINX",       desc: "Reverse Proxy/SSL",    logo: si("nginx"),          level: "Proficient" },
      { name: "Docker",      desc: "Containerization",     logo: si("docker"),         level: "Advanced" },
      { name: "Kafka",       desc: "Streaming / MQ",       logo: si("apachekafka"),    level: "Proficient" },
      { name: "GCP Pub/Sub", desc: "Messaging",            logo: si("googlecloud"),    level: "Proficient" },
      { name: "Redis",       desc: "Cache · Pub/Sub",      logo: si("redis"),          level: "Proficient" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    items: [
      { name: "MySQL",         desc: "Relational DB",     logo: si("mysql"),         level: "Advanced" },
      { name: "Elasticsearch", desc: "Search/Analytics",  logo: si("elasticsearch"), level: "Proficient" },
      { name: "MongoDB",       desc: "Document DB",       logo: si("mongodb"),       level: "Familiar" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    items: [
      { name: "React",       desc: "UI Library",        logo: si("react"),      level: "Proficient" },
      { name: "JavaScript",  desc: "Language",          logo: si("javascript"), level: "Proficient" },
      { name: "HTML & CSS",  desc: "Web Fundamentals",  logo: si("html5"),      level: "Proficient" },
    ],
  },
  {
    id: "collaboration",
    title: "Collaboration",
    items: [
      { name: "Jira",   desc: "Issue Tracking", logo: si("jira"),   level: "Proficient" },
      { name: "Notion", desc: "Docs & Wiki",    logo: si("notion"), level: "Proficient" },
    ],
  },
];
