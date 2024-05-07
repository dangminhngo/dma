import { notFound } from "next/navigation"

import Breadcrumb from "~/components/breadcrumb"
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

  if (!course) return notFound()

  const links = [
    {
      label: "Home",
      href: "/s",
    },
    { label: "Courses", href: "/s/courses" },
    { label: course.name },
  ]

  return (
    <div className="space-y-4">
      <Breadcrumb links={links} />
      <Heading as="h1">Course: {course?.name}</Heading>
      <CourseTabs id={params.id}>{children}</CourseTabs>
    </div>
  )
}
