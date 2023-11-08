import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastProvider } from '@/app/contexts/toast-context';
import Toast from '@/app/ui/components/toast';
import Header from '@/app/ui/header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Contact List',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <Header />
          {children}
          <Toast />
        </ToastProvider>
      </body>
    </html>
  );
}
