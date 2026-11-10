import { useEffect, useState } from 'react';
import { ArrowDown, FileText } from 'lucide-react';
import { audiences, availability, profile } from '../data/portfolio';

function RotatingRole() {
  const roles = profile.rotatingRoles;
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % roles.length), 2600);
    return () => window.clearInterval(t);
  }, [roles.length]);
  return (
    <p className="rotator" aria-label={`Roles: ${roles.join(', ')}`}>
      <span className="rotator__dot" aria-hidden="true" />
      <span className="rotator__word" key={i} aria-hidden="true">
        {roles[i]}
      </span>
      <span className="rotator__dot" aria-hidden="true" />
    </p>
  );
}


export function Hero() {
  const [tab, setTab] = useState(audiences[0].id);
  const active = audiences.find((a) => a.id === tab) ?? audiences[0];

  const onKey = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (idx + (e.key === 'ArrowRight' ? 1 : audiences.length - 1)) % audiences.length;
    setTab(audiences[next].id);
    document.getElementById(`tab-${audiences[next].id}`)?.focus();
  };

  return (
    <section className="hero grid-bg" id="top" aria-labelledby="hero-name">
      <div className="container hero__inner">
        <a className="status" href="#contact">
          <span className="status__dot" aria-hidden="true" />
          {availability.facts[0].value} · {availability.facts[1].value} · {availability.facts[3].value}
        </a>

        <div className="hero__grid">
          <div className="card hero-card">
            <div className="hero-card__head">
              <span className="square" aria-hidden="true" />
              <h1 id="hero-name">
                <span className="hero-card__name">{profile.name.toUpperCase()}</span>{' '}
                <span className="hero-card__role">{profile.role}</span>
              </h1>
            </div>

            <div className="tabs" role="tablist" aria-label="Who is reading?">
              {audiences.map((a, idx) => (
                <button
                  key={a.id}
                  id={`tab-${a.id}`}
                  role="tab"
                  type="button"
                  aria-selected={tab === a.id}
                  aria-controls="hero-panel"
                  tabIndex={tab === a.id ? 0 : -1}
                  className="tab"
                  onClick={() => setTab(a.id)}
                  onKeyDown={(e) => onKey(e, idx)}
                >
                  {a.label}
                </button>
              ))}
            </div>
            <p className="hero-card__pitch" id="hero-panel" role="tabpanel" aria-labelledby={`tab-${active.id}`} key={active.id}>
              {active.pitch}
            </p>

            <div className="hero-card__actions">
              <a className="btn btn--dark" href="#experience">
                View experience <ArrowDown size={15} aria-hidden="true" />
              </a>
              <a className="btn" href={profile.links.resume} target="_blank" rel="noopener noreferrer">
                <FileText size={15} aria-hidden="true" /> Resume
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>

        <RotatingRole />
      </div>
    </section>
  );
}
