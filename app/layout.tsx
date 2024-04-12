import { ClerkProvider } from '@clerk/nextjs';
import {  dark, neobrutalism  } from '@clerk/themes';
import { ThemeProvider } from '@/components/ui/theme-provider';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stream It",
  description: "Stream It is a streaming platform for developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      baseTheme: [dark, neobrutalism] as any,
      variables: { colorPrimary: 'red' },
    }}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute='class' forcedTheme='dark' storageKey='stream-theme'>
          {children}
          </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  );
}
