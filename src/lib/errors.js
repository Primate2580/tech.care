/** Thrown when the API answers with a non-2xx status. */
export class ApiError extends Error {
  constructor(status) {
    super(`Patient API request failed (${status})`);
    this.name = 'ApiError';
    this.status = status;
  }
}

/** A message a person can act on, instead of a raw error string. */
export function describeError(error) {
  if (error?.name === 'TimeoutError') {
    return 'The server took too long to respond. Please try again.';
  }
  if (error?.name === 'ApiError') {
    if (error.status === 401 || error.status === 403) {
      return 'The API rejected the credentials. Check the username and password in src/lib/config.js.';
    }
    if (error.status >= 500) {
      return 'The patient service is having problems. Please try again in a moment.';
    }
    return `The server sent an unexpected response (${error.status}).`;
  }
  if (error instanceof TypeError) {
    return 'Could not reach the server. Check your internet connection and try again.';
  }
  return 'Something went wrong while loading the data.';
}
