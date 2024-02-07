import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@radix-ui/themes/styles.css';
import './theme.config.css';
import Navbar from './Navbar';
import { Theme } from '@radix-ui/themes';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Complaint Manager App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.variable}>
        <Theme>
          <Navbar />
          <main className='p-5'>{children}</main>
        </Theme>
      </body>
    </html>
  );
}
