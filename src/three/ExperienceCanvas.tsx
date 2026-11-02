import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { CameraRig } from './CameraRig';
import { ParticleField } from './ParticleField';
import { Structures } from './Structures';
import { story } from '../lib/story';
import { getTier, particleBudget, type Tier } from '../lib/device';

function DemandBridge() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    story.invalidate = invalidate;
    return () => {
      story.invalidate = null;
    };
  }, [invalidate]);
  return null;
}

type Props = { reduced: boolean; onFail: () => void };

/** The one shared WebGL canvas for the whole journey. Browser-only; lazy-loaded. */
export default function ExperienceCanvas({ reduced, onFail }: Props) {
  const [tier, setTier] = useState<Tier>(() => getTier());

  useEffect(() => {
    let t: number | undefined;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => setTier(getTier()), 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.clearTimeout(t);
    };
  }, []);

  const count = particleBudget(tier);
  const dpr: [number, number] = tier === 'desktop' ? [1, 1.75] : [1, 1.5];
  const opacity = tier === 'mobile' ? 0.85 : 0.9;

  return (
    <Canvas
      className="experience-canvas"
      aria-hidden="true"
      dpr={dpr}
      frameloop={reduced ? 'demand' : 'always'}
      camera={{ fov: 42, near: 0.1, far: 120, position: [0, 0.25, 7.2] }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance', stencil: false }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          onFail();
        });
      }}
    >
      <DemandBridge />
      <CameraRig tier={tier} reduced={reduced} />
      <ParticleField key={count} count={count} opacity={opacity} reduced={reduced} />
      <Structures />
    </Canvas>
  );
}
