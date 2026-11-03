/** Smoothed values the render loop derives from `story` each frame. */
export const live = {
  p: 0,
  focus: 0,
  milestone: -1,
  order: 0,
  initialised: false,
};

/** Smoothstep weight of stop `i` at continuous position `p`. */
export function stopWeight(p: number, i: number) {
  const x = Math.min(1, Math.max(0, 1 - Math.abs(p - i)));
  return x * x * (3 - 2 * x);
}
