import { Text } from "@/modules/Text";
import { SanityLinkWrapper } from "@/modules/SanityLinkWrapper";
import { COLOR } from "@/utils/constants/colors";
import { cleanString } from "@/utils/helpers/string-helpers";
import type { Button } from "../../../sanity.types";

// Extended Button type with expanded references (as returned by GROQ queries)
export interface ExpandedButton extends Omit<
  Button,
  "internalLink" | "anchorLink" | "downloadLink"
> {
  internalLink?: {
    slug?: {
      current?: string;
    };
  };
  anchorLink?: {
    anchorTag?: string;
  };
  downloadLink?: {
    asset?: {
      url?: string;
    };
  };
}

interface SanityButtonData {
  data: ExpandedButton;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export const SanityButton: React.FC<SanityButtonData> = ({
  data = {} as ExpandedButton,
  className,
  onClick,
  ariaLabel,
}) => {
  if (!data) return null;
  const { linkType, buttonColor = COLOR.BLACK, text = "", buttonStyle } = data;
  // ============================================================ CONSTANTS & FUNCTIONS
  if (!linkType && !text) return;
  const cleanButtonType = cleanString(linkType);
  const cleanButtonColor = cleanString(buttonColor);
  const cleanButtonStyle = cleanString(buttonStyle);
  const isOutline = cleanButtonStyle === "Outline";

  // ============================================================ BUTTON COLOR MAPPING
  const getButtonClasses = (color: string, isOutline: boolean): string => {
    switch (color) {
      case COLOR.WHITE:
        return isOutline
          ? `bg-transparent text-white border-white hover:bg-white hover:text-black`
          : `bg-white text-black border-white hover:bg-transparent hover:text-white`;

      case COLOR.PRIMARY:
        return isOutline
          ? `bg-transparent text-primary border-primary hover:bg-primary hover:text-white`
          : `bg-primary text-white border-primary hover:bg-white hover:text-primary`;

      case COLOR.PRIMARY_DARK:
        return isOutline
          ? `bg-transparent text-primary-dark border-primary-dark hover:bg-primary-dark hover:text-white`
          : `bg-primary-dark text-white border-primary-dark hover:bg-white hover:text-primary-dark`;

      case COLOR.SECONDARY:
        return isOutline
          ? `bg-transparent text-secondary border-secondary hover:bg-secondary hover:text-white`
          : `bg-secondary text-white border-secondary hover:bg-white hover:text-secondary`;

      default: // COLOR.BLACK
        return isOutline
          ? `bg-transparent text-black border-black hover:bg-black hover:text-white`
          : `bg-black text-white border-black hover:bg-white hover:text-black`;
    }
  };

  const finalButtonColorClass = getButtonClasses(cleanButtonColor, isOutline);

  // ============================================================ BUTTON STYLE + TEXT
  const buttonContent = (
    <Text
      size="button"
      tag="span"
      className={`${className} w-fit flex items-center justify-center text-center cursor-pointer
                transition-all duration-150 ease-in-out shadow-black/20
                hover:shadow-lg hover:translate-y-0.5 hover:scale-110
                pt-clamp-16 pb-clamp-14 px-clamp-30
                relative overflow-hidden border-4 rounded-button ${finalButtonColorClass}`}
    >
      {text}
    </Text>
  );

  // ============================================================ COMPONENT RETURN

  // For onClick buttons, use a button element
  if (cleanButtonType === "onClick") {
    return <button onClick={onClick}>{buttonContent}</button>;
  }

  // For all link types, use SanityLinkWrapper
  return (
    <SanityLinkWrapper link={data} ariaLabel={ariaLabel}>
      {buttonContent}
    </SanityLinkWrapper>
  );
};

// ============================================================== INTERFACES
