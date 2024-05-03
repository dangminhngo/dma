import { Heading } from "~/components/ui/heading"
import { api } from "~/trpc/server"
import SetCard from "./set-card"

export default async function SetsPage({ params }: { params: { id: string } }) {
  const sets = await api.set.list({ courseId: +params.id })
  return (
    <div className="space-y-2 py-8">
      <Heading as="h3">Sets ({sets.length ?? 0})</Heading>
      <div className="grid grid-cols-2 gap-4">
        {sets.map((set) => (
          <SetCard key={set.id} set={set} />
        ))}
      </div>
    </div>
  )
}
