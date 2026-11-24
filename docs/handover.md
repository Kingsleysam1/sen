# Redesign brief: handover note (24 Nov 2026)

## Done

- **Forms now reach Shalom.** The booking form, event registration and community sign-up used to show "sent" while sending nothing. They now open the visitor's email app with the request pre-filled and addressed to shalom4impact@gmail.com, then tell the visitor to press Send. See `src/utils/enquiry.ts`.
- **Contact block** in the footer: email, phone (+234 813 207 8249) and city as real text and links, taken from `PROFILE_DATA` in `src/data/shalomData.ts`.
- **Events auto-archive.** `EVENTS_DATA` is the single source. Any event whose end date has passed moves to "Past events" with no Register or Calendar buttons. When nothing is upcoming, a "The next date is being set" card points to the community sign-up.
- **One price source.** The Elevate Your Edge price exists only in `EVENTS_DATA` (`fee`, `originalFee`) and is rendered from there.
- **Menu jumps** land with the heading clear of the fixed header (`scroll-margin-top: 88px`), checked at 360, 390, 768 and 1440px.
- **Chatbot panel** is now 360 × 460px (about 13% of a desktop screen), the suggestion chips wrap with none clipped, and it has a labelled close button. It never auto-opens.
- **Partner names** are no longer shown as plain text. Logos appear automatically once files are added to `PARTNER_LOGOS` in `PartnersMarquee.tsx`.
- **Hero proof line:** 10,000+ trained · FIMC, CMC · John Maxwell Team certified. The second button is now a quiet text link.
- **Counters** carry their final values in the markup and skip the count-up under reduced motion.
- **Accessibility:** visible focus rings, a labelled booking dialog that closes with Escape, and tap targets of 40–44px or more. No horizontal overflow at 360, 390 or 768px.
- **SEO:** `robots.txt`, `sitemap.xml`, canonical link.
- **Design tokens:** `docs/design-tokens.md`.

## Not done: needs facts or files from Shalom

1. **The brief's facts don't match the site.** It lists clients such as Microsoft, Coca-Cola and the major banks, awards such as the Naija Achievers Award 2023 and the John Maxwell Gold and Platinum awards, "4+ countries", "15+ strategic partnerships", a S.M.A.R.T. Goals programme and a 6-week Elevate Your Edge cohort. None of these appear in the site's data. The site says Elevate runs for two months, and this morning Shalom set the metrics to "4+ Government engagements" and "15+ Affiliate organizations". The brief also says Wema Bank, AIICO and Stanbic IBTC appear twice in the partner strip, but those names aren't in it at all. Nothing from the brief's fact list was added. Shalom should confirm each one before it goes on the site.
2. **Elevate Your Edge price:** the site says ₦35,000 (was ₦50,000); the flyer shows ₦60,000 and ₦35,000. Shalom needs to confirm the correct "was" price, then the flyer should be re-issued.
3. **Partner logos:** logo files for the organisations Shalom wants shown, with permission to show them.
4. **Testimonials:** photos, and at least three more real testimonials with name, role, organisation and a specific result.
5. **Form service:** email hand-off works, but a real form service (Formspree, Resend or similar) would send confirmations automatically. A response-time promise ("we reply within 1 business day") should only be added once Shalom commits to it.
6. **Booking link:** a Calendly (or similar) link for a 30-minute discovery call, if Shalom wants one.
7. **WhatsApp:** confirm whether +234 813 207 8249 is on WhatsApp before adding a WhatsApp button.
8. **Socials:** the brief gives instagram.com/shalomcernest, facebook.com/shalomcernest and linkedin.com/in/shalom-c-ernest; the site links to instagram.com/shalomernest1, facebook.com/shalom.ernest.98 and a different LinkedIn URL. Shalom should say which are correct.
9. **Programme detail pages, engagement archive and next event:** these need content (outcomes, curriculum, dates, prices) before they can be built honestly.
10. **Flyers:** a redesign with larger type and QR codes, and own-domain links instead of bit.ly, once the facts above are settled.
11. **Analytics:** turn on Vercel Web Analytics in the Vercel dashboard. Custom funnel events need a paid Vercel plan or another analytics tool.
12. **Without JavaScript:** the site is a single-page app, so it shows nothing with JavaScript off. A pre-rendered build would fix that; it is a larger change.

## Monthly check (owner)

On the first of each month: add new events to `EVENTS_DATA`, check prices and dates, and look at the Events section on the live site.
