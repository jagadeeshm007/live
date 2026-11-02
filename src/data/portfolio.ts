/**
 * All portfolio content lives here. Everything is sourced from the resume
 * (public/Jagadeesh-Mandala-Resume.pdf). Edit this file to update the site;
 * components and 3D scenes read from it and never hard-code facts.
 */

export const profile = {
  name: 'Jagadeesh Mandala',
  firstName: 'Jagadeesh',
  lastName: 'Mandala',
  role: 'Associate Software Engineer',
  company: 'Apxor Technology',
  location: 'Hyderabad, India',
  coordinates: '17.3850° N  78.4867° E',
  tagline: 'Building software, exploring systems, and turning ideas into reliable products.',
  summary:
    'I work across the stack — Go services, data pipelines, Kubernetes platforms, React dashboards and agentic AI — and I own problems from the first bug report to the production fix.',
  links: {
    email: 'jagadeeshm943@gmail.com',
    linkedin: 'https://linkedin.com/in/mandalajagadeesh',
    github: 'https://github.com/jagadeeshm007',
    resume: 'Jagadeesh-Mandala-Resume.pdf',
  },
} as const;

export type ChapterId =
  | 'intro'
  | 'journey'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'philosophy'
  | 'future'
  | 'contact';

export const chapters: { id: ChapterId; index: string; label: string }[] = [
  { id: 'intro', index: '01', label: 'Intro' },
  { id: 'journey', index: '02', label: 'Journey' },
  { id: 'skills', index: '03', label: 'Skills' },
  { id: 'experience', index: '04', label: 'Experience' },
  { id: 'projects', index: '05', label: 'Projects' },
  { id: 'philosophy', index: '06', label: 'Philosophy' },
  { id: 'future', index: '07', label: 'Future' },
  { id: 'contact', index: '08', label: 'Contact' },
];

export type Milestone = { when: string; title: string; place?: string; detail: string };

export const journey: Milestone[] = [
  {
    when: '2021',
    title: 'Computer Science, from first principles',
    place: 'Aditya College of Engineering and Technology',
    detail: 'Started a B.Tech in Computer Science and Engineering and got hooked on how systems actually work underneath.',
  },
  {
    when: 'Along the way',
    title: 'Competitive programming',
    detail: 'CodeChef 3 Star (1637) and 500+ LeetCode problems — the habit of reasoning about complexity before writing code.',
  },
  {
    when: '2023',
    title: 'Teaching what I learned',
    place: 'Technical Hub',
    detail: 'Trained 300+ students in C++ and data structures & algorithms. Explaining a thing is the fastest way to find the gaps in it.',
  },
  {
    when: 'Along the way',
    title: 'Systems & cloud credentials',
    detail: 'Red Hat Certified System Administrator (RHCSA) and AWS Certified Cloud Practitioner.',
  },
  {
    when: 'Jan 2025',
    title: 'First production codebase',
    place: 'Zengen LLP · Chennai',
    detail: 'Software Development Intern shipping CRM features across a React frontend and Node.js REST APIs.',
  },
  {
    when: 'Aug 2025',
    title: 'Engineering at scale',
    place: 'Apxor Technology · Hyderabad',
    detail: 'Associate Software Engineer on analytics infrastructure behind apps serving 100M+ users. Graduated B.Tech the same year.',
  },
];

export type SkillGroup = { id: string; name: string; context: string; items: string[] };

/** Six groups → six clusters in the 3D toolkit scene (order matters). */
export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    name: 'Languages',
    context: 'Go for services, Python for AI, TypeScript for interfaces.',
    items: ['Go', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'Java'],
  },
  {
    id: 'backend',
    name: 'Backend & Data',
    context: 'Event streams, durable workflows and stores under real load.',
    items: ['FastAPI', 'REST', 'gRPC', 'Kafka', 'Temporal', 'Spark', 'Node.js', 'PostgreSQL', 'ClickHouse', 'MongoDB', 'Redis'],
  },
  {
    id: 'devops',
    name: 'DevOps & Reliability',
    context: 'GitOps rollouts, infrastructure as code, golden-signal monitoring.',
    items: ['Kubernetes', 'Docker', 'Helm', 'ArgoCD', 'Terraform', 'CI/CD', 'AWS', 'GCP', 'Prometheus', 'Grafana', 'Loki'],
  },
  {
    id: 'ai',
    name: 'AI & LLMs',
    context: 'Retrieval, agents and the guardrails that make them safe for enterprise data.',
    items: ['RAG', 'LangGraph', 'LangChain', 'LLM APIs', 'Embeddings', 'Chroma', 'AI agents', 'Tool use', 'Guardrails', 'Evals'],
  },
  {
    id: 'agentic',
    name: 'Agentic Tooling',
    context: 'AI coding agents in the daily loop — with full human review.',
    items: ['Claude Code', 'Subagents', 'MCP', 'Connectors', 'Tool calling', 'Agent loop', 'Skills'],
  },
  {
    id: 'frontend',
    name: 'Frontend',
    context: 'Data-dense dashboards and virtualized grids of 10,000+ rows.',
    items: ['React', 'Next.js', 'TypeScript', 'TanStack Query', 'Zustand'],
  },
];

export type Metric = { label: string; from: string; to: string; delta: string };

export type Role = {
  company: string;
  role: string;
  period: string;
  location: string;
  context: string;
  metrics?: Metric[];
  tracks: { title: string; points: string[] }[];
};

export const experience: Role[] = [
  {
    company: 'Apxor Technology',
    role: 'Associate Software Engineer',
    period: 'Aug 2025 — Present',
    location: 'Hyderabad, India',
    context:
      'Analytics for client teams at GCash, Porter and ICICI Bank — apps serving 100M+ users. I own client issues from first report to production fix across web, Android and iOS.',
    metrics: [
      { label: 'p99 latency', from: '110 ms', to: '75 ms', delta: '−32%' },
      { label: 'Memory per pod', from: '400 MB', to: '65 MB', delta: '−84%' },
      { label: 'Startup time', from: '9 s', to: '1 s', delta: '9×' },
      { label: 'Throughput per pod', from: '', to: '', delta: '+32%' },
    ],
    tracks: [
      {
        title: 'Agentic analytics assistant',
        points: [
          'Architected an assistant (RAG, LangGraph, FastAPI) that plans, uses tools and keeps memory to turn natural-language questions into charts, over a Chroma vector DB of 500+ event types.',
          'Secured it for enterprise data with guardrails, prompt-injection detection and PII masking.',
        ],
      },
      {
        title: 'Go rewrite of legacy services',
        points: [
          'Rewrote legacy Scala and Java microservices in Go using goroutine concurrency and pprof profiling — the numbers above are from that rewrite.',
        ],
      },
      {
        title: 'Event delivery pipeline',
        points: [
          'Engineered an idempotent Go service with safe retries that streams client events as Parquet through Kafka into client GCP or AWS buckets — 40 consumers holding lag near zero, plus a daily Spark batch job.',
        ],
      },
      {
        title: 'Platform & delivery',
        points: [
          'Zero-downtime Kubernetes rollouts on GKE and AWS EKS via GitOps (ArgoCD, Helm, Tanka), GitHub Actions CI/CD, and Terraform infrastructure as code with IAM and secrets.',
        ],
      },
      {
        title: 'Reliability & on-call',
        points: [
          'Kept data infrastructure healthy: Redis (21 nodes) at ~9M commands/sec for 3,600+ clients, ClickHouse at ~20K rows/sec, Kafka groups of up to 116 consumers — tracked on golden signals in Grafana.',
          'Resolved 100+ production incidents on call through root-cause analysis and postmortems that prevented repeats.',
        ],
      },
      {
        title: 'Frontend',
        points: [
          'Built React and TypeScript dashboards and a virtualized rendering library for data grids of 10,000+ rows.',
          'Adopted AI coding agents (Claude Code, subagents, MCP) for coding, testing and docs — with full review.',
        ],
      },
    ],
  },
  {
    company: 'Zengen LLP',
    role: 'Software Development Intern',
    period: 'Jan 2025 — Jun 2025',
    location: 'Chennai, India',
    context: 'A growing CRM product.',
    tracks: [
      {
        title: 'Full-stack features',
        points: [
          'Delivered CRM features across the React frontend and Node.js REST APIs, with live notifications.',
          'Shaped service boundaries as the product grew and wrote reusable utilities adopted across the codebase.',
        ],
      },
    ],
  },
];

export type Project = {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  problem: string;
  solution: string;
  architecture: string[];
  decisions: string[];
  outcome: string;
  stack: string[];
  github: string;
  live?: string;
};

/** Two projects → two "project worlds" in the 3D scene (order matters). */
export const projects: Project[] = [
  {
    id: 'latte',
    index: 'P/01',
    name: 'Latte',
    subtitle: 'AI sales-call compliance & coaching',
    problem:
      'Compliance review usually samples a handful of recorded sales calls, so most breaches are never heard.',
    solution:
      'A platform that audits 100% of recorded calls and flags every breach with the evidence attached.',
    architecture: [
      'Per-speaker transcription — Whisper, and Sarvam for 10 Indian languages',
      'One LLM judge call per call, constrained to a strict JSON schema',
      'PII masking behind SSO',
      'REST API with scoped keys, signed webhooks and SDKs in 4 languages',
    ],
    decisions: [
      'Queued workers processing batches of up to 500 calls',
      'A model gateway enforcing token caps and rate limits to control cost',
      'Evals on 20 labelled calls gate every prompt or model change in CI',
    ],
    outcome: 'Every call audited instead of a sample, with prompt and model changes held to an eval bar before they ship.',
    stack: ['TypeScript', 'React', 'PostgreSQL', 'LLM APIs', 'Whisper'],
    github: 'https://github.com/jagadeeshm007/Latte',
    live: 'https://latte-delta.vercel.app/dashboard',
  },
  {
    id: 'nemo',
    index: 'P/02',
    name: 'Nemo',
    subtitle: 'Agentic RAG assistant',
    problem:
      'Answering questions over team documents — and acting on them — needs retrieval, tools, auth and durable execution, not just a chat prompt.',
    solution:
      'An assistant that answers over team documents and runs multi-step tasks with tool-calling agents across 3 LLM providers.',
    architecture: [
      '6 services behind a Go gateway',
      'RAG over Chroma',
      'Agent engine with a tool registry',
      'Keycloak service auth and Vault secrets',
      'Temporal durable workflows on Kubernetes',
    ],
    decisions: [
      'A single Go gateway as the one entry point in front of every service',
      'Durable workflows (Temporal) so multi-step agent runs survive failures',
      'Provider-agnostic agents across 3 LLM providers',
    ],
    outcome: 'A service-oriented agent platform with authentication, secrets and durability designed in from the start.',
    stack: ['Go', 'Python', 'FastAPI', 'LangChain', 'Kafka', 'Kubernetes'],
    github: 'https://github.com/jagadeeshm007/nemo',
  },
];

export type Principle = { title: string; body: string; evidence: string };

export const principles: Principle[] = [
  {
    title: 'Own it end to end.',
    body: 'A ticket is closed when the user’s problem is gone — not when my part compiles.',
    evidence: 'Client issues, first report → production fix',
  },
  {
    title: 'Measure, then optimize.',
    body: 'Profilers before opinions. A rewrite earns its place with p99, memory and startup numbers.',
    evidence: 'pprof · 110 → 75 ms p99',
  },
  {
    title: 'Make failure boring.',
    body: 'Idempotency, safe retries and zero-downtime rollouts, so the bad day is a non-event.',
    evidence: 'Kafka → Parquet delivery · GitOps rollouts',
  },
  {
    title: 'Observe what matters.',
    body: 'Latency, traffic, errors, saturation. If I can’t see it, I can’t say it works.',
    evidence: 'Golden signals in Grafana',
  },
  {
    title: 'Security is a design input.',
    body: 'Guardrails, PII masking, scoped keys and managed secrets belong in the first diagram.',
    evidence: 'Enterprise-data assistant · Vault · Keycloak',
  },
  {
    title: 'Fix the class, not the instance.',
    body: 'Every incident ends with a postmortem and a change that stops it happening again.',
    evidence: '100+ incidents resolved on call',
  },
];

export const frontier: { title: string; body: string }[] = [
  {
    title: 'Distributed systems',
    body: 'Streams, consumers and durable workflows that keep their guarantees under failure.',
  },
  {
    title: 'Reliability engineering',
    body: 'Turning on-call lessons into systems that page less and recover on their own.',
  },
  {
    title: 'Cloud platforms',
    body: 'Kubernetes, GitOps and infrastructure as code as a product for other engineers.',
  },
  {
    title: 'AI-enabled products',
    body: 'Agents that are evaluated, guarded and observable — engineered like any other production service.',
  },
];
