"use client";

import { useEffect, useRef } from "react";

export default function SweetAIParticles() {
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

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseEnter = () => (isHovering = true);
    const onMouseLeave = () => {
      isHovering = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    parent.addEventListener("mousemove", onMouseMove);
    parent.addEventListener("mouseenter", onMouseEnter);
    parent.addEventListener("mouseleave", onMouseLeave);

    class Particle {
      x: number;
      y: number;
      shapeX: number;
      shapeY: number;
      vx: number;
      vy: number;
      size: number;
      spring: number;
      color: string;

      constructor(shapeX: number, shapeY: number) {
        this.shapeX = shapeX;
        this.shapeY = shapeY;
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.size = Math.random() * 1.5 + 0.5;
        this.spring = (Math.random() * 0.05) + 0.03;
        // Vibrant AI colors: fuchsia / purple
        this.color = Math.random() > 0.5 ? "#d946ef" : "#8b5cf6";
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        if (isHovering) {
          // Assemble to shape
          this.x += (this.shapeX - this.x) * this.spring;
          this.y += (this.shapeY - this.y) * this.spring;

          // Mouse repulsion inside card
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 40) {
            this.x -= (dx / dist) * 2;
            this.y -= (dy / dist) * 2;
          }
        } else {
          // Drift (wrap around)
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0) this.x = canvas!.width;
          if (this.x > canvas!.width) this.x = 0;
          if (this.y < 0) this.y = canvas!.height;
          if (this.y > canvas!.height) this.y = 0;
        }
      }
    }

    const drawSparkleShape = () => {
      if (!ctx) return;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const size = Math.min(canvas.width, canvas.height) * 0.35;

      // Draw a clean 4-pointed star (sparkle) using bezier curves
      ctx.beginPath();
      const top = { x: cx, y: cy - size };
      const right = { x: cx + size * 0.5, y: cy };
      const bottom = { x: cx, y: cy + size };
      const left = { x: cx - size * 0.5, y: cy };

      // Control points for inward curves
      const cpInner = size * 0.3;
      const cpOuter = size * 0.6;

      ctx.moveTo(top.x, top.y);
      ctx.bezierCurveTo(cx + cpInner, cy - cpOuter, cx + cpOuter, cy - cpInner, right.x, right.y);
      ctx.bezierCurveTo(cx + cpOuter, cy + cpInner, cx + cpInner, cy + cpOuter, bottom.x, bottom.y);
      ctx.bezierCurveTo(cx - cpInner, cy + cpOuter, cx - cpOuter, cy + cpInner, left.x, left.y);
      ctx.bezierCurveTo(cx - cpOuter, cy - cpInner, cx - cpInner, cy - cpOuter, top.x, top.y);
      ctx.closePath();

      // Filled with white (for imageData capture)
      ctx.fillStyle = "white";
      ctx.fill();

      // Also give it a subtle glowing stroke so the particle boundary is generous
      ctx.strokeStyle = "white";
      ctx.lineWidth = 8;
      ctx.stroke();
    };

    const init = () => {
      particlesArray = [];
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSparkleShape();

      const shapeData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Density step: smaller cards get denser particles
      const step = canvas.width < 400 ? 5 : 7;
      for (let y = 0; y < shapeData.height; y += step) {
        for (let x = 0; x < shapeData.width; x += step) {
          if (shapeData.data[(y * 4 * shapeData.width) + (x * 4) + 3] > 64) {
            particlesArray.push(new Particle(x, y));
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((p) => {
        p.draw();
        p.update();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 200);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      parent.removeEventListener("mousemove", onMouseMove);
      parent.removeEventListener("mouseenter", onMouseEnter);
      parent.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-[0] opacity-40 mix-blend-screen"
    />
  );
}
