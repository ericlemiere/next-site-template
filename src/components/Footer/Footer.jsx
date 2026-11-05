import Link from "next/link";
import { Text } from "@/modules/Text";
import { SiteLogo } from "@/modules/SiteLogo";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { SocialIcons } from "@/modules/SocialIcons";
import { SanityLinkWrapper } from "@/modules/SanityLinkWrapper";

import { COLOR } from "@/utils/constants/colors";

export const Footer = ({ data = {} }) => {
  const logo = data?.logo || null;
  const pageLayout = data?.pageLayout || [];
  const phoneNumber = data?.phoneNumber;
  const socialIcons = data?.socialIcons;
  const addressMapLink = data?.addressMapLink;
  const address = data?.address;
  const addressLine1 = address?.split("\n")[0] || null;
  const addressLine2 = address?.split("\n")[1] || null;
  const addressLine3 = address?.split("\n")[2] || null;

  const formattedPhone = phoneNumber?.replace(/(?!^\+)[^\d]/g, "");

  const renderNavigation = pageLayout?.map((item, i) => {
    switch (item?._type) {
      case "page":
        const link = item?.slug?.current ?? "";
        return (
          <div
            key={i}
            className="footer-link-wrapper relative w-fit group pt-clamp-14"
          >
            <Link href={`${link}`}>
              <Text size="footer1" color={COLOR.WHITE}>
                {item.navigationName}
              </Text>
              <div className="footer-link-underline group-hover:bg-accent group-hover:translate-y-2 h-0.5 absolute bottom-1 left-0 right-0 transition-all duration-150 ease-in-out" />
            </Link>
          </div>
        );
      case "link":
        return (
          <div
            key={i}
            className="footer-link-wrapper relative w-fit group pt-clamp-14"
          >
            <SanityLinkWrapper link={item}>
              <Text size="footer1" color={COLOR.WHITE}>
                {item.linkText}
              </Text>
            </SanityLinkWrapper>
            <div className="footer-link-underline group-hover:bg-accent group-hover:translate-y-2 h-0.5 absolute bottom-1 left-0 right-0 transition-all duration-150 ease-in-out" />
          </div>
        );
      default:
        return null;
    }
  });

  // ==================================================================== RENDER
  return (
    <footer className="footer flex relative w-full py-clamp-60 lg:py-clamp-80 bg-primary">
      <div className="footer-container flex flex-col md:flex-row w-[92%] justify-between mx-auto">
        <ScrollAnimation type="fade-right">
          <div className="flex hover:scale-105 transition-transform duration-300 ease-in-out">
            <Link href="/" aria-label="Home Button Link">
              <div className="flex w-clamp-160 lg:w-clamp-288 h-clamp-80 lg:h-clamp-144 relative">
                <SiteLogo logo={logo} maxHeightPx={144} />
              </div>
            </Link>
          </div>
        </ScrollAnimation>

        <div className="footer-text-wrapper flex flex-col md:flex-row w-full md:w-[60%] md:justify-end mt-2 md:mt-0 gap-clamp-20 lg:gap-clamp-40">
          <ScrollAnimation type="fade-up">
            <nav aria-label="Footer navigation">
              <div className="flex flex-col">{renderNavigation}</div>
            </nav>
          </ScrollAnimation>

          <div className="flex flex-col">
            <ScrollAnimation type="fade-up" delay={0.2} stagger={0.1}>
              {phoneNumber && (
                <div className="footer-link-wrapper relative w-fit group pt-clamp-14">
                  <Link
                    href={`tel:${formattedPhone}`}
                    aria-label="Phone Number"
                  >
                    <Text size="footer1" color={COLOR.WHITE}>
                      {phoneNumber}
                    </Text>
                    <div className="footer-link-underline group-hover:bg-accent group-hover:translate-y-2 h-0.5 absolute bottom-1 left-0 right-0 transition-all duration-150 ease-in-out" />
                  </Link>
                </div>
              )}

              {addressLine1 && (
                <div className="footer-link-wrapper relative w-fit group pt-clamp-14">
                  <Link
                    href={addressMapLink || ""}
                    target="_blank"
                    rel="noreferrer"
                    className={`${addressMapLink ? "cursor-pointer" : "cursor-default pointer-events-none"} relative`}
                  >
                    <Text size="footer1" tag="p" color={COLOR.WHITE}>
                      {addressLine1}
                    </Text>
                    {addressLine2 && (
                      <Text size="footer1" tag="p" color={COLOR.WHITE}>
                        {addressLine2}
                      </Text>
                    )}
                    {addressLine3 && (
                      <Text size="footer1" tag="p" color={COLOR.WHITE}>
                        {addressLine3}
                      </Text>
                    )}
                    <div
                      className={`footer-link-underline h-0.75 
                      absolute bottom-1 left-0 right-0 transition-all duration-150 ease-in-out
                      ${addressMapLink ? "group-hover:bg-accent group-hover:translate-y-2" : ""}`}
                    />
                  </Link>
                </div>
              )}

              <SocialIcons
                data={socialIcons}
                color={COLOR.WHITE}
                className="pt-clamp-24"
              />
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </footer>
  );
};
