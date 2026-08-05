import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../data/shalomData';
import { X, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [selectedService, setSelectedService] = useState<string>(SERVICES[0].id);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerHaptic('success');
    setSubmitted(true);
  };

  const handleReset = () => {
    triggerHaptic('light');
    setSubmitted(false);
    setFormData({ name: '', email: '', phone: '', organization: '', notes: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl max-h-[90vh] bg-[#101010] border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-white/10 flex items-start justify-between bg-[#141414]">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Booking Request</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#E1E0CC]">
                Book a Session
              </h2>
            </div>

            <button
              onClick={() => {
                triggerHaptic('light');
                onClose();
              }}
              className="p-2 text-gray-400 hover:text-white bg-black/40 hover:bg-black/80 rounded-full transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form / Submitted Body */}
          <div className="p-6 sm:p-8 overflow-y-auto">
            {submitted ? (
              <div className="py-8 text-center space-y-6">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto border border-primary/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-medium text-[#E1E0CC]">
                    Request Received
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto font-light leading-relaxed">
                    Thank you, <span className="text-[#E1E0CC] font-medium">{formData.name}</span>. Your request for <span className="text-primary font-mono">{SERVICES.find(s => s.id === selectedService)?.title}</span> has been sent successfully.
                  </p>
                </div>

                <div className="p-4 bg-[#141414] rounded-xl border border-white/5 text-xs text-gray-400 font-mono text-left max-w-md mx-auto space-y-1">
                  <div>Email: shalom4impact@gmail.com</div>
                  <div>Phone: +234 813 207 8249</div>
                  <div>We will reply within 12 business hours</div>
                </div>

                <button
                  onClick={handleReset}
                  className="bg-primary hover:bg-[#E8E5D5] text-black text-xs font-mono uppercase tracking-widest px-6 py-2.5 rounded-full transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Service Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block">
                    Select Service
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SERVICES.map((s) => (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => {
                          triggerHaptic('selection');
                          setSelectedService(s.id);
                        }}
                        className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                          selectedService === s.id
                            ? 'bg-primary/10 border-primary text-[#E1E0CC]'
                            : 'bg-[#141414] border-white/5 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        <div className="text-xs font-medium text-[#E1E0CC]">{s.title}</div>
                        <div className="text-[10px] font-mono text-gray-500 mt-1">{s.duration} &bull; {s.format}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-400 block">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Dr. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#E1E0CC] focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-400 block">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g., jane@organization.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#E1E0CC] focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-400 block">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="e.g., +234 800 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#E1E0CC] focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-400 block">Organization / Company</label>
                    <input
                      type="text"
                      placeholder="e.g., Global Development Corp"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#E1E0CC] focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400 block">Additional Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe what you need..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#E1E0CC] focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-[#E8E5D5] text-black font-medium text-xs sm:text-sm py-3 rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Request</span>
                </button>

              </form>
            )}
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
}
