import React from 'react';
import { motion } from 'framer-motion';
import { ARTICLES, Article } from '../data/shalomData';
import { ArrowUpRight, BookOpen, Clock, Linkedin, Quote } from 'lucide-react';
import { BlurUpImage } from './BlurUpImage';

interface ArticlesSectionProps {
  onSelectArticle: (article: Article) => void;
}

export function ArticlesSection({ onSelectArticle }: ArticlesSectionProps) {
  // Keep the 3 sharpest articles
  const curatedArticles = ARTICLES.slice(0, 3);

  return (
    <section id="articles" className="bg-[#0A0B0D] py-24 sm:py-32 px-6 md:px-12 border-t border-white/5 space-y-20">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
          <div className="space-y-2">
            <span className="text-[#C8C3A7] text-xs font-mono uppercase tracking-[0.25em] block">
              INSIGHTS & STRATEGIC ESSAYS
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal text-[#F3F3EE]">
              Executive Reflections & Writings
            </h2>
          </div>
          
          <a
            href="https://www.linkedin.com/in/shalom-ernest-fimc-cmc-4028061a5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#C8C3A7] hover:text-white transition-colors py-2 px-4 rounded-full border border-white/10 bg-white/5 shrink-0 self-start md:self-end"
          >
            <Linkedin className="w-4 h-4 text-[#C8C3A7]" />
            <span>Read on LinkedIn</span>
          </a>
        </div>

        {/* 3 Curated Essays Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {curatedArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => onSelectArticle(article)}
              className="bg-[#111317] rounded-2xl overflow-hidden border border-white/10 shadow-xl flex flex-col justify-between hover:border-white/20 transition-all duration-300 cursor-pointer group"
            >
              {/* Image Banner */}
              <div className="relative h-44 overflow-hidden bg-black">
                <BlurUpImage
                  src={article.image}
                  alt={article.title}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-black/30 to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#C8C3A7] bg-black/80 px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur-md">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-gray-300 bg-black/60 px-2 py-0.5 rounded-full">
                    <Clock className="w-3 h-3 text-[#C8C3A7]" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Title & 1-Line Description */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2.5">
                  <h3 className="text-lg sm:text-xl font-medium text-[#F3F3EE] group-hover:text-[#C8C3A7] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed line-clamp-2">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-medium text-[#C8C3A7]">
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Essay</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Full-Bleed Typographic Quote Moment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl bg-gradient-to-r from-[#14161C] to-[#1A1D24] p-8 sm:p-14 md:p-16 border border-white/10 overflow-hidden text-center space-y-6 shadow-2xl"
        >
          <Quote className="w-10 h-10 text-[#C8C3A7]/30 mx-auto" />
          <blockquote className="text-2xl sm:text-4xl md:text-5xl font-serif italic text-[#F3F3EE] leading-tight max-w-4xl mx-auto tracking-tight">
            "Operational friction is the silent killer of velocity. Systems don't scale on slogans—they scale on alignment."
          </blockquote>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8C3A7]">
            &mdash; Shalom C. Ernest, FIMC, CMC
          </div>
        </motion.div>

      </div>
    </section>
  );
}
