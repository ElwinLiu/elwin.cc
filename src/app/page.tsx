"use client";

import { useRef } from "react";
import Terminal from "@/components/terminal/Terminal";
import Phantom from "@/components/Phantom";
import ProjectCard from "@/components/ProjectCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { commands } from "@/lib/commands";

const socialLinks = commands.filter((c) => c.url);

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-screen w-screen overflow-y-auto scroll-smooth snap-y snap-mandatory">
      {/* Theme toggle — fixed top-right */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Terminal — first viewport */}
      <div className="relative h-screen shrink-0 snap-start snap-always bg-term-bg">
        <Terminal />
        {/* Scroll-down arrow — clickable */}
        <button
          onClick={() => aboutRef.current?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Scroll to about section"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-muted/60 transition-colors duration-300 hover:text-accent cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-8 w-8"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* About + Projects */}
      <div ref={aboutRef} className="flex min-h-screen flex-col items-center justify-center gap-20 px-4 py-32 snap-start snap-always">
        {/* Introduction */}
        <div className="max-w-2xl text-center">
          <Phantom className="mx-auto mb-6 h-20 w-20" />
          <h2 className="mb-2 text-2xl font-medium text-foreground">
            Elwin Liu
          </h2>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-muted">
            Developer &amp; creator who builds tools that disappear into your
            workflow. Currently obsessed with making computers listen better.
          </p>

          {/* Social links — driven by commands.ts */}
          <div className="mt-6 flex justify-center gap-3">
            {socialLinks.map((cmd) => (
              <a
                key={cmd.name}
                href={cmd.url}
                target={cmd.url!.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="rounded-full border border-overlay bg-overlay-subtle px-4 py-1.5 font-mono text-xs text-muted transition-all duration-300 hover:border-accent/30 hover:text-accent"
              >
                {cmd.label ?? cmd.name}
              </a>
            ))}
          </div>
        </div>

        {/* Project showcase */}
        <div className="w-full max-w-2xl">
          <h3 className="mb-6 text-center font-mono text-xs uppercase tracking-widest text-muted/40">
            Projects
          </h3>
          <ProjectCard />
        </div>
      </div>
    </div>
  );
}
