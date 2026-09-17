"use client";

import { Download, Github, ArrowRight } from "lucide-react";
import { availability, links, site } from "@/data/site";
import { NeuralNetwork } from "./NeuralNetwork";
import { Terminal } from "./Terminal";
import { Reveal } from "./ui";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 md:pt-40">
      {/* faint grid above the fold */}
      <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[560px]" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 0%, rgba(110,155,255,0.07), transparent 70%)",
        }}
      />

      <div className="container-site relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* ---------- left: identity ---------- */}
          <div>
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-ink-2/60 py-1.5 pl-2.5 pr-3.5">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-green" />
                <span className="font-mono text-[10.5px] tracking-[0.16em] text-muted">
                  {availability.label}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="font-display text-[44px] font-semibold leading-[1.05] tracking-tight text-fg sm:text-6xl md:text-[68px] md:leading-[1.02]">
                I build machines
                <br />
                that <span className="text-gradient">learn.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-muted">
                Machine Learning Engineer building AI systems across language,
                vision, speech, and data.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-4 max-w-lg border-l-2 border-line pl-4 text-[14.5px] leading-relaxed text-faint">
                “{site.intro}”
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#work" className="btn btn-primary">
                  Explore my work <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={links.github}
                  target={links.github === "#" ? undefined : "_blank"}
                  rel="noreferrer"
                  className="btn btn-ghost"
                >
                  <Github className="h-4 w-4" /> View GitHub
                </a>
                <a href={links.resume} className="btn btn-ghost">
                  <Download className="h-4 w-4" /> Download Resume
                </a>
              </div>
            </Reveal>
          </div>

          {/* ---------- right: computational graph ---------- */}
          <Reveal delay={0.15} className="relative">
            <div className="card relative h-[340px] overflow-hidden sm:h-[420px]">
              <div className="pointer-events-none absolute inset-0 bg-noise" />
              <div className="flex items-center gap-2 border-b border-line-soft bg-ink-2/70 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-faint/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-faint/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-faint/20" />
                <span className="ml-2 font-mono text-[11px] tracking-wider text-muted">
                  computational_graph.py
                </span>
                <span className="ml-auto font-mono text-[10px] tracking-[0.18em] text-faint">
                  LIVE <span className="text-green">●</span>
                </span>
              </div>
              <div className="relative h-[calc(100%-41px)]">
                <NeuralNetwork className="absolute inset-0" />
                <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-faint">
                  <span>INPUT</span>
                  <span className="hidden sm:inline">MOVE THE CURSOR</span>
                  <span>OUTPUT</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------- terminal band ---------- */}
        <div className="mt-16 grid gap-8 md:mt-20 lg:grid-cols-[minmax(0,640px)_1fr]">
          <Reveal delay={0.1}>
            <Terminal />
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex h-full flex-col justify-between gap-8 lg:pl-2">
              <div className="space-y-7">
                {[
                  {
                    k: "ROLE",
                    v: "ML Engineer · Researcher · Data Scientist",
                  },
                  {
                    k: "DOMAINS",
                    v: "NLP · CV · Speech · LLM Systems · Data Science",
                  },
                  { k: "STATUS", v: "Building, measuring & shipping " },
                ].map((f) => (
                  <div key={f.k} className="flex items-baseline gap-4">
                    <span className="w-20 shrink-0 font-mono text-[10.5px] tracking-[0.18em] text-faint">
                      {f.k}
                    </span>
                    <span className="text-[14px] text-fg">{f.v}</span>
                  </div>
                ))}
              </div>
              <p className="max-w-sm text-[13.5px] leading-relaxed text-faint">
                {site.positioning} — every project below is a problem I chose,
                measured, and learned from.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}