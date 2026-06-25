'use client';

import { auth, db } from '@/app/utils/firebase';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { Skeleton } from '@heroui/react/skeleton';
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
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
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
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
        {loading ? (
          <>
            <div className='bg-secondary/60 flex min-h-70 flex-col gap-4 rounded-sm p-6 lg:p-8'>
              <Skeleton className='h-3 w-40' animationType='pulse' />
              <Skeleton className='h-3 w-4/5' animationType='pulse' />
              <Skeleton className='h-3 w-1/2' animationType='pulse' />
              <Skeleton className='h-3 w-3/4' animationType='pulse' />
            </div>
            <button
              onClick={handleLogout}
              className='bg-accent hover:bg-accent/70 rounded-md px-4 py-2 text-white'
            >
              Logg ut
            </button>
          </>
        ) : (
          <>
            <div className='bg-secondary/60 flex min-h-70 flex-col gap-4 rounded-sm p-6 lg:p-8'>
              <h2>Hei, {user?.displayName}</h2>
              {data && (
                <span>
                  <b>Likte innlegg:</b>
                  <ul className='flex flex-col'>
                    {data.map((d, i) => (
                      <a
                        className='hover:underline'
                        href={`/post/${d.post_id}`}
                        key={i}
                      >
                        {d.post_id}
                      </a>
                    ))}
                  </ul>
                </span>
              )}
              <span>
                <b>Dine kommentarer:</b>
              </span>
            </div>
            <button
              onClick={handleLogout}
              className='bg-accent hover:bg-accent/70 rounded-md px-4 py-2 text-white'
            >
              Logg ut
            </button>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
