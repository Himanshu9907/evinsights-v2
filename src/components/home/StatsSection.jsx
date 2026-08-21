export default function StatsSection({
  vehicleCount = 0,
  brandCount = 0,
  marketCount = 0,
  contentCount = 0,
}) {
  const stats = [
    {
      value: `${vehicleCount}+`,
      label: "EVs Tracked",
    },
    {
      value: `${brandCount}+`,
      label: "Brands",
    },
    {
      value: `${marketCount}+`,
      label: "Markets",
    },
    {
      value: `${contentCount}+`,
      label: "Insights",
    },
    {
      value: "Live",
      label: "Data Updates",
    },
  ];

  return (
    <section className="home-stats">
      <div className="shell home-stats__grid">
        {stats.map((item) => (
          <div className="home-stat" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}