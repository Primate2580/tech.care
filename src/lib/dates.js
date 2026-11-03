/** Mon-Fri index (0-4) for the schedule; weekends fall back to Monday. */
export function workday(date = new Date()) {
  const day = date.getDay(); // 0 = Sunday
  const isWorkday = day >= 1 && day <= 5;
  return { index: isWorkday ? day - 1 : 0, isToday: isWorkday };
}

/** "13:30" -> "1:30 PM" */
export function formatTime(hhmm) {
  const [hours, minutes] = hhmm.split(':').map(Number);
  const suffix = hours >= 12 ? 'PM' : 'AM';
  return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${suffix}`;
}

export const formatShortDate = (timestamp) =>
  new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(timestamp);

export const formatLongDate = (date = new Date()) =>
  new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(date);

export const formatMoney = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
