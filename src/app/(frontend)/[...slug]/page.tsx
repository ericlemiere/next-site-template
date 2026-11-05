import { sanityFetch } from "@/sanity/lib/live";
import { QueryParams } from "sanity";
import {
  PAGE_BY_SLUG_QUERY,
  PAGE_BY_SLUG_META_QUERY,
} from "@/sanity/lib/queries";
import { DraggablePageLayout } from "@/components/DraggablePageLayout";
import { notFound } from "next/navigation";
import { PasswordPrompt } from "@/modules/PasswordPrompt";
import { Metadata } from "next";
import { generatePageMetadata } from "@/utils/helpers/metadata-helpers";
import { generateWebPageSchema } from "@/utils/helpers/schema-helpers";
import { checkValidFAQ } from "@/utils/helpers/FAQ-helper";
import type { TextAccordion } from "../../../../sanity.types";

// Cached and revalidated on content changes by <SanityLive />; this is a
// fallback in case no visitor is online to trigger that revalidation
export const revalidate = 60;

// Render each page on its first request, then cache it like a static page
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<QueryParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugArray = slug as string[];
  const fullSlug = "/" + slugArray.join("/");

  const { data: page } = await sanityFetch({
    query: PAGE_BY_SLUG_META_QUERY,
    params: { slug: fullSlug },
    stega: false,
  });
  const index = page?.noindex === true ? false : true;

  return generatePageMetadata({
    metaTitle: page?.metaTitle || page?.navigationName || undefined,
    metaDescription: page?.metaDescription || undefined,
    metaImage: page?.metaImage,
    slug: fullSlug,
    index: index,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<QueryParams>;
}) {
  const { slug } = await params;
  const slugArray = slug as string[];
  const fullSlug = "/" + slugArray.join("/");
  const { data: page } = await sanityFetch({
    query: PAGE_BY_SLUG_QUERY,
    params: { slug: fullSlug },
  });

  if (!page) {
    notFound();
  }

  if (page.passwordProtected) {
    return <PasswordPrompt slug={fullSlug} pageContent={page} />;
  }

  // Check for FAQ content
  let faqSchema = null;

  if (page.pageLayout) {
    const hasFAQ = page.pageLayout.some(
      (item: TextAccordion) => item?._type === "textAccordion" && !!item?.faq
    );

    if (hasFAQ) {
      const faqItems = page.pageLayout
        .filter(
          (item: TextAccordion) =>
            item?._type === "textAccordion" && !!item?.faq
        )
        .flatMap((section: TextAccordion) => section.accordionItems || []);

      faqSchema = checkValidFAQ(faqItems);
    }
  }

  // Generate WebPage schema
  const webPageSchema = generateWebPageSchema({
    title: page.metaTitle || page.navigationName || "Page",
    description: page.metaDescription || undefined,
    url: fullSlug,
  });

  return (
    <>
      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      {/* FAQ Schema (if applicable) */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
      <DraggablePageLayout
        page={page}
        pageLayout={page?.pageLayout}
        query={PAGE_BY_SLUG_QUERY}
        params={{ slug: fullSlug }}
      />
    </>
  );
}
