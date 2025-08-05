'use client';

import { getTravels } from '@/sanity/travel';
import { ITravel } from '@/sanity/travel/schemas';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    <>
      <div className='mb-10 mt-5 self-center'>
        <Link href='/'>
          <h1 className='text-center font-serif font-semibold'>
            TJ&apos;s Reisedagbok✈️
          </h1>
          <h3 className='text-center text-text/60'>
            Følg min reise rundt i verden!
          </h3>
        </Link>
      </div>

      <div className='mb-10 flex justify-center gap-2'>
        <>
          {travels.map((travel) => (
            <button
              key={travel._id}
              onClick={() => router.push(`/${travel.slug.current}`)}
              className={`rounded-md ${activePage === travel.slug.current ? 'bg-accent/70' : 'bg-accent/40'} p-2 text-background hover:bg-accent/70`}
            >
              {travel.title}
            </button>
          ))}
          <button
            onClick={() => router.push(`/`)}
            className={`rounded-md ${activePage === 'all' ? 'bg-accent/70' : 'bg-accent/40'} p-2 text-background hover:bg-accent/70`}
          >
            Alle innlegg
          </button>
        </>
      </div>
    </>
  );
}
