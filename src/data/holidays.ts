export interface Holiday {
  name: string;
  month: number; // 0-indexed
  day: number;   // 1-based
}

export type HolidayMap = Record<string, string>; // key: "YYYY-MM-DD", value: holiday name

export const US_FEDERAL_HOLIDAYS: Holiday[] = [
  { name: "New Year's Day",             month: 0,  day: 1  },
  { name: "Martin Luther King Jr. Day", month: 0,  day: 20 },
  { name: "Presidents' Day",            month: 1,  day: 17 },
  { name: "Memorial Day",               month: 4,  day: 26 },
  { name: "Juneteenth",                 month: 5,  day: 19 },
  { name: "Independence Day",           month: 6,  day: 4  },
  { name: "Labor Day",                  month: 8,  day: 1  },
  { name: "Columbus Day",               month: 9,  day: 13 },
  { name: "Veterans Day",               month: 10, day: 11 },
  { name: "Thanksgiving Day",           month: 10, day: 27 },
  { name: "Christmas Day",              month: 11, day: 25 },
];

export function buildHolidayMap(year: number): HolidayMap {
  const map: HolidayMap = {};
  for (const h of US_FEDERAL_HOLIDAYS) {
    const key = `${year}-${String(h.month + 1).padStart(2, '0')}-${String(h.day).padStart(2, '0')}`;
    map[key] = h.name;
  }
  return map;
}
