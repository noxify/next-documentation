import { BracesIcon } from "lucide-react"

import { cn } from "@acme/helpers"

export function Logo({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  return (
    <div className={cn("flex shrink-0 items-center", className)}>
      <BracesIcon className="h-8 w-auto " />
      <span className="leading ml-2 hidden text-xl font-semibold text-foreground sm:block">
        {name}
      </span>
    </div>
  )
}
