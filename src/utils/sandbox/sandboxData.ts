import {
  blogPost,
  block,
  customBlock,
  image,
  defaultButton,
  contactFields,
} from "./constants";

import { COLOR } from "../constants/colors";

import { BlogGrid } from "@/components/BlogGrid";
import { CardGrid } from "@/components/CardGrid";
import { ContactForm } from "@/components/ContactForm";
import { HeroImage } from "@/components/HeroImage";
import { ImageAndText } from "@/components/ImageAndText";
import { ImageCarousel } from "@/components/ImageCarousel";
import { LogoGrid } from "@/components/LogoGrid";
//import { NewsletterForm } from "@/components/NewsletterForm";
import { ScrollingText } from "@/components/ScrollingText/ScrollingText";
import { TabbedSection } from "@/components/TabbedSection/TabbedSection";
import { TeamGrid } from "@/components/TeamGrid";
import { TextAccordion } from "@/components/TextAccordion";
import { TextSection } from "@/components/TextSection";

type PageDataType = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultProps: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variants: { name: string; props: any }[];
}[];

export const pageData: PageDataType = [
  // ============================================== CARD GRID

  {
    name: "Card Grid",
    component: CardGrid,
    defaultProps: {
      pageId: "sandbox-card-grid",
      data: {
        _type: "cardGrid",
        anchorTagLink: null,
        button: null,
        gridLayout: [
          {
            name: "Card 1",
            button: defaultButton,
            body: block(1),
            title: customBlock("Card 1 Title"),
            _type: "card",
            image: image,
          },
          {
            name: "Card 2",
            image: image,
            button: defaultButton,
            body: block(2),
            title: customBlock("Card 2 Title"),
            _type: "card",
          },
          {
            name: "Card 3",
            image: image,
            button: defaultButton,
            body: block(3),
            title: customBlock("Card 3 Title"),
            _type: "card",
          },
          {
            name: "Card 4",
            image: image,
            button: defaultButton,
            body: block(4),
            title: customBlock("Card 4 Title"),
            _type: "card",
          },
        ],
        sectionStyles: {
          titleTextColor: COLOR.PRIMARY,
          titleTextSize: "heading2",
          backgroundColor: COLOR.WHITE,
          textAlignment: "left",
          topSpacing: "default",
          bottomSpacing: "default",
        },
      },
    },
    variants: [
      {
        name: "2 Columns",
        props: {
          data: {
            title: "2 Column Card Grid With Background Image Cards",
            gridColumns: 2,
            cardType: "backgroundImageCard",
            cardStyles: {
              titleTextColor: COLOR.WHITE,
              titleTextSize: "heading3",
              textAlignment: "center",
            },
          },
        },
      },
      {
        name: "3 Columns",
        props: {
          data: {
            title: "3 Column Card Grid With Expandable Cards",
            gridColumns: 3,
            cardType: "cardExpandable",
            cardStyles: {
              titleTextColor: COLOR.BLACK,
              titleTextSize: "heading3",
              textAlignment: "left",
            },
          },
        },
      },
      {
        name: "4 Columns",
        props: {
          data: {
            title: "4 Column Card Grid With Standard Cards",
            gridColumns: 4,
            cardType: "card",
            cardStyles: {
              titleTextColor: COLOR.BLACK,
              titleTextSize: "heading3",
              textAlignment: "left",
              bodyTextSize: "body1",
              bodyTextColor: COLOR.BLACK,
            },
          },
        },
      },
    ],
  },

  // ============================================== CONTACT

  {
    name: "Contact Form",
    component: ContactForm,
    defaultProps: {
      isSandbox: true,
      data: {
        _type: "contactForm",
        anchorTagLink: null,
        button: defaultButton,
        socialIcons: [
          {
            _type: "socialIconInstagram",
            link: "https://www.instagram.com",
          },
          {
            _type: "socialIconFacebook",
            link: "https://facebook.com",
          },
          {
            _type: "socialIconYouTube",
            link: "https://www.youtube.com",
          },
          {
            _type: "socialIconLinkedIn",
            link: "https://linkedin.com",
          },
          {
            _type: "socialIconX",
            link: "https://x.com",
          },
        ],
        title: "Contact Us",
        body: block(2),
        contactFields: contactFields,
        sectionStyles: {
          titleTextColor: COLOR.PRIMARY,
          titleTextSize: "heading2",
          bodyTextColor: COLOR.BLACK,
          bodyTextSize: "body1",
          backgroundColor: COLOR.WHITE,
          textAlignment: "left",
          topSpacing: "default",
          bottomSpacing: "default",
        },
      },
    },
    variants: [],
  },

  // ============================================== HERO IMAGE

  {
    name: "Hero Image",
    component: HeroImage,
    defaultProps: {
      data: {
        _type: "heroImage",
        anchorTagLink: null,
        button: defaultButton,
        image: image,
        title: "Hero Image Title",
        titleHeadingTag: "h1",
        sectionStyles: {
          titleTextColor: COLOR.WHITE,
          titleTextSize: "heading1",
          overlayColor: COLOR.BLACK,
          textAlignment: "center",
        },
      },
    },
    variants: [
      {
        name: "Full Height",
        props: {
          data: {
            selectedLayout: 1,
          },
        },
      },
      {
        name: "Half Height",
        props: {
          data: {
            selectedLayout: 2,
          },
        },
      },
    ],
  },

  // ============================================== IMAGE AND TEXT

  {
    name: "Image and Text Section",
    component: ImageAndText,
    defaultProps: {
      data: {
        _type: "imageAndTextSection",
        anchorTagLink: null,
        body: block(1),
        button: defaultButton,
        fullBackgroundColor: false,
        image: image,
        imageSide: 1,
        imageSizing: 1,
        sectionStyles: {
          titleTextColor: COLOR.PRIMARY,
          titleTextSize: "heading2",
          bodyTextColor: COLOR.BLACK,
          bodyTextSize: "body1",
          backgroundColor: COLOR.WHITE,
          textAlignment: "left",
          topSpacing: "default",
          bottomSpacing: "default",
        },
      },
    },
    variants: [
      {
        name: "Row",
        props: {
          data: {
            title: "Image and Text Section - Row Layout",
            selectedLayout: 2,
            sectionStyles: {
              titleTextColor: COLOR.PRIMARY,
              titleTextSize: "heading2",
              bodyTextColor: COLOR.BLACK,
              bodyTextSize: "body1",
              backgroundColor: COLOR.WHITE,
              textAlignment: "left",
              topSpacing: "default",
              bottomSpacing: "default",
            },
          },
        },
      },
      {
        name: "Full Bleed",
        props: {
          data: {
            title: "Image and Text Section - Full Bleed Layout",
            selectedLayout: 1,
            sectionStyles: {
              titleTextColor: COLOR.PRIMARY,
              titleTextSize: "heading2",
              bodyTextColor: COLOR.BLACK,
              bodyTextSize: "body1",
              textAlignment: "center",
            },
          },
        },
      },
    ],
  },

  // ============================================== IMAGE CAROUSEL

  {
    name: "Image Carousel",
    component: ImageCarousel,
    defaultProps: {
      data: {
        _type: "imageCarousel",
        aspectRatio: "aspect-[6/4]",
        direction: "Right",
        imageMargin: 10,
        images: [image, image, image],
        speed: 6,
        sectionStyles: {
          topSpacing: "default",
          bottomSpacing: "default",
        },
      },
    },
    variants: [
      {
        name: "Default Width",
        props: {
          data: {
            componentWidth: 0,
            imageMargin: 1,
          },
        },
      },
      {
        name: "Full Width, Auto Scroll",
        props: {
          data: {
            componentWidth: 1,
            imageMargin: 1,
            autoPlayOptions: 2,
            direction: "forward",
          },
        },
      },
    ],
  },

  // ============================================== LOGO GRID

  {
    name: "Logo Grid",
    component: LogoGrid,
    defaultProps: {
      data: {
        _type: "logoGrid",
        anchorTagLink: null,
        title: "Logo Grid",
        gridLayout: [
          { image: image },
          { image: image },
          { image: image },
          { image: image },
          { image: image },
          { image: image },
          { image: image },
          { image: image },
          { image: image },
          { image: image },
        ],
        sectionStyles: {
          backgroundColor: COLOR.WHITE,
          topSpacing: "default",
          bottomSpacing: "default",
          textAlignment: "center",
        },
      },
    },
    variants: [],
  },

  // ============================================== NEWSLETTER FORM

  // {
  //   name: "Newsletter Form",
  //   component: NewsletterForm,
  //   defaultProps: {
  //     data: {
  //       title: "Subscribe to our Newsletter",
  //       body: block(1),
  //       image: image,
  //       _type: "newsletterForm",
  //       anchorTagLink: null,
  //       sectionStyles: {
  //         titleTextColor: COLOR.PRIMARY,
  //         titleTextSize: "heading2",
  //         bodyTextColor: COLOR.BLACK,
  //         bodyTextSize: "body1",
  //         backgroundColor: COLOR.WHITE,
  //         textAlignment: "left",
  //         topSpacing: "default",
  //         bottomSpacing: "default",
  //       },
  //     },
  //   },
  //   variants: [
  //     {
  //       name: "Layout 1",
  //       props: {
  //         data: {
  //           selectedLayout: 1,
  //         },
  //       },
  //     },
  //     {
  //       name: "Layout 2",
  //       props: {
  //         data: {
  //           selectedLayout: 2,
  //         },
  //       },
  //     },
  //   ],
  // },

  // ============================================== POST GRID
  {
    name: "Post Grid",
    component: BlogGrid,
    defaultProps: {
      data: {
        _type: "blogPostGrid",
        anchorTagLink: null,
        autoPopulate: false,
        autoPopulateTag: false,
        grid: [
          blogPost("Art"),
          blogPost("Music"),
          blogPost("Painting"),
          blogPost("Art"),
          blogPost("Music"),
          blogPost("Music"),
          blogPost("Painting"),
          blogPost("Painting"),
        ],
        button: defaultButton,
        limitGrid: false,
        showFilter: true,
        title: "Post Grid",
        sectionStyles: {
          titleTextColor: COLOR.PRIMARY,
          titleTextSize: "heading1",
          backgroundColor: COLOR.WHITE,
          textAlignment: "left",
          topSpacing: "default",
          bottomSpacing: "default",
        },
      },
    },
    variants: [
      {
        name: "Featured Post",
        props: {
          data: {
            showFeaturedPost: true,
          },
        },
      },
      {
        name: "No Featured Post",
        props: {
          data: {
            showFeaturedPost: false,
          },
        },
      },
    ],
  },

  // ============================================== SCROLLING TEXT

  {
    name: "Scrolling Text",
    component: ScrollingText,
    defaultProps: {
      data: {
        _type: "scrollingText",
        anchorTagLink: null,
        textItems: [
          {
            text: "Example Scrolling Text",
          },
        ],
        sectionStyles: {
          bodyTextColor: COLOR.BLACK,
          backgroundColor: COLOR.PRIMARY,
        },
      },
    },
    variants: [],
  },

  // ============================================== TABBED SECTION

  {
    name: "Tabbed Section",
    component: TabbedSection,
    defaultProps: {
      data: {
        _type: "tabbedSection",
        anchorTagLink: null,
        tabSections: [
          {
            _type: "tab",
            title: "Tab 1",
            subtitle: customBlock("This is the subtitle for Tab 1"),
            body: block(1),
            image: image,
          },
          {
            _type: "tab",
            title: "Tab 2",
            body: block(2),
            image: image,
          },
          {
            _type: "tab",
            title: "Tab 3",
            body: block(3),
            image: image,
          },
        ],
        sectionStyles: {
          titleTextColor: COLOR.PRIMARY,
          bodyTextColor: COLOR.BLACK,
          backgroundColor: COLOR.WHITE,
          textAlignment: "left",
          topSpacing: "default",
          bottomSpacing: "default",
        },
      },
    },
    variants: [],
  },

  // ============================================== TEAM GRID

  {
    name: "Team Grid",
    component: TeamGrid,
    defaultProps: {
      data: {
        _type: "teamGrid",
        anchorTagLink: null,
        gridLayout: [
          {
            teamMember: {
              image: image,
              position: "Co-Founder & CEO",
              personName: "Steve Jobs",
              bio: customBlock(
                "Steve Jobs was an American business magnate, industrial designer, and inventor. He was the co-founder, chairman, and chief executive officer (CEO) of Apple Inc., the chairman and majority shareholder of Pixar, a member of The Walt Disney Company's board of directors following its acquisition of Pixar, and the founder, chairman, and CEO of NeXT.",
              ),
              _type: "teamMember",
            },
          },
          {
            teamMember: {
              image: image,
              position: "Chief Operating Officer",
              personName: "Tim Cook",
              bio: customBlock(
                "Tim Cook is an American business executive, and the current CEO of Apple Inc. He joined Apple in 1998 as Senior Vice President for Worldwide Operations, and later served as the Executive Vice President for Sales and Operations.",
              ),
              _type: "teamMember",
            },
          },
          {
            teamMember: {
              image: image,
              position: "Co-Founder & Engineer",
              personName: "Steve Wozniak",
              bio: customBlock(
                "Steve Wozniak, also known as 'Woz', is an American electronics engineer, programmer, philanthropist, and technology entrepreneur. He co-founded Apple Inc. in 1976 alongside Steve Jobs and Ronald Wayne.",
              ),
              _type: "teamMember",
            },
          },
          {
            teamMember: {
              image: image,
              position: "Chief Design Officer",
              personName: "Jony Ive",
              bio: customBlock(
                "Jony Ive is a British industrial and product designer who was the Chief Design Officer (CDO) of Apple Inc. from 1997 to 2019. He played a key role in the design of many iconic Apple products, including the iMac, iPod, iPhone, and iPad.",
              ),
              _type: "teamMember",
            },
          },
        ],
        name: "Team Grid",
        title: "Team Grid",
        sectionStyles: {
          titleTextColor: COLOR.PRIMARY,
          titleTextSize: "heading2",
          bodyTextColor: COLOR.BLACK,
          bodyTextSize: "body1",
          backgroundColor: COLOR.WHITE,
          textAlignment: "left",
          topSpacing: "default",
          bottomSpacing: "default",
        },
      },
    },
    variants: [],
  },

  // ============================================== TEXT ACCORDION

  {
    name: "Text Accordion",
    component: TextAccordion,
    defaultProps: {
      pageId: "sandbox-text-accordion",
      data: {
        _type: "textAccordion",
        accordionItems: [
          {
            _type: "accordionItem",
            title: "Great Dane",
            body: customBlock(
              "The Great Dane is a German breed of domestic dog known for its giant size. They are friendly, patient, and dependable dogs that make great family pets.",
            ),
          },
          {
            _type: "accordionItem",
            title: "Poodle",
            body: customBlock(
              "The Poodle is a breed of dog that is known for its intelligence and hypoallergenic coat. They come in three sizes: standard, miniature, and toy.",
            ),
          },
          {
            _type: "accordionItem",
            title: "Golden Retriever",
            body: customBlock(
              "The Golden Retriever is a popular breed of dog known for its friendly and tolerant attitude. They are intelligent, easy to train, and make great family pets.",
            ),
          },
          {
            _type: "accordionItem",
            title: "Boston Terrier",
            body: customBlock(
              "The Boston Terrier is a breed of dog known for its friendly and lively personality. They are small, compact, and well-muscled dogs that make great companions.",
            ),
          },
        ],
        accordionParagraphTextColor: "#000000",
        accordionTitleTextColor: "#000000",
        button: defaultButton,
        faq: true,
        subtitle: block(4),
        title: "Accordion Title",
        sectionStyles: {
          titleTextColor: COLOR.PRIMARY,
          titleTextSize: "heading2",
          bodyTextColor: COLOR.BLACK,
          bodyTextSize: "body1",
          backgroundColor: COLOR.WHITE,
          textAlignment: "left",
          topSpacing: "default",
          bottomSpacing: "default",
        },
      },
    },
    variants: [
      {
        name: "One Column",
        props: {
          data: {
            selectedLayout: 1,
          },
        },
      },
      {
        name: "Two Columns",
        props: {
          data: {
            selectedLayout: 2,
          },
        },
      },
    ],
  },

  // ============================================== TEXT SECTION COLUMNS

  {
    name: "Text Section",
    component: TextSection,
    defaultProps: {
      data: {
        _type: "textSection",
        anchorTagLink: null,
        name: "1 Column Text Section | Home ",

        titleTextSize: "heading2",
        subtitleTextSize: "heading3",
        subtitleTextColor: "#000000",
        bodyTextSize: "body1",
        bodyTextColor: "#000000",

        title: "Column 1 Title",
        subtitle: customBlock("Column 1 Subtitle"),
        body: block(1),
        button: defaultButton,

        column2Title: "Column 2 Title",
        column2Subtitle: customBlock("Column 2 Subtitle"),
        column2Body: block(3),
        column2Button: defaultButton,

        column3Title: "Column 3 Title",
        column3Subtitle: customBlock("Column 3 Subtitle"),
        column3Body: block(4),
        column3Button: null,
        sectionStyles: {
          titleTextColor: COLOR.PRIMARY,
          titleTextSize: "heading2",
          subtitleTextColor: COLOR.BLACK,
          subtitleTextSize: "heading3",
          bodyTextColor: COLOR.BLACK,
          bodyTextSize: "body1",
          backgroundColor: COLOR.WHITE,
          textAlignment: "left",
          topSpacing: "default",
          bottomSpacing: "default",
        },
      },
    },
    variants: [
      {
        name: "1 Column",
        props: {
          data: {
            columns: 1,
            textAlignment: "center",
          },
        },
      },
      {
        name: "2 Columns",
        props: {
          data: {
            columns: 2,
            textAlignment: "center",
          },
        },
      },
      {
        name: "3 Columns",
        props: {
          data: {
            columns: 3,
            textAlignment: "center",
          },
        },
      },
    ],
  },
];
