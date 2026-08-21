// import Link from "next/link";

// export default function VehicleCard({ vehicle, brand }) {
//   const name = vehicle?.identity?.name || "Electric Vehicle";
//   const slug =
//     vehicle?.identity?.slug ||
//     vehicle?.slug ||
//     vehicle?.id;

//   const bodyType =
//     vehicle?.classification?.bodyType ||
//     vehicle?.extracted?.specs?.bodyType ||
//     "Electric";

//   const range =
//     vehicle?.extracted?.specs?.range ??
//     vehicle?.extracted?.specs?.rangeKm ??
//     vehicle?.specifications?.range ??
//     null;

//   const battery =
//     vehicle?.extracted?.specs?.battery ??
//     vehicle?.extracted?.specs?.batteryKwh ??
//     vehicle?.specifications?.battery ??
//     null;

//   const price =
//     vehicle?.extracted?.price ??
//     vehicle?.pricing?.price ??
//     null;

//   const brandName =
//     brand?.name ||
//     vehicle?.identity?.brandName ||
//     "";

//   return (
//     <article className="vehicle-card">
//       <Link
//         href={`/vehicles/${slug}`}
//         className="vehicle-card-link"
//       >
//         <div className="vehicle-card-media">
//           {vehicle?.media?.image || vehicle?.image ? (
//             <img
//               src={vehicle.media?.image || vehicle.image}
//               alt={name}
//               loading="lazy"
//             />
//           ) : (
//             <div className="vehicle-card-placeholder">
//               <span>EV</span>
//             </div>
//           )}

//           <span className="vehicle-card-badge">
//             {bodyType}
//           </span>
//         </div>

//         <div className="vehicle-card-content">
//           <div className="vehicle-card-brand">
//             {brandName || "EVINSIGHTS"}
//           </div>

//           <h3>{name}</h3>

//           <div className="vehicle-card-specs">
//             <div>
//               <span>Range</span>
//               <strong>
//                 {range ? `${range} km` : "—"}
//               </strong>
//             </div>

//             <div>
//               <span>Battery</span>
//               <strong>
//                 {battery ? `${battery} kWh` : "—"}
//               </strong>
//             </div>

//             <div>
//               <span>Price</span>
//               <strong>
//   {price?.amount != null
//     ? `${price.currency || ""} ${price.amount.toLocaleString()}`
//     : price != null
//       ? String(price)
//       : "—"}
// </strong>
//             </div>
//           </div>

//           <div className="vehicle-card-footer">
//             <span>View details</span>
//             <span aria-hidden="true">→</span>
//           </div>
//         </div>
//       </Link>
//     </article>
//   );
// }


// import Link from "next/link";

// function formatPrice(price) {
//   if (price == null) return "—";

//   if (typeof price === "object") {
//     const amount = price.amount;

//     if (amount == null) return "—";

//     const currency = price.currency || "";

//     return `${currency} ${Number(amount).toLocaleString()}`;
//   }

//   if (typeof price === "number") {
//     return price.toLocaleString();
//   }

//   return String(price);
// }

// export default function VehicleCard({ vehicle, brand }) {
//   const name =
//     vehicle?.identity?.name ||
//     vehicle?.name ||
//     "Electric Vehicle";

//   const slug =
//     vehicle?.identity?.slug ||
//     vehicle?.slug ||
//     vehicle?.id;

//   const bodyType =
//     vehicle?.classification?.bodyType ||
//     vehicle?.extracted?.specs?.bodyType ||
//     "Electric";

//   const range =
//     vehicle?.extracted?.specs?.range ??
//     vehicle?.extracted?.specs?.rangeKm ??
//     vehicle?.specifications?.range ??
//     null;

//   const battery =
//     vehicle?.extracted?.specs?.battery ??
//     vehicle?.extracted?.specs?.batteryKwh ??
//     vehicle?.specifications?.battery ??
//     null;

//   const price =
//     vehicle?.extracted?.price ??
//     vehicle?.pricing?.price ??
//     null;

//   const brandName =
//     brand?.name ||
//     vehicle?.identity?.brandName ||
//     "EVINSIGHTS";

//   const image =
//     vehicle?.media?.image ||
//     vehicle?.image ||
//     vehicle?.media?.images?.[0] ||
//     null;

//   return (
//     <article className="vehicle-card">
//       <Link
//         href={`/vehicles/${slug}`}
//         className="vehicle-card-link"
//       >
//         <div className="vehicle-card-media">
//           {image ? (
//             <img
//               src={image}
//               alt={name}
//               loading="lazy"
//             />
//           ) : (
//             <div className="vehicle-card-placeholder">
//               <span>EV</span>
//             </div>
//           )}

//           <span className="vehicle-card-badge">
//             {bodyType}
//           </span>

//           <span className="vehicle-card-arrow">
//             ↗
//           </span>
//         </div>

//         <div className="vehicle-card-content">
//           <div className="vehicle-card-top">
//             <span className="vehicle-card-brand">
//               {brandName}
//             </span>

//             {vehicle?.verification?.status === "approved" && (
//               <span className="vehicle-card-verified">
//                 ✓ Verified
//               </span>
//             )}
//           </div>

//           <h3 className="vehicle-card-title">
//             {name}
//           </h3>

//           <div className="vehicle-card-specs">
//             <div className="vehicle-card-spec">
//               <span>Range</span>
//               <strong>
//                 {range != null ? `${range} km` : "—"}
//               </strong>
//             </div>

//             <div className="vehicle-card-spec">
//               <span>Battery</span>
//               <strong>
//                 {battery != null ? `${battery} kWh` : "—"}
//               </strong>
//             </div>

//             <div className="vehicle-card-spec">
//               <span>Price</span>
//               <strong>
//                 {formatPrice(price)}
//               </strong>
//             </div>
//           </div>

//           <div className="vehicle-card-footer">
//             <span>View details</span>
//             <span className="vehicle-card-footer-arrow">
//               →
//             </span>
//           </div>
//         </div>
//       </Link>
//     </article>
//   );
// }


// "use client";

// import Link from "next/link";
// import { useCurrency } from "@/context/CurrencyContext";

// /*
//  * Temporary conversion rates.
//  * Base currency = USD.
//  *
//  * Later we can replace these with live rates from an API.
//  */
// const USD_RATES = {
//   USD: 1,
//   EUR: 0.92,
//   GBP: 0.79,
//   INR: 83,
//   JPY: 150,
// };

// const CURRENCY_LOCALES = {
//   USD: "en-US",
//   EUR: "de-DE",
//   GBP: "en-GB",
//   INR: "en-IN",
//   JPY: "ja-JP",
// };

// function getImage(vehicle) {
//   return (
//     vehicle?.metadata?.image ||
//     vehicle?.media?.image ||
//     vehicle?.image ||
//     null
//   );
// }

// function getPrice(vehicle) {
//   const price =
//     vehicle?.extracted?.price ??
//     vehicle?.pricing?.price ??
//     vehicle?.price ??
//     null;

//   if (price == null) {
//     return null;
//   }

//   if (typeof price === "number") {
//     return {
//       amount: price,
//       currency: "USD",
//     };
//   }

//   if (typeof price === "object") {
//     const amount = Number(price?.amount);

//     if (!Number.isFinite(amount)) {
//       return null;
//     }

//     return {
//       amount,
//       currency: String(price?.currency || "USD").toUpperCase(),
//     };
//   }

//   return null;
// }

// function convertCurrency(amount, fromCurrency, toCurrency) {
//   const from = String(fromCurrency || "USD").toUpperCase();
//   const to = String(toCurrency || "USD").toUpperCase();

//   if (!Number.isFinite(amount)) {
//     return null;
//   }

//   if (from === to) {
//     return amount;
//   }

//   const fromRate = USD_RATES[from];
//   const toRate = USD_RATES[to];

//   if (!fromRate || !toRate) {
//     return amount;
//   }

//   /*
//    * Convert:
//    * source currency -> USD -> selected currency
//    */
//   const usdAmount = amount / fromRate;

//   return usdAmount * toRate;
// }

// function formatPrice(price, selectedCurrency) {
//   if (!price) {
//     return "—";
//   }

//   const sourceCurrency = price.currency || "USD";
//   const targetCurrency = selectedCurrency || sourceCurrency;

//   const convertedAmount = convertCurrency(
//     price.amount,
//     sourceCurrency,
//     targetCurrency
//   );

//   if (!Number.isFinite(convertedAmount)) {
//     return "—";
//   }

//   const locale =
//     CURRENCY_LOCALES[targetCurrency] || "en-US";

//   try {
//     return new Intl.NumberFormat(locale, {
//       style: "currency",
//       currency: targetCurrency,
//       maximumFractionDigits: 0,
//     }).format(convertedAmount);
//   } catch {
//     return `${targetCurrency} ${Math.round(convertedAmount).toLocaleString()}`;
//   }
// }

// export default function VehicleCard({ vehicle, brand }) {
//   const { currency } = useCurrency();

//   const name =
//     vehicle?.identity?.name ||
//     vehicle?.name ||
//     "Electric Vehicle";

//   const slug =
//     vehicle?.identity?.slug ||
//     vehicle?.slug ||
//     vehicle?.id;

//   const bodyType =
//     vehicle?.classification?.bodyType ||
//     vehicle?.extracted?.specs?.bodyType ||
//     "Electric";

//   const range =
//     vehicle?.extracted?.specs?.range ??
//     vehicle?.extracted?.specs?.rangeKm ??
//     vehicle?.specifications?.range ??
//     null;

//   const battery =
//     vehicle?.extracted?.specs?.battery ??
//     vehicle?.extracted?.specs?.batteryKwh ??
//     vehicle?.specifications?.battery ??
//     null;

//   const price = getPrice(vehicle);

//   const image = getImage(vehicle);

//   const brandName =
//     brand?.name ||
//     vehicle?.identity?.brandName ||
//     vehicle?.brandName ||
//     "";

//   return (
//     <article className="vehicle-card">
//       <Link
//         href={`/vehicles/${slug}`}
//         className="vehicle-card-link"
//       >
//         <div className="vehicle-card-media">
//           {image ? (
//             <img
//               src={image}
//               alt={name}
//               loading="lazy"
//               className="vehicle-card-image"
//               onError={(event) => {
//                 event.currentTarget.style.display = "none";

//                 const placeholder =
//                   event.currentTarget.parentElement?.querySelector(
//                     ".vehicle-card-placeholder"
//                   );

//                 if (placeholder) {
//                   placeholder.hidden = false;
//                 }
//               }}
//             />
//           ) : null}

//           <div
//             className="vehicle-card-placeholder"
//             hidden={Boolean(image)}
//           >
//             <span>EV</span>
//           </div>

//           <span className="vehicle-card-badge">
//             {bodyType}
//           </span>

//           {vehicle?.verification?.status === "approved" && (
//             <span className="vehicle-card-verified">
//               ✓ Verified
//             </span>
//           )}

//           <span
//             className="vehicle-card-arrow"
//             aria-hidden="true"
//           >
//             ↗
//           </span>
//         </div>

//         <div className="vehicle-card-content">
//           <div className="vehicle-card-topline">
//             <div className="vehicle-card-brand">
//               {brandName || "EVINSIGHTS"}
//             </div>

//             {vehicle?.verification?.status === "approved" && (
//               <span className="vehicle-card-verified-text">
//                 ✓ Verified
//               </span>
//             )}
//           </div>

//           <h3>{name}</h3>

//           <div className="vehicle-card-specs">
//             <div className="vehicle-card-spec">
//               <span>Range</span>

//               <strong>
//                 {range != null
//                   ? `${Number(range).toLocaleString()} km`
//                   : "—"}
//               </strong>
//             </div>

//             <div className="vehicle-card-spec">
//               <span>Battery</span>

//               <strong>
//                 {battery != null
//                   ? `${Number(battery).toLocaleString()} kWh`
//                   : "—"}
//               </strong>
//             </div>

//             <div className="vehicle-card-spec vehicle-card-spec--price">
//               <span>Price</span>

//               <strong
//                 title={
//                   price
//                     ? `${price.currency} ${price.amount.toLocaleString()}`
//                     : "Price unavailable"
//                 }
//               >
//                 {formatPrice(price, currency)}
//               </strong>
//             </div>
//           </div>

//           <div className="vehicle-card-footer">
//             <span>View details</span>

//             <span aria-hidden="true">
//               →
//             </span>
//           </div>
//         </div>
//       </Link>
//     </article>
//   );
// }


"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const COMPARE_STORAGE_KEY = "evinsights-compare";

export default function VehicleCard({ vehicle, brand }) {
  const router = useRouter();

  const [compareList, setCompareList] = useState([]);
  const [mounted, setMounted] = useState(false);

  const name =
    vehicle?.identity?.name ||
    vehicle?.name ||
    "Electric Vehicle";

  const slug =
    vehicle?.identity?.slug ||
    vehicle?.slug ||
    vehicle?.id;

  const bodyType =
    vehicle?.classification?.bodyType ||
    vehicle?.extracted?.specs?.bodyType ||
    "Electric";

  const range =
    vehicle?.extracted?.specs?.range ??
    vehicle?.extracted?.specs?.rangeKm ??
    vehicle?.specifications?.range ??
    null;

  const battery =
    vehicle?.extracted?.specs?.battery ??
    vehicle?.extracted?.specs?.batteryKwh ??
    vehicle?.specifications?.battery ??
    null;

  const price =
    vehicle?.extracted?.price ??
    vehicle?.pricing?.price ??
    null;

  const brandName =
    brand?.name ||
    vehicle?.identity?.brandName ||
    "";

  const image =
    vehicle?.metadata?.image ||
    vehicle?.media?.image ||
    vehicle?.image ||
    vehicle?.payload?.metadata?.image ||
    null;

  // useEffect(() => {
  //   setMounted(true);

  //   try {
  //     const saved = localStorage.getItem(
  //       COMPARE_STORAGE_KEY
  //     );

  //     if (saved) {
  //       const parsed = JSON.parse(saved);

  //       if (Array.isArray(parsed)) {
  //         setCompareList(parsed);
  //       }
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Failed to load comparison list:",
  //       error
  //     );
  //   }
  // }, []);

  useEffect(() => {
  setMounted(true);

  function loadCompareList() {
    try {
      const saved = localStorage.getItem(
        COMPARE_STORAGE_KEY
      );

      if (!saved) {
        setCompareList([]);
        return;
      }

      const parsed = JSON.parse(saved);

      setCompareList(
        Array.isArray(parsed)
          ? parsed
          : []
      );
    } catch (error) {
      console.error(
        "Failed to load comparison list:",
        error
      );

      setCompareList([]);
    }
  }

  loadCompareList();

  window.addEventListener(
    "evinsights-compare-updated",
    loadCompareList
  );

  window.addEventListener(
    "storage",
    loadCompareList
  );

  return () => {
    window.removeEventListener(
      "evinsights-compare-updated",
      loadCompareList
    );

    window.removeEventListener(
      "storage",
      loadCompareList
    );
  };
}, []);

  function saveCompareList(list) {
  setCompareList(list);

  try {
    localStorage.setItem(
      COMPARE_STORAGE_KEY,
      JSON.stringify(list)
    );

    window.dispatchEvent(
      new CustomEvent("evinsights-compare-updated")
    );
  } catch (error) {
    console.error(
      "Failed to save comparison list:",
      error
    );
  }
}

  function isSelected() {
    return compareList.some(
      (item) =>
        item.slug === slug ||
        item.id === vehicle?.id
    );
  }

  function handleCompare(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!mounted) return;

    const selected = isSelected();

    if (selected) {
      const updated = compareList.filter(
        (item) =>
          item.slug !== slug &&
          item.id !== vehicle?.id
      );

      saveCompareList(updated);
      return;
    }

    if (compareList.length >= 4) {
      alert(
        "You can compare up to 4 EVs at once."
      );
      return;
    }

    const updated = [
      ...compareList,
      {
        id: vehicle?.id,
        slug,
        name,
      },
    ];

    saveCompareList(updated);
  }

  function openCompare(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!compareList.length) return;

    const slugs = compareList
      .map((item) => item.slug)
      .filter(Boolean)
      .join(",");

    router.push(
      `/compare?slugs=${encodeURIComponent(slugs)}`
    );
  }

  const selected = mounted && isSelected();

  return (
    <article className="vehicle-card">

      <Link
        href={`/vehicles/${slug}`}
        className="vehicle-card-link"
      >

        <div className="vehicle-card-media">

          {image ? (
            <img
              src={image}
              alt={name}
              loading="lazy"
            />
          ) : (
            <div className="vehicle-card-placeholder">
              <span>EV</span>
            </div>
          )}

          <span className="vehicle-card-badge">
            {bodyType}
          </span>

          {/* Compare Button */}
          <button
            type="button"
            className={`vehicle-card-compare ${
              selected
                ? "vehicle-card-compare--active"
                : ""
            }`}
            onClick={handleCompare}
            aria-label={
              selected
                ? `Remove ${name} from comparison`
                : `Add ${name} to comparison`
            }
          >
            <span className="vehicle-card-compare__icon">
              {selected ? "✓" : "+"}
            </span>

            <span>
              {selected
                ? "Added"
                : "Compare"}
            </span>
          </button>

        </div>

        <div className="vehicle-card-content">

          <div className="vehicle-card-brand">
            {brandName || "EVINSIGHTS"}
          </div>

          <h3>{name}</h3>

          <div className="vehicle-card-specs">

            <div>
              <span>Range</span>

              <strong>
                {range != null
                  ? `${range} km`
                  : "—"}
              </strong>
            </div>

            <div>
              <span>Battery</span>

              <strong>
                {battery != null
                  ? `${battery} kWh`
                  : "—"}
              </strong>
            </div>

            <div>
              <span>Price</span>

              <strong>
                {price?.amount != null
                  ? `${price.currency || ""} ${Number(
                      price.amount
                    ).toLocaleString()}`
                  : price != null
                    ? String(price)
                    : "—"}
              </strong>
            </div>

          </div>

          <div className="vehicle-card-footer">

            <span>
              View details
            </span>

            <span aria-hidden="true">
              →
            </span>

          </div>

        </div>

      </Link>

      {/* Compare Bar */}
      {mounted && compareList.length > 0 && (
        <div className="vehicle-card-compare-bar">

          <div>
            <strong>
              {compareList.length}/4
            </strong>

            <span>
              EVs selected
            </span>
          </div>

          <button
            type="button"
            onClick={openCompare}
          >
            Compare now →
          </button>

        </div>
      )}

    </article>
  );
}
