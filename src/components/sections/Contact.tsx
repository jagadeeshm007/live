import { ArrowUpRight, FileText, Mail } from 'lucide-react';
import { availability, profile } from '../../data/portfolio';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import { ChapterTag, Lines } from '../ui/Lines';

export function Contact() {
  const { email, linkedin, github, resume } = profile.links;
  return (
    <section id="contact" className="chapter contact" data-chapter data-stop="8" aria-labelledby="contact-title">
      <div className="shell contact__inner">
        <ChapterTag index="08" label="Contact" />
        <Lines
          as="h2"
          id="contact-title"
          lines={["Let's build", <em key="e">something</em>, 'meaningful.']}
          className="display display--xl display--center"
        />
        <p className="lede lede--center" data-reveal="fade">
          Interested in discussing software engineering, interesting technical problems, or opportunities to
          collaborate? My inbox is open.
        </p>

        <a className="contact__email" href={`mailto:${email}`} data-reveal="fade">
          <Mail size={20} aria-hidden="true" />
          {email}
        </a>

        <ul className="contact__links" data-reveal="stagger">
          <li>
            <a className="btn btn--ghost" href={linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinIcon size={16} /> LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a className="btn btn--ghost" href={github} target="_blank" rel="noopener noreferrer">
              <GithubIcon size={16} /> GitHub <ArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a className="btn btn--ghost" href={resume} target="_blank" rel="noopener noreferrer">
              <FileText size={16} aria-hidden="true" /> Resume (PDF)
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        </ul>

        <section className="avail" aria-labelledby="avail-title" data-reveal="fade">
          <h3 className="avail__title" id="avail-title">
            <span className="pulse" aria-hidden="true" /> {availability.headline}
          </h3>
          <dl className="avail__facts">
            {availability.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="label avail__roles-label">Roles I’m open to</p>
          <ul className="avail__roles">
            {availability.roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="muted">Built with React, Three.js and GSAP.</p>
        <a href="#intro">Back to top ↑</a>
      </div>
    </footer>
  );
}
