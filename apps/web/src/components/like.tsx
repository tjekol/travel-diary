import { supabase } from '@/app/utils/client';
import { Heart } from '@gravity-ui/icons';
import { HeartFill } from '@gravity-ui/icons';
import { ToggleButton, AlertDialog, Button } from '@heroui/react';
import { useEffect, useState } from 'react';
import LoginButton from './loginButton';

export default function Like({ post_id }: { post_id: string }) {
  const [isLiked, setIsLiked] = useState(false);
  const [like_count, setLikeCount] = useState<number>(0);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const userHasLiked = async (post_id: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      let userHasLiked = false;
      if (user) {
        const { data } = await supabase
          .from('post_likes')
          .select('user_id')
          .eq('user_id', user.id)
          .eq('post_id', post_id)
          .single();

        userHasLiked = !!data;
      }
      setIsLiked(userHasLiked);
    };
    userHasLiked(post_id);
    getLikes(post_id);
  }, [post_id, isLiked]);
  const getLikes = async (post_id: string) => {
    const { count: like_count, error } = await supabase
      .from('post_likes')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', post_id);

    if (error) console.error('Like count error:', error.message);
    if (like_count !== null) setLikeCount(like_count);
  };

  const toggleLike = async (post_id: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setShowAlert(true);
      return;
    }

    const { data: existingLike } = await supabase
      .from('post_likes')
      .select('user_id')
      .eq('user_id', user.id)
      .eq('post_id', post_id)
      .single();

    if (existingLike) {
      // already liked → unlike
      await supabase
        .from('post_likes')
        .delete()
        .eq('user_id', user.id)
        .eq('post_id', post_id);

      setIsLiked(false);
      getLikes(post_id);
    } else {
      // not liked yet → like
      await supabase
        .from('post_likes')
        .insert({ user_id: user.id, post_id: post_id });
      setIsLiked(true);
      getLikes(post_id);
    }
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
