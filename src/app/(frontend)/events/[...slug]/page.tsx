import { sanityFetch } from "@/sanity/lib/live";
import { EVENT_QUERY, EVENT_META_QUERY } from "@/sanity/lib/queries";
import { QueryParams } from "sanity";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { generatePageMetadata } from "@/utils/helpers/metadata-helpers";
import { generateEventSchema } from "@/utils/helpers/schema-helpers";

import { DraggablePageLayout } from "@/components/DraggablePageLayout";
import { EventHero } from "@/components/EventHero/EventHero";
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
  const fullSlug = "/events/" + slugArray.join("/");

  const { data: page } = await sanityFetch({
    query: EVENT_META_QUERY,
    params: { slug: fullSlug },
    stega: false,
  });

  return generatePageMetadata({
    metaTitle: page?.title ?? undefined,
    metaDescription: page?.eventDescription ?? page?.title ?? undefined,
    metaImage: page?.heroImage?.image,
    slug: fullSlug,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<QueryParams>;
}) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug as string[];
  const fullSlug = "/events/" + slugArray.join("/");

  const { data: page } = await sanityFetch({
    query: EVENT_QUERY,
    params: { slug: fullSlug },
  });

  if (!page) {
    notFound();
  }

  const {
    title,
    allDay,
    duration,
    eventDateTime,
    heroImage,
    location,
    locationUrl,
    eventDescription,
  } = page || {};

  const heroProps = {
    title,
    allDay,
    duration,
    eventDateTime,
    heroImage,
    location,
    locationUrl,
    eventDescription,
    fullSlug,
  };

  // Generate Event Schema JSON-LD
  const eventSchema = generateEventSchema({
    name: title,
    description: eventDescription,
    startDate: eventDateTime,
    duration: duration, // Helper will calculate endDate from this
    location: location
      ? {
          name: location,
        }
      : undefined,
    image: heroImage?.image,
    url: fullSlug,
  });

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <EventHero data={heroProps} />
      <DraggablePageLayout
        page={page}
        pageLayout={page?.pageLayout}
        query={EVENT_QUERY}
        params={{ slug: fullSlug }}
      />
      <SocialMediaSharingIcons title={title} />
    </article>
  );
}
