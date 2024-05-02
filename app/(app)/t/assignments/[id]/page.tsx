import { notFound } from "next/navigation"

import { api } from "~/trpc/server"
import TeacherAssignment from "./teacher-assignment"

export default async function TeacherAssignmentsPage({
  params,
}: {
  params: { id: string }
}) {
  const assignment = await api.assignment.byId({ id: +params.id })

  if (!assignment) return notFound()

  return <TeacherAssignment assignment={assignment} />
}
