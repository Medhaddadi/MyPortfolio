import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
// Import i18n without directly using it in the component
// This ensures the i18n instance is initialized
import "../i18n"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mohamed Haddadi - Développeur Fullstack Java & Spring Boot",
  description:
    "Portfolio de Mohamed Haddadi, ingénieur logiciel spécialisé dans le développement d'applications web avec Java, Spring Boot, React et Angular.",
  keywords:
    "développeur java, spring boot, fullstack, développeur web, react, angular, portfolio, mohamed haddadi, ingénieur logiciel",
  authors: [{ name: "Mohamed Haddadi", url: "https://mohamed-haddadi.com" }],
  creator: "Mohamed Haddadi",
  publisher: "Mohamed Haddadi",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://mohamed-haddadi.com",
    title: "Mohamed Haddadi - Développeur Fullstack Java & Spring Boot",
    description:
      "Portfolio de Mohamed Haddadi, ingénieur logiciel spécialisé dans le développement d'applications web avec Java, Spring Boot, React et Angular.",
    siteName: "Mohamed Haddadi Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mohamed Haddadi - Développeur Fullstack Java & Spring Boot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Haddadi - Développeur Fullstack Java & Spring Boot",
    description:
      "Portfolio de Mohamed Haddadi, ingénieur logiciel spécialisé dans le développement d'applications web avec Java, Spring Boot, React et Angular.",
    images: ["/og-image.jpg"],
    creator: "@MohamedHaddadi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://mohamed-haddadi.com" />
        <meta name="theme-color" content="#4F46E5" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
