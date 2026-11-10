import { useEffect, useRef } from 'react';
import { story } from '../../lib/story';
import { profile } from '../../data/portfolio';

/** Fine technical annotation in the corners. Written to directly by the render loop. */
export function Hud({ webgl }: { webgl: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    story.hud = ref.current;
    return () => {
      story.hud = null;
    };
  }, []);
  return (
    <div className="hud" aria-hidden="true">
      <p className="hud__coords" ref={ref}>
        {webgl ? 'ARRIVAL' : 'STATIC MODE'}
      </p>
      <p className="hud__loc">{profile.coordinates}</p>
    </div>
  );
}
