# Vio Flip

**Buy and sell social accounts, escrow-protected.**

Vio Flip is a marketplace for flipping social media accounts — Facebook pages, YouTube channels, TikTok, Instagram, X, Telegram, aged Gmail and AI-tool subscriptions. Every deal is protected by escrow: the buyer pays in, the seller delivers, and the seller is paid only after the buyer confirms full control.

> **Status:** Initial scaffold. Specs audited; app code is a starter, not yet a complete build. No live payments until the escrow state machine and dispute flow are tested.

---

## What you can do

- **Marketplace** — Browse, search, filter and sort listings by platform, price, followers and monetisation.
- **Listing detail** — Stats, ownership-verified badge, seller trust level, reviews and handover steps.
- **Sell** — Create a listing with ownership proof (one-time code in bio) and analytics screenshots.
- **Escrow** — 5 steps: Paid → Delivered → Confirmed → Safety review → Paid out.
- **Wallet** — USDT (BEP20) top-up and withdraw. 1 USDT = $1.
- **Merchant dashboard** — Listings, sales, orders, shop insights and trust level.
- **Admin panel** — Users, listings, orders, disputes, KYC queue, fees and platform settings.
- **Chat** — In-app chat with contact details hidden automatically. Credentials are shared only in the encrypted Secure Handover box, never in chat.

## How escrow works

1. **Buyer pays into escrow.** The price + buyer fee is locked. The seller can see the funds but cannot touch them.
2. **Seller delivers within 3 days.** Credentials go into the Secure Handover box. For pages/channels, the seller adds the buyer as admin/owner.
3. **Buyer checks within 3 days.** Log in, change the password and recovery details, confirm full control.
4. **Safety review.** The Vio Flip team does a final check.
5. **Seller is paid** into their wallet. Payment stays pending for 7 days after the deal (YouTube primary-owner transfer), during which the buyer can report a problem.

No delivery in 3 days means an automatic refund. Report a problem before confirming and the funds stay locked while the team decides.

## Fees

Listing, top-up and withdraw are free. A fee applies only on a completed deal, and is shown before payment.

| Trust level | Seller fee | Buyer fee | How to reach it |
| --- | --- | --- | --- |
| New | 5% | 4% | Start here |
| Verified | 4% | 4% | Email + ID verified |
| Trusted | 3.5% | 3.5% | 5 completed deals, account 14+ days old |
| Elite | 3% | 3% | 20 completed deals, 10+ reviews, 4.7+ rating, $10,000+ sales |

Example: a $100 listing for a Trusted buyer costs $103.50 in total. A Trusted seller receives $96.50.

## Payments

| Method | Status |
| --- | --- |
| USDT on BNB Smart Chain (BEP20) | Live — primary rail |
| Stripe | Configurable — needs your own keys |
| PayPal | Configurable — needs your own keys |
| JazzCash / Easypaisa / Raast | Configurable — via a Pakistan payment aggregator |
| Bank transfer | Manual — proof upload, team confirms |

Note: Stripe does not operate in Pakistan, and PayPal receiving/withdrawal in Pakistan is restricted. Use a non-Pakistan Stripe/PayPal entity, or keep them off for Pakistan-registered merchants.

## Tech stack

- **Framework:** Next.js 15 (App Router) + TypeScript, Node 22
- **UI:** Tailwind CSS + shadcn/ui, Framer Motion — minimal text, short labels only
- **Auth:** NextAuth (Google + email), ID verification status on User
- **Database:** PostgreSQL + Prisma
- **Realtime:** Pusher (chat, order status)
- **Payments:** USDT BEP20 wallet, Stripe + PayPal SDKs behind one `payments/` adapter
- **Testing:** ESLint, Prettier, Vitest for escrow fee math

## Quick start

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

Open http://localhost:3000

## Environment variables

See `.env.example` for the names only. Never commit real values.

Required: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, Pusher keys, payment keys / wallet address.

## Project structure

```
├── prisma/                 # schema.prisma, seed.ts
├── public/                 # logo.svg, logo.png, favicon.ico
├── src/
│   ├── app/                # homepage, marketplace, listing, sell,
│   │                       # dashboard, orders, wallet, settings, api
│   ├── components/         # ListingCard, EscrowSteps, TrustBadge, Header
│   ├── lib/                # prisma, fees, escrow state machine, payments
│   └── types/
└── docs/                   # escrow, fees, API + data model
```

## Branding

Final logo: blue squircle with two profile cards (blue behind, red/coral in front) and a red flip arrow; bold italic `Vio Flip` wordmark in dark charcoal. Font: **Urbanist Black Italic (900)** — Google Fonts, OFL — for the wordmark and headings. It is the closest visual match to the logo (verified by side-by-side render against the logo); the logo's `o` counter is a touch narrower, likely from the design tool's tight tracking, not a different family.

| Colour | Hex |
| --- | --- |
| Bright blue | `#0077FE` |
| Red / coral | `#FE5C4A` |
| Dark charcoal | `#1B2530` |
| White | `#FFFFFF` |

## Docs

- `docs/github-scaffold.md` — scaffolding plan
- `docs/escrow-payments.md` — escrow, fees, wallet, integrations
- `docs/api-data-model.md` — entities and `/api/v1` endpoints (~40 endpoints)

## Deployment

- **Vercel** (recommended for launch) — connect the repo, set env vars, add Postgres.
- **Hostinger Node 22 via SSH** (mirror/backup) — same pattern as sms.oriptos.com. Set env vars on the server, run `prisma migrate deploy` on deploy.

## Security

- Never commit `.env`, API keys or wallet private keys.
- Handover credentials are encrypted and visible only to buyer, seller and the safety team.
- Contact and payment details are masked automatically in chat. Never pay a seller directly outside escrow.

## Roadmap

- Admin panel — full controls (in progress)
- Deep audit findings from VerifiedFlip — applied to escrow and fees
- KYC provider + Pakistan payment aggregator — to be decided
- Dispute SLA — to be decided

## Licence

To be confirmed.
