import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const MENU_WIDTH = 208;

export function MenuItem(props) {
  return (
    <button
      type="button"
      role="menuitem"
      tabIndex={-1}
      className="w-full rounded-lg px-3 py-2 text-left hover:bg-page focus-visible:bg-page"
      {...props}
    />
  );
}

/**
 * An icon button that opens a small menu. The menu is rendered in a portal with fixed
 * positioning so scrolling lists (like the patient sidebar) can't clip it.
 * `children` is a function receiving `{ close }`.
 */
export default function MenuButton({ label, icon, iconWidth, iconHeight, className = '', children }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const menuId = useId();

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  }, []);

  function toggle() {
    if (open) return close();
    const rect = buttonRef.current.getBoundingClientRect();
    const left = Math.min(rect.right - MENU_WIDTH, window.innerWidth - MENU_WIDTH - 8);
    setPosition({ top: rect.bottom + 6, left: Math.max(8, left) });
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return undefined;
    menuRef.current?.querySelector('[role="menuitem"]')?.focus({ preventScroll: true });

    const onPointerDown = (event) => {
      if (!menuRef.current?.contains(event.target) && !buttonRef.current?.contains(event.target)) {
        close(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') close();
    };
    const dismiss = () => close(false);

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', dismiss);
    window.addEventListener('scroll', dismiss, true);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', dismiss);
      window.removeEventListener('scroll', dismiss, true);
    };
  }, [open, close]);

  function onMenuKeyDown(event) {
    const items = [...menuRef.current.querySelectorAll('[role="menuitem"]')];
    const index = items.indexOf(document.activeElement);
    const move = (next) => {
      event.preventDefault();
      items[(next + items.length) % items.length]?.focus();
    };
    if (event.key === 'ArrowDown') move(index + 1);
    else if (event.key === 'ArrowUp') move(index - 1);
    else if (event.key === 'Home') move(0);
    else if (event.key === 'End') move(items.length - 1);
    else if (event.key === 'Tab') close(false);
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={toggle}
        className={className}
      >
        <img src={icon} alt="" width={iconWidth} height={iconHeight} />
      </button>
      {open &&
        createPortal(
          <div
            ref={menuRef}
            id={menuId}
            role="menu"
            aria-label={label}
            onKeyDown={onMenuKeyDown}
            style={{ top: position.top, left: position.left, width: MENU_WIDTH }}
            className="fixed z-50 rounded-xl bg-white p-2 shadow-lg ring-1 ring-line"
          >
            {children({ close })}
          </div>,
          document.body,
        )}
    </>
  );
}
