import type { Metadata } from "next";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
