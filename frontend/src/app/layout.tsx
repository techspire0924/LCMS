import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Import the DatabaseInitializer component
import DatabaseInitializer from './components/DatabaseInitializer';

// Update the metadata for our LCMS application
export const metadata: Metadata = {
  title: "LCMS - Learning Content Management System",
  description: "A learning content management system",
};

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Include the DatabaseInitializer component */}
        <DatabaseInitializer />
        {children}
      </body>
    </html>
  );
}
