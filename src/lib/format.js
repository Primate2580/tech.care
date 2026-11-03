/**
 * Formats a date of birth as "August 23, 1996".
 *
 * The year/month/day are read straight from the string instead of going through
 * `new Date(string)`: strings such as "1996-08-23T00:00:00" or "8/23/1996" are parsed
 * in the visitor's local timezone, which can shift the day by one (e.g. Lagos, UTC+1).
 */
export function formatDate(value) {
  const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(value);
  const us = /^(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec(value);

  let date;
  if (iso) date = new Date(Date.UTC(+iso[1], +iso[2] - 1, +iso[3]));
  else if (us) date = new Date(Date.UTC(+us[3], +us[1] - 1, +us[2]));
  else return String(value); // unknown format: show it as received

  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(date);
}
