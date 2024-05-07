import { notFound } from "next/navigation"

import Breadcrumb from "~/components/breadcrumb"
import { Heading } from "~/components/ui/heading"
import { api } from "~/trpc/server"
import AssignmentManagements from "./assignment-managements"

export default async function AssignmentManagementsPage({
  params,
}: {
  params: { id: string }
}) {
  const assignment = await api.assignment.byId({ id: +params.id })

  if (!assignment) return notFound()

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
      label: assignment.course.name ?? assignment.courseId,
      href: `/t/courses/${assignment.courseId}`,
    },
    {
      label: "Assignments",
      href: `/t/courses/${assignment.courseId}/assignments`,
    },
    {
      label: assignment.title,
      href: `/t/assignments/${assignment.id}`,
    },
    {
      label: "Managements",
    },
  ]

  return (
    <div className="space-y-4">
      <Breadcrumb links={links} />
      <Heading as="h1">Assignment: {assignment.title} - Managements</Heading>
      <AssignmentManagements assignment={assignment} />
    </div>
  )
}
