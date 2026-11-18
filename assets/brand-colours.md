# Vio Flip — Brand Colours

Source: the user's final logo `workspace/user/media_library/image/vio-flip-logo-final.png`
(1600×800). Colours below were **sampled from the logo file with Python/PIL** —
most-common exact pixel per cluster — not guessed. The earlier scaffold
estimate `#0B7FFF` was wrong; the real blue is `#0077FE`.

## Palette

| Name | Hex | RGB | Use |
| --- | --- | --- | --- |
| Bright blue | `#0077FE` | 0, 119, 254 | Primary. Squircle, buttons, links, category tiles |
| Red / coral | `#FE5C4A` | 254, 92, 74 | Accent. Front profile card, flip arrow, warnings, sale highlights |
| Dark charcoal | `#1B2530` | 27, 37, 48 | Wordmark, text, dark backgrounds, footer |
| White | `#FFFFFF` | 255, 255, 255 | Cards, text on dark/blue, page background |
| Light blue | `#5EA7FD` | 94, 167, 253 | Secondary accent. Back-card lines, subtle highlights |

Sampling detail: blue cluster `#0076FE`–`#0079FF`, most common exact `#0077FE`
(10,471 px); red cluster `#FD5B49`–`#FE5E4C`, most common exact `#FE5C4A`;
dark cluster `#1B2530`–`#1D2632`, representative `#1B2530`; white `#FFFFFF`.

## Rules

- **No old gradient.** The earlier Teal `#00B8A9` → Blue `#3B82F6` → Violet
  `#7C5CFF` gradient is retired for Vio Flip. Use flat `#0077FE` + `#FE5C4A`
  on `#1B2530` / white only.
- Diagonal blue/red stripes (as on the merch) are the only decorative pattern.
- Minimal text everywhere: short labels, headings and buttons only.
- No VerifiedFlip logo, name or content anywhere.

## Font

**Urbanist Black Italic (900)** — Google Fonts, OFL licensed — is the closest
visual match to the logo wordmark. This is a **visual match, not the original
font file**: the logo's letterforms were compared side by side with Urbanist,
Poppins and Montserrat (see `font-comparison.png`). Poppins / Montserrat
ExtraBold Italic are rounder and wider; Urbanist 900 Italic matches the
narrower `o` counter and the shape of `V`, `F`, `l`, `p`. The logo's `o`
counter is a touch narrower still, likely tight tracking in the design tool.

- Wordmark / headings: Urbanist Black Italic (900), italic.
- Sub-headings / tagline: Urbanist SemiBold (600).
- Body / UI: Urbanist Regular (400), Medium (500), SemiBold (600), Bold (700).
- Full weights are in `fonts/` (variable fonts, wght 100–900) — see `fonts.md`.
- SVG logo files name `font-family="Urbanist, Poppins, sans-serif"`; they
  render exactly only where Urbanist is installed/loaded — the PNG lockups
  are rendered with the real font and are the safe choice for sharing.
