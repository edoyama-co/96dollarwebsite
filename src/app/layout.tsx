import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "$96 Website | One Page. Free Hosting. Forever.",
  description:
    "Professional one-page websites for small businesses. $96 one-time. No monthly fees. No hosting costs. Ever. Join the waitlist.",
  openGraph: {
    title: "$96 Website | One Page. Free Hosting. Forever.",
    description:
      "Professional one-page websites for small businesses. $96 one-time. No monthly fees. No hosting costs. Ever.",
    type: "website",
    url: "https://96dollarwebsite.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
