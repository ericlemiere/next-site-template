import { SanityButton } from "@/modules/SanityButton";
import { RichText } from "@/modules/RichText";
import { Image } from "@/modules/Image";
import { textAlignHelper, justifyHelper } from "@/utils/helpers/style-helpers";

export const CardBackgroundImage = (data) => {
  const { button, image, body, subtitle, title, styles } = data;

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
      className={`card_wrapper_bg_image h-full w-full flex flex-col items-center justify-between 
        rounded-card overflow-hidden ${textAlignString}`}
    >
      <div className="relative flex items-center w-full h-full py-20 px-8 sm:py-24 sm:px-12 md:py-clamp-100 md:px-clamp-50">
        <div
          className="card_overlay absolute top-0 left-0 w-full h-full z-1
          bg-linear-to-b from-black/80 to-primary/80"
        />
        {image && (
          <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
            <Image image={image} sizes="(min-width: 1024px) 45vw, 90vw" />
          </div>
        )}
        <div className="relative w-full flex flex-col gap-5 md:gap-clamp-30 z-2">
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
            <div>
              <RichText
                data={body}
                size={bodyTextSize}
                color={bodyTextColor}
                tag="p"
                textAlignment={textAlignment}
              />
            </div>
          )}
          {button?.text && (
            <div className={`w-full flex ${justifyString}`}>
              <SanityButton data={button} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
