import Link from "next/link"
import { redirect } from "next/navigation"

import { buttonVariants } from "~/components/ui/button"
import { Heading } from "~/components/ui/heading"
import { cn } from "~/lib/utils"
import { api } from "~/trpc/server"

export default async function AssignmentScorePage({
  params,
}: {
  params: { id: string }
}) {
  const score = await api.score.byAssignment({
    assignmentId: +params.id,
  })

  if (!score) return redirect(`/s/assignment/${params.id}`)

  return (
    <div className="space-y-4">
      <Heading as="h2" className={cn("text-4xl", getScoreColor(score.points))}>
        <span className="text-foreground/80">Your Score:</span> {score.points}
      </Heading>
      <div className="text-xl">{getText(score.points)}</div>
      <div className="text-muted-foreground">
        You cannot be allowed to take this assignment again. If there is
        something wrong, contact the teacher of this course.
      </div>
      <div className="flex items-center space-x-2">
        <Link
          href={`/s/assignments/${params.id}/results`}
          className={buttonVariants({ variant: "default" })}
        >
          Your Results
        </Link>
        <Link
          href={`/s/assignments/${params.id}/rankings`}
          className={buttonVariants({ variant: "secondary" })}
        >
          Rankings
        </Link>
      </div>
    </div>
  )
}

function getScoreColor(points: number) {
  if (points === 0) {
    return "text-destructive"
  } else if (points <= 5) {
    return "text-pink-500"
  } else if (points <= 8) {
    return "text-amber-500"
  } else if (points < 10) {
    return "text-green-500"
  } else {
    return "text-purple-500"
  }
}

function getText(points: number) {
  if (points <= 0) {
    return "Hahaha. You've just got the score that nobody can get before. It's ZERO."
  } else if (points <= 3) {
    return "Oops. It's too bad. Are you sure that you've learned before you take this assignment."
  } else if (points <= 6) {
    return "Hmm. Bad score. Learn harder to get higher score later."
  } else if (points <= 8) {
    return "Not bad. Try harder in the following assignment."
  } else if (points < 10) {
    return "Wow wow wow. Nice try."
  } else {
    return "Excellent! Hope that you haven't cheated."
  }
}
