

"use client";

import { useState } from "react";
import { useCurrency } from "@/context/CurrencyContext";

export default function NavbarCurrency() {
  const { currency, setCurrency, currencies } = useCurrency();
  const [open, setOpen] = useState(false);

  const current =
    currencies.find((item) => item.code === currency) || currencies[0];

  return (
    <div className="navbar-menu-control">
      <button
        type="button"
        className="navbar-icon-button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Choose currency"
      >
        <svg viewBox="0 0 24 24" className="navbar-icon">
          <circle cx="12" cy="12" r="9" />
          <path d="M14.5 8.5c-.7-.7-1.7-1-2.8-1-1.6 0-2.7.8-2.7 2s1.1 1.8 2.7 2.1c1.6.3 2.7.8 2.7 2.1s-1.1 2-2.8 2c-1.2 0-2.2-.4-2.9-1.1" />
          <path d="M12 5.5v13" />
        </svg>

        <span className="navbar-button-value">
          {current.symbol}
        </span>
      </button>

      {open && (
        <div className="navbar-dropdown">
          {currencies.map((item) => (
            <button
              type="button"
              key={item.code}
              className={item.code === currency ? "active" : ""}
              onClick={() => {
                setCurrency(item.code);
                setOpen(false);
              }}
            >
              {item.code} {item.symbol}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}