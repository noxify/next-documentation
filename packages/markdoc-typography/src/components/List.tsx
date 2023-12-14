import type { ReactNode } from "react"

import { cn } from "@acme/helpers"

export function List({
  children,
  ordered,
  start,
  type,
}: {
  children: ReactNode
  ordered: boolean
  start?: number
  type?: string
}) {
  const ListElement = ordered ? "ol" : "ul"

  return (
    <ListElement
      className={cn("my-6 ml-6 [&>li]:mt-2")}
      style={{
        listStyleType: `${ordered ? type ?? "decimal" : type ?? "disc"}`,
      }}
      start={start}
    >
      {children}
    </ListElement>
  )
}
