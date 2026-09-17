"use client";

import { GraduationCap } from "lucide-react";
import { education } from "@/data/content";
import { Reveal, SectionHeading, Tag } from "./ui";

export function Education() {
  return (
    <section className="section pt-0!">
      <div className="container-site">
        <SectionHeading
          index="09"
          label="education"
          title={<>Theoretical grounding</>}
        />

        <Reveal>
          <div className="card overflow-hidden">
            {/* header */}
            <div className="flex flex-col gap-6 border-b border-line-soft bg-ink-2/40 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-panel">
                  <GraduationCap className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-fg">
                    {education.institution}
                  </h3>
                  <p className="mt-1 text-[14.5px] text-muted">
                    {education.degree} · {education.program}
                  </p>
                </div>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-panel px-3 py-1.5">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-green" />
                <span className="font-mono text-[10.5px] tracking-[0.16em] text-muted">
                  {education.status}
                </span>
              </span>
            </div>

            {/* body */}
            <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-2">
              <div>
                <p className="mono-label mb-3">focus areas</p>
                <div className="flex flex-wrap gap-1.5">
                  {education.focus.map((f) => (
                    <Tag key={f}>{f}</Tag>
                  ))}
                </div>

                <p className="mono-label mt-6 mb-3">why it matters here</p>
                <p className="max-w-md text-[14px] leading-relaxed text-muted">
                  Every model is a statistical claim. The program builds the
                  math under the machine learning — so when a network
                  misbehaves, I can interrogate it at the level of loss
                  surfaces and priors instead of guessing hyperparameters.
                </p>
              </div>

              <div>
                <p className="mono-label mb-3">representative coursework</p>
                <div className="space-y-1.5">
                  {education.coursework.map((c, i) => (
                    <div
                      key={c}
                      className="flex items-center justify-between border-b border-line-soft pb-1.5 pl-1"
                    >
                      <span className="flex items-center gap-2.5 text-[13.5px] text-fg/85">
                        <span className="font-mono text-[9px] text-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {c}
                      </span>
                      <span className="font-mono text-[10px] text-faint">✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}