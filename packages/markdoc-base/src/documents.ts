import path from "node:path"
import { globby } from "globby"
import pMap, { pMapSkip } from "p-map"

import type { FrontmatterDefinition } from "./frontmatter"
import { getFrontmatter } from "./frontmatter"
import { getFileContent } from "./helpers"

interface Document {
  docPath: string
  slug: string[]
  url: string
  frontmatter: FrontmatterDefinition
}

export const getAllDocuments = async (cwd: string): Promise<Document[]> => {
  const allContentFiles = await globby(["**/*.md"], {
    cwd,
    expandDirectories: true,
  })

  const paths = await pMap(allContentFiles, async (docPath) => {
    const absolutePath = path.join(cwd, docPath)
    const parsedPath = path.parse(docPath)

    const fileName =
      parsedPath.name === "index" || parsedPath.name === "page"
        ? ""
        : parsedPath.name

    const fileContent = await getFileContent(absolutePath)

    // if we can't read the filecontent, skip the document
    if (!fileContent) return pMapSkip

    const slug = [...parsedPath.dir.split("/"), fileName].filter(
      (ele) => ele != null && ele !== "",
    )
    return {
      docPath: absolutePath,
      slug,
      url: `/${slug.join("/")}`,
      frontmatter: getFrontmatter(fileContent),
    }
  })

  return paths
}

export const getDocument = async (cwd: string, path: string) => {
  const allDocuments = await getAllDocuments(cwd)

  return allDocuments.find((doc) => {
    return doc.url === path
  })
}
