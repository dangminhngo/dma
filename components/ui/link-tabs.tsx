import * as React from "react"
import Link from "next/link"

import { cn } from "~/lib/utils"

interface LinkTabsProps extends React.HTMLAttributes<HTMLDivElement> {}

function LinkTabs({ className, ...props }: LinkTabsProps) {
  return <div className={cn("", className)} {...props} />
}

interface LinkTabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

function LinkTabsList({ className, ...props }: LinkTabsListProps) {
  return (
    <div className={cn("flex items-center border-b", className)} {...props} />
  )
}

interface LinkTabsContentProps extends React.HTMLAttributes<HTMLDivElement> {}

function LinkTabsContent({ className, ...props }: LinkTabsContentProps) {
  return <div className={cn("", className)} {...props} />
}

interface LinkTabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof Link> {
  active?: boolean
}

function LinkTabsTrigger({
  active = false,
  className,
  ...props
}: LinkTabsTriggerProps) {
  return (
    <Link
      className={cn(
        "px-6 py-2",
        active
          ? "border-b-2 border-foreground font-medium"
          : "text-foreground/60",
        className
      )}
      {...props}
    />
  )
}

export { LinkTabs, LinkTabsList, LinkTabsTrigger, LinkTabsContent }
