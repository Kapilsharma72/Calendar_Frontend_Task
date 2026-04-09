'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useCalendar } from '../../context/CalendarContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { buildHolidayMap } from '../../data/holidays';
import { MONTH_THEMES } from '../../data/themes';
import { MONTH_IMAGES, MONTH_IMAGE_ALTS } from '../../data/images';
import { CalendarGrid } from './CalendarGrid';
import { NotesSection } from './NotesSection';
import { PersistenceWarning } from './PersistenceWarning';

function SpiralBinding() {
  const [coilCount, setCoilCount] = useState(32);
  const wrapRef = useRef<HTMLDivElement>(null);

  const H     = 52;
  const ROD_Y = 36;
  const ROD_H = 6;
  const RX    = 8;
  const RY    = 16;
  const SW    = 5.5;
  const SW2   = 3.0;
  const SW3   = 1.4;
  const STEP  = 18;

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setCoilCount(Math.max(4, Math.round(w / STEP)));
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const W  = coilCount * STEP;
  const CY = ROD_Y;

  // Arc path helpers
  const botArc = (cx: number) =>
    `M ${cx - RX} ${CY} A ${RX} ${RY} 0 0 0 ${cx + RX} ${CY}`;
  const topArc = (cx: number) =>
    `M ${cx + RX} ${CY} A ${RX} ${RY} 0 0 0 ${cx - RX} ${CY}`;
  // Smaller arc slightly inset for the highlight — offset inward
  const topHighlight = (cx: number) =>
    `M ${cx + RX * 0.72} ${CY - RY * 0.18} A ${RX * 0.72} ${RY * 0.72} 0 0 0 ${cx - RX * 0.72} ${CY - RY * 0.18}`;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        height: `${H}px`,
        zIndex: 30,
        overflow: 'visible',
        marginBottom: '-14px',
      }}
    >
      <svg
        width="100%"
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', overflow: 'visible' }}
      >
        {Array.from({ length: coilCount }).map((_, i) => (
          <path key={`b0-${i}`} d={botArc(i * STEP + STEP / 2)}
            fill="none" stroke="#1a1a1a" strokeWidth={SW} strokeLinecap="round" opacity="0.45" />
        ))}
        {Array.from({ length: coilCount }).map((_, i) => (
          <path key={`b1-${i}`} d={botArc(i * STEP + STEP / 2)}
            fill="none" stroke="#3d3d3d" strokeWidth={SW2} strokeLinecap="round" opacity="0.45" />
        ))}

        <rect x={0} y={ROD_Y - ROD_H / 2} width={W} height={ROD_H} rx={ROD_H / 2} fill="#2e2e2e" />
        <rect x={0} y={ROD_Y - ROD_H / 2} width={W} height={ROD_H * 0.6} rx={ROD_H / 2} fill="#555" />
        <rect x={0} y={ROD_Y - ROD_H / 2} width={W} height={ROD_H * 0.28} rx={ROD_H / 2} fill="rgba(255,255,255,0.22)" />
        <rect x={0} y={ROD_Y + ROD_H / 2 - 1.5} width={W} height={1.5} rx={0.75} fill="rgba(0,0,0,0.40)" />

        {Array.from({ length: coilCount }).map((_, i) => (
          <path key={`t0-${i}`} d={topArc(i * STEP + STEP / 2)}
            fill="none" stroke="#1a1a1a" strokeWidth={SW} strokeLinecap="round" />
        ))}
        {Array.from({ length: coilCount }).map((_, i) => (
          <path key={`t1-${i}`} d={topArc(i * STEP + STEP / 2)}
            fill="none" stroke="#505050" strokeWidth={SW2} strokeLinecap="round" />
        ))}
        {Array.from({ length: coilCount }).map((_, i) => (
          <path key={`t2-${i}`} d={topHighlight(i * STEP + STEP / 2)}
            fill="none" stroke="rgba(210,210,210,0.55)" strokeWidth={SW3} strokeLinecap="round" />
        ))}
      </svg>
    </div>
  );
}

function HeroImage({ month }: { month: number }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="absolute inset-0 w-full h-full">
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(145deg, var(--color-primary) 0%, var(--color-accent) 100%)` }}
      />
      {!error && (
        <img
          src={MONTH_IMAGES[month]}
          alt={MONTH_IMAGE_ALTS[month]}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 800ms ease' }}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.55) 100%)' }}
      />
    </div>
  );
}

function WaveCutout({ fill }: { fill: string }) {
  return (
    <svg
      className="hero-wave"
      viewBox="0 0 800 80"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0,80 L0,45 C80,45 120,10 200,28 C280,46 320,55 400,26 C480,0 520,8 600,30 C680,52 720,60 800,22 L800,80 Z"
        fill={fill}
      />
    </svg>
  );
}

function GeoAccents() {
  return (
    <>
      <div
        className="geo-accent"
        style={{
          top: 0, right: 0,
          width: '38%', height: '100%',
          background: 'color-mix(in srgb, var(--color-primary) 75%, black)',
          clipPath: 'polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)',
          opacity: 0.88,
        }}
        aria-hidden="true"
      />
      <div
        className="geo-accent"
        style={{
          top: '18%', right: '0',
          width: '28%', height: '8px',
          background: 'var(--color-accent)',
          opacity: 0.70,
          borderRadius: '4px 0 0 4px',
        }}
        aria-hidden="true"
      />
      <div
        className="geo-accent"
        style={{
          top: '32%', right: '0',
          width: '18%', height: '6px',
          background: 'var(--color-accent)',
          opacity: 0.50,
          borderRadius: '4px 0 0 4px',
        }}
        aria-hidden="true"
      />
    </>
  );
}

function MonthBadge({ month }: { month: number }) {
  const num = String(month + 1).padStart(2, '0');
  return (
    <div
      className="flex items-center justify-center rounded-sm"
      style={{ width: '36px', height: '28px', backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
    >
      <span className="text-white font-black text-[13px] tracking-tight leading-none">{num}</span>
    </div>
  );
}

function SplitYear({ year }: { year: number }) {
  const s = String(year);
  return (
    <div className="flex flex-col items-end leading-none select-none" aria-label={s} style={{ color: 'rgba(255,255,255,0.92)' }}>
      <span className="font-black" style={{ fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1 }}>{s.slice(0, 2)}</span>
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.45)', width: '100%', margin: '2px 0' }} aria-hidden="true" />
      <span className="font-black" style={{ fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1 }}>{s.slice(2)}</span>
    </div>
  );
}

function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      onClick={onToggle}
      className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
      style={{ backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(12px)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}
    >
      {isDark ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

interface PageContentProps {
  month: number; year: number; isDark: boolean;
  dateRange: ReturnType<typeof useCalendar>['state']['dateRange'];
  hoverDay: number | null;
  monthNotes: Record<string, string>; rangeNotes: Record<string, string>;
  holidays: Record<string, string>;
  onDayClick: (day: number) => void; onDayHover: (day: number | null) => void;
  onMonthNoteChange: (v: string) => void; onRangeNoteChange: (v: string) => void;
  onToggleTheme: () => void; onNavigate: (dir: 'prev' | 'next') => void;
}

function PageContent({
  month, year, isDark, dateRange, hoverDay,
  monthNotes, rangeNotes, holidays,
  onDayClick, onDayHover, onMonthNoteChange, onRangeNoteChange,
  onToggleTheme, onNavigate,
}: PageContentProps) {
  const monthName = MONTH_THEMES[month].name;
  const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
  const monthNote = monthNotes[monthKey] ?? '';
  const surfaceColor = isDark ? MONTH_THEMES[month].dark.surface : MONTH_THEMES[month].light.surface;
  const [notesExpanded, setNotesExpanded] = useState(true);

  let rangeNote: string | null = null;
  if (dateRange?.end !== null && dateRange) {
    const { start, end } = dateRange;
    const mm = String(month + 1).padStart(2, '0');
    const rk = `${year}-${mm}-${String(start).padStart(2, '0')}:${year}-${mm}-${String(end).padStart(2, '0')}`;
    rangeNote = rangeNotes[rk] ?? '';
  }

  return (
    <div className="calendar-card" style={{ backgroundColor: surfaceColor }}>
      <div className="hero-section" style={{ height: 'clamp(160px, 40vw, 340px)' }}>
        <HeroImage month={month} />
        <GeoAccents />
        <div
          className="hero-circle-frame"
          style={{
            width: 'clamp(60px, 16vw, 80px)', height: 'clamp(60px, 16vw, 80px)',
            bottom: 'clamp(20px, 5vw, 48px)', left: 'clamp(12px, 3vw, 28px)',
            zIndex: 15, border: '3px solid rgba(255,255,255,0.45)',
          }}
        >
          <img src={MONTH_IMAGES[month]} alt="" aria-hidden="true" className="w-full h-full object-cover" style={{ filter: 'brightness(1.08) saturate(1.15)' }} />
          <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 30%, transparent) 0%, transparent 60%)' }} />
        </div>
        <div className="absolute z-20 flex items-center gap-3" style={{ bottom: 'clamp(20px, 5vw, 48px)', left: 'clamp(84px, 18vw, 120px)' }}>
          <MonthBadge month={month} />
          <div className="flex flex-col">
            <span className="font-black uppercase tracking-[0.12em] leading-none" style={{ fontSize: 'clamp(18px, 3.2vw, 28px)', color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,0.60)' }}>{monthName}</span>
            <span className="font-medium tracking-[0.08em]" style={{ fontSize: 'clamp(9px, 1.4vw, 12px)', color: 'rgba(255,255,255,0.70)', marginTop: '2px' }}>{year}</span>
          </div>
        </div>
        <div className="absolute z-20" style={{ top: 'clamp(12px, 2.5vw, 20px)', right: 'clamp(14px, 2.5vw, 22px)' }}>
          <SplitYear year={year} />
        </div>
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        <WaveCutout fill={surfaceColor} />
      </div>

      <div className="month-accent-band px-5 py-0" style={{ backgroundColor: 'var(--color-primary)', minHeight: '38px', marginTop: '-2px' }}>
        <div className="flex items-center justify-between w-full py-2">
          <div className="flex items-center gap-3">
            <span className="font-black uppercase tracking-[0.22em]" style={{ fontSize: 'clamp(11px, 2vw, 15px)', color: '#fff' }}>{monthName}</span>
            <span className="font-medium" style={{ fontSize: 'clamp(9px, 1.5vw, 12px)', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.06em' }}>{year}</span>
          </div>
          <div className="flex items-center gap-1">
            <button aria-label="Go to previous month" onClick={() => onNavigate('prev')} className="w-7 h-7 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95" style={{ backgroundColor: 'rgba(255,255,255,0.18)', color: '#fff' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button aria-label="Go to next month" onClick={() => onNavigate('next')} className="w-7 h-7 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95" style={{ backgroundColor: 'rgba(255,255,255,0.18)', color: '#fff' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row" style={{ backgroundColor: surfaceColor }}>
        <div className="sm:w-[34%] px-4 py-4 flex flex-col gap-3" style={{ borderRight: '1px solid color-mix(in srgb, var(--color-primary) 10%, transparent)' }}>
          <div className="flex items-center justify-between">
            <div className="w-8 h-1 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} aria-hidden="true" />
            <button
              className="sm:hidden flex items-center gap-1 text-xs font-semibold"
              style={{ color: 'var(--color-primary)' }}
              onClick={() => setNotesExpanded(v => !v)}
              aria-expanded={notesExpanded}
              aria-controls="notes-section"
            >
              Notes {notesExpanded ? '▲' : '▼'}
            </button>
          </div>
          <div id="notes-section" className={notesExpanded ? '' : 'hidden sm:flex'} style={{ display: notesExpanded ? undefined : undefined }}>
            <div className="flex flex-col gap-3 w-full">
              <NotesSection month={month} year={year} monthNote={monthNote} rangeNote={rangeNote} onMonthNoteChange={onMonthNoteChange} onRangeNoteChange={onRangeNoteChange} />
              {dateRange && (
                <div className="rounded-xl px-3 py-1.5 mt-auto" style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--color-primary) 18%, transparent)' }}>
                  <span className="block font-black uppercase tracking-wider" style={{ fontSize: '8px', color: 'var(--color-primary)' }}>Selected Range</span>
                  <span className="block font-semibold mt-0.5" style={{ fontSize: '11px', color: 'var(--color-text)' }}>
                    {dateRange.end === null ? `${monthName} ${dateRange.start} → pick end` : `${monthName} ${dateRange.start} – ${dateRange.end}`}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 px-3 py-4">
          <CalendarGrid month={month} year={year} dateRange={dateRange} hoverDay={hoverDay} holidays={holidays} onDayClick={onDayClick} onDayHover={onDayHover} />
        </div>
      </div>

      <div style={{ height: '4px', background: `linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 50%, var(--color-primary) 100%)`, opacity: 0.6 }} aria-hidden="true" />
    </div>
  );
}

export function CalendarBody() {
  const { state, dispatch } = useCalendar();
  const prefersReducedMotion = useReducedMotion();
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState<'next' | 'prev'>('next');
  const [outMonth, setOutMonth] = useState(state.month);
  const [outYear, setOutYear] = useState(state.year);
  const animatingRef = useRef(false);
  const holidays = buildHolidayMap(state.year);

  const navigate = useCallback((direction: 'prev' | 'next') => {
    if (animatingRef.current) return;
    setFlipDir(direction);
    setOutMonth(state.month);
    setOutYear(state.year);
    if (!prefersReducedMotion) { animatingRef.current = true; setIsFlipping(true); }
    dispatch({ type: 'NAVIGATE', direction });
  }, [state.month, state.year, prefersReducedMotion, dispatch]);

  const handleAnimationEnd = () => { setIsFlipping(false); animatingRef.current = false; };

  const commonProps = {
    isDark: state.isDark, dateRange: state.dateRange, hoverDay: state.hoverDay,
    monthNotes: state.monthNotes, rangeNotes: state.rangeNotes, holidays,
    onDayClick:  (day: number) => dispatch({ type: 'CLICK_DAY', day }),
    onDayHover:  (day: number | null) => dispatch({ type: 'SET_DAY_HOVER', day }),
    onMonthNoteChange: (v: string) => {
      const key = `${state.year}-${String(state.month + 1).padStart(2, '0')}`;
      dispatch({ type: 'SET_MONTH_NOTE', key, value: v });
    },
    onRangeNoteChange: (v: string) => {
      if (state.dateRange?.end !== null && state.dateRange) {
        const { start, end } = state.dateRange;
        const mm = String(state.month + 1).padStart(2, '0');
        const rk = `${state.year}-${mm}-${String(start).padStart(2, '0')}:${state.year}-${mm}-${String(end).padStart(2, '0')}`;
        dispatch({ type: 'SET_RANGE_NOTE', key: rk, value: v });
      }
    },
    onToggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
    onNavigate: navigate,
  };

  const outClass = flipDir === 'next' ? 'flip-out-next' : 'flip-out-prev';
  const inClass  = flipDir === 'next' ? 'flip-in-next'  : 'flip-in-prev';

  return (
    <div style={{ position: 'relative' }}>
      <SpiralBinding />
      <div className="flip-viewport" style={{ minHeight: '560px' }}>
        {isFlipping ? (
          <>
            <div className={`flip-page ${outClass}`}><PageContent {...commonProps} month={outMonth} year={outYear} /></div>
            <div className={`flip-page ${inClass}`} onAnimationEnd={handleAnimationEnd}><PageContent {...commonProps} month={state.month} year={state.year} /></div>
          </>
        ) : (
          <div style={{ position: 'relative' }}><PageContent {...commonProps} month={state.month} year={state.year} /></div>
        )}
      </div>
      <PersistenceWarning />
    </div>
  );
}
