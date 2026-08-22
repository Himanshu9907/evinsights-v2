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
      ).toLocaleString("en-US")}`
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
