'use client';

import { supabase } from '@/app/utils/client';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LoginButton() {
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

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin, // redirect back to your site after login
      },
    });
    if (error) console.error('Login error:', error.message);
  };

  return (
    <>
      {user !== null ? (
        <Link href={`/profile/${user.id}`}>
          <button className='bg-accent hover:bg-accent/70 absolute top-10 right-10 rounded-md px-4 py-2 text-white'>
            Profile
          </button>
        </Link>
      ) : (
        <button
          onClick={handleLogin}
          className='bg-accent hover:bg-accent/70 absolute top-10 right-10 rounded-md px-4 py-2 text-white'
        >
          Login
        </button>
      )}
    </>
  );
}
