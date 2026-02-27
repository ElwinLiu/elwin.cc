"use client";

import { useEffect, useRef, useState } from "react";
import Terminal from "@/components/terminal/Terminal";
import CardGrid from "@/components/CardGrid";

const PANELS = 2;

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const index = Math.round(el.scrollLeft / el.clientWidth);
      setActivePanel(Math.min(index, PANELS - 1));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (index: number) => {
    containerRef.current?.scrollTo({
      left: index * containerRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Horizontal scroll-snap container */}
      <div
        ref={containerRef}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Panel 1: Terminal */}
        <div className="h-full min-w-full snap-start snap-always">
          <Terminal />
        </div>

        {/* Panel 2: Card Grid */}
        <div className="h-full min-w-full snap-start snap-always">
          <CardGrid />
        </div>
      </div>

      {/* Skip arrow for non-developers */}
      <button
        onClick={() => goTo(activePanel === 0 ? 1 : 0)}
        aria-label={activePanel === 0 ? "Skip to simple view" : "Back to terminal"}
        className={`absolute right-5 top-1/2 z-50 -translate-y-1/2 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-mono text-term-muted backdrop-blur-sm transition-all duration-500 hover:border-term-accent/40 hover:bg-white/10 hover:text-term-fg group ${
          activePanel === 0 ? "animate-nudge" : "animate-nudge-left"
        }`}
      >
        <span className="hidden sm:inline">
          {activePanel === 0 ? "not a dev? click me" : "back to hacking"}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 transition-all duration-300 group-hover:text-term-accent ${
            activePanel === 0
              ? "group-hover:translate-x-0.5"
              : "rotate-180 group-hover:-translate-x-0.5"
          }`}
        >
          <path
            fillRule="evenodd"
            d="M3 10a.75.75 0 0 1 .75-.75h10.638l-3.96-4.158a.75.75 0 1 1 1.08-1.04l5.25 5.5a.75.75 0 0 1 0 1.04l-5.25 5.5a.75.75 0 1 1-1.08-1.04l3.96-4.158H3.75A.75.75 0 0 1 3 10Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 z-50 flex -translate-x-1/2 gap-2">
        {Array.from({ length: PANELS }, (_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to panel ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              activePanel === i
                ? "w-6 bg-term-accent"
                : "w-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
