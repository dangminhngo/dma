import { notFound } from "next/navigation"

import { Heading } from "~/components/ui/heading"
import { api } from "~/trpc/server"
import SetCarousel from "./set-carousel"

export default async function SetPage({ params }: { params: { id: string } }) {
  const set = await api.set.byId({ id: +params.id })

  if (!set) return notFound()

  const words = await api.word.list({ setId: set.id })

  return (
    <div className="space-y-4">
      <Heading as="h1">Set: {set.title}</Heading>
      <SetCarousel words={words} />
    </div>
  )
}
