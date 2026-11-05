import slugify from "slugify";
import { defineField } from "@sanity/types";
import { isUniqueAcrossAllDocuments } from "./isUniqueAcrossAllDocuments";

/**
 * Concatenates a list of URL parts, ensuring that there is only one slash
 * between each part.
 *
 * @param {...string} parts
 * @returns {string} The joined URL
 */
export const urlJoin = (...parts) =>
  parts.reduce((result, part) => {
    if (!part) return result;

    const trailingSlashPresent = result.endsWith("/");
    const preceedingSlashPresent = part.startsWith("/");

    return trailingSlashPresent !== preceedingSlashPresent
      ? result + part
      : trailingSlashPresent && preceedingSlashPresent
        ? result + part.substring(1)
        : result + "/" + part;
  }, "" + parts.shift());

/**
 * Create a url-friendly slug with a limited character set.
 *
 * @param {string} input
 */
export const createSlug = (input) =>
  slugify(input, { lower: true, remove: /[^a-zA-Z0-9 -]/g });

export const slugField = defineField({
  title: "Slug",
  name: "slug",
  type: "slug",
  validation: (Rule) =>
    Rule.custom(
      ({ current: slug } = {}) => validateFormat(slug) || "Invalid formatting"
    ),
  options: {
    slugify: (source) => urlJoin("/", createSlug(source)),
    isUnique: isUniqueAcrossAllDocuments,
  },
  description:
    "The `slug` becomes the path of the published page on the website. It will be appended to the domain name automatically.",
});

/**
 * Generate a slug-type Sanity field with validation
 *
 * @param {object} options
 * @param {string} options.source - Name of the document field to use as a source for the slug generator
 * @param {string} [options.prefix] - Require the slug to begin with a specific path
 * @param {string} [options.name] - Name of the slug field
 * @param {string} [options.title] - Title of the slug field
 * @param {function} [options.slugify] - Slugging function
 * @param {function} [options.validation] - Validation function
 * @returns {object} Sanity field definition
 */
export const createSlugField = ({ prefix, validation, ...options }) => {
  prefix = urlJoin("/", prefix);

  return defineField({
    ...slugField,
    options: {
      ...slugField.options,

      slugify: (source) => urlJoin(prefix, createSlug(source)),

      ...options,
    },
    validation: (Rule) =>
      [
        Rule.required().custom(({ current: value } = {}) => {
          if (!value) return "Slug is required";
          if (!validateFormat(value)) return "Invalid formatting.";
          if (!value.startsWith(prefix))
            return `This document type must be under ${prefix}`;

          return true;
        }),
        validation && validation(Rule),
      ].filter(Boolean),
  });
};

const validateFormat = (slug) => {
  if (!slug) return false;
  if (slug.includes("//")) return false; // Check for consecutive slashes

  switch (slug.length) {
    case 1:
      return slug === "/";

    case 2:
      return /\/[a-z]/.test(slug);

    case 3:
      return /\/[a-z0-9]/.test(slug);

    default:
      return /^\/([a-z0-9][a-z0-9/-]*[a-z0-9]|404)$/.test(slug);
  }
};
