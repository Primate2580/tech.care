import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import Avatar from '../components/ui/Avatar.jsx';
import StatusPill from '../components/ui/StatusPill.jsx';
import { usePatients } from '../hooks/usePatients.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { patientAt, slugify } from '../lib/patients.js';
import { formatTime, workday } from '../lib/dates.js';
import { APPOINTMENTS, WEEKDAYS } from '../data/schedule.js';

export default function Schedule() {
  useDocumentTitle('Schedule');
  const { patients } = usePatients();
  const today = workday();
  const [day, setDay] = useState(today.index);

  const items = useMemo(
    () => APPOINTMENTS.filter((a) => a.day === day).sort((a, b) => a.time.localeCompare(b.time)),
    [day],
  );

  return (
    <main className="card px-5 pb-6 pt-[22px]">
      <h1 className="text-card-title">Schedule</h1>

      <div role="group" aria-label="Day of the week" className="mt-6 flex gap-2 overflow-x-auto">
        {WEEKDAYS.map((name, index) => (
          <button
            key={name}
            type="button"
            aria-pressed={day === index}
            onClick={() => setDay(index)}
            className="shrink-0 rounded-full bg-page px-5 py-2 font-bold aria-pressed:bg-teal"
          >
            {name}
            {today.isToday && today.index === index && <span className="ml-2 font-normal">(today)</span>}
          </button>
        ))}
      </div>

      <h2 className="mt-8 text-inner-title" aria-live="polite">
        {WEEKDAYS[day]} · {items.length} appointment{items.length === 1 ? '' : 's'}
      </h2>

      {items.length === 0 ? (
        <p className="mt-4 text-muted">No appointments scheduled.</p>
      ) : (
        <ul className="mt-4 divide-y divide-line">
          {items.map((appointment) => {
            const patient = patientAt(patients, appointment.patientIndex);
            return (
              <li key={appointment.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-4">
                <div className="w-24 shrink-0">
                  <p className="font-bold">{formatTime(appointment.time)}</p>
                  <p className="text-muted">{appointment.minutes} min</p>
                </div>
                <Link
                  to={`/patients/${slugify(patient.name)}`}
                  className="flex min-w-[200px] flex-1 items-center gap-3"
                >
                  <Avatar patient={patient} />
                  <span className="min-w-0">
                    <span className="block truncate font-bold">{patient.name}</span>
                    <span className="block truncate text-muted">{appointment.type}</span>
                  </span>
                </Link>
                <StatusPill status={appointment.status} />
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
