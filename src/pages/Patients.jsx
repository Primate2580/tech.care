import { Link, Navigate, useParams } from 'react-router';
import { usePatients } from '../hooks/usePatients.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { findBySlug, slugify } from '../lib/patients.js';
import PatientSidebar from '../components/patient/PatientSidebar.jsx';
import DiagnosisHistory from '../components/patient/DiagnosisHistory.jsx';
import DiagnosticList from '../components/patient/DiagnosticList.jsx';
import ProfileCard from '../components/patient/ProfileCard.jsx';
import LabResults from '../components/patient/LabResults.jsx';

const DEFAULT_PATIENT = 'Jessica Taylor';

/** /patients -> redirect to the default patient's page. (Layout only renders pages once data is ready.) */
export function PatientsIndex() {
  const { patients } = usePatients();
  useDocumentTitle('Patients');

  const target = patients.find((p) => p.name === DEFAULT_PATIENT) ?? patients[0];
  return <Navigate to={`/patients/${slugify(target.name)}`} replace />;
}

/** /patients/:slug - the full dashboard for one patient. */
export function PatientPage() {
  const { slug } = useParams();
  const { patients } = usePatients();
  const patient = findBySlug(patients, slug);
  useDocumentTitle(patient?.name ?? 'Patients');

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[367px_minmax(0,1fr)_367px]">
      <PatientSidebar patients={patients} />

      {patient ? (
        <>
          <main className="flex flex-col gap-8 xl:mt-[14px]">
            <DiagnosisHistory history={patient.diagnosis_history ?? []} />
            <DiagnosticList items={patient.diagnostic_list ?? []} />
          </main>
          <aside
            aria-label="Patient profile and lab results"
            className="grid items-start gap-8 md:grid-cols-2 lg:col-span-2 xl:col-span-1 xl:grid-cols-1"
          >
            <ProfileCard patient={patient} />
            <LabResults patientName={patient.name} results={patient.lab_results ?? []} />
          </aside>
        </>
      ) : (
        <main className="card px-5 py-[22px] lg:col-span-1 xl:col-span-2 xl:mt-[14px]">
          <h1 className="text-card-title">Patient not found</h1>
          <Link to="/patients" className="mt-6 inline-block rounded-full bg-teal px-5 py-2 font-bold">
            Back to patients
          </Link>
        </main>
      )}
    </div>
  );
}
