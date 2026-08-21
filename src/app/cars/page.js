// import Link from "next/link";
// import VehicleCard from "@/components/vehicle-card";
// import { getAllVehicles } from "@/server/repositories/vehicle.repository";
// import { getAllBrands } from "@/server/repositories/brand.repository";
// import { searchVehicles } from "@/server/services/search.service";
// export const dynamic='force-dynamic';

// export default async function Cars({searchParams}){const p=await searchParams;const q=String(p?.q||"").trim();const brand=String(p?.brand||"");let vehicles=q?(await searchVehicles(q,100)).map(x=>x.vehicle):await getAllVehicles();if(brand)vehicles=vehicles.filter(v=>v.brandId===brand);const brands=await getAllBrands();const bm=new Map(brands.map(b=>[b.id,b]));return <main className="shell"><section className="page-hero"><span className="eyebrow">EV directory</span><h1>Electric cars, properly organized.</h1><p>Search the catalog, filter by brand and open a vehicle profile for detailed specifications, charging, pricing, reviews and sources.</p><form className="search-row" action="/cars"><input name="q" defaultValue={q} placeholder="Search an EV or brand…"/><button className="btn btn-primary">Search</button></form><div className="filters"><Link className={`filter ${!brand?"chip accent":""}`} href="/cars">All brands</Link>{brands.map(b=><Link key={b.id} className={`filter ${brand===b.id?"chip accent":""}`} href={`/cars?brand=${b.id}`}>{b.name}</Link>)}</div></section><div className="section-head"><div><span className="eyebrow">Catalog</span><h2>{vehicles.length} electric vehicles</h2></div><Link className="btn btn-secondary" href="/compare">Comparison studio →</Link></div><section className="section" style={{paddingTop:0}}><div className="vehicle-grid">{vehicles.map(v=><VehicleCard key={v.id} vehicle={v} brand={bm.get(v.brandId)}/>)}</div></section></main>}


import { getAllVehicles } from "@/server/repositories/vehicle.repository";
import { getAllBrands } from "@/server/repositories/brand.repository";
import { searchVehicles } from "@/server/services/search.service";

import CarsHero from "@/components/cars/CarsHero";
import CarsToolbar from "@/components/cars/CarsToolbar";
import CarsGrid from "@/components/cars/CarsGrid";

export const dynamic = "force-dynamic";

export default async function Cars({ searchParams }) {
  const params = await searchParams;

  const q = String(params?.q || "").trim();
  const brand = String(params?.brand || "");
  const bodyType = String(params?.bodyType || "");
  const sort = String(params?.sort || "featured");

  let vehicles;

  if (q) {
    const results = await searchVehicles(q, 100);
    vehicles = results.map((item) => item.vehicle).filter(Boolean);
  } else {
    vehicles = await getAllVehicles();
  }

  if (brand) {
    vehicles = vehicles.filter(
      (vehicle) => vehicle?.brandId === brand
    );
  }

  if (bodyType) {
    vehicles = vehicles.filter(
      (vehicle) =>
        String(vehicle?.classification?.bodyType || "").toLowerCase() ===
        bodyType.toLowerCase()
    );
  }

  if (sort === "price-low") {
    vehicles = [...vehicles].sort(
      (a, b) =>
        Number(a?.extracted?.price?.amount || 0) -
        Number(b?.extracted?.price?.amount || 0)
    );
  }

  if (sort === "price-high") {
    vehicles = [...vehicles].sort(
      (a, b) =>
        Number(b?.extracted?.price?.amount || 0) -
        Number(a?.extracted?.price?.amount || 0)
    );
  }

  if (sort === "range") {
    vehicles = [...vehicles].sort(
      (a, b) =>
        Number(b?.extracted?.specs?.range || 0) -
        Number(a?.extracted?.specs?.range || 0)
    );
  }

  if (sort === "rating") {
    vehicles = [...vehicles].sort(
      (a, b) =>
        Number(b?.rating || 0) -
        Number(a?.rating || 0)
    );
  }

  const brands = await getAllBrands();

  const brandMap = new Map(
    brands.map((brandItem) => [
      brandItem.id,
      brandItem,
    ])
  );

  const bodyTypes = [
    "SUV",
    "Sedan",
    "Crossover",
    "Hatchback",
    "MPV",
    "Coupe",
  ];

  return (
    <main className="cars-page">

      <CarsHero
        query={q}
        vehicleCount={vehicles.length}
      />

      <section className="cars-catalog">
        <div className="shell">

          <CarsToolbar
            query={q}
            brand={brand}
            bodyType={bodyType}
            sort={sort}
            brands={brands}
            bodyTypes={bodyTypes}
          />

          <div className="cars-results-head">

            <div>
              <span className="eyebrow">
                EV directory
              </span>

              <h2>
                {vehicles.length} electric vehicles
              </h2>
            </div>

            <a
              href="/compare"
              className="btn btn-secondary"
            >
              Comparison studio →
            </a>

          </div>

          <CarsGrid
            vehicles={vehicles}
            brandMap={brandMap}
          />

        </div>
      </section>

    </main>
  );
}


// import Link from "next/link";
// import VehicleCard from "@/components/vehicle-card";
// import CompareDock from "@/components/CompareDock";

// import {
//   getAllVehicles,
// } from "@/server/repositories/vehicle.repository";

// import {
//   getAllBrands,
// } from "@/server/repositories/brand.repository";

// import {
//   searchVehicles,
// } from "@/server/services/search.service";

// export const dynamic = "force-dynamic";

// export default async function Cars({
//   searchParams,
// }) {
//   const p = await searchParams;

//   const q = String(
//     p?.q || ""
//   ).trim();

//   const brand = String(
//     p?.brand || ""
//   );

//   let vehicles = q
//     ? (await searchVehicles(q, 100)).map(
//         (x) => x.vehicle
//       )
//     : await getAllVehicles();

//   if (brand) {
//     vehicles = vehicles.filter(
//       (v) => v.brandId === brand
//     );
//   }

//   const brands = await getAllBrands();

//   const brandMap = new Map(
//     brands.map((b) => [
//       b.id,
//       b,
//     ])
//   );

//   return (
//     <>
//       <main className="shell">

//         <section className="page-hero">
//           <span className="eyebrow">
//             EV directory
//           </span>

//           <h1>
//             Electric cars,
//             <br />
//             properly organized.
//           </h1>

//           <p>
//             Search the catalog, filter by brand
//             and open a vehicle profile for detailed
//             specifications, charging, pricing,
//             reviews and sources.
//           </p>

//           <form
//             className="search-row"
//             action="/cars"
//           >
//             <input
//               name="q"
//               defaultValue={q}
//               placeholder="Search an EV or brand…"
//             />

//             <button
//               type="submit"
//               className="btn btn-primary"
//             >
//               Search
//             </button>
//           </form>

//           <div className="filters">

//             <Link
//               className={`filter ${
//                 !brand
//                   ? "chip accent"
//                   : ""
//               }`}
//               href="/cars"
//             >
//               All brands
//             </Link>

//             {brands.map((b) => (
//               <Link
//                 key={b.id}
//                 className={`filter ${
//                   brand === b.id
//                     ? "chip accent"
//                     : ""
//                 }`}
//                 href={`/cars?brand=${b.id}`}
//               >
//                 {b.name}
//               </Link>
//             ))}

//           </div>
//         </section>

//         <div className="section-head">
//           <div>
//             <span className="eyebrow">
//               Catalog
//             </span>

//             <h2>
//               {vehicles.length} electric vehicles
//             </h2>
//           </div>

//           <Link
//             className="btn btn-secondary"
//             href="/compare"
//           >
//             Comparison studio →
//           </Link>
//         </div>

//         <section
//           className="section"
//           style={{
//             paddingTop: 0,
//           }}
//         >
//           <div className="vehicle-grid">

//             {vehicles.map((vehicle) => (
//               <VehicleCard
//                 key={vehicle.id}
//                 vehicle={vehicle}
//                 brand={brandMap.get(
//                   vehicle.brandId
//                 )}
//               />
//             ))}

//           </div>
//         </section>

//       </main>

//       <CompareDock />
//     </>
//   );
// }
