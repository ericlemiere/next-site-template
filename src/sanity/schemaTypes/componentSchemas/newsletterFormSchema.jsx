//import { LuNewspaper } from "react-icons/lu";
import { FaMailchimp } from "react-icons/fa";

import {
  advancedGroupOptions,
  GroupHeading,
} from "../../../utils/helpers/sanity-helpers";
import { richTextOptions } from "../../../utils/helpers/richTextOptions";
import { COLORS } from "../../../utils/constants/colors";
import { schemaGroup } from "../../../utils/constants/schema";

const MailchimpLogo = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "1em",
      height: "1em",
      transform: 'scale(1.8)',
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Mailchimp"
      role="img"
      viewBox="0 0 512 512"
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <rect rx="15%" width="512" height="512" fill="#fd2" />
      <path
        fill="#222"
        d="M418 306l-6-17s25-38-37-51c0 0 4-47-18-69 48-47 37-118-72-72-56-107-272 144-182 184-9 12-9 72 53 78 42 90 144 96 203 69s93-113 59-122zm-263 40c-51-5-56-75-12-82s55 86 12 82zm-15-95c-14 0-31 19-31 19-68-33 123-252 164-167 0 0-100 48-133 148zm200 85c0-4-21 6-59-7 3-21 48 18 123-33l6 21c28-5 0 90-90 89-73-1-96-76-56-117 8-8-29-24-22-59 3-15 16-37 49-31s40-24 62-13 9 53 12 59 35 7 41 24-41 54-114 44c-17-2-27 20-16 34 22 32 112 11 127-20-38 29-116 40-122 9 22 10 59 4 59 0zm-131-158c22-27 51-43 51-43l-6 15s21-16 44-16l-8 8c26 1 37 11 37 11s-61-18-118 25zm135 39c13-1 9 29 9 29h-8s-14-28-1-29zm-59 33c-9 1-19 6-18 2 4-16 41-12 40 2s-9-6-22-4zm21 12c1 2-7 0-13 1s-12 4-12 2 23-11 25-3zm20 3c3-6 15 0 12 6s-15 0-12-6zm25 2c-6 0-6-13 0-13s6 14 0 14zm-180 53c3 3-6 9-13 4s8-29-10-35-13 17-18 14 7-35 28-22-6 33 6 39 5-2 7 0z"
      />
    </svg>
  </div>
);

const newsletterFormSchema = {
  name: "newsletterForm",
  type: "object",
  title: "Newsletter Signup Mailchimp Plugin",
  icon: MailchimpLogo,
  groups: [{ name: "api", title: "API", icon: FaMailchimp }, ...schemaGroup],

  fields: [
    // ========================================= API
    GroupHeading("Mailchimp API", "api"),
    {
      name: "mailchimpApiKey",
      type: "string",
      title: "Mailchimp API Key",
      group: "api",
      description: (
        <>
          Enter your Mailchimp API key here. Get your API key from:{" "}
          <a
            href="https://admin.mailchimp.com/account/api/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://admin.mailchimp.com/account/api/
          </a>
          <br />
          <br />
          Note: This is stored securely and only accessed server-side. It will
          never be exposed to the browser.
        </>
      ),
      validation: (Rule) => Rule.required(),
    },

    {
      name: "mailchimpAudienceId",
      type: "string",
      title: "Mailchimp Audience ID",
      group: "api",
      description: (
        <>
          Enter your Mailchimp Audience ID (also called List ID). Find it here:{" "}
          <a
            href="https://admin.mailchimp.com/lists/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://admin.mailchimp.com/lists/
          </a>
          <br />
          <br />
          Click on your audience, then go to Settings → Audience name and
          defaults to find the Audience ID.
        </>
      ),
      validation: (Rule) => Rule.required(),
    },

    // ========================================= CONTENT
    GroupHeading("Content", "content"),
    {
      name: "formName",
      type: "string",
      description:
        "This field is used for organization only and will not display on site. If left blank, the title will be used as the section name.",
      group: "content",
    },

    {
      name: "title",
      type: "string",
      group: "content",
    },

    {
      name: "body",
      type: "array",
      of: richTextOptions({ listsOn: false, socialIconsOn: true }),
      group: "content",
    },

    {
      name: "onFormSubmitLink",
      title: "Page Redirect After Submit (Optional)",
      type: "reference",
      group: "content",
      to: [{ type: "page" }, { type: "homePage" }],
      description: (
        <>
          Select or create a page to redirect to after successful form
          submission. We recommend using a dedicated "Thank You" page if you're
          tracking conversions with analytics.
          <br />
          <br />
          If left blank, users will see a success message on the same page
          instead of being redirected.
        </>
      ),
    },

    // ========================================= STYLES
    GroupHeading("Styles", "style"),

    {
      name: "backgroundImage",
      type: "imageSimple",
      group: "style",
      title: "Background Image",
      description: "Optional background image for the newsletter form section.",
    },

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
        textAlignment: "left",
        paddingTop: "default",
        paddingBottom: "default",
      },
    },

    // ========================================= LAYOUT
    //    GroupHeading("Layout", "layout"),

    // ========================================= ADVANCED
    ...advancedGroupOptions(),
  ],
  preview: {
    select: {
      name: "formName",
      title: "title",
      hideSection: "hideSection",
      scheduledReleaseDate: "scheduledReleaseDate",
    },
    prepare: (value) => {
      const { name, title, hideSection, scheduledReleaseDate } = value;
      const now = new Date();
      const isScheduled =
        scheduledReleaseDate && new Date(scheduledReleaseDate) > now;

      let displayTitle = name || title || "Mailchimp Newsletter Signup";
      if (isScheduled) {
        displayTitle = `*** SCHEDULED ${displayTitle} ***`;
      } else if (hideSection) {
        displayTitle = `*** HIDDEN ${displayTitle} ***`;
      }

      return {
        title: displayTitle,
        subtitle: "Mailchimp Newsletter Signup",
        media: MailchimpLogo,
      };
    },
  },
};

export default newsletterFormSchema;
