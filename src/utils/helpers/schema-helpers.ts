import { type SanityImageSource } from "@sanity/image-url";

// TODO: Update these constants with your actual site information
const SITE_CONFIG = {
  baseUrl: "https://ericlemiere.com", // TODO: update with actual site URL if different
  organizationName: "Eric Lemiere", // TODO: update with actual organization name if different
  logoUrl: "https://ericlemiere.com/logo.png", // TODO: add logo.png to public folder
};

// Type guard to check if image is a Sanity image object
interface SanityImageAsset {
  asset?: {
    url?: string;
  };
}

function extractImageUrl(
  image: SanityImageSource | string | undefined
): string | undefined {
  if (!image) return undefined;
  if (typeof image === "string") return image;
  return (image as SanityImageAsset).asset?.url;
}

interface ArticleSchemaProps {
  title: string;
  description?: string;
  image?: SanityImageSource | string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  slug: string;
}

interface OrganizationSchemaProps {
  name?: string;
  description?: string;
  url?: string;
  logo?: string;
  sameAs?: string[]; // Social media URLs
}

interface WebPageSchemaProps {
  title: string;
  description?: string;
  url: string;
}

interface WebSiteSchemaProps {
  name: string;
  description?: string;
  url?: string;
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

interface EventSchemaProps {
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  duration?: number; // Duration in hours
  location?: {
    name: string;
    address?: string;
  };
  image?: SanityImageSource | string;
  url: string;
}

interface PersonSchemaProps {
  name: string;
  jobTitle?: string;
  description?: string;
  image?: SanityImageSource | string;
  email?: string;
  telephone?: string;
  url: string;
  sameAs?: string[]; // Social media URLs
}

/**
 * Generate Article/BlogPosting schema markup
 */
export function generateArticleSchema(props: ArticleSchemaProps) {
  const {
    title,
    description,
    image,
    datePublished,
    dateModified,
    authorName,
    slug,
  } = props;

  // Extract image URL if it's a Sanity image object
  const imageUrl = extractImageUrl(image);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description || undefined,
    image: imageUrl,
    datePublished: datePublished || undefined,
    dateModified: dateModified || datePublished || undefined,
    author: authorName
      ? {
          "@type": "Person",
          name: authorName,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.organizationName,
      logo: {
        "@type": "ImageObject",
        url: SITE_CONFIG.logoUrl,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.baseUrl}${slug}`,
    },
  };
}

/**
 * Generate Organization schema markup
 */
export function generateOrganizationSchema(props: OrganizationSchemaProps) {
  const {
    name = SITE_CONFIG.organizationName,
    description,
    url = SITE_CONFIG.baseUrl,
    logo = SITE_CONFIG.logoUrl,
    sameAs = [],
  } = props;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    description: description || undefined,
    url,
    logo: {
      "@type": "ImageObject",
      url: logo,
    },
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };
}

/**
 * Generate WebPage schema markup
 */
export function generateWebPageSchema(props: WebPageSchemaProps) {
  const { title, description, url } = props;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description || undefined,
    url,
  };
}

/**
 * Generate WebSite schema markup (for home page)
 */
export function generateWebSiteSchema(props: WebSiteSchemaProps) {
  const { name, description, url = SITE_CONFIG.baseUrl } = props;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    description: description || undefined,
    url,
  };
}

/**
 * Generate BreadcrumbList schema markup
 */
export function generateBreadcrumbSchema(props: BreadcrumbSchemaProps) {
  const { items } = props;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.baseUrl}${item.url}`,
    })),
  };
}

/**
 * Generate Event schema markup
 */
export function generateEventSchema(props: EventSchemaProps) {
  const {
    name,
    description,
    startDate,
    endDate,
    duration,
    location,
    image,
    url,
  } = props;

  // Calculate endDate from startDate and duration if not provided
  let calculatedEndDate = endDate;
  if (!calculatedEndDate && startDate && duration) {
    calculatedEndDate = new Date(
      new Date(startDate).getTime() + duration * 60 * 60 * 1000
    ).toISOString();
  }

  // Extract image URL if it's a Sanity image object
  const imageUrl = extractImageUrl(image);

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description: description || undefined,
    startDate,
    endDate: calculatedEndDate || undefined,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: location
      ? {
          "@type": "Place",
          name: location.name,
          address: location.address || undefined,
        }
      : undefined,
    image: imageUrl,
    url: `${SITE_CONFIG.baseUrl}${url}`,
    organizer: {
      "@type": "Organization",
      name: SITE_CONFIG.organizationName,
      url: SITE_CONFIG.baseUrl,
    },
  };
}

/**
 * Generate Person schema markup
 */
export function generatePersonSchema(props: PersonSchemaProps) {
  const { name, jobTitle, description, image, email, telephone, url, sameAs } =
    props;

  // Extract image URL if it's a Sanity image object
  const imageUrl = extractImageUrl(image);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: jobTitle || undefined,
    description: description || undefined,
    image: imageUrl,
    email: email || undefined,
    telephone: telephone || undefined,
    url: `${SITE_CONFIG.baseUrl}${url}`,
    sameAs: sameAs && sameAs.length > 0 ? sameAs : undefined,
  };
}

/**
 * Helper component to render schema markup
 * Usage: <SchemaMarkup schema={generateArticleSchema(props)} />
 */
export function SchemaMarkup({ schema }: { schema: Record<string, unknown> }) {
  return {
    __html: JSON.stringify(schema),
  };
}
