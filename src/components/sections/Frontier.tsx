import { frontier } from '../../data/portfolio';
import { ChapterTag, Lines } from '../ui/Lines';

export function Frontier() {
  return (
    <section id="future" className="chapter frontier" data-chapter data-stop="7" aria-labelledby="future-title">
      <div className="shell">
        <div className="frontier__head">
          <ChapterTag index="07" label="The Next Frontier" />
          <Lines id="future-title" lines={['The horizon', <em key="e">keeps moving.</em>]} className="display display--center" />
          <p className="lede lede--center" data-reveal="fade">
            Where I want to go deeper next — the problems I keep returning to after the pager goes quiet.
          </p>
        </div>
        <ul className="frontier__grid" data-reveal="stagger">
          {frontier.map((f, i) => (
            <li className="frontier__item" key={f.title}>
              <span className="frontier__coord" aria-hidden="true">
                {['N', 'E', 'S', 'W'][i]} · {String(i + 1).padStart(2, '0')}
              </span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
