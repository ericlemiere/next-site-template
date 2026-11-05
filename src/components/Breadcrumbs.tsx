"use client";
import { usePathname } from "next/navigation";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { cleanString } from "@/utils/helpers/string-helpers";
import { textColorToTailwind } from "@/utils/constants/colors";
import { generateBreadcrumbSchema } from "@/utils/helpers/schema-helpers";
import Link from "next/link";

export const Breadcrumbs = ({
  backgroundColor,
  textColor,
}: {
  backgroundColor: string;
  textColor: string;
}) => {
  const textColorString =
    textColorToTailwind[cleanString(textColor)] || "text-black";
  const pathname = usePathname();

  // Don't show breadcrumbs on home page
  if (pathname === "/" || pathname.includes("/api/")) {
    return null;
  }

  // Parse pathname into segments
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  // Build breadcrumb items with cumulative paths
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return { path, label };
  });

  // Generate breadcrumb schema for SEO
  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: "Home", url: "/" },
      ...breadcrumbs.map((crumb) => ({
        name: crumb.label,
        url: crumb.path,
      })),
    ],
  });

  return (
    <ScrollAnimation>
      <DefaultWrapper
        topSpacing="none"
        bottomSpacing="none"
        backgroundColor={cleanString(backgroundColor)}
      >
        {/* Breadcrumb Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <nav
          aria-label="Breadcrumb"
          className={`py-clamp-8 ${textColorString}`}
        >
          <ol className="flex items-center gap-2 text-body2 list-none">
            <li className="list-none">
              <Link
                href="/"
                className="underline underline-offset-2 decoration-1 hover:decoration-2 hover:underline-offset-4 transition-all"
              >
                Home
              </Link>
            </li>
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.path} className="flex items-center gap-2">
                <span>/</span>
                {index === breadcrumbs.length - 1 ? (
                  <span className="font-semibold" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.path}
                    className="underline underline-offset-2 decoration-1 hover:decoration-2 hover:underline-offset-4 transition-all"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </DefaultWrapper>
    </ScrollAnimation>
  );
};
