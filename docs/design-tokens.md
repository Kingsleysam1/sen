# shalomernest.com: design tokens

One system for the site and for anything printed or posted alongside it (flyers included).

## Colour

| Token | Value | Use |
|---|---|---|
| Black | `#000000` | Header, hero frame, dark sections, footer |
| Ink | `#111111` | Headings and primary text on light grounds |
| Off-white | `#F4F4F2` | Light section ground (Impact Matrix, Events) |
| White | `#FFFFFF` | Light section ground (Bio, Credentials, FAQ), cards |
| Grey 600 | `#555555` | Body text on light grounds |
| Grey 500 | `#666666` / `#777777` | Captions, secondary text on light |
| White 70% | `rgba(255,255,255,0.7)` | Body text on dark grounds |
| Accent | `#8AC4FF` | The one accent: small dots, focus rings, button hover. Never large fills |

Sections alternate dark and light: Hero (dark), Titles strip (dark), Bio (white), Impact Matrix (off-white), Expertise and Programs (dark), Credentials (white), Engagements (dark), Events (off-white), Testimonials (dark photo), FAQ (white), Footer (dark).

## Type

One family: **Inter Tight** (self-hosted, `@fontsource-variable/inter-tight`).

| Role | Size | Weight | Tracking | Line height |
|---|---|---|---|---|
| Display (hero name) | `clamp(54px, 9vw, 128px)` | 500 | -0.045em | 0.95 |
| Section heading | `clamp(36px, 5.2vw, 68px)` | 500 | -0.04em | 1.02 |
| Card / list title | `clamp(26px, 3.6vw, 48px)` (lists), 21px (cards) | 500–600 | -0.02 to -0.035em | 1.05–1.15 |
| Programme card name | `clamp(26px, 2.6vw, 34px)`, uppercase | 800 | -0.02em | 0.95 |
| Body | 16–18px | 400 | 0 | 1.55–1.65 |
| Eyebrow | 11–12px, uppercase, preceded by a 6px dot | 600 | 0.16em | n/a |

## Buttons

- **Primary on dark:** white pill, black text, 14–15px semibold, `px-6 py-3`. Hover: accent fill.
- **Primary on light:** black pill, white text, same size.
- **Secondary:** quiet text link (white 85% on dark), underline on hover. One primary per block.
- **Tertiary chip:** `#F2F2F0` pill on light (calendar, tags).

## Shape and space

- Radius: hero frame 28px, photo cards and event cards 22px, small chips fully round.
- Section padding: `clamp(70px, 9vw, 130px)` top and bottom (`.section-padding`).
- Container: max 1320px (`.site-container`).
- Fixed header: 64px on phones, 72px on desktop. Every section has `scroll-margin-top: 88px`.

## Photos

Full colour, never desaturated or darkened as a style. Darken only with a gradient where text sits on a photo. Use only real photographs of Shalom; no stock people.
