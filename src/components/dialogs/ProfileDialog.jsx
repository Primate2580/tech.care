import Modal from '../ui/Modal.jsx';
import { formatDate } from '../../lib/format.js';

export default function ProfileDialog({ open, onClose, patient }) {
  const rows = [
    ['Full name', patient.name],
    ['Age', patient.age],
    ['Gender', patient.gender],
    ['Date of birth', formatDate(patient.date_of_birth)],
    ['Contact info', patient.phone_number],
    ['Emergency contact', patient.emergency_contact],
    ['Insurance provider', patient.insurance_type],
    ['Diagnoses on file', patient.diagnostic_list?.length ?? 0],
    ['Lab results', patient.lab_results?.length ?? 0],
    ['Monthly readings on file', patient.diagnosis_history?.length ?? 0],
  ];

  return (
    <Modal open={open} onClose={onClose} title={patient.name}>
      <dl className="mt-6 divide-y divide-line">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 py-3">
            <dt className="text-muted">{label}</dt>
            <dd className="text-right font-bold">{value}</dd>
          </div>
        ))}
      </dl>
    </Modal>
  );
}
