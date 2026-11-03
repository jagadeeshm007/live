import { experience } from '../../data/portfolio';
import { ChapterTag, Lines } from '../ui/Lines';

const slug = (s: string) => s.toLowerCase().replace(/\W+/g, '-');

export function Experience() {
  let n = 0;
  const total = experience.reduce((a, r) => a + r.stories.length, 0);
  return (
    <section id="experience" className="chapter experience" data-chapter data-stop="3" aria-labelledby="experience-title">
      <div className="shell">
        <div className="experience__head">
          <ChapterTag index="04" label="Professional Experience" />
          <Lines id="experience-title" lines={['Stories from', <em key="e">production.</em>]} className="display" />
          <p className="lede" data-reveal="fade">
            Not a list of duties — the problems I walked into, what I did about them, and what changed. Each one is tagged
            with the leadership principle it comes from.
          </p>
        </div>

        {experience.map((r) => (
          <article className="role" key={r.company} aria-labelledby={`role-${slug(r.company)}`}>
            <header className="role__head" data-reveal="fade">
              <p className="role__period">{r.period}</p>
              <h3 className="role__company" id={`role-${slug(r.company)}`}>
                {r.company}
              </h3>
              <p className="role__title">
                {r.role} <span className="muted">· {r.location}</span>
              </p>
              <p className="role__context">{r.context}</p>
            </header>

            <ol className="stories">
              {r.stories.map((s) => {
                n += 1;
                return (
                  <li className="story" key={s.id} data-reveal="fade">
                    <p className="story__kicker">
                      Story {String(n).padStart(2, '0')}
                      <span className="muted"> / {String(total).padStart(2, '0')}</span>
                    </p>
                    <h4 className="story__title">{s.title}</h4>
                    <p className="story__hook">{s.hook}</p>

                    <div className="story__beats">
                      <div className="beat">
                        <p className="beat__label">
                          <span aria-hidden="true">01 </span>The problem
                        </p>
                        <p>{s.problem}</p>
                      </div>
                      <div className="beat">
                        <p className="beat__label">
                          <span aria-hidden="true">02 </span>What I did
                        </p>
                        <p>{s.action}</p>
                      </div>
                      <div className="beat beat--result">
                        <p className="beat__label">
                          <span aria-hidden="true">03 </span>What changed
                        </p>
                        <p>{s.result}</p>
                      </div>
                    </div>

                    {s.metrics && (
                      <dl className="story__metrics">
                        {s.metrics.map((m) => (
                          <div className="metric" key={m.label}>
                            <dt>{m.label}</dt>
                            <dd>{m.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    <div className="story__foot">
                      <ul className="lp-badges" aria-label="Leadership principles">
                        {s.principles.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                      <ul className="tags" aria-label="Technologies">
                        {s.stack.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}
