// Coalition Technologies Patient Data API (public test credentials).
// Override with VITE_API_URL / VITE_API_USER / VITE_API_PASSWORD in a .env file (see .env.example).
// Note: anything prefixed VITE_ ends up in the browser bundle, so never put real secrets here.
export const API_URL =
  import.meta.env.VITE_API_URL || 'https://fedskillstest.coalitiontechnologies.workers.dev';
export const API_USER = import.meta.env.VITE_API_USER || 'coalition';
export const API_PASSWORD = import.meta.env.VITE_API_PASSWORD || 'skills-test';
