"use client";

import { motion } from "framer-motion";
import { exploring } from "@/data/content";
import { Reveal, SectionHeading } from "./ui";

export function Exploring() {
  return (
    <section className="section">
      <div className="container-site">
        <SectionHeading
          index="10"
          label="currently exploring"
          title={<>Currently exploring</>}
          sub="Areas I'm actively reading, experimenting, and building in — not claims of expertise. Curiosity is a work-in-progress by definition."
        />

        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-line bg-panel">
            {exploring.map((e, i) => (
              <motion.div
                key={e.topic}
                initial={false}
                className={`group relative flex cursor-default items-center justify-between gap-4 p-5 transition-colors hover:bg-panel-2 sm:p-6 ${
                  i < exploring.length - 1 ? "border-b border-line-soft" : ""
                }`}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="absolute inset-y-0 left-0 w-[2px] scale-y-0 bg-gradient-to-b from-accent to-accent-violet transition-transform duration-300 group-hover:scale-y-100" />
                <div className="flex items-center gap-5 sm:gap-8">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[16.5px] font-medium text-fg sm:text-lg">
                      {e.topic}
                    </h3>
                    <p className="mt-0.5 font-mono text-[11px] text-faint">
                      {e.note}
                    </p>
                  </div>
                </div>
                <span className="hidden font-display text-2xl text-accent/40 transition-all duration-300 group-hover:-mt-2 group-hover:text-accent sm:block">
                  +
                </span>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}