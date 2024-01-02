import path from "path"
import React from "react"
import { notFound } from "next/navigation"
import { getAllDocuments } from "@/utils/content"

import { components, Markdoc, parseContent } from "@acme/markdoc-base"

interface DocPageProps {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams(): Promise<DocPageProps["params"]> {
  const documents = await getAllDocuments("src/content")

  const documentPaths = Object.keys(documents)

  const slugs = documentPaths.flatMap((document) => document.split("/"))

  return {
    slug: slugs,
  }
}

export default async function DocsPage({
  params,
}: {
  params: { slug: string[] }
}) {
  const parsedParams = params.slug.join("/")

  const filePath = path.join(
    path.resolve(),
    "./src/content/",
    `${parsedParams}.md`,
  )

  const pageContent = await parseContent(filePath)

  if (!pageContent) notFound()

  return (
    <main className="">
      {Markdoc.renderers.react(pageContent.content, React, { components })}
    </main>
  )
}
