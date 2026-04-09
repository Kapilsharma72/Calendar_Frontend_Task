'use client';

import React from 'react';
import { DayCellState } from '../../types/calendar';
import { HolidayMarker } from './HolidayMarker';

export interface DayCellProps {
  day: number;
  month: number;
  year: number;
  state: DayCellState;
  isToday: boolean;
  holiday: string | null;
  tabIndex: number;
  onFocus: () => void;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const RANGE_STATES = new Set<DayCellState>([
  'range-start', 'range-end', 'in-range', 'range-start-end',
]);

function getCellClasses(state: DayCellState, isToday: boolean): string {
  const base =
    'relative flex flex-col items-center justify-center cursor-pointer select-none outline-none group transition-all duration-100';
  switch (state) {
    case 'range-start':     return `${base} rounded-l-full`;
    case 'range-end':       return `${base} rounded-r-full`;
    case 'range-start-end': return `${base} rounded-full`;
    default:
      return isToday ? `${base} font-bold` : base;
  }
}

function getCellStyle(state: DayCellState): React.CSSProperties {
  switch (state) {
    case 'range-start':
    case 'range-end':
    case 'range-start-end':
      return { backgroundColor: 'var(--color-primary)', color: '#fff' };
    case 'in-range':
      return {
        backgroundColor: 'color-mix(in srgb, var(--color-primary) 16%, transparent)',
        color: 'var(--color-text)',
        borderRadius: 0,
      };
    case 'hover-preview':
      return {
        backgroundColor: 'color-mix(in srgb, var(--color-primary) 9%, transparent)',
        color: 'var(--color-text)',
        borderRadius: 0,
      };
    default:
      return {};
  }
}

export function DayCell({
  day, month, year, state, isToday, holiday,
  tabIndex, onFocus, onClick, onMouseEnter, onMouseLeave,
}: DayCellProps) {
  if (state === 'empty') {
    return <div role="gridcell" aria-hidden="true" style={{ aspectRatio: '1', minHeight: '36px' }} />;
  }

  const dateLabel = new Date(year, month, day).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const ariaLabel = holiday ? `${dateLabel}, ${holiday}` : dateLabel;
  const isSelected = RANGE_STATES.has(state);
  const holidayId = `holiday-${year}-${month}-${day}`;

  const isSolid =
    state === 'range-start' || state === 'range-end' || state === 'range-start-end';

  const jsDay = new Date(year, month, day).getDay();
  const isWeekend = jsDay === 0 || jsDay === 6;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="gridcell"
      aria-label={ariaLabel}
      aria-selected={isSelected}
      aria-describedby={holiday ? holidayId : undefined}
      tabIndex={tabIndex}
      className={getCellClasses(state, isToday)}
      style={{
        ...getCellStyle(state),
        aspectRatio: '1',
        minHeight: '32px',
        maxHeight: '48px',
      }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {!isSolid && state !== 'in-range' && state !== 'hover-preview' && (
        <span
          className="absolute inset-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100"
          style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 12%, transparent)' }}
          aria-hidden="true"
        />
      )}

      {isToday && !isSolid && (
        <span
          className="absolute inset-[3px] rounded-full"
          style={{ border: '2px solid var(--color-primary)' }}
          aria-hidden="true"
        />
      )}

      <span
        className="cal-day-number relative z-10 leading-none"
        style={{
          fontSize: 'clamp(11px, 1.8vw, 14px)',
          fontWeight: isToday ? 800 : isWeekend ? 700 : 500,
          color: isSolid
            ? '#fff'
            : isToday
            ? 'var(--color-primary)'
            : isWeekend
            ? 'var(--color-accent)'
            : 'var(--color-text)',
        }}
      >
        {day}
      </span>

      {holiday && (
        <span className="absolute bottom-[3px] left-1/2 -translate-x-1/2 z-20">
          <HolidayMarker name={holiday} id={holidayId} />
        </span>
      )}
    </div>
  );
}
