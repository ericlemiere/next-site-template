import Link from "next/link";
import { AnchorLinkClient } from "../AnchorLinkClient";
import { cleanString } from "@/utils/helpers/string-helpers";
import { generateLinkAriaLabel } from "@/utils/helpers/generateLinkAriaLabel";

interface SanityLinkWrapperProps {
  link: any;
  children: React.ReactNode;
  ariaLabel?: string;
  role?: string | null;
}

export const SanityLinkWrapper: React.FC<SanityLinkWrapperProps> = ({
  link,
  children,
  ariaLabel,
  role = null,
}) => {
  const buttonId = link?.buttonId || null;
  const target = cleanString(link?.target) !== "_blank" ? "_self" : "_blank";
  const rel = cleanString(link?.target) !== "_blank" ? "" : "noreferrer";

  const linkType = !!link && link?.linkType;

  // Generate aria-label
  const computedAriaLabel = generateLinkAriaLabel({
    linkType: cleanString(linkType),
    internalLink: link?.internalLink,
    externalLink: link?.externalLink,
    downloadLink: link?.downloadLink,
    emailAddress: link?.emailAddress,
    anchorLink: link?.anchorLink,
    customLabel: ariaLabel,
  });

  // Wrapper for children with sr-only text
  const childrenWithLabel = (
    <>
      {children}
      {computedAriaLabel && (
        <span className="sr-only"> {computedAriaLabel}</span>
      )}
    </>
  );

  switch (linkType) {
    case "internalLink": {
      const slug = link.internalLink?.slug?.current;
      const url = !!slug ? slug : "";
      return (
        <Link href={`${url}`} role={role ?? undefined}>
          {childrenWithLabel}
        </Link>
      );
    }
    case "internalLinkWithAnchor": {
      if (!link?.anchorLink?.anchorTag) return <>{children}</>;
      const anchorUrl = cleanString(link?.anchorLink?.anchorTag);
      return (
        <AnchorLinkClient id={buttonId ?? undefined} link={anchorUrl ?? "/404/"}>
          {childrenWithLabel}
        </AnchorLinkClient>
      );
    }
    case "externalLink": {
      return (
        <a
          href={link.externalLink}
          target={target}
          rel={rel}
          id={buttonId ?? undefined}
          role={role ?? undefined}
        >
          {childrenWithLabel}
        </a>
      );
    }
    case "download": {
      return (
        <a
          href={link.downloadLink?.asset.url}
          target={target}
          rel={rel}
          id={buttonId ?? undefined}
          role={role ?? undefined}
        >
          {childrenWithLabel}
        </a>
      );
    }
    case "email": {
      return (
        <a
          href={`mailto:${link.emailAddress}`}
          target={target}
          rel={rel}
          id={buttonId ?? undefined}
          role={role ?? undefined}
        >
          {childrenWithLabel}
        </a>
      );
    }
    case "phoneNumber": {
      const formattedPhone = link?.phoneNumber?.replace(/(?!^\+)[^\d]/g, "");
      return (
        <a
          href={`tel:${formattedPhone}`}
          target={target}
          rel={rel}
          id={buttonId ?? undefined}
          role={role ?? undefined}
        >
          {childrenWithLabel}
        </a>
      );
    }
    default:
      return <>{children}</>;
  }
};
