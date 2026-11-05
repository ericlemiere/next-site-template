import NextImage from "next/image";
import { createImageUrlBuilder } from "@sanity/image-url";
import { projectId, dataset } from "@/sanity/env";
import { SanityLinkWrapper } from "@/modules/SanityLinkWrapper/SanityLinkWrapper";
import type {
  Link,
  ImageModule,
  YoutubeInsert,
  Button,
} from "../../../sanity.types";
import SandboxImage from "./SandboxImage";
import { cleanString } from "@/utils/helpers/string-helpers";
import { Modal } from "./Modal";

const builder = createImageUrlBuilder({ projectId, dataset });

export const Image: React.FC<ImageComponentProps> = ({
  image,
  className,
  alt = null,
  aspectRatio = null,
  loading = "lazy",
  sizes = "(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 50vw",
  fill = false,
}) => {
  if (!image) return null;

  if (image?.image?._type === "sandboxImage") return <SandboxImage />;

  const imageAsset = image?.image;
  const asset = imageAsset?.asset;
  if (!asset?._id && !asset?._ref) return null;

  const hasLink = cleanString(image.cta) === "link" && !!image.imageLink;
  const hasModal = cleanString(image.cta) === "modal";

  const lqip = asset?.metadata?.lqip;
  const altText: string = alt ?? image?.alt ?? asset?.altText ?? "";

  // Build Sanity image URL (builder automatically applies crop/hotspot from imageAsset)
  let urlBuilder = builder.image(imageAsset);
  if (aspectRatio) {
    urlBuilder = urlBuilder
      .width(Math.round(aspectRatio * 1000))
      .height(1000)
      .fit("max");
  }
  const imageUrl = urlBuilder.url();

  // Get width/height for next/image
  const dimensions = asset?.metadata?.dimensions;
  let width = dimensions?.width;
  let height = dimensions?.height;

  // If aspectRatio is provided, override width/height
  if (aspectRatio) {
    width = Math.round(aspectRatio * 1000);
    height = 1000;
  }

  // If crop is present and aspectRatio is not forced, adjust width/height
  if (!aspectRatio && imageAsset?.crop && width && height) {
    width =
      width * (1 - (imageAsset.crop.left ?? 0) - (imageAsset.crop.right ?? 0));
    height =
      height * (1 - (imageAsset.crop.top ?? 0) - (imageAsset.crop.bottom ?? 0));
  }

  const hotspot = imageAsset?.hotspot;
  const objectPosition = hotspot
    ? `${(hotspot.x ?? 0.5) * 100}% ${(hotspot.y ?? 0.5) * 100}%`
    : "50% 50%";

  // GUARD: Don't render if width or height is missing
  if (!width || !height) {
    return (
      <div
        style={{
          width: "100%",
          aspectRatio: aspectRatio || 1.5,
          background:
            "linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)",
          backgroundSize: "200% 100%",
          borderRadius: 8,
          minHeight: 100,
          animation: "skeleton-wave 1.5s linear infinite",
        }}
        aria-busy="true"
        aria-label="Loading image"
      />
    );
  }

  const linkText = image?.imageLink?.linkText;

  const Img = (
    <NextImage
      src={imageUrl}
      alt={altText}
      title={hasLink && linkText ? linkText : ""}
      sizes={sizes}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={`w-full h-full object-cover object-center ${className || ""}`}
      loading={loading}
      placeholder={lqip ? "blur" : undefined}
      blurDataURL={lqip || undefined}
      style={{ objectPosition }}
    />
  );

  if (hasLink) {
    return (
      <div
        className="w-full h-full cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out"
        role="link"
      >
        <SanityLinkWrapper link={image?.imageLink}>{Img}</SanityLinkWrapper>
      </div>
    );
  } else if (hasModal) {
    return (
      <Modal
        title={image?.modalTitle}
        body={image?.modalBody}
        trigger={
          <button
            className="w-full h-full cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out border-0 bg-transparent p-0"
            aria-label={image?.modalTitle || "Open image details"}
            type="button"
          >
            {Img}
          </button>
        }
      />
    );
  } else {
    return Img;
  }
};

export interface ImageComponentProps {
  image: SanityImage;
  className?: string;
  alt?: string;
  aspectRatio?: number;
  loading?: "lazy" | "eager";
  sizes?: string;
  fill?: boolean;
}

export interface SanityImage {
  _type?: string;
  _key?: string;
  alt?: string;
  imageTitle?: string;
  image: ImageObject;
  addLink?: boolean;
  imageLink?: Link;
  cta?: string;
  modalTitle?: string;
  modalBody?: Array<
    | ({ _key: string } & ImageModule)
    | ({ _key: string } & YoutubeInsert)
    | ({ _key: string } & Button)
    | {
        _key: string;
        children?: Array<{
          marks?: Array<string>;
          text?: string;
          _type: "span";
          _key: string;
        }>;
        style?: "normal" | "h2" | "h3" | "h4" | "h5";
        listItem?: "bullet" | "number";
        [key: string]: unknown;
      }
  >;
}

interface ImageObject {
  _type?: string;
  asset: SanityImageAsset;
  crop?: CropObject;
  hotspot?: HotspotObject;
}

interface CropObject {
  left?: number;
  top?: number;
  bottom?: number;
  right?: number;
}

interface HotspotObject {
  x?: number;
  y?: number;
  height?: number;
  width?: number;
}

interface SanityImageAsset {
  _ref: string;
  _type: string;
  _id: string;
  altText?: string;
  metadata: {
    lqip: string;
    dimensions: { aspectRatio: number; height: number; width: number };
  };
}
