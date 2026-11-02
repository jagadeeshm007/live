import { journey, profile } from '../../data/portfolio';
import { ChapterTag, Lines } from '../ui/Lines';

export function Journey() {
  return (
    <section id="journey" className="chapter journey" data-chapter data-stop="1" aria-labelledby="journey-title">
      <div className="shell split">
        <div className="split__lead">
          <ChapterTag index="02" label="The Origin" />
          <Lines id="journey-title" lines={['From curiosity', <em key="e">to production.</em>]} className="display" />
          <p className="lede" data-reveal="fade">
            {profile.summary}
          </p>
        </div>

        <ol className="timeline" aria-label="Career timeline">
          <span className="timeline__spine" aria-hidden="true">
            <span className="timeline__spine-fill" />
          </span>
          {journey.map((m, i) => (
            <li className="milestone" key={i} data-reveal="fade">
              <span className="milestone__node" aria-hidden="true" />
              <p className="milestone__when">{m.when}</p>
              <h3 className="milestone__title">{m.title}</h3>
              {m.place && <p className="milestone__place">{m.place}</p>}
              <p className="milestone__detail">{m.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
