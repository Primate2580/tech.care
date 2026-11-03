import Modal from '../ui/Modal.jsx';
import { useSettings } from '../../hooks/useSettings.js';

const UNITS = [
  { value: 'F', label: 'Fahrenheit (°F)' },
  { value: 'C', label: 'Celsius (°C)' },
];

export default function SettingsDialog({ open, onClose }) {
  const { temperatureUnit, setTemperatureUnit } = useSettings();

  return (
    <Modal open={open} onClose={onClose} title="Settings">
      <fieldset className="mt-6">
        <legend className="font-bold">Temperature unit</legend>
        {UNITS.map(({ value, label }) => (
          <label key={value} className="mt-3 flex cursor-pointer items-center gap-3">
            <input
              type="radio"
              name="temperature-unit"
              value={value}
              checked={temperatureUnit === value}
              onChange={() => setTemperatureUnit(value)}
              className="size-4 accent-teal"
            />
            {label}
          </label>
        ))}
      </fieldset>
      <p className="mt-4 text-muted">Your choice is saved in this browser.</p>
    </Modal>
  );
}
