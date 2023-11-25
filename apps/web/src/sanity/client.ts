import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const dataset = 'production';
const apiVersion = 'v2023-11-25';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true
});
