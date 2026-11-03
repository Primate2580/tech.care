import { createContext } from 'react';

/** Holds { status: 'loading' | 'ready' | 'error', patients, error } for the whole app. */
export const PatientsContext = createContext(null);
