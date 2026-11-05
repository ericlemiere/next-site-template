import { sanityFetch } from "@/sanity/lib/live";
import { BLOGPOST_QUERY, BLOGPOST_META_QUERY } from "@/sanity/lib/queries";
import { QueryParams } from "sanity";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { generatePageMetadata } from "@/utils/helpers/metadata-helpers";
import { generateArticleSchema } from "@/utils/helpers/schema-helpers";

import { DraggablePageLayout } from "@/components/DraggablePageLayout";
import { BlogHero } from "@/components/BlogHero";
import { SocialMediaSharingIcons } from "@/modules/SocialMediaSharingIcons";

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
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug as string[];
  const fullSlug = "/blog/" + slugArray.join("/");

  const { data: page } = await sanityFetch({
    query: BLOGPOST_META_QUERY,
    params: { slug: fullSlug },
    stega: false,
  });

  // Generate OG image URL - use just the slug parts without /blog/ prefix
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const ogImageUrl = `${baseUrl}/api/og/blog/${slugArray.join("/")}`;

  return generatePageMetadata({
    metaTitle: page?.metaTitle ?? page?.title ?? undefined,
    metaDescription: page?.metaDescription ?? undefined,
    metaImage: page?.metaImage || page?.heroImage?.image,
    slug: fullSlug,
    ogImageUrl,
    metaImageType: page?.metaImageType || 0,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<QueryParams>;
}) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug as string[];
  const fullSlug = "/blog/" + slugArray.join("/");

  const { data: page } = await sanityFetch({
    query: BLOGPOST_QUERY,
    params: { slug: fullSlug },
  });

  if (!page) {
    notFound();
  }

  const { heroImage, title, author, tags, datePublished, metaDescription } =
    page;
  const heroProps = { title, author, tags, datePublished, heroImage };

  // Generate Article Schema JSON-LD
  const articleSchema = generateArticleSchema({
    title,
    description: metaDescription,
    image: heroImage?.image,
    datePublished,
    dateModified: page._updatedAt,
    authorName: author?.name,
    slug: fullSlug,
  });

  return (
    <article>
      {/* Article Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogHero data={heroProps} />
      <DraggablePageLayout
        page={page}
        pageLayout={page?.pageLayout}
        query={BLOGPOST_QUERY}
        params={{ slug: fullSlug }}
      />
      <SocialMediaSharingIcons title={title} />
    </article>
  );
}
