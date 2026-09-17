"use client";

import { ArrowUpRight, Github, Star } from "lucide-react";
import { repoLinkPlaceholder } from "@/data/site";
import { repos } from "@/data/repos";
import { Reveal, SectionHeading, TechPills } from "./ui";

export function OpenSource() {
  return (
    <section id="github" className="section">
      <div className="container-site">
        <SectionHeading
          index="12"
          label="open source"
          title={<>Open source & code</>}
          sub="Repositories mirror the projects on this page. Published code, honest descriptions — stars and dates only appear when they're real."
          action={
            <a
              href={repoLinkPlaceholder}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[12px] tracking-wide text-accent hover:text-fg"
            >
              <Github className="h-4 w-4" /> github/stream
            </a>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {repos.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 0.06} className="h-full">
              <a
                href={r.href}
                target={r.href === "#" ? undefined : "_blank"}
                rel="noreferrer"
                className="card card-hover group flex h-full flex-col p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-mono text-[13px] text-fg">
                    <Github className="h-3.5 w-3.5 text-accent" />
                    {r.name}
                  </span>
                  {r.stars !== undefined ? (
                    <span className="flex items-center gap-1 font-mono text-[11px] text-faint">
                      <Star className="h-3 w-3" /> {r.stars}
                    </span>
                  ) : null}
                </div>

                <p className="mt-3 text-[13px] leading-relaxed text-faint">
                  {r.description}
                </p>

                <div className="mt-4">
                  <TechPills items={r.topics} />
                </div>

                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-mono text-[11px] tracking-wide text-muted transition-colors group-hover:text-accent">
                  View repository
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}