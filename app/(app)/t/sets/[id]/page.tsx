import { notFound } from "next/navigation"

import { api } from "~/trpc/server"
import TeacherSet from "./teacher-set"

export default async function TeacherSetsPage({
  params,
}: {
  params: { id: string }
}) {
  const set = await api.set.byId({ id: +params.id })

  if (!set) return notFound()

  return <TeacherSet set={set} />
}
