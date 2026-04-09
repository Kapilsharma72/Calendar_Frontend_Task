import { DateRange, DayCellState } from '../types/calendar';

export function getDayCellState(
  day: number,
  dateRange: DateRange | null,
  hoverDay: number | null,
): DayCellState {
  if (day === 0) return 'empty';

  if (!dateRange) return 'default';

  const { start, end } = dateRange;

  if (end !== null && start === end) {
    return day === start ? 'range-start-end' : 'default';
  }

  if (day === start) return 'range-start';

  if (end !== null) {
    if (day === end) return 'range-end';
    if (day > start && day < end) return 'in-range';
    return 'default';
  }

  if (hoverDay !== null && hoverDay > start && day > start && day <= hoverDay) {
    return 'hover-preview';
  }

  return 'default';
}
