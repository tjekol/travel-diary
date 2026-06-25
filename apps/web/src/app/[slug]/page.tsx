'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { getPosts } from '@/sanity/post';
import { IPost } from '@/sanity/post/schemas';
import { getTravels } from '@/sanity/travel';
import { ITravel } from '@/sanity/travel/schemas';
import { Skeleton } from '@heroui/react/skeleton';
import Image from 'next/image';
import { use, useState } from 'react';
import { useEffect } from 'react';
import { PulseLoader } from 'react-spinners';

export default function TravelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [travel, setTravel] = useState<ITravel>();

  const [loadingImages, setLoadingImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const travels = await getTravels();
        const travel = travels.find((travel) => travel.slug.current === slug);
        setTravel(travel);

        if (travel) {
          localStorage.setItem('activePage', travel.slug.current);

          const posts = await getPosts();
          const filteredPosts = posts.filter(
            (post) => post.travelRef === travel._id,
          );
          setPosts(filteredPosts);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [slug]);

  const handleImageLoad = (postId: string) => {
    setLoadingImages((prevLoadingImages) =>
      prevLoadingImages.filter((id) => id !== postId),
    );
  };

  if (loading) {
    return (
      <main className='flex min-h-screen w-full flex-col justify-between py-12'>
        <Header />
        <div className='bg-secondary/60 w-full grow rounded-sm p-8'>
          <div className='mx-auto grid w-full grid-cols-2 gap-3 overflow-hidden sm:gap-4 lg:w-5/6 lg:grid-cols-4'>
            <Skeleton
              className='aspect-square rounded-sm object-cover p-1 sm:p-2'
              animationType='pulse'
            />
            <Skeleton
              className='aspect-square rounded-sm object-cover p-1 sm:p-2'
              animationType='pulse'
            />
            <Skeleton
              className='aspect-square rounded-sm object-cover p-1 sm:p-2'
              animationType='pulse'
            />
            <Skeleton
              className='aspect-square rounded-sm object-cover p-1 sm:p-2'
              animationType='pulse'
            />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='flex min-h-screen flex-col justify-between p-6 sm:p-12'>
      <div>
        <Header />
        {posts.length < 1 ? (
          <div className='w-full justify-items-center self-center text-center lg:w-5/6'>
            Ingen innlegg…
          </div>
        ) : (
          <div className='mx-auto grid w-full grid-cols-2 justify-items-center gap-3 sm:gap-4 lg:w-5/6 lg:grid-cols-4'>
            {posts.map((post) => (
              <div
                key={post._id}
                className='bg-primary/70 rounded-sm p-1 hover:scale-105 sm:p-2'
              >
                {loadingImages.includes(post._id) && <PulseLoader size={10} />}
                <a href={'post/' + post.slug.current}>
                  <Image
                    className='aspect-square object-cover'
                    onLoad={() => handleImageLoad(post._id)}
                    placeholder='empty'
                    loading='lazy'
                    src={post.mainImage}
                    alt={post.title}
                    width={400}
                    height={400}
                  />
                  <p className='text-text'>{post.title}</p>
                  <p className='text-accent font-light'>{post.publishedAt}</p>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
