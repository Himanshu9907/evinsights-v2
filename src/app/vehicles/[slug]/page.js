import Link from "next/link";

import {
  getAllVehicles,
  getVehicleDetailsBySlug,
} from "@/server/repositories/vehicle.repository";

import { getBrandBySlug } from "@/server/repositories/brand.repository";
import { getAllContent } from "@/server/repositories/content.repository";
import LocalizedPrice from "@/components/localized-price";

export const dynamic = "force-dynamic";

/* =========================================================
   HELPERS
========================================================= */

function first(...values) {
  for (const value of values) {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== "—"
    ) {
      return value;
    }
  }

  return null;
}

function numberValue(...values) {
  const value = first(...values);

  if (value === null) return null;

  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : null;
}

function display(value, unit = "") {
  if (
    value === undefined ||
    value === null ||
    value === "" ||
    value === "—"
  ) {
    return "—";
  }

  return unit
    ? `${value} ${unit}`
    : String(value);
}

function formatNumber(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "—";
  }

  return number.toLocaleString("en-IN");
}

// function formatPrice(
//   value,
//   currency = "INR"
// ) {
//   if (
//     value === undefined ||
//     value === null ||
//     value === ""
//   ) {
//     return "—";
//   }

//   const number = Number(value);

//   if (!Number.isFinite(number)) {
//     return String(value);
//   }

//   try {
//     return new Intl.NumberFormat(
//       "en-IN",
//       {
//         style: "currency",
//         currency,
//         maximumFractionDigits: 0,
//       }
//     ).format(number);
//   } catch {
//     return `${currency} ${formatNumber(number)}`;
//   }
// }

/* =========================================================
   OBJECT HELPERS
========================================================= */

function isObject(value) {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

function getValueFromObject(
  object,
  keys
) {
  if (!isObject(object)) {
    return null;
  }

  for (const key of keys) {
    if (
      object[key] !== undefined &&
      object[key] !== null &&
      object[key] !== ""
    ) {
      return object[key];
    }
  }

  return null;
}

/* =========================================================
   DEEP FIND
   Finds common vehicle fields inside JSONB
========================================================= */

function deepFind(
  value,
  keys,
  depth = 0
) {
  if (depth > 8) {
    return null;
  }

  if (
    value === null ||
    value === undefined
  ) {
    return null;
  }

  if (isObject(value)) {
    for (const key of keys) {
      if (
        value[key] !== undefined &&
        value[key] !== null &&
        value[key] !== ""
      ) {
        return value[key];
      }
    }

    for (const child of Object.values(value)) {
      const found = deepFind(
        child,
        keys,
        depth + 1
      );

      if (
        found !== null &&
        found !== undefined &&
        found !== ""
      ) {
        return found;
      }
    }
  }

  if (Array.isArray(value)) {
    for (const child of value) {
      const found = deepFind(
        child,
        keys,
        depth + 1
      );

      if (
        found !== null &&
        found !== undefined &&
        found !== ""
      ) {
        return found;
      }
    }
  }

  return null;
}

/* =========================================================
   VEHICLE DATA SEARCH
========================================================= */

function vehicleValue(
  vehicle,
  keys
) {
  const direct = getValueFromObject(
    vehicle,
    keys
  );

  if (direct !== null) {
    return direct;
  }

  return deepFind(
    vehicle,
    keys
  );
}

/* =========================================================
   IMAGE HELPERS
========================================================= */

function getVehicleImage(vehicle) {
  return first(
    vehicle?.image,
    vehicle?.imageUrl,
    vehicle?.imageURL,

    vehicle?.media?.image,
    vehicle?.media?.imageUrl,

    vehicle?.metadata?.image,
    vehicle?.metadata?.imageUrl,
    vehicle?.metadata?.imageURL,

    vehicle?.payload?.image,
    vehicle?.payload?.imageUrl,
    vehicle?.payload?.imageURL,

    vehicle?.media?.images?.[0],
    vehicle?.images?.[0]
  );
}

function getVehicleImages(vehicle) {
  const images = [];

  if (
    Array.isArray(vehicle?.images)
  ) {
    images.push(
      ...vehicle.images
    );
  }

  if (
    Array.isArray(vehicle?.media)
  ) {
    images.push(
      ...vehicle.media
        .filter(
          (item) =>
            item?.url
        )
        .map(
          (item) =>
            item.url
        )
    );
  }

  if (
    Array.isArray(
      vehicle?.metadata?.images
    )
  ) {
    images.push(
      ...vehicle.metadata.images
    );
  }

  if (
    Array.isArray(
      vehicle?.payload?.images
    )
  ) {
    images.push(
      ...vehicle.payload.images
    );
  }

  const mainImage =
    getVehicleImage(vehicle);

  if (
    mainImage &&
    !images.includes(mainImage)
  ) {
    images.unshift(mainImage);
  }

  return [
    ...new Set(
      images.filter(Boolean)
    ),
  ].slice(0, 12);
}

/* =========================================================
   BRAND
========================================================= */

function getBrandLookupSlug(
  vehicle
) {
  const directSlug = first(
    vehicle?.brand?.slug,
    vehicle?.brandSlug,
    vehicle?.brand?.brandSlug
  );

  if (directSlug) {
    return directSlug;
  }

  const brandId = first(
    vehicle?.brandId,
    vehicle?.brand_id
  );

  const map = {
    tata: "tata-motors",
    "tata-motors": "tata-motors",

    mg: "mg-motor",
    "mg-motor": "mg-motor",

    bmw: "bmw",
    hyundai: "hyundai",
    tesla: "tesla",
  };

  return (
    map[brandId] ||
    brandId ||
    ""
  );
}

/* =========================================================
   SPECIFICATION DATA
========================================================= */

function getSpecifications(
  vehicle
) {
  const records =
    Array.isArray(
      vehicle?.specificationRecords
    )
      ? vehicle.specificationRecords
      : [];

  const merged = {};

  for (const record of records) {
    if (!record) continue;

    for (const [
      key,
      value,
    ] of Object.entries(record)) {
      if (
        key === "id" ||
        key === "vehicleId" ||
        key === "vehicle_id" ||
        key === "type"
      ) {
        continue;
      }

      if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        merged[key] = value;
      }
    }
  }

  return {
    ...merged,
    ...(vehicle?.specifications || {}),
  };
}

/* =========================================================
   PAGE METADATA
========================================================= */

export async function generateMetadata({
  params,
}) {
  const { slug } = await params;

  const vehicle =
    await getVehicleDetailsBySlug(
      slug
    );

  if (!vehicle) {
    return {
      title:
        "Vehicle not found | EVInsights",
    };
  }

  const brandName =
    first(
      vehicle.brandName,
      vehicle.brand?.name,
      vehicle.make
    ) || "";

  return {
    title:
      `${vehicle.name || vehicle.model || "EV"}${
        brandName
          ? ` | ${brandName}`
          : ""
      } | EVInsights`,

    description:
      vehicle.description ||
      vehicle.page?.description ||
      `Detailed specifications, pricing, range, charging and ownership information for ${
        vehicle.name ||
        vehicle.model ||
        "this electric vehicle"
      }.`,
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function VehiclePage({
  params,
}) {
  const { slug } = await params;

  const [
    vehicle,
    content,
  ] = await Promise.all([
    getVehicleDetailsBySlug(slug),
    getAllContent(),
  ]);

  if (!vehicle) {
    return (
      <main className="shell vehicle-not-found">
        <span className="eyebrow">
          EVInsights
        </span>

        <h1>
          Vehicle not found.
        </h1>

        <p>
          We could not find the electric
          vehicle you were looking for.
        </p>

        <Link
          href="/cars"
          className="btn btn-primary"
        >
          Browse all EVs →
        </Link>
      </main>
    );
  }

  /* =======================================================
     BRAND
  ======================================================= */

  const brandLookupSlug =
    getBrandLookupSlug(vehicle);

  let brand = null;

  if (brandLookupSlug) {
    try {
      brand =
        await getBrandBySlug(
          brandLookupSlug
        );
    } catch (error) {
      console.error(
        "Brand lookup failed:",
        error
      );
    }
  }

  const brandName =
    first(
      brand?.name,
      vehicle.brandName,
      vehicle.brand?.name,
      vehicle.make,
      vehicle.metadata?.brandName,
      vehicle.payload?.brandName
    ) ||
    "Unknown Brand";

  /* =======================================================
     BASIC
  ======================================================= */

  const vehicleName =
    first(
      vehicle.name,
      vehicle.model,
      vehicle.title
    ) ||
    "Electric Vehicle";

  const description =
    first(
      vehicle.description,
      vehicle.excerpt,
      vehicle.summary,
      vehicle.page?.description,
      vehicle.payload?.description
    ) ||
    `Explore detailed specifications, pricing, charging performance and real-world information for the ${vehicleName}.`;

  const image =
    getVehicleImage(vehicle);

  const images =
    getVehicleImages(vehicle);

  /* =======================================================
     ALL SPEC DATA
  ======================================================= */

  const specifications =
    getSpecifications(vehicle);

  /* =======================================================
     RANGE
  ======================================================= */

  const range = numberValue(
    vehicleValue(vehicle, [
      "range",
      "rangeKm",
      "wltpRange",
      "araiRange",
      "rangeArai",
      "claimedRange",
      "drivingRange",
    ]),

    vehicle?.range?.km,

    vehicle?.range?.value,

    vehicle?.extracted?.range,

    vehicle?.extracted?.specs?.range,

    specifications.range,
    specifications.rangeKm,
    specifications.wltpRange,
    specifications.araiRange
  );

  /* =======================================================
     BATTERY
  ======================================================= */

  const battery = numberValue(
    vehicleValue(vehicle, [
      "batteryCapacity",
      "batteryKwh",
      "batteryCapacityKwh",
      "battery",
      "usableBatteryCapacity",
    ]),

    vehicle?.battery?.kwh,
    vehicle?.battery?.capacity,

    vehicle?.extracted?.specs?.battery,
    vehicle?.extracted?.specs?.batteryCapacity,

    specifications.batteryCapacity,
    specifications.batteryKwh,
    specifications.batteryCapacityKwh
  );

  /* =======================================================
     POWER
  ======================================================= */

  const power = numberValue(
    vehicleValue(vehicle, [
      "power",
      "powerKw",
      "motorPower",
      "motorPowerKw",
      "maxPower",
      "peakPower",
    ]),

    vehicle?.power?.kw,
    vehicle?.motor?.powerKw,

    vehicle?.extracted?.specs?.power,
    vehicle?.extracted?.specs?.powerKw,

    specifications.power,
    specifications.powerKw,
    specifications.motorPower,
    specifications.motorPowerKw
  );

  /* =======================================================
     TOP SPEED
  ======================================================= */

  const topSpeed = numberValue(
    vehicleValue(vehicle, [
      "topSpeed",
      "topSpeedKmh",
      "maxSpeed",
      "maximumSpeed",
    ]),

    vehicle?.topSpeed?.kmh,

    vehicle?.extracted?.specs?.topSpeed,

    specifications.topSpeed,
    specifications.topSpeedKmh
  );

  /* =======================================================
     ACCELERATION
  ======================================================= */

  const acceleration =
    numberValue(
      vehicleValue(vehicle, [
        "acceleration",
        "zeroTo100",
        "zeroToHundred",
        "0To100",
        "zeroTo60",
      ]),

      vehicle?.acceleration?.seconds,

      vehicle?.extracted?.specs
        ?.acceleration,

      specifications.acceleration,
      specifications.zeroTo100,
      specifications.zeroToHundred
    );

  /* =======================================================
     TORQUE
  ======================================================= */

  const torque = numberValue(
    vehicleValue(vehicle, [
      "torque",
      "torqueNm",
      "maxTorque",
    ]),

    vehicle?.torque?.nm,

    vehicle?.extracted?.specs?.torque,

    specifications.torque,
    specifications.torqueNm
  );

  /* =======================================================
     SEATS
  ======================================================= */

  const seats = numberValue(
    vehicleValue(vehicle, [
      "seats",
      "seatingCapacity",
      "seatCount",
    ]),

    vehicle?.extracted?.specs
      ?.seatingCapacity,

    specifications.seats,
    specifications.seatingCapacity
  );

  /* =======================================================
     DRIVE TYPE
  ======================================================= */

  const driveType = first(
    vehicleValue(vehicle, [
      "driveType",
      "drivetrain",
      "drive",
      "transmission",
    ]),

    vehicle?.extracted?.specs
      ?.driveType,

    specifications.driveType,
    specifications.drivetrain
  );

  /* =======================================================
     CHARGING
  ======================================================= */

  const charging =
    vehicle?.charging || {};

  const chargingRecords =
    Array.isArray(
      vehicle?.chargingRecords
    )
      ? vehicle.chargingRecords
      : [];

  const acCharging =
    numberValue(
      vehicleValue(charging, [
        "acPowerKw",
        "acChargingPower",
        "acChargingKw",
        "acPower",
      ]),

      vehicleValue(vehicle, [
        "acChargingPower",
        "acChargingKw",
      ]),

      vehicle?.extracted?.charging
        ?.acPowerKw,

      ...chargingRecords.map(
        (item) =>
          item?.acPowerKw
      )
    );

  const dcCharging =
    numberValue(
      vehicleValue(charging, [
        "dcPowerKw",
        "dcChargingPower",
        "dcChargingKw",
        "dcFastChargingPower",
        "dcFastChargingKw",
        "dcPower",
      ]),

      vehicleValue(vehicle, [
        "dcChargingPower",
        "dcChargingKw",
      ]),

      vehicle?.extracted?.charging
        ?.dcPowerKw,

      ...chargingRecords.map(
        (item) =>
          item?.dcPowerKw
      )
    );

  const chargingTime = first(
    vehicleValue(charging, [
      "chargingTime",
      "dcChargingTime",
      "time",
      "timeMinutes",
      "chargingTimeMinutes",
    ]),

    vehicleValue(vehicle, [
      "chargingTime",
      "dcChargingTime",
    ]),

    vehicle?.extracted?.charging
      ?.timeMinutes,

    ...chargingRecords.map(
      (item) =>
        item?.chargingTime
    )
  );

  const chargingPort = first(
    vehicleValue(charging, [
      "connector",
      "chargingPort",
      "port",
      "connectorType",
      "acConnector",
      "dcConnector",
    ]),

    vehicleValue(vehicle, [
      "chargingPort",
      "connector",
    ]),

    vehicle?.extracted?.charging
      ?.connector,

    ...chargingRecords.map(
      (item) =>
        item?.connector
    )
  );

  /* =======================================================
     PRICE
  ======================================================= */

  const pricing =
    Array.isArray(vehicle?.pricing)
      ? vehicle.pricing
      : [];

  const price = first(
    vehicle.price,
    vehicle.startingPrice,
    vehicle.priceFrom,

    vehicle.pricing?.startingPrice,
    vehicle.pricing?.from,

    vehicle.extracted?.price?.amount,
    vehicle.extracted?.price,

    pricing[0]?.amount
  );

  const currency =
    first(
      vehicle.currency,
      vehicle.priceCurrency,
      vehicle.pricing?.currency,

      vehicle.extracted?.price
        ?.currency,

      pricing[0]?.currencyCode
    ) || "INR";

  /* =======================================================
     DIMENSIONS
  ======================================================= */

  const length = numberValue(
    vehicleValue(vehicle, [
      "length",
      "lengthMm",
    ]),

    vehicle?.dimensions?.length,
    vehicle?.dimensions?.lengthMm,

    specifications.length,
    specifications.lengthMm
  );

  const width = numberValue(
    vehicleValue(vehicle, [
      "width",
      "widthMm",
    ]),

    vehicle?.dimensions?.width,
    vehicle?.dimensions?.widthMm,

    specifications.width,
    specifications.widthMm
  );

  const height = numberValue(
    vehicleValue(vehicle, [
      "height",
      "heightMm",
    ]),

    vehicle?.dimensions?.height,
    vehicle?.dimensions?.heightMm,

    specifications.height,
    specifications.heightMm
  );

  const wheelbase = numberValue(
    vehicleValue(vehicle, [
      "wheelbase",
      "wheelbaseMm",
    ]),

    vehicle?.dimensions?.wheelbase,
    vehicle?.dimensions?.wheelbaseMm,

    specifications.wheelbase,
    specifications.wheelbaseMm
  );

  const bootSpace = numberValue(
    vehicleValue(vehicle, [
      "bootSpace",
      "bootCapacity",
      "bootCapacityLitres",
      "bootVolume",
    ]),

    vehicle?.dimensions?.bootSpace,
    vehicle?.dimensions?.bootCapacity,

    specifications.bootSpace,
    specifications.bootCapacity
  );

  /* =======================================================
     OTHER DATA
  ======================================================= */

  const efficiency = first(
    vehicleValue(vehicle, [
      "efficiency",
      "efficiencyKwh",
      "efficiencyKwhPer100Km",
      "energyConsumption",
    ]),

    specifications.efficiency
  );

  const groundClearance =
    first(
      vehicleValue(vehicle, [
        "groundClearance",
        "groundClearanceMm",
      ]),

      vehicle?.dimensions
        ?.groundClearance,

      specifications.groundClearance,
      specifications.groundClearanceMm
    );

  const bodyType = first(
    vehicleValue(vehicle, [
      "bodyType",
      "body",
      "vehicleType",
    ]),

    vehicle?.classification
      ?.bodyType,

    specifications.bodyType
  );

  /* =======================================================
     VARIANTS
  ======================================================= */

  const variants =
    Array.isArray(vehicle?.variants)
      ? vehicle.variants
      : [];

  /* =======================================================
     HIGHLIGHTS
  ======================================================= */

  const highlights =
    Array.isArray(
      vehicle?.highlights
    )
      ? vehicle.highlights
      : Array.isArray(
          vehicle?.features
        )
      ? vehicle.features.slice(
          0,
          8
        )
      : [
          range
            ? `${range} km claimed driving range`
            : null,

          battery
            ? `${battery} kWh battery capacity`
            : null,

          power
            ? `${power} kW motor power`
            : null,

          driveType
            ? `${driveType} drivetrain`
            : null,

          seats
            ? `${seats}-seat configuration`
            : null,
        ].filter(Boolean);

  /* =======================================================
     SAFETY
  ======================================================= */

  const safety =
    vehicle?.safety || {};

  const safetyRating =
    first(
      vehicle.safetyRating,
      vehicle.ncapRating,
      vehicle.euroNcapRating,

      safety.rating,
      safety.stars,

      vehicle?.extracted?.safety
        ?.rating,

      specifications.safetyRating,
      specifications.ncapRating
    );

  const safetyScore =
    first(
      vehicle.safetyScore,
      vehicle.ncapScore,

      safety.score,

      vehicle?.extracted?.safety
        ?.score,

      specifications.safetyScore
    );

  /* =======================================================
     REVIEWS
  ======================================================= */

  const reviews =
    Array.isArray(content)
      ? content
          .filter(
            (item) =>
              item?.type ===
                "review" &&
              (
                item?.vehicleIds?.includes(
                  vehicle.id
                ) ||
                item?.vehicleId ===
                  vehicle.id
              )
          )
          .slice(0, 3)
      : [];

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="vehicle-detail-page">
      <div className="shell">

        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <nav className="vehicle-breadcrumb">
          <Link href="/">
            Home
          </Link>

          <span>›</span>

          <Link href="/cars">
            Cars
          </Link>

          <span>›</span>

          <span>
            {brandName}
          </span>

          <span>›</span>

          <strong>
            {vehicleName}
          </strong>
        </nav>

        {/* =================================================
            HERO
        ================================================= */}

        <section className="vehicle-hero">

          <div className="vehicle-gallery">

            <div className="vehicle-gallery-main">

              {image ? (
                <img
                  src={image}
                  alt={vehicleName}
                  className="vehicle-main-image"
                />
              ) : (
                <div className="vehicle-image-placeholder">
                  <span>
                    EV
                  </span>
                </div>
              )}

              <span className="vehicle-gallery-badge">
                EV
              </span>

              <button
                className="gallery-arrow gallery-arrow-left"
                aria-label="Previous image"
              >
                ‹
              </button>

              <button
                className="gallery-arrow gallery-arrow-right"
                aria-label="Next image"
              >
                ›
              </button>

              {images.length > 0 && (
                <span className="gallery-counter">
                  1 / {images.length}
                </span>
              )}

            </div>

            {images.length > 1 && (
              <div className="vehicle-thumbnails">

                {images.map(
                  (src, index) => (
                    <div
                      className={`vehicle-thumbnail ${
                        index === 0
                          ? "active"
                          : ""
                      }`}
                      key={`${src}-${index}`}
                    >
                      <img
                        src={src}
                        alt={`${vehicleName} ${
                          index + 1
                        }`}
                      />
                    </div>
                  )
                )}

              </div>
            )}

          </div>

          {/* =================================================
              HERO INFO
          ================================================= */}

          <div className="vehicle-hero-info">

            {/* BRAND NAME */}
            <div className="vehicle-brand-line">
              {brandName}
            </div>

            <div className="vehicle-title-row">

              <div>

                <h1>
                  {vehicleName}
                </h1>

                <span className="vehicle-type">
                  Electric Vehicle
                </span>

              </div>

              <div className="vehicle-brand-mark">
                {brandName.charAt(0)}
              </div>

            </div>

            <div className="vehicle-rating">

              <strong>★</strong>
              <strong>★</strong>
              <strong>★</strong>
              <strong>★</strong>
              <strong>★</strong>

              <span>
                {vehicle.reviewCount ||
                  reviews.length ||
                  "—"}{" "}
                reviews
              </span>

            </div>

            <p className="vehicle-description">
              {description}
            </p>

            <div className="vehicle-hero-stats">

              <div className="hero-price-card">

                <span>
                  Starting from
                </span>

                {/* <strong>
                  {formatPrice(
                    price,
                    currency
                  )}
                </strong> */}

                <LocalizedPrice
  amount={price}
  currency={currency}
/>

                <small>
                  Ex-showroom / listed price
                </small>

              </div>

              <div className="hero-stat-card">

                <span>
                  Max Range
                </span>

                <strong>
                  {display(
                    range,
                    "km"
                  )}
                </strong>

                <small>
                  Claimed range
                </small>

              </div>

              <div className="hero-stat-card">

                <span>
                  0–100 km/h
                </span>

                <strong>
                  {display(
                    acceleration,
                    "s"
                  )}
                </strong>

                <small>
                  Acceleration
                </small>

              </div>

            </div>

            <div className="vehicle-actions">

              <Link
                href={`/compare?vehicle=${vehicle.id}`}
                className="btn btn-secondary"
              >
                Compare
              </Link>

              <Link
                href="/cars"
                className="btn btn-primary"
              >
                Check availability
              </Link>

              <button
                className="btn btn-secondary"
              >
                ♡ Save
              </button>

            </div>

          </div>

        </section>

        {/* =================================================
            TABS
        ================================================= */}

        <nav className="vehicle-tabs">

          <a
            href="#overview"
            className="active"
          >
            Overview
          </a>

          <a href="#variants">
            Variants
          </a>

          <a href="#specifications">
            Specs
          </a>

          <a href="#charging">
            Charging
          </a>

          <a href="#features">
            Features
          </a>

          <a href="#safety">
            Safety
          </a>

          <a href="#reviews">
            Reviews
          </a>

          <a href="#gallery">
            Gallery
          </a>

        </nav>

        {/* =================================================
            QUICK SPECS
        ================================================= */}

        <section
          id="overview"
          className="vehicle-section"
        >

          <div className="quick-spec-grid">

            <div className="quick-spec">
              <span>
                Range
              </span>

              <strong>
                {display(
                  range,
                  "km"
                )}
              </strong>
            </div>

            <div className="quick-spec">
              <span>
                Battery
              </span>

              <strong>
                {display(
                  battery,
                  "kWh"
                )}
              </strong>
            </div>

            <div className="quick-spec">
              <span>
                Power
              </span>

              <strong>
                {display(
                  power,
                  "kW"
                )}
              </strong>
            </div>

            <div className="quick-spec">
              <span>
                Top Speed
              </span>

              <strong>
                {display(
                  topSpeed,
                  "km/h"
                )}
              </strong>
            </div>

            <div className="quick-spec">
              <span>
                Seating
              </span>

              <strong>
                {seats
                  ? `${seats} Seats`
                  : "—"}
              </strong>
            </div>

            <div className="quick-spec">
              <span>
                Drive Type
              </span>

              <strong>
                {driveType || "—"}
              </strong>
            </div>

          </div>

          {/* =================================================
              INFO GRID
          ================================================= */}

          <div className="vehicle-info-grid">

            {/* HIGHLIGHTS */}

            <article className="vehicle-info-card">

              <div className="card-heading">
                <span>
                  01
                </span>

                <h2>
                  Key Highlights
                </h2>
              </div>

              {highlights.length > 0 ? (
                <ul className="highlight-list">

                  {highlights.map(
                    (item, index) => (
                      <li
                        key={index}
                      >
                        <span>
                          ✓
                        </span>

                        {typeof item ===
                        "string"
                          ? item
                          : item?.name ||
                            item?.title ||
                            "Feature"}
                      </li>
                    )
                  )}

                </ul>
              ) : (
                <p className="empty-data">
                  No highlight data available.
                </p>
              )}

            </article>

            {/* VARIANTS */}

            <article
              id="variants"
              className="vehicle-info-card"
            >

              <div className="card-heading">
                <span>
                  02
                </span>

                <h2>
                  Variants & Pricing
                </h2>
              </div>

              {variants.length > 0 ? (
                <div className="variant-list">

                  {variants.map(
                    (
                      variant,
                      index
                    ) => {

                      const variantName =
                        first(
                          variant?.name,
                          variant?.model,
                          variant?.title
                        ) ||
                        `Variant ${
                          index + 1
                        }`;

                      const variantPrice =
                        first(
                          variant?.price,
                          variant?.startingPrice,
                          variant?.pricing?.price,
                          variant?.pricing?.[0]
                            ?.amount
                        );

                      const variantCurrency =
                        first(
                          variant?.currency,
                          variant?.pricing?.[0]
                            ?.currencyCode,
                          currency
                        ) ||
                        "INR";

                      const variantRange =
                        first(
                          variant?.range,
                          variant?.rangeKm,
                          variant?.specifications
                            ?.range,
                          variant?.specs?.range
                        );

                      return (
                        <div
                          className="variant-row"
                          key={
                            variant?.id ||
                            index
                          }
                        >

                          <strong>
                            {variantName}
                          </strong>

                          {/* <span>
                            {formatPrice(
                              variantPrice,
                              variantCurrency
                            )}
                          </span> */}

                          <span>
  <LocalizedPrice
    amount={variantPrice}
    currency={variantCurrency}
  />
</span>

                          <small>
                            {display(
                              variantRange,
                              "km"
                            )}
                          </small>

                        </div>
                      );
                    }
                  )}

                </div>
              ) : (
                <div className="empty-data">
                  Variant information unavailable.
                </div>
              )}

            </article>

            {/* CHARGING */}

            <article
              id="charging"
              className="vehicle-info-card"
            >

              <div className="card-heading">
                <span>
                  03
                </span>

                <h2>
                  Charging
                </h2>
              </div>

              <div className="data-list">

                <div>
                  <span>
                    AC Charging
                  </span>

                  <strong>
                    {display(
                      acCharging,
                      "kW"
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    DC Fast Charging
                  </span>

                  <strong>
                    {display(
                      dcCharging,
                      "kW"
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Charging Time
                  </span>

                  <strong>
                    {typeof chargingTime ===
                    "number"
                      ? `${chargingTime} min`
                      : chargingTime ||
                        "—"}
                  </strong>
                </div>

                <div>
                  <span>
                    Charging Port
                  </span>

                  <strong>
                    {chargingPort ||
                      "—"}
                  </strong>
                </div>

              </div>

              <Link
                href="/calculators/charging-time"
                className="card-link"
              >
                Calculate charging time →
              </Link>

            </article>

            {/* SPECIFICATIONS */}

            <article
              id="specifications"
              className="vehicle-info-card"
            >

              <div className="card-heading">
                <span>
                  04
                </span>

                <h2>
                  Specifications
                </h2>
              </div>

              <div className="data-list">

                <div>
                  <span>
                    Battery Capacity
                  </span>

                  <strong>
                    {display(
                      battery,
                      "kWh"
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Motor Power
                  </span>

                  <strong>
                    {display(
                      power,
                      "kW"
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Torque
                  </span>

                  <strong>
                    {display(
                      torque,
                      "Nm"
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Drivetrain
                  </span>

                  <strong>
                    {driveType ||
                      "—"}
                  </strong>
                </div>

                <div>
                  <span>
                    Top Speed
                  </span>

                  <strong>
                    {display(
                      topSpeed,
                      "km/h"
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    0–100 km/h
                  </span>

                  <strong>
                    {display(
                      acceleration,
                      "s"
                    )}
                  </strong>
                </div>

              </div>

            </article>

            {/* DIMENSIONS */}

            <article className="vehicle-info-card">

              <div className="card-heading">
                <span>
                  05
                </span>

                <h2>
                  Dimensions
                </h2>
              </div>

              <div className="dimensions-visual">

                {image ? (
                  <img
                    src={image}
                    alt={`${vehicleName} dimensions`}
                  />
                ) : (
                  <div className="dimension-placeholder">
                    {vehicleName}
                  </div>
                )}

              </div>

              <div className="dimension-data">

                <div>
                  <span>
                    Length
                  </span>

                  <strong>
                    {display(
                      length,
                      "mm"
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Width
                  </span>

                  <strong>
                    {display(
                      width,
                      "mm"
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Height
                  </span>

                  <strong>
                    {display(
                      height,
                      "mm"
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Wheelbase
                  </span>

                  <strong>
                    {display(
                      wheelbase,
                      "mm"
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Boot Space
                  </span>

                  <strong>
                    {display(
                      bootSpace,
                      "L"
                    )}
                  </strong>
                </div>

              </div>

            </article>

            {/* SAFETY */}

            <article
              id="safety"
              className="vehicle-info-card"
            >

              <div className="card-heading">
                <span>
                  06
                </span>

                <h2>
                  Safety
                </h2>
              </div>

              <div className="safety-rating">

                <span>
                  Safety Rating
                </span>

                <strong>
                  {safetyRating ||
                    "—"}
                </strong>

              </div>

              {safetyScore !==
                null &&
                safetyScore !==
                  undefined && (
                  <div className="safety-score">

                    <span>
                      Safety Score
                    </span>

                    <strong>
                      {safetyScore}
                    </strong>

                  </div>
                )}

              <div className="star-rating">
                ★★★★★
              </div>

              <Link
                href={`/cars/${slug}/safety`}
                className="card-link"
              >
                View safety details →
              </Link>

            </article>

          </div>

        </section>

        {/* =================================================
            FEATURES
        ================================================= */}

        <section
          id="features"
          className="vehicle-feature-section"
        >

          <div className="section-heading">

            <span className="eyebrow">
              Vehicle intelligence
            </span>

            <h2>
              Everything you need to know.
            </h2>

          </div>

          <div className="feature-data-grid">

            <div>
              <span>
                Efficiency
              </span>

              <strong>
                {display(
                  efficiency,
                  "kWh/100 km"
                )}
              </strong>
            </div>

            <div>
              <span>
                Ground Clearance
              </span>

              <strong>
                {display(
                  groundClearance,
                  "mm"
                )}
              </strong>
            </div>

            <div>
              <span>
                Body Type
              </span>

              <strong>
                {bodyType || "—"}
              </strong>
            </div>

            <div>
              <span>
                Seats
              </span>

              <strong>
                {seats || "—"}
              </strong>
            </div>

          </div>

        </section>

        {/* =================================================
            REVIEWS
        ================================================= */}

        <section
          id="reviews"
          className="vehicle-reviews-section"
        >

          <div className="section-heading">

            <span className="eyebrow">
              EVInsights reviews
            </span>

            <h2>
              What we know about the{" "}
              {vehicleName}.
            </h2>

          </div>

          {reviews.length > 0 ? (
            <div className="review-grid">

              {reviews.map(
                (review) => (
                  <Link
                    href={`/reviews/${review.slug}`}
                    className="review-card"
                    key={review.id}
                  >

                    <span className="tag">
                      {review.category ||
                        "Review"}
                    </span>

                    <h3>
                      {review.title}
                    </h3>

                    <p>
                      {review.excerpt}
                    </p>

                    <span>
                      Read review →
                    </span>

                  </Link>
                )
              )}

            </div>
          ) : (
            <div className="empty-panel">
              No reviews are currently
              available for this vehicle.
            </div>
          )}

        </section>

        {/* =================================================
            GALLERY
        ================================================= */}

        <section
          id="gallery"
          className="vehicle-gallery-section"
        >

          <div className="section-heading">

            <span className="eyebrow">
              Vehicle gallery
            </span>

            <h2>
              See the {vehicleName}.
            </h2>

          </div>

          {images.length > 0 ? (
            <div className="vehicle-gallery-grid">

              {images.map(
                (src, index) => (
                  <div
                    className="gallery-image-card"
                    key={`${src}-${index}`}
                  >

                    <img
                      src={src}
                      alt={`${vehicleName} gallery ${
                        index + 1
                      }`}
                    />

                  </div>
                )
              )}

            </div>
          ) : (
            <div className="empty-panel">
              No vehicle images available.
            </div>
          )}

        </section>

        {/* =================================================
            MARKET
        ================================================= */}

        <section className="market-availability">

          <div>

            <span className="eyebrow">
              Market availability
            </span>

            <strong>
              Explore availability and pricing by market.
            </strong>

          </div>

          <div className="market-list">

            <span>
              🇮🇳 India
            </span>

            <span>
              🇬🇧 UK
            </span>

            <span>
              🇦🇺 Australia
            </span>

            <span>
              🇩🇪 Germany
            </span>

            <span>
              🇫🇷 France
            </span>

            <span>
              + More
            </span>

          </div>

        </section>

      </div>
    </main>
  );
}