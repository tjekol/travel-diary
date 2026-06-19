import { Heart } from '@gravity-ui/icons';
import { HeartFill } from '@gravity-ui/icons';
import { ToggleButton, AlertDialog, Button } from '@heroui/react';
import { useEffect, useState } from 'react';
import LoginButton from './loginButton';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/app/utils/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDocs,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';

export default function Like({ post_id }: { post_id: string }) {
  const [isLiked, setIsLiked] = useState(false);
  const [like_count, setLikeCount] = useState<number>(0);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const userHasLiked = async (post_id: string) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const user_id = user.uid;
          const docRef = collection(db, 'post_likes');
          const q = query(
            docRef,
            where('post_id', '==', post_id),
            where('user_id', '==', user_id),
          );
          const snapshot = await getDocs(q);
          if (snapshot.empty) {
            setIsLiked(false);
          } else {
            setIsLiked(true);
          }
        }
      });
    };
    userHasLiked(post_id);
    getLikes(post_id);
  }, [post_id, isLiked]);

  const getLikes = async (post_id: string) => {
    const docRef = collection(db, 'post_likes');
    const q = query(docRef, where('post_id', '==', post_id));
    const snapshot = await getCountFromServer(q);
    setLikeCount(snapshot.data().count);
  };

  const toggleLike = async (post_id: string) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const user_id = user.uid;
        const q = query(
          collection(db, 'post_likes'),
          where('post_id', '==', post_id),
          where('user_id', '==', user_id),
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          // not liked yet → like
          const docRef = await addDoc(collection(db, 'post_likes'), {
            post_id: post_id,
            user_id: user_id,
            created_at: serverTimestamp(),
          });
          console.log('Like written with ID: ', docRef.id);
          setIsLiked(true);
          getLikes(post_id);
        } else {
          // already liked → unlike
          const docId = snapshot.docs[0].id;
          await deleteDoc(doc(db, 'post_likes', docId));
          console.log('Like removed');
          setIsLiked(false);
          getLikes(post_id);
        }
      } else {
        setShowAlert(true);
        return;
      }
    });
  };

  return (
    <>
      {showAlert && (
        <AlertDialog.Backdrop isOpen={showAlert} onOpenChange={setShowAlert}>
          <AlertDialog.Container>
            <AlertDialog.Dialog className='sm:max-w-[400px]'>
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status='accent' />
                <AlertDialog.Heading>Login</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>Login is required to like a post.</p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <LoginButton />
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      )}
      <div className='flex flex-col gap-4'>
        <ToggleButton
          isSelected={isLiked}
          onChange={() => toggleLike(post_id)}
          variant='ghost'
        >
          {({ isSelected: selected }) => (
            <>
              {selected ? <HeartFill /> : <Heart />}
              {like_count}
            </>
          )}
        </ToggleButton>
      </div>
    </>
  );
}
