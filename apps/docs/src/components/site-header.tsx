import Link from "next/link"

import { Logo, ThemeToggle } from "@acme/ui/components"

export function SiteHeader() {
  return (
    <header className=" sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <nav
          className="mx-auto flex items-center justify-between "
          aria-label="Global"
        >
          <Link href="/" className="-m-1.5 p-1.5">
            <Logo name="T3 Docs" className="h-16" />
          </Link>

          <div className="hidden lg:flex lg:gap-x-12">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}
