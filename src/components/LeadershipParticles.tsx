"use client";

import { useEffect, useRef } from "react";

export default function LeadershipParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    let shapeCenterX = 0;
    let shapeCenterY = 0;

    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleMouseLeave);

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
        this.size = Math.random() * 1.5 + 1;
        this.spring = (Math.random() * 0.04) + 0.02;
        this.color = Math.random() > 0.5 ? "#38bdf8" : "#71717a";
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        // Track against the new shape center
        const dxCenter = mouse.x - shapeCenterX;
        const dyCenter = mouse.y - shapeCenterY;
        const distCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);

        const isHoveringSection = distCenter < 500;

        if (isHoveringSection) {
          const dx = this.shapeX - this.x;
          const dy = this.shapeY - this.y;
          this.x += dx * this.spring;
          this.y += dy * this.spring;

          const mDx = mouse.x - this.x;
          const mDy = mouse.y - this.y;
          const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
          if (mDist < 80) {
            this.x -= (mDx / mDist) * 2;
            this.y -= (mDy / mDist) * 2;
          }
        } else {
          this.x += this.vx;
          this.y += this.vy;

          if (this.x < 0) this.x = canvas!.width;
          if (this.x > canvas!.width) this.x = 0;
          if (this.y < 0) this.y = canvas!.height;
          if (this.y > canvas!.height) this.y = 0;
        }
      }
    }

    const init = () => {
      particlesArray = [];
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

      // Align with the right column on desktop
      const isDesktop = canvas.width >= 1024;
      shapeCenterX = isDesktop ? canvas.width * 0.75 : canvas.width / 2;

      // Shift slightly down to perfectly align with the card visually
      shapeCenterY = (canvas.height / 2) + (isDesktop ? 20 : 0);

      ctx.strokeStyle = "white";
      ctx.lineWidth = window.innerWidth < 768 ? 20 : 40;
      ctx.beginPath();

      const size = Math.min(canvas.width, canvas.height) * 0.35;

      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const px = shapeCenterX + size * Math.cos(angle);
        const py = shapeCenterY + size * Math.sin(angle);

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      const shapeCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const step = window.innerWidth < 768 ? 8 : 12;

      for (let y = 0; y < shapeCoordinates.height; y += step) {
        for (let x = 0; x < shapeCoordinates.width; x += step) {
          if (shapeCoordinates.data[(y * 4 * shapeCoordinates.width) + (x * 4) + 3] > 128) {
            particlesArray.push(new Particle(x, y));
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
        particlesArray[i].update();
      }
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
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-[0] opacity-60"
    />
  );
}
