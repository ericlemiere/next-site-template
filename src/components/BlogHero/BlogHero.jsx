import { format } from "date-fns";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { Image } from "@/modules/Image";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { Text } from "@/modules/Text";
import { renderTags } from "../BlogGrid/BlogTile";

export const BlogHero = ({ data = {} }) => {
  const { heroImage, title, author, tags, datePublished } = data;

  return (
    <>
      <DefaultWrapper
        bottomSpacing={"small"}
        topSpacing={"default"}
        as="header"
      >
        <div className="w-full flex flex-col items-center justify-center text-center gap-y-clamp-30">
          <ScrollAnimation type="fade-up">
            <div className="flex flex-col items-center gap-clamp-8">
              {datePublished && (
                <time dateTime={datePublished}>
                  <Text size="body3">
                    {format(new Date(datePublished), "MMMM dd, yyyy")}
                  </Text>
                </time>
              )}
              {tags && renderTags(tags)}
            </div>
          </ScrollAnimation>
          {title && (
            <ScrollAnimation type="fade-up" delay={0.2}>
              <Text size="heading1" tag="h1">
                {title}
              </Text>
            </ScrollAnimation>
          )}

          <ScrollAnimation type="fade-up" delay={0.4}>
            <div className="flex flex-col items-center gap-2">
              {author?.image && (
                <div className="rounded-full overflow-hidden w-clamp-80 h-clamp-80">
                  <Image
                    image={author.image}
                    aspectRatio={1}
                    loading="eager"
                    sizes="(min-width: 1440px) 5vw, 80px"
                  />
                </div>
              )}
              {author && <Text size="body1">{author.name}</Text>}
            </div>
          </ScrollAnimation>
        </div>
      </DefaultWrapper>
      {heroImage && (
        <DefaultWrapper
          topSpacing={"none"}
          bottomSpacing={"none"}
          mobileWidth={"w-full"}
        >
          <ScrollAnimation type="fade-up">
            <div className="w-full lg:w-[80%] m-auto lg:overflow-hidden lg:rounded-image">
              <Image
                image={heroImage}
                aspectRatio={16 / 9}
                sizes="(max-width: 768px) 100vw, 75vw"
              />
            </div>
          </ScrollAnimation>
        </DefaultWrapper>
      )}
    </>
  );
};
