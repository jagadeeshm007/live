import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  LATTICE,
  LATTICE_STEP,
  clusterCenters,
  clusterLinks,
  layerSize,
  layerY,
  nemoProviders,
  nemoServices,
  pathCurve,
  pathPoints,
  pipeColumns,
} from './formations';
import { live, stopWeight } from './live';
import { palette } from './palette';

/**
 * Thin line structures that give each formation its architectural reading:
 * the path, the dependency graph, the layer outlines, the service topology.
 * Each fades in only around its own stop.
 */

function segments(pairs: [THREE.Vector3, THREE.Vector3][]) {
  const arr = new Float32Array(pairs.length * 6);
  pairs.forEach(([a, b], i) => {
    a.toArray(arr, i * 6);
    b.toArray(arr, i * 6 + 3);
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
  return g;
}

function useLineSet(build: () => THREE.BufferGeometry, color: string) {
  const geometry = useMemo(build, []); // eslint-disable-line react-hooks/exhaustive-deps
  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [color],
  );
  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );
  return { geometry, material };
}

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

export function Structures() {
  const core = useRef<THREE.LineSegments>(null);

  const coreSet = useLineSet(
    () => new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.05, 1)),
    palette.accent,
  );

  const pathSet = useLineSet(() => {
    const pts = pathCurve.getSpacedPoints(160);
    const pairs: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < pts.length - 1; i++) pairs.push([pts[i], pts[i + 1]]);
    // milestone ticks
    pathPoints.forEach((p) => pairs.push([p.clone().setY(p.y - 0.35), p.clone().setY(p.y + 0.35)]));
    return segments(pairs);
  }, palette.bone);

  const graphSet = useLineSet(
    () => segments(clusterLinks.map(([a, b]) => [clusterCenters[a], clusterCenters[b]])),
    palette.bone,
  );

  const layerSet = useLineSet(() => {
    const pairs: [THREE.Vector3, THREE.Vector3][] = [];
    const { x, z } = layerSize;
    layerY.forEach((y) => {
      const c = [V(-x, y, -z), V(x, y, -z), V(x, y, z), V(-x, y, z)];
      for (let i = 0; i < 4; i++) pairs.push([c[i], c[(i + 1) % 4]]);
    });
    pipeColumns.forEach(([px, pz]) => pairs.push([V(px, layerY[3], pz), V(px, layerY[0], pz)]));
    return segments(pairs);
  }, palette.bone);

  const nemoSet = useLineSet(() => {
    const pairs: [THREE.Vector3, THREE.Vector3][] = [];
    nemoServices.forEach((s, i) => {
      pairs.push([V(0, 0, 0), s]);
      pairs.push([s, nemoServices[(i + 1) % 6]]);
    });
    nemoProviders.forEach((p) => pairs.push([nemoServices[0], p]));
    return segments(pairs);
  }, palette.bone);

  const latticeSet = useLineSet(() => {
    const h = ((LATTICE - 1) * LATTICE_STEP) / 2;
    const b = new THREE.BoxGeometry(h * 2, h * 2, h * 2);
    const e = new THREE.EdgesGeometry(b);
    b.dispose();
    return e;
  }, palette.accent);

  useFrame((state, delta) => {
    const p = live.p;
    const t = state.clock.elapsedTime;
    coreSet.material.opacity = 0.22 * stopWeight(p, 0);
    if (core.current) {
      const w = stopWeight(p, 0);
      core.current.rotation.y += delta * 0.12;
      core.current.rotation.x = Math.sin(t * 0.2) * 0.2;
      core.current.scale.setScalar(0.6 + 0.4 * w);
      core.current.visible = w > 0.001;
    }
    pathSet.material.opacity = 0.32 * stopWeight(p, 1);
    graphSet.material.opacity = 0.22 * stopWeight(p, 2);
    layerSet.material.opacity = 0.26 * stopWeight(p, 3);
    nemoSet.material.opacity = 0.26 * stopWeight(p, 5);
    latticeSet.material.opacity = 0.35 * stopWeight(p, 6) * live.order;
    for (const m of [coreSet, pathSet, graphSet, layerSet, nemoSet, latticeSet]) {
      m.material.visible = m.material.opacity > 0.002;
    }
  });

  return (
    <group>
      <lineSegments ref={core} geometry={coreSet.geometry} material={coreSet.material} />
      <lineSegments geometry={pathSet.geometry} material={pathSet.material} />
      <lineSegments geometry={graphSet.geometry} material={graphSet.material} />
      <lineSegments geometry={layerSet.geometry} material={layerSet.material} />
      <lineSegments geometry={nemoSet.geometry} material={nemoSet.material} />
      <lineSegments geometry={latticeSet.geometry} material={latticeSet.material} />
    </group>
  );
}
