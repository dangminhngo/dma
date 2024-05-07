import { notFound } from "next/navigation"

import Breadcrumb from "~/components/breadcrumb"
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

  if (!course) return notFound()

  const links = [
    {
      label: "Home",
      href: "/t",
    },
    {
      label: "Courses",
      href: "/t/courses",
    },
    {
      label: course.name,
      href: `/t/courses/${course.id}`,
    },
  ]

  return (
    <div className="space-y-4">
      <Breadcrumb links={links} />
      <Heading as="h1">Course: {course?.name}</Heading>
      <TeacherCourseTabs id={params.id}>{children}</TeacherCourseTabs>
    </div>
  )
}
