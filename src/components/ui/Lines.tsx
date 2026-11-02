import type { ElementType, ReactNode } from 'react';

/**
 * Headline whose lines reveal from behind a mask. Text stays in the DOM
 * (and visible without JS); GSAP only animates the inner spans.
 */
export function Lines({
  as: Tag = 'h2',
  lines,
  className,
  id,
}: {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  id?: string;
}) {
  return (
    <Tag className={className} id={id} data-reveal="lines">
      {lines.map((l, i) => (
        <span className="line" key={i}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

export function ChapterTag({ index, label }: { index: string; label: string }) {
  return (
    <p className="chapter-tag" data-reveal="fade">
      <span className="chapter-tag__index">{index}</span>
      <span className="chapter-tag__rule" aria-hidden="true" />
      <span>{label}</span>
    </p>
  );
}
