import { Heading } from "~/components/ui/heading"
import { api } from "~/trpc/server"
import CourseTabs from "./course-tabs"

interface CourseLayoutProps extends Readonly<React.PropsWithChildren> {
  params: { id: string }
}

export default async function CourseLayout({
  children,
  params,
}: CourseLayoutProps) {
  const course = await api.course.byId({ id: +params.id })

  return (
    <div className="space-y-4">
      <Heading as="h1">Course: {course?.name}</Heading>
      <CourseTabs id={params.id}>{children}</CourseTabs>
    </div>
  )
}
