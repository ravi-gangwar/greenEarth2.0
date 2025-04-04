import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "./_trpc/Provider";
import { Provider as RWBProver } from "react-wrap-balancer";
import Providers from "./Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "greenEarth",
  description: "Green earth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <header>
        <meta name="theme-color" content="#F1EA69" />
      </header>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Providers>
            <RWBProver>{children}</RWBProver>
          </Providers>
        </Provider>
      </body>
    </html>
  );
}
