"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { howIThink } from "@/data/content";
import { Reveal, SectionHeading } from "./ui";

export function HowIThink() {
  const [active, setActive] = useState(0);
  const stage = howIThink[active];

  return (
    <section className="section">
      <div className="container-site">
        <SectionHeading
          index="02"
          label="how i think"
          title={<>I don&apos;t just use models. I try to understand them.</>}
          sub="Each stage conditions the next. I go down this chain on purpose — when a model misbehaves, I go back up it to figure out which layer lied."
        />

        {/* the rail */}
        <Reveal>
          <div
            className="relative -mx-6 overflow-x-auto px-6 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="How I think — stages"
          >
            <div className="flex min-w-max items-stretch gap-2 md:gap-3">
              {howIThink.map((st, i) => {
                const activeNow = i === active;
                return (
                  <div key={st.index} className="flex items-center">
                    <button
                      role="tab"
                      aria-selected={activeNow}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className={`group w-[112px] shrink-0 rounded-xl border px-3 py-4 text-left transition-all duration-300 md:w-[120px] ${
                        activeNow
                          ? "border-accent/50 bg-accent/[0.08]"
                          : "border-line bg-panel hover:border-line hover:bg-panel-2"
                      }`}
                    >
                      <div
                        className={`font-mono text-[10px] tracking-[0.16em] ${
                          activeNow ? "text-accent" : "text-faint"
                        }`}
                      >
                        {st.index}
                      </div>
                      <div className="mt-2 font-display text-[14px] font-medium leading-tight text-fg">
                        {st.title}
                      </div>
                    </button>
                    {i < howIThink.length - 1 ? (
                      <span
                        className={`mx-1 hidden text-faint md:inline ${
                          activeNow ? "text-accent/60" : ""
                        }`}
                      >
                        →
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* the expanded panel */}
        <Reveal delay={0.08}>
          <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="card p-6 md:p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <p className="font-mono text-[10.5px] tracking-[0.18em] text-accent">
                    STAGE {stage.index} / 07
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-fg">
                    {stage.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
                    {stage.note}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="card p-6 md:p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.index + "-items"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-2"
                >
                  {stage.items.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i + 0.1 }}
                      className="flex items-center gap-3 rounded-lg border border-line-soft bg-ink-2/60 px-3.5 py-3"
                    >
                      <span className="font-mono text-[10px] text-faint">
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                      <span className="text-[13.5px] text-fg/90">{item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}