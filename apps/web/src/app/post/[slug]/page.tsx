import Header from '@/components/header';
import { client } from '@/sanity/client';
import { IPost } from '@/sanity/post/schemas';
import { PortableText } from '@portabletext/react'

async function getData(slug: string) {
  const query = `*[_type == "post" && slug.current == "${slug}"][0]`;
  const data = await client.fetch(query);

  return data;
}

export default async function SlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = (await getData(params.slug)) as IPost;

  return (
    <main className='flex min-h-screen w-full flex-col justify-between p-12'>
      <Header />
      <div className='w-full grow rounded-md bg-secondary/60 p-8'>
        <div className='mb-6 flex flex-row items-end justify-center space-x-8'>
          <h1 className=''>{data.title}</h1>
          <h2 className='text-accent'>{data.publishedAt}</h2>
        </div>
        <div className='flex justify-center'>
          <p className='w-2/3'>
            <PortableText value={data.description}/>
            {/* {data.title} Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum. */}
          </p>
        </div>
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
