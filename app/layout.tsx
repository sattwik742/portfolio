import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Outfit } from "next/font/google";
import { cn } from "@/lib/utils";
import Cursor from "@/components/Custom/Cursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sattwik | Portfolio",
  description: "Crafting high-performance web experiences with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(geistSans.variable, geistMono.variable, spaceGrotesk.variable, outfit.variable, "font-sans")}>
        <Cursor />
        {children}
      </body>
    </html>
  );
}