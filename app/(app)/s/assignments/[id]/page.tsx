import { notFound, redirect } from "next/navigation"

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

  return (
    <div className="space-y-4">
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
