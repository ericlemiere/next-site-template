import { SanityImage } from "sanity-image";
import { projectId, dataset } from "@/sanity/env";
import { SanityLinkWrapper } from "@/modules/SanityLinkWrapper";
import { Link } from "../../../sanity.types";

// =============================================================
export const Image: React.FC<ImageComponentProps> = ({
  image,
  className,
  alt = null,
  aspectRatio = null,
  loading = "lazy",
}) => {
  if (!image) return null;
  const imageAsset = image?.image;
  const imageId = imageAsset?.asset?._id;
  if (!imageId) return null;

  const hasLink = image?.addLink && !!image?.imageLink;
  const lqip = imageAsset?.asset?.metadata?.lqip;
  const altText: string = alt ?? image?.alt ?? imageAsset?.asset?.altText ?? "";

  const width = imageAsset?.asset?.metadata?.dimensions?.width;
  const height = imageAsset?.asset?.metadata?.dimensions?.height;

  const imageWidth = aspectRatio ? aspectRatio * 1000 : width;
  const imageHeight = aspectRatio ? 1000 : height;

  const cropData = {
    left: imageAsset?.crop?.left ?? 0,
    top: imageAsset?.crop?.top ?? 0,
    bottom: imageAsset?.crop?.bottom ?? 0,
    right: imageAsset?.crop?.right ?? 0,
  };

  // If aspectRatio is not passed to the Image component (null),
  // then we need to calculate the size of the image using cropData
  const calculateSize: boolean = aspectRatio === null;
  const calculatedWidth = calculateSize
    ? imageWidth * (1 - cropData.left - cropData.right)
    : imageWidth;
  const calculatedHeight = calculateSize
    ? imageHeight * (1 - cropData.top - cropData.bottom)
    : imageHeight;

  const Img = (
    <SanityImage
      className={className}
      id={imageId}
      preview={lqip}
      baseUrl={`https://cdn.sanity.io/images/${projectId}/${dataset}/`}
      alt={altText}
      crop={cropData}
      hotspot={{
        x: imageAsset.hotspot?.x ?? 0.5,
        y: imageAsset.hotspot?.y ?? 0.5,
      }}
      loading={loading}
      mode="cover"
      width={calculatedWidth}
      height={calculatedHeight}
    />
  );

  if (hasLink) {
    return (
      <SanityLinkWrapper link={image?.imageLink}>
        <div className="cursor-pointer transition-transform duration-200 hover:scale-105">
          {Img}
        </div>
      </SanityLinkWrapper>
    );
  } else return Img;
};

export interface ImageComponentProps {
  image: SanityImage;
  className?: string;
  alt?: string;
  aspectRatio?: number;
  loading?: "lazy" | "eager";
}

export interface SanityImage {
  _type?: string;
  _key?: string;
  alt?: string;
  imageTitle?: string;
  image: ImageObject;
  addLink?: boolean;
  imageLink?: Link;
}

interface ImageObject {
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
