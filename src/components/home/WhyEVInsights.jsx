const reasons = [
  {
    number: "01",
    title: "Source-backed",
    text: "Vehicle information is built around traceable sources and structured data.",
  },
  {
    number: "02",
    title: "Verified",
    text: "Approved vehicle records are clearly identified throughout the platform.",
  },
  {
    number: "03",
    title: "Global",
    text: "Explore EVs across multiple markets, manufacturers and regions.",
  },
  {
    number: "04",
    title: "Comparable",
    text: "Put multiple EVs side-by-side and understand their real differences.",
  },
  {
    number: "05",
    title: "Continuously updated",
    text: "Automation keeps the underlying EV dataset fresh as new information arrives.",
  },
];

export default function WhyEVInsights() {
  return (
    <section className="section section-muted home-why">
      <div className="shell">
        <div className="why-layout">
          <div className="why-intro">
            <span className="eyebrow">Why EVInsights</span>

            <h2>
              Less guesswork.
              <span> Better EV decisions.</span>
            </h2>

            <p>
              EVInsights brings specifications, pricing, charging,
              comparisons and expert content together in one place.
            </p>
          </div>

          <div className="why-list">
            {reasons.map((item) => (
              <div className="why-item" key={item.number}>
                <span>{item.number}</span>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}