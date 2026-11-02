import { ArrowUpRight } from 'lucide-react';
import { projects } from '../../data/portfolio';
import { GithubIcon } from '../ui/BrandIcons';
import { ChapterTag, Lines } from '../ui/Lines';

export function Projects() {
  return (
    <section id="projects" className="chapter projects" data-chapter aria-labelledby="projects-title">
      <div className="shell">
        <div className="projects__head">
          <ChapterTag index="05" label="Project Worlds" />
          <Lines id="projects-title" lines={['What I have', <em key="e">built.</em>]} className="display" />
        </div>
      </div>

      {projects.map((p, i) => (
        <article
          className={`project project--${p.id}`}
          key={p.id}
          data-stop={4 + i}
          aria-labelledby={`project-${p.id}`}
        >
          <div className="shell project__grid">
            <header className="project__head" data-reveal="fade">
              <p className="project__index">{p.index}</p>
              <h3 className="project__name" id={`project-${p.id}`}>
                {p.name}
              </h3>
              <p className="project__subtitle">{p.subtitle}</p>
              <div className="project__links">
                {p.live && (
                  <a className="btn btn--primary btn--sm" href={p.live} target="_blank" rel="noopener noreferrer">
                    Live app <ArrowUpRight size={15} aria-hidden="true" />
                    <span className="sr-only">(opens {p.name} in a new tab)</span>
                  </a>
                )}
                <a className="btn btn--ghost btn--sm" href={p.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon size={15} /> Source
                  <span className="sr-only">(GitHub repository for {p.name}, opens in a new tab)</span>
                </a>
              </div>
            </header>

            <div className="project__body">
              <div className="project__ps" data-reveal="fade">
                <div>
                  <h4 className="label">Problem</h4>
                  <p>{p.problem}</p>
                </div>
                <div>
                  <h4 className="label">Solution</h4>
                  <p>{p.solution}</p>
                </div>
              </div>

              <div className="project__cols">
                <div data-reveal="fade">
                  <h4 className="label">Architecture</h4>
                  <ul className="ticks">
                    {p.architecture.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
                <div data-reveal="fade">
                  <h4 className="label">Key decisions</h4>
                  <ul className="ticks">
                    {p.decisions.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="project__foot" data-reveal="fade">
                <p className="project__outcome">
                  <span className="label">Outcome</span> {p.outcome}
                </p>
                <ul className="chips chips--quiet" aria-label={`${p.name} stack`}>
                  {p.stack.map((s) => (
                    <li className="chip" key={s}>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
