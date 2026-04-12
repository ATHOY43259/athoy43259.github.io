import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Athoy Kanti Ray | Full Stack Developer",
  description:
    "Full Stack Developer with experience in Laravel, Next.js, and PostgreSQL. Building scalable web applications and RESTful APIs.",
  keywords: ["Full Stack Developer", "Laravel", "Next.js", "React", "PostgreSQL", "Bangladesh"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden" suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
