import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/Footer";
import { PopupWidget } from "@/components/PopupWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auxion",
  description:
    "Starter template for using thirdweb SDK with Next.js App router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThirdwebProvider>
        <body className={inter.className + " bg-white dark:bg-slate-900"}>
          <ThemeProvider attribute="class">
            <Navbar />
            <div>{children}</div>
            <Footer />
            <PopupWidget />
          </ThemeProvider>
        </body>
      </ThirdwebProvider>
    </html>
  );
}