import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { availability, profile } from '../../data/portfolio';

export function Hero() {
  return (
    <section id="intro" className="chapter hero" data-chapter data-stop="0" aria-labelledby="hero-title">
      <div className="hero__inner shell">
        <div className="hero__meta hero__top">
          <p className="eyebrow" data-intro>
            <span className="eyebrow__dot" aria-hidden="true" /> Portfolio · {profile.location}
          </p>
          <a className="status-pill" href="#contact" data-intro>
            <span className="pulse" aria-hidden="true" />
            <span>
              {availability.facts[0].value} · {availability.facts[1].value} · {availability.facts[3].value}
            </span>
          </a>
        </div>

        <h1 className="hero__name" id="hero-title" data-reveal="lines">
          <span className="line">
            <span>{profile.firstName}</span>
          </span>
          <span className="line">
            <span>{profile.lastName}</span>
          </span>
        </h1>

        <div className="hero__meta hero__lede">
          <p className="hero__role" data-intro>
            {profile.role} <span className="muted">at {profile.company}</span>
          </p>
          <p className="hero__tagline" data-intro>
            {profile.tagline}
          </p>
        </div>

        <div className="hero__actions">
          <a className="btn btn--primary" href="#journey" data-intro>
            Explore My Journey <ArrowDown size={16} aria-hidden="true" />
          </a>
          <a className="btn btn--ghost" href="#projects" data-intro>
            View Projects <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      <a className="scroll-cue" href="#journey" aria-label="Scroll to the journey">
        <span className="scroll-cue__track" aria-hidden="true">
          <span className="scroll-cue__dot" />
        </span>
        <span className="scroll-cue__text">Scroll</span>
      </a>
    </section>
  );
}
