// ============================================================================
// Section content: how-I-think, stack, engineering, knowledge graph,
// exploring, experience, education.
// ============================================================================

export type Stage = {
  index: string;
  title: string;
  note: string;
  items: string[];
};

export const howIThink: Stage[] = [
  {
    index: "01",
    title: "Mathematics",
    note: "The substrate everything else sits on.",
    items: ["Linear algebra", "Probability", "Optimization", "Calculus"],
  },
  {
    index: "02",
    title: "Statistics",
    note: "Making claims from data, honestly.",
    items: ["Estimation", "Hypothesis testing", "Bayesian thinking", "Sampling"],
  },
  {
    index: "03",
    title: "Machine Learning",
    note: "Learning functions from examples.",
    items: ["Regression", "Classification", "Time series", "Feature engineering"],
  },
  {
    index: "04",
    title: "Deep Learning",
    note: "Representations at scale.",
    items: ["CNNs", "Transformers", "Representation learning", "Fine-tuning"],
  },
  {
    index: "05",
    title: "Models",
    note: "Choosing the right inductive bias.",
    items: ["ASR models", "LLMs", "Vision models", "Baselines first"],
  },
  {
    index: "06",
    title: "Systems",
    note: "Where models become products.",
    items: ["APIs", "Databases", "Vector search", "Infrastructure"],
  },
  {
    index: "07",
    title: "Production",
    note: "Reliability, latency, monitoring.",
    items: ["Deployment", "Evaluation", "Monitoring", "Iteration"],
  },
];

// ---------------------------------------------------------------------------
// Engineering — beyond the model
// ---------------------------------------------------------------------------

export const engineeringSteps = [
  { label: "Data", detail: "collection · cleaning · labelling" },
  { label: "Processing", detail: "pipelines · ETL · augmentation" },
  { label: "Model", detail: "training · fine-tuning · evaluation" },
  { label: "API", detail: "serving · FastAPI · REST" },
  { label: "Database", detail: "PostgreSQL · MongoDB · vector DBs" },
  { label: "Deployment", detail: "Docker · Linux · cloud" },
  { label: "Monitoring", detail: "drift · latency · logging" },
];

export const engineeringTools = [
  "FastAPI",
  "Flask",
  "Docker",
  "Linux",
  "MongoDB",
  "PostgreSQL",
  "SQLite",
  "Cloudflare tunnels",
  "Coolify",
  "Vercel",
  "AWS",
];

export const engineeringCopy = [
  "Most ML work isn't gradient updates — it's the unglamorous plumbing around the model. I care about the whole lifecycle because a model that can't be served, evaluated, or monitored is just a research artefact.",
  "I build REST APIs with FastAPI, containerize with Docker, deploy on Linux boxes and apps like Coolify or Vercel, and wire vector stores for retrieval. The goal: ideas that survive contact with the real world.",
];

// ---------------------------------------------------------------------------
// Tech stack map
// ---------------------------------------------------------------------------

export type StackCategory = {
  name: string;
  short: string;
  color: string;
  items: string[];
};

export const stackCore = {
  name: "ML Engineering",
  short: "core",
};

export const stack: StackCategory[] = [
  {
    name: "Languages",
    short: "lang",
    color: "#6e9bff",
    items: ["Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    name: "ML / AI",
    short: "ml",
    color: "#9d86ff",
    items: ["PyTorch", "TensorFlow", "Scikit-learn", "Transformers", "PEFT", "LoRA"],
  },
  {
    name: "NLP",
    short: "nlp",
    color: "#6ee7ff",
    items: ["LLMs", "RAG", "OCR", "Embeddings", "Vector Search"],
  },
  {
    name: "Computer Vision",
    short: "cv",
    color: "#ffb86b",
    items: ["YOLO", "CNNs", "SwinIR", "Image Processing"],
  },
  {
    name: "Data",
    short: "data",
    color: "#3ddc97",
    items: ["Pandas", "DuckDB", "SQL", "Time Series", "Statistics"],
  },
  {
    name: "Backend",
    short: "be",
    color: "#ff7a90",
    items: ["FastAPI", "Flask", "REST APIs"],
  },
  {
    name: "Frontend",
    short: "fe",
    color: "#7bd7ff",
    items: ["React", "Next.js", "Vue"],
  },
  {
    name: "Infrastructure",
    short: "infra",
    color: "#c4b5fd",
    items: ["Docker", "Linux", "Cloudflare", "Coolify", "Git"],
  },
];

// ---------------------------------------------------------------------------
// Knowledge graph — nodes
// ---------------------------------------------------------------------------

export type GraphNode = {
  label: string;
  sub?: string;
  children?: GraphNode[];
};

export const knowledgeGraph: GraphNode = {
  label: "Machine Learning",
  sub: "core",
  children: [
    { label: "Statistics", sub: "inference" },
    {
      label: "Deep Learning",
      sub: "representations",
      children: [
        { label: "CNNs", sub: "vision" },
        { label: "Transformers", sub: "attention" },
        { label: "Representation Learning", sub: "embeddings" },
      ],
    },
    {
      label: "NLP",
      sub: "language",
      children: [
        { label: "LLMs", sub: "generation" },
        { label: "RAG", sub: "grounded QA" },
        { label: "OCR", sub: "scanned text" },
      ],
    },
    {
      label: "Computer Vision",
      sub: "pixels",
      children: [
        { label: "YOLO", sub: "detection" },
        { label: "Super Resolution", sub: "restore" },
      ],
    },
    {
      label: "Speech AI",
      sub: "audio",
      children: [
        { label: "ASR", sub: "speech→text" },
        { label: "CTC", sub: "alignment" },
      ],
    },
    {
      label: "Systems",
      sub: "engineering",
      children: [
        { label: "APIs", sub: "serving" },
        { label: "Databases", sub: "storage" },
        { label: "Deployment", sub: "ops" },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Currently exploring — areas of active curiosity, not claims of expertise.
// ---------------------------------------------------------------------------

export const exploring = [
  { topic: "Reinforcement Learning", note: "reward design · policy learning" },
  { topic: "Multimodal AI", note: "language × vision × audio" },
  { topic: "Agentic Systems", note: "tool use · planning loops" },
  { topic: "Efficient Fine-Tuning", note: "PEFT · quantisation" },
  { topic: "AI Security", note: "prompt injection · evals" },
  { topic: "HFT / Quantitative ML", note: "signal extraction at scale" },
];

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  type: string;
  summary: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "AI/ML Intern",
    org: "Migri Technologies",
    period: "2025 — 2026",
    type: "INTERNSHIP",
    summary:
      "Working on production-oriented ML systems — applying models to real product problems end to end.",
    bullets: [
      "[ADD RESPONSIBILITY] · model work, data, or evaluation you owned",
      "[ADD RESPONSIBILITY] · measurable outcome e.g. accuracy / latency / cost",
      "[ADD RESPONSIBILITY] · engineering you shipped (APIs, pipelines, deployment)",
    ],
  },
  {
    role: "Independent Researcher & Builder",
    org: "Personal lab — this site",
    period: "2026 — present",
    type: "RESEARCH",
    summary:
      "Running my own experiments across speech, vision, language, and data — full ownership from data to deployment.",
    bullets: [
      "Fine-tuned a multilingual ASR model for Uyghur under 1× GPU constraints → CER 0.0517",
      "Built document intelligence & retrieval systems (LangChain, vector DBs)",
      "Experimenting with super-resolution, forecasting, and model efficiency",
    ],
  },
];

// ---------------------------------------------------------------------------
// Education
// ---------------------------------------------------------------------------

export const education = {
  institution: "Indian Institute of Technology Madras",
  degree: "BS in Data Science",
  program: "B.Sc. Data Science & Applications",
  status: "Currently pursuing",
  focus: [
    "Statistics",
    "Mathematics",
    "Machine Learning",
    "Data Science",
    "Computer Science",
    "Economics / Finance",
  ],
  coursework: [
    "Probability & Statistics",
    "Linear Algebra",
    "Machine Learning Foundations",
    "Data Structures & Algorithms",
    "Database Systems",
    "Intro to Deep Learning",
    "Time Series & Forecasting",
    "Business Finance",
  ],
};