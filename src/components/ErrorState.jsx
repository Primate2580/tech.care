import { describeError } from '../lib/errors.js';

export default function ErrorState({ error, onRetry }) {
  return (
    <main>
      <div role="alert" className="card mx-auto max-w-[600px] px-6 py-10 text-center">
        <h1 className="text-card-title">We couldn't load the data</h1>
        <p className="mt-3 text-muted">{describeError(error)}</p>
        <button type="button" onClick={onRetry} className="mt-6 h-[38px] rounded-full bg-teal px-6 font-bold">
          Try again
        </button>
      </div>
    </main>
  );
}
