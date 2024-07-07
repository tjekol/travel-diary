import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Melbourne Travel Diary',
  description: `Thea Jenny's travel diary`,
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
          href='https://em-content.zobj.net/source/apple/391/flag-australia_1f1e6-1f1fa.png'
        />
      </head>
      <body className={inter.className}>
        <main className='bg-background'>{children}</main>
      </body>
    </html>
  );
}
