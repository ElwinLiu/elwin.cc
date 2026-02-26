"use client";

import { useEffect, useRef } from "react";

// Wireframe fox geometry (200×200 coordinate space)
const BASE_VERTS: [number, number][] = [
  [55, 20], // 0: left ear tip
  [145, 20], // 1: right ear tip
  [72, 52], // 2: left ear base
  [128, 52], // 3: right ear base
  [100, 42], // 4: forehead center
  [58, 82], // 5: left cheek
  [142, 82], // 6: right cheek
  [72, 108], // 7: left jaw
  [128, 108], // 8: right jaw
  [100, 122], // 9: chin
  [100, 92], // 10: nose
];

const EDGES: [number, number][] = [
  [0, 2],
  [0, 4], // left ear
  [1, 3],
  [1, 4], // right ear
  [2, 4],
  [3, 4], // forehead
  [2, 5],
  [3, 6], // face sides upper
  [5, 7],
  [6, 8], // face sides lower
  [7, 9],
  [8, 9], // jaw
  [4, 10], // nose bridge
];

const S = 200;
const CX = S / 2;
const CY = S / 2;

export default function Mascot({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = S * dpr;
    canvas.height = S * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    let t = 0;
    let mx = 0.5,
      my = 0.5;
    let hovered = false;
    let shockwave = 0;

    // Vertex scatter offsets (from clicks)
    const scatter = BASE_VERTS.map(() => ({ dx: 0, dy: 0 }));

    // Particles traveling along edges
    const edgeParticles = Array.from({ length: 25 }, () => ({
      edge: Math.floor(Math.random() * EDGES.length),
      t: Math.random(),
      speed: 0.003 + Math.random() * 0.005,
      size: 0.8 + Math.random() * 1.2,
    }));

    // Outer orbiting particles
    const orbiters = Array.from({ length: 14 }, (_, i) => ({
      angle: (i / 14) * Math.PI * 2,
      radius: 68 + Math.random() * 20,
      speed: 0.002 + Math.random() * 0.004,
      size: 0.5 + Math.random() * 1,
      phase: Math.random() * Math.PI * 2,
    }));

    function getVerts(): [number, number][] {
      const pulse = 1 + Math.sin(t * 0.025) * 0.03;
      const px = (mx - 0.5) * 3;
      const py = (my - 0.5) * 2;
      return BASE_VERTS.map(([bx, by], i) => {
        const dx = (bx - CX) * pulse + scatter[i].dx;
        const dy = (by - CY) * pulse + scatter[i].dy;
        const depth = Math.hypot(dx, dy) / 60;
        return [CX + dx + px * depth, CY + dy + py * depth];
      });
    }

    function draw() {
      t++;
      ctx.clearRect(0, 0, S, S);
      const speed = hovered ? 1.8 : 1;
      const verts = getVerts();

      // Decay scatter
      for (const s of scatter) {
        s.dx *= 0.92;
        s.dy *= 0.92;
      }

      // Background glow
      const glow = ctx.createRadialGradient(CX, CY, 0, CX, CY, 90);
      glow.addColorStop(0, `rgba(239,111,47,${hovered ? 0.1 : 0.04})`);
      glow.addColorStop(0.6, `rgba(239,111,47,${hovered ? 0.04 : 0.01})`);
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, S, S);

      // Shockwave ring
      if (shockwave > 0) {
        const r = (1 - shockwave) * 90;
        ctx.beginPath();
        ctx.arc(CX, CY, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(239,111,47,${shockwave * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        shockwave = Math.max(0, shockwave - 0.015);
      }

      // Orbiting particles
      for (const p of orbiters) {
        p.angle += p.speed * speed;
        const wobble = Math.sin(t * 0.015 + p.phase) * 5;
        const r = p.radius + wobble;
        const x = CX + Math.cos(p.angle) * r;
        const y = CY + Math.sin(p.angle) * r * 0.7;
        const alpha = 0.15 + Math.sin(t * 0.03 + p.angle) * 0.1;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239,111,47,${alpha + (hovered ? 0.15 : 0)})`;
        ctx.fill();
      }

      // Wireframe edges
      ctx.save();
      ctx.shadowColor = "rgba(239,111,47,0.6)";
      ctx.shadowBlur = hovered ? 6 : 3;
      ctx.strokeStyle = `rgba(239,111,47,${hovered ? 0.55 : 0.3})`;
      ctx.lineWidth = 1.2;
      for (const [a, b] of EDGES) {
        const [x1, y1] = verts[a];
        const [x2, y2] = verts[b];
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.restore();

      // Vertices (glowing dots)
      for (const [x, y] of verts) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239,111,47,${hovered ? 0.8 : 0.5})`;
        ctx.fill();
      }

      // Edge particles
      for (const p of edgeParticles) {
        p.t += p.speed * speed;
        if (p.t > 1) {
          p.t = 0;
          p.edge = Math.floor(Math.random() * EDGES.length);
        }
        const [a, b] = EDGES[p.edge];
        const [x1, y1] = verts[a];
        const [x2, y2] = verts[b];
        const x = x1 + (x2 - x1) * p.t;
        const y = y1 + (y2 - y1) * p.t;
        ctx.save();
        ctx.shadowColor = "rgba(239,111,47,0.8)";
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239,111,47,${0.4 + (hovered ? 0.3 : 0)})`;
        ctx.fill();
        ctx.restore();
      }

      // Eyes — piercing diamond slits
      const eyeShiftX = (mx - 0.5) * 8;
      const eyeShiftY = (my - 0.5) * 5;

      for (const ex of [-18, 18]) {
        const eyeX = CX + ex + eyeShiftX;
        const eyeY = 70 + eyeShiftY;

        ctx.save();
        ctx.shadowColor = "rgba(239,111,47,0.9)";
        ctx.shadowBlur = hovered ? 12 : 6;
        ctx.beginPath();
        ctx.moveTo(eyeX - 10, eyeY);
        ctx.lineTo(eyeX, eyeY - 3.5);
        ctx.lineTo(eyeX + 10, eyeY);
        ctx.lineTo(eyeX, eyeY + 3.5);
        ctx.closePath();
        ctx.fillStyle = `rgba(255,160,60,${hovered ? 1 : 0.85})`;
        ctx.fill();

        // Bright pupil center
        ctx.beginPath();
        ctx.arc(eyeX, eyeY, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,240,200,0.9)";
        ctx.fill();
        ctx.restore();
      }

      // Glitch scan line (rare)
      if (Math.random() < 0.015) {
        const gy = 30 + Math.random() * 140;
        ctx.fillStyle = `rgba(239,111,47,${0.03 + Math.random() * 0.08})`;
        ctx.fillRect(20, gy, 160, 1 + Math.random() * 2);
      }

      raf = requestAnimationFrame(draw);
    }

    let raf = requestAnimationFrame(draw);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = (e.clientX - rect.left) / rect.width;
      my = (e.clientY - rect.top) / rect.height;
    };

    const onClick = () => {
      shockwave = 1;
      for (let i = 0; i < BASE_VERTS.length; i++) {
        const [x, y] = BASE_VERTS[i];
        const dx = x - CX,
          dy = y - CY;
        const dist = Math.hypot(dx, dy) || 1;
        scatter[i].dx += (dx / dist) * 12;
        scatter[i].dy += (dy / dist) * 12;
      }
    };

    const onEnter = () => {
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
      mx = 0.5;
      my = 0.5;
    };

    canvas.addEventListener("click", onClick);
    canvas.addEventListener("mouseenter", onEnter);
    canvas.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("mouseenter", onEnter);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className={className}>
      <canvas ref={canvasRef} className="w-full h-full cursor-pointer" />
    </div>
  );
}
