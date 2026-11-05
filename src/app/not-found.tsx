import { sanityFetch } from "@/sanity/lib/live";
import { TextSection } from "@/components/TextSection";
import { ERROR_PAGE_QUERY } from "@/sanity/lib/queries";

export default async function NotFoundPage() {
  const { data } = await sanityFetch({
    query: ERROR_PAGE_QUERY,
  });

  const homeButton = {
    text: "Back To Home Page",
    linkType: "internalLink",
    internalLink: { slug: { current: "/" } },
  };

  return (
    <div className="min-h-[50vh] flex items-center justify-center py-20">
      <TextSection
        data={{
          title: data?.title,
          body: data?.body,
          button: homeButton,
          columns: 1,
          sectionStyles: {
            titleTextSize: "heading1",
            bodyTextSize: "heading3",
            textAlignment: "center",
            topSpacing: "small",
          },
        }}
      />
    </div>
  );
}
