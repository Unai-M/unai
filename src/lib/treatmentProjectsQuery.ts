import { client } from "./sanityClient";
import { defineQuery } from "groq";

const treatmentProjectsQuery = defineQuery(`*[_type == "treatmentProject"] {
  _id,
  title,
  slug,
  date,
  description,
}`);

export async function getTreatmentProjects() {
  return client.fetch(treatmentProjectsQuery);
}
