import { client } from "./sanityClient";
import { defineQuery } from "groq";

const directionProjectsQuery =
  defineQuery(`*[_type == "directionProject"] | order(date desc){
  _id,
  title,
  slug,
  date,
  description,
  vimeoId,
  projectType -> {en, es},
  previewImage { "url": asset->url },
}`);

export async function getDirectionProjects() {
  return client.fetch(directionProjectsQuery);
}
