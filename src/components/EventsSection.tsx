import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Download,
  CalendarPlus,
  X,
  Check,
} from 'lucide-react';
import { EVENTS_DATA, EventItem } from '../data/shalomData';
import { PHOTOS } from '../data/photos';
import { GsapScrollReveal } from './GsapScrollReveal';
import { triggerHaptic } from '../utils/haptics';

/* ─── ICS / Calendar helpers ────────────────────────────────────── */
function formatICSDate(isoStr: string) {
  return new Date(isoStr).toISOString().replace(/-|:|\.\d+/g, '');
}

function downloadICS(event: EventItem) {
  const start = formatICSDate(event.isoStartDate);
  const end   = formatICSDate(event.isoEndDate);
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0',
    'PRODID:-//Shalom Ernest//Events//EN',
    'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}@shalomernest.com`,
    `DTSTAMP:${formatICSDate(new Date().toISOString())}`,
    `DTSTART:${start}`, `DTEND:${end}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.venue}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  const blob = new Blob([ics], { type: 'text/calendar' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = `${event.id}.ics`; a.click();
  URL.revokeObjectURL(url);
}

function getGoogleCalendarUrl(event: EventItem) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${formatICSDate(event.isoStartDate)}/${formatICSDate(event.isoEndDate)}`,
    details: event.description,
    location: event.venue,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/* ─── Registration modal ─────────────────────────────────────────── */
function RegistrationModal({
  event,
  onClose,
}: {
  event: EventItem;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerHaptic('medium');
    window.open(event.registrationUrl, '_blank');
    setSuccess(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[#141210] border border-white/[0.1] rounded-2xl p-8 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-500 hover:text-white cursor-pointer p-2">
          <X size={18} />
        </button>

        {success ? (
          <div className="text-center py-4 flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#8AC4FF]/15 border border-[#8AC4FF]/30 flex items-center justify-center">
              <Check size={22} className="text-[#8AC4FF]" />
            </div>
            <h3 className="text-[20px] font-bold text-white">Registration Started</h3>
            <p className="text-stone-400 text-[14px]">You've been redirected to the registration link.</p>
            <button onClick={onClose} className="px-6 py-2.5 bg-[#8AC4FF] text-[#0A0908] font-semibold rounded-full text-[14px] cursor-pointer mt-2">
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-[20px] font-bold text-white mb-1">{event.title}</h3>
            <p className="text-stone-400 text-[13px] mb-6">{event.dateDisplay} · {event.fee}</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your full name' },
                { label: 'Email Address', key: 'email', type: 'email', placeholder: 'your@email.com' },
                { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '+234 ...' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-stone-500">{label}</label>
                  <input
                    required
                    type={type}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                    className="bg-[#1C1916] border border-white/[0.08] focus:border-[#8AC4FF]/50 rounded-lg px-4 py-3 text-white text-[14px] outline-none transition-colors placeholder:text-stone-600"
                  />
                </div>
              ))}
              <button type="submit" className="w-full py-3 bg-[#8AC4FF] hover:bg-[#B9DCFF] text-[#0A0908] font-bold rounded-full text-[14px] transition-colors cursor-pointer mt-1">
                Register Now →
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Main section ───────────────────────────────────────────────── */
export function EventsSection() {
  const [calendarMenu, setCalendarMenu]   = useState<string | null>(null);
  const [registerEvent, setRegisterEvent] = useState<EventItem | null>(null);
  const [flyerOpen, setFlyerOpen]         = useState<EventItem | null>(null);

  // One data source; anything that has ended moves to the archive automatically.
  const now = Date.now();
  const upcoming = EVENTS_DATA.filter((e) => new Date(e.isoEndDate).getTime() >= now)
    .sort((a, b) => +new Date(a.isoStartDate) - +new Date(b.isoStartDate));
  const past = EVENTS_DATA.filter((e) => new Date(e.isoEndDate).getTime() < now)
    .sort((a, b) => +new Date(b.isoStartDate) - +new Date(a.isoStartDate));


  const renderCard = (event: EventItem, i: number, isPast: boolean) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0 w-[82vw] sm:w-[60vw] md:w-auto bg-white rounded-[22px] overflow-hidden flex flex-col shadow-[0_1px_0_rgba(0,0,0,0.04)]"
              >
                <button
                  type="button"
                  onClick={() => setFlyerOpen(event)}
                  className="relative block aspect-[4/5] overflow-hidden cursor-zoom-in group"
                  aria-label={`View the ${event.title} flyer`}
                >
                  <img
                    src={encodeURI(event.flyerImage)}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 text-[11px] font-semibold bg-white text-black px-3 py-1 rounded-full">
                    {event.type}
                  </span>
                </button>

                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div>
                    <p className="text-[12px] font-medium text-[#666]">{event.organizer} · {isPast ? 'Past event' : event.status}</p>
                    <h3 className="mt-1.5 text-[21px] font-semibold leading-[1.15] tracking-[-0.02em]">{event.title}</h3>
                    <p className="mt-2 text-[14px] text-[#555] leading-[1.55]">{event.description}</p>
                  </div>

                  <dl className="text-[14px] divide-y divide-black/[0.07] border-y border-black/[0.07]">
                    <div className="flex gap-4 py-2.5"><dt className="w-20 shrink-0 text-[#666]">Date</dt><dd className="text-[#111]">{event.dateDisplay} · {event.timeDisplay}</dd></div>
                    <div className="flex gap-4 py-2.5"><dt className="w-20 shrink-0 text-[#666]">Place</dt><dd className="text-[#111]">{event.venue}</dd></div>
                    <div className="flex gap-4 py-2.5"><dt className="w-20 shrink-0 text-[#666]">Investment</dt><dd className="text-[#111]">{event.fee}</dd></div>
                  </dl>

                  {!isPast && (
                  <div className="mt-auto flex items-center gap-2 pt-1">
                    <button
                      onClick={() => { triggerHaptic('medium'); setRegisterEvent(event); }}
                      className="px-5 py-2.5 rounded-full bg-black hover:bg-[#1d3a5c] text-white text-[13px] font-semibold transition-colors cursor-pointer"
                    >
                      Register
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setCalendarMenu(calendarMenu === event.id ? null : event.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#F2F2F0] hover:bg-[#E8E8E5] text-[#111] text-[13px] font-semibold transition-colors cursor-pointer"
                      >
                        <CalendarPlus className="w-3.5 h-3.5" /> Calendar
                      </button>
                      <AnimatePresence>
                        {calendarMenu === event.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            className="absolute left-0 bottom-full mb-2 w-52 bg-white rounded-xl p-1 shadow-[0_12px_40px_rgba(0,0,0,0.15)] z-30"
                          >
                            <a href={getGoogleCalendarUrl(event)} target="_blank" rel="noopener noreferrer"
                              onClick={() => setCalendarMenu(null)}
                              className="flex items-center gap-2 text-[13px] text-[#333] hover:text-black px-3 py-2 rounded-lg hover:bg-[#F2F2F0]">
                              <ExternalLink className="w-3.5 h-3.5" /> Google Calendar
                            </a>
                            <button onClick={() => { downloadICS(event); setCalendarMenu(null); }}
                              className="w-full flex items-center gap-2 text-[13px] text-[#333] hover:text-black px-3 py-2 rounded-lg hover:bg-[#F2F2F0] cursor-pointer text-left">
                              <Download className="w-3.5 h-3.5" /> Apple / Outlook (.ics)
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  )}
                </div>
              </motion.article>
  );

  return (
    <section id="events" className="bg-[#F4F4F2] text-[#111]" aria-labelledby="events-heading">
      <div className="site-container section-padding">
        <GsapScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 sm:mb-14">
            <div>
              <p className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] uppercase text-[#555] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111]" aria-hidden="true" />
                Hosted Events &amp; Calendar
              </p>
              <h2 id="events-heading" className="text-[clamp(36px,5.2vw,68px)] font-medium leading-[1.02] tracking-[-0.04em]">
                Ideas That Move People
              </h2>
            </div>
          </div>
        </GsapScrollReveal>

        {upcoming.length > 0 && (
        <div className="-mx-5 px-5 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar">
          <div className="flex md:grid md:grid-cols-3 gap-4 sm:gap-5 items-stretch">
            {upcoming.map((event, i) => renderCard(event, i, false))}
          </div>
        </div>
        )}

        {/* Inner Circle mentorship */}
        <GsapScrollReveal>
          <article
            className={`${upcoming.length > 0 ? 'mt-10' : ''} relative overflow-hidden rounded-[24px] bg-black text-white grid grid-cols-1 md:grid-cols-12`}
            aria-labelledby="inner-circle-heading"
          >
            <div className="relative md:order-2 md:col-span-5 h-[340px] sm:h-[420px] md:h-auto md:min-h-full">
              <img
                src={PHOTOS.innerCircle}
                alt="Portrait of Shalom C. Ernest"
                className="absolute inset-0 w-full h-full object-cover object-[50%_18%]"
                loading="lazy"
              />
              {/* Blend the portrait into the card: down into the text on phones, left into it on desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent md:bg-gradient-to-r md:from-black md:via-black/20 md:to-transparent" aria-hidden="true" />
            </div>

            <div className="relative md:order-1 md:col-span-7 p-7 sm:p-10 lg:p-14 -mt-16 md:mt-0">
              <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-[#8AC4FF] mb-3">One-to-one mentorship</p>
              <h3 id="inner-circle-heading" className="text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.05] tracking-[-0.035em]">
                Join the Inner Circle
              </h3>
              <p className="mt-4 text-white/80 text-[16px] sm:text-[17px] leading-[1.65] max-w-[600px]">
                A focused one-to-one mentorship for people who want to grow as leaders, navigate important decisions, and make purposeful progress toward their goals.
              </p>

              <h4 className="mt-8 text-[15px] font-semibold text-white">How it works</h4>
              <p className="mt-2 text-white/65 text-[15px] leading-[1.7] max-w-[600px]">
                The program runs for 3 months, with one private 60-minute session each week. We begin by clarifying what you want to work on, then shape each conversation around your goals and current challenges. Topics may include leadership, career or business direction, decision-making, and personal development.
              </p>
              <p className="mt-3 text-white/65 text-[15px] leading-[1.7] max-w-[600px]">
                Each session ends with practical next steps to work on between meetings. In the final session, we reflect on your progress and identify priorities for what comes next.
              </p>

              <a
                href="https://forms.gle/ydGBQAPL21hgkmg88"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex mt-8 px-6 py-3 rounded-full bg-white hover:bg-[#8AC4FF] text-black text-[14px] font-semibold transition-colors"
              >
                Join the waitlist
                <span className="sr-only"> (opens a Google Form in a new tab)</span>
              </a>
            </div>
          </article>
        </GsapScrollReveal>

        {past.length > 0 && (
          <div className="mt-14 sm:mt-16">
            <h3 className="text-[13px] font-semibold tracking-[0.16em] uppercase text-[#555] mb-4">Past events</h3>
            <ul className="divide-y divide-black/10 border-y border-black/10">
              {past.map((event) => (
                <li key={event.id}>
                  <button
                    type="button"
                    onClick={() => setFlyerOpen(event)}
                    className="w-full min-h-[64px] py-3 flex items-center gap-4 text-left cursor-pointer group"
                  >
                    <img
                      src={encodeURI(event.flyerImage)}
                      alt=""
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                      loading="lazy"
                    />
                    <span className="flex-1 min-w-0">
                      <span className="block text-[16px] font-semibold tracking-[-0.01em] text-[#111] group-hover:underline underline-offset-4">{event.title}</span>
                      <span className="block text-[13px] text-[#666] truncate">{event.organizer}</span>
                    </span>
                    <span className="text-[13px] text-[#555] text-right shrink-0">{event.dateDisplay}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {/* ── Flyer Lightbox ── */}
      <AnimatePresence>
        {flyerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setFlyerOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.93 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.93 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setFlyerOpen(null)} className="absolute -top-10 right-0 text-white/60 hover:text-white cursor-pointer p-2">
                <X size={22} />
              </button>
              <img
                src={encodeURI(flyerOpen.flyerImage)}
                alt={flyerOpen.title}
                className="w-full rounded-2xl border border-white/[0.1] shadow-2xl"
              />
              {new Date(flyerOpen.isoEndDate).getTime() >= now && <div className="mt-4 flex gap-3 justify-center">
                <button
                  onClick={() => { setRegisterEvent(flyerOpen); setFlyerOpen(null); }}
                  className="px-6 py-2.5 bg-[#8AC4FF] hover:bg-[#B9DCFF] text-[#0A0908] font-bold text-[13px] rounded-full transition-colors cursor-pointer"
                >
                  Register Now →
                </button>
              </div>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Registration Modal ── */}
      <AnimatePresence>
        {registerEvent && (
          <RegistrationModal
            event={registerEvent}
            onClose={() => setRegisterEvent(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
