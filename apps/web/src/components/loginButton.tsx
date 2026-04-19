'use client';

import { supabase } from '@/app/utils/client';
import { User } from '@supabase/supabase-js';
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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Login error:', error.message);
  };

  return (
    <>
      {user !== null ? (
        <button
          onClick={handleLogout}
          className='bg-accent hover:bg-accent/70 absolute top-10 right-10 rounded-md px-4 py-2 text-white'
        >
          Logout, {user.email}
        </button>
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
