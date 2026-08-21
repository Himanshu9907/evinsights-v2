// import Link from "next/link";
// const guides=[['How EV charging works','Understand AC vs DC charging, charging speed, connectors and what actually affects charging time.'],['How to compare electric cars','A practical framework for comparing price, range, battery, charging, safety and ownership cost.'],['What affects EV range?','Weather, speed, tyres, battery state and driving style all change real-world range.'],['EV vs petrol running cost','Use energy price and monthly mileage to compare the cost of moving an electric car against a petrol car.']];
// export default function Guides(){return <main className="shell"><section className="page-hero"><span className="eyebrow">EV knowledge hub</span><h1>Guides for first-time and experienced EV buyers.</h1><p>Simple explanations of the technology and ownership decisions behind electric vehicles.</p></section><div className="feature-grid">{guides.map(([t,d])=><article className="feature" key={t}><span className="eyebrow">Guide</span><h3>{t}</h3><p>{d}</p><Link className="btn btn-secondary" href="/calculators/charging-cost">Explore tools →</Link></article>)}</div></main>}


// import Link from "next/link";

// const guides = [
//   [
//     "How EV charging works",
//     "Understand AC vs DC charging, charging speed, connectors and what actually affects charging time.",
//   ],
//   [
//     "How to compare electric cars",
//     "A practical framework for comparing price, range, battery, charging, safety and ownership cost.",
//   ],
//   [
//     "What affects EV range?",
//     "Weather, speed, tyres, battery state and driving style all change real-world range.",
//   ],
//   [
//     "EV vs petrol running cost",
//     "Use energy price and monthly mileage to compare the cost of moving an electric car against a petrol car.",
//   ],
// ];

// export default function Guides() {
//   return (
//     <main className="shell guides-page">
//       <section className="page-hero guides-hero">
//         <div className="guides-hero__content">
//           <span className="eyebrow">EV knowledge hub</span>

//           <h1>
//             Understand EVs.
//             <span> Make better decisions.</span>
//           </h1>

//           <p>
//             Simple explanations of the technology, ownership costs and
//             decisions behind electric vehicles — without the jargon.
//           </p>

//           <div className="guides-hero__meta">
//             <span>04 Featured guides</span>
//             <span>EVInsights Knowledge Hub</span>
//           </div>
//         </div>

//         <div className="guides-hero__visual">
//           <div className="guides-hero__orb">
//             <span>EV</span>
//           </div>

//           <div className="guides-hero__floating guides-hero__floating--top">
//             <span>Learn</span>
//             <strong>01</strong>
//           </div>

//           <div className="guides-hero__floating guides-hero__floating--bottom">
//             <span>Understand</span>
//             <strong>→</strong>
//           </div>
//         </div>
//       </section>

//       <section className="guides-section">
//         <div className="guides-section__head">
//           <div>
//             <span className="eyebrow">Explore the knowledge hub</span>
//             <h2>EV guides, made simple.</h2>
//           </div>

//           <p>
//             Start with the topic you want to understand and build your EV
//             knowledge step by step.
//           </p>
//         </div>

//         <div className="guides-grid">
//           {guides.map(([title, description], index) => (
//             <article className="guide-feature-card" key={title}>
//               <div className="guide-feature-card__top">
//                 <span className="guide-feature-card__number">
//                   0{index + 1}
//                 </span>

//                 <span className="guide-feature-card__tag">
//                   EV GUIDE
//                 </span>
//               </div>

//               <div className="guide-feature-card__body">
//                 <h3>{title}</h3>

//                 <p>{description}</p>
//               </div>

//               <div className="guide-feature-card__footer">
//                 <Link
//                   className="guide-feature-card__link"
//                   href="/calculators/charging-cost"
//                 >
//                   Explore tools
//                   <span>→</span>
//                 </Link>
//               </div>
//             </article>
//           ))}
//         </div>
//       </section>

//       <section className="guides-bottom-cta">
//         <div>
//           <span className="eyebrow">EVInsights tools</span>

//           <h2>
//             Learn the numbers.
//             <span> Understand the decision.</span>
//           </h2>

//           <p>
//             Use EVInsights tools alongside our guides to turn EV information
//             into practical buying decisions.
//           </p>
//         </div>

//         <Link
//           href="/calculators/charging-cost"
//           className="btn btn-primary"
//         >
//           Explore EV tools →
//         </Link>
//       </section>
//     </main>
//   );
// }

// import Link from "next/link";

// const guides = [
//   {
//     title: "How EV charging works",
//     description:
//       "Understand AC vs DC charging, charging speed, connectors and what actually affects charging time.",
//     href: "/calculators/charging-time",
//     button: "Calculate charging time →",
//   },
//   {
//     title: "How to compare electric cars",
//     description:
//       "A practical framework for comparing price, range, battery, charging, safety and ownership cost.",
//     href: "/compare",
//     button: "Compare EVs →",
//   },
//   {
//     title: "What affects EV range?",
//     description:
//       "Weather, speed, tyres, battery state and driving style all change real-world range.",
//     href: "/calculators/range-estimator",
//     button: "Estimate range →",
//   },
//   {
//     title: "EV vs petrol running cost",
//     description:
//       "Use energy price and monthly mileage to compare the cost of moving an electric car against a petrol car.",
//     href: "/calculators/running-cost",
//     button: "Calculate running cost →",
//   },
// ];

// export default function Guides() {
//   return (
//     <main className="shell">

//       <section className="page-hero">
//         <span className="eyebrow">
//           EV knowledge hub
//         </span>

//         <h1>
//           Guides for first-time and experienced EV buyers.
//         </h1>

//         <p>
//           Simple explanations of the technology and
//           ownership decisions behind electric vehicles.
//         </p>
//       </section>

//       <div className="feature-grid">

//         {guides.map((guide) => (
//           <article
//             className="feature"
//             key={guide.title}
//           >
//             <span className="eyebrow">
//               Guide
//             </span>

//             <h3>
//               {guide.title}
//             </h3>

//             <p>
//               {guide.description}
//             </p>

//             <Link
//               className="btn btn-secondary"
//               href={guide.href}
//             >
//               {guide.button}
//             </Link>
//           </article>
//         ))}

//       </div>

//     </main>
//   );
// }

import Link from "next/link";

const guides = [
  {
    number: "01",
    title: "How EV charging works",
    description:
      "Understand AC vs DC charging, charging speed, connectors and what actually affects charging time.",
    href: "/calculators/charging-time",
    button: "Calculate charging time →",
  },
  {
    number: "02",
    title: "How to compare electric cars",
    description:
      "A practical framework for comparing price, range, battery, charging, safety and ownership cost.",
    href: "/compare",
    button: "Compare EVs →",
  },
  {
    number: "03",
    title: "What affects EV range?",
    description:
      "Weather, speed, tyres, battery state and driving style all change real-world range.",
    href: "/calculators/range-estimator",
    button: "Estimate range →",
  },
  {
    number: "04",
    title: "EV vs petrol running cost",
    description:
      "Use energy price and monthly mileage to compare the cost of moving an electric car against a petrol car.",
    href: "/calculators/running-cost",
    button: "Calculate running cost →",
  },
];

export default function Guides() {
  return (
    <main className="shell guides-page">

      {/* =====================================================
          PREMIUM HERO
      ===================================================== */}

      <section className="guides-hero">

        <div className="guides-hero-content">

          <span className="eyebrow">
            EV KNOWLEDGE HUB
          </span>

          <h1>
            Understand EVs.
            <br />
            <span>Make smarter decisions.</span>
          </h1>

          <p>
            Simple explanations of the technology, ownership
            decisions and real-world factors behind electric
            vehicles.
          </p>

        </div>

        {/* HERO VISUAL */}

        <div className="guides-hero-visual">

          <div className="guides-orbit guides-orbit--outer" />
          <div className="guides-orbit guides-orbit--middle" />
          <div className="guides-orbit guides-orbit--inner" />

          <div className="guides-orbit-dot" />

          <div className="guides-hero-circle">

            <span className="guides-circle-label">
              KNOWLEDGE
            </span>

            <strong>
              EV
            </strong>

            <span className="guides-circle-small">
              HUB
            </span>

          </div>

          <div className="guides-stat-card">
            <span>GUIDES</span>
            <strong>04</strong>
            <small>Explore EV knowledge</small>
          </div>

        </div>

      </section>


      {/* =====================================================
          GUIDE INTRO
      ===================================================== */}

      <section className="guides-intro">

        <div>
          <span className="eyebrow">
            EXPLORE THE KNOWLEDGE HUB
          </span>

          <h2>
            EV knowledge,
            <br />
            made simple.
          </h2>
        </div>

        <p>
          Start with the topic you want to understand and
          move directly into the practical tool behind it.
        </p>

      </section>


      {/* =====================================================
          GUIDE CARDS
      ===================================================== */}

      <section className="guides-grid">

        {guides.map((guide) => (
          <article
            className="guide-tool-card"
            key={guide.number}
          >

            <div className="guide-card-top">

              <span className="guide-number">
                {guide.number}
              </span>

              <span className="guide-card-tag">
                EV GUIDE
              </span>

            </div>

            <div className="guide-card-content">

              <h3>
                {guide.title}
              </h3>

              <p>
                {guide.description}
              </p>

            </div>

            <Link
              href={guide.href}
              className="guide-tool-link"
            >
              <span>
                {guide.button}
              </span>

              <span aria-hidden="true">
                ↗
              </span>
            </Link>

          </article>
        ))}

      </section>

    </main>
  );
}

