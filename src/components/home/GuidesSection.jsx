import Link from "next/link";

const guides = [
  {
    title: "How to choose an electric car",
    description:
      "Understand range, battery size, charging and ownership before buying.",
    href: "/guides/how-to-choose-an-ev",
  },
  {
    title: "EV charging explained",
    description:
      "Learn the difference between AC, DC fast charging and charging speeds.",
    href: "/guides/ev-charging-explained",
  },
  {
    title: "Understanding real-world range",
    description:
      "Why advertised range and real-world driving range can be different.",
    href: "/guides/real-world-ev-range",
  },
  {
    title: "EV battery basics",
    description:
      "Learn about battery capacity, degradation, chemistry and longevity.",
    href: "/guides/ev-battery-basics",
  },
];

export default function GuidesSection() {
  return (
    <section className="section home-guides">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="eyebrow">Learn</span>
            <h2>EV guides that make buying easier.</h2>
          </div>

          <Link href="/guides" className="btn btn-secondary">
            Explore guides →
          </Link>
        </div>

        <div className="guide-grid">
          {guides.map((guide, index) => (
            <Link
              href={guide.href}
              className="guide-card"
              key={guide.href}
            >
              <span className="guide-card__number">
                0{index + 1}
              </span>

              <div>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
              </div>

              <span className="guide-card__arrow">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}