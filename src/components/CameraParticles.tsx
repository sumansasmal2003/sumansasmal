"use client";

import { useEffect, useRef } from "react";

export default function CameraParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;
    let isHovering = false;
    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseenter", () => (isHovering = true));
    parent.addEventListener("mouseleave", () => {
      isHovering = false;
      mouse.x = -1000;
      mouse.y = -1000;
    });

    class Particle {
      x: number; y: number;
      shapeX: number; shapeY: number;
      vx: number; vy: number;
      size: number; spring: number; color: string;

      constructor(shapeX: number, shapeY: number) {
        this.shapeX = shapeX; this.shapeY = shapeY;
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.size = Math.random() * 1.5 + 0.5;
        this.spring = (Math.random() * 0.05) + 0.03;
        // Photography Theme: Silver and Cyan
        this.color = Math.random() > 0.5 ? "#e4e4e7" : "#38bdf8";
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
      }

      update() {
        if (isHovering) {
          this.x += (this.shapeX - this.x) * this.spring;
          this.y += (this.shapeY - this.y) * this.spring;
          const dx = mouse.x - this.x; const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 40) { this.x -= (dx / dist) * 2; this.y -= (dy / dist) * 2; }
        } else {
          this.x += this.vx; this.y += this.vy;
          if (this.x < 0) this.x = canvas!.width; if (this.x > canvas!.width) this.x = 0;
          if (this.y < 0) this.y = canvas!.height; if (this.y > canvas!.height) this.y = 0;
        }
      }
    }

    const init = () => {
      particlesArray = [];
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;

      // Draw a geometric camera using paths
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      ctx.strokeStyle = "white";
      ctx.lineWidth = 12;

      // Camera Body
      ctx.strokeRect(cx - 80, cy - 40, 160, 100);
      // Camera Lens
      ctx.beginPath(); ctx.arc(cx, cy + 10, 30, 0, Math.PI * 2); ctx.stroke();
      // Camera Flash/Top
      ctx.strokeRect(cx - 30, cy - 60, 60, 20);

      const textData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const step = 6;
      for (let y = 0; y < textData.height; y += step) {
        for (let x = 0; x < textData.width; x += step) {
          if (textData.data[(y * 4 * textData.width) + (x * 4) + 3] > 128) {
            particlesArray.push(new Particle(x, y));
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(p => { p.draw(); p.update(); });
      animationFrameId = requestAnimationFrame(animate);
    };

    init(); animate();

    const handleResize = () => { setTimeout(init, 200); };
    window.addEventListener("resize", handleResize);

    return () => {
      parent.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-[0] opacity-40 mix-blend-screen" />;
}
