import type { Metadata } from "next"

//import { NextDevtoolsProvider } from "@next-devtools/core"

import { TailwindIndicator } from "@acme/ui/components"

import "@acme/ui/style.css"
import "@/styles/globals.css"

import { Providers } from "@/components/providers"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "T3 Docs",
  description: "Over-engineered monorepo to generate a static page",
  applicationName: "T3 Docs",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head />
      <body>
        {/* <NextDevtoolsProvider> */}
        <Providers
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          attribute="class"
        >
          <div className="relative flex flex-col">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
          <TailwindIndicator />
        </Providers>
        {/* </NextDevtoolsProvider> */}
      </body>
    </html>
  )
}
