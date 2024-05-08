import { api } from "~/trpc/server"
import SetCarousel from "./set-carousel"

export default async function SetPage({ params }: { params: { id: string } }) {
  const words = await api.word.list({ setId: +params.id })

  return (
    <div>
      <SetCarousel words={words} />
    </div>
  )
}
