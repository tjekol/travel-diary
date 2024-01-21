'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { getPost } from '@/sanity/post/[slug]';
import { IPost } from '@/sanity/post/schemas';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function SlugPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await getPost(params.slug);
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.slug]);

  if (loading) {
    return (
      <main className='flex min-h-screen w-full flex-col justify-between py-12'>
        <Header />
        <div className='w-full grow rounded-sm bg-secondary/60 p-8'>
          <div className='text-center'>Laster...</div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className='flex min-h-screen w-full flex-col justify-between sm:py-12'>
        <Header />
        <div className='w-full grow rounded-sm bg-secondary/60 p-8'>
          <div className='text-center'>Kunne ikke hente data.</div>
        </div>
      </main>
    );
  }

  return (
    <main className='flex min-h-screen flex-col justify-between py-6 sm:py-12'>
      <Header />
      <div className='w-full grow rounded-sm bg-secondary/60 p-8'>
        <div className='flex flex-col md:flex-row md:items-end md:justify-center md:space-x-8'>
          <h1 className='text-center font-semibold'>{post.title}</h1>
          <h2 className='text-center text-accent'>{post.publishedAt}</h2>
        </div>
        <div className='my-8 flex flex-col items-center space-y-4 px-2 md:flex-row md:justify-center md:space-x-6 md:px-10'>
          <a href={post.mainImage}>
            <Image
              src={post.mainImage}
              alt={post.title}
              width={300}
              height={100}
              sizes='50vh'
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </a>
          <div className='self-center md:w-2/5 md:self-start'>
            <PortableText value={post.description} />
          </div>
        </div>
        <div className='w-full columns-2 gap-x-4 md:mx-15 md:columns-4 2xl:columns-xs'>
          {post.pictureUrls.map(
            (pictureUrl, index) =>
              pictureUrl !== null && (
                <a key={index} href={pictureUrl}>
                  <Image
                    className='aspect-image w-full py-2'
                    src={pictureUrl}
                    alt='title'
                    key={index}
                    width={260}
                    height={100}
                    sizes='50vh'
                  />
                </a>
              ),
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
