import AssignmentRankings from "./assignment-rankings"

export default async function AssignmentRankingsPage({
  params,
}: {
  params: { id: string }
}) {
  return <AssignmentRankings assignmentId={+params.id} />
}
