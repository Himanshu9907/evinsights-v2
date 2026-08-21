// import Link from "next/link";
// import VehicleCard from "@/components/vehicle-card";
// import { getBrandBySlug } from "@/server/repositories/brand.repository";
// import { getAllVehicles } from "@/server/repositories/vehicle.repository";
// export async function generateMetadata({params}){const {slug}=await params;const b=await getBrandBySlug(slug);return {title:b?`${b.name} Electric Cars | EVInsights Hub`:"Brand not found"}}
// export const dynamic='force-dynamic';

// export default async function BrandPage({params}){const {slug}=await params;const brand=await getBrandBySlug(slug);if(!brand)return <main className="shell page-hero"><h1>Brand not found</h1><Link className="btn btn-primary" href="/brands">Back to brands</Link></main>;const vehicles=(await getAllVehicles()).filter(v=>v.brandId===brand.id);return <main className="shell"><section className="page-hero"><span className="eyebrow">Electric manufacturer</span><h1>{brand.name} EVs</h1><p>Explore {brand.name} electric vehicles, compare models and open detailed source-backed profiles.</p></section><section className="section" style={{paddingTop:0}}><div className="vehicle-grid">{vehicles.map(v=><VehicleCard key={v.id} vehicle={v} brand={brand}/>)}</div></section></main>}


import Link from "next/link";
import VehicleCard from "@/components/vehicle-card";

import { getBrandBySlug } from "@/server/repositories/brand.repository";
import { getAllVehicles } from "@/server/repositories/vehicle.repository";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const brand = await getBrandBySlug(slug);

  return {
    title: brand
      ? `${brand.name} Electric Cars | EVInsights Hub`
      : "Brand not found | EVInsights Hub",
  };
}

export const dynamic = "force-dynamic";

export default async function BrandPage({ params }) {
  const { slug } = await params;

  const brand = await getBrandBySlug(slug);

  if (!brand) {
    return (
      <main className="shell">
        <section className="page-hero">
          <span className="eyebrow">EVInsights</span>

          <h1>Brand not found.</h1>

          <p>
            We couldn't find the manufacturer you're looking for.
          </p>

          <Link
            href="/brands"
            className="btn btn-primary"
          >
            ← Back to brands
          </Link>
        </section>
      </main>
    );
  }

  const allVehicles = await getAllVehicles();

  const vehicles = allVehicles.filter(
    (vehicle) => vehicle.brandId === brand.id
  );

  const approvedVehicles = vehicles.filter(
    (vehicle) =>
      vehicle?.verification?.status === "approved"
  );

  const featuredVehicles = approvedVehicles
    .filter(
      (vehicle) =>
        vehicle?.metadata?.featured === true
    )
    .slice(0, 4);

  const displayVehicles =
    featuredVehicles.length > 0
      ? featuredVehicles
      : approvedVehicles.slice(0, 4);

  const averageRange = (() => {
    const ranges = vehicles
      .map(
        (vehicle) =>
          vehicle?.extracted?.specs?.range ??
          vehicle?.extracted?.specs?.rangeKm ??
          vehicle?.specifications?.range ??
          vehicle?.specifications?.rangeKm
      )
      .filter(
        (value) =>
          typeof value === "number" && value > 0
      );

    if (!ranges.length) return null;

    return Math.round(
      ranges.reduce((sum, value) => sum + value, 0) /
        ranges.length
    );
  })();

  const brandDescription =
    brand?.description ||
    brand?.summary ||
    `Explore ${brand.name} electric vehicles, specifications, pricing, charging information, comparisons and detailed EV insights.`;

  return (
    <main className="shell brand-page">

      {/* =========================================
          BRAND HERO
      ========================================= */}

      <section className="brand-hero">

        <div className="brand-hero__content">

          <span className="eyebrow">
            Electric manufacturer
          </span>

          <h1>
            {brand.name}
            <span> electric cars.</span>
          </h1>

          <p>
            {brandDescription}
          </p>

          <div className="brand-hero__actions">

            <Link
              href={`/cars?brand=${brand.id}`}
              className="btn btn-primary"
            >
              Explore all {brand.name} EVs →
            </Link>

            <Link
              href="/compare"
              className="btn btn-secondary"
            >
              Compare EVs
            </Link>

          </div>

        </div>

        <div className="brand-hero__visual">

          <div className="brand-hero__glow" />

          <div className="brand-hero__mark">
            {(brand.name || "EV")
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <span>
            EVINSIGHTS / MANUFACTURER
          </span>

        </div>

      </section>


      {/* =========================================
          BRAND STATS
      ========================================= */}

      <section className="brand-stats">

        <div className="brand-stat">
          <strong>{vehicles.length}</strong>
          <span>EV Models</span>
        </div>

        <div className="brand-stat">
          <strong>{approvedVehicles.length}</strong>
          <span>Verified Models</span>
        </div>

        <div className="brand-stat">
          <strong>
            {averageRange
              ? `${averageRange} km`
              : "—"}
          </strong>
          <span>Average Range</span>
        </div>

        <div className="brand-stat">
          <strong>Global</strong>
          <span>EV Coverage</span>
        </div>

      </section>


      {/* =========================================
          FEATURED MODELS
      ========================================= */}

      {displayVehicles.length > 0 && (
        <section className="section brand-models">

          <div className="section-head">

            <div>
              <span className="eyebrow">
                Featured models
              </span>

              <h2>
                Popular {brand.name} EVs.
              </h2>

              <p className="section-lead">
                Explore electric vehicles from{" "}
                {brand.name} currently tracked
                by EVInsights.
              </p>
            </div>

            <Link
              href={`/cars?brand=${brand.id}`}
              className="btn btn-secondary"
            >
              View all models →
            </Link>

          </div>

          <div className="vehicle-grid">

            {displayVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                brand={brand}
              />
            ))}

          </div>

        </section>
      )}


      {/* =========================================
          ALL MODELS
      ========================================= */}

      {approvedVehicles.length > displayVehicles.length && (
        <section className="section brand-all-models">

          <div className="section-head">

            <div>
              <span className="eyebrow">
                Full catalog
              </span>

              <h2>
                All {brand.name} EVs.
              </h2>
            </div>

          </div>

          <div className="vehicle-grid">

            {approvedVehicles
              .slice(displayVehicles.length)
              .map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  brand={brand}
                />
              ))}

          </div>

        </section>
      )}


      {/* =========================================
          BRAND INFORMATION
      ========================================= */}

      <section className="section brand-about">

        <div className="brand-about__inner">

          <div>
            <span className="eyebrow">
              About the manufacturer
            </span>

            <h2>
              {brand.name}
              <span> at EVInsights.</span>
            </h2>
          </div>

          <div className="brand-about__content">

            <p>
              EVInsights brings together structured
              electric vehicle information from multiple
              sources so you can understand each model
              before making a decision.
            </p>

            <p>
              Explore specifications, range, battery,
              charging, pricing, comparisons and
              source-backed vehicle information for{" "}
              {brand.name}.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================
          FINAL CTA
      ========================================= */}

      <section className="brand-cta">

        <div>

          <span className="eyebrow">
            Continue exploring
          </span>

          <h2>
            Compare {brand.name} EVs
            <span> with the rest.</span>
          </h2>

          <p>
            Put your favorite electric cars
            side-by-side and see how they compare.
          </p>

        </div>

        <div className="brand-cta__actions">

          <Link
            href={`/cars?brand=${brand.id}`}
            className="btn btn-primary"
          >
            Explore {brand.name} →
          </Link>

          <Link
            href="/compare"
            className="btn btn-secondary"
          >
            Comparison studio
          </Link>

        </div>

      </section>

    </main>
  );
}

