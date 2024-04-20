import { cn } from "~/lib/utils"

interface HeadingProps extends React.HTMLAttributes<HTMLElement> {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

function Heading({ as, className = "", ...props }: HeadingProps) {
  switch (as) {
    case "h1":
      return (
        <h1
          className={cn("text-2xl font-bold tracking-tight", className)}
          {...props}
        />
      )
    case "h2":
      return (
        <h2
          className={cn("text-xl font-bold tracking-tight", className)}
          {...props}
        />
      )
    case "h3":
      return (
        <h3
          className={cn("text-lg font-bold tracking-tight", className)}
          {...props}
        />
      )
    case "h4":
      return (
        <h4
          className={cn("text-base font-bold tracking-tight", className)}
          {...props}
        />
      )
    case "h5":
      return (
        <h5 className={cn("font-bold tracking-tight", className)} {...props} />
      )
    case "h6":
      return (
        <h6
          className={cn("text-xs font-bold tracking-tight", className)}
          {...props}
        />
      )
  }
}

export { Heading }
