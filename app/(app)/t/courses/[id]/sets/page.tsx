import { api } from "~/trpc/server"
import SetList from "./set-list"

export default async function TeacherCourseSetsPage({
  params,
}: {
  params: { id: string }
}) {
  const course = await api.course.byId({ id: +params.id })

  return <SetList course={course} />
}
