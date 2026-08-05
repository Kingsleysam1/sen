import React from 'react';
import { motion } from 'framer-motion';
import { LINKEDIN_INSIGHTS } from '../data/shalomData';
import { Quote, Linkedin } from 'lucide-react';

export function InsightsSection() {
  return (
    <section id="insights" className="bg-black py-20 sm:py-28 px-4 md:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-primary text-[10px] sm:text-xs uppercase tracking-[0.25em] font-mono block">
              Executive Reflections & Insights
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-[#E1E0CC]">
              LinkedIn Insights & Directives
            </h2>
          </div>
          <a
            href="https://www.linkedin.com/in/shalom-ernest-fimc-cmc-4028061a5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:text-white transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span>Connect on LinkedIn</span>
          </a>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LINKEDIN_INSIGHTS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#212121] p-6 sm:p-8 rounded-2xl border border-white/5 shadow-xl flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    {item.topic}
                  </span>
                  <Quote className="w-5 h-5 text-gray-600" />
                </div>

                <blockquote className="text-sm sm:text-base md:text-lg font-light text-[#E1E0CC] leading-relaxed italic font-serif">
                  "{item.quote}"
                </blockquote>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500 font-mono">
                <span>Shalom Ernest, FIMC, CMC</span>
                <span>Reflections</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
