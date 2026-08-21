import Link from "next/link";
import VehicleCard from "@/components/vehicle-card";

export default function FeaturedEVs({
  vehicles = [],
  brands = [],
}) {
  const brandMap = new Map(
    brands.map((brand) => [brand.id, brand])
  );

  const featured = vehicles
    .filter((vehicle) => vehicle?.verification?.status === "approved")
    .filter((vehicle) => vehicle?.metadata?.featured)
    .slice(0, 8);

  return (
    <section className="section home-featured">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="eyebrow">EV directory</span>

            <h2>Featured electric cars</h2>

            <p className="section-lead">
              Explore some of the most interesting electric vehicles
              currently tracked by EVInsights.
            </p>
          </div>

          <Link href="/cars" className="btn btn-secondary">
            View all EVs →
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="vehicle-grid">
            {featured.map((vehicle) => (
              <VehicleCard
                key={vehicle.id || vehicle.slug}
                vehicle={vehicle}
                brand={brandMap.get(vehicle.brandId)}
              />
            ))}
          </div>
        ) : (
          <div className="home-empty">
            Featured EVs will appear here once vehicles are available.
          </div>
        )}
      </div>
    </section>
  );
}