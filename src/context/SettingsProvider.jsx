import { useMemo, useState } from 'react';
import { SettingsContext } from './SettingsContext.js';

const STORAGE_KEY = 'tech-care-temperature-unit';

// localStorage can throw (private mode, blocked storage), so every access is guarded.
function readUnit() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'C' ? 'C' : 'F';
  } catch {
    return 'F';
  }
}

export default function SettingsProvider({ children }) {
  const [temperatureUnit, setUnit] = useState(readUnit);

  const value = useMemo(
    () => ({
      temperatureUnit,
      setTemperatureUnit(unit) {
        setUnit(unit);
        try {
          localStorage.setItem(STORAGE_KEY, unit);
        } catch {
          /* the setting still works for this session */
        }
      },
    }),
    [temperatureUnit],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
