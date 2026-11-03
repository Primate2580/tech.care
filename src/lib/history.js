const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const toTime = (entry) => new Date(entry.year, MONTHS.indexOf(entry.month), 1).getTime();

/** Oldest -> newest, without mutating the API data (it is not guaranteed to be in order). */
export const sortHistory = (history) => [...history].sort((a, b) => toTime(a) - toTime(b));

/** The most recent `count` months, oldest first. */
export const lastMonths = (history, count = 6) => sortHistory(history).slice(-count);

/** The newest entry: it drives the readings and vital-sign cards. */
export const latestEntry = (history) => sortHistory(history).at(-1);

/** Shape the entries for the blood pressure chart (Step 7). */
export function toChartSeries(entries) {
  return {
    labels: entries.map((e) => `${e.month.slice(0, 3)}, ${e.year}`), // "Oct, 2023"
    systolic: entries.map((e) => e.blood_pressure.systolic.value),
    diastolic: entries.map((e) => e.blood_pressure.diastolic.value),
  };
}
