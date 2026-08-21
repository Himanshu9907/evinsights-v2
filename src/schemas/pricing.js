/**
 * EVInsights — Pricing Data Contract
 *
 * Pricing is location + market + variant specific.
 *
 * Vehicle
 *   ↓
 * Variant
 *   ↓
 * Market
 *   ↓
 * Location
 *   ↓
 * Pricing
 */

export const PRICING_SCHEMA = {
  id: "string",

  variantId: "string",

  marketId: "string",

  locationId: "string",

  currency: "string",

  pricingType: "ex_showroom|msrp|on_road|lease|other",

  basePrice: "number",

  taxes: {
    registration: "number|null",
    roadTax: "number|null",
    gst: "number|null",
    cess: "number|null",
    other: "number|null",
    total: "number|null",
  },

  insurance: {
    amount: "number|null",
    included: "boolean",
  },

  incentives: [
    {
      name: "string",
      amount: "number",
      type: "government|manufacturer|dealer|other",
    },
  ],

  discounts: [
    {
      name: "string",
      amount: "number",
      type: "manufacturer|dealer|other",
    },
  ],

  onRoadPrice: "number|null",

  effectiveFrom: "ISO-8601 datetime",

  effectiveUntil: "ISO-8601 datetime|null",

  priceStatus: "current|expired|estimated|unverified",

  sourceIds: ["string"],

  verifiedAt: "ISO-8601 datetime|null",

  createdAt: "ISO-8601 datetime",

  updatedAt: "ISO-8601 datetime",
};