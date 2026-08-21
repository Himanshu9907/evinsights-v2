// import Link from "next/link";
// import { getContentBySlug } from "@/server/repositories/content.repository";
// export async function generateMetadata({params}){const {slug}=await params;const r=await getContentBySlug(slug);return {title:r?`${r.title} | EVInsights Hub`:"Review not found"}}
// function render(body){return body.split(/\n\n/).map((p,i)=>p.startsWith('## ')?<h2 key={i}>{p.slice(3)}</h2>:<p key={i}>{p}</p>)}
// export const dynamic='force-dynamic';

// export default async function Review({params}){const {slug}=await params;const r=await getContentBySlug(slug);if(!r||r.type!=='review')return <main className="shell page-hero"><h1>Review not found</h1><Link className="btn btn-primary" href="/reviews">Back to reviews</Link></main>;return <main className="shell"><section className="page-hero"><span className="eyebrow">{r.category}</span><h1>{r.title}</h1><p>{r.excerpt}</p></section><article className="article-body">{render(r.content)}</article><section className="section"><Link className="btn btn-secondary" href="/reviews">← All reviews</Link></section></main>}


// src/app/reviews/[slug]/page.js

import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllContent } from "@/server/repositories/content.repository";
import { getAllVehicles } from "@/server/repositories/vehicle.repository";

export const dynamic = "force-dynamic";

function getVehicleName(vehicle) {
  return (
    vehicle?.identity?.name ||
    vehicle?.name ||
    vehicle?.title ||
    "Electric Vehicle"
  );
}

function getVehicleSlug(vehicle) {
  return (
    vehicle?.identity?.slug ||
    vehicle?.slug ||
    vehicle?.id ||
    ""
  );
}

function getVehicleRange(vehicle) {
  return (
    vehicle?.extracted?.specs?.range ??
    vehicle?.extracted?.specs?.rangeKm ??
    vehicle?.specifications?.range ??
    vehicle?.specifications?.rangeKm ??
    vehicle?.rangeKm ??
    null
  );
}

function getVehicleBattery(vehicle) {
  return (
    vehicle?.extracted?.specs?.battery ??
    vehicle?.extracted?.specs?.batteryKwh ??
    vehicle?.specifications?.battery ??
    vehicle?.specifications?.batteryKwh ??
    vehicle?.batteryKwh ??
    null
  );
}

function getVehicleBodyType(vehicle) {
  return (
    vehicle?.classification?.bodyType ||
    vehicle?.extracted?.specs?.bodyType ||
    "Electric"
  );
}

function getReviewContent(review) {
  return (
    review?.content ||
    review?.body ||
    review?.article ||
    review?.description ||
    review?.excerpt ||
    "Review content is currently unavailable."
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const items = await getAllContent();

  const review = items.find(
    (item) =>
      item?.type === "review" &&
      item?.slug === slug
  );

  if (!review) {
    return {
      title: "Review not found | EVInsights Hub",
    };
  }

  return {
    title: `${review.title} | EVInsights Hub`,
    description:
      review.excerpt ||
      review.description ||
      "Read the latest EV review on EVInsights Hub.",
  };
}

export default async function ReviewPage({ params }) {
  const { slug } = await params;

  const [items, vehicles] = await Promise.all([
    getAllContent(),
    getAllVehicles(),
  ]);

  const review = items.find(
    (item) =>
      item?.type === "review" &&
      item?.slug === slug
  );

  if (!review) {
    notFound();
  }

  const vehicleId = review?.vehicleIds?.[0];

  const vehicle =
    vehicles.find(
      (item) => item?.id === vehicleId
    ) || null;

  const vehicleName = getVehicleName(vehicle);
  const vehicleSlug = getVehicleSlug(vehicle);

  const range = getVehicleRange(vehicle);
  const battery = getVehicleBattery(vehicle);
  const bodyType = getVehicleBodyType(vehicle);

  const content = getReviewContent(review);

  const paragraphs =
    typeof content === "string"
      ? content
          .split(/\n+/)
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  return (
    <main className="review-detail-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="review-detail-hero">
        <div className="shell">

          <Link
            href="/reviews"
            className="review-back"
          >
            ← Back to reviews
          </Link>

          <div className="review-detail-hero-grid">

            <div className="review-detail-hero-content">

              <div className="review-meta">
                <span className="review-category">
                  {review.category || "EV REVIEW"}
                </span>

                <span className="review-meta-dot">
                  •
                </span>

                <span>
                  Source-backed review
                </span>
              </div>

              <h1>
                {review.title}
              </h1>

              {review.excerpt && (
                <p className="review-hero-excerpt">
                  {review.excerpt}
                </p>
              )}

              {vehicle && (
                <div className="review-vehicle-link">

                  <span>
                    Reviewing
                  </span>

                  <Link
                    href={`/vehicles/${vehicleSlug}`}
                  >
                    {vehicleName} →
                  </Link>

                </div>
              )}

            </div>

            {/* Hero side card */}

            <div className="review-hero-card">

              <span className="eyebrow">
                EVINSIGHTS
              </span>

              <strong>
                Review
              </strong>

              <p>
                Facts, specifications and
                structured vehicle information
                brought together in one place.
              </p>

            </div>

          </div>
        </div>
      </section>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <section className="review-detail-main">

        <div className="shell">

          <div className="review-detail-layout">

            {/* Article */}

            <article className="review-article">

              <div className="review-article-header">

                <span className="eyebrow">
                  Expert insight
                </span>

                <h2>
                  {review.title}
                </h2>

              </div>

              <div className="review-article-content">

                {paragraphs.length > 0 ? (
                  paragraphs.map(
                    (paragraph, index) => (
                      <p key={index}>
                        {paragraph}
                      </p>
                    )
                  )
                ) : (
                  <p>
                    Review content is currently
                    unavailable.
                  </p>
                )}

              </div>

            </article>


            {/* Sidebar */}

            <aside className="review-sidebar">

              {/* Vehicle card */}

              {vehicle && (
                <div className="review-sidebar-card">

                  <span className="eyebrow">
                    Vehicle
                  </span>

                  <h3>
                    {vehicleName}
                  </h3>

                  <div className="review-spec-list">

                    <div>
                      <span>
                        Body type
                      </span>

                      <strong>
                        {bodyType}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Range
                      </span>

                      <strong>
                        {range != null
                          ? `${range} km`
                          : "—"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Battery
                      </span>

                      <strong>
                        {battery != null
                          ? `${battery} kWh`
                          : "—"}
                      </strong>
                    </div>

                  </div>

                  <Link
                    href={`/vehicles/${vehicleSlug}`}
                    className="btn btn-primary review-sidebar-button"
                  >
                    View vehicle →
                  </Link>

                </div>
              )}


              {/* Source card */}

              <div className="review-source-card">

                <span className="eyebrow">
                  Data philosophy
                </span>

                <h3>
                  Built around traceable data.
                </h3>

                <p>
                  EVInsights separates published
                  information from missing data and
                  keeps vehicle records structured
                  for continuous updates.
                </p>

              </div>

            </aside>

          </div>

        </div>

      </section>


      {/* =========================
          BOTTOM CTA
      ========================= */}

      <section className="review-detail-cta">

        <div className="shell">

          <div className="review-detail-cta-inner">

            <div>

              <span className="eyebrow">
                Keep exploring
              </span>

              <h2>
                Want to compare this EV?
              </h2>

              <p>
                Explore more electric vehicles,
                compare models and find the EV
                that fits your needs.
              </p>

            </div>

            <div className="review-detail-cta-actions">

              <Link
                href="/cars"
                className="btn btn-primary"
              >
                Explore EVs →
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