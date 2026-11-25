import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, SkipBack, SkipForward, Youtube } from 'lucide-react';
import { GsapScrollReveal } from './GsapScrollReveal';

const CHANNEL_URL = 'https://www.youtube.com/@ernestshalom';

// Videos from Shalom's YouTube channel (@ernestshalom). Durations as listed on the channel.
const VIDEOS = [
  { id: 'PrpwhocuaMI', title: 'The Myth of Balance in a Purpose-Driven Life', topic: 'Purpose', duration: '5:09' },
  { id: '51BBm6c6llM', title: 'The Myth of Authenticity', subtitle: 'Why saying "Be Yourself" can actually ruin your life', topic: 'Personal Growth', duration: '6:14' },
  { id: 'AJkr6LpgG8A', title: 'Why Discipline Outlasts Motivation', topic: 'Leadership', duration: '5:14' },
  { id: 'nsViEGxntIw', title: 'The Power of Knowing What Matters', subtitle: 'with Dr. Akin Akinpelu', topic: 'The Clarity Experience', duration: '22:56' },
];

const thumb = (id: string, q: 'maxresdefault' | 'hqdefault' | 'mqdefault' = 'maxresdefault') => `https://i.ytimg.com/vi/${id}/${q}.jpg`;

// Falls back to the always-available hqdefault if a video has no max-res thumbnail
function Thumb({ id, alt, className, quality = 'maxresdefault' }: { id: string; alt: string; className?: string; quality?: 'maxresdefault' | 'mqdefault' }) {
  return (
    <img
      src={thumb(id, quality)}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        const img = e.currentTarget;
        if (!img.dataset.fallback) { img.dataset.fallback = '1'; img.src = thumb(id, 'hqdefault'); }
      }}
      onLoad={(e) => {
        // YouTube answers a missing max-res thumbnail with a 120x90 grey placeholder, not an error
        const img = e.currentTarget;
        if (img.naturalWidth <= 120 && !img.dataset.fallback) { img.dataset.fallback = '1'; img.src = thumb(id, 'hqdefault'); }
      }}
    />
  );
}

export function VideoSection() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const current = VIDEOS[index];

  const select = (i: number, autoplay = playing) => { setIndex(i); setPlaying(autoplay); };
  const prev = () => select((index - 1 + VIDEOS.length) % VIDEOS.length);
  const next = () => select((index + 1) % VIDEOS.length);

  return (
    <section id="milestones" className="bg-black text-white" aria-labelledby="videos-heading">
      <div className="site-container section-padding">
        <GsapScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 md:mb-16">
            <div>
              <p className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] uppercase text-white/60 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8AC4FF]" aria-hidden="true" />
                Watch
              </p>
              <h2 id="videos-heading" className="text-[clamp(36px,5.2vw,68px)] font-medium leading-[1.02] tracking-[-0.04em]">
                Talks &amp; Conversations
              </h2>
            </div>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start sm:self-end inline-flex items-center gap-2 min-h-[44px] text-[14px] font-semibold text-white/80 hover:text-white transition-colors"
            >
              <Youtube size={18} aria-hidden="true" /> More on YouTube ›
            </a>
          </div>
        </GsapScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ── Player ── */}
          <div className="lg:col-span-6 flex flex-col items-center text-center">
            <div className="relative w-full aspect-video rounded-[22px] overflow-hidden bg-[#111] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
              {playing ? (
                <iframe
                  key={current.id}
                  src={`https://www.youtube-nocookie.com/embed/${current.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={current.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 w-full h-full cursor-pointer"
                  aria-label={`Play: ${current.title}`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Thumb id={current.id} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    </motion.div>
                  </AnimatePresence>
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden="true" />
                  <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                    <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 text-black flex items-center justify-center shadow-xl transition-transform group-hover:scale-105">
                      <Play size={28} className="ml-1" fill="currentColor" />
                    </span>
                  </span>
                  <span className="absolute left-5 bottom-4 sm:left-6 sm:bottom-5 text-left" aria-hidden="true">
                    <span className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8AC4FF]">Shalom Ernest</span>
                  </span>
                </button>
              )}
            </div>

            <p className="mt-7 text-[12px] font-medium tracking-[0.08em] uppercase text-white/55">
              {current.topic} <span className="mx-1.5" aria-hidden="true">•</span> {current.duration}
            </p>
            <h3 className="mt-2 text-[clamp(26px,3vw,40px)] font-medium leading-[1.1] tracking-[-0.03em] max-w-[560px]">
              {current.title}
            </h3>
            {current.subtitle && <p className="mt-2 text-[15px] text-white/60">{current.subtitle}</p>}

            <div className="mt-7 flex items-center gap-6 sm:gap-8">
              <button type="button" onClick={prev} aria-label="Previous video" className="w-11 h-11 flex items-center justify-center text-white/70 hover:text-white cursor-pointer">
                <SkipBack size={20} fill="currentColor" />
              </button>
              <button
                type="button"
                onClick={() => setPlaying(true)}
                disabled={playing}
                aria-label={playing ? 'Playing' : `Play: ${current.title}`}
                className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default disabled:hover:bg-transparent disabled:hover:text-white"
              >
                <Play size={22} className="ml-0.5" fill="currentColor" />
              </button>
              <button type="button" onClick={next} aria-label="Next video" className="w-11 h-11 flex items-center justify-center text-white/70 hover:text-white cursor-pointer">
                <SkipForward size={20} fill="currentColor" />
              </button>
            </div>
          </div>

          {/* ── Playlist ── */}
          <ul className="lg:col-span-6 lg:pt-6" aria-label="Videos">
            {VIDEOS.map((v, i) => {
              const active = i === index;
              return (
                <li key={v.id} className="border-b border-white/10 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-current={active ? 'true' : undefined}
                    className="w-full flex items-center gap-5 py-5 text-left cursor-pointer group"
                  >
                    <span className={`relative shrink-0 w-28 sm:w-36 aspect-video rounded-[12px] overflow-hidden bg-[#111] ring-2 transition-all ${active ? 'ring-[#8AC4FF]' : 'ring-transparent'}`}>
                      <Thumb id={v.id} alt="" quality="mqdefault" className="w-full h-full object-cover" />
                      <span className="absolute right-1.5 bottom-1.5 text-[10px] font-semibold bg-black/80 px-1.5 py-0.5 rounded">{v.duration}</span>
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] sm:text-[12px] font-medium tracking-[0.08em] uppercase text-white/50">
                        {v.topic} <span className="mx-1" aria-hidden="true">•</span> {v.duration}
                      </span>
                      <span className={`block mt-1 text-[17px] sm:text-[21px] font-medium leading-[1.2] tracking-[-0.02em] transition-colors ${active ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                        {v.title}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
