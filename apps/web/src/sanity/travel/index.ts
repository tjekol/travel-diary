import { groq } from 'next-sanity';
import { ITravel } from './schemas';

export async function getTravels(): Promise<ITravel[]> {
  try {
    const { client } = await import('@/sanity/client');
    const query = groq`*[_type == 'travel'] | order(publishedAt desc) {
      _id,
      title,
      slug,
    }`
    return client.fetch(query);
  }
  catch (error) {
    console.error('Error fetching data ' + error);
    throw error;
  }
}
