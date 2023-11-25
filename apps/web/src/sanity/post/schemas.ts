import { PortableTextBlock } from 'sanity';

export type IPost = {
  _id: string;
  title: string;
  slug: string;
  mainImage: string;
  publishedAt: string;
  description: PortableTextBlock[];
}
