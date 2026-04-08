'use client';

import { useCalendar } from '../../context/CalendarContext';

export function PersistenceWarning() {
  const { state } = useCalendar();
  if (state.persistenceAvailable) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className="px-4 py-2 text-[11px] text-center"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--color-accent) 15%, transparent)',
        color: 'var(--color-text-muted)',
        borderTop: '1px solid color-mix(in srgb, var(--color-accent) 20%, transparent)',
      }}
    >
      ⚠ Storage unavailable — notes won&apos;t persist between sessions.
    </div>
  );
}
