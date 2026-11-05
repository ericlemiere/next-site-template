import { SanityButton } from "@/modules/SanityButton";
import { RichText } from "@/modules/RichText";
import { Image } from "@/modules/Image";
import { textAlignHelper, justifyHelper } from "@/utils/helpers/style-helpers";

export const Card = (data) => {
  const { button, image, body, title, subtitle, styles } = data;
  const {
    textAlignment = "center",
    titleTextSize = "heading3",
    titleTextColor = "white",
    subtitleTextSize = "heading4",
    subtitleTextColor = "white",
    bodyTextSize = "body1",
    bodyTextColor = "white",
  } = styles || {};
  const justifyString = justifyHelper(textAlignment);
  const textAlignString = textAlignHelper(textAlignment);

  return (
    <article
      className={`h-full w-full flex flex-col items-center justify-between 
        gap-clamp-30 rounded-card ${textAlignString}`}
    >
      <div className="flex flex-col h-full w-full items-center gap-clamp-20">
        {image && (
          <div className="w-full overflow-hidden rounded-image aspect-3/2">
            <Image
              image={image}
              aspectRatio={3 / 2}
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
            />
          </div>
        )}
        {title && (
          <div className="w-full">
            <RichText
              data={title}
              size={titleTextSize}
              color={titleTextColor}
              textAlignment={textAlignment}
              tag="p" // defaults to a paragraph tag, but can be overridden by markDefs in the CMS
            />
          </div>
        )}
        {subtitle && (
          <div className="w-full">
            <RichText
              data={subtitle}
              size={subtitleTextSize}
              color={subtitleTextColor}
              textAlignment={textAlignment}
              tag="p"
            />
          </div>
        )}
        {body && (
          <div className="w-full">
            <RichText
              data={body}
              size={bodyTextSize}
              color={bodyTextColor}
              textAlignment={textAlignment}
              tag="p"
            />
          </div>
        )}
      </div>
      {button?.text && (
        <div className={`w-full flex mt-clamp-10 ${justifyString}`}>
          <SanityButton data={button} />
        </div>
      )}
    </article>
  );
};
