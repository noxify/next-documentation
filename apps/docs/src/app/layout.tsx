import type { Metadata } from "next"

import { Logo } from "@acme/ui/components"

import "@acme/ui/style.css"
import "@/styles/globals.css"

import { Providers } from "@/components/providers"

export const metadata: Metadata = {
  title: "Create T3 Turbo",
  description: "Simple monorepo with shared backend for web & mobile apps",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head />
      <body>
        <Providers defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Logo name="T3 Docs" />
          {children}
        </Providers>
      </body>
    </html>
  )
}
