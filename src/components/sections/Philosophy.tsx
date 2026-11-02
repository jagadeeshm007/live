import { principles } from '../../data/portfolio';
import { ChapterTag, Lines } from '../ui/Lines';

export function Philosophy() {
  return (
    <section id="philosophy" className="chapter philosophy" data-chapter data-stop="6" aria-labelledby="philosophy-title">
      <div className="shell split">
        <div className="split__lead philosophy__lead">
          <ChapterTag index="06" label="Engineering Philosophy" />
          <Lines id="philosophy-title" lines={['Complexity in,', <em key="e">clarity out.</em>]} className="display" />
          <p className="lede" data-reveal="fade">
            How I approach a problem, learned the practical way — each principle backed by work I have shipped.
          </p>
        </div>
        <ol className="principles">
          {principles.map((p, i) => (
            <li className="principle" key={p.title} data-reveal="fade">
              <span className="principle__num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="principle__title">{p.title}</h3>
                <p className="principle__body">{p.body}</p>
                <p className="principle__evidence">{p.evidence}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
