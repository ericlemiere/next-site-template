import Link from "next/link";
import { ReactElement } from "react";
import type { Slug } from "@sanity/types";
import type { SanityImage } from "@/modules/Image/Image";
import { format, parseISO } from "date-fns";
import { Image } from "@/modules/Image";
import { Text } from "@/modules/Text";
import { BlogTile, renderTags } from "./BlogTile";

import { COLOR } from "@/utils/constants/colors";

export const BlogFeatured = ({
  data = {} as BlogTitleDataProps,
  textColor = COLOR.BLACK,
  loading,
}: BlogTitleProps): ReactElement => {
  const {
    title,
    thumbnailImage,
    heroImage: image,
    author,
    tags,
    datePublished,
  } = data;
  const slug = data?.slug?.current || "";

  const thumbnail = thumbnailImage ?? image;

  return (
    <article className="group w-full">
      <div className="block md:hidden">
        <BlogTile data={data} loading={loading} />
      </div>

      <Link href={slug} className="h-full hidden md:block">
        <div className="flex justify-between items-center w-full">
          <div className="w-1/2">
            <div className="relative w-full h-full rounded-image overflow-hidden bg-gray transition duration-500 aspect-square group-hover:brightness-70">
              {thumbnail && (
                <Image
                  image={thumbnail}
                  aspectRatio={1}
                  loading={loading}
                  sizes="48vw"
                  alt={thumbnail?.alt || `${title} thumbnail`}
                />
              )}
            </div>
          </div>

          <div className="flex flex-col w-[42%] justify-center gap-y-clamp-10 mt-clamp-20 md:mt-0">
            {tags && renderTags(tags)}
            {title && (
              <Text
                size="heading2"
                tag="p"
                color={textColor}
                className="featured_article_title underline underline-offset-3 decoration-3 decoration-transparent 
                  group-hover:underline-offset-5 group-hover:decoration-inherit transition-all duration-300"
              >
                {title}
              </Text>
            )}
            {author?.name && (
              <Text size="heading4" color={textColor} tag="p">
                {author.name}
              </Text>
            )}
            {datePublished && (
              <time dateTime={datePublished}>
                <Text tag="p" size="body2" color={textColor}>
                  {format(parseISO(datePublished), "MMMM dd, yyyy")}
                </Text>
              </time>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

type Tag = {
  tagName: string;
};

export type BlogTitleDataProps = {
  title: string;
  thumbnailImage: SanityImage;
  heroImage: SanityImage;
  slug: Slug;
  author: {
    name: string;
  };
  color?: string;
  tags: Array<Tag>;
  datePublished?: string;
};

export type BlogTitleProps = {
  data: BlogTitleDataProps;
  textColor?: string;
  loading?: "lazy" | "eager";
};
