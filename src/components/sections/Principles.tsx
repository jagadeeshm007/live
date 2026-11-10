import { principles } from '../../data/portfolio';
import { ChapterTag, Lines } from '../ui/Lines';

export function Principles() {
  return (
    <section id="principles" className="chapter principles" data-chapter data-stop="6" aria-labelledby="principles-title">
      <div className="shell">
        <div className="principles__lead">
          <ChapterTag index="06" label="How I Work" />
          <Lines id="principles-title" lines={['Principles,', <em key="e">with receipts.</em>]} className="display" />
          <p className="lede" data-reveal="fade">
            The principles I hold my own work to. Each one below points to something I actually
            did. Watch the scene: the noise resolves into structure as you read.
          </p>
        </div>
        <ol className="lp-list">
          {principles.map((p, i) => (
            <li className="lp" key={p.lp} data-reveal="fade">
              <div className="lp__top">
                <span className="lp__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="lp__name">{p.lp}</h3>
                <span className="lp__tag">{p.tag}</span>
              </div>
              <p className="lp__claim">{p.claim}</p>
              <p className="lp__proof">{p.proof}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
