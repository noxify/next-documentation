import type { ReactNode } from "react"

import { cn } from "@acme/helpers"

export function List({
  children,
  ordered,
  start = 1,
}: {
  children: ReactNode
  ordered: boolean
  start?: number
}) {
  const ListElement = ordered ? "ol" : "ul"

  return (
    <ListElement
      className={cn(
        "[&:not(li>ul):not(li>ol)]:ml-1",
        "[&:not(li>ul):not(li>ol)]:my-6",
        "list-outside pl-4 [&>li]:mt-2",
        !ordered ? "[&>li]:marker:text-gray-400" : "",
        ordered ? "list-decimal" : "list-disc",
      )}
      start={start}
    >
      {children}
    </ListElement>
  )
}

export function ListItem({ children }: { children: ReactNode }) {
  return <li>{children}</li>
}
