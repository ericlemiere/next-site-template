import { Button, Card, Stack, Text } from "@sanity/ui";
import { RocketIcon } from "@sanity/icons/Rocket";
import { useFormValue } from "sanity";

export const LighthouseButton = () => {
  // Get the entire document from the form context
  const document = useFormValue([]);

  const handleClick = () => {
    if (!document) {
      alert("Page not available for analysis");
      return;
    }
    if (document._id.startsWith("drafts.")) {
      alert("Please publish the page before running the SEO analysis.");
      return;
    }

    let pageUrl =
      process.env.SANITY_STUDIO_PREVIEW_URL ||
      "https://riff-template-app.vercel.app"; // TODO: Replace with your actual live site URL;

    if (document._type !== "homePage" && document.slug?.current) {
      // For other pages with slugs
      const slug = document.slug.current.replace(/^\//, ""); // Remove leading slash
      pageUrl = `${pageUrl}/${slug}`;
    } else if (document._type !== "homePage" && !document.slug?.current) {
      alert("No URL available for this page");
      return;
    }

    // Open PageSpeed Insights with Desktop selected
    const lighthouseUrl = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(pageUrl)}&form_factor=desktop`;
    window.open(lighthouseUrl, "_blank");
  };

  return (
    <Card padding={3} radius={2} shadow={1}>
      <Stack gap={3}>
        <Text size={1} muted>
          Run SEO and Accessibility analysis on your published page
        </Text>
        <Button
          text="Check SEO with Lighthouse"
          icon={RocketIcon}
          tone="primary"
          onClick={handleClick}
        />
      </Stack>
    </Card>
  );
};
