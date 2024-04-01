import type { Metadata } from "next";
import Searchbox from "./Components/search-box";
import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MELI prueba técnica",
  description: "MELI prueba técnica creado por: Mariana Mendivil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Searchbox />
        {children}
      </body>
    </html>
  );
}
