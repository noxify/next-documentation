import type { Config } from "@markdoc/markdoc"

import {
  components as tabComponents,
  nodes as tabNodes,
  tags as tabTags,
} from "@acme/markdoc-tabs"
import {
  components as typographyComponents,
  nodes as typographyNodes,
  tags as typographyTags,
} from "@acme/markdoc-typography"

const config: Config = {
  nodes: {
    ...typographyNodes,
    ...tabNodes,
  },

  tags: {
    ...typographyTags,
    ...tabTags,
  },
}

const components = {
  ...typographyComponents,
  ...tabComponents,
}

export { config, components }
