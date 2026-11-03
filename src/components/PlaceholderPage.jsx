import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

/** Temporary page body for sections that are built in a later step. */
export default function PlaceholderPage({ title, children }) {
  useDocumentTitle(title);
  return (
    <main className="card px-5 py-[22px]">
      <h1 className="text-card-title">{title}</h1>
      <p className="mt-4 text-muted">{children}</p>
    </main>
  );
}
