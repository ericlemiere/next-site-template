import { Text } from "@/modules/Text";
import { SanityLinkWrapper } from "@/modules/SanityLinkWrapper";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { COLOR } from "@/utils/constants/colors";

export const HeaderBanner = ({ data = {}, bannerHeight }) => {
  const { links = [] } = data;

  const renderLinks = links.map((link, index) => {
    return (
      <SanityLinkWrapper key={index} link={link}>
        <Text
          size="body2"
          color={COLOR.WHITE}
          className="cursor-pointer underline underline-offset-3 decoration-1 transition-all transition-duration-150 hover:underline-offset-6 hover:decoration-2"
        >
          {link?.linkText}
        </Text>
      </SanityLinkWrapper>
    );
  });

  return (
    <ScrollAnimation type="fade-down">
      <div
        className="bg-primary flex"
        style={{
          transition: "height 0.6s ease",
          height: bannerHeight,
        }}
      >
        <div className="flex items-center justify-end w-[92%] m-auto gap-clamp-20 flex-wrap">
          {renderLinks}
        </div>
      </div>
    </ScrollAnimation>
  );
};
