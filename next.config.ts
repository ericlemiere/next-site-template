import type { NextConfig } from "next";
import { createClient } from "@sanity/client";

const DEFAULT_SANITY_API_VERSION = "2025-10-07";

function resolveSanityApiVersion(rawValue?: string): string {
  const trimmed = rawValue?.trim();

  if (!trimmed) return DEFAULT_SANITY_API_VERSION;

  // Accept values copied with quotes or a leading "v" prefix.
  const unwrapped = trimmed.replace(/^['\"]|['\"]$/g, "");
  const normalized = unwrapped.replace(/^v/, "");

  const isValid = normalized === "1" || /^\d{4}-\d{2}-\d{2}$/.test(normalized);
  if (!isValid) {
    console.warn(
      `Invalid NEXT_PUBLIC_SANITY_API_VERSION \"${rawValue}\". Falling back to ${DEFAULT_SANITY_API_VERSION}.`,
    );
    return DEFAULT_SANITY_API_VERSION;
  }

  return normalized;
}

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: resolveSanityApiVersion(
    process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  ),
});

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@sanity/ui", "react-icons", "date-fns"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    loader: "custom",
    loaderFile: "./src/utils/sanityImageLoader.ts",
  },

  // TODO: add site URL to the list of allowed frame ancestors
  async headers() {
    return [
      {
        source: "/sandbox",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' http://localhost:* https://www.sanity.io https://*.sanity.io https://*.sanity.studio https://*.vercel.app",
          },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' http://localhost:* https://www.sanity.io https://*.sanity.io https://*.sanity.studio https://*.vercel.app",
          },
        ],
      },
    ];
  },

  async redirects() {
    const redirects = await client.fetch(`
      *[_type == "redirectsArray"]{
        redirects[] {
          "source": source,
          "permanent": permanent,
          linkType,
          "destination": coalesce(
            select(linkType == "external" => externalLink),
            destination->slug.current,
            destination->anchorTag,
            "/"
          )
        }
      }
    `);

    // Flatten and filter
    const validRedirects = redirects
      .flatMap(
        (item: {
          redirects?: {
            source: string;
            destination: string;
            permanent: boolean;
          }[];
        }) => item?.redirects || [],
      )
      .filter(
        (redirect: { source?: string; destination?: string }) =>
          redirect && redirect.source && redirect.destination,
      );

    // Only return the fields Next.js expects
    return validRedirects.map(
      (redirect: {
        source: string;
        destination: string;
        permanent: boolean;
      }) => ({
        source: redirect.source,
        destination: redirect.destination,
        permanent: redirect.permanent,
      }),
    );
  },
};

export default nextConfig;
