import { useCallback, useMemo, useState } from 'react';
import { MessagesContext } from './MessagesContext.js';

export default function MessagesProvider({ children }) {
  const [opened, setOpened] = useState([]); // conversation slugs whose unread badge is cleared
  const [sent, setSent] = useState({}); // slug -> replies written this session

  const markOpened = useCallback((slug) => {
    setOpened((current) => (current.includes(slug) ? current : [...current, slug]));
  }, []);

  const addSent = useCallback((slug, message) => {
    setSent((current) => ({ ...current, [slug]: [...(current[slug] ?? []), message] }));
  }, []);

  const value = useMemo(() => ({ opened, sent, markOpened, addSent }), [opened, sent, markOpened, addSent]);
  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>;
}
