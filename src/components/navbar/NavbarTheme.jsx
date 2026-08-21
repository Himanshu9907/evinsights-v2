

"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function NavbarTheme() {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="navbar-menu-control">
      <button
        type="button"
        className="navbar-icon-button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Choose theme"
      >
        <svg viewBox="0 0 24 24" className="navbar-icon">
          <path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4-4 5 5 0 0 1-5-5Z" />
        </svg>
      </button>

      {open && (
        <div className="navbar-dropdown navbar-theme-dropdown">
          {themes.map((item) => (
            <button
              type="button"
              key={item.id}
              className={item.id === theme ? "active" : ""}
              onClick={() => {
                setTheme(item.id);
                setOpen(false);
              }}
            >
              <span className={`theme-dot theme-dot--${item.id}`} />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}