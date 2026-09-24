import { useScrollReveal } from '../hooks/useScrollReveal';
import './AISection.css';

const capabilities = [
  {
    icon: '🤖',
    title: 'Custom AI Agents',
    desc: 'Goal-oriented agents that reason, plan, and execute complex multi-step tasks autonomously.',
  },
  {
    icon: '🧠',
    title: 'RAG Pipelines',
    desc: 'Retrieval-Augmented Generation systems that give LLMs access to your private knowledge bases.',
  },
  {
    icon: '⚡',
    title: 'Workflow Automation',
    desc: 'n8n, Zapier, and custom automation pipelines that eliminate repetitive manual work.',
  },
  {
    icon: '💬',
    title: 'LLM Integrations',
    desc: 'GPT-4, Claude, Gemini, and open-source LLMs integrated directly into your products.',
  },
  {
    icon: '📊',
    title: 'AI Analytics',
    desc: 'Predictive dashboards, anomaly detection, and intelligent reporting for data-driven teams.',
  },
  {
    icon: '🔗',
    title: 'API Orchestration',
    desc: 'Complex multi-API orchestration with intelligent retry, fallback, and rate limiting logic.',
  },
];

export default function AISection() {
  const ref = useScrollReveal();

  return (
    <section id="ai" className="section ai-section" ref={ref as React.RefObject<HTMLElement>}>
      {/* Animated neural network SVG background */}
      <div className="ai-bg" aria-hidden="true">
        <svg
          className="neural-svg"
          viewBox="0 0 800 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Layer 1 nodes */}
          {[100, 180, 260, 340, 420].map((y, i) => (
            <circle key={`l1-${i}`} cx="120" cy={y} r="8" fill="rgba(184,101,46,0.5)" className={`neural-node n-delay-${i}`} />
          ))}
          {/* Layer 2 nodes */}
          {[130, 220, 310, 400].map((y, i) => (
            <circle key={`l2-${i}`} cx="320" cy={y} r="8" fill="rgba(184,101,46,0.5)" className={`neural-node n-delay-${i + 2}`} />
          ))}
          {/* Layer 3 nodes */}
          {[160, 260, 360].map((y, i) => (
            <circle key={`l3-${i}`} cx="520" cy={y} r="8" fill="rgba(13,115,119,0.6)" className={`neural-node n-delay-${i + 4}`} />
          ))}
          {/* Output node */}
          <circle cx="700" cy="260" r="12" fill="rgba(13,115,119,0.8)" className="neural-node neural-output" />

          {/* Connections l1→l2 */}
          {[100, 180, 260, 340, 420].map((y1) =>
            [130, 220, 310, 400].map((y2, j) => (
              <line key={`${y1}-${y2}`} x1="120" y1={y1} x2="320" y2={y2}
                stroke="rgba(184,101,46,0.12)" strokeWidth="1" className={`neural-line delay-${j}`} />
            ))
          )}
          {/* Connections l2→l3 */}
          {[130, 220, 310, 400].map((y1) =>
            [160, 260, 360].map((y2, j) => (
              <line key={`${y1}-l3-${y2}`} x1="320" y1={y1} x2="520" y2={y2}
                stroke="rgba(184,101,46,0.15)" strokeWidth="1" className={`neural-line delay-${j}`} />
            ))
          )}
          {/* Connections l3→output */}
          {[160, 260, 360].map((y1) => (
            <line key={`l3-out-${y1}`} x1="520" y1={y1} x2="700" y2={260}
              stroke="rgba(13,115,119,0.25)" strokeWidth="1.5" className="neural-line" />
          ))}

          {/* Animated signal pulses */}
          <circle r="4" fill="rgba(13,115,119,0.9)" className="neural-pulse">
            <animateMotion dur="3s" repeatCount="indefinite" path="M120,180 L320,220 L520,260 L700,260" />
          </circle>
          <circle r="3" fill="rgba(184,101,46,0.8)" className="neural-pulse">
            <animateMotion dur="4s" repeatCount="indefinite" begin="1s" path="M120,340 L320,310 L520,360 L700,260" />
          </circle>
          <circle r="3" fill="rgba(13,115,119,0.7)" className="neural-pulse">
            <animateMotion dur="3.5s" repeatCount="indefinite" begin="2s" path="M120,100 L320,130 L520,160 L700,260" />
          </circle>
        </svg>
      </div>

      <div className="container">
        <div className="ai-content">
          <div className="ai-header reveal">
            <span className="section-label">Intelligence at Scale</span>
            <h2 className="section-title">
              AI That Works,<br />
              <span className="title-accent">Not Just Talks</span>
            </h2>
            <p className="section-sub">
              We don't just integrate ChatGPT — we architect intelligent systems that understand your domain, automate your workflows, and continuously improve.
            </p>
          </div>

          <div className="ai-capabilities">
            {capabilities.map((cap, i) => (
              <div
                key={cap.title}
                className={`ai-cap-card glass-card reveal reveal-delay-${(i % 3) + 1}`}
              >
                <span className="ai-cap-icon" role="img" aria-label={cap.title}>{cap.icon}</span>
                <div>
                  <h3 className="ai-cap-title">{cap.title}</h3>
                  <p className="ai-cap-desc">{cap.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Banner */}
          <div className="ai-banner reveal">
            <div className="ai-banner-text">
              <span className="ai-banner-label">Powered by</span>
              <div className="ai-banner-techs">
                {['OpenAI', 'LangChain', 'Anthropic', 'n8n', 'HuggingFace', 'Pinecone', 'Ollama'].map((t) => (
                  <span key={t} className="tag-pill">{t}</span>
                ))}
              </div>
            </div>
            <a
              href="#contact"
              className="btn btn-primary ai-cta-btn"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              id="ai-section-cta"
            >
              Automate Your Business
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
