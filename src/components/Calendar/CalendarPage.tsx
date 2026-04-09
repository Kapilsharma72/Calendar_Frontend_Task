'use client';

import React, { useState, useEffect } from 'react';
import { useCalendar } from '../../context/CalendarContext';
import { MONTH_THEMES } from '../../data/themes';

interface CalendarPageProps {
  children: React.ReactNode;
}

export function CalendarPage({ children }: CalendarPageProps) {
  const { state } = useCalendar();
  const theme = MONTH_THEMES[state.month][state.isDark ? 'dark' : 'light'];
  const [announcement, setAnnouncement] = useState('');

  const cssVars: React.CSSProperties = {
    '--color-primary':    theme.primary,
    '--color-accent':     theme.accent,
    '--color-background': theme.background,
    '--color-surface':    theme.surface,
    '--color-text':       theme.text,
    '--color-text-muted': theme.textMuted,
  } as React.CSSProperties;

  useEffect(() => {
    setAnnouncement(`Now showing ${MONTH_THEMES[state.month].name} ${state.year}`);
  }, [state.month, state.year]);

  useEffect(() => {
    if (state.dateRange?.end !== null && state.dateRange) {
      const name = MONTH_THEMES[state.month].name;
      setAnnouncement(
        `Date range selected: ${name} ${state.dateRange.start} to ${state.dateRange.end}, ${state.year}`
      );
    }
  }, [state.dateRange, state.month, state.year]);

  return (
    <div
      className="min-h-screen wall-bg transition-colors duration-700"
      style={{ ...cssVars, color: 'var(--color-text)' }}
    >
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>

      <div className="min-h-screen flex items-start justify-center pt-16 pb-24 px-4 sm:px-8">
        <div className="calendar-wrapper w-full sm:max-w-[680px]">
          {children}
        </div>
      </div>
    </div>
  );
}
