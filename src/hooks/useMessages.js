import { useContext } from 'react';
import { MessagesContext } from '../context/MessagesContext.js';

export function useMessages() {
  const context = useContext(MessagesContext);
  if (!context) throw new Error('useMessages must be used inside <MessagesProvider>');
  return context;
}
