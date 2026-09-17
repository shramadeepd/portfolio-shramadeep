"use client";

import { engineeringCopy, engineeringSteps, engineeringTools } from "@/data/content";
import { Reveal, SectionHeading, Tag } from "./ui";

export function Engineering() {
  return (
    <section id="engineering" className="section">
      <div className="container-site">
        <SectionHeading
          index="05"
          label="engineering"
          title={<>Beyond the model</>}
          sub="Training a model is a small fraction of making it useful. The rest is the unglamorous lifecycle — data, latency, servers, and monitoring."
        />

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* the lifecycle pipeline */}
          <div>
            <Reveal>
              <div className="card overflow-hidden">
                <div className="flex items-center justify-between border-b border-line-soft bg-ink-2/70 px-4 py-3">
                  <span className="mono-label">ml lifecycle</span>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-faint">
                    PIPELINE
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  {engineeringSteps.map((s, i) => (
                    <div key={s.label}>
                      {i > 0 && (
                        <div className="ml-2 h-5 w-px bg-gradient-to-b from-accent/30 to-transparent" />
                      )}
                      <div className="group flex items-center gap-4 rounded-lg px-2 py-1.5 transition-colors hover:bg-accent/[0.04]">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line font-mono text-[11px] text-accent transition-colors group-hover:border-accent/40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <span className="block text-[14px] font-medium text-fg">
                            {s.label}
                          </span>
                          <span className="block font-mono text-[10.5px] text-faint">
                            {s.detail}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card mt-5 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="mono-label">tools I reach for</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {engineeringTools.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* the conviction */}
          <div className="flex flex-col justify-center space-y-6">
            {engineeringCopy.map((p, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <p className="text-[15.5px] leading-[1.85] text-muted">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.15}>
              <div className="rounded-xl border border-line bg-panel p-5">
                <p className="font-mono text-[10.5px] tracking-[0.18em] text-faint">
                  PRINCIPLES
                </p>
                <ul className="mt-3 space-y-2.5">
                  {[
                    "A model you can't serve is a research artefact.",
                    "Evaluate before you optimise — and after.",
                    "The pipeline is a product; the model is a component.",
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-fg/85"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}