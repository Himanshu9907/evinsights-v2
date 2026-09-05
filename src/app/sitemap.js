// import { getSiteSnapshot } from "@/server/services/site.service";

// const SITE_URL =
//   process.env.NEXT_PUBLIC_SITE_URL || "https://evinsightshub.in";

// /* ============================================================
//    HELPERS
// ============================================================ */

// function cleanSlug(value) {
//   if (!value) return null;

//   return String(value)
//     .trim()
//     .replace(/^\/+|\/+$/g, "");
// }

// function getVehicleSlug(vehicle) {
//   return cleanSlug(
//     vehicle?.identity?.slug ||
//       vehicle?.slug ||
//       vehicle?.id
//   );
// }

// function getBrandSlug(brand) {
//   return cleanSlug(
//     brand?.identity?.slug ||
//       brand?.slug ||
//       brand?.id
//   );
// }

// function getContentSlug(content) {
//   return cleanSlug(
//     content?.identity?.slug ||
//       content?.slug ||
//       content?.id
//   );
// }

// function getContentType(content) {
//   return String(
//     content?.type ||
//       content?.contentType ||
//       content?.content_type ||
//       content?.metadata?.type ||
//       ""
//   )
//     .trim()
//     .toLowerCase();
// }

// function getLastModified(item) {
//   const value =
//     item?.updatedAt ||
//     item?.updated_at ||
//     item?.metadata?.updatedAt ||
//     item?.metadata?.updated_at ||
//     item?.createdAt ||
//     item?.created_at ||
//     null;

//   if (!value) {
//     return new Date();
//   }

//   const date = new Date(value);

//   return Number.isNaN(date.getTime())
//     ? new Date()
//     : date;
// }

// /* ============================================================
//    STATIC PAGES
// ============================================================ */

// function getStaticPages() {
//   const now = new Date();

//   return [
//     {
//       url: `${SITE_URL}/`,
//       lastModified: now,
//       changeFrequency: "daily",
//       priority: 1.0,
//     },

//     {
//       url: `${SITE_URL}/cars`,
//       lastModified: now,
//       changeFrequency: "daily",
//       priority: 0.95,
//     },

//     {
//       url: `${SITE_URL}/brands`,
//       lastModified: now,
//       changeFrequency: "weekly",
//       priority: 0.85,
//     },

//     {
//       url: `${SITE_URL}/articles`,
//       lastModified: now,
//       changeFrequency: "daily",
//       priority: 0.85,
//     },

//     {
//       url: `${SITE_URL}/reviews`,
//       lastModified: now,
//       changeFrequency: "weekly",
//       priority: 0.8,
//     },

//     {
//       url: `${SITE_URL}/guides`,
//       lastModified: now,
//       changeFrequency: "weekly",
//       priority: 0.8,
//     },

//     {
//       url: `${SITE_URL}/compare`,
//       lastModified: now,
//       changeFrequency: "weekly",
//       priority: 0.7,
//     },

//     /* ========================================================
//        CALCULATORS
//     ======================================================== */

//     {
//       url: `${SITE_URL}/calculators/charging-cost`,
//       lastModified: now,
//       changeFrequency: "monthly",
//       priority: 0.65,
//     },

//     {
//       url: `${SITE_URL}/calculators/charging-time`,
//       lastModified: now,
//       changeFrequency: "monthly",
//       priority: 0.65,
//     },

//     {
//       url: `${SITE_URL}/calculators/range-estimator`,
//       lastModified: now,
//       changeFrequency: "monthly",
//       priority: 0.65,
//     },

//     {
//       url: `${SITE_URL}/calculators/running-cost`,
//       lastModified: now,
//       changeFrequency: "monthly",
//       priority: 0.65,
//     },

//     /* ========================================================
//        INFORMATIONAL PAGES
//     ======================================================== */

//     {
//       url: `${SITE_URL}/about`,
//       lastModified: now,
//       changeFrequency: "monthly",
//       priority: 0.5,
//     },

//     {
//       url: `${SITE_URL}/contact`,
//       lastModified: now,
//       changeFrequency: "monthly",
//       priority: 0.5,
//     },

//     {
//       url: `${SITE_URL}/privacy-policy`,
//       lastModified: now,
//       changeFrequency: "yearly",
//       priority: 0.3,
//     },

//     {
//       url: `${SITE_URL}/terms`,
//       lastModified: now,
//       changeFrequency: "yearly",
//       priority: 0.3,
//     },
//   ];
// }

// /* ============================================================
//    VEHICLE PAGES
// ============================================================ */

// function getVehiclePages(vehicles) {
//   return vehicles
//     .filter((vehicle) => {
//       /*
//        * If verification status exists,
//        * only approved vehicles are included.
//        */

//       if (vehicle?.verification?.status) {
//         return vehicle.verification.status === "approved";
//       }

//       /*
//        * If normal status exists,
//        * only active/published vehicles are included.
//        */

//       if (vehicle?.status) {
//         return (
//           vehicle.status === "active" ||
//           vehicle.status === "published"
//         );
//       }

//       /*
//        * If no status information exists,
//        * don't unnecessarily hide the vehicle.
//        */

//       return true;
//     })
//     .map((vehicle) => {
//       const slug = getVehicleSlug(vehicle);

//       if (!slug) {
//         return null;
//       }

//       return {
//         url: `${SITE_URL}/vehicles/${slug}`,
//         lastModified: getLastModified(vehicle),
//         changeFrequency: "weekly",
//         priority: 0.9,
//       };
//     })
//     .filter(Boolean);
// }

// /* ============================================================
//    BRAND PAGES
// ============================================================ */

// function getBrandPages(brands) {
//   return brands
//     .map((brand) => {
//       const slug = getBrandSlug(brand);

//       if (!slug) {
//         return null;
//       }

//       return {
//         url: `${SITE_URL}/brands/${slug}`,
//         lastModified: getLastModified(brand),
//         changeFrequency: "weekly",
//         priority: 0.75,
//       };
//     })
//     .filter(Boolean);
// }

// /* ============================================================
//    ARTICLE PAGES
// ============================================================ */

// function getArticlePages(content) {
//   return content
//     .filter((item) => {
//       const type = getContentType(item);

//       return [
//         "article",
//         "articles",
//         "news",
//         "guide",
//         "guides",
//       ].includes(type);
//     })
//     .map((item) => {
//       const slug = getContentSlug(item);

//       if (!slug) {
//         return null;
//       }

//       return {
//         url: `${SITE_URL}/articles/${slug}`,
//         lastModified: getLastModified(item),
//         changeFrequency: "monthly",
//         priority: 0.7,
//       };
//     })
//     .filter(Boolean);
// }

// /* ============================================================
//    REVIEW PAGES
// ============================================================ */

// function getReviewPages(content) {
//   return content
//     .filter((item) => {
//       const type = getContentType(item);

//       return [
//         "review",
//         "reviews",
//       ].includes(type);
//     })
//     .map((item) => {
//       const slug = getContentSlug(item);

//       if (!slug) {
//         return null;
//       }

//       return {
//         url: `${SITE_URL}/reviews/${slug}`,
//         lastModified: getLastModified(item),
//         changeFrequency: "monthly",
//         priority: 0.7,
//       };
//     })
//     .filter(Boolean);
// }

// /* ============================================================
//    REMOVE DUPLICATES
// ============================================================ */

// function removeDuplicateUrls(pages) {
//   return Array.from(
//     new Map(
//       pages.map((page) => [
//         page.url,
//         page,
//       ])
//     ).values()
//   );
// }

// /* ============================================================
//    FALLBACK
// ============================================================ */

// function getFallbackSitemap() {
//   return getStaticPages();
// }

// /* ============================================================
//    MAIN SITEMAP
// ============================================================ */

// export default async function sitemap() {
//   try {
//     console.log("🗺️ Generating EVInsights sitemap...");

//     const snapshot = await getSiteSnapshot();

//     const vehicles = Array.isArray(snapshot?.vehicles)
//       ? snapshot.vehicles
//       : [];

//     const brands = Array.isArray(snapshot?.brands)
//       ? snapshot.brands
//       : [];

//     const content = Array.isArray(snapshot?.content)
//       ? snapshot.content
//       : [];

//     console.log(
//       `🚗 Vehicles: ${vehicles.length}`
//     );

//     console.log(
//       `🏷️ Brands: ${brands.length}`
//     );

//     console.log(
//       `📝 Content: ${content.length}`
//     );

//     /* ========================================================
//        BUILD ALL URLS
//     ======================================================== */

//     const allPages = [
//       ...getStaticPages(),

//       ...getVehiclePages(vehicles),

//       ...getBrandPages(brands),

//       ...getArticlePages(content),

//       ...getReviewPages(content),
//     ];

//     /* ========================================================
//        REMOVE DUPLICATES
//     ======================================================== */

//     const uniquePages =
//       removeDuplicateUrls(allPages);

//     console.log(
//       `✅ Sitemap URLs: ${uniquePages.length}`
//     );

//     return uniquePages;
//   } catch (error) {
//     console.error(
//       "❌ Sitemap generation failed:",
//       error
//     );

//     /*
//      * Database unavailable hone par
//      * static URLs phir bhi available rahenge.
//      */

//     return getFallbackSitemap();
//   }
// }


import { getSiteSnapshot } from "@/server/services/site.service";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://evinsightshub.in"
).replace(/\/+$/, "");

/* ============================================================
   HELPERS
============================================================ */

function cleanSlug(value) {
  if (!value) return null;

  const slug = String(value)
    .trim()
    .replace(/^\/+|\/+$/g, "");

  return slug || null;
}

function getVehicleSlug(vehicle) {
  return cleanSlug(
    vehicle?.identity?.slug ||
      vehicle?.slug ||
      vehicle?.id
  );
}

function getBrandSlug(brand) {
  return cleanSlug(
    brand?.identity?.slug ||
      brand?.slug ||
      brand?.id
  );
}

function getContentSlug(content) {
  return cleanSlug(
    content?.identity?.slug ||
      content?.slug ||
      content?.id
  );
}

function getContentType(content) {
  return String(
    content?.type ||
      content?.contentType ||
      content?.content_type ||
      content?.metadata?.type ||
      ""
  )
    .trim()
    .toLowerCase();
}

function getLastModified(item) {
  const value =
    item?.updatedAt ||
    item?.updated_at ||
    item?.metadata?.updatedAt ||
    item?.metadata?.updated_at ||
    item?.createdAt ||
    item?.created_at ||
    null;

  if (!value) {
    return new Date();
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? new Date()
    : date;
}

/* ============================================================
   NOINDEX CHECK
============================================================ */

function hasNoIndex(item) {
  return (
    item?.noindex === true ||
    item?.seo?.noindex === true ||
    item?.metadata?.noindex === true ||
    item?.page?.noindex === true ||
    item?.robots?.noindex === true
  );
}

/* ============================================================
   STATIC PAGES
============================================================ */

function getStaticPages() {
  const now = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },

    {
      url: `${SITE_URL}/cars`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },

    {
      url: `${SITE_URL}/brands`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },

    {
      url: `${SITE_URL}/articles`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },

    {
      url: `${SITE_URL}/reviews`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/guides`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/compare`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },

    /* ========================================================
       CALCULATORS
    ======================================================== */

    {
      url: `${SITE_URL}/calculators/charging-cost`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },

    {
      url: `${SITE_URL}/calculators/charging-time`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },

    {
      url: `${SITE_URL}/calculators/range-estimator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },

    {
      url: `${SITE_URL}/calculators/running-cost`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },

    /* ========================================================
       INFORMATIONAL PAGES
    ======================================================== */

    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },

    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

/* ============================================================
   VEHICLE PAGES
============================================================ */

function getVehiclePages(vehicles) {
  return vehicles
    .filter((vehicle) => {
      if (!vehicle) {
        return false;
      }

      const slug = getVehicleSlug(vehicle);

      if (!slug) {
        return false;
      }

      /*
       * Never put explicitly noindex vehicles
       * into sitemap.
       */

      if (hasNoIndex(vehicle)) {
        return false;
      }

      /*
       * Do NOT require verification.status === "approved".
       *
       * Public vehicle pages are available through
       * /vehicles/[slug], so every public vehicle
       * returned by the repository should be eligible.
       *
       * Only explicitly rejected vehicles are excluded.
       */

      if (
        vehicle?.verification?.status === "rejected"
      ) {
        return false;
      }

      /*
       * Explicitly archived/deleted vehicles
       * should not be indexed.
       */

      const lifecycle =
        vehicle?.status?.lifecycle ||
        vehicle?.payload?.status?.lifecycle ||
        null;

      if (
        lifecycle === "archived" ||
        lifecycle === "deleted"
      ) {
        return false;
      }

      return true;
    })
    .map((vehicle) => {
      const slug = getVehicleSlug(vehicle);

      return {
        url: `${SITE_URL}/vehicles/${slug}`,
        lastModified: getLastModified(vehicle),
        changeFrequency: "weekly",
        priority: 0.9,
      };
    });
}

/* ============================================================
   BRAND PAGES
============================================================ */

function getBrandPages(brands) {
  return brands
    .filter((brand) => {
      return (
        brand &&
        getBrandSlug(brand) &&
        !hasNoIndex(brand)
      );
    })
    .map((brand) => {
      const slug = getBrandSlug(brand);

      return {
        url: `${SITE_URL}/brands/${slug}`,
        lastModified: getLastModified(brand),
        changeFrequency: "weekly",
        priority: 0.75,
      };
    });
}

/* ============================================================
   ARTICLE PAGES
============================================================ */

function getArticlePages(content) {
  return content
    .filter((item) => {
      /*
       * IMPORTANT:
       * /articles/[slug]/page.js currently accepts
       * only type === "article".
       */

      return (
        getContentType(item) === "article" &&
        getContentSlug(item) &&
        !hasNoIndex(item)
      );
    })
    .map((item) => {
      const slug = getContentSlug(item);

      return {
        url: `${SITE_URL}/articles/${slug}`,
        lastModified: getLastModified(item),
        changeFrequency: "monthly",
        priority: 0.7,
      };
    });
}

/* ============================================================
   REVIEW PAGES
============================================================ */

function getReviewPages(content) {
  return content
    .filter((item) => {
      return (
        getContentType(item) === "review" &&
        getContentSlug(item) &&
        !hasNoIndex(item)
      );
    })
    .map((item) => {
      const slug = getContentSlug(item);

      return {
        url: `${SITE_URL}/reviews/${slug}`,
        lastModified: getLastModified(item),
        changeFrequency: "monthly",
        priority: 0.7,
      };
    });
}

/* ============================================================
   REMOVE DUPLICATES
============================================================ */

function removeDuplicateUrls(pages) {
  return Array.from(
    new Map(
      pages.map((page) => [
        page.url,
        page,
      ])
    ).values()
  );
}

/* ============================================================
   FALLBACK
============================================================ */

function getFallbackSitemap() {
  return getStaticPages();
}

/* ============================================================
   MAIN
============================================================ */

export default async function sitemap() {
  console.log(
    "🗺️ Generating EVInsights sitemap..."
  );

  try {
    const snapshot = await getSiteSnapshot();

    const vehicles = Array.isArray(
      snapshot?.vehicles
    )
      ? snapshot.vehicles
      : [];

    const brands = Array.isArray(
      snapshot?.brands
    )
      ? snapshot.brands
      : [];

    const content = Array.isArray(
      snapshot?.content
    )
      ? snapshot.content
      : [];

    console.log(
      `🚗 Total vehicles: ${vehicles.length}`
    );

    console.log(
      `🏷️ Total brands: ${brands.length}`
    );

    console.log(
      `📝 Total content: ${content.length}`
    );

    /* ========================================================
       BUILD DYNAMIC PAGES
    ======================================================== */

    const vehiclePages =
      getVehiclePages(vehicles);

    const brandPages =
      getBrandPages(brands);

    const articlePages =
      getArticlePages(content);

    const reviewPages =
      getReviewPages(content);

    console.log(
      `🚗 Vehicle URLs: ${vehiclePages.length}`
    );

    console.log(
      `🏷️ Brand URLs: ${brandPages.length}`
    );

    console.log(
      `📰 Article URLs: ${articlePages.length}`
    );

    console.log(
      `⭐ Review URLs: ${reviewPages.length}`
    );

    /* ========================================================
       COMBINE
    ======================================================== */

    const allPages = [
      ...getStaticPages(),
      ...vehiclePages,
      ...brandPages,
      ...articlePages,
      ...reviewPages,
    ];

    const uniquePages =
      removeDuplicateUrls(allPages);

    console.log(
      `✅ Final sitemap URLs: ${uniquePages.length}`
    );

    return uniquePages;
  } catch (error) {
    console.error(
      "❌ Sitemap generation failed:",
      error
    );

    /*
     * Database/API problem ke case me static pages
     * completely disappear nahi honge.
     */

    return getFallbackSitemap();
  }
}