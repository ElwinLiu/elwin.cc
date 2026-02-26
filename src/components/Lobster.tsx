"use client";

import { useEffect, useRef } from "react";

export default function Lobster({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const leftPupil = leftPupilRef.current;
    const rightPupil = rightPupilRef.current;
    if (!svg || !leftPupil || !rightPupil) return;

    const LEFT_EYE = { cx: 45, cy: 35 };
    const RIGHT_EYE = { cx: 75, cy: 35 };
    const MAX_OFFSET = 2.5;

    let rafId = 0;
    let mouseX = 0;
    let mouseY = 0;

    function updatePupils() {
      const rect = svg!.getBoundingClientRect();
      const scaleX = 120 / rect.width;
      const scaleY = 120 / rect.height;

      const svgMouseX = (mouseX - rect.left) * scaleX;
      const svgMouseY = (mouseY - rect.top) * scaleY;

      for (const { eye, pupil } of [
        { eye: LEFT_EYE, pupil: leftPupil! },
        { eye: RIGHT_EYE, pupil: rightPupil! },
      ]) {
        const dx = svgMouseX - eye.cx;
        const dy = svgMouseY - eye.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const clamp = Math.min(dist, MAX_OFFSET) / (dist || 1);
        pupil.setAttribute("cx", String(eye.cx + dx * clamp));
        pupil.setAttribute("cy", String(eye.cy + dy * clamp));
      }
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updatePupils);
    }

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="lobster-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4d4d" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
      </defs>
      {/* Body */}
      <path
        d="M60 10 C30 10 15 35 15 55 C15 75 30 95 45 100 L45 110 L55 110 L55 100 C55 100 60 102 65 100 L65 110 L75 110 L75 100 C90 95 105 75 105 55 C105 35 90 10 60 10Z"
        fill="url(#lobster-gradient)"
      />
      {/* Left claw */}
      <path
        d="M20 45 C5 40 0 50 5 60 C10 70 20 65 25 55 C28 48 25 45 20 45Z"
        fill="url(#lobster-gradient)"
      />
      {/* Right claw */}
      <path
        d="M100 45 C115 40 120 50 115 60 C110 70 100 65 95 55 C92 48 95 45 100 45Z"
        fill="url(#lobster-gradient)"
      />
      {/* Antennae */}
      <path d="M45 15 Q35 5 30 8" stroke="#ff4d4d" strokeWidth="3" strokeLinecap="round" />
      <path d="M75 15 Q85 5 90 8" stroke="#ff4d4d" strokeWidth="3" strokeLinecap="round" />
      {/* Eye sockets */}
      <circle cx="45" cy="35" r="6" fill="#050810" />
      <circle cx="75" cy="35" r="6" fill="#050810" />
      {/* Pupils (tracked) */}
      <circle ref={leftPupilRef} cx="46" cy="34" r="2.5" fill="#00e5cc" />
      <circle ref={rightPupilRef} cx="76" cy="34" r="2.5" fill="#00e5cc" />
    </svg>
  );
}
