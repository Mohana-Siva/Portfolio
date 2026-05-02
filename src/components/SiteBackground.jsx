import { useEffect, useRef, useState, useCallback } from 'react';

export default function SiteBackground() {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId;
    let mouseX = width / 2;
    let mouseY = height / 2;

    // Star class
    class Star {
      constructor(x, y, radius, baseBrightness, twinkleSpeed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.baseBrightness = baseBrightness;
        this.currentBrightness = baseBrightness;
        this.twinkleSpeed = twinkleSpeed;
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.sparkleIntensity = 0;
        this.velocityX = (Math.random() - 0.5) * 0.05;
        this.velocityY = (Math.random() - 0.5) * 0.03;
        // Random color tint: 80% white, 20% purple/pink
        if (Math.random() < 0.15) {
          this.color = `hsl(${280 + Math.random() * 40}, 70%, 70%)`;
        } else {
          this.color = 'white';
        }
      }

      update(mouseX, mouseY, time) {
        // Move star
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Wrap around screen with padding
        if (this.x < -50) this.x = width + 50;
        if (this.x > width + 50) this.x = -50;
        if (this.y < -50) this.y = height + 50;
        if (this.y > height + 50) this.y = -50;

        // Natural twinkling
        const naturalTwinkle = Math.sin(time * 0.002 * this.twinkleSpeed + this.twinklePhase) * 0.3 + 0.7;

        // Mouse interaction sparkle
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = isMobile ? 120 : 80;

        if (distance < maxDistance) {
          const intensity = (1 - distance / maxDistance) * (isMobile ? 1.2 : 1.5);
          this.sparkleIntensity = Math.min(1, this.sparkleIntensity + intensity * 0.1);
        } else {
          this.sparkleIntensity = Math.max(0, this.sparkleIntensity - (isMobile ? 0.015 : 0.02));
        }

        // Combine natural twinkle with mouse sparkle
        let brightness = naturalTwinkle * this.baseBrightness;
        brightness += this.sparkleIntensity * 0.8;
        brightness = Math.min(1, brightness);

        this.currentBrightness = brightness;

        return distance < maxDistance;
      }

      draw(ctx) {
        // Outer glow
        ctx.shadowBlur = this.radius * 3;
        ctx.shadowColor = `rgba(255, 255, 255, ${this.currentBrightness * 0.5})`;

        // Main star
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        // Star color based on brightness and type
        const intensity = this.currentBrightness;
        if (this.sparkleIntensity > 0.3) {
          ctx.fillStyle = `rgba(255, 200, 255, ${intensity})`;
        } else if (this.color !== 'white') {
          ctx.fillStyle = this.color.replace('hsl', 'hsla').replace(')', `, ${intensity})`);
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${intensity})`;
        }
        ctx.fill();

        // Extra sparkle effect for mouse interaction
        if (this.sparkleIntensity > 0.4) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 133, 209, ${this.sparkleIntensity * 0.5})`;
          ctx.fill();

          // Cross sparkle
          ctx.beginPath();
          ctx.moveTo(this.x - this.radius * 4, this.y);
          ctx.lineTo(this.x + this.radius * 4, this.y);
          ctx.moveTo(this.x, this.y - this.radius * 4);
          ctx.lineTo(this.x, this.y + this.radius * 4);
          ctx.strokeStyle = `rgba(255, 255, 255, ${this.sparkleIntensity * 0.7})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else if (this.sparkleIntensity > 0.2) {
          // Small sparkle glow
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 133, 209, ${this.sparkleIntensity * 0.3})`;
          ctx.fill();
        }
      }
    }

    // Enhanced Shooting Star class
    class ShootingStar {
      constructor() {
        this.active = true;
        this.x = Math.random() * width;
        this.y = Math.random() * height * 0.4;
        // Faster and more varied velocities
        this.velocityX = -12 - Math.random() * 10;
        this.velocityY = 4 + Math.random() * 7;
        this.length = 70 + Math.random() * 50;
        this.opacity = 0.7 + Math.random() * 0.3;
        this.size = 2 + Math.random() * 2.5;
        this.trail = [];
        this.life = 1;
        this.color = Math.random() > 0.7 ? 'purple' : 'white';
      }

      update() {
        if (!this.active) return false;

        // Store trail position
        this.trail.unshift({ x: this.x, y: this.y, opacity: this.opacity });
        if (this.trail.length > 20) this.trail.pop();

        // Move shooting star
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Fade out as it moves
        this.life -= 0.01;
        this.opacity = this.life * 0.9;

        // Deactivate if off screen or faded
        if (this.x < -200 || this.x > width + 200 ||
          this.y < -200 || this.y > height + 200 ||
          this.life <= 0) {
          this.active = false;
          return false;
        }

        return true;
      }

      draw(ctx) {
        if (!this.active) return;

        // Draw trail with gradient effect
        for (let i = 0; i < this.trail.length; i++) {
          const point = this.trail[i];
          const trailOpacity = point.opacity * (1 - i / this.trail.length);
          const trailSize = this.size * (1 - i / this.trail.length * 0.7);

          ctx.beginPath();
          ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
          if (this.color === 'purple') {
            ctx.fillStyle = `rgba(201, 133, 209, ${trailOpacity * 0.6})`;
          } else {
            ctx.fillStyle = `rgba(255, 200, 255, ${trailOpacity * 0.5})`;
          }
          ctx.fill();
        }

        // Draw main shooting star with gradient
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x - this.velocityX, this.y - this.velocityY);
        if (this.color === 'purple') {
          gradient.addColorStop(0, `rgba(201, 133, 209, ${this.opacity})`);
          gradient.addColorStop(1, `rgba(201, 133, 209, 0)`);
        } else {
          gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
          gradient.addColorStop(1, `rgba(255, 200, 255, 0)`);
        }

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        const tailX = this.x - this.velocityX * 0.8;
        const tailY = this.y - this.velocityY * 0.8;
        ctx.lineTo(tailX, tailY);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.size * 1.8;
        ctx.stroke();

        // Bright head
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color === 'purple' ? `rgba(201, 133, 209, ${this.opacity})` : `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 133, 209, ${this.opacity * 0.4})`;
        ctx.fill();
      }
    }

    // Create more stars - increased count
    const stars = [];
    const starCount = isMobile ? 300 : Math.min(1000, Math.floor((width * height) / 6000));

    for (let i = 0; i < starCount; i++) {
      const radius = 0.8 + Math.random() * 3;
      const brightness = 0.2 + Math.random() * 0.8;
      const twinkleSpeed = 0.3 + Math.random() * 3;
      stars.push(new Star(
        Math.random() * width,
        Math.random() * height,
        radius,
        brightness,
        twinkleSpeed
      ));
    }

    // Create shooting stars array
    const shootingStars = [];
    let lastShootingStarTime = 0;
    let shootingStarInterval = isMobile ? 4000 : 2500;

    // Enhanced Nebula clouds
    const nebulae = [
      { x: 0.2, y: 0.3, radius: 300, color: 'rgba(201, 133, 209, 0.04)' },
      { x: 0.7, y: 0.6, radius: 350, color: 'rgba(95, 99, 255, 0.03)' },
      { x: 0.5, y: 0.8, radius: 250, color: 'rgba(201, 133, 209, 0.03)' },
      { x: 0.1, y: 0.7, radius: 200, color: 'rgba(95, 99, 255, 0.04)' },
      { x: 0.9, y: 0.2, radius: 280, color: 'rgba(201, 133, 209, 0.03)' },
      { x: 0.3, y: 0.5, radius: 220, color: 'rgba(201, 133, 209, 0.02)' },
      { x: 0.8, y: 0.4, radius: 260, color: 'rgba(95, 99, 255, 0.02)' },
    ];

    let time = 0;

    // Small floating particles for extra depth
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = 0.5 + Math.random() * 1.5;
        this.alpha = 0.1 + Math.random() * 0.3;
        this.velocityX = (Math.random() - 0.5) * 0.02;
        this.velocityY = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 133, 209, ${this.alpha})`;
        ctx.fill();
      }
    }

    const particles = [];
    const particleCount = isMobile ? 100 : 200;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const drawNebulae = () => {
      for (const nebula of nebulae) {
        const gradient = ctx.createRadialGradient(
          width * nebula.x, height * nebula.y, 0,
          width * nebula.x, height * nebula.y, nebula.radius
        );
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const handleMouseMove = (e) => {
      let clientX, clientY;
      if ('touches' in e) {
        if (e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else return;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      mouseX = (clientX - rect.left) * scaleX;
      mouseY = (clientY - rect.top) * scaleY;

      setMousePos({ x: clientX - rect.left, y: clientY - rect.top });
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      handleMouseMove(e);
    };

    const animate = (timestamp) => {
      ctx.clearRect(0, 0, width, height);

      // Pitch black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Draw nebulae
      drawNebulae();

      time = timestamp;

      // Update and draw floating particles
      for (const particle of particles) {
        particle.update();
        particle.draw(ctx);
      }

      // Update and draw stars
      let anySparkling = false;
      for (const star of stars) {
        const isSparkling = star.update(mouseX, mouseY, time);
        if (isSparkling) anySparkling = true;
        star.draw(ctx);
      }

      // Reset shadow for shooting stars
      ctx.shadowBlur = 0;

      // Generate shooting stars more frequently
      const interval = isMobile ? shootingStarInterval * 0.8 : shootingStarInterval;
      if (timestamp - lastShootingStarTime > interval + Math.random() * 3000) {
        const maxShootingStars = isMobile ? 4 : 6;
        if (shootingStars.length < maxShootingStars) {
          // Sometimes spawn multiple shooting stars at once
          const count = Math.random() > 0.8 ? 2 : 1;
          for (let i = 0; i < count; i++) {
            shootingStars.push(new ShootingStar());
          }
          lastShootingStarTime = timestamp;
        }
      }

      // Update and draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const shootingStar = shootingStars[i];
        shootingStar.update();
        shootingStar.draw(ctx);

        if (!shootingStar.active) {
          shootingStars.splice(i, 1);
        }
      }

      // Draw mouse sparkle effect (subtle)
      if (anySparkling && !isMobile) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 50, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201, 133, 209, 0.06)';
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    // Initialize
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', handleMouseMove);

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: 'default',
        }}
      />
      
      {/* Subtle purple ambient glow that follows mouse/touch */}
      <div
        style={{
          position: 'absolute',
          width: 'min(400px, 80vw)',
          height: 'min(400px, 80vw)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,133,209,0.08) 0%, transparent 70%)',
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          pointerEvents: 'none',
          transition: 'all 0.15s ease-out',
          zIndex: -1,
        }}
      />
    </div>
  );
}