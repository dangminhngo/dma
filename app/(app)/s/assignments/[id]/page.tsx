import { notFound, redirect } from "next/navigation"

import Breadcrumb from "~/components/breadcrumb"
import { Heading } from "~/components/ui/heading"
import { api } from "~/trpc/server"
import TakeAssignmentForm from "./take-assignment-form"

export default async function AssignmentPage({
  params,
}: {
  params: { id: string }
}) {
  const assignment = await api.assignment.byId({ id: +params.id })

  if (!assignment) return notFound()

  const existingScore = await api.score.byAssignment({
    assignmentId: assignment.id,
  })

  if (existingScore) return redirect(`/s/assignments/${assignment.id}/score`)

  const questions = await api.question.list({ assignmentId: assignment.id })

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
  ]

  return (
    <div className="space-y-4">
      <Breadcrumb links={links} />
      <Heading as="h1">
        Assignment: {assignment.title}{" "}
        <span className="text-muted-foreground">
          ({assignment._count.questions} questions)
        </span>
      </Heading>
      <TakeAssignmentForm assignmentId={assignment.id} questions={questions} />
    </div>
  )
}
