// import "./globals.css";
// import "./home.css";
// import "@/styles/cars.css";
// import "@/styles/compare.css";
// import Navbar from "@/components/navbar/Navbar";
// import Footer from "@/components/home/Footer";
// import { ThemeProvider } from "@/context/ThemeContext";
// import { LanguageProvider } from "@/context/LanguageContext";
// import { CurrencyProvider } from "@/context/CurrencyContext";
// import CustomCursor from "@/components/CustomCursor";


// export const metadata = {
//   title: "EVInsights Hub",
//   description:
//     "Global electric vehicle intelligence, specifications, pricing, comparisons and insights.",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <CustomCursor />
//         <ThemeProvider>
//           <LanguageProvider>
//             <CurrencyProvider>
//               <Navbar />
//               <main>{children}</main>
//               <Footer />
//             </CurrencyProvider>
//           </LanguageProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }


import "./globals.css";
import "./home.css";
import "@/styles/cars.css";
import "@/styles/compare.css";

import Script from "next/script";

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
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body>
        {/* Google Analytics 4 */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />

            <Script
              id="google-analytics"
              strategy="afterInteractive"
            >
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;

                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

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