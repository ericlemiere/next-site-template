// app/page.tsx
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY, HOME_PAGE_META_QUERY } from "@/sanity/lib/queries";
import { DraggablePageLayout } from "@/components/DraggablePageLayout";
import { Metadata } from "next";
import { generatePageMetadata } from "@/utils/helpers/metadata-helpers";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "@/utils/helpers/schema-helpers";

// Cached and revalidated on content changes by <SanityLive />; this is a
// fallback in case no visitor is online to trigger that revalidation
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch({
    query: HOME_PAGE_META_QUERY,
    stega: false,
  });

  return generatePageMetadata({
    metaTitle: page?.metaTitle || undefined,
    metaDescription: page?.metaDescription || undefined,
    metaImage: page?.metaImage,
  });
}

export default async function Page() {
  const { data: page } = await sanityFetch({ query: HOME_PAGE_QUERY });

  // Extract social media URLs from the query
  const socialLinks = page?.footerSocialLinks || [];

  // Generate Organization schema
  const organizationSchema = generateOrganizationSchema({
    name: "Organization", // TODO: Update to your organization name
    description: page?.metaDescription || undefined,
    sameAs: socialLinks,
  });

  // Generate WebSite schema
  const webSiteSchema = generateWebSiteSchema({
    name: "Website", // TODO: Update to your site name
    description: page?.metaDescription || undefined,
  });

  return (
    <>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteSchema),
        }}
      />
      <DraggablePageLayout
        page={page}
        pageLayout={page?.pageLayout}
        query={HOME_PAGE_QUERY}
      />
    </>
  );
}
