export default function Header() {
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
        <a href='http://localhost:3000/api/auth/signin/github'>
          <p className='absolute hover:underline top-5 right-5 sm:top-10 sm:right-10 text-text/50 justify-self-end'>Logg inn</p>
        </a>
      </div>
  );
}