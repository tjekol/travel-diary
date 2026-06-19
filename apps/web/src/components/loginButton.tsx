'use client';

import { auth } from '@/app/utils/firebase';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from 'firebase/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LoginButton() {
  const googleProvider = new GoogleAuthProvider();
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

  const handleLogin = async () => {
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <>
      {user ? (
        <Link href={`/profile/${user.uid}`}>
          <button className='bg-accent hover:bg-accent/70 rounded-md px-4 py-2 text-white'>
            Profile
          </button>
        </Link>
      ) : (
        <button
          onClick={handleLogin}
          className='bg-accent hover:bg-accent/70 rounded-md px-4 py-2 text-white'
        >
          Login
        </button>
      )}
    </>
  );
}
