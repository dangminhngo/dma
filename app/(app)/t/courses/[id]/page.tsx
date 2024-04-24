import { redirect } from "next/navigation"

export default function TeacherCoursePage({
  params,
}: {
  params: { id: string }
}) {
  return redirect(`/t/courses/${params.id}/sets`)
}
