import * as THREE from 'three';

/**
 * Procedural particle formations — one per story stop. Every formation has the
 * same particle count so the shader can morph any particle between them.
 * All generation is deterministic (seeded) so forward/backward scroll and
 * reloads produce identical scenes.
 */

export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type R = () => number;
const gauss = (r: R) => {
  const u = Math.max(r(), 1e-6);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r());
};
const randDir = (r: R, out = new THREE.Vector3()) => {
  const z = r() * 2 - 1;
  const t = r() * Math.PI * 2;
  const s = Math.sqrt(1 - z * z);
  return out.set(s * Math.cos(t), s * Math.sin(t), z);
};

/* ------------------------------------------------------------------ anchors */

/** Origin: milestones along a rising path (one per journey item). */
export const pathPoints = [
  new THREE.Vector3(-4.2, -1.5, 1.2),
  new THREE.Vector3(-2.6, -0.6, -0.4),
  new THREE.Vector3(-0.9, -0.2, 0.8),
  new THREE.Vector3(0.7, 0.5, -0.7),
  new THREE.Vector3(2.3, 0.7, 0.4),
  new THREE.Vector3(3.9, 1.7, -0.5),
];
export const pathCurve = new THREE.CatmullRomCurve3(pathPoints, false, 'catmullrom', 0.5);

/** Toolkit: six cluster centres on a ring. */
export const clusterCenters = Array.from({ length: 6 }, (_, k) => {
  const a = (k / 6) * Math.PI * 2 + Math.PI / 2;
  return new THREE.Vector3(Math.cos(a) * 3.1, k % 2 === 0 ? 0.55 : -0.55, Math.sin(a) * 3.1);
});
/** Meaningful links between toolkit groups (indices into skillGroups). */
export const clusterLinks: [number, number][] = [
  [0, 1], [0, 5], [1, 2], [1, 3], [3, 4], [5, 1], [2, 4], [0, 3],
];

/** Production: four architectural layers (client → API → services → data). */
export const layerY = [1.8, 0.6, -0.6, -1.8];
export const layerSize = { x: 2.8, z: 1.7 };
export const pipeColumns = [
  [-1.8, -0.8], [-0.6, 0.9], [0.7, -0.5], [1.9, 0.6],
] as const;

/** Nemo: gateway hub, six services, three LLM providers. */
export const nemoServices = Array.from({ length: 6 }, (_, k) => {
  const a = (k / 6) * Math.PI * 2;
  return new THREE.Vector3(Math.cos(a) * 2.7, 0, Math.sin(a) * 2.7);
});
export const nemoProviders = Array.from({ length: 3 }, (_, k) => {
  const a = -0.55 + k * 0.55;
  return new THREE.Vector3(Math.cos(a) * 4.3, 1.1, Math.sin(a) * 4.3);
});

/** Philosophy lattice. */
export const LATTICE = 8;
export const LATTICE_STEP = 0.5;

/* --------------------------------------------------------------- formations */

type Gen = (n: number, r: R, out: Float32Array, groups?: Float32Array) => void;

const core: Gen = (n, r, out) => {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const tilt = new THREE.Euler(0.45, 0, 0.25);
  const v = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    const u = r();
    if (u < 0.68) {
      // fibonacci shell
      const y = 1 - (i / (n - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = golden * i;
      const R = 1.55 + gauss(r) * 0.02;
      v.set(Math.cos(th) * rad * R, y * R, Math.sin(th) * rad * R);
    } else if (u < 0.9) {
      // orbit ring
      const a = r() * Math.PI * 2;
      const R = 2.45 + gauss(r) * 0.05;
      v.set(Math.cos(a) * R, gauss(r) * 0.015, Math.sin(a) * R).applyEuler(tilt);
    } else {
      // dense nucleus
      randDir(r, v).multiplyScalar(Math.pow(r(), 2) * 0.7);
    }
    v.toArray(out, i * 3);
  }
};

const origin: Gen = (n, r, out) => {
  const v = new THREE.Vector3();
  const len = pathPoints.length;
  for (let i = 0; i < n; i++) {
    if (r() < 0.32) {
      const m = pathPoints[Math.floor(r() * len)];
      randDir(r, v).multiplyScalar(0.06 + Math.pow(r(), 1.6) * 0.32).add(m);
    } else {
      const t = r();
      pathCurve.getPointAt(t, v);
      const spread = 0.04 + Math.pow(r(), 3) * (0.25 + t * 0.35);
      v.x += gauss(r) * spread;
      v.y += gauss(r) * spread;
      v.z += gauss(r) * spread;
    }
    v.toArray(out, i * 3);
  }
};

const toolkit: Gen = (n, r, out, groups) => {
  const v = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    const k = i % 6;
    groups![i] = k;
    if (r() < 0.86) {
      randDir(r, v).multiplyScalar(0.12 + Math.abs(gauss(r)) * 0.32).add(clusterCenters[k]);
    } else {
      // particles travelling along links
      const [a, b] = clusterLinks[Math.floor(r() * clusterLinks.length)];
      v.lerpVectors(clusterCenters[a], clusterCenters[b], r());
      v.x += gauss(r) * 0.03;
      v.y += gauss(r) * 0.03;
      v.z += gauss(r) * 0.03;
      groups![i] = r() < 0.5 ? a : b;
    }
    v.toArray(out, i * 3);
  }
};

const production: Gen = (n, r, out) => {
  const v = new THREE.Vector3();
  const grid = 0.2;
  for (let i = 0; i < n; i++) {
    if (r() < 0.8) {
      const y = layerY[Math.floor(r() * 4)];
      const x = Math.round(((r() * 2 - 1) * layerSize.x) / grid) * grid;
      const z = Math.round(((r() * 2 - 1) * layerSize.z) / grid) * grid;
      v.set(x + gauss(r) * 0.006, y + gauss(r) * 0.006, z + gauss(r) * 0.006);
    } else {
      const [x, z] = pipeColumns[Math.floor(r() * pipeColumns.length)];
      v.set(x + gauss(r) * 0.025, layerY[3] + r() * (layerY[0] - layerY[3]), z + gauss(r) * 0.025);
    }
    v.toArray(out, i * 3);
  }
};

/** Speech envelope used by Latte's waveform. Speaker A when > 0. */
export function speech(x: number) {
  const turn = Math.sin(x * 0.85 + 0.4);
  const env = Math.abs(Math.sin(x * 2.7) * Math.sin(x * 1.13 + 1.2)) * 0.75 + 0.08;
  return { speakerA: turn > 0, amp: env * Math.min(1, Math.abs(turn) * 3) };
}

const latte: Gen = (n, r, out) => {
  const v = new THREE.Vector3();
  const columns = 150;
  for (let i = 0; i < n; i++) {
    if (r() < 0.9) {
      const c = Math.floor(r() * columns);
      const x = -4.2 + (c / (columns - 1)) * 8.4;
      const { speakerA, amp } = speech(x);
      const base = speakerA ? 0.75 : -0.75;
      const y = base + (r() * 2 - 1) * amp;
      v.set(x + gauss(r) * 0.004, y, gauss(r) * 0.05);
    } else {
      // transcript baselines
      const x = -4.2 + r() * 8.4;
      v.set(x, (r() < 0.5 ? 0.75 : -0.75) + gauss(r) * 0.005, 0);
    }
    v.toArray(out, i * 3);
  }
};

const nemo: Gen = (n, r, out) => {
  const v = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    const u = r();
    if (u < 0.18) {
      randDir(r, v).multiplyScalar(0.2 + Math.pow(r(), 0.6) * 0.38);
    } else if (u < 0.6) {
      const s = nemoServices[Math.floor(r() * 6)];
      randDir(r, v).multiplyScalar(0.08 + Math.pow(r(), 0.8) * 0.3).add(s);
    } else if (u < 0.88) {
      const s = nemoServices[Math.floor(r() * 6)];
      v.copy(s).multiplyScalar(0.12 + r() * 0.76);
      v.y += gauss(r) * 0.015;
    } else {
      const p = nemoProviders[Math.floor(r() * 3)];
      if (r() < 0.6) randDir(r, v).multiplyScalar(0.05 + r() * 0.2).add(p);
      else v.lerpVectors(nemoServices[0], p, r());
    }
    v.toArray(out, i * 3);
  }
};

const lattice: Gen = (n, _r, out) => {
  const half = ((LATTICE - 1) * LATTICE_STEP) / 2;
  const cells = LATTICE * LATTICE * LATTICE;
  const r = rng(77);
  for (let i = 0; i < n; i++) {
    const c = i % cells;
    const x = c % LATTICE;
    const y = Math.floor(c / LATTICE) % LATTICE;
    const z = Math.floor(c / (LATTICE * LATTICE));
    out[i * 3] = x * LATTICE_STEP - half + gauss(r) * 0.012;
    out[i * 3 + 1] = y * LATTICE_STEP - half + gauss(r) * 0.012;
    out[i * 3 + 2] = z * LATTICE_STEP - half + gauss(r) * 0.012;
  }
};

const frontier: Gen = (n, r, out) => {
  for (let i = 0; i < n; i++) {
    let x: number, y: number, z: number;
    if (r() < 0.78) {
      y = -1.5;
      if (r() < 0.5) {
        x = Math.round((r() * 2 - 1) * 16);
        z = 4 - r() * 46;
      } else {
        x = (r() * 2 - 1) * 16;
        z = 4 - Math.round(r() * 46);
      }
    } else {
      x = (r() * 2 - 1) * 26;
      y = -0.5 + Math.pow(r(), 1.4) * 14;
      z = -14 - r() * 34;
    }
    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }
};

const signal: Gen = (n, r, out) => {
  const v = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    if (r() < 0.82) {
      const a = r() * Math.PI * 2;
      const R = 2.35 + gauss(r) * 0.035;
      v.set(Math.cos(a) * R, Math.sin(a) * R, gauss(r) * 0.035);
    } else {
      randDir(r, v).multiplyScalar(4 + r() * 5);
    }
    v.toArray(out, i * 3);
  }
};

const generators: Gen[] = [core, origin, toolkit, production, latte, nemo, lattice, frontier, signal];

export type FormationData = {
  positions: Float32Array[];
  rand: Float32Array; // vec4: random dir xyz, toolkit group w
  seed: Float32Array;
};

export function buildFormations(n: number): FormationData {
  const groups = new Float32Array(n);
  const positions = generators.map((g, idx) => {
    const out = new Float32Array(n * 3);
    g(n, rng(1000 + idx * 97), out, groups);
    return out;
  });
  const r = rng(4242);
  const rand = new Float32Array(n * 4);
  const seed = new Float32Array(n);
  const v = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    randDir(r, v).multiplyScalar(0.4 + r() * 0.6);
    rand[i * 4] = v.x;
    rand[i * 4 + 1] = v.y;
    rand[i * 4 + 2] = v.z;
    rand[i * 4 + 3] = groups[i];
    seed[i] = r();
  }
  return { positions, rand, seed };
}
