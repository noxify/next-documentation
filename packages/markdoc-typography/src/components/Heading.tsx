/**
 * Source: https://github.com/dylanmeivis/nextjs13-starter-markdoc
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc"
import type { ReactNode } from "react"

import { cn } from "@acme/helpers"

export interface HeadingNode extends MarkdocNode {
  type: "heading"
  attributes: {
    level: 1 | 2 | 3 | 4 | 5 | 6
    id: string
    [key: string]: unknown
  }
}

interface HeadingProps {
  children: ReactNode
  level: number
  id: string
}

export function Heading({ children, level, id }: HeadingProps) {
  let headingClass = "text-base font-semibold"

  switch (level) {
    case 1:
      headingClass = "text-4xl font-extrabold lg:text-5xl"
      break
    case 2:
      headingClass =
        "border-b pb-2 text-3xl font-semibold transition-colors first:mt-0"
      break
    case 3:
      headingClass = "text-2xl font-semibold"
      break
    case 4:
      headingClass = "text-xl font-semibold"
      break
    case 5:
      headingClass = "text-lg font-semibold"
      break
  }

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <HeadingTag
      id={id}
      className={cn(headingClass, "my-4 scroll-m-20 tracking-tight")}
    >
      {children}
    </HeadingTag>
  )
}
