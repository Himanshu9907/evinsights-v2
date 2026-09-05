/**
 * EVInsights Auto Importer
 * Test Fixture
 *
 * Toyota Urban Cruiser EBELLA
 *
 * IMPORTANT:
 * This fixture is used for pipeline testing.
 *
 * Production data should only be populated from
 * verified source adapters and evidence records.
 *
 * No database operations happen in this file.
 */

const toyotaUrbanCruiserEbella = {
  /**
   * SOURCE INFORMATION
   */
  sourceType: "manual",

  sourceName: "Toyota Urban Cruiser EBELLA Test Fixture",


  /**
   * BASIC IDENTITY
   */
  name: "Toyota Urban Cruiser EBELLA",

  model: "Urban Cruiser EBELLA",

  brand: "Toyota",

  brandSlug: "toyota",

  brandCountry: "Japan",


  /**
   * MARKET
   */
  market: {
    id: "india",

    name: "India",

    countryCode: "IN",

    currencyCode: "INR",

    currencySymbol: "₹"
  },

  markets: [
    "india"
  ],


  /**
   * CLASSIFICATION
   */
  fuelType: "Electric",

  vehicleType: "EV",

  bodyType: "SUV",

  segment: "Compact SUV",

  seatingCapacity: 5,


  /**
   * VEHICLE STATUS
   *
   * Keep status independent from availability.
   */
  status: "upcoming",

  availability: {
    india: "upcoming"
  },

  launchDate: null,


  /**
   * BASIC DESCRIPTION
   */
  description:
    "Toyota Urban Cruiser EBELLA electric SUV.",


  /**
   * PAGE DATA
   */
  page: {
    title:
      "Toyota Urban Cruiser EBELLA",

    subtitle:
      "Toyota electric SUV",

    description:
      "Explore Toyota Urban Cruiser EBELLA specifications, variants, pricing, range and features.",

    seoTitle:
      "Toyota Urban Cruiser EBELLA Price, Range & Specifications",

    seoDescription:
      "Explore Toyota Urban Cruiser EBELLA EV specifications, expected price, range, battery and features."
  },


  /**
   * POWERTRAIN
   *
   * Values intentionally remain null until
   * verified source data is connected.
   */
  batteryCapacityKwh: null,

  rangeKm: null,

  powerKw: null,

  powerBhp: null,

  torqueNm: null,

  transmission: "Automatic",

  drivetrain: null,


  /**
   * VEHICLE LEVEL PRICE
   *
   * Keep null until verified pricing exists.
   */
  priceMin: null,

  priceMax: null,

  currency: "INR",


  /**
   * MAIN IMAGE
   *
   * Do not use third-party copyrighted URLs
   * here without rights/permission.
   */
  image: null,

  imageUrl: null,


  /**
   * RATING
   */
  rating: null,

  reviewCount: null,


  /**
   * VARIANTS
   *
   * Empty until verified variants are available.
   */
  variants: [],


  /**
   * SPECIFICATIONS
   */
  specifications: {
    battery: {},

    performance: {},

    dimensions: {},

    safety: {},

    features: {}
  },


  /**
   * CHARGING
   */
  charging: {
    chargingPort: null,

    portableCharger: null,

    wallCharger: null,

    ac: {
      supported: null,

      powerKw: null,

      chargingTime: null,

      connectorType: null
    },

    dc: {
      supported: null,

      powerKw: null,

      chargingTime: null,

      connectorType: null
    }
  },


  /**
   * MEDIA
   */
  media: [],


  /**
   * SOURCES
   *
   * This fixture itself is marked as manual.
   * Real URLs/evidence will be added by source adapters.
   */
  sources: [
    {
      name: "Manual Test Fixture",

      type: "manual",

      url: null,

      confidence: 0
    }
  ],


  /**
   * RAW EXTRACTION AREA
   *
   * Useful later for preserving original
   * source values before normalization.
   */
  extracted: {},


  /**
   * VERIFICATION
   */
  verification: {
    status: "unverified",

    verifiedAt: null,

    verifiedBy: null
  },


  /**
   * IMPORT METADATA
   */
  importStatus: "draft",

  confidence: 0
};


export default toyotaUrbanCruiserEbella;


export {
  toyotaUrbanCruiserEbella
};