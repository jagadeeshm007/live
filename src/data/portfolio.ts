/**
 * All site content. Facts come from the resume (public/Jagadeesh-Mandala-Resume.pdf).
 * Edit here; components only render this data.
 */

export const profile = {
  name: 'Jagadeesh Mandala',
  role: 'Software Engineer',
  title: 'Associate Software Engineer',
  company: 'Apxor Technology',
  location: 'Hyderabad, India',
  summary:
    'I build backend systems, data pipelines and platforms that stay fast and reliable at scale — and the interfaces people use on top of them. At Apxor I work on the analytics infrastructure behind apps used by more than 100 million people.',
  links: {
    email: 'jagadeeshm943@gmail.com',
    linkedin: 'https://linkedin.com/in/mandalajagadeesh',
    github: 'https://github.com/jagadeeshm007',
    resume: 'Jagadeesh-Mandala-Resume.pdf',
  },
  rotatingRoles: ['Backend Engineer', 'Platform Engineer', 'AI Engineer', 'Software Engineer'],
} as const;

/** Hero card: one pitch per audience, switched with tabs. */
export const audiences: { id: string; label: string; pitch: string }[] = [
  {
    id: 'anyone',
    label: 'Anyone',
    pitch:
      'I build software that stays fast and reliable at scale — from Go services and Kafka pipelines to the dashboards people use every day.',
  },
  {
    id: 'engineers',
    label: 'Engineers',
    pitch:
      'Go, Kafka, Redis, ClickHouse, Kubernetes. I rewrote JVM services in Go — p99 110 → 75 ms, memory 400 → 65 MB per pod — and take on-call for data infrastructure at ~9M Redis commands/sec.',
  },
  {
    id: 'hiring',
    label: 'Hiring teams',
    pitch:
      'Associate Software Engineer at Apxor, owning client issues end to end for teams like GCash, Porter and ICICI Bank. Open to work, immediate joiner, open to relocation.',
  },
  {
    id: 'founders',
    label: 'Founders',
    pitch:
      'I ship complete products: Latte audits 100% of recorded sales calls with LLMs, exposed as a platform with a REST API, signed webhooks and SDKs in 4 languages.',
  },
];

export const availability = {
  headline: 'Open to new opportunities',
  facts: [
    { label: 'Status', value: 'Open to work' },
    { label: 'Notice period', value: 'Immediate joiner' },
    { label: 'Based in', value: 'Hyderabad, India' },
    { label: 'Relocation', value: 'Open to relocation' },
  ],
  roles: [
    'Software Engineer — Backend',
    'Platform / DevOps Engineer',
    'Site Reliability Engineer',
    'AI / LLM Engineer',
    'Full-stack Engineer',
  ],
};

export const impact: { value: string; label: string }[] = [
  { value: '100M+', label: 'end users on client apps I support' },
  { value: '−32%', label: 'p99 latency after the Go rewrite' },
  { value: '−84%', label: 'memory per pod (400 → 65 MB)' },
  { value: '~9M/s', label: 'Redis commands on infra I run' },
  { value: '100+', label: 'production incidents resolved' },
  { value: '0', label: 'downtime across Kubernetes rollouts' },
];

export const certifications = ['Red Hat Certified System Administrator (RHCSA)', 'AWS Certified Cloud Practitioner'];

/* -------------------------------------------------------------- experience */

export type Highlight = {
  title: string;
  summary: string;
  problem: string;
  action: string;
  result: string;
  metrics?: string[];
  stack: string[];
};

export type Role = {
  company: string;
  role: string;
  period: string;
  location: string;
  context: string;
  highlights: Highlight[];
};

export const experience: Role[] = [
  {
    company: 'Apxor Technology',
    role: 'Associate Software Engineer',
    period: 'Aug 2025 — Present',
    location: 'Hyderabad, India',
    context:
      'Mobile analytics and engagement for client teams at GCash, Porter and ICICI Bank — apps used by more than 100 million people. I work across Go services, Kafka, Redis, ClickHouse, Kubernetes, React dashboards and an AI assistant for enterprise data.',
    highlights: [
      {
        title: 'Rewrote legacy services in Go',
        summary: 'Replaced heavy Scala and Java microservices with Go, guided by profiling rather than guesswork.',
        problem: 'Core services needed 400 MB per pod, took 9 s to start and sat at a p99 of 110 ms.',
        action: 'Rewrote them in Go using goroutine concurrency, with pprof showing where CPU time and allocations went.',
        result: 'Lighter services that start almost instantly and handle more traffic per pod.',
        metrics: ['p99 110 → 75 ms', 'Memory 400 → 65 MB', 'Startup 9 s → 1 s', '+32% throughput'],
        stack: ['Go', 'pprof', 'Goroutines'],
      },
      {
        title: 'Built an agentic analytics assistant',
        summary: 'Turns plain-language questions into charts — secured for enterprise data.',
        problem: 'Answers were spread across 500+ event types and took analyst time to assemble.',
        action:
          'Architected an assistant with RAG, LangGraph and FastAPI that plans, uses tools and keeps memory, over a Chroma vector DB of event types. Added guardrails, prompt-injection detection and PII masking.',
        result: 'Natural-language questions become charts, with security designed in from the start.',
        metrics: ['500+ event types'],
        stack: ['RAG', 'LangGraph', 'FastAPI', 'Chroma'],
      },
      {
        title: 'Engineered a safe event-delivery pipeline',
        summary: 'Streams client events as Parquet through Kafka into client cloud buckets — retries included.',
        problem: 'Events had to reach each client’s GCP or AWS bucket without duplicates or gaps, even across retries and restarts.',
        action: 'Built an idempotent Go service with safe retries, run by 40 Kafka consumers, plus a daily Spark batch job.',
        result: 'Consumer lag held near zero, and retries became safe by design.',
        metrics: ['40 consumers', 'Lag ≈ 0'],
        stack: ['Go', 'Kafka', 'Parquet', 'Spark'],
      },
      {
        title: 'Ran zero-downtime Kubernetes delivery',
        summary: 'GitOps releases across GKE and AWS EKS, with infrastructure as code.',
        problem: 'With 100M+ end users, deployments had to be routine and invisible.',
        action: 'Delivered rollouts via ArgoCD, Helm and Tanka, GitHub Actions CI/CD, and Terraform with IAM and secrets.',
        result: 'Every release is a reviewed, versioned, reversible Git commit.',
        stack: ['Kubernetes', 'ArgoCD', 'Helm', 'Terraform'],
      },
      {
        title: 'Kept data infrastructure healthy on call',
        summary: 'Redis, ClickHouse and Kafka under real load, watched on golden signals.',
        problem: 'A 21-node Redis cluster at ~9M commands/sec for 3,600+ clients, ClickHouse at ~20K rows/sec, Kafka groups of up to 116 consumers.',
        action: 'Tracked latency, traffic, errors and saturation in Grafana; closed every incident with root-cause analysis and a postmortem.',
        result: '100+ production incidents resolved, with postmortems that prevented repeats.',
        metrics: ['100+ incidents', '~9M cmd/s'],
        stack: ['Redis', 'ClickHouse', 'Kafka', 'Grafana'],
      },
      {
        title: 'Owned client issues end to end',
        summary: 'One accountable engineer from first report to production fix — across web, Android and iOS.',
        problem: 'Analytics issues rarely live in one layer, and hand-offs slow everything down.',
        action: 'Partnered with client teams to scope their analytics needs, then traced each issue to its root cause and shipped the fix.',
        result: 'Fixes land in production, not in a ticket queue.',
        stack: ['Web', 'Android', 'iOS'],
      },
      {
        title: 'Built fast, data-dense dashboards',
        summary: 'React and TypeScript dashboards, plus a virtualized rendering library.',
        problem: 'Data grids with tens of thousands of cells froze the browser.',
        action: 'Built a virtualized rendering library that only draws what is on screen. Adopted AI coding agents (Claude Code, MCP) for coding, tests and docs — with full review.',
        result: 'Grids of 10,000+ rows that stay responsive.',
        metrics: ['10,000+ rows'],
        stack: ['React', 'TypeScript'],
      },
    ],
  },
  {
    company: 'Zengen LLP',
    role: 'Software Development Intern',
    period: 'Jan 2025 — Jun 2025',
    location: 'Chennai, India',
    context: 'A growing CRM product.',
    highlights: [
      {
        title: 'Shipped full-stack CRM features',
        summary: 'Features across the React frontend and Node.js REST APIs, including live notifications.',
        problem: 'The product was growing quickly, and new features had to land without tangling the codebase.',
        action: 'Delivered features end to end, helped shape service boundaries, and wrote reusable utilities.',
        result: 'The utilities were adopted across the codebase.',
        stack: ['React', 'Node.js', 'REST'],
      },
    ],
  },
];

/* ------------------------------------------------------------------ skills */

export type SkillGroup = { name: string; core: string[]; more: string[] };

export const skills: SkillGroup[] = [
  { name: 'Languages', core: ['Go', 'Python', 'TypeScript'], more: ['JavaScript', 'SQL', 'Java'] },
  {
    name: 'Backend & Data',
    core: ['Kafka', 'Redis', 'ClickHouse'],
    more: ['FastAPI', 'REST', 'gRPC', 'Temporal', 'Spark', 'Node.js', 'PostgreSQL', 'MongoDB'],
  },
  {
    name: 'Cloud & Reliability',
    core: ['Kubernetes', 'ArgoCD', 'Terraform'],
    more: ['Docker', 'Helm', 'CI/CD', 'AWS', 'GCP', 'Prometheus', 'Grafana', 'Loki'],
  },
  {
    name: 'AI & LLMs',
    core: ['RAG', 'LangGraph', 'Guardrails'],
    more: ['LangChain', 'LLM APIs', 'Embeddings', 'Chroma', 'AI agents', 'Tool use', 'Evals'],
  },
  { name: 'Frontend', core: ['React', 'TypeScript'], more: ['Next.js', 'TanStack Query', 'Zustand'] },
  { name: 'Agentic Tooling', core: ['Claude Code', 'MCP'], more: ['Subagents', 'Connectors', 'Tool calling', 'Skills'] },
];

/* ---------------------------------------------------------------- projects */

export type Project = {
  id: string;
  name: string;
  tagline: string;
  what: string;
  why: string;
  how: { step: string; body: string }[];
  built: string[];
  stack: string[];
  github: string;
  live?: string;
};

export const projects: Project[] = [
  {
    id: 'latte',
    name: 'Latte',
    tagline: 'AI sales-call compliance & coaching',
    what: 'A compliance platform that audits every recorded sales call and flags breaches with the evidence attached.',
    why: 'Compliance teams usually review a sample of calls, so most breaches are never heard. Latte audits 100% of them.',
    how: [
      { step: 'Listen', body: 'Per-speaker transcription with Whisper, plus Sarvam for 10 Indian languages.' },
      { step: 'Judge', body: 'One LLM judge call per conversation, bound to a strict JSON schema.' },
      { step: 'Protect', body: 'PII masking, with access behind SSO.' },
      { step: 'Integrate', body: 'REST API with scoped keys, signed webhooks and SDKs in 4 languages.' },
    ],
    built: [
      'Queued workers process batches of up to 500 calls',
      'Model gateway enforces token caps and rate limits',
      'Evals on 20 labelled calls gate every prompt or model change in CI',
    ],
    stack: ['TypeScript', 'React', 'PostgreSQL', 'LLM APIs', 'Whisper'],
    github: 'https://github.com/jagadeeshm007/Latte',
    live: 'https://latte-delta.vercel.app/dashboard',
  },
  {
    id: 'nemo',
    name: 'Nemo',
    tagline: 'Agentic RAG assistant',
    what: 'An assistant that answers questions over team documents and runs multi-step tasks with tool-calling agents.',
    why: 'Useful answers — and useful actions — need retrieval, tools, auth and durable execution, not just a chat prompt.',
    how: [
      { step: 'Route', body: 'Six services behind a single Go gateway.' },
      { step: 'Retrieve', body: 'RAG over Chroma grounds every answer in team documents.' },
      { step: 'Act', body: 'An agent engine with a tool registry, across 3 LLM providers.' },
      { step: 'Endure', body: 'Keycloak service auth, Vault secrets, Temporal durable workflows on Kubernetes.' },
    ],
    built: [
      'Service-oriented from day one: each service has one job',
      'Durable workflows so multi-step agent runs survive failures',
      'Provider-agnostic agents across 3 LLM providers',
    ],
    stack: ['Go', 'Python', 'FastAPI', 'LangChain', 'Kafka', 'Kubernetes'],
    github: 'https://github.com/jagadeeshm007/nemo',
  },
];

/* -------------------------------------------------------------- principles */

export const principles: { title: string; body: string }[] = [
  { title: 'Own it end to end', body: 'A ticket is done when the problem is fixed in production — whichever layer it lives in.' },
  { title: 'Measure before optimizing', body: 'Profiles, p99s and dashboards decide what to change, not hunches.' },
  { title: 'Make failure boring', body: 'Idempotency, safe retries and zero-downtime rollouts turn bad days into non-events.' },
  { title: 'Design security in', body: 'Guardrails, PII masking, scoped keys and managed secrets belong in the first diagram.' },
  { title: 'Fix the class of bug', body: 'Every incident ends with a postmortem and a change that stops it coming back.' },
  { title: 'Do more with less', body: 'Lean services and bounded LLM costs — efficiency is a feature.' },
];
