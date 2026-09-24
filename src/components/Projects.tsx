import { useScrollReveal } from '../hooks/useScrollReveal';
import './Projects.css';

const projects = [
  {
    id: 'proj-1',
    title: 'NexaCommerce',
    category: 'E-Commerce Platform',
    sector: 'Retail',
    outcome: '340% revenue increase',
    description: 'Full-stack e-commerce platform with AI-powered recommendations, real-time inventory, and multi-vendor marketplace. Handles 50K+ concurrent users.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'AI/ML'],
    gradient: 'linear-gradient(135deg, #2563EB 0%, #7c3aed 100%)',
    accent: '#7c3aed',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'proj-2',
    title: 'PulseHR',
    category: 'SaaS Platform',
    sector: 'HR Tech',
    outcome: '80% onboarding automation',
    description: 'Enterprise HR management system with AI-driven hiring pipelines, automated onboarding flows, analytics dashboards, and Slack/Teams integrations.',
    tags: ['React', 'Python', 'FastAPI', 'MongoDB', 'n8n', 'Docker'],
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
    accent: '#10b981',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'proj-3',
    title: 'DataVault',
    category: 'Data Infrastructure',
    sector: 'FinTech',
    outcome: '99.99% uptime SLA',
    description: 'Real-time financial data pipeline processing 2M+ transactions/day with automated compliance reporting, fraud detection, and BI dashboards.',
    tags: ['Go', 'Kafka', 'ClickHouse', 'Kubernetes', 'Terraform', 'GCP'],
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    accent: '#ef4444',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'proj-4',
    title: 'AutoReach',
    category: 'AI Automation',
    sector: 'Sales & Marketing',
    outcome: '5x lead conversion',
    description: 'Intelligent outreach automation platform using LLMs for personalized messaging, RAG for context-aware responses, and CRM integration.',
    tags: ['React', 'Python', 'LangChain', 'OpenAI', 'HubSpot', 'Supabase'],
    gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    accent: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=900&q=80',
  },
];

export default function Projects() {
  const ref = useScrollReveal();

  return (
    <section id="projects" className="section projects-section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="orb orb-cyan projects-orb" aria-hidden="true" />

      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">What We've Shipped</span>
          <h2 className="section-title">
            Products That<br />
            <span className="title-accent">Move the Needle</span>
          </h2>
          <p className="section-sub">
            Real-world solutions that delivered measurable impact for our clients.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <div
              key={project.id}
              id={project.id}
              className={`project-card glass-card reveal reveal-delay-${(i % 2) + 1}`}
            >
              {/* Card top visual */}
              <div
                className="project-visual"
                style={{ background: project.gradient }}
                aria-hidden="true"
              >
                <img
                  className="project-visual-img"
                  src={project.image}
                  alt=""
                  loading="lazy"
                />
                <div className="project-visual-grid" />
                <div className="project-category-badge">
                  {project.category}
                </div>
                <div className="project-outcome">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 10L5 7L7 9L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {project.outcome}
                </div>
              </div>

              {/* Card body */}
              <div className="project-body">
                <div className="project-meta">
                  <span className="project-sector">{project.sector}</span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="projects-cta reveal">
          <p className="projects-cta-text">Have a project in mind?</p>
          <a
            href="#contact"
            className="btn btn-primary"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            id="projects-contact-cta"
          >
            Let's Build It Together
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
