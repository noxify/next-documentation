"use client"

import type { ThemeProviderProps } from "next-themes/dist/types"
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function Providers({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
