"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Fade/slide a block into view once, on scroll. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-70px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Section header with a mono index + label, optional right-align content.
 */
export function SectionHeading({
  index,
  label,
  title,
  sub,
  action,
}: {
  index: string;
  label: string;
  title: ReactNode;
  sub?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
      <div className="max-w-2xl">
        <Reveal>
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.18em] text-accent/80">
              {index}
            </span>
            <span className="h-px w-8 bg-line" />
            <span className="mono-label">{label}</span>
          </div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-fg md:text-[40px] md:leading-[1.1]">
            {title}
          </h2>
          {sub ? (
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              {sub}
            </p>
          ) : null}
        </Reveal>
      </div>
      {action ? <Reveal delay={0.1}>{action}</Reveal> : null}
    </div>
  );
}

/** Small monospace tag chip. */
export function Tag({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[11px] tracking-wide ${
        accent
          ? "border-accent/40 bg-accent/10 text-accent"
          : "border-line bg-ink-2/60 text-muted"
      }`}
    >
      {children}
    </span>
  );
}

/** Pills for tech stacks. */
export function TechPills({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </div>
  );
}

export function useSectionRef() {
  return useRef<HTMLElement | null>(null);
}