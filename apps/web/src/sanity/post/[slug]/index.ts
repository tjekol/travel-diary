import { IPost } from '../schemas';
import { groq } from 'next-sanity';

export async function getData(slug: string): Promise<IPost> {
  try {
    const { client } = await import('@/sanity/client');
    const query = groq`*[_type == "post" && slug.current == "${slug}"][0] {
      _id,
      title,
      slug,
      publishedAt,
      "mainImage": mainImage.asset -> url,
      description,
      "pictures": description[].asset -> url,
    }`;
    return client.fetch(query);
  }
  catch (error) {
    console.error('Error fetching data ' + error);
    throw error;
  }
}