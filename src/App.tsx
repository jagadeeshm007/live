import { useCallback, useEffect, useState } from 'react';
import { Navbar, navItems } from './components/Navbar';
import { Hero } from './components/Hero';
import { Contact, Footer, HowIWork, Numbers, Projects, Skills, Work } from './components/Sections';
import { useActiveSection, useReveal } from './hooks/useReveal';

const sectionIds = navItems.map((n) => n.id);

export default function App() {
  const [active, setActive] = useState('');
  const onChange = useCallback((id: string) => setActive(id), []);
  useReveal();
  useActiveSection(sectionIds, onChange);

  // Thin reading-progress bar under the nav.
  useEffect(() => {
    const bar = document.getElementById('progress');
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar active={active} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Numbers />
        <HowIWork />
        <Work />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
