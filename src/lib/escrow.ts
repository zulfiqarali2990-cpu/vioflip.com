// 5-step escrow state machine. Source: docs/escrow-payments.md.
// paid -> delivering -> confirming -> safety_review -> paid_out
// Timers: 3-day delivery, 3-day buyer check, 7-day YouTube hold, 14-day cover.

export type EscrowStep =
  | "paid"
  | "delivering"
  | "confirming"
  | "safety_review"
  | "paid_out";

export const ESCROW_STEPS: EscrowStep[] = [
  "paid",
  "delivering",
  "confirming",
  "safety_review",
  "paid_out",
];

const NEXT: Record<Exclude<EscrowStep, "paid_out">, EscrowStep> = {
  paid: "delivering",
  delivering: "confirming",
  confirming: "safety_review",
  safety_review: "paid_out",
};

export function nextStep(step: EscrowStep): EscrowStep | null {
  return step === "paid_out" ? null : NEXT[step];
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export const DELIVERY_DAYS = 3;
export const BUYER_CHECK_DAYS = 3;
export const YOUTUBE_HOLD_DAYS = 7;
export const COVER_DAYS = 14;
