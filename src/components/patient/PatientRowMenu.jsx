import { useState } from 'react';
import { useNavigate } from 'react-router';
import MenuButton, { MenuItem } from '../ui/MenuButton.jsx';
import dotsIcon from '../../assets/icons/ellipsis.png';

/** The "..." menu on each patient row in the sidebar. */
export default function PatientRowMenu({ patient, slug }) {
  const navigate = useNavigate();
  const [copyState, setCopyState] = useState('idle'); // 'idle' | 'copied' | 'failed'

  async function copyPhone(close) {
    try {
      await navigator.clipboard.writeText(patient.phone_number);
      setCopyState('copied');
    } catch {
      setCopyState('failed'); // clipboard needs https or localhost
    }
    setTimeout(() => {
      close();
      setCopyState('idle');
    }, 900);
  }

  return (
    <MenuButton
      label={`More options for ${patient.name}`}
      icon={dotsIcon}
      iconWidth="18"
      iconHeight="4"
      className="p-2"
    >
      {({ close }) => (
        <>
          <MenuItem
            onClick={() => {
              close(false);
              navigate(`/patients/${slug}`);
            }}
          >
            Open dashboard
          </MenuItem>
          <MenuItem onClick={() => copyPhone(close)}>
            {copyState === 'copied' && 'Copied!'}
            {copyState === 'failed' && "Couldn't copy"}
            {copyState === 'idle' && 'Copy phone number'}
          </MenuItem>
        </>
      )}
    </MenuButton>
  );
}
