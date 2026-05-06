'use client';

import { getTravels } from '@/sanity/travel';
import { ITravel } from '@/sanity/travel/schemas';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LoginButton from './loginButton';

export default function Header() {
  const [travels, setTravels] = useState<ITravel[]>([]);
  const [activePage, setActivePage] = useState<String | null>('all');
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const travels = await getTravels();
        setTravels(travels);

        const activePage = localStorage.getItem('activePage');
        setActivePage(activePage);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className='flex w-full flex-col gap-2'>
      <div className='mt-5 self-center'>
        <Link href='/'>
          <h1 className='text-center font-serif font-semibold'>
            TJ&apos;s Reisedagbok✈️
          </h1>
          <h3 className='text-text/60 text-center'>
            Følg min reise rundt i verden!
          </h3>
        </Link>
      </div>

      <div className='m-auto md:absolute md:right-10'>
        <LoginButton />
      </div>

      <div className='mb-8 flex h-12 justify-start gap-2 overflow-x-auto overflow-y-hidden md:justify-center'>
        <button
          onClick={() => router.push('/')}
          className={`rounded-md ${activePage === 'all' ? 'bg-accent/70' : 'bg-accent/40'} text-background hover:bg-accent/70 px-4`}
        >
          Alle innlegg
        </button>
        {travels.map((travel) => (
          <button
            key={travel._id}
            onClick={() => router.push(`/${travel.slug.current}`)}
            className={`rounded-md ${activePage === travel.slug.current ? 'bg-accent/70' : 'bg-accent/40'} text-background hover:bg-accent/70 px-2 whitespace-nowrap`}
          >
            {travel.title}
          </button>
        ))}
      </div>
    </div>
  );
}
