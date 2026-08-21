import Link from "next/link";

const bodyTypes = [
  {
    id: "suv",
    title: "SUV",
    description: "Spacious electric SUVs for family and long-distance driving.",
  },
  {
    id: "sedan",
    title: "Sedan",
    description: "Efficient and refined electric sedans.",
  },
  {
    id: "crossover",
    title: "Crossover",
    description: "Practical EVs combining SUV versatility with car efficiency.",
  },
  {
    id: "hatchback",
    title: "Hatchback",
    description: "Compact electric cars made for everyday city driving.",
  },
  {
    id: "performance",
    title: "Performance",
    description: "High-performance EVs built for speed and excitement.",
  },
  {
    id: "mpv",
    title: "MPV",
    description: "Electric people movers with maximum practicality.",
  },
];

export default function BodyTypesSection() {
  return (
    <section className="section section-muted home-body-types">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="eyebrow">Explore by type</span>
            <h2>Find the EV that fits your life.</h2>
          </div>
        </div>

        <div className="body-type-grid">
          {bodyTypes.map((type) => (
            <Link
              href={`/cars?bodyType=${type.id}`}
              className="body-type-card"
              key={type.id}
            >
              <span className="body-type-card__number">
                0{bodyTypes.indexOf(type) + 1}
              </span>

              <div>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
              </div>

              <span className="body-type-card__arrow">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}