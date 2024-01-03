// Source: https://ui.shadcn.com/docs/components/typography
import type { ReactNode } from "react"

export function Paragraph({ children }: { children: ReactNode }) {
  return <p className="leading-7 [&:not(:first-child)]:mt-4">{children}</p>
}
