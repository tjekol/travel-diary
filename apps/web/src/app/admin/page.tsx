/* eslint-disable @next/next/no-async-client-component */
'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { useSession } from 'next-auth/react';
// import { getServerSession } from 'next-auth';
// import { options } from '../api/auth/[...nextauth]/options';

export default function Admin() {
  // const session = await getServerSession(options);
  const { data } = useSession();
  const session = useSession();

  return (
    <main className='flex min-h-screen flex-col justify-between p-6 sm:p-12'>
      <Header />
      <p>
        Admin {JSON.stringify(data)}
      </p>
      <p>
        {session.status === 'authenticated' ? (
          'authenticated'
        ) : (
          'not authenticated'
        )}
      </p>
      <Footer />
    </main>
  )
}