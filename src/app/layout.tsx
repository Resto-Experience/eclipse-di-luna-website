import type { Metadata } from 'next';
import { Nunito_Sans, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { ModalProvider } from '@/components/providers/ModalProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
});

// Cormorant Garamond is a closer fallback to "Swarsh Daisy" — elegant condensed display serif
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Eclipse di Luna | Restaurant & Tapas Bar',
  description:
    'Eclipse di Luna celebrates culture and good times, showcasing Latin cuisine with spectacular tapas, craft cocktails, and live entertainment across 4 Atlanta locations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunitoSans.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ModalProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}
