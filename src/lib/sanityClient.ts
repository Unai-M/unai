import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "3s377s3v",
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-10-06",
});
