import { Image } from "@/modules/Image";
import { SanityLinkWrapper } from "@/modules/SanityLinkWrapper";
import { Svg } from "@/modules/Svg";
import { Text } from "@/modules/Text";

export const TeamMember = (data) => {
  const { image, personName, position, slug } = data;

  const imageObject = { image: image };
  const linkObject = {
    linkType: "internalLink",
    internalLink: {
      slug: {
        current: slug?.current,
      },
    },
  };

  return (
    <SanityLinkWrapper link={linkObject}>
      <article className="team_card_wrapper flex flex-col w-full h-full cursor-pointer overflow-hidden rounded-card bg-lightgray hover:bg-primary-dark group transition-all duration-200">
        <div className="team_image_wrapper w-full relative overflow-hidden flex shrink-0 aspect-3/4">
          {image && (
            <Image
              image={imageObject}
              alt={personName + " image"}
              aspectRatio={3 / 4}
              sizes="(min-width: 1024px) 23vw, (min-width: 768px) 30vw, (min-width: 640px) 45vw, 90vw"
              className="group-hover:scale-[1.02] transition-transform duration-200"
            />
          )}
        </div>
        <div
          className="team_text_wrapper flex flex-col justify-between w-full h-full relative
        px-clamp-16 pt-clamp-30 pb-clamp-20 z-10 border-t-4 border-t-primary-dark
        group-hover:border-t-gray transition-all duration-200"
        >
          {personName && (
            <Text
              className="team_member_name w-full h-full text-heading4 text-primary-dark font-bold 
            group-hover:text-white transition-all duration-200"
            >
              {personName}
            </Text>
          )}
          <div className="flex items-end w-full mt-clamp-10">
            {position && (
              <Text
                className="team_member_title w-full text-darkgray text-body1 
              group-hover:text-white transition-all duration-200"
              >
                {position}
              </Text>
            )}
            <div
              className="team_svg_wrapper flex justify-center items-center w-clamp-22 h-clamp-18 ml-clamp-10
            group-hover:[&_path]:stroke-white [&_path]:transition-all [&_path]:duration-200"
            >
              <Svg name="rightArrow" />
            </div>
          </div>
        </div>
      </article>
    </SanityLinkWrapper>
  );
};
