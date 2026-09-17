import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shramadeep — Machine Learning Engineer",
  description:
    "Machine Learning Engineer · AI Researcher · Data Scientist. Building intelligent systems from models to production — NLP, computer vision, speech AI, LLM systems, and data science.",
  authors: [{ name: "Shramadeep" }],
  openGraph: {
    title: "Shramadeep — Machine Learning Engineer",
    description:
      "Building intelligent systems from models to production. NLP · CV · Speech AI · LLMs · Data Science.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${grotesk.variable} ${jetbrains.variable} font-sans bg-ink text-fg antialiased`}
      >
        {children}
      </body>
    </html>
  );
}