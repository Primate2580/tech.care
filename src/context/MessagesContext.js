import { createContext } from 'react';

/** Conversation state shared by the Message page and the Overview: opened threads + replies sent. */
export const MessagesContext = createContext(null);
