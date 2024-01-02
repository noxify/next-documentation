import { packageDirectory } from "pkg-dir"

export const getProjectRoot = async () => {
  return await packageDirectory()
}
