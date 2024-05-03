import Link from "next/link"

import { buttonVariants } from "~/components/ui/button"
import { type RouterOutput } from "~/trpc/types"
import { type InferElement } from "~/types"

interface AssignmentCardProps {
  assignment: InferElement<RouterOutput["assignment"]["list"]>
}

export default function AssignmentCard({ assignment }: AssignmentCardProps) {
  return (
    <div className="group flex items-center justify-between rounded-lg border p-4">
      <div>
        <div className="font-medium">{assignment.title}</div>
        <div className="text-sm text-muted-foreground">
          {assignment.description}
        </div>
        <div className="text-sm text-muted-foreground">
          {assignment._count.questions} questions
        </div>
      </div>
      <div className="pointer-events-none opacity-0 duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        <Link
          href={`/s/assignments/${assignment.id}`}
          className={buttonVariants({ variant: "default", size: "sm" })}
        >
          Take
        </Link>
      </div>
    </div>
  )
}
