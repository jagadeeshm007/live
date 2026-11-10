import { ArrowUpRight, FileText, Mail, Plus } from 'lucide-react';
import {
  availability,
  certifications,
  experience,
  impact,
  principles,
  profile,
  projects,
  skills,
} from '../data/portfolio';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

function SectionHead({ id, index, title, intro }: { id: string; index: string; title: string; intro?: string }) {
  return (
    <header className="section-head" data-reveal>
      <p className="eyebrow">
        <span className="eyebrow__index">{index}</span> / {title}
      </p>
      <h2 className="section-title" id={id}>
        {title}
      </h2>
      {intro && <p className="section-intro">{intro}</p>}
    </header>
  );
}

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="box about" data-reveal>
          <h2 className="box__title" id="about-title">
            About
          </h2>
          <div className="about__grid">
            <p className="about__summary">{profile.summary}</p>
            <dl className="facts">
              {availability.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <ul className="impact" aria-label="Impact at a glance" data-reveal>
          {impact.map((m) => (
            <li key={m.label}>
              <span className="impact__value">{m.value}</span>
              <span className="impact__label">{m.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHead
          id="experience-title"
          index="01"
          title="Experience"
          intro="What I worked on, what I did, and what changed. Open any item for the full story."
        />

        <div className="box">
          {experience.map((r) => (
            <article className="role" key={r.company} data-reveal>
              <div className="role__rail" aria-hidden="true" />
              <p className="badge">{r.period}</p>
              <h3 className="role__title">
                {r.role} <span className="role__at">· {r.company}</span>
              </h3>
              <p className="role__meta">{r.location}</p>
              <p className="role__context">{r.context}</p>

              <ul className="highlights">
                {r.highlights.map((h) => (
                  <li key={h.title}>
                    <details className="hl">
                      <summary>
                        <span className="hl__title">
                          <span className="hl__arrow" aria-hidden="true">
                            &gt;
                          </span>
                          {h.title}
                        </span>
                        <span className="hl__summary">{h.summary}</span>
                        {h.metrics && (
                          <span className="hl__metrics">
                            {h.metrics.map((m) => (
                              <span className="metric-chip" key={m}>
                                {m}
                              </span>
                            ))}
                          </span>
                        )}
                        <Plus className="hl__toggle" size={16} aria-hidden="true" />
                      </summary>
                      <div className="hl__body">
                        <p>
                          <span className="hl__label">Problem</span>
                          {h.problem}
                        </p>
                        <p>
                          <span className="hl__label">What I did</span>
                          {h.action}
                        </p>
                        <p>
                          <span className="hl__label">Result</span>
                          {h.result}
                        </p>
                        <p className="hl__stack">{h.stack.join(' · ')}</p>
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead id="skills-title" index="02" title="Skills & Expertise" intro="Bold items are what I use most in production." />
        <div className="box">
          <div className="skills">
            {skills.map((g) => (
              <div className="skill-box" key={g.name} data-reveal>
                <h3 className="skill-box__title">{g.name}</h3>
                <ul>
                  {g.core.map((s) => (
                    <li key={s} className="is-core">
                      <span aria-hidden="true">&gt; </span>
                      {s}
                    </li>
                  ))}
                  {g.more.map((s) => (
                    <li key={s}>
                      <span aria-hidden="true">&gt; </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="certs" data-reveal>
            <h3 className="skill-box__title">Certifications</h3>
            <ul>
              {certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead
          id="projects-title"
          index="03"
          title="Projects"
          intro="What each one is, why it exists, how it works, and how it is built to hold up."
        />
        <div className="projects">
          {projects.map((p, i) => (
            <article className="project" key={p.id} data-reveal aria-labelledby={`p-${p.id}`}>
              <header className="project__head">
                <p className="project__index">P/{String(i + 1).padStart(2, '0')}</p>
                <h3 className="project__name" id={`p-${p.id}`}>
                  {p.name}
                </h3>
                <p className="project__tagline">{p.tagline}</p>
              </header>

              <div className="project__qa">
                <div>
                  <h4 className="label">What</h4>
                  <p>{p.what}</p>
                </div>
                <div>
                  <h4 className="label">Why</h4>
                  <p>{p.why}</p>
                </div>
              </div>

              <h4 className="label">How it works</h4>
              <ol className="steps">
                {p.how.map((s, k) => (
                  <li key={s.step}>
                    <span className="steps__n">{String(k + 1).padStart(2, '0')}</span>
                    <span className="steps__name">{s.step}</span>
                    <span className="steps__body">{s.body}</span>
                  </li>
                ))}
              </ol>

              <h4 className="label">Built to last</h4>
              <ul className="ticks">
                {p.built.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              <footer className="project__foot">
                <ul className="stack">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <div className="project__links">
                  {p.live && (
                    <a className="btn btn--dark btn--sm" href={p.live} target="_blank" rel="noopener noreferrer">
                      Live app <ArrowUpRight size={14} aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                  <a className="btn btn--sm" href={p.github} target="_blank" rel="noopener noreferrer">
                    <GithubIcon size={14} /> Source
                    <span className="sr-only"> (GitHub, opens in a new tab)</span>
                  </a>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Principles() {
  return (
    <section className="section" id="approach" aria-labelledby="approach-title">
      <div className="container">
        <SectionHead id="approach-title" index="04" title="How I Work" />
        <ol className="principles">
          {principles.map((p, i) => (
            <li key={p.title} data-reveal>
              <span className="principles__n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Contact() {
  const { email, linkedin, github, resume } = profile.links;
  const cards = [
    { icon: <Mail size={18} aria-hidden="true" />, label: 'Email', value: email, href: `mailto:${email}`, ext: false },
    { icon: <LinkedinIcon size={18} />, label: 'LinkedIn', value: 'in/mandalajagadeesh', href: linkedin, ext: true },
    { icon: <GithubIcon size={18} />, label: 'GitHub', value: 'jagadeeshm007', href: github, ext: true },
    { icon: <FileText size={18} aria-hidden="true" />, label: 'Resume', value: 'Download PDF', href: resume, ext: true },
  ];
  return (
    <section className="section contact grid-bg" id="contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div data-reveal>
          <p className="eyebrow">
            <span className="eyebrow__index">05</span> / Contact
          </p>
          <h2 className="contact__title" id="contact-title">
            Let’s build something meaningful.
          </h2>
          <p className="section-intro">
            Interested in discussing software engineering, interesting technical problems, or a role on your team? I
            reply quickly.
          </p>
          <div className="avail">
            <p className="avail__head">
              <span className="status__dot" aria-hidden="true" /> {availability.headline}
            </p>
            <p className="label">Roles I’m open to</p>
            <ul className="stack">
              {availability.roles.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="contact-cards" data-reveal>
          {cards.map((c) => (
            <li key={c.label}>
              <a
                className="contact-card"
                href={c.href}
                {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="contact-card__icon">{c.icon}</span>
                <span>
                  <span className="contact-card__label">{c.label}</span>
                  <span className="contact-card__value">{c.value}</span>
                </span>
                <ArrowUpRight className="contact-card__arrow" size={16} aria-hidden="true" />
                {c.ext && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Footer() {
  const { email, linkedin, github, resume } = profile.links;
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <h2 className="footer__title">{profile.name}</h2>
          <p>
            {profile.title} at {profile.company}. Backend systems, data pipelines, platforms and AI — built to stay fast
            and reliable.
          </p>
          <p>
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        </div>
        <div>
          <h2 className="footer__title">Professional</h2>
          <ul>
            <li>
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={resume} target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="footer__title">Quick links</h2>
          <ul>
            <li>
              <a href="#experience">Experience</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
      <p className="footer__copy">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
    </footer>
  );
}
