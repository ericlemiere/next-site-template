// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { cookies, draftMode } from "next/headers";
import {
  defineLive,
  resolvePerspectiveFromCookies,
  resolveVariantFromCookies,
} from "next-sanity/live";
import type { ClientReturn } from "next-sanity";
import { client } from "./client";
import { token } from "./token";

const live = defineLive({
  client,
  browserToken: token,
  serverToken: token,
});

// next-sanity >=12.4 types untyped query results as `unknown`. Queries built with
// `${fragment}` interpolation aren't string literals, so typegen can't match them.
// Restore the previous `any` fallback for those; literal queries stay fully typed.
type LiveFetch = typeof live.sanityFetch;
type SanityFetch = <const QueryString extends string>(
  options: Omit<Parameters<LiveFetch>[0], "query"> & { query: QueryString }
) => Promise<
  Omit<Awaited<ReturnType<LiveFetch>>, "data"> & {
    data: ClientReturn<QueryString>;
  }
>;

// In draft mode, query the API directly. The live sanityFetch first makes a
// separate request to look up cache tags, which draft mode never uses (pages
// are rendered per request and <SanityLive /> refreshes them as a whole), so
// skipping it roughly halves the time it takes an edit to reach the preview
const draftFetch: LiveFetch = async ({
  query,
  params = {},
  perspective,
  variant,
  stega = true,
  requestTag = "next-loader.fetch.draft",
}) => {
  const jar = await cookies();
  const { result, resultSourceMap } = await client.fetch(query, await params, {
    filterResponse: false,
    perspective:
      perspective ?? (await resolvePerspectiveFromCookies({ cookies: jar })),
    variant:
      variant ??
      (perspective === undefined
        ? await resolveVariantFromCookies({ cookies: jar })
        : undefined),
    stega,
    useCdn: false,
    token,
    tag: requestTag,
  });
  return { data: result, sourceMap: resultSourceMap || null, tags: [] };
};

export const sanityFetch = (async (options) =>
  (await draftMode()).isEnabled
    ? draftFetch(options)
    : live.sanityFetch(options)) as SanityFetch;
export const { SanityLive } = live;
