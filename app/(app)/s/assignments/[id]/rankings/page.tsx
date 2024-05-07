import { notFound } from "next/navigation";
import { Heading } from "~/components/ui/heading";
import { api } from "~/trpc/server";
import AssignmentRankings from "./assignment-rankings"

export default async function AssignmentRankingsPage({ params }: { params: { id: string }}) {
  const assignment = await api.assignment.byId({ id: +params.id })

  if (!assignment) return notFound()

  return <div className="space-y-4">
    <Heading as="h1">Assignment: {assignment.title} - Rankings</Heading>
    <div>
      <AssignmentRankings assignmentId={assignment.id} />
    </div>
  </div>
}
