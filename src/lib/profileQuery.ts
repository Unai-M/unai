import { client } from "./sanityClient";
import { defineQuery } from "groq";

const profileQuery = defineQuery(`*[_type == "profile"][0] {
  name,
  manifesto,
  image,
  about
}`);

export async function getProfile() {
  return client.fetch(profileQuery);
}
