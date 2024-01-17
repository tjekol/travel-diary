'use client';

import { signOut, useSession } from 'next-auth/react';

export default function Header() {
  const session = useSession();


  return (
      <div className='self-center my-8'>
        <a href='/'>
          <h1 className='font-serif font-semibold text-center'>
            Melbourne Dagbok🇦🇺
          </h1>
          <h3 className='text-center text-text/60'>
            Følg min reise til Melbourne
          </h3>
        </a>
        {session.status === 'authenticated' ? (
          <div className='flex flex-col items-end absolute top-5 right-5 sm:top-10 sm:right-10'>
            <a href='https://melbourne.vercel.app/dashboard'>
              <p className='text-text/50 hover:underline'>Hei, {session.data.user?.name}!</p>
            </a>
            <p onClick={() => signOut()} className='text-text/50 hover:underline'>Logg ut</p>
          </div>
        ) : (
          <a href='https://melbourne.vercel.app/api/auth/signin/github'>
            <p className='absolute hover:underline top-5 right-5 sm:top-10 sm:right-10 text-text/50 justify-self-end'>Logg inn</p>
          </a>
        )}
      </div>
  );
}
