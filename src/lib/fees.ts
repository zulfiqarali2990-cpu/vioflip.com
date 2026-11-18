// Trust-level fees. Source: docs/escrow-payments.md and docs/api-data-model.md.
// Fees are computed server-side from the current trust level at buy time
// and stored on the Order. Never trust client-supplied fees.

export type TrustLevel = "new" | "verified" | "trusted" | "elite";

export const FEES: Record<TrustLevel, { sellerPct: number; buyerPct: number }> = {
  new: { sellerPct: 5, buyerPct: 4 },
  verified: { sellerPct: 4, buyerPct: 4 },
  trusted: { sellerPct: 3.5, buyerPct: 3.5 },
  elite: { sellerPct: 3, buyerPct: 3 },
};

export function buyerTotalCents(priceCents: number, level: TrustLevel): number {
  return priceCents + Math.round((priceCents * FEES[level].buyerPct) / 100);
}

export function sellerPayoutCents(priceCents: number, level: TrustLevel): number {
  return priceCents - Math.round((priceCents * FEES[level].sellerPct) / 100);
}
