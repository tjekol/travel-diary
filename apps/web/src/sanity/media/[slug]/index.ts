import { IMedia } from '../schemas';
import { groq } from 'next-sanity';

export async function getMedia(ref: string) : Promise<IMedia> {
  try {
    const { client } = await import('@/sanity/client');
    const query = groq`*[_type == "post"][0] {
      "slug": description[asset._ref == '${ref}'][0].asset -> url,
      "ref": description[asset._ref == '${ref}'][0].asset._ref,
    }`;
    return client.fetch(query);
  }
  catch (error) {
    console.error('Error fetching data ' + error);
    throw error;
  }
}


