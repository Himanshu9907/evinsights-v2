/**
 * EVInsights — Lead Data Contract
 *
 * A lead represents a user's explicit interest in a vehicle,
 * pricing, test drive, dealer contact, or purchase enquiry.
 *
 * User identity and consent remain separate records.
 */

export const LEAD_SCHEMA = {
  id: "string",

  userId: "string",

  vehicleId: "string|null",

  variantId: "string|null",

  locationId: "string|null",

  dealerId: "string|null",

  source: "website|pricing|comparison|vehicle_page|campaign|other",

  intent:
    "price_request|test_drive|dealer_contact|purchase|finance|exchange|other",

  status:
    "new|qualified|assigned|contacted|converted|closed|rejected",

  contactPreference:
    "phone|email|whatsapp|any|null",

  consentId: "string",

  notes: "string|null",

  assignedAt: "ISO-8601 datetime|null",

  contactedAt: "ISO-8601 datetime|null",

  convertedAt: "ISO-8601 datetime|null",

  createdAt: "ISO-8601 datetime",

  updatedAt: "ISO-8601 datetime",
};