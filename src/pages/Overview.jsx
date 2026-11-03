import { useMemo } from 'react';
import { Link } from 'react-router';
import Avatar from '../components/ui/Avatar.jsx';
import { usePatients } from '../hooks/usePatients.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { useMessages } from '../hooks/useMessages.js';
import { latestEntry } from '../lib/history.js';
import { patientAt, slugify } from '../lib/patients.js';
import { formatLongDate, formatMoney, formatTime, workday } from '../lib/dates.js';
import { APPOINTMENTS, WEEKDAYS } from '../data/schedule.js';
import { THREADS } from '../data/messages.js';
import { TRANSACTIONS } from '../data/transactions.js';

function StatCard({ to, label, value, note, bgClass }) {
  return (
    <li>
      <Link to={to} className={`block h-full rounded-card p-5 transition-opacity hover:opacity-80 ${bgClass}`}>
        <p>{label}</p>
        <p className="mt-2 text-[30px] font-extrabold leading-[41px]">{value}</p>
        <p className="mt-1 text-muted">{note}</p>
      </Link>
    </li>
  );
}

export default function Overview() {
  useDocumentTitle('Overview');
  const { patients } = usePatients();
  const { opened } = useMessages();
  const { index: dayIndex, isToday } = workday();

  // Real data: patients whose latest systolic reading is flagged by the API.
  const flagged = useMemo(
    () =>
      patients.filter(
        (p) => latestEntry(p.diagnosis_history ?? [])?.blood_pressure.systolic.levels === 'Higher than Average',
      ),
    [patients],
  );

  // Mock data.
  const appointments = APPOINTMENTS.filter((a) => a.day === dayIndex)
    .filter((a) => a.status !== 'Cancelled')
    .sort((a, b) => a.time.localeCompare(b.time));
  const unread = THREADS.reduce((total, thread) => {
    const slug = slugify(patientAt(patients, thread.patientIndex).name);
    return total + (opened.includes(slug) ? 0 : thread.unread);
  }, 0);
  const pending = TRANSACTIONS.filter((t) => t.status === 'Pending');
  const pendingTotal = pending.reduce((total, t) => total + t.amount, 0);

  return (
    <main className="flex flex-col gap-8">
      <section aria-labelledby="overview-title" className="card px-5 pb-6 pt-[22px]">
        <h1 id="overview-title" className="text-card-title">
          Overview
        </h1>
        <p className="mt-1 text-muted">{formatLongDate()}</p>

        <ul className="mt-6 grid gap-[22px] sm:grid-cols-2 xl:grid-cols-4">
          <StatCard to="/patients" label="Patients" value={patients.length} note="Registered" bgClass="bg-respiratory" />
          <StatCard
            to="/schedule"
            label={isToday ? 'Appointments today' : `Appointments ${WEEKDAYS[dayIndex]}`}
            value={appointments.length}
            note="Excluding cancelled"
            bgClass="bg-bp-panel"
          />
          <StatCard to="/message" label="Unread messages" value={unread} note="Across conversations" bgClass="bg-heart" />
          <StatCard
            to="/transactions"
            label="Pending payments"
            value={formatMoney(pendingTotal)}
            note={`${pending.length} transactions`}
            bgClass="bg-temperature"
          />
        </ul>
      </section>

      <div className="grid items-start gap-8 lg:grid-cols-2">
        <section aria-labelledby="attention-title" className="card px-5 pb-5 pt-[22px]">
          <h2 id="attention-title" className="text-inner-title">
            Needs attention
          </h2>
          <p className="mt-1 text-muted">Latest systolic reading higher than average ({flagged.length} patients)</p>
          {flagged.length === 0 ? (
            <p className="mt-4 text-muted">No patients are flagged right now.</p>
          ) : (
            <ul className="mt-4 divide-y divide-line">
              {flagged.slice(0, 6).map((patient) => {
                const { systolic, diastolic } = latestEntry(patient.diagnosis_history).blood_pressure;
                return (
                  <li key={patient.name}>
                    <Link
                      to={`/patients/${slugify(patient.name)}`}
                      className="flex items-center gap-3 py-3 hover:bg-page"
                    >
                      <Avatar patient={patient} className="size-10" />
                      <span className="min-w-0 flex-1 truncate font-bold">{patient.name}</span>
                      <span className="font-bold">
                        {systolic.value}/{diastolic.value}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section aria-labelledby="today-title" className="card px-5 pb-5 pt-[22px]">
          <h2 id="today-title" className="text-inner-title">
            {isToday ? "Today's appointments" : `Appointments on ${WEEKDAYS[dayIndex]}`}
          </h2>
          <ul className="mt-4 divide-y divide-line">
            {appointments.map((appointment) => {
              const patient = patientAt(patients, appointment.patientIndex);
              return (
                <li key={appointment.id} className="flex items-center gap-3 py-3">
                  <span className="w-20 shrink-0 font-bold">{formatTime(appointment.time)}</span>
                  <Link to={`/patients/${slugify(patient.name)}`} className="min-w-0 flex-1">
                    <span className="block truncate font-bold">{patient.name}</span>
                    <span className="block truncate text-muted">{appointment.type}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link to="/schedule" className="mt-4 inline-block rounded-full bg-teal px-5 py-2 font-bold">
            Open schedule
          </Link>
        </section>
      </div>
    </main>
  );
}
