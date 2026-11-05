import { createSlugField } from "../../lib/createSlugField";
import { GroupHeading } from "../../../utils/helpers/sanity-helpers";
import { defineField } from "sanity";
import { pageLayoutField } from "../pageLayoutField";
import { SchemaIcon } from "@sanity/icons/Schema";
import { LockIcon } from "@sanity/icons/Lock";
import { GrDocument, GrDocumentLocked } from "react-icons/gr";
import { SANITY_COLORS } from "@/utils/constants/colors";
import OrangeWarningIcon from "../../components/OrangeWarningIcon";

const pageSchema = {
  name: "page",
  type: "document",
  title: "Page",
  icon: GrDocument,
  groups: [
    {
      name: "content",
      title: "Page Content",
      default: true,
      icon: GrDocument,
    },
    {
      name: "meta",
      title: "Meta Settings",
      icon: SchemaIcon,
    },
    {
      name: "privacy",
      title: "Privacy",
      icon: LockIcon,
    },
  ],
  fields: [
    GroupHeading("Content", "content"),

    defineField({
      name: "pageName",
      type: "string",
      title: "Page Name",
      description: "This field is for organization in Sanity.",
      group: "content",
    }),
    defineField({
      name: "navigationName",
      type: "string",
      title: "Navigation Name",
      description: "This is what will show up in the header/footer.",
      group: "content",
    }),
    {
      ...createSlugField({ source: "navigationName" }),
      group: "content",
    },

    pageLayoutField({ isPostPage: false }),

    //
    // SEO
    //
    GroupHeading("Meta Settings", "meta"),

    defineField({
      name: "metaTitle",
      type: "placeholderString",
      title: "Meta Title",
      group: "meta",
      description: (
        <div>
          <details>
            <summary>What is a Meta Title?</summary>
            <div>
              The Meta Title is the title that appears in search engine results
              and browser tabs. If left empty, the Navigation Name will be used
              (e.g., "About" or "Contact"). While this may suffice for simple
              pages, a more descriptive meta title can significantly improve SEO
              and click-through rates. For example, instead of just "About", you
              might use "About Our Company - Mission & Values" to provide more
              context to search engines and users. Consider adding a custom meta
              title when you want to include keywords, provide more detail, or
              make the page more appealing in search results. Ideally less than
              50 characters.
            </div>
          </details>
        </div>
      ),
      options: { field: "navigationName" },
      validation: (Rule) =>
        Rule.max(50).warning(
          "Longer titles may be truncated by search engines",
        ),
    }),

    defineField({
      name: "metaDescription",
      type: "string",
      title: "Meta Description",
      group: "meta",
      description: (
        <div>
          <div
            style={{
              margin: "8px 0px",
              border: `1px solid ${SANITY_COLORS.WARNING}`,
              padding: "2px 4px",
              borderRadius: "4px",
              width: "fit-content",
            }}
          >
            Recommended
          </div>
          <details>
            <summary>What is a Meta Description?</summary>
            <div>
              The Meta Description is a brief summary of the page content that
              appears below the title in search engine results. While it doesn't
              directly impact search rankings, it plays a crucial role in
              attracting clicks from search results by providing users with a
              preview of what they'll find on the page. A compelling meta
              description can significantly improve click-through rates. Ideally
              between 50 and 150 characters.
            </div>
          </details>
        </div>
      ),
      validation: (Rule) => [
        Rule.custom((value, context) => {
          // Skip length validation if page is hidden from search engines
          if (context.document?.noindex) {
            return true;
          }
          if (value && value.length > 150) {
            return "Longer descriptions may be truncated by search engines";
          }
          return true;
        }).warning(),
        Rule.custom((value, context) => {
          // Skip validation if page is hidden from search engines
          if (context.document?.noindex) {
            return true;
          }
          if (!value || value.trim() === "") {
            return "Meta description is recommended for better SEO and click-through rates";
          }
          return true;
        }).warning(),
      ],
    }),

    defineField({
      name: "metaImage",
      type: "image",
      group: "meta",
      description: (
        <div>
          <div
            style={{
              margin: "8px 0px",
              border: `1px solid ${SANITY_COLORS.WARNING}`,
              padding: "2px 4px",
              borderRadius: "4px",
              width: "fit-content",
            }}
          >
            Recommended
          </div>
          <details>
            <summary>What is a Meta Image?</summary>
            <div>
              The Meta Image (also known as OG Image or Social Share Image) is
              the image that appears when your page is shared on social media
              platforms like Facebook, Twitter, LinkedIn, or in messaging apps.
              Without a meta image, social platforms may display a random image
              from your page or no image at all, which can make your links less
              engaging. A well-chosen meta image can significantly increase
              click-through rates from social media by making your content more
              visually appealing and professional. Recommended size: 1200x630
              pixels.
            </div>
          </details>
        </div>
      ),
    }),

    defineField({
      name: "lighthouseCheck",
      type: "lighthouseButton",
      group: "meta",
    }),

    //
    // PRIVACY
    //
    GroupHeading("Privacy", "privacy"),

    defineField({
      name: "noindex",
      type: "boolean",
      title: "Hide from Search Engines (noindex)",
      description:
        "Prevent search engines from seeing this page. The page is still accessible via URL.",
      initialValue: false,
      group: "privacy",
    }),

    defineField({
      name: "passwordProtected",
      type: "boolean",
      title: "Password Protect This Page",
      group: "privacy",
      initialValue: false,
      description: "Enable password protection for this page",
      hidden: ({ document }) => document?.slug?.current === "/",
    }),

    defineField({
      name: "password",
      type: "string",
      title: "Password for This Page",
      group: "privacy",
      hidden: ({ document }) => !document?.passwordProtected,
      description:
        "Users with this password will have access to the page indefinetly, or until the password changes. If the password changes, users with previous access will lose access and need the new password.",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.passwordProtected && !value) {
            return "Password is required when password protection is enabled";
          }
          return true;
        }),
    }),
  ],

  preview: {
    select: {
      title: "pageName",
      navName: "navigationName",
      subtitle: "slug.current",
      passwordProtected: "passwordProtected",
      metaDescription: "metaDescription",
      noIndex: "noindex",
    },
    prepare: (value) => {
      const {
        title,
        navName,
        subtitle,
        passwordProtected,
        metaDescription,
        noIndex,
      } = value;

      const warning =
        !noIndex && (!metaDescription || metaDescription.trim() === "");

      const subtitleText =
        subtitle + (warning ? " (missing meta description)" : "");

      // Determine media icon priority: passwordProtected > warning > default
      let media = GrDocument;
      if (passwordProtected) {
        media = GrDocumentLocked;
      } else if (warning) {
        media = OrangeWarningIcon;
      }

      return {
        title: title || navName || "(untitled)",
        subtitle: subtitleText,
        media,
      };
    },
  },
};

export default pageSchema;
