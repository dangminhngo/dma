import { api } from "~/trpc/server"
import AssignmentResults from "./assignment-results"

export default async function AssignmentResultsPage({
  params,
}: {
  params: { id: string }
}) {
  const questions = await api.question.list({ assignmentId: +params.id })
  const studentAnswers = await api.studentAnswer.listByAssignment({
    assignmentId: +params.id,
  })

  return (
    <AssignmentResults questions={questions} studentAnswers={studentAnswers} />
  )
}
