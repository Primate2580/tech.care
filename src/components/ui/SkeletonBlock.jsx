/** A pulsing placeholder box (the pulse is skipped for people who prefer reduced motion). */
export default function SkeletonBlock({ className = '' }) {
  return <div aria-hidden="true" className={`rounded-xl bg-line motion-safe:animate-pulse ${className}`} />;
}
