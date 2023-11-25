import { createClient } from 'next-sanity';

const projectId = 'j2fw0bwa';
const dataset = 'production';
const apiVersion = 'v2023-11-25';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true
});
