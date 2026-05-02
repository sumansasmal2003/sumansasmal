"use client";

import { useEffect, useRef } from "react";

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    // Variables to track the center of our shape based on screen size
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
    document.addEventListener("mouseleave", handleMouseLeave);

    class Particle {
      x: number;
      y: number;
      shapeX: number;
      shapeY: number;
      vx: number;
      vy: number;
      size: number;
      spring: number;

      constructor(shapeX: number, shapeY: number) {
        this.shapeX = shapeX;
        this.shapeY = shapeY;
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = 1.5;
        this.spring = (Math.random() * 0.04) + 0.02;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = "#38bdf8";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        // Calculate distance from mouse to the new dynamically placed shape center
        const dxCenter = mouse.x - shapeCenterX;
        const dyCenter = mouse.y - shapeCenterY;
        const distCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);

        // Trigger assembly if hovering near the new shape location
        const isHoveringSection = distCenter < 400;

        if (isHoveringSection) {
          const dx = this.shapeX - this.x;
          const dy = this.shapeY - this.y;
          this.x += dx * this.spring;
          this.y += dy * this.spring;

          const mDx = mouse.x - this.x;
          const mDy = mouse.y - this.y;
          const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
          if (mDist < 60) {
            this.x -= (mDx / mDist) * 3;
            this.y -= (mDy / mDist) * 3;
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

      // Logic to place the shape on the right blank space for desktop (75% width), center for mobile
      const isDesktop = canvas.width >= 1024;
      shapeCenterX = isDesktop ? canvas.width * 0.75 : canvas.width / 2;
      shapeCenterY = canvas.height / 2;

      ctx.fillStyle = "white";
      ctx.font = `800 ${Math.min(canvas.width * 0.5, 600)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Draw the text at the new target coordinates
      ctx.fillText("{ }", shapeCenterX, shapeCenterY);

      const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const step = window.innerWidth < 768 ? 10 : 14;

      for (let y = 0; y < textCoordinates.height; y += step) {
        for (let x = 0; x < textCoordinates.width; x += step) {
          if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
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
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-[0] opacity-70"
    />
  );
}
