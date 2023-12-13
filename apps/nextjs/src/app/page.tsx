import path from "path"
import React from "react"
import { notFound } from "next/navigation"

import { components, Markdoc, parseContent } from "@acme/markdoc-base"

export default async function HomePage() {
  const filePath = path.join(path.resolve(), "./src/content/test.md")

  const pageContent = await parseContent(filePath)

  if (!pageContent) notFound()

  return (
    <main className="">
      {Markdoc.renderers.react(pageContent.content, React, { components })}
    </main>
  )
}
