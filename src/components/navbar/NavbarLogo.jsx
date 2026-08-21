
import Link from "next/link";

export default function NavbarLogo() {
  return (
    <Link href="/" className="navbar__logo" aria-label="EVInsights Hub">
      <span className="navbar__logo-mark">EV</span>

      <span className="navbar__logo-text">
        EV<span>Insights</span>
      </span>
    </Link>
  );
}

