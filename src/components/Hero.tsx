import { useEffect, useRef, useState } from 'react';
import { ArrowDown, FileText } from 'lucide-react';
import { audiences, availability, profile, rewrite } from '../data/portfolio';
import { useTabs } from '../hooks/useTabs';

/** The Go rewrite as a before/after switch — the hero's one piece of artwork. */
function RewriteCard() {
  const [after, setAfter] = useState(false);
  const touched = useRef(false);

  useEffect(() => {
    // Play the improvement once on load, unless the visitor got there first.
    const t = window.setTimeout(() => !touched.current && setAfter(true), 1100);
    return () => window.clearTimeout(t);
  }, []);

  const pick = (v: boolean) => {
    touched.current = true;
    setAfter(v);
  };

  return (
    <figure className={`rewrite ${after ? 'is-after' : ''}`} aria-label={rewrite.title}>
      <figcaption className="rewrite__head">
        <span className="rewrite__title">{rewrite.title}</span>
        <span className="switch" role="group" aria-label="Show before or after the rewrite">
          <button type="button" aria-pressed={!after} onClick={() => pick(false)}>
            Before
          </button>
          <button type="button" aria-pressed={after} onClick={() => pick(true)}>
            After
          </button>
        </span>
      </figcaption>

      <dl className="rewrite__rows">
        {rewrite.rows.map((r) => (
          <div className="rewrite__row" key={r.label}>
            <dt>{r.label}</dt>
            <dd>
              <span className="rewrite__value" aria-live="polite">
                {after ? r.after : r.before}
              </span>
              <span className="rewrite__track" aria-hidden="true">
                <span className="rewrite__bar" style={{ width: `${after ? r.scaleAfter : r.scaleBefore}%` }} />
              </span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="rewrite__foot">
        <span aria-hidden="true">↗</span> {rewrite.footnote}
      </p>
    </figure>
  );
}

export function Hero() {
  const { active, tabProps, panelProps } = useTabs(
    audiences.map((a) => a.id),
    'aud',
  );
  const current = audiences.find((a) => a.id === active) ?? audiences[0];
  const ref = useRef<HTMLElement>(null);

  // Soft spotlight on the grid that follows the pointer.
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section className="hero" id="top" aria-labelledby="hero-title" ref={ref} onPointerMove={onMove}>
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <a className="status" href="#contact">
            <span className="status__dot" aria-hidden="true" />
            {availability.short.join(' · ')}
          </a>

          <p className="hero__who">
            <span className="square" aria-hidden="true" />
            <strong>{profile.name}</strong> — {profile.role}, {profile.location}
          </p>

          <h1 className="hero__title" id="hero-title">
            I own problems <em>end to end</em> — from the first report to the production fix.
          </h1>

          <div className="aud">
            <div className="aud__tabs" role="tablist" aria-label="Who is reading?">
              <span className="aud__for" aria-hidden="true">
                For
              </span>
              {audiences.map((a) => (
                <button className="aud__tab" key={a.id} {...tabProps(a.id)}>
                  {a.label}
                </button>
              ))}
            </div>
            <p className="aud__pitch" key={current.id} {...panelProps}>
              {current.pitch}
            </p>
          </div>

          <div className="hero__actions">
            <a className="btn btn--dark" href="#work">
              See the work <ArrowDown size={15} aria-hidden="true" />
            </a>
            <a className="btn" href={profile.links.resume} target="_blank" rel="noopener noreferrer">
              <FileText size={15} aria-hidden="true" /> Resume
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
          </div>
        </div>

        <RewriteCard />
      </div>
    </section>
  );
}
