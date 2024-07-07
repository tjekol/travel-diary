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
      <div className='w-full grow justify-center space-y-4 rounded-sm bg-secondary/60 p-6 lg:p-8'>
        <div className='flex flex-col-reverse items-center space-y-4 px-2 lg:my-8 lg:flex-row lg:justify-center lg:space-x-6 lg:px-10'>
          <Image
            src={post.mainImage}
            alt={post.title}
            width={300}
            height={100}
            className='w-full lg:w-1/4'
          />
          <div className='space-y-4 self-center pb-6 lg:w-2/5 lg:max-w-[520px] lg:space-y-6 lg:self-start'>
            <div className='lg:space-y-2'>
              <h1 className='font-semibold'>{post.title}</h1>
              <h2 className='text-accent'>{post.publishedAt}</h2>
            </div>
            <PortableText value={post.description} />
          </div>
        </div>
        <div className='flex w-full justify-center'>
          <div className='px-30 w-full columns-2 gap-x-4 lg:w-3/4 lg:columns-4'>
            {post.pictureUrls.map(
              (pictureUrl, index) =>
                pictureUrl !== null && (
                  <Image
                    className='aspect-image w-full py-2'
                    src={pictureUrl}
                    alt='title'
                    key={index}
                    width={260}
                    height={100}
                    sizes='50vh'
                  />
                ),
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
