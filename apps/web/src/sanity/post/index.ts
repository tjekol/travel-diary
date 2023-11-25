import { groq } from 'next-sanity';
import { IPost } from './schemas';

export async function getPosts() : Promise<IPost[]> {
  try {
    const { client } = await import('@/sanity/client');
    return client.fetch(
      groq`*[_type == 'post'] | order(publishedAt) {
        _id,
        title,
        slug,
        publishedAt,
        "mainImage": mainImage.asset -> url,
        description,
      }`
    );
  }
  catch (error) {
    console.error('Error fetching data ' + error);
    throw error;
  }
}
