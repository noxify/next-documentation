import type { Metadata } from "next"

import "@acme/ui/style.css"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "Create T3 Turbo",
  description: "Simple monorepo with shared backend for web & mobile apps",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="text-xl">
      <body>{children}</body>
    </html>
  )
}
