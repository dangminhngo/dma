import { Heading } from "~/components/ui/heading"
import { api } from "~/trpc/server"

export default async function TeacherCoursePage({
  params,
}: {
  params: { id: string }
}) {
  const course = await api.course.byId({ id: +params.id })

  if (!course) return <div>Cannot fetching course</div>

  return (
    <div className="space-y-4">
      <Heading as="h1">{course.name}</Heading>
    </div>
  )
}
