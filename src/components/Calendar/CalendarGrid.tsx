'use client';

import React, { useState, useCallback } from 'react';
import { DateRange } from '../../types/calendar';
import { HolidayMap } from '../../data/holidays';
import { MONTH_THEMES } from '../../data/themes';
import { getDayCellState } from '../../utils/getDayCellState';
import WeekdayHeaders from './WeekdayHeaders';
import { DayCell } from './DayCell';

export interface CalendarGridProps {
  month: number;
  year: number;
  dateRange: DateRange | null;
  hoverDay: number | null;
  holidays: HolidayMap;
  onDayClick: (day: number) => void;
  onDayHover: (day: number | null) => void;
}

export function CalendarGrid({ month, year, dateRange, hoverDay, holidays, onDayClick, onDayHover }: CalendarGridProps) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const rawFirst = new Date(year, month, 1).getDay();
  const firstDayOfWeek = rawFirst === 0 ? 6 : rawFirst - 1;
  const totalCells = Math.ceil((firstDayOfWeek + daysInMonth) / 7) * 7;
  const trailingEmpties = totalCells - firstDayOfWeek - daysInMonth;

  const cells: number[] = [
    ...Array(firstDayOfWeek).fill(0),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ...Array(trailingEmpties).fill(0),
  ];

  const [focusedDay, setFocusedDay] = useState(1);
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const getHoliday = useCallback((day: number): string | null => {
    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return holidays[key] || null;
  }, [year, month, holidays]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const clamp = (v: number) => Math.max(1, Math.min(daysInMonth, v));
    switch (e.key) {
      case 'ArrowRight': e.preventDefault(); setFocusedDay(d => clamp(d + 1)); break;
      case 'ArrowLeft':  e.preventDefault(); setFocusedDay(d => clamp(d - 1)); break;
      case 'ArrowDown':  e.preventDefault(); setFocusedDay(d => clamp(d + 7)); break;
      case 'ArrowUp':    e.preventDefault(); setFocusedDay(d => clamp(d - 7)); break;
      case 'Enter': case ' ': e.preventDefault(); onDayClick(focusedDay); break;
    }
  };

  return (
    <div
      role="grid"
      aria-label={`${MONTH_THEMES[month].name} ${year}`}
      className="grid grid-cols-7"
      onKeyDown={handleKeyDown}
    >
      <WeekdayHeaders />
      {cells.map((day, i) => (
        <DayCell
          key={i}
          day={day}
          month={month}
          year={year}
          state={getDayCellState(day, dateRange, hoverDay)}
          isToday={isCurrentMonth && day === today.getDate()}
          holiday={day === 0 ? null : getHoliday(day)}
          tabIndex={day === 0 ? -1 : day === focusedDay ? 0 : -1}
          onFocus={() => { if (day !== 0) setFocusedDay(day); }}
          onClick={() => { if (day !== 0) onDayClick(day); }}
          onMouseEnter={() => { if (day !== 0) onDayHover(day); }}
          onMouseLeave={() => { if (day !== 0) onDayHover(null); }}
        />
      ))}
    </div>
  );
}
