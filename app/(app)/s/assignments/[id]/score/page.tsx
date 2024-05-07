import Link from "next/link"
import { notFound, redirect } from "next/navigation"

import Breadcrumb from "~/components/breadcrumb"
import { buttonVariants } from "~/components/ui/button"
import { Heading } from "~/components/ui/heading"
import { cn } from "~/lib/utils"
import { getServerAuthSession } from "~/server/auth"
import { api } from "~/trpc/server"

export default async function AssignmentScorePage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerAuthSession()

  if (!session) return redirect("/sign-in")

  const assignment = await api.assignment.byId({ id: +params.id })

  if (!assignment) return notFound()

  const score = await api.score.byAssignment({
    assignmentId: assignment.id,
  })

  if (!score) return redirect(`/s/assignment/${assignment.id}`)

  const links = [
    {
      label: "Home",
      href: "/s",
    },
    {
      label: "Courses",
      href: "/s/courses",
    },
    {
      label: assignment.course.name ?? assignment.courseId,
      href: `/s/courses/${assignment.courseId}`,
    },
    {
      label: "Assignments",
      href: `/s/courses/${assignment.courseId}/assignments`,
    },
    {
      label: assignment.title,
      href: `/s/assignments/${assignment.id}`,
    },
    {
      label: "Your Score",
    },
  ]

  return (
    <div className="space-y-4">
      <Breadcrumb links={links} />
      <Heading as="h1">Assignment: {assignment.title}</Heading>
      <Heading as="h2" className={cn("text-4xl", getScoreColor(score.points))}>
        Your Score: {score.points}
      </Heading>
      <div className="text-xl">{getText(score.points)}</div>
      <div className="text-muted-foreground">
        You cannot be allowed to take this assignment again. If there is
        something wrong, contact the teacher of this course.
      </div>
      <div className="flex items-center space-x-2">
        <Link
          href={`/s/assignments/${assignment.id}/rankings`}
          className={buttonVariants({ variant: "secondary" })}
        >
          See Rankings
        </Link>
        <Link
          href={`/s/assignments/${assignment.id}/results`}
          className={buttonVariants({ variant: "default" })}
        >
          See Your Results
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
