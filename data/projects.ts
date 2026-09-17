// ============================================================================
// Featured projects + experiments. Add/edit content here — components render
// whatever is in this file.
// ============================================================================

export type ProjectKind = "asr" | "doc" | "legal" | "vision" | "analytics";

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  oneLiner: string;
  problem: string;
  approach: string[];
  result: string;
  learned: string[];
  tech: string[];
  links: { label: string; href: string }[];
  kind: ProjectKind;
  specs?: { label: string; value: string }[];
  metric?: { label: string; value: string; highlight?: boolean }[];
  metricNote?: string;
};

export const projects: Project[] = [
  {
    id: "uyghur-asr",
    title: "Low-Resource Uyghur Speech Recognition",
    category: "SPEECH AI",
    year: "2026",
    oneLiner:
      "Fine-tuning multilingual speech models under severe compute constraints.",
    problem:
      "Uyghur is a low-resource language: limited transcribed audio, almost no pretrained Uyghur-optimised checkpoints, and a single shared GPU. Training a full model from scratch is off the table — the entire adaptation has to fit into ~1 hour on one Tesla T4.",
    approach: [
      "Started from a large self-supervised multilingual speech model (XLS-R / MMS) that already encodes cross-lingual speech representations.",
      "Froze the base model and trained only a tiny adapter subset of parameters with PEFT / LoRA, on ~23 hours of transcribed Uyghur audio.",
      "Used CTC decoding to align speech frames to text without expensive attention-based alignment.",
    ],
    result:
      "Reached a Character Error Rate (CER) of 0.0517 on the evaluation set — while training only 0.005% of the model's parameters. That's what efficient fine-tuning looks like when compute is the constraint.",
    learned: [
      "Massive self-supervised models transfer surprisingly well to unseen languages — the bottleneck is data, not architecture.",
      "PEFT makes GPU-limited fine-tuning viable: single-digit % of trainable parameters, near-full-model quality.",
      "Evaluate on the metric that matters (CER here), and track compute honestly — tokens and GPU-hours are part of the result.",
    ],
    tech: ["Python", "PyTorch", "Transformers", "PEFT", "LoRA", "XLS-R / MMS", "CTC"],
    links: [
      { label: "GitHub", href: "#" }, // TODO: [ADD GITHUB LINK]
      {
        label: "Notes",
        href: "/blogs/2026/09/19/fine-tuning-asr-models-with-limited-gpu-resources",
      },
    ],
    kind: "asr",
    specs: [
      { label: "Dataset", value: "~23 hours" },
      { label: "Architecture", value: "XLS-R / MMS" },
      { label: "Fine-tuning", value: "PEFT / LoRA" },
      { label: "GPU", value: "Tesla T4" },
      { label: "Training", value: "~1 hour" },
      { label: "Metric", value: "Character Error Rate" },
    ],
    metric: [{ label: "CER", value: "0.0517", highlight: true }],
    metricNote: "0.005% of model parameters trained",
  },
  {
    id: "document-intelligence",
    title: "Document Intelligence & Question Answering",
    category: "LLM SYSTEMS",
    year: "2026",
    oneLiner:
      "Extracting structure from complex documents and making them searchable through natural language.",
    problem:
      "PDFs, DOCX files, and web pages are full of value locked inside layouts — tables, headers, mixed image+text. Asking questions over that content naively (stuff-everything-into-context) breaks on length, structure, and retrieval quality.",
    approach: [
      "Built a document processor that normalises PDF / DOCX / web sources into text, tables, and images.",
      "Chunk the extracted content intelligently (layout-aware, not naive fixed windows).",
      "Embed chunks into a vector database (Cassandra / Astra DB), retrieve the relevant context, and let an LLM answer with citations.",
    ],
    result:
      "A working retrieval-augmented pipeline end to end: upload → process → index → ask → answer with context. Retrieval quality remains the bottleneck and the ongoing experiment — [ADD METRIC: e.g. retrieval hit-rate / answer accuracy].",
    learned: [
      "Document structure beats byte size: layout-aware chunking meaningfully improves retrieval.",
      "Vector databases are only as good as their chunking + embedding pair. Good retrieval is an engineering problem, not an API call.",
      "Separating indexes from application logic makes the system testable and replaceable.",
    ],
    tech: ["LangChain", "Cassandra", "Astra DB", "Vector DBs", "Hugging Face", "PDF extraction", "OCR", "FastAPI"],
    links: [
      { label: "GitHub", href: "#" }, // TODO: [ADD GITHUB LINK]
      { label: "Notes", href: "/notes/document-intelligence" },
    ],
    kind: "doc",
    metric: [{ label: "Retrieval quality", value: "[ADD METRIC]" }],
    metricNote: "WIP — measuring hit-rate vs chunking strategy",
  },
  {
    id: "legal-doc-nlp",
    title: "Hindi Legal Document Intelligence",
    category: "NLP · OCR · LEGAL AI",
    year: "2026",
    oneLiner:
      "OCR and summarization pipelines that turn scanned Hindi legal documents into structured text.",
    problem:
      "Legal documents in Hindi arrive as scans — no digital text layer, dense layout, mixed scripts. Standard OCR + summarization fails on layout corruption and language mismatch.",
    approach: [
      "Scanned PDFs → layout analysis → Tesseract OCR with Hindi language packs.",
      "Post-process: de-skew, layout understanding, structure extraction of sections.",
      "Transformer-based summarization over the recovered text, tuned for legal conventions.",
    ],
    result:
      "Enough structure recovered from scans to run language processing reliably — summarisation that reads as a coherent legal case note. Formal metrics: [ADD METRIC: e.g. OCR word error, summarisation quality score].",
    learned: [
      "OCR quality gates everything downstream — pipeline design should optimise the recovery stage first.",
      "Layout understanding (reading order!) matters as much as character accuracy for document AI.",
      "Language-aware post-processing is essential for Indic scripts.",
    ],
    tech: ["Tesseract", "PDF processing", "OpenCV", "NLP", "Transformers", "Summarization"],
    links: [{ label: "GitHub", href: "#" }], // TODO: [ADD GITHUB LINK]
    kind: "legal",
    metric: [{ label: "Pipeline accuracy", value: "[ADD METRIC]" }],
    metricNote: "Measuring end-to-end, not per-stage",
  },
  {
    id: "image-restoration",
    title: "Image Restoration & Super Resolution",
    category: "COMPUTER VISION",
    year: "2026",
    oneLiner:
      "Denoising and 4× super-resolution with deep vision architectures.",
    problem:
      "Real-world images are noisy and low-res. Can deep architectures — designed around perceptual quality — reconstruct detail at 4× scale where classical interpolation just blurs?",
    approach: [
      "Trained/experimented with attention-based restoration backbones (SwinIR family) against classical baselines.",
      "Synthetic degradation pipeline (blur + noise + downscale) to generate paired training data.",
      "Evaluate objectively with PSNR, and qualitatively: sharpness, texture plausibility, no artefacts.",
    ],
    result:
      "Working 4× reconstruction pipeline with clearly better perceived sharpness vs bicubic baselines. PSNR: [ADD VALUE] — measured on the held-out evaluation set.",
    learned: [
      "Loss choice matters: L1 vs perceptual losses trade pixel-accuracy against sharpness.",
      "Synthetic degradation is a reasonable proxy — but never a substitute for real-world test images.",
      "Vision experiments are judgement-heavy: metrics alone don't tell you if an image looks right.",
    ],
    tech: ["PyTorch", "SwinIR", "CNNs", "Image Processing"],
    links: [{ label: "GitHub", href: "#" }], // TODO: [ADD GITHUB LINK]
    kind: "vision",
    metric: [{ label: "PSNR", value: "[ADD VALUE] dB" }],
    metricNote: "4× super-resolution · held-out set",
  },
  {
    id: "surabha-inventory",
    title: "Surabha Variety — Data-Driven Inventory Intelligence",
    category: "DATA SCIENCE · FORECASTING",
    year: "2026",
    oneLiner:
      "Demand forecasting and inventory decisions for an army uniform & accessories business in Northeast India.",
    problem:
      "A real retail business faced a very common, very expensive problem: what to stock, when, and how much. Without data rigour, reorder decisions were gut-feel — leading to stockouts and dead inventory in a niche, seasonal category.",
    approach: [
      "Analysed sales history → demand trends and seasonality (uniforms spike on predictable cycles).",
      "Built SKU-level forecasts with ARIMA and Prophet baselines; compared against naive forecasts.",
      "Derived supplier KPIs and price elasticity to inform reorder quantities and margins.",
    ],
    result:
      "Forecasts that track real demand better than gut-feel ordering — and decisions that follow from data, not intuition. Exact uplift: [ADD METRIC: forecast error, stockout reduction, dead-inventory %].",
    learned: [
      "The first model should be a naive baseline — only beat it if the data says you can.",
      "Seasonality and SKU concentration dominate forecasting quality in niche retail.",
      "Business value comes from the decision the forecast enables, not the MAPE.",
    ],
    tech: ["Python", "Pandas", "StatsModels", "Prophet", "ARIMA", "SQL"],
    links: [{ label: "GitHub", href: "#" }], // TODO: [ADD GITHUB LINK]
    kind: "analytics",
    metric: [{ label: "Forecast", value: "ARIMA + Prophet" }],
    metricNote: "Charts below use demo data (client data is private)",
  },
];

// ---------------------------------------------------------------------------
// Experiments — the research notebook
// ---------------------------------------------------------------------------

export type Experiment = {
  id: string;
  tag: string;
  question: string;
  context: string;
  result: string;
  compute: string;
  outcome: string;
};

export const experiments: Experiment[] = [
  {
    id: "EXP-014",
    tag: "SPEECH · PEFT",
    question: `Can a 1B-parameter speech model be adapted using only a tiny fraction of its parameters?`,
    context: "Uyghur ASR, one Tesla T4, ~23h of audio.",
    result: "0.005% parameters trained",
    compute: "1 × Tesla T4 · ~1 hour",
    outcome: "CER = 0.0517",
  },
  {
    id: "EXP-009",
    tag: "EFFICIENCY",
    question: "Where does fine-tuning actually spend its trainable parameters — and what does LoRA keep?",
    context: "LoRA vs full fine-tune on the same task and data budget.",
    result: "~100× fewer trainable params",
    compute: "1 × consumer GPU",
    outcome: "Within noise of full fine-tuning [ADD METRIC]",
  },
  {
    id: "EXP-008",
    tag: "ASR · THEORY",
    question: "How does CTC solve frame-to-text alignment without attention?",
    context: "Reading along with the model internals, reproducing alignment behaviour.",
    result: "Blank token absorbs excess frames",
    compute: "—",
    outcome: "A working mental model of CTC decoding",
  },
  {
    id: "EXP-005",
    tag: "VISION",
    question: "Are CNNs really that much more parameter-efficient than MLPs per unit of computation?",
    context: "Small-scale comparison: receptive fields vs dense connectivity.",
    result: "O(k²·c) vs O(n²) weight growth",
    compute: "—",
    outcome: "Quantified why spatial structure wins",
  },
  {
    id: "EXP-004",
    tag: "DATA",
    question: "How much of the variance actually survives a PCA projection?",
    context: "High-dimensional tabular data, k components chosen by explained variance.",
    result: "[ADD VALUE]% variance retained",
    compute: "—",
    outcome: "k = [ADD VALUE] components → [ADD VALUE]% drift-free reconstruction",
  },
  {
    id: "EXP-002",
    tag: "FORECASTING",
    question: "Can ARIMA and Prophet actually beat a naive seasonal baseline on retail demand?",
    context: "SKU-level sales history; strict backtesting.",
    result: "Both do, on the right SKUs [ADD METRIC]",
    compute: "—",
    outcome: "Map of which series deserve deep models",
  },
  {
    id: "EXP-001",
    tag: "SYSTEMS",
    question: "What actually changes between fp16 and int8 for a served transformer?",
    context: "Size, latency, and output-quality deltas on a real endpoint.",
    result: "[ADD %] smaller · [ADD ×] faster",
    compute: "local + serverless",
    outcome: "Quantise only where quality holds",
  },
  {
    id: "EXP-011",
    tag: "RETRIEVAL",
    question: "At what chunk size does retrieval quality start to degrade?",
    context: "Same corpus, embeddings, and query set — swaplling chunking strategy only.",
    result: "Layout-aware chunking > fixed windows [ADD METRIC]",
    compute: "vector DB on free tier",
    outcome: "Chunking rules adopted across projects",
  },
];

// helper to find a project by id
export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}