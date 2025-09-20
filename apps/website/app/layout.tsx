import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { JetBrains_Mono } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { LanguageProvider } from "@/components/language-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Code for Taiwan | 台灣零時政府",
  description:
    "Code for Taiwan is a civic tech community that brings together developers, designers, and citizens to build digital solutions for social good.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <LanguageProvider>
              <div className="min-h-screen flex flex-col">{children}</div>
            </LanguageProvider>
          </ThemeProvider>
          {/* <Analytics /> */}
        </Suspense>
      </body>
    </html>
  )
}
