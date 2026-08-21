// // // import Link from "next/link";
// // // import VehicleCard from "@/components/vehicle-card";
// // // import { getSiteSnapshot } from "@/server/services/site.service";
// // // export const dynamic='force-dynamic';
// // // export default async function Home(){
// // //  const {vehicles,brands,sources,content}=await getSiteSnapshot();
// // //  const brandMap=new Map(brands.map(b=>[b.id,b]));
// // //  const featured=vehicles.filter(v=>v.metadata?.featured).slice(0,4).concat(vehicles.filter(v=>!v.metadata?.featured)).slice(0,4);
// // //  const articles=content.filter(x=>x.type==='article').slice(0,3);
// // //  const reviews=content.filter(x=>x.type==='review').slice(0,3);
// // //  const markets=['USA','Canada','Germany','UK','France','Norway','Netherlands','Australia','China','Japan','India'];
// // //  return <main>
// // //   <section className="hero home-hero"><div className="shell hero-grid"><div><span className="eyebrow">Electric vehicle intelligence</span><h1>Know the EV before you buy it.</h1><p>Explore source-backed specifications, pricing, charging, comparisons, reviews and practical EV guides — all in one place.</p><form className="search-row" action="/cars"><input name="q" placeholder="Search Tata Nexon EV, Model Y, Ioniq 5…"/><button className="btn btn-primary">Search EVs →</button></form><div className="hero-cta"><Link className="btn btn-secondary" href="/cars">Explore all EVs</Link><Link className="btn btn-secondary" href="/compare">Compare cars</Link></div><div className="trust-strip"><span>✓ Source-backed</span><span>✓ Global markets</span><span>✓ Manual editorial data</span></div></div><div className="hero-art home-hero-art"><div className="hero-art-glow"/><div className="hero-wheel"/><div className="hero-art-label">EVINSIGHTS / GLOBAL EV DATA</div></div></div><div className="shell stats-row"><div className="stat"><span>EVs tracked</span><strong>{vehicles.length}+</strong></div><div className="stat"><span>Brands</span><strong>{brands.length}</strong></div><div className="stat"><span>Sources</span><strong>{sources.length}</strong></div><div className="stat"><span>Markets</span><strong>{markets.length}+</strong></div></div></section>

// // //   <section className="section"><div className="shell"><div className="section-head"><div><span className="eyebrow">Discover</span><h2>Featured electric cars</h2><p className="section-lead">Open any EV to explore the same complete detail experience: pricing, variants, range, charging, safety, reviews, gallery and market availability.</p></div><Link className="btn btn-secondary" href="/cars">View all →</Link></div><div className="vehicle-grid">{featured.map(v=><VehicleCard key={v.id} vehicle={v} brand={brandMap.get(v.brandId)}/>)}</div></div></section>

// // //   <section className="section section-muted"><div className="shell"><div className="section-head"><div><span className="eyebrow">Explore by need</span><h2>Everything around the EV decision.</h2></div></div><div className="category-grid"><Link className="category-card" href="/cars"><span>01</span><strong>Find an EV</strong><p>Browse the growing electric car catalog by manufacturer and model.</p></Link><Link className="category-card" href="/compare"><span>02</span><strong>Compare EVs</strong><p>Put up to four cars head-to-head across the numbers that matter.</p></Link><Link className="category-card" href="/reviews"><span>03</span><strong>Read reviews</strong><p>See practical strengths, trade-offs and traceable vehicle facts.</p></Link><Link className="category-card" href="/guides"><span>04</span><strong>Learn EVs</strong><p>Understand charging, ownership, battery technology and buying decisions.</p></Link></div></div></section>

// // //   <section className="section"><div className="shell"><div className="split-feature"><div><span className="eyebrow">Why EVInsights</span><h2>Built for better EV decisions.</h2><p className="section-lead">The platform is designed around one principle: make the important information easy to compare without pretending missing data is verified.</p><div className="feature-list"><div><b>01</b><span><strong>Source-backed facts</strong><small>Vehicle records retain source and verification context.</small></span></div><div><b>02</b><span><strong>One complete vehicle page</strong><small>Every car uses the same detailed, reusable layout.</small></span></div><div><b>03</b><span><strong>Global-ready structure</strong><small>Markets, currencies and languages are built into the experience.</small></span></div></div></div><div className="insight-panel"><span className="eyebrow">Decision snapshot</span><div className="snapshot-row"><span>Range</span><strong>533 km</strong></div><div className="snapshot-row"><span>Battery</span><strong>75 kWh</strong></div><div className="snapshot-row"><span>Charging</span><strong>250 kW</strong></div><div className="snapshot-row"><span>Markets</span><strong>11</strong></div><Link className="btn btn-primary" href="/vehicles/tesla-model-y">Open a full EV profile →</Link></div></div></div></section>

// // //   <section className="section section-muted"><div className="shell"><div className="section-head"><div><span className="eyebrow">Read & learn</span><h2>Latest EV insights</h2></div><Link className="btn btn-secondary" href="/articles">All articles →</Link></div><div className="article-grid">{articles.map(a=><Link className="article-card" href={`/articles/${a.slug}`} key={a.id}><span className="tag">{a.category||'EV guide'}</span><h3>{a.title}</h3><p>{a.excerpt}</p><span className="article-arrow">Read article →</span></Link>)}</div></div></section>

// // //   <section className="section"><div className="shell"><div className="section-head"><div><span className="eyebrow">Community voice</span><h2>Recent EV reviews.</h2></div><Link className="btn btn-secondary" href="/reviews">All reviews →</Link></div><div className="review-home-grid">{reviews.map(r=><article className="home-review" key={r.id}><div className="review-top"><span>★ {r.score||'—'}</span><small>{r.category}</small></div><h3>{r.title}</h3><p>{r.excerpt}</p><Link href={`/reviews/${r.slug}`}>Read review →</Link></article>)}</div></div></section>

// // //   <section className="section"><div className="shell"><div className="market-band"><div><span className="eyebrow">Global coverage</span><h2>Built to grow across markets.</h2><p>Vehicle records can carry market availability and market-specific pricing without changing the core vehicle page.</p></div><div className="market-pills">{markets.map(m=><span key={m}>{m}</span>)}</div></div></div></section>

// // //   <section className="section"><div className="shell"><div className="detail-panel final-cta"><div><span className="eyebrow">Ready to compare?</span><h2>Pick the EV that fits your life.</h2><p className="section-lead">Use price, range, charging and ownership information instead of guessing from a brochure.</p></div><div className="hero-cta"><Link className="btn btn-primary" href="/cars">Explore EVs →</Link><Link className="btn btn-secondary" href="/compare">Open comparison studio →</Link></div></div></div></section>
// // //  </main>
// // // }



// // import { getSiteSnapshot } from "@/server/services/site.service";
// // import HomePageContent from "./HomePageContent";

// // export const dynamic = "force-dynamic";

// // export default async function Home() {
// //   const {
// //     vehicles,
// //     brands,
// //     sources,
// //     content,
// //   } = await getSiteSnapshot();

// //   return (
// //     <HomePageContent
// //       vehicles={vehicles}
// //       brands={brands}
// //       sources={sources}
// //       content={content}
// //     />
// //   );
// // }



// import Link from "next/link";
// import VehicleCard from "@/components/vehicle-card";
// import { getSiteSnapshot } from "@/server/services/site.service";

// export const dynamic = "force-dynamic";

// export default async function Home() {
//   const { vehicles, brands, sources, content } = await getSiteSnapshot();

//   const brandMap = new Map(brands.map((brand) => [brand.id, brand]));

//   const featuredVehicles = vehicles
//     .filter((vehicle) => vehicle?.metadata?.featured)
//     .slice(0, 6);

//   const fallbackVehicles =
//     featuredVehicles.length > 0
//       ? featuredVehicles
//       : vehicles.slice(0, 6);

//   const articles = content
//     .filter((item) => item?.type === "article")
//     .slice(0, 3);

//   const reviews = content
//     .filter((item) => item?.type === "review")
//     .slice(0, 3);

//   const markets = [
//     "USA",
//     "Canada",
//     "Germany",
//     "UK",
//     "France",
//     "Norway",
//     "Netherlands",
//     "Australia",
//     "China",
//     "Japan",
//     "India",
//   ];

//   return (
//     <main className="home-page">

//       {/* ================= HERO ================= */}

//       <section className="home-hero">
//         <div className="shell home-hero__inner">

//           <div className="home-hero__content">

//             <span className="eyebrow">
//               Global electric vehicle intelligence
//             </span>

//             <h1>
//               Know the EV
//               <br />
//               before you buy it.
//             </h1>

//             <p className="home-hero__description">
//               Explore source-backed specifications, pricing, charging,
//               comparisons, reviews and practical EV insights — all in one
//               place.
//             </p>

//             <form
//               className="home-search"
//               action="/cars"
//               method="GET"
//             >
//               <div className="home-search__icon">
//                 <svg
//                   viewBox="0 0 24 24"
//                   aria-hidden="true"
//                 >
//                   <circle cx="11" cy="11" r="6.5" />
//                   <path d="m16 16 5 5" />
//                 </svg>
//               </div>

//               <input
//                 name="q"
//                 type="search"
//                 placeholder="Search Tata Nexon EV, BMW iX, Model Y..."
//                 aria-label="Search electric vehicles"
//               />

//               <button
//                 type="submit"
//                 className="btn btn-primary"
//               >
//                 Search EVs
//                 <span>→</span>
//               </button>
//             </form>

//             <div className="home-hero__actions">
//               <Link
//                 href="/cars"
//                 className="btn btn-primary"
//               >
//                 Explore all EVs
//                 <span>→</span>
//               </Link>

//               <Link
//                 href="/compare"
//                 className="btn btn-secondary"
//               >
//                 Compare cars
//               </Link>
//             </div>

//             <div className="home-trust">
//               <span>
//                 <b>✓</b>
//                 Source-backed
//               </span>

//               <span>
//                 <b>✓</b>
//                 Global markets
//               </span>

//               <span>
//                 <b>✓</b>
//                 Verified data
//               </span>
//             </div>

//           </div>

//           <div className="home-hero__visual">

//             <div className="home-hero__glow" />

//             <div className="home-hero__circle">
//               <div className="home-hero__circle-inner">
//                 EV
//               </div>
//             </div>

//             <div className="home-hero__floating-card home-hero__floating-card--top">
//               <span>Range</span>
//               <strong>590 km</strong>
//             </div>

//             <div className="home-hero__floating-card home-hero__floating-card--bottom">
//               <span>Charging</span>
//               <strong>250 kW</strong>
//             </div>

//             <div className="home-hero__label">
//               EVINSIGHTS / GLOBAL EV DATA
//             </div>

//           </div>

//         </div>

//         {/* ================= STATS ================= */}

//         <div className="shell home-stats">

//           <div className="home-stat">
//             <span>EVs tracked</span>
//             <strong>{vehicles.length}+</strong>
//           </div>

//           <div className="home-stat">
//             <span>Brands</span>
//             <strong>{brands.length}</strong>
//           </div>

//           <div className="home-stat">
//             <span>Sources</span>
//             <strong>{sources.length}</strong>
//           </div>

//           <div className="home-stat">
//             <span>Markets</span>
//             <strong>{markets.length}+</strong>
//           </div>

//         </div>
//       </section>

//       {/* ================= FEATURED EVS ================= */}

//       <section className="section home-featured">

//         <div className="shell">

//           <div className="section-head">

//             <div>
//               <span className="eyebrow">
//                 Discover
//               </span>

//               <h2>
//                 Featured electric cars
//               </h2>

//               <p className="section-lead">
//                 Explore some of the EVs currently tracked by
//                 EVInsights.
//               </p>
//             </div>

//             <Link
//               href="/cars"
//               className="btn btn-secondary"
//             >
//               View all
//               <span>→</span>
//             </Link>

//           </div>

//           {fallbackVehicles.length > 0 ? (
//             <div className="vehicle-grid">

//               {fallbackVehicles.map((vehicle) => (
//                 <VehicleCard
//                   key={vehicle.id}
//                   vehicle={vehicle}
//                   brand={brandMap.get(vehicle.brandId)}
//                 />
//               ))}

//             </div>
//           ) : (
//             <div className="home-empty">
//               <span>EV</span>
//               <h3>No vehicles available yet</h3>
//               <p>
//                 Vehicle data will appear here once the database
//                 contains approved records.
//               </p>
//             </div>
//           )}

//         </div>

//       </section>

//       {/* ================= EXPLORE ================= */}

//       <section className="section section-muted">

//         <div className="shell">

//           <div className="section-head">

//             <div>
//               <span className="eyebrow">
//                 Explore
//               </span>

//               <h2>
//                 Everything around
//                 <br />
//                 the EV decision.
//               </h2>
//             </div>

//           </div>

//           <div className="home-category-grid">

//             <Link
//               href="/cars"
//               className="home-category-card"
//             >
//               <span className="home-category-number">
//                 01
//               </span>

//               <div>
//                 <h3>Find an EV</h3>

//                 <p>
//                   Browse electric cars by brand,
//                   model, body type and market.
//                 </p>
//               </div>

//               <span className="home-category-arrow">
//                 →
//               </span>
//             </Link>

//             <Link
//               href="/compare"
//               className="home-category-card"
//             >
//               <span className="home-category-number">
//                 02
//               </span>

//               <div>
//                 <h3>Compare EVs</h3>

//                 <p>
//                   Put up to four electric cars
//                   head-to-head.
//                 </p>
//               </div>

//               <span className="home-category-arrow">
//                 →
//               </span>
//             </Link>

//             <Link
//               href="/reviews"
//               className="home-category-card"
//             >
//               <span className="home-category-number">
//                 03
//               </span>

//               <div>
//                 <h3>Read reviews</h3>

//                 <p>
//                   Understand strengths, trade-offs
//                   and real-world considerations.
//                 </p>
//               </div>

//               <span className="home-category-arrow">
//                 →
//               </span>
//             </Link>

//             <Link
//               href="/guides"
//               className="home-category-card"
//             >
//               <span className="home-category-number">
//                 04
//               </span>

//               <div>
//                 <h3>Learn about EVs</h3>

//                 <p>
//                   Understand batteries, charging,
//                   ownership and EV technology.
//                 </p>
//               </div>

//               <span className="home-category-arrow">
//                 →
//               </span>
//             </Link>

//           </div>

//         </div>

//       </section>

//       {/* ================= WHY EVINSIGHTS ================= */}

//       <section className="section">

//         <div className="shell">

//           <div className="home-why">

//             <div className="home-why__content">

//               <span className="eyebrow">
//                 Why EVInsights
//               </span>

//               <h2>
//                 Built for better
//                 <br />
//                 EV decisions.
//               </h2>

//               <p className="section-lead">
//                 EVInsights brings important EV information
//                 together so you can compare facts instead of
//                 guessing from marketing brochures.
//               </p>

//               <div className="home-feature-list">

//                 <div className="home-feature-item">
//                   <span>01</span>

//                   <div>
//                     <strong>
//                       Source-backed facts
//                     </strong>

//                     <p>
//                       Vehicle records retain their source
//                       and verification context.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="home-feature-item">
//                   <span>02</span>

//                   <div>
//                     <strong>
//                       One complete vehicle page
//                     </strong>

//                     <p>
//                       Every EV follows the same detailed
//                       information structure.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="home-feature-item">
//                   <span>03</span>

//                   <div>
//                     <strong>
//                       Global-ready
//                     </strong>

//                     <p>
//                       Markets, languages, currencies and
//                       themes are built into the platform.
//                     </p>
//                   </div>
//                 </div>

//               </div>

//             </div>

//             <div className="home-snapshot">

//               <div className="home-snapshot__header">
//                 <span>Decision snapshot</span>

//                 <span className="home-snapshot__dot" />
//               </div>

//               <div className="home-snapshot__value">
//                 <strong>EV</strong>
//                 <span>DATA PROFILE</span>
//               </div>

//               <div className="home-snapshot__rows">

//                 <div>
//                   <span>Range</span>
//                   <strong>590 km</strong>
//                 </div>

//                 <div>
//                   <span>Battery</span>
//                   <strong>105.2 kWh</strong>
//                 </div>

//                 <div>
//                   <span>Charging</span>
//                   <strong>250 kW</strong>
//                 </div>

//                 <div>
//                   <span>Markets</span>
//                   <strong>{markets.length}</strong>
//                 </div>

//               </div>

//               <Link
//                 href="/cars"
//                 className="btn btn-primary"
//               >
//                 Explore EV profiles
//                 <span>→</span>
//               </Link>

//             </div>

//           </div>

//         </div>

//       </section>

//       {/* ================= ARTICLES ================= */}

//       {articles.length > 0 && (
//         <section className="section section-muted">

//           <div className="shell">

//             <div className="section-head">

//               <div>
//                 <span className="eyebrow">
//                   Read & learn
//                 </span>

//                 <h2>
//                   Latest EV insights
//                 </h2>
//               </div>

//               <Link
//                 href="/articles"
//                 className="btn btn-secondary"
//               >
//                 All articles
//                 <span>→</span>
//               </Link>

//             </div>

//             <div className="home-article-grid">

//               {articles.map((article) => (
//                 <Link
//                   key={article.id}
//                   href={`/articles/${article.slug}`}
//                   className="home-article-card"
//                 >

//                   <div className="home-article-card__top">

//                     <span className="tag">
//                       {article.category || "EV Guide"}
//                     </span>

//                     <span>→</span>

//                   </div>

//                   <h3>
//                     {article.title}
//                   </h3>

//                   <p>
//                     {article.excerpt}
//                   </p>

//                   <span className="home-article-card__read">
//                     Read article
//                   </span>

//                 </Link>
//               ))}

//             </div>

//           </div>

//         </section>
//       )}

//       {/* ================= REVIEWS ================= */}

//       {reviews.length > 0 && (
//         <section className="section">

//           <div className="shell">

//             <div className="section-head">

//               <div>
//                 <span className="eyebrow">
//                   Community voice
//                 </span>

//                 <h2>
//                   Recent EV reviews.
//                 </h2>
//               </div>

//               <Link
//                 href="/reviews"
//                 className="btn btn-secondary"
//               >
//                 All reviews
//                 <span>→</span>
//               </Link>

//             </div>

//             <div className="home-review-grid">

//               {reviews.map((review) => (
//                 <article
//                   key={review.id}
//                   className="home-review-card"
//                 >

//                   <div className="home-review-card__top">

//                     <span>
//                       ★ {review.score || "—"}
//                     </span>

//                     <small>
//                       {review.category || "EV Review"}
//                     </small>

//                   </div>

//                   <h3>
//                     {review.title}
//                   </h3>

//                   <p>
//                     {review.excerpt}
//                   </p>

//                   <Link
//                     href={`/reviews/${review.slug}`}
//                   >
//                     Read review →
//                   </Link>

//                 </article>
//               ))}

//             </div>

//           </div>

//         </section>
//       )}

//       {/* ================= GLOBAL MARKETS ================= */}

//       <section className="section">

//         <div className="shell">

//           <div className="home-market">

//             <div className="home-market__content">

//               <span className="eyebrow">
//                 Global coverage
//               </span>

//               <h2>
//                 Built to grow
//                 <br />
//                 across markets.
//               </h2>

//               <p>
//                 EVInsights is structured to support
//                 market-specific availability, pricing
//                 and vehicle information.
//               </p>

//             </div>

//             <div className="home-market__pills">

//               {markets.map((market) => (
//                 <span key={market}>
//                   {market}
//                 </span>
//               ))}

//             </div>

//           </div>

//         </div>

//       </section>

//       {/* ================= FINAL CTA ================= */}

//       <section className="section home-final">

//         <div className="shell">

//           <div className="home-final__panel">

//             <div>

//               <span className="eyebrow">
//                 Ready to compare?
//               </span>

//               <h2>
//                 Pick the EV
//                 <br />
//                 that fits your life.
//               </h2>

//               <p>
//                 Use price, range, charging and ownership
//                 information to make a smarter EV decision.
//               </p>

//             </div>

//             <div className="home-final__actions">

//               <Link
//                 href="/cars"
//                 className="btn btn-primary"
//               >
//                 Explore EVs
//                 <span>→</span>
//               </Link>

//               <Link
//                 href="/compare"
//                 className="btn btn-secondary"
//               >
//                 Open comparison studio
//               </Link>

//             </div>

//           </div>

//         </div>

//       </section>

//     </main>
//   );
// }


// import Link from "next/link";
// import VehicleCard from "@/components/vehicle-card";
// import { getSiteSnapshot } from "@/server/services/site.service";
// import "./home.css";

// export const dynamic = "force-dynamic";

// export default async function HomePage() {
//   const snapshot = await getSiteSnapshot();

//   const approvedVehicles = snapshot.approved || [];
//   const featuredVehicles =
//     snapshot.featured?.length > 0
//       ? snapshot.featured.slice(0, 4)
//       : approvedVehicles.slice(0, 4);

//   const brands = snapshot.brands || [];
//   const content = snapshot.content || [];

//   const brandMap = new Map(
//     brands.map((brand) => [brand.id, brand])
//   );

//   const stats = [
//     {
//       value: approvedVehicles.length,
//       label: "Verified EVs",
//     },
//     {
//       value: brands.length,
//       label: "Brands",
//     },
//     {
//       value: content.length,
//       label: "Insights",
//     },
//     {
//       value: "Global",
//       label: "EV data",
//     },
//   ];

//   return (
//     <main className="home-page">
//       {/* HERO */}
//       <section className="home-hero">
//         <div className="shell home-hero__inner">
//           <div className="home-hero__content">
//             <span className="eyebrow">
//               Global electric vehicle intelligence
//             </span>

//             <h1>
//               Know the EV
//               <br />
//               before you buy it.
//             </h1>

//             <p className="home-hero__lead">
//               Explore source-backed specifications, pricing, charging,
//               comparisons, reviews and practical EV insights — all in one
//               place.
//             </p>

//             <div className="home-hero__actions">
//               <Link href="/cars" className="btn btn-primary">
//                 Explore electric cars
//                 <span aria-hidden="true">→</span>
//               </Link>

//               <Link href="/compare" className="btn btn-secondary">
//                 Compare EVs
//               </Link>
//             </div>

//             <div className="home-hero__search">
//               <form action="/cars">
//                 <svg
//                   viewBox="0 0 24 24"
//                   aria-hidden="true"
//                 >
//                   <circle cx="11" cy="11" r="6.5" />
//                   <path d="m16 16 5 5" />
//                 </svg>

//                 <input
//                   name="search"
//                   placeholder="Search Tesla, BMW, Hyundai..."
//                   aria-label="Search electric vehicles"
//                 />

//                 <button type="submit">
//                   Search EVs
//                 </button>
//               </form>
//             </div>
//           </div>

//           <div className="home-hero__visual">
//             <div className="hero-orbit hero-orbit--one" />
//             <div className="hero-orbit hero-orbit--two" />

//             <div className="hero-visual-card">
//               <span className="hero-visual-card__label">
//                 EV DIRECTORY
//               </span>

//               <div className="hero-visual-card__ev">
//                 EV
//               </div>

//               <div className="hero-visual-card__bottom">
//                 <span>
//                   Source-backed
//                   <br />
//                   vehicle intelligence
//                 </span>

//                 <span className="hero-visual-card__arrow">
//                   ↗
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* STATS */}
//       <section className="home-stats">
//         <div className="shell home-stats__grid">
//           {stats.map((item) => (
//             <div className="home-stat" key={item.label}>
//               <strong>{item.value}</strong>
//               <span>{item.label}</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* FEATURED VEHICLES */}
//       <section className="section home-featured">
//         <div className="shell">
//           <div className="section-head">
//             <div>
//               <span className="eyebrow">
//                 Directory
//               </span>

//               <h2>
//                 Featured electric cars
//               </h2>

//               <p className="section-lead">
//                 Explore some of the verified EVs currently tracked
//                 by EVInsights.
//               </p>
//             </div>

//             <Link
//               href="/cars"
//               className="home-section-link"
//             >
//               View all cars
//               <span>→</span>
//             </Link>
//           </div>

//           {featuredVehicles.length > 0 ? (
//             <div className="vehicle-grid">
//               {featuredVehicles.map((vehicle) => (
//                 <VehicleCard
//                   key={vehicle.id}
//                   vehicle={vehicle}
//                   brand={brandMap.get(vehicle.brandId)}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="home-empty">
//               No featured electric vehicles are available yet.
//             </div>
//           )}
//         </div>
//       </section>

//       {/* BRANDS */}
//       <section className="section section-muted home-brands">
//         <div className="shell">
//           <div className="section-head">
//             <div>
//               <span className="eyebrow">
//                 Manufacturers
//               </span>

//               <h2>
//                 Explore by brand.
//               </h2>
//             </div>

//             <Link
//               href="/brands"
//               className="home-section-link"
//             >
//               All brands
//               <span>→</span>
//             </Link>
//           </div>

//           <div className="home-brands__grid">
//             {brands.slice(0, 8).map((brand) => (
//               <Link
//                 href={`/brands/${brand.slug || brand.id}`}
//                 className="home-brand"
//                 key={brand.id}
//               >
//                 <span className="home-brand__mark">
//                   {(brand.name || "EV")
//                     .slice(0, 2)
//                     .toUpperCase()}
//                 </span>

//                 <span>
//                   {brand.name || "Unknown brand"}
//                 </span>

//                 <span className="home-brand__arrow">
//                   ↗
//                 </span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* COMPARE CTA */}
//       <section className="home-compare">
//         <div className="shell">
//           <div className="home-compare__box">
//             <div>
//               <span className="eyebrow">
//                 Comparison studio
//               </span>

//               <h2>
//                 Don't just choose an EV.
//                 <br />
//                 Compare it.
//               </h2>

//               <p>
//                 Put up to four electric vehicles side by side
//                 and see the differences that actually matter.
//               </p>
//             </div>

//             <Link
//               href="/compare"
//               className="btn btn-primary"
//             >
//               Start comparing
//               <span aria-hidden="true">→</span>
//             </Link>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }



// import HeroSection from "@/components/home/HeroSection";
// import { getSiteSnapshot } from "@/server/services/site.service";

// export const dynamic = "force-dynamic";

// export default async function Home() {
//   const {
//     vehicles = [],
//     brands = [],
//   } = await getSiteSnapshot();

//   return (
//     <main className="home-page">
//       <HeroSection
//         vehicleCount={vehicles.length}
//         brandCount={brands.length}
//       />
//     </main>
//   );
// }


import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedEVs from "@/components/home/FeaturedEVs";
import BodyTypesSection from "@/components/home/BodyTypesSection";
import BrandsSection from "@/components/home/BrandsSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import GuidesSection from "@/components/home/GuidesSection";
import ChargingSection from "@/components/home/ChargingSection";
import MarketInsights from "@/components/home/MarketInsights";
import WhyEVInsights from "@/components/home/WhyEVInsights";
import FinalCTA from "@/components/home/FinalCTA";
// import Footer from "@/components/home/Footer";


import { getSiteSnapshot } from "@/server/services/site.service";

export const dynamic = "force-dynamic";

export default async function Home() {
  const snapshot = await getSiteSnapshot();

  const marketCount = new Set(
    snapshot.vehicles.flatMap(
      (vehicle) => vehicle?.markets || []
    )
  ).size;

  return (
    <main className="home-page">
      <HeroSection
        vehicleCount={snapshot.vehicles.length}
        brandCount={snapshot.brands.length}
      />

      <StatsSection
        vehicleCount={snapshot.vehicles.length}
        brandCount={snapshot.brands.length}
        marketCount={marketCount}
        contentCount={snapshot.content.length}
      />

      <FeaturedEVs
        vehicles={snapshot.vehicles}
        brands={snapshot.brands}
      />

      <BodyTypesSection />

      <BrandsSection brands={snapshot.brands} />

      <ReviewsSection content={snapshot.content} />

      <GuidesSection />

      <ChargingSection />

      <MarketInsights />

      <WhyEVInsights />

      <FinalCTA />

      {/* <Footer /> */}
    </main>
  );
}