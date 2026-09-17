// ============================================================================
// Technical notes (lab notebook) + GitHub repos.
// ============================================================================

export type NoteBlock =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "code"; text: string }
  | { t: "list"; items: string[] }
  | { t: "callout"; text: string };

export type Note = {
  slug: string;
  title: string;
  domain: string;
  mins: string;
  date: string;
  excerpt: string;
  blocks: NoteBlock[];
};

export const notes: Note[] = [
  {
    slug: "pca",
    title: "What PCA actually does to your data",
    domain: "NLP / DATA",
    mins: "8 min read",
    date: "Sept 2026",
    excerpt:
      "A geometric view of principal component analysis — what the eigenvectors and eigenvalues really mean, and why the 'information loss' framing is exactly right.",
    blocks: [
      {
        t: "p",
        text: "PCA is usually taught as 'reducing dimensions', which makes it sound like a compression trick. The more useful framing: PCA is a change of basis, followed by a projection.",
      },
      {
        t: "h2",
        text: "The setup",
      },
      {
        t: "p",
        text: "Given data points in d dimensions, PCA finds the orthonormal basis in which the data's variance is maximally aligned with the first axes. Formally, it solves for the eigenvectors of the covariance matrix:",
      },
      { t: "code", text: "C = XᵀX / n\nC v = λ v\n\nλ₁ ≥ λ₂ ≥ … ≥ λd" },
      {
        t: "p",
        text: "Each eigenvector v is a direction in the original feature space; λ is the variance of the data along that direction. Projecting X onto the top-k eigenvectors keeps the k directions with the most variance — that's all 'keeping 95% of the variance' means.",
      },
      {
        t: "h2",
        text: "Why this matters",
      },
      { t: "list", items: ["It decorrelates features (new axes are orthogonal).", "The projection is the linear map with minimum reconstruction error for a given k — provably.", "It's also the whitening step behind many representation pipelines."] },
      {
        t: "callout",
        text: "PCA does NOT care about class structure. Two heavily overlapping classes can be preserved perfectly while a tiny separating axis gets thrown away. Use it to compress signal you already trust, not to discover what matters.",
      },
      {
        t: "p",
        text: "In practice I reach for PCA on tabular data before embeddings, to sanity-check that my features carry variance that tracks meaning — and occasionally as a baseline against 'proper' learned representations to prove they're actually learning something PCA can't.",
      },
    ],
  },
  {
    slug: "lora",
    title: "Understanding LoRA mathematically",
    domain: "NLP / EFFICIENCY",
    mins: "10 min read",
    date: "Sept 2026",
    excerpt:
      "Why freezing a base model and training low-rank adapters works — the rank argument, the delta-weight update, and where the savings actually come from.",
    blocks: [
      {
        t: "p",
        text: "LoRA (Low-Rank Adaptation) rests on an empirical observation: the change a fine-tuning run induces in a weight matrix is low-rank. So instead of updating W ∈ ℝ^(d×d), we update a product of two small matrices.",
      },
      { t: "code", text: "W' = W₀ + ΔW       ΔW = B·A\nA ∈ ℝ^(r×d),  B ∈ ℝ^(d×r),  r ≪ d" },
      {
        t: "p",
        text: "If r = 4 and d = 4096, each adapter layer holds 4 × 4096 + 4096 × 4 ≈ 33k parameters instead of 16.7M. Only B·A is trained; W₀ stays frozen. This is why my ASR fine-tune moved only 0.005% of the model's parameters.",
      },
      {
        t: "h2",
        text: "Where the savings come from",
      },
      { t: "list", items: ["Memory: only B and A need gradients and optimizer states.", "Storage: adapters are a few MB; the base checkpoint stays shared.", "Compute: forward pass cost is similar, but backward through a frozen base is cheaper."] },
      {
        t: "callout",
        text: "The rank r is the knob. Too small → the adapter can't express the needed delta. Too large → you're re-learning the part of the model fine-tuning was supposed to be. Pick r by probing downstream metric, not by convention.",
      },
      {
        t: "p",
        text: "LoRA is not magic — it's a structured prior that fine-tuning deltas live on a low-dimensional manifold. When that prior holds, single-GPU adaptation of billion-scale models stops being surprising.",
      },
    ],
  },
  {
    slug: "ctc-loss",
    title: "How CTC loss works",
    domain: "SPEECH / ASR",
    mins: "9 min read",
    date: "Sept 2026",
    excerpt:
      "The blank token, repeated labels, and why CTC sidesteps the alignment problem — a worked intuition for frame-level speech recognition.",
    blocks: [
      {
        t: "p",
        text: "Speech-to-text has an alignment problem: audio has ~100 frames per second, but words come far more slowly, and we never annotated where each character starts. CTC (Connectionist Temporal Classification) lets a model output a character per frame and handles alignment implicitly.",
      },
      {
        t: "h2",
        text: "The trick",
      },
      {
        t: "p",
        text: "Introduce a blank token (ε). The model emits a character sequence over time, and the decoder collapses it with two rules: (1) merge adjacent repeats of the same char, (2) insert blanks to separate legitimately repeated chars.",
      },
      { t: "code", text: "frames:   ε ε C A A ε T ε T T\ncollapse: C A A T T   →  (merge repeats)\n  ε breaks repeats:  C A ε A T →  CAT" },
      {
        t: "p",
        text: "Because many different per-frame paths collapse to the same text, CTC's loss sums over ALL alignments that produce the target. That makes it differentiable: the model learns to spread probability mass over every valid frame alignment at once.",
      },
      { t: "h2", text: "Trade-offs" },
      { t: "list", items: ["Assumes conditional independence of frames given the input → can't learn strong language context inside the acoustic model.", "No explicit duration modelling — the blank absorbs it.", "Decoding needs beam search over output possibilities, not greedy over frames."] },
      {
        t: "callout",
        text: "Greedy 'take the argmax per frame and collapse' is a fast but lossy approximation. Proper beam search over collapsed sequences is where the last few CER points come from.",
      },
    ],
  },
  {
    slug: "cnn-efficiency",
    title: "Why CNNs are computationally efficient",
    domain: "VISION",
    mins: "7 min read",
    date: "Sept 2026",
    excerpt:
      "Receptive fields, weight sharing, and the parameter count difference between dense and convolutional layers — the structural reason vision models don't blow up.",
    blocks: [
      {
        t: "p",
        text: "A fully-connected layer connecting two images of size 224×224 has (224²)² ≈ 2.5 billion weights per layer. Nobody trains that. A CNN layer achieves the same receptive field with a few thousand parameters. The reason is structural, not cosmetic.",
      },
      {
        t: "h2",
        text: "Two assumptions",
      },
      { t: "list", items: ["Locality — nearby pixels matter together; distant pixels matter little at the first layers.", "Translation invariance — the same pattern (an edge, a corner) is useful everywhere in the image."] },
      {
        t: "p",
        text: "A convolution enforces both: a small kernel (k×k) only touches a local patch, and it's shared across every spatial location. Compare weights for a layer with c_in input channels:",
      },
      { t: "code", text: "dense layer:   c_out × (H·W · c_in)\nconv layer:    c_out × (k²   · c_in)" },
      {
        t: "p",
        text: "With H = W = 224 and k = 3, the dense layer is ~5,600× heavier. Stacking convolutions grows the receptive field linearly with depth while parameter count stays flat — that's the whole trick.",
      },
      {
        t: "callout",
        text: "Transformers later questioned the translation-invariance prior — but the efficiency argument is still the reason CNNs remain the workhorse for real-time and low-compute vision.",
      },
    ],
  },
  {
    slug: "document-intelligence",
    title: "Building document intelligence systems",
    domain: "LLM SYSTEMS",
    mins: "12 min read",
    date: "Sept 2026",
    excerpt:
      "Layout-aware extraction, chunking, embeddings, and retrieval — the engineering decisions that decide whether a document QA system actually answers questions.",
    blocks: [
      {
        t: "p",
        text: "Document intelligence is 20% language models and 80% the unglamorous pipeline around them. Getting from a scanned PDF to a grounded answer means surviving extraction, layout, chunking, indexing, and retrieval — each stage can quietly destroy the one after it.",
      },
      {
        t: "h2",
        text: "Extraction is the foundation",
      },
      {
        t: "p",
        text: "A PDF is not 'text'. It's text, in lines, inside boxes, mixed with images, orders of magnitude more structured than a byte stream suggests. Naive text extraction flattens reading order, splits table cells across chunks, and orphans headers from their bodies.",
      },
      { t: "list", items: ["Recover reading order from layout boxes (x, y, size), not byte order.", "Keep tables as tables — a flattened table is a retrieval failure waiting to happen.", "Route images through OCR only when there's no embedded text layer."] },
      {
        t: "h2",
        text: "Chunking beats embeddings (often)",
      },
      {
        t: "p",
        text: "The embedding model decides what 'similar' means; the chunk decides what gets embedded. Layout-aware, semantically-contained chunks outperform fixed token windows on almost every retrieval metric I've measured. Anchors — keep headings attached to the section they describe.",
      },
      {
        t: "h2",
        text: "Retrieval is the bottleneck",
      },
      {
        t: "p",
        text: "Hybrid retrieval (dense vectors + keyword) is the safe default for documents, because legal, technical, and financial text is full of exact tokens that embeddings blur. Reranking retrieved candidates before the LLM gets them is cheap insurance.",
      },
      {
        t: "callout",
        text: "Benchmark retrieval in isolation before blaming the LLM. If top-5 retrieval is bad, no prompt will fix the answer. Measure hit-rate@k, then and only then tune generation.",
      },
      {
        t: "p",
        text: "The system I built routes PDF / DOCX / web through a processor, indexes chunks into a vector store (Cassandra / Astra DB), and answers with retrieved context — the architecture is deliberately boring. The interesting work is all in extraction, chunking, and eval.",
      },
    ],
  },
  {
    slug: "asr-low-resource",
    title: "Fine-tuning ASR models with limited GPU resources",
    domain: "SPEECH / ASR",
    mins: "11 min read",
    date: "Sept 2026",
    excerpt:
      "What it actually takes to adapt a multilingual speech model to a low-resource language on one T4 — data prep, PEFT, and honest evaluation.",
    blocks: [
      {
        t: "p",
        text: "Adapting a large multilingual speech checkpoint to a language it barely saw — with ~23 hours of audio and a single Tesla T4 — forces discipline at every stage. There's no room for waste: the budget is a few GPU-hours.",
      },
      {
        t: "h2",
        text: "Data rules everything",
      },
      { t: "list", items: ["Transcript alignment: verify text actually matches the audio (silence trimming, timestamp sanity).", "Train/val contamination: deduplicate speakers/sentences across splits — contamination inflates CER that appears to be real.", "Consistency: normalise diacritics, digit forms, and casing before computing CER, both in labels and predictions."] },
      {
        t: "h2",
        text: "PEFT is the compute strategy",
      },
      {
        t: "p",
        text: "Full fine-tuning of a billion-scale model on one T4 is out of reach for most tasks. LoRA adapters freeze the base and train a low-rank delta — for my run, 0.005% of parameters. Because the base stays frozen, the same checkpoint serves many tasks simultaneously with tiny per-task adapters.",
      },
      { t: "code", text: "trainable params  : ~0.005% of full model\ngradient devices   : 1 × Tesla T4\ntraining time      : ≈ 1 hour" },
      {
        t: "h2",
        text: "Evaluating honestly",
      },
      {
        t: "p",
        text: "Report the metric that matches the task (CER for transcription), on a held-out split the model never saw during tuning. I ended at CER 0.0517 — good for the setup, but the number is only meaningful because the evaluation set was clean.",
      },
      {
        t: "callout",
        text: "The headline isn't the CER. It's that a language with almost no resources and a single cheap GPU is enough to build a usable recogniser when you start from a strong self-supervised base and scale the adapter, not the model.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// GitHub / open source — no fabricated stats. Add repos as you publish them.
// ---------------------------------------------------------------------------

export type Repo = {
  name: string;
  description: string;
  topics: string[];
  href: string; // TODO: replace with real repo URL
  stars?: number; // only set if real — never fabricate
};

export const repos: Repo[] = [
  {
    name: "uyghur-asr",
    description:
      "Low-resource Uyghur speech recognition — LoRA fine-tuning of XLS-R/MMS on ~23h, ~1h on a single T4.",
    topics: ["speech", "peft", "asr", "pytorch"],
    href: "#",
  },
  {
    name: "document-intelligence",
    description:
      "Layout-aware PDF/DOCX processing, chunking, vector retrieval, and grounded QA over documents.",
    topics: ["llm", "rag", "langchain", "vector-db"],
    href: "#",
  },
  {
    name: "legal-doc-ai",
    description:
      "OCR + layout understanding + summarization pipelines for Hindi legal documents.",
    topics: ["ocr", "nlp", "tesseract"],
    href: "#",
  },
  {
    name: "image-super-resolution",
    description:
      "Denoising and 4× super-resolution experiments with deep vision backbones and PSNR evaluation.",
    topics: ["vision", "swinir", "super-resolution"],
    href: "#",
  },
  {
    name: "inventory-analytics",
    description:
      "Demand forecasting and SKU analytics for retail inventory decisions — ARIMA, Prophet, SQL.",
    topics: ["forecasting", "data-science", "pandas"],
    href: "#",
  },
];

export function getNote(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}