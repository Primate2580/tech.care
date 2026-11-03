import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchPatients } from '../lib/api.js';
import { PatientsContext } from './PatientsContext.js';

/** Fetches the patient list so every page shares it; `reload()` fetches it again. */
export default function PatientsProvider({ children }) {
  const [state, setState] = useState({ status: 'loading', patients: [], error: null });
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetchPatients(controller.signal)
      .then((patients) => setState({ status: 'ready', patients, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ status: 'error', patients: [], error });
      });
    return () => controller.abort();
  }, [reloadKey]);

  const reload = useCallback(() => {
    setState((current) => ({ ...current, status: 'loading', error: null }));
    setReloadKey((key) => key + 1);
  }, []);

  const value = useMemo(() => ({ ...state, reload }), [state, reload]);
  return <PatientsContext.Provider value={value}>{children}</PatientsContext.Provider>;
}
