// ============================================================================
// GitHub / open source — no fabricated stats. Add repos as you publish them.
// ============================================================================

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