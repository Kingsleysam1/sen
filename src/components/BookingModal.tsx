import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../data/shalomData';
import { X, Check } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: SERVICES[0].title,
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerHaptic('medium');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 4000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-lg bg-[#141210] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-stone-400 hover:text-white p-2 rounded-full hover:bg-white/[0.06] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="mb-6 text-left">
            <span className="text-[#C8A96E] font-bold text-[11px] sm:text-[12px] tracking-[0.2em] uppercase block mb-1">
              GET IN TOUCH
            </span>
            <h2 className="text-[24px] sm:text-[28px] font-bold text-white tracking-tight font-sans">
              Book a Consultation
            </h2>
          </div>

          {submitted ? (
            <div className="py-8 text-center flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#C8A96E]/15 border border-[#C8A96E]/40 flex items-center justify-center text-[#C8A96E]">
                <Check size={24} />
              </div>
              <h3 className="text-[20px] font-bold text-white">Consultation Request Sent</h3>
              <p className="text-stone-400 text-[14px]">Thank you, {formData.name}. We will review your request and get back to you within 24 hours.</p>
              <button
                onClick={onClose}
                className="mt-3 px-6 py-2.5 rounded-full bg-[#C8A96E] text-[#0A0908] font-bold text-[13px] cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-stone-300">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  className="bg-[#0A0908] border border-white/[0.08] focus:border-[#C8A96E]/60 rounded-xl px-4 py-3 text-white text-[14px] outline-none transition-colors placeholder:text-stone-600"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-stone-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className="bg-[#0A0908] border border-white/[0.08] focus:border-[#C8A96E]/60 rounded-xl px-4 py-3 text-white text-[14px] outline-none transition-colors placeholder:text-stone-600"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-stone-300">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+234 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    className="bg-[#0A0908] border border-white/[0.08] focus:border-[#C8A96E]/60 rounded-xl px-4 py-3 text-white text-[14px] outline-none transition-colors placeholder:text-stone-600"
                  />
                </div>
              </div>

              {/* Service Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-stone-300">Service of Interest</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData((p) => ({ ...p, service: e.target.value }))}
                  className="bg-[#0A0908] border border-white/[0.08] focus:border-[#C8A96E]/60 rounded-xl px-4 py-3 text-white text-[14px] outline-none transition-colors cursor-pointer"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.title} className="bg-[#141210] text-white">
                      {s.title} ({s.format})
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-stone-300">Additional Notes (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your organization or consulting goals..."
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  className="bg-[#0A0908] border border-white/[0.08] focus:border-[#C8A96E]/60 rounded-xl px-4 py-3 text-white text-[14px] outline-none transition-colors resize-none placeholder:text-stone-600"
                />
              </div>

              {/* Pill Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-full bg-[#C8A96E] hover:bg-[#E5C98E] text-[#0A0908] font-bold text-[14px] tracking-wide inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(200,169,110,0.25)]"
              >
                <span>Send Consultation Request</span>
                <span className="text-[16px]">→</span>
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </AnimatePresence>
  );
}
