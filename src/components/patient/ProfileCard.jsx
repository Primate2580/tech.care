import { useState } from 'react';
import { formatDate } from '../../lib/format.js';
import ProfileDialog from '../dialogs/ProfileDialog.jsx';
import Avatar from '../ui/Avatar.jsx';
import birthdayIcon from '../../assets/icons/birthday.png';
import femaleIcon from '../../assets/icons/female.png';
import maleIcon from '../../assets/icons/male.png';
import phoneIcon from '../../assets/icons/phone.png';
import insuranceIcon from '../../assets/icons/insurance.png';

export default function ProfileCard({ patient }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const details = [
    { icon: birthdayIcon, label: 'Date Of Birth', value: formatDate(patient.date_of_birth) },
    { icon: patient.gender === 'Male' ? maleIcon : femaleIcon, label: 'Gender', value: patient.gender },
    { icon: phoneIcon, label: 'Contact Info.', value: patient.phone_number },
    { icon: phoneIcon, label: 'Emergency Contacts', value: patient.emergency_contact },
    { icon: insuranceIcon, label: 'Insurance Provider', value: patient.insurance_type },
  ];

  return (
    <section aria-labelledby="profile-name" className="card px-5 pb-8 pt-8 text-center xl:h-[740px]">
      <Avatar patient={patient} size={200} className="mx-auto size-[200px]" fallbackClassName="text-[56px]" />
      <h2 id="profile-name" className="mt-6 text-card-title">
        {patient.name}
      </h2>
      <ul className="mt-[30px] flex flex-col gap-[25px] text-left">
        {details.map(({ icon, label, value }) => (
          <li key={label} className="flex items-center gap-[14px]">
            <img src={icon} alt="" width="42" height="42" />
            <div>
              <p>{label}</p>
              <p className="font-bold">{value}</p>
            </div>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => setDialogOpen(true)}
        className="mx-auto mt-[43px] block h-[38px] w-[216px] rounded-full bg-teal font-bold"
      >
        Show All Information
      </button>
      <ProfileDialog open={dialogOpen} onClose={() => setDialogOpen(false)} patient={patient} />
    </section>
  );
}
