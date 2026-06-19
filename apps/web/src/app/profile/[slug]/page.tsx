'use client';

import { auth, db } from '@/app/utils/firebase';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import {
  query,
  collection,
  where,
  getDocs,
  DocumentData,
} from 'firebase/firestore';
import { use, useEffect, useState } from 'react';

export default function ProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<DocumentData[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);

        const q = query(
          collection(db, 'post_likes'),
          where('user_id', '==', uid),
        );
        const querySnapshot = await getDocs(q);
        const liked_posts: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          liked_posts.push(doc.data());
        });
        setData(liked_posts);
      } else {
        // User is signed out
        window.location.replace('/');
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
        <div className='bg-secondary/60 flex flex-col gap-4 rounded-sm p-6 lg:p-8'>
          <h2>Hi, {user?.displayName}</h2>
          <span>
            <b>Liked posts:</b>
            <ul className='flex flex-col'>
              {data.map((d, i) => (
                <a href={`/post/${d.post_id}`} key={i}>
                  {d.post_id}
                </a>
              ))}
            </ul>
          </span>
          <span>
            <b>Your comments:</b>
          </span>
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
