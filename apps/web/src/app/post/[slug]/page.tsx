import Header from '@/components/header';
import { getData } from '@/sanity/post/[slug]';
import { IPost } from '@/sanity/post/schemas';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

export default async function SlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = (await getData(params.slug)) as IPost;

  return (
    <main className='w-full flex flex-col min-h-screen justify-between py-12'>
      <Header />
      <div className='w-full grow rounded-md bg-secondary/60 p-8'>
        <div className='flex flex-row items-end justify-center space-x-8'>
          <h1 className='font-semibold'>{data.title}</h1>
          <h2 className='text-accent'>{data.publishedAt}</h2>
        </div>
        <div className='my-8 flex flex-col items-center space-y-4 px-10 md:flex-row md:justify-center md:space-x-6'>
          <Image
            src={data.mainImage}
            alt={data.title}
            width={0}
            height={0}
            sizes='100vh'
            style={{ width: 'auto', maxHeight: '430px', maxWidth: '430px' }}
          />
          <div className='self-center md:w-1/2 md:self-start'>
            <PortableText value={data.description} />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className='grid grid-flow-col auto-cols-max overflow-x-auto gap-2 md:flex-row'>
          {data.pictures.map((picture) =>
              picture !== null && (
                <Image
                  src={picture} 
                  alt='title'
                  key={picture}
                  width={0}
                  height={0}
                  sizes='100vh'
                  style={{ width: 'auto', maxHeight: '320px' }}
                />
              ),
          )}
        </div>
        <p className='text-accent'>Scroll --></p>
      </div>
      <a
        href='https://github.com/tjekol/melbourne'
        target='_'
        className='static bottom-2 mt-8 self-center text-text/50'
      >
        Thea Jenny E. Kolnes🦋
      </a>
    </main>
  );
}
