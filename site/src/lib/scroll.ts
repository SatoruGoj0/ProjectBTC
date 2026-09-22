/**
 * A tiny mutable store shared between the DOM (Lenis, pointer listeners) and
 * the WebGL frame loop. Deliberately not React state: the 3D scene reads it
 * 60 times a second and must never trigger a re-render to do so.
 */
export const scrollState = {
  /** Scroll offset in pixels. */
  y: 0,
  /** 0 → 1 across the whole document. */
  progress: 0,
  /** 0 → 1 across the first viewport only (drives the hero choreography). */
  hero: 0,
  /** Normalised pointer position, -1 → 1 on each axis. */
  pointerX: 0,
  pointerY: 0,
};

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

/** Smooth, front-loaded easing used for the hero-to-page transition. */
export function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
