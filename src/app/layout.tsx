import type { Metadata } from "next";
import {titleFont} from '@/config/font' 
import "./globals.css";


export const metadata: Metadata = {
  title: {
    template: '%s | APP',
    default: 'INICIO | APP',
  },
  description: "Aplicacion con fines educativos",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${titleFont.className}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
