import type { Metadata } from "next"

//import { NextDevtoolsProvider } from "@next-devtools/core"

import { Logo, TailwindIndicator } from "@acme/ui/components"

import "@acme/ui/style.css"
import "@/styles/globals.css"

import { Providers } from "@/components/providers"

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
        <Providers defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="relative flex flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <Logo name="T3 Docs" className="h-16" />
            </header>
            {children}
            <footer className="border-t">
              <div className="container">
                <div className="grid grid-cols-4">
                  <div>
                    <Logo name="T3 Docs" />
                  </div>
                  <div>col 2</div>
                  <div>col 3</div>
                  <div>col 4</div>
                </div>
              </div>
            </footer>
          </div>
          <TailwindIndicator />
        </Providers>
        {/* </NextDevtoolsProvider> */}
      </body>
    </html>
  )
}
