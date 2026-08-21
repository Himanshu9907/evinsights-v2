/**
 * EVInsights — Market Data Contract
 *
 * Defines country/market-level EV configuration.
 * Location handles geography; Market handles automotive-market rules.
 */

export const MARKET_SCHEMA = {
  id: "string",

  countryCode: "string",

  name: "string",

  slug: "string",

  currency: {
    code: "string",
    symbol: "string",
    minorUnit: "number",
  },

  units: {
    distance: "km|mi",
    power: "kW|hp|PS",
    energy: "kWh",
    temperature: "C|F",
  },

  pricing: {
    taxIncludedByDefault: "boolean",
    priceType: "ex_showroom|msrp|on_road|other",
  },

  vehicleStandards: {
    rangeTestCycles: ["string"],
    chargingStandards: ["string"],
  },

  regulations: {
    drivingSide: "left|right",
    registrationRequired: "boolean",
  },

  status: "active|inactive",

  sourceIds: ["string"],

  createdAt: "ISO-8601 datetime",

  updatedAt: "ISO-8601 datetime",
};