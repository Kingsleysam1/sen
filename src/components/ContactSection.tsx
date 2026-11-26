import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { SocialLinks } from './SocialLinks';
import { sendEnquiry, CONTACT } from '../utils/enquiry';
import { triggerHaptic } from '../utils/haptics';
import { GsapScrollReveal } from './GsapScrollReveal';

const TOPICS = [
  'Speaking engagement',
  'Executive leadership training',
  'Clarity & purpose coaching',
  'Consulting & advisory',
  'Inner Circle mentorship',
  'Partnership or media',
  'Something else',
];

const field =
  'w-full bg-black border border-white/[0.12] focus:border-white/60 rounded-xl px-4 py-3 text-white text-[16px] outline-none transition-colors placeholder:text-stone-600';
const label = 'text-[14px] font-medium text-stone-300';

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', organisation: '', topic: TOPICS[0], message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    triggerHaptic('medium');
    setStatus('sending');
    const result = await sendEnquiry(
      `Website message: ${form.topic} (${form.name})`,
      {
        Name: form.name,
        Email: form.email,
        Organisation: form.organisation,
        Topic: form.topic,
        Message: form.message,
      },
      form.email,
    );
    setStatus(result.ok ? 'sent' : 'failed');
  };

  return (
    <section id="contact" className="bg-black text-white" aria-labelledby="contact-heading">
      <div className="site-container pt-20 sm:pt-28 pb-20 sm:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <GsapScrollReveal className="lg:col-span-5">
          <p className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.16em] uppercase text-white/60 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8AC4FF]" aria-hidden="true" />
            Contact
          </p>
          <h2 id="contact-heading" className="text-[clamp(36px,5.2vw,68px)] font-medium leading-[1.02] tracking-[-0.04em]">
            Let’s Talk
          </h2>
          <p className="mt-5 text-[17px] sm:text-[18px] leading-[1.65] text-white/75 max-w-[460px]">
            Whether it’s a keynote, a training for your team, an advisory engagement or a question about the Inner Circle, send a message and Shalom’s team will get back to you.
          </p>

          <div className="mt-10">
            <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-white/60 mb-2">Email</p>
            <a href={`mailto:${CONTACT.hello}`} className="inline-flex items-center min-h-[44px] text-[18px] sm:text-[22px] font-medium tracking-[-0.02em] text-white hover:text-[#8AC4FF] underline-offset-4 hover:underline transition-colors">
              {CONTACT.hello}
            </a>
            <p className="text-[14px] text-white/60">
              For bookings: <a href={`mailto:${CONTACT.book}`} className="inline-flex items-center min-h-[44px] text-white/85 hover:text-white underline underline-offset-4">{CONTACT.book}</a>
            </p>
          </div>

          <div className="mt-10">
            <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-white/60 mb-3">Follow Shalom</p>
            <SocialLinks />
          </div>
        </GsapScrollReveal>

        <GsapScrollReveal className="lg:col-span-7">
          <div className="bg-[#111] rounded-[24px] p-6 sm:p-10">
            {status === 'sent' ? (
              <div className="text-center py-10 flex flex-col items-center gap-3" role="status" aria-live="polite">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black">
                  <Check size={24} />
                </div>
                <h3 className="text-[22px] font-medium tracking-[-0.02em]">Message sent. Thank you, {form.name.split(' ')[0] || 'friend'}.</h3>
                <p className="text-white/70 text-[16px] leading-relaxed max-w-md">
                  Shalom’s team will reply to {form.email}, usually within two working days.
                </p>
              </div>
            ) : status === 'failed' ? (
              <div className="text-center py-10 flex flex-col items-center gap-3" role="alert">
                <h3 className="text-[22px] font-medium tracking-[-0.02em]">That didn’t go through.</h3>
                <p className="text-white/70 text-[16px] leading-relaxed max-w-md">
                  Please check your connection and try again in a moment. Your message is still here.
                </p>
                <button onClick={() => setStatus('idle')} className="mt-2 px-6 py-3 rounded-full bg-white text-black text-[14px] font-semibold cursor-pointer">
                  Try again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="c-name" className={label}>Full name</label>
                    <input id="c-name" required autoComplete="name" placeholder="Your name" value={form.name} onChange={set('name')} className={field} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="c-email" className={label}>Email address</label>
                    <input id="c-email" type="email" required autoComplete="email" placeholder="you@example.com" value={form.email} onChange={set('email')} className={field} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="c-org" className={label}>Organisation <span className="text-stone-500 font-normal">(optional)</span></label>
                    <input id="c-org" autoComplete="organization" placeholder="Company or institution" value={form.organisation} onChange={set('organisation')} className={field} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="c-topic" className={label}>What’s it about?</label>
                    <select id="c-topic" value={form.topic} onChange={set('topic')} className={field + ' cursor-pointer appearance-none pr-11 bg-no-repeat bg-[length:16px] bg-[position:right_16px_center]'}
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23aaa' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}>
                      {TOPICS.map((t) => <option key={t} className="bg-black">{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="c-msg" className={label}>Message</label>
                  <textarea id="c-msg" required rows={5} placeholder="Tell us a little about what you have in mind" value={form.message} onChange={set('message')} className={field + ' resize-y min-h-[140px]'} />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="disabled:opacity-60 disabled:cursor-wait w-full sm:w-auto min-w-[200px] py-3.5 px-8 rounded-full bg-white hover:bg-[#8AC4FF] text-black font-semibold text-[14px] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                    {status !== 'sending' && <span aria-hidden="true">→</span>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </GsapScrollReveal>
      </div>
    </section>
  );
}
