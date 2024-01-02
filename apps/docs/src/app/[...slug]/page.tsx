import path from "path"
import React from "react"
import { notFound } from "next/navigation"

import { getProjectRoot } from "@acme/helpers"
import {
  components,
  getAllDocuments,
  getDocument,
  Markdoc,
  parseContent,
} from "@acme/markdoc-base"

interface DocPageProps {
  params: {
    slug: string[]
  }
}

async function getContentPath() {
  const projectDirectory = await getProjectRoot()
  if (!projectDirectory) throw "Unable to determine the project root directory."

  return path.join(projectDirectory, "apps/content")
}
export async function generateStaticParams(): Promise<
  DocPageProps["params"][]
> {
  const contentPath = await getContentPath()
  const documents = await getAllDocuments(path.resolve(contentPath))

  return documents.map((ele) => ({ slug: ele.slug }))
}

export default async function DocsPage({ params }: DocPageProps) {
  const contentPath = await getContentPath()

  const parsedParams = `/${params.slug.join("/")}`

  const document = await getDocument(contentPath, parsedParams)

  if (!document) notFound()

  const pageContent = await parseContent(document.docPath)

  if (!pageContent) notFound()

  return (
    <main className="">
      {Markdoc.renderers.react(pageContent.content, React, { components })}
    </main>
  )
}
