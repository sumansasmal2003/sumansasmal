"use client";

import { useEffect, useRef } from "react";

export default function FooterParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    // OPTIMIZATION 1: Visibility flag
    let isVisible = true;

    const mouse = { x: -1000, y: -1000 };

    // --- Interaction Handlers ---
    const updateMousePosition = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
    };

    const handleMouseMove = (e: MouseEvent) => updateMousePosition(e.clientX, e.clientY);

    // OPTIMIZATION 2: Touch handlers
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleMouseLeave = () => { mouse.x = -1000; mouse.y = -1000; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("scroll", handleMouseLeave);
    window.addEventListener("touchend", handleMouseLeave);

    class Particle {
      x: number; y: number; shapeX: number; shapeY: number;
      vx: number; vy: number; size: number; spring: number; color: string;

      constructor(shapeX: number, shapeY: number, cssWidth: number, cssHeight: number) {
        this.shapeX = shapeX; this.shapeY = shapeY;
        this.x = Math.random() * cssWidth;
        this.y = Math.random() * cssHeight;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 1.5 + 1.5;
        this.spring = (Math.random() * 0.04) + 0.02;
        this.color = Math.random() > 0.5 ? "#38bdf8" : "#818cf8";
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
      }

      update(cssWidth: number, cssHeight: number) {
        const dxCenter = mouse.x - cssWidth / 2;
        const dyCenter = mouse.y - cssHeight / 2;
        const distCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);

        const isHoveringSection = distCenter < 1200;

        if (isHoveringSection) {
          this.x += (this.shapeX - this.x) * this.spring;
          this.y += (this.shapeY - this.y) * this.spring;

          const mDx = mouse.x - this.x; const mDy = mouse.y - this.y;
          const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
          if (mDist < 100) {
            this.x -= (mDx / mDist) * 3; this.y -= (mDy / mDist) * 3;
          }
        } else {
          this.x += this.vx; this.y += this.vy;
          if (this.x < 0) this.x = cssWidth; if (this.x > cssWidth) this.x = 0;
          if (this.y < 0) this.y = cssHeight; if (this.y > cssHeight) this.y = 0;
        }
      }
    }

    const init = () => {
      particlesArray = [];
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;

      // OPTIMIZATION 3: Retina Scaling
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      ctx.fillStyle = "white";
      ctx.font = `900 ${Math.min(width * 0.6, 600)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("</>", width / 2, height / 2);

      const shapeCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, width, height);

      // Heavily scale step size for mobile
      const step = width < 768 ? 20 * dpr : 16 * dpr;

      for (let y = 0; y < shapeCoordinates.height; y += step) {
        for (let x = 0; x < shapeCoordinates.width; x += step) {
          if (shapeCoordinates.data[(y * 4 * shapeCoordinates.width) + (x * 4) + 3] > 128) {
            particlesArray.push(new Particle(x / dpr, y / dpr, width, height));
          }
        }
      }
    };

    const animate = () => {
      if (!isVisible) return;

      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;

      ctx.clearRect(0, 0, width, height);
      particlesArray.forEach(p => { p.draw(); p.update(width, height); });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();

    // OPTIMIZATION 1 (Cont.): Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!isVisible) { isVisible = true; animate(); }
        } else {
          isVisible = false; cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        init();
        if (isVisible) animate();
      }, 200);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleMouseLeave);
      window.removeEventListener("touchend", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-[0] opacity-30 mix-blend-screen" />;
}
