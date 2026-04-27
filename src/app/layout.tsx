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

const SITE_URL = 'https://www.eclipsediluna.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Eclipse di Luna | Celebrating Latin & Spanish Cuisine in Atlanta',
    template: '%s | Eclipse di Luna',
  },
  description:
    'Join Eclipse di Luna for a culinary journey through Latin and Spanish culture with our vibrant tapas bar and restaurant | Atlanta',
  keywords: ['tapas', 'Spanish restaurant', 'Latin restaurant', 'Atlanta', 'Alpharetta', 'Buckhead', 'Dunwoody', 'Beltline', 'live music', 'cocktails'],
  authors: [{ name: 'Eclipse di Luna' }],
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '256x256' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Eclipse di Luna',
    title: 'Eclipse di Luna | Celebrating Latin & Spanish Cuisine in Atlanta',
    description:
      'Join Eclipse di Luna for a culinary journey through Latin and Spanish culture with our vibrant tapas bar and restaurant | Atlanta',
    images: [
      {
        url: '/images/hero/logo-white.webp',
        width: 1200,
        height: 630,
        alt: 'Eclipse di Luna — Restaurant & Tapas Bar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eclipse di Luna | Celebrating Latin & Spanish Cuisine in Atlanta',
    description:
      'Join Eclipse di Luna for a culinary journey through Latin and Spanish culture with our vibrant tapas bar and restaurant | Atlanta',
    images: ['/images/hero/logo-white.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
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
      <head>
        {/* Preconnect to external CDNs used on home/blog to cut DNS+TLS handshake
            from the critical path — IG embeds (Events modal) and Webflow CMS
            (blog inline images) are the two external hosts we hit. */}
        <link rel="preconnect" href="https://www.instagram.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.prod.website-files.com" crossOrigin="anonymous" />
      </head>
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
