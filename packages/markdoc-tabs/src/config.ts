import type { Config, RenderableTreeNode } from "@markdoc/markdoc"
import { Tag } from "@markdoc/markdoc"

import { MarkdocTab, MarkdocTabs } from "./components/Tabs"

export const nodes: Config["nodes"] = {}

export const tags: Config["tags"] = {
  tabs: {
    render: "Tabs",
    children: ["Tab"],
    transform(node, config) {
      const labels = node
        .transformChildren(config)
        .filter(
          (child: RenderableTreeNode) => child && (child as Tag).name === "Tab",
        )
        .map(
          (tab: RenderableTreeNode) => (tab as Tag).attributes.label as string,
        )

      const findDefaultTab =
        (node
          .transformChildren(config)
          .filter(
            (child: RenderableTreeNode) =>
              child && (child as Tag).name === "Tab",
          )
          .find(
            (tab: RenderableTreeNode) =>
              ((tab as Tag).attributes?.default as boolean) == true,
          ) as Tag) ?? null

      const defaultValue = findDefaultTab
        ? (findDefaultTab.attributes?.label as string)
        : null

      return new Tag(
        this.render,
        { labels, defaultValue },
        node.transformChildren(config),
      )
    },
  },

  tab: {
    render: "Tab",
    attributes: {
      label: { type: String, required: true },
      default: { type: Boolean, required: false },
    },
  },
}

export const components = {
  Tabs: MarkdocTabs,
  Tab: MarkdocTab,
}
