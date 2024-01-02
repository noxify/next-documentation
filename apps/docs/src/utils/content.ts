import path from "node:path"
import { cache } from "react"
import { globby } from "globby"
import { getFrontmatter } from "node_modules/@acme/markdoc-base/src/frontmatter"
import pMap, { pMapSkip } from "p-map"

import { getFileContent } from "@acme/markdoc-base"

export const getAllDocuments = cache(async (cwd: string) => {
  const allContentFiles = await globby(["**/*.md"], {
    cwd,
    expandDirectories: true,
  })

  const paths = await pMap(allContentFiles, async (docPath) => {
    const parsedPath = path.parse(docPath)

    const fileName =
      parsedPath.name === "index" || parsedPath.name === "page"
        ? ""
        : parsedPath.name

    const fileContent = await getFileContent(docPath)

    // if we can't read the filecontent, skip the document
    if (!fileContent) return pMapSkip

    return {
      docPath,
      slug: [...parsedPath.dir.split("/"), fileName].filter(
        (ele) => ele != null && ele !== "",
      ),
      url: `/${[...parsedPath.dir.split("/"), fileName]
        .filter((ele) => ele != null && ele !== "")
        .join("/")}`,
      frontmatter: getFrontmatter(fileContent) ?? null,
    }
  })

  console.log({ paths })

  const documents = {
    "/docs/test": {
      title: "Test document",
      content: "hello world",
    },
  }

  return documents
})

export const getDocument = cache(async (cwd: string, path: string) => {
  const allDocuments = await getAllDocuments(cwd)

  // @ts-expect-error
  return allDocuments[path] ?? null
})
