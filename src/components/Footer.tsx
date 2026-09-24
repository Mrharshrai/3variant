import logo from '../assets/logo.jpeg';
import './Footer.css';

const footerLinks = {
  Services: ['Frontend Dev', 'Backend Dev', 'AI Automation', 'Cloud Infra', 'CRM & CMS', 'Mobile Apps'],
  Company: ['About Us', 'Our Work', 'Tech Stack', 'Careers', 'Blog'],
  Connect: ['hello@3variant.com', 'GitHub', 'LinkedIn', 'Twitter/X'],
};

const handleNav = (e: React.MouseEvent, href: string) => {
  e.preventDefault();
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-glow" aria-hidden="true" />

      <div className="container">
        {/* Top section */}
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <a
              href="#hero"
              className="footer-logo"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              aria-label="3 Variant - Back to top"
            >
              <span className="footer-logo-mark">
                <img src={logo} alt="3 Variant logo" />
              </span>
              <span className="footer-logo-text">3<span className="footer-logo-accent">variant</span></span>
            </a>
            <p className="footer-tagline">
              We design, develop, automate, and scale complete digital products. One partner. Complete solutions.
            </p>
            <div className="footer-badges">
              <span className="footer-badge">⚡ Fast Delivery</span>
              <span className="footer-badge">🔒 Secure & Reliable</span>
              <span className="footer-badge">🌐 Remote-First</span>
            </div>
          </div>

          {/* Nav columns */}
          <div className="footer-nav">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="footer-nav-column">
                <h3 className="footer-nav-title">{category}</h3>
                <ul className="footer-nav-list" role="list">
                  {links.map((link) => {
                    const sectionMap: Record<string, string> = {
                      'Frontend Dev': '#services',
                      'Backend Dev': '#services',
                      'AI Automation': '#ai',
                      'Cloud Infra': '#services',
                      'CRM & CMS': '#services',
                      'Mobile Apps': '#services',
                      'Our Work': '#projects',
                      'Tech Stack': '#tech',
                      'Careers': '#team',
                    };
                    const href = sectionMap[link];

                    return (
                      <li key={link}>
                        {href ? (
                          <a
                            href={href}
                            className="footer-nav-link"
                            onClick={(e) => handleNav(e, href)}
                          >
                            {link}
                          </a>
                        ) : (
                          <a href={link.includes('@') ? `mailto:${link}` : '#'} className="footer-nav-link">
                            {link}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" aria-hidden="true" />

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} 3 Variant. All rights reserved. Built with precision and care.
          </p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-legal-link">Privacy Policy</a>
            <a href="#" className="footer-legal-link">Terms of Service</a>
          </div>
          <a
            href="#hero"
            className="back-to-top"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            aria-label="Back to top"
            id="back-to-top"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Top
          </a>
        </div>
      </div>
    </footer>
  );
}
