import { Navigate, Route, Routes } from 'react-router';
import PatientsProvider from './context/PatientsProvider.jsx';
import SettingsProvider from './context/SettingsProvider.jsx';
import MessagesProvider from './context/MessagesProvider.jsx';
import Layout from './components/Layout.jsx';
import Overview from './pages/Overview.jsx';
import { PatientsIndex, PatientPage } from './pages/Patients.jsx';
import Schedule from './pages/Schedule.jsx';
import Message from './pages/Message.jsx';
import Transactions from './pages/Transactions.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <PatientsProvider>
      <SettingsProvider>
      <MessagesProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/patients" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="patients" element={<PatientsIndex />} />
          <Route path="patients/:slug" element={<PatientPage />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="message" element={<Message />} />
          <Route path="message/:slug" element={<Message />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      </MessagesProvider>
      </SettingsProvider>
    </PatientsProvider>
  );
}
