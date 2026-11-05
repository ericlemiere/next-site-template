import {
  advancedGroupOptions,
  GroupHeading,
} from "../../../utils/helpers/sanity-helpers";
import { COLORS } from "../../../utils/constants/colors";
import { schemaGroup } from "../../../utils/constants/schema";
import { richTextOptions } from "@/utils/helpers/richTextOptions";

const FormspreeLogo = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "1em",
      height: "1em",
      transform: "scale(1.8)",
    }}
  >
    <svg
      role="img"
      viewBox="0 -3 24 30"
      xmlns="http://www.w3.org/2000/svg"
      id="Formspree--Streamline-Simple-Icons"
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <path
        d="M1.333 2a2 2 0 0 1 2 -2h17.334a2 2 0 0 1 2 2v2.857a2 2 0 0 1 -2 2H3.333a2 2 0 0 1 -2 -2zm0 8.571a2 2 0 0 1 2 -2h17.334a2 2 0 0 1 2 2v2.858a2 2 0 0 1 -2 2H3.333a2 2 0 0 1 -2 -2zm2 6.572a2 2 0 0 0 -2 2V22a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2v-2.857a2 2 0 0 0 -2 -2z"
        fill="#ff002b"
        strokeWidth="1"
      ></path>
    </svg>
  </div>
);

const contactFormSchema = {
  name: "contactForm",
  type: "object",
  title: "Contact Form Formspree.io Plugin",
  icon: FormspreeLogo,
  groups: schemaGroup,

  fields: [
    // ========================================= CONTENT
    GroupHeading("Content", "content"),
    {
      name: "name",
      type: "string",
      title: "Section Name",
      description:
        "This field is used for organization only and will not display on site. If left blank, the title will be used as the section name.",
      group: "content",
    },
    {
      name: "title",
      type: "string",
      group: "content",
      description:
        "This can be left blank if the title does not need to be displayed.",
    },
    {
      name: "body",
      type: "array",
      group: "content",
      of: richTextOptions({ textColorOn: true }),
    },
    {
      name: "socialIcons",
      type: "array",
      of: [{ type: "socialMediaIcons" }],
    },

    {
      name: "formSpreeEndpoint",
      type: "string",
      title: "Formspree Endpoint URL",
      group: "content",
      description:
        "Enter your Formspree endpoint URL here to connect the contact form to Formspree for handling submissions. You can obtain this URL from your Formspree account. Ex: https://formspree.io/f/#########",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "contactFields",
      type: "array",
      title: "Contact Fields",
      group: "content",
      of: [{ type: "contactFormField" }],
      initialValue: [
        {
          _type: "contactFormField",
          label: "Name",
          fieldType: "text",
          isRequired: true,
        },
        {
          _type: "contactFormField",
          label: "Email",
          fieldType: "email",
          isRequired: true,
        },
        {
          _type: "contactFormField",
          label: "Message",
          fieldType: "textarea",
          isRequired: true,
        },
      ],
    },

    {
      name: "onFormSubmitLink",
      type: "reference",
      title: "Page Link On Form Submit",
      group: "content",
      to: [{ type: "page" }],
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value) {
            return 'A "Thank You" page is strongly recommended';
          }
          return true;
        }).warning(),
      description:
        'Page to navigate to when the form is submitted. A "Thank You" page is recommended.',
    },

    // ========================================= STYLES
    GroupHeading("Styles", "style"),

    {
      name: "sectionStyles",
      title: "Section Styles",
      type: "sectionStyle",
      group: "style",
      options: {
        backgroundColor: COLORS.WHITE.VALUE,
        titleTextColor: COLORS.PRIMARY.VALUE,
        titleTextSize: "heading1",
        titleHeadingTag: "",
        bodyTextColor: COLORS.BLACK.VALUE,
        bodyTextSize: "body1",
        paddingTop: "default",
        paddingBottom: "default",
      },
    },

    // ========================================= ADVANCED
    ...advancedGroupOptions(),
  ],
  preview: {
    select: {
      name: "name",
      title: "title",
      hideSection: "hideSection",
      scheduledReleaseDate: "scheduledReleaseDate",
    },
    prepare: (value) => {
      const { title, name, hideSection, scheduledReleaseDate } = value;
      const now = new Date();
      const isScheduled =
        scheduledReleaseDate && new Date(scheduledReleaseDate) > now;

      let displayTitle = name || title || "Contact Form";
      if (isScheduled) {
        displayTitle = `*** SCHEDULED ${displayTitle} ***`;
      } else if (hideSection) {
        displayTitle = `*** HIDDEN ${displayTitle} ***`;
      }

      return {
        title: displayTitle,
        subtitle: "Formspree Contact Form",
        media: FormspreeLogo,
      };
    },
  },
};

export default contactFormSchema;
