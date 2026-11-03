import { Component } from 'react';

/** Catches rendering errors in a page so the header stays usable. Resets when `resetKey` changes. */
export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info.componentStack);
  }

  componentDidUpdate(previous) {
    if (this.state.failed && previous.resetKey !== this.props.resetKey) {
      this.setState({ failed: false });
    }
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main>
        <div role="alert" className="card mx-auto max-w-[600px] px-6 py-10 text-center">
          <h1 className="text-card-title">Something went wrong</h1>
          <p className="mt-3 text-muted">This page hit an unexpected error. Reloading usually fixes it.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 h-[38px] rounded-full bg-teal px-6 font-bold"
          >
            Reload page
          </button>
        </div>
      </main>
    );
  }
}
