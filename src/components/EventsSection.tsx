import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Download, 
  ChevronRight, 
  X, 
  Check, 
  Maximize2,
  CalendarPlus,
  Clock
} from 'lucide-react';
import { EVENTS_DATA, EventItem } from '../data/shalomData';
import { GsapScrollReveal } from './GsapScrollReveal';
import { useTheme } from '../context/ThemeContext';
import { triggerHaptic } from '../utils/haptics';
import { BlurUpImage } from './BlurUpImage';

export function EventsSection() {
  const [selectedFlyer, setSelectedFlyer] = useState<EventItem | null>(null);
  const [showCalendarMenuFor, setShowCalendarMenuFor] = useState<string | null>(null);
  const [registrationModalEvent, setRegistrationModalEvent] = useState<EventItem | null>(null);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const [attendeeForm, setAttendeeForm] = useState({ name: '', email: '', phone: '' });
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Calendar .ics download generator
  const downloadICS = (event: EventItem) => {
    const formatICSDate = (isoStr: string) => {
      const date = new Date(isoStr);
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const start = formatICSDate(event.isoStartDate);
    const end = formatICSDate(event.isoEndDate);

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Shalom Ernest//Events//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${event.id}@shalomernest.com`,
      `DTSTAMP:${formatICSDate(new Date().toISOString())}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${event.title}`,
      `LOCATION:${event.venue}`,
      `URL:${event.registrationUrl}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Google Calendar Link generator
  const getGoogleCalendarUrl = (event: EventItem) => {
    const formatGDate = (isoStr: string) => {
      const date = new Date(isoStr);
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };
    const start = formatGDate(event.isoStartDate);
    const end = formatGDate(event.isoEndDate);
    const text = encodeURIComponent(event.title);
    const details = encodeURIComponent(`Host: ${event.host}\nRegistration: ${event.registrationUrl}`);
    const location = encodeURIComponent(event.venue);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisteredSuccess(true);
    setTimeout(() => {
      if (registrationModalEvent?.registrationUrl) {
        window.open(registrationModalEvent.registrationUrl, '_blank');
      }
    }, 1000);
  };

  return (
    <section id="events" className={`py-20 sm:py-28 px-6 md:px-12 relative transition-colors duration-500 ${
      isLight ? 'bg-[#FAF9F5] text-stone-900' : 'bg-[#0A0B0D] text-[#F3F3EE]'
    }`}>
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Simple Section Header */}
        <GsapScrollReveal>
          <div className="pb-2 space-y-2">
            <span className={`text-xs font-mono uppercase tracking-[0.25em] flex items-center gap-2 ${
              isLight ? 'text-amber-800 font-semibold' : 'text-[#C8C3A7]'
            }`}>
              <Calendar className="w-4 h-4" />
              <span>HOSTED EVENTS & CALENDAR</span>
            </span>
            <h2 className={`text-3xl sm:text-4xl font-normal ${
              isLight ? 'text-stone-900' : 'text-[#F3F3EE]'
            }`}>
              Upcoming Events
            </h2>
          </div>
        </GsapScrollReveal>

        {/* Clean Grid of Portrait Flyer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENTS_DATA.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`rounded-3xl border overflow-hidden shadow-2xl flex flex-col justify-between group transition-all duration-300 ${
                isLight
                  ? 'bg-white border-stone-200 hover:border-amber-500/60 shadow-stone-200'
                  : 'bg-[#111317] border-white/10 hover:border-emerald-500/40'
              }`}
            >
              {/* Portrait Flyer Image Container */}
              <div 
                onClick={() => setSelectedFlyer(event)}
                className="relative aspect-[3/4] w-full overflow-hidden bg-black/60 cursor-pointer group"
              >
                <BlurUpImage 
                  src={event.flyerImage} 
                  alt={event.title}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay inspect indicator */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 opacity-95 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 bg-emerald-950/90 px-2.5 py-1 rounded border border-emerald-500/30 backdrop-blur-md">
                      {event.organizer}
                    </span>
                    
                    {/* Status Badge */}
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md inline-flex items-center gap-1.5 shadow-lg ${
                      event.status === 'Registration Open'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-900/30'
                        : event.status === 'Upcoming'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-900/30'
                        : 'bg-zinc-900/90 text-zinc-400 border-zinc-700/50'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        event.status === 'Registration Open'
                          ? 'bg-emerald-400 animate-pulse'
                          : event.status === 'Upcoming'
                          ? 'bg-amber-400'
                          : 'bg-zinc-500'
                      }`} />
                      <span>{event.status}</span>
                    </span>
                  </div>

                  <div className="space-y-1 text-left">
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {event.title}
                    </h3>
                    <p className="text-xs font-mono text-emerald-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      <span>{event.dateDisplay}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Minimal Event Location & Action Buttons */}
              <div className="p-5 space-y-4 text-left">
                
                {/* Location Info */}
                <div className="flex items-start gap-2.5 bg-black/40 p-3 rounded-xl border border-white/5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Location</div>
                    <div className="text-xs text-[#F3F3EE] font-medium leading-snug">
                      {event.venue}
                    </div>
                  </div>
                </div>

                {/* Calendar & Register Actions */}
                <div className="grid grid-cols-2 gap-2.5">
                  
                  {/* Add to Calendar Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowCalendarMenuFor(showCalendarMenuFor === event.id ? null : event.id)}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 text-[#C8C3A7] hover:text-white font-mono text-xs py-2.5 px-3 rounded-xl border border-white/10 transition-all cursor-pointer"
                    >
                      <CalendarPlus className="w-3.5 h-3.5 text-[#C8C3A7]" />
                      <span>Calendar</span>
                    </button>

                    {/* Dropdown */}
                    {showCalendarMenuFor === event.id && (
                      <div className="absolute left-0 bottom-full mb-2 w-48 bg-[#16181F] rounded-xl border border-white/15 p-1 shadow-2xl z-30 space-y-1">
                        <a
                          href={getGoogleCalendarUrl(event)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setShowCalendarMenuFor(null)}
                          className="flex items-center gap-2 text-[11px] font-mono text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Google Calendar</span>
                        </a>
                        <button
                          onClick={() => {
                            downloadICS(event);
                            setShowCalendarMenuFor(null);
                          }}
                          className="w-full flex items-center gap-2 text-[11px] font-mono text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors text-left cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Apple / Outlook (.ics)</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Register Button */}
                  <button
                    onClick={() => {
                      triggerHaptic('medium');
                      setRegistrationModalEvent(event);
                      setRegisteredSuccess(false);
                    }}
                    className="w-full inline-flex items-center justify-center gap-1 bg-[#E2DFD2] hover:bg-white text-black font-semibold text-xs py-2.5 px-3 rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    <span>Register</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* FLYER MODAL - PORTRAIT ENLARGED */}
      <AnimatePresence>
        {selectedFlyer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#111317] rounded-3xl border border-white/20 max-w-md w-full shadow-2xl p-5 space-y-4 relative text-left max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedFlyer(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-gray-300 hover:text-white transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Enlarged Portrait Image */}
              <div className="rounded-2xl overflow-hidden aspect-[3/4] w-full bg-black border border-white/10 shadow-xl">
                <BlurUpImage 
                  src={selectedFlyer.flyerImage} 
                  alt={selectedFlyer.title}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Event Location & Status */}
              <div className="bg-black/60 p-3.5 rounded-xl border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Date & Location</div>
                  <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${
                    selectedFlyer.status === 'Registration Open'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : selectedFlyer.status === 'Upcoming'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-700'
                  }`}>
                    <span className={`w-1 h-1 rounded-full ${
                      selectedFlyer.status === 'Registration Open' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                    }`} />
                    <span>{selectedFlyer.status}</span>
                  </span>
                </div>
                <div className="text-xs text-white font-medium">{selectedFlyer.dateDisplay} &bull; {selectedFlyer.timeDisplay}</div>
                <div className="text-xs text-gray-300">{selectedFlyer.venue}</div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => downloadICS(selectedFlyer)}
                  className="inline-flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-[#F3F3EE] font-mono text-xs py-3 rounded-xl transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#C8C3A7]" />
                  <span>Calendar (.ics)</span>
                </button>

                <a
                  href={selectedFlyer.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-[#E2DFD2] hover:bg-white text-black font-semibold text-xs py-3 rounded-xl transition-all shadow-md"
                >
                  <span>Register Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* REGISTRATION FORM MODAL */}
      <AnimatePresence>
        {registrationModalEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#111317] rounded-2xl border border-white/20 max-w-md w-full shadow-2xl p-6 space-y-5 relative text-left"
            >
              <button
                onClick={() => setRegistrationModalEvent(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 border-b border-white/10 pb-3 pr-10">
                <span className="text-xs font-mono text-[#C8C3A7] uppercase tracking-widest">
                  EVENT REGISTRATION
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {registrationModalEvent.title}
                </h3>
                <p className="text-xs text-emerald-400 font-mono">
                  {registrationModalEvent.venue}
                </p>
              </div>

              {registeredSuccess ? (
                <div className="bg-emerald-950/60 border border-emerald-500/40 p-5 rounded-xl text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-black flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <h4 className="text-base font-semibold text-white">Redirecting to Registration...</h4>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-gray-400">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samuel Adebayo"
                      value={attendeeForm.name}
                      onChange={e => setAttendeeForm({ ...attendeeForm, name: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C8C3A7]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-gray-400">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="samuel@example.com"
                      value={attendeeForm.email}
                      onChange={e => setAttendeeForm({ ...attendeeForm, email: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C8C3A7]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-gray-400">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 800 000 0000"
                      value={attendeeForm.phone}
                      onChange={e => setAttendeeForm({ ...attendeeForm, phone: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C8C3A7]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#E2DFD2] hover:bg-white text-black font-semibold text-sm py-3 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Complete & Register</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
