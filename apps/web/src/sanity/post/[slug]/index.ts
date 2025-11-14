import { IPost } from '../schemas';
import { groq } from 'next-sanity';

export async function getPost(slug: string): Promise<IPost> {
  try {
    const { client } = await import('@/sanity/client');
    // coalesce(field, fallback field)
    const query = groq`*[_type == "post" && slug.current == "${slug}"][0] {
      _id,
      title,
      slug,
      publishedAt,
      "mainImage": mainImage.asset -> url,
      description,
      "imageURLs": coalesce(images[].asset -> url,  pictures[].asset -> url),
      "travelRef": travel._ref,
    }`;
    return client.fetch(query);
  }
  catch (error) {
    console.error('Error fetching data ' + error);
    throw error;
  }
}
