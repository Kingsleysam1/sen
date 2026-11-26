import React from 'react';
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { PROFILE_DATA } from '../data/shalomData';

/** Official brand colours, white logo on top. */
const SOCIALS = [
  { key: 'linkedin', label: 'LinkedIn', icon: FaLinkedinIn, bg: '#0A66C2', size: 18 },
  {
    key: 'instagram',
    label: 'Instagram',
    icon: FaInstagram,
    bg: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
    size: 20,
  },
  { key: 'facebook', label: 'Facebook', icon: FaFacebookF, bg: '#1877F2', size: 18 },
  { key: 'youtube', label: 'YouTube', icon: FaYoutube, bg: '#FF0000', size: 20 },
] as const;

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {SOCIALS.map(({ key, label, icon: Icon, bg, size }) => (
        <a
          key={key}
          href={PROFILE_DATA.socials[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Shalom Ernest on ${label}`}
          style={{ background: bg }}
          className="w-11 h-11 rounded-full flex items-center justify-center text-white shadow-[0_2px_10px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Icon size={size} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
