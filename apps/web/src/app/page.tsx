import Header from '@/components/header';
import Image from 'next/image';

export default function Home() {
  const data = [
    { src: 'https://gratisography.com/wp-content/uploads/2023/10/gratisography-pumpkin-scarecrow-800x525.jpg', title: 'pumkin', date: '2023-02-01' },
    { src: 'https://gratisography.com/wp-content/uploads/2023/06/gratisography-kitten-plant-free-stock-photo-800x525.jpg', title: 'cat', date: '2023-04-11' },
    { src: 'https://gratisography.com/wp-content/uploads/2023/06/gratisography-toadstool-free-stock-photo-800x525.jpg', title: 'frog', date: '2023-10-10' },
    { src: 'https://gratisography.com/wp-content/uploads/2023/05/gratisography-blank-paper-free-stock-photo-800x525.jpg', title: 'paper', date: '2023-10-10' },
    { src: 'https://gratisography.com/wp-content/uploads/2023/05/gratisography-retro-pastime-free-stock-photo-800x525.jpg', title: 'tv', date: '2023-10-10' },
    { src: 'https://gratisography.com/wp-content/uploads/2023/05/gratisography-wedding-dog-free-stock-photo-800x525.jpg', title: 'balloons', date: '2023-10-10' },
    { src: 'https://gratisography.com/wp-content/uploads/2023/05/gratisography-party-balloons-free-stock-photo-800x525.jpg', title: 'dog', date: '2023-10-10' },
    { src: 'https://gratisography.com/wp-content/uploads/2023/05/gratisography-gold-kicks-free-stock-photo-800x525.jpg', title: 'shoes', date: '2023-10-10' },
  ];

  return (
    <main className='flex min-h-screen flex-col p-12 md:p-24'>
      <Header />
      <div className='w-5/6 self-center items-center grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
        {data.map((item) => (
          <div key={item.title}>
            <Image src={item.src} alt={item.title} width={400} height={400} />
            <p className='text-text'>{item.title}</p>
            <p className='text-accent font-light'>{item.date}</p>
          </div>
        ))}
      </div>
      <p className='static self-center text-text/50 bottom-6 mt-8'>Thea Jenny E. Kolnes🦋</p>
    </main>
  );
}
