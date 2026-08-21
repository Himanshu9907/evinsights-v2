"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function CarsToolbar({
  query = "",
  brand = "",
  bodyType = "",
  sort = "featured",
  brands = [],
  bodyTypes = [],
}) {
  const router = useRouter();
  const currentParams = useSearchParams();

  function updateFilter(key, value) {
    const params = new URLSearchParams(
      currentParams.toString()
    );

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/cars?${params.toString()}`);
  }

  function clearFilters() {
    const params = new URLSearchParams();

    if (query) {
      params.set("q", query);
    }

    router.push(
      params.toString()
        ? `/cars?${params.toString()}`
        : "/cars"
    );
  }

  const hasFilters =
    Boolean(brand) ||
    Boolean(bodyType) ||
    sort !== "featured";

  return (
    <div className="cars-toolbar">

      <div className="cars-toolbar__filters">

        <div className="cars-filter">

          <label>Brand</label>

          <select
            value={brand}
            onChange={(event) =>
              updateFilter(
                "brand",
                event.target.value
              )
            }
          >
            <option value="">
              All brands
            </option>

            {brands.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>
            ))}
          </select>

        </div>

        <div className="cars-filter">

          <label>Body type</label>

          <select
            value={bodyType}
            onChange={(event) =>
              updateFilter(
                "bodyType",
                event.target.value
              )
            }
          >
            <option value="">
              All types
            </option>

            {bodyTypes.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>

        </div>

        <div className="cars-filter">

          <label>Sort by</label>

          <select
            value={sort}
            onChange={(event) =>
              updateFilter(
                "sort",
                event.target.value
              )
            }
          >
            <option value="featured">
              Featured
            </option>

            <option value="rating">
              Highest rated
            </option>

            <option value="range">
              Longest range
            </option>

            <option value="price-low">
              Price: low to high
            </option>

            <option value="price-high">
              Price: high to low
            </option>
          </select>

        </div>

      </div>

      <div className="cars-toolbar__right">

        {hasFilters && (
          <button
            type="button"
            className="cars-clear"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        )}

        <span className="cars-toolbar__label">
          Refine your search
        </span>

      </div>

    </div>
  );
}