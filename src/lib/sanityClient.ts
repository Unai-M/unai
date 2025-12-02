import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "3s377s3v",
  dataset: "production",
  useCdn: true,
  apiVersion: "2025-10-06",
});
