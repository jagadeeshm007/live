import { useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STOP_COUNT, recomputeTarget, story } from './story';
import type { ChapterId } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

type Options = {
  reduced: boolean;
  onChapter: (id: ChapterId) => void;
  progressEl: React.RefObject<HTMLElement | null>;
};

/**
 * The centralised scroll choreography. One place owns every ScrollTrigger:
 *  - stop transitions (drive the 3D formation + camera),
 *  - toolkit focus and principles order (sub-progress inside chapters),
 *  - active chapter + progress bar for navigation,
 *  - DOM reveal animations.
 * Everything is created inside a gsap.context and reverted on unmount, so
 * React re-renders and StrictMode never duplicate timelines.
 */
export function useStoryScroll({ reduced, onChapter, progressEl }: Options) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ---- 3D stops -------------------------------------------------------
      const stops = gsap.utils.toArray<HTMLElement>('[data-stop]');
      stops.forEach((el) => {
        const i = Number(el.dataset.stop);
        if (!i || i >= STOP_COUNT) return;
        const set = (p: number) => {
          story.transitions[i] = p;
          recomputeTarget();
        };
        ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'top 30%',
          onUpdate: (self) => set(self.progress),
          onRefresh: (self) => set(self.progress),
        });
      });

      // ---- Toolkit cluster focus -----------------------------------------
      const groups = gsap.utils.toArray<HTMLElement>('[data-skill]');
      // Starts at -1 (overview of the whole system), then +1 per group.
      const focusParts = new Array(groups.length).fill(0);
      groups.forEach((el, k) => {
        const set = (p: number) => {
          focusParts[k] = p;
          story.focus = focusParts.reduce((a, b) => a + b, 0) - 1;
          story.invalidate?.();
        };
        ScrollTrigger.create({
          trigger: el,
          start: 'top 70%',
          end: 'top 40%',
          onUpdate: (self) => set(self.progress),
          onRefresh: (self) => set(self.progress),
        });
      });

      // ---- Principles: chaos → order --------------------------------------
      const phil = document.querySelector<HTMLElement>('#philosophy');
      if (phil) {
        const set = (p: number) => {
          story.order = p;
          story.invalidate?.();
        };
        ScrollTrigger.create({
          trigger: phil,
          start: 'top 45%',
          end: 'bottom 75%',
          onUpdate: (self) => set(self.progress),
          onRefresh: (self) => set(self.progress),
        });
      }

      // ---- Chapter tracking + progress -----------------------------------
      gsap.utils.toArray<HTMLElement>('[data-chapter]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: (self) => self.isActive && onChapter(el.id as ChapterId),
        });
      });
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          if (progressEl.current) progressEl.current.style.transform = `scaleX(${self.progress.toFixed(4)})`;
        },
      });

      // ---- DOM reveals ----------------------------------------------------
      if (reduced) return;

      gsap.utils.toArray<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
        const inner = el.querySelectorAll('.line > span');
        gsap.from(inner, {
          yPercent: 110,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
        gsap.from(el, {
          y: 36,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="stagger"]').forEach((el) => {
        gsap.from(el.children, {
          y: 28,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      });

      // Scrubbed: the hero typography drifts apart as the camera departs.
      gsap.to('.hero__name .line:first-child', {
        xPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: '#intro', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero__name .line:last-child', {
        xPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: '#intro', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero__meta, .hero__actions, .scroll-cue', {
        autoAlpha: 0,
        y: -40,
        ease: 'none',
        scrollTrigger: { trigger: '#intro', start: '10% top', end: '60% top', scrub: true },
      });

      // Journey: the timeline spine draws as you read.
      gsap.fromTo(
        '.timeline__spine-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: true },
        },
      );

      // Hero intro (short, non-blocking).
      gsap.from('.hero [data-intro]', {
        y: 30,
        autoAlpha: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.09,
        delay: 0.15,
      });
    });

    // The app renders after the browser tried to honour the URL hash, so
    // jump to the anchored chapter ourselves (again once fonts settle).
    const jumpToHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const el = id ? document.getElementById(id) : null;
      if (el && !hashDone) el.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' });
    };
    let hashDone = false;
    const stopHash = () => (hashDone = true);
    window.addEventListener('wheel', stopHash, { passive: true, once: true });
    window.addEventListener('touchstart', stopHash, { passive: true, once: true });
    jumpToHash();

    // Layout can change after fonts/images settle; keep triggers in sync.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready
      .then(() => {
        jumpToHash();
        hashDone = true;
        refresh();
      })
      .catch(() => undefined);
    window.addEventListener('load', refresh);
    let roTimer: number | undefined;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(roTimer);
      roTimer = window.setTimeout(refresh, 150);
    });
    const main = document.querySelector('main');
    if (main) ro.observe(main);

    return () => {
      window.removeEventListener('load', refresh);
      window.removeEventListener('wheel', stopHash);
      window.removeEventListener('touchstart', stopHash);
      ro.disconnect();
      window.clearTimeout(roTimer);
      ctx.revert();
    };
  }, [reduced, onChapter, progressEl]);

  // Pointer parallax input (read by the camera rig).
  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      story.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      story.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced]);
}
