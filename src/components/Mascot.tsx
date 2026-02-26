"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function Mascot({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const [squished, setSquished] = useState(false);
  const [blinking, setBlinking] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const nextId = useRef(0);

  // Eye tracking
  useEffect(() => {
    const svg = svgRef.current;
    const lp = leftPupilRef.current;
    const rp = rightPupilRef.current;
    if (!svg || !lp || !rp) return;

    const EYES = [
      { cx: 38, cy: 50, pupil: lp },
      { cx: 62, cy: 50, pupil: rp },
    ];
    const MAX = 3.5;
    let raf = 0,
      mx = 0,
      my = 0;

    function update() {
      const r = svg!.getBoundingClientRect();
      const sx = 100 / r.width,
        sy = 100 / r.height;
      const px = (mx - r.left) * sx,
        py = (my - r.top) * sy;
      for (const { cx, cy, pupil } of EYES) {
        const dx = px - cx,
          dy = py - cy;
        const d = Math.hypot(dx, dy);
        const c = Math.min(d, MAX) / (d || 1);
        pupil.setAttribute("cx", String(cx + dx * c));
        pupil.setAttribute("cy", String(cy + dy * c));
      }
    }

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Random blinking
  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() < 0.3) {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 150);
      }
    }, 2500);
    return () => clearInterval(id);
  }, []);

  // Click → squish + hearts
  const onClick = useCallback(() => {
    if (squished) return;
    setSquished(true);
    setTimeout(() => setSquished(false), 400);
    const ids = Array.from({ length: 3 }, () => nextId.current++);
    const newHearts = ids.map((id) => ({ id, x: 20 + Math.random() * 60 }));
    setHearts((h) => [...h, ...newHearts]);
    setTimeout(
      () => setHearts((h) => h.filter((v) => !ids.includes(v.id))),
      800,
    );
  }, [squished]);

  return (
    <div
      className={`${className ?? ""} relative`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mascot-float w-full h-full"
        style={{
          cursor: "pointer",
          filter: hovered
            ? "drop-shadow(0 0 8px rgba(239,111,47,0.5))"
            : "drop-shadow(0 0 3px rgba(239,111,47,0.15))",
          scale: squished ? "1.12 0.88" : "1 1",
          transformOrigin: "center 70%",
          transition:
            "scale 0.2s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease",
        }}
      >
        <defs>
          <linearGradient id="m-body" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#ffa860" />
            <stop offset="100%" stopColor="#ef6f2f" />
          </linearGradient>
          <radialGradient id="m-shine" cx="38%" cy="32%" r="50%">
            <stop offset="0%" stopColor="#ffd4a8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="m-blush" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff6b6b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Tail */}
        <path
          d="M76 66 Q90 52 86 38"
          stroke="#ef6f2f"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Ears (behind body) */}
        <path d="M30 36 L24 12 L44 34 Z" fill="url(#m-body)" />
        <path d="M70 36 L76 12 L56 34 Z" fill="url(#m-body)" />

        {/* Body */}
        <ellipse cx="50" cy="58" rx="28" ry="26" fill="url(#m-body)" />
        <ellipse cx="50" cy="58" rx="28" ry="26" fill="url(#m-shine)" />

        {/* Inner ears (after body so visible above edge) */}
        <path d="M32 34 L27 16 L42 33 Z" fill="#ff9090" opacity="0.4" />
        <path d="M68 34 L73 16 L58 33 Z" fill="#ff9090" opacity="0.4" />

        {/* Whiskers */}
        <g stroke="#d4875e" strokeWidth="0.8" opacity="0.35">
          <line x1="20" y1="54" x2="31" y2="56" />
          <line x1="19" y1="58" x2="31" y2="58" />
          <line x1="20" y1="62" x2="31" y2="60" />
          <line x1="69" y1="56" x2="80" y2="54" />
          <line x1="69" y1="58" x2="81" y2="58" />
          <line x1="69" y1="60" x2="80" y2="62" />
        </g>

        {/* Blush */}
        <circle
          cx="28"
          cy="58"
          r="5"
          fill="url(#m-blush)"
          style={{
            opacity: hovered ? 0.9 : 0.2,
            transition: "opacity 0.3s",
          }}
        />
        <circle
          cx="72"
          cy="58"
          r="5"
          fill="url(#m-blush)"
          style={{
            opacity: hovered ? 0.9 : 0.2,
            transition: "opacity 0.3s",
          }}
        />

        {/* Eyes */}
        {blinking ? (
          <>
            <line
              x1="31"
              y1="50"
              x2="45"
              y2="50"
              stroke="#15151f"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="55"
              y1="50"
              x2="69"
              y2="50"
              stroke="#15151f"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            <ellipse cx="38" cy="50" rx="7.5" ry="8" fill="#15151f" />
            <ellipse cx="62" cy="50" rx="7.5" ry="8" fill="#15151f" />
            <circle ref={leftPupilRef} cx="38" cy="50" r="4" fill="#fafafa" />
            <circle ref={rightPupilRef} cx="62" cy="50" r="4" fill="#fafafa" />
            {/* Shine (fixed) */}
            <circle cx="36" cy="47" r="2" fill="#fff" opacity="0.75" />
            <circle cx="60" cy="47" r="2" fill="#fff" opacity="0.75" />
          </>
        )}

        {/* Nose */}
        <path d="M49 57.5 L51 57.5 L50 59.5 Z" fill="#dd5555" opacity="0.8" />

        {/* Mouth */}
        <path
          d="M46 61.5 Q48 64.5 50 61.5 Q52 64.5 54 61.5"
          stroke="#15151f"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Paws */}
        <ellipse cx="37" cy="82" rx="8" ry="4" fill="url(#m-body)" />
        <ellipse cx="63" cy="82" rx="8" ry="4" fill="url(#m-body)" />
        <g fill="#d4875e" opacity="0.35">
          <circle cx="32" cy="81" r="1.5" />
          <circle cx="37" cy="80" r="1.5" />
          <circle cx="42" cy="81" r="1.5" />
          <circle cx="58" cy="81" r="1.5" />
          <circle cx="63" cy="80" r="1.5" />
          <circle cx="68" cy="81" r="1.5" />
        </g>
      </svg>

      {/* Floating hearts on click */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="mascot-heart"
          style={{ left: `${h.x}%` }}
        >
          &#x2665;
        </span>
      ))}
    </div>
  );
}
