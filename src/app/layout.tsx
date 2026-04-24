import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Montserrat, DM_Sans, Abhaya_Libre } from 'next/font/google';
import './globals.css';
import { ModalProvider } from '@/components/providers/ModalProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';

// Nunito Variable — body copy. Served from Webflow on live; we serve locally.
const nunito = localFont({
  src: '../../public/fonts/Nunito-Variable.ttf',
  variable: '--font-nunito',
  display: 'swap',
  weight: '200 1000',
});

// Swarsh Daisy — display serif used for H1/H2 on live.
const swarshDaisy = localFont({
  src: '../../public/fonts/SwarshDaisy-Regular.otf',
  variable: '--font-display',
  display: 'swap',
  weight: '400',
});

// Nugros — decorative/nav labels (hero location names, @handle, nav menu labels).
const nugros = localFont({
  src: '../../public/fonts/Nugros-Regular.ttf',
  variable: '--font-nugros',
  display: 'swap',
  weight: '400',
});

// Montserrat — button labels per live.
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// DM Sans — secondary UI copy per live.
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

// Abhaya Libre — serif used for blog card titles per live.
const abhayaLibre = Abhaya_Libre({
  subsets: ['latin'],
  variable: '--font-abhaya',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
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
  const fontClasses = [
    nunito.variable,
    swarshDaisy.variable,
    nugros.variable,
    montserrat.variable,
    dmSans.variable,
    abhayaLibre.variable,
  ].join(' ');

  return (
    <html lang="en" className={`${fontClasses} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ModalProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ScrollToTop />
        </ModalProvider>
      </body>
    </html>
  );
}
