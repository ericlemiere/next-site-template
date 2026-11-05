import { sanityFetch } from "@/sanity/lib/live";
import { FOOTER_QUERY } from "@/sanity/lib/queries";
import { Footer } from "./Footer";

export async function FooterServer() {
  const { data } = await sanityFetch({
    query: FOOTER_QUERY,
  });

  if (!data) {
    return null;
  }
  return <Footer data={data} />;
}
