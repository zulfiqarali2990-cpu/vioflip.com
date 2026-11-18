# Vio Flip — GitHub Scaffolding Plan

Repo: https://github.com/zulfiqarali2990-cpu/vioflip.com
Status checked 2026-11-18: empty. Plan only — do not push, commit, or change the repo from this plan.

## 1. What to clone (VerifiedFlip, functionality only)

Do not copy VerifiedFlip's name, logo, or copy. Clone its structure:

- **Marketplace:** browse/search/filter/sort listings; categories — Facebook Pages, YouTube Channels, TikTok, Instagram, X, Telegram, Aged Gmail, AI subscriptions, Premium tools, Services.
- **Listing:** price, followers, niche, monetised badge, ownership-verified badge, seller trust level, views, age.
- **Buyer flow:** sign up (Google + email) → ID/email verify → top up wallet → Buy with escrow → encrypted handover box (never in chat) → confirm control → safety review → seller paid.
- **Escrow:** 5 steps — Paid → Delivered → Confirmed → Safety review → Paid out. 3-day delivery window. YouTube: 7-day hold for primary-owner transfer. Accounts: 14-day cover. Dispute/claim within 72h of delivery.
- **Seller / merchant dashboard:** create listing + ownership proof, wallet, sales/orders, trust levels.
- **Fees (VerifiedFlip model):** listing free, withdrawal free. Seller 3–5%, buyer 3–4%. Trust levels: New 5%/4%, Verified 4%/4%, Trusted 3.5%/3.5% (5 deals, 14+ days), Elite 3%/3% (20 deals, 10+ reviews 4.7+, $10k+ sales).
- **Payments:** USDT (BEP20) primary wallet — auto-credit. Merchant integrations (configurable, not live until keys added): Stripe, PayPal, JazzCash, Easypaisa, bank transfer.
- **Trust & safety:** ID check, ownership proof, contact details hidden in chat, reviews/ratings.

## 2. Tech stack (recommended)

Matches the user's existing stack (sms.oriptos.com: Next.js 14.2.3, Prisma, NextAuth, Pusher, Node 22) so the team can reuse it.

- **Framework:** Next.js 15 (App Router) + TypeScript + Node 22
- **UI:** Tailwind CSS + shadcn/ui, Framer Motion for smooth transitions, minimal text — short labels, headings, buttons only
- **Auth:** NextAuth (Google + email), ID verification status on User
- **DB:** PostgreSQL + Prisma (same as sms-panel)
- **Realtime:** Pusher (chat, order status) — already used by user
- **Payments:** USDT BEP20 wallet (manual/auto-credit via provider webhook), Stripe + PayPal SDKs behind a single `payments/` adapter; JazzCash/Easypaisa/bank transfer as manual methods
- **Storage:** S3-compatible / Hostinger storage for listing screenshots, ID docs (private)
- **Testing / quality:** ESLint, Prettier, Vitest for escrow fee math

Alternative if Vercel-only: same stack, replace Pusher with Vercel + Supabase Realtime. Do not pick both — pick Next.js + Prisma as above.

## 3. Branding (final, user-supplied 2026-11-18)

- Logo: blue squircle, two profile cards (blue behind, red/coral in front), red flip arrow; bold italic `Vio Flip` wordmark, dark charcoal.
- Files: `workspace/user/media_library/image/vio-flip-logo-final.png`, `workspace/user/media_library/image/vio-flip-branding-merchandise.png`
- Colours (measured from `vio-flip-logo-final.png` 2026-11-18 by pixel sampling, not approx): bright blue `#0077FE` — modal saturated-blue pixel (0,119,254), 10,471 px; red/coral `#FE5C4A` — modal (254,92,74); dark charcoal wordmark `#1B2530`; white `#FFFFFF`, black for merch. Blue+red diagonal stripes as the merch accent.
- Do NOT use the old gradient (Teal #00B8A9 → Blue #3B82F6 → Violet #7C5CFF) for Vio Flip — that was PandaPing/Oriptos.

## 4. Folder structure

```
vioflip.com/
├── README.md
├── .gitignore
├── .env.example
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   ├── logo.svg
│   ├── logo.png
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── (marketing)/page.tsx        # homepage
│   │   ├── marketplace/page.tsx        # browse + filters
│   │   ├── listing/[id]/page.tsx
│   │   ├── sell/page.tsx               # create listing
│   │   ├── dashboard/page.tsx          # merchant dashboard
│   │   ├── orders/[id]/page.tsx        # escrow tracker
│   │   ├── wallet/page.tsx
│   │   ├── settings/integrations/page.tsx
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── listings/route.ts
│   │       ├── orders/route.ts
│   │       ├── escrow/route.ts
│   │       └── wallet/route.ts
│   ├── components/
│   │   ├── ui/                         # shadcn/ui
│   │   ├── ListingCard.tsx
│   │   ├── EscrowSteps.tsx
│   │   ├── TrustBadge.tsx
│   │   └── Header.tsx
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── fees.ts                     # trust-level fee table
│   │   ├── escrow.ts                   # state machine
│   │   └── payments/
│   │       ├── usdt.ts
│   │       ├── stripe.ts
│   │       └── paypal.ts
│   └── types/
└── docs/
    ├── escrow-flow.md
    └── fees.md
```

## 5. README outline

1. Vio Flip — Buy & sell social accounts, escrow-protected
2. Features (marketplace, escrow, wallet, merchant dashboard)
3. Tech stack
4. Quick start (`npm install`, `.env`, `prisma migrate`, `npm run dev`)
5. Env vars (list only names, never values)
6. Deploy — Vercel / Hostinger
7. Fees & trust levels
8. Contributing / licence

## 6. First files to create (in order)

1. `README.md`, `.gitignore`, `.env.example` (no secrets)
2. `package.json` — Next.js, Prisma, NextAuth, Tailwind, Pusher
3. `prisma/schema.prisma` — User, Listing, Category, Order (EscrowDeal), WalletTransaction, Review, Dispute
4. `src/lib/fees.ts` + `src/lib/escrow.ts` — fee table + 5-step state machine (unit-tested)
5. `src/app/(marketing)/page.tsx` + `src/app/marketplace/page.tsx` + `ListingCard.tsx` — homepage + marketplace, minimal text
6. `src/app/api/listings/route.ts`, `src/app/api/orders/route.ts` — read/list + create-order stubs
7. `public/logo.svg` (traced from final logo) + `tailwind.config.ts` (brand colours)
8. Seed data: 12 sample listings (Facebook monetised, YouTube, TikTok USA/UK, Instagram) — clearly marked sample

## 7. Deployment

**Vercel (recommended for Next.js):**
- Connect repo → Vercel project → env vars → Postgres (Vercel Postgres / Neon / Supabase) → `vercel --prod`. Preview deploys per PR. Best for smooth UI, edge, and the artifact preview workflow.

**Hostinger (user already uses it for sms.oriptos.com):**
- Same pattern as sms-panel: Node 22 app, `hbuilds/current/nodejs` style deploy via SSH only (no hPanel login). Needs a VPS or Node-capable plan — shared hosting alone will not run Next.js + Prisma reliably. Set `DATABASE_URL`, `NEXTAUTH_SECRET`, Pusher + payment keys via `.env` on the server, never in the repo. Run `prisma migrate deploy` on deploy.

Pick Vercel for launch; keep Hostinger as the mirror/backup once traffic and payments are proven.

## 8. What NOT to do

- No push/commit from this plan. No credentials, API keys, or `.env` values in the repo.
- No copying VerifiedFlip's logo, name, or listing copy.
- No long descriptive text in the UI — minimal text everywhere.
- No live payments until escrow state machine + dispute flow are tested.
