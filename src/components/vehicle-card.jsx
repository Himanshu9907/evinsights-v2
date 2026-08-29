// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useCurrency } from "@/context/CurrencyContext";

// const COMPARE_STORAGE_KEY = "evinsights-compare";

// export default function VehicleCard({ vehicle, brand }) {
//   const router = useRouter();

//   const { currency, formatPrice } = useCurrency();

//   const [compareList, setCompareList] = useState([]);
//   const [mounted, setMounted] = useState(false);

//   /* =========================================================
//      BASIC VEHICLE DATA
//   ========================================================= */

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
//     vehicle?.price ??
//     null;

//   const brandName =
//     brand?.name ||
//     vehicle?.identity?.brandName ||
//     "";

//   /* =========================================================
//      IMAGE
//   ========================================================= */

//   const image =
//     vehicle?.image ||
//     vehicle?.metadata?.image ||
//     vehicle?.metadata?.imageUrl ||
//     vehicle?.media?.image ||
//     vehicle?.payload?.metadata?.image ||
//     null;

//   /* =========================================================
//      PRICE NORMALIZATION
//   ========================================================= */

//   function getPriceAmount() {
//     if (price == null) {
//       return null;
//     }

//     if (typeof price === "number") {
//       return price;
//     }

//     if (typeof price === "string") {
//       const numeric = Number(
//         price.replace(/[^\d.-]/g, "")
//       );

//       return Number.isFinite(numeric)
//         ? numeric
//         : null;
//     }

//     if (typeof price === "object") {
//       const amount =
//         price.amount ??
//         price.value ??
//         price.price ??
//         null;

//       const numeric = Number(amount);

//       return Number.isFinite(numeric)
//         ? numeric
//         : null;
//     }

//     return null;
//   }

//   function getOriginalCurrency() {
//     if (!price || typeof price !== "object") {
//       return "INR";
//     }

//     const raw =
//       price.currencyCode ||
//       price.currency ||
//       price.currency_code ||
//       "INR";

//     const normalized = String(raw)
//       .trim()
//       .toUpperCase();

//     const currencyMap = {
//       "$": "USD",
//       "US$": "USD",
//       "USD": "USD",

//       "€": "EUR",
//       "EUR": "EUR",

//       "£": "GBP",
//       "GBP": "GBP",

//       "₹": "INR",
//       "INR": "INR",

//       "¥": "JPY",
//       "JPY": "JPY",
//     };

//     return currencyMap[normalized] || "INR";
//   }

//   const priceAmount = getPriceAmount();

//   const originalCurrency = getOriginalCurrency();

//   const formattedPrice =
//     priceAmount != null
//       ? formatPrice(
//           priceAmount,
//           originalCurrency
//         )
//       : "—";

//   /* =========================================================
//      COMPARE LIST
//   ========================================================= */

//   useEffect(() => {
//     setMounted(true);

//     function loadCompareList() {
//       try {
//         const saved = localStorage.getItem(
//           COMPARE_STORAGE_KEY
//         );

//         if (!saved) {
//           setCompareList([]);
//           return;
//         }

//         const parsed = JSON.parse(saved);

//         setCompareList(
//           Array.isArray(parsed)
//             ? parsed
//             : []
//         );
//       } catch (error) {
//         console.error(
//           "Failed to load comparison list:",
//           error
//         );

//         setCompareList([]);
//       }
//     }

//     loadCompareList();

//     window.addEventListener(
//       "evinsights-compare-updated",
//       loadCompareList
//     );

//     window.addEventListener(
//       "storage",
//       loadCompareList
//     );

//     return () => {
//       window.removeEventListener(
//         "evinsights-compare-updated",
//         loadCompareList
//       );

//       window.removeEventListener(
//         "storage",
//         loadCompareList
//       );
//     };
//   }, []);

//   /* =========================================================
//      SAVE COMPARE LIST
//   ========================================================= */

//   function saveCompareList(list) {
//     setCompareList(list);

//     try {
//       localStorage.setItem(
//         COMPARE_STORAGE_KEY,
//         JSON.stringify(list)
//       );

//       window.dispatchEvent(
//         new CustomEvent(
//           "evinsights-compare-updated"
//         )
//       );
//     } catch (error) {
//       console.error(
//         "Failed to save comparison list:",
//         error
//       );
//     }
//   }

//   /* =========================================================
//      CHECK SELECTED
//   ========================================================= */

//   function isSelected() {
//     return compareList.some(
//       (item) =>
//         item?.slug === slug ||
//         item?.id === vehicle?.id
//     );
//   }

//   /* =========================================================
//      ADD / REMOVE COMPARE
//   ========================================================= */

//   function handleCompare(event) {
//     event.preventDefault();
//     event.stopPropagation();

//     if (!mounted) {
//       return;
//     }

//     const selected = isSelected();

//     /* REMOVE */
//     if (selected) {
//       const updated =
//         compareList.filter(
//           (item) =>
//             item?.slug !== slug &&
//             item?.id !== vehicle?.id
//         );

//       saveCompareList(updated);

//       return;
//     }

//     /* MAX 4 */
//     if (compareList.length >= 4) {
//       alert(
//         "You can compare up to 4 EVs at once."
//       );

//       return;
//     }

//     /* ADD */
//     const updated = [
//       ...compareList,
//       {
//         id: vehicle?.id,
//         slug,
//         name,
//       },
//     ];

//     saveCompareList(updated);
//   }

//   /* =========================================================
//      OPEN COMPARE
//   ========================================================= */

//   function openCompare(event) {
//     event.preventDefault();
//     event.stopPropagation();

//     if (!compareList.length) {
//       return;
//     }

//     const slugs = compareList
//       .map((item) => item?.slug)
//       .filter(Boolean)
//       .join(",");

//     if (!slugs) {
//       return;
//     }

//     router.push(
//       `/compare?slugs=${encodeURIComponent(slugs)}`
//     );
//   }

//   const selected =
//     mounted && isSelected();

//   /* =========================================================
//      RENDER
//   ========================================================= */

//   return (
//     <article className="vehicle-card">

//       {/* =====================================================
//           MEDIA
//       ===================================================== */}

//       <div className="vehicle-card-media">

//         {image ? (
//           <img
//             src={image}
//             alt={name}
//             className="vehicle-card-image"
//             loading="lazy"
//           />
//         ) : (
//           <div className="vehicle-card-placeholder">
//             <span>EV</span>
//           </div>
//         )}

//         {/* BODY TYPE */}
//         <span className="vehicle-card-badge">
//           {bodyType}
//         </span>

//         {/* =================================================
//             COMPARE BUTTON
//             IMPORTANT:
//             Button is outside Link
//         ================================================= */}

//         <button
//           type="button"
//           className={`vehicle-card-compare ${
//             selected
//               ? "vehicle-card-compare--active"
//               : ""
//           }`}
//           onClick={handleCompare}
//           aria-label={
//             selected
//               ? `Remove ${name} from comparison`
//               : `Add ${name} to comparison`
//           }
//         >
//           <span className="vehicle-card-compare__icon">
//             {selected ? "✓" : "+"}
//           </span>

//           <span>
//             {selected
//               ? "Added"
//               : "Compare"}
//           </span>
//         </button>

//       </div>

//       {/* =====================================================
//           CLICKABLE CONTENT
//       ===================================================== */}

//       <Link
//         href={`/vehicles/${slug}`}
//         className="vehicle-card-link"
//       >

//         <div className="vehicle-card-content">

//           {/* BRAND */}

//           <div className="vehicle-card-brand">
//             {brandName || "EVINSIGHTS"}
//           </div>

//           {/* NAME */}

//           <h3 className="vehicle-card-title">
//             {name}
//           </h3>

//           {/* =================================================
//               SPECS
//           ================================================= */}

//           <div className="vehicle-card-specs">

//             {/* RANGE */}

//             <div className="vehicle-card-spec">
//               <span className="vehicle-card-spec-label">
//                 Range
//               </span>

//               <strong className="vehicle-card-spec-value">
//                 {range != null
//                   ? `${range} km`
//                   : "—"}
//               </strong>
//             </div>

//             {/* BATTERY */}

//             <div className="vehicle-card-spec">
//               <span className="vehicle-card-spec-label">
//                 Battery
//               </span>

//               <strong className="vehicle-card-spec-value">
//                 {battery != null
//                   ? `${battery} kWh`
//                   : "—"}
//               </strong>
//             </div>

//             {/* PRICE */}

//             <div className="vehicle-card-spec vehicle-card-spec--price">
//               <span className="vehicle-card-spec-label">
//                 Price
//               </span>

//               <strong
//                 className="vehicle-card-spec-value vehicle-card-price"
//                 title={formattedPrice}
//               >
//                 {formattedPrice}
//               </strong>
//             </div>

//           </div>

//           {/* =================================================
//               FOOTER
//           ================================================= */}

//           <div className="vehicle-card-footer">

//             <span>
//               View details
//             </span>

//             <span
//               aria-hidden="true"
//               className="vehicle-card-arrow"
//             >
//               →
//             </span>

//           </div>

//         </div>

//       </Link>

//       {/* =====================================================
//           COMPARE BAR
//       ===================================================== */}

//       {mounted &&
//         compareList.length > 0 && (
//           <div className="vehicle-card-compare-bar">

//             <div className="vehicle-card-compare-count">
//               <strong>
//                 {compareList.length}/4
//               </strong>

//               <span>
//                 EVs selected
//               </span>
//             </div>

//             <button
//               type="button"
//               onClick={openCompare}
//               className="vehicle-card-compare-now"
//             >
//               Compare now →
//             </button>

//           </div>
//         )}

//     </article>
//   );
// }


// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useCurrency } from "@/context/CurrencyContext";

// const COMPARE_STORAGE_KEY = "evinsights-compare";

// export default function VehicleCard({ vehicle, brand }) {
//   const router = useRouter();

//   const { currency, formatPrice } = useCurrency();

//   const [compareList, setCompareList] = useState([]);
//   const [mounted, setMounted] = useState(false);

//   /* =========================================================
//      BASIC VEHICLE DATA
//   ========================================================= */

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
//     vehicle?.specifications?.bodyType ||
//     "Electric";

//   const range =
//     vehicle?.extracted?.specs?.range ??
//     vehicle?.extracted?.specs?.rangeKm ??
//     vehicle?.specifications?.range ??
//     vehicle?.specifications?.rangeKm ??
//     null;

//   const battery =
//     vehicle?.extracted?.specs?.battery ??
//     vehicle?.extracted?.specs?.batteryKwh ??
//     vehicle?.specifications?.battery ??
//     vehicle?.specifications?.batteryKwh ??
//     null;

//   /* =========================================================
//      PRICE
//   ========================================================= */

//   const price =
//     vehicle?.extracted?.price ??
//     vehicle?.extracted?.pricing?.price ??
//     vehicle?.pricing?.price ??
//     vehicle?.pricing?.startingPrice ??
//     vehicle?.price ??
//     null;

//   const brandName =
//     brand?.name ||
//     vehicle?.identity?.brandName ||
//     vehicle?.brandName ||
//     "";

//   /* =========================================================
//      IMAGE
//   ========================================================= */

//   const image =
//     vehicle?.image ||
//     vehicle?.metadata?.image ||
//     vehicle?.metadata?.imageUrl ||
//     vehicle?.media?.image ||
//     vehicle?.media?.imageUrl ||
//     vehicle?.payload?.metadata?.image ||
//     null;

//   /* =========================================================
//      PRICE NORMALIZATION
//   ========================================================= */

//   function getPriceAmount(value) {
//     if (value == null) {
//       return null;
//     }

//     /*
//       Number
//     */
//     if (typeof value === "number") {
//       return Number.isFinite(value) ? value : null;
//     }

//     /*
//       String

//       Examples:
//       "₹12,49,000"
//       "$15,000"
//       "1249000"
//     */
//     if (typeof value === "string") {
//       const numericString = value
//         .replace(/,/g, "")
//         .replace(/[^\d.-]/g, "");

//       const numeric = Number(numericString);

//       return Number.isFinite(numeric)
//         ? numeric
//         : null;
//     }

//     /*
//       Object

//       Examples:
//       {
//         amount: 1249000,
//         currency: "INR"
//       }

//       or

//       {
//         value: 1249000,
//         currencyCode: "INR"
//       }
//     */
//     if (typeof value === "object") {
//       const amount =
//         value?.amount ??
//         value?.value ??
//         value?.price ??
//         value?.startingPrice ??
//         null;

//       const numeric =
//         typeof amount === "number"
//           ? amount
//           : Number(
//               String(amount)
//                 .replace(/,/g, "")
//                 .replace(/[^\d.-]/g, "")
//             );

//       return Number.isFinite(numeric)
//         ? numeric
//         : null;
//     }

//     return null;
//   }

//   /* =========================================================
//      ORIGINAL CURRENCY
//   ========================================================= */

//   function getOriginalCurrency(value) {
//     /*
//       Default EVInsights currency = INR
//     */

//     if (!value || typeof value !== "object") {
//       return "INR";
//     }

//     const raw =
//       value?.currencyCode ||
//       value?.currency_code ||
//       value?.currency ||
//       value?.priceCurrency ||
//       value?.currencySymbol ||
//       "INR";

//     const normalized = String(raw)
//       .trim()
//       .toUpperCase();

//     const currencyMap = {
//       "$": "USD",
//       "US$": "USD",
//       "USD": "USD",

//       "€": "EUR",
//       "EUR": "EUR",

//       "£": "GBP",
//       "GBP": "GBP",

//       "₹": "INR",
//       "RS": "INR",
//       "RS.": "INR",
//       "INR": "INR",

//       "¥": "JPY",
//       "JP¥": "JPY",
//       "JPY": "JPY",
//     };

//     return currencyMap[normalized] || "INR";
//   }

//   const priceAmount = getPriceAmount(price);

//   const originalCurrency = getOriginalCurrency(price);

//   /* =========================================================
//      FORMATTED PRICE

//      IMPORTANT:

//      formatPrice() should use the currently selected
//      currency from CurrencyContext.

//      Example:

//      Navbar = INR
//      → ₹12,49,000

//      Navbar = USD
//      → $14,xxx

//      Navbar = EUR
//      → €12,xxx

//      Navbar = GBP
//      → £10,xxx
//   ========================================================= */

//   const formattedPrice =
//     priceAmount != null
//       ? formatPrice(
//           priceAmount,
//           originalCurrency
//         )
//       : "—";

//   /* =========================================================
//      COMPARE LIST
//   ========================================================= */

//   useEffect(() => {
//     setMounted(true);

//     function loadCompareList() {
//       try {
//         const saved =
//           localStorage.getItem(
//             COMPARE_STORAGE_KEY
//           );

//         if (!saved) {
//           setCompareList([]);
//           return;
//         }

//         const parsed = JSON.parse(saved);

//         setCompareList(
//           Array.isArray(parsed)
//             ? parsed
//             : []
//         );
//       } catch (error) {
//         console.error(
//           "Failed to load comparison list:",
//           error
//         );

//         setCompareList([]);
//       }
//     }

//     loadCompareList();

//     window.addEventListener(
//       "evinsights-compare-updated",
//       loadCompareList
//     );

//     window.addEventListener(
//       "storage",
//       loadCompareList
//     );

//     return () => {
//       window.removeEventListener(
//         "evinsights-compare-updated",
//         loadCompareList
//       );

//       window.removeEventListener(
//         "storage",
//         loadCompareList
//       );
//     };
//   }, []);

//   /* =========================================================
//      SAVE COMPARE LIST
//   ========================================================= */

//   function saveCompareList(list) {
//     setCompareList(list);

//     try {
//       localStorage.setItem(
//         COMPARE_STORAGE_KEY,
//         JSON.stringify(list)
//       );

//       window.dispatchEvent(
//         new CustomEvent(
//           "evinsights-compare-updated"
//         )
//       );
//     } catch (error) {
//       console.error(
//         "Failed to save comparison list:",
//         error
//       );
//     }
//   }

//   /* =========================================================
//      CHECK SELECTED
//   ========================================================= */

//   function isSelected() {
//     return compareList.some(
//       (item) =>
//         item?.slug === slug ||
//         item?.id === vehicle?.id
//     );
//   }

//   /* =========================================================
//      ADD / REMOVE COMPARE
//   ========================================================= */

//   function handleCompare(event) {
//     event.preventDefault();
//     event.stopPropagation();

//     if (!mounted) {
//       return;
//     }

//     const selected = isSelected();

//     /* -------------------------------------------------------
//        REMOVE
//     ------------------------------------------------------- */

//     if (selected) {
//       const updated =
//         compareList.filter(
//           (item) =>
//             item?.slug !== slug &&
//             item?.id !== vehicle?.id
//         );

//       saveCompareList(updated);

//       return;
//     }

//     /* -------------------------------------------------------
//        MAX 4
//     ------------------------------------------------------- */

//     if (compareList.length >= 4) {
//       alert(
//         "You can compare up to 4 EVs at once."
//       );

//       return;
//     }

//     /* -------------------------------------------------------
//        ADD
//     ------------------------------------------------------- */

//     const updated = [
//       ...compareList,
//       {
//         id: vehicle?.id,
//         slug,
//         name,
//       },
//     ];

//     saveCompareList(updated);
//   }

//   /* =========================================================
//      OPEN COMPARE
//   ========================================================= */

//   function openCompare(event) {
//     event.preventDefault();
//     event.stopPropagation();

//     if (!compareList.length) {
//       return;
//     }

//     const slugs = compareList
//       .map((item) => item?.slug)
//       .filter(Boolean)
//       .join(",");

//     if (!slugs) {
//       return;
//     }

//     router.push(
//       `/compare?slugs=${encodeURIComponent(slugs)}`
//     );
//   }

//   const selected =
//     mounted && isSelected();

//   /* =========================================================
//      RENDER
//   ========================================================= */

//   return (
//     <article className="vehicle-card">

//       {/* =====================================================
//           MEDIA
//       ===================================================== */}

//       <div className="vehicle-card-media">

//         {image ? (
//           <img
//             src={image}
//             alt={name}
//             className="vehicle-card-image"
//             loading="lazy"
//           />
//         ) : (
//           <div className="vehicle-card-placeholder">
//             <span>EV</span>
//           </div>
//         )}

//         {/* BODY TYPE */}

//         <span className="vehicle-card-badge">
//           {bodyType}
//         </span>

//         {/* =================================================
//             COMPARE BUTTON
//         ================================================= */}

//         <button
//           type="button"
//           className={`vehicle-card-compare ${
//             selected
//               ? "vehicle-card-compare--active"
//               : ""
//           }`}
//           onClick={handleCompare}
//           aria-label={
//             selected
//               ? `Remove ${name} from comparison`
//               : `Add ${name} to comparison`
//           }
//         >
//           <span className="vehicle-card-compare__icon">
//             {selected ? "✓" : "+"}
//           </span>

//           <span>
//             {selected
//               ? "Added"
//               : "Compare"}
//           </span>
//         </button>

//       </div>

//       {/* =====================================================
//           CLICKABLE CONTENT
//       ===================================================== */}

//       <Link
//         href={`/vehicles/${slug}`}
//         className="vehicle-card-link"
//       >

//         <div className="vehicle-card-content">

//           {/* BRAND */}

//           <div className="vehicle-card-brand">
//             {brandName || "EVINSIGHTS"}
//           </div>

//           {/* NAME */}

//           <h3 className="vehicle-card-title">
//             {name}
//           </h3>

//           {/* =================================================
//               SPECS
//           ================================================= */}

//           <div className="vehicle-card-specs">

//             {/* RANGE */}

//             <div className="vehicle-card-spec">
//               <span className="vehicle-card-spec-label">
//                 Range
//               </span>

//               <strong className="vehicle-card-spec-value">
//                 {range != null
//                   ? `${range} km`
//                   : "—"}
//               </strong>
//             </div>

//             {/* BATTERY */}

//             <div className="vehicle-card-spec">
//               <span className="vehicle-card-spec-label">
//                 Battery
//               </span>

//               <strong className="vehicle-card-spec-value">
//                 {battery != null
//                   ? `${battery} kWh`
//                   : "—"}
//               </strong>
//             </div>

//             {/* PRICE */}

//             <div className="vehicle-card-spec vehicle-card-spec--price">

//               <span className="vehicle-card-spec-label">
//                 Price
//               </span>

//               <strong
//                 className="vehicle-card-spec-value vehicle-card-price"
//                 title={formattedPrice}
//               >
//                 {formattedPrice}
//               </strong>

//             </div>

//           </div>

//           {/* =================================================
//               FOOTER
//           ================================================= */}

//           <div className="vehicle-card-footer">

//             <span>
//               View details
//             </span>

//             <span
//               aria-hidden="true"
//               className="vehicle-card-arrow"
//             >
//               →
//             </span>

//           </div>

//         </div>

//       </Link>

//       {/* =====================================================
//           COMPARE BAR
//       ===================================================== */}

//       {mounted &&
//         compareList.length > 0 && (

//           <div className="vehicle-card-compare-bar">

//             <div className="vehicle-card-compare-count">

//               <strong>
//                 {compareList.length}/4
//               </strong>

//               <span>
//                 EVs selected
//               </span>

//             </div>

//             <button
//               type="button"
//               onClick={openCompare}
//               className="vehicle-card-compare-now"
//             >
//               Compare now →
//             </button>

//           </div>

//         )}

//     </article>
//   );
// }


"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrency } from "@/context/CurrencyContext";

const COMPARE_STORAGE_KEY = "evinsights-compare";

export default function VehicleCard({ vehicle, brand }) {
  const router = useRouter();

  const { formatPrice } = useCurrency();

  const [compareList, setCompareList] = useState([]);
  const [mounted, setMounted] = useState(false);

  /* =========================================================
     BASIC DATA
  ========================================================= */

  const name =
    vehicle?.identity?.name ||
    vehicle?.name ||
    vehicle?.extracted?.name ||
    "Electric Vehicle";

  const slug =
    vehicle?.identity?.slug ||
    vehicle?.slug ||
    vehicle?.id;

  const bodyType =
    vehicle?.classification?.bodyType ||
    vehicle?.extracted?.bodyType ||
    vehicle?.extracted?.specs?.bodyType ||
    vehicle?.specifications?.bodyType ||
    "Electric";

  const range =
    vehicle?.extracted?.rangeKm ??
    vehicle?.extracted?.range ??
    vehicle?.extracted?.araiRange ??
    vehicle?.extracted?.specs?.range ??
    vehicle?.extracted?.specs?.rangeKm ??
    vehicle?.specifications?.range ??
    vehicle?.specifications?.rangeKm ??
    null;

  const battery =
    vehicle?.extracted?.batteryKwh ??
    vehicle?.extracted?.batteryCapacityKwh ??
    vehicle?.extracted?.batteryCapacity ??
    vehicle?.extracted?.specs?.battery ??
    vehicle?.extracted?.specs?.batteryKwh ??
    vehicle?.specifications?.battery ??
    vehicle?.specifications?.batteryKwh ??
    null;

  /* =========================================================
     PRICE

     IMPORTANT:
     Your actual data contains:

     extracted.priceMin
     extracted.priceMax
     extracted.currency
     extracted.currencyCode
     extracted.currencySymbol

     So starting price = priceMin
  ========================================================= */

  const priceAmount =
    vehicle?.extracted?.priceMin ??
    vehicle?.pricing?.priceMin ??
    vehicle?.pricing?.startingPrice ??
    vehicle?.priceMin ??
    null;

  /* =========================================================
     ORIGINAL CURRENCY
  ========================================================= */

  const originalCurrency =
    vehicle?.extracted?.currencyCode ||
    vehicle?.extracted?.currency ||
    vehicle?.pricing?.currencyCode ||
    vehicle?.pricing?.currency ||
    vehicle?.currencyCode ||
    vehicle?.currency ||
    "INR";

  /* =========================================================
     FORMATTED PRICE

     formatPrice receives:

     amount
     original currency

     CurrencyContext then converts/displays according
     to the currency selected in navbar.
  ========================================================= */

  const formattedPrice =
    priceAmount !== null &&
    priceAmount !== undefined &&
    priceAmount !== ""
      ? formatPrice(
          Number(priceAmount),
          String(originalCurrency).toUpperCase()
        )
      : "—";

  /* =========================================================
     BRAND
  ========================================================= */

  const brandName =
    brand?.name ||
    vehicle?.identity?.brandName ||
    vehicle?.extracted?.brand ||
    vehicle?.brandName ||
    "";

  /* =========================================================
     IMAGE
  ========================================================= */

  const image =
    vehicle?.image ||
    vehicle?.imageUrl ||
    vehicle?.metadata?.image ||
    vehicle?.metadata?.imageUrl ||
    vehicle?.extracted?.image ||
    vehicle?.extracted?.imageUrl ||
    vehicle?.media?.image ||
    vehicle?.media?.imageUrl ||
    vehicle?.payload?.image ||
    vehicle?.payload?.metadata?.image ||
    vehicle?.images?.[0] ||
    vehicle?.media?.images?.[0] ||
    null;

  /* =========================================================
     COMPARE LIST
  ========================================================= */

  useEffect(() => {
    setMounted(true);

    function loadCompareList() {
      try {
        const saved =
          localStorage.getItem(
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

  /* =========================================================
     SAVE COMPARE LIST
  ========================================================= */

  function saveCompareList(list) {
    setCompareList(list);

    try {
      localStorage.setItem(
        COMPARE_STORAGE_KEY,
        JSON.stringify(list)
      );

      window.dispatchEvent(
        new CustomEvent(
          "evinsights-compare-updated"
        )
      );
    } catch (error) {
      console.error(
        "Failed to save comparison list:",
        error
      );
    }
  }

  /* =========================================================
     CHECK SELECTED
  ========================================================= */

  function isSelected() {
    return compareList.some(
      (item) =>
        item?.slug === slug ||
        item?.id === vehicle?.id
    );
  }

  /* =========================================================
     COMPARE
  ========================================================= */

  function handleCompare(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!mounted) {
      return;
    }

    const selected = isSelected();

    /* REMOVE */

    if (selected) {
      const updated =
        compareList.filter(
          (item) =>
            item?.slug !== slug &&
            item?.id !== vehicle?.id
        );

      saveCompareList(updated);

      return;
    }

    /* MAX 4 */

    if (compareList.length >= 4) {
      alert(
        "You can compare up to 4 EVs at once."
      );

      return;
    }

    /* ADD */

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

  /* =========================================================
     OPEN COMPARE
  ========================================================= */

  function openCompare(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!compareList.length) {
      return;
    }

    const slugs = compareList
      .map((item) => item?.slug)
      .filter(Boolean)
      .join(",");

    if (!slugs) {
      return;
    }

    router.push(
      `/compare?slugs=${encodeURIComponent(slugs)}`
    );
  }

  const selected =
    mounted && isSelected();

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <article className="vehicle-card">

      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div className="vehicle-card-media">

        {image ? (
          <img
            src={image}
            alt={name}
            className="vehicle-card-image"
            loading="lazy"
          />
        ) : (
          <div className="vehicle-card-placeholder">
            <span>EV</span>
          </div>
        )}

        {/* BODY TYPE */}

        <span className="vehicle-card-badge">
          {bodyType}
        </span>

        {/* COMPARE BUTTON */}

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

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <Link
        href={`/vehicles/${slug}`}
        className="vehicle-card-link"
      >

        <div className="vehicle-card-content">

          {/* BRAND */}

          <div className="vehicle-card-brand">
            {brandName || "EVINSIGHTS"}
          </div>

          {/* NAME */}

          <h3 className="vehicle-card-title">
            {name}
          </h3>

          {/* =================================================
              SPECS
          ================================================= */}

          <div className="vehicle-card-specs">

            {/* RANGE */}

            <div className="vehicle-card-spec">

              <span className="vehicle-card-spec-label">
                Range
              </span>

              <strong className="vehicle-card-spec-value">
                {range !== null &&
                range !== undefined &&
                range !== ""
                  ? `${range} km`
                  : "—"}
              </strong>

            </div>

            {/* BATTERY */}

            <div className="vehicle-card-spec">

              <span className="vehicle-card-spec-label">
                Battery
              </span>

              <strong className="vehicle-card-spec-value">
                {battery !== null &&
                battery !== undefined &&
                battery !== ""
                  ? `${battery} kWh`
                  : "—"}
              </strong>

            </div>

            {/* PRICE */}

            <div className="vehicle-card-spec vehicle-card-spec--price">

              <span className="vehicle-card-spec-label">
                Price
              </span>

              <strong
                className="vehicle-card-spec-value vehicle-card-price"
                title={formattedPrice}
              >
                {formattedPrice}
              </strong>

            </div>

          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="vehicle-card-footer">

            <span>
              View details
            </span>

            <span
              aria-hidden="true"
              className="vehicle-card-arrow"
            >
              →
            </span>

          </div>

        </div>

      </Link>

      {/* =====================================================
          COMPARE BAR
      ===================================================== */}

      {mounted &&
        compareList.length > 0 && (

          <div className="vehicle-card-compare-bar">

            <div className="vehicle-card-compare-count">

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
              className="vehicle-card-compare-now"
            >
              Compare now →
            </button>

          </div>

        )}

    </article>
  );
}