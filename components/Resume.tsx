"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Eye, FileText, X } from "lucide-react";
import { useState } from "react";
import { links, site } from "@/data/site";
import { education, experience } from "@/data/content";
import { projects } from "@/data/projects";
import { Reveal } from "./ui";

function ResumeModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Resume"
    >
      <motion.div
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-line bg-panel shadow-2xl sm:rounded-2xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line-soft bg-panel/95 px-6 py-4 backdrop-blur">
          <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted">
            <FileText className="h-4 w-4 text-accent" /> resume.txt
          </span>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-line text-muted transition-colors hover:text-fg"
            aria-label="Close resume"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-8 sm:px-8">
          <header>
            <h2 className="font-display text-2xl font-semibold text-fg">
              {site.name}
            </h2>
            <p className="mt-1 text-[13.5px] text-accent">{site.role}</p>
          </header>

          <section className="mt-8">
            <h3 className="mono-label mb-3">experience</h3>
            <div className="space-y-5">
              {experience.map((e) => (
                <div key={e.role + e.org}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-[14px] font-medium text-fg">
                      {e.role} — {e.org}
                    </span>
                    <span className="font-mono text-[10.5px] text-faint">
                      {e.period}
                    </span>
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] leading-relaxed text-muted">
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h3 className="mono-label mb-3">selected projects</h3>
            <div className="space-y-2.5">
              {projects.map((p) => (
                <div key={p.id} className="flex flex-wrap items-baseline justify-between gap-2 text-[13.5px]">
                  <span className="text-fg/90">{p.title}</span>
                  <span className="font-mono text-[10px] text-faint">
                    {p.category}
                    {p.metric?.[0] && !p.metric[0].value.includes("[ADD")
                      ? ` · ${p.metric[0].value}`
                      : ""}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h3 className="mono-label mb-3">education</h3>
            <p className="text-[14px] text-fg">
              {education.institution} — {education.degree}
            </p>
            <p className="mt-1 font-mono text-[11px] text-faint">
              {education.program} · {education.status}
            </p>
          </section>

          <div className="mt-8 flex flex-wrap gap-2.5 border-t border-line-soft pt-6">
            <a href={links.resume} className="btn btn-primary">
              <Download className="h-4 w-4" /> Download PDF
            </a>
            <button onClick={onClose} className="btn btn-ghost">
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Resume() {
  const [open, setOpen] = useState(false);

  return (
    <section id="resume" className="section pt-0!">
      <div className="container-site">
        <div className="card relative overflow-hidden p-8 sm:p-12">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 80% at 85% 20%, rgba(110,155,255,0.06), transparent 60%)",
            }}
          />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <Reveal>
              <div>
                <p className="mono-label">the condensed version</p>
                <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                  Want the condensed version?
                </h2>
                <p className="mt-2.5 max-w-md text-[14.5px] leading-relaxed text-muted">
                  One page, the way recruiters want it — experience, projects,
                  education.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setOpen(true)}
                  className="btn btn-primary"
                >
                  <Eye className="h-4 w-4" /> View Resume
                </button>
                <a href={links.resume} className="btn btn-ghost">
                  <Download className="h-4 w-4" /> Download PDF
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && <ResumeModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}