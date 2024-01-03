import type { Config } from "@markdoc/markdoc"
import Markdoc, { Tag } from "@markdoc/markdoc"
import { slugifyWithCounter } from "@sindresorhus/slugify"

import { Blockquote } from "./components/Blockquote"
import { Heading } from "./components/Heading"
import { List } from "./components/List"
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
}

export const tags: Config["tags"] = {}

export const components = {
  Paragraph: Paragraph,
  Heading: Heading,
  Blockquote: Blockquote,
  List: List,
}
