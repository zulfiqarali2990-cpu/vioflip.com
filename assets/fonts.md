# Vio Flip — Fonts

## Wordmark font: Urbanist Black Italic (900)

**Urbanist Black Italic (900)** is the closest visual match to the Vio Flip
logo wordmark — confirmed by a side-by-side render against the original logo
(`font-comparison.png` in this folder). **It is a visual match, not the
original font file**; the logo's own font file was never supplied.

Why Urbanist, not Poppins/Montserrat: Poppins ExtraBold Italic and Montserrat
ExtraBold Italic are rounder and wider than the logo letters. Urbanist 900
Italic matches the narrower `o` counter and the shapes of `V`, `F`, `l`, `p`.
The logo's `o` is a touch narrower still — likely tight tracking in the
design tool, not a different font.

## Files in `fonts/`

| File | What it is |
| --- | --- |
| `Urbanist-Variable.ttf` | Urbanist upright, variable wght 100–900 |
| `Urbanist-Italic-Variable.ttf` | Urbanist italic, variable wght 100–900 |
| `Poppins-*.ttf` (7 files) | Poppins Regular/Medium/SemiBold/Bold/ExtraBold + BoldItalic/ExtraBoldItalic — fallback only, kept from the first pass |

Use in the product:

```css
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,900&display=swap');

.wordmark { font-family: 'Urbanist', sans-serif; font-weight: 900; font-style: italic; }
```

| Usage | Font |
| --- | --- |
| Logo wordmark, big headings | Urbanist 900 Italic |
| Tagline, sub-headings | Urbanist 600 |
| Body text, buttons, labels | Urbanist 400 / 500 / 600 / 700 |
| Numbers, prices | Urbanist 700 |

Licence: Urbanist and Poppins are both under the SIL Open Font License 1.1 —
free for commercial use, including web and app embedding.
