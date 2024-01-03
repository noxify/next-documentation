import type { Config } from "@markdoc/markdoc"
import Markdoc, { Tag } from "@markdoc/markdoc"
import { slugifyWithCounter } from "@sindresorhus/slugify"

import { Blockquote } from "./components/Blockquote"
import { Heading } from "./components/Heading"
import { List, ListItem } from "./components/List"
import { Paragraph } from "./components/Paragraph"

const slugify = slugifyWithCounter()

export const nodes: Config["nodes"] = {
  heading: {
    render: "Heading",
    attributes: {
      id: { type: String },
      level: { type: Number, required: true },
    },
    transform(node, config) {
      const attributes = node.transformAttributes(config)
      const children = node.transformChildren(config)
      const renderedContent = Markdoc.renderers.html(children)
      if (!attributes.id) {
        attributes.id = slugify(renderedContent)
      }
      return new Tag(this.render, attributes, children)
    },
  },

  paragraph: {
    render: "Paragraph",
  },

  blockquote: {
    render: "Blockquote",
  },

  list: {
    render: "List",
    attributes: {
      ordered: { type: Boolean, required: false },
    },
  },

  item: {
    render: "ListItem",
  },
}

export const tags: Config["tags"] = {
  orderedlist: {
    render: "List",
    attributes: {
      ordered: { type: Boolean, required: false, default: true },
      type: { type: String, required: false },
      start: { type: Number, required: false },
    },
    transform(node, config) {
      const attributes = node.transformAttributes(config)
      const children = node.transformChildren(config)

      const elements = children[0] as Tag
      if (children.length && elements?.name === "List") {
        elements.attributes = attributes
      }

      return elements
    },
  },
}

export const components = {
  Paragraph: Paragraph,
  Heading: Heading,
  Blockquote: Blockquote,
  List: List,
  ListItem: ListItem,
}
