import { api } from "~/trpc/server"
import TeacherCourses from "./teacher-courses"

export default async function TeacherCoursesPage() {
  const courses = await api.course.list()

  return <TeacherCourses courses={courses} />
}
