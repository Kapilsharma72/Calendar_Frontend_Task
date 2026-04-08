'use client';

import React from 'react';
import { MONTH_THEMES } from '../../data/themes';

export interface CalendarHeaderProps {
  month: number;
  year: number;
  isDark: boolean;
  onToggleTheme: () => void;
}

export function CalendarHeader({ month, year, isDark, onToggleTheme }: CalendarHeaderProps) {
  const monthName = MONTH_THEMES[month].name;

  return (
    <div
      className="flex items-center justify-between px-6 py-5 border-b"
      style={{ borderColor: 'color-mix(in srgb, var(--color-primary) 15%, transparent)' }}
    >
      <div>
        <h2 className="text-3xl font-bold tracking-tight leading-none" style={{ color: 'var(--color-primary)' }}>
          {monthName} {year}
        </h2>
      </div>

      <button
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-pressed={isDark}
        onClick={onToggleTheme}
        className="relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-primary) 12%, transparent)',
          color: 'var(--color-primary)',
          boxShadow: '0 0 0 1px color-mix(in srgb, var(--color-primary) 20%, transparent)',
        }}
      >
        {isDark ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </div>
  );
}
