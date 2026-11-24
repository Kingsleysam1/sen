import { PROFILE_DATA } from '../data/shalomData';

/**
 * The site has no form backend yet, so every form hands its contents to the
 * visitor's own email app, addressed to Shalom. Nothing is lost silently.
 * Swap this for a real form service (Formspree, Resend, etc.) when one is chosen.
 */
export const CONTACT = {
  email: PROFILE_DATA.email,
  phone: PROFILE_DATA.phone,
  phoneHref: 'tel:' + PROFILE_DATA.phone.replace(/[^+\d]/g, ''),
  city: 'Lagos, Nigeria',
};

export function openEnquiryEmail(subject: string, fields: Record<string, string>) {
  const body = Object.entries(fields)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v.trim()}`)
    .join('\n');
  const href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
}
