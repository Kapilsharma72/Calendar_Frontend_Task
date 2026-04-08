# Interactive Calendar

A dynamic, interactive calendar app built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**. Features month-based themes, holiday markers, per-day notes, and full dark mode support.

## Features

- **Month-based themes** — unique color palette for each month (light & dark variants)
- **Holiday markers** — highlights public holidays on the calendar grid
- **Per-day notes** — add and persist notes to any day
- **Dark mode** — automatic theme switching with reduced-motion support
- **Fully responsive** — works across all screen sizes
- **SSR-safe** — calendar loads client-side via dynamic import

## Tech Stack

| Tool | Version |
|------|---------|
| Next.js | 16.2.2 |
| React | 19.2.4 |
| Tailwind CSS | v4 |
| TypeScript | v5 |
| Vitest | v4 |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
npm run test       # Run tests (single run)
npm run test:watch # Run tests in watch mode
```

## Project Structure

```
src/
├── app/                  # Next.js app router
├── components/Calendar/  # Calendar UI components
├── context/              # CalendarContext (state provider)
├── data/                 # Themes, holidays, images
├── hooks/                # Custom hooks (persistence, debounce, motion)
├── state/                # Reducer logic
├── types/                # TypeScript types
└── utils/                # Helper utilities
```

## Deployment

Deployed on [Vercel](https://vercel.com). Push to `main` branch triggers automatic deployment.

## License

MIT
