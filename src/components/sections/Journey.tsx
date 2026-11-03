import { journey, originIntro, originStats, profile } from '../../data/portfolio';
import { ChapterTag, Lines } from '../ui/Lines';

export function Journey() {
  return (
    <section id="journey" className="chapter journey" data-chapter data-stop="1" aria-labelledby="journey-title">
      <div className="shell">
        <div className="journey__lead">
          <ChapterTag index="02" label="The Origin" />
          <Lines id="journey-title" lines={['From curiosity', <em key="e">to production.</em>]} className="display" />
          <p className="lede" data-reveal="fade">
            {originIntro}
          </p>
          <p className="journey__summary" data-reveal="fade">
            {profile.summary}
          </p>

          <dl className="stats" data-reveal="stagger">
            {originStats.map((s) => (
              <div className="stat" key={s.label}>
                <dt>{s.label}</dt>
                <dd>
                  <span className="stat__num" data-count={s.value}>
                    {s.value.toLocaleString('en-IN')}
                  </span>
                  {s.suffix && <span className="stat__suffix">{s.suffix}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ol className="waypoints" aria-label="Career timeline">
          <span className="waypoints__spine" aria-hidden="true">
            <span className="waypoints__spine-fill" />
          </span>
          {journey.map((m, i) => (
            <li className="waypoint" key={m.title} data-milestone={i}>
              <div className="waypoint__marker" aria-hidden="true">
                <span className="waypoint__glyph">{m.marker}</span>
                <span className="waypoint__count">
                  {String(i + 1).padStart(2, '0')} / {String(journey.length).padStart(2, '0')}
                </span>
              </div>
              <div className="waypoint__body" data-reveal="fade">
                <p className="waypoint__when">{m.when}</p>
                <h3 className="waypoint__title">{m.title}</h3>
                {m.place && <p className="waypoint__place">{m.place}</p>}
                <p className="waypoint__story">{m.story}</p>
                <blockquote className="waypoint__lesson">
                  <p>{m.lesson}</p>
                </blockquote>
                <ul className="tags" aria-label="Topics">
                  {m.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
