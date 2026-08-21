// "use client";

// import Link from "next/link";

// function getVehicleName(item) {
//   return (
//     item?.vehicle?.name ||
//     item?.vehicle?.identity?.name ||
//     item?.vehicle?.title ||
//     "Electric Vehicle"
//   );
// }

// function getVehicleSlug(item) {
//   return (
//     item?.vehicle?.slug ||
//     item?.vehicle?.identity?.slug ||
//     item?.vehicle?.id ||
//     ""
//   );
// }

// function getValue(value, fallback = "—") {
//   if (value === null || value === undefined || value === "") {
//     return fallback;
//   }

//   if (typeof value === "object") {
//     if (value.amount !== undefined) {
//       return `${value.currency || ""} ${Number(
//         value.amount
//       ).toLocaleString()}`.trim();
//     }

//     return fallback;
//   }

//   return String(value);
// }

// function getRange(item) {
//   const vehicle = item?.vehicle;

//   return (
//     vehicle?.rangeKm ??
//     vehicle?.specifications?.rangeKm ??
//     vehicle?.specifications?.range ??
//     item?.specifications?.rangeKm ??
//     item?.specifications?.range ??
//     null
//   );
// }

// function getBattery(item) {
//   const vehicle = item?.vehicle;

//   return (
//     vehicle?.batteryKwh ??
//     vehicle?.specifications?.batteryKwh ??
//     vehicle?.specifications?.battery ??
//     item?.specifications?.batteryKwh ??
//     item?.specifications?.battery ??
//     null
//   );
// }

// function getChargingPower(item) {
//   const charging = item?.charging;

//   if (Array.isArray(charging)) {
//     const values = charging
//       .map(
//         (entry) =>
//           entry?.maxPowerKw ??
//           entry?.powerKw ??
//           entry?.chargingPowerKw
//       )
//       .filter((value) => value !== null && value !== undefined);

//     return values.length ? Math.max(...values) : null;
//   }

//   return (
//     charging?.maxPowerKw ??
//     charging?.powerKw ??
//     charging?.chargingPowerKw ??
//     null
//   );
// }

// function getVariantCount(item) {
//   return Array.isArray(item?.variants)
//     ? item.variants.length
//     : 0;
// }

// export default function CompareTable({
//   selected = [],
//   vehicles = [],
// }) {
//   if (!selected.length) {
//     return (
//       <section className="compare-empty">
//         <div className="card compare-empty-card">
//           <span className="eyebrow">Comparison studio</span>

//           <h2>No EVs selected yet.</h2>

//           <p>
//             Choose vehicles from the EV catalog and add them
//             to comparison. You can compare up to four vehicles.
//           </p>

//           <Link
//             href="/cars"
//             className="btn btn-primary"
//           >
//             Browse electric cars →
//           </Link>
//         </div>
//       </section>
//     );
//   }

//   const rows = [
//     {
//       label: "Range",
//       getValue: (item) => {
//         const value = getRange(item);
//         return value ? `${value} km` : "—";
//       },
//     },
//     {
//       label: "Battery",
//       getValue: (item) => {
//         const value = getBattery(item);
//         return value ? `${value} kWh` : "—";
//       },
//     },
//     {
//       label: "Charging power",
//       getValue: (item) => {
//         const value = getChargingPower(item);
//         return value ? `${value} kW` : "—";
//       },
//     },
//     {
//       label: "Variants",
//       getValue: (item) => getVariantCount(item),
//     },
//     {
//       label: "Pricing",
//       getValue: (item) => {
//         const pricing = item?.pricing;

//         if (!Array.isArray(pricing) || !pricing.length) {
//           return "—";
//         }

//         const first = pricing[0];

//         return getValue(
//           first?.price ??
//             first?.amount ??
//             first?.msrp ??
//             first
//         );
//       },
//     },
//   ];

//   return (
//     <section className="compare-section">
//       <div className="compare-table-wrapper">
//         <div className="compare-table">
//           <div className="compare-row compare-header">
//             <div className="compare-label">
//               Specification
//             </div>

//             {selected.map((item) => {
//               const name = getVehicleName(item);
//               const slug = getVehicleSlug(item);

//               return (
//                 <div
//                   className="compare-vehicle"
//                   key={item?.vehicle?.id || slug || name}
//                 >
//                   <span className="compare-vehicle-brand">
//                     EVINSIGHTS
//                   </span>

//                   <h3>{name}</h3>

//                   {slug && (
//                     <Link
//                       href={`/vehicles/${slug}`}
//                       className="compare-view-link"
//                     >
//                       View vehicle →
//                     </Link>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {rows.map((row) => (
//             <div
//               className="compare-row"
//               key={row.label}
//             >
//               <div className="compare-label">
//                 {row.label}
//               </div>

//               {selected.map((item) => (
//                 <div
//                   className="compare-value"
//                   key={`${item?.vehicle?.id}-${row.label}`}
//                 >
//                   {getValue(row.getValue(item))}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>

//       {vehicles.length > 0 && (
//         <p className="compare-note">
//           Showing {selected.length} of {Math.min(
//             vehicles.length,
//             4
//           )} available comparison slots.
//         </p>
//       )}
//     </section>
//   );
// }



"use client";

import Link from "next/link";

function getVehicle(item) {
  return item?.vehicle || item || {};
}

function getVehicleName(item) {
  const vehicle = getVehicle(item);

  return (
    vehicle?.identity?.name ||
    vehicle?.name ||
    vehicle?.title ||
    "Electric Vehicle"
  );
}

function getVehicleSlug(item) {
  const vehicle = getVehicle(item);

  return (
    vehicle?.identity?.slug ||
    vehicle?.slug ||
    vehicle?.id ||
    ""
  );
}

function getBrand(item) {
  const vehicle = getVehicle(item);

  return (
    item?.brand?.name ||
    vehicle?.brand?.name ||
    vehicle?.brandName ||
    vehicle?.identity?.brandName ||
    item?.brandName ||
    "—"
  );
}

function getValue(value, fallback = "—") {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return fallback;
  }

  if (typeof value === "object") {
    if (value.amount !== undefined) {
      return `${value.currency || ""} ${Number(
        value.amount
      ).toLocaleString()}`.trim();
    }

    return fallback;
  }

  return String(value);
}

function getSpecs(item) {
  const vehicle = getVehicle(item);

  return (
    vehicle?.extracted?.specs ||
    vehicle?.specifications ||
    item?.extracted?.specs ||
    item?.specifications ||
    {}
  );
}

function getPrice(item) {
  const vehicle = getVehicle(item);

  const price =
    vehicle?.extracted?.price ??
    vehicle?.pricing?.price ??
    vehicle?.price ??
    item?.pricing?.price ??
    item?.price ??
    null;

  return getValue(price);
}

function getRange(item) {
  const specs = getSpecs(item);

  const value =
    specs?.range ??
    specs?.rangeKm ??
    getVehicle(item)?.rangeKm ??
    getVehicle(item)?.range ??
    null;

  return value != null ? `${value} km` : "—";
}

function getBattery(item) {
  const specs = getSpecs(item);

  const value =
    specs?.battery ??
    specs?.batteryKwh ??
    getVehicle(item)?.batteryKwh ??
    getVehicle(item)?.battery ??
    null;

  return value != null ? `${value} kWh` : "—";
}

function getPower(item) {
  const specs = getSpecs(item);

  const value =
    specs?.power ??
    specs?.powerHp ??
    specs?.horsepower ??
    null;

  return value != null ? `${value} hp` : "—";
}

function getTorque(item) {
  const specs = getSpecs(item);

  const value =
    specs?.torque ??
    specs?.torqueNm ??
    null;

  return value != null ? `${value} Nm` : "—";
}

function getTopSpeed(item) {
  const specs = getSpecs(item);

  const value =
    specs?.topSpeed ??
    specs?.topSpeedKmh ??
    null;

  return value != null ? `${value} km/h` : "—";
}

function getAcceleration(item) {
  const specs = getSpecs(item);

  const value =
    specs?.acceleration ??
    specs?.acceleration0To100 ??
    specs?.zeroToHundred ??
    null;

  return value != null ? `${value} sec` : "—";
}

function getChargingPower(item) {
  const vehicle = getVehicle(item);

  const charging =
    item?.charging ??
    vehicle?.charging ??
    vehicle?.extracted?.charging ??
    null;

  if (Array.isArray(charging)) {
    const values = charging
      .map(
        (entry) =>
          entry?.maxPowerKw ??
          entry?.powerKw ??
          entry?.chargingPowerKw ??
          entry?.maxChargingPower ??
          null
      )
      .filter(
        (value) =>
          value !== null &&
          value !== undefined
      );

    return values.length
      ? `${Math.max(...values)} kW`
      : "—";
  }

  const value =
    charging?.maxPowerKw ??
    charging?.powerKw ??
    charging?.chargingPowerKw ??
    charging?.maxChargingPower ??
    null;

  return value != null ? `${value} kW` : "—";
}

function getChargingType(item) {
  const charging = item?.charging;

  if (Array.isArray(charging)) {
    const types = charging
      .map(
        (entry) =>
          entry?.type ||
          entry?.chargingType ||
          entry?.mode
      )
      .filter(Boolean);

    return types.length
      ? [...new Set(types)].join(", ")
      : "—";
  }

  return (
    charging?.type ||
    charging?.chargingType ||
    charging?.mode ||
    "—"
  );
}

function getConnector(item) {
  const charging = item?.charging;

  if (Array.isArray(charging)) {
    const connectors = charging
      .map(
        (entry) =>
          entry?.connector ||
          entry?.connectorType ||
          entry?.standard
      )
      .filter(Boolean);

    return connectors.length
      ? [...new Set(connectors)].join(", ")
      : "—";
  }

  return (
    charging?.connector ||
    charging?.connectorType ||
    charging?.standard ||
    "—"
  );
}

function getChargingTime(item) {
  const charging = item?.charging;

  if (Array.isArray(charging)) {
    const times = charging
      .map(
        (entry) =>
          entry?.chargingTime ||
          entry?.time ||
          entry?.dcFastChargingTime
      )
      .filter(Boolean);

    return times.length
      ? times.join(", ")
      : "—";
  }

  return (
    charging?.chargingTime ||
    charging?.time ||
    charging?.dcFastChargingTime ||
    "—"
  );
}

function getBodyType(item) {
  const vehicle = getVehicle(item);

  return (
    vehicle?.classification?.bodyType ||
    vehicle?.bodyType ||
    "—"
  );
}

function getVehicleType(item) {
  const vehicle = getVehicle(item);

  return (
    vehicle?.classification?.vehicleType ||
    vehicle?.vehicleType ||
    "—"
  );
}

function getSegment(item) {
  const vehicle = getVehicle(item);

  return (
    vehicle?.classification?.segment ||
    vehicle?.segment ||
    "—"
  );
}

function getRating(item) {
  const vehicle = getVehicle(item);

  const value =
    vehicle?.rating ??
    item?.rating ??
    null;

  return value != null ? `${value}/5` : "—";
}

function getReviewCount(item) {
  const vehicle = getVehicle(item);

  const value =
    vehicle?.reviewCount ??
    item?.reviewCount ??
    null;

  return value != null ? value : "—";
}

function getVariantCount(item) {
  const vehicle = getVehicle(item);

  if (Array.isArray(item?.variants)) {
    return item.variants.length;
  }

  if (Array.isArray(vehicle?.variantIds)) {
    return vehicle.variantIds.length;
  }

  return 0;
}

function getMarketCount(item) {
  const vehicle = getVehicle(item);

  if (Array.isArray(vehicle?.markets)) {
    return vehicle.markets.length;
  }

  return "—";
}

function getLifecycle(item) {
  const vehicle = getVehicle(item);

  return (
    vehicle?.status?.lifecycle ||
    vehicle?.lifecycle ||
    "—"
  );
}

function getVerification(item) {
  const vehicle = getVehicle(item);

  return (
    vehicle?.verification?.status ||
    "—"
  );
}

function getLastVerified(item) {
  const vehicle = getVehicle(item);

  const date =
    vehicle?.verification?.lastVerifiedAt ||
    null;

  if (!date) return "—";

  try {
    return new Date(date).toLocaleDateString();
  } catch {
    return date;
  }
}

const comparisonSections = [
  {
    title: "Overview",
    rows: [
      {
        label: "Brand",
        getValue: getBrand,
      },
      {
        label: "Body type",
        getValue: getBodyType,
      },
      {
        label: "Vehicle type",
        getValue: getVehicleType,
      },
      {
        label: "Segment",
        getValue: getSegment,
      },
      {
        label: "Rating",
        getValue: getRating,
      },
      {
        label: "Reviews",
        getValue: getReviewCount,
      },
    ],
  },

  {
    title: "Performance",
    rows: [
      {
        label: "Range",
        getValue: getRange,
      },
      {
        label: "Battery",
        getValue: getBattery,
      },
      {
        label: "Power",
        getValue: getPower,
      },
      {
        label: "Torque",
        getValue: getTorque,
      },
      {
        label: "Top speed",
        getValue: getTopSpeed,
      },
      {
        label: "Acceleration",
        getValue: getAcceleration,
      },
    ],
  },

  {
    title: "Charging",
    rows: [
      {
        label: "Charging power",
        getValue: getChargingPower,
      },
      {
        label: "Charging type",
        getValue: getChargingType,
      },
      {
        label: "Connector",
        getValue: getConnector,
      },
      {
        label: "Charging time",
        getValue: getChargingTime,
      },
    ],
  },

  {
    title: "Pricing & Variants",
    rows: [
      {
        label: "Price",
        getValue: getPrice,
      },
      {
        label: "Variants",
        getValue: getVariantCount,
      },
    ],
  },

  {
    title: "Availability",
    rows: [
      {
        label: "Markets",
        getValue: (item) => {
          const count = getMarketCount(item);

          return count === "—"
            ? "—"
            : `${count} markets`;
        },
      },
      {
        label: "Lifecycle",
        getValue: getLifecycle,
      },
      {
        label: "Verification",
        getValue: getVerification,
      },
      {
        label: "Last verified",
        getValue: getLastVerified,
      },
    ],
  },
];

export default function CompareTable({
  selected = [],
  vehicles = [],
}) {
  if (!selected.length) {
    return (
      <section className="compare-empty">
        <div className="card compare-empty-card">
          <span className="eyebrow">
            Comparison studio
          </span>

          <h2>No EVs selected yet.</h2>

          <p>
            Choose vehicles from the EV catalog and add
            them to comparison. You can compare up to
            four vehicles at once.
          </p>

          <Link
            href="/cars"
            className="btn btn-primary"
          >
            Browse electric cars →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="compare-section">

      <div className="compare-table-wrapper">

        <div className="compare-table">

          {/* Header */}

          <div className="compare-row compare-header">

            <div className="compare-label">
              Specification
            </div>

            {selected.map((item, index) => {
              const name = getVehicleName(item);
              const slug = getVehicleSlug(item);

              return (
                <div
                  className="compare-vehicle"
                  key={
                    getVehicle(item)?.id ||
                    slug ||
                    `${name}-${index}`
                  }
                >
                  <span className="compare-vehicle-brand">
                    {getBrand(item)}
                  </span>

                  <h3>{name}</h3>

                  {slug && (
                    <Link
                      href={`/vehicles/${slug}`}
                      className="compare-view-link"
                    >
                      View vehicle →
                    </Link>
                  )}
                </div>
              );
            })}

          </div>

          {/* Sections */}

          {comparisonSections.map((section) => (
            <div
              className="compare-group"
              key={section.title}
            >

              <div className="compare-section-title">
                <span>{section.title}</span>
              </div>

              {section.rows.map((row) => (
                <div
                  className="compare-row"
                  key={`${section.title}-${row.label}`}
                >

                  <div className="compare-label">
                    {row.label}
                  </div>

                  {selected.map((item, index) => (
                    <div
                      className="compare-value"
                      key={
                        `${getVehicle(item)?.id || index}-${
                          row.label
                        }`
                      }
                    >
                      {getValue(
                        row.getValue(item)
                      )}
                    </div>
                  ))}

                </div>
              ))}

            </div>
          ))}

        </div>
      </div>

      {vehicles.length > 0 && (
        <p className="compare-note">
          Comparing {selected.length} EV
          {selected.length !== 1 ? "s" : ""}.
          You can compare up to 4 vehicles.
        </p>
      )}

    </section>
  );
}