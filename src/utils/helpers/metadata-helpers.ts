import { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import groq from "groq";
import { cleanString } from "./string-helpers";

// Query for global metadata
const GLOBAL_META_QUERY = groq`*[_type == 'globalMetadata'][0] {
  metaTitle,
  metaDescription,
  metaImage,
}`;

interface MetadataOptions {
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: {
    asset?: {
      _ref?: string;
      _id?: string;
      _type?: string;
    };
    alt?: string;
    _type?: string;
  } | null;
  slug?: string;
  index?: boolean;
  ogImageUrl?: string;
  metaImageType?: number;
}

export async function generatePageMetadata({
  metaTitle,
  metaDescription,
  metaImage,
  slug,
  index,
  ogImageUrl,
  metaImageType = 0,
}: MetadataOptions): Promise<Metadata> {
  // Fetch global metadata
  const { data: globalMetadata } = await sanityFetch({
    query: GLOBAL_META_QUERY,
  });

  // Title logic
  const pageMetaTitle =
    metaTitle && globalMetadata?.metaTitle
      ? `${metaTitle} | ${globalMetadata.metaTitle}`
      : metaTitle;

  const title =
    cleanString(pageMetaTitle) ||
    cleanString(globalMetadata?.metaTitle) ||
    "(No Meta Title)";

  // Description logic
  const description =
    cleanString(metaDescription) ||
    cleanString(globalMetadata?.metaDescription) ||
    title;

  // Image processing - use OG image URL if provided, otherwise fall back to regular image
  let finalMetaImageUrl: string | null = null;

  if (metaImageType === 2 && ogImageUrl) {
    finalMetaImageUrl = ogImageUrl;
  } else {
    const metaImageUrl = metaImage
      ? urlFor(metaImage).width(1200).height(630).url()
      : null;

    const globalMetaImageUrl = globalMetadata?.metaImage
      ? urlFor(globalMetadata.metaImage).width(1200).height(630).url()
      : null;

    finalMetaImageUrl = metaImageUrl || globalMetaImageUrl;
  }

  const baseCanonicalUrl = "https://ericlemiere.com"; // TODO: update to your domain
  const finalCanonicalUrl = slug
    ? `${baseCanonicalUrl}${slug}`
    : baseCanonicalUrl;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: finalCanonicalUrl,
    },
    openGraph: {
      title: title,
      description: description,
      images: finalMetaImageUrl
        ? [
            {
              url: finalMetaImageUrl,
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
    twitter: {
      title: title,
      description: description,
      images: finalMetaImageUrl ? [finalMetaImageUrl] : [],
    },
    robots: {
      index: index,
    },
  };
}
