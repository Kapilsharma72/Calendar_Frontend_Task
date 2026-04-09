export interface ThemeColors {
  primary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
}

export interface MonthTheme {
  name: string;
  light: ThemeColors;
  dark: ThemeColors;
}

export type MonthThemes = [
  MonthTheme, MonthTheme, MonthTheme, MonthTheme,
  MonthTheme, MonthTheme, MonthTheme, MonthTheme,
  MonthTheme, MonthTheme, MonthTheme, MonthTheme,
];

export const MONTH_THEMES: MonthThemes = [
  // January
  {
    name: 'January',
    light: { primary: '#1e3a5f', accent: '#4a90d9', background: '#f0f4f8', surface: '#ffffff', text: '#1a202c', textMuted: '#718096' },
    dark:  { primary: '#4a90d9', accent: '#90cdf4', background: '#0d1b2a', surface: '#1a2d42', text: '#e2e8f0', textMuted: '#a0aec0' },
  },
  // February
  {
    name: 'February',
    light: { primary: '#9b2335', accent: '#e8748a', background: '#fff5f7', surface: '#ffffff', text: '#1a202c', textMuted: '#718096' },
    dark:  { primary: '#e8748a', accent: '#fbb6ce', background: '#2d0a12', surface: '#4a1020', text: '#e2e8f0', textMuted: '#a0aec0' },
  },
  // March
  {
    name: 'March',
    light: { primary: '#276749', accent: '#48bb78', background: '#f0fff4', surface: '#ffffff', text: '#1a202c', textMuted: '#718096' },
    dark:  { primary: '#48bb78', accent: '#9ae6b4', background: '#0a1f14', surface: '#14321f', text: '#e2e8f0', textMuted: '#a0aec0' },
  },
  // April
  {
    name: 'April',
    light: { primary: '#553c9a', accent: '#9f7aea', background: '#faf5ff', surface: '#ffffff', text: '#1a202c', textMuted: '#718096' },
    dark:  { primary: '#9f7aea', accent: '#d6bcfa', background: '#1a0a2e', surface: '#2d1a4a', text: '#e2e8f0', textMuted: '#a0aec0' },
  },
  // May
  {
    name: 'May',
    light: { primary: '#b7791f', accent: '#f6ad55', background: '#fffbeb', surface: '#ffffff', text: '#1a202c', textMuted: '#718096' },
    dark:  { primary: '#f6ad55', accent: '#fbd38d', background: '#1f1500', surface: '#332200', text: '#e2e8f0', textMuted: '#a0aec0' },
  },
  // June
  {
    name: 'June',
    light: { primary: '#234e52', accent: '#38b2ac', background: '#e6fffa', surface: '#ffffff', text: '#1a202c', textMuted: '#718096' },
    dark:  { primary: '#38b2ac', accent: '#81e6d9', background: '#071a19', surface: '#0d2e2c', text: '#e2e8f0', textMuted: '#a0aec0' },
  },
  // July
  {
    name: 'July',
    light: { primary: '#c53030', accent: '#fc8181', background: '#fff5f5', surface: '#ffffff', text: '#1a202c', textMuted: '#718096' },
    dark:  { primary: '#fc8181', accent: '#feb2b2', background: '#2d0000', surface: '#4a0000', text: '#e2e8f0', textMuted: '#a0aec0' },
  },
  // August
  {
    name: 'August',
    light: { primary: '#c05621', accent: '#ed8936', background: '#fffaf0', surface: '#ffffff', text: '#1a202c', textMuted: '#718096' },
    dark:  { primary: '#ed8936', accent: '#fbd38d', background: '#1f0d00', surface: '#331500', text: '#e2e8f0', textMuted: '#a0aec0' },
  },
  // September
  {
    name: 'September',
    light: { primary: '#744210', accent: '#d69e2e', background: '#fefce8', surface: '#ffffff', text: '#1a202c', textMuted: '#718096' },
    dark:  { primary: '#d69e2e', accent: '#f6e05e', background: '#1a1000', surface: '#2d1c00', text: '#e2e8f0', textMuted: '#a0aec0' },
  },
  // October
  {
    name: 'October',
    light: { primary: '#9c4221', accent: '#dd6b20', background: '#fff8f1', surface: '#ffffff', text: '#1a202c', textMuted: '#718096' },
    dark:  { primary: '#dd6b20', accent: '#f6ad55', background: '#1f0a00', surface: '#331200', text: '#e2e8f0', textMuted: '#a0aec0' },
  },
  // November
  {
    name: 'November',
    light: { primary: '#702459', accent: '#b83280', background: '#fff5f7', surface: '#ffffff', text: '#1a202c', textMuted: '#718096' },
    dark:  { primary: '#b83280', accent: '#d53f8c', background: '#1f0014', surface: '#330020', text: '#e2e8f0', textMuted: '#a0aec0' },
  },
  // December
  {
    name: 'December',
    light: { primary: '#22543d', accent: '#c53030', background: '#f0fff4', surface: '#ffffff', text: '#1a202c', textMuted: '#718096' },
    dark:  { primary: '#48bb78', accent: '#fc8181', background: '#0a1f14', surface: '#14321f', text: '#e2e8f0', textMuted: '#a0aec0' },
  },
];
