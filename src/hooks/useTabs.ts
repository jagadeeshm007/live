import { useState } from 'react';

/** Roving-tabindex tabs: arrow keys move between tabs, Home/End jump. */
export function useTabs(ids: string[], prefix: string, initial = ids[0]) {
  const [active, setActive] = useState(initial);

  const tabProps = (id: string) => ({
    id: `${prefix}-tab-${id}`,
    role: 'tab' as const,
    type: 'button' as const,
    'aria-selected': active === id,
    'aria-controls': `${prefix}-panel`,
    tabIndex: active === id ? 0 : -1,
    onClick: () => setActive(id),
    onKeyDown: (e: React.KeyboardEvent) => {
      const i = ids.indexOf(id);
      let next = -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % ids.length;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + ids.length) % ids.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = ids.length - 1;
      if (next < 0) return;
      e.preventDefault();
      setActive(ids[next]);
      document.getElementById(`${prefix}-tab-${ids[next]}`)?.focus();
    },
  });

  const panelProps = {
    id: `${prefix}-panel`,
    role: 'tabpanel' as const,
    'aria-labelledby': `${prefix}-tab-${active}`,
  };

  return { active, setActive, tabProps, panelProps };
}
