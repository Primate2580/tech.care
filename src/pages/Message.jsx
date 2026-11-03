import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, NavLink, useParams } from 'react-router';
import Avatar from '../components/ui/Avatar.jsx';
import { usePatients } from '../hooks/usePatients.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { patientAt, slugify } from '../lib/patients.js';
import { useMessages } from '../hooks/useMessages.js';
import { THREADS } from '../data/messages.js';

const nowLabel = () => new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

export default function Message() {
  useDocumentTitle('Message');
  const { slug } = useParams();
  const { patients } = usePatients();
  const { sent, opened, markOpened, addSent } = useMessages();
  const [draft, setDraft] = useState('');
  const logRef = useRef(null);

  const conversations = useMemo(
    () =>
      patients.length === 0
        ? []
        : THREADS.map((thread) => {
            const patient = patientAt(patients, thread.patientIndex);
            return { ...thread, patient, slug: slugify(patient.name) };
          }),
    [patients],
  );

  const active = conversations.find((c) => c.slug === slug);
  const messages = active ? [...active.messages, ...(sent[active.slug] ?? [])] : [];

  // Opening a conversation marks it as read.
  useEffect(() => {
    if (slug) markOpened(slug);
  }, [slug, markOpened]);

  // Keep the newest message in view.
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages.length, slug]);

  if (!slug) return <Navigate to={`/message/${conversations[0].slug}`} replace />;

  function send(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !active) return;
    addSent(active.slug, { from: 'doctor', text, time: nowLabel() });
    setDraft('');
  }

  return (
    <main className="card grid overflow-hidden lg:h-[700px] lg:grid-cols-[320px_minmax(0,1fr)]">
      <section aria-labelledby="inbox-title" className="flex max-h-[320px] flex-col border-b border-line lg:max-h-none lg:border-b-0 lg:border-r">
        <h1 id="inbox-title" className="px-5 pb-4 pt-[22px] text-card-title">
          Message
        </h1>
        <ul className="scroll-thin min-h-0 flex-1 overflow-y-auto">
          {conversations.map((conversation) => {
            const sentHere = sent[conversation.slug] ?? [];
            const last = [...conversation.messages, ...sentHere].at(-1);
            const unread = opened.includes(conversation.slug) ? 0 : conversation.unread;
            return (
              <li key={conversation.slug}>
                <NavLink
                  to={`/message/${conversation.slug}`}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-page aria-[current=page]:bg-teal-soft"
                >
                  <Avatar patient={conversation.patient} />
                  <span className="min-w-0 flex-1">
                    <span className="flex justify-between gap-2">
                      <span className="truncate font-bold">{conversation.patient.name}</span>
                      <span className="shrink-0 text-muted">{conversation.when}</span>
                    </span>
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-muted">{last.text}</span>
                      {unread > 0 && (
                        <span
                          className="grid size-5 shrink-0 place-items-center rounded-full bg-teal font-bold"
                          aria-label={`${unread} unread`}
                        >
                          {unread}
                        </span>
                      )}
                    </span>
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </section>

      {active ? (
        <section aria-labelledby="thread-title" className="flex min-h-[420px] min-w-0 flex-col">
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <Avatar patient={active.patient} />
            <h2 id="thread-title" className="min-w-0 flex-1 truncate text-inner-title">
              {active.patient.name}
            </h2>
            <Link to={`/patients/${active.slug}`} className="shrink-0 rounded-full bg-page px-4 py-2 font-bold">
              View dashboard
            </Link>
          </div>

          <ul ref={logRef} role="log" aria-label="Conversation" className="scroll-thin flex-1 space-y-3 overflow-y-auto px-5 py-4">
            {messages.map((message, index) => (
              <li key={index} className={`flex ${message.from === 'doctor' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.from === 'doctor' ? 'bg-teal-soft' : 'bg-page'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{message.text}</p>
                  <p className="mt-1 text-right text-muted">{message.time}</p>
                </div>
              </li>
            ))}
          </ul>

          <form onSubmit={send} className="flex items-end gap-3 border-t border-line p-4">
            <label htmlFor="message-draft" className="sr-only">
              Message to {active.patient.name}
            </label>
            <textarea
              id="message-draft"
              rows={2}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) send(event); // Shift+Enter adds a new line
              }}
              placeholder="Write a message"
              className="min-w-0 flex-1 resize-none rounded-xl bg-page px-4 py-2"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className="h-[38px] rounded-full bg-teal px-6 font-bold disabled:opacity-40"
            >
              Send
            </button>
          </form>
        </section>
      ) : (
        <section className="p-5">
          <h2 className="text-inner-title">Conversation not found</h2>
          <Link to={`/message/${conversations[0].slug}`} className="mt-4 inline-block rounded-full bg-teal px-5 py-2 font-bold">
            Back to inbox
          </Link>
        </section>
      )}
    </main>
  );
}
