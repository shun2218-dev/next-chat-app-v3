import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import { Analytics } from '@vercel/analytics/next';

import { Providers } from './providers';

import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import { Navbar } from '@/components/projects/Navbar/Navbar';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className="relative flex flex-col h-screen justify-between">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-2 md:pt-16 px-6 flex-grow max-h-[83vh] sm:max-h-[86vh] md:max-h-[88vh]">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              &copy; {new Date().getFullYear()}&nbsp;
              {'Next Chat App'}
            </footer>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
