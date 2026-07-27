"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  type: "heart" | "sparkle" | "glow";
  hue: number;
  pulseSpeed: number;
  rotation: number;
  rotationSpeed: number;
}

export default function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          active: true,
        };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    // Generate Particles
    const particlesCount = Math.min(Math.floor(width / 18), 70);
    const particles: Particle[] = [];

    const drawHeart = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      size: number,
      color: string
    ) => {
      context.save();
      context.beginPath();
      context.fillStyle = color;
      const topCurveHeight = size * 0.3;
      context.moveTo(cx, cy + topCurveHeight);
      // top left curve
      context.bezierCurveTo(
        cx,
        cy,
        cx - size / 2,
        cy,
        cx - size / 2,
        cy + topCurveHeight
      );
      // bottom left curve
      context.bezierCurveTo(
        cx - size / 2,
        cy + (size + topCurveHeight) / 2,
        cx,
        cy + (size + topCurveHeight) / 1.4,
        cx,
        cy + size
      );
      // bottom right curve
      context.bezierCurveTo(
        cx,
        cy + (size + topCurveHeight) / 1.4,
        cx + size / 2,
        cy + (size + topCurveHeight) / 2,
        cx + size / 2,
        cy + topCurveHeight
      );
      // top right curve
      context.bezierCurveTo(
        cx + size / 2,
        cy,
        cx,
        cy,
        cx,
        cy + topCurveHeight
      );
      context.closePath();
      context.fill();
      context.restore();
    };

    for (let i = 0; i < particlesCount; i++) {
      const typeRandom = Math.random();
      const type: "heart" | "sparkle" | "glow" =
        typeRandom > 0.6 ? "heart" : typeRandom > 0.3 ? "sparkle" : "glow";

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === "heart" ? 8 + Math.random() * 14 : 2 + Math.random() * 6,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -0.2 - Math.random() * 0.6,
        opacity: Math.random() * 0.7,
        maxOpacity: 0.3 + Math.random() * 0.6,
        type,
        hue: 330 + Math.random() * 30, // Pink to Purple/Rose
        pulseSpeed: 0.01 + Math.random() * 0.02,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Soft Radial Gradient Backdrop
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 3,
        50,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, "rgba(255, 182, 193, 0.08)");
      bgGrad.addColorStop(0.5, "rgba(147, 51, 234, 0.04)");
      bgGrad.addColorStop(1, "rgba(15, 5, 29, 0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Mouse Follow Glow
      if (mouseRef.current.active) {
        const mouseGlow = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          180
        );
        mouseGlow.addColorStop(0, "rgba(244, 114, 182, 0.18)");
        mouseGlow.addColorStop(0.5, "rgba(217, 70, 239, 0.08)");
        mouseGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update & Draw Particles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.2;
        p.rotation += p.rotationSpeed;
        p.opacity += p.pulseSpeed;

        if (p.opacity > p.maxOpacity || p.opacity < 0.1) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        // Reset if out of bounds
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));

        if (p.type === "heart") {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          drawHeart(
            ctx,
            0,
            0,
            p.size,
            `hsla(${p.hue}, 85%, 70%, ${p.opacity})`
          );
        } else if (p.type === "sparkle") {
          ctx.fillStyle = `hsla(${p.hue}, 90%, 85%, ${p.opacity})`;
          ctx.shadowColor = `hsla(${p.hue}, 100%, 75%, 0.8)`;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `hsla(${p.hue}, 80%, 75%, ${p.opacity * 0.5})`;
          ctx.shadowColor = `hsla(45, 100%, 70%, 0.5)`;
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
}
