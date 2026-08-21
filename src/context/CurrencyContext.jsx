// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// const CurrencyContext = createContext(null);

// export const currencies = [
//   { code: "USD", symbol: "$" },
//   { code: "EUR", symbol: "€" },
//   { code: "GBP", symbol: "£" },
//   { code: "INR", symbol: "₹" },
//   { code: "JPY", symbol: "¥" },
// ];

// export function CurrencyProvider({ children }) {
//   const [currency, setCurrencyState] = useState("USD");

//   useEffect(() => {
//     const saved = localStorage.getItem("evinsights-currency");

//     if (saved && currencies.some((item) => item.code === saved)) {
//       setCurrencyState(saved);
//     }
//   }, []);

//   function setCurrency(value) {
//     setCurrencyState(value);
//     localStorage.setItem("evinsights-currency", value);
//   }

//   return (
//     <CurrencyContext.Provider
//       value={{
//         currency,
//         setCurrency,
//         currencies,
//       }}
//     >
//       {children}
//     </CurrencyContext.Provider>
//   );
// }

// export function useCurrency() {
//   const context = useContext(CurrencyContext);

//   if (!context) {
//     throw new Error("useCurrency must be used inside CurrencyProvider");
//   }

//   return context;
// }


"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CurrencyContext = createContext(null);

export const currencies = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "EUR", symbol: "€", rate: 0.86 },
  { code: "GBP", symbol: "£", rate: 0.74 },
  { code: "INR", symbol: "₹", rate: 93 },
  { code: "JPY", symbol: "¥", rate: 149 },
];

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState("USD");

  useEffect(() => {
    const saved = localStorage.getItem("evinsights-currency");

    if (saved && currencies.some((item) => item.code === saved)) {
      setCurrencyState(saved);
    }
  }, []);

  function setCurrency(value) {
    if (!currencies.some((item) => item.code === value)) return;

    setCurrencyState(value);
    localStorage.setItem("evinsights-currency", value);
  }

  function formatPrice(amount, originalCurrency = "USD") {
    if (amount === null || amount === undefined || amount === "") {
      return "—";
    }

    const source = currencies.find(
      (item) => item.code === originalCurrency
    );

    const target = currencies.find(
      (item) => item.code === currency
    );

    if (!source || !target) {
      return `${amount}`;
    }

    const usdAmount = Number(amount) / source.rate;
    const converted = usdAmount * target.rate;

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: target.code,
      maximumFractionDigits: target.code === "JPY" ? 0 : 0,
    }).format(converted);
  }

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currencies,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error("useCurrency must be used inside CurrencyProvider");
  }

  return context;
}