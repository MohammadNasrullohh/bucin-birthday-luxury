import React, { useEffect, useRef } from 'react';

export default function CinematicParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates for gentle particle attraction
    const mouse = { x: width / 2, y: height / 2, active: false };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 1. Ambient Golden & Ruby Embers (45)
    const embers = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -Math.random() * 0.45 - 0.15,
      alpha: Math.random() * 0.6 + 0.2,
      baseAlpha: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      angle: Math.random() * Math.PI * 2,
    }));

    // 2. Floating Gentle Rose Petals (16)
    const petals = Array.from({ length: 16 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: Math.random() * 0.5 + 0.25, // gently drift downward
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      flip: Math.random() * Math.PI,
      flipSpeed: Math.random() * 0.02 + 0.01,
      swayAngle: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.01,
      alpha: Math.random() * 0.4 + 0.25,
    }));

    // 3. Drifting Soft Hearts (10)
    const hearts = Array.from({ length: 10 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 7 + 5,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: -Math.random() * 0.4 - 0.2, // float upward
      alpha: Math.random() * 0.35 + 0.15,
      scaleAngle: Math.random() * Math.PI * 2,
    }));

    // Draw a single romantic petal with 3D flip effect
    const drawPetal = (x, y, size, rotation, flip, alpha) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(Math.cos(flip), 1);
      
      const grad = ctx.createLinearGradient(0, -size, 0, size);
      grad.addColorStop(0, `rgba(254, 205, 211, ${alpha * 0.9})`);
      grad.addColorStop(0.5, `rgba(244, 63, 94, ${alpha})`);
      grad.addColorStop(1, `rgba(190, 18, 60, ${alpha * 0.8})`);
      
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.7, -size * 0.4, size * 0.7, size * 0.6, 0, size);
      ctx.bezierCurveTo(-size * 0.7, size * 0.6, -size * 0.7, -size * 0.4, 0, -size);
      ctx.fill();
      ctx.restore();
    };

    // Draw a single soft floating heart
    const drawHeart = (x, y, size, alpha) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = `rgba(251, 113, 133, ${alpha})`;
      ctx.beginPath();
      const topCurve = size * 0.3;
      ctx.moveTo(0, topCurve);
      ctx.bezierCurveTo(0, 0, -size * 0.5, 0, -size * 0.5, topCurve);
      ctx.bezierCurveTo(-size * 0.5, (size + topCurve) * 0.5, 0, (size + topCurve) * 0.5, 0, size);
      ctx.bezierCurveTo(0, (size + topCurve) * 0.5, size * 0.5, (size + topCurve) * 0.5, size * 0.5, topCurve);
      ctx.bezierCurveTo(size * 0.5, 0, 0, 0, 0, topCurve);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Render Embers
      embers.forEach((p) => {
        p.angle += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.angle) * 0.2;
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            p.x -= (dx / dist) * 0.5;
            p.y -= (dy / dist) * 0.5;
          }
        }

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5);
        gradient.addColorStop(0, `rgba(244, 63, 94, ${Math.max(0, p.alpha)})`);
        gradient.addColorStop(0.5, `rgba(251, 113, 133, ${Math.max(0, p.alpha * 0.5)})`);
        gradient.addColorStop(1, 'rgba(244, 63, 94, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 230, 236, ${Math.max(0, p.alpha * 0.95)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Render Petals
      petals.forEach((pt) => {
        pt.rotation += pt.rotationSpeed;
        pt.flip += pt.flipSpeed;
        pt.swayAngle += pt.swaySpeed;
        pt.x += pt.speedX + Math.sin(pt.swayAngle) * 0.6;
        pt.y += pt.speedY;

        if (pt.y > height + 20) {
          pt.y = -20;
          pt.x = Math.random() * width;
        }
        if (pt.x < -20) pt.x = width + 20;
        if (pt.x > width + 20) pt.x = -20;

        drawPetal(pt.x, pt.y, pt.size, pt.rotation, pt.flip, pt.alpha);
      });

      // 3. Render Hearts
      hearts.forEach((h) => {
        h.scaleAngle += 0.03;
        h.x += h.speedX;
        h.y += h.speedY;

        if (h.y < -20) {
          h.y = height + 20;
          h.x = Math.random() * width;
        }
        if (h.x < -20) h.x = width + 20;
        if (h.x > width + 20) h.x = -20;

        const currentScale = 1 + Math.sin(h.scaleAngle) * 0.15;
        drawHeart(h.x, h.y, h.size * currentScale, h.alpha);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-15"
      style={{ opacity: 0.85 }}
    />
  );
}
