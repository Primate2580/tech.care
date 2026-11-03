import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import StatusPill from '../components/ui/StatusPill.jsx';
import { usePatients } from '../hooks/usePatients.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { patientAt, slugify } from '../lib/patients.js';
import { formatMoney, formatShortDate } from '../lib/dates.js';
import { TRANSACTIONS } from '../data/transactions.js';

const FILTERS = ['All', 'Paid', 'Pending', 'Refunded'];
const SORTS = {
  newest: { label: 'Newest first', compare: (a, b) => a.daysAgo - b.daysAgo },
  oldest: { label: 'Oldest first', compare: (a, b) => b.daysAgo - a.daysAgo },
  highest: { label: 'Highest amount', compare: (a, b) => b.amount - a.amount },
  lowest: { label: 'Lowest amount', compare: (a, b) => a.amount - b.amount },
};

const sum = (items, status) =>
  items.filter((t) => t.status === status).reduce((total, t) => total + t.amount, 0);

export default function Transactions() {
  useDocumentTitle('Transactions');
  const { patients } = usePatients();
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('newest');

  const rows = useMemo(
    () =>
      TRANSACTIONS.filter((t) => filter === 'All' || t.status === filter).sort(SORTS[sort].compare),
    [filter, sort],
  );

  const now = Date.now();

  return (
    <main className="flex flex-col gap-8">
      <section aria-labelledby="transactions-title" className="card px-5 pb-6 pt-[22px]">
        <h1 id="transactions-title" className="text-card-title">
          Transactions
        </h1>
        <ul className="mt-6 grid gap-[22px] sm:grid-cols-3">
          {[
            ['Paid', 'bg-respiratory'],
            ['Pending', 'bg-bp-panel'],
            ['Refunded', 'bg-temperature'],
          ].map(([label, bgClass]) => (
            <li key={label} className={`rounded-card p-5 ${bgClass}`}>
              <p>{label}</p>
              <p className="mt-2 text-[30px] font-extrabold leading-[41px]">{formatMoney(sum(TRANSACTIONS, label))}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Transaction list" className="card px-5 pb-6 pt-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div role="group" aria-label="Filter by status" className="flex flex-wrap gap-2">
            {FILTERS.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={filter === name}
                onClick={() => setFilter(name)}
                className="rounded-full bg-page px-5 py-2 font-bold aria-pressed:bg-teal"
              >
                {name}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort">Sort by</label>
            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-full bg-page px-4 py-2"
            >
              {Object.entries(SORTS).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-4 text-muted" aria-live="polite">
          {rows.length} transaction{rows.length === 1 ? '' : 's'}
        </p>

        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="bg-page">
                <th scope="col" className="rounded-l-full py-3 pl-4 font-bold">ID</th>
                <th scope="col" className="py-3 font-bold">Date</th>
                <th scope="col" className="py-3 font-bold">Patient</th>
                <th scope="col" className="py-3 font-bold">Description</th>
                <th scope="col" className="py-3 font-bold">Method</th>
                <th scope="col" className="py-3 text-right font-bold">Amount</th>
                <th scope="col" className="rounded-r-full py-3 pl-6 pr-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((transaction) => {
                const patient = patientAt(patients, transaction.patientIndex);
                return (
                  <tr key={transaction.id}>
                    <td className="py-3 pl-4 text-muted">{transaction.id}</td>
                    <td className="py-3">{formatShortDate(now - transaction.daysAgo * 86_400_000)}</td>
                    <td className="py-3">
                      <Link to={`/patients/${slugify(patient.name)}`} className="font-bold hover:underline">
                        {patient.name}
                      </Link>
                    </td>
                    <td className="py-3">{transaction.description}</td>
                    <td className="py-3">{transaction.method}</td>
                    <td className="py-3 text-right font-bold">{formatMoney(transaction.amount)}</td>
                    <td className="py-3 pl-6 pr-4">
                      <StatusPill status={transaction.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
