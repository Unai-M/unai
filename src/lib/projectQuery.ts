import { client } from "./sanityClient";
import { defineQuery } from "groq";

const projectQuery = defineQuery(
  `*[_type == "directionProject" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  date,
  description,
  vimeoId,
  previewId,
  projectType -> {en, es},
  credits,
  images[]{
    _key, 
    asset,
    "dimensions": asset->metadata.dimensions,
  },
}`,
);

export async function getProject(slug: string) {
  return client.fetch(projectQuery, { slug });
}
