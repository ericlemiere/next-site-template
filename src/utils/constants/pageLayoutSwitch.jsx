import { cleanSanityProps } from "@/utils/helpers/string-helpers";

import { AudioPlayer } from "@/components/AudioPlayer";
import { BlogGrid } from "@/components/BlogGrid";
import { CardGrid } from "@/components/CardGrid";
import { CodeEmbed } from "@/components/CodeEmbed";
import { ContactForm } from "@/components/ContactForm";
import { EventCalendar } from "@/components/EventCalendar";
import { FlexColumns } from "@/components/FlexColumns/FlexColumns";
import { HeroImage } from "@/components/HeroImage";
import { ImageAndText } from "@/components/ImageAndText";
import { ImageCarousel } from "@/components/ImageCarousel";
import { ImageHotspot } from "@/components/ImageHotspot";
import { ImageSection } from "@/components/ImageSection";
import { LogoGrid } from "@/components/LogoGrid";
import { NewsletterForm } from "@/components/NewsletterForm/NewsletterForm";
import { PopUp } from "@/components/PopUp";
import { RichTextSection } from "@/components/RichTextSection";
import { ScrollingText } from "@/components/ScrollingText/ScrollingText";
import { TabbedSection } from "@/components/TabbedSection/TabbedSection";
import { TeamGrid } from "@/components/TeamGrid";
import { TextAccordion } from "@/components/TextAccordion";
import { TextSection } from "@/components/TextSection";
import { VideoMux } from "@/components/VideoMux";
import { VideoVimeo } from "@/components/VideoVimeo/VideoVimeo";
import { VideoYouTube } from "@/components/VideoYouTube/VideoYouTube";

import { createDataAttribute } from "@sanity/visual-editing";
import { config } from "@/utils/constants/configObject";

export const pageLayoutSwitch = (pageLayout, page, isPreview) => {
  return pageLayout?.map((item, i) => {
    const typename = item?._type;

    // Show after scheduledReleaseDate
    if (
      item?.scheduledReleaseDate &&
      new Date(item.scheduledReleaseDate) > new Date()
    ) {
      return null;
    }

    // Hide if expirationDate has passed
    if (item?.expirationDate && new Date(item.expirationDate) < new Date()) {
      return null;
    }

    // Hide if hideSection is true
    if (item?.hideSection) return null;

    const cleanedItem = cleanSanityProps(item);
    const imageLoading = i === 0 ? "eager" : "lazy";

    // Wrapper for visual editing
    const Wrapper = ({ children }) => (
      <div
        data-sanity={createDataAttribute({
          ...config,
          id: page?._id,
          type: page?._type,
          path: `pageLayout[_key=="${item._key}"]`,
        }).toString()}
      >
        {children}
      </div>
    );

    let component = null;

    switch (typename) {
      case "audioPlayer":
        component = <AudioPlayer data={cleanedItem} key={item._key} />;
        break;
      case "blogPostGrid":
        component = (
          <BlogGrid data={cleanedItem} key={item._key} loading={imageLoading} />
        );
        break;
      case "cardGrid":
        component = (
          <CardGrid
            data={cleanedItem}
            key={item._key}
            pageId={page._id}
            pageItemKey={item._key}
            isPreview={isPreview}
          />
        );
        break;
      case "codeEmbed":
        component = <CodeEmbed data={cleanedItem} key={item._key} />;
        break;
      case "contactForm":
        component = (
          <ContactForm data={cleanedItem} key={item._key || item._id} />
        );
        break;
      case "eventCalendar":
        component = <EventCalendar data={cleanedItem} key={item._key} />;
        break;
      case "flexColumns":
        component = <FlexColumns data={cleanedItem} key={item._key} />;
        break;
      case "heroImage":
        component = (
          <HeroImage
            data={cleanedItem}
            key={item._key}
            loading={imageLoading}
          />
        );
        break;
      case "imageAndTextSection":
        component = (
          <ImageAndText
            data={cleanedItem}
            key={item._key}
            loading={imageLoading}
          />
        );
        break;
      case "imageCarousel":
        component = <ImageCarousel data={cleanedItem} key={item._key} />;
        break;
      case "imageHotspot":
        component = (
          <ImageHotspot
            data={cleanedItem}
            key={item._key}
            loading={imageLoading}
          />
        );
        break;
      case "imageSection":
        component = (
          <ImageSection
            data={cleanedItem}
            key={item._key}
            loading={imageLoading}
          />
        );
        break;
      case "logoGrid":
        component = (
          <LogoGrid
            data={cleanedItem}
            key={item._key}
            pageId={page._id}
            pageItemKey={item._key}
          />
        );
        break;
      case "newsletterForm":
        component = (
          <NewsletterForm data={cleanedItem} key={item._key || item._id} />
        );
        break;
      case "popUp":
        component = <PopUp data={cleanedItem} key={item._key} />;
        break;
      case "richTextSection":
        component = <RichTextSection data={cleanedItem} key={item._key} />;
        break;
      case "scrollingText":
        component = <ScrollingText data={cleanedItem} key={item._key} />;
        break;
      case "tabbedSection":
        component = <TabbedSection data={cleanedItem} key={item._key} />;
        break;
      case "teamGrid":
        component = (
          <TeamGrid
            data={cleanedItem}
            key={item._key}
            pageId={page._id}
            pageItemKey={item._key}
          />
        );
        break;
      case "textAccordion":
        component = (
          <TextAccordion
            data={cleanedItem}
            key={item._key}
            pageId={page._id}
            pageItemKey={item._key}
          />
        );
        break;
      case "textSection":
        component = <TextSection data={cleanedItem} key={item._key} />;
        break;
      case "videoMux":
        component = <VideoMux data={cleanedItem} key={item._key} />;
        break;
      case "videoVimeo":
        component = <VideoVimeo data={cleanedItem} key={item._key} />;
        break;
      case "videoYouTube":
        component = <VideoYouTube data={cleanedItem} key={item._key} />;
        break;
      default:
        component = "";
    }

    return <Wrapper key={item._key || i}>{component}</Wrapper>;
  });
};
