import { BracesIcon } from "lucide-react"

export function Logo({ name }: { name: string }) {
  return (
    <div className="flex h-16 shrink-0 items-center">
      <BracesIcon className="h-8 w-auto " />
      <span className="leading ml-2 hidden text-xl font-semibold text-foreground sm:block">
        {name}
      </span>
    </div>
  )
}
