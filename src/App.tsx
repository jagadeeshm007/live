import { Component, Suspense, lazy, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Navigation } from './components/ui/Navigation';
import { Hud } from './components/ui/Hud';
import { Hero } from './components/sections/Hero';
import { Journey } from './components/sections/Journey';
import { Toolkit } from './components/sections/Toolkit';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Philosophy } from './components/sections/Philosophy';
import { Frontier } from './components/sections/Frontier';
import { Contact, Footer } from './components/sections/Contact';
import { useStoryScroll } from './lib/useStoryScroll';
import { hasWebGL, prefersReducedMotion } from './lib/device';
import type { ChapterId } from './data/portfolio';

// Three.js is code-split: text and navigation are usable before it arrives.
const ExperienceCanvas = lazy(() => import('./three/ExperienceCanvas'));

class CanvasBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

export default function App() {
  const reduced = useReducedMotion();
  const [webgl, setWebgl] = useState(() => hasWebGL());
  const [active, setActive] = useState<ChapterId>('intro');
  const progressRef = useRef<HTMLDivElement>(null);
  const onChapter = useCallback((id: ChapterId) => setActive(id), []);
  const fail = useCallback(() => setWebgl(false), []);

  useStoryScroll({ reduced, onChapter, progressEl: progressRef });

  useEffect(() => {
    document.documentElement.classList.toggle('no-webgl', !webgl);
    document.documentElement.classList.toggle('reduced-motion', reduced);
  }, [webgl, reduced]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="atmosphere" aria-hidden="true">
        <div className="atmosphere__glow" />
        <div className="atmosphere__grid" />
      </div>

      {webgl && (
        <CanvasBoundary onError={fail}>
          <Suspense fallback={null}>
            <ExperienceCanvas reduced={reduced} onFail={fail} />
          </Suspense>
        </CanvasBoundary>
      )}
      <div className="veil" aria-hidden="true" />

      <Navigation active={active} progressRef={progressRef} />
      <Hud webgl={webgl} />

      <main id="main" tabIndex={-1}>
        <Hero />
        <Journey />
        <Toolkit />
        <Experience />
        <Projects />
        <Philosophy />
        <Frontier />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
