import { z } from "zod"
import { parse as parseFrontmatter } from "zod-matter"

const frontmatterProps = z.object({
  title: z.string(),
  description: z.string().optional(),
})

export type FrontmatterDefinition = z.infer<typeof frontmatterProps>

export function getFrontmatter(fileContent: string) {
  const { data: frontmatter } = parseFrontmatter(fileContent, frontmatterProps)
  return frontmatter
}
