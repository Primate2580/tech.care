/** Temperature from the API is in °F; show it in the unit the user picked in Settings. */
export function formatTemperature(fahrenheit, unit) {
  if (unit === 'C') {
    const celsius = Math.round(((fahrenheit - 32) * 5 * 10) / 9) / 10;
    return `${celsius.toFixed(1)}°C`;
  }
  return `${fahrenheit}°F`;
}
