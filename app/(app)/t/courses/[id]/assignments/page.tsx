import { api } from "~/trpc/server"
import AssignmentList from "./assignment-list"

export default async function TeacherCourseAssignmentsPage({
  params,
}: {
  params: { id: string }
}) {
  const course = await api.course.byId({ id: +params.id })

  return <AssignmentList course={course} />
}
