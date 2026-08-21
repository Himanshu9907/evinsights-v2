// import Link from "next/link";
// import { getAllContent } from "@/server/repositories/content.repository";
// import { getAllVehicles } from "@/server/repositories/vehicle.repository";
// export const dynamic='force-dynamic';

// export default async function Reviews(){const [items,vehicles]=await Promise.all([getAllContent(),getAllVehicles()]);const reviews=items.filter(x=>x.type==='review');const map=new Map(vehicles.map(v=>[v.id,v]));return <main className="shell"><section className="page-hero"><span className="eyebrow">EVInsights reviews</span><h1>Reviews built from traceable data.</h1><p>Our review layer separates published facts from missing information and is designed to refresh when the underlying vehicle record changes.</p></section><div className="article-grid">{reviews.map(r=><Link key={r.id} href={`/reviews/${r.slug}`} className="article-card"><span className="tag">{r.category}</span><h3>{r.title}</h3><p>{r.excerpt}</p><p>{map.get(r.vehicleIds?.[0])?.name||''}</p><span className="btn btn-secondary">Read review →</span></Link>)}</div></main>}


import Link from "next/link";
import { getAllContent } from "@/server/repositories/content.repository";
import { getAllVehicles } from "@/server/repositories/vehicle.repository";

export const dynamic = "force-dynamic";

export default async function Reviews() {
  const [items, vehicles] = await Promise.all([
    getAllContent(),
    getAllVehicles(),
  ]);

  const reviews = items.filter(
    (item) => item?.type === "review"
  );

  const vehicleMap = new Map(
    vehicles.map((vehicle) => [vehicle.id, vehicle])
  );

  const featuredReview = reviews[0];
  const remainingReviews = reviews.slice(1);

  function getVehicleName(review) {
    const vehicleId = review?.vehicleIds?.[0];

    return (
      vehicleMap.get(vehicleId)?.identity?.name ||
      vehicleMap.get(vehicleId)?.name ||
      "Electric Vehicle"
    );
  }

  function getVehicleImage(review) {
    const vehicleId = review?.vehicleIds?.[0];
    const vehicle = vehicleMap.get(vehicleId);

    return (
      vehicle?.metadata?.image ||
      vehicle?.media?.image ||
      vehicle?.image ||
      vehicle?.payload?.metadata?.image ||
      null
    );
  }

  return (
    <main className="reviews-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="reviews-hero">
        <div className="shell reviews-hero__inner">

          <div className="reviews-hero__content">
            <span className="eyebrow">
              EVInsights editorial
            </span>

            <h1>
              Reviews that help you
              <span> choose the right EV.</span>
            </h1>

            <p>
              Explore electric vehicle reviews built around
              structured, traceable data — from specifications
              and charging to pricing and real-world considerations.
            </p>

            <div className="reviews-hero__actions">
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

          <div className="reviews-hero__visual">
            <div className="reviews-hero__glow" />

            <div className="reviews-hero__orb">
              <span>R</span>
            </div>

            <div className="reviews-hero__stat">
              <span>Published reviews</span>
              <strong>{reviews.length}+</strong>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================
          REVIEW DIRECTORY
      ========================================= */}

      <section className="reviews-directory">
        <div className="shell">

          <div className="section-head reviews-section-head">
            <div>
              <span className="eyebrow">
                EVInsights reviews
              </span>

              <h2>
                Latest electric vehicle reviews.
              </h2>

              <p className="section-lead">
                Go beyond the headline numbers and understand
                what each EV brings to the road.
              </p>
            </div>

            <div className="reviews-count">
              <strong>{reviews.length}</strong>
              <span>Reviews</span>
            </div>
          </div>


          {/* =========================================
              FEATURED REVIEW
          ========================================= */}

          {featuredReview && (
            <Link
              href={`/reviews/${featuredReview.slug}`}
              className="featured-review"
            >

              <div className="featured-review__media">

                {getVehicleImage(featuredReview) ? (
                  <img
                    src={getVehicleImage(featuredReview)}
                    alt={getVehicleName(featuredReview)}
                    loading="eager"
                  />
                ) : (
                  <div className="featured-review__placeholder">
                    <span>EV</span>
                  </div>
                )}

                <span className="featured-review__badge">
                  FEATURED REVIEW
                </span>

              </div>


              <div className="featured-review__content">

                <span className="featured-review__category">
                  {featuredReview.category || "EV REVIEW"}
                </span>

                <h2>
                  {featuredReview.title ||
                    "Electric vehicle review"}
                </h2>

                <p>
                  {featuredReview.excerpt ||
                    "Explore our latest electric vehicle review."}
                </p>

                <div className="featured-review__vehicle">
                  <span>Reviewed vehicle</span>
                  <strong>
                    {getVehicleName(featuredReview)}
                  </strong>
                </div>

                <span className="featured-review__link">
                  Read full review →
                </span>

              </div>

            </Link>
          )}


          {/* =========================================
              REVIEW GRID
          ========================================= */}

          {remainingReviews.length > 0 && (
            <div className="reviews-grid">

              {remainingReviews.map((review, index) => {
                const vehicleName =
                  getVehicleName(review);

                const vehicleImage =
                  getVehicleImage(review);

                return (
                  <Link
                    key={review.id}
                    href={`/reviews/${review.slug}`}
                    className="review-card"
                  >

                    <div className="review-card__media">

                      {vehicleImage ? (
                        <img
                          src={vehicleImage}
                          alt={vehicleName}
                          loading="lazy"
                        />
                      ) : (
                        <div className="review-card__placeholder">
                          <span>EV</span>
                        </div>
                      )}

                      <span className="review-card__number">
                        {String(index + 2).padStart(2, "0")}
                      </span>

                    </div>


                    <div className="review-card__body">

                      <div className="review-card__meta">
                        <span>
                          {review.category || "EV REVIEW"}
                        </span>

                        <span>
                          {vehicleName}
                        </span>
                      </div>

                      <h3>
                        {review.title ||
                          "Electric vehicle review"}
                      </h3>

                      <p>
                        {review.excerpt ||
                          "Explore this electric vehicle review."}
                      </p>

                      <div className="review-card__footer">
                        <span>
                          Read review
                        </span>

                        <span aria-hidden="true">
                          →
                        </span>
                      </div>

                    </div>

                  </Link>
                );
              })}

            </div>
          )}


          {/* =========================================
              EMPTY STATE
          ========================================= */}

          {!reviews.length && (
            <div className="reviews-empty">

              <span className="eyebrow">
                Coming soon
              </span>

              <h2>
                Reviews are on the way.
              </h2>

              <p>
                Published EV reviews will appear here once
                review content is available.
              </p>

              <Link
                href="/cars"
                className="btn btn-primary"
              >
                Browse electric cars →
              </Link>

            </div>
          )}

        </div>
      </section>


      {/* =========================================
          BOTTOM CTA
      ========================================= */}

      <section className="reviews-cta">
        <div className="shell">

          <div className="reviews-cta__inner">

            <div>
              <span className="eyebrow">
                Make your next decision
              </span>

              <h2>
                Found an EV you like?
              </h2>

              <p>
                Compare it with other electric cars and see
                the differences side by side.
              </p>
            </div>

            <div className="reviews-cta__actions">
              <Link
                href="/compare"
                className="btn btn-primary"
              >
                Compare EVs →
              </Link>

              <Link
                href="/cars"
                className="btn btn-secondary"
              >
                Browse catalog
              </Link>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

