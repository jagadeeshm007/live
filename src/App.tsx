import { useCallback, useState } from 'react';
import { Navbar, navItems } from './components/Navbar';
import { Hero } from './components/Hero';
import { About, Contact, Experience, Footer, Principles, Projects, Skills } from './components/Sections';
import { useActiveSection, useReveal } from './hooks/useReveal';

const sectionIds = navItems.map((n) => n.id);

export default function App() {
  const [active, setActive] = useState('');
  const onChange = useCallback((id: string) => setActive(id), []);
  useReveal();
  useActiveSection(sectionIds, onChange);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar active={active} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
