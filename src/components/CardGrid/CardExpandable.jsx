import { useState } from "react";
import { Image } from "@/modules/Image";
import { RichText } from "@/modules/RichText";
import { SanityButton } from "@/modules/SanityButton";
import { backgroundToTailwind } from "@/utils/constants/colors";

export const CardExpandable = (data) => {
  const { button, image, body, title, subtitle, styles } = data;
  const {
    titleTextSize = "heading3",
    titleTextColor = "white",
    subtitleTextSize = "heading4",
    subtitleTextColor = "white",
    bodyTextSize = "body1",
    bodyTextColor = "white",
  } = styles || {};
  const [isOpen, setIsOpen] = useState(false);
  const plusSignColor = backgroundToTailwind[titleTextColor];
  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <article
      className="flex flex-col gap-y-clamp-24 group cursor-pointer"
      onClick={handleToggle}
    >
      {image && (
        <div className="w-full mb-clamp-10 overflow-hidden rounded-image aspect-square">
          <Image
            image={image}
            aspectRatio={1}
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="group-hover:opacity-80 transition group-hover:scale-[1.02] duration-300"
          />
        </div>
      )}
      <div className="flex flex-col">
        <button
          className="card_expandable_row flex items-center justify-between gap-2 w-full text-left cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
          aria-expanded={isOpen}
          aria-label={`${isOpen ? "Collapse" : "Expand"} ${title || "details"}`}
        >
          {title && (
            <div className="w-full">
              <RichText
                data={title}
                size={titleTextSize}
                color={titleTextColor}
                tag="p" // defaults to a paragraph tag, but can be overridden by markDefs in the CMS
                className="card_title transition duration-300"
              />
            </div>
          )}

          <div
            aria-hidden="true"
            className="border-0 relative flex flex-col items-center justify-center 
              w-clamp-24 h-clamp-24 bg-transparent opacity-60 transition-all
              group-hover:opacity-100 group-hover:scale-125"
          >
            <div
              className={`plusSign w-0.5 ${plusSignColor} transition-all duration-300 ${isOpen ? "h-0" : "h-1/2"}`}
            />
            <div
              className={`plusSign w-full h-0.5 ${plusSignColor} transition-all duration-300 ${isOpen ? "w-[120%]" : "w-full"}`}
              style={{
                width: isOpen ? "120%" : "100%",
              }}
            />
            <div
              className={`plusSign w-0.5 ${plusSignColor} transition-all duration-300 ${isOpen ? "h-0" : "h-1/2"}`}
            />
          </div>
        </button>
        {subtitle && (
          <div className="w-full mb-clamp-10">
            <RichText
              data={subtitle}
              size={subtitleTextSize}
              color={subtitleTextColor}
              tag="p"
            />
          </div>
        )}
      </div>

      {body && (
        <div onClick={(e) => e.stopPropagation()}>
          <div
            className="card_expandable_body overflow-hidden"
            style={{
              maxHeight: isOpen ? "300px" : 2,
              transition: `max-height ${isOpen ? ".4s" : ".8s"} ease-in-out ${isOpen ? ".8s" : "0s"}`, // property duration timing-function delay
            }}
          >
            <RichText
              data={body}
              size={bodyTextSize}
              tag="p"
              color={bodyTextColor}
              className="pr-clamp-10 pb-clamp-10"
            />
            {button?.text && (
              <div className="my-clamp-20">
                <SanityButton data={button} />
              </div>
            )}
          </div>
          <div
            className={`card_expandable_bottom_line h-0.5 ${plusSignColor} ${isOpen ? "w-full" : "w-0"}`}
            style={{
              transition: `width ${isOpen ? ".8s" : ".4s"} ease-in-out ${isOpen ? "0s" : ".8s"}`, // property duration timing-function delay
            }}
          />
        </div>
      )}
    </article>
  );
};
