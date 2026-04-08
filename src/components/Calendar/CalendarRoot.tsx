'use client';

import { CalendarProvider } from '@/context/CalendarContext';
import { CalendarPage } from '@/components/Calendar/CalendarPage';
import { CalendarBody } from '@/components/Calendar/CalendarBody';

export function CalendarRoot() {
  return (
    <CalendarProvider>
      <CalendarPage>
        <CalendarBody />
      </CalendarPage>
    </CalendarProvider>
  );
}
