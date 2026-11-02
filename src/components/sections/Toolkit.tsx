import { skillGroups } from '../../data/portfolio';
import { ChapterTag, Lines } from '../ui/Lines';

export function Toolkit() {
  return (
    <section id="skills" className="chapter toolkit" data-chapter data-stop="2" aria-labelledby="skills-title">
      <div className="shell">
        <div className="toolkit__head">
          <ChapterTag index="03" label="The Engineering Toolkit" />
          <Lines id="skills-title" lines={['A connected', <em key="e">system,</em>, 'not a list.']} className="display" />
          <p className="lede" data-reveal="fade">
            Six clusters, linked the way they are in production. Each one comes forward as you read it.
          </p>
        </div>

        <div className="toolkit__groups">
          {skillGroups.map((g, k) => (
            <article className="skill-group" key={g.id} data-skill={k} aria-labelledby={`skill-${g.id}`}>
              <p className="skill-group__index">
                {String(k + 1).padStart(2, '0')} <span aria-hidden="true">/ 06</span>
              </p>
              <h3 className="skill-group__name" id={`skill-${g.id}`}>
                {g.name}
              </h3>
              <p className="skill-group__context">{g.context}</p>
              <ul className="chips" aria-label={`${g.name} technologies`} data-reveal="stagger">
                {g.items.map((s) => (
                  <li className="chip" key={s}>
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
