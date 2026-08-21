// import Link from "next/link";
// import { getAllBrands } from "@/server/repositories/brand.repository";
// import { getAllVehicles } from "@/server/repositories/vehicle.repository";
// export const dynamic='force-dynamic';

// export default async function Brands(){const [brands,vehicles]=await Promise.all([getAllBrands(),getAllVehicles()]);return <main className="shell"><section className="page-hero"><span className="eyebrow">Manufacturers</span><h1>Explore EV brands.</h1><p>Browse every manufacturer represented in the EVInsights catalog.</p></section><div className="feature-grid">{brands.map(b=><Link className="feature" href={`/brands/${b.slug}`} key={b.id}><span className="eyebrow">{vehicles.filter(v=>v.brandId===b.id).length} EVs</span><h3>{b.name}</h3><p>View models, pricing, comparisons, reviews and latest brand insights.</p><span className="btn btn-secondary">Open brand →</span></Link>)}</div></main>}


import Link from "next/link";
import { getAllBrands } from "@/server/repositories/brand.repository";
import { getAllVehicles } from "@/server/repositories/vehicle.repository";

export const dynamic = "force-dynamic";

export default async function Brands() {
  const [brands, vehicles] = await Promise.all([
    getAllBrands(),
    getAllVehicles(),
  ]);

  const brandStats = brands.map((brand) => {
    const brandVehicles = vehicles.filter(
      (vehicle) => vehicle.brandId === brand.id
    );

    return {
      ...brand,
      vehicleCount: brandVehicles.length,
    };
  });

  const totalVehicles = vehicles.length;
  const totalBrands = brands.length;

  const sortedBrands = [...brandStats].sort(
    (a, b) => b.vehicleCount - a.vehicleCount
  );

  const popularBrands = sortedBrands
    .filter((brand) => brand.vehicleCount > 0)
    .slice(0, 5);

  return (
    <main className="brands-page">

      {/* =====================================
          HERO
      ===================================== */}

      <section className="brands-hero">
        <div className="shell brands-hero__inner">

          <div className="brands-hero__content">

            <span className="eyebrow">
              EV manufacturers
            </span>

            <h1>
              Explore the brands
              <span> shaping electric mobility.</span>
            </h1>

            <p>
              Discover electric vehicles from manufacturers
              around the world. Explore models, pricing,
              specifications, comparisons and insights.
            </p>

            <div className="brands-hero__actions">
              <Link
                href="/cars"
                className="btn btn-primary"
              >
                Explore all EVs →
              </Link>

              <Link
                href="/compare"
                className="btn btn-secondary"
              >
                Compare EVs
              </Link>
            </div>

          </div>

          <div className="brands-hero__visual">

            <div className="brands-hero__orb">
              <span>EV</span>
            </div>

            <div className="brands-hero__floating brands-hero__floating--top">
              <strong>{totalBrands}</strong>
              <span>Brands</span>
            </div>

            <div className="brands-hero__floating brands-hero__floating--bottom">
              <strong>{totalVehicles}</strong>
              <span>EVs tracked</span>
            </div>

            <span className="brands-hero__label">
              EVINSIGHTS / MANUFACTURERS
            </span>

          </div>

        </div>
      </section>


      {/* =====================================
          STATS
      ===================================== */}

      <section className="brands-stats">
        <div className="shell brands-stats__grid">

          <div className="brands-stat">
            <strong>{totalBrands}+</strong>
            <span>Manufacturers</span>
          </div>

          <div className="brands-stat">
            <strong>{totalVehicles}+</strong>
            <span>Electric vehicles</span>
          </div>

          <div className="brands-stat">
            <strong>
              {popularBrands.length}
            </strong>
            <span>Featured brands</span>
          </div>

          <div className="brands-stat">
            <strong>Live</strong>
            <span>Catalog updates</span>
          </div>

        </div>
      </section>


      {/* =====================================
          POPULAR BRANDS
      ===================================== */}

      {popularBrands.length > 0 && (
        <section className="section brands-popular">

          <div className="shell">

            <div className="section-head">

              <div>
                <span className="eyebrow">
                  Popular manufacturers
                </span>

                <h2>
                  Brands with the most EVs.
                </h2>

                <p className="section-lead">
                  Start exploring some of the most represented
                  manufacturers in the EVInsights catalog.
                </p>
              </div>

            </div>


            <div className="brands-popular-grid">

              {popularBrands.map((brand, index) => (
                <Link
                  key={brand.id}
                  href={`/brands/${brand.slug}`}
                  className="brands-popular-card"
                >

                  <span className="brands-card-number">
                    0{index + 1}
                  </span>

                  <div className="brands-card-mark">
                    {(brand.name || "EV")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  <div className="brands-card-content">

                    <span className="brands-card-count">
                      {brand.vehicleCount}{" "}
                      {brand.vehicleCount === 1
                        ? "EV"
                        : "EVs"}
                    </span>

                    <h3>{brand.name}</h3>

                    <span className="brands-card-link">
                      Explore brand →
                    </span>

                  </div>

                </Link>
              ))}

            </div>

          </div>

        </section>
      )}


      {/* =====================================
          ALL BRANDS
      ===================================== */}

      <section className="section section-muted brands-directory">

        <div className="shell">

          <div className="section-head">

            <div>
              <span className="eyebrow">
                Complete directory
              </span>

              <h2>
                Every EV brand in one place.
              </h2>

              <p className="section-lead">
                Browse the complete EVInsights manufacturer
                catalog.
              </p>
            </div>

            <span className="brands-total">
              {totalBrands} brands
            </span>

          </div>


          <div className="brands-grid">

            {brandStats.map((brand, index) => (
              <Link
                key={brand.id}
                href={`/brands/${brand.slug}`}
                className="brand-directory-card"
              >

                <div className="brand-directory-card__top">

                  <span className="brand-directory-card__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="brand-directory-card__mark">
                    {(brand.name || "EV")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>

                </div>


                <div className="brand-directory-card__body">

                  <h3>
                    {brand.name}
                  </h3>

                  <span>
                    {brand.vehicleCount}{" "}
                    {brand.vehicleCount === 1
                      ? "electric vehicle"
                      : "electric vehicles"}
                  </span>

                </div>


                <div className="brand-directory-card__footer">

                  <span>
                    View brand
                  </span>

                  <span aria-hidden="true">
                    →
                  </span>

                </div>

              </Link>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================
          CTA
      ===================================== */}

      <section className="brands-final-cta">

        <div className="shell">

          <div className="brands-final-cta__inner">

            <div>

              <span className="eyebrow">
                Find your next EV
              </span>

              <h2>
                Know the brand.
                <span> Know your options.</span>
              </h2>

              <p>
                Explore the complete electric vehicle catalog,
                compare your favorites and make your next EV
                decision with confidence.
              </p>

            </div>


            <div className="brands-final-cta__actions">

              <Link
                href="/cars"
                className="btn btn-primary"
              >
                Browse EVs →
              </Link>

              <Link
                href="/compare"
                className="btn btn-secondary"
              >
                Compare cars
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}