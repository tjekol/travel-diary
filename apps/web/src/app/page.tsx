'use client';

import Header from '@/components/header';
import { getPosts } from '@/sanity/post';
import { IPost } from '@/sanity/post/schemas';
import Image from 'next/image';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setPosts(posts);
    };
    fetchPosts();
  }, [posts]);

  return (
    <main className='flex min-h-screen flex-col justify-between p-6 sm:p-12'>
      <Header />
      <div className='w-full md:w-5/6 self-center justify-items-center grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4'>
        {posts.map((post) => (
          <div key={post._id} className='hover:scale-105 bg-primary/70 p-1 sm:p-2 rounded-sm'>
            <a href={'post/' + post.slug.current}>
              <Image className='aspect-square object-cover' src={post.mainImage} alt={post.title} width={400} height={400} />
              <p className='text-text'>{post.title}</p>
              <p className='text-accent font-light'>{post.publishedAt}</p>
            </a>
          </div>
        ))}
      </div>
      <a href='https://github.com/tjekol/melbourne' target='_' className='static hover:underline self-center bottom-2 text-text/50 mt-8'>Thea Jenny E. Kolnes🦋</a>
    </main>
  );
}
