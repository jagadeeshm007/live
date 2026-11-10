import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { profile } from '../data/portfolio';

export const navItems = [
  { id: 'approach', label: 'Approach' },
  { id: 'work', label: 'Experience' },
  { id: 'skills', label: 'Toolkit' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav__inner">
        <a className="nav__logo" href="#top" aria-label={`${profile.name}, back to top`}>
          <span className="nav__mark" aria-hidden="true" />
          <span className="nav__name">JAGADEESH MANDALA</span>
        </a>
        <nav aria-label="Primary" className={`nav__links ${open ? 'is-open' : ''}`} id="primary-nav">
          {navItems.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={active === n.id ? 'true' : undefined}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
          <a className="nav__cta" href={profile.links.resume} target="_blank" rel="noopener noreferrer">
            Resume<span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
        </nav>
        <button
          className="nav__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <div className="nav__progress" id="progress" aria-hidden="true" />
    </header>
  );
}
