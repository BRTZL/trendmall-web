import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"

import "./globals.css"

import Link from "next/link"
import { TrendingUp } from "lucide-react"

import { Toaster } from "@/components/ui/toaster"
import { AccountButton } from "@/components/account-button"
import { CartButton } from "@/components/cart-button"
import { LoginButton } from "@/components/login-button"
import { ReactQueryProvider } from "@/components/react-query-provider"

import { isUserAuthenticated } from "@/lib/session"
import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Trendmall",
  description: "Trendmall is a platform for buying goods.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAuthenticated = await isUserAuthenticated()

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ReactQueryProvider>
          <div className="flex min-h-screen flex-col">
            <header className="bg-primary py-4 text-primary-foreground">
              <div className="container mx-auto flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  prefetch={false}
                >
                  <TrendingUp className="size-6" />
                  <span className="text-xl font-bold">Trendmall</span>
                </Link>
                <div className="flex items-center gap-6">
                  <CartButton />
                  {isAuthenticated ? <AccountButton /> : <LoginButton />}
                </div>
              </div>
            </header>
            <main className="container flex-1 px-6 py-12">{children}</main>
            <footer className="bg-muted p-6 text-muted-foreground">
              <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
                <div className="mb-4 flex items-center gap-2 md:mb-0">
                  <TrendingUp className="size-6" />
                  <span className="text-lg font-bold">Trendmall</span>
                </div>
                <nav className="flex items-center gap-6">
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Privacy Policy
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Terms of Service
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Contact Us
                  </Link>
                </nav>
              </div>
            </footer>
          </div>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  )
}
