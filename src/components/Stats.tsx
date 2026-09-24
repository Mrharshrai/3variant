import { useCountUp } from '../hooks/useCountUp';
import './Stats.css';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  { value: 200, suffix: '+', label: 'Projects Shipped', description: 'Across 15+ industries' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', description: 'Average project rating' },
  { value: 50, suffix: '+', label: 'Technologies', description: 'Across the full stack' },
  { value: 7, suffix: '+', label: 'Years Building', description: 'Enterprise-grade solutions' },
];

function StatCounter({ stat }: { stat: StatItem }) {
  const { count, ref } = useCountUp(stat.value, 2200);
  return (
    <div className="stat-item" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="stat-value">
        <span className="stat-number">{count}</span>
        <span className="stat-suffix">{stat.suffix}</span>
      </div>
      <div className="stat-label">{stat.label}</div>
      <div className="stat-desc">{stat.description}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="stats-section" aria-label="Company statistics">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat) => (
            <StatCounter key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
