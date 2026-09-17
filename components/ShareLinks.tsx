"use client";

import { Check, Link2, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  const iconBtn =
    "inline-flex h-8 w-8 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-accent/40 hover:text-accent";

  return (
    <div className="flex items-center gap-2">
      <span className="mono-label">share</span>
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        title="Copy link"
        className={iconBtn}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green" />
        ) : (
          <Link2 className="h-3.5 w-3.5" />
        )}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on X"
        title="Share on X"
        className={iconBtn}
      >
        <Twitter className="h-3.5 w-3.5" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
        className={iconBtn}
      >
        <Linkedin className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
