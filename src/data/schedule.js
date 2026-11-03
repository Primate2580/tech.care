// Mock data: the Patient Data API has no appointments.
// `patientIndex` points into the real patient list, so names and photos stay consistent.
export const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const APPOINTMENTS = [
  { id: 'a1', day: 0, time: '09:00', minutes: 30, type: 'Annual check-up', status: 'Confirmed', patientIndex: 0 },
  { id: 'a2', day: 0, time: '10:30', minutes: 45, type: 'New patient consultation', status: 'Confirmed', patientIndex: 3 },
  { id: 'a3', day: 0, time: '14:00', minutes: 20, type: 'Vaccination', status: 'Pending', patientIndex: 5 },
  { id: 'a4', day: 1, time: '08:30', minutes: 30, type: 'Blood pressure review', status: 'Confirmed', patientIndex: 2 },
  { id: 'a5', day: 1, time: '11:00', minutes: 30, type: 'Follow-up', status: 'Confirmed', patientIndex: 4 },
  { id: 'a6', day: 1, time: '13:30', minutes: 45, type: 'Lab results review', status: 'Pending', patientIndex: 6 },
  { id: 'a7', day: 1, time: '16:00', minutes: 30, type: 'Follow-up', status: 'Cancelled', patientIndex: 7 },
  { id: 'a8', day: 2, time: '09:30', minutes: 30, type: 'Annual check-up', status: 'Confirmed', patientIndex: 8 },
  { id: 'a9', day: 2, time: '12:00', minutes: 20, type: 'Vaccination', status: 'Confirmed', patientIndex: 1 },
  { id: 'a10', day: 2, time: '15:00', minutes: 45, type: 'Blood pressure review', status: 'Pending', patientIndex: 9 },
  { id: 'a11', day: 3, time: '08:00', minutes: 30, type: 'Follow-up', status: 'Confirmed', patientIndex: 10 },
  { id: 'a12', day: 3, time: '10:00', minutes: 30, type: 'Lab results review', status: 'Confirmed', patientIndex: 11 },
  { id: 'a13', day: 3, time: '14:30', minutes: 45, type: 'New patient consultation', status: 'Pending', patientIndex: 12 },
  { id: 'a14', day: 4, time: '09:00', minutes: 30, type: 'Annual check-up', status: 'Confirmed', patientIndex: 13 },
  { id: 'a15', day: 4, time: '11:30', minutes: 30, type: 'Follow-up', status: 'Confirmed', patientIndex: 14 },
];
