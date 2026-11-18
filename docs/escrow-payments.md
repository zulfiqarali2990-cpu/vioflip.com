# Vio Flip — Escrow + Payments + Merchant Integrations

Scope: clone VerifiedFlip functionality, not its logo, name or content. Spec only. No live payments yet.

## Escrow flow

5 steps. Funds locked until buyer confirms.

| Step | Actor | Action |
| --- | --- | --- |
| 1. Paid into escrow | Buyer | Pay price + buyer fee. Seller sees funds, cannot touch them. |
| 2. Seller delivers | Seller | Credentials in Secure Handover box, never in chat. Pages/channels: add buyer as admin/owner + screenshots. |
| 3. Buyer confirms | Buyer | Log in, change password, change recovery email/phone, check control. Press confirm. |
| 4. Safety review | Vio Flip | Final check after confirmation. |
| 5. Seller paid | Vio Flip | Release to seller wallet. |

Source model: VerifiedFlip guide — buyer pays into escrow, seller hands over, buyer confirms, then seller is paid; deal page shows the five steps. [1]

## Timers

- Delivery: 3 days. Seller has 3 days to deliver. No delivery = automatic refund. [1]
- Buyer check: 3 days. Buyer has 3 days to check after delivery. [1]
- YouTube hold: 7 days after delivery. Payment held — YouTube only lets the new owner become primary owner after 7 days. [1]
- Cover: 14 days from delivery. Adopted from G2G GamerProtect, not from VerifiedFlip. Claims in window only, with evidence. No extension after expiry. [2]

## Dispute / claim

- Report a problem before confirming. Funds stay locked while team reviews with both sides. [1]
- Covered: never delivered, not as described / no access, ownership mismatch.
- Not covered: buyer's remorse, deals outside Vio Flip, confirmed orders, publisher ban after cover ends. [2]
- Outcome: refund to buyer wallet, or release to seller. Decision recorded on deal page.
- Chat: phone numbers, messaging apps and outside payment details hidden automatically. Never pay a seller directly. [1]

## Fees

Listing, adding funds, withdrawing: free. Fee only on completed deal. Shown before payment. [1]

| Trust level | Seller | Buyer | How to get there |
| --- | --- | --- | --- |
| New | 5% | 4% | Start here, no ID check yet |
| Verified | 4% | 4% | Email + ID checked |
| Trusted | 3.5% | 3.5% | 5 completed deals, good reviews, account 14+ days old |
| Elite | 3% | 3% | 20 completed deals, 10+ reviews, 4.7+ rating, $10,000+ sales |

Seller 3–5%, buyer 3–4% overall. [1]

Example: $100 listing, Trusted buyer = $103.50 total. Trusted seller receives $96.50.

## Wallet

- Primary: USDT on BNB Smart Chain (BEP20). 1 USDT = $1. [1]
- Top-up: Wallet → Add funds, enter amount. Send exactly the shown amount to the shown address. Extra cents are the payment ID. Credit automatic, about 1 minute after payment. Add exchange network fee on top so the full amount arrives. [1]
- Send only USDT, only BEP20. Another coin or network (TRC20, ERC20) cannot be recovered. Wrong amount: paste TXID, credit after safety wait. [1]
- Withdraw: Wallet → Withdraw, amount + own USDT (BEP20) address. Free. Team sends, buyer notified on payment. [1]
- Local payment: if buyer cannot pay with crypto, support helps with a local method. [1]

## Merchant integrations

Status: Live = works in v1. Configurable = settings field exists, needs keys/account. Manual = support-handled, no auto API.

| Method | Market | Status | Config |
| --- | --- | --- | --- |
| USDT BEP20 | Global | Live | Platform wallet address, network = BEP20 only |
| Stripe | Global cards, 46+ countries | Configurable | BYO Stripe secret + publishable key, webhook secret. Not for a Pakistan-registered merchant. |
| PayPal | Global, 200+ countries | Configurable | BYO PayPal client ID + secret, webhook ID. Pakistan receiving/withdrawal restricted. |
| JazzCash | Pakistan, PKR | Configurable via aggregator | Aggregator API key (e.g. Kpaisa / Flux Pay / ZurvaPay), merchant ID, webhook secret |
| Easypaisa | Pakistan, PKR | Configurable via aggregator | Same aggregator as JazzCash, one API for both |
| Bank transfer | Pakistan / global | Manual | Bank name, account title, IBAN/account no., proof upload, manual confirm |
| Raast QR | Pakistan | Configurable via aggregator | Via same Pakistan aggregator, dynamic QR |

Notes:

- Stripe does not operate in Pakistan; PayPal receiving/withdrawing in Pakistan remains restricted. Use a non-Pakistan Stripe/PayPal entity, or an intermediary, or keep them off for PK merchants. [3]
- JazzCash / Easypaisa direct merchant = separate application, compliance review, own credentials per provider. Aggregator = one API for JazzCash, Easypaisa, Raast QR, cards and bank transfer, with hosted checkout or direct API and signed webhooks. [4][5]
- USDT is the only escrow funding rail in v1. Card / wallet methods top up the wallet first, then buy with escrow. No direct seller payment outside escrow.
- All methods: test keys first, webhook signature verify, idempotency key per order, no secret keys in client code.

## Configurable vs live

| Item | v1 |
| --- | --- |
| Escrow 5-step flow, timers, dispute | Live |
| USDT BEP20 wallet top-up / withdraw | Live |
| Fees by trust level, shown pre-pay | Live |
| Stripe / PayPal | Configurable, off by default |
| JazzCash / Easypaisa via aggregator | Configurable, off by default |
| Bank transfer | Manual, on by default |
| Seller dashboard, shop insights (7/30/90 days) | Live |

## Decisions (decided by user, 2026-11-18)

- KYC: manual — team reviews ID card + selfie, no third-party KYC provider in v1.
- Pakistan payments: Easypaisa official + AsaanPay (not Kpaisa / Flux Pay / ZurvaPay).
- Stripe/PayPal entity: UK and USA.
- Dispute SLA: 24/7 — disputes handled round the clock.

## Sources

[1] VerifiedFlip guide, published 2026-11-15 — https://www.verifiedflip.com/guide
[2] G2G GamerProtect, 14-day insurance — https://help.g2g.com/en/articles/10000077-how-long-is-the-insurance-period-for-game-accounts-sold-on-g2g
[3] PayPal / Stripe in Pakistan — https://payxem.com/blog/paypal-launches-sri-lanka-what-about-pakistan-bangladesh-nepal-freelancers/
[4] Kpaisa, Pakistan gateway, one API for JazzCash / Easypaisa / Raast — https://www.kpaisa.pk/
[5] JazzCash direct vs aggregator — https://www.simpaisa.com/blogs/how-to-accept-jazzcash-payments-on-your-website-step-by-step-2026/
