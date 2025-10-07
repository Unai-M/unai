import { client } from "./sanityClient";
import { defineQuery } from "groq";

const directionProjectsQuery = defineQuery(`*[_type == "directionProject"] {
  _id,
  title,
  slug,
  date,
  description,
  vimeoId,
  projectType
}`);

export async function getDirectionProjects() {
  return client.fetch(directionProjectsQuery);
}
