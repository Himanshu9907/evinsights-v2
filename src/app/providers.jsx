"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CurrencyProvider } from "@/context/CurrencyContext";

export default function Providers({ children }) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}