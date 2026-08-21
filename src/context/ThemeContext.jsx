// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// const ThemeContext = createContext(null);

// export const THEMES = [
//   {
//     id: "midnight",
//     name: "Midnight",
//     className: "theme-midnight",
//   },
//   {
//     id: "graphite",
//     name: "Graphite",
//     className: "theme-graphite",
//   },
//   {
//     id: "arctic",
//     name: "Arctic",
//     className: "theme-arctic",
//   },
//   {
//     id: "emerald",
//     name: "Emerald",
//     className: "theme-emerald",
//   },
//   {
//     id: "royal",
//     name: "Royal",
//     className: "theme-royal",
//   },
// ];

// export function ThemeProvider({ children }) {
//   const [theme, setThemeState] = useState("midnight");

//   useEffect(() => {
//     const saved = localStorage.getItem("evinsights-theme");

//     if (
//       saved &&
//       THEMES.some((item) => item.id === saved)
//     ) {
//       setThemeState(saved);
//       document.documentElement.dataset.theme = saved;
//     } else {
//       document.documentElement.dataset.theme = "midnight";
//     }
//   }, []);

//   function setTheme(value) {
//     if (!THEMES.some((item) => item.id === value)) {
//       return;
//     }

//     setThemeState(value);

//     localStorage.setItem("evinsights-theme", value);
//     document.documentElement.dataset.theme = value;

//     window.dispatchEvent(
//       new CustomEvent("evinsights-theme-change", {
//         detail: value,
//       })
//     );
//   }

//   return (
//     <ThemeContext.Provider
//       value={{
//         theme,
//         setTheme,
//         themes: THEMES,
//       }}
//     >
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   const context = useContext(ThemeContext);

//   if (!context) {
//     throw new Error(
//       "useTheme must be used inside ThemeProvider"
//     );
//   }

//   return context;
// }


// "use client";

// import { createContext, useContext, useEffect, useMemo, useState } from "react";

// const ThemeContext = createContext(null);

// const THEMES = [
//   { id: "light", label: "Light" },
//   { id: "dark", label: "Dark" },
//   { id: "system", label: "System" },
// ];

// export function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     const root = document.documentElement;

//     if (theme === "system") {
//       const dark = window.matchMedia(
//         "(prefers-color-scheme: dark)"
//       ).matches;

//       root.dataset.theme = dark ? "dark" : "light";
//       return;
//     }

//     root.dataset.theme = theme;
//   }, [theme]);

//   const value = useMemo(
//     () => ({
//       theme,
//       setTheme,
//       themes: THEMES,
//     }),
//     [theme]
//   );

//   return (
//     <ThemeContext.Provider value={value}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   const context = useContext(ThemeContext);

//   if (!context) {
//     throw new Error("useTheme must be used inside ThemeProvider");
//   }

//   return context;
// }

"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export const themes = [
  {
    id: "emerald",
    label: "Emerald",
  },
  {
    id: "midnight",
    label: "Midnight",
  },
  {
    id: "ocean",
    label: "Ocean",
  },
  {
    id: "sunset",
    label: "Sunset",
  },
  {
    id: "violet",
    label: "Violet",
  },
];

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("emerald");

  useEffect(() => {
    const saved = localStorage.getItem("evinsights-theme");

    if (saved && themes.some((item) => item.id === saved)) {
      setThemeState(saved);
      document.documentElement.dataset.theme = saved;
    } else {
      document.documentElement.dataset.theme = "emerald";
    }
  }, []);

  function setTheme(value) {
    setThemeState(value);
    localStorage.setItem("evinsights-theme", value);
    document.documentElement.dataset.theme = value;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        themes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}