"use client";

import { about } from "@/data/site";
import { Reveal, SectionHeading } from "./ui";

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-site">
        <SectionHeading
          index="01"
          label="about"
          title={<>A little about how I work</>}
        />

        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-[15.5px] leading-[1.85] text-muted">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="card overflow-hidden">
              <div className="flex items-center justify-between border-b border-line-soft bg-ink-2/70 px-4 py-3">
                <span className="mono-label">area of focus</span>
                <span className="font-mono text-[10px] tracking-[0.18em] text-faint">
                  NODE MAP
                </span>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  {about.interests.map((it) => (
                    <span
                      key={it.label}
                      className="group inline-flex cursor-default items-center gap-2 rounded-lg border border-line bg-ink-2/60 px-3 py-2 transition-colors hover:border-accent/40 hover:bg-accent/5"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent opacity-60 transition-opacity group-hover:opacity-100" />
                      <span className="text-[13px] text-fg">{it.label}</span>
                      <span className="font-mono text-[9px] tracking-[0.14em] text-faint">
                        {it.tag}
                      </span>
                    </span>
                  ))}
                </div>

                <div className="mt-6 border-t border-line-soft pt-5">
                  <p className="mb-3 font-mono text-[10px] tracking-[0.18em] text-faint">
                    HOW I CHOOSE WORK
                  </p>
                  <ul className="space-y-2.5 text-[13.5px] text-muted">
                    {[
                      "Problems the obvious solution can't solve",
                      "Stories that survive measurement",
                      "Systems that leave the notebook",
                    ].map((t, i) => (
                      <li key={t} className="flex items-baseline gap-3">
                        <span className="font-mono text-[10px] text-accent/70">
                          0{i + 1}
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}