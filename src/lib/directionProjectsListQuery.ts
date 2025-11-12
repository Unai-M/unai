import { client } from "./sanityClient";
import { defineQuery } from "groq";

const directionProjectsListQuery =
  defineQuery(`*[_type == "directionProject"] | order(date desc){
  _id,
  title,
  slug,
  date,
  previewId,
  isHighlighted,
  projectType -> {en, es},
  previewImage { "url": asset->url },
}`);

export async function getDirectionProjectsList() {
  return client.fetch(directionProjectsListQuery);
}
