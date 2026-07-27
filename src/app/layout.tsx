import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond, Dancing_Script, Caveat } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-dancing",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "A Birthday Confession & Love Story ❤️ | Love, Kamal",
  description: "An interactive love story and proposal experience created by Kamal on his birthday for the most special girl.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${cormorant.variable} ${dancingScript.variable} ${caveat.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#090314] text-slate-100 font-sans selection:bg-rose-500 selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
