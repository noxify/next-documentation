import { z } from "zod"
import { parse as parseFrontmatter } from "zod-matter"

export function getFrontmatter(fileContent: string) {
  const frontmatterProps = z.object({
    title: z.string(),
    description: z.string().optional(),
  })

  const { data: frontmatter } = parseFrontmatter(fileContent, frontmatterProps)

  return frontmatter
}
