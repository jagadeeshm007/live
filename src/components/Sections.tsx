import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, FileText, Mail } from 'lucide-react';
import {
  apxor,
  availability,
  certifications,
  earlier,
  numbers,
  profile,
  projects,
  skills,
  traits,
  type Project,
} from '../data/portfolio';
import { useTabs } from '../hooks/useTabs';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

function Head({ id, index, kicker, children }: { id: string; index: string; kicker: string; children: React.ReactNode }) {
  return (
    <header className="head" data-reveal>
      <p className="eyebrow">
        <span className="eyebrow__index">{index}</span> {kicker}
      </p>
      <h2 className="head__title" id={id}>
        {children}
      </h2>
    </header>
  );
}

/* ----------------------------------------------------------------- numbers */

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || value === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1200);
          el.textContent = String(Math.round(value * (1 - Math.pow(1 - t, 3))));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = String(value);
    };
  }, [value]);
  return <span ref={ref}>{value}</span>;
}

export function Numbers() {
  return (
    <section className="numbers" aria-label="At a glance">
      <ul className="container numbers__list">
        {numbers.map((n) => (
          <li key={n.label} data-reveal>
            <p className="numbers__value">
              {n.prefix}
              <CountUp value={n.value} />
              <span className="numbers__suffix">{n.suffix}</span>
            </p>
            <p className="numbers__label">{n.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------- how I work */

export function HowIWork() {
  const { active, tabProps, panelProps } = useTabs(
    traits.map((t) => t.id),
    'trait',
  );
  const current = traits.find((t) => t.id === active) ?? traits[0];
  return (
    <section className="section" id="approach" aria-labelledby="approach-title">
      <div className="container">
        <Head id="approach-title" index="01" kicker="How I work">
          Three habits, <em>with proof.</em>
        </Head>

        <div className="traits" data-reveal>
          <div className="traits__tabs" role="tablist" aria-label="Working habits" aria-orientation="vertical">
            {traits.map((t, i) => (
              <button className="trait" key={t.id} {...tabProps(t.id)}>
                <span className="trait__n">0{i + 1}</span>
                <span className="trait__word">{t.word}</span>
              </button>
            ))}
          </div>

          <div className="traits__panel" key={current.id} {...panelProps}>
            <blockquote className="traits__belief">“{current.belief}”</blockquote>
            <ul className="traits__proof">
              {current.proof.map((p) => (
                <li key={p.text}>
                  <span>{p.text}</span>
                  <span className="where">{p.where}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- work */

export function Work() {
  const { active, tabProps, panelProps } = useTabs(
    apxor.stories.map((s) => s.id),
    'story',
  );
  const s = apxor.stories.find((x) => x.id === active) ?? apxor.stories[0];
  return (
    <section className="section section--tint" id="work" aria-labelledby="work-title">
      <div className="container">
        <Head id="work-title" index="02" kicker="Experience">
          Stories from <em>production.</em>
        </Head>

        <div className="role-line" data-reveal>
          <p className="badge">{apxor.period}</p>
          <p className="role-line__title">
            <strong>{apxor.role}</strong> · {apxor.company}, {apxor.location}
          </p>
          <p className="role-line__context">{apxor.context}</p>
        </div>

        <div className="stories" data-reveal>
          <div className="stories__tabs" role="tablist" aria-label="Stories from Apxor" aria-orientation="vertical">
            {apxor.stories.map((x, i) => (
              <button className="story-tab" key={x.id} {...tabProps(x.id)}>
                <span className="story-tab__n">0{i + 1}</span>
                {x.tab}
              </button>
            ))}
          </div>

          <article className="story" key={s.id} {...panelProps}>
            <div className="story__metric" aria-label={`${s.metric} ${s.metricLabel}`}>
              <span className="story__value">{s.metric}</span>
              <span className="story__label">{s.metricLabel}</span>
            </div>
            <h3 className="story__title">{s.title}</h3>
            <p className="story__body">{s.body}</p>
            <ul className="chips chips--accent" aria-label="Key facts">
              {s.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="story__stack">{s.stack.join('  ·  ')}</p>
          </article>
        </div>

        <div className="earlier" data-reveal>
          <p className="earlier__when">{earlier.period}</p>
          <p>
            <strong>{earlier.role}</strong> · {earlier.company}, {earlier.location}
          </p>
          <p className="earlier__line">{earlier.line}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ skills */

export function Skills() {
  const [group, setGroup] = useState<string>('all');
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <Head id="skills-title" index="03" kicker="Toolkit">
          What I <em>reach for.</em>
        </Head>

        <div className="toolkit" data-reveal>
          <div className="filter" role="group" aria-label="Filter skills by area">
            {[{ id: 'all', name: 'All' }, ...skills].map((g) => (
              <button key={g.id} type="button" aria-pressed={group === g.id} onClick={() => setGroup(g.id)}>
                {g.name}
              </button>
            ))}
          </div>

          <ul className="cloud" aria-label="Skills">
            {skills.flatMap((g) =>
              [...g.core.map((s) => ({ s, core: true })), ...g.more.map((s) => ({ s, core: false }))].map(({ s, core }) => (
                <li
                  key={`${g.id}-${s}`}
                  className={`${core ? 'is-core' : ''} ${group !== 'all' && group !== g.id ? 'is-dim' : ''}`}
                >
                  {s}
                  {core && <span className="sr-only"> (used most)</span>}
                </li>
              )),
            )}
          </ul>

          <p className="toolkit__legend">
            <span className="legend-core">Bold</span> = what I use most in production.
            <span className="toolkit__certs">
              {certifications.map((c) => (
                <span key={c}>✓ {c}</span>
              ))}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- projects */

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const { active, tabProps, panelProps } = useTabs(
    p.steps.map((s) => s.name),
    `steps-${p.id}`,
  );
  const step = p.steps.find((s) => s.name === active) ?? p.steps[0];
  const stepIndex = p.steps.indexOf(step);
  return (
    <article className="project" aria-labelledby={`p-${p.id}`} data-reveal>
      <p className="project__index">P/0{index + 1}</p>
      <h3 className="project__name" id={`p-${p.id}`}>
        {p.name}
      </h3>
      <p className="project__tagline">{p.tagline}</p>
      <p className="project__why">{p.why}</p>

      <div className="stepper">
        <p className="label">How it works</p>
        <div className="stepper__tabs" role="tablist" aria-label={`How ${p.name} works`}>
          {p.steps.map((s, i) => (
            <button className={`stepper__tab ${i <= stepIndex ? 'is-done' : ''}`} key={s.name} {...tabProps(s.name)}>
              <span className="stepper__dot" aria-hidden="true" />
              {s.name}
            </button>
          ))}
        </div>
        <p className="stepper__body" key={step.name} {...panelProps}>
          {step.body}
        </p>
      </div>

      <p className="project__proof">
        <span aria-hidden="true">→ </span>
        {p.proof}
      </p>

      <footer className="project__foot">
        <ul className="chips" aria-label={`${p.name} stack`}>
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
  );
}

export function Projects() {
  return (
    <section className="section section--tint" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <Head id="projects-title" index="04" kicker="Projects">
          Built <em>from scratch.</em>
        </Head>
        <div className="projects">
          {projects.map((p, i) => (
            <ProjectCard p={p} index={i} key={p.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- contact */

export function Contact() {
  const { email, linkedin, github, resume } = profile.links;
  const links = [
    { icon: <LinkedinIcon size={16} />, label: 'LinkedIn', href: linkedin },
    { icon: <GithubIcon size={16} />, label: 'GitHub', href: github },
    { icon: <FileText size={16} aria-hidden="true" />, label: 'Resume', href: resume },
  ];
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact__inner" data-reveal>
        <p className="eyebrow">
          <span className="eyebrow__index">05</span> Contact
        </p>
        <h2 className="contact__title" id="contact-title">
          Have a hard problem? <em>Let’s talk.</em>
        </h2>

        <a className="contact__email" href={`mailto:${email}`}>
          <Mail size={22} aria-hidden="true" />
          {email}
        </a>

        <ul className="contact__links">
          {links.map((l) => (
            <li key={l.label}>
              <a className="btn" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.icon} {l.label} <ArrowUpRight size={14} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="open">
          <p className="open__status">
            <span className="status__dot" aria-hidden="true" />
            {availability.short.join(' · ')}
          </p>
          <ul className="chips" aria-label="Roles I am open to">
            {availability.roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>
          {profile.title} · {profile.company}
        </p>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
