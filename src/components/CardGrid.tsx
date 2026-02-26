"use client";

import { commands } from "@/lib/commands";
import Phantom from "./Phantom";

const linkCommands = commands.filter((c) => c.url);

export default function CardGrid() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Phantom className="h-16 w-16 shrink-0" />
          <div>
            <h1 className="text-xl font-medium text-term-fg">Elwin Liu</h1>
            <p className="text-sm text-term-muted">
              Developer &amp; creator. Swipe back for the terminal.
            </p>
          </div>
        </div>

        {/* Card grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {linkCommands.map((cmd) => (
            <a
              key={cmd.name}
              href={cmd.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 transition-all duration-300 hover:border-term-accent/30 hover:shadow-[0_0_30px_-8px_rgba(239,111,47,0.2)]"
            >
              <div className="mb-2 text-sm font-medium text-term-fg group-hover:text-term-accent transition-colors">
                {cmd.label ?? cmd.name}
              </div>
              <div className="text-xs text-term-muted leading-relaxed">
                {cmd.description}
              </div>

              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-term-accent/[0.04] to-transparent" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
