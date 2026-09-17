// ============================================================================
// SITE CONFIGURATION
// Everything personal lives here. Replace values as needed — no need to touch
// any component to update content.
// ============================================================================

export const repoLinkPlaceholder = "#";

export const site = {
  // TODO: replace with your name
  name: "Shramadeep",
  firstName: "Shramadeep",
  initials: "SMD",
  role: "Machine Learning Engineer · AI Researcher · Data Scientist",
  positioning: "Building intelligent systems from models to production.",
  tagline: "I build machines that learn.",
  intro:
    "From fine-tuning speech models on a single GPU to building document intelligence systems, I like working at the intersection of research, mathematics, and engineering.",
};

export const links = {
  // TODO: replace "#" placeholders with real URLs / email
  github: "#",
  email: "mailto:",
  linkedin: "#",
  twitter: "#",
  resume: "/resume.pdf", // drop your PDF at public/resume.pdf
};

export const availability = {
  label: "AVAILABLE FOR ML / AI OPPORTUNITIES",
  detail: "Internships · research · AI engineering roles",
};

// ---------------------------------------------------------------------------
// Hero terminal — lines are typed sequentially, in order.
// ---------------------------------------------------------------------------
export const terminal = [
  {
    prompt: "whoami",
    output: ["Machine Learning Engineer", "Data Scientist"],
  },
  {
    prompt: "focus",
    output: ["NLP", "Computer Vision", "Speech AI", "LLMs", "Data Science"],
  },
  {
    prompt: "currently_building",
    output: [
      "AI systems",
      "Document intelligence",
      "Model fine-tuning",
      "ML infrastructure",
    ],
  },
];

// ---------------------------------------------------------------------------
// Quick stats — keep only what is accurate. Qualitative fallbacks are fine.
// ---------------------------------------------------------------------------
export const stats = [
  {
    value: 1,
    suffix: "+",
    label: "Years building ML systems",
    sub: "Since the first model went from notebook to code",
  },
  {
    value: 7,
    suffix: "+",
    label: "Research & engineering projects",
    sub: "Across language, vision, speech, and data",
  },
  {
    value: 4,
    suffix: "+",
    label: "AI domains explored",
    sub: "NLP · CV · Speech · Time-series",
  },
  {
    value: 1,
    suffix: "",
    label: "GPU used for recent ASR fine-tuning",
    sub: "Tesla T4 · ~1 hour of training",
  },
];

// ---------------------------------------------------------------------------
// About section
// ---------------------------------------------------------------------------
export const about = {
  paragraphs: [
    "I'm a Data Science student, interested in understanding how intelligent systems actually work — from the mathematics behind statistical learning to the engineering required to deploy models reliably.",
    "My work spans NLP, computer vision, speech recognition, LLM applications, data analytics, and machine learning infrastructure.",
    "I particularly enjoy problems where the obvious solution isn't enough: long-context document processing, low-resource speech recognition, OCR pipelines, model fine-tuning under limited compute, and systems that have to work outside a notebook.",
  ],
  interests: [
    { label: "NLP & LLMs", tag: "language" },
    { label: "Computer Vision", tag: "vision" },
    { label: "Speech AI", tag: "speech" },
    { label: "Document Intelligence", tag: "systems" },
    { label: "Data Science", tag: "data" },
    { label: "ML Infrastructure", tag: "systems" },
  ],
};

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

export const contactCopy =
  "Interested in ML systems, research, AI engineering, or difficult technical problems?";