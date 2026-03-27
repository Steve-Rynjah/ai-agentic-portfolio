"use client";

import { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  hue: number;
  hue2: number;
  speed: number;
  lineWidth: number;
}

export default function MouseGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();

    const ripples: Ripple[] = [];
    let hue = 0;
    let animId: number;

    function spawnRipple(x: number, y: number) {
      hue = (hue + 42) % 360;
      const maxRadius = 70 + Math.random() * 80;
      ripples.push({
        x,
        y,
        radius: 3,
        maxRadius,
        alpha: 1,
        hue,
        hue2: (hue + 60) % 360,
        speed: 2.5 + Math.random() * 2,
        lineWidth: 2 + Math.random() * 1.5,
      });
      // Also spawn a smaller secondary ripple with offset hue
      ripples.push({
        x,
        y,
        radius: 2,
        maxRadius: maxRadius * 0.6,
        alpha: 0.7,
        hue: (hue + 180) % 360,
        hue2: (hue + 240) % 360,
        speed: 3.5 + Math.random() * 2,
        lineWidth: 1.5,
      });
      // Cap at 80 ripples for performance
      while (ripples.length > 80) ripples.shift();
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        const progress = r.radius / r.maxRadius;
        const alpha = r.alpha * (1 - progress * progress);

        if (alpha < 0.015) {
          ripples.splice(i, 1);
          continue;
        }

        // ── Outer soft glow (wide, transparent stroke)
        ctx!.beginPath();
        ctx!.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx!.strokeStyle = `hsla(${r.hue}, 100%, 65%, ${alpha * 0.18})`;
        ctx!.lineWidth = r.radius * 0.7 * (1 - progress * 0.5) + 4;
        ctx!.stroke();

        // ── Main ring (crisp)
        ctx!.beginPath();
        ctx!.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx!.strokeStyle = `hsla(${r.hue}, 100%, 70%, ${alpha * 0.9})`;
        ctx!.lineWidth = r.lineWidth * (1 - progress * 0.4);
        ctx!.stroke();

        // ── Inner highlight (lighter, thinner)
        if (r.radius > 6) {
          ctx!.beginPath();
          ctx!.arc(r.x, r.y, r.radius * 0.82, 0, Math.PI * 2);
          ctx!.strokeStyle = `hsla(${r.hue2}, 80%, 80%, ${alpha * 0.35})`;
          ctx!.lineWidth = 1;
          ctx!.stroke();
        }

        // Advance
        r.radius += r.speed * (1 - progress * 0.4);
        r.alpha *= 0.975;
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    let lastX = -999;
    let lastY = -999;
    const MIN_DIST = 28;

    function onMove(e: MouseEvent) {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist >= MIN_DIST) {
        spawnRipple(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
}
