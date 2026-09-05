
// "use client";

// import Link from "next/link";
// import NavbarSearch from "./NavbarSearch";
// import NavbarLanguage from "./NavbarLanguage";
// import NavbarCurrency from "./NavbarCurrency";
// import NavbarTheme from "./NavbarTheme";

// const links = [
//   { label: "Cars", href: "/cars" },
//   { label: "Compare", href: "/compare" },
//   { label: "Brands", href: "/brands" },
//   { label: "Reviews", href: "/reviews" },
//   { label: "Guides", href: "/guides" },
// ];

// export default function NavbarMobileMenu({ open, onClose }) {
//   if (!open) return null;

//   return (
//     <div className="navbar-mobile-menu">
//       <div className="navbar-mobile-menu__inner">
//         <NavbarSearch />

//         <nav aria-label="Mobile navigation">
//           {links.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               onClick={onClose}
//             >
//               <span>{link.label}</span>
//               <span>→</span>
//             </Link>
//           ))}
//         </nav>

//         <div className="navbar-mobile-menu__controls">
//           <NavbarLanguage />
//           <NavbarCurrency />
//           <NavbarTheme />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import NavbarSearch from "./NavbarSearch";
// import NavbarLanguage from "./NavbarLanguage";
import NavbarCurrency from "./NavbarCurrency";
import NavbarTheme from "./NavbarTheme";

const links = [
  { href: "/cars", label: "Cars" },
  { href: "/compare", label: "Compare" },
  { href: "/brands", label: "Brands" },
  { href: "/reviews", label: "Reviews" },
  { href: "/guides", label: "Guides" },
];

export default function NavbarMobileMenu({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="navbar-mobile-menu">
      <div className="navbar-mobile-menu__inner">

        {/* Search */}
        <NavbarSearch />

        {/* Language / Currency / Theme */}
        <div className="navbar-mobile-menu__controls">
          {/* <NavbarLanguage /> */}
          <NavbarCurrency />
          <NavbarTheme />
        </div>

        {/* Navigation */}
        <nav aria-label="Mobile navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
            >
              <span>{link.label}</span>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </nav>

      </div>
    </div>
  );
}