import "./globals.css";
import "./home.css";
import "@/styles/cars.css";
import "@/styles/compare.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/home/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import CustomCursor from "@/components/CustomCursor";


export const metadata = {
  title: "EVInsights Hub",
  description:
    "Global electric vehicle intelligence, specifications, pricing, comparisons and insights.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <ThemeProvider>
          <LanguageProvider>
            <CurrencyProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </CurrencyProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}