// Importing env files here to validate on build
import "./src/env.mjs"

//import { withNextDevtools } from '@next-devtools/core/plugin'

/** @type {import("next").NextConfig} */
const config = {
  output: "export",

  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@acme/markdoc-base",
    "@acme/ui",
    "@acme/markdoc-typography",
  ],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
}

//export default withNextDevtools(config)
export default config
