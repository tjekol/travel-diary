'use client';

import Header from '@/components/header';
import { getPosts } from '@/sanity/post';
import { IPost } from '@/sanity/post/schemas';
import Image from 'next/image';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Home() {
  const data = [
    { src: 'https://gratisography.com/wp-content/uploads/2023/10/gratisography-pumpkin-scarecrow-800x525.jpg', title: 'pumkin', date: '2023-02-01' },
    { src: 'https://gratisography.com/wp-content/uploads/2023/06/gratisography-kitten-plant-free-stock-photo-800x525.jpg', title: 'cat', date: '2023-04-11' },
    { src: 'https://gratisography.com/wp-content/uploads/2023/06/gratisography-toadstool-free-stock-photo-800x525.jpg', title: 'frog', date: '2023-10-10' },
    { src: 'https://gratisography.com/wp-content/uploads/2023/05/gratisography-blank-paper-free-stock-photo-800x525.jpg', title: 'paper', date: '2023-10-10' },
    { src: 'https://gratisography.com/wp-content/uploads/2023/05/gratisography-retro-pastime-free-stock-photo-800x525.jpg', title: 'tv', date: '2023-10-10' },
    { src: 'https://gratisography.com/wp-content/uploads/2023/05/gratisography-wedding-dog-free-stock-photo-800x525.jpg', title: 'balloons', date: '2023-10-10' },
    { src: 'https://gratisography.com/wp-content/uploads/2023/05/gratisography-party-balloons-free-stock-photo-800x525.jpg', title: 'dog', date: '2023-10-10' },
    { src: 'https://gratisography.com/wp-content/uploads/2023/05/gratisography-gold-kicks-free-stock-photo-800x525.jpg', title: 'shoes', date: '2023-10-10' },
  ];
  const [posts, setPosts] = useState<IPost[]>([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setPosts(posts);
    };
    fetchPosts();
  }, [posts]);

  return (
    <main className='flex min-h-screen flex-col justify-between p-12'>
      <Header />
      <div className='w-5/6 self-center justify-items-center grid-row-dense grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8'>
        {posts.map((post) => (
          <div key={post._id} className='hover:scale-105 bg-primary/70 p-2 rounded-sm'>
            <a href={'post/' + post.slug.current} target='_'>
              <Image className='aspect-square object-cover' src={post.mainImage} alt={post.title} width={400} height={400} />
              <p className='text-text'>{post.title}</p>
              <p className='text-accent font-light'>{post.publishedAt}</p>
            </a>
          </div>
        ))}
        {data.map((item) => (
          <div key={item.title} className='hover:scale-105 bg-primary/70 p-2 rounded-sm'>
            <Image className='aspect-square object-cover' src={item.src} alt={item.title} width={400} height={400} />
            <p className='text-text'>{item.title}</p>
            <p className='text-accent font-light'>{item.date}</p>
          </div>
        ))}
      </div>
      <a href='https://github.com/tjekol/melbourne' target='_' className='static self-center bottom-2 text-text/50 mt-8'>Thea Jenny E. Kolnes🦋</a>
    </main>
  );
}
