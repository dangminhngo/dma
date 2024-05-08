import { notFound } from "next/navigation"

import Breadcrumb from "~/components/breadcrumb"
import { Heading } from "~/components/ui/heading"
import { api } from "~/trpc/server"

interface AssignmentRankingsLayoutProps
  extends Readonly<React.PropsWithChildren> {
  params: { id: string }
}

export default async function AssignmentRankingsLayout({
  params,
  children,
}: AssignmentRankingsLayoutProps) {
  const assignment = await api.assignment.byId({ id: +params.id })

  if (!assignment) return notFound()

  const links = [
    {
      label: "Home",
      href: "/s",
    },
    {
      label: "Courses",
      href: "/s/courses",
    },
    {
      label: assignment.course.name ?? assignment.courseId,
      href: `/s/courses/${assignment.courseId}`,
    },
    {
      label: "Assignments",
      href: `/s/courses/${assignment.courseId}/assignments`,
    },
    {
      label: assignment.title,
      href: `/s/assignments/${assignment.id}`,
    },
    {
      label: "Rankings",
    },
  ]

  return (
    <div className="space-y-4">
      <Breadcrumb links={links} />
      <Heading as="h1">Assignment: {assignment.title} - Rankings</Heading>
      <div>{children}</div>
    </div>
  )
}
