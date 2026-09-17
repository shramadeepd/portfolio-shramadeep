"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Floating back-to-blog control shown once the reader scrolls into the article.
 */
export function BackToBlog() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-5 left-5 z-40 md:bottom-7 md:left-7"
        >
          <Link
            href="/blogs"
            aria-label="Back to all articles"
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-panel/90 px-4 py-2.5 font-mono text-[12px] tracking-wide text-muted shadow-lg backdrop-blur-md transition-colors hover:border-accent/40 hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">All articles</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
