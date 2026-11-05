import { Svg } from "@/modules/Svg";
import { urlFor } from "@/sanity/lib/image";

// Aspect ratio (w / h) of the default codebase logo (src/modules/Svg/svgs/logo.jsx viewBox)
export const DEFAULT_LOGO_RATIO = 120 / 64;

// Aspect ratio of the uploaded Sanity logo, or the default logo's ratio
export const getLogoRatio = (logo) =>
  logo?.asset?.metadata?.dimensions?.aspectRatio || DEFAULT_LOGO_RATIO;

/**
 * Renders the logo uploaded in Sanity, or falls back to the codebase logo.
 * Fills its parent box, scaled to fit (any aspect ratio) and pinned left,
 * so size it with a wrapper element.
 *
 * @param logo        Sanity image ({ alt, asset: { url, metadata } })
 * @param maxHeightPx Largest height (px) the logo renders at; PNGs are requested at 2x this
 * @param priority    true for above-the-fold logos (header) so they load first
 */
export const SiteLogo = ({
  logo,
  maxHeightPx = 100,
  priority = false,
  className = "",
}) => {
  const asset = logo?.asset;

  if (!asset?.url) {
    return <Svg name="logo" className={className} />;
  }

  // SVGs are served as-is from the Sanity CDN. PNGs are resized to 2x for retina
  // and converted to WebP/AVIF when the browser supports it.
  const isSvg = asset.url.toLowerCase().endsWith(".svg");
  const src = isSvg
    ? asset.url
    : urlFor(logo)
        .height(maxHeightPx * 2)
        .fit("max")
        .auto("format")
        .url();

  const { width, height } = asset.metadata?.dimensions || {};

  return (
    // eslint-disable-next-line @next/next/no-img-element -- plain img so SVGs bypass the next/image loader
    <img
      src={src}
      alt={logo.alt || asset.altText || "Logo"}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`block w-full h-full object-contain object-left ${className}`}
    />
  );
};
