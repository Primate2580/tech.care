import SkeletonBlock from './ui/SkeletonBlock.jsx';

/** Placeholder shaped like the Patients dashboard, so the page doesn't jump when data arrives. */
export function DashboardSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="grid items-start gap-8 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[367px_minmax(0,1fr)_367px]"
    >
      <span className="sr-only">Loading patient data…</span>

      <div className="card flex max-h-[700px] flex-col gap-4 overflow-hidden p-5 lg:h-[1054px] lg:max-h-none xl:mt-[14px]">
        <SkeletonBlock className="h-8 w-40" />
        {Array.from({ length: 9 }, (_, index) => (
          <SkeletonBlock key={index} className="h-14 shrink-0" />
        ))}
      </div>

      <div className="flex flex-col gap-8 xl:mt-[14px]">
        <div className="card p-5">
          <SkeletonBlock className="h-8 w-56" />
          <SkeletonBlock className="mt-6 h-[298px]" />
          <div className="mt-[22px] grid gap-[22px] md:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <SkeletonBlock key={index} className="h-[238px]" />
            ))}
          </div>
        </div>
        <div className="card p-5 lg:h-[349px]">
          <SkeletonBlock className="h-8 w-48" />
          <SkeletonBlock className="mt-6 h-[46px] rounded-full" />
          <SkeletonBlock className="mt-4 h-24" />
        </div>
      </div>

      <div className="grid items-start gap-8 md:grid-cols-2 lg:col-span-2 xl:col-span-1 xl:grid-cols-1">
        <div className="card flex flex-col items-center gap-4 p-5 xl:h-[740px]">
          <SkeletonBlock className="size-[200px] rounded-full" />
          <SkeletonBlock className="h-8 w-44" />
          <SkeletonBlock className="h-40 w-full" />
        </div>
        <div className="card p-5 xl:h-[296px]">
          <SkeletonBlock className="h-8 w-40" />
          <SkeletonBlock className="mt-4 h-32" />
        </div>
      </div>
    </div>
  );
}

/** Placeholder for the Overview, Schedule, Message and Transactions pages. */
export function PageSkeleton() {
  return (
    <div role="status" aria-busy="true" className="card p-5">
      <span className="sr-only">Loading…</span>
      <SkeletonBlock className="h-8 w-48" />
      <div className="mt-6 grid gap-[22px] sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <SkeletonBlock key={index} className="h-28" />
        ))}
      </div>
      <SkeletonBlock className="mt-8 h-64" />
    </div>
  );
}
