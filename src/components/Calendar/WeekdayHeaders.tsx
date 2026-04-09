'use client';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export default function WeekdayHeaders() {
  return (
    <div role="row" className="contents">
      {DAYS.map((d) => (
        <div
          key={d}
          role="columnheader"
          className="flex items-center justify-center py-1.5"
          style={{
            fontSize: 'clamp(8px, 1.3vw, 10px)',
            fontWeight: 800,
            letterSpacing: '0.12em',
            color:
              d === 'SAT' || d === 'SUN'
                ? 'var(--color-accent)'
                : 'var(--color-text-muted)',
          }}
        >
          {d}
        </div>
      ))}
    </div>
  );
}
