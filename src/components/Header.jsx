import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import MenuButton, { MenuItem } from './ui/MenuButton.jsx';
import SettingsDialog from './dialogs/SettingsDialog.jsx';
import AboutDialog from './dialogs/AboutDialog.jsx';
import { usePatients } from '../hooks/usePatients.js';
import logo from '../assets/images/logo.png';
import doctor from '../assets/images/doctor.png';
import homeIcon from '../assets/icons/home.png';
import patientsIcon from '../assets/icons/patients.png';
import scheduleIcon from '../assets/icons/schedule.png';
import messageIcon from '../assets/icons/message.png';
import transactionsIcon from '../assets/icons/transactions.png';
import gearIcon from '../assets/icons/gear.png';
import dotsIcon from '../assets/icons/ellipsis-vertical.png';

const NAV_ITEMS = [
  { to: '/overview', label: 'Overview', icon: homeIcon, width: 16 },
  { to: '/patients', label: 'Patients', icon: patientsIcon, width: 24 },
  { to: '/schedule', label: 'Schedule', icon: scheduleIcon, width: 16 },
  { to: '/message', label: 'Message', icon: messageIcon, width: 19 },
  { to: '/transactions', label: 'Transactions', icon: transactionsIcon, width: 22 },
];

export default function Header() {
  const { reload } = usePatients();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <header className="flex flex-wrap items-center gap-y-3 rounded-[36px] bg-white px-5 py-3 xl:h-[72px] xl:flex-nowrap xl:rounded-nav xl:py-0 xl:pl-8 xl:pr-9">
      <Link to="/" aria-label="Tech.Care home">
        <img src={logo} alt="Tech.Care" width="208" height="48" className="h-auto w-[150px] sm:w-[208px]" />
      </Link>

      <nav
        aria-label="Main"
        className="order-last w-full overflow-x-auto xl:order-none xl:ml-[196px] xl:w-auto xl:overflow-visible"
      >
        <ul className="mx-auto flex w-max items-center gap-1 xl:mx-0">
          {NAV_ITEMS.map(({ to, label, icon, width }) => (
            <li key={to}>
              {/* NavLink adds aria-current="page" to the active link, and the pill style keys off it. */}
              <NavLink
                to={to}
                className="flex items-center gap-2 rounded-full px-[18px] py-[11px] font-bold transition-colors not-aria-[current=page]:hover:bg-teal-soft aria-[current=page]:mx-4 aria-[current=page]:bg-teal"
              >
                <img src={icon} alt="" width={width} height="17" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="ml-auto flex items-center">
        <img src={doctor} alt="" width="44" height="44" className="size-11 rounded-full" />
        <div className="ml-3 hidden sm:block">
          <p className="font-bold">Dr. Jose Simmons</p>
          <p className="text-muted">General Practitioner</p>
        </div>
        <div className="ml-[13px] flex items-center gap-3 border-l border-line pl-[9px]">
          <button type="button" aria-label="Settings" onClick={() => setSettingsOpen(true)} className="p-1">
            <img src={gearIcon} alt="" width="19" height="20" />
          </button>
          <MenuButton label="More options" icon={dotsIcon} iconWidth="4" iconHeight="18" className="p-1">
            {({ close }) => (
              <>
                <MenuItem
                  onClick={() => {
                    close();
                    reload();
                  }}
                >
                  Reload data
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    close();
                    setAboutOpen(true);
                  }}
                >
                  About Tech.Care
                </MenuItem>
              </>
            )}
          </MenuButton>
        </div>
      </div>

      <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </header>
  );
}
