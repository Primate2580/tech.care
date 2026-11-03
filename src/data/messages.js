// Mock data: the Patient Data API has no messages.
export const THREADS = [
  {
    patientIndex: 0,
    unread: 2,
    when: '9:12 AM',
    messages: [
      { from: 'patient', text: 'Good morning, Doctor. My latest blood pressure readings at home were a little high.', time: '9:05 AM' },
      { from: 'patient', text: 'Should I come in sooner than my next appointment?', time: '9:12 AM' },
    ],
  },
  {
    patientIndex: 3,
    unread: 1,
    when: '8:40 AM',
    messages: [
      { from: 'doctor', text: 'Your new patient forms are in. Please bring your insurance card on Monday.', time: 'Yesterday' },
      { from: 'patient', text: 'Will do. Is there anything I should do to prepare, like fasting?', time: '8:40 AM' },
    ],
  },
  {
    patientIndex: 2,
    unread: 0,
    when: 'Yesterday',
    messages: [
      { from: 'patient', text: 'Thanks for explaining the lab results yesterday.', time: 'Yesterday' },
      { from: 'doctor', text: 'You are welcome. Keep up the daily walks and let me know if anything changes.', time: 'Yesterday' },
    ],
  },
  {
    patientIndex: 4,
    unread: 0,
    when: 'Yesterday',
    messages: [
      { from: 'patient', text: 'Could I move my Tuesday follow-up to the afternoon?', time: 'Yesterday' },
      { from: 'doctor', text: 'Yes, I have 1:30 PM open. I have updated your booking.', time: 'Yesterday' },
      { from: 'patient', text: 'Perfect, see you then.', time: 'Yesterday' },
    ],
  },
  {
    patientIndex: 6,
    unread: 3,
    when: 'Mon',
    messages: [
      { from: 'patient', text: 'I have been getting headaches in the evenings this week.', time: 'Mon' },
      { from: 'patient', text: 'They usually last about an hour.', time: 'Mon' },
      { from: 'patient', text: 'Is that something to worry about?', time: 'Mon' },
    ],
  },
  {
    patientIndex: 5,
    unread: 0,
    when: 'Mon',
    messages: [
      { from: 'doctor', text: 'Reminder: your vaccination appointment is this afternoon at 2:00 PM.', time: 'Mon' },
      { from: 'patient', text: 'Thank you for the reminder!', time: 'Mon' },
    ],
  },
  {
    patientIndex: 7,
    unread: 0,
    when: 'Last week',
    messages: [
      { from: 'patient', text: 'I need to cancel my Tuesday appointment, something came up.', time: 'Last week' },
      { from: 'doctor', text: 'No problem. Reply here when you want to rebook.', time: 'Last week' },
    ],
  },
];
