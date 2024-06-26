import { api } from "~/trpc/server"
import AnnouncementList from "./annoucement-list"

export default async function TeacherCourseAnnouncementsPage({
  params,
}: {
  params: { id: string }
}) {
  const course = await api.course.byId({ id: +params.id })

  return <AnnouncementList course={course} />
}
