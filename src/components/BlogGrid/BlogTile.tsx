import { ReactElement } from "react";
import type { Slug } from "@sanity/types";
import type { SanityImage } from "@/modules/Image/Image";
import { format, parseISO } from "date-fns";
import Link from "next/link";

import { Image } from "@/modules/Image";
import { Text } from "@/modules/Text";

import { COLOR } from "@/utils/constants/colors";

export const renderTags = (tags: Array<Tag>) => {
  return (
    <div className="flex gap-clamp-10 flex-wrap">
      {tags?.map((tag, index) => (
        <Text
          key={index}
          color={COLOR.WHITE}
          size="body2"
          tag="p"
          className="article_type bg-secondary w-fit px-clamp-8 py-clamp-2 rounded-md"
        >
          {tag?.tagName}
        </Text>
      ))}
    </div>
  );
};

export const BlogTile = ({
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
      <Link href={slug} className="h-full">
        <div className="flex flex-col w-full">
          <div className="relative w-full h-full rounded-image overflow-hidden bg-gray transition duration-500 aspect-square group-hover:brightness-70">
            {thumbnail && (
              <Image
                image={thumbnail}
                aspectRatio={1}
                loading={loading}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 90vw"
                alt={thumbnail?.alt || `${title} thumbnail`}
              />
            )}
          </div>

          <div className="flex flex-col justify-center gap-y-clamp-10 mt-clamp-20">
            {tags && renderTags(tags)}

            {title && (
              <Text
                size="heading3"
                tag="p"
                color={textColor}
                className="article_title underline underline-offset-3 decoration-3 decoration-transparent 
                group-hover:underline-offset-5 group-hover:decoration-inherit transition-all duration-300"
              >
                {title}
              </Text>
            )}
            {author?.name && (
              <Text size="heading4" tag="p">
                {author.name}
              </Text>
            )}
            {datePublished && (
              <time dateTime={datePublished}>
                <Text tag="p" size="body2">
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
