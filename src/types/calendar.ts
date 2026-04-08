export interface CalendarState {
  month: number;           // 0-indexed (0 = January)
  year: number;
  dateRange: DateRange | null;
  hoverDay: number | null;
  monthNotes: MonthNoteMap;
  rangeNotes: RangeNoteMap;
  isDark: boolean;
  persistenceAvailable: boolean;
  isAnimating: boolean;
}

export interface DateRange {
  start: number; // day-of-month, 1-based
  end: number | null; // null while only start is set
}

export type MonthNoteMap = Record<string, string>;
// key format: "YYYY-MM"  e.g. "2025-01"

export type RangeNoteMap = Record<string, string>;
// key format: "YYYY-MM-DD:YYYY-MM-DD"  e.g. "2025-01-06:2025-01-10"

export type DateRangeMap = Record<string, { start: number; end: number }>;
// key: "YYYY-MM"

export type DayCellState =
  | 'empty'
  | 'default'
  | 'today'
  | 'range-start'
  | 'in-range'
  | 'range-end'
  | 'hover-preview'
  | 'range-start-end'; // start === end (single-day selection)

export type CalendarAction =
  | { type: 'HYDRATE'; payload: Partial<CalendarState> }
  | { type: 'NAVIGATE'; direction: 'prev' | 'next' }
  | { type: 'SET_DAY_HOVER'; day: number | null }
  | { type: 'CLICK_DAY'; day: number }
  | { type: 'SET_MONTH_NOTE'; key: string; value: string }
  | { type: 'SET_RANGE_NOTE'; key: string; value: string }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_ANIMATION'; isAnimating: boolean }
  | { type: 'SET_PERSISTENCE_AVAILABLE'; available: boolean };

export interface PersistedCalendarData {
  version: 1;
  isDark: boolean;
  monthNotes: MonthNoteMap;
  rangeNotes: RangeNoteMap;
  dateRanges: DateRangeMap;
}

export const DEFAULT_STATE: CalendarState = {
  month: 0,
  year: 2025,
  dateRange: null,
  hoverDay: null,
  monthNotes: {},
  rangeNotes: {},
  isDark: false,
  persistenceAvailable: true,
  isAnimating: false,
};
