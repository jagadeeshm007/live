export type Tier = 'mobile' | 'tablet' | 'desktop';

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function getTier(): Tier {
  if (typeof window === 'undefined') return 'desktop';
  const w = window.innerWidth;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  if (w < 768) return 'mobile';
  if (w < 1100 || coarse) return 'tablet';
  return 'desktop';
}

let webglCache: boolean | null = null;
export function hasWebGL(): boolean {
  if (webglCache !== null) return webglCache;
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    webglCache = !!gl;
    (gl as WebGLRenderingContext | null)?.getExtension('WEBGL_lose_context')?.loseContext();
  } catch {
    webglCache = false;
  }
  return webglCache;
}

export function particleBudget(tier: Tier): number {
  const cores = navigator.hardwareConcurrency || 4;
  const base = tier === 'desktop' ? 16000 : tier === 'tablet' ? 9000 : 5000;
  return cores <= 4 ? Math.round(base * 0.6) : base;
}
