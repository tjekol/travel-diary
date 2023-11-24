import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col justify-between p-12 md:p-24'>
      <div className='self-center mb-8'>
        <h1 className='font-serif font-semibold text-center'>
          Melbourne Diary🇦🇺
        </h1>
        <h3 className='text-center text-text/60'>
          Follow my journey in Melbourne
        </h3>
      </div>
      <div className='w-5/6 self-center items-center grid grid-cols-4 gap-6'>
          <div className='bg-secondary rounded p-4'>
            <p>Image</p>
            <p>title</p>
            <p>Date</p>
          </div>
        <div className='bg-secondary rounded p-4'>
          <p>hei</p>
        </div>
        <div className='bg-secondary rounded p-4'>
          <p>hei</p>
        </div>
        <div className='bg-secondary rounded p-4'>
          <p>hei</p>
        </div>
        <div className='bg-secondary rounded p-4'>
          <p>hei</p>
        </div>
        <div className='bg-secondary rounded p-4'>
          <p>hei</p>
        </div>
        <div className='bg-secondary rounded p-4'>
          <p>hei</p>
        </div>
        <div className='bg-secondary rounded p-4'>
          <p>hei</p>
        </div>
        <div className='bg-secondary rounded p-4'>
          <p>hei</p>
        </div>
        <div className='bg-secondary rounded p-4'>
          <p>hei</p>
        </div>
      </div>
      <div className='grow'/>
      <p className='text-center'>Thea Jenny E. Kolnes</p>
    </main>
  );
}
