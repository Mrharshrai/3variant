import { useEffect, useRef, useState } from 'react';
import { useMouseParallax } from '../hooks/useMouseParallax';
import logo from '../assets/logo.jpeg';
import './Hero.css';

const phrases = [
  'We Build.',
  'We Automate.',
  'We Scale.',
  'We Innovate.',
];

const floatingTags = [
  'React', 'Node.js', 'Python', 'AWS', 'AI/ML',
  'PostgreSQL', 'Docker', 'TypeScript', 'Next.js', 'Kubernetes',
];

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const int = parseInt(full, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const { normalized } = useMouseParallax();

  // Typewriter
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText.length < currentPhrase.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
      }, 80);
    } else if (!isDeleting && displayText.length === currentPhrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, 45);
    } else if (isDeleting && displayText.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, 10);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  // Particle canvas
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cs = getComputedStyle(document.documentElement);
    const amber = (cs.getPropertyValue('--color-amber') || '#D4AF37').trim();
    const teal = (cs.getPropertyValue('--color-teal') || '#93A6BC').trim();

    let animFrame: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      alphaDir: number;
    }

    const PARTICLE_COUNT = Math.min(Math.floor(width * height / 12000), 120);
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.5 + 0.15,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = hexToRgba(amber, 0.12 * (1 - dist / 130));
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Mouse connections
      particles.forEach((p) => {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = hexToRgba(teal, 0.2 * (1 - dist / 200));
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      // Draw particles
      particles.forEach((p) => {
        p.alpha += 0.003 * p.alphaDir;
        if (p.alpha > 0.65 || p.alpha < 0.1) p.alphaDir *= -1;

        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repulse = dist < 100 ? (100 - dist) / 100 : 0;

        p.x += p.vx + (dx / Math.max(dist, 1)) * repulse * 0.5;
        p.y += p.vy + (dy / Math.max(dist, 1)) * repulse * 0.5;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(amber, p.alpha);
        ctx.fill();
      });

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWorkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />

      {/* Orbs */}
      <div
        className="hero-orb hero-orb-1"
        style={{ transform: `translate(${normalized.x * -30}px, ${normalized.y * -20}px)` }}
        aria-hidden="true"
      />
      <div
        className="hero-orb hero-orb-2"
        style={{ transform: `translate(${normalized.x * 20}px, ${normalized.y * 15}px)` }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="hero-content container">
        <div
          className="hero-text"
          style={{ transform: `translate(${normalized.x * -8}px, ${normalized.y * -5}px)` }}
        >
          {/* Badge */}
          <div className="hero-badge reveal visible">
            <span className="hero-badge-dot" aria-hidden="true" />
            Full-Stack Digital Product Studio
          </div>

          {/* Headline */}
          <h1 className="hero-headline reveal visible" aria-label="Design. Develop. Scale.">
            <span className="hero-headline-line">Design.</span>
            <span className="hero-headline-line hero-headline-gradient">Develop.</span>
            <span className="hero-headline-line">Scale.</span>
          </h1>

          {/* Typewriter */}
          <div className="hero-typewriter reveal visible" aria-live="polite" aria-atomic="true">
            <span className="typewriter-text">{displayText}</span>
            <span
              className="typewriter-cursor"
              style={{ opacity: cursorVisible ? 1 : 0 }}
              aria-hidden="true"
            >|</span>
          </div>

          {/* Subtext */}
          <p className="hero-sub reveal visible">
            3 Variant engineers end-to-end digital products — from pixel-perfect
            frontends and bulletproof backends to AI-powered automation and
            cloud-scale infrastructure. One partner. Complete solutions.
          </p>

          {/* CTAs */}
          <div className="hero-ctas reveal visible">
            <a
              href="#contact"
              className="btn btn-primary btn-hero"
              onClick={handleContactClick}
              id="hero-cta-primary"
            >
              Start Building
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#projects"
              className="btn btn-outline btn-hero"
              onClick={handleWorkClick}
              id="hero-cta-secondary"
            >
              View Our Work
            </a>
          </div>

          {/* Floating Tags */}
          <div className="hero-tags reveal visible" aria-label="Technologies we use">
            {floatingTags.map((tag, i) => (
              <span key={tag} className="tag-pill" style={{ animationDelay: `${i * 0.1}s` }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hero Visual */}
        <div
          className="hero-visual"
          style={{ transform: `translate(${normalized.x * 12}px, ${normalized.y * 8}px)` }}
          aria-hidden="true"
        >
          <div className="hero-orb-visual">
            <div className="orb-ring orb-ring-1" />
            <div className="orb-ring orb-ring-2" />
            <div className="orb-ring orb-ring-3" />
            <div className="orb-core">
              <img src={logo} alt="3 Variant" className="orb-core-img" />
            </div>
          </div>

          {/* Floating metric cards */}
          <div className="metric-card metric-card-1">
            <span className="metric-value">200+</span>
            <span className="metric-label">Projects Shipped</span>
          </div>
          <div className="metric-card metric-card-2">
            <span className="metric-value">50+</span>
            <span className="metric-label">Expert Team</span>
          </div>
          <div className="metric-card metric-card-3">
            <span className="metric-value">90+</span>
            <span className="metric-label">Global Clients</span>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="scroll-hint" aria-label="Scroll down to explore">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
