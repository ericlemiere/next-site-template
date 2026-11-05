import { defineQuery } from "groq";
import groq from "groq";
import type { Page, Header, Footer, CookiePopUp } from "../../../sanity.types";

//
// REUSABLE QUERY FUNCTIONS
//
// Only the asset fields the frontend uses (url builder, next/image sizing,
// blur placeholder, alt fallback, JSON-LD). Expanding the full asset document
// also returns EXIF, palette, blurhash, etc. for every image on the page
// @sanity-typegen-ignore
const imageAssetQuery = groq`
asset->{
  _id,
  url,
  altText,
  metadata {
    lqip,
    dimensions,
  },
}
`;

// @sanity-typegen-ignore
const fileAssetQuery = groq`
asset->{
  url,
  originalFilename,
}
`;

// @sanity-typegen-ignore
const anchorTagQuery = groq`anchorTagLink->{ anchorTag }`;

// @sanity-typegen-ignore
const linksQuery = groq`
buttonId,
_type,

linkType == 'internalLinkWithAnchor' => {
  anchorLink->{
    anchorTag,
  },
},

linkType == 'download' => {
  downloadLink{
    ...,
    ${fileAssetQuery},
  },
},

linkType == 'email' => {
  emailAddress,
},

linkType == 'phoneNumber' => {
  phoneNumber,
},

linkType == 'externalLink' => {
  externalLink,
  target,
},

linkType == 'internalLink' => {
  internalLink->{
    slug,
  },
},
`;

// @sanity-typegen-ignore
const buttonQuery = groq`
{
  text,
  buttonColor,
  buttonStyle,
  linkType,
  ${linksQuery}
}
`;

// @sanity-typegen-ignore
const sectionStylesQuery = groq`
{
  backgroundColor,
  overlayColor,
  titleTextColor,
  titleTextSize,
  titleHeadingTag,
  subtitleTextColor,
  subtitleTextSize,
  bodyTextColor,
  bodyTextSize,
  textAlignment,
  columnAlignment,
  'topSpacing': paddingTop,
  'bottomSpacing': paddingBottom,
}
`;

// @sanity-typegen-ignore
const linkQuery = groq`
{
  linkType,
  linkText,
  ${linksQuery}
}
`;

// For a plain image field (e.g. teamMember.image)
// @sanity-typegen-ignore
const imageFieldQuery = groq`
{
  ...,
  ${imageAssetQuery},
}
`;

// For imageSimple fields (image + alt only)
// @sanity-typegen-ignore
const simpleImageQuery = groq`
{
  ...,
  image${imageFieldQuery},
}
`;

// Basic image query without rich text
// @sanity-typegen-ignore
const basicImageQuery = groq`
{
  ...,
  imageLink${linkQuery},
  image${imageFieldQuery},
}
`;

// Be sure to update this if the imageQuery is updated
// @sanity-typegen-ignore
export const richTextQuery = groq`
  []{
    ...,
    _type == "insertImage" => ${basicImageQuery},
    _type == "youtube" => {
      youtubeEmbed,
    },
     _type == "insertButton" => {
      "button": ${buttonQuery},
    },
    markDefs[]{
      ...,
      _type == "linkObject" => {
        ...,
        linkType,
        linkType == "externalLink" => {
          href,
          blank,
        },
        linkType == "internalLink" => {
          ...,
          "slug": select(
            @.page->._type == "homePage" => "/",
            @.page->slug.current
          ),
        },
        linkType == "anchorLink" => {
          "anchorTag": @.anchor->anchorTag,
        },
        linkType == "downloadLink" => {
          blank,
          file{
            asset->{
              url,
            },
          },
        },
      },
    }
  }
`;

// Full imageModule query that includes rich text for modal body
// @sanity-typegen-ignore
const imageQuery = groq`
{
  ...,
  modalBody${richTextQuery},
  imageLink${linkQuery},
  image${imageFieldQuery},
}
`;

// @sanity-typegen-ignore
const blogGridQueryGrid = groq`
  _type,
  title,
  thumbnailImage${simpleImageQuery},
  heroImage${simpleImageQuery},
  slug,
  datePublished,
  author->{
    name,
  },
  tags[]->{
    tagName,
  },
`;

// Reusable query for FlexColumns column content
// @sanity-typegen-ignore
const flexColumnContentQuery = groq`
[] {
  ...,
  _type == "cardObject" => {
    _type,
    card {
      ...,
      cardType,
      title${richTextQuery},
      subtitle${richTextQuery},
      body${richTextQuery},
      button${buttonQuery},
      image${simpleImageQuery},
    },
    cardStyles {
      bodyTextColor,
      bodyTextSize,
      textAlignment,
      titleTextColor,
      titleTextSize,
      subtitleTextColor,
      subtitleTextSize,
    },
  },
  _type == "imageModule" => {
    'image':${imageQuery},
  },
  _type == "flexRichTextSection" => {
    body${richTextQuery},
    sectionStyles${sectionStylesQuery},
  },
  _type == "flexTextAccordion" => {
    accordionItems[] {
      ...,
      body${richTextQuery},
    },
    sectionStyles${sectionStylesQuery},
  },
  _type == "flexTextSection" => {
    ...,
    title,
    subtitle${richTextQuery},
    body${richTextQuery},
    sectionStyles${sectionStylesQuery},
  },
}
`;

// Tag filtering happens here rather than client side so a limited grid
// is filled with matching posts instead of filtering down the first 3-4
// @sanity-typegen-ignore
const blogGridPostsFilter = groq`_type == "blogPost" && defined(slug.current) && (!^.autoPopulateTag || ^.autoPopulateTagValue._ref in tags[]._ref)`;

// @sanity-typegen-ignore
const blogGridQuery = groq`
  _type,
  autoPopulate,
  showFeaturedPost,
  ${anchorTagQuery},
  button${buttonQuery},
  autoPopulateTagValue->{
    tagName,
  },
  !autoPopulate => {
    grid[]->{${blogGridQueryGrid}},
  },
  autoPopulate && !limitGrid => {
    'grid': *[${blogGridPostsFilter}] | order(datePublished desc){${blogGridQueryGrid}},
  },
  autoPopulate && limitGrid && showFeaturedPost => {
    'grid': *[${blogGridPostsFilter}] | order(datePublished desc)[0...4]{${blogGridQueryGrid}},
  },
  autoPopulate && limitGrid && !showFeaturedPost => {
    'grid': *[${blogGridPostsFilter}] | order(datePublished desc)[0...3]{${blogGridQueryGrid}},
  }
`;

//
// PAGE QUERIES
//

const pageLayoutQuery = defineQuery(`
{
  _type,
  _id,
  _type == 'audioPlayer' => {
    ...,
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    sectionStyles${sectionStylesQuery},
    audioFile{
      ...,
      ${fileAssetQuery},
    },
  },
  _type == 'blogPostGrid' => {
    ...,
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    ${blogGridQuery},
    sectionStyles${sectionStylesQuery},
  },
  _type == 'cardGrid' => {
    ...,
    _id,
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    cardType,
    ${anchorTagQuery},
    gridLayout[] {
      ...,
      title${richTextQuery},
      subtitle${richTextQuery},
      body${richTextQuery},
      button${buttonQuery},
      image${simpleImageQuery},
    },
    button${buttonQuery},
    sectionStyles${sectionStylesQuery},
    cardStyles {
      bodyTextColor,
      bodyTextSize,
      subtitleTextColor,
      subtitleTextSize,
      textAlignment,
      titleTextColor,
      titleTextSize,
    },
  },
  _type == 'codeEmbed' => {
    ...,
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    ${anchorTagQuery},
    code,
    iframeSize,
    sectionStyles${sectionStylesQuery},
  },
  _type == 'contactForm' => {
    ...,
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    ${anchorTagQuery},
    socialIcons[]{
      ...,
    },
    body${richTextQuery},
    button${buttonQuery},
    onFormSubmitLink->{
      slug,
    },
    contactFields[] {
      label,
      fieldType,
      isRequired,
      options,
    },
    sectionStyles${sectionStylesQuery},
  },
  _type == 'eventCalendar' => {
    ...,
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    ${anchorTagQuery},
    title,
    body${richTextQuery},
    'events': *[_type == "event" && defined(slug.current)] | order(eventDateTime asc){
      _id,
      title,
      heroImage${simpleImageQuery},
      slug,
      eventDateTime,
      eventDescription,
      location,
      duration,
      allDay,
    },
    sectionStyles${sectionStylesQuery},
  },
  _type == "flexColumns" => {
    ...,
    column1${flexColumnContentQuery},
    column2${flexColumnContentQuery},
    sectionStyles${sectionStylesQuery},
  },
  _type == 'heroImage' => {
    ...,
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    ${anchorTagQuery},
    button${buttonQuery},
    image${simpleImageQuery},
    sectionStyles${sectionStylesQuery},
  },
  _type == 'imageHotspot' => {
    ...,
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    hotspotImage-> {
      _id,
      _type,
      image${simpleImageQuery},
      backgroundColor,
      hotspots[]{
        _key,
        details,
        x,
        y
      }
    },
    sectionStyles${sectionStylesQuery},
  },
  _type == 'imageSection' => {
    ...,
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    images[]${imageQuery},
    aspectRatio,
    imageWidth,
    sectionStyles${sectionStylesQuery},
  },
  _type == 'imageAndTextSection' => {
    _key,
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    ${anchorTagQuery},
    title,
    body${richTextQuery},
    button${buttonQuery},
    image${imageQuery},
    imageSide,
    imageSizing,
    selectedLayout,
    sectionStyles${sectionStylesQuery},
  },
  _type == 'imageCarousel' => {
    ...,
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    ${anchorTagQuery},
    images[]${imageQuery},
    sectionStyles${sectionStylesQuery},
  },
  _type == 'logoGrid' => {
    ...,
    hideSection,
    ${anchorTagQuery},
    gridLayout[] {
      _key,
      'image':${imageQuery},
    },
    sectionStyles${sectionStylesQuery},
  },
  // No spread: this section stores the Mailchimp API key, which must not be
  // sent to the browser (the subscribe route reads it server side)
  _type == 'newsletterForm' => {
    _key,
    name,
    formName,
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    backgroundImage${simpleImageQuery},
    title,
    body${richTextQuery},
    ${anchorTagQuery},
    onFormSubmitLink->{
      slug,
    },
    sectionStyles${sectionStylesQuery},
  },
  _type == 'popUp' => {
    ...,
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    delayTime,
    body${richTextQuery},
    sectionStyles${sectionStylesQuery},
  },
  _type == 'richTextSection' => {
    ...,
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    ${anchorTagQuery},
    body${richTextQuery},
    sectionStyles${sectionStylesQuery},
  },
  _type == 'scrollingText' => {
    ...,
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    ${anchorTagQuery},
    direction,
    textItems[]{
      text,
      icon${imageQuery},
    },
    sectionStyles${sectionStylesQuery},
  },
  _type == 'tabbedSection' => {
    ...,
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    ${anchorTagQuery},
    tabSections[]{
      title,
      subtitle${richTextQuery},
      body${richTextQuery},
      image${imageQuery},
    },
    sectionStyles${sectionStylesQuery},
  },
  _type == 'teamGrid' => {
    ...,
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    ${anchorTagQuery},
    // this is how to query the grid layout 
    // to get the _key for an array PLUS get
    // the teamMember reference
    gridLayout[]{
      _key, 
      "teamMember": @->{ 
        _id,
        personName,
        position,
        slug,
        image${imageFieldQuery},
      },
    },
    sectionStyles${sectionStylesQuery},
  },
  _type == 'textAccordion' => {
    _key,
    ${anchorTagQuery},
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    title,
    selectedLayout,
    subtitle${richTextQuery},
    accordionItems[]{
      ...,
      body${richTextQuery},
    },
    button${buttonQuery},
    faq,

    sectionStyles${sectionStylesQuery},
  },

  _type == 'textSection' => {
    ...,
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    ${anchorTagQuery},
    body${richTextQuery},
    subtitle${richTextQuery},

    column2Body${richTextQuery},
    column2Subtitle${richTextQuery},

    column3Subtitle${richTextQuery},
    column3Body${richTextQuery},
    button${buttonQuery},
    column2Button${buttonQuery},
    column3Button${buttonQuery},

    sectionStyles${sectionStylesQuery},
  },
  _type == 'videoMux' => {
    ...,
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    ${anchorTagQuery},
    video {
      asset-> {
        playbackId,
        assetId,
        filename,
        "staticRenditions": data.static_renditions,
        thumbTime,
      },
    },
    muxOptions {
      autoplay,
      loop,
      downloadable,
      hideControls,
    },
    sectionStyles${sectionStylesQuery},
  },
  _type == 'videoVimeo' => {
    ...,
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    ${anchorTagQuery},
    subtitle${richTextQuery},
    button${buttonQuery},
    videoThumbnail${simpleImageQuery},
    sectionStyles${sectionStylesQuery},
  },
  _type == 'videoYouTube' => {
    ...,
    hideSection,
    expirationDate,
    scheduledReleaseDate,
    ${anchorTagQuery},
    youtubeUrl,
    videoThumbnail${simpleImageQuery},
    sectionStyles${sectionStylesQuery},
  },
}
`);

export const HOME_PAGE_QUERY = defineQuery(`*[_type == "homePage"][0]{
    navigationName,
    metaTitle,
    metaDescription,
    metaImage,
    pageLayout[]${pageLayoutQuery},
    _id,
    _type,
    "footerSocialLinks": *[_type == 'footer'][0].socialIcons[].link,
  }
`);

export const HOME_PAGE_META_QUERY = defineQuery(`*[_type == "homePage"][0]{
    navigationName,
    metaTitle,
    metaDescription,
    metaImage,
  }
`);

export const PAGES_QUERY = defineQuery(`
  *[(_type == "page") && defined(slug.current)] | order(_createdAt desc)
`);

export const PAGE_BY_SLUG_QUERY =
  defineQuery(`*[(_type == "page") && slug.current == $slug][0]{
    navigationName,
    slug,
    metaTitle,
    metaDescription,
    metaImage,
    pageLayout[]${pageLayoutQuery},
    passwordProtected,
    _id,
    _type,
  }
`);

export const PAGE_BY_SLUG_META_QUERY =
  defineQuery(`*[(_type == "page") && slug.current == $slug][0]{
    navigationName,
    slug,
    metaTitle,
    metaDescription,
    metaImage,
    noindex,
  }
`);

// ===============================================================
// BLOG QUERIES
// ===============================================================

export const BLOGPOST_QUERY =
  defineQuery(`*[_type == "blogPost" && slug.current == $slug][0]{
  title,
  thumbnailImage${simpleImageQuery},
  heroImage${simpleImageQuery},
  slug,
  pageLayout[]${pageLayoutQuery},
  datePublished,
  author->{
    name,
    image${simpleImageQuery},
  },
  tags[]->{
    tagName,
  },
  metaDescription,
  _id,
  _type,
}`);

export const BLOGPOST_META_QUERY =
  defineQuery(`*[_type == "blogPost" && slug.current == $slug][0]{
  title,
  slug,
  metaTitle,
  metaDescription,
  heroImage,
  metaImage,
  metaImageType,
}`);

// ===============================================================
// EVENT QUERIES
// ===============================================================

export const EVENT_QUERY =
  defineQuery(`*[_type == "event" && slug.current == $slug][0]{
  title,
  slug,
  pageLayout[]${pageLayoutQuery},
  heroImage${simpleImageQuery},
  eventDateTime,
  allDay,
  duration,
  location,
  locationUrl,
  eventDescription,
  _id,
  _type,
}`);

export const EVENT_META_QUERY =
  defineQuery(`*[_type == "event" && slug.current == $slug][0]{
  title,
  heroImage,
  slug,
  eventDescription,
}`);

// ===============================================================
// TEAM MEMBER QUERIES
// ===============================================================

export const TEAM_MEMBER_QUERY =
  defineQuery(`*[_type == "teamMember" && slug.current == $slug][0]{
  ...,
  personName,
  position,
  image${imageFieldQuery},
  bio${richTextQuery},
  socialIcons[]{
    ...,
  },
}`);

export const TEAM_MEMBER_META_QUERY =
  defineQuery(`*[_type == "teamMember" && slug.current == $slug][0]{
  personName,
  slug,
  image,
}`);

export const ERROR_PAGE_QUERY = defineQuery(`*[_type == "pageNotFound"][0]{
    ...,
    title,
    body${richTextQuery},
  }
`);

//
// HEADER QUERIES
//

export const HEADER_QUERY = defineQuery(`
  *[_type == 'header'][0] {
    ...,
    logo{
      alt,
      ${imageAssetQuery}
    },
    headerBanner->{
      links[]${linkQuery},
    },
    pageLayout[]{
      _type,
      _type == 'reference' => @->{
        _type,
        _type == 'page' => {
          navigationName, 
          slug, 
        },
      },
      _type == 'link' => ${linkQuery},
      _type == 'headerDropdown' => {
        ...,
        links[]{
          _type == 'reference' => @->{
            _type,
            navigationName,
            slug,
          },
          _type == 'link' => ${linkQuery},
        },
      },
    },
    button${buttonQuery},
  }
`);

//
// FOOTER QUERIES
//

export const FOOTER_QUERY = defineQuery(`
  *[_type == 'footer'][0] {
    ...,
    logo{
      alt,
      ${imageAssetQuery}
    },
    socialIcons[]{
      ...,
    },
    pageLayout[]{
      _type == 'reference' => @->{
        _type,
        navigationName,
        slug,
      },
      _type == 'link' => ${linkQuery},
    },
  }
`);

//
// SITEMAP QUERY
//
// TODO: Update this if new page types are added that need to be indexed
export const sitemapQuery = defineQuery(`
  *[
    _type == "homePage" ||
    ((_type == "page" || _type == "blogPost" || _type == "teamMember" || _type == "event") && defined(slug.current))
  ] | order(select(_type == "homePage" => 0, 1), slug.current asc){
    "slug": select(_type == "homePage" => "", slug.current),
    _type,
    _updatedAt
  }
`);

//
// COOKIE QUERY
//
export const COOKIE_QUERY = defineQuery(`*[_type == 'cookiePopUp'][0]{
    ...,
    body${richTextQuery},
  }
`);

//
// BREADCRUMB QUERY
//
export const BREADCRUMB_QUERY = defineQuery(`*[_type == 'breadcrumbs'][0]{
    addBreadcrumbs,
    backgroundColor,
    textColor,
  }
`);

//
// LAYOUT SETTINGS QUERY - Combined cookie and breadcrumb data
//
export const LAYOUT_SETTINGS_QUERY = defineQuery(`{
  "cookieData": *[_type == 'cookiePopUp'][0]{
    ...,
    body${richTextQuery},
  },
  "breadcrumbData": *[_type == 'breadcrumbs'][0]{
    addBreadcrumbs,
    backgroundColor,
    textColor,
  },
  "analyticsData": *[_type == 'googleAnalytics'][0]{
    gaId,
    gtmId,
  },
  "googleTranslateData": *[_type == 'googleTranslate'][0]{
    enabled,
    languages,
  }
}`);

//
// QUERY TS INTERFACES - Use types from sanity.types.ts
//
// PageResult is a custom wrapper type for the combined query result
export interface PageResult {
  page: Page;
  header: Header;
  footer: Footer;
  cookiePopUp: CookiePopUp;
}

//
// PASSWORD VERIFICATION QUERY (SERVER-SIDE ONLY)
//
export const PAGE_PASSWORD_QUERY =
  defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  passwordProtected,
  password
}`);
