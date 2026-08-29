import { getSiteSnapshot } from "@/server/services/site.service";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://evinsightshub.in";

/* ============================================================
   HELPERS
============================================================ */

function cleanSlug(value) {
  if (!value) return null;

  return String(value)
    .trim()
    .replace(/^\/+|\/+$/g, "");
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
   SITEMAP
============================================================ */

export default async function sitemap() {
  try {
    const snapshot = await getSiteSnapshot();

    const vehicles = Array.isArray(snapshot?.vehicles)
      ? snapshot.vehicles
      : [];

    const brands = Array.isArray(snapshot?.brands)
      ? snapshot.brands
      : [];

    const content = Array.isArray(snapshot?.content)
      ? snapshot.content
      : [];

    /* ========================================================
       STATIC PAGES
    ======================================================== */

    const staticPages = [
      {
        url: `${SITE_URL}/`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },

      {
        url: `${SITE_URL}/cars`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.95,
      },

      {
        url: `${SITE_URL}/brands`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.85,
      },

      {
        url: `${SITE_URL}/articles`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.85,
      },

      {
        url: `${SITE_URL}/reviews`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },

      {
        url: `${SITE_URL}/guides`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },

      {
        url: `${SITE_URL}/compare`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      },

      /* ======================================================
         CALCULATORS
      ====================================================== */

      {
        url: `${SITE_URL}/calculators/charging-cost`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.65,
      },

      {
        url: `${SITE_URL}/calculators/charging-time`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.65,
      },

      {
        url: `${SITE_URL}/calculators/range-estimator`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.65,
      },

      {
        url: `${SITE_URL}/calculators/running-cost`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.65,
      },

      /* ======================================================
         INFORMATIONAL PAGES
      ====================================================== */

      {
        url: `${SITE_URL}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },

      {
        url: `${SITE_URL}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },

      {
        url: `${SITE_URL}/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.3,
      },

      {
        url: `${SITE_URL}/terms`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.3,
      },
    ];

    /* ========================================================
       VEHICLE PAGES
    ======================================================== */

    const vehiclePages = vehicles
      .filter((vehicle) => {
        /*
         * Approved vehicles preferred.
         * If verification/status isn't present,
         * don't unnecessarily hide the record.
         */

        if (
          vehicle?.verification?.status
        ) {
          return (
            vehicle.verification.status ===
            "approved"
          );
        }

        if (vehicle?.status) {
          return (
            vehicle.status === "active" ||
            vehicle.status === "published"
          );
        }

        return true;
      })
      .map((vehicle) => {
        const slug = getVehicleSlug(vehicle);

        if (!slug) {
          return null;
        }

        return {
          url: `${SITE_URL}/vehicles/${slug}`,
          lastModified:
            getLastModified(vehicle),
          changeFrequency: "weekly",
          priority: 0.9,
        };
      })
      .filter(Boolean);

    /* ========================================================
       BRAND PAGES
    ======================================================== */

    const brandPages = brands
      .map((brand) => {
        const slug = getBrandSlug(brand);

        if (!slug) {
          return null;
        }

        return {
          url: `${SITE_URL}/brands/${slug}`,
          lastModified:
            getLastModified(brand),
          changeFrequency: "weekly",
          priority: 0.75,
        };
      })
      .filter(Boolean);

    /* ========================================================
       ARTICLE PAGES
    ======================================================== */

    const articlePages = content
      .filter((item) => {
        const type = getContentType(item);

        return [
          "article",
          "articles",
          "news",
          "guide",
        ].includes(type);
      })
      .map((item) => {
        const slug = getContentSlug(item);

        if (!slug) {
          return null;
        }

        return {
          url: `${SITE_URL}/articles/${slug}`,
          lastModified:
            getLastModified(item),
          changeFrequency: "monthly",
          priority: 0.7,
        };
      })
      .filter(Boolean);

    /* ========================================================
       REVIEW PAGES
    ======================================================== */

    const reviewPages = content
      .filter((item) => {
        const type = getContentType(item);

        return [
          "review",
          "reviews",
        ].includes(type);
      })
      .map((item) => {
        const slug = getContentSlug(item);

        if (!slug) {
          return null;
        }

        return {
          url: `${SITE_URL}/reviews/${slug}`,
          lastModified:
            getLastModified(item),
          changeFrequency: "monthly",
          priority: 0.7,
        };
      })
      .filter(Boolean);

    /* ========================================================
       COMBINE EVERYTHING
    ======================================================== */

    const allPages = [
      ...staticPages,
      ...vehiclePages,
      ...brandPages,
      ...articlePages,
      ...reviewPages,
    ];

    /* ========================================================
       REMOVE DUPLICATE URLs
    ======================================================== */

    const uniquePages = Array.from(
      new Map(
        allPages.map((page) => [
          page.url,
          page,
        ])
      ).values()
    );

    /* ========================================================
       FINAL RESULT
    ======================================================== */

    return uniquePages;
  } catch (error) {
    console.error(
      "❌ Sitemap generation failed:",
      error
    );

    /*
     * Database unavailable hone par bhi
     * important static URLs sitemap me rahenge.
     */

    return [
      {
        url: `${SITE_URL}/`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },

      {
        url: `${SITE_URL}/cars`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.95,
      },

      {
        url: `${SITE_URL}/brands`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.85,
      },

      {
        url: `${SITE_URL}/articles`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.85,
      },

      {
        url: `${SITE_URL}/reviews`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },

      {
        url: `${SITE_URL}/guides`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },

      {
        url: `${SITE_URL}/compare`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      },

      {
        url: `${SITE_URL}/calculators/charging-cost`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.65,
      },

      {
        url: `${SITE_URL}/calculators/charging-time`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.65,
      },

      {
        url: `${SITE_URL}/calculators/range-estimator`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.65,
      },

      {
        url: `${SITE_URL}/calculators/running-cost`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.65,
      },

      {
        url: `${SITE_URL}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },

      {
        url: `${SITE_URL}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },

      {
        url: `${SITE_URL}/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.3,
      },

      {
        url: `${SITE_URL}/terms`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.3,
      },
    ];
  }
}