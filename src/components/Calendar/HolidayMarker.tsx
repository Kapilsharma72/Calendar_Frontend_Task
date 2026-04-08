'use client';

export interface HolidayMarkerProps {
  name: string;
  id: string;
}

export function HolidayMarker({ name, id }: HolidayMarkerProps) {
  return (
    <div className="relative group/tooltip">
      {/* Holiday dot */}
      <span
        className="block w-1 h-1 rounded-full"
        style={{ backgroundColor: 'var(--color-accent)' }}
        aria-hidden="true"
      />
      {/* Tooltip */}
      <div
        id={id}
        role="tooltip"
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] font-semibold rounded-md whitespace-nowrap pointer-events-none z-50
          opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-150 shadow-lg"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: '#fff',
        }}
      >
        {name}
        {/* Tooltip arrow */}
        <span
          className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
          style={{ borderTopColor: 'var(--color-primary)' }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
