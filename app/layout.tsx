import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

import '@/styles/globals.css';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CV - GPT',
  description: 'Generate your cover letter using chatGPT',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={cn('text-slate-900 antialiased light', inter.className)}>
      <body className='antialiased bg-slate-50'>
        <main className='flex flex-col items-center justify-center flex-1 min-h-screen'>{children}</main>
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
