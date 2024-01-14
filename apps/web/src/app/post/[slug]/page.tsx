import Footer from '@/components/footer';
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
    <main className='flex min-h-screen w-full flex-col justify-between py-12'>
      <Header />
      <div className='w-full grow rounded-sm bg-secondary/60 p-8'>
        <div className='flex flex-col md:flex-row md:items-end md:justify-center md:space-x-8'>
          <h1 className='font-semibold text-center'>{data.title}</h1>
          <h2 className='text-accent text-center'>{data.publishedAt}</h2>
        </div>
        <div className='my-8 flex flex-col items-center space-y-4 px-2 md:px-10 md:flex-row md:justify-center md:space-x-6'>
          <Image
            src={data.mainImage}
            alt={data.title}
            width={300}
            height={430}
            sizes='70vh'
          />
          <div className='self-center md:w-2/5 md:self-start'>
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
        <div className='w-full columns-2 gap-x-4 md:columns-4 2xl:columns-xs'>
          {data.pictures.map(
            (picture) =>
              picture !== null && (
                <Image
                  className='aspect-image w-full py-2'
                  src={picture}
                  alt='title'
                  key={picture}
                  width={300}
                  height={300}
                  sizes='50vh'
                />
              ),
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
