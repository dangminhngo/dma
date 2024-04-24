import { api } from "~/trpc/server";
import CourseSettings from "./course-settings";

export default async function TeacherCourseSettingsPage({ params }: { params: { id: string }}) {
  const course = await api.course.byId({ id: +params.id })

  return <CourseSettings course={course} />
}
