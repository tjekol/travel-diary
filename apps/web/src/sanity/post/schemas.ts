import { PortableTextBlock } from 'sanity';

export type IPost = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage: string;
  publishedAt: string;
  description: PortableTextBlock[];
  pictures: PortableTextBlock[];
  pictureUrls: string[];
  pictureRefs: string[];
  travelRef: string;
}
