"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { experience } from "@/data/content";
import { Reveal, SectionHeading } from "./ui";

export function Experience() {
  const [open, setOpen] = useState(0);

  return (
    <section id="experience" className="section">
      <div className="container-site">
        <SectionHeading
          index="08"
          label="experience"
          title={<>Where I&apos;ve built things</>}
          sub="A short, honest timeline — not a resume dump. Expand for what I actually did."
        />

        <div className="relative ml-3 border-l border-line pl-8 md:ml-0 md:pl-10">
          {experience.map((e, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={e.role} delay={i * 0.08}>
                <div className="relative pb-10 last:pb-0">
                  <span
                    className={`absolute -left-8 -translate-x-1/2 top-1 h-2.5 w-2.5 rounded-full border md:-left-10 ${
                      isOpen
                        ? "border-accent bg-accent"
                        : "border-line bg-ink"
                    }`}
                  />
                  <button
                    className="group w-full text-left"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono text-[10.5px] tracking-[0.18em] text-faint">
                        {e.period}
                      </span>
                      <span className="rounded border border-line bg-ink-2/70 px-2 py-0.5 font-mono text-[9px] tracking-[0.16em] text-muted">
                        {e.type}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <h3 className="font-display text-[20px] font-semibold text-fg transition-colors group-hover:text-accent">
                        {e.role}
                      </h3>
                      <ChevronRight
                        className={`h-4 w-4 text-faint transition-transform duration-300 ${
                          isOpen ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                    <p className="text-[14px] text-muted">{e.org}</p>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4">
                          <p className="max-w-xl text-[14px] leading-relaxed text-muted">
                            {e.summary}
                          </p>
                          <ul className="mt-4 max-w-xl space-y-2.5">
                            {e.bullets.map((b) => (
                              <li
                                key={b}
                                className="flex items-baseline gap-3 text-[13.5px] leading-relaxed text-fg/80"
                              >
                                <span className="shrink-0 font-mono text-[10px] text-accent/70">
                                  ›
                                </span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}