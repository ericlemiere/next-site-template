import { createClient } from "next-sanity";
import { token } from "./token";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: token,
  stega: { studioUrl: "/admin" },
});
