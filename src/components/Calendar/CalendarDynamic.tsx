'use client';

import dynamic from 'next/dynamic';

export const CalendarDynamic = dynamic(
  () => import('./CalendarRoot').then((m) => m.CalendarRoot),
  { ssr: false }
);
