import { skillGroups } from '../../data/portfolio';
import { ChapterTag, Lines } from '../ui/Lines';

const allSkills = skillGroups.flatMap((g) => [
  ...g.signature.map((s) => ({ s, sig: true })),
  ...g.items.map((s) => ({ s, sig: false })),
]);
const toolCount = allSkills.length;

function Ticker() {
  const row = allSkills.map(({ s, sig }, i) => (
    <span className={`ticker__item ${sig ? 'is-sig' : ''}`} key={`${s}-${i}`}>
      {s}
    </span>
  ));
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        <div className="ticker__row">{row}</div>
        <div className="ticker__row">{row}</div>
      </div>
    </div>
  );
}

export function Toolkit() {
  return (
    <section id="skills" className="chapter toolkit" data-chapter data-stop="2" aria-labelledby="skills-title">
      <Ticker />
      <div className="shell">
        <div className="toolkit__head">
          <ChapterTag index="03" label="The Engineering Toolkit" />
          <Lines id="skills-title" lines={['A connected', <em key="e">system,</em>, 'not a list.']} className="display" />
          <p className="lede" data-reveal="fade">
            Six clusters, linked the way they are in production. As you read each one, it comes forward in the scene —
            and the tools I rely on most light up.
          </p>
          <dl className="toolkit__totals" data-reveal="stagger">
            <div>
              <dt>Clusters</dt>
              <dd data-count={skillGroups.length}>{skillGroups.length}</dd>
            </div>
            <div>
              <dt>Tools in use</dt>
              <dd>
                <span data-count={toolCount}>{toolCount}</span>
              </dd>
            </div>
            <div>
              <dt>Legend</dt>
              <dd className="toolkit__legend">
                <span className="chip chip--sig">Signature</span>
                <span className="chip">Working</span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="toolkit__groups">
          {skillGroups.map((g, k) => (
            <article className="skill-group" key={g.id} data-skill={k} aria-labelledby={`skill-${g.id}`}>
              <div className="skill-group__rail" aria-hidden="true">
                <span className="skill-group__bar" />
              </div>
              <p className="skill-group__index">
                {String(k + 1).padStart(2, '0')} <span aria-hidden="true">/ 06</span>
              </p>
              <h3 className="skill-group__name" id={`skill-${g.id}`}>
                {g.name}
              </h3>
              <p className="skill-group__context">{g.context}</p>

              <ul className="chips" aria-label={`${g.name} technologies`}>
                {g.signature.map((s, i) => (
                  <li className="chip chip--sig" key={s} style={{ '--i': i } as React.CSSProperties}>
                    <span className="chip__dot" aria-hidden="true" />
                    {s}
                    <span className="sr-only"> (signature skill)</span>
                  </li>
                ))}
                {g.items.map((s, i) => (
                  <li className="chip" key={s} style={{ '--i': i + g.signature.length } as React.CSSProperties}>
                    {s}
                  </li>
                ))}
              </ul>

              <p className="skill-group__evidence">
                <span className="label">In production</span>
                {g.evidence}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
