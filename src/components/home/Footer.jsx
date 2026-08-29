import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link href="/" className="site-footer__logo">
              <span>EV</span>
              <strong>
                EV<span>Insights</span>
              </strong>
            </Link>

            <p>
              Global electric vehicle intelligence, specifications,
              pricing, comparisons and insights.
            </p>
          </div>

          <div className="site-footer__column">
            <h4>Explore</h4>

            <Link href="/cars">Cars</Link>
            <Link href="/compare">Compare</Link>
            <Link href="/brands">Brands</Link>
          </div>

          <div className="site-footer__column">
            <h4>Learn</h4>

            <Link href="/reviews">Reviews</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/insights">Insights</Link>
          </div>

          <div className="site-footer__column">
            <h4>Company</h4>

            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>
            © {new Date().getFullYear()} EVInsights Hub
          </span>

          <span>
            Built for the electric future.
          </span>
        </div>
      </div>
    </footer>
  );
}