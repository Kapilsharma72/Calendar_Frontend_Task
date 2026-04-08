'use client';

import { MONTH_THEMES } from '../../data/themes';

interface NotesSectionProps {
  month: number;
  year: number;
  monthNote: string;
  rangeNote: string | null;
  onMonthNoteChange: (value: string) => void;
  onRangeNoteChange: (value: string) => void;
}

export function NotesSection({
  month,
  monthNote,
  rangeNote,
  onMonthNoteChange,
  onRangeNoteChange,
}: NotesSectionProps) {
  const monthName = MONTH_THEMES[month].name;

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Header */}
      <div className="flex items-center gap-1.5">
        {/* Pencil icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'var(--color-primary)' }}
          aria-hidden="true"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        <span
          className="text-[10px] font-black uppercase tracking-[0.2em]"
          style={{ color: 'var(--color-primary)' }}
        >
          Notes
        </span>
      </div>

      {/* Month note — lined paper textarea */}
      <div className="flex flex-col gap-0 flex-1">
        <label
          className="text-[9px] font-bold uppercase tracking-widest mb-1.5"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {monthName}
        </label>
        <textarea
          value={monthNote}
          onChange={(e) => onMonthNoteChange(e.target.value)}
          placeholder="Add a memo…"
          className="note-textarea min-h-[44px] w-full flex-1 text-[11px] resize-none rounded-md px-2 py-2 transition-all duration-150 placeholder:opacity-30"
          rows={5}
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-primary) 4%, var(--color-surface))',
            color: 'var(--color-text)',
            border: '1px solid color-mix(in srgb, var(--color-primary) 15%, transparent)',
            lineHeight: '1.8',
          }}
        />
      </div>

      {/* Range note — only shown when a range is selected */}
      {rangeNote !== null && (
        <div className="flex flex-col gap-1">
          <label
            className="text-[9px] font-bold uppercase tracking-widest"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Range Notes
          </label>
          <textarea
            value={rangeNote}
            onChange={(e) => onRangeNoteChange(e.target.value)}
            placeholder="Note for selected range…"
            className="note-textarea min-h-[44px] w-full text-[11px] resize-none rounded-md px-2 py-2 transition-all duration-150 placeholder:opacity-30"
            rows={3}
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-primary) 4%, var(--color-surface))',
              color: 'var(--color-text)',
              border: '1px solid color-mix(in srgb, var(--color-primary) 15%, transparent)',
            }}
          />
        </div>
      )}
    </div>
  );
}
