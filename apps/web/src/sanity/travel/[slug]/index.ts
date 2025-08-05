import { ITravel } from '../schemas';
import { groq } from 'next-sanity';

export async function getTravel(slug: string): Promise<ITravel> {
  try {
    const { client } = await import('@/sanity/client');
    const query = groq`*[_type == "travel" && slug.current == "${slug}"][0] {
      _id,
      title,
      slug,
    }`;
    return client.fetch(query);
  }
  catch (error) {
    console.error('Error fetching data ' + error);
    throw error;
  }
}
