import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import AssignmentResults from "./assignment-results"

export default async function AssignmentResultsPage({ params }: { params: { id: string }}) {
  const assignment = await api.assignment.byId({ id: +params.id })

  if (!assignment) return notFound()

  const questions = await api.question.list({ assignmentId: assignment.id })
  const studentAnswers = await api.studentAnswer.listByAssignment({ assignmentId: assignment.id })

  return <AssignmentResults assignment={assignment} questions={questions} studentAnswers={studentAnswers} />
}
