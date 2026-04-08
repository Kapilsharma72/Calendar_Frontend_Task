'use client';

import { MONTH_THEMES } from '../../data/themes';

export interface MonthNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  month: number;
  year: number;
}

export function MonthNavigation({ onPrev, onNext, month, year }: MonthNavigationProps) {
  const monthName = MONTH_THEMES[month].name;

  return (
    <div className="flex items-center justify-between px-1 mb-2">
      <button
        aria-label="Go to previous month"
        onClick={onPrev}
        className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-150 hover:scale-110 active:scale-95"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)',
          color: 'var(--color-primary)',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
        {monthName} {year}
      </span>

      <button
        aria-label="Go to next month"
        onClick={onNext}
        className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-150 hover:scale-110 active:scale-95"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)',
          color: 'var(--color-primary)',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
