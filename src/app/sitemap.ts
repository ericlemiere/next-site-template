import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { sitemapQuery } from "@/sanity/lib/queries";
import { SitemapQueryResult } from "../../sanity.types";

const URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ericlemiere.com"; // TODO: update to your domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await client.fetch<SitemapQueryResult>(sitemapQuery);

  const pages = formatSitemapEntries(data);

  return pages;
}

function formatSitemapEntries(entries: SitemapQueryResult) {
  return entries.map((item) => {
    const path = item.slug?.replace(/\/$/, "") ?? "";

    let priority = 0.5;
    let changeFreq: MetadataRoute.Sitemap[0]["changeFrequency"] = "never";
    if (item._type === "homePage") {
      priority = 1;
      changeFreq = "weekly";
    } else if (item._type === "page") {
      priority = 0.8;
      changeFreq = "monthly";
    } else if (item._type === "blogPost" || item._type === "event") {
      priority = 0.6;
      changeFreq = "yearly";
    } else if (item._type === "teamMember") {
      priority = 0.5;
      changeFreq = "yearly";
    }

    return {
      url: `${URL}${path ? `${path}` : ""}`,
      lastModified: new Date(item._updatedAt),
      changeFrequency: changeFreq,
      priority: priority,
    };
  });
}
