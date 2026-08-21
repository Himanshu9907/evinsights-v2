
// import Link from "next/link";

// export default function HeroSection({ vehicleCount = 0, brandCount = 0 }) {
//   return (
//     <section className="home-hero">
//       <div className="shell home-hero__inner">
//         <div className="home-hero__content">
//           <span className="eyebrow">Global electric vehicle intelligence</span>

//           <h1>
//             Know the EV
//             <span> before you buy it.</span>
//           </h1>

//           <p>
//             Explore electric cars, real-world specifications, pricing,
//             charging, comparisons, reviews and EV insights — all in one place.
//           </p>

//           <form className="home-hero__search" action="/cars">
//             <div className="home-hero__search-box">
//               <svg viewBox="0 0 24 24" aria-hidden="true">
//                 <circle cx="11" cy="11" r="6.5" />
//                 <path d="m16 16 5 5" />
//               </svg>

//               <input
//                 name="q"
//                 type="search"
//                 placeholder="Search Tesla Model Y, Tata Nexon EV..."
//                 aria-label="Search electric vehicles"
//               />
//             </div>

//             <button type="submit" className="btn btn-primary">
//               Search EVs →
//             </button>
//           </form>

//           <div className="home-hero__actions">
//             <Link href="/cars" className="btn btn-primary">
//               Explore EVs
//             </Link>

//             <Link href="/compare" className="btn btn-secondary">
//               Compare EVs
//             </Link>
//           </div>

//           <div className="home-hero__trust">
//             <span>✓ Source-backed data</span>
//             <span>✓ Global markets</span>
//             <span>✓ Regularly updated</span>
//           </div>
//         </div>

//         <div className="home-hero__visual">
//           <div className="home-hero__glow" />

//           <div className="home-hero__orb">
//             <span>EV</span>
//           </div>

//           <div className="home-hero__floating-card home-hero__floating-card--top">
//             <span>EVs tracked</span>
//             <strong>{vehicleCount}+</strong>
//           </div>

//           <div className="home-hero__floating-card home-hero__floating-card--bottom">
//             <span>Brands</span>
//             <strong>{brandCount}+</strong>
//           </div>

//           <div className="home-hero__label">
//             EVINSIGHTS / GLOBAL EV DATA
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import Link from "next/link";

export default function HeroSection({
  vehicleCount = 0,
  brandCount = 0,
}) {
  return (
    <section className="home-hero">
      <div className="shell home-hero__inner">
        <div className="home-hero__content">
          <span className="eyebrow">
            Global electric vehicle intelligence
          </span>

          <h1>
            Know the EV
            <span> before you buy it.</span>
          </h1>

          <p>
            Explore electric cars, real-world specifications, pricing,
            charging, comparisons, reviews and EV insights — all in one place.
          </p>

          <form className="home-hero__search" action="/cars">
            <div className="home-hero__search-box">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 5 5" />
              </svg>

              <input
                name="search"
                type="search"
                placeholder="Search Tesla Model Y, Tata Nexon EV..."
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Search EVs →
            </button>
          </form>

          <div className="home-hero__actions">
            <Link href="/cars" className="btn btn-primary">
              Explore EVs
            </Link>

            <Link href="/compare" className="btn btn-secondary">
              Compare EVs
            </Link>
          </div>

          <div className="home-hero__trust">
            <span>✓ Source-backed data</span>
            <span>✓ Global markets</span>
            <span>✓ Regularly updated</span>
          </div>
        </div>

        <div className="home-hero__visual">
          <div className="home-hero__glow" />

          <div className="home-hero__orb">
            <span>EV</span>
          </div>

          <div className="home-hero__floating-card home-hero__floating-card--top">
            <span>EVs tracked</span>
            <strong>{vehicleCount}+</strong>
          </div>

          <div className="home-hero__floating-card home-hero__floating-card--bottom">
            <span>Brands</span>
            <strong>{brandCount}+</strong>
          </div>

          <div className="home-hero__label">
            EVINSIGHTS / GLOBAL EV DATA
          </div>
        </div>
      </div>
    </section>
  );
}