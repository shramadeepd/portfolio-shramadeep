"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ExternalLink, Github } from "lucide-react";
import { useState } from "react";
import { projects, type Project, type ProjectKind } from "@/data/projects";
import { Reveal, SectionHeading, TechPills } from "./ui";

/* ------------------------------------------------------------------ */
/* Kind marks — tiny abstract glyphs for each collapsed project        */
/* ------------------------------------------------------------------ */

function Waveform() {
  const heights = [22, 34, 48, 60, 54, 40, 62, 50, 34, 26, 44, 58, 40, 30];
  return (
    <div className="flex h-16 items-center gap-[3px]">
      {heights.map((h, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-accent/70"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

function DocMark() {
  return (
    <div className="space-y-1.5">
      {[70, 90, 60, 82].map((w, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="h-[3px] rounded-full bg-fg/30"
            style={{ width: `${w}%` }}
          />
          {i === 2 && (
            <span className="ml-auto rounded bg-accent/15 px-1.5 py-0.5 font-mono text-[9px] text-accent">
              ?
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function LegalMark() {
  return (
    <div className="flex items-end gap-3">
      <div className="space-y-1.5">
        {[70, 55, 80, 48].map((w, i) => (
          <div
            key={i}
            className="h-[3px] rounded-full bg-fg/30"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>
      <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-line bg-ink-2 font-sans text-2xl text-accent/80">
        अ
      </span>
    </div>
  );
}

function VisionMark() {
  return (
    <div className="grid h-14 w-14 grid-cols-2 gap-[3px]">
      <span className="rounded-[3px] bg-fg/15" />
      <span className="rounded-[3px] bg-accent/50" />
      <span className="rounded-[3px] bg-accent/30" />
      <span className="rounded-[3px] bg-fg/25" />
    </div>
  );
}

function AnalyticsMark() {
  return (
    <svg width="80" height="40" viewBox="0 0 80 40" aria-hidden>
      {[10, 24, 38].map((x) => (
        <line key={x} x1={x} y1="6" x2={x} y2="34" stroke="rgba(255,255,255,0.12)" />
      ))}
      {[
        [8, 30],
        [20, 24],
        [32, 27],
        [44, 18],
        [56, 21],
        [68, 12],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="3" height={40 - y * 1.25} fill="rgba(110,155,255,0.5)" rx="1" />
      ))}
      <polyline
        points="6,28 20,20 34,23 48,14 62,17 76,8"
        fill="none"
        stroke="#3ddc97"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function KindMark({ kind }: { kind: ProjectKind }) {
  switch (kind) {
    case "asr":
      return <Waveform />;
    case "doc":
      return <DocMark />;
    case "legal":
      return <LegalMark />;
    case "vision":
      return <VisionMark />;
    case "analytics":
      return <AnalyticsMark />;
  }
}

/* ------------------------------------------------------------------ */
/* Architecture pipeline (expanded)                                    */
/* ------------------------------------------------------------------ */

function StepArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-0.5 text-faint">
      <ChevronDown className="h-3.5 w-3.5" />
      {label ? (
        <span className="font-mono text-[9px] tracking-[0.14em] text-faint/80">
          {label}
        </span>
      ) : null}
    </div>
  );
}

function Architecture({ kind }: { kind: ProjectKind }) {
  const arch: Record<
    ProjectKind,
    { steps: string[]; edgeLabels?: string[] }
  > = {
    asr: {
      steps: ["Audio (~23h · Uyghur)", "XLS-R / MMS (frozen)", "LoRA adapter", "CTC decode", "Transcription"],
      edgeLabels: ["features", "δW=BA", "alignment", "text"],
    },
    doc: {
      steps: [
        "PDF / DOCX / Web",
        "Document Processor",
        "Text + Tables + Images",
        "Chunking",
        "Embeddings",
        "Vector Database",
        "Retriever",
        "LLM",
        "Answer + Context",
      ],
    },
    legal: {
      steps: [
        "Scanned Document",
        "OCR",
        "Layout Understanding",
        "Text Extraction",
        "Language Processing",
        "Summarization",
      ],
    },
    vision: {
      steps: [
        "Low Quality Image",
        "Restoration Model",
        "4× Super Resolution",
        "Reconstructed Image",
      ],
    },
    analytics: {
      steps: [
        "Sales Data",
        "Demand Forecasting",
        "SKU Analysis",
        "Supplier KPIs",
        "Price Elasticity",
        "Inventory Decisions",
      ],
    },
  };

  const { steps, edgeLabels } = arch[kind];

  return (
    <div className="flex flex-col">
      {steps.map((s, i) => (
        <div key={s}>
          {i > 0 && <StepArrow label={edgeLabels?.[i - 1]} />}
          <div className="flex items-center gap-2 rounded-md border border-line-soft bg-ink-2/70 px-3 py-1.5">
            <span className="font-mono text-[9px] text-faint">
              {(i + 1).toString().padStart(2, "0")}
            </span>
            <span className="font-mono text-[12px] text-fg/85">{s}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Generic sections                                                    */
/* ------------------------------------------------------------------ */

function BlockLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 font-mono text-[10px] tracking-[0.2em] text-accent/80">
      {children}
    </p>
  );
}

function AnalyticsChart() {
  return (
    <svg viewBox="0 0 300 120" className="h-auto w-full" role="img" aria-label="Demo demand data">
      <g stroke="rgba(255,255,255,0.07)">
        {[30, 60, 90].map((y, i) => (
          <line key={i} x1="0" y1={y} x2="300" y2={y} strokeDasharray="3 3" />
        ))}
      </g>
      <path
        d="M0,80 C40,72 55,88 90,78 C125,66 150,52 190,58 C230,64 260,42 300,34"
        fill="none"
        stroke="rgba(110,155,255,0.6)"
        strokeWidth="1.5"
      />
      <path
        d="M0,84 C60,78 120,64 180,62 C230,60 270,40 300,30"
        fill="none"
        stroke="#3ddc97"
        strokeWidth="1.5"
      />
      <text x="8" y="112" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="var(--font-mono)">
        DEMO DATA — demand (blue) vs forecast (green), de-identified
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Project body (expanded state)                                       */
/* ------------------------------------------------------------------ */

function ProjectBody({ project }: { project: Project }) {
  return (
    <div className="grid gap-x-10 gap-y-10 lg:grid-cols-[1.1fr_0.9fr]">
      {/* left column — the story */}
      <div className="space-y-9">
        <div>
          <BlockLabel>THE PROBLEM</BlockLabel>
          <p className="text-[14.5px] leading-[1.8] text-muted">
            {project.problem}
          </p>
        </div>

        <div>
          <BlockLabel>APPROACH</BlockLabel>
          <ul className="space-y-3">
            {project.approach.map((a, i) => (
              <li key={i} className="flex items-baseline gap-3 text-[14px] leading-relaxed text-fg/85">
                <span className="shrink-0 font-mono text-[10px] text-accent/70">
                  → {String(i + 1).padStart(2, "0")}
                </span>
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <BlockLabel>WHAT I LEARNED</BlockLabel>
          <ul className="space-y-3">
            {project.learned.map((l, i) => (
              <li key={i} className="flex items-baseline gap-3 text-[14px] leading-relaxed text-muted">
                <span className="shrink-0 font-mono text-[10px] text-faint">
                  ·{String(i + 1).padStart(2, "0")}
                </span>
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* right column — evidence */}
      <div className="space-y-9">
        {project.specs ? (
          <div>
            <BlockLabel>SPECS</BlockLabel>
            <div className="overflow-hidden rounded-xl border border-line">
              {project.specs.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-center justify-between gap-4 px-4 py-2.5 ${
                    i % 2 === 0 ? "bg-panel" : "bg-panel-2/50"
                  }`}
                >
                  <span className="font-mono text-[11px] tracking-wide text-faint">
                    {s.label}
                  </span>
                  <span className="text-right font-mono text-[12px] text-fg">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div>
          <BlockLabel>MEASURED RESULT</BlockLabel>
          <div className="rounded-xl border border-accent/25 bg-accent/[0.06] p-4">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              {project.metric?.map((m) => (
                <span
                  key={m.label}
                  className={`font-display text-2xl font-semibold tabular-nums ${
                    m.highlight ? "text-accent" : "text-fg"
                  }`}
                >
                  {m.value}
                </span>
              ))}
              {project.metricNote ? (
                <span className="font-mono text-[11px] text-muted">
                  {project.metricNote}
                </span>
              ) : null}
            </div>
            <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
              {project.result}
            </p>
          </div>
        </div>

        <div>
          <BlockLabel>ARCHITECTURE</BlockLabel>
          <div className="rounded-xl border border-line bg-panel p-4">
            <Architecture kind={project.kind} />
          </div>
        </div>

        {project.kind === "analytics" ? (
          <div>
            <BlockLabel>DEMO DATA — TREND & FORECAST</BlockLabel>
            <div className="rounded-xl border border-line bg-panel p-4">
              <AnalyticsChart />
            </div>
          </div>
        ) : null}

        <div>
          <BlockLabel>TECH STACK</BlockLabel>
          <TechPills items={project.tech} />
        </div>

        <div className="flex flex-wrap gap-2.5">
          <a
            href={project.links[0]?.href ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            <Github className="h-4 w-4" /> {project.links[0]?.label ?? "GitHub"}
          </a>
          {project.links.slice(1).map((l) => (
            <a key={l.label} href={l.href} className="btn btn-ghost">
              <ExternalLink className="h-4 w-4" /> {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <Reveal delay={(index % 2) * 0.06}>
      <div
        className={`card overflow-hidden transition-colors duration-300 ${
          open ? "border-accent/40" : "hover:border-accent/25"
        }`}
        id={project.id}
      >
        {/* collapsed row */}
        <button
          className="group block w-full text-left"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.18em] text-faint">
                  {String(index + 1).padStart(2, "0")} — {project.category}
                </span>
                {project.metric?.[0] && valueOnly(project.metric[0].value) ? (
                  <span className="rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10.5px] text-accent">
                    {project.metric[0].label}: {project.metric[0].value}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-fg transition-colors group-hover:text-accent md:text-[28px]">
                {project.title}
              </h3>
              <p className="mt-2.5 max-w-xl text-[14.5px] leading-relaxed text-muted">
                {project.oneLiner}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[12px] tracking-wide text-accent/90">
                {open ? "Close case study" : "View case study"}
                <span
                  className={`inline-block transition-transform duration-300 ${
                    open ? "rotate-180" : "group-hover:translate-y-0.5"
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </span>
              </span>
            </div>
            <div className="hidden min-h-[72px] w-[150px] items-center justify-end md:flex">
              <div className="w-full max-w-[140px] flex justify-end">
                <KindMark kind={project.kind} />
              </div>
            </div>
          </div>
        </button>

        {/* expanded body */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-line-soft bg-ink-2/40 px-6 py-8 sm:px-8">
                <ProjectBody project={project} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

function valueOnly(v: string) {
  return !v.includes("[ADD");
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Projects() {
  return (
    <section id="work" className="section">
      <div className="container-site">
        <SectionHeading
          index="03"
          label="selected work"
          title={<>Selected Work</>}
          sub="Things I've built, trained, broken, optimized, and learned from. Each card expands into a full case study — what the problem was, how I approached it, what happened, and what I'd do differently."
        />

        <div className="space-y-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}