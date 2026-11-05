import { sanityFetch } from "@/sanity/lib/live";
import { HEADER_QUERY } from "@/sanity/lib/queries";
import { Header } from "./Header";

export async function HeaderServer() {
  const { data } = await sanityFetch({
    query: HEADER_QUERY,
  });

  if (!data) {
    return null;
  }

  return <Header data={data} />;
}
