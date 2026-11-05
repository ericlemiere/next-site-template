import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { Image } from "@/modules/Image";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { Text } from "@/modules/Text";
import { RichText } from "@/modules/RichText";
import { SocialIcons } from "@/modules/SocialIcons";
import { COLOR } from "@/utils/constants/colors";

export const TeamMemberPage = ({ data = {} }) => {
  const { personName, bio, image, socialIcons, emailAddress, phoneNumber } =
    data;
  const imageObject = { image: image, alt: personName || "Team Member Image" };

  return (
    <DefaultWrapper
      topSpacing={"default"}
      bottomSpacing={"default"}
      as="header"
    >
      <div className="w-full flex flex-col-reverse lg:flex-row justify-between gap-y-clamp-50 gap-x-clamp-30">
        <div className="w-full lg:w-[60%] flex flex-col gap-y-clamp-30">
          {personName && (
            <ScrollAnimation type="fade-up" delay={0.2}>
              <Text size="heading1" tag="h1">
                {personName}
              </Text>
            </ScrollAnimation>
          )}
          {bio && (
            <ScrollAnimation type="fade-up" delay={0.4}>
              <div className="w-full">
                <RichText data={bio} />
              </div>
            </ScrollAnimation>
          )}
          {socialIcons && socialIcons.length > 0 && (
            <div className="pt-clamp-20">
              <Text size="heading4">Follow {personName}:</Text>
              <SocialIcons
                data={socialIcons}
                color={COLOR.PRIMARY}
                className="pt-clamp-12"
              />
            </div>
          )}
        </div>

        <div className="w-full max-w-75 sm:max-w-full sm:w-1/2 m-auto lg:m-0 lg:w-[30%] flex flex-col gap-clamp-20">
          <ScrollAnimation type="fade-up">
            <div className="w-full overflow-hidden rounded-image aspect-4/6 bg-gray">
              {image && <Image image={imageObject} aspectRatio={4 / 6} />}
            </div>
          </ScrollAnimation>

          {emailAddress && (
            <div className="">
              <a
                href={`mailto:${emailAddress}`}
                className="flex items-center gap-3 pt-clamp-8"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 w-clamp-20 h-clamp-20"
                >
                  <path
                    d="M3 4h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m2 5 8 6 8-6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <Text size="body1" color={COLOR.PRIMARY}>
                  {emailAddress}
                </Text>
              </a>
            </div>
          )}

          {phoneNumber && (
            <div className="">
              <a
                href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                className="flex items-center gap-3"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 w-clamp-20 h-clamp-20"
                >
                  <path
                    d="M18 14.5v2.25a1.5 1.5 0 0 1-1.635 1.493 14.85 14.85 0 0 1-6.473-2.302 14.625 14.625 0 0 1-4.5-4.5A14.85 14.85 0 0 1 3.09 4.965 1.5 1.5 0 0 1 4.575 3.33H6.83a1.5 1.5 0 0 1 1.5 1.29c.095.715.27 1.417.525 2.092a1.5 1.5 0 0 1-.338 1.583l-.952.952a12 12 0 0 0 4.5 4.5l.952-.952a1.5 1.5 0 0 1 1.583-.338c.675.255 1.377.43 2.092.525a1.5 1.5 0 0 1 1.29 1.52z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <Text size="body1" color={COLOR.PRIMARY}>
                  {phoneNumber}
                </Text>
              </a>
            </div>
          )}
        </div>
      </div>
    </DefaultWrapper>
  );
};
