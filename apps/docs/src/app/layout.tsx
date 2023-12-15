import type { Metadata } from "next"

import { Logo, SidebarNavigation, TailwindIndicator } from "@acme/ui/components"

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
          <div className="container">
            <Logo name="T3 Docs" />
            <div className="mx-auto flex">
              <aside className="sticky top-16 hidden h-[calc(100vh-121px)] w-[284px] lg:flex lg:shrink-0 lg:flex-col lg:justify-between">
                <div className="absolute bottom-0 right-0 top-12 w-px bg-gray-200 dark:block dark:bg-slate-800" />
                <div className="overflow-y-auto overflow-x-hidden py-8 pr-6">
                  <SidebarNavigation items={[]} />
                </div>
              </aside>
              <main className="mt-4 w-full min-w-0 max-w-6xl px-0 lg:pl-6 xl:pr-8">
                {children}
              </main>
            </div>
          </div>
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}
