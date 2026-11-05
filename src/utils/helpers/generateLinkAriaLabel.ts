export interface AriaLabelOptions {
  linkType?: string;
  internalLink?: {
    slug?: {
      current?: string;
    };
  };
  externalLink?: string;
  downloadLink?: {
    asset?: {
      url?: string;
    };
  };
  emailAddress?: string;
  anchorLink?: {
    anchorTag?: string;
  };
  customLabel?: string;
}

export const generateLinkAriaLabel = (
  options: AriaLabelOptions
): string | undefined => {
  const {
    linkType,
    internalLink,
    externalLink,
    downloadLink,
    emailAddress,
    anchorLink,
    customLabel,
  } = options;

  // If custom label is provided, use it
  if (customLabel) {
    return customLabel;
  }

  // Generate descriptive label based on link type
  switch (linkType) {
    case "internalLink": {
      if (internalLink?.slug?.current) {
        // Extract page name from slug (e.g., "/about-us" -> "About Us")
        const pageName =
          internalLink.slug.current
            .replace(/^\//, "") // Remove leading slash
            .replace(/\/$/, "") // Remove trailing slash
            .split("/")
            .pop() // Get last segment
            ?.split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ") || "";

        return pageName ? `Go to the ${pageName} page` : undefined;
      }
      break;
    }

    case "externalLink": {
      if (externalLink) {
        try {
          const url = new URL(externalLink);
          const domain = url.hostname.replace("www.", "");
          return `Visit ${domain}`;
        } catch {
          return `Visit ${externalLink}`;
        }
      }
      break;
    }

    case "download": {
      if (downloadLink?.asset?.url) {
        // Extract filename from URL
        const filename =
          downloadLink.asset.url.split("/").pop()?.split("?")[0] || "file";
        return `Download ${filename}`;
      }
      break;
    }

    case "email": {
      if (emailAddress) {
        return `Send email to ${emailAddress}`;
      }
      break;
    }

    case "internalLinkWithAnchor": {
      if (anchorLink?.anchorTag) {
        // Format anchor tag (e.g., "contact-form" -> "Contact Form")
        const sectionName = anchorLink.anchorTag
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        return `Jump to ${sectionName} section`;
      }
      break;
    }
  }

  return undefined;
};
