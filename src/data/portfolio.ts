/**
 * All site content. Facts come from the resume (public/Jagadeesh-Mandala-Resume.pdf);
 * the framing is editorial. Edit here — components only render this data.
 */

export const profile = {
  name: 'Jagadeesh Mandala',
  role: 'Software Engineer',
  title: 'Associate Software Engineer',
  company: 'Apxor Technology',
  location: 'Hyderabad, India',
  links: {
    email: 'jagadeeshm943@gmail.com',
    linkedin: 'https://linkedin.com/in/mandalajagadeesh',
    github: 'https://github.com/jagadeeshm007',
    resume: 'Jagadeesh-Mandala-Resume.pdf',
  },
} as const;

export const availability = {
  short: ['Open to work', 'Immediate joiner', 'Open to relocation'],
  roles: ['Backend Engineer', 'Platform / DevOps', 'Site Reliability', 'AI / LLM Engineer', 'Full-stack'],
};

/** Hero: one short pitch per reader. */
export const audiences: { id: string; label: string; pitch: string }[] = [
  {
    id: 'anyone',
    label: 'Anyone',
    pitch: 'I build the systems behind apps used by 100M+ people — and keep them fast, safe and running.',
  },
  {
    id: 'engineers',
    label: 'Engineers',
    pitch: 'Go, Kafka, Redis, ClickHouse and Kubernetes in production. I profile first, then rewrite: p99 down 32%, memory down 84%.',
  },
  {
    id: 'hiring',
    label: 'Hiring teams',
    pitch: 'An engineer who takes the problem, not just the ticket. Available now, and open to relocation.',
  },
  {
    id: 'founders',
    label: 'Founders',
    pitch: 'I ship whole products: Latte audits 100% of sales calls with AI, with an API, webhooks and SDKs in 4 languages.',
  },
];

/** Hero artwork: the Go rewrite as a before/after switch. `scale` is the bar width in %. */
export const rewrite = {
  title: 'Legacy services, rewritten in Go',
  rows: [
    { label: 'p99 latency', before: '110 ms', after: '75 ms', scaleBefore: 100, scaleAfter: 68 },
    { label: 'Memory / pod', before: '400 MB', after: '65 MB', scaleBefore: 100, scaleAfter: 16 },
    { label: 'Startup', before: '9 s', after: '1 s', scaleBefore: 100, scaleAfter: 11 },
  ],
  footnote: '+32% throughput per pod',
};

export const numbers: { prefix?: string; value: number; suffix: string; label: string }[] = [
  { value: 100, suffix: 'M+', label: 'people use the apps I support' },
  { prefix: '~', value: 9, suffix: 'M/s', label: 'Redis commands on infrastructure I run' },
  { value: 100, suffix: '+', label: 'production incidents resolved on call' },
  { value: 0, suffix: '', label: 'downtime across Kubernetes rollouts' },
];

/* ------------------------------------------------------------ how I work */

export type Trait = { id: string; word: string; belief: string; proof: { text: string; where: string }[] };

export const traits: Trait[] = [
  {
    id: 'ownership',
    word: 'Ownership',
    belief: 'If it’s broken for the user, it’s mine until it’s fixed.',
    proof: [
      { text: 'Take client issues from the first report to the production fix — across web, Android and iOS.', where: 'Apxor' },
      { text: 'Resolved 100+ production incidents on call, each closed with a root cause.', where: 'Apxor' },
      { text: 'Wrote postmortems that stopped the same failures from coming back.', where: 'Apxor' },
    ],
  },
  {
    id: 'proactive',
    word: 'Proactive',
    belief: 'I’d rather prevent the page than answer it.',
    proof: [
      { text: 'Profiled heavy JVM services and rewrote them in Go instead of paying to scale them.', where: 'Apxor' },
      { text: 'Built prompt-injection detection and PII masking into the AI assistant from day one.', where: 'Apxor' },
      { text: 'Evals gate every prompt or model change in CI, so regressions never ship.', where: 'Latte' },
    ],
  },
  {
    id: 'collaborative',
    word: 'Collaborative',
    belief: 'Good systems start with a good conversation.',
    proof: [
      { text: 'Partner with client teams at GCash, Porter and ICICI Bank to scope what they need to measure.', where: 'Apxor' },
      { text: 'Shaped service boundaries with the team; my utilities were adopted across the codebase.', where: 'Zengen' },
      { text: 'Built Latte as a platform others can build on — API, signed webhooks, SDKs in 4 languages.', where: 'Latte' },
    ],
  },
];

/* -------------------------------------------------------------- experience */

export type Story = {
  id: string;
  tab: string;
  title: string;
  metric: string;
  metricLabel: string;
  body: string;
  facts: string[];
  stack: string[];
};

export const apxor = {
  company: 'Apxor Technology',
  role: 'Associate Software Engineer',
  period: 'Aug 2025 — Present',
  location: 'Hyderabad',
  context: 'Analytics for client apps from GCash, Porter and ICICI Bank — used by more than 100 million people.',
  stories: [
    {
      id: 'rewrite',
      tab: 'The Go rewrite',
      title: 'From 9 seconds to 1',
      metric: '9×',
      metricLabel: 'faster startup',
      body: 'The legacy Scala and Java services worked, but every pod paid for their weight. I rewrote them in Go, letting pprof — not opinion — decide what to optimize.',
      facts: ['p99 110 → 75 ms', 'Memory 400 → 65 MB', '+32% throughput'],
      stack: ['Go', 'pprof', 'Goroutines'],
    },
    {
      id: 'assistant',
      tab: 'The AI assistant',
      title: 'Ask the data a question',
      metric: '500+',
      metricLabel: 'event types indexed',
      body: 'I architected an agentic assistant that plans, uses tools and keeps memory to turn plain-language questions into charts — with guardrails, prompt-injection detection and PII masking, because it handles enterprise data.',
      facts: ['RAG over Chroma', 'Secured for enterprise'],
      stack: ['LangGraph', 'FastAPI', 'RAG', 'Chroma'],
    },
    {
      id: 'pipeline',
      tab: 'The event pipeline',
      title: 'Every event, delivered safely',
      metric: '≈ 0',
      metricLabel: 'consumer lag',
      body: 'Clients wanted raw events in their own cloud buckets, where a duplicate or a gap would quietly corrupt analysis. I built an idempotent Go service with safe retries that streams Parquet through Kafka.',
      facts: ['40 consumers', 'GCP & AWS buckets', 'Daily Spark batch'],
      stack: ['Go', 'Kafka', 'Parquet', 'Spark'],
    },
    {
      id: 'reliability',
      tab: 'Keeping it up',
      title: 'No good time to go down',
      metric: '100+',
      metricLabel: 'incidents resolved',
      body: 'I ship zero-downtime rollouts on GKE and EKS through GitOps, and take on-call for the data layer: a 21-node Redis cluster, ClickHouse and Kafka, watched on golden signals in Grafana.',
      facts: ['~9M Redis cmd/s', '3,600+ clients', 'Terraform IaC'],
      stack: ['Kubernetes', 'ArgoCD', 'Helm', 'Terraform', 'Grafana'],
    },
    {
      id: 'clients',
      tab: 'The client side',
      title: 'One owner, report to fix',
      metric: '100M+',
      metricLabel: 'end users',
      body: 'When a client says “the numbers look wrong”, I follow it through web, Android, iOS and the backend until it is fixed in production. I also built their React dashboards, with a virtualized grid for 10,000+ rows.',
      facts: ['GCash · Porter · ICICI Bank', '10,000+ row grids'],
      stack: ['React', 'TypeScript', 'Android', 'iOS'],
    },
  ] as Story[],
};

export const earlier = {
  company: 'Zengen LLP',
  role: 'Software Development Intern',
  period: 'Jan — Jun 2025',
  location: 'Chennai',
  line: 'Shipped CRM features across React and Node.js REST APIs, with live notifications.',
};

/* ------------------------------------------------------------------ skills */

export type SkillGroup = { id: string; name: string; core: string[]; more: string[] };

export const skills: SkillGroup[] = [
  { id: 'lang', name: 'Languages', core: ['Go', 'Python', 'TypeScript'], more: ['JavaScript', 'SQL', 'Java'] },
  {
    id: 'data',
    name: 'Backend & Data',
    core: ['Kafka', 'Redis', 'ClickHouse'],
    more: ['FastAPI', 'gRPC', 'REST', 'Temporal', 'Spark', 'Node.js', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: 'cloud',
    name: 'Cloud & Reliability',
    core: ['Kubernetes', 'ArgoCD', 'Terraform'],
    more: ['Docker', 'Helm', 'CI/CD', 'AWS', 'GCP', 'Prometheus', 'Grafana', 'Loki'],
  },
  {
    id: 'ai',
    name: 'AI & Agents',
    core: ['RAG', 'LangGraph', 'Guardrails'],
    more: ['LangChain', 'LLM APIs', 'Embeddings', 'Chroma', 'Evals', 'Claude Code', 'MCP'],
  },
  { id: 'web', name: 'Frontend', core: ['React'], more: ['Next.js', 'TanStack Query', 'Zustand'] },
];

export const certifications = ['RHCSA — Red Hat Certified System Administrator', 'AWS Certified Cloud Practitioner'];

/* ---------------------------------------------------------------- projects */

export type Project = {
  id: string;
  name: string;
  tagline: string;
  why: string;
  steps: { name: string; body: string }[];
  proof: string;
  stack: string[];
  github: string;
  live?: string;
};

export const projects: Project[] = [
  {
    id: 'latte',
    name: 'Latte',
    tagline: 'AI that audits every sales call',
    why: 'Compliance teams review a sample of calls, so most breaches are never heard. Latte audits 100% of them and flags each breach with evidence.',
    steps: [
      { name: 'Listen', body: 'Per-speaker transcription with Whisper, plus Sarvam for 10 Indian languages.' },
      { name: 'Judge', body: 'One LLM call per conversation, bound to a strict JSON schema.' },
      { name: 'Protect', body: 'PII is masked, and access sits behind SSO.' },
      { name: 'Integrate', body: 'REST API with scoped keys, signed webhooks and SDKs in 4 languages.' },
    ],
    proof: 'Evals on labelled calls gate every prompt or model change in CI.',
    stack: ['TypeScript', 'React', 'PostgreSQL', 'Whisper'],
    github: 'https://github.com/jagadeeshm007/Latte',
    live: 'https://latte-delta.vercel.app/dashboard',
  },
  {
    id: 'nemo',
    name: 'Nemo',
    tagline: 'An assistant that answers and acts',
    why: 'Useful answers — and useful actions — need retrieval, tools, auth and durable execution, not just a chat prompt.',
    steps: [
      { name: 'Route', body: 'Six services behind a single Go gateway.' },
      { name: 'Retrieve', body: 'RAG over Chroma grounds every answer in team documents.' },
      { name: 'Act', body: 'An agent engine with a tool registry, across 3 LLM providers.' },
      { name: 'Endure', body: 'Keycloak auth, Vault secrets and Temporal durable workflows on Kubernetes.' },
    ],
    proof: 'Durable workflows let multi-step agent runs survive failures.',
    stack: ['Go', 'Python', 'FastAPI', 'Kafka', 'Kubernetes'],
    github: 'https://github.com/jagadeeshm007/nemo',
  },
];
