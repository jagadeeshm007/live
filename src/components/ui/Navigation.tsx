import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { chapters, profile, type ChapterId } from '../../data/portfolio';

type Props = { active: ChapterId; progressRef: React.RefObject<HTMLDivElement | null> };

export function Navigation({ active, progressRef }: Props) {
  const [open, setOpen] = useState(false);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('menu-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('menu-open');
    };
  }, [open]);

  const current = chapters.find((c) => c.id === active) ?? chapters[0];

  return (
    <>
      <header className="topbar">
        <a className="topbar__mark" href="#intro" aria-label={`${profile.name} — back to start`}>
          <span className="topbar__mono">JM</span>
          <span className="topbar__name">{profile.name}</span>
        </a>
        <p className="topbar__status" aria-live="polite">
          <span className="topbar__index">{current.index}</span> / {current.label}
        </p>
        <div className="topbar__actions">
          <a className="btn btn--ghost btn--sm topbar__cta" href="#contact">
            Contact
          </a>
          <button
            ref={toggle}
            className="icon-btn"
            type="button"
            aria-expanded={open}
            aria-controls="chapter-menu"
            aria-label={open ? 'Close chapter menu' : 'Open chapter menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className="progress" aria-hidden="true">
          <div className="progress__fill" ref={progressRef} />
        </div>
      </header>

      {/* Desktop chapter rail */}
      <nav className="rail" aria-label="Chapters">
        <ol>
          {chapters.map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`} aria-current={active === c.id ? 'true' : undefined}>
                <span className="rail__index">{c.index}</span>
                <span className="rail__label">{c.label}</span>
                <span className="rail__tick" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Full chapter menu (all sizes) */}
      <div
        id="chapter-menu"
        className={`menu ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Chapter menu"
        hidden={!open}
      >
        <nav aria-label="All chapters">
          <ol className="menu__list">
            {chapters.map((c, i) => (
              <li key={c.id}>
                <a
                  ref={i === 0 ? firstLink : undefined}
                  href={`#${c.id}`}
                  aria-current={active === c.id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="menu__index">{c.index}</span>
                  <span className="menu__label">{c.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <p className="menu__foot">
          <a href={`mailto:${profile.links.email}`}>{profile.links.email}</a>
        </p>
      </div>
    </>
  );
}
