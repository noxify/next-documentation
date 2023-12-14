import type { ReactNode } from "react"
import slugify from "@sindresorhus/slugify"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@acme/ui"

export function MarkdocTabs({
  children,
  labels,
  defaultValue,
}: {
  children: ReactNode
  labels: string[]
  defaultValue?: string
}) {
  const slug = (defaultValue ?? labels[0])!
  return (
    <Tabs defaultValue={slugify(slug)}>
      <TabsList>
        {labels.map((label, key) => (
          <TabsTrigger key={key} value={slugify(label)}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  )
}

export function MarkdocTab({
  children,
  label,
}: {
  children: ReactNode
  label: string
}) {
  return <TabsContent value={slugify(label)}>{children}</TabsContent>
}
