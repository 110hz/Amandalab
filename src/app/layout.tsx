import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LangProvider } from '@/contexts/lang-context';

export const metadata: Metadata = {
  title: {
    default: 'Morpho Foam · Professional Cloud Foam Solutions',
    template: '%s | Morpho Foam',
  },
  description:
    'MORPHO Foam — Professional cloud foam solutions for coffee, tea, and desserts. Patented technology, 30-minute stable shape, ready-to-use spray.',
  keywords: [
    'Morpho Foam',
    'MORPHO',
    'Cloud Foam',
    'Cheese Foam',
    'coffee foam',
    'tea foam',
    'milk foam',
    'whipped cream',
    '闪蝶浮云',
  ],
  openGraph: {
    title: 'Morpho Foam · Professional Cloud Foam Solutions',
    description: 'Professional cloud foam solutions for coffee, tea, and desserts — all scenarios',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LangProvider>
          <NavbarWrapper />
          <main>{children}</main>
          <FooterWrapper />
        </LangProvider>
      </body>
    </html>
  );
}

function NavbarWrapper() {
  return <Navbar />;
}

function FooterWrapper() {
  return <Footer />;
}
