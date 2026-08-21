import Link from "next/link";

export default function BrandsSection({ brands = [] }) {
  const visibleBrands = brands.slice(0, 12);

  return (
    <section className="section home-brands">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="eyebrow">Manufacturers</span>
            <h2>Explore EV brands.</h2>
            <p className="section-lead">
              Discover electric vehicles from manufacturers around the world.
            </p>
          </div>

          <Link href="/brands" className="btn btn-secondary">
            All brands →
          </Link>
        </div>

        <div className="brand-grid">
          {visibleBrands.map((brand) => (
            <Link
              key={brand.id || brand.slug}
              href={`/brands/${brand.slug || brand.id}`}
              className="brand-card"
            >
              <div className="brand-card__mark">
                {(brand.name || "EV").slice(0, 2).toUpperCase()}
              </div>

              <div>
                <strong>{brand.name || "Unknown brand"}</strong>
                <span>Explore vehicles →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}