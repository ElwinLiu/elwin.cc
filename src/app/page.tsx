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
