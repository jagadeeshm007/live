import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { buildFormations } from './formations';
import { live } from './live';
import { palette } from './palette';

const vertex = /* glsl */ `
uniform float uP;
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
uniform float uFocus;
uniform float uOrder;
uniform float uIntro;
uniform float uMotion;

attribute vec3 aP1;
attribute vec3 aP2;
attribute vec3 aP3;
attribute vec3 aP4;
attribute vec3 aP5;
attribute vec3 aP6;
attribute vec3 aP7;
attribute vec3 aP8;
attribute vec4 aRand;
attribute float aSeed;

varying float vAlpha;
varying float vAccent;

float w(float lp, float i) {
  return smoothstep(0.0, 1.0, clamp(1.0 - abs(lp - i), 0.0, 1.0));
}

void main() {
  // Per-particle staggered progress inside the current transition only,
  // so every particle rests exactly on its formation between transitions.
  float i0 = min(floor(uP), 7.0);
  float f = clamp(uP - i0, 0.0, 1.0);
  float fs = clamp((f - aSeed * 0.35) / 0.65, 0.0, 1.0);
  float lp = i0 + fs;

  float w0 = w(lp, 0.0), w1 = w(lp, 1.0), w2 = w(lp, 2.0), w3 = w(lp, 3.0), w4 = w(lp, 4.0);
  float w5 = w(lp, 5.0), w6 = w(lp, 6.0), w7 = w(lp, 7.0), w8 = w(lp, 8.0);

  vec3 pos = position * w0 + aP1 * w1 + aP2 * w2 + aP3 * w3 + aP4 * w4
           + aP5 * w5 + aP6 * w6 + aP7 * w7 + aP8 * w8;

  // Mid-transition dispersion: particles lift off, travel, then settle.
  float travel = sin(3.14159265 * fs);
  pos += aRand.xyz * travel * 0.85 * uMotion;

  // Principles: disorder resolves into the lattice as the visitor reads.
  pos += aRand.xyz * 3.2 * w6 * (1.0 - uOrder);

  // Ambient drift.
  pos += 0.035 * uMotion * vec3(
    sin(uTime * 0.6 + aSeed * 40.0),
    cos(uTime * 0.5 + aSeed * 31.0),
    sin(uTime * 0.4 + aSeed * 17.0));

  // Arrival: particles condense from a wide cloud.
  pos = mix(aRand.xyz * 14.0, pos, uIntro);

  // Toolkit focus: the active cluster is bright, the others recede.
  float focusMask = 1.0 - clamp(abs(aRand.w - uFocus), 0.0, 1.0);
  float overview = clamp(-uFocus, 0.0, 1.0);
  focusMask *= 1.0 - overview;
  float focus = mix(mix(1.0, 0.22 + 1.1 * focusMask, w2), 1.0, overview);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  float depth = -mv.z;
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (0.45 + aSeed * 0.9) * uPixelRatio * (1.0 + 0.5 * focusMask * w2) * (1.0 + 1.6 * w7) / max(depth, 0.5);

  float far = clamp(1.0 - (depth - 7.0) / mix(34.0, 60.0, w7), 0.15, 1.0);
  float near = smoothstep(0.4, 2.2, depth);
  vAlpha = far * near * focus * (0.55 + 0.45 * uIntro);
  vAccent = step(0.9, fract(aSeed * 7.13));
}
`;

const fragment = /* glsl */ `
uniform vec3 uBase;
uniform vec3 uAccent;
uniform float uOpacity;
varying float vAlpha;
varying float vAccent;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  a *= a;
  vec3 col = mix(uBase, uAccent, vAccent);
  gl_FragColor = vec4(col, a * vAlpha * uOpacity * mix(0.75, 1.4, vAccent));
}
`;

type Props = { count: number; opacity: number; reduced: boolean };

export function ParticleField({ count, opacity, reduced }: Props) {
  const gl = useThree((s) => s.gl);
  const pointsRef = useRef<THREE.Points>(null);
  const intro = useRef(reduced ? 1 : 0);

  const geometry = useMemo(() => {
    const data = buildFormations(count);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(data.positions[0], 3));
    for (let i = 1; i < data.positions.length; i++) {
      g.setAttribute(`aP${i}`, new THREE.BufferAttribute(data.positions[i], 3));
    }
    g.setAttribute('aRand', new THREE.BufferAttribute(data.rand, 4));
    g.setAttribute('aSeed', new THREE.BufferAttribute(data.seed, 1));
    // Formations span a large volume (horizon); avoid incorrect culling.
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 60);
    return g;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uP: { value: 0 },
          uTime: { value: 0 },
          uSize: { value: 26 },
          uPixelRatio: { value: 1 },
          uFocus: { value: 0 },
          uOrder: { value: 0 },
          uIntro: { value: intro.current },
          uMotion: { value: reduced ? 0 : 1 },
          uBase: { value: new THREE.Color(palette.bone) },
          uAccent: { value: new THREE.Color(palette.accent) },
          uOpacity: { value: opacity },
        },
      }),
    [],
  );

  useEffect(() => {
    material.uniforms.uOpacity.value = opacity;
    material.uniforms.uMotion.value = reduced ? 0 : 1;
  }, [material, opacity, reduced]);

  useEffect(
    () => () => {
      geometry.dispose();
    },
    [geometry],
  );
  useEffect(() => () => material.dispose(), [material]);

  useFrame((state, delta) => {
    const u = material.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uPixelRatio.value = gl.getPixelRatio();
    u.uP.value = live.p;
    u.uFocus.value = live.focus;
    u.uOrder.value = live.order;
    if (intro.current < 1) {
      intro.current = Math.min(1, intro.current + delta / 1.8);
      const t = intro.current;
      u.uIntro.value = 1 - Math.pow(1 - t, 3);
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />;
}
