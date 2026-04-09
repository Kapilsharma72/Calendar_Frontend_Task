export interface CalendarState {
  month: number;
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
  start: number;
  end: number | null;
}

export type MonthNoteMap = Record<string, string>;

export type RangeNoteMap = Record<string, string>;

export type DateRangeMap = Record<string, { start: number; end: number }>;

export type DayCellState =
  | 'empty'
  | 'default'
  | 'today'
  | 'range-start'
  | 'in-range'
  | 'range-end'
  | 'hover-preview'
  | 'range-start-end';

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
