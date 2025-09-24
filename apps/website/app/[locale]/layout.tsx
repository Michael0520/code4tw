import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { I18nProvider } from '@/components/providers/i18n-provider'
import { getMetadata, type Locale } from '@/lib/i18n-server'
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return getMetadata(locale as Locale);
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params;

  // Validate that the incoming locale parameter is valid
  const locales = ['en', 'zh'];
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen`}>
        <Suspense fallback={null}>
          <I18nProvider>
            <ThemeProvider attribute="class" forcedTheme="light" disableTransitionOnChange>
              <div className="min-h-screen flex flex-col">{children}</div>
            </ThemeProvider>
          </I18nProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
