import { useEffect, useId, useRef } from 'react';

/**
 * Accessible modal built on the native <dialog> element: focus is trapped inside,
 * Escape closes it, and focus returns to the button that opened it.
 */
export default function Modal({ open, onClose, title, children }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => event.target === dialogRef.current && onClose()} // click on the backdrop
      className="m-auto w-[min(92vw,480px)] rounded-card bg-white p-0 text-navy backdrop:bg-navy/40"
    >
      <div className="max-h-[85vh] overflow-y-auto p-6">
        <h2 id={titleId} className="text-card-title">
          {title}
        </h2>
        {children}
        <button type="button" onClick={onClose} className="mt-6 h-[38px] w-full rounded-full bg-teal font-bold">
          Close
        </button>
      </div>
    </dialog>
  );
}
