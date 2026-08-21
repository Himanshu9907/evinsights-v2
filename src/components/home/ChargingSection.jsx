import Link from "next/link";

const chargingItems = [
  {
    title: "AC charging",
    text: "Ideal for overnight and home charging.",
  },
  {
    title: "DC fast charging",
    text: "High-power charging for longer journeys.",
  },
  {
    title: "Charging time",
    text: "Understand how battery size and power affect charging.",
  },
  {
    title: "Connectors",
    text: "Explore the major EV charging connector standards.",
  },
];

export default function ChargingSection() {
  return (
    <section className="section section-muted home-charging">
      <div className="shell">
        <div className="charging-layout">
          <div className="charging-intro">
            <span className="eyebrow">EV charging</span>

            <h2>
              Charge smarter.
              <span> Drive further.</span>
            </h2>

            <p>
              Understand charging speeds, connectors and charging times
              before your next EV journey.
            </p>

            <Link href="/guides/charging" className="btn btn-primary">
              Explore charging →
            </Link>
          </div>

          <div className="charging-grid">
            {chargingItems.map((item, index) => (
              <div className="charging-card" key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}