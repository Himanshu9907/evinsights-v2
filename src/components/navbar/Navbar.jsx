
"use client";

import { useState } from "react";
import NavbarLogo from "./NavbarLogo";
import NavbarDesktopMenu from "./NavbarDesktopMenu";
import NavbarActions from "./NavbarActions";
import NavbarMobileButton from "./NavbarMobileButton";
import NavbarMobileMenu from "./NavbarMobileMenu";
import "./navbar.css";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavbarLogo />

        <NavbarDesktopMenu />

        <NavbarActions />

        <NavbarMobileButton
          open={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
        />
      </div>

      <NavbarMobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}

