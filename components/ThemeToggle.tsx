"use client";

import { Moon, Sun } from "lucide-react";

/**
 * Light/dark theme toggle. The active theme lives on
 * `<html data-theme="light|dark">` and is restored before paint by the
 * inline script in app/layout.tsx. Icons are driven purely by CSS
 * (`light:` variant) so there is no hydration mismatch or first-paint flash.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-accent/40 hover:text-fg ${className}`}
    >
      <Sun className="h-4 w-4 light:hidden" />
      <Moon className="hidden h-4 w-4 light:block" />
    </button>
  );
}
