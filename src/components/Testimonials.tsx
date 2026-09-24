import { useState, useEffect, useCallback } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Testimonials.css';

const testimonials = [
  {
    quote: "3 Variant didn't just build our platform — they became strategic partners. Their AI automation alone saved us 40+ hours a week. The quality of engineering is unlike anything we've seen from an agency.",
    name: 'Sarah Chen',
    role: 'CTO, NexaCommerce',
    sector: 'E-Commerce',
    avatar: 'SC',
  },
  {
    quote: "We went from a broken CRM implementation to a fully automated pipeline in 6 weeks. The 3 Variant team thinks in systems, not just features. Absolutely worth every dollar.",
    name: 'Marcus Johnson',
    role: 'VP Engineering, PulseHR',
    sector: 'HR Tech',
    avatar: 'MJ',
  },
  {
    quote: "The data infrastructure they built processes millions of transactions daily with zero downtime. Their cloud architecture expertise is genuinely world-class. We'd trust them with any critical system.",
    name: 'Priya Patel',
    role: 'Head of Engineering, DataVault',
    sector: 'FinTech',
    avatar: 'PP',
  },
  {
    quote: "Our conversion rates jumped 5x after the AI outreach system went live. The team was fast, communicative, and delivered above scope. We've already started our next project with them.",
    name: 'Alex Rodriguez',
    role: 'CEO, AutoReach',
    sector: 'Sales Tech',
    avatar: 'AR',
  },
];

const clientLogos = ['NexaCommerce', 'PulseHR', 'DataVault', 'AutoReach', 'TechScale', 'BuildCo'];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const ref = useScrollReveal();

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning]);

  const goToNext = useCallback(() => {
    goTo((activeIndex + 1) % testimonials.length);
  }, [goTo, activeIndex]);

  const goToPrev = useCallback(() => {
    goTo((activeIndex - 1 + testimonials.length) % testimonials.length);
  }, [goTo, activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [goToNext]);

  const active = testimonials[activeIndex];

  return (
    <section id="testimonials" className="section testimonials-section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        {/* Testimonial carousel */}
        <div className="testimonials-header reveal">
          <span className="section-label">What Clients Say</span>
          <h2 className="section-title">
            Trusted by Teams<br />
            <span className="title-accent">That Ship</span>
          </h2>
        </div>

        <div className="testimonial-card glass-card reveal reveal-delay-1" aria-live="polite">
          <div className={`testimonial-content ${isTransitioning ? 'fading' : ''}`}>
            <div className="quote-icon" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M8 20C8 13.37 13.37 8 20 8" stroke="url(#qg)" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 28h8v8H4V28zM20 28h8v8h-8V28z" fill="url(#qg2)" opacity="0.6" />
                <defs>
                  <linearGradient id="qg" x1="4" y1="8" x2="20" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#b8652e" /><stop offset="1" stopColor="#0d7377" />
                  </linearGradient>
                  <linearGradient id="qg2" x1="4" y1="28" x2="28" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#b8652e" /><stop offset="1" stopColor="#0d7377" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <blockquote className="testimonial-quote">
              "{active.quote}"
            </blockquote>
            <div className="testimonial-author">
              <div className="author-avatar" aria-hidden="true">{active.avatar}</div>
              <div className="author-info">
                <strong className="author-name">{active.name}</strong>
                <span className="author-role">{active.role}</span>
              </div>
              <span className="author-sector">{active.sector}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="testimonial-controls">
            <div className="testimonial-dots" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`dot ${i === activeIndex ? 'active' : ''}`}
                  onClick={() => goTo(i)}
                  id={`testimonial-dot-${i}`}
                />
              ))}
            </div>
            <div className="testimonial-arrows">
              <button
                className="arrow-btn"
                onClick={goToPrev}
                aria-label="Previous testimonial"
                id="testimonial-prev"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                className="arrow-btn"
                onClick={goToNext}
                aria-label="Next testimonial"
                id="testimonial-next"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Client Logos */}
        <div className="client-logos reveal reveal-delay-2" aria-label="Our clients">
          <p className="client-logos-label">Trusted by companies across industries</p>
          <div className="client-logos-grid">
            {clientLogos.map((logo) => (
              <div key={logo} className="client-logo-item">
                <span className="client-logo-name">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
