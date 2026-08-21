import Link from "next/link";

function getTitle(item) {
  return (
    item?.title ||
    item?.name ||
    item?.headline ||
    item?.page?.title ||
    "EV insight"
  );
}

function getDescription(item) {
  return (
    item?.description ||
    item?.summary ||
    item?.excerpt ||
    item?.content?.description ||
    "Read the latest electric vehicle insight from EVInsights."
  );
}

function getSlug(item) {
  return item?.slug || item?.id;
}

export default function ReviewsSection({ content = [] }) {
  const reviews = content
    .filter((item) => {
      const type = String(
        item?.type ||
        item?.contentType ||
        item?.category ||
        ""
      ).toLowerCase();

      return (
        type.includes("review") ||
        type.includes("vehicle")
      );
    })
    .slice(0, 4);

  return (
    <section className="section section-muted home-reviews">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="eyebrow">Expert insights</span>
            <h2>Latest EV reviews.</h2>
            <p className="section-lead">
              Understand what makes each electric vehicle worth considering.
            </p>
          </div>

          <Link href="/reviews" className="btn btn-secondary">
            All reviews →
          </Link>
        </div>

        <div className="content-grid">
          {(reviews.length ? reviews : content.slice(0, 4)).map(
            (item, index) => (
              <article className="content-card" key={item?.id || index}>
                <span className="content-card__index">
                  0{index + 1}
                </span>

                <div className="content-card__body">
                  <span className="content-card__tag">
                    EV REVIEW
                  </span>

                  <h3>{getTitle(item)}</h3>

                  <p>{getDescription(item)}</p>

                  <Link href={`/reviews/${getSlug(item)}`}>
                    Read review →
                  </Link>
                </div>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}