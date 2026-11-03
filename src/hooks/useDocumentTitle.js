import { useEffect } from 'react';

/** Sets the browser tab title, e.g. "Schedule | Tech.Care". */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Tech.Care` : 'Tech.Care';
  }, [title]);
}
