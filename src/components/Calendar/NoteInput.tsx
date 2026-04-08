'use client';

import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

interface NoteInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  minHeight?: number;
}

export function NoteInput({ label, value, onChange, minHeight }: NoteInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue, 500);
  const isUserTyping = useRef(false);

  useEffect(() => {
    if (isUserTyping.current) {
      onChange(debouncedValue);
      isUserTyping.current = false;
    }
  }, [debouncedValue, onChange]);

  useEffect(() => {
    if (value !== localValue) setLocalValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
        {label}
      </span>
      <textarea
        value={localValue}
        onChange={(e) => { isUserTyping.current = true; setLocalValue(e.target.value); }}
        placeholder="Add a note…"
        rows={3}
        className="w-full rounded-lg px-3 py-2.5 text-sm resize-none outline-none transition-all duration-150 placeholder:opacity-40"
        style={{
          minHeight: minHeight ?? 80,
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          border: '1.5px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.border = '1.5px solid var(--color-primary)';
          e.currentTarget.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--color-primary) 15%, transparent)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.border = '1.5px solid color-mix(in srgb, var(--color-primary) 20%, transparent)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
    </label>
  );
}
