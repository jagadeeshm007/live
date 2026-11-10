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
          <p className="lede" data-reveal="fade">
            Each project in four questions: what it is, why it exists, how it works, and how it is built to hold up.
          </p>
        </div>
      </div>

      {projects.map((p, i) => (
        <article className={`project project--${p.id}`} key={p.id} data-stop={4 + i} aria-labelledby={`project-${p.id}`}>
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

            <div className="qa" data-reveal="fade">
              <div className="qa__row">
                <h4 className="qa__q">
                  <span>01</span> What is it?
                </h4>
                <p className="qa__a qa__a--lead">{p.what}</p>
              </div>
              <div className="qa__row">
                <h4 className="qa__q">
                  <span>02</span> Why does it exist?
                </h4>
                <p className="qa__a">{p.why}</p>
              </div>
            </div>

            <div className="flow-wrap">
              <h4 className="qa__q" data-reveal="fade">
                <span>03</span> How does it work?
              </h4>
              <ol className="flow" data-reveal="stagger">
                {p.how.map((h, k) => (
                  <li className="flow__step" key={h.step}>
                    <p className="flow__n">
                      {String(k + 1).padStart(2, '0')} · {h.step}
                    </p>
                    <p className="flow__title">{h.title}</p>
                    <p className="flow__body">{h.body}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="build" data-reveal="fade">
              <h4 className="qa__q">
                <span>04</span> How is it engineered to last?
              </h4>
              <ul className="ticks">
                {p.build.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <ul className="tags tags--stack" aria-label={`${p.name} stack`}>
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
