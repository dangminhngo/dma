import { notFound, redirect } from "next/navigation"

import Breadcrumb from "~/components/breadcrumb"
import { Heading } from "~/components/ui/heading"
import { getServerAuthSession } from "~/server/auth"
import { api } from "~/trpc/server"

interface AssignmentScoreLayoutProps extends Readonly<React.PropsWithChildren> {
  params: { id: string }
}

export default async function AssignmentScoreLayout({
  params,
  children,
}: AssignmentScoreLayoutProps) {
  const session = await getServerAuthSession()

  if (!session) return redirect("/sign-in")

  const assignment = await api.assignment.byId({ id: +params.id })

  if (!assignment) return notFound()

  const score = await api.score.byAssignment({
    assignmentId: assignment.id,
  })

  if (!score) return redirect(`/s/assignment/${assignment.id}`)

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
      label: "Your Score",
    },
  ]

  return (
    <div className="space-y-4">
      <Breadcrumb links={links} />
      <Heading as="h1">Assignment: {assignment.title}</Heading>
      <div>{children}</div>
    </div>
  )
}
