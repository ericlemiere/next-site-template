import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export { viewport } from "next-sanity/studio";

export default function Studio() {
  return <NextStudio config={config} />;
}
