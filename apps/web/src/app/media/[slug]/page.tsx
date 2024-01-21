'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { getMedia } from '@/sanity/media/[slug]';
import { IMedia } from '@/sanity/media/schemas';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function SlugMedia({ params }: { params: { slug: string } }) {
  const [media, setMedia] = useState<IMedia | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const mediaData = await getMedia(params.slug);
        setMedia(mediaData);
      } catch (error) {
        console.error('Error fetching media data:', error);
      }
    };

    fetchMedia();
  }, [params]);

  if (!media) {
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
      <div className='w-1/2 h-1/2'>
        <Image
          className='aspect-image w-full'
          src={media.slug}
          alt={media.ref}
          width={300}
          height={300}
          sizes='100vh'
        />
      </div>
      <Footer />
    </main>
  );
}
