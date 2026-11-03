import { useContext } from 'react';
import { PatientsContext } from '../context/PatientsContext.js';

export function usePatients() {
  const context = useContext(PatientsContext);
  if (!context) throw new Error('usePatients must be used inside <PatientsProvider>');
  return context;
}
