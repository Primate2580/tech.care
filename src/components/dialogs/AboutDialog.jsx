import Modal from '../ui/Modal.jsx';

export default function AboutDialog({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="About Tech.Care">
      <p className="mt-4">
        A demo patient dashboard built with React, React Router, Tailwind CSS and Chart.js.
      </p>
      <p className="mt-3 text-muted">
        Patient data comes from the Coalition Technologies Patient Data API.
      </p>
    </Modal>
  );
}
