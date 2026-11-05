import { COLORS, defaultButtonColorOptions } from "../constants/colors";
import ColorSelector from "../../sanity/components/ColorSelector";
import { SanityGroupHeading } from "../../sanity/components/SanityGroupHeading";

// ============================================================ COLOR OPTIONS

export const buttonColorOptions = (componentDefault: string) => {
  return [
    {
      name: "buttonColor",
      group: "content",
      type: "string",
      options: { list: defaultButtonColorOptions },
      components: { input: ColorSelector },
      // TODO: UPDATE INITIAL VALUE
      initialValue: !!componentDefault ? componentDefault : COLORS.BLACK.VALUE,
    },
  ];
};

// ============================================================ GROUP HEADING
export const GroupHeading = (heading: string, group: string) => {
  const name =
    heading.replace(/\s/g, "").charAt(0).toLowerCase() +
    heading.replace(/\s/g, "").slice(1);

  return {
    name: name,
    title: " ",
    type: "string",
    group: group,
    placeholder: heading,
    components: { input: SanityGroupHeading },
  };
};

// ============================================================ ADVANCED OPTIONS

export const advancedGroupOptions = ({ hasExpirationDate = true } = {}) => {
  const groupAdvanced = {
    name: "groupAdvanced",
    title: " ",
    type: "string",
    group: "advanced",
    placeholder: "Advanced Options",
    components: { input: SanityGroupHeading },
  };

  const anchorTagLink = {
    name: "anchorTagLink",
    title: "Anchor Tag",
    type: "reference",
    to: [{ type: "anchorTagLink" }],
    group: "advanced",
    initialValue: "",
    description: `The anchor tag can be used in a link or a button to link directly to a section of a page. 
    It must be unique and must not contain any spaces.
    Ex: "open-positions" or "who-we-are"`,
  };

  const hideSection = {
    name: "hideSection",
    type: "boolean",
    group: "advanced",
    title: "Hide Section",
    description:
      "This will hide the section from the front end. It will still be accessible in the CMS Structure.",
    initialValue: false,
  };

  const expirationDate = {
    name: "expirationDate",
    type: "datetime",
    group: "advanced",
    title: "Expiration Date",
    description:
      "The section will be hidden on the front end after this date. It will still be accessible in the CMS Structure.",
  };

  const scheduledRelease = {
    name: "scheduledReleaseDate",
    type: "datetime",
    group: "advanced",
    title: "Scheduled Release Date",
    description:
      "The section will be published on the front end after this date.",
  };

  if (hasExpirationDate) {
    return [
      groupAdvanced,
      anchorTagLink,
      hideSection,
      scheduledRelease,
      expirationDate,
    ];
  } else return [groupAdvanced, anchorTagLink, hideSection, scheduledRelease];
};
