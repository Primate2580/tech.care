// Mock data: the Patient Data API has no billing records.
// `daysAgo` keeps the dates recent whenever the app is opened.
export const TRANSACTIONS = [
  { id: 'TX-1042', daysAgo: 0, patientIndex: 3, description: 'New patient consultation', method: 'Visa ending 4242', amount: 185, status: 'Paid' },
  { id: 'TX-1041', daysAgo: 1, patientIndex: 0, description: 'Annual check-up', method: 'Insurance claim', amount: 120, status: 'Pending' },
  { id: 'TX-1040', daysAgo: 1, patientIndex: 2, description: 'Blood pressure review', method: 'Mastercard ending 8821', amount: 90, status: 'Paid' },
  { id: 'TX-1039', daysAgo: 2, patientIndex: 4, description: 'Follow-up visit', method: 'Cash', amount: 75, status: 'Paid' },
  { id: 'TX-1038', daysAgo: 3, patientIndex: 7, description: 'Follow-up visit (cancelled)', method: 'Visa ending 1109', amount: 75, status: 'Refunded' },
  { id: 'TX-1037', daysAgo: 4, patientIndex: 6, description: 'Lab results review', method: 'Insurance claim', amount: 110, status: 'Pending' },
  { id: 'TX-1036', daysAgo: 5, patientIndex: 5, description: 'Vaccination', method: 'Visa ending 7730', amount: 60, status: 'Paid' },
  { id: 'TX-1035', daysAgo: 7, patientIndex: 8, description: 'Annual check-up', method: 'Insurance claim', amount: 120, status: 'Paid' },
  { id: 'TX-1034', daysAgo: 8, patientIndex: 1, description: 'Vaccination', method: 'Cash', amount: 60, status: 'Paid' },
  { id: 'TX-1033', daysAgo: 10, patientIndex: 9, description: 'Blood pressure review', method: 'Mastercard ending 5512', amount: 90, status: 'Pending' },
  { id: 'TX-1032', daysAgo: 12, patientIndex: 10, description: 'Follow-up visit', method: 'Visa ending 3098', amount: 75, status: 'Paid' },
  { id: 'TX-1031', daysAgo: 14, patientIndex: 11, description: 'Lab results review', method: 'Insurance claim', amount: 110, status: 'Paid' },
  { id: 'TX-1030', daysAgo: 16, patientIndex: 12, description: 'New patient consultation', method: 'Mastercard ending 9047', amount: 185, status: 'Refunded' },
  { id: 'TX-1029', daysAgo: 19, patientIndex: 13, description: 'Annual check-up', method: 'Visa ending 6621', amount: 120, status: 'Paid' },
];
