import type { Metadata } from "next";
import { Poppins, Righteous } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const righteous = Righteous({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "LanguaNav",
  description: "LanguaNav is a translation assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
