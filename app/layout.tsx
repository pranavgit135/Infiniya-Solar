import type React from "react";
import "./globals.css";
import "./map-styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Phone } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Infinia Solar - Trusted Clean Energy Partner",
  description:
    "Infinia empowers commercial and industrial clients with low-carbon energy solutions, offering clean power through on-site solar installations and off-site solar farms.",
  generator: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
