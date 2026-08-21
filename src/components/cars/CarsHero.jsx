import Link from "next/link";

export default function CarsHero({
  query = "",
  vehicleCount = 0,
}) {
  return (
    <section className="cars-hero">

      <div className="shell">

        <div className="cars-hero__content">

          <span className="eyebrow">
            EV directory
          </span>

          <h1>
            Electric cars,
            <span> properly organized.</span>
          </h1>

          <p>
            Explore electric vehicles from global
            manufacturers. Compare specifications,
            range, battery technology, charging,
            pricing and more.
          </p>

          <form
            className="cars-hero__search"
            action="/cars"
          >

            <div className="cars-hero__search-box">

              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                />

                <path d="m16 16 5 5" />
              </svg>

              <input
                name="q"
                type="search"
                defaultValue={query}
                placeholder="Search Tesla Model Y, BMW iX..."
              />

            </div>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Search EVs →
            </button>

          </form>

          <div className="cars-hero__meta">

            <span>
              <strong>{vehicleCount}</strong>
              EVs available
            </span>

            <span>
              Source-backed data
            </span>

            <span>
              Regularly updated
            </span>

          </div>

        </div>

        <div className="cars-hero__visual">

          <div className="cars-hero__glow" />

          <div className="cars-hero__orb">
            <span>EV</span>
          </div>

          <div className="cars-hero__floating cars-hero__floating--top">
            <span>Explore</span>
            <strong>EVs</strong>
          </div>

          <div className="cars-hero__floating cars-hero__floating--bottom">
            <span>Compare</span>
            <strong>Cars</strong>
          </div>

        </div>

      </div>

    </section>
  );
}