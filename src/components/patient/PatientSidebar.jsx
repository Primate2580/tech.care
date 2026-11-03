import { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink } from 'react-router';
import { slugify } from '../../lib/patients.js';
import searchIcon from '../../assets/icons/search.png';
import Avatar from '../ui/Avatar.jsx';
import PatientRowMenu from './PatientRowMenu.jsx';

export default function PatientSidebar({ patients }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return term ? patients.filter((p) => p.name.toLowerCase().includes(term)) : patients;
  }, [patients, query]);

  function toggleSearch() {
    if (searchOpen) setQuery('');
    setSearchOpen(!searchOpen);
  }

  return (
    <aside
      aria-labelledby="patients-title"
      className="card flex max-h-[700px] flex-col pt-5 lg:h-[1054px] lg:max-h-none xl:mt-[14px]"
    >
      <div className={`flex items-center justify-between px-5 ${searchOpen ? 'pb-3' : 'pb-[25px]'}`}>
        <h2 id="patients-title" className="text-card-title">
          Patients
        </h2>
        <button
          type="button"
          aria-label="Search patients"
          aria-expanded={searchOpen}
          aria-controls="patient-search"
          onClick={toggleSearch}
          className="p-1"
        >
          <img src={searchIcon} alt="" width="18" height="18" />
        </button>
      </div>

      {searchOpen && (
        <div className="px-5 pb-3">
          <input
            id="patient-search"
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => event.key === 'Escape' && toggleSearch()}
            placeholder="Search by name"
            aria-label="Search patients by name"
            className="w-full rounded-full bg-page px-4 py-2"
          />
        </div>
      )}

      <ul className="scroll-thin mr-[10px] min-h-0 flex-1 overflow-y-auto">
        {visible.map((patient) => {
          const slug = slugify(patient.name);
          return (
            <li key={slug} className="patient-row">
              {/* NavLink adds aria-current="page" to the open patient; the row highlight keys off it. */}
              <NavLink to={`/patients/${slug}`} className="flex min-w-0 flex-1 items-center gap-3 self-stretch">
                <Avatar patient={patient} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-bold">{patient.name}</span>
                  <span className="block text-muted">
                    {patient.gender}, {patient.age}
                  </span>
                </span>
              </NavLink>
              <PatientRowMenu patient={patient} slug={slug} />
            </li>
          );
        })}
        {visible.length === 0 && <li className="px-5 py-4 text-muted">No patients match "{query}".</li>}
      </ul>
    </aside>
  );
}
