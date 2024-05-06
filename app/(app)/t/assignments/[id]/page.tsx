import Link from "next/link"
import { notFound } from "next/navigation"

import { buttonVariants } from "~/components/ui/button"
import { Heading } from "~/components/ui/heading"
import { api } from "~/trpc/server"
import TeacherAssignment from "./teacher-assignment"

export default async function TeacherAssignmentsPage({
  params,
}: {
  params: { id: string }
}) {
  const assignment = await api.assignment.byId({ id: +params.id })

  if (!assignment) return notFound()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading as="h1">Assignment: {assignment.title}</Heading>
        <Link
          href={`/t/assignments/${assignment.id}/managements`}
          className={buttonVariants({ variant: "default", size: "sm" })}
        >
          Manage
        </Link>
      </div>
      <div className="text-muted-foreground">{assignment.description}</div>
      <div>
        <TeacherAssignment assignment={assignment} />
      </div>
    </div>
  )
}
