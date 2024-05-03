import { Heading } from "~/components/ui/heading"
import { api } from "~/trpc/server"
import AssignmentCard from "./assignment-card"

export default async function AssignmentsPage({
  params,
}: {
  params: { id: string }
}) {
  const assignments = await api.assignment.list({ courseId: +params.id })

  return (
    <div className="space-y-2 py-8">
      <Heading as="h3">Assignments ({assignments.length ?? 0})</Heading>
      <div className="grid grid-cols-2 gap-4">
        {assignments.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ))}
      </div>
    </div>
  )
}
