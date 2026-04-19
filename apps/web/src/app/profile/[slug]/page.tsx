'use client';

import { supabase } from '@/app/utils/client';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { User } from '@supabase/supabase-js';
import { use, useEffect, useState } from 'react';

export default function ProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      // Fetches user details from Supabase Auth server
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) console.error('User error:', error.message);
      if (user) setUser(user);
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Login error:', error.message);
  };

  return (
    <main className='flex min-h-screen flex-col justify-between p-6 sm:p-12'>
      <Header />
      <div className='bg-secondary/60 flex w-full grow flex-col justify-between space-y-4 rounded-sm p-6 lg:p-8'>
        <div className='flex flex-col'>
          <h2>Hi, {user?.email}</h2>
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
