import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "h8jbyz2f",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});