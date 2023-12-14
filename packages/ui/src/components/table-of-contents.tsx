// Source: https://github.com/shadcn/ui/blob/main/apps/www/components/toc.tsx
"use client"

import * as React from "react"
import type { TableOfContents } from "@acme/markdoc-base"

import { cn } from "@acme/helpers"

interface TocProps {
  toc: TableOfContents[]
}

interface TreeProps {
  tree: TableOfContents[]
  level?: number
  activeItem?: string
}

export function TableOfContents({ toc }: TocProps) {
  const itemIds = React.useMemo(
    () =>
      toc
        ? toc
            .flatMap((item) => [
              `#${item.id}`,
              ...(item?.children?.map((item) => `#${item.id}`) ?? ""),
            ])
            .flat()
            .filter((ele) => ele !== "")
            .map((id) => id.split("#")[1]!)
        : [],
    [toc],
  )

  const activeHeading = useActiveItem(itemIds)

  return <Tree tree={toc} activeItem={activeHeading} />
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string>("")

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` },
    )

    itemIds?.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.length ? (
    <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {tree.map((item, index) => {
        return (
          <li key={index} className={cn("mt-0 pt-2")}>
            <a
              href={`#${item.id}`}
              className={cn(
                "inline-block no-underline transition-colors hover:text-foreground",
                `#${item.id}` === `#${activeItem}`
                  ? "font-medium text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {item.title}
            </a>
            {item.children && item.children?.length > 0 && level < 3 ? (
              <Tree
                tree={item.children}
                level={level + 1}
                activeItem={activeItem}
              />
            ) : null}
          </li>
        )
      })}
    </ul>
  ) : null
}
