import React from "react";
import Link from "next/link";
import { Svg } from "@/modules/Svg";
import { COLOR } from "@/utils/constants/colors";
import { ScrollAnimation } from "@/modules/ScrollAnimation";

interface SocialIcon {
  _type: string;
  link: string;
  iconType?: string;
}

interface SocialIconsProps {
  data: SocialIcon[];
  color?: string;
  className?: string;
  svgClassName?: string;
  alignment?: "left" | "center" | "right";
  disableScrollAnimation?: boolean;
}

const iconSvgNames = {
  Bluesky: "bluesky",
  Facebook: "facebook",
  Instagram: "instagram",
  LinkedIn: "linkedin",
  Pinterest: "pinterest",
  TikTok: "tiktok",
  Vimeo: "vimeo",
  X: "X_Icon",
  YouTube: "youtube",
};

export const SocialIcons: React.FC<SocialIconsProps> = ({
  data,
  color = COLOR.WHITE,
  className = "",
  svgClassName = "",
  alignment = "left",
  disableScrollAnimation = false,
}) => {
  if (!data || data.length === 0) return null;
  const alignmentClass =
    alignment === "left"
      ? "justify-start"
      : alignment === "right"
        ? "justify-end"
        : "justify-center";

  return (
    <div
      className={`flex ${alignmentClass} w-full items-center flex-wrap gap-clamp-20 ${className}`}
    >
      {data?.map((item, i) => {
        const iconType = item?.iconType;
        const link = item?.link;

        // Skip if missing required data
        if (!iconType || !(iconType in iconSvgNames) || !link) {
          return null;
        }

        const svgName = iconSvgNames[iconType as keyof typeof iconSvgNames];

        return (
          <ScrollAnimation
            key={i}
            type="fade-right"
            delay={i * 0.1}
            disableScrollAnimation={disableScrollAnimation}
          >
            <Link
              href={link}
              target="_blank"
              rel="noreferrer"
              className="flex w-clamp-32 h-clamp-32 hover:scale-[1.2] transition-transform duration-200"
              aria-label={`Visit our ${iconType} page`}
            >
              <Svg
                name={svgName}
                pathFill={color}
                className={svgClassName}
                aria-hidden="true"
              />
              <span className="sr-only">{iconType}</span>
            </Link>
          </ScrollAnimation>
        );
      })}
    </div>
  );
};
