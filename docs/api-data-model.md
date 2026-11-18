# Vio Flip — API + Data Model (VerifiedFlip clone spec)

> Scope: clone VerifiedFlip's *functionality* for Vio Flip. Branding is Vio Flip final
> (blue squircle, two profile cards, red flip arrow; bright blue / red-coral / black /
> white; minimal text — short labels, headings, buttons only).
> Source: VerifiedFlip public homepage + public guide
> (`verifiedflip.com`, `verifiedflip.com/guide`, published 2026-11-15, read 2026-11-18).
> No public VerifiedFlip API was found. The endpoints below are Vio Flip's own
> design, modelled on the observed public flows — not VerifiedFlip's internal API.
> No live credentials are included. Money: USD, 1 USDT = $1. Primary rail:
> USDT (BNB Smart Chain / BEP20); merchant integrations configurable:
> Stripe, PayPal, JazzCash, Easypaisa, bank transfer (keys/wallet address in settings,
> never hard-coded, never in this spec).

## 1. Conventions

- Base: `/api/v1`. JSON only. Auth: `Authorization: Bearer <JWT>` (Google OAuth
  sign-in + JWT session; no password stored — VerifiedFlip signs up via Google).
- Errors: `{ "error": { "code", "message" } }`, HTTP 400 / 401 / 403 / 404 / 409 / 422.
- Pagination: `?page&limit` (default 20, max 100); list responses
  `{ "data": [...], "page", "limit", "total" }`. IDs: `uuid`. Money: integer cents
  in API (`price_cents`), displayed as `$`.
- Timestamps: `created_at`, `updated_at` (ISO 8601 UTC) on every entity.
- Never expose in chat or API responses: passwords, 2FA secrets, raw handover
  credentials to the wrong party, phone numbers / outside payment details
  (mask them in chat — VerifiedFlip hides contact details in chat).

## 2. Entities

### 2.1 User
| Field | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `username` | string, unique | chosen at signup |
| `email` | string, unique | Google OAuth |
| `google_sub` | string, unique | OAuth subject |
| `avatar_url` | string? | |
| `role` | enum `buyer \| seller \| both \| admin \| support` | default `both` |
| `trust_level` | enum `new \| verified \| trusted \| elite` | computed, see §4 |
| `email_verified` | bool | |
| `id_verified` | bool | ID card + selfie, manual review |
| `id_verification_status` | enum `none \| pending \| approved \| rejected` | |
| `last_online_at` | timestamp | shown on seller profile |
| `completed_deals` | int | denormalised counter |
| `total_sales_cents` | int | for Elite threshold |
| `rating_avg` | decimal(2,1) | from reviews |
| `rating_count` | int | |
| `wallet_balance_cents` | int | denormalised, >= 0 |
| `notification_prefs` | json | message / order / payment toggles |
| `is_banned` | bool | |

### 2.2 Category
| Field | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `slug` | string, unique | `facebook`, `youtube`, `tiktok`, `instagram`, `x`, `telegram`, `gmail`, `google-services`, `chatgpt`, `claude`, `grok`, `claude`… use VerifiedFlip's live list: Facebook pages/accounts/groups, YouTube, TikTok, Instagram, X, Telegram, aged Gmail, Google services, ChatGPT, Claude, Grok, Muse, Hark, Premium tools, Social media services, Freelance services, Other |
| `name` | string | |
| `icon` | string | icon key, not emoji |
| `parent_id` | uuid? | null for top level |
| `listing_count` | int | denormalised |
| `is_active` | bool | |

### 2.3 Listing
| Field | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `seller_id` | uuid FK → User | |
| `category_id` | uuid FK → Category | |
| `platform` | string | `facebook \| youtube \| tiktok \| instagram \| x \| telegram \| gmail \| …` |
| `asset_type` | enum `page \| channel \| account \| group \| subscription \| service` | e.g. Facebook Page, YouTube Channel, TikTok Account |
| `title` | string, ≤120 | minimal text |
| `public_url` | string | public link of the account |
| `price_cents` | int > 0 | |
| `followers` | int | subscribers / followers |
| `monthly_income_cents` | int? | claimed monthly income |
| `audience_countries` | string[] | top countries, e.g. `["US","UK"]` |
| `niche` | string? | e.g. Gaming, Pets, Cricket news |
| `is_monetized` | bool | CM / Creator Rewards on |
| `monetization_note` | string? | short, e.g. `CM on` |
| `ownership_verified` | bool | via one-time bio code (§5) |
| `ownership_code` | string? | one-time code, server-only, expires |
| `ownership_verified_at` | timestamp? | |
| `description` | string? | short; what is included + handover method |
| `screenshots` | string[] | analytics screenshots (URLs) |
| `status` | enum ListingStatus | see §4 |
| `views` | int | shop-insights counter |
| `chat_count` | int | |
| `strength_score` | int 0–100 | listing-strength meter |
| `published_at` | timestamp? | |
| `sold_at` | timestamp? | |

### 2.4 Order / Escrow (one row per deal)
| Field | Type | Notes |
|---|---|---|
| `id` | uuid PK | public deal no. e.g. `Deal #15` — expose `deal_number` int, unique, sequential |
| `listing_id` | uuid FK → Listing | listing snapshot copied at buy time (title, price, platform) — listing may later change |
| `buyer_id` | uuid FK → User | |
| `seller_id` | uuid FK → User | |
| `price_cents` | int | listing price at buy time |
| `buyer_fee_cents` | int | from buyer's trust level |
| `seller_fee_cents` | int | from seller's trust level, deducted at payout |
| `total_cents` | int | `price + buyer_fee` (what buyer pays) |
| `seller_payout_cents` | int | `price − seller_fee` |
| `currency` | string | `USD` (USDT 1:1) |
| `status` | enum OrderStatus | see §4 |
| `escrow_step` | enum `paid \| delivering \| confirming \| safety_review \| paid_out` | mirrors the 5-step deal page |
| `delivery_deadline_at` | timestamp | buy + 3 days |
| `confirm_deadline_at` | timestamp | delivery + 3 days (buyer check window) |
| `youtube_hold_until_at` | timestamp? | delivery + 7 days, YouTube primary-owner transfer only |
| `delivered_at` | timestamp? | |
| `confirmed_at` | timestamp? | |
| `paid_out_at` | timestamp? | |
| `dispute_reason` | string? | |
| `dispute_status` | enum `none \| open \| resolved_refund \| resolved_release` | |
| `review_id` | uuid? FK → Review | |

Money rule (VerifiedFlip): buyer pays `total` into escrow; seller sees it but
cannot touch it. Auto-refund if seller never delivers by `delivery_deadline_at`.
Funds stay locked while a dispute is open. After buyer confirms + safety review,
seller is paid into wallet (YouTube: after 7-day hold).

### 2.5 WalletTransaction
| Field | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `user_id` | uuid FK → User | |
| `order_id` | uuid? FK → Order | null for top-up / withdraw |
| `type` | enum `topup \| escrow_hold \| escrow_release \| payout \| withdraw \| refund \| fee` | |
| `amount_cents` | int | signed: + credit, − debit |
| `balance_after_cents` | int | |
| `method` | enum `usdt_bep20 \| stripe \| paypal \| jazzcash \| easypaisa \| bank_transfer \| local` | |
| `txid` | string? | chain / provider reference; USDT top-up uses the exact-cent amount as payment ID, TXID paste as fallback |
| `status` | enum `pending \| completed \| failed` | |
| `meta` | json? | deposit address, network, provider refs — no secrets |

Top-up (VerifiedFlip flow): user enters amount → server returns a unique
deposit address + exact amount in cents (extra cents = payment ID) → USDT
BEP20 only; other coin/network is unrecoverable → watcher credits balance
~1 min after on-chain confirmation. Withdraw: free; user enters amount +
own USDT BEP20 address; manual/team payout + notification.

### 2.6 Review
| Field | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `order_id` | uuid FK → Order, unique | one review per completed deal |
| `reviewer_id` | uuid FK → User | buyer |
| `seller_id` | uuid FK → User | |
| `rating` | int 1–5 | |
| `comment` | string? | short |
| `created_at` / `updated_at` | timestamp | editable later from deal page |

### 2.7 Chat / Handover
Chat is per listing (pre-sale) and per order (deal). Contact details are
masked server-side before delivery to clients.

| Field | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `listing_id` | uuid? FK → Listing | pre-sale thread |
| `order_id` | uuid? FK → Order | deal thread |
| `buyer_id`, `seller_id` | uuid FK → User | |
| `custom_offer_cents` | int? | seller can send a custom offer in chat |
| `custom_offer_status` | enum `none \| pending \| accepted \| declined \| expired` | |

**ChatMessage**: `id, chat_id FK, sender_id FK, body (masked), attachments[] (screenshots only), created_at, read_at?`. Support can be added to a chat (`Ask support`).

**Handover** (separate from chat — encrypted, never in chat):
| Field | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `order_id` | uuid FK → Order, unique | |
| `payload_encrypted` | text | login / admin-access details, encrypted at rest; decryptable only by buyer + support |
| `handover_type` | enum `login \| admin_invite \| owner_transfer` | YouTube = owner transfer |
| `proof_screenshots` | string[] | e.g. admin/owner added |
| `delivered_at` | timestamp? | sets `escrow_step = confirming` |

### 2.8 Notification
| Field | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `user_id` | uuid FK → User | |
| `type` | enum `message \| order \| payment \| verification \| dispute \| review` | |
| `title` | string | short |
| `ref_type` / `ref_id` | string / uuid? | order, chat, wallet tx |
| `is_read` | bool | |
| `created_at` | timestamp | in-app + push (user prefs) |

## 3. REST API

Auth: all except `GET /listings`, `GET /listings/:id`, `GET /categories`,
`GET /users/:id/public` require JWT.

### 3.1 Auth & users
| Method & path | Purpose |
|---|---|
| `POST /auth/google` | Google OAuth sign-in; body `{ id_token }` → JWT + user (create if new, choose username) |
| `POST /auth/logout` | Invalidate session |
| `GET /me` | Current user, wallet balance, trust level |
| `PATCH /me` | Username, avatar, notification prefs |
| `GET /users/:id/public` | Seller profile: trust level, completed deals, last online, rating, reviews |
| `POST /me/verify-id` | Submit ID photo + selfie → `id_verification_status=pending` |
| `GET /me/verification` | Verification status |
| `GET /me/shop-insights?range=7d\|30d\|90d` | Views, chats, orders, earnings per day; best listings |

### 3.2 Categories & listings (browse)
| Method & path | Purpose |
|---|---|
| `GET /categories` | List categories with live `listing_count` |
| `GET /listings?category&platform&q&min_price&max_price&min_followers&monetized_only&ownership_verified_only&sort=price_asc\|price_desc\|newest\|followers_desc&page&limit` | Search + filter (VerifiedFlip filters: price, followers, monetized only, ownership-verified only) |
| `GET /listings/:id` | Detail: numbers, income, audience countries, analytics screenshots, included/handover, seller summary |
| `GET /listings/:id/similar` | Same category/platform, excluding self |

### 3.3 Sell
| Method & path | Purpose |
|---|---|
| `POST /listings` | Create listing (free, ~2 min): platform, public URL, numbers, screenshots, price. Returns `strength_score` + `ownership_code` |
| `PATCH /listings/:id` | Edit own draft/live listing (not while an order is active) |
| `POST /listings/:id/pause` / `POST /listings/:id/resume` | Pause / resume |
| `DELETE /listings/:id` | Delete own draft (not sold / not in active order) |
| `POST /listings/:id/verify-ownership` | Seller pasted one-time code into account bio/description → server checks → sets `ownership_verified` |
| `GET /me/listings` | Seller's own listings + status |

### 3.4 Buy & escrow
| Method & path | Purpose |
|---|---|
| `POST /listings/:id/buy` | Create order: price + buyer fee → total; requires wallet balance ≥ total, else `402` with top-up hint. Locks funds (`escrow_hold`), listing → `reserved`. Returns order + deal page steps |
| `GET /orders/:id` | Deal page: 5 steps (`paid → delivering → confirming → safety_review → paid_out`), `What happens now`, time left |
| `GET /me/orders?type=buying\|selling&status&...` | My orders |
| `POST /orders/:id/deliver` | Seller: submit Handover (encrypted payload + proof screenshots). Sets `delivered_at`, `escrow_step=confirming`, `confirm_deadline_at = now + 3d`; YouTube also sets `youtube_hold_until_at = delivered + 7d` |
| `POST /orders/:id/confirm` | Buyer: "Yes, I got it" — only after changing password / recovery email / phone and checking control. Moves to `safety_review` |
| `POST /orders/:id/report-problem` | Buyer: open dispute before confirming. Money stays locked; `dispute_status=open` |
| `POST /orders/:id/dispute/resolve` | Admin/support only: `{ outcome: refund \| release }` |
| `POST /orders/:id/cancel` | Auto-refund path if seller misses `delivery_deadline_at` (server job; also manual support cancel) |
| `POST /orders/:id/review` | Buyer: 1–5 stars + comment after completion |
| `PATCH /orders/:id/review` | Edit own review from deal page |

Custom offer (chat): `POST /chats/:id/offer { amount_cents }`,
`POST /chats/:id/offer/accept` → creates an order at the offered price.

### 3.5 Chat
| Method & path | Purpose |
|---|---|
| `POST /listings/:id/chat` | Start / get pre-sale chat with seller |
| `GET /me/chats` | Chat list |
| `GET /chats/:id/messages` | Messages (contact details masked server-side) |
| `POST /chats/:id/messages` | Send message / screenshot; body is scanned + masked |
| `POST /chats/:id/ask-support` | Add support to the chat |

### 3.6 Wallet & merchant integrations
| Method & path | Purpose |
|---|---|
| `GET /me/wallet` | Balance + recent transactions |
| `POST /me/wallet/topup` | `{ amount_cents, method: usdt_bep20 }` → returns deposit address + exact amount (cents = payment ID). Local-method fallback: creates a support ticket |
| `POST /me/wallet/topup/verify-txid` | `{ txid }` — fallback when a different amount arrived; credit after safety wait |
| `POST /me/wallet/withdraw` | `{ amount_cents, address, method: usdt_bep20 }` — free; team payout + notification |
| `GET /me/wallet/transactions` | Wallet history |
| `GET /me/integrations` | Merchant integration options + status: `usdt_bep20, stripe, paypal, jazzcash, easypaisa, bank_transfer` |
| `PATCH /me/integrations/:method` | Seller/admin: enable + store provider keys / wallet address (encrypted, never returned in full) |

### 3.7 Admin / support (role-gated)
| Method & path | Purpose |
|---|---|
| `GET /admin/verifications?status=pending` | ID verification queue |
| `POST /admin/verifications/:userId/approve` / `.../reject` | Approve / reject ID |
| `GET /admin/disputes?status=open` | Dispute queue |
| `GET /admin/orders/:id` | Full deal view incl. handover (support only) |
| `POST /admin/listings/:id/review` | Listing review hold / approve (unverified sellers wait for review) |

## 4. Status enums

```text
ListingStatus:   draft | pending_review | live | reserved | sold | paused | rejected
OrderStatus:     escrow_paid | delivering | awaiting_confirmation
                 | safety_review | completed | refunded | disputed | cancelled
EscrowStep:      paid | delivering | confirming | safety_review | paid_out
TrustLevel:      new | verified | trusted | elite
  new:      seller 5%, buyer 4% — everyone starts here
  verified: seller 4%, buyer 4% — email + ID checked
  trusted:  seller 3.5%, buyer 3.5% — 5 completed deals, good reviews, account ≥14 days
  elite:    seller 3%, buyer 3% — 20 deals, 10+ reviews, rating ≥4.7, sales ≥$10,000
  Listing / top-up / withdraw: free. Fee only when a deal completes.
WalletTxStatus:  pending | completed | failed
DisputeStatus:   none | open | resolved_refund | resolved_release
HandoverType:    login | admin_invite | owner_transfer
```

## 5. Key flows (sequence)

**Buy:** `GET /listings` (filter) → `GET /listings/:id` → `POST /chats`
(optional) → `POST /me/wallet/topup` (USDT BEP20) → `POST /listings/:id/buy`
→ escrow hold → `POST /orders/:id/deliver` (seller, ≤3d, Handover box) →
buyer changes password/recovery, checks control → `POST /orders/:id/confirm`
(≤3d) → safety review → payout to seller wallet (YouTube: +7d hold) →
`POST /orders/:id/review`.
**No delivery** by deadline → auto-refund. **Problem** → `report-problem`
before confirm → funds locked → support resolves refund/release.
**Sell:** `POST /listings` → `POST /listings/:id/verify-ownership`
(bio code) → live (verified sellers skip review) → `GET /me/shop-insights`.

## 6. Build notes

- Trust-level fees must be computed server-side from the *current* level at
  buy time and stored on the Order — never trust client-supplied fees.
- Escrow money is a ledger, not a single balance: `WalletTransaction` rows
  (`escrow_hold` → `escrow_release`/`refund`) must reconcile to
  `User.wallet_balance_cents`; use a DB transaction per state change.
- Handover payload: encrypt at rest (e.g. AES-256-GCM, per-order key);
  only buyer + support roles may decrypt. Never log it.
- Chat masking: strip phone numbers, messenger handles, outside payment
  details server-side before store/return.
- Minimal-text UI: API returns short labels only; no long descriptions in
  responses beyond `description` on listings.
- Not in scope for v1: public third-party API, auctions, AI subscriptions
  as a separate billing system (sell them as `subscription` listings only).

## Sources

- VerifiedFlip homepage — https://verifiedflip.com/ — categories, fresh
  listings, 3-step escrow summary, USDT (BEP20) wallet note.
- VerifiedFlip guide — https://www.verifiedflip.com/guide — signup (Google),
  ID verification, filters, escrow deal page (5 steps), 3-day delivery,
  3-day check, 7-day YouTube hold, fees/trust table, withdraw, notifications.
- No public API documentation was found on either page (checked 2026-11-18).
