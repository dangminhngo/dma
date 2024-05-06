import { notFound } from "next/navigation"

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

  return (
    <div className="space-y-4">
      <Heading as="h1">Assignment: {assignment.title} - Managements</Heading>
      <AssignmentManagements assignment={assignment} />
    </div>
  )
}
