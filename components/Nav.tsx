"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Github, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { links, site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Research", href: "/#experiments" },
  { label: "Experience", href: "/#experience" },
  { label: "Notes", href: "/#notes" },
  { label: "Blog", href: "/blogs" },
  { label: "About", href: "/#about" },
];

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, var(--color-accent), var(--color-accent-violet))",
      }}
    />
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isBlog = pathname === "/blogs" || pathname.startsWith("/blogs/");

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-line-soft bg-ink/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="container-site flex h-16 items-center justify-between"
        >
          <Link
            href="/#top"
            className="flex items-baseline gap-2 font-mono text-[13px] tracking-tight text-fg"
            aria-label="Home"
          >
            <span className="text-accent">~/</span>
            <span>{site.name}</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((l) => {
              const active = l.href === "/blogs" && isBlog;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`link-line text-[13px] transition-colors hover:text-fg ${
                    active ? "text-fg" : "text-muted"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <a
              href={links.github}
              target={links.github === "#" ? undefined : "_blank"}
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-fg"
              title="GitHub"
            >
              <Github className="h-[15px] w-[15px]" />
              <span>GitHub</span>
            </a>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-fg"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-ink md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container-site mb-8 h-16" />
            <div className="container-site flex flex-col gap-1">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-line-soft py-5 font-display text-3xl font-medium text-fg"
                  >
                    <span>{l.label}</span>
                    <span className="font-mono text-xs text-faint">
                      0{i + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href={links.github}
                target={links.github === "#" ? undefined : "_blank"}
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-accent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Github className="h-4 w-4" /> github
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
