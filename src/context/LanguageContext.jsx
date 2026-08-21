// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// const LanguageContext = createContext(null);

// export const languages = [
//   { code: "en", label: "English" },
//   { code: "hi", label: "हिन्दी" },
//   { code: "de", label: "Deutsch" },
//   { code: "fr", label: "Français" },
//   { code: "ja", label: "日本語" },
// ];

// export function LanguageProvider({ children }) {
//   const [language, setLanguageState] = useState("en");

//   useEffect(() => {
//     const saved = localStorage.getItem("evinsights-language");

//     if (saved && languages.some((item) => item.code === saved)) {
//       setLanguageState(saved);
//     }
//   }, []);

//   function setLanguage(value) {
//     setLanguageState(value);
//     localStorage.setItem("evinsights-language", value);
//   }

//   return (
//     <LanguageContext.Provider
//       value={{
//         language,
//         setLanguage,
//         languages,
//       }}
//     >
//       {children}
//     </LanguageContext.Provider>
//   );
// }

// export function useLanguage() {
//   const context = useContext(LanguageContext);

//   if (!context) {
//     throw new Error("useLanguage must be used inside LanguageProvider");
//   }

//   return context;
// }


"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

export const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "ja", label: "日本語" },
];

const translations = {
  en: {
    nav: {
      cars: "Cars",
      compare: "Compare",
      brands: "Brands",
      reviews: "Reviews",
      guides: "Guides",
    },
    home: {
      eyebrow: "Electric vehicle intelligence",
      title: "Know the EV before you buy it.",
      description:
        "Explore source-backed specifications, pricing, charging, comparisons, reviews and practical EV guides — all in one place.",
      searchPlaceholder: "Search Tata Nexon EV, Model Y, Ioniq 5…",
      searchButton: "Search EVs →",
      explore: "Explore all EVs",
      compare: "Compare cars",
      sourceBacked: "Source-backed",
      globalMarkets: "Global markets",
      editorialData: "Manual editorial data",

      evsTracked: "EVs tracked",
      brands: "Brands",
      sources: "Sources",
      markets: "Markets",

      discover: "Discover",
      featured: "Featured electric cars",
      featuredLead:
        "Explore detailed pricing, variants, range, charging, safety, reviews, gallery and market availability.",
      viewAll: "View all →",

      exploreByNeed: "Explore by need",
      everything: "Everything around the EV decision.",
      findEv: "Find an EV",
      findEvText:
        "Browse the growing electric car catalog by manufacturer and model.",
      compareEvs: "Compare EVs",
      compareEvsText:
        "Put up to four cars head-to-head across the numbers that matter.",
      readReviews: "Read reviews",
      readReviewsText:
        "See practical strengths, trade-offs and traceable vehicle facts.",
      learnEvs: "Learn EVs",
      learnEvsText:
        "Understand charging, ownership, battery technology and buying decisions.",

      why: "Why EVInsights",
      built: "Built for better EV decisions.",
      principle:
        "The platform is designed around one principle: make the important information easy to compare without pretending missing data is verified.",

      sourceFacts: "Source-backed facts",
      sourceFactsText:
        "Vehicle records retain source and verification context.",
      completePage: "One complete vehicle page",
      completePageText:
        "Every car uses the same detailed, reusable layout.",
      globalReady: "Global-ready structure",
      globalReadyText:
        "Markets, currencies and languages are built into the experience.",

      snapshot: "Decision snapshot",
      range: "Range",
      battery: "Battery",
      charging: "Charging",
      openProfile: "Open a full EV profile →",

      readLearn: "Read & learn",
      latest: "Latest EV insights",
      allArticles: "All articles →",

      community: "Community voice",
      recentReviews: "Recent EV reviews.",
      allReviews: "All reviews →",

      globalCoverage: "Global coverage",
      growMarkets: "Built to grow across markets.",
      marketText:
        "Vehicle records can carry market availability and market-specific pricing without changing the core vehicle page.",

      ready: "Ready to compare?",
      pick: "Pick the EV that fits your life.",
      finalText:
        "Use price, range, charging and ownership information instead of guessing from a brochure.",
      exploreEvs: "Explore EVs →",
      comparisonStudio: "Open comparison studio →",
    },
  },

  hi: {
    nav: {
      cars: "कारें",
      compare: "तुलना",
      brands: "ब्रांड",
      reviews: "रिव्यू",
      guides: "गाइड्स",
    },
    home: {
      eyebrow: "इलेक्ट्रिक वाहन इंटेलिजेंस",
      title: "EV खरीदने से पहले उसे अच्छी तरह जानें।",
      description:
        "विश्वसनीय स्रोतों से स्पेसिफिकेशन, कीमत, चार्जिंग, तुलना, रिव्यू और EV गाइड्स — सब एक ही जगह।",
      searchPlaceholder: "Tata Nexon EV, Model Y, Ioniq 5 खोजें…",
      searchButton: "EV खोजें →",
      explore: "सभी EV देखें",
      compare: "कारों की तुलना करें",
      sourceBacked: "स्रोत आधारित",
      globalMarkets: "ग्लोबल मार्केट्स",
      editorialData: "एडिटोरियल डेटा",

      evsTracked: "ट्रैक किए गए EV",
      brands: "ब्रांड",
      sources: "स्रोत",
      markets: "मार्केट्स",

      discover: "खोजें",
      featured: "Featured इलेक्ट्रिक कारें",
      featuredLead:
        "कीमत, वेरिएंट, रेंज, चार्जिंग, सुरक्षा, रिव्यू और मार्केट उपलब्धता की जानकारी देखें।",
      viewAll: "सभी देखें →",

      exploreByNeed: "जरूरत के अनुसार खोजें",
      everything: "EV खरीदने से जुड़ी हर जरूरी जानकारी।",
      findEv: "EV खोजें",
      findEvText:
        "निर्माता और मॉडल के अनुसार इलेक्ट्रिक कारों का कैटलॉग देखें।",
      compareEvs: "EV की तुलना करें",
      compareEvsText:
        "चार तक कारों की जरूरी आंकड़ों के आधार पर तुलना करें।",
      readReviews: "रिव्यू पढ़ें",
      readReviewsText:
        "व्यावहारिक फायदे, कमियां और सत्यापन योग्य वाहन जानकारी देखें।",
      learnEvs: "EV के बारे में जानें",
      learnEvsText:
        "चार्जिंग, बैटरी, ओनरशिप और EV खरीदने के फैसले समझें।",

      why: "EVInsights क्यों",
      built: "बेहतर EV निर्णयों के लिए बनाया गया।",
      principle:
        "हमारा उद्देश्य जरूरी जानकारी को आसानी से तुलना योग्य बनाना है, बिना अपूर्ण डेटा को सत्यापित बताने के।",

      sourceFacts: "स्रोत आधारित जानकारी",
      sourceFactsText:
        "वाहन रिकॉर्ड में स्रोत और verification context मौजूद रहता है।",
      completePage: "एक complete vehicle page",
      completePageText:
        "हर कार के लिए एक समान विस्तृत लेआउट इस्तेमाल होता है।",
      globalReady: "ग्लोबल-ready structure",
      globalReadyText:
        "मार्केट, करेंसी और भाषाएं अनुभव का हिस्सा हैं।",

      snapshot: "फैसला snapshot",
      range: "रेंज",
      battery: "बैटरी",
      charging: "चार्जिंग",
      openProfile: "पूरा EV प्रोफाइल देखें →",

      readLearn: "पढ़ें और सीखें",
      latest: "नवीनतम EV insights",
      allArticles: "सभी articles →",

      community: "कम्युनिटी आवाज",
      recentReviews: "हाल के EV reviews।",
      allReviews: "सभी reviews →",

      globalCoverage: "ग्लोबल कवरेज",
      growMarkets: "अलग-अलग मार्केट्स के लिए तैयार।",
      marketText:
        "Vehicle records में market availability और market-specific pricing रखी जा सकती है।",

      ready: "तुलना के लिए तैयार?",
      pick: "अपने लिए सही EV चुनें।",
      finalText:
        "ब्रोशर पर निर्भर रहने के बजाय कीमत, रेंज, चार्जिंग और ownership जानकारी देखें।",
      exploreEvs: "EV देखें →",
      comparisonStudio: "Comparison studio खोलें →",
    },
  },

  de: {
    nav: {
      cars: "Autos",
      compare: "Vergleichen",
      brands: "Marken",
      reviews: "Tests",
      guides: "Ratgeber",
    },
    home: {
      eyebrow: "Elektrofahrzeug-Intelligenz",
      title: "Kenne das EV, bevor du es kaufst.",
      description:
        "Spezifikationen, Preise, Laden, Vergleiche, Tests und praktische EV-Ratgeber an einem Ort.",
      searchPlaceholder: "Tata Nexon EV, Model Y, Ioniq 5 suchen…",
      searchButton: "EVs suchen →",
      explore: "Alle EVs entdecken",
      compare: "Autos vergleichen",
      sourceBacked: "Quellenbasiert",
      globalMarkets: "Globale Märkte",
      editorialData: "Redaktionelle Daten",

      evsTracked: "EVs erfasst",
      brands: "Marken",
      sources: "Quellen",
      markets: "Märkte",

      discover: "Entdecken",
      featured: "Ausgewählte Elektroautos",
      featuredLead:
        "Preise, Varianten, Reichweite, Laden, Sicherheit, Tests und Marktverfügbarkeit entdecken.",
      viewAll: "Alle anzeigen →",

      exploreByNeed: "Nach Bedarf entdecken",
      everything: "Alles rund um die EV-Entscheidung.",
      findEv: "EV finden",
      findEvText:
        "Durchsuche den Elektroauto-Katalog nach Hersteller und Modell.",
      compareEvs: "EVs vergleichen",
      compareEvsText:
        "Vergleiche bis zu vier Fahrzeuge anhand wichtiger Kennzahlen.",
      readReviews: "Tests lesen",
      readReviewsText:
        "Praktische Stärken, Schwächen und nachvollziehbare Fahrzeugdaten.",
      learnEvs: "EVs verstehen",
      learnEvsText:
        "Laden, Besitz, Batterietechnik und Kaufentscheidungen verstehen.",

      why: "Warum EVInsights",
      built: "Für bessere EV-Entscheidungen entwickelt.",
      principle:
        "Wichtige Informationen sollen einfach vergleichbar sein, ohne unvollständige Daten als verifiziert darzustellen.",

      sourceFacts: "Quellenbasierte Fakten",
      sourceFactsText:
        "Fahrzeugdaten behalten Quellen- und Verifizierungskontext.",
      completePage: "Eine vollständige Fahrzeugseite",
      completePageText:
        "Jedes Fahrzeug verwendet dasselbe detaillierte Layout.",
      globalReady: "Global vorbereitet",
      globalReadyText:
        "Märkte, Währungen und Sprachen sind integriert.",

      snapshot: "Entscheidungsübersicht",
      range: "Reichweite",
      battery: "Batterie",
      charging: "Laden",
      openProfile: "Vollständiges EV-Profil →",

      readLearn: "Lesen & lernen",
      latest: "Neueste EV-Einblicke",
      allArticles: "Alle Artikel →",

      community: "Community",
      recentReviews: "Aktuelle EV-Tests.",
      allReviews: "Alle Tests →",

      globalCoverage: "Globale Abdeckung",
      growMarkets: "Für viele Märkte entwickelt.",
      marketText:
        "Fahrzeugdaten können Marktverfügbarkeit und marktbezogene Preise enthalten.",

      ready: "Bereit zum Vergleichen?",
      pick: "Finde das EV, das zu deinem Leben passt.",
      finalText:
        "Nutze Preis, Reichweite, Laden und Besitzinformationen statt nur einer Broschüre.",
      exploreEvs: "EVs entdecken →",
      comparisonStudio: "Vergleichsstudio öffnen →",
    },
  },

  fr: {
    nav: {
      cars: "Voitures",
      compare: "Comparer",
      brands: "Marques",
      reviews: "Avis",
      guides: "Guides",
    },
    home: {
      eyebrow: "Intelligence automobile électrique",
      title: "Connaissez votre EV avant de l'acheter.",
      description:
        "Spécifications, prix, recharge, comparaisons, avis et guides pratiques réunis au même endroit.",
      searchPlaceholder: "Rechercher Tata Nexon EV, Model Y, Ioniq 5…",
      searchButton: "Rechercher des EV →",
      explore: "Découvrir tous les EV",
      compare: "Comparer les voitures",
      sourceBacked: "Sources vérifiées",
      globalMarkets: "Marchés mondiaux",
      editorialData: "Données éditoriales",

      evsTracked: "EV suivis",
      brands: "Marques",
      sources: "Sources",
      markets: "Marchés",

      discover: "Découvrir",
      featured: "Voitures électriques sélectionnées",
      featuredLead:
        "Découvrez prix, versions, autonomie, recharge, sécurité, avis et disponibilité.",
      viewAll: "Tout voir →",

      exploreByNeed: "Explorer selon vos besoins",
      everything: "Tout ce qui compte pour choisir un EV.",
      findEv: "Trouver un EV",
      findEvText:
        "Parcourez le catalogue électrique par constructeur et modèle.",
      compareEvs: "Comparer les EV",
      compareEvsText:
        "Comparez jusqu'à quatre voitures sur les données essentielles.",
      readReviews: "Lire les avis",
      readReviewsText:
        "Découvrez les points forts, limites et données vérifiables.",
      learnEvs: "Comprendre les EV",
      learnEvsText:
        "Comprenez recharge, batterie, possession et achat.",

      why: "Pourquoi EVInsights",
      built: "Conçu pour de meilleures décisions.",
      principle:
        "Notre objectif est de rendre les informations importantes faciles à comparer sans présenter les données manquantes comme vérifiées.",

      sourceFacts: "Faits issus de sources",
      sourceFactsText:
        "Les fiches conservent le contexte des sources et de la vérification.",
      completePage: "Une fiche véhicule complète",
      completePageText:
        "Chaque voiture utilise une structure détaillée cohérente.",
      globalReady: "Pensé pour le monde",
      globalReadyText:
        "Marchés, devises et langues sont intégrés.",

      snapshot: "Aperçu de décision",
      range: "Autonomie",
      battery: "Batterie",
      charging: "Recharge",
      openProfile: "Ouvrir le profil EV →",

      readLearn: "Lire & apprendre",
      latest: "Dernières infos EV",
      allArticles: "Tous les articles →",

      community: "Voix de la communauté",
      recentReviews: "Derniers avis EV.",
      allReviews: "Tous les avis →",

      globalCoverage: "Couverture mondiale",
      growMarkets: "Conçu pour de nombreux marchés.",
      marketText:
        "Les fiches peuvent contenir disponibilité et prix spécifiques à chaque marché.",

      ready: "Prêt à comparer ?",
      pick: "Choisissez l'EV adapté à votre vie.",
      finalText:
        "Utilisez prix, autonomie, recharge et informations de possession plutôt qu'une brochure.",
      exploreEvs: "Explorer les EV →",
      comparisonStudio: "Ouvrir le comparateur →",
    },
  },

  ja: {
    nav: {
      cars: "車",
      compare: "比較",
      brands: "ブランド",
      reviews: "レビュー",
      guides: "ガイド",
    },
    home: {
      eyebrow: "EVインテリジェンス",
      title: "購入する前に、そのEVを知ろう。",
      description:
        "仕様、価格、充電、比較、レビュー、EVガイドをひとつの場所で確認できます。",
      searchPlaceholder: "Tata Nexon EV、Model Y、Ioniq 5を検索…",
      searchButton: "EVを検索 →",
      explore: "すべてのEVを見る",
      compare: "車を比較",
      sourceBacked: "情報源付き",
      globalMarkets: "世界の市場",
      editorialData: "編集データ",

      evsTracked: "登録EV",
      brands: "ブランド",
      sources: "情報源",
      markets: "市場",

      discover: "発見",
      featured: "注目のEV",
      featuredLead:
        "価格、グレード、航続距離、充電、安全性、レビュー、市場情報を確認できます。",
      viewAll: "すべて見る →",

      exploreByNeed: "目的から探す",
      everything: "EV選びに必要な情報をまとめて確認。",
      findEv: "EVを探す",
      findEvText:
        "メーカーとモデルから電気自動車を検索できます。",
      compareEvs: "EVを比較",
      compareEvsText:
        "最大4台のEVを重要な数値で比較できます。",
      readReviews: "レビューを読む",
      readReviewsText:
        "長所、短所、確認可能な車両情報を確認できます。",
      learnEvs: "EVを学ぶ",
      learnEvsText:
        "充電、バッテリー、所有、購入について学べます。",

      why: "EVInsightsとは",
      built: "より良いEV選びのために。",
      principle:
        "重要な情報を簡単に比較できるようにし、不足しているデータを確認済みとは表示しません。",

      sourceFacts: "情報源付きデータ",
      sourceFactsText:
        "車両データには情報源と確認状況が保存されています。",
      completePage: "完全な車両ページ",
      completePageText:
        "すべての車両で統一された詳細レイアウトを使用します。",
      globalReady: "グローバル対応",
      globalReadyText:
        "市場、通貨、言語に対応しています。",

      snapshot: "購入判断スナップショット",
      range: "航続距離",
      battery: "バッテリー",
      charging: "充電",
      openProfile: "EVプロフィールを見る →",

      readLearn: "読む・学ぶ",
      latest: "最新EV情報",
      allArticles: "すべての記事 →",

      community: "コミュニティ",
      recentReviews: "最新EVレビュー。",
      allReviews: "すべてのレビュー →",

      globalCoverage: "世界対応",
      growMarkets: "世界の市場へ拡大。",
      marketText:
        "車両データには市場ごとの販売状況や価格を保存できます。",

      ready: "比較してみませんか？",
      pick: "あなたの生活に合うEVを選びましょう。",
      finalText:
        "価格、航続距離、充電、所有情報を使ってEVを選びましょう。",
      exploreEvs: "EVを見る →",
      comparisonStudio: "比較スタジオを開く →",
    },
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("evinsights-language");

    if (saved && languages.some((item) => item.code === saved)) {
      setLanguageState(saved);
    }
  }, []);

  function setLanguage(value) {
    if (!languages.some((item) => item.code === value)) return;

    setLanguageState(value);
    localStorage.setItem("evinsights-language", value);

    document.documentElement.lang = value;
  }

  function t(path) {
    const keys = path.split(".");
    let value = translations[language];

    for (const key of keys) {
      value = value?.[key];
    }

    return value ?? path;
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        languages,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}