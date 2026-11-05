import { sanityFetch } from "@/sanity/lib/live";
import {
  TEAM_MEMBER_QUERY,
  TEAM_MEMBER_META_QUERY,
} from "@/sanity/lib/queries";
import { QueryParams } from "sanity";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { generatePageMetadata } from "@/utils/helpers/metadata-helpers";
import { generatePersonSchema } from "@/utils/helpers/schema-helpers";
import { TeamMemberPage } from "@/components/TeamMemberPage/TeamMemberPage";

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
  const fullSlug = "/our-team/" + slugArray.join("/");

  const { data: page } = await sanityFetch({
    query: TEAM_MEMBER_META_QUERY,
    params: { slug: fullSlug },
    stega: false,
  });

  return generatePageMetadata({
    metaTitle: page?.personName || "Team Member",
    metaDescription: page?.personName || "Team Member",
    metaImage: page?.image || undefined,
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
  const fullSlug = "/our-team/" + slugArray.join("/");

  const { data: page } = await sanityFetch({
    query: TEAM_MEMBER_QUERY,
    params: { slug: fullSlug },
  });

  if (!page) {
    notFound();
  }

  // Extract social media URLs if available
  const socialUrls = page.socialMedia
    ? (Object.values(page.socialMedia).filter(Boolean) as string[])
    : undefined;

  // Generate Person schema
  const personSchema = generatePersonSchema({
    name: page.personName || "Team Member",
    jobTitle: page.position || undefined,
    description: page.bio || undefined,
    image: page.image,
    email: page.emailAddress || undefined,
    telephone: page.phoneNumber || undefined,
    url: fullSlug,
    sameAs: socialUrls,
  });

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <TeamMemberPage data={page} />
    </article>
  );
}
