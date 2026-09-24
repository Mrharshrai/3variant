import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './TechStack.css';

const categories = ['Frontend', 'Backend', 'Cloud & DevOps', 'AI & Data', 'Databases', 'CMS & CRM'];

const techByCategory: Record<string, { name: string; color: string }[]> = {
  'Frontend': [
    { name: 'React', color: '#61dafb' },
    { name: 'Next.js', color: '#ffffff' },
    { name: 'TypeScript', color: '#3178c6' },
    { name: 'Vue.js', color: '#42b883' },
    { name: 'Svelte', color: '#ff3e00' },
    { name: 'Tailwind', color: '#38bdf8' },
    { name: 'Framer', color: '#05f' },
    { name: 'Three.js', color: '#ffffff' },
    { name: 'GSAP', color: '#88ce02' },
    { name: 'Figma', color: '#f24e1e' },
  ],
  'Backend': [
    { name: 'Node.js', color: '#3c873a' },
    { name: 'Python', color: '#ffd43b' },
    { name: 'Go', color: '#00acd7' },
    { name: 'Rust', color: '#f74c00' },
    { name: 'FastAPI', color: '#009688' },
    { name: 'Express', color: '#ffffff' },
    { name: 'NestJS', color: '#ea2845' },
    { name: 'Django', color: '#092e20' },
    { name: 'GraphQL', color: '#e535ab' },
    { name: 'gRPC', color: '#244c5a' },
  ],
  'Cloud & DevOps': [
    { name: 'AWS', color: '#ff9900' },
    { name: 'GCP', color: '#4285f4' },
    { name: 'Azure', color: '#0078d4' },
    { name: 'Docker', color: '#2496ed' },
    { name: 'Kubernetes', color: '#326ce5' },
    { name: 'Terraform', color: '#844fba' },
    { name: 'GitHub Actions', color: '#2088ff' },
    { name: 'Vercel', color: '#ffffff' },
    { name: 'Cloudflare', color: '#f38020' },
    { name: 'Linux', color: '#fcc624' },
  ],
  'AI & Data': [
    { name: 'OpenAI', color: '#10a37f' },
    { name: 'LangChain', color: '#1c3c3c' },
    { name: 'HuggingFace', color: '#ff9d00' },
    { name: 'PyTorch', color: '#ee4c2c' },
    { name: 'TensorFlow', color: '#ff6f00' },
    { name: 'n8n', color: '#ef6c00' },
    { name: 'Pinecone', color: '#000000' },
    { name: 'Pandas', color: '#150458' },
    { name: 'Scikit-learn', color: '#f7931e' },
    { name: 'Ollama', color: '#ffffff' },
  ],
  'Databases': [
    { name: 'PostgreSQL', color: '#336791' },
    { name: 'MongoDB', color: '#47a248' },
    { name: 'Redis', color: '#dc382d' },
    { name: 'MySQL', color: '#4479a1' },
    { name: 'Supabase', color: '#3ecf8e' },
    { name: 'Prisma', color: '#2d3748' },
    { name: 'Elasticsearch', color: '#f04e98' },
    { name: 'SQLite', color: '#003b57' },
    { name: 'ClickHouse', color: '#faff69' },
    { name: 'Neon', color: '#12fff7' },
  ],
  'CMS & CRM': [
    { name: 'Sanity', color: '#f03e2f' },
    { name: 'Contentful', color: '#2478cc' },
    { name: 'Strapi', color: '#2f2e8b' },
    { name: 'WordPress', color: '#21759b' },
    { name: 'HubSpot', color: '#ff7a59' },
    { name: 'Salesforce', color: '#00a1e0' },
    { name: 'Webflow', color: '#4353ff' },
    { name: 'Ghost', color: '#15171a' },
    { name: 'Directus', color: '#6644ff' },
    { name: 'Payload', color: '#ffffff' },
  ],
};

// Marquee items — duplicate for seamless loop
const allTechs = Object.values(techByCategory).flat();
const marqueeItems = [...allTechs, ...allTechs];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState('Frontend');
  const ref = useScrollReveal();

  return (
    <section id="tech" className="section tech-section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Our Weapons of Choice</span>
          <h2 className="section-title">
            Mastery Across the<br />
            <span className="title-accent">Entire Stack</span>
          </h2>
          <p className="section-sub">
            We don't just know these tools — we've shipped production systems with them at scale.
          </p>
        </div>

        {/* Scrolling Marquee */}
        <div className="tech-marquee-wrapper reveal" aria-hidden="true">
          <div className="tech-marquee-track">
            {marqueeItems.map((tech, i) => (
              <div key={`${tech.name}-${i}`} className="tech-marquee-item">
                <span className="tech-dot" style={{ background: tech.color }} />
                <span className="tech-marquee-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="tech-tabs reveal" role="tablist" aria-label="Technology categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeTab === cat}
              aria-controls={`tab-panel-${cat}`}
              className={`tech-tab ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
              id={`tab-${cat.replace(/\s+/g, '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div
          className="tech-grid reveal"
          role="tabpanel"
          id={`tab-panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab.replace(/\s+/g, '-')}`}
        >
          {techByCategory[activeTab].map((tech, i) => (
            <div
              key={tech.name}
              className="tech-item"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span
                className="tech-item-dot"
                style={{ background: tech.color }}
                aria-hidden="true"
              />
              <span className="tech-item-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
