import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  ExternalLink,
  Download,
  CalendarPlus,
  Clock,
  X,
  Check,
} from 'lucide-react';
import { EVENTS_DATA, EventItem } from '../data/shalomData';
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

/* ─── Status badge ───────────────────────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  const isOpen = status === 'Registration Open';
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
      isOpen
        ? 'bg-[#C8A96E]/15 text-[#E5C98E] border-[#C8A96E]/40'
        : 'bg-white/[0.06] text-stone-400 border-white/[0.1]'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-[#C8A96E] animate-pulse' : 'bg-amber-400'}`} />
      {status}
    </span>
  );
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
            <div className="w-12 h-12 rounded-full bg-[#C8A96E]/15 border border-[#C8A96E]/30 flex items-center justify-center">
              <Check size={22} className="text-[#C8A96E]" />
            </div>
            <h3 className="text-[20px] font-bold text-white">Registration Started</h3>
            <p className="text-stone-400 text-[14px]">You've been redirected to the registration link.</p>
            <button onClick={onClose} className="px-6 py-2.5 bg-[#C8A96E] text-[#0A0908] font-semibold rounded-full text-[14px] cursor-pointer mt-2">
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
                    className="bg-[#1C1916] border border-white/[0.08] focus:border-[#C8A96E]/50 rounded-lg px-4 py-3 text-white text-[14px] outline-none transition-colors placeholder:text-stone-600"
                  />
                </div>
              ))}
              <button type="submit" className="w-full py-3 bg-[#C8A96E] hover:bg-[#E5C98E] text-[#0A0908] font-bold rounded-full text-[14px] transition-colors cursor-pointer mt-1">
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

  const featured  = EVENTS_DATA[0];
  const sideItems = EVENTS_DATA.slice(1);

  return (
    <section
      id="events"
      className="bg-[#0A0908] border-t border-white/[0.08]"
      aria-labelledby="events-heading"
    >
      <div className="site-container section-padding">

        {/* ── Header (mirrors ArticlesSection) ── */}
        <GsapScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-[2px] bg-[#C8A96E]" />
                <span className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#C8A96E]">
                  Hosted Events &amp; Calendar
                </span>
              </div>
              <h2
                id="events-heading"
                className="text-[36px] sm:text-[50px] text-white font-bold leading-tight tracking-tight font-sans"
              >
                Ideas That <span className="text-[#C8A96E]">Move</span> People
              </h2>
            </div>
          </div>
        </GsapScrollReveal>

        {/* ── Editorial Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.08]">

          {/* Featured Event (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 bg-[#0A0908] flex flex-col group cursor-pointer"
            onClick={() => setFlyerOpen(featured)}
          >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[16/10]">
              <img
                src={featured.flyerImage}
                alt={featured.title}
                className="w-full h-full object-cover brightness-80 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-transparent to-transparent opacity-80" />
              <div className="absolute top-4 left-4">
                <StatusBadge status={featured.status} />
              </div>
              <div className="absolute top-4 right-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#E5C98E] bg-[#1C1916]/90 px-2.5 py-1 rounded border border-[#C8A96E]/25 backdrop-blur-md">
                  {featured.organizer}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-7 sm:p-8 flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-2 text-stone-500 text-[12px] font-mono">
                <Clock className="w-3.5 h-3.5 text-[#C8A96E]" />
                <span>{featured.dateDisplay} · {featured.timeDisplay}</span>
              </div>
              <h3 className="text-[24px] sm:text-[28px] font-bold text-white leading-tight tracking-tight group-hover:text-[#C8A96E] transition-colors">
                {featured.title}
              </h3>
              <p className="text-stone-400 text-[15px] leading-[1.6]">
                {featured.description}
              </p>

              {/* Location */}
              <div className="flex items-start gap-2 text-stone-500 text-[13px]">
                <MapPin className="w-4 h-4 text-[#C8A96E] shrink-0 mt-0.5" />
                <span>{featured.venue}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/[0.08]">
                {/* Calendar dropdown */}
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setCalendarMenu(calendarMenu === featured.id ? null : featured.id)}
                    className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.1] text-stone-300 hover:text-white font-mono text-[12px] px-3.5 py-2 rounded-full transition-all cursor-pointer"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-[#C8A96E]" />
                    Calendar
                  </button>
                  <AnimatePresence>
                    {calendarMenu === featured.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="absolute left-0 top-full mt-2 w-48 bg-[#1C1916] rounded-xl border border-white/[0.1] p-1 shadow-2xl z-30"
                      >
                        <a href={getGoogleCalendarUrl(featured)} target="_blank" rel="noopener noreferrer"
                          onClick={() => setCalendarMenu(null)}
                          className="flex items-center gap-2 text-[12px] text-stone-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-colors">
                          <ExternalLink className="w-3.5 h-3.5 text-[#C8A96E]" /> Google Calendar
                        </a>
                        <button onClick={() => { downloadICS(featured); setCalendarMenu(null); }}
                          className="w-full flex items-center gap-2 text-[12px] text-stone-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer text-left">
                          <Download className="w-3.5 h-3.5 text-[#C8A96E]" /> Apple / Outlook (.ics)
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); triggerHaptic('medium'); setRegisterEvent(featured); }}
                  className="inline-flex items-center gap-1.5 bg-[#C8A96E] hover:bg-[#E5C98E] text-[#0A0908] font-bold text-[12px] px-5 py-2 rounded-full transition-colors cursor-pointer"
                >
                  Register →
                </button>
              </div>
            </div>
          </motion.div>

          {/* Side Events (5 cols) */}
          <div className="lg:col-span-5 bg-[#0A0908] flex flex-col divide-y divide-white/[0.06]">
            {sideItems.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-4 p-5 cursor-pointer group hover:bg-[#141210] transition-colors"
                onClick={() => setFlyerOpen(event)}
              >
                {/* Thumbnail */}
                <div className="w-24 h-20 shrink-0 overflow-hidden rounded-xl border border-white/[0.07]">
                  <img
                    src={event.flyerImage}
                    alt={event.title}
                    className="w-full h-full object-cover brightness-80 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between gap-1 min-w-0 flex-1">
                  <div>
                    <StatusBadge status={event.status} />
                    <h3 className="text-[16px] font-bold text-white mt-1.5 line-clamp-2 leading-snug group-hover:text-[#C8A96E] transition-colors">
                      {event.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-500 text-[11px] font-mono">
                    <Clock className="w-3 h-3 text-[#C8A96E]" />
                    <span>{event.dateDisplay}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Bottom CTA block (mirrors quote block in ArticlesSection) */}
            <div className="mt-auto p-6 sm:p-7 bg-[#141210] flex flex-col gap-3">
              <span className="text-[#C8A96E]/20 text-[40px] font-extrabold leading-none select-none">"</span>
              <p className="text-[16px] font-semibold text-stone-300 leading-snug">
                Every great leader needs a room that challenges them to grow.
              </p>
              <span className="font-mono text-[11px] uppercase tracking-wider text-stone-600">
                — Shalom C. Ernest, FIMC, CMC
              </span>
            </div>
          </div>
        </div>
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
                src={flyerOpen.flyerImage}
                alt={flyerOpen.title}
                className="w-full rounded-2xl border border-white/[0.1] shadow-2xl"
              />
              <div className="mt-4 flex gap-3 justify-center">
                <button
                  onClick={() => { setRegisterEvent(flyerOpen); setFlyerOpen(null); }}
                  className="px-6 py-2.5 bg-[#C8A96E] hover:bg-[#E5C98E] text-[#0A0908] font-bold text-[13px] rounded-full transition-colors cursor-pointer"
                >
                  Register Now →
                </button>
              </div>
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
