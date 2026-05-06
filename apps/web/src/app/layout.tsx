import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TJ Reisedagbok',
  description: 'Thea Jenny sin reisedagbok - følg reisen rundt i verden!',
  keywords: ['reisedagbok', 'reise', 'blogg', 'Thea Jenny', 'travel diary'],
  authors: [{ name: 'Thea Jenny Kolnes' }],
  openGraph: {
    title: 'TJs Reisedagbok',
    description: 'Følg min reise rundt i verden!',
    type: 'website',
    locale: 'nb_NO',
  },
  twitter: {
    card: 'summary',
    title: 'TJ Reisedagbok',
    description: 'Følg min reise rundt i verden!',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='nb'>
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
