import { Dispatch, useEffect } from 'react';
import { CalendarState, CalendarAction, PersistedCalendarData } from '../types/calendar';
import { useDebounce } from './useDebounce';

const STORAGE_KEY = 'interactive-calendar';

function monthKey(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}`;
}

export function usePersistence(
  state: CalendarState,
  dispatch: Dispatch<CalendarAction>
): void {
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      let data: unknown;
      try {
        data = JSON.parse(raw);
      } catch {
        return;
      }

      if (
        typeof data !== 'object' ||
        data === null ||
        (data as PersistedCalendarData).version !== 1
      ) {
        return;
      }

      const persisted = data as PersistedCalendarData;
      const { isDark, monthNotes, rangeNotes, dateRanges } = persisted;

      const key = monthKey(state.year, state.month);
      const storedRange = dateRanges?.[key] ?? null;
      const dateRange =
        storedRange && typeof storedRange.start === 'number' && typeof storedRange.end === 'number'
          ? { start: storedRange.start, end: storedRange.end }
          : null;

      dispatch({
        type: 'HYDRATE',
        payload: {
          isDark: typeof isDark === 'boolean' ? isDark : false,
          monthNotes: typeof monthNotes === 'object' && monthNotes !== null ? monthNotes : {},
          rangeNotes: typeof rangeNotes === 'object' && rangeNotes !== null ? rangeNotes : {},
          dateRange,
        },
      });
    } catch {
      dispatch({ type: 'SET_PERSISTENCE_AVAILABLE', available: false });
    }
  }, []);

  const debouncedState = useDebounce(state, 500);

  useEffect(() => {
    try {
      const dateRanges: PersistedCalendarData['dateRanges'] = {};
      if (debouncedState.dateRange?.end !== null && debouncedState.dateRange !== null) {
        const key = monthKey(debouncedState.year, debouncedState.month);
        dateRanges[key] = {
          start: debouncedState.dateRange.start,
          end: debouncedState.dateRange.end as number,
        };
      }

      const data: PersistedCalendarData = {
        version: 1,
        isDark: debouncedState.isDark,
        monthNotes: debouncedState.monthNotes,
        rangeNotes: debouncedState.rangeNotes,
        dateRanges,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      dispatch({ type: 'SET_PERSISTENCE_AVAILABLE', available: false });
    }
  }, [debouncedState, dispatch]);
}
