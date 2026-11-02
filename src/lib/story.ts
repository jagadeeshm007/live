/**
 * Shared, mutable animation state. ScrollTrigger writes targets here; the
 * render loop reads them every frame. Kept outside React on purpose so that
 * scrolling never triggers React re-renders.
 */

/** Number of 3D "stops" (formations). Each maps to a DOM element with data-stop. */
export const STOP_COUNT = 9;

export const STOP_NAMES = [
  'ARRIVAL',
  'ORIGIN',
  'TOOLKIT',
  'PRODUCTION',
  'LATTE',
  'NEMO',
  'PRINCIPLES',
  'FRONTIER',
  'SIGNAL',
] as const;

export const story = {
  /** Per-stop transition progress (index 0 unused). Sum = target stop position. */
  transitions: new Array<number>(STOP_COUNT).fill(0),
  /** Continuous stop position 0..STOP_COUNT-1, written by ScrollTrigger. */
  target: 0,
  /** Skill cluster focus: -1 overview, 0..5 clusters. */
  focus: -1,
  /** Philosophy chaos → order, 0..1. */
  order: 0,
  /** Normalised pointer position -1..1. */
  pointer: { x: 0, y: 0 },
  /** HUD element the render loop writes coordinates into. */
  hud: null as HTMLElement | null,
  /** Called by the canvas when it needs a frame (demand mode). */
  invalidate: null as null | (() => void),
};

export function recomputeTarget() {
  let sum = 0;
  for (let i = 1; i < STOP_COUNT; i++) sum += story.transitions[i];
  story.target = sum;
  story.invalidate?.();
}
