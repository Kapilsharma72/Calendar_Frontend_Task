'use client';

import { createContext, useContext, useReducer, Dispatch } from 'react';
import { CalendarState, CalendarAction, DEFAULT_STATE } from '../types/calendar';
import { calendarReducer } from '../state/calendarReducer';
import { usePersistence } from '../hooks/usePersistence';

interface CalendarContextValue {
  state: CalendarState;
  dispatch: Dispatch<CalendarAction>;
}

export const CalendarContext = createContext<CalendarContextValue | null>(null);

interface CalendarProviderProps {
  children: React.ReactNode;
  initialMonth?: number; // 0-indexed, defaults to current month
  initialYear?: number;
}

export function CalendarProvider({
  children,
  initialMonth,
  initialYear,
}: CalendarProviderProps) {
  const now = new Date();
  const initialState: CalendarState = {
    ...DEFAULT_STATE,
    month: initialMonth ?? now.getMonth(),
    year: initialYear ?? now.getFullYear(),
  };

  const [state, dispatch] = useReducer(calendarReducer, initialState);

  usePersistence(state, dispatch);

  return (
    <CalendarContext.Provider value={{ state, dispatch }}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar(): CalendarContextValue {
  const ctx = useContext(CalendarContext);
  if (ctx === null) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return ctx;
}
