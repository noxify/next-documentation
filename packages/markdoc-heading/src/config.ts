import Markdoc, { Tag } from "@markdoc/markdoc";
import type { Schema } from "@markdoc/markdoc";
import { slugifyWithCounter } from "@sindresorhus/slugify";

const slugify = slugifyWithCounter();

export const config: Schema = {
  render: "Heading",
  attributes: {
    id: { type: String },
    level: { type: Number, required: true },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const renderedContent = Markdoc.renderers.html(children);
    if (!attributes.id) {
      attributes.id = slugify(renderedContent);
    }
    return new Tag(this.render, attributes, children);
  },
};
