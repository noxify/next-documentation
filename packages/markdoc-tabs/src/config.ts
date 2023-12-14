import type { RenderableTreeNode, Schema } from "@markdoc/markdoc"
import { Tag } from "@markdoc/markdoc"

export const tabsConfig: Schema = {
  render: "Tabs",
  children: ["Tab"],
  transform(node, config) {
    const labels = node
      .transformChildren(config)
      .filter(
        (child: RenderableTreeNode) => child && (child as Tag).name === "Tab",
      )
      .map((tab: RenderableTreeNode) => (tab as Tag).attributes.label as string)

    const defaultValue = node
      .transformChildren(config)
      .filter(
        (child: RenderableTreeNode) => child && (child as Tag).name === "Tab",
      )
      .find(
        (tab: RenderableTreeNode) =>
          ((tab as Tag).attributes?.default as boolean) == true,
      ) as Tag

    return new Tag(
      this.render,
      { labels, defaultValue: defaultValue.attributes?.label as string },
      node.transformChildren(config),
    )
  },
}

export const tabConfig: Schema = {
  render: "Tab",
  attributes: {
    label: { type: String, required: true },
    default: { type: Boolean, required: false },
  },
}
