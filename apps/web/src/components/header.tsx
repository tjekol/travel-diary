import { signOut, useSession } from 'next-auth/react';

export default function Header() {
  const session = useSession();
  return (
      <div className='self-center my-8'>
        <a href='/'>
          <h1 className='font-serif font-semibold text-center'>
            Melbourne Diary🇦🇺
          </h1>
          <h3 className='text-center text-text/60'>
            Follow my journey in Melbourne
          </h3>
        </a>
        {session.status === 'authenticated' ? (
          <div className='flex flex-col items-end absolute top-5 right-5 sm:top-10 sm:right-10'>
            <a href='http://localhost:3000/admin'>
              <p className='text-text/50 hover:underline'>Admin</p>
            </a>
            <p onClick={() => signOut()} className='text-text/50 hover:underline'>Logg ut</p>
          </div>
        ) : (
          <a href='http://localhost:3000/api/auth/signin/github'>
            <p className='absolute hover:underline top-5 right-5 sm:top-10 sm:right-10 text-text/50 justify-self-end'>Logg inn</p>
          </a>
        )}
      </div>
  );
}
