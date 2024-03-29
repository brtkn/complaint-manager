import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@radix-ui/themes/styles.css';
import './theme.config.css';
import Navbar from './Navbar';
import { Theme, Container } from '@radix-ui/themes';
import AuthProvider from './auth/Provider';
import QueryClientProvider from './QueryClientProvider';

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
        <QueryClientProvider>
          <AuthProvider>
            <Theme>
              <Navbar />
              <main className='p-5'>
                <Container>{children}</Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
