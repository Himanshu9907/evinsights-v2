"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCurrency } from "@/context/CurrencyContext";

export default function HomePageContent({
  vehicles,
  brands,
  sources,
  content,
}) {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();

  const brandMap = new Map(brands.map((brand) => [brand.id, brand]));

  const featured = vehicles
    .filter((vehicle) => vehicle.metadata?.featured)
    .slice(0, 4);

  const remaining = vehicles
    .filter((vehicle) => !vehicle.metadata?.featured)
    .slice(0, 4);

  const featuredVehicles = [...featured, ...remaining].slice(0, 8);

  const articles = content
    .filter((item) => item.type === "article")
    .slice(0, 3);

  const reviews = content
    .filter((item) => item.type === "review")
    .slice(0, 3);

  const markets = [
    "USA",
    "Canada",
    "Germany",
    "UK",
    "France",
    "Norway",
    "Netherlands",
    "Australia",
    "China",
    "Japan",
    "India",
  ];

  function getVehiclePrice(vehicle) {
    const pricing = vehicle.pricing?.[0];

    if (!pricing) return null;

    const amount =
      typeof pricing.amount === "object"
        ? pricing.amount.amount
        : pricing.amount;

    const originalCurrency =
      typeof pricing.amount === "object"
        ? pricing.amount.currency
        : pricing.currency || "USD";

    if (!amount) return null;

    return formatPrice(amount, originalCurrency);
  }

  return (
    <main className="home-page">
      {/* HERO */}
      <section className="home-hero">
        <div className="shell home-hero__inner">
          <div className="home-hero__copy">
            <span className="eyebrow">{t("home.eyebrow")}</span>

            <h1>{t("home.title")}</h1>

            <p className="home-hero__description">
              {t("home.description")}
            </p>

            <form
              className="home-search"
              action="/cars"
              method="GET"
            >
              <div className="home-search__field">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="m16 16 5 5" />
                </svg>

                <input
                  name="q"
                  placeholder={t("home.searchPlaceholder")}
                  aria-label={t("home.searchPlaceholder")}
                />
              </div>

              <button className="btn btn-primary" type="submit">
                {t("home.searchButton")}
              </button>
            </form>

            <div className="home-hero__actions">
              <Link
                className="btn btn-primary"
                href="/cars"
              >
                {t("home.explore")}
              </Link>

              <Link
                className="btn btn-secondary"
                href="/compare"
              >
                {t("home.compare")}
              </Link>
            </div>

            <div className="home-trust">
              <span>✓ {t("home.sourceBacked")}</span>
              <span>✓ {t("home.globalMarkets")}</span>
              <span>✓ {t("home.editorialData")}</span>
            </div>
          </div>

          <div className="home-hero__visual">
            <div className="hero-orbit hero-orbit--one" />
            <div className="hero-orbit hero-orbit--two" />
            <div className="hero-car">
              <div className="hero-car__roof" />
              <div className="hero-car__body" />
              <div className="hero-car__window" />
              <div className="hero-car__wheel hero-car__wheel--left" />
              <div className="hero-car__wheel hero-car__wheel--right" />
            </div>

            <div className="hero-floating-card hero-floating-card--top">
              <span>{t("home.range")}</span>
              <strong>533 km</strong>
            </div>

            <div className="hero-floating-card hero-floating-card--bottom">
              <span>{t("home.battery")}</span>
              <strong>75 kWh</strong>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="shell home-stats">
          <div>
            <span>{t("home.evsTracked")}</span>
            <strong>{vehicles.length}+</strong>
          </div>

          <div>
            <span>{t("home.brands")}</span>
            <strong>{brands.length}</strong>
          </div>

          <div>
            <span>{t("home.sources")}</span>
            <strong>{sources.length}</strong>
          </div>

          <div>
            <span>{t("home.markets")}</span>
            <strong>{markets.length}+</strong>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="section home-featured">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">
                {t("home.discover")}
              </span>

              <h2>{t("home.featured")}</h2>

              <p className="section-lead">
                {t("home.featuredLead")}
              </p>
            </div>

            <Link
              className="btn btn-secondary"
              href="/cars"
            >
              {t("home.viewAll")}
            </Link>
          </div>

          <div className="home-vehicle-grid">
            {featuredVehicles.map((vehicle) => {
              const brand = brandMap.get(vehicle.brandId);
              const price = getVehiclePrice(vehicle);

              return (
                <Link
                  href={`/vehicles/${vehicle.slug}`}
                  className="home-vehicle-card"
                  key={vehicle.id}
                >
                  <div className="home-vehicle-card__image">
                    <span>{brand?.name || "EV"}</span>
                    <div className="home-vehicle-card__silhouette">
                      EV
                    </div>
                  </div>

                  <div className="home-vehicle-card__body">
                    <span className="home-card-label">
                      {brand?.name || "Electric Vehicle"}
                    </span>

                    <h3>
                      {vehicle.name ||
                        vehicle.title ||
                        "Electric Vehicle"}
                    </h3>

                    <div className="home-vehicle-meta">
                      <span>
                        {vehicle.specifications?.range ||
                          vehicle.range ||
                          "—"}{" "}
                        km
                      </span>

                      <span>
                        {vehicle.battery?.capacity ||
                          vehicle.batteryCapacity ||
                          "—"}{" "}
                        kWh
                      </span>
                    </div>

                    {price && (
                      <strong className="home-vehicle-price">
                        {price}
                      </strong>
                    )}

                    <span className="home-card-link">
                      {t("home.viewAll")}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section section-muted">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">
                {t("home.exploreByNeed")}
              </span>

              <h2>{t("home.everything")}</h2>
            </div>
          </div>

          <div className="home-category-grid">
            <Link href="/cars" className="home-category-card">
              <span>01</span>
              <h3>{t("home.findEv")}</h3>
              <p>{t("home.findEvText")}</p>
              <b>→</b>
            </Link>

            <Link href="/compare" className="home-category-card">
              <span>02</span>
              <h3>{t("home.compareEvs")}</h3>
              <p>{t("home.compareEvsText")}</p>
              <b>→</b>
            </Link>

            <Link href="/reviews" className="home-category-card">
              <span>03</span>
              <h3>{t("home.readReviews")}</h3>
              <p>{t("home.readReviewsText")}</p>
              <b>→</b>
            </Link>

            <Link href="/guides" className="home-category-card">
              <span>04</span>
              <h3>{t("home.learnEvs")}</h3>
              <p>{t("home.learnEvsText")}</p>
              <b>→</b>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY EVINSIGHTS */}
      <section className="section">
        <div className="shell">
          <div className="home-why">
            <div>
              <span className="eyebrow">
                {t("home.why")}
              </span>

              <h2>{t("home.built")}</h2>

              <p className="section-lead">
                {t("home.principle")}
              </p>

              <div className="home-feature-list">
                <div>
                  <b>01</b>
                  <div>
                    <strong>{t("home.sourceFacts")}</strong>
                    <small>{t("home.sourceFactsText")}</small>
                  </div>
                </div>

                <div>
                  <b>02</b>
                  <div>
                    <strong>{t("home.completePage")}</strong>
                    <small>{t("home.completePageText")}</small>
                  </div>
                </div>

                <div>
                  <b>03</b>
                  <div>
                    <strong>{t("home.globalReady")}</strong>
                    <small>{t("home.globalReadyText")}</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="home-snapshot">
              <span className="eyebrow">
                {t("home.snapshot")}
              </span>

              <div>
                <span>{t("home.range")}</span>
                <strong>533 km</strong>
              </div>

              <div>
                <span>{t("home.battery")}</span>
                <strong>75 kWh</strong>
              </div>

              <div>
                <span>{t("home.charging")}</span>
                <strong>250 kW</strong>
              </div>

              <div>
                <span>{t("home.markets")}</span>
                <strong>11</strong>
              </div>

              <Link
                href="/vehicles/tesla-model-y"
                className="btn btn-primary"
              >
                {t("home.openProfile")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="section section-muted">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">
                {t("home.readLearn")}
              </span>

              <h2>{t("home.latest")}</h2>
            </div>

            <Link
              className="btn btn-secondary"
              href="/articles"
            >
              {t("home.allArticles")}
            </Link>
          </div>

          <div className="home-article-grid">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="home-article-card"
              >
                <span>{article.category || "EV Guide"}</span>

                <h3>{article.title}</h3>

                <p>{article.excerpt}</p>

                <b>→</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">
                {t("home.community")}
              </span>

              <h2>{t("home.recentReviews")}</h2>
            </div>

            <Link
              className="btn btn-secondary"
              href="/reviews"
            >
              {t("home.allReviews")}
            </Link>
          </div>

          <div className="home-review-grid">
            {reviews.map((review) => (
              <article
                className="home-review-card"
                key={review.id}
              >
                <div className="home-review-card__top">
                  <strong>
                    ★ {review.score || "—"}
                  </strong>

                  <span>{review.category}</span>
                </div>

                <h3>{review.title}</h3>

                <p>{review.excerpt}</p>

                <Link href={`/reviews/${review.slug}`}>
                  {t("home.readReviews")} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MARKETS */}
      <section className="section">
        <div className="shell">
          <div className="home-market-band">
            <div>
              <span className="eyebrow">
                {t("home.globalCoverage")}
              </span>

              <h2>{t("home.growMarkets")}</h2>

              <p>{t("home.marketText")}</p>
            </div>

            <div className="home-market-pills">
              {markets.map((market) => (
                <span key={market}>{market}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section">
        <div className="shell">
          <div className="home-final-cta">
            <div>
              <span className="eyebrow">
                {t("home.ready")}
              </span>

              <h2>{t("home.pick")}</h2>

              <p>{t("home.finalText")}</p>
            </div>

            <div className="home-final-cta__actions">
              <Link
                href="/cars"
                className="btn btn-primary"
              >
                {t("home.exploreEvs")}
              </Link>

              <Link
                href="/compare"
                className="btn btn-secondary"
              >
                {t("home.comparisonStudio")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}