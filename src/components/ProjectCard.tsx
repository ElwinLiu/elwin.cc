"use client";

import Image from "next/image";
import { projects } from "@/lib/projects";

export default function ProjectCard() {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <a
          key={project.name}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block w-full overflow-hidden rounded-2xl border border-overlay bg-gradient-to-br from-overlay-subtle to-transparent p-8 backdrop-blur-sm transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_60px_-12px_rgba(239,111,47,0.25)]"
        >
          {/* Top row: logo + info */}
          <div className="flex items-start gap-6">
            <div className="relative shrink-0">
              <div className="absolute -inset-2 rounded-2xl bg-accent/10 blur-xl transition-all duration-500 group-hover:bg-accent/20 group-hover:blur-2xl" />
              <Image
                src={project.logo}
                alt={project.name}
                width={72}
                height={72}
                className="relative rounded-[18px]"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="mb-1 text-lg font-medium text-foreground transition-colors group-hover:text-accent">
                {project.name}
              </h3>

              <p className="mb-4 text-sm leading-relaxed text-muted">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-overlay bg-overlay-subtle px-2.5 py-1 font-mono text-[11px] text-muted/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* URL footer */}
          <div className="mt-6 flex items-center justify-between">
            <span className="font-mono text-xs text-accent/50 transition-colors group-hover:text-accent">
              {project.url.replace("https://", "")}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 text-muted/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent/60"
            >
              <path
                fillRule="evenodd"
                d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Hover glow overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </a>
      ))}
    </div>
  );
}
