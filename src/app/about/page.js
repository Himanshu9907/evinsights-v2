import Link from "next/link";
import "./about.css";

export const metadata = {
  title: "About Us | EVInsights Hub",
  description:
    "Learn about EVInsights Hub, an electric vehicle intelligence platform built to make EV research, comparison and buying decisions easier.",
};

export default function AboutPage() {
  return (
    <main>
      {/* =====================================================
          ABOUT HERO
      ===================================================== */}

      <section className="catalog-hero about-hero">
        <div className="shell">
          <span className="eyebrow">ABOUT EVINSIGHTS HUB</span>

          <h1>
            Better information.
            <br />
            <em>Better EV decisions.</em>
          </h1>

          <p>
            EVInsights Hub is built to make electric vehicle research
            simpler, clearer and more useful — bringing specifications,
            pricing, range, charging, safety, reviews and comparisons
            together in one place.
          </p>

          <div className="hero-cta">
            <Link className="btn btn-primary" href="/cars">
              Explore EVs →
            </Link>

            <Link className="btn btn-secondary" href="/compare">
              Compare EVs
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          OUR MISSION
      ===================================================== */}

      <section className="section">
        <div className="shell">
          <div className="split-feature">
            <div>
              <span className="eyebrow">OUR MISSION</span>

              <h2>
                Making the EV decision
                <br />
                easier to understand.
              </h2>

              <p className="section-lead">
                Buying an electric car should not require opening dozens
                of websites, comparing different specification formats
                or trying to understand conflicting numbers.
              </p>

              <p>
                EVInsights Hub brings the important information together
                into a consistent experience so you can research an EV,
                understand its strengths and limitations, compare it
                with alternatives and make a more informed decision.
              </p>
            </div>

            <div className="insight-panel">
              <span className="eyebrow">THE IDEA</span>

              <div className="snapshot-row">
                <span>Research</span>
                <strong>Simple</strong>
              </div>

              <div className="snapshot-row">
                <span>Comparison</span>
                <strong>Clear</strong>
              </div>

              <div className="snapshot-row">
                <span>Vehicle data</span>
                <strong>Structured</strong>
              </div>

              <div className="snapshot-row">
                <span>Markets</span>
                <strong>Global</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT WE DO
      ===================================================== */}

      <section className="section section-muted">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">WHAT WE DO</span>

              <h2>
                Everything around the
                <br />
                EV decision.
              </h2>

              <p className="section-lead">
                EVInsights Hub is designed around the information people
                actually need when researching an electric vehicle.
              </p>
            </div>
          </div>

          <div className="category-grid">
            <Link className="category-card" href="/cars">
              <span>01</span>

              <strong>Explore EVs</strong>

              <p>
                Browse electric cars across manufacturers, models,
                battery options and markets.
              </p>
            </Link>

            <Link className="category-card" href="/compare">
              <span>02</span>

              <strong>Compare Cars</strong>

              <p>
                Put electric vehicles head-to-head across price,
                battery, range, power and charging.
              </p>
            </Link>

            <Link className="category-card" href="/reviews">
              <span>03</span>

              <strong>Read Reviews</strong>

              <p>
                Explore practical EV reviews, strengths, trade-offs
                and ownership-focused insights.
              </p>
            </Link>

            <Link className="category-card" href="/guides">
              <span>04</span>

              <strong>Learn About EVs</strong>

              <p>
                Understand batteries, charging, ownership and the
                technology behind electric vehicles.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY EVINSIGHTS
      ===================================================== */}

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">WHY EVINSIGHTS HUB</span>

              <h2>
                Built around the
                <br />
                information that matters.
              </h2>
            </div>
          </div>

          <div className="feature-data-grid about-feature-grid">
            <div>
              <span>01</span>
              <strong>Consistent data</strong>
              <p>
                Vehicle information follows a structured format so
                different EVs are easier to understand and compare.
              </p>
            </div>

            <div>
              <span>02</span>
              <strong>Source-aware</strong>
              <p>
                Vehicle records can retain source and verification
                context instead of presenting every number as equally
                certain.
              </p>
            </div>

            <div>
              <span>03</span>
              <strong>Made for comparison</strong>
              <p>
                Price, range, battery, performance and charging are
                presented with comparison in mind.
              </p>
            </div>

            <div>
              <span>04</span>
              <strong>Global-ready</strong>
              <p>
                The platform is designed to support different markets,
                currencies and languages as EV adoption grows globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          GLOBAL
      ===================================================== */}

      <section className="section">
        <div className="shell">
          <div className="global-band">
            <div>
              <span className="eyebrow">GLOBAL BY DESIGN</span>

              <h2>
                One EV database.
                <br />
                Every market.
              </h2>

              <p>
                Electric vehicles are becoming a global category.
                EVInsights Hub is designed so market-specific pricing,
                availability, currencies and languages can sit on top
                of the same structured vehicle experience.
              </p>
            </div>

            <div className="market-pills">
              <span>🇺🇸 USA</span>
              <span>🇨🇦 Canada</span>
              <span>🇩🇪 Germany</span>
              <span>🇬🇧 UK</span>
              <span>🇫🇷 France</span>
              <span>🇳🇴 Norway</span>
              <span>🇦🇺 Australia</span>
              <span>🇯🇵 Japan</span>
              <span>🇮🇳 India</span>
              <span>🌐 More</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DATA PHILOSOPHY
      ===================================================== */}

      <section className="section dark-band">
        <div className="shell">
          <div className="feature-banner">
            <div>
              <span className="eyebrow">OUR APPROACH</span>

              <h2>
                Useful information.
                <br />
                <em>No unnecessary noise.</em>
              </h2>

              <p>
                We want EV research to feel less like searching through
                brochures and more like using a clear decision-making
                tool.
              </p>
            </div>

            <div className="feature-metrics">
              <div>
                <strong>01</strong>
                <span>Discover</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Understand</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Compare</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="section">
        <div className="shell">
          <div className="detail-panel final-cta">
            <div>
              <span className="eyebrow">START EXPLORING</span>

              <h2>
                Your next EV
                <br />
                starts here.
              </h2>

              <p className="section-lead">
                Explore electric cars, compare your options and
                understand the numbers before making your decision.
              </p>
            </div>

            <div className="hero-cta">
              <Link className="btn btn-primary" href="/cars">
                Explore EVs →
              </Link>

              <Link className="btn btn-secondary" href="/compare">
                Compare cars →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}