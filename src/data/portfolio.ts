/**
 * All portfolio content lives here. Facts come from the resume
 * (public/Jagadeesh-Mandala-Resume.pdf); framing, lessons and narrative
 * voice are editorial. Edit this file to update the site — components and
 * 3D scenes read from it and never hard-code facts.
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
    'I work across the stack — Go services, Kafka pipelines, Kubernetes platforms, React dashboards and agentic AI — and I own problems from the first bug report to the production fix.',
  links: {
    email: 'jagadeeshm943@gmail.com',
    linkedin: 'https://linkedin.com/in/mandalajagadeesh',
    github: 'https://github.com/jagadeeshm007',
    resume: 'Jagadeesh-Mandala-Resume.pdf',
  },
} as const;

export const availability = {
  headline: 'Open to new opportunities',
  facts: [
    { label: 'Status', value: 'Open to work' },
    { label: 'Notice', value: 'Immediate joiner' },
    { label: 'Location', value: 'Hyderabad, India' },
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

export type ChapterId =
  | 'intro'
  | 'journey'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'principles'
  | 'future'
  | 'contact';

export const chapters: { id: ChapterId; index: string; label: string }[] = [
  { id: 'intro', index: '01', label: 'Intro' },
  { id: 'journey', index: '02', label: 'Origin' },
  { id: 'skills', index: '03', label: 'Skills' },
  { id: 'experience', index: '04', label: 'Experience' },
  { id: 'projects', index: '05', label: 'Projects' },
  { id: 'principles', index: '06', label: 'Principles' },
  { id: 'future', index: '07', label: 'Future' },
  { id: 'contact', index: '08', label: 'Contact' },
];

/* ------------------------------------------------------------------ origin */

export type Milestone = {
  marker: string; // large numeral / glyph
  when: string;
  title: string;
  place?: string;
  story: string;
  lesson: string;
  tags: string[];
};

export const originIntro =
  'No shortcut, no single breakthrough — a steady climb from fundamentals to production systems. Six waypoints, each one adding a layer to how I build.';

export const journey: Milestone[] = [
  {
    marker: '21',
    when: '2021',
    title: 'Learning how machines think',
    place: 'B.Tech, Computer Science & Engineering — Aditya College of Engineering and Technology, Surampalem',
    story:
      'Computer science from the ground up: data structures, operating systems, networks, databases. I cared less about which framework was popular and more about what actually happens underneath when code runs.',
    lesson: 'Fundamentals outlast frameworks.',
    tags: ['C++', 'Data structures', 'Algorithms', 'OOP'],
  },
  {
    marker: '3★',
    when: 'Along the way',
    title: 'Training under a clock',
    place: 'CodeChef · LeetCode',
    story:
      'Competitive programming became my gym. A 3 Star CodeChef rating (1637) and 500+ LeetCode problems later, reasoning about complexity and edge cases before writing code had become a reflex.',
    lesson: 'Think about the worst case before the code exists.',
    tags: ['Problem solving', 'Complexity analysis', 'Edge cases'],
  },
  {
    marker: '300',
    when: '2023',
    title: 'Teaching 300+ students',
    place: 'Technical Hub',
    story:
      'I trained more than 300 students in C++ and DSA. Explaining recursion, graphs and dynamic programming to a room — and answering the questions nobody expected — showed me exactly where my own understanding had gaps.',
    lesson: 'If I can’t explain it simply, I don’t understand it yet.',
    tags: ['C++', 'DSA', 'Mentoring', 'Communication'],
  },
  {
    marker: 'OS',
    when: 'Along the way',
    title: 'Going below the application',
    place: 'Red Hat RHCSA · AWS Certified Cloud Practitioner',
    story:
      'Software runs on machines, and machines run on Linux and the cloud. Earning RHCSA and AWS Cloud Practitioner made me comfortable with the layer most application developers treat as somebody else’s problem.',
    lesson: 'Know the machine your code runs on.',
    tags: ['Linux', 'System administration', 'AWS'],
  },
  {
    marker: '01',
    when: 'Jan — Jun 2025',
    title: 'First production codebase',
    place: 'Software Development Intern — Zengen LLP, Chennai',
    story:
      'My first real product: CRM features across a React frontend and Node.js REST APIs, including live notifications. As the product grew I helped shape service boundaries and wrote reusable utilities that the rest of the codebase adopted.',
    lesson: 'Code other people build on has to be boringly reliable.',
    tags: ['React', 'Node.js', 'REST APIs', 'Real-time'],
  },
  {
    marker: '25',
    when: 'Aug 2025 — Present',
    title: 'Engineering at real scale',
    place: 'Associate Software Engineer — Apxor Technology, Hyderabad',
    story:
      'Graduated in 2025 and moved straight into the analytics infrastructure behind apps serving 100M+ users — Go services, Kafka pipelines, Kubernetes, on-call, and an AI assistant built for enterprise data.',
    lesson: 'Production is the most honest teacher.',
    tags: ['Go', 'Kafka', 'Kubernetes', 'AI agents'],
  },
];

export const originStats = [
  { value: 500, suffix: '+', label: 'LeetCode problems solved' },
  { value: 1637, suffix: '', label: 'CodeChef rating · 3 Star' },
  { value: 300, suffix: '+', label: 'Students trained in C++ & DSA' },
  { value: 2, suffix: '', label: 'Certifications · RHCSA, AWS' },
];

/* ------------------------------------------------------------------ skills */

export type SkillGroup = {
  id: string;
  name: string;
  context: string;
  signature: string[]; // highlighted — used heavily in production
  items: string[];
  evidence: string;
};

/** Six groups → six clusters in the 3D toolkit scene (order matters). */
export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    name: 'Languages',
    context: 'Go for services, Python for AI, TypeScript for interfaces.',
    signature: ['Go', 'Python', 'TypeScript'],
    items: ['JavaScript', 'SQL', 'Java'],
    evidence: 'Rewrote Scala & Java services in Go · built the AI assistant in Python',
  },
  {
    id: 'backend',
    name: 'Backend & Data',
    context: 'Event streams, durable workflows and data stores under real load.',
    signature: ['Kafka', 'Redis', 'ClickHouse'],
    items: ['FastAPI', 'REST', 'gRPC', 'Temporal', 'Spark', 'Node.js', 'PostgreSQL', 'MongoDB'],
    evidence: 'Redis at ~9M commands/sec · ClickHouse at ~20K rows/sec · Kafka groups of 116 consumers',
  },
  {
    id: 'devops',
    name: 'DevOps & Reliability',
    context: 'GitOps rollouts, infrastructure as code, golden-signal monitoring.',
    signature: ['Kubernetes', 'ArgoCD', 'Terraform'],
    items: ['Docker', 'Helm', 'CI/CD', 'AWS', 'GCP', 'Prometheus', 'Grafana', 'Loki'],
    evidence: 'Zero-downtime rollouts on GKE & EKS · 100+ production incidents resolved',
  },
  {
    id: 'ai',
    name: 'AI & LLMs',
    context: 'Retrieval, agents, and the guardrails that make them safe for enterprise data.',
    signature: ['RAG', 'LangGraph', 'Guardrails'],
    items: ['LangChain', 'LLM APIs', 'Embeddings', 'Chroma', 'AI agents', 'Tool use', 'Evals'],
    evidence: 'Agentic assistant over 500+ event types · evals gating every prompt change in CI',
  },
  {
    id: 'agentic',
    name: 'Agentic Tooling',
    context: 'AI coding agents in the daily loop — always with full human review.',
    signature: ['Claude Code', 'MCP'],
    items: ['Subagents', 'Connectors', 'Tool calling', 'Agent loop', 'Skills'],
    evidence: 'Used daily for coding, testing and documentation',
  },
  {
    id: 'frontend',
    name: 'Frontend',
    context: 'Data-dense dashboards that stay fast at scale.',
    signature: ['React', 'TypeScript'],
    items: ['Next.js', 'TanStack Query', 'Zustand'],
    evidence: 'Virtualized rendering library for data grids of 10,000+ rows',
  },
];

/* -------------------------------------------------------------- experience */

export type Story = {
  id: string;
  title: string;
  hook: string;
  problem: string;
  action: string;
  result: string;
  metrics?: { value: string; label: string }[];
  principles: string[];
  stack: string[];
};

export type Role = {
  company: string;
  role: string;
  period: string;
  location: string;
  context: string;
  stories: Story[];
};

export const experience: Role[] = [
  {
    company: 'Apxor Technology',
    role: 'Associate Software Engineer',
    period: 'Aug 2025 — Present',
    location: 'Hyderabad, India',
    context:
      'Apxor’s analytics runs inside client apps from GCash, Porter and ICICI Bank — products used by more than 100 million people. Behind every dashboard is a pipeline of SDK events, Go services, Kafka, Redis and ClickHouse. These are the stories of keeping that machine fast, safe and honest.',
    stories: [
      {
        id: 'owner',
        title: 'One owner, from report to fix',
        hook: 'When a client says “the numbers look wrong”, the cause could be in web, Android, iOS or the backend. Someone has to follow it all the way down.',
        problem:
          'Client teams at GCash, Porter and ICICI Bank depend on analytics to make product decisions. An issue rarely lives in one layer, and hand-offs between teams slow everything down.',
        action:
          'I partner with client teams to scope what they actually need to measure, and I own each issue end to end — reproducing it, tracing it across web, Android and iOS, finding the root cause and shipping the fix to production.',
        result:
          'Clients get one accountable engineer instead of a relay race, and fixes land in production rather than in a ticket queue.',
        principles: ['Customer Obsession', 'Ownership'],
        stack: ['Web', 'Android', 'iOS', 'Root-cause analysis'],
      },
      {
        id: 'go-rewrite',
        title: 'From 9 seconds to 1',
        hook: 'The legacy services worked — they were just heavy. Every pod paid for it in memory, startup time and tail latency.',
        problem:
          'Core microservices written in Scala and Java needed 400 MB per pod, took 9 seconds to start and sat at a p99 of 110 ms. Scaling them meant paying for that weight over and over.',
        action:
          'I rewrote them in Go. Goroutines handled the concurrency; pprof told me where CPU time and allocations actually went, so optimizations were driven by profiles instead of guesses.',
        result: 'Lighter, faster services that start almost instantly and do more work on less hardware.',
        metrics: [
          { value: '−32%', label: 'p99 latency · 110 → 75 ms' },
          { value: '−84%', label: 'memory per pod · 400 → 65 MB' },
          { value: '9×', label: 'faster startup · 9 s → 1 s' },
          { value: '+32%', label: 'throughput per pod' },
        ],
        principles: ['Dive Deep', 'Frugality', 'Invent and Simplify'],
        stack: ['Go', 'Goroutines', 'pprof', 'Scala → Go', 'Java → Go'],
      },
      {
        id: 'delivery',
        title: 'Every event, delivered safely',
        hook: 'Clients wanted their raw events in their own cloud. Duplicates or gaps would quietly corrupt their analysis.',
        problem:
          'Client events had to stream continuously into each client’s own GCP or AWS bucket — and survive retries, restarts and partial failures without double-writing or dropping data.',
        action:
          'I engineered an idempotent Go service with safe retries that streams events as Parquet through Kafka into client buckets, run by 40 consumers, with a daily Spark batch job alongside it.',
        result: 'Consumer lag held near zero, and retries became safe by design rather than a risk.',
        metrics: [
          { value: '40', label: 'Kafka consumers' },
          { value: '≈0', label: 'consumer lag' },
        ],
        principles: ['Insist on the Highest Standards', 'Deliver Results'],
        stack: ['Go', 'Kafka', 'Parquet', 'Spark', 'GCP', 'AWS'],
      },
      {
        id: 'assistant',
        title: 'Asking the data a question',
        hook: 'A product manager should be able to ask “why did signups dip?” in plain language — and get a chart back.',
        problem:
          'Answers lived in hundreds of event types and took analyst time to assemble. And because it touches fintech and banking data, any AI layer had to be safe enough for an enterprise.',
        action:
          'I architected an agentic analytics assistant with RAG, LangGraph and FastAPI. It plans, calls tools and keeps memory, using a Chroma vector database of 500+ event types to turn questions into charts. I secured it with guardrails, prompt-injection detection and PII masking.',
        result: 'Natural-language questions become charts, with security designed in from the start rather than bolted on.',
        metrics: [{ value: '500+', label: 'event types indexed' }],
        principles: ['Invent and Simplify', 'Earn Trust'],
        stack: ['RAG', 'LangGraph', 'FastAPI', 'Chroma', 'Guardrails', 'PII masking'],
      },
      {
        id: 'platform',
        title: 'Shipping without a maintenance window',
        hook: 'With 100M+ end users, there is no good time to go down.',
        problem: 'Deployments to production Kubernetes clusters on two clouds had to be routine, repeatable and invisible to users.',
        action:
          'I delivered zero-downtime rollouts on GKE and AWS EKS through GitOps (ArgoCD, Helm, Tanka), with GitHub Actions CI/CD and Terraform infrastructure as code — IAM and secrets included.',
        result: 'Releases became Git commits: reviewed, versioned and reversible.',
        principles: ['Deliver Results', 'Insist on the Highest Standards'],
        stack: ['Kubernetes', 'GKE', 'EKS', 'ArgoCD', 'Helm', 'Tanka', 'Terraform', 'GitHub Actions'],
      },
      {
        id: 'oncall',
        title: 'Keeping the lights on',
        hook: '9 million Redis commands every second. When something wobbles, the pager decides who finds out first.',
        problem:
          'The data layer runs hot: a 21-node Redis cluster serving 3,600+ clients, ClickHouse ingesting ~20K rows/sec, Kafka groups of up to 116 consumers.',
        action:
          'I track the golden signals — latency, traffic, errors, saturation — in Grafana, take my turn on call, and close every incident with root-cause analysis and a postmortem.',
        result: '100+ production incidents resolved, with postmortems that stopped the same failures from coming back.',
        metrics: [
          { value: '~9M', label: 'Redis commands / sec' },
          { value: '100+', label: 'incidents resolved' },
        ],
        principles: ['Ownership', 'Bias for Action', 'Dive Deep'],
        stack: ['Redis', 'ClickHouse', 'Kafka', 'Grafana', 'Prometheus', 'Loki'],
      },
      {
        id: 'frontend',
        title: '10,000 rows, no lag',
        hook: 'Analytics is only useful if people can actually explore it.',
        problem: 'Dashboards needed to render data grids with tens of thousands of cells without freezing the browser.',
        action:
          'I built React and TypeScript dashboards and a virtualized rendering library that only draws what is on screen.',
        result: 'Data grids of 10,000+ rows that stay responsive to scroll through.',
        principles: ['Customer Obsession'],
        stack: ['React', 'TypeScript', 'Virtualization'],
      },
      {
        id: 'agents',
        title: 'Working alongside AI agents',
        hook: 'New tools change how engineering gets done — if you learn them seriously.',
        problem: 'AI coding agents can speed up work, but only if their output is held to the same bar as any other code.',
        action: 'I adopted Claude Code, subagents and MCP for coding, testing and documentation — with full human review of everything they produce.',
        result: 'Faster iteration without lowering the review bar.',
        principles: ['Learn and Be Curious'],
        stack: ['Claude Code', 'Subagents', 'MCP'],
      },
    ],
  },
  {
    company: 'Zengen LLP',
    role: 'Software Development Intern',
    period: 'Jan 2025 — Jun 2025',
    location: 'Chennai, India',
    context: 'A growing CRM product, and my first time shipping code real users depended on.',
    stories: [
      {
        id: 'crm',
        title: 'Building on a moving product',
        hook: 'Interns usually get the side quests. I got features users touched every day.',
        problem: 'The CRM was growing quickly, and new features had to land without tangling the codebase.',
        action:
          'I delivered CRM features across the React frontend and Node.js REST APIs, including live notifications, helped shape service boundaries as the product grew, and wrote reusable utilities.',
        result: 'Those utilities were adopted across the codebase.',
        principles: ['Ownership', 'Deliver Results'],
        stack: ['React', 'Node.js', 'REST APIs', 'Live notifications'],
      },
    ],
  },
];

/* ---------------------------------------------------------------- projects */

export type Project = {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  what: string;
  why: string;
  how: { step: string; title: string; body: string }[];
  build: string[];
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
    what: 'A compliance platform that audits every recorded sales call and flags breaches with the evidence attached.',
    why: 'Compliance teams usually review a sample of calls, so most breaches are never heard. Latte audits 100% of them.',
    how: [
      {
        step: 'Listen',
        title: 'Per-speaker transcription',
        body: 'Whisper, plus Sarvam for 10 Indian languages, so the judge knows who said what.',
      },
      {
        step: 'Judge',
        title: 'One LLM call, strict schema',
        body: 'A single LLM judge call per conversation, constrained to a strict JSON schema so results are machine-checkable.',
      },
      {
        step: 'Protect',
        title: 'PII masked behind SSO',
        body: 'Personal data is masked and access sits behind single sign-on.',
      },
      {
        step: 'Integrate',
        title: 'A platform, not a page',
        body: 'REST API with scoped keys, signed webhooks and SDKs in 4 languages.',
      },
    ],
    build: [
      'Queued workers process batches of up to 500 calls',
      'A model gateway enforces token caps and rate limits to keep cost predictable',
      'Evals on 20 labelled calls gate every prompt or model change in CI',
    ],
    stack: ['TypeScript', 'React', 'PostgreSQL', 'LLM APIs', 'Whisper', 'Sarvam'],
    github: 'https://github.com/jagadeeshm007/Latte',
    live: 'https://latte-delta.vercel.app/dashboard',
  },
  {
    id: 'nemo',
    index: 'P/02',
    name: 'Nemo',
    subtitle: 'Agentic RAG assistant',
    what: 'An assistant that answers questions over team documents and runs multi-step tasks with tool-calling agents.',
    why: 'Useful answers — and useful actions — need retrieval, tools, auth and durable execution, not just a chat prompt.',
    how: [
      {
        step: 'Route',
        title: 'One Go gateway',
        body: 'Six services sit behind a single Go gateway — one front door for every request.',
      },
      {
        step: 'Retrieve',
        title: 'RAG over Chroma',
        body: 'Team documents are embedded and retrieved from Chroma to ground every answer.',
      },
      {
        step: 'Act',
        title: 'Agents with a tool registry',
        body: 'An agent engine plans and calls registered tools across 3 LLM providers.',
      },
      {
        step: 'Endure',
        title: 'Secure and durable',
        body: 'Keycloak service auth, Vault secrets and Temporal durable workflows on Kubernetes.',
      },
    ],
    build: [
      'Service-oriented from day one: 6 services, each with one job',
      'Durable workflows so multi-step agent runs survive failures',
      'Provider-agnostic agents across 3 LLM providers',
    ],
    stack: ['Go', 'Python', 'FastAPI', 'LangChain', 'Kafka', 'Kubernetes', 'Temporal', 'Keycloak', 'Vault'],
    github: 'https://github.com/jagadeeshm007/nemo',
  },
];

/* -------------------------------------------------------------- principles */

export type Principle = { lp: string; claim: string; proof: string; tag: string };

/** Working principles, each tied to work on the resume. */
export const principles: Principle[] = [
  {
    lp: 'Customer Obsession',
    claim: 'Start from the client’s problem, not the ticket.',
    proof: 'Partnered with GCash, Porter and ICICI Bank teams to scope what they needed to measure before building anything.',
    tag: 'Client partnership',
  },
  {
    lp: 'Ownership',
    claim: 'It isn’t done until it’s fixed in production.',
    proof: 'Own client issues from the first report to the production fix, across web, Android and iOS.',
    tag: 'End-to-end',
  },
  {
    lp: 'Dive Deep',
    claim: 'Profiles before opinions.',
    proof: 'Used pprof to find where latency and memory went in the Go rewrite; root-caused 100+ production incidents.',
    tag: 'pprof · RCA',
  },
  {
    lp: 'Invent and Simplify',
    claim: 'Make the hard thing feel simple.',
    proof: 'Turned plain-language questions into charts with an agentic assistant; reduced call auditing in Latte to one schema-bound LLM call.',
    tag: 'AI assistant · Latte',
  },
  {
    lp: 'Insist on the Highest Standards',
    claim: 'Raise the bar with evidence.',
    proof: 'Evals on labelled calls gate every prompt or model change in CI; idempotency and safe retries in the delivery pipeline.',
    tag: 'Evals · Idempotency',
  },
  {
    lp: 'Bias for Action',
    claim: 'When the pager goes, move.',
    proof: 'On-call for data infrastructure handling ~9M Redis commands/sec — 100+ incidents resolved.',
    tag: 'On-call',
  },
  {
    lp: 'Frugality',
    claim: 'Do more with less.',
    proof: '84% less memory per pod and 32% more throughput after the Go rewrite; token caps and rate limits keep Latte’s LLM costs bounded.',
    tag: '400 → 65 MB',
  },
  {
    lp: 'Earn Trust',
    claim: 'Security is part of the design.',
    proof: 'Guardrails, prompt-injection detection and PII masking for an AI assistant on enterprise data; Vault and Keycloak in Nemo.',
    tag: 'Guardrails · PII',
  },
  {
    lp: 'Learn and Be Curious',
    claim: 'Stay a student.',
    proof: 'Adopted AI coding agents early (with full review), earned RHCSA and AWS certifications, and taught 300+ students.',
    tag: 'Always learning',
  },
  {
    lp: 'Deliver Results',
    claim: 'Ship it, measure it.',
    proof: 'Zero-downtime Kubernetes rollouts on GKE and EKS; p99 latency down from 110 to 75 ms.',
    tag: 'Shipped',
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
    body: 'Kubernetes, GitOps and infrastructure as code, run as a product for other engineers.',
  },
  {
    title: 'AI-enabled products',
    body: 'Agents that are evaluated, guarded and observable — engineered like any other production service.',
  },
];
