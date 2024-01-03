import path from "path"
import type { Metadata, ResolvingMetadata } from "next"
import React from "react"
import { notFound } from "next/navigation"

import {
  components,
  generateTableOfContents,
  getAllDocuments,
  getDocument,
  Markdoc,
  parseContent,
  TableOfContents,
} from "@acme/markdoc-base"
import { SidebarNavigation } from "@acme/ui/components"

interface DocPageProps {
  params: {
    slug: string[]
  }
}

function getContentPath() {
  // get project root
  const projectDirectory = path.resolve("../../")
  // get path to the content
  return path.join(projectDirectory, "apps/content")
}

async function getContent({ params }: DocPageProps) {
  const contentPath = getContentPath()

  const parsedParams = `/${params.slug.join("/")}`

  return await getDocument(contentPath, parsedParams)
}

export async function generateStaticParams(): Promise<
  DocPageProps["params"][]
> {
  const contentPath = getContentPath()
  const documents = await getAllDocuments(path.resolve(contentPath))

  return documents.map((ele) => ({ slug: ele.slug }))
}

export async function generateMetadata(
  { params }: DocPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const document = await getContent({ params })

  const parentMeta = await parent

  return {
    applicationName: parentMeta.applicationName,
    title: `${document?.frontmatter.title ?? parentMeta.title?.absolute} - ${
      parentMeta.applicationName
    }`,
    description: document?.frontmatter.description ?? parentMeta.description,
  }
}
export default async function DocsPage({ params }: DocPageProps) {
  const document = await getContent({ params })

  if (!document) notFound()

  const pageContent = await parseContent(document.docPath)
  if (!pageContent) notFound()

  return (
    <div className="flex-1">
      <div className="container">
        <div className="mx-auto flex">
          {pageContent.sidebar && (
            <aside className="sticky top-16 hidden h-[calc(100vh)] w-[284px] lg:flex lg:shrink-0 lg:flex-col lg:justify-between">
              <div className="overflow-y-auto overflow-x-hidden bg-red-200 py-8 pr-6">
                <SidebarNavigation items={[]} />
              </div>
            </aside>
          )}
          <main className="mt-4 w-full min-w-0 max-w-6xl px-0 lg:pl-6 xl:pr-8">
            <div className="space-y-2">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {pageContent.title}
              </h1>
              <p className="text-lg text-gray-500">{pageContent.description}</p>
            </div>
            <div className="mt-8">
              {Markdoc.renderers.react(pageContent.content, React, {
                components,
              })}
            </div>
          </main>
          {pageContent.toc && (
            <div className="hidden xl:sticky xl:top-[4.25rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:pb-16 xl:pr-6 xl:pt-4">
              <nav aria-labelledby="on-this-page-title" className="w-56">
                <h2
                  id="on-this-page-title"
                  className="font-display text-sm font-medium text-foreground"
                >
                  On this page
                </h2>
                <TableOfContents
                  toc={generateTableOfContents(pageContent.headings)}
                />
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
