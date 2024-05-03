import { redirect } from "next/navigation"

export default function CoursePage({ params }: { params: { id: string } }) {
  return redirect(`/s/courses/${params.id}/sets`)
}
