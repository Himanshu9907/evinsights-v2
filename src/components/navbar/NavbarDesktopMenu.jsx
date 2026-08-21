
import Link from "next/link";

const links = [
  { label: "Cars", href: "/cars" },
  { label: "Compare", href: "/compare" },
  { label: "Brands", href: "/brands" },
  { label: "Reviews", href: "/reviews" },
  { label: "Guides", href: "/guides" },
];

export default function NavbarDesktopMenu() {
  return (
    <nav className="navbar__desktop-menu" aria-label="Primary navigation">
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

