'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/contexts/AuthContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const isAdminRoute = pathName?.includes('/admin');

  if (isAdminRoute) {
    return (
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body className="min-h-screen bg-gray-100">
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <CartProvider>
          <HeaderWrapper />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
