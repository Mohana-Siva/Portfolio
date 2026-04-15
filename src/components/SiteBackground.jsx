import { useEffect, useRef, useState, useCallback } from 'react';


export default function SiteBackground() {

  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId;
    
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
      }
      
      update(mouseX, mouseY, time) {
        // Move star
        this.x += this.velocityX;
        this.y += this.velocityY;
        
        // Wrap around screen
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
        const maxDistance = 80;
        
        if (distance < maxDistance) {
          // Star sparkles intensely when mouse is near
          const intensity = (1 - distance / maxDistance) * 1.5;
          this.sparkleIntensity = Math.min(1, this.sparkleIntensity + intensity * 0.1);
        } else {
          this.sparkleIntensity = Math.max(0, this.sparkleIntensity - 0.02);
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
        
        // Star color based on brightness
        const intensity = this.currentBrightness;
        if (this.sparkleIntensity > 0.3) {
          // Sparkling stars get a purple tint
          ctx.fillStyle = `rgba(255, 200, 255, ${intensity})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${intensity})`;
        }
        
        ctx.fill();
        
        // Extra sparkle effect for mouse interaction
        if (this.sparkleIntensity > 0.5) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 133, 209, ${this.sparkleIntensity * 0.4})`;
          ctx.fill();
          
          // Cross sparkle
          ctx.beginPath();
          ctx.moveTo(this.x - this.radius * 3, this.y);
          ctx.lineTo(this.x + this.radius * 3, this.y);
          ctx.moveTo(this.x, this.y - this.radius * 3);
          ctx.lineTo(this.x, this.y + this.radius * 3);
          ctx.strokeStyle = `rgba(255, 255, 255, ${this.sparkleIntensity * 0.6})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    
    // Shooting Star class
    class ShootingStar {
      constructor() {
        this.reset();
      }
      
      reset() {
        this.active = true;
        this.x = Math.random() * width;
        this.y = Math.random() * height * 0.3; // Start in upper half
        this.velocityX = -8 - Math.random() * 6;
        this.velocityY = 3 + Math.random() * 4;
        this.length = 60 + Math.random() * 40;
        this.opacity = 0.7 + Math.random() * 0.3;
        this.size = 2 + Math.random() * 2;
        this.trail = [];
        this.life = 1;
      }
      
      update() {
        if (!this.active) return false;
        
        // Store trail position
        this.trail.unshift({ x: this.x, y: this.y, opacity: this.opacity });
        if (this.trail.length > 15) this.trail.pop();
        
        // Move shooting star
        this.x += this.velocityX;
        this.y += this.velocityY;
        
        // Fade out as it moves
        this.life -= 0.008;
        this.opacity = this.life * 0.8;
        
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
        
        // Draw trail
        for (let i = 0; i < this.trail.length; i++) {
          const point = this.trail[i];
          const trailOpacity = point.opacity * (1 - i / this.trail.length);
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, this.size * (1 - i / this.trail.length), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 133, 209, ${trailOpacity * 0.5})`;
          ctx.fill();
        }
        
        // Draw main shooting star
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        const tailX = this.x - this.velocityX * 0.5;
        const tailY = this.y - this.velocityY * 0.5;
        ctx.lineTo(tailX, tailY);
        
        ctx.strokeStyle = `rgba(201, 133, 209, ${this.opacity})`;
        ctx.lineWidth = this.size * 1.5;
        ctx.stroke();
        
        // Bright head
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 200, 255, ${this.opacity})`;
        ctx.fill();
        
        // Purple glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 133, 209, ${this.opacity * 0.3})`;
        ctx.fill();
      }
    }
    
    // Create stars
    const stars = [];
    const starCount = Math.min(400, Math.floor((width * height) / 5000));
    
    for (let i = 0; i < starCount; i++) {
      const radius = 1 + Math.random() * 2.5;
      const brightness = 0.3 + Math.random() * 0.7;
      const twinkleSpeed = 0.5 + Math.random() * 2;
      stars.push(new Star(
        Math.random() * width,
        Math.random() * height,
        radius,
        brightness,
        twinkleSpeed
      ));
    }
    
    // Create shooting stars
    const shootingStars = [];
    let lastShootingStarTime = 0;
    
    // Nebula clouds (complementary element)
    const nebulae = [
      { x: 0.2, y: 0.3, radius: 200, color: 'rgba(201, 133, 209, 0.03)' },
      { x: 0.7, y: 0.6, radius: 250, color: 'rgba(95, 99, 255, 0.02)' },
      { x: 0.5, y: 0.8, radius: 180, color: 'rgba(201, 133, 209, 0.02)' },
      { x: 0.1, y: 0.7, radius: 150, color: 'rgba(95, 99, 255, 0.03)' },
      { x: 0.9, y: 0.2, radius: 220, color: 'rgba(201, 133, 209, 0.02)' },
    ];
    
    let time = 0;
    let mouseX = width / 2;
    let mouseY = height / 2;
    
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
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      setMousePos({ x: mouseX, y: mouseY });
    };
    
    const animate = (timestamp) => {
      ctx.clearRect(0, 0, width, height);
      
      // Pitch black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
      
      // Draw nebulae (subtle purple clouds)
      drawNebulae();
      
      time = timestamp;
      
      // Update and draw stars
      let anySparkling = false;
      for (const star of stars) {
        const isSparking = star.update(mouseX, mouseY, time);
        if (isSparking) anySparkling = true;
        star.draw(ctx);
      }
      
      // Reset shadow for shooting stars
      ctx.shadowBlur = 0;
      
      // Generate shooting stars periodically
      if (timestamp - lastShootingStarTime > 3000 + Math.random() * 4000) {
        if (shootingStars.length < 3) {
          shootingStars.push(new ShootingStar());
          lastShootingStarTime = timestamp;
        }
      }
      
      // Update and draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const shootingStar = shootingStars[i];
        const isActive = shootingStar.update();
        shootingStar.draw(ctx);
        
        if (!isActive) {
          shootingStars.splice(i, 1);
        }
      }
      
      // Draw mouse sparkle effect (subtle)
      if (anySparkling) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 40, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201, 133, 209, 0.05)';
        ctx.fill();
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Initialize
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
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
      
      {/* Subtle purple ambient glow that follows mouse */}
      <div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,133,209,0.08) 0%, transparent 70%)',
          left: mousePos.x - 150,
          top: mousePos.y - 150,
          pointerEvents: 'none',
          transition: 'all 0.1s ease-out',
          zIndex: -1,
        }}
      />
    </div>
  );
}