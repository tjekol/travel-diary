'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { useSession } from 'next-auth/react';

export default function Admin() {
  const { data } = useSession();
  const session = useSession();

  return (
    <main className='flex min-h-screen flex-col justify-between p-6 sm:p-12'>
      <Header />
      {session.status === 'authenticated' ? (
        <>
          <p className='self-center mb-20'>Du er verifisert!</p>
          <p/>
          {/* <p>Admin {JSON.stringify(data)}</p> */}
        </>
      ) : (
        <>
          <div className='self-center rounded-md bg-secondary px-10 py-4 hover:bg-secondary/40'>
            <a href='http://localhost:3000/api/auth/signin/github'>
              <h1 className='font-semibold'>Logg inn</h1>
            </a>
          </div>
          <p />
        </>
      )}
      <Footer />
    </main>
  );
}
