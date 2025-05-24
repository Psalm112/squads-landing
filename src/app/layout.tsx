import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Squads - The New Way to Win Money on Sports",
  description:
    "Just pick More or Less on player stats and win up to 100X your cash! The simplest way to make money from sports betting.",
  keywords:
    "sports betting, fantasy sports, win money, player stats, football betting",
  authors: [{ name: "Squads Team" }],
  creator: "Squads",
  publisher: "Squads",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#00FF7F",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://squads.game",
    title: "Squads - The New Way to Win Money on Sports",
    description:
      "Just pick More or Less on player stats and win up to 100X your cash!",
    siteName: "Squads",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Squads - Win Money on Sports",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Squads - The New Way to Win Money on Sports",
    description:
      "Just pick More or Less on player stats and win up to 100X your cash!",
    images: ["/og-image.png"],
    creator: "@squads",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
