import type { Config } from "tailwindcss"

import baseConfig from "@acme/tailwind-config"

console.log({ baseConfig })

export default {
  ...baseConfig,
} satisfies Config
