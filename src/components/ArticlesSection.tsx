import React from 'react';
import { motion } from 'framer-motion';
import { ARTICLES, Article } from '../data/shalomData';
import { GsapScrollReveal } from './GsapScrollReveal';
import { BlurUpImage } from './BlurUpImage';

interface ArticlesSectionProps {
  onSelectArticle: (article: Article) => void;
}

export function ArticlesSection({ onSelectArticle }: ArticlesSectionProps) {
  const featuredArticle = ARTICLES[0];
  const sideArticles = ARTICLES.slice(1, 4);

  return (
    <section
      id="articles"
      className="bg-[#080A08] border-t border-white/[0.08]"
      aria-labelledby="insights-heading"
    >
      <div className="site-container section-padding">

        {/* ── Header ── */}
        <GsapScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 md:mb-20">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-[2px] bg-[#C8A96E]" />
                <span className="typo-eyebrow">Insights & Thinking</span>
              </div>
              <h2
                id="insights-heading"
                className="typo-section-heading text-[#F0F5F0]"
              >
                Executive <span className="text-[#C8A96E]">Reflections</span> &amp; Writings
              </h2>
            </div>
            <a
              href="https://www.linkedin.com/in/shalom-ernest-fimc-cmc-4028061a5"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start lg:self-end flex items-center gap-2 typo-eyebrow text-[#9EAEA0] hover:text-[#C8A96E] transition-colors duration-200 border-b border-white/[0.1] hover:border-[#C8A96E]/50 pb-1"
            >
              <span>Read on LinkedIn</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 8l6-6M4 2h4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </GsapScrollReveal>

        {/* ── Editorial Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/[0.06]">

          {/* Featured Article (7 cols) */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onSelectArticle(featuredArticle)}
            className="lg:col-span-7 bg-[#080A08] cursor-pointer group flex flex-col"
          >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[16/9]">
              <BlurUpImage
                src={featuredArticle.image}
                alt={featuredArticle.title}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover grayscale-[20%] contrast-110 brightness-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080A08] via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="typo-eyebrow bg-[#080A08]/85 backdrop-blur-sm px-3 py-1.5 border border-white/[0.1] rounded-sm">
                  {featuredArticle.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col gap-4 flex-1">
              <span className="font-mono text-[12px] uppercase tracking-wider text-[#627364]">
                {featuredArticle.readTime} read
              </span>
              <h3 className="typo-card-title text-[#F0F5F0] group-hover:text-[#C8A96E] transition-colors duration-300 text-[24px] sm:text-[28px]">
                {featuredArticle.title}
              </h3>
              <p className="typo-body text-[16px] leading-[1.6]">
                {featuredArticle.summary}
              </p>
              <div className="mt-auto pt-4 border-t border-white/[0.08] flex items-center gap-2 text-[#C8A96E] typo-btn">
                <span>Read Article</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </motion.article>

          {/* Side Articles (5 cols) */}
          <div className="lg:col-span-5 flex flex-col bg-[#080A08]">
            {sideArticles.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => onSelectArticle(article)}
                className={`flex gap-5 p-6 cursor-pointer group hover:bg-[#0E110E] transition-colors duration-300 ${i < sideArticles.length - 1 ? 'border-b border-white/[0.06]' : ''}`}
              >
                {/* Thumbnail */}
                <div className="w-24 h-20 shrink-0 overflow-hidden rounded-sm">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover grayscale-[30%] brightness-80 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                {/* Text */}
                <div className="flex flex-col gap-1.5 min-w-0">
                  <span className="typo-eyebrow text-[11px]">{article.category}</span>
                  <h3 className="text-[17px] font-bold text-[#F0F5F0] group-hover:text-[#C8A96E] transition-colors duration-300 line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <span className="font-mono text-[11px] text-[#627364] mt-auto">
                    {article.readTime} read →
                  </span>
                </div>
              </motion.article>
            ))}

            {/* Inline Quote Block */}
            <div className="mt-auto p-6 sm:p-8 bg-[#0E110E] border-t border-white/[0.08] flex flex-col gap-3">
              <span className="text-[#C8A96E]/20 text-[40px] font-extrabold leading-none select-none">
                “
              </span>
              <p className="text-[16px] font-semibold text-[#9EAEA0] leading-snug">
                Slogans don't scale. Systems do.
              </p>
              <span className="typo-eyebrow text-[#627364]">
                — Shalom C. Ernest, FIMC, CMC
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
