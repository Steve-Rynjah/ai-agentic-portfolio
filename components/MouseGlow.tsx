"use client";

import { useEffect, useRef } from "react";

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
  size: number;
  spring: number;
  damping: number;
  offsetX: number;
  offsetY: number;
  breathPhase: number;
}

// Jellyfish body + trailing tentacle blobs
const BLOB_CONFIGS = [
  { hue: 340, size: 300, spring: 0.080, damping: 0.80, offsetX:   0, offsetY:   0, breathPhase: 0.0 }, // Pink body – fast
  { hue: 150, size: 260, spring: 0.055, damping: 0.84, offsetX: -90, offsetY: -70, breathPhase: 1.1 }, // Green
  { hue: 200, size: 280, spring: 0.045, damping: 0.86, offsetX: 100, offsetY: -80, breathPhase: 2.3 }, // Blue
  { hue:  50, size: 210, spring: 0.032, damping: 0.88, offsetX: -75, offsetY:  90, breathPhase: 0.8 }, // Yellow
  { hue: 270, size: 240, spring: 0.022, damping: 0.91, offsetX: 110, offsetY:  60, breathPhase: 1.7 }, // Purple
  { hue:  20, size: 190, spring: 0.015, damping: 0.93, offsetX:   0, offsetY: 120, breathPhase: 3.0 }, // Orange – slowest tentacle
];

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

    // Start mouse at center so blobs are visible immediately
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let animId: number;
    let time = 0;

    // Initialize blobs at their offset positions relative to center
    const blobs: Blob[] = BLOB_CONFIGS.map((cfg) => ({
      ...cfg,
      x: mouseX + cfg.offsetX,
      y: mouseY + cfg.offsetY,
      vx: 0,
      vy: 0,
    }));

    function drawBlob(x: number, y: number, size: number, hue: number) {
      const grad = ctx!.createRadialGradient(x, y, 0, x, y, size);
      grad.addColorStop(0,   `hsla(${hue}, 85%, 78%, 0.80)`);
      grad.addColorStop(0.4, `hsla(${hue}, 80%, 74%, 0.45)`);
      grad.addColorStop(0.75,`hsla(${hue}, 75%, 70%, 0.18)`);
      grad.addColorStop(1,   `hsla(${hue}, 70%, 68%, 0)`);
      ctx!.fillStyle = grad;
      ctx!.beginPath();
      ctx!.arc(x, y, size, 0, Math.PI * 2);
      ctx!.fill();
    }

    function draw() {
      time += 0.016;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      blobs.forEach((blob) => {
        // Gentle organic breathing motion added to target
        const breathX = Math.sin(time * 0.55 + blob.breathPhase) * 14;
        const breathY = Math.cos(time * 0.42 + blob.breathPhase * 0.8) * 11;

        const targetX = mouseX + blob.offsetX + breathX;
        const targetY = mouseY + blob.offsetY + breathY;

        // Spring physics: velocity → position
        blob.vx = blob.vx * blob.damping + (targetX - blob.x) * blob.spring;
        blob.vy = blob.vy * blob.damping + (targetY - blob.y) * blob.spring;
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Slowly shift hue for living-colour effect
        const hue = (blob.hue + Math.sin(time * 0.18 + blob.breathPhase) * 18 + 360) % 360;
        // Subtle size pulsing
        const size = blob.size * (1 + Math.sin(time * 0.38 + blob.breathPhase) * 0.07);

        drawBlob(blob.x, blob.y, size, hue);
      });

      animId = requestAnimationFrame(draw);
    }

    draw();

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
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
      style={{
        zIndex: 5,
        filter: "blur(55px) saturate(1.5)",
        opacity: 0.72,
      }}
    />
  );
}
