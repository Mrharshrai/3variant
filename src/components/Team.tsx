import { useScrollReveal } from '../hooks/useScrollReveal';
import './Team.css';

const values = [
  {
    icon: '🚀',
    title: 'Ownership Mindset',
    desc: 'Every engineer owns their work end-to-end. No hand-offs, no excuses.',
  },
  {
    icon: '🧪',
    title: 'Craft First',
    desc: 'We obsess over code quality, clean architecture, and production-grade reliability.',
  },
  {
    icon: '🌐',
    title: 'Remote & Async',
    desc: 'Distributed team, deep focus time, and no unnecessary meetings.',
  },
  {
    icon: '📈',
    title: 'Growth Paths',
    desc: 'Clear career ladders, mentorship, and budget for courses and conferences.',
  },
];

const openRoles = [
  { title: 'Senior Frontend Engineer', type: 'Full-time · Remote', tags: ['React', 'TypeScript', 'Next.js'] },
  { title: 'Backend Engineer (Python)', type: 'Full-time · Remote', tags: ['Python', 'FastAPI', 'PostgreSQL'] },
  { title: 'AI/ML Engineer', type: 'Full-time · Remote', tags: ['LangChain', 'PyTorch', 'Python'] },
  { title: 'DevOps / Cloud Engineer', type: 'Full-time · Remote', tags: ['AWS', 'Kubernetes', 'Terraform'] },
];

export default function Team() {
  const ref = useScrollReveal();

  return (
    <section id="team" className="section team-section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="orb orb-blue team-orb" aria-hidden="true" />

      <div className="container">
        <div className="team-layout">
          {/* Left: Culture */}
          <div className="team-culture reveal">
            <span className="section-label">Why Developers Love It Here</span>
            <h2 className="section-title">
              Build the Future.<br />
              <span className="title-accent">Grow With Us.</span>
            </h2>
            <p className="section-sub">
              3 Variant is a team of engineers who care deeply about craft, ship meaningful work, and treat each other as professionals.
            </p>

            <div className="team-values">
              {values.map((v, i) => (
                <div key={v.title} className={`team-value-item reveal reveal-delay-${i + 1}`}>
                  <span className="team-value-icon" role="img" aria-label={v.title}>{v.icon}</span>
                  <div>
                    <strong className="team-value-title">{v.title}</strong>
                    <p className="team-value-desc">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Open Roles */}
          <div className="team-roles reveal reveal-delay-2">
            <h3 className="roles-title">Open Positions</h3>
            <div className="roles-list">
              {openRoles.map((role) => (
                <div key={role.title} className="role-card glass-card">
                  <div className="role-info">
                    <span className="role-title">{role.title}</span>
                    <span className="role-type">{role.type}</span>
                    <div className="role-tags">
                      {role.tags.map((tag) => (
                        <span key={tag} className="tag-pill">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <a
                    href="#contact"
                    className="btn btn-outline role-apply-btn"
                    onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                    id={`apply-${role.title.replace(/\s+/g, '-').toLowerCase()}`}
                    aria-label={`Apply for ${role.title}`}
                  >
                    Apply
                  </a>
                </div>
              ))}
            </div>

            <div className="roles-note">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 5v4M8 11v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Don't see your role? We're always open to exceptional talent.{' '}
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Say hello
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
