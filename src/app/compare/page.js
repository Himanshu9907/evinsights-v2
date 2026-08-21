// import { getAllVehicles } from "@/server/repositories/vehicle.repository";
// import { compareVehicles } from "@/server/services/comparison.service";
// import CompareTable from "@/components/compare-table";
// export const dynamic='force-dynamic';
// export default async function Compare({searchParams}){const p=await searchParams;const slugs=String(p?.slugs||'').split(',').filter(Boolean).slice(0,4);const vehicles=await getAllVehicles();const selected=slugs.length?await compareVehicles(slugs):[];return <main className="shell"><section className="page-hero"><span className="eyebrow">Comparison studio</span><h1>Put EVs head-to-head.</h1><p>Select cars from the catalog, or open any vehicle page and tap <strong>+ Compare</strong>. Up to four EVs can be compared at once.</p></section><CompareTable selected={selected} vehicles={vehicles}/></main>}


import { getAllVehicles } from "@/server/repositories/vehicle.repository";
import { compareVehicles } from "@/server/services/comparison.service";
import CompareTable from "@/components/compare-table";

export const dynamic = "force-dynamic";

export default async function Compare({ searchParams }) {
  const params = await searchParams;

  const slugs = String(params?.slugs || "")
    .split(",")
    .filter(Boolean)
    .slice(0, 4);

  const vehicles = await getAllVehicles();

  const selected = slugs.length
    ? await compareVehicles(slugs)
    : [];

  return (
    <main className="compare-page">

      {/* HERO */}
      <section className="compare-hero">
        <div className="shell">

          <div className="compare-hero__content">

            <span className="eyebrow">
              Comparison studio
            </span>

            <h1>
              Put EVs
              <span> head-to-head.</span>
            </h1>

            <p>
              Compare electric vehicles side-by-side and
              understand the differences that actually matter.
              Explore range, battery, performance, pricing,
              charging and more.
            </p>

            <div className="compare-hero__badges">
              <span>
                <strong>4</strong>
                EVs at once
              </span>

              <span>
                Range & battery
              </span>

              <span>
                Pricing
              </span>

              <span>
                Performance
              </span>
            </div>

          </div>

          <div className="compare-hero__visual">

            <div className="compare-hero__glow" />

            <div className="compare-hero__orb">
              <span>VS</span>
            </div>

            <div className="compare-hero__card compare-hero__card--left">
              <span>EV</span>
              <strong>01</strong>
            </div>

            <div className="compare-hero__card compare-hero__card--right">
              <span>EV</span>
              <strong>02</strong>
            </div>

          </div>

        </div>
      </section>

      {/* COMPARISON AREA */}
      <section className="compare-content">
        <div className="shell">

          <div className="compare-section-head">

            <div>
              <span className="eyebrow">
                Your comparison
              </span>

              <h2>
                Compare your EVs.
              </h2>

              <p>
                Select up to four electric vehicles
                from the catalog.
              </p>
            </div>

            <div className="compare-count">
              <strong>{selected.length}</strong>
              <span>/ 4 selected</span>
            </div>

          </div>

          <div className="compare-table-wrap">
            <CompareTable
              selected={selected}
              vehicles={vehicles}
            />
          </div>

        </div>
      </section>

      {/* INFO */}
      <section className="section section-muted compare-info">
        <div className="shell">

          <div className="compare-info__grid">

            <div>
              <span className="eyebrow">
                Smarter decisions
              </span>

              <h2>
                See the differences
                <span> clearly.</span>
              </h2>
            </div>

            <div className="compare-info__items">

              <article>
                <span>01</span>
                <div>
                  <h3>Range</h3>
                  <p>
                    Understand which EV can take you
                    further between charges.
                  </p>
                </div>
              </article>

              <article>
                <span>02</span>
                <div>
                  <h3>Battery</h3>
                  <p>
                    Compare battery capacity and
                    understand the technology underneath.
                  </p>
                </div>
              </article>

              <article>
                <span>03</span>
                <div>
                  <h3>Performance</h3>
                  <p>
                    Compare power, acceleration,
                    torque and top speed.
                  </p>
                </div>
              </article>

              <article>
                <span>04</span>
                <div>
                  <h3>Pricing</h3>
                  <p>
                    See pricing differences and choose
                    the EV that fits your budget.
                  </p>
                </div>
              </article>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}