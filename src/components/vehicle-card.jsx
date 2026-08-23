// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useCurrency } from "@/context/CurrencyContext";

// const COMPARE_STORAGE_KEY = "evinsights-compare";

// export default function VehicleCard({ vehicle, brand }) {
//   const router = useRouter();
//   const { formatPrice } = useCurrency();

//   const [compareList, setCompareList] = useState([]);
//   const [mounted, setMounted] = useState(false);

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
//     "";

//   const image =
//     vehicle?.metadata?.image ||
//     vehicle?.media?.image ||
//     vehicle?.image ||
//     vehicle?.payload?.metadata?.image ||
//     null;

//   /* =========================================================
//      LOAD COMPARE LIST
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
//         item.slug === slug ||
//         item.id === vehicle?.id
//     );
//   }

//   /* =========================================================
//      HANDLE COMPARE
//   ========================================================= */

//   function handleCompare(event) {
//     event.preventDefault();
//     event.stopPropagation();

//     if (!mounted) return;

//     const selected = isSelected();

//     if (selected) {
//       const updated = compareList.filter(
//         (item) =>
//           item.slug !== slug &&
//           item.id !== vehicle?.id
//       );

//       saveCompareList(updated);
//       return;
//     }

//     if (compareList.length >= 4) {
//       alert(
//         "You can compare up to 4 EVs at once."
//       );
//       return;
//     }

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

//     if (!compareList.length) return;

//     const slugs = compareList
//       .map((item) => item.slug)
//       .filter(Boolean)
//       .join(",");

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

//       <Link
//         href={`/vehicles/${slug}`}
//         className="vehicle-card-link"
//       >

//         {/* ===================================================
//             IMAGE
//         =================================================== */}

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

//           {/* =================================================
//               COMPARE BUTTON
//           ================================================= */}

//           <button
//             type="button"
//             className={`vehicle-card-compare ${
//               selected
//                 ? "vehicle-card-compare--active"
//                 : ""
//             }`}
//             onClick={handleCompare}
//             aria-label={
//               selected
//                 ? `Remove ${name} from comparison`
//                 : `Add ${name} to comparison`
//             }
//           >
//             <span className="vehicle-card-compare__icon">
//               {selected ? "✓" : "+"}
//             </span>

//             <span>
//               {selected
//                 ? "Added"
//                 : "Compare"}
//             </span>
//           </button>

//         </div>

//         {/* ===================================================
//             CARD CONTENT
//         =================================================== */}

//         <div className="vehicle-card-content">

//           <div className="vehicle-card-brand">
//             {brandName || "EVINSIGHTS"}
//           </div>

//           <h3>{name}</h3>

//           <div className="vehicle-card-specs">

//             {/* RANGE */}

//             <div>
//               <span>Range</span>

//               <strong>
//                 {range != null
//                   ? `${range} km`
//                   : "—"}
//               </strong>
//             </div>

//             {/* BATTERY */}

//             <div>
//               <span>Battery</span>

//               <strong>
//                 {battery != null
//                   ? `${battery} kWh`
//                   : "—"}
//               </strong>
//             </div>

//             {/* PRICE */}

//             <div>
//               <span>Price</span>

//               <strong>
//                 {price?.amount != null
//                   ? formatPrice(
//                       price.amount,
//                       price.currency || "INR"
//                     )
//                   : price != null
//                     ? String(price)
//                     : "—"}
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

//             <span aria-hidden="true">
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

//             <div>
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

  const { currency, formatPrice } = useCurrency();

  const [compareList, setCompareList] = useState([]);
  const [mounted, setMounted] = useState(false);

  /* =========================================================
     BASIC VEHICLE DATA
  ========================================================= */

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
    vehicle?.price ??
    null;

  const brandName =
    brand?.name ||
    vehicle?.identity?.brandName ||
    "";

  /* =========================================================
     IMAGE
  ========================================================= */

  const image =
    vehicle?.image ||
    vehicle?.metadata?.image ||
    vehicle?.metadata?.imageUrl ||
    vehicle?.media?.image ||
    vehicle?.payload?.metadata?.image ||
    null;

  /* =========================================================
     PRICE NORMALIZATION
  ========================================================= */

  function getPriceAmount() {
    if (price == null) {
      return null;
    }

    if (typeof price === "number") {
      return price;
    }

    if (typeof price === "string") {
      const numeric = Number(
        price.replace(/[^\d.-]/g, "")
      );

      return Number.isFinite(numeric)
        ? numeric
        : null;
    }

    if (typeof price === "object") {
      const amount =
        price.amount ??
        price.value ??
        price.price ??
        null;

      const numeric = Number(amount);

      return Number.isFinite(numeric)
        ? numeric
        : null;
    }

    return null;
  }

  function getOriginalCurrency() {
    if (!price || typeof price !== "object") {
      return "INR";
    }

    const raw =
      price.currencyCode ||
      price.currency ||
      price.currency_code ||
      "INR";

    const normalized = String(raw)
      .trim()
      .toUpperCase();

    const currencyMap = {
      "$": "USD",
      "US$": "USD",
      "USD": "USD",

      "€": "EUR",
      "EUR": "EUR",

      "£": "GBP",
      "GBP": "GBP",

      "₹": "INR",
      "INR": "INR",

      "¥": "JPY",
      "JPY": "JPY",
    };

    return currencyMap[normalized] || "INR";
  }

  const priceAmount = getPriceAmount();

  const originalCurrency = getOriginalCurrency();

  const formattedPrice =
    priceAmount != null
      ? formatPrice(
          priceAmount,
          originalCurrency
        )
      : "—";

  /* =========================================================
     COMPARE LIST
  ========================================================= */

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
     ADD / REMOVE COMPARE
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
          MEDIA
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

        {/* =================================================
            COMPARE BUTTON
            IMPORTANT:
            Button is outside Link
        ================================================= */}

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
          CLICKABLE CONTENT
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
                {range != null
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
                {battery != null
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