import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TJ Reisedagbok',
  description: `Thea Jenny sin reisedagbok`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='icon'
          href='https://em-content.zobj.net/source/apple/419/airplane_2708-fe0f.png'
        />
      </head>
      <body className={inter.className}>
        <main className='bg-background'>{children}</main>
      </body>
    </html>
  );
}
