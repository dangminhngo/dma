import Link from "next/link"

import { buttonVariants } from "~/components/ui/button"
import { type RouterOutput } from "~/trpc/types"
import { type InferElement } from "~/types"

interface SetCardProps {
  set: InferElement<RouterOutput["set"]["list"]>
}

export default function SetCard({ set }: SetCardProps) {
  return (
    <div className="group flex items-center justify-between rounded-lg border p-4">
      <div>
        <div className="font-medium">{set.title}</div>
        <div className="text-sm text-muted-foreground">{set.description}</div>
        <div className="text-sm text-muted-foreground">
          {set._count.words} words
        </div>
      </div>
      <div className="pointer-events-none opacity-0 duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        <Link
          href={`/s/sets/${set.id}`}
          className={buttonVariants({ variant: "default", size: "sm" })}
        >
          Learn
        </Link>
      </div>
    </div>
  )
}
