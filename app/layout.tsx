import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Provider";

export const metadata: Metadata = {
  title: "Game Guess - IOTA dApp",
  description: "Blockchain-based guessing game on IOTA network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
