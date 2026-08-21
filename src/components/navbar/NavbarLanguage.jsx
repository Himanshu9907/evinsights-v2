

"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function NavbarLanguage() {
  const { language, setLanguage, languages } = useLanguage();
  const [open, setOpen] = useState(false);

  const current =
    languages.find((item) => item.code === language) || languages[0];

  return (
    <div className="navbar-menu-control">
      <button
        type="button"
        className="navbar-icon-button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Choose language"
      >
        <svg viewBox="0 0 24 24" className="navbar-icon">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c3 3 3 15 0 18" />
          <path d="M12 3c-3 3-3 15 0 18" />
        </svg>

        <span className="navbar-button-value">{current.code.toUpperCase()}</span>
      </button>

      {open && (
        <div className="navbar-dropdown">
          {languages.map((item) => (
            <button
              type="button"
              key={item.code}
              className={item.code === language ? "active" : ""}
              onClick={() => {
                setLanguage(item.code);
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}