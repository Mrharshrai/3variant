import { useScrollReveal } from '../hooks/useScrollReveal';
import './Services.css';

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7 9l3 3-3 3M13 15h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Frontend Development',
    tags: ['React', 'Next.js', 'TypeScript', 'Vue'],
    description: 'Blazing-fast, pixel-perfect UIs built with modern frameworks. From component libraries to complex SPAs and server-rendered apps.',
    color: '#2563EB',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 10h12M8 14h8M8 18h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: 'Backend Engineering',
    tags: ['Node.js', 'Python', 'Go', 'REST', 'GraphQL'],
    description: 'Scalable APIs, microservices, and server architectures engineered for performance, security, and maintainability.',
    color: '#06b6d4',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <ellipse cx="14" cy="8" rx="10" ry="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 8v6c0 2.2 4.5 4 10 4s10-1.8 10-4V8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 14v6c0 2.2 4.5 4 10 4s10-1.8 10-4v-6" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    title: 'Databases & Storage',
    tags: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase'],
    description: 'Strategic data modeling, query optimization, replication, and multi-database architectures for any scale.',
    color: '#8b5cf6',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 20l4-8 4 4 4-10 4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 6a2 2 0 100-4 2 2 0 000 4z" fill="currentColor" />
      </svg>
    ),
    title: 'Cloud Infrastructure',
    tags: ['AWS', 'GCP', 'Azure', 'Terraform', 'K8s'],
    description: 'Cloud-native infrastructure design, IaC automation, CI/CD pipelines, and multi-cloud deployment strategies.',
    color: '#f59e0b',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14 4v3M14 21v3M4 14h3M21 14h3M6.34 6.34l2.12 2.12M19.54 19.54l2.12 2.12M6.34 21.66l2.12-2.12M19.54 8.46l2.12-2.12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: 'AI & Automation',
    tags: ['LLM', 'RAG', 'n8n', 'Agents', 'Python'],
    description: 'Custom AI pipelines, LLM integrations, intelligent automation workflows, and RAG-powered knowledge systems.',
    color: '#10b981',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="2" y="6" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 13h6M8 16h4M18 11l2 2-2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'CRM Solutions',
    tags: ['HubSpot', 'Salesforce', 'Custom CRM', 'Integrations'],
    description: 'CRM implementation, customization, and custom-built relationship management systems tailored to your sales process.',
    color: '#ec4899',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 8h6v5H8zM16 8h4v3h-4zM8 15h4v5H8zM14 14h6v4h-6z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    title: 'CMS Development',
    tags: ['Sanity', 'Contentful', 'WordPress', 'Strapi'],
    description: 'Headless CMS architecture, custom admin experiences, and content workflows that empower your editorial team.',
    color: '#f97316',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="8" y="2" width="12" height="20" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 20h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M11 7h2M15 7h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
    title: 'Mobile Development',
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
    description: 'Cross-platform and native mobile apps with stunning UX, offline support, and seamless backend integration.',
    color: '#06b6d4',
  },
];

export default function Services() {
  const ref = useScrollReveal();

  return (
    <section id="services" className="section services-section" ref={ref as React.RefObject<HTMLElement>}>
      {/* Background decoration */}
      <div className="orb orb-blue services-orb" aria-hidden="true" />

      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">What We Build</span>
          <h2 className="section-title">
            Full-Stack Expertise,<br />
            <span className="title-accent">Zero Compromises</span>
          </h2>
          <p className="section-sub">
            From the pixel to the server rack — we cover every layer of modern software development with depth and precision.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`service-card glass-card reveal reveal-delay-${(i % 4) + 1}`}
              style={{ '--service-color': service.color } as React.CSSProperties}
            >
              <div className="service-icon-wrap">
                <div className="service-icon" style={{ color: service.color }}>
                  {service.icon}
                </div>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
              <div className="service-tags">
                {service.tags.map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
              <div className="service-arrow" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
