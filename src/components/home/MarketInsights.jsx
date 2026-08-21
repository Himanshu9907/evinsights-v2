import Link from "next/link";

const insights = [
  {
    value: "Range",
    title: "Longer-range EVs are changing road-trip expectations.",
  },
  {
    value: "Battery",
    title: "Battery technology remains at the heart of EV innovation.",
  },
  {
    value: "Charging",
    title: "Faster charging is making EV ownership more convenient.",
  },
];

export default function MarketInsights() {
  return (
    <section className="section home-market">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="eyebrow">EV intelligence</span>
            <h2>What's happening in the EV world?</h2>
            <p className="section-lead">
              Follow the trends shaping electric mobility.
            </p>
          </div>

          <Link href="/insights" className="btn btn-secondary">
            All insights →
          </Link>
        </div>

        <div className="market-grid">
          {insights.map((item, index) => (
            <article className="market-card" key={item.value}>
              <span className="market-card__number">
                0{index + 1}
              </span>

              <span className="market-card__category">
                {item.value}
              </span>

              <h3>{item.title}</h3>

              <Link href="/insights">
                Explore insight →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}