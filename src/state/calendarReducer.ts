import { CalendarState, CalendarAction, DEFAULT_STATE } from '../types/calendar';

export { DEFAULT_STATE };

export function calendarReducer(
  state: CalendarState = DEFAULT_STATE,
  action: CalendarAction
): CalendarState {
  switch (action.type) {
    case 'CLICK_DAY': {
      const { day } = action;
      const { dateRange } = state;

      if (
        dateRange !== null &&
        (day === dateRange.start || day === dateRange.end)
      ) {
        return { ...state, dateRange: null };
      }

      if (dateRange === null) {
        return { ...state, dateRange: { start: day, end: null } };
      }

      if (dateRange.end === null) {
        if (day >= dateRange.start) {
          return { ...state, dateRange: { start: dateRange.start, end: day } };
        } else {
          return { ...state, dateRange: { start: day, end: null } };
        }
      }

      return { ...state, dateRange: { start: day, end: null } };
    }

    case 'NAVIGATE': {
      let { month, year } = state;
      if (action.direction === 'next') {
        month += 1;
        if (month === 12) {
          month = 0;
          year += 1;
        }
      } else {
        month -= 1;
        if (month === -1) {
          month = 11;
          year -= 1;
        }
      }
      return { ...state, month, year, dateRange: null, hoverDay: null };
    }

    case 'HYDRATE':
      return { ...state, ...action.payload };

    case 'SET_DAY_HOVER':
      return { ...state, hoverDay: action.day };

    case 'SET_MONTH_NOTE':
      return {
        ...state,
        monthNotes: { ...state.monthNotes, [action.key]: action.value },
      };

    case 'SET_RANGE_NOTE':
      return {
        ...state,
        rangeNotes: { ...state.rangeNotes, [action.key]: action.value },
      };

    case 'TOGGLE_THEME':
      return { ...state, isDark: !state.isDark };

    case 'SET_ANIMATION':
      return { ...state, isAnimating: action.isAnimating };

    case 'SET_PERSISTENCE_AVAILABLE':
      return { ...state, persistenceAvailable: action.available };

    default:
      return state;
  }
}
