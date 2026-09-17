"use client";

import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { contactCopy, links } from "@/data/site";
import { Reveal } from "./ui";

export function Contact() {
  const items = [
    { label: "Email", hint: "for opportunities & collab", icon: Mail, href: links.email, blank: false },
    { label: "GitHub", hint: "code & experiments", icon: Github, href: links.github, blank: true },
    { label: "LinkedIn", hint: "professional", icon: Linkedin, href: links.linkedin, blank: true },
    { label: "X / Twitter", hint: "notes & threads", icon: Twitter, href: links.twitter, blank: true },
  ];

  return (
    <section id="contact" className="section">
      <div className="container-site">
        <div className="mb-10 flex items-center gap-3">
          <span className="mono-label">let&apos;s connect</span>
          <span className="h-px flex-1 bg-line-soft" />
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-fg md:text-5xl md:leading-[1.05]">
              Let&apos;s build
              <br />
              something <span className="text-gradient">interesting.</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
              {contactCopy}
            </p>
            <p className="mt-4 max-w-md font-mono text-[11.5px] leading-relaxed text-faint">
              I reply to real messages about models, systems, and hard
              problems — usually within a day.
            </p>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((it, i) => (
              <Reveal key={it.label} delay={i * 0.06}>
                <a
                  href={it.href}
                  target={it.blank ? "_blank" : undefined}
                  rel="noreferrer"
                  className="card card-hover group flex items-center justify-between p-5"
                >
                  <span>
                    <span className="flex items-center gap-2 text-[14px] font-medium text-fg">
                      <it.icon className="h-4 w-4 text-accent" />
                      {it.label}
                    </span>
                    <span className="mt-1 block text-[11.5px] text-faint">
                      {it.hint}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}