import { Link } from 'react-router';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function NotFound() {
  useDocumentTitle('Page not found');
  return (
    <main className="card px-5 py-[22px]">
      <h1 className="text-card-title">Page not found</h1>
      <p className="mt-4 text-muted">That address doesn't exist.</p>
      <Link to="/patients" className="mt-6 inline-block rounded-full bg-teal px-5 py-2 font-bold">
        Back to patients
      </Link>
    </main>
  );
}
