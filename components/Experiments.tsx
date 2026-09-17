"use client";

import { experiments } from "@/data/projects";
import { Reveal, SectionHeading } from "./ui";

export function Experiments() {
  return (
    <section id="experiments" className="section">
      <div className="container-site">
        <SectionHeading
          index="04"
          label="experiments"
          title={<>Experiments</>}
          sub={
            <>
              A running research notebook — small, self-contained probes with a
              question, a result, and a number when I have one. Not everything
              works; that&apos;s the point.{" "}
              <span className="text-faint">(unverified cells read [ADD …])</span>
            </>
          }
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {experiments.map((e, i) => (
            <Reveal key={e.id} delay={(i % 4) * 0.06} className="h-full">
              <article className="card card-hover group flex h-full flex-col p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
                    {e.id}
                  </span>
                  <span className="rounded border border-line bg-ink-2/70 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.12em] text-faint">
                    {e.tag}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-[16px] font-medium leading-snug text-fg">
                  {e.question}
                </h3>

                <p className="mt-2 text-[12.5px] leading-relaxed text-faint">
                  {e.context}
                </p>

                <dl className="mt-auto space-y-2 border-t border-line-soft pt-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="font-mono text-[9px] tracking-[0.16em] text-faint">
                      RESULT
                    </dt>
                    <dd className="text-right font-mono text-[11.5px] text-fg/90">
                      {e.result}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="font-mono text-[9px] tracking-[0.16em] text-faint">
                      COMPUTE
                    </dt>
                    <dd className="text-right font-mono text-[11.5px] text-muted">
                      {e.compute}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="font-mono text-[9px] tracking-[0.16em] text-faint">
                      OUTCOME
                    </dt>
                    <dd className="text-right font-mono text-[11.5px] text-accent">
                      {e.outcome}
                    </dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-8 font-mono text-[11px] tracking-wide text-faint">
            {"// experiments are logged the way I run them — one question, one controlled variable, one honest number."}
          </p>
        </Reveal>
      </div>
    </section>
  );
}