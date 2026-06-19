'use client';

import { auth } from '@/app/utils/firebase';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { use, useEffect, useState } from 'react';

export default function ProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
      } else {
        // User is signed out
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
    window.location.replace('/');
  };

  return (
    <main className='flex min-h-screen flex-col justify-between p-6 sm:p-12'>
      <Header />
      <div className='flex w-full flex-1 flex-col space-y-4'>
        <div className='bg-secondary/60 flex flex-col rounded-sm p-6 lg:p-8'>
          <h2>Hi, {user?.displayName}</h2>
          <span>Your liked posts:</span>
          <span>Comments posted by you:</span>
        </div>
        <button
          onClick={handleLogout}
          className='bg-accent hover:bg-accent/70 rounded-md px-4 py-2 text-white'
        >
          Logout
        </button>
      </div>
      <Footer />
    </main>
  );
}
