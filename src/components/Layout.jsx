import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Header from './Header.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import ErrorState from './ErrorState.jsx';
import { DashboardSkeleton, PageSkeleton } from './Skeletons.jsx';
import { usePatients } from '../hooks/usePatients.js';

/**
 * Shell shared by every route. It decides what the page area shows, so individual pages
 * only ever render once the patient data is ready: skeleton, error, empty, or the page.
 */
export default function Layout() {
  const { status, patients, error, reload } = usePatients();
  const { pathname } = useLocation();

  // A new page should start at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  let content;
  if (status === 'loading') {
    const isDashboard = pathname === '/' || pathname.startsWith('/patients');
    content = isDashboard ? <DashboardSkeleton /> : <PageSkeleton />;
  } else if (status === 'error') {
    content = <ErrorState error={error} onRetry={reload} />;
  } else if (patients.length === 0) {
    content = (
      <main className="card mx-auto max-w-[600px] px-6 py-10 text-center">
        <h1 className="text-card-title">No patients found</h1>
        <p className="mt-3 text-muted">The API returned an empty list.</p>
        <button type="button" onClick={reload} className="mt-6 h-[38px] rounded-full bg-teal px-6 font-bold">
          Reload
        </button>
      </main>
    );
  } else {
    content = (
      <ErrorBoundary resetKey={pathname}>
        <Outlet />
      </ErrorBoundary>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] p-[18px]">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-teal focus:px-5 focus:py-2 focus:font-bold"
      >
        Skip to content
      </a>
      <Header />
      <div id="content" tabIndex={-1} className="mt-[18px] outline-none">
        {content}
      </div>
    </div>
  );
}
