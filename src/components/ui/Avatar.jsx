import { useState } from 'react';

const initials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

/** Patient photo, falling back to their initials if the image can't load. */
export default function Avatar({ patient, size = 48, className = 'size-12', fallbackClassName = '' }) {
  const [failedSrc, setFailedSrc] = useState(null);

  if (!patient.profile_picture || failedSrc === patient.profile_picture) {
    return (
      <span
        aria-hidden="true"
        className={`${className} ${fallbackClassName} grid shrink-0 place-items-center rounded-full bg-respiratory font-bold`}
      >
        {initials(patient.name)}
      </span>
    );
  }

  return (
    <img
      src={patient.profile_picture}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailedSrc(patient.profile_picture)}
      className={`${className} shrink-0 rounded-full object-cover`}
    />
  );
}
