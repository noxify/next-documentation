import fs from "node:fs/promises"
import type { Tag } from "@markdoc/markdoc"
import type { PathLike } from "node:fs"
import Markdoc from "@markdoc/markdoc"
import { stripHtml } from "string-strip-html"

import type { HeadingNode } from "@acme/markdoc-typography/components"

import { config } from "./config"
import { getFrontmatter } from "./frontmatter"

export interface TableOfContentsProps {
  id: string
  title: string
  level: number
  children?: TableOfContentsProps[]
}

export async function getFileContent(filePath: PathLike | fs.FileHandle) {
  try {
    return await fs.readFile(filePath, { encoding: "utf-8" })
  } catch (e) {
    return null
  }
}

export async function parseContent(filePath: PathLike | fs.FileHandle) {
  const fileContent = await getFileContent(filePath)

  if (!fileContent) return

  const frontmatter = getFrontmatter(fileContent)

  const ast = Markdoc.parse(fileContent)
  const content = Markdoc.transform(ast, config)

  // since RenderableTreeNode could be a string
  // we use the `Tag` type for content
  // otherwise we get some type issues and I have no idea
  // how I could solve it
  const headings = ((content as Tag).children as Tag[]).filter((ele) => {
    return ele.name == "Heading"
  })

  return {
    content,
    ...frontmatter,
    headings,
  }
}

export function generateTableOfContents(headings: Tag[]) {
  const sections: TableOfContentsProps[] = []

  for (const heading of headings) {
    const attributes = (heading as unknown as HeadingNode).attributes

    if (attributes.level == 2 || attributes.level == 3) {
      const strippedTitle = stripHtml(Markdoc.renderers.html(heading)).result

      if (attributes.level == 3) {
        if (!sections[sections.length - 1]) {
          throw new Error(
            `Cannot add "h3" to table of contents without a preceding "h2" - Heading Title: ${strippedTitle}`,
          )
        }

        sections[sections.length - 1]?.children!.push({
          id: attributes.id,
          level: attributes.level,
          title: strippedTitle,
        })
      } else {
        sections.push({
          id: attributes.id,
          level: attributes.level,
          title: strippedTitle,
          children: [],
        })
      }
    }
  }

  return sections
}
