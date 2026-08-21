import VehicleCard from "@/components/vehicle-card";

export default function CarsGrid({
  vehicles = [],
  brandMap,
}) {
  if (!vehicles.length) {
    return (
      <div className="cars-empty">

        <div className="cars-empty__icon">
          EV
        </div>

        <h3>
          No electric vehicles found
        </h3>

        <p>
          Try changing your search or removing
          one of the filters.
        </p>

        <a
          href="/cars"
          className="btn btn-primary"
        >
          View all EVs
        </a>

      </div>
    );
  }

  return (
    <div className="cars-grid">

      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id || vehicle.slug}
          vehicle={vehicle}
          brand={brandMap.get(
            vehicle.brandId
          )}
        />
      ))}

    </div>
  );
}