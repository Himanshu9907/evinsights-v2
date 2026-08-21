import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="home-final-cta">
      <div className="shell">
        <div className="home-final-cta__inner">
          <div>
            <span className="eyebrow">Your next EV starts here</span>

            <h2>Find the electric car that fits you.</h2>

            <p>
              Explore the catalog, compare your favorites and make
              your next EV decision with confidence.
            </p>
          </div>

          <div className="home-final-cta__actions">
            <Link href="/cars" className="btn btn-primary">
              Explore EVs →
            </Link>

            <Link href="/compare" className="btn btn-secondary">
              Compare cars
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}