import { PROFILE_DATA } from '../data/shalomData';

/**
 * Form delivery via FormSubmit (https://formsubmit.co): entries are emailed to
 * Shalom's inbox. The first entry ever sent triggers a one-time activation email
 * to that inbox; nothing is delivered until the link in it is clicked.
 */
export const CONTACT = {
  email: PROFILE_DATA.email,
  phone: PROFILE_DATA.phone,
  phoneHref: 'tel:' + PROFILE_DATA.phone.replace(/[^+\d]/g, ''),
  city: 'Lagos, Nigeria',
};

const ENDPOINT = `https://formsubmit.co/ajax/${CONTACT.email}`;

export type SendResult = { ok: true } | { ok: false; reason: 'network' | 'not-activated' | 'rejected' };

export async function sendEnquiry(subject: string, fields: Record<string, string>, replyTo?: string): Promise<SendResult> {
  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(fields)) if (v && v.trim()) clean[k] = v.trim();

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...clean,
        _subject: subject,
        _template: 'table',
        _captcha: 'false',
        ...(replyTo ? { _replyto: replyTo } : {}),
      }),
    });
    const data = await res.json().catch(() => ({}));
    const ok = res.ok && (data.success === true || data.success === 'true');
    if (ok) return { ok: true };
    const msg = String(data.message || '').toLowerCase();
    return { ok: false, reason: msg.includes('activat') ? 'not-activated' : 'rejected' };
  } catch {
    return { ok: false, reason: 'network' };
  }
}

/** Last-resort hand-off to the visitor's own email app. */
export function enquiryMailto(subject: string, fields: Record<string, string>) {
  const body = Object.entries(fields)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v.trim()}`)
    .join('\n');
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
