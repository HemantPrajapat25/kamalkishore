"use client";

import React, { useEffect, useRef, useState } from "react";

interface AmbientParticle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
  maxOpacity: number;
  pulseSpeed: number;
  type: "star" | "firefly" | "petal" | "heart";
  rotation: number;
  rotationSpeed: number;
  color: string;
}

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  // Track scroll position to transition backdrop colors naturally
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
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

    // Initialize multi-element particles (Stars, Fireflies, Rose Petals, Hearts)
    const particleCount = Math.min(Math.floor(width / 14), 80);
    const particles: AmbientParticle[] = [];

    const drawPetal = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      size: number,
      color: string
    ) => {
      context.save();
      context.beginPath();
      context.fillStyle = color;
      context.moveTo(cx, cy);
      context.bezierCurveTo(
        cx + size,
        cy - size,
        cx + size * 1.5,
        cy + size,
        cx,
        cy + size * 1.8
      );
      context.bezierCurveTo(
        cx - size * 1.5,
        cy + size,
        cx - size,
        cy - size,
        cx,
        cy
      );
      context.fill();
      context.restore();
    };

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
      context.bezierCurveTo(
        cx,
        cy,
        cx - size / 2,
        cy,
        cx - size / 2,
        cy + topCurveHeight
      );
      context.bezierCurveTo(
        cx - size / 2,
        cy + (size + topCurveHeight) / 2,
        cx,
        cy + (size + topCurveHeight) / 1.4,
        cx,
        cy + size
      );
      context.bezierCurveTo(
        cx,
        cy + (size + topCurveHeight) / 1.4,
        cx + size / 2,
        cy + (size + topCurveHeight) / 2,
        cx + size / 2,
        cy + topCurveHeight
      );
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

    for (let i = 0; i < particleCount; i++) {
      const typeRand = Math.random();
      const type: "star" | "firefly" | "petal" | "heart" =
        typeRand > 0.75
          ? "petal"
          : typeRand > 0.5
          ? "firefly"
          : typeRand > 0.25
          ? "heart"
          : "star";

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size:
          type === "petal"
            ? 7 + Math.random() * 8
            : type === "heart"
            ? 8 + Math.random() * 10
            : type === "firefly"
            ? 3 + Math.random() * 4
            : 1.5 + Math.random() * 2.5,
        vx: type === "petal" ? (Math.random() - 0.5) * 0.8 : (Math.random() - 0.5) * 0.4,
        vy: type === "petal" ? 0.4 + Math.random() * 0.8 : -0.2 - Math.random() * 0.5,
        opacity: Math.random() * 0.6,
        maxOpacity: 0.4 + Math.random() * 0.5,
        pulseSpeed: 0.008 + Math.random() * 0.02,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color:
          type === "petal"
            ? `hsla(345, 90%, 65%, ${0.5 + Math.random() * 0.4})`
            : type === "heart"
            ? `hsla(330, 85%, 70%, ${0.5 + Math.random() * 0.4})`
            : type === "firefly"
            ? `hsla(45, 100%, 75%, ${0.6 + Math.random() * 0.4})`
            : "#ffffff",
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Ambient Gradient based on Scroll Progress
      // 0.0 = Dark Night Sky
      // 0.3 = Pink Sunrise
      // 0.6 = Golden Sunset
      // 1.0 = Dreamy Glowing Night
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (scrollProgress < 0.25) {
        // Dark Night Sky with soft purple halo
        bgGrad.addColorStop(0, "#090314");
        bgGrad.addColorStop(0.5, "#150628");
        bgGrad.addColorStop(1, "#0A0317");
      } else if (scrollProgress < 0.55) {
        // Pink Sunrise
        bgGrad.addColorStop(0, "#1F0A33");
        bgGrad.addColorStop(0.5, "#3A1048");
        bgGrad.addColorStop(1, "#280A30");
      } else if (scrollProgress < 0.8) {
        // Golden Sunset
        bgGrad.addColorStop(0, "#280B30");
        bgGrad.addColorStop(0.5, "#421245");
        bgGrad.addColorStop(1, "#1E0824");
      } else {
        // Dreamy Glowing Night
        bgGrad.addColorStop(0, "#0E041A");
        bgGrad.addColorStop(0.5, "#250A38");
        bgGrad.addColorStop(1, "#0C0318");
      }

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Mouse Glow Effect
      if (mouseRef.current.active) {
        const mouseGlow = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          160
        );
        mouseGlow.addColorStop(0, "rgba(244, 114, 182, 0.16)");
        mouseGlow.addColorStop(0.5, "rgba(217, 70, 239, 0.06)");
        mouseGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 160, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw & Update Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity += p.pulseSpeed;

        if (p.opacity > p.maxOpacity || p.opacity < 0.1) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        // Out of bounds reset
        if (p.y > height + 20) p.y = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));

        if (p.type === "petal") {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          drawPetal(ctx, 0, 0, p.size, p.color);
        } else if (p.type === "heart") {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          drawHeart(ctx, 0, 0, p.size, p.color);
        } else if (p.type === "firefly") {
          ctx.fillStyle = p.color;
          ctx.shadowColor = "#fde047";
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Star
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animId);
    };
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-colors duration-1000"
    />
  );
}
