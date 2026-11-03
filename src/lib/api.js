import { API_URL, API_USER, API_PASSWORD } from './config.js';
import { ApiError } from './errors.js';

const TIMEOUT_MS = 15_000;

/**
 * GET the full patient list.
 * `signal` lets React cancel the request on unmount; a timeout stops it hanging forever.
 */
export async function fetchPatients(signal) {
  const timeout = AbortSignal.timeout(TIMEOUT_MS);
  const combined = signal && AbortSignal.any ? AbortSignal.any([signal, timeout]) : (signal ?? timeout);

  const response = await fetch(API_URL, {
    signal: combined,
    headers: { Authorization: `Basic ${btoa(`${API_USER}:${API_PASSWORD}`)}` },
  });
  if (!response.ok) throw new ApiError(response.status);
  return response.json();
}
