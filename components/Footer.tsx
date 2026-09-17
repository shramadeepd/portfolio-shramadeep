import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line-soft">
      <div className="container-site py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div>
            <p className="font-display text-3xl font-semibold tracking-tight text-fg">
              {site.name}
            </p>
            <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-muted">
              Machine Learning · AI · Research
            </p>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-faint">
              {site.positioning}
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="mono-label mb-3">sitemap</p>
              <ul className="space-y-2 font-mono text-[12px] text-muted">
                {[
                  ["Work", "#work"],
                  ["Research", "#experiments"],
                  ["Experience", "#experience"],
                  ["Notes", "#notes"],
                  ["About", "#about"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <a href={href} className="link-line hover:text-fg">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mono-label mb-3">sections</p>
              <ul className="space-y-2 font-mono text-[12px] text-muted">
                {[
                  ["Stack", "#stack"],
                  ["Map", "#map"],
                  ["Experiments", "#experiments"],
                  ["Resume", "#resume"],
                  ["Contact", "#contact"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <a href={href} className="link-line hover:text-fg">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-2.5 md:flex-col md:items-end">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-2/60 px-3 py-1.5">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-green" />
              <span className="font-mono text-[10px] tracking-[0.18em] text-muted">
                SYSTEM ONLINE
              </span>
            </span>
            <span className="mt-1 font-mono text-[10px] text-faint">
              built with React / Next.js
            </span>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-6 font-mono text-[11px] text-faint">
          <span>© 2026 {site.name}</span>
          <span className="hidden sm:inline">{"// learning · experimenting · building · measuring · shipping"}</span>
          <span>
            <a href="#top" className="link-line text-muted hover:text-fg">
              back to top ↑
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}