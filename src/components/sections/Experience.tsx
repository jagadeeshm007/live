import { experience } from '../../data/portfolio';
import { ChapterTag, Lines } from '../ui/Lines';

export function Experience() {
  return (
    <section id="experience" className="chapter experience" data-chapter data-stop="3" aria-labelledby="experience-title">
      <div className="shell">
        <div className="experience__head">
          <ChapterTag index="04" label="Professional Experience" />
          <Lines id="experience-title" lines={['Systems that', <em key="e">stay up.</em>]} className="display" />
        </div>

        {experience.map((r) => (
          <article className="role" key={r.company} aria-labelledby={`role-${r.company.replace(/\W+/g, '')}`}>
            <header className="role__head" data-reveal="fade">
              <p className="role__period">{r.period}</p>
              <h3 className="role__company" id={`role-${r.company.replace(/\W+/g, '')}`}>
                {r.company}
              </h3>
              <p className="role__title">
                {r.role} <span className="muted">· {r.location}</span>
              </p>
              <p className="role__context">{r.context}</p>
            </header>

            {r.metrics && (
              <dl className="metrics" data-reveal="stagger" aria-label="Go rewrite results">
                {r.metrics.map((m) => (
                  <div className="metric" key={m.label}>
                    <dt>{m.label}</dt>
                    <dd>
                      <span className="metric__delta">{m.delta}</span>
                      {m.from && (
                        <span className="metric__range">
                          {m.from} → {m.to}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="tracks">
              {r.tracks.map((t) => (
                <section className="track" key={t.title} data-reveal="fade" aria-label={t.title}>
                  <h4 className="track__title">{t.title}</h4>
                  <ul>
                    {t.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
