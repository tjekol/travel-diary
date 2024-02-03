'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { getPosts } from '@/sanity/post';
import { IPost } from '@/sanity/post/schemas';
import Image from 'next/image';
import { useState } from 'react';
import { useEffect } from 'react';
import { PulseLoader } from 'react-spinners';

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loadingImages, setLoadingImages] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        setPosts(posts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [posts]);

  const handleImageLoad = (postId: string) => {
    setLoadingImages((prevLoadingImages) =>
      prevLoadingImages.filter((id) => id !== postId)
    );
  };

  return (
    <main className='flex min-h-screen flex-col justify-between p-6 sm:p-12'>
      <Header />
      {posts.length < 1 ? (
        <div className='w-full md:w-5/6 self-center justify-items-cente text-center'>
          Ingen innlegg enda…
        </div>
      ) : (
        <div className='w-full md:w-5/6 self-center justify-items-center grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4'>
          {posts.map((post) => (
            <div key={post._id} className='hover:scale-105 bg-primary/70 p-1 sm:p-2 rounded-sm'>
              {loadingImages.includes(post._id) && (
                <PulseLoader size={10} />
              )}
              <a href={'post/' + post.slug.current}>
              <Image className='aspect-square object-cover' onLoad={() => handleImageLoad(post._id)} placeholder='empty' loading='lazy' src={post.mainImage} alt={post.title} width={400} height={400} />
              <p className='text-text'>{post.title}</p>
              <p className='text-accent font-light'>{post.publishedAt}</p>
              </a>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </main>
  );
}
