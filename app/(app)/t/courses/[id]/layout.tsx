import { Heading } from "~/components/ui/heading"
import { api } from "~/trpc/server"
import TeacherCourseTabs from "./course-tabs"

interface TeacherCourseLayoutProps extends Readonly<React.PropsWithChildren> {
  params: { id: string }
}

export default async function TeacherCourseLayout({
  children,
  params,
}: TeacherCourseLayoutProps) {
  const course = await api.course.byId({ id: +params.id })

  return (
    <div className="space-y-4">
      <Heading as="h1">Course: {course?.name}</Heading>
      <TeacherCourseTabs id={params.id}>{children}</TeacherCourseTabs>
    </div>
  )
}
