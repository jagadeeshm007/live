import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { STOP_COUNT, STOP_NAMES, story } from '../lib/story';
import type { Tier } from '../lib/device';
import { clusterCenters } from './formations';
import { live } from './live';

/**
 * The single scene controller: damps the scroll-driven targets, then derives
 * camera position, look target and frame offset deterministically from them.
 * Same scroll position → same frame, in either direction.
 */

type Key = { cam: [number, number, number]; look: [number, number, number]; shift: number };

// `shift` moves the subject right of centre on wide screens so text can sit left.
const KEYS: Key[] = [
  { cam: [0, 0.25, 7.2], look: [0, 0, 0], shift: 0.2 }, // arrival
  { cam: [-3.6, 1.8, 6.6], look: [0.4, 0.1, 0], shift: 0.2 }, // origin
  { cam: [0, 3.2, 10.5], look: [0, -0.2, 0], shift: 0.2 }, // toolkit (overridden by focus)
  { cam: [6.4, 3.8, 7.8], look: [0, -0.1, 0], shift: 0.2 }, // production
  { cam: [0.4, 0.2, 9.2], look: [0, 0, 0], shift: 0.2 }, // latte
  { cam: [0.8, 6.6, 7.2], look: [0, -0.2, 0], shift: 0.2 }, // nemo
  { cam: [4.8, 3.6, 5.8], look: [0, 0, 0], shift: 0.2 }, // principles
  { cam: [0, 1.3, 7], look: [0, -0.6, -12], shift: 0 }, // frontier
  { cam: [0, 0, 7.4], look: [0, 0, 0], shift: 0 }, // signal
];

const ease = (x: number) => x * x * (3 - 2 * x);
const cluster = new THREE.Vector3();
const outward = new THREE.Vector3();
const UP = new THREE.Vector3(0, 1, 0);
const overviewCam = new THREE.Vector3();
const overviewLook = new THREE.Vector3();

type Props = { tier: Tier; reduced: boolean };

export function CameraRig({ tier, reduced }: Props) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  const tmp = useMemo(
    () => ({
      a: new THREE.Vector3(),
      b: new THREE.Vector3(),
      la: new THREE.Vector3(),
      lb: new THREE.Vector3(),
      cam: new THREE.Vector3(),
      look: new THREE.Vector3(),
      smoothPointer: new THREE.Vector2(),
    }),
    [],
  );
  const lastHud = useRef('');
  const lastAtmo = useRef(-1);

  const distance = tier === 'mobile' ? 1.45 : tier === 'tablet' ? 1.15 : 1;
  const allowShift = tier === 'desktop' || (tier === 'tablet' && size.width > size.height);

  const keyAt = (i: number, cam: THREE.Vector3, look: THREE.Vector3) => {
    const k = KEYS[i];
    cam.fromArray(k.cam);
    look.fromArray(k.look);
    if (i === 2) {
      // Toolkit: travel around the ring to the focused cluster.
      // focus < 0 is the overview of the whole system; 0..5 travels the ring.
      const f = Math.min(5, Math.max(0, live.focus));
      const a = Math.floor(f);
      cluster.lerpVectors(clusterCenters[a], clusterCenters[Math.min(5, a + 1)], ease(f - a));
      outward.copy(cluster).setY(0).normalize();
      overviewCam.fromArray(k.cam);
      overviewLook.fromArray(k.look);
      cam.copy(cluster).addScaledVector(outward, 3.6).add(UP);
      look.copy(cluster).multiplyScalar(0.55);
      const o = ease(Math.min(1, Math.max(0, -live.focus)));
      cam.lerp(overviewCam, o);
      look.lerp(overviewLook, o);
    }
    if (i !== 7) {
      cam.multiplyScalar(distance);
    }
  };

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1);
    if (!live.initialised) {
      live.p = story.target;
      live.focus = story.focus;
      live.order = story.order;
      live.initialised = true;
    }
    if (reduced) {
      // No camera travel: snap between chapters.
      live.p = Math.round(story.target);
      live.focus = Math.round(story.focus);
      live.order = 1;
    } else {
      const k = 1 - Math.exp(-delta * 3.2);
      live.p += (story.target - live.p) * k;
      live.focus += (story.focus - live.focus) * k;
      live.order += (story.order - live.order) * k;
    }

    const p = Math.min(STOP_COUNT - 1, Math.max(0, live.p));
    const i = Math.min(STOP_COUNT - 2, Math.floor(p));
    const f = ease(p - i);
    keyAt(i, tmp.a, tmp.la);
    keyAt(i + 1, tmp.b, tmp.lb);
    tmp.cam.lerpVectors(tmp.a, tmp.b, f);
    tmp.look.lerpVectors(tmp.la, tmp.lb, f);

    if (!reduced && tier !== 'mobile') {
      tmp.smoothPointer.lerp(story.pointer as unknown as THREE.Vector2, 1 - Math.exp(-delta * 2.5));
      tmp.cam.x += tmp.smoothPointer.x * 0.35;
      tmp.cam.y += tmp.smoothPointer.y * 0.22;
    }

    camera.position.copy(tmp.cam);
    camera.lookAt(tmp.look);

    // Frame offset: shift subject right on wide layouts.
    const shift = allowShift ? KEYS[i].shift + (KEYS[i + 1].shift - KEYS[i].shift) * f : 0;
    const w = size.width;
    const h = size.height;
    // On phones, lift the subject into the upper part of the screen instead.
    const lift = tier === 'mobile' ? 0.14 : 0;
    if (shift > 0.001 || lift > 0) camera.setViewOffset(w, h, -shift * w, lift * h, w, h);
    else camera.clearViewOffset();

    // HUD annotation (direct DOM write, no React state).
    if (story.hud) {
      const name = STOP_NAMES[Math.round(p)];
      const s = `${name}  ·  X ${camera.position.x.toFixed(2)}  Y ${camera.position.y.toFixed(2)}  Z ${camera.position.z.toFixed(2)}`;
      if (s !== lastHud.current) {
        story.hud.textContent = s;
        lastHud.current = s;
      }
    }

    // Atmosphere: warm glow drifts with the journey (CSS variable, throttled).
    const atmo = Math.round(p * 50) / 50;
    if (atmo !== lastAtmo.current) {
      lastAtmo.current = atmo;
      document.documentElement.style.setProperty('--journey', atmo.toFixed(2));
    }
  });

  return null;
}
